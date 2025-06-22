<?php

ini_set("display_errors", 0);
// ini_set("display_errors", 1); error_reporting(E_ALL);
header('Content-Type: application/json');
date_default_timezone_set('Asia/Kolkata');
header('Access-Control-Allow-Origin: *');
define("ENGINE_MODE_SIMULATION", True);
ini_set('max_execution_time', 0);
// global $db;
#===================================================
require __DIR__ . '/../server.php';
#=====================================================
class terracottawarrior
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
    $freeGameMaxWin, $freeGameMaxWinSelectMulti,$nacroBonus1MaxWin,$nacroBonus2MaxWin,$final_max_win,$oneRoundWin,$round_case, $slag,$postInfoSekh, 
    $bonusBaseWinOcc, $bonusFreeWinOcc, $mysteryFeatureOcc, $mysterSymbolOccurence, $additionalSpins, $lightingFeatureOcc, $mystFeatureWin, $lightFeatureWin;
    #====================================================
    public function __construct()
    {
        $this->total_bet_simulation = 0;
        $this->total_normal_win = 0;
        $this->total_scatter = 0;
        $this->total_scatter_win = 0;
        $this->total_free_game = 0;
        $this->total_free_game_win = 0;
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
        $this->nacroBonus1Occ = 0;
        $this->nacroBonus2Occ = 0;
        $this->nacroBonus2Win = 0;
        $this->nacroBonus2Win = 0;
        $this->nacroBonus1MaxWin = 0;
        $this->nacroBonus2MaxWin = 0;
        $this->option1_occ = 0;
        $this->option2_occ = 0;
        $this->option3_occ = 0;
        $this->option4_occ = 0;
        $this->option5_occ = 0;
        $this->option1_win = 0;
        $this->option2_win = 0;
        $this->option3_win = 0;
        $this->option4_win = 0;
        $this->option5_win = 0;
        $this->final_max_win = 0;
        $this->oneRoundWin = 0;
        $this->slag = array();
        $this->round_case = array();
        $this->postInfoSekh = array();
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
        $this->option1_occ = 0;
        $this->option2_occ = 0;
        $this->option3_occ = 0;
        $this->option4_occ = 0;
        $this->option5_occ = 0;
        $this->option1_win = 0;
        $this->option2_win = 0;
        $this->option3_win = 0;
        $this->option4_win = 0;
        $this->option5_win = 0;
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
        #====================================================
        global $db, $server_response;
        // echo "pox = ".$requestParams["cycle"];
        $this->cycle = $requestParams["cycle"];
        $this->game_name = $requestParams["game_name"];
        $this->game_id = $requestParams["game_id"];
        $this->account_id = $requestParams["account_id"];
        $this->account_id = $requestParams["feature"];
        #====================================================
        $status = ($this->cycle * $this->counter) / 100;
        $status = (string) $status;
        $this->cycle = (int) $this->cycle;
        $this->account_id = (int) $this->account_id;
        $this->game_name = (string) $this->game_name;
        #====================================================
        $request_params_sim = array();
        $start_date_time = date("M,d,Y h:i:s A");
        global $game_fs;
        global $bonus_fs;
        global $freegame_fs;
        global $bonusgame_fs;
        $game_fs = array();
        $bonus_fs = array();
        $freegame_fs = array();
        $bonusgame_fs = array();
        $db = Database::getObject('core');

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
    $re = $db->runQuery($g_quey) or ErrorHandler::handleError(1, "GAMBLE_0005");
    if ($db->numRows($re) > 0) {
            
        while ($row1 = $db->fetchAssoc($re)) {
            $game_fs["gameName"] = $row1['game_name'];
                $game_fs["gameId"]=$row1['game_id'];
                $game_fs["subGameId"]= 1;
                // $game_fs["gameName "]= $row1['game_name'];
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
                $game_fs["reelsetConfig"]= decode_object($row1['reelset_config']);
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
                $game_fs["bonusConfig"]= "";
                $game_fs["reels".$row1['sub_game_id']]= decode_object($row1['reels']);
                $game_fs["bonusConfig".$row1['sub_game_id']]= decode_object($row1['bonus_config']);
                $game_fs["payTable" .$row1['sub_game_id']]= decode_object($row1['pay_table']);
        
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
                $bonus_fs[$row2['bonus_game_id']]= $row2["configuration"];
        }
    }
        $c_query = <<<QUERY
        Select coin_values from game.currency where game_name = '$this->game_name'
QUERY;
        $c_r = $db->runQuery($c_query) or ErrorHandler::handleError(1, "GAMBLE_0005");
        $row_data_curr = $db->fetchAssoc($c_r);
        $db->close();
        #====================================================
        $coin_val = [1,2,3,5,10,20,50,100,200,500];
        $this->num_coins_sim = $game_fs['paylines'];
        $this->num_betlines_sim = $game_fs['defaultCoins'];
        $this->num_row = $game_fs['numRows'];
        $this->num_col = $game_fs['numColumns'];
        $this->min_coins = $coin_val[0] / 100;
        $this->max_coins = $coin_val[count($coin_val) - 1] / 100;
        $this->coin_value_sim = 5;
        $timeCount = 0;
        $game_id = $this->game_id;
        for ($i = 1; $i <= $this->cycle; $i++) {
                $this->oneRoundWin = 0;
                if (($i % ($this->cycle / 100)) == 0) {
                $db = Database::getObject('core');
                $state_query = <<<QUERY
                Select * from simulation.simulationlogs where state = 0 ORDER BY id DESC LIMIT 1
QUERY;
            $resultq2_test_1 = $db->runQuery($state_query);
            if ($db->numRows($resultq2_test_1) < 0) {
                break;
            }

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
                $db->close();
            }
            
            $this->percentage++;
            $this->counter++;
            $this->total_bet_simulation += $this->coin_value_sim *$this->num_coins_sim;
            #=========================================================
            $request_params_sim['game_id'] = $this->game_id;
            $request_params_sim['request_type'] = 2;
            $request_params_sim['amount_type'] = 1;
            $request_params_sim['sub_game_id'] = 1;
            $request_params_sim['coin_value'] = $this->coin_value_sim;
            $request_params_sim['num_coins'] = $this->num_coins_sim;
            $request_params_sim['num_betlines'] = $this->num_betlines_sim;
            $request_params_sim['account_id'] = $this->account_id;
            $request_params_sim['username'] = $this->username_sim;
            $request_params_sim['session_id'] = "";
            $request_params_sim['platform_type'] = "desktop";
            #====================================================
            $_POST = $request_params_sim;
            $request_params = $request_params_sim;
            echo " Once";
            $res = s_main($request_params);
            
            echo " came";
            if ($this->maxWin < $server_response["current_round"]["win_amount"]) {
                $this->maxWin = $server_response["current_round"]["win_amount"];
            }
            $details = $server_response["current_round"]['payline_wins']['details'];
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
            $this->total_scatter_occ["base_game"][$server_response["current_round"]['scattersCount']['s']] += 1; //775

            
            echo "here";
            // print_r($server_response);
            if ($server_response["current_round"]["bonus_games_won"]) {
                echo "#";
                $resp = $server_response["current_round"]["bonus_games_won"];
                $this->total_scatter_win += $server_response["current_round"]["sctter_win"] * $this->coin_value_sim *$this->num_coins_sim;
                if($server_response["current_round"]["sctter_win"] > 0){
                    $this->total_scatter += 1; // 900                
                }
                if (array_key_exists("bonus_game_id", $resp[0]) && $resp[0]['bonus_game_id'] == 380001) {
                    $this->total_free_game++;
                    
                    $currentCase = ( $this->total_scatter_occ["base_game"][3] % 5) + 1;
                    switch ($currentCase) {
                        case 1:
                            $this->option1_occ++;
                            $request_params_sim['sub_game_id'] = "1";
                            $request_params_sim['pick_position'] = "5";
                            break;
                        case 2:
                            $this->option2_occ++;
                            $request_params_sim['sub_game_id'] = "2";
                            $request_params_sim['pick_position'] = "1";
                            break;
                        case 3:
                            $this->option3_occ++;
                            $request_params_sim['sub_game_id'] = "3";
                            $request_params_sim['pick_position'] = "2";
                            break;
                        case 4:
                            $this->option4_occ++;
                            $request_params_sim['sub_game_id'] = "4";
                            $request_params_sim['pick_position'] = "3";
                            break;
                        case 5:
                            $this->option5_occ++;
                            $request_params_sim['sub_game_id'] = "5";
                            $request_params_sim['pick_position'] = "4";
                            break;
                    }
                    
                    $sub_game = $request_params_sim['sub_game_id'];
                    // $sub_game = 2;
                    // $request_params_sim['pick_position'] = "1";
                    // change
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
                    $request_params_sim['sub_game_id'] = $sub_game;
                    $request_params_sim['bonus_game_id'] = $bonus_game_id;
                    $_POST = $request_params_sim;
                    $request_params = $request_params_sim;
                    $res = s_main($request_params);
                    // print_r($server_response);
                    // echo "---------------------------------";
                    $num_s = $server_response["current_round"]["num_spins"];
                    $fsMul = $server_response["current_round"]["fs_multiplier"];

                    if ($fsMul > 1) {
                        $this->oneRoundWin += $server_response["current_round"]["fs_multiplier"];
                        $this->total_free_game_win += $fsMul;
                        $this->option1_win += $server_response["current_round"]["fs_multiplier"];
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
                            // print_r($server_response["current_round"]);
                            $this->oneRoundWin += $server_response["current_round"]["win_amount"];
                            $this->total_free_game_win += $server_response["current_round"]["win_amount"];
                            if($sub_game == 2){
                                if($server_response["current_round"]["post_matrix_info"] && $server_response["current_round"]["post_matrix_info"]["feature_name"] == 'sticky_wild_reel'){
                                        $post = $server_response["current_round"]["post_matrix_info"];
                                        if($post["wild_positions"] && count($post["wild_positions"]) >= 1){
                                            $this->postInfoSekh["sub_game " . $sub_game]["win". $post["wild_positions"][0]] += $post["win"];
                                            $this->postInfoSekh["sub_game " . $sub_game][$post["wild_positions"][0]." wild_positions"] += 1;
                                            $this->postInfoSekh["sub_game " . $sub_game][$post["multiplier"]." multiplier"] += 1;
                                        }
                                        else{
                                            $this->postInfoSekh["sub_game " . $sub_game]["win". $sub_game] += $post["win"];
                                            $this->postInfoSekh["sub_game " . $sub_game][$post["wild_positions"]." no reel wild_positions"] += 1;
                                            $this->postInfoSekh["sub_game " . $sub_game][$post["multiplier"]." multiplier"] += 1;
                                        }
                                }
                                $this->option2_win += $server_response["current_round"]["win_amount"];
                            }elseif($sub_game == 3){
                                $this->option3_win += $server_response["current_round"]["win_amount"];
                                if($server_response["current_round"]["post_matrix_info"] && $server_response["current_round"]["post_matrix_info"]["feature_name"] == 'sticky_wild_reel'){
                                    $post = $server_response["current_round"]["post_matrix_info"];
                                    if($post["wild_positions"] && count($post["wild_positions"]) >= 1){
                                        $this->postInfoSekh["sub_game " . $sub_game]["win". $sub_game] += $post["win"];
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["wild_positions"][0]." wild_positions"] += 1;
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["multiplier"]." multiplier"] += 1;
                                    }
                                    else{
                                        $this->postInfoSekh["sub_game " . $sub_game]["win". $sub_game] += $post["win"];
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["wild_positions"]." no reel wild_positions"] += 1;
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["multiplier"]." multiplier"] += 1;
                                    }
                                }
                            }
                            elseif($sub_game == 4){
                                $this->option4_win += $server_response["current_round"]["win_amount"];
                                if($server_response["current_round"]["post_matrix_info"] && $server_response["current_round"]["post_matrix_info"]["feature_name"] == 'sticky_wild_reel'){
                                    $post = $server_response["current_round"]["post_matrix_info"];
                                    if($post["wild_positions"] && count($post["wild_positions"]) >= 1){
                                        $this->postInfoSekh["sub_game " . $sub_game]["win". $sub_game] += $post["win"];
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["wild_positions"][0]." wild_positions"] += 1;
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["multiplier"]." multiplier"] += 1;
                                    }
                                    else{
                                        $this->postInfoSekh["sub_game " . $sub_game]["win". $sub_game] += $post["win"];
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["wild_positions"]." no reel wild_positions"] += 1;
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["multiplier"]." multiplier"] += 1;
                                    }
                                }
                            }
                            elseif($sub_game == 5){
                                $this->option5_win += $server_response["current_round"]["win_amount"];
                                if($server_response["current_round"]["post_matrix_info"] && $server_response["current_round"]["post_matrix_info"]["feature_name"] == 'sticky_wild_reel'){
                                    $post = $server_response["current_round"]["post_matrix_info"];
                                    if($post["wild_positions"] && count($post["wild_positions"]) >= 1){
                                        $this->postInfoSekh["sub_game " . $sub_game]["win". $sub_game] += $post["win"];
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["wild_positions"][0]." wild_positions"] += 1;
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["multiplier"]." multiplier"] += 1;
                                    }
                                    else{
                                        $this->postInfoSekh["sub_game " . $sub_game]["win". $sub_game] += $post["win"];
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["wild_positions"]." no reel wild_positions"] += 1;
                                        $this->postInfoSekh["sub_game " . $sub_game][$post["multiplier"]." multiplier"] += 1;
                                    }
                                }
                            }
                            $details = $server_response["current_round"]['payline_wins']['details'];
                            $str_arr = explode(";", $details);
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
                    if ($server_response["current_round"]["prize_value"] == "exit") {

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
                        $res = s_main($request_params);  
                    }
                    if ($server_response["current_round"]["prize_value"] == "exit") {

                        $this->oneRoundWin += $server_response["current_round"]["total_fs_win"];
                        $this->nacroBonus2Win += $server_response["current_round"]["total_fs_win"];
                    }
                } 
            }

            echo " tehre";
            if($this->oneRoundWin > $this->final_max_win){
                $this->final_max_win = $this->oneRoundWin;
            }
            elseif($this->oneRoundWin >= 100000 ){
                $this->slag["above 1lakh" ] += 1;
            }
            elseif($this->oneRoundWin >= 90000 ){
                $this->slag[90000] += 1;
            }
            elseif($this->oneRoundWin >= 80000 ){
                $this->slag[80000] += 1;
            }
            elseif($this->oneRoundWin >= 70000 ){
                $this->slag[70000] += 1;
            }
            elseif($this->oneRoundWin >= 60000 ){
                $this->slag[60000] += 1;
            }
            elseif($this->oneRoundWin >= 50000 ){
                $this->slag[50000] += 1;
            }
            elseif($this->oneRoundWin >= 40000 ){
                $this->slag[40000] += 1;
            }
            elseif($this->oneRoundWin >= 30000 ){
                $this->slag[30000] += 1;
            }
            elseif($this->oneRoundWin >= 20000 ){
                $this->slag[20000] += 1;
            }
            elseif($this->oneRoundWin >= 15000 ){
                $this->slag[15000] += 1;
            }
            elseif($this->oneRoundWin >= 10000 ){
                $this->slag[10000] += 1;
            }
            elseif($this->oneRoundWin >= 5000 ){
                $this->slag[5000] += 1;
            }
            echo " last";
            
        }
        
        echo " gfree";
        $end_date_time = date("M,d,Y h:i:s A");
        $end_time = time();
        $execution_time = $end_time - $start_time;
        $this->total_win_simulation = $this->total_normal_win + $this->total_free_game_win + $this->total_free_game_respin_win + $this->total_respin_win +
            $this->total_scatter_win + $this->totalBG1 + $this->totalBG2 + $this->totalBG3 + $this->totalBG4 + $this->nacroBonus1Win +
            $this->nacroBonus2Win + $this->bonusBaseGameWin + $this->bonusFreeGameWin + $this->lightFeatureWin + $this->mystFeatureWin;
        $max_bet = $this->num_betlines_sim * $this->max_coins;
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
                                "option1_occ"=> $this->option1_occ,
                                "option2_occ"=> $this->option2_occ,
                                "option3_occ"=> $this->option3_occ,
                                "option4_occ"=> $this->option4_occ,
                                "option5_occ"=> $this->option5_occ,
                               "total_scatter"=> $this->total_scatter,
                                "Total StickyWild OneReel RTP "=> round(($this->totalBG1 / $this->total_bet_simulation) * 100, 2) ,
                                "option1_RTP"=> (($this->option1_win/ $this->total_bet_simulation) * 100),
                                "option2_RTP"=> (($this->option2_win/ $this->total_bet_simulation) * 100),
                                "option3_RTP"=> (($this->option3_win/ $this->total_bet_simulation) * 100),
                                "option4_RTP"=> (($this->option4_win/ $this->total_bet_simulation) * 100),
                                "option5_RTP"=> (($this->option5_win/ $this->total_bet_simulation) * 100),
                            );
                            
        }
        // echo "outside3";
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
            "max_mul win "=> $this->final_max_win/ ($this->coin_value_sim *$this->num_coins_sim),
            "slab "=> $this->slag,
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

?>