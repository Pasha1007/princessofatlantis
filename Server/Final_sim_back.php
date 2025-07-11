<?php
ini_set("display_errors", 0);
// ini_set("display_errors", 1); error_reporting(E_ALL);
header('Content-Type: application/json');
date_default_timezone_set('Asia/Kolkata');
header('Access-Control-Allow-Origin: *');
define("ENGINE_MODE_SIMULATION", True);
ini_set('max_execution_time', 0);
global $db;
#===================================================
require_once("server.php");
#=====================================================
class Simulation
{
    var $total_bet_simulation, $total_normal_win, $total_scatter, $total_scatter_win,
    $total_free_game, $total_free_game_win, $total_respin, $total_respin_win, $total_free_game_respin, $total_free_game_respin_win,
    $total_bonus1, $total_bonus1_win, $total_bonus2, $total_bonus2_win, $total_win_simulation, $username_sim, $coin_value_sim,
    $counter, $percentage, $repeat_num_Normal, $repeat_num_FS, $cycle, $game_name, $game_id, $account_id, $requestType, $num_coins_sim,
    $num_betlines_sim, $initial_cycle, $server_response, $message, $maxWin, $maxMultiplier, $num_row, $num_col, $min_coins, $max_coins,
    $total_normal_win_occ, $totalBG1Occurance, $totalBG1WinOccurance, $totalBG1, $totalBG2Occurance, $totalBG2WinOccurance, $totalBG2,
    $totalBG3Occurance, $totalBG3WinOccurance, $totalBG3, $totalBG4Occurance, $totalBG4WinOccurance, $totalBG4, $nacroBonus1Occ, $nacroBonus1Win,
    $nacroBonus2Occ, $nacroBonus2Win, $random_sym,$bonusBaseGameOcc, $bonusFreeGameOcc,$bonusBaseGameWin, $bonusFreeGameWin, $total_scatter_occ,
    $freeGamebaseWin,$freeGameSpecialSymbolWinOcc, $finalWin, $stickyWildWinOne, $stickyWildWinTwo, $stickyWildWinThree, $stickyWildWinFour,
    $freeGameMaxWin,$freeGameMaxWinSelectMulti,$nacroBonus1MaxWin,$nacroBonus2MaxWin,$final_max_win,$oneRoundWin;
    #====================================================
    public function __construct()
    {
        $this->total_bet_simulation = 0;
        $this->total_normal_win = 0;
        $this->total_scatter = 0;
        $this->total_scatter_win = 0;
        $this->total_free_game = 0;
        $this->total_free_game_win = 0;
        $this->total_respin = 0;
        $this->total_respin_win = 0;
        $this->total_free_game_respin = 0;
        $this->total_free_game_respin_win = 0;
        $this->total_bonus1 = 0;
        $this->total_bonus1_win = 0;
        $this->total_bonus2 = 0;
        $this->total_bonus2_win = 0;
        $this->total_win_simulation = 0;
        $this->username_sim = 'pg1';
        $this->coin_value_sim = 1;
        $this->counter = 0;
        $this->percentage = 1;
        $this->message = array();
        $this->maxWin = 0;
        $this->maxMultiplier = 0;
        $this->num_row = 0;
        $this->num_col = 0;
        $this->min_coins = 0;
        $this->max_coins = 0;
        $this->total_normal_win_occ = 0;
        $this->totalBG1Occurance = 0;
        $this->totalBG1WinOccurance = 0;
        $this->totalBG1 = 0;
        $this->totalBG2Occurance = 0;
        $this->totalBG2WinOccurance = 0;
        $this->totalBG2 = 0;
        $this->totalBG3Occurance = 0;
        $this->totalBG3WinOccurance = 0;
        $this->totalBG3 = 0;
        $this->totalBG4Occurance = 0;
        $this->totalBG4WinOccurance = 0;
        $this->totalBG4 = 0;
        $this->nacroBonus1Occ = 0;
        $this->nacroBonus2Occ = 0;
        $this->nacroBonus2Win = 0;
        $this->nacroBonus2Win = 0;
        $this->bonusBaseGameOcc = 0;
        $this->bonusBaseGameWin = 0;
        $this->freeGamebaseWin = 0;
        $this->bonusFreeGameOcc = 0;
        $this->bonusFreeGameWin = 0;
        $this->stickyWildWinOne = 0;
        $this->stickyWildWinTwo = 0;
        $this->stickyWildWinThree = 0;
        $this->stickyWildWinFour = 0;
        $this->nacroBonus1MaxWin = 0;
        $this->nacroBonus2MaxWin = 0;
        $this->freeGameMaxWin = 0;
        $this->freeGameMaxWinSelectMulti = 0;
        $this->final_max_win = 0;
        $this->oneRoundWin = 0;
        $this->random_sym = array(
        "a" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0),"reel_occ"=>array("3"=>0,"4"=>0,"5"=>0)), 
        "b" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0),"reel_occ"=>array("3"=>0,"4"=>0,"5"=>0)), 
        "c" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0),"reel_occ"=>array("3"=>0,"4"=>0,"5"=>0)), 
        "d" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0),"reel_occ"=>array("3"=>0,"4"=>0,"5"=>0)), 
        "e" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0),"reel_occ"=>array("3"=>0,"4"=>0,"5"=>0)));
        $this->total_scatter_occ = array("base_game"=>array("3"=>0,"4"=>0,"5"=>0),"base_1"=>array("3"=>0,"4"=>0,"5"=>0),"base_2"=>array("3"=>0,"4"=>0,"5"=>0),"base_3"=>array("3"=>0,"4"=>0,"5"=>0));
        // $this->$finalWin = array();
        $this->repeat_num_Normal = array(
            "5w" => 0,
            "4w" => 0,
            "3w" => 0,
            "2w" => 0,
            "5s" => 0,
            "4s" => 0,
            "3s" => 0,
            "2s" => 0,
            "5a" => 0,
            "4a" => 0,
            "3a" => 0,
            "2a" => 0,
            "5b" => 0,
            "4b" => 0,
            "3b" => 0,
            "2b" => 0,
            "5c" => 0,
            "4c" => 0,
            "3c" => 0,
            "2c" => 0,
            "5d" => 0,
            "4d" => 0,
            "3d" => 0,
            "5e" => 0,
            "4e" => 0,
            "3e" => 0,
            "5f" => 0,
            "4f" => 0,
            "3f" => 0,
            "5g" => 0,
            "4g" => 0,
            "3g" => 0,
            "5h" => 0,
            "4h" => 0,
            "3h" => 0,
            "5i" => 0,
            "4i" => 0,
            "3i" => 0,
            "5j" => 0,
            "4j" => 0,
            "3j" => 0,
            "5k" => 0,
            "4k" => 0,
            "3k" => 0
        );

        $this->repeat_num_FS = array(
            "5w" => 0,
            "4w" => 0,
            "3w" => 0,
            "2w" => 0,
            "5s" => 0,
            "4s" => 0,
            "3s" => 0,
            "2s" => 0,
            "5a" => 0,
            "4a" => 0,
            "3a" => 0,
            "2a" => 0,
            "5b" => 0,
            "4b" => 0,
            "3b" => 0,
            "2b" => 0,
            "5c" => 0,
            "4c" => 0,
            "3c" => 0,
            "2c" => 0,
            "5d" => 0,
            "4d" => 0,
            "3d" => 0,
            "5e" => 0,
            "4e" => 0,
            "3e" => 0,
            "5f" => 0,
            "4f" => 0,
            "3f" => 0,
            "5g" => 0,
            "4g" => 0,
            "3g" => 0,
            "5h" => 0,
            "4h" => 0,
            "3h" => 0,
            "5i" => 0,
            "4i" => 0,
            "3i" => 0,
            "5j" => 0,
            "4j" => 0,
            "3j" => 0,
            "5k" => 0,
            "4k" => 0,
            "3k" => 0
        );
        // print_r($_POST);
        // $this->handleSpin($_POST);

    }

    public function handleSpin($requestParams)
    {
        // $this = ne Simulation();
        $this->total_bet_simulation = 0;
        $this->total_normal_win = 0;
        $this->total_scatter = 0;
        $this->total_scatter_win = 0;
        $this->total_free_game = 0;
        $this->total_free_game_win = 0;
        $this->total_respin = 0;
        $this->total_respin_win = 0;
        $this->total_free_game_respin = 0;
        $this->total_free_game_respin_win = 0;
        $this->total_bonus1 = 0;
        $this->total_bonus1_win = 0;
        $this->total_bonus2 = 0;
        $this->total_bonus2_win = 0;
        $this->total_win_simulation = 0;
        $this->username_sim = 'pg1';
        $this->counter = 0;
        $this->percentage = 1;
        $this->total_normal_win_occ = 0;
        $this->message = array();
        $this->totalBG1Occurance = 0;
        $this->totalBG1WinOccurance = 0;
        $this->totalBG1 = 0;
        $this->totalBG2Occurance = 0;
        $this->totalBG2WinOccurance = 0;
        $this->totalBG2 = 0;
        $this->totalBG3Occurance = 0;
        $this->totalBG3WinOccurance = 0;
        $this->totalBG3 = 0;
        $this->totalBG4Occurance = 0;
        $this->totalBG4WinOccurance = 0;
        $this->totalBG4 = 0;
        $this->nacroBonus1Occ = 0;
        $this->nacroBonus1Win = 0;
        $this->nacroBonus2Occ = 0;
        $this->nacroBonus2Win = 0;
        $this->bonusBaseGameOcc = 0;
        $this->bonusFreeGameOcc = 0;
        $this->bonusFreeGameWin = 0;
        $this->bonusFreeGameWin = 0;
        $this->freeGamebaseWin = 0;
        $this->nacroBonus1MaxWin = 0;
        $this->nacroBonus2MaxWin = 0;
        $this->freeGameMaxWin = 0;
        $this->freeGameMaxWinSelectMulti = 0;
        $this->random_sym = array(
            "a" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0)), 
            "b" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0)), 
            "c" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0)), 
            "d" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0)), 
            "e" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0)));
        $this->total_scatter_occ = array("base_game"=>array("3"=>0,"4"=>0,"5"=>0),"base_1"=>array("3"=>0,"4"=>0,"5"=>0),"base_2"=>array("3"=>0,"4"=>0,"5"=>0),"base_3"=>array("3"=>0,"4"=>0,"5"=>0));
        $this->repeat_num_Normal = array(
            "5w" => 0,
            "4w" => 0,
            "3w" => 0,
            "2w" => 0,
            "5s" => 0,
            "4s" => 0,
            "3s" => 0,
            "2s" => 0,
            "5a" => 0,
            "4a" => 0,
            "3a" => 0,
            "2a" => 0,
            "5b" => 0,
            "4b" => 0,
            "3b" => 0,
            "2b" => 0,
            "5c" => 0,
            "4c" => 0,
            "3c" => 0,
            "2c" => 0,
            "5d" => 0,
            "4d" => 0,
            "3d" => 0,
            "5e" => 0,
            "4e" => 0,
            "3e" => 0,
            "5f" => 0,
            "4f" => 0,
            "3f" => 0,
            "5g" => 0,
            "4g" => 0,
            "3g" => 0,
            "5h" => 0,
            "4h" => 0,
            "3h" => 0,
            "5i" => 0,
            "4i" => 0,
            "3i" => 0,
            "5j" => 0,
            "4j" => 0,
            "3j" => 0,
            "5k" => 0,
            "4k" => 0,
            "3k" => 0
        );

        global $stickWildFlag;
        $this->repeat_num_FS = array(
            "5w" => 0,
            "4w" => 0,
            "3w" => 0,
            "2w" => 0,
            "5s" => 0,
            "4s" => 0,
            "3s" => 0,
            "2s" => 0,
            "5a" => 0,
            "4a" => 0,
            "3a" => 0,
            "2a" => 0,
            "5b" => 0,
            "4b" => 0,
            "3b" => 0,
            "2b" => 0,
            "5c" => 0,
            "4c" => 0,
            "3c" => 0,
            "2c" => 0,
            "5d" => 0,
            "4d" => 0,
            "3d" => 0,
            "5e" => 0,
            "4e" => 0,
            "3e" => 0,
            "5f" => 0,
            "4f" => 0,
            "3f" => 0,
            "5g" => 0,
            "4g" => 0,
            "3g" => 0,
            "5h" => 0,
            "4h" => 0,
            "3h" => 0,
            "5i" => 0,
            "4i" => 0,
            "3i" => 0,
            "5j" => 0,
            "4j" => 0,
            "3j" => 0,
            "5k" => 0,
            "4k" => 0,
            "3k" => 0
        );
        $start_time = time();
        $timeStamps = [];
        array_push($timeStamps, $start_time);
        $end_date = "";
        // $end_date_time = "";
        #====================================================
        global $db, $server_response;
        $this->cycle = $requestParams["cycle"];
        $this->game_name = $requestParams["game_name"];
        $this->game_id = $requestParams["game_id"];
        $this->account_id = $requestParams["account_id"];
        #====================================================
        $status = ($this->cycle * $this->counter) / 100;
        $status = (string) $status;
        $this->cycle = (int) $this->cycle;
        $this->account_id = (int) $this->account_id;
        $this->game_name = (string) $this->game_name;
        #====================================================
        $request_params_sim = array();
        $start_date_time = date("M,d,Y h:i:s A");
        // session_destroy();
        // session_start();
        global $game_fs;
        global $bonus_fs;
        global $freegame_fs;
        global $bonusgame_fs;
        $game_fs = array();
        $bonus_fs = array();
        $freegame_fs = array();
        $bonusgame_fs = array();
        // if(session_status() === PHP_SESSION_NONE) session_start();
        // $_SESSION["game"] = array();
        $g_quey = <<<QUERY
        SELECT game_id, sub_game_id, game_name, title, description, num_rows,
        num_columns, min_coins, max_coins, default_coins, default_coin_value,
        coin_values, paylines, elements, wilds, bonus, scatters, symbol_config,
        reels, reelset_config, pay_table, bonus_config, wild_multiplier,
        pjp_config, unity_symbols, left2right, right2left, enabled,
        fixed_coins, paylines_type, spin_type, misc, rtp
        FROM  game.slots
        WHERE game_id = {$this->game_id};
        
