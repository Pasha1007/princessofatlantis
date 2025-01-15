<?php
//ini_set("display_errors", 0); error_reporting(~E_ALL);

ini_set('session.save_path', 'tcp://127.0.0.1:6379'); // 12022020
#ini_set('session.save_path', 'tcp://192.168.1.111:6379'); // 12022020

require_once 'session/session_factory.class.php';
$SessionHandler = SessionFactory::CreateSession('redis');
$is_session_available = 1;

session_set_save_handler(
    array($SessionHandler, 'open'),
    array($SessionHandler, 'close'),
    array($SessionHandler, 'read'),
    array($SessionHandler, 'write'),
    array($SessionHandler, 'destroy'),
    array($SessionHandler, 'gc')
);

register_shutdown_function(array($SessionHandler, 'shutdown'));

# Start the session with session_id with name rgs_session_id. Its nothing but providers session_id
if(isset($_REQUEST['token']) && $_REQUEST['token'] != '' && $_REQUEST['token'] != 'undefined') {
    $cookie_session_token = filter_var($_REQUEST['token'],FILTER_SANITIZE_STRING);
    setcookie(session_name(), $cookie_session_token, 0, NULL, NULL, TRUE, TRUE);
    session_name('rgs_session_id' . $_REQUEST['token']);
    session_id($_REQUEST['token']);
}

@session_start();

if(!$is_session_available || $is_session_available == 0 || empty($_SESSION) || !$_SESSION) {
    ErrorHandler::handleError(1, "INVALID_SESSION", "Invalid session or session does not exist(SESSCLS_001)");
}

if (!session_id()) {
    session_regenerate_id();
}
?>
