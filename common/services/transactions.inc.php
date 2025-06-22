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
        $operatorId, $sessionId, $currency, $cashAmount, $bonusAmount,
        $gameName, $spinType, $baseRoundId, $roundEndState, $note = 'debit',$promo_freespins = 0, $record_id=null, $context=Array())
    {
        $result = array('error' => 0);
        $processed = 0;
        $transObj = new Transaction();
        $transId = $transObj->getTransactionID('trans_id');

        Transaction::logTransaction($gameId, $roundId, $accountId,
            $gameCatId, $channelId, $transType, $amountType, $amount, $siteId,
            $operatorId, $sessionId, $currency, $note, $result, $processed,
            $cashAmount, $bonusAmount, $transId);
        $method_name = 'wallet/debit/';
        $transaction_type = 'wager';
        $api_url = API_URL.$method_name;
        $method = 'POST';
        $api_params = json_encode(Array(
            "api_key"       => API_KEY,
            "amount"        => $amount,
            "amount_type"	=> $amountType,
            "note"			=> $note,
            "game_name"		=> $gameName,
            "game_mode"		=> $spinType,
            "game_id"		=> $gameId,
            "game_category" => $gameCatId,
            "round_id"		=> 	$roundId,
            "currency"		=>	$currency, //"GBP"
            "transaction_id" => $transId,
            "transaction_type" => $transaction_type,
            "base_round_id" => $baseRoundId,
            "round_end_state" => $roundEndState,
            "platform"       => $channelId,
            "promo_freespins"  => $promo_freespins, // 21102020
	    "record_id"        => $record_id,   
            "context" => $context
        ));

        $headers = [
            'Authorization' => 'Token '.$sessionId,
            'Content-Type'  => 'application/json'
        ];

        #header('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
        #header('Content-Type: application/json');
        #header('Access-Control-Allow-Origin: *');

        $server_resp = Service::sendRequest($api_params, API_KEY, $api_url, $method, $headers);
        $result = $server_resp;

        if( isset($server_resp['error']) && $server_resp['error'] == 1 ) {
            $result['error'] = $server_resp['error'];
        }
        else {
            $result['error'] = 0;
            Transaction::updateTransaction($transId);
        }

        //Transaction::updateTransaction($transId);
        $result['transaction_id'] = $transId;

        return $result;
    }

    public static function CreditAmount($gameId, $roundId, $accountId, $gameCatId,
        $channelId, $transType, $amountType, $amount, $siteId, $operatorId,
        $sessionId, $currency, $cashAmount, $bonusAmount, $gameName, $spinType,
	$baseRoundId, $roundEndState, $note = 'credit',
	$promo_freespins = 0, $record_id=null, $context=Array())
    {
        $result = array('error' => 0);
        $processed = 0;
        $transObj = new Transaction();
        $transId = $transObj->getTransactionID('trans_id');

        Transaction::logTransaction($gameId, $roundId, $accountId,
            $gameCatId, $channelId, $transType, $amountType, $amount, $siteId,
            $operatorId, $sessionId, $currency, $note, $result, $processed,
            $cashAmount, $bonusAmount, $transId);
        $method_name = 'wallet/credit/';
        $transaction_type = 'win';

        $api_url = API_URL.$method_name;
        $method = 'POST';

        $api_params = json_encode(Array(
            "api_key"       => API_KEY,
            "amount"        => $amount,
            "amount_type"	=> $amountType,
            "note"			=> $note,
            "game_name"		=> $gameName,
            "game_mode"		=> $spinType,
            "game_id"		=> $gameId,
            "game_category" => $gameCatId,
            "round_id"		=> 	$roundId,
            "currency"		=>	$currency, //"GBP"
            "transaction_id" => $transId,
            "transaction_type" => $transaction_type,
            "base_round_id" => $baseRoundId,
            "round_end_state" => $roundEndState,
	    "platform"         => $channelId,
	    "promo_freespins"  => $promo_freespins, // 21102020
	    "record_id"        => $record_id,       // 21102020
        "context"          => $context
    ));


        $headers = [
            'Authorization' => 'Token '.$sessionId,
            'Content-Type'  => 'application/json'
        ];

        #header('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
        #header('Content-Type: application/json');
        #header('Access-Control-Allow-Origin: *');

        $server_resp = Service::sendRequest($api_params, API_KEY, $api_url, $method, $headers);
        $result = $server_resp;

        if( isset($server_resp['error']) && $server_resp['error'] == 1 ) {
            $result['error'] = $server_resp['error'];
        }
        else {
            $result['error'] = 0;
            Transaction::updateTransaction($transId);
        }

        $result['transaction_id'] = $transId;
        //Transaction::updateTransaction($transId);

        return $result;
    }

    private static function logTransaction($gameId, $roundId, $accountId, $gameCatId,
        $channelId, $transType, $amountType, $amount, $siteId, $operatorId,
        $sessionId, $currency, $note, $result, $processed, $cashAmount,
        $bonusAmount, $transId)
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

        # we do not need to log when win amount is 0 for credit request
        if($transType == self::TRXN_WINNING && $amount <= 0) {
            return;
        }

        $qry = <<<QRY
        INSERT INTO {$transactions_table} (trans_id, game_id, round_id, account_id,
                    game_category_id, channel_id, trans_type, amount_type,
                    amount, site_id, operator_id, session_id, currency, error,
                    processed, note, cash_amount, bonus_amount)
             VALUES($transId, $gameId, $roundId, $accountId, '$gameCatId', $channelId,
                    $transType, $amountType, $amount, $siteId, $operatorId,
                    '{$sessionId}', '{$currency}', $error, $processed, '{$note}',
                    $cashAmount, $bonusAmount)