QUERY;
        // echo $g_quey;
        $re = $db->runQuery($g_quey) or ErrorHandler::handleError(1, "GAMBLE_0005");
        if ($db->numRows($re) > 0) {
        while ($row1 = $db->fetchAssoc($re)) {
            $game_fs["gameName"] = $row1['game_name'];
                $game_fs["gameId"]=$row1['game_id'];
                $game_fs["subGameId"]= 1;
                $game_fs["gameName "]= $row1['game_name'];
                $game_fs["title"]= $row1['title'];
                $game_fs["description"]= $row1['description'];
                $game_fs["numRows"]= $row1['num_rows'];
                $game_fs["numColumns"]= $row1['num_columns'];
                $game_fs["minCoins"]= $row1['min_coins'];
                $game_fs["maxCoins"]= $row1['max_coins'];
                $game_fs["defaultCoins"]= $row1['default_coins'];
                $game_fs["defaultCoinValue"]= $row1['default_coin_value'];
                $game_fs["paylines"]= $row1['paylines'];
                $game_fs["coinValues"]= decode_object($row1['coin_values']);
                $game_fs["elements"]= decode_object($row1['elements']);
                $game_fs["wilds"]= decode_object($row1['wilds']);
                $game_fs["bonus"]= decode_object($row1['bonus']);
                $game_fs["scatters"]= decode_object($row1['scatters']);
                $game_fs["symbolConfig"]= decode_object($row1['symbol_config']);
                $game_fs["reels".$row1['sub_game_id']]= decode_object($row1['reels']);
                $game_fs["reelsetConfig"]= decode_object($row1['reelset_config']);
                $game_fs["payTable"]= decode_object($row1['pay_table']);
                $game_fs["pjpConfig"]= decode_object($row1['pjp_config']);
                $game_fs["unitySymbols"]= decode_object($row1['unity_symbols']);
                $game_fs["wildMultiplier"]= decode_object($row1['wild_multiplier']);
                $game_fs["left2Right"]= $row1['left2right'];
                $game_fs["right2Left"]= $row1['right2left'];
                $game_fs["enabled"]= $row1['enabled'];
                $game_fs["fixedCoins"]= $row1['fixed_coins'];
                $game_fs["paylinesType"]= $row1['paylines_type'];
                $game_fs["spinType"]= $row1['spin_type'];
                $game_fs["misc"]= decode_object($row1['misc']);
                $game_fs["rtp"]= $row1['rtp'];
                $game_fs["bonusConfig".$row1['sub_game_id']]= decode_object($row1['bonus_config']);
                $game_fs["bonusConfig"]= "";
                // ));
        
        }
    }
    $bg_quey = <<<QUERY
    SELECT *
    FROM  game.bonus_config
        WHERE game_name = '$this->game_name';
    
