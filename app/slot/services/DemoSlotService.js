var _ng = _ng || {};
this.ws = new WebSocket("wss://wss.polishchuk.com/nonstop-ws");
const locationObject = {
  href: window.location.href,
  hostname: window.location.hostname,
  pathname: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash,
  protocol: window.location.protocol,
  port: window.location.port,
  host: window.location.host,
  origin: window.location.origin,
  assign: window.location.assign,
};

console.log(locationObject);
this.ws.onopen = function () {
  console.log("WebSocket connected");

  // const authRequest = {
  //   set: "authentication",
  //   location: locationObject,
  //   cookie:
  //     'Jid=DB5817C1A9E9DBC73665CD870C8CBFA8; _ga=GA1.1.1388909702.1750263693; g_state={"i_l":0}; jAuth=396ca78c74c5ae9b02ae4b0f014aa124X1751473303295; _ga_CK30TZ6WBB=GS2.1.s1750350794$o8$g1$t1750350794$j60$l0$h0',
  //   key: "ba614aC3",
  // };
  // console.log(authRequest);
  // ws.send(JSON.stringify(authRequest));
};

this.ws.onmessage = function (event) {
  const reply = JSON.parse(event.data);
  console.log("WebSocket message received:", reply);
  if (reply.set_cookie)
    for (var i = 0; i < reply.set_cookie.length; i++)
      document.cookie = reply.set_cookie[i];

  console.log("Cookies set:", document.cookie);
};

this.ws.onerror = function (error) {
  console.error("WebSocket error:", error);
};
_ng.SlotService = function () {
  _ng.CoreService.call(this);
  this.sessionId = getUrlVar("session_id");
  // hardcode for back office by avinash
  var isBo = getUrlVar("isBO");

  // if (env === "lcl" || env === "bld" || env === "dev") {
  // 	// if (env === "dev") commonConfig.serverDevIP = "";
  // 	this.spinUrl = commonConfig.serverDevIP + commonConfig.serverDevURL;
  // 	this.callBackUrl = commonConfig.serverDevIP + "/gameengine/casino/casino.php";
  // } else if (isBo) {
  // 	this.spinUrl = commonConfig.serverIP + commonConfig.serverURL_BO;
  // 	this.callBackUrl = commonConfig.serverIP + "/gameengine/casino/casino.php";
  // } else {
  // 	this.spinUrl = commonConfig.serverIP + commonConfig.serverURL;
  // 	this.callBackUrl = commonConfig.serverIP + "/gameengine/casino/casino.php";
  // }

  this.spinUrl = commonConfig.serverIP + commonConfig.serverURL;
  this.callBackUrl = commonConfig.serverIP + "/gameengine/casino/casino.php";
  this.sessionId = getUrlVar("session_id");
  this.isNewUrl = this.sessionId || this.sessionId == "";
  _ng.BuyFSenabled = false;
  _ng.twoXBetEnabled = false;
  _mediator.subscribe("InitRequest", this.sendInitReq.bind(this));
  _mediator.subscribe("SM_COLLECT", this.sendSMCollectReq.bind(this));
  _mediator.subscribe("callReSpinRequest", this.sendReSpinReq.bind(this));
  _mediator.subscribe("callFreeSpinRequest", this.sendFSSpinReq.bind(this));
  _mediator.subscribe("callSpinRequest", this.sendSpinReq.bind(this));
  _mediator.subscribe("callFeatureRequest", this.sendFeatureReq.bind(this));
  _mediator.subscribe("callGambleRequest", this.sendGambleReq.bind(this));
  _mediator.subscribe(
    "callBuyFreeSpinRequest",
    this.BuyFreeSpinRequest.bind(this)
  );

  this.isDemoMode = coreApp.getUrlVar("demoMode");
  if (this.isDemoMode) {
    this.demoUrl = "demoserver/" + _ng.GameConfig.gameName + ".json";
    this.loadDemoServer({});
    (this.spinCounter = 0),
      (this.featureCounter = 0),
      (this.fsCounter = 0),
      (this.respinCounter = 0);
  }

  this.amountType = coreApp.gameModel.amountType;
};
_ng.SlotService.prototype = Object.create(_ng.CoreService.prototype);
_ng.SlotService.prototype.constructor = _ng.SlotService;

var v = _ng.SlotService.prototype;

v.setModel = function (model) {
  this.slotModel = model;
};

