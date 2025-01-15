<?php
//require_once dirname(dirname(dirname(__DIR__))) . '/system/config.php';

//require_once UNITY_ROOT . '/interfaces/ISession.class.php';
include_once 'Rediska/library/Rediska.php';

require_once 'redis.conf.php';

class RedisSession //extends ISession
{
    static $_sess_redis;

    public function shutdown() {
        return false;
    }

    public function open() {
        $config = unserialize(REDIS_CONFIG);
        self::$_sess_redis = new Rediska($config);

        return true;
    }

    public function close() {
        return self::$_sess_redis->quit();
    }

    public function read($id) {
        global $is_session_available;

        if(!isset($id) or $id == '' or $id == null) {  return false;  }

        //$value = self::$_sess_redis->getHashValues($id);
        $value = self::$_sess_redis->get($id);
        if(!isset($value) || !$value || $value == '' || $value == NULL) {
            $is_session_available = 0;
            return;
        }

        $_SESSION = json_decode($value, true);

        if( is_array($value) && count($value) == 0) {
            return 'true'; # notice: string value in return.
        }

        return 'true';
        return $value[0];  #serialize session data
    }

    public function write($id, $data) {
        # return true;

        $data2 = json_encode($_SESSION);

        if(!isset($id) or $id == '' or $id == null) {
            return false;
        }

        //self::$_sess_redis->setToHash($id, Array('sessdata' => $data));
        self::$_sess_redis->set($id, $data2);
        self::$_sess_redis->expire($id, SESSION_EXPIRE_TIME);

        if(isset($_SESSION['account_id']))
            self::$_sess_redis->setAndExpire($_SESSION['account_id'], $id, SESSION_EXPIRE_TIME);

        return true; // last return added. 14022020
    }

    public function destroy($id) {
        print $id;
        if(isset($_SESSION['account_id'])){
            self::$_sess_redis->delete($_SESSION['account_id']);
        }
        return self::$_sess_redis->delete($id);
    }

    public function gc($max) {
        ///
        //  Automatic GC by redis store. GC step not needed
        ///
		return true;
    }

    public function init_user_session($account_id, $session_id) {
        ///
        //  Check if the session exists
        //  If no duplicate login check is required do a return.
        ///
        if (DUPLICATE_LOGIN_ALLOWED) {
            return; /* Do Nothing */
        }

        ///
        //  Find the sessionid linked with the userid
        ///
        $user_session_id = self::$_sess_redis->get($account_id);
        if($session_id != $user_session_id) {
            self::$_sess_redis->delete($user_session_id);
        }
        self::$_sess_redis->setAndExpire($account_id, $session_id, SESSION_EXPIRE_TIME);
    }

    public function get_session_info($session_id) {
        if(!$session_id)
            return false;
        return self::$_sess_redis->getHashValues($session_id);
    }

    public function get_user_session($account_id) {
        if(!$account_id)
            return false;
        return self::$_sess_redis->get($account_id);
    }
}