QRY;
        $db->runQuery($qry)  or ErrorHandler::handleError(1, "TRANS_ERR001",
            "Error: Transaction log");
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

    public static function getBalance($token, $player_id, $context=null,
            $sess_id=null, $game_id=null, $channel=null) {
        $result = array('error' => 0);

        $api_url = API_URL.'wallet/get-balance/';
        $method = 'POST';

        $api_params = json_encode(Array(
            "api_key"       => API_KEY,
            "game_id"       => $game_id,
            "platform"       => $channel,
        ));

        $auth_token = 'Token '.$sess_id;

        $headers = [
            'Authorization' => $auth_token,
            'Content-Type'  => 'application/json'
        ];

        #header('<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
        #header('Content-Type: application/json');
        #header('Access-Control-Allow-Origin: *');

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

    public static function GetBalances ($token, $player_id, $context=null) {
        return PlayerHelper::GetBalances($token, $player_id, $context);
    }

    public static function endGameRound($roundId, $sessionId) {
        $result = array('error' => 0);

        $api_url = API_URL.'games/game-round-end/';
        $method = 'POST';
        $auth_token = 'Token '.$sessionId;
        $transObj = new Transaction();
        $transId = $transObj->getTransactionID('trans_id');
        $headers = [
            'Authorization' => $auth_token,
            'Content-Type'  => 'application/json'];
        $api_params = json_encode(Array(
            "api_key"       => API_KEY,
            "round_id"      => $roundId,
            "transaction_id"=> $transId
        ));

        $server_resp = Service::sendRequest($api_params, API_KEY, $api_url, $method, $headers);
        $result = $server_resp;

        if( isset($server_resp['error'])) {
            $result['error'] = $server_resp['error'];
        }
        else {
            $result['error'] = 0;
        }

        return $result;
    }

    public function getTransactionID($category='trans_id') {
        $roundIdObj = new RoundId($category);
        $round_id = $roundIdObj->nextRoundId();
        unset($roundIdObj);

        return $round_id;
    }

    public static function endPFSGame($gameType, $gameId, $accountId,
        $amountType, $sessionId, $pfs_round_id=null, $note = 'end_pfs')
    {
        //return;
        $result = array('error' => 0);
        $method_name = 'games/end-pfs/';

        $api_url = API_URL.$method_name;
        $method = 'POST';

    	$api_params = json_encode(Array(
                "api_key"       => API_KEY,
                "amount_type"   => $amountType,
                "note"          => $note,
                "game_id"       => $gameId,
                "player_id"     => $accountId,
                "game_category" => $gameType,
                "record_id"     => $pfs_round_id,
            ));

		$headers = [
            'Authorization' => 'Token '.$sessionId,
            'Content-Type'  => 'application/json'
        ];

        $server_resp = Service::sendRequest($api_params, API_KEY, $api_url, $method, $headers);
        $result = $server_resp;

        if( isset($server_resp['error']) && $server_resp['error'] == 1 ) {
            $result['error'] = $server_resp['error'];
        }

        return $result;
    }

    public static function endPFSGame2($gameId, $roundId, $accountId, $gameCatId,
        $channelId, $transType, $amountType, $amount, $siteId, $operatorId,
        $sessionId, $currency, $cashAmount, $bonusAmount, $gameName, $spinType,
	    $baseRoundId, $roundEndState, $note = 'credit', $promoFreespins = 0, $PfsRoundId=null)
    {
        $result = array('error' => 0);
        $transObj = new Transaction();
        $transId = $transObj->getTransactionID('trans_id');

        $method_name = 'games/end-pfs/';
        $transaction_type = 'win';

        $api_url = API_URL.$method_name;
        $method = 'POST';

        $api_params = json_encode(Array(
            "api_key"       => API_KEY,
            "amount"        => $amount,
            "amount_type"	=> $amountType,
            "note"			=> $note,
            "game_name"		=> $gameName,
            "game_mode"		=> $spinType,
            "game_id"		=> $gameId,
            "game_category" => $gameCatId,
            "round_id"		=> 	$roundId,
            "currency"		=>	$currency,
            "transaction_id" => $transId,
            "transaction_type" => $transaction_type,
            "base_round_id" => $baseRoundId,
            "round_end_state" => $roundEndState,
            "platform"       => $channelId,
            "promo_freespins" => $promoFreespins,
            "record_id"       => $PfsRoundId,
            "context" => Array()
        ));

        $headers = [
            'Authorization' => 'Token '.$sessionId,
            'Content-Type'  => 'application/json'
        ];

        $server_resp = Service::sendRequest($api_params, API_KEY, $api_url, $method, $headers);
        $result = $server_resp;

        if( isset($server_resp['error']) && $server_resp['error'] == 1 ) {
            $result['error'] = $server_resp['error'];
        }
        else {
            $result['error'] = 0;
        }

        $result['transaction_id'] = $transId;

        return $result;
    }
    public static function callGameLauncher($api_key, $sessionId, $provider,
        $game_type,$game_id,$platform, $language, $amount_type, $context,
        $deposit_url, $lobby_url, $clientid=null, $player_ip=null)
    {
        $result = array('error' => 0);
        $method_name = 'games/game-launch/';

        $api_url = API_URL.$method_name;

        $method = 'POST';

        $api_params = json_encode(Array(
            "api_key"       => $api_key,
            "session_id"    => $sessionId,
            "provider"      => $provider,
            "game_type"     => $game_type,
            "game_id"       => $game_id,
            "platform"      => $platform,
            "language"      => $language,
            "amount_type"   => $amount_type,
            "context"       => $context,
            "deposit_url"   => $deposit_url,
            "lobby_url"     => $lobby_url,
            "client_id"     => $clientid,
            "player_ip"     => $player_ip
        ));

        $server_resp = Service::sendRequest($api_params,API_KEY, $api_url, $method);
        $result = $server_resp;

        if( isset($server_resp['error']) && $server_resp['error'] == 1 ) {
            $result['error'] = $server_resp['error'];
        }

        return $result;
    }
}
?>
