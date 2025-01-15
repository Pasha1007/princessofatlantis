var appPath;

function getUrlVar(requestedKey, url) {
	"use strict";
	var vars = [], hashes, hash, i;
	var path = url || window.location.href;
	var temp_hashes = path.slice(path.indexOf('?') + 1);


	temp_hashes = temp_hashes.replace("#", "");
	hashes = temp_hashes.split('&');
	for (i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	if (typeof requestedKey === ' undefined') {
		return vars;
	} else {
		return vars[requestedKey];
	}
}

function addCSS(path, callback) {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = path;
	link.media = 'all';
	head.appendChild(link);
}

function addScript(path, callback) {
	var el = document.createElement("script");
	document.getElementsByTagName("body")[0].appendChild(el);
	el.onload = function (data) { if (callback) callback(data); };
	el.src = path + '?ver=' + version;
	el.type = 'text/javascript';
}

var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
var isDesktop = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent));
var mainPath = document.getElementById("mainJS").src;
var version = getUrlVar("v", mainPath) || 201907101132;
var gameName = getUrlVar("game_name");
var userName = getUrlVar("username");
var siteCode = getUrlVar("full_site_code") || "";
siteCode = siteCode.toUpperCase();
var lang = getUrlVar('language') || "en";
var desktopFullScreen = getUrlVar('desktopFullScreen') || false;
var env = getUrlVar('env') || "";           //Using variable in CoreApp.js in loadLiteralFiles function
var _ng = _ng || {};

if (siteCode === "test") {
	desktopFullScreen = true;
}

var jsArr = [];
var jsCount = 0;

if (env === "lcl" || env === "local") {
	env = "lcl"
	appPath = "app/";
	jsArr.push("app/core/configs/CoreConfig.js");
	jsArr.push("app/core/app/CoreApp.js");
} else {
	appPath = "";
	var sMin = (env === "" || env === "stg") ? "-min" : "";
	jsArr.push("core/vgLib" + sMin + ".js");
	jsArr.push("core/vgCore" + sMin + ".js");
	jsArr.push("core/vgSlot" + sMin + ".js");
	jsArr.push("core/" + (isMobile ? "vgMobileAddons" : "vgDesktopAddons") + sMin + ".js");
	jsArr.push("games/" + gameName + "/game" + sMin + ".js");
}

onJSLoad = function () {
	if (jsCount < jsArr.length - 1) {
		jsCount++;
		loadGameFile();
	} else {
		onLoadedGame();
	}
}

loadGameFile = function () {


	addScript(jsArr[jsCount], onJSLoad);
	// addCSS(appPath + "games/" + gameName + "/dist/gameStyle.css");
}
//loadGameFile();

var closeBtn = document.getElementById("closeBtn");
closeBtn.src = appPath + "games/rules/en/images/" + gameName + "/closeBtn.png";

// -----------------------
function onLoadedGame() {
	"use strict";

	if (env === "lcl") {
		coreApp = new _ng.CoreApp(gameName);
	} else {
		_ng.CoreApp.prototype.loadJSFiles = function (loadingIndex) { }
		coreApp = new _ng.CoreApp(gameName);
		coreApp.mergeConfig();
		coreApp.initializeGame();
	}

	if (desktopFullScreen == false || desktopFullScreen == "false") {
		var elm = document.getElementById("containerbg");
		elm.src = appPath + "games/" + gameName + "/dist/containerbg.jpg";
		elm.width = "100%";
		elm.height = "100%";
	}
}

function onGameRulesToggle(bool) {
	if (!bool && isMobile) {
		_mediator.publish(_events.core.onResize);
	}
	// _sndLib.play(_sndLib.sprite.btnClick);
	var gameRulesElement = document.getElementById("gameRules");
	gameRulesElement.style.display = bool ? "block" : "none";
}

// function onGamePaytableToggle(bool) {
// 	if (!bool && isMobile) {
// 		_mediator.publish(_events.core.onResize);
// 	}
// 	_sndLib.play(_sndLib.sprite.btnClick);
// 	var gamePaytableElement = document.getElementById("gamePaytable");
// 	gamePaytableElement.style.display = bool ? "block" : "none";
// }

function setupFullscreenMode() {
	if (desktopFullScreen == true || desktopFullScreen == "true") {
		document.getElementById("canvasContainer").style.width = '100%';
		document.getElementById("canvasContainer").style.height = '100%';
		document.getElementsByTagName("canvas")[0].style.width = '100%'
		document.getElementsByTagName("canvas")[0].style.height = '100%';
	}
}

function stopAutospins() {
	_mediator.publish("cancelAutoSpin");
}

// --------------------------------------
document.addEventListener('gesturestart', function (e) {
	e.preventDefault();
});

var doubleTouchStartTimestamp = 0;
document.addEventListener("touchstart", function (event) {
	var now = +(new Date());
	if (doubleTouchStartTimestamp + 500 > now) {
		event.preventDefault();
	}
	doubleTouchStartTimestamp = now;
});
