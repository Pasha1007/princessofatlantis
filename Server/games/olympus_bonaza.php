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
require_once __DIR__ . '/../server.php';
#=====================================================
class olympus_bonaza
{
    var $bg1, $bg2, $total_win_mul, $total_bet_simulation, $total_normal_win, $total_scatter, $total_scatter_win,
    $total_free_game, $total_free_game_win, $total_respin, $total_respin_win, $total_free_game_respin, $total_free_game_respin_win,
    $total_bonus1, $total_bonus1_win, $total_bonus2, $total_bonus2_win, $total_win_simulation, $username_sim, $coin_value_sim,
    $counter, $percentage, $repeat_num_Normal, $repeat_num_FS, $cycle, $game_name, $game_id, $account_id, $requestType, $num_coins_sim,
    $num_betlines_sim, $initial_cycle, $server_response, $message, $maxWin, $maxMultiplier, $num_row, $num_col, $min_coins, $max_coins,
    $total_normal_win_occ, $totalBG1Occurance, $totalBG1WinOccurance, $totalBG1, $totalBG2Occurance, $totalBG2WinOccurance, $totalBG2,
    $totalBG3Occurance, $totalBG3WinOccurance, $totalBG3, $totalBG4Occurance, $totalBG4WinOccurance, $totalBG4, $nacroBonus1Occ, $nacroBonus1Win,
    $nacroBonus2Occ, $nacroBonus2Win, $random_sym, $bonusBaseGameOcc, $bonusFreeGameOcc, $bonusBaseGameWin, $bonusFreeGameWin, $total_scatter_occ,
    $freeGamebaseWin, $freeGameSpecialSymbolWinOcc, $finalWin, $stickyWildWinOne, $stickyWildWinTwo, $stickyWildWinThree, $stickyWildWinFour,
    $freeGameMaxWin, $freeGameMaxWinSelectMulti, $nacroBonus1MaxWin, $nacroBonus2MaxWin, $final_max_win, $oneRoundWin, $round_case, $slag, $postInfoSekh,
    $bonusBaseWinOcc, $bonusFreeWinOcc, $mysteryFeatureOcc, $mysterSymbolOccurence, $additionalSpins, $lightingFeatureOcc, $mystFeatureWin, $lightFeatureWin,
    $thumbletotalOcc, $thumbleOcc, $total_scatter_win1, $total_scatter_win2, $fg_count, $thumbleOccFG, $thumbletotalOccFG, $multiplierCount, $thuble_occ_arr_base, $thuble_occ_arr_fg,
    $total_mul_occ_base,  $total_mul_occ_fg;
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
        $this->bonusBaseWinOcc = 0;
        $this->bonusFreeWinOcc = 0;
        $this->mysteryFeatureOcc = 0;
        $this->mysterSymbolOccurence = array();
        $this->additionalSpins = 0;
        $this->lightingFeatureOcc = 0;
        $this->mystFeatureWin = 0;
        $this->thumbleOcc = 0;
        $this->lightFeatureWin = 0;
        $this->total_win_mul = 0;
        $this->bg1 = 0;
        $this->bg2 = 0;
        $this->thumbletotalOcc = 0;
        $this->fg_count = 0;
        $this->slag = array();
        $this->thumbleOccFG = 0;
        $this->multiplierCount = 0;
        $this->thumbletotalOccFG =0;
        $this->round_case = array();
        $this->thuble_occ_arr_base = array();
        $this->thuble_occ_arr_fg = array();
        $this->postInfoSekh = array();
        $this->total_mul_occ_base = array();
        $this->total_mul_occ_fg = array();
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
        $this->thumbletotalOcc = 0;
        $this->total_scatter_win1 = 0;
        $this->total_scatter_win2 = 0;
        $this->option1_win = 0;
        $this->option2_win = 0;
        $this->thuble_occ_arr_base = array();
        $this->thuble_occ_arr_fg = array();
        $this->option3_win = 0;
        $this->option4_win = 0;
        $this->bg1 = 0;
        $this->bg2 = 0;
        $this->option5_win = 0;
        $this->random_sym = array(
            "a" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0)), 
            "b" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0)), 
            "c" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0)), 
            "d" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0)), 
            "e" => array("total_occ"=>0,"occ"=>0,"base_win"=>0,"feature_win"=>0,"wind_positin"=>array("0"=>0,"1"=>1,"2"=>0,"3"=>0,"4"=>0,"5"=>0)));
        $this->total_scatter_occ = array("base_game"=>array("4"=>0,"5"=>0,"6"=>0),"base_1"=>array("3"=>0,"4"=>0,"5"=>0),"base_2"=>array("3"=>0,"4"=>0,"5"=>0),"base_3"=>array("3"=>0,"4"=>0,"5"=>0));
        $this->repeat_num_Normal = array(
            "4s" => 0,
            "5s" => 0,
            "6s" => 0,
            "8a" => 0,
            "10a" => 0,
            "12a" => 0,
            "8b" => 0,
            "10b" => 0,
            "12b" => 0,
            "8c" => 0,
            "10c" => 0,
            "12c" => 0,
            "8d" => 0,
            "10d" => 0,
            "12d" => 0,
            "8e" => 0,
            "10e" => 0,
            "12e" => 0,
            "8f" => 0,
            "10f" => 0,
            "12f" => 0,
            "8g" => 0,
            "10g" => 0,
            "12g" => 0,
            "8h" => 0,
            "10h" => 0,
            "12h" => 0,
            "8i" => 0,
            "10i" => 0,
            "12i" => 0,
            "8j" => 0,
            "10j" => 0,
            "12j" => 0,
            "8k" => 0,
            "10k" => 0,
            "12k" => 0
        );

        global $stickWildFlag;
        $this->repeat_num_FS = array(
            "4s" => 0,
            "5s" => 0,
            "6s" => 0,
            "8a" => 0,
            "10a" => 0,
            "12a" => 0,
            "8b" => 0,
            "10b" => 0,
            "12b" => 0,
            "8c" => 0,
            "10c" => 0,
            "12c" => 0,
            "8d" => 0,
            "10d" => 0,
            "12d" => 0,
            "8e" => 0,
            "10e" => 0,
            "12e" => 0,
            "8f" => 0,
            "10f" => 0,
            "12f" => 0,
            "8g" => 0,
            "10g" => 0,
            "12g" => 0,
            "8h" => 0,
            "10h" => 0,
            "12h" => 0,
            "8i" => 0,
            "10i" => 0,
            "12i" => 0,
            "8j" => 0,
            "10j" => 0,
            "12j" => 0,
            "8k" => 0,
            "10k" => 0,
            "12k" => 0
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
                $game_fs["symbolConfig".$row1['sub_game_id']]= decode_object($row1['symbol_config']);
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
        // $this->min_coins = 1;
        // $this->max_coins = 1;
        $this->coin_value_sim = 20;  // bu/y,fg , normal
        // $this->coin_value_sim = 25; // ante
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
            // $this->total_bet_simulation += $this->coin_value_sim *$this->num_coins_sim; // normal/ ante
            // $this->total_bet_simulation += 25; // normal/ ante
            $this->total_bet_simulation += $this->coin_value_sim *$this->num_coins_sim *100; //buy fg game
            #=========================================================
            $request_params_sim['game_id'] = $this->game_id;
            $request_params_sim['amount_type'] = 1;
            // $request_params_sim['request_type'] = 2; // normal ante
            // $request_params_sim['sub_game_id'] = 1; // normal 
            $request_params_sim['request_type'] = 8; //buy fg 
            $request_params_sim['sub_game_id'] = 4; // buy fg
            // $request_params_sim['sub_game_id'] = 6;  // nate 
            // $request_params_sim['coin_value'] = 20; // ante
            $request_params_sim['coin_value'] = $this->coin_value_sim; // norma, buy fg
            $request_params_sim['num_coins'] = $this->num_coins_sim;
            $request_params_sim['num_betlines'] = $this->num_betlines_sim;
            $request_params_sim['account_id'] = $this->account_id;
            $request_params_sim['username'] = $this->username_sim;
            $request_params_sim['session_id'] = "";
            $request_params_sim['platform_type'] = "desktop";
            #====================================================
            $_POST = $request_params_sim;
            $request_params = $request_params_sim;
            $res = s_main($request_params);
            // print_r($server_response["current_round"]);
            if ($this->maxWin < $server_response["current_round"]["win_amount"]) {
                $this->maxWin = $server_response["current_round"]["win_amount"];
            }
            
            $this->multiplierCount += $server_response["current_round"]["multiplier_count"]; 
            
            $details = $server_response["current_round"]['payline_wins']['details'];
            $detail_data = false;
            // check details is sytring or array and configure acc to thay
            
            if(is_array($details) ){
                if( count($details) > 0){
                    $detail_data = true;
                }
                
            }   
            elseif(strlen($details) > 0){
                
                $detail_data = true;
            }
            if($detail_data == true){
                $str_arr = explode(";", $details);
                
                for ($k = 0; $k < count($str_arr); $k++) {
                    $win_f = explode(":", $str_arr[$k]);
                    if ($win_f[3] == 8 || $win_f[3] == 9){
                        $this->repeat_num_Normal["8" . $win_f[4]] += 1;
                    }
                    elseif ($win_f[3] == 10 || $win_f[3] == 11){
                        $this->repeat_num_Normal["10" . $win_f[4]] += 1;
                    }
                    elseif ($win_f[3] == 12 || $win_f[3] > 12){
                        $this->repeat_num_Normal["12" . $win_f[4]] += 1;
                    }
                    
                }
            }
            
            
            // win Amount with out multiplier
            // win Amount for multiplier
            // win Amount with multiplier
            // scatter win 
            
            if($server_response["current_round"]["sub_game"] == 6){
                
                $this->bg1 += 1;
                $this->total_scatter_win1 += $server_response["current_round"]["sctter_win"] * $this->coin_value_sim *$this->num_coins_sim ;
                // $this->total_scatter_win1 += $server_response["current_round"]["sctter_win"] * 20;
                $this->total_scatter_occ["base_1"][$server_response["current_round"]['scattersCount']['s']] += 1; 
                
            }
            elseif($server_response["current_round"]["sub_game"] == 7){
                
                $this->total_scatter_occ["base_2"][$server_response["current_round"]['scattersCount']['s']] += 1; 
                $this->bg2 += 1;
                // $this->total_scatter_win2 += $server_response["current_round"]["sctter_win"] * $this->coin_value_sim *$this->num_coins_sim;
                $this->total_scatter_win2 += $server_response["current_round"]["sctter_win"] * 20;
            }
            $this->oneRoundWin += $server_response["current_round"]["win_amount"];
            
            if( $server_response["current_round"]["win_amount"] > 0){
                $this->total_normal_win_occ += 1;
                $this->total_normal_win += $server_response["current_round"]["payline_win_amount"];
            }
            
            if($server_response["current_round"]["misc_prizes"]){
                $resp_misc = $server_response["current_round"]["misc_prizes"];                
                if($resp_misc["count"] > 0 )
                {
                    $this->thumbleOcc+=1;
                    $this->thumbletotalOcc += $resp_misc["count"];
                    $this->thuble_occ_arr_base[$resp_misc["count"]] += 1;
                    
                }
            }
            
            $this->total_win_mul +=$server_response["current_round"]["win_amount"];
            // if($server_response["current_round"]["post_matrix_info"]){
            //     $resp = $server_response["current_round"]["post_matrix_info"];
            //     if($resp["symbol"] == "m"){
            //         $this->total_respin_win += $server_response["current_round"]["post_matrix_info"]["win"];
            //         $this->total_respin += 1;
            //         $multiplier_arr = [];
            //         $multiplier_arr = $server_response["current_round"]["post_matrix_info"]["multiplier_pos"];
            //         for ($mul_count_b=0; $mul_count_b < count($multiplier_arr); $mul_count_b++) {
            //             $this->total_mul_occ_base[$multiplier_arr[$mul_count_b]] += 1;
            //         }
            //     }
            // }

            
            $this->total_scatter_occ["base_game"][$server_response["current_round"]['scattersCount']['s']] += 1;
            
            
            // echo "!";
            if ($server_response["current_round"]["bonus_games_won"]) {
                
                $this->total_free_game += 1;
                $resp_fg = $server_response["current_round"]["bonus_games_won"];
                // $this->total_scatter_win += $server_response["current_round"]["sctter_win"] * $this->coin_value_sim *$this->num_coins_sim; // buy fg normal 
                $this->total_scatter_win += $server_response["current_round"]["sctter_win"] * 20; // ANte
                if($server_response["current_round"]["sctter_win"] > 0){
                    // echo "2";
                    $this->total_scatter += 1; // 900                
                }
                
                if (array_key_exists('type', $resp_fg[0])) {
                    if ($resp_fg[0]['type'] == "freespins") {
                        
                        
                        $num_spins = $resp_fg[0]['num_spins'];
                        // echo $num_spins;
                        $fs = true;
                        // $c = 0;
                        // for ($j = 0; $j < $num_spins; $j++) {
                        while ($fs == true ) {
                            // $c+=1;
                            // $fs = false;
                            $this->fg_count += 1;
                            $request_params_sim['game_id'] = $this->game_id;
                            $request_params_sim['amount_type'] = 1;
                            // $request_params_sim['sub_game_id'] = 3; // , normal
                            $request_params_sim['sub_game_id'] = 5; // buy fg
                            // $request_params_sim['sub_game_id'] = 8; // ante,
                            // $request_params_sim['coin_value'] = 20; // ante
                            $request_params_sim['coin_value'] = $this->coin_value_sim; // fg, normal
                            $request_params_sim['num_coins'] = $this->num_coins_sim;
                            $request_params_sim['num_betlines'] = $this->num_betlines_sim;
                            $request_params_sim['username'] = $this->username_sim;
                            $request_params_sim['session_id'] = "";
                            $request_params_sim['platform_type'] = "desktop";
                            $request_params_sim['request_type'] = 2;
                            $_POST = $request_params_sim;
                            $request_params = $request_params_sim;

                            $res = s_main($request_params);
                            // print_r($server_response);
                            $details = $server_response["current_round"]['payline_wins']['details'];
                                $str_arr = explode(";", $details);
                                for ($k = 0; $k < count($str_arr); $k++) {
                                    $win_f = explode(":", $str_arr[$k]);
                                    if ($win_f[3] == 8 || $win_f[3] == 9){
                                        $this->repeat_num_FS["8" . $win_f[4]] += 1;
                                    }
                                    elseif ($win_f[3] == 10 || $win_f[3] == 11){
                                        $this->repeat_num_FS["10" . $win_f[4]] += 1;
                                    }
                                    elseif ($win_f[3] == 12 || $win_f[3] > 12){
                                        $this->repeat_num_FS["12" . $win_f[4]] += 1;
                                    }
                                }
                                
                            if(count($server_response["next_round"]) == 0){
                                $fs = false;
                            }
                            if($server_response["current_round"]["post_matrix_info"]){
                                $resp_post = $server_response["current_round"]["post_matrix_info"];
                                if(array_key_exists("extra_fs", $server_response["current_round"]["post_matrix_info"])){
                                    // $num_spins += $server_response["current_round"]["post_matrix_info"]["extra_fs"];
                                    $this->mysteryFeatureOcc += 1;
                                    $multiplier_arr = [];
                                    if(array_key_exists("multiplier_pos", $server_response["current_round"]["post_matrix_info"])){
                                        $multiplier_arr = $server_response["current_round"]["post_matrix_info"]["multiplier_pos"];
                                        for ($mul_count=0; $mul_count < count($multiplier_arr); $mul_count++) {
                                            $this->total_mul_occ_fg[$multiplier_arr[$mul_count]] += 1;
                                        }
                                    }
                                }
                                // echo $num_spins;
                            }
                            if($server_response["current_round"]["misc_prizes"]){
                                $resp_misc = $server_response["current_round"]["misc_prizes"];                
                                if($resp_misc["count"] > 0 )
                                {
                                    $this->thumbleOccFG+=1;
                                    $this->thumbletotalOccFG += $resp_misc["count"];
                                    $this->thuble_occ_arr_fg[$resp_misc["count"]] += 1;

                                }
                            }
                            }
                            if(count($server_response["current_round"]["multipliers"]) > 0){
                            $this->freeGamebaseWin += $server_response["current_round"]["multipliers"][0]["values"];
                        }
                        $this->total_free_game_win += $server_response["current_round"]["total_fs_win_amount"];
                        $this->oneRoundWin += $server_response["current_round"]["total_fs_win_amount"];
                        }
                        }
            }
                            if($this->oneRoundWin > $this->final_max_win){
                                $this->final_max_win = $this->oneRoundWin;
                            }
                            if($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 10000 ){
                                $this->slag[10000 ] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 9000 ){
                                $this->slag[9000 ] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 8000 ){
                                $this->slag[8000] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 7000 ){
                                $this->slag[7000] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 6000 ){
                                $this->slag[6000] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 5000 ){
                                $this->slag[5000] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 4000 ){
                                $this->slag[4000] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 3000 ){
                                $this->slag[3000] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 2000 ){
                                $this->slag[2000] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 1000 ){
                                $this->slag[1000] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 500 ){
                                $this->slag[500] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 100 ){
                                $this->slag[100] += 1;
                            }
                            elseif($this->oneRoundWin/($this->coin_value_sim *$this->num_coins_sim) >= 50 ){
                                $this->slag[50] += 1;
                            }
        }
        
        $end_date_time = date("M,d,Y h:i:s A");
        $end_time = time();
        $execution_time = $end_time - $start_time;
        $this->total_win_simulation = $this->total_win_mul + $this->total_free_game_win + $this->total_scatter_win ;
        $max_bet = $this->num_betlines_sim * $this->max_coins;
        $game_detail = array();
        $payta = array(
            "4s" => 0,
            "5s" => 0,
            "6s" => 0,
            "8a" => 3,
            "10a" => 10,
            "12a" => 50,
            "8b" => 2,
            "10b" => 5,
            "12b" => 20,
            "8c" => 1,
            "10c" => 2.5,
            "12c" => 10,
            "8d" => 0.8,
            "10d" => 2,
            "12d" => 8,
            "8e" => 0.5,
            "10e" => 1.25,
            "12e" => 5,
            "8f" => 0.4,
            "10f" => 1,
            "12f" => 4,
            "8g" => 0.3,
            "10g" => 0.75,
            "12g" => 3,
            "8h" => 0.25,
            "10h" => 0.6,
            "12h" => 2.5,
            "8i" => 0.2,
            "10i" => 0.5,
            "12i" => 2,
            
        );
        $total_val_base = array();
        $total_val_rtp_base = array();
        $total_sym_rtp_base = 0;
        foreach ($this->repeat_num_Normal as $key => $value) {
            $num_prize = $payta[$key];
            $total_val_base[$key] = $value * $num_prize * $this->coin_value_sim * $this->num_coins_sim;
        }
        foreach ($total_val_base as $key => $value) {
            $total_val_rtp_base[$key] = round(($value / $this->total_bet_simulation) * 100, 2);
            $total_sym_rtp_base += round(($value / $this->total_bet_simulation) * 100, 2);
        }
        $total_val_fg = array();
        $total_val_rtp_fg = array();
        $total_sym_rtp_fg = 0;
        foreach ($this->repeat_num_FS as $key => $value) {
            $num_prize = $payta[$key];
            $total_val_fg[$key] = $value * $num_prize * $this->coin_value_sim * $this->num_coins_sim;
        }
        foreach ($total_val_fg as $key => $value) {
            $total_val_rtp_fg[$key] = round(($value / $this->total_bet_simulation) * 100, 2);
            $total_sym_rtp_fg += round(($value / $this->total_bet_simulation) * 100, 2);
        }
        
        
        $total_thuble_came_base = 0;
        $total_win_base = 0;
        $total_thuble_came_fg = 0;
        $total_win_fg = 0;
        foreach ($this->thuble_occ_arr_base as $key => $value) {
            $total_win_base += $key * $value;
            $total_thuble_came_base += $value;
        }
        foreach ($this->thuble_occ_arr_fg as $key => $value) {
            $total_win_fg += $key * $value;
            $total_thuble_came_fg += $value;
        }

        try {
            $thumble_avg_base = $total_win_base / $total_thuble_came_base;
        } catch (\Throwable $th) {
            //throw $th;
        }
        try {
            $thumble_avg_fg = $total_win_fg / $total_thuble_came_fg;
        } catch (\Throwable $th) {
            //throw $th;
        }
        // echo "outside3";
        $print4 = json_encode(array("Total Cycle" => $this->cycle ,
            "Game_Name "=>  $this->game_name ,
            "Game_id "=>  $this->game_id ,
            "bet_per_round "=>  $this->coin_value_sim *$this->num_coins_sim,
            "End Time "=> $end_date_time,
            "RTP "=> round(($this->total_win_simulation / $this->total_bet_simulation) * 100, 2) ,
            "Layout "=> $this->num_row . "X" . $this->num_col,
            "payline "=> $this->num_coins_sim ,
            "voltility "=> $this->num_coins_sim ,
            "Base Game Hit freq. "=> round(($this->total_normal_win_occ / $this->cycle) * 100, 2) ,
            "Free Game Hit freq. "=> round(($this->total_free_game / $this->cycle) * 100, 2) ,
            "Base Game Symbol Win. "=> $this->repeat_num_Normal ,
            "FreeGame Symbol Win. "=> $this->repeat_num_FS ,
            "symbol win_base. "=> $total_val_base ,
            " each symbol rtp_base . "=> $total_val_rtp_base ,
            " total symbol Rtp._base "=> $total_sym_rtp_base ,
            " symbol win_fg "=> $total_val_fg ,
            " each symbol rtp_fg "=> $total_val_rtp_fg ,
            " total symbol Rtp_fg"=> $total_sym_rtp_fg ,
            
            "multiplier_count "=>$this->multiplierCount,
            "multiplier_occ_base "=>$this->total_mul_occ_base,
            "multiplier_occ_fg "=>$this->total_mul_occ_fg,
            "min_coins "=> $this->min_coins ,
            "max_coins "=> $this->max_coins ,
            "default_coin "=> $this->num_betlines_sim ,
            "max_win "=>$this->final_max_win,
            "max_mul win "=> $this->final_max_win/ ($this->coin_value_sim *$this->num_coins_sim),
            "slab "=> $this->slag,
            "h_thumble_win_base"=>$total_win_base ,
            "h total_thuble_came_base"=>$total_thuble_came_base ,
            // "h_thumble_avg_base"=>$total_win_base/$total_thuble_came_base ,
            "h_thumble_avg_base"=>$thumble_avg_base ,
            "h_thumble_win_fg"=>$total_win_fg ,
            "h total_thuble_came_fg"=>$total_thuble_came_fg ,
            "h_thumble_avg_fg"=>$thumble_avg_fg ,
            "max_multiplier "=> $this->maxMultiplier ,
            "Total Bet "=>  $this->total_bet_simulation ,
            "Base Game Win occ"=>  $this->total_normal_win_occ ,
            "Base Win without mul"=>  $this->total_normal_win ,
            "Base Win with mul"=>  $this->total_win_mul ,
            "Multiplier Win"=>  $this->total_respin_win ,
            "Multiplier occ"=>  $this->total_respin ,
            // "bg1 occ"=>  $this->bg1 ,
            // "bg2 occ"=>  $this->bg2 ,
            // "bg1 occ avg"=>  round(($this->bg1 / $this->cycle) * 100, 2),
            // "bg2 occ avg"=>  round(($this->bg2 / $this->cycle) * 100, 2),
            // "thumble Occ Base GAme "=>  $this->thumbleOcc ,
            // "thumble_avg"=>$this->thumbleOcc / $this->cycle,
            // "thumble_total occ"=>$this->thumbletotalOcc ,
            // "thumble_total avg"=>($this->thumbletotalOcc / $this->cycle),
            "Total Win "=> $this->total_win_simulation ,
            "Base with out mul  RTP "=> round(($this->total_normal_win / $this->total_bet_simulation) * 100, 2),
            "Base with mul RTP "=> round(($this->total_win_mul / $this->total_bet_simulation) * 100, 2) ,
            "Total FG Win with multiplier"=>  $this->total_free_game_win ,
            "FG RTP "=> round(($this->total_free_game_win / $this->total_bet_simulation) * 100, 2) ,
            "FG came "=> $this->total_scatter ,
            "FG Spin count "=> $this->fg_count ,
            "Total_multilier in fg"=>  $this->freeGamebaseWin ,
            "Extrs FS Award"=>  $this->mysteryFeatureOcc ,
            "thumble  Occ FG"=>  $this->thumbleOccFG,
            "thumble total Occ FG"=>  $this->thumbletotalOccFG ,
            "Total FG Occ / Scatter Occ"=>  $this->total_scatter_occ,
            "Total FG Occ1 / Scatter Occ"=>  $this->total_scatter_win1 ,
            "Total FG Occ2 / Scatter Occ"=>  $this->total_scatter_win2 ,
            // "Total FG Occ / Scatter Occ"=>  $this->total_scatter,
            "Total Scatter Win"=>  $this->total_scatter_win ,
            "Scatter RTP Old"=> round(($this->total_scatter_win / $this->total_bet_simulation) * 100, 2) ,
            // "Scatter RTP New  "=> round((($this->total_scatter_win1/($this->bg1 *20)) + ($this->total_scatter_win2/($this->bg2 *20))) * 100, 2) ,
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