<?php
ini_set("display_errors", 0);
// error_reporting(~E_ALL);
// ini_set("display_errors", 1); error_reporting(E_ALL);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
define("ENGINE_MODE_SIMULATION", True);
ini_set('max_execution_time', 0);
require_once 'database.inc.php';
$db = Database::getObject('core');
#==================================================

$request_params = $_POST;
$account_id = $request_params["user_id"];
$location = 'https://stage-simulation.progaindia.com/';
// $location = 'http://localhost/siva/Game Simulation/Final Game Simulator/game_simulator';
// $location = 'http://localhost/harshita/game_simulator//';
//C:\xampp\htdocs\siva\Game Simulation\GameSimulator\game_simulator\wildwestlegends.php
//C:\xampp\htdocs\harshita\game_simulator\main.php
#==================================================
$data = array();
$output = array();
#====================================================
$requestType = $request_params["requestType"];
if ($requestType == "INIT_MODE") {
    $log_query = "SELECT id,game_id,num_of_Simiulation,start_date,end_date,completed,state FROM simulation.simulationlogs
where state = 0 ";
} elseif ($requestType == "PLAY_MODE") {
    $game_id = $request_params['game_id'];
    $cycle = $request_params['cycle'];
    $log_query = "SELECT id,game_id,num_of_Simiulation,start_date,end_date,completed,state FROM simulation.simulationlogs
where state = 0 and game_id = $game_id and num_of_Simiulation = $cycle";
}
$logs_data = $db->runQuery($log_query);
$rows_s = $logs_data->fetch_all(MYSQLI_ASSOC);
if ($rows_s) {
    foreach ($rows_s as $log_data) {
        $output["pending_sim"] = array();
        $output["pending_sim"][$log_data['id']] = array(
            $log_data['game_id'],
            $log_data['num_of_Simiulation'],
            $log_data["start_date"],
            $log_data["end_date"],
            $log_data["state"],
            $log_data["completed"]
        );
        // echo "Simulation is running for game id = " . $log_data["game_id"];

    }
    $output["Simulation_log"] = $sim;
    // if($requestType == "PLAY_MODE") {
    //     $requestType = "INIT_MODE";
    // }

}

#====================================================

switch ($requestType) {
    case "INIT_MODE":
        handleInitialization();
        break;
    case "PLAY_MODE":
        $gameId = $request_params['game_id'];
        $cycle = $request_params["cycle"];
        $games_quary = "SELECT game_name FROM game.games where game_id = $gameId  ";
        $games_data = $db->runQuery($games_quary);
        $games = $db->fetchAssoc($games_data);
        $game_names = $games["game_name"];
        header("Location:$location/gameSimulations/" . $game_names . ".php?game_id=" . $gameId . "&account_id=" . $account_id . "&cycle=" . $cycle . "&game_name=" . $game_names);
        // $output = handleSpin($game_names);
        break;
    case "STOP_MODE":
        $gameId = $request_params['game_id'];
        $id = $request_params['id'];
        stop_simulation($id, $gameId);
        break;
}
result($output);
#====================================================

function stop_simulation($id, $gameId)
{
    global $db, $output;
    $updateq = "UPDATE simulation.simulationlogs SET state = 1 where state = 0 and id = $id and game_id = $gameId";
    $resultq2 = $db->runQuery($updateq) or ErrorHandler::handleError(1, "CASINO_LIB001");
    handleInitialization();

}

// function download_report($id,$game_id ){
//     global $location;
//     $filename = $location.'/Simulation_Reports/'.$id.'_'.$game_id.'.txt';
//     echo $filename;
//     // Output headers.
//     // $filename = 'file.pdf';//this should be the name of the file you want to download 
//     header('Pragma: public');
//     header('Expires: 0');
//     header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
//     header('Cache-Control: private', false); // required for certain browsers 
//     header('Content-Type: application/txt');

//     header('Content-Disposition: attachment; filename="'. basename($filename) . '";');
//     header('Content-Transfer-Encoding: binary');
//     header('Content-Length: ' . filesize($filename));
//     readfile ($filename);                   
//     exit();

// // readfile($filename);
// //     header('Content-Type: application/txt');
// // 	header("Content-Disposition: attachment; filename=\"$file\"");
// // 	readfile($file);
// //     exit;
//     // Output file.
// }


function handleInitialization()
{
    global $db, $output;
    $sim = array();
    $g_query = <<<QUERY
        Select * from simulation.simulationgames
QUERY;
    $r = $db->runQuery($g_query) or ErrorHandler::handleError(1, "GAMBLE_0005");
    $rows = $r->fetch_all(MYSQLI_ASSOC);
    foreach ($rows as $row) {
        $games[$row['game_id']] = $row['game_name'];
    }
    $output["games"] = $games;

    $s_query = <<<QUERY
        Select * from simulation.simulationlogs where state = 1 ORDER BY id DESC LIMIT 15;
QUERY;
    $rs = $db->runQuery($s_query) or ErrorHandler::handleError(1, "GAMBLE_0005");
    $rows_s = $rs->fetch_all(MYSQLI_ASSOC);
    if ($rows_s) {
        foreach ($rows_s as $row) {
            $sim[$row["id"]] = array($row['game_id'], $row['num_of_Simiulation'], $row["start_date"], $row["end_date"], $row["rtp"], $row["state"]);
        }
        $output["Simulation_log"] = $sim;
    }
}
#====================================================
function result($output)
{
    print json_encode($output);
    exit;
}


?>