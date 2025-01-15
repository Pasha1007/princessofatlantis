<?php
class ErrorHandler2
{
	public static function handleError2($errorNumber=1, $errorCode="SOME_ERROR",
									   $errorMessage='', $extraInfo='')
	{
		dispatch_message2(Array(
			'error_number'  => $errorNumber,
			'error_code'    => $errorCode,
			'error_message' => $errorMessage,
			'extra_info'    => $extraInfo));
	}
}

function dispatch_message2($message) {
	header('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: *');

	print encode_objects($message);
	exit;
}
?>
