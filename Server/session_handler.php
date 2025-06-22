<?php
/*
 * PHP Naming convention
 * todo TODO XXX
 * Source: https://softwareengineering.stackexchange.com/questions/149303/naming-classes-methods-functions-and-variables
 * Below should the naming convention
 *    ClassName
 *    methodName
 *    propertyName
 *    function_name (meant for global functions)
 *    $variable_name
 */

//session_start();


# insert manually in redis
# set "session_bd4e2af07e8d445dc63fd1b376054a56d52a4ca3" "{\"user_id\": 176, \"username\": \"test1_PFMNGOP\", \"full_site_code\": \"PFMNGOP\",\"account_id\":8}"
#

$session_id = $_REQUEST['session_id'];
//print($session_id); die;
$_REQUEST['token'] = "session_" . $session_id;  //"session_bd4e2af07e8d445dc63fd1b376054a56d52a4ca3";
#require_once('../../php_redis/classes/session.class.php');
require_once $_SERVER['DOCUMENT_ROOT'] . '/common/php_redis/classes/session.class.php';




# todo. Need to handle this hardcoded palyer id
$user_details = array(
	'e101' => 7,
	'e102' => 4,
	'e103' => 1,
	'e104' => 2,
	'e105' => 8,
	'e106' => 6,
	'e107' => 9,
	'e108' => 5,
	'e109' => 3,
	'e110' => 10,
	'e112' => 18,
	'e113' => 11,
	'e114' => 20,
	'e115' => 19,
	'e119' => 67,
	'e124' => 168,
	'e125' => 169,
	'ng0' => 12,
	'ng1' => 13,
	'ng2' => 14,
	'ng3' => 15,
	'ng4' => 16,
	'ng5' => 17,
	'pg0' => 41,
	'pg1' => 42,
	'pg2' => 43,
	'pg3' => 44,
	'pg4' => 45,
	'pg5' => 46,
	'pg6' => 47,
	'pg7' => 48,
	'pg8' => 49,
	'pg9' => 50,
	'pg10' => 51,
	'ng11' => 52,
	'ng12' => 53,
	'ng13' => 54,
	'ng14' => 55,
	'ng15' => 56,
	'ng16' => 57,
	'ng17' => 58,
	'ng18' => 59,
	'ng19' => 60,
	'ng20' => 61,
	'ng6' => 62,
	'ng7' => 63,
	'ng8' => 64,
	'ng9' => 65,
	'ng10' => 66,
	'naga' => 68,
	'ngtester0' => 70,
	'ngtester1' => 71,
	'ngtester2' => 72,
	'ngtester3' => 73,
	'ngtester4' => 74,
	'ngtester5' => 75,
	'ng21' => 76,
	'ng22' => 77,
	'ng23' => 78,
	'ng24' => 79,
	'ng25' => 80,
	'ng26' => 81,
	'ng27' => 82,
	'ng28' => 83,
	'ng29' => 84,
	'ng30' => 85,
	'ng31' => 86,
	'ng32' => 87,
	'ng33' => 88,
	'ng34' => 89,
	'ng35' => 90,
	'ng36' => 91,
	'ng37' => 92,
	'ng38' => 93,
	'ng39' => 94,
	'ng40' => 95,
	'ng41' => 96,
	'ng42' => 97,
	'ng43' => 98,
	'ng44' => 99,
	'ng45' => 100,
	'ng46' => 101,
	'ng47' => 102,
	'ng48' => 103,
	'ng49' => 104,
	'ng50' => 105,
	'ecogra1' => 106,
	'ecogra2' => 107,
	'ecogra3' => 108,
	'ecogra4' => 109,
	'ecogra5' => 110,
	'ecogra6' => 111,
	'ecogra7' => 112,
	'ecogra8' => 113,
	'ecogra9' => 114,
	'ecogra10' => 115,
	'ars' => 116,
	'aud' => 117,
	'brl' => 118,
	'bgn' => 119,
	'cad' => 120,
	'cny' => 121,
	'hrk' => 122,
	'czk' => 123,
	'dkk' => 124,
	'eur' => 125,
	'gel' => 126,
	'ghs' => 127,
	'hkd' => 128,
	'huf' => 129,
	'isk' => 130,
	'idr' => 131,
	'jpy' => 132,
	'myr' => 133,
	'mxn' => 134,
	'nzd' => 135,
	'nok' => 136,
	'pen' => 137,
	'php' => 138,
	'pln' => 139,
	'ron' => 140,
	'rub' => 141,
	'sgd' => 142,
	'zar' => 143,
	'krw' => 144,
	'sek' => 145,
	'chf' => 146,
	'twd' => 147,
	'thb' => 148,
	'try' => 149,
	'uah' => 150,
	'gbp' => 151,
	'usd' => 152,
	'vnd' => 153,

);

if (!isset($request_params['username'])) {
	ErrorHandler::handleError(1, "USERNAME_REQUIRED");
}

if (!isset($user_details[$request_params['username']])) {
	//ErrorHandler::handleError(1, "INVALID_USERNAME", "Username not found");
}

if (!isset($_SESSION['account_id']) or !isset($_SESSION['username'])) {
	//$_SESSION['username'] = $request_params['username'];
	//$_SESSION['account_id'] = $user_details[$request_params['username']];
}


?>