<?php

//require_once dirname(dirname(dirname(__DIR__))) . '/system/config.php';

//require_once UNITY_ROOT . '/interfaces/ISession.class.php';
//if(!class_exists('Database'))
//  require_once UNITY_INC_ROOT.'database.inc.php'; 

class DefaultSession //extends ISession
{
    /**
     * The 6 primary call back functions that need to be implemented 
     * by any user defined session handler class:
     *  open()
     *  close()
     *  read()
     *  write()
     *  destroy()
     *  gc()
     */
	public function open() {}
	public function close() {}
	public function read($id) {}
	public function write($id,$data) {}
	public function destroy($id) {}
	public function gc($max) {}

    /**
     * Since PHP has a weird way of deleting session handler class
     * it destroys the session handler class before calling write()
     * Hence need to register a shutdown function explicitly
     */
	public function shutdown() {}

    public function init() {
        ini_set('session.save_handler', 'files');
        ini_set('session.gc_probability', 1000);

        session_start();
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
	public function get_session_info($session_id) {}
	public function get_user_session($account_id) {}
}