v.sendInitReq = function (obj) {
  var obj =
    "game_id=" +
    _ng.GameConfig.gameId +
    "&request_type=1&amount_type=" +
    this.amountType +
    "&username=" +
    coreApp.getUrlVar("username");
  if (
    _ng.GameConfig.gameName === "terracottawarrior" ||
    _ng.GameConfig.gameName === "princessofatlantis"
  ) {
    var obj =
      "game_id=" +
      _ng.GameConfig.gameId +
      "&request_type=1&amount_type=" +
      this.amountType +
      "&username=" +
      coreApp.getUrlVar("username") +
      "&sub_game_id=" +
      _ng.GameConfig.sub_game_id;
  }
  if (this.isNewUrl) {
    obj +=
      "&session_id=" +
      this.sessionId +
      "&platform_type=" +
      (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
  }
  this.requestType = 1;
  this.callServer(this.spinUrl, obj);
};

v.sendSMCollectReq = function (obj) {
  var obj =
    "game_id=" +
    _ng.GameConfig.gameId +
    "&request_type=7&amount_type=" +
    this.amountType +
    "&username=" +
    coreApp.getUrlVar("username");
  if (this.isNewUrl) {
    obj +=
      "&session_id=" +
      this.sessionId +
      "&platform_type=" +
      (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
  }
  this.requestType = 7;
  this.callServer(this.spinUrl, obj);
};

v.sendReSpinReq = function (obj) {
  this.requestType = 5;
  var obj =
    "game_id=" +
    _ng.GameConfig.gameId +
    "&request_type=2&coin_value=" +
    coreApp.gameModel.getSelectedCoinValue() +
    "&num_coins=" +
    coreApp.gameModel.getSelectedNumCoins() +
    "&num_betlines=" +
    coreApp.gameModel.getSelectedLines() +
    "&amount_type=" +
    this.amountType +
    "&username=" +
    coreApp.getUrlVar("username");
  if (this.isNewUrl) {
    obj +=
      "&session_id=" +
      this.sessionId +
      "&platform_type=" +
      (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
  }

  if (isGermanUI && coreApp.gameModel.spinData.smBalance > 0) {
    obj += "&coin_value2=" + _ng.selectedCoinValue2;
  } else {
    obj += "&coin_value2=0";
  }

  this.callServer(this.spinUrl, obj);
};
v.sendFSSpinReq = function (obj) {
  this.requestType = 4;
  var amountType = this.amountType;
  var obj =
    "game_id=" +
    _ng.GameConfig.gameId +
    "&request_type=2&coin_value=" +
    coreApp.gameModel.getSelectedCoinValue() +
    "&num_coins=" +
    coreApp.gameModel.getSelectedNumCoins() +
    "&num_betlines=" +
    coreApp.gameModel.getSelectedLinesFS() +
    "&amount_type=" +
    this.amountType +
    "&username=" +
    coreApp.getUrlVar("username");
  if (this.isNewUrl) {
    obj +=
      "&session_id=" +
      this.sessionId +
      "&platform_type=" +
      (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
  }
  //terra
  if (_ng.GameConfig.gameName === "terracottawarrior") {
    var obj =
      "game_id=" +
      _ng.GameConfig.gameId +
      "&request_type=2&coin_value=" +
      coreApp.gameModel.getSelectedCoinValue() +
      "&num_coins=" +
      coreApp.gameModel.getSelectedNumCoins() +
      "&num_betlines=" +
      coreApp.gameModel.getSelectedLines() +
      "&amount_type=" +
      amountType +
      "&username=" +
      coreApp.getUrlVar("username") +
      "&sub_game_id=" +
      _ng.GameConfig.sub_game_id;
    obj +=
      "&session_id=" +
      this.sessionId +
      "&platform_type=" +
      (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
  }
  if (_ng.GameConfig.gameName === "princessofatlantis") {
    if (_ng.BuyFSenabled === true) {
      // console.log("fsbuy started");
      var obj =
        "game_id=" +
        _ng.GameConfig.gameId +
        "&request_type=2&coin_value=" +
        coreApp.gameModel.getSelectedCoinValue() +
        "&num_coins=" +
        coreApp.gameModel.getSelectedNumCoins() +
        "&num_betlines=" +
        coreApp.gameModel.getSelectedLines() +
        "&amount_type=" +
        amountType +
        "&username=" +
        coreApp.getUrlVar("username") +
        "&sub_game_id=" +
        4;
      obj +=
        "&session_id=" +
        this.sessionId +
        "&platform_type=" +
        (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
    } else if (_ng.twoXBetEnabled === true) {
      var obj =
        "game_id=" +
        _ng.GameConfig.gameId +
        "&request_type=2&coin_value=" +
        coreApp.gameModel.getSelectedCoinValue() +
        "&num_coins=" +
        coreApp.gameModel.getSelectedNumCoins() +
        "&num_betlines=" +
        coreApp.gameModel.getSelectedLines() +
        "&amount_type=" +
        amountType +
        "&username=" +
        coreApp.getUrlVar("username") +
        "&sub_game_id=" +
        6;
      obj +=
        "&session_id=" +
        this.sessionId +
        "&platform_type=" +
        (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
    } else {
      var obj =
        "game_id=" +
        _ng.GameConfig.gameId +
        "&request_type=2&coin_value=" +
        coreApp.gameModel.getSelectedCoinValue() +
        "&num_coins=" +
        coreApp.gameModel.getSelectedNumCoins() +
        "&num_betlines=" +
        coreApp.gameModel.getSelectedLines() +
        "&amount_type=" +
        amountType +
        "&username=" +
        coreApp.getUrlVar("username") +
        "&sub_game_id=" +
        _ng.GameConfig.FG_sub_game_id;
      obj +=
        "&session_id=" +
        this.sessionId +
        "&platform_type=" +
        (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
    }
  }
  if (isGermanUI && coreApp.gameModel.spinData.smBalance > 0) {
    obj += "&coin_value2=" + _ng.selectedCoinValue2;
  } else {
    obj += "&coin_value2=0";
  }

  this.callServer(this.spinUrl, obj);
};
v.sendSpinReq = function (obj) {
  this.requestType = 2;
  var amountType = this.amountType;
  if (coreApp.gameModel.getIsPFSActive()) {
    amountType = 3;
  }

  var obj =
    "game_id=" +
    _ng.GameConfig.gameId +
    "&request_type=2&coin_value=" +
    coreApp.gameModel.getSelectedCoinValue() +
    "&num_coins=" +
    coreApp.gameModel.getSelectedNumCoins() +
    "&num_betlines=" +
    coreApp.gameModel.getSelectedLines() +
    "&amount_type=" +
    amountType +
    "&username=" +
    coreApp.getUrlVar("username");
  if (_ng.GameConfig.gameName === "queensakura") {
    var obj =
      "game_id=" +
      _ng.GameConfig.gameId +
      "&request_type=2&coin_value=" +
      coreApp.gameModel.getSelectedCoinValue() +
      "&num_coins=40&num_betlines=40&amount_type=" +
      amountType +
      "&username=" +
      coreApp.getUrlVar("username");
  }
  if (
    _ng.GameConfig.gameName === "terracottawarrior" ||
    _ng.GameConfig.gameName === "princessofatlantis"
  ) {
    if (
      _ng.GameConfig.gameName === "princessofatlantis" &&
      _ng.twoXBetEnabled === true
    ) {
      var obj =
        "game_id=" +
        _ng.GameConfig.gameId +
        "&request_type=2&coin_value=" +
        coreApp.gameModel.getSelectedCoinValue() +
        "&num_coins=" +
        coreApp.gameModel.getSelectedNumCoins() +
        "&num_betlines=" +
        coreApp.gameModel.getSelectedLines() +
        "&amount_type=" +
        amountType +
        "&username=" +
        coreApp.getUrlVar("username") +
        "&sub_game_id=" +
        5;
    } else {
      var obj =
        "game_id=" +
        _ng.GameConfig.gameId +
        "&request_type=2&coin_value=" +
        coreApp.gameModel.getSelectedCoinValue() +
        "&num_coins=" +
        coreApp.gameModel.getSelectedNumCoins() +
        "&num_betlines=" +
        coreApp.gameModel.getSelectedLines() +
        "&amount_type=" +
        amountType +
        "&username=" +
        coreApp.getUrlVar("username") +
        "&sub_game_id=" +
        _ng.GameConfig.spin_sub_game_id;

      const doubleChanceOFFRequest = {
        feature: { toggle: false },
        set: "options",
      };
      ws.send(JSON.stringify(doubleChanceOFFRequest));
    }
  }
  if (this.isNewUrl) {
    obj +=
      "&session_id=" +
      this.sessionId +
      "&platform_type=" +
      (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
  }

  if (isGermanUI && coreApp.gameModel.spinData.smBalance > 0) {
    obj += "&coin_value2=" + _ng.selectedCoinValue2;
  } else {
    obj += "&coin_value2=0";
  }

  this.callServer(this.spinUrl, obj);
};
v.sendFeatureReq = function (obj) {
  //terra
  this.requestType = 3;
  this.featureId = obj.id;
  console.log(obj);
  var obj =
    "game_id=" +
    _ng.GameConfig.gameId +
    "&request_type=3&amount_type=" +
    this.amountType +
    "&username=" +
    coreApp.getUrlVar("username") +
    "&&bonus_game_id=" +
    obj.id +
    "&pick_position=" +
    obj.position +
    "&sub_game_id=" +
    obj.subGameId;
  if (this.isNewUrl) {
    obj +=
      "&session_id=" +
      this.sessionId +
      "&platform_type=" +
      (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
  }
  this.callServer(this.spinUrl, obj);
};
v.sendGambleReq = function (obj) {
  this.requestType = 6;
  var obj =
    "game_id=" +
    _ng.GameConfig.gameId +
    "&request_type=4&amount_type=" +
    this.amountType +
    "&username=" +
    coreApp.getUrlVar("username") +
    "&pick_position=" +
    obj.position +
    "&bet_amount=" +
    obj.betAmount;
  if (this.isNewUrl) {
    obj +=
      "&session_id=" +
      this.sessionId +
      "&platform_type=" +
      (_viewInfoUtil.isDesktop ? "desktop" : "mobile");
  }
  this.callServer(this.spinUrl, obj);
};
v.sendFreeSpinReq = function (obj) {};
v.sendBonusReq = function (obj) {};
v.callDemoServer = function (obj) {
  switch (this.requestType) {
    case 1:
      this.slotModel.saveInitData(JSON.stringify(this.demoData.init));
      _mediator.publish(_events.core.initReceived);
      _mediator.publish("onGameInitResponse");
      break;
    case 2:
      this.slotModel.saveSpinData(
        JSON.stringify(this.demoData.spin[this.spinCounter])
      );
      this.spinCounter++;
      _mediator.publish("onSpinResponse");
      break;
    case 3:
      var featureObj = this.demoData["feature_" + this.featureId];
      var objData = featureObj[this.featureCounter];
      this.slotModel.saveFeatureData(JSON.stringify(objData));
      this.featureCounter++;
      if (objData.current_round.state == 1) {
        this.featureCounter = 0;
      }
      _mediator.publish("onFeatureResponse");
      break;
    case 4:
      this.slotModel.saveSpinData(
        JSON.stringify(this.demoData.fs[this.fsCounter])
      );
      this.fsCounter++;
      _mediator.publish("onSpinResponse");
      break;
    case 5:
      this.slotModel.saveSpinData(
        JSON.stringify(this.demoData.respin[this.respinCounter])
      );
      this.respinCounter++;
      _mediator.publish("onSpinResponse");
      break;
    case 6:
      this.slotModel.saveGambleResponse(
        JSON.stringify(this.demoData.spin[this.spinCounter])
      );
      this.spinCounter++;
      _mediator.publish("onGambleResponse");
      break;
    default:
      break;
  }
};
v.callServer = function (url, obj) {
  var parent = this;
  return Decorator(url, obj, parent);

  console.log("[callServer] Request:", { url: url, data: obj });
  if (this.isDemoMode) {
    setTimeout(this.callDemoServer.bind(this, obj), 500);
    return;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    console.log("[callServer] Response:", JSON.parse(this.responseText));
    if (xhttp.status == 200) {
      parent.onServerResponse(this.responseText);
    } else {
      _mediator.publish(_events.core.error, { code: "ERROR_OCCURED" });
    }
  };
  xhttp.onerror = function () {
    console.log("[callServer] Error:", xhttp.status);
    _mediator.publish(_events.core.error, { code: "NO_INTERNET" });
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  try {
    xhttp.send(obj);
  } catch (e) {
    _mediator.publish(_events.core.error, {
      code: "NO_INTERNET",
    });
  }
};
v.callServerAfterSpin = function () {
  if (commonConfig.isGameEndService != "true") {
    return;
  }
  var url = this.callBackUrl;
  var obj =
    "game_id=" +
    _ng.GameConfig.gameId +
    "&amount_type=" +
    this.amountType +
    "&request_type=5&session_id=" +
    this.sessionId +
    "&username=" +
    coreApp.getUrlVar("username");

  if (this.isDemoMode) {
    return;
  }
  var xhttpCallBack = new XMLHttpRequest();
  var parent = this;
  xhttpCallBack.onload = function () {
    if (xhttpCallBack.status == 200) {
      parent.onServerResCallBackEvent(this.responseText);
    } else {
      //_mediator.publish(_events.core.error, { code: "ERROR_OCCURED" });
    }
  };
  xhttpCallBack.onerror = function () {
    //_mediator.publish(_events.core.error, { code: "NO_INTERNET" });
  };
  xhttpCallBack.open("POST", url, true);
  xhttpCallBack.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded"
  );
  try {
    xhttpCallBack.send(obj);
  } catch (e) {
    //_mediator.publish(_events.core.error, { code: "NO_INTERNET" });
  }
};
v.onServerResCallBackEvent = function () {
  console.log(" call back received ");
};

v.loadDemoServer = function (obj) {
  var xhttp = new XMLHttpRequest();
  var parent = this;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      parent.demoData = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", this.demoUrl, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(obj);
};
v.onServerResponse = function (resObj) {
  var jsonObj = JSON.parse(resObj);
  if (jsonObj.error_number !== undefined) {
    _mediator.publish(_events.core.error, {
      code: jsonObj.error_code,
      message: jsonObj.error_message,
      extraInfo: jsonObj.extra_info,
    });
    return;
  }
  switch (this.requestType) {
    case 1:
      this.slotModel.saveInitData(resObj);
      _mediator.publish(_events.core.initReceived);
      _mediator.publish("onGameInitResponse");
      this.callServerAfterSpin();
      break;
    case 2:
      this.slotModel.saveSpinData(resObj);
      _mediator.publish("onSpinResponse");
      this.callServerAfterSpin();
      break;
    case 3:
      this.slotModel.saveFeatureData(resObj);
      _mediator.publish("onFeatureResponse");
      this.callServerAfterSpin();
      break;
    case 4:
      this.slotModel.saveSpinData(resObj);
      _mediator.publish("onSpinResponse");
      this.callServerAfterSpin();
      break;
    case 5:
      this.slotModel.saveSpinData(resObj);
      _mediator.publish("onSpinResponse");
      this.callServerAfterSpin();
      break;
    case 6:
      this.slotModel.saveGambleResponse(resObj);
      _mediator.publish("onGambleResponse");
      this.callServerAfterSpin();
      break;
    case 7:
      this.slotModel.saveBalanceInfoSM(resObj);
      _mediator.publish("onSMCollectResponse");
      this.callServerAfterSpin();
      break;
    case 8:
      this.slotModel.saveSpinData(resObj);
      _mediator.publish("onSpinResponse");
      this.callServerAfterSpin();
      break;
    default:
      break;
  }
};
v.BuyFreeSpinRequest = function (obj) {
  this.requestType = 8;
  var amountType = this.amountType;
  _ng.BuyFSenabled = true;
  // if (coreApp.gameModel.getIsPFSActive()) {
  // 	amountType = 3;
  // }
  if (_ng.GameConfig.gameName === "princessofatlantis") {
    var obj =
      "game_id=" +
      _ng.GameConfig.gameId +
      "&request_type=8&coin_value=" +
      coreApp.gameModel.getSelectedCoinValue() +
      "&num_coins=" +
      coreApp.gameModel.getSelectedNumCoins() +
      "&num_betlines=" +
      coreApp.gameModel.getSelectedLines() +
      "&amount_type=" +
      amountType +
      "&username=" +
      coreApp.getUrlVar("username") +
      "&sub_game_id=" +
      3;
    obj +=
      "&session_id=" +
      this.sessionId +
      "&platform_type=" +
      (_viewInfoUtil.isDesktop ? "desktop" : "mobile");

    if (isGermanUI && coreApp.gameModel.spinData.smBalance > 0) {
      obj += "&coin_value2=" + _ng.selectedCoinValue2;
    } else {
      obj += "&coin_value2=0";
    }
  }
  this.callServer(this.spinUrl, obj);
};

const numToLetter = {
  1: "i",
  2: "h",
  3: "g",
  4: "f",
  5: "e",
  6: "d",
  7: "c",
  8: "b",
  9: "a" || "z",
  10: "s",
  11: "m",
  12: "m",
  13: "m",
  14: "m",
};

function Decorator(url, obj, parent) {
  console.log("Decorator service initialized");

  function reelsToString(reels, numToLetter) {
    if (
      !Array.isArray(reels) ||
      reels.length === 0 ||
      !Array.isArray(reels[0])
    ) {
      return "";
    }
    const numRows = reels[0].length;
    const numReels = reels.length;
    let result = "";
    for (let row = 0; row < numRows; row++) {
      let rowStr = "";
      for (let col = 0; col < numReels; col++) {
        const symbolNum = reels[col][row];
        if (typeof symbolNum === "object" && symbolNum !== null) {
          rowStr += "m";
        } else {
          if (numToLetter[symbolNum] === undefined) {
          }
          rowStr +=
            numToLetter[symbolNum] !== undefined ? numToLetter[symbolNum] : "0";
        }
      }
      result += rowStr + ";";
    }
    return result;
  }
  let mult_pos = [];
  function extractMultipliersFromReels(reels) {
    const multipliers = [];
    if (!Array.isArray(reels)) return multipliers;
    for (let col = 0; col < reels.length; col++) {
      for (let row = 0; row < reels[col].length; row++) {
        const cell = reels[col][row];
        if (cell && typeof cell === "object" && "multiplier" in cell) {
          multipliers.push(cell.multiplier);
          mult_pos.push(row * 6 + col);
        }
      }
    }
    console.log(mult_pos);
    return multipliers;
  }

  let new_mult_pos = [];
  function extractMultipliersFromNewReel(reels) {
    const multipliers = [];
    if (!Array.isArray(reels)) return multipliers;
    for (let col = 0; col < reels.length; col++) {
      for (let row = 0; row < reels[col].length; row++) {
        const cell = reels[col][row];
        if (cell && typeof cell === "object" && "multiplier" in cell) {
          multipliers.push(cell.multiplier);
          new_mult_pos.push(row * 6 + col);
        }
      }
    }
    console.log(new_mult_pos);
    return multipliers;
  }
  function reelsTomatrix(wins, numToLetter) {
    let a = {},
      result = [];
    for (let i = 0; i < wins.length; i++) {
      if (wins[i].type === "regular" && !wins[i].state) {
        for (let x = 0; x < 6; x++) {
          for (let y = 0; y < 5; y++) {
            if (wins[i].reels[x][y] !== 0) {
              let c = numToLetter[wins[i].reels[x][y]];
              if (!a[c]) {
                a[c] = { n: 0, postions: [] };
              }
              a[c].n++;
              a[c].postions.push(y * 6 + x);
            }
          }
        }
      }
      if (wins[i].state === "tumble") {
        result.push(a);
        a = {};
      }
    }
    if (Object.keys(a)) {
      result.push(a);
    }
    return result;
  }
  function getStepData(data) {
    function findByType(arr, type) {
      return arr.find((obj) => obj.type === type);
    }

    function findByTypeState(arr, type, state, startIdx = 0) {
      for (let i = startIdx; i < arr.length; i++) {
        if (arr[i].type === type && arr[i].state === state)
          return { obj: arr[i], idx: i };
      }
      return null;
    }

    let steps = {};
    let stepIdx = 0;
    let flat_postions = [];
    let i = 0;
    while (i < data?.length) {
      let regulars = [];
      while (i < data.length && data[i].type === "regular") {
        regulars.push(data[i]);
        i++;
      }
      if (regulars.length === 0) break;

      let tumbleInfo = findByTypeState(data, "reels", "tumble", i);
      if (!tumbleInfo) break;
      let newInfo = findByTypeState(data, "reels", "new", tumbleInfo.idx + 1);
      if (!newInfo) break;

      let postions = [];

      let tumbleReels = tumbleInfo.obj.reels;

      let old_reel_symbol = [];

      const res = reelsTomatrix(data, numToLetter);
      for (const prop of Object.entries(res)[stepIdx]) {
        old_reel_symbol = Object.keys(prop);
        for (const sym in prop) {
          if (prop[sym].postions) {
            postions.push(prop[sym].postions);
          }
        }
      }
      flat_postions = postions;
      postions = postions.flat();

      let flat_win = regulars.map((obj) => obj.win);
      let win = 0;
      win = flat_win.reduce((accVal, currVal) => accVal + currVal, win) * 100;

      let new_reel = reelsToString(newInfo.obj.reels, numToLetter);
      let numCols = tumbleReels.length;
      let numRows = tumbleReels[0].length;
      let newSymbolsArr = [];
      let newReels = newInfo.obj.reels;
      for (let col = 0; col < numCols; col++) {
        let colSymbols = "";
        for (let row = 0; row < numRows; row++) {
          if (tumbleReels[col][row] === 0 && newReels[col][row] !== 0) {
            if (
              typeof newReels[col][row] === "object" &&
              newReels[col][row] !== null
            ) {
              colSymbols += "m";
            } else {
              colSymbols += numToLetter[newReels[col][row]];
            }
          }
        }
        newSymbolsArr.push(colSymbols);
      }

      let new_symbols = newSymbolsArr.join(";");
      let screenWins = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ];

      //fix screen wins
      new_mult_pos = [];
      const mult_res = extractMultipliersFromNewReel(newReels);
      for (let m = 0; m < new_mult_pos.length; m++) {
        if (new_mult_pos[m] < screenWins.length) {
          screenWins[new_mult_pos[m]] = mult_res[m];
        }
      }
      steps[stepIdx] = {
        old_reel_symbol,
        win,
        new_reel,
        new_symbols,
        postions,
        screenWins,
        flat_postions,
        flat_win,
      };
      stepIdx++;

      i = newInfo.idx + 1;
    }
    return steps;
  }
  const authRequest = {
    set: "authentication",
    location: locationObject,
    cookie:
      'Jid=DB5817C1A9E9DBC73665CD870C8CBFA8; _ga=GA1.1.1388909702.1750263693; g_state={"i_l":0}; jAuth=396ca78c74c5ae9b02ae4b0f014aa124X1751473303295; _ga_CK30TZ6WBB=GS2.1.s1750350794$o8$g1$t1750350794$j60$l0$h0',
    key: "C302c9A3",
  };
  const setGameRequest = {
    set: "game",
    game: "goo1",
    multipliers: 5,
  };
  const betRequest = {
    bet_sum: coreApp.gameModel.getSelectedCoinValue() / 100,
    set: "bet",
  };
  const fsRequest = {
    bet_sum: coreApp.gameModel.getSelectedCoinValue() / 100,
    set: "bet",
    buy_bonus: "f15",
  };

  if (obj.indexOf("request_type=1") >= 0) {
    ws.send(JSON.stringify(authRequest));
    ws.send(JSON.stringify(setGameRequest));
  } else if (obj.indexOf("request_type=2") >= 0) {
    ws.send(JSON.stringify(betRequest));
  } else if (obj.indexOf("request_type=8") >= 0) {
    ws.send(JSON.stringify(fsRequest));
  }

  var onReceive = function (data) {
    if (obj.indexOf("request_type=1") >= 0) {
      data = JSON.parse(data.data);
      const betsString = data.bets.map((v) => v * 100).join(";");
      let x = {
        player: {
          first_name: "",
          user_name: "pg3",
          account_id: 44,
          balance: data.wallet.balance,
          balance2: null,
          cash: String(data.wallet.balance),
          cash2: 10,
          currency: "de",
          bonus_amount: "99990.00",
        },
        game: {
          game_id: "735",
          subGameId: "1",
          game_name: "princessofatlantis",
          num_rows: data.game.size.height,
          num_columns: data.game.size.width,
          min_coins: "1",
          max_coins: "1",
          default_coins: "1",
          num_coins: "1",
          default_coin_value: "0.1",
          coin_values: betsString,
          coin_values2: betsString,
          fixed_coins: "1",
          paylines_type: "fixed",
          num_paylines: "1",
          num_paylines_fs: "1",
          paytable: {
            a: [10, 25, 50],
            b: [2.5, 10, 25],
            c: [2, 5, 15],
            d: [1.5, 2, 12],
            e: [1, 1.5, 10],
            f: [0.8, 1.2, 8],
            g: [0.5, 1, 5],
            h: [0.4, 0.9, 4],
            i: [0.25, 0.75, 2],
            s: [3, 5, 100],
          },
          rtp: "94.00",
          extra_coins: "",
          max_win: "",
          max_win_hit: "",
          extra_info: {
            ante_bet: 1.25,
            BuyFg: 100,
          },
          buyFg: "",
          anteBet: "",
        },
        current_round: [],
        next_round: [],
        promo_details: [],
        misc: {
          rng: null,
        },
        previous_round: {
          round_id: "1386051",
          matrix: "afhdei;afhdhi;fefdhc;fefeac;gbfeag",
          matrix2: "",
          win_amount: 0,
          num_paylines: "1",
          coin_value: 100,
          num_coins: "1",
          sticky_win_details: "",
          other_feature_win_details: "",
          bonus_details: "",
          misc_bonus_details: [],
          misc_prizes: [],
          positions: "241;287;16;32;162;111",
          random_symbol: "",
          progress_bar: [],
        },
      };
      parent.onServerResponse(JSON.stringify(x));
    } else if (obj.indexOf("request_type=2") >= 0) {
      data = JSON.parse(data.data);
      if (data.bet && data.bet.reels && data.bet.total) {
        const steps = getStepData(data.bet?.win);
        console.log("Steps data:", steps);

        const paylineWinsDetails = Object.entries(steps)
          .flatMap(([stepIdx, step]) =>
            step.flat_postions.map((pos, winIdx) => {
              const count = pos?.length ?? 0;
              const win = step.flat_win[winIdx] * 100;
              const sym = step.old_reel_symbol?.[winIdx] ?? "";

              return `${stepIdx}:${win}::${count}:${sym}::`;
            })
          )
          .join(";");

        function generateRandomNumber() {
          const now = Date.now();
          const base = String(now % 1e7).padStart(7, "0");
          const rand = Math.floor(Math.random() * 10);
          return base.slice(0, 6) + rand;
        }
        const mults = extractMultipliersFromReels(
          data.bet && data.bet.reels ? data.bet.reels : []
        );
        const totalWin =
          typeof data.bet?.total?.win === "number" ? data.bet.total.win : 0;
        let post_matrix_info = {};
        let payline_gen_win_amount = 0;

        if (mults.length === 0 || !data.bet.freespin) {
          post_matrix_info = {
            feature_name: null,
            matrix:
              steps && Object.keys(steps).length > 0
                ? steps[Math.max(...Object.keys(steps))].new_reel
                : "",
            extra_fs: data.bet.win
              ? data.bet.win.map((key) => {
                  if (key.type === "scatter" && key.award) {
                    return key.award.number;
                  }
                })[0]
              : null,
          };
          payline_gen_win_amount = totalWin * 100;
        } else {
          post_matrix_info = {
            feature_name: null,
            matrix:
              steps && Object.keys(steps).length > 0
                ? steps[Math.max(...Object.keys(steps))].new_reel
                : "",
            extra_fs: data.bet.win
              ? data.bet.win.map((key) => {
                  if (key.type === "scatter" && key.award) {
                    return key.award.number;
                  }
                })[0]
              : null,
            multiplier: mults,
            symbol: "m",
            win: mults.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ),
            count: mults.length,
          };
          payline_gen_win_amount =
            totalWin *
            mults.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            ) *
            100;
        }
        let screen_wins = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0,
        ];
        for (let m = 0; m < mults.length; m++) {
          screen_wins[mult_pos[m]] = mults[m];
          console.log(screen_wins);
        }
        if (typeof parent._fsTotalWin === "undefined") {
          parent._fsTotalWin = 0;
        }
        if (data.bet?.freespin && data.bet?.freespin?.counter === 1) {
          parent._fsTotalWin = 0;
        }
        if (data.bet?.freespin) {
          parent._fsTotalWin += payline_gen_win_amount;
        }
        let x = {
          player: {
            first_name: "",
            user_name: "pg3",
            account_id: 44,
            balance: data.wallet.balance,
            balance2: null,
            cash: String(data.wallet.balance),
            cash2: 10,
            currency: data.wallet.currency,
            bonus_amount: "99990.00",
          },
          game: {
            game_id: "735",
            game_name: "princessofatlantis",
          },
          current_round: {
            round_id: generateRandomNumber(),
            matrix:
              data.bet && Array.isArray(data.bet.reels)
                ? reelsToString(data.bet.reels, numToLetter)
                : "",
            payline_wins: {
              format:
                "betline_number;win;blink;num_repeats;betline;matrix_positions",
              details: paylineWinsDetails,
            },
            win_amount: payline_gen_win_amount,
            screen_wins: screen_wins,
            parent_type: null,
            freespin_state: data.bet?.freespin?.last === true ? 1 : null,

            post_matrix_info: post_matrix_info,
            multipliers: [],
            cluster_wins: null,
            bonus_games_won: "",
            total_fs_win_amount: data.bet?.freespin ? parent._fsTotalWin : 0,
            payline_win_amount: payline_gen_win_amount,
            spin_type: data.bet?.freespin ? "freespin" : "normal",
            extra_info: {
              debit: "",
            },
            game_extra_info: {
              ante_bet: 1.25,
              BuyFg: 100,
            },
            misc_prizes:
              Object.keys(steps).length > 0
                ? {
                    count: Object.keys(steps).length,
                    ...Object.fromEntries(
                      Object.values(steps).map((step, idx) => [idx, step])
                    ),
                  }
                : { count: 0 },
            positions: [],
            blastPosition: [],
            scatter_win: data.bet.win
              ? data.bet.win.map((key) => {
                  if (key.type === "scatter") {
                    return key?.win * 100;
                  } else {
                    return 0;
                  }
                })[0]
              : 0,
          },
          next_round:
            data.bet?.freespin && data.bet?.freespin?.last !== true
              ? {
                  type: "freespins",
                  num_spins: String(data.bet.freespin.limit),
                  spins_left: String(
                    data.bet.freespin.limit - data.bet.freespin.counter
                  ),
                  multiplier: 1,
                  parent_type: "normal",
                  additional_fs: "",
                  coin_value: String(data.bet.bet_sum * 100),
                  symbol: "",
                  total_fs_win_amount: data.bet.freespin.win * 100,
                  sub_type: "select_soldiers",
                  fg_type: "",
                  multipler_arr: [],
                  fs_game_id: 4,
                }
              : [],
          promo_details: null,
          misc: {
            rng: null,
          },
        };
        console.log("Response data (request_type=2):", x);
        parent.onServerResponse(JSON.stringify(x));
      } else {
        console.log("Waiting for all required fields from WebSocket...");
      }
    } else if (obj.indexOf("request_type=8") >= 0) {
      data = JSON.parse(data.data);
      let x = {
        player: {
          first_name: "",
          user_name: "pg3",
          account_id: 44,
          balance: data.wallet.balance,
          balance2: null,
          cash: String(data.wallet.balance),
          cash2: 10,
          currency: data.wallet.currency,
          bonus_amount: "99990.00",
        },
        game: {
          game_id: "735",
          game_name: "princessofatlantis",
        },
        current_round: {
          round_id: "1387112",
          matrix:
            data.bet && data.bet.reels
              ? reelsToString(data.bet.reels, numToLetter)
              : "",
          payline_wins: {
            format: [
              "betline_number",
              "win",
              "blink",
              "num_repeats",
              "betline",
              "matrix_positions",
            ],
            details: [],
          },
          win_amount: data.bet.total.win * 100,
          screen_wins: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
          ],
          parent_type: null,
          post_matrix_info: {
            count: 4,
          },
          multipliers: [],
          cluster_wins: null,
          bonus_games_won: [
            {
              type: "freespins",
              num_spins: 15,
              spins_left: 15,
              win_amount: data.bet?.freespin.win,
              parent_type: "normal",
              extra_fs: 0,
            },
          ],
          payline_win_amount: 0,
          spin_type: "normal",
          extra_info: {
            debit: "",
          },
          game_extra_info: {
            ante_bet: 1.25,
            BuyFg: 100,
          },
          misc_prizes: "",
          positions: [17, 18, 2, 4, 21, 14],
          blastPosition: [],
          scatter_win: data.bet.win.map((key) => {
            if (key.type === "scatter") {
              return key.win * 100;
            }
          })[0],
        },
        next_round: {
          type: "freespins",
          num_spins: data.bet?.freespin.limit,
          spins_left: data.bet?.freespin.limit,
          win_amount: data.bet?.freespin.win,
          parent_type: "normal",
          extra_fs: 0,
        },
        promo_details: [],
        misc: {
          rng: null,
        },
      };
      parent.onServerResponse(JSON.stringify(x));
      console.log(x);
    }
  };
  ws.onmessage = onReceive;
}
