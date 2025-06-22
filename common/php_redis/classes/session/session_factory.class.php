<?php
require_once 'impl/default_session.class.php';

class SessionFactory {


    public static function CreateSession($type = null) {

        $session_store_types = Array(
                'db' => Array(
                    'class' => 'DBSession',
                    'file'  => 'db_session.class.php'
                    ),
                'redis' => Array(
                    'class' => 'RedisSession',
                    'file'  => 'redis_session.class.php'
                    )
        );

        switch ($type) {
            case 'db':
            case 'redis':
                $session_store = $session_store_types[$type]; 
                require_once 'impl/' . $session_store['file'];
                return new $session_store['class']();
            default:
                return new DefaultSession();
        }
    } 
}
