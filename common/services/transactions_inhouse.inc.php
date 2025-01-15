<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/common/config.php';
require_once  'service.php';

class Transaction {
    const TRXN_WAGERING = 1;
    const TRXN_WINNING  = 2;

    const TRXN_LOG = 'logs.transactions';

    public function __construct() { }

    public static function debitAmount($gameId, $roundId, $accountId, $gameCatId,
        $channelId, $transType, $amountType, $amount, $siteId,
        $operatorId, $sessionId, $currency,$note = 'debit')
    {
        $result = array('error' => 0);
        /////////////////////////////
        $processed = 0;
        $transId =  Transaction::logTransaction($gameId, $roundId, $accountId,
            $gameCatId, $channelId, $transType, $amountType, $amount, $siteId,
            $operatorId, $sessionId, $currency, $note, $result, $processed);
        ///////////////////////////////

        # call api
        $method_name = 'debit';
        $transaction_type = 'wager';


        $api_url = API_URL.$method_name.'/';
        $method = 'POST';
        $api_params = json_encode(Array(
            "api_key"       => API_KEY,
            "amount"        => $amount,
            "amount_type"	=> $amountType,
            "note"			=> $note,
            "game_name"		=> "ageofdavinci",
            "game_mode"		=> "normal",
            "game_id"		=> 1032,
            "game_category" => $gameCatId,
            "round_id"		=> 	123,
            "currency"		=>	$currency, //"GBP"
            "transaction_id" => $transId,
            "transaction_type" => $transaction_type,
            "context" => Array()
        ));

        $headers = [
            'Authorization' => 'Token '.$sessionId,
            'Content-Type'  => 'application/json'
        ];

        header('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');

        $server_resp = Service::sendRequest($api_params, API_KEY, $api_url, $method, $headers);
        $result = $server_resp;

        if( isset($server_resp['error']) ) {
            $result['error'] = $server_resp['error'];
        }
        else {
            $result['error'] = 0;
        }

        Transaction::updateTransaction($transId);
        $result['transaction_id'] = $transId;

        return $result;
    }

    public static function CreditAmount($gameId, $roundId, $accountId, $gameCatId,
        $channelId, $transType, $amountType, $amount, $siteId, $operatorId,
        $sessionId, $currency, $note = 'credit')
    {
        $result = array('error' => 0);
        ////////////////////////////////////////////
        $processed = 0;
        $transId =  Transaction::logTransaction($gameId, $roundId, $accountId,
            $gameCatId, $channelId, $transType, $amountType, $amount, $siteId,
            $operatorId, $sessionId, $currency, $note, $result, $processed);
        /////////////////////////////////////////

        # call api
        $method_name = 'credit';
        $transaction_type = 'win';

        $api_url = API_URL.$method_name.'/';
        $method = 'POST';
        $api_params = json_encode(Array(
            "api_key"       => API_KEY,
            "amount"        => $amount,
            "amount_type"	=> $amountType,
            "note"			=> $note,
            "game_name"		=> "ageofdavinci",
            "game_mode"		=> "normal",
            "game_id"		=> 1032,
            "game_category" => $gameCatId,
            "round_id"		=> 	123,
            "currency"		=>	$currency, //"GBP"
            "transaction_id" => $transId,
            "transaction_type" => $transaction_type,
            "context" => Array()
        ));

        $headers = [
            'Authorization' => 'Token '.$sessionId,
            'Content-Type'  => 'application/json'
        ];

        header('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');

        $server_resp = Service::sendRequest($api_params, API_KEY, $api_url, $method, $headers);
        $result = $server_resp;

        if( isset($server_resp['error']) ) {
            $result['error'] = $server_resp['error'];
        }
        else {
            $result['error'] = 0;
        }

        $result['transaction_id'] = $transId;
        Transaction::updateTransaction($transId);

        return $result;
    }

    private static function logTransaction($gameId, $roundId, $accountId, $gameCatId,
        $channelId, $transType, $amountType, $amount, $siteId, $operatorId,
        $sessionId, $currency, $note, $result, $processed)
    {

        global $db;
        # todo TODO change from self to class_name and try once
        # TODO $gameCatId
        $gameCatId = 1;
        $transactions_table  = self::TRXN_LOG;
        $error = 1;
        if(isset($result) && isset($result['error'])) {
            $error = $result['error'];
        }

        $transObj = new Transaction();
        $transId = $transObj->get_round_id('trans_id');

        $qry = <<<QRY
        INSERT INTO {$transactions_table} (trans_id, game_id, round_id, account_id,
                    game_category_id, channel_id, trans_type, amount_type,
                    amount, site_id, operator_id, session_id, currency, error,
                    processed, note)
             VALUES($transId, $gameId, $roundId, $accountId, '$gameCatId', $channelId,
                    $transType, $amountType, $amount, $siteId, $operatorId,
                    '{$sessionId}', '{$currency}', $error, $processed, '{$note}')
QRY;
        $db->runQuery($qry)  or ErrorHandler::handleError(1, "TRANS_ERR001",
            "Error: Transaction log".$qry);

        $qry = 'SELECT LAST_INSERT_ID()';
        $result = $db->runQuery($qry);
        $row = $db->fetchRow($result);

        return $transId;
    }

    public static function updateTransaction($transId) {
        global $db;
        $transactions_table  = self::TRXN_LOG;

        $query =<<<QRY
            UPDATE {$transactions_table}
            SET processed=1
            WHERE trans_id = $transId
QRY;
        $db->runQuery($query);
    }

    public static function getBalance($token, $player_id, $context=null, $sess_id=null) {
        $result = array('error' => 0);

        $api_url = API_URL.'get-balance/';
        $method = 'POST';

        $api_params = json_encode(Array(
            "api_key"       => API_KEY,
        ));

        $auth_token = 'Token '.$sess_id;

        $headers = [
            'Authorization' => $auth_token,
            'Content-Type'  => 'application/json'
        ];

        header('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *');

        $server_resp = Service::sendRequest($api_params, API_KEY, $api_url, $method, $headers);
        $result = $server_resp;

        if( isset($server_resp['error']) ) {
            $result['error'] = $server_resp['error'];
        }
        else {
            $result['error'] = 0;
        }

        return $result;
    }

    public static function GetBalances ($token, $player_id, $context=null){
        return PlayerHelper::GetBalances($token, $player_id, $context);
    }

    public function get_round_id($category='trans_id') {
        $roundIdObj = new RoundId($category);
        $round_id = $roundIdObj->nextRoundId();
        unset($roundIdObj);

        return $round_id;
    }
}