QUERY;
    $b_re = $db->runQuery($bg_quey) or ErrorHandler::handleError(1, "GAMBLE_0005");
    if ($db->numRows($b_re) > 0) {
        while ($row2 = $db->fetchAssoc($b_re)) {
                // print_r($row2);
                $bonus_fs[$row2['bonus_game_id']]= $row2["configuration"];
        }
    }
        // print_r($_SESSION);
        $c_query = <<<QUERY
        Select coin_values from game.currency where game_name = '$this->game_name'
QUERY;
        $c_r = $db->runQuery($c_query) or ErrorHandler::handleError(1, "GAMBLE_0005");
        $row_data_curr = $db->fetchAssoc($c_r);
        #====================================================
        $coin_val = json_decode($row_data_curr['coin_values']);
        $this->num_coins_sim = $_SESSION["game"]['paylines'];
        $this->num_betlines_sim = $_SESSION["game"]['defaultCoins'];
        $this->num_row = $_SESSION["game"]['numRows'];
        $this->num_col = $_SESSION["game"]['numColumns'];
        $this->min_coins = $coin_val[0] / 100;
        $this->max_coins = $coin_val[count($coin_val) - 1] / 100;
        $this->coin_value_sim = 5;
        $timeCount = 0;
        $game_id = $this->game_id;
        // for ($i = 1; $i <= $this->cycle; $i++) {
            for ($i = 1; $i <= $this->cycle ; $i++) {
                $this->oneRoundWin = 0;
                $state_query = <<<QUERY
                Select * from simulation.simulationlogs where state = 0 ORDER BY id DESC LIMIT 1
QUERY;
            $resultq2_test_1 = $db->runQuery($state_query);
            if ($db->numRows($resultq2_test_1) < 0) {
                break;
            }

            if (($i % ($this->cycle / 100)) == 0) {
                $current_timestamp = time();
                array_push($timeStamps, $current_timestamp);
                $time_difference = ($timeStamps[count($timeStamps) - 1] - $timeStamps[count($timeStamps) - 2]);
                $end_timestamp = $timeStamps[count($timeStamps) - 2] + ($time_difference * (100 - ($timeCount)));
                $end_date = date("Y-m-d H:i:s", $end_timestamp);
                $timeCount++;
                $per = ($this->percentage / $this->cycle) * 100;
                $updateq1 = "UPDATE simulation.simulationlogs SET completed=$per,expacted_date = '$end_date'  ,total_win=$this->total_normal_win + $this->total_free_game_win + $this->total_free_game_respin_win + $this->total_respin_win,
                        total_bet=$this->total_bet_simulation WHERE  state = 0 and user_id = $this->account_id and game_id = $this->game_id";
                $resultq2 = $db->runQuery($updateq1);
            }
            $this->percentage++;
            $this->counter++;
            $this->total_bet_simulation += $this->num_betlines_sim;
            #=========================================================
            $request_params_sim['game_id'] = $this->game_id;
            $request_params_sim['request_type'] = 2;
            $request_params_sim['amount_type'] = 1;
            $request_params_sim['sub_game_id'] = 1;
            $request_params_sim['coin_value'] = $this->coin_value_sim;
            $request_params_sim['num_coins'] = $this->num_coins_sim;
            $request_params_sim['num_betlines'] = $this->num_coins_sim;
            $request_params_sim['account_id'] = $this->account_id;
            $request_params_sim['username'] = $this->username_sim;
            $request_params_sim['session_id'] = "";
            $request_params_sim['platform_type'] = "desktop";
            #====================================================
            $_POST = $request_params_sim;
            $request_params = $request_params_sim;
            $res = s_main($request_params);
            print_r($server_response);
            // echo "finish";
            if ($this->maxWin < $server_response["current_round"]["win_amount"]) {
                $this->maxWin = $server_response["current_round"]["win_amount"];
            }
            $details = $server_response["current_round"]['payline_wins']['details'];
            // echo $details;
            $str_arr = explode(";", $details);
            for ($k = 0; $k < count($str_arr); $k++) {
                $win_f = explode(":", $str_arr[$k]);
                if (array_key_exists($win_f[3] . $win_f[5], $this->repeat_num_Normal)) {
                    $this->repeat_num_Normal[$win_f[3] . $win_f[5]] += 1;
                }
            }
            if (!$stickWildFlag) {
                $this->oneRoundWin += $server_response["current_round"]["win_amount"];

                if( $server_response["current_round"]["win_amount"] > 0){
                    $this->total_normal_win_occ += 1;
                    $this->total_normal_win += $server_response["current_round"]["win_amount"];
                }
            }
            if ($server_response["current_round"]["post_matrix_info"]) {
                if ($resp['feature_name'] == "StickyWild" && $resp['bonus'] == "Wild1") {
                    // print_r($server_response["current_round"]['scattersCount']);
                    $this->total_scatter_occ["base_1"][$server_response["current_round"]['scattersCount']['s']] += 1;
                }
                elseif ($resp['feature_name'] == "StickyWild" && $resp['bonus'] == "Wild2") {
                    $this->total_scatter_occ["base_2"][$server_response["current_round"]['scattersCount']['s']] += 1;
                }
                elseif ($resp['feature_name'] == "StickyWild" && $resp['bonus'] == "Wild3") {
                    $this->total_scatter_occ["base_3"][$server_response["current_round"]['scattersCount']['s']] += 1;
                }
            }
            else{
                $this->total_scatter_occ["base_game"][$server_response["current_round"]['scattersCount']['s']] += 1;
            }


            if ($server_response["current_round"]["bonus_games_won"]) {
                $resp = $server_response["current_round"]["bonus_games_won"];
                $this->total_scatter_win += $server_response["current_round"]["sctter_win"] * $this->num_betlines_sim;
                if (array_key_exists("bonus_game_id", $resp[0]) && $resp[0]['bonus_game_id'] == 380001) {
                    $this->total_free_game++;
                    $this->total_scatter += 1;
                    switch ($i) {
                        case (($i / ($this->cycle / 5)) < 1):
                            $request_params_sim['sub_game_id'] = "2";
                            $request_params_sim['pick_position'] = "1";
                            break;
                        case (($i / ($this->cycle / 5)) < 2):
                            $request_params_sim['sub_game_id'] = "3";
                            $request_params_sim['pick_position'] = "2";
                            break;
                        case (($i / ($this->cycle / 5)) < 3):
                            $request_params_sim['sub_game_id'] = "4";
                            $request_params_sim['pick_position'] = "3";
                            break;
                        case (($i / ($this->cycle / 5)) < 4):
                            $request_params_sim['sub_game_id'] = "5";
                            $request_params_sim['pick_position'] = "4";
                            break;
                        case (($i / ($this->cycle / 5)) < 5):
                            $request_params_sim['sub_game_id'] = "1";
                            $request_params_sim['pick_position'] = "5";
                            break;
                    }
                    $sub_game = $request_params_sim['sub_game_id'];
                    // // $sub_game = $request_params_sim['sub_game_id'];
                    // $request_params_sim['pick_position'] = "2";
                    // $request_params_sim['sub_game_id'] = "3";
                    // $sub_game = 2;
                    $request_params_sim['pick_position'] = "1";
                    $bonus_game_id = $resp[0]['bonus_game_id'];
                    $request_params_sim['game_id'] = $this->game_id;
                    $request_params_sim['amount_type'] = 1;
                    $request_params_sim['username'] = $this->username_sim;
                    $request_params_sim['coin_value'] = $this->coin_value_sim;
                    $request_params_sim['num_coins'] = $this->num_coins_sim;
                    $request_params_sim['num_betlines'] = $this->num_betlines_sim;
                    $request_params_sim['session_id'] = "";
                    $request_params_sim['account_id'] = $this->account_id;
                    $request_params_sim['request_type'] = 3;
                    $request_params_sim['bonus_game_id'] = $bonus_game_id;
                    $_POST = $request_params_sim;
                    $request_params = $request_params_sim;
                    $res = s_main($request_params);

                    $num_s = $server_response["current_round"]["num_spins"];
                    $fsMul = $server_response["current_round"]["fs_multiplier"];

                    if ($fsMul > 1) {
                        $this->oneRoundWin += $server_response["current_round"]["win_amount"];
                        $this->total_free_game_win += $fsMul;
                    } else {
                        for ($j = 0; $j < $num_s; $j++) {
                            $request_params_sim['game_id'] = $this->game_id;
                            $request_params_sim['amount_type'] = 1;
                            $request_params_sim['username'] = $this->username_sim;
                            $request_params_sim['coin_value'] = $this->coin_value_sim;
                            $request_params_sim['num_coins'] = $this->num_coins_sim;
                            $request_params_sim['num_betlines'] = $this->num_betlines_sim;
                            $request_params_sim['session_id'] = "";
                            $request_params_sim['account_id'] = $this->account_id;
                            $request_params_sim['request_type'] = 2;
                            $request_params_sim['sub_game_id'] = $sub_game;
                            $request_params_sim['bonus_game_id'] = $bonus_game_id;
                            $_POST = $request_params_sim;
                            $request_params = $request_params_sim;
                            $res = s_main($request_params);

                            // print_r($_SESSION);
                            // print_r($server_response);
                            // if( $server_response["current_round"]["win_amount"] > $this->freeGameMaxWin){
                            //     $this->freeGameMaxWin = $server_response["current_round"]["win_amount"];
                            // }
                            $this->oneRoundWin += $server_response["current_round"]["win_amount"];
                            $this->total_free_game_win += $server_response["current_round"]["win_amount"];
                            $details = $server_response["current_round"]['payline_wins']['details'];
                            $str_arr = explode(";", $details);
                            // print_r($str_arr);

                            for ($k = 0; $k < count($str_arr); $k++) {
                                $win_f = explode(":", $str_arr[$k]);
                                if (array_key_exists($win_f[3] . $win_f[5], $this->repeat_num_FS)) {
                                    $this->repeat_num_FS[$win_f[3] . $win_f[5]] += 1;
                                }
                            }
                        }
                    }
                } elseif (array_key_exists("bonus_game_id", $resp[0]) && $resp[0]['bonus_game_id'] == 380002) {
                    $pick_pos = 1;
                    $this->nacroBonus1Occ += 1;
                    $bonus_game_id = $resp[0]['bonus_game_id'];
                    $request_params_sim['game_id'] = $this->game_id;
                    $request_params_sim['amount_type'] = 1;
                    $request_params_sim['coin_value'] = $this->coin_value_sim;
                    $request_params_sim['num_coins'] = $this->num_coins_sim;
                    $request_params_sim['num_betlines'] = $this->num_betlines_sim;
                    $request_params_sim['username'] = $this->username_sim;
                    $request_params_sim['session_id'] = "";
                    $request_params_sim['platform_type'] = "desktop";
                    $request_params_sim['request_type'] = 6;
                    $request_params_sim['sub_game_id'] = "1";
                    $request_params_sim['pick_position'] = $pick_pos;
                    $request_params_sim['bonus_game_id'] = $bonus_game_id;
                    $_POST = $request_params_sim;
                    $request_params = $request_params_sim;
                    $res = s_main($request_params);
                    $prize = $server_response["current_round"]["prize_value"];
                    $win_mul = $server_response["current_round"]["total_fs_win"];
                    while ($server_response["current_round"]["prize_value"] != "exit") {
                        $pick_pos += 1;
                        $bonus_game_id = $resp[0]['bonus_game_id'];
                        $request_params_sim['game_id'] = $this->game_id;
                        $request_params_sim['amount_type'] = 1;
                        $request_params_sim['coin_value'] = $this->coin_value_sim;
                        $request_params_sim['num_coins'] = $this->num_coins_sim;
                        $request_params_sim['num_betlines'] = $this->num_betlines_sim;
                        $request_params_sim['username'] = $this->username_sim;
                        $request_params_sim['session_id'] = "";
                        $request_params_sim['platform_type'] = "desktop";
                        $request_params_sim['request_type'] = 6;
                        $request_params_sim['sub_game_id'] = "1";
                        $request_params_sim['pick_position'] = $pick_pos;
                        $request_params_sim['bonus_game_id'] = $bonus_game_id;
                        $_POST = $request_params_sim;
                        $request_params = $request_params_sim;
                        $res = s_main($request_params);
                    }
                    // echo $server_response["current_round"]["prize_value"];
                    if ($server_response["current_round"]["prize_value"] == "exit") {
                        // if($this->nacroBonus1MaxWin < $server_response["current_round"]["total_fs_win"]){
                        //     $this->nacroBonus1MaxWin = $server_response["current_round"]["total_fs_win"];
                        // }
                        $this->oneRoundWin += $server_response["current_round"]["total_fs_win"];
                        $this->nacroBonus1Win += $server_response["current_round"]["total_fs_win"];
                    }
                } elseif (array_key_exists("bonus_game_id", $resp[0]) && $resp[0]['bonus_game_id'] == 380003) {
                    $pick_pos = 1;
                    $this->nacroBonus2Occ += 1;
                    $bonus_game_id = $resp[0]['bonus_game_id'];
                    $request_params_sim['game_id'] = $this->game_id;
                    $request_params_sim['amount_type'] = 1;
                    $request_params_sim['coin_value'] = $this->coin_value_sim;
                    $request_params_sim['num_coins'] = $this->num_coins_sim;
                    $request_params_sim['num_betlines'] = $this->num_betlines_sim;
                    $request_params_sim['username'] = $this->username_sim;
                    $request_params_sim['session_id'] = "";
                    $request_params_sim['platform_type'] = "desktop";
                    $request_params_sim['request_type'] = 6;
                    $request_params_sim['sub_game_id'] = "1";
                    $request_params_sim['pick_position'] = $pick_pos;
                    $request_params_sim['bonus_game_id'] = $bonus_game_id;
                    $_POST = $request_params_sim;
                    $request_params = $request_params_sim;
                    $res = s_main($request_params);
                    $prize = $server_response["current_round"]["prize_value"];
                    $win_mul = $server_response["current_round"]["total_fs_win"];
                    while ($server_response["current_round"]["prize_value"] != "exit") {
                        $pick_pos += 1;
                        $bonus_game_id = $resp[0]['bonus_game_id'];
                        $request_params_sim['game_id'] = $this->game_id;
                        $request_params_sim['amount_type'] = 1;
                        $request_params_sim['coin_value'] = $this->coin_value_sim;
                        $request_params_sim['num_coins'] = $this->num_coins_sim;
                        $request_params_sim['num_betlines'] = $this->num_betlines_sim;
                        $request_params_sim['username'] = $this->username_sim;
                        $request_params_sim['session_id'] = "";
                        $request_params_sim['platform_type'] = "desktop";
                        $request_params_sim['request_type'] = 6;
                        $request_params_sim['sub_game_id'] = "1";
                        $request_params_sim['pick_position'] = $pick_pos;
                        $request_params_sim['bonus_game_id'] = $bonus_game_id;
                        $_POST = $request_params_sim;
                        $request_params = $request_params_sim;
                        echo "6th req whilw";
                        $res = s_main($request_params);
                        echo "6th res whilw";
                        print_r($server_response);                    }
                    if ($server_response["current_round"]["prize_value"] == "exit") {
                        // if($this->nacroBonus2MaxWin < $server_response["current_round"]["total_fs_win"]){
                        //     $this->nacroBonus2MaxWin = $server_response["current_round"]["total_fs_win"];
                        // }
                        $this->oneRoundWin += $server_response["current_round"]["total_fs_win"];
                        $this->nacroBonus2Win += $server_response["current_round"]["total_fs_win"];
                    }
                } elseif (array_key_exists("bonus_game_id", $resp[0]) && $resp[0]['bonus_game_id'] == 380004){
                    // print_r($server_response["current_round"]);
                    // $this->callThirdReq($resp[0]['bonus_game_id'],1,1);
                    $request_params_sim['sub_game_id'] = 1;
                    $request_params_sim['pick_position'] = 2;
                    $request_params_sim['game_id'] = $this->game_id;
                    $request_params_sim['amount_type'] = 1;
                    $request_params_sim['username'] = $this->username_sim;
                    $request_params_sim['coin_value'] = $this->coin_value_sim;
                    $request_params_sim['num_coins'] = $this->num_coins_sim;
                    $request_params_sim['num_betlines'] = $this->num_betlines_sim;
                    $request_params_sim['session_id'] = "";
                    $request_params_sim['account_id'] = $this->account_id;
                    $request_params_sim['request_type'] = 3;
                    $request_params_sim['bonus_game_id'] = $resp[0]['bonus_game_id'];
                    $_POST = $request_params_sim;
                    $request_params = $request_params_sim;
                    $res = s_main($request_params);
                    // $num_s = $server_response["current_round"]["num_spins"];
                    $fsMul = $server_response["current_round"]["winAmount"];
                    $this->bonusBaseGameOcc++;
                    if ($fsMul > 0 ) {
                        $this->bonusBaseGameWin += $fsMul;
                    } 
                } elseif (array_key_exists('type', $resp[0])) {
                    if ($resp[0]['type'] == "freespins") {
                        
                        $this->total_scatter += 1;
                        $num_spins = $resp[0]['num_spins'];
                        for ($j = 0; $j < $num_spins; $j++) {
                            $request_params_sim['game_id'] = $this->game_id;
                            $request_params_sim['amount_type'] = 1;
                            $request_params_sim['sub_game_id'] = 2;
                            $request_params_sim['coin_value'] = $this->coin_value_sim;
                            $request_params_sim['num_coins'] = $this->num_coins_sim;
                            $request_params_sim['num_betlines'] = $this->num_betlines_sim;
                            $request_params_sim['username'] = $this->username_sim;
                            $request_params_sim['session_id'] = "";
                            $request_params_sim['platform_type'] = "desktop";
                            $request_params_sim['request_type'] = 2;
                            $_POST = $request_params_sim;
                            $request_params = $request_params_sim;
                            $res = s_main($request_params);
                            $this->freeGamebaseWin += $server_response["current_round"]["payline_win_amount"];
                            // if( $server_response["current_round"]["win_amount"] > $this->freeGameMaxWin){
                            //     $this->freeGameMaxWin = $server_response["current_round"]["win_amount"];
                            // }
                            $this->oneRoundWin += $server_response["current_round"]["win_amount"];
                            // $this->random_sym[$resp[0]['symbol']]["base_win"] += $server_response["current_round"]["payline_win_amount"];
                            $this->total_free_game_win += $server_response["current_round"]["win_amount"];
                            $resp_b = $server_response["current_round"]["bonus_games_won"];
                            if (isset($resp_b) && isset($resp_b[0]) && array_key_exists("bonus_game_id", $resp_b[0]) && $resp_b[0]['bonus_game_id'] == 380004){
                                $request_params_sim['sub_game_id'] = 2;
                                $request_params_sim['pick_position'] = 2;
                                $request_params_sim['game_id'] = $this->game_id;
                                $request_params_sim['amount_type'] = 1;
                                $request_params_sim['username'] = $this->username_sim;
                                $request_params_sim['coin_value'] = $this->coin_value_sim;
                                $request_params_sim['num_coins'] = $this->num_coins_sim;
                                $request_params_sim['num_betlines'] = $this->num_betlines_sim;
                                $request_params_sim['session_id'] = "";
                                $request_params_sim['account_id'] = $this->account_id;
                                $request_params_sim['request_type'] = 3;
                                $request_params_sim['bonus_game_id'] = $resp_b[0]['bonus_game_id'];
                                $_POST = $request_params_sim;
                                $request_params = $request_params_sim;
                                $res = s_main($request_params);
                                // $num_s = $server_response["current_round"]["num_spins"];
                                $fsMul = $server_response["current_round"]["winAmount"];
                                $this->bonusFreeGameOcc++;
                                if ($fsMul > 0 ) {
                                    $this->bonusFreeGameWin += $fsMul;
                                } 
                            }
                        }
                    }
                }
            } elseif ($server_response["current_round"]["post_matrix_info"]) {
                $resp = $server_response["current_round"]["post_matrix_info"];
                if ($resp['feature_name'] == "StickyWild" && $resp['bonus'] == "Wild1") {
                    // $this->total_scatter_occ["base_1"][$server_response["current_round"]['scattersCount']['total']] += 1;
                    $this->totalBG1Occurance++;
                    if ($server_response["current_round"]["win_amount"] > 0) {
                        $this->totalBG1WinOccurance++;
                        $this->totalBG1 += $server_response["current_round"]["win_amount"];
                        $this->oneRoundWin += $server_response["current_round"]["win_amount"];
                        // if($server_response["current_round"]["win_amount"] > $this->stickyWildWinOne){
                        //     $this->stickyWildWinOne = $server_response["current_round"]["win_amount"];
                        // }
                    }
                } elseif ($resp['feature_name'] == "StickyWild" && $resp['bonus'] == "Wild2") {
                    // $this->total_scatter_occ["base_2"][$server_response["current_round"]['scattersCount']['total']] += 1;

                    $this->totalBG2Occurance++;
                    if ($server_response["current_round"]["win_amount"] > 0) {
                        $this->totalBG2WinOccurance++;
                        $this->totalBG2 += $server_response["current_round"]["win_amount"];
                        $this->oneRoundWin += $server_response["current_round"]["win_amount"];
                        // if($server_response["current_round"]["win_amount"] > $this->stickyWildWinTwo){
                        //     $this->stickyWildWinTwo = $server_response["current_round"]["win_amount"];
                        // }
                    }
                } elseif ($resp['feature_name'] == "StickyWild" && $resp['bonus'] == "Wild3") {
                    // $this->total_scatter_occ["base_3"][$server_response["current_round"]['scattersCount']['total']] += 1;

                    $this->totalBG3Occurance++;
                    if ($server_response["current_round"]["win_amount"] > 0) {
                        $this->totalBG3WinOccurance++;
                        $this->totalBG3 += $server_response["current_round"]["win_amount"];
                        $this->oneRoundWin += $server_response["current_round"]["win_amount"];
                        // if($server_response["current_round"]["win_amount"] > $this->stickyWildWinThree){
                        //     $this->stickyWildWinThree = $server_response["current_round"]["win_amount"];
                        // }
                    }
                } elseif ($resp['feature_name'] == "StickyWild" && $resp['bonus'] == "Wild4") {
                    // $this->total_scatter_occ["base_1"][$server_response["current_round"]['scattersCount']['total']] += 1;

                    $this->totalBG4Occurance++;
                    if ($server_response["current_round"]["win_amount"] > 0) {
                        $this->totalBG4WinOccurance++;
                        $this->totalBG4 += $server_response["current_round"]["win_amount"];
                        $this->oneRoundWin += $server_response["current_round"]["win_amount"];
                        // if($server_response["current_round"]["win_amount"] > $this->stickyWildWinFour){
                        //     $this->stickyWildWinFour = $server_response["current_round"]["win_amount"];
                        // }
                    }
                }
            } elseif ($stickWildFlag) {
                if( $server_response["current_round"]["win_amount"] > 0){
                    $this->total_normal_win_occ += 1;
                    $this->oneRoundWin += $server_response["current_round"]["win_amount"];
                    $this->total_normal_win += $server_response["current_round"]["win_amount"];
                }
            }
            if($this->oneRoundWin > $this->final_max_win){
                $this->final_max_win = $this->oneRoundWin;
            }
            // echo "sessiom";
            // print_r($_SESSION);

        }

        $end_date_time = date("M,d,Y h:i:s A");
        $end_time = time();
        $execution_time = $end_time - $start_time;
        $this->total_win_simulation = $this->total_normal_win + $this->total_free_game_win + $this->total_free_game_respin_win + $this->total_respin_win +
            $this->total_scatter_win + $this->totalBG1 + $this->totalBG2 + $this->totalBG3 + $this->totalBG4 + $this->nacroBonus1Win +
            $this->nacroBonus2Win + $this->bonusBaseGameWin + $this->bonusFreeGameWin;
        $max_bet = $this->num_betlines_sim * $this->max_coins;
        // $total_max_win = $max_bet * ($this->maxWin / $this->num_betlines_sim);
        $game_detail = array();
        if($this->game_id == 701 ){
            $game_detail = array(
                                "Nacro Bonus 1 Occ"=>  $this->nacroBonus1Occ ,
                                "Nacro Bonus 1 win"=>  $this->nacroBonus1Win ,
                                "Nacro Bonus 2 Occ"=>  $this->nacroBonus2Occ ,
                                "Nacro Bonus 2 Win"=>  $this->nacroBonus2Win ,
                                "Max Win Nacro Bonus 1 "=>  $this->nacroBonus1MaxWin ,
                                "Max Win Nacro Bonus 2 "=>  $this->nacroBonus2MaxWin ,
                                "Max Mul Nacro Bonus 1 "=>  $this->nacroBonus1MaxWin / $this->num_betlines_sim,
                                "Max Mul Nacro Bonus 2 "=>  $this->nacroBonus2MaxWin /$this->num_betlines_sim ,
                                "Nacro Bonus 1 RTP "=> round(($this->nacroBonus1Win / $this->total_bet_simulation) * 100, 2) ,
                                "Nacro Bonus 2 RTP "=> round(($this->nacroBonus2Win / $this->total_bet_simulation) * 100, 2) ,
                            );
                            // $this->maxWin +=$this->$this->nacroBonus1MaxWin;
                            // $this->maxWin +=$this->nacroBonus2MaxWin;
        }
        elseif ($this->game_id == 702 || $this->game_id == 706) {
            $game_detail = array( 
                                "Total StickyWild OneReel  Occ"=>  $this->totalBG1Occurance ,
                                "Total StickyWild OneReel Win Occ"=>  $this->totalBG1WinOccurance ,
                                "Total StickyWild OneReel Win"=>  $this->totalBG1 ,
                                "Total StickyWild TwoReel  Occ"=>  $this->totalBG2Occurance ,
                                "Total StickyWild TwoReel Win Occ"=>  $this->totalBG2WinOccurance ,
                                "Total StickyWild TwoReel Win"=>  $this->totalBG2 ,
                                "Total StickyWild ThreeReel  Occ"=>  $this->totalBG3Occurance ,
                                "Total StickyWild ThreeReel Win Occ"=>  $this->totalBG3WinOccurance ,
                                "Total StickyWild ThreeReel Win"=>  $this->totalBG3 ,
                                "Total StickyWild FourReel  Occ"=>  $this->totalBG4Occurance ,
                                "Total StickyWild FourReel Win Occ"=>  $this->totalBG4WinOccurance ,
                                "Total StickyWild FourReel Win"=>  $this->totalBG4 ,
                                "Max Win occ in OneReel Wild"=>  $this->stickyWildWinOne ,
                                "Max Win occ in TwoReel Wild"=>  $this->stickyWildWinTwo ,
                                "Max Win occ in ThreeReel Wild"=>  $this->stickyWildWinThree ,
                                "Max Win occ in FourReel Wild"=>  $this->stickyWildWinFour ,
                                "Max Mul  in OneReel Wild"=>  $this->stickyWildWinOne / $this->num_betlines_sim ,
                                "Max Mul  in TwoReel Wild"=>  $this->stickyWildWinTwo / $this->num_betlines_sim,
                                "Max Mul  in ThreeReel Wild"=>  $this->stickyWildWinThree / $this->num_betlines_sim,
                                "Max Mul  in FourReel Wild"=>  $this->stickyWildWinFour / $this->num_betlines_sim,
                                "Total StickyWild OneReel RTP "=> round(($this->totalBG1 / $this->total_bet_simulation) * 100, 2) ,
                                "Total StickyWild TwoReel RTP "=> round(($this->totalBG2 / $this->total_bet_simulation) * 100, 2) ,
                                "Total StickyWild ThreeReel RTP "=> round(($this->totalBG3 / $this->total_bet_simulation) * 100, 2) ,
                                "Total StickyWild FourReel RTP "=> round(($this->totalBG4 / $this->total_bet_simulation) * 100, 2) ,
                                );
                                // $this->maxWin +=$this->$this->stickyWildWinOne;
                                // $this->maxWin +=$this->stickyWildWinTwo;
                                // $this->maxWin +=$this->stickyWildWinThree;
                                // $this->maxWin +=$this->stickyWildWinFour;
        }
        elseif($this->game_id == 709){
            $game_detail = array(
                                "Total Base Bonus Occ"=>  $this->bonusBaseGameOcc ,
                                "Total Base Bonus Win"=>  $this->bonusBaseGameWin ,
                                "Total Free Bonus Occ"=>  $this->bonusFreeGameOcc ,
                                "Total Free Bonus Win"=>  $this->bonusFreeGameWin ,
                                "Free game Base win"=>  $this->freeGamebaseWin ,
                                "Total Base Bonus RTP "=> round(($this->bonusBaseGameWin / $this->total_bet_simulation) * 100, 2) ,
                                "Total Free Bonus RTP "=> round(($this->bonusFreeGameWin / $this->total_bet_simulation) * 100, 2) ,
                                
                            );
                        }
        // $this->maxWin += $this->freeGameMaxWin;

                
        $print4 = json_encode(array("Total Cycle" => $this->cycle ,
            "Game_Name "=>  $this->game_name ,
            "Game_id "=>  $this->game_id ,
            "End Time "=> $end_date_time ,
            "RTP "=> round(($this->total_win_simulation / $this->total_bet_simulation) * 100, 2) ,
            "Layout "=> $this->num_row . "X" . $this->num_col ,
            "payline "=> $this->num_coins_sim ,
            "voltility "=> $this->num_coins_sim ,
            "Base Game Hit freq. "=> round(($this->total_normal_win_occ / $this->cycle) * 100, 2) ,
            "Free Game Hit freq. "=> round(($this->total_free_game / $this->cycle) * 100, 2) ,
            "Base Game Symbol Win. "=> $this->repeat_num_Normal ,
            "FreeGame Symbol Win. "=> $this->repeat_num_FS ,
            "min_coins "=> $this->min_coins ,
            "max_coins "=> $this->max_coins ,
            "default_coin "=> $this->num_betlines_sim ,
            "max_win "=>$this->final_max_win,
            "max_mul win "=> $this->final_max_win/ $this->num_betlines_sim,
            // "max_win FG "=> $this->freeGameMaxWin ,
            // "max_mul FG "=> $this->freeGameMaxWin / $this->num_betlines_sim,
            "max_multiplier "=> $this->maxMultiplier ,
            "Total Bet "=>  $this->total_bet_simulation ,
            "Base Game Win occ"=>  $this->total_normal_win_occ ,
            "Base Win"=>  $this->total_normal_win ,
            "Total FG Win"=>  $this->total_free_game_win ,
            "Total Win "=> $this->total_win_simulation ,
            "Base RTP "=> round(($this->total_normal_win / $this->total_bet_simulation) * 100, 2) ,
            "FG RTP "=> round(($this->total_free_game_win / $this->total_bet_simulation) * 100, 2) ,
            "Total FG Occ / Scatter Occ"=>  $this->total_scatter_occ ,
            "Total Scatter Win"=>  $this->total_scatter_win ,
            "Scatter RTP "=> round(($this->total_scatter_win / $this->total_bet_simulation) * 100, 2) ,
            "game_deatil "=> $game_detail ,
            "Start Time "=> $start_date_time ,
            "Total Time taken in seconds "=> $execution_time ,
            "Total Time taken in min "=> ($execution_time / 60) ,
            "Total Time taken in hours "=> ($execution_time / (60 * 60))));
        $sarr = array("rtp" => round(($this->total_win_simulation / $this->total_bet_simulation) * 100, 2), "total_bet" => $this->total_bet_simulation, "total_win" => $this->total_win_simulation, "config" => $print4);
        $this->message = $print4;
        // print_r( $print4);
        return $sarr;
    }


public function callThirdReq($bonus_game_id, $sub_game_id, $pick_positions){
    $request_params_sim['sub_game_id'] = $sub_game_id;
    $request_params_sim['pick_position'] = $pick_positions;
    $request_params_sim['game_id'] = $this->game_id;
    $request_params_sim['amount_type'] = 1;
    $request_params_sim['username'] = $this->username_sim;
    $request_params_sim['coin_value'] = $this->coin_value_sim;
    $request_params_sim['num_coins'] = $this->num_coins_sim;
    $request_params_sim['num_betlines'] = $this->num_betlines_sim;
    $request_params_sim['session_id'] = "";
    $request_params_sim['account_id'] = $this->account_id;
    $request_params_sim['request_type'] = 3;
    $request_params_sim['bonus_game_id'] = $bonus_game_id;
    $_POST = $request_params_sim;
    $request_params = $request_params_sim;
    $res = s_main($request_params);
}

}
// $data_sim = new Simulation();
// $data = $data_sim->handleSpin($_POST);
?>