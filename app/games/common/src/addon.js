// this variable delcared in config.js in root games folder
var gameEnginePath = gameEnginePath ? gameEnginePath : "/";
// commonConfig["serverIP"] = "http://localhost/Amaljith/sweet-bonanza"+"";
commonConfig["serverIP"] = "https://dev-games.progaindia.com"+"";
var siteCode = getUrlVar("full_site_code");

var networkCode = "";
var isGermanUI = false;

if (siteCode === "xyzxyz") {
	isGermanUI = true;
}

if (getUrlVar('super_meter_enabled') == 1) {
	isGermanUI = true;
}


if (siteCode) networkCode = siteCode.slice(2, 5);

var gameURL = new URL(window.location.href);
// These are not actual URLs, these are just to check if some URL is set or not
// If not, disable/hide home and deposit button respectively
// Actual URL set is there in coreApp => setURLs()
var lobbyURLTest = gameURL.searchParams.get("lobby_url");;
var depositURLTest = gameURL.searchParams.get("deposit_url");
var _amountType = gameURL.searchParams.get("amount_type") || "1";
var _isDemoMode = (_amountType === "4") ? true : false;
//Matrix: Show operator erros
//Dench: Don't show operator errors
//Default: Don't show operator errors
//Used In: ErrorController.js => onError()
// commonConfig["isSuperMeter"] = false;

commonConfig["serverURL"] = "/src/slots/server.php";
if (gameName == "raiden") {
	commonConfig["serverURL"] = "/src/slots_raiden/server.php";
}

if (gameName == "ninjagold") {
	commonConfig["serverURL"] = "/src/slots_ninja/server.php";
}

if (gameName == "terracottawarrior" || gameName == "mysticalforestadventure"|| gameName == "sugarbox") {
	commonConfig["serverURL"] = "/Server/server.php";
}
if (gameName == "sugarbox") {
    commonConfig["serverURL"] = "/src/cyprusSlots/server.php";
	// commonConfig["serverURL"] = "/Server/server.php";
}


switch (networkCode) {
	default:
		break;
}
if (_isDemoMode) {
	commonConfig["hideHistoryButton"] = true;
}

commonConfig["lobbyURL"] = commonConfig["serverIP"] + "/games/ninja";
commonConfig["logsPath"] = commonConfig["serverIP"] + "/games/slots/logs/";

commonConfig["noSwipeUp"] = false;

if (lobbyURLTest == undefined || lobbyURLTest == "" || lobbyURLTest == "None") {
	commonConfig["hideHomeButtonInDesktop"] = true;
	commonConfig["hideHomeButtonMobile"] = true;
}