<?php
/**
 * @class DBSession
 * @file  session.class.php
 * @deps  logs.active_logins table
 * @desc  This class takes care of handling the PHP sessions in the DB instead
 *        of PHP file based sessions in /var/lib/php/sessions/sess_*. 
 *        Uses the logs.active_logins tables itself for the session_storage
 * @note  Must complete the Pre-Deployment DB changes before putting this live
 * @note  session_start() is now replaced by include_once THIS_FILE
 *
 * @date   April 20th 2020
 * @author Ramana Vinay
 * @copyright Pvt Ltd
 *
 * Change History
 * Ramana  20-04-2020  1.0  Created
 * Ramana  25-04-2020  1.5  Removed hardcoding of DB details.
 *                          Added register_shutdown for mysqli session close
 */

/**
 * @actions Pre-Deployment Changes
 * @table   logs.active_logins
 *
 */
require_once dirname(dirname(dirname(__DIR__))) . '/system/config.php';

require_once UNITY_ROOT . '/interfaces/ISession.class.php';
require_once UNITY_INC_ROOT . '/database.inc.php';

define('SESSION_DB', 'logs');

class DBSession extends ISession
{
  /**
   * @member a database connection resource
   */
  var $_sess_db;

  /**
   * @function open
   * @desc     Start the session. Connect to DB.
   * @return bool
   */
  public function open() {
    if ($this->_sess_db = Database::GetInstance('session')) {
      return $this->_sess_db->select_db(SESSION_DB);
    }
    return false;
  }

  /**
   * @function close
   * @desc Close the session
   * @return bool
   */
  public function close() {
    return @mysql_close($this->_sess_db);
  }

  /**
   * @function read
   * @desc Read the session
   * @param int session id
   * @return string string of the sessoin
   */
  public function read($id) {
    if(!isset($id) or $id == '' or $id == null) {  return false;  }

    $id = $this->_sess_db->real_escape_string($id);
    $sql = sprintf("SELECT CONCAT(sessdata1, sessdata2, sessdata3, sessdata4) AS sessdata FROM logs.active_logins WHERE sesskey = '%s'", $id);

    if ($result = $this->_sess_db->query($sql)) {
      if ($this->_sess_db->num_rows($result)) {
        $record = $this->_sess_db->fetch_assoc($result);
        return $record['sessdata'];
      }
    }

    return false;
  }

  /**
   * @function write
   * @desc Write the session
   * @param int session id
   * @param string data of the session
   */
  public function write($id, $data) {
    if(!isset($id) or $id == '' or $id == null) { return false; }

    $expiry_date = 'DATE_ADD(NOW(), INTERVAL 60 MINUTE)';

    ///
    // Splitting the 1K sized DBSession Data into 4 255-byte sized chunks
    // as the Max size of a column in the memory table is 255 Bytes
    ///
    $len   = strlen($data);
    $sess_data1 = substr($data, 0,   255); 
    $sess_data2 = substr($data, 255, 255);
    $sess_data3 = substr($data, 510, 255);
    $sess_data4 = substr($data, 765, 255);

    ///
    // Do an update first. If that fails implying a new session,
    // insert a new session into the DB.
    ///expiry_date = NOW(),
    $upd_sql = "
      UPDATE logs.active_logins 
         SET sessdata1 = '%s', 
             sessdata2 = '%s', 
             sessdata3 = '%s',
             sessdata4 = '%s', 
             expiry_date = DATE_ADD(NOW(), INTERVAL 60 MINUTE),
             last_response_date = NOW()
       WHERE sesskey = '%s'";
    $sql = sprintf($upd_sql,
        $sess_data1, $sess_data2, $sess_data3, $sess_data4,
        $this->_sess_db->real_escape_string($id));

    $rs = $this->_sess_db->query($sql);
    $nr = $this->_sess_db->affected_rows($rs);

    if ($nr == 0) {
      $ins_sql = "
        INSERT INTO logs.active_logins (sesskey, sessdata1, sessdata2, sessdata3, sessdata4, 
            expiry_date, last_response_date, date_of_login)
        VALUES ('%s', '%s', '%s', '%s', '%s', %s, NOW(), NOW())";

      $sql = sprintf($ins_sql,
          $this->_sess_db->real_escape_string($id),
          $sess_data1, $sess_data2, $sess_data3, $sess_data4, $expiry_date);

      $rs = $this->_sess_db->query($sql);
    }
    else if ($nr > 1) {
      return false;
    }

    return true;
  }

  public function destroy($id) {
    $sql = sprintf("DELETE FROM logs.active_logins WHERE sesskey = '%s'", $id);
    return $this->_sess_db->query($sql);
  }

  public function gc($max) {
    $sql = "DELETE FROM logs.active_logins WHERE expiry_date < NOW()";
    return $this->_sess_db->query($sql);
  }

  public function shutdown() {
    @session_write_close();
  }

  /**
   * @function set_user_session
   * @desc     This function creates an "Authenticated User Session" - Active Login.
   *           If a visitor session exists, this function sets the authenticated 
   *           user details to the existing session.
   *           If no visitor session exists for the user, a new session is created
   *           and the authenticated user details added to it.
   *           If a user session already exists, then the session_id is set to this
   *           active session - stops duplicate logins of same player.
   */
  public function init_user_session($account_id, $session_id)
  {
    $active_logins = "logs.active_logins";
    $client_ip = ClientInfo::GetRemoteIP();

    $query = "SELECT sesskey, account_id FROM $active_logins WHERE sesskey = '$session_id'";
    $rs    = $this->_sess_db->query($query) or die($this->_sess_db->error());
    $row   = $this->_sess_db->fetch_row($rs);

    ///
    // Create a new Authenticated User Session
    ///
    if(!$row)
    {
      $create_sess_sql = "
        INSERT INTO $active_logins(account_id, ip_address, date_of_login, 
          last_response_date, expiry_date, sesskey)
        VALUES ($account_id,'$client_ip', NOW(), NOW(), 
          DATE_ADD(NOW(), INTERVAL 60 MINUTE), '$session_id')";
      $create_sess_rs = $this->_sess_db->query($create_sess_sql) or die($this->_sess_db->error());
    }
    ///
    // Convert a visitor session to a Authenticate User Session
    ///
    else if ($row[1] == '' or isset($row[1]) == false or $row[1] == 0)
    {
      $update_sess_sql = "
        UPDATE $active_logins
           SET date_of_login = NOW(), last_response_date = NOW(),
               expiry_date = DATE_ADD(NOW(), INTERVAL 60 MINUTE),
               account_id = $account_id, ip_address = '$client_ip'
         WHERE sesskey = '$session_id' ";
      $update_sess_rs = $this->_sess_db->query($update_sess_sql) or die($this->_sess_db->error());
    }
    ///
    // Replace an existing Authenticated User Session with the new session.
    // To stop duplicate sessions for a user.
    ///
    else if ($row[0] == '' or isset($row[0]) == false)
    {
      $duplicate_sess_sql = "
        UPDATE $active_logins 
           SET date_of_login = NOW(), last_response_date = NOW(),
               expiry_date = DATE_ADD(NOW(), INTERVAL 60 MINUTE),
               sesskey = '$session_id', ip_address = '$client_ip'
         WHERE account_id = '$account_id'";
      $duplicate_sess_rs = $this->_sess_db->query($duplicate_sess_sql) or die($this->_sess_db->error());
    }
  }
}
