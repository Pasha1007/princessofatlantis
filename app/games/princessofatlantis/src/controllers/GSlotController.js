// var _ng = _ng || {};
var gSC = _ng.SlotController.prototype;

gSC.addEvents = function () {
  cc.addEvents.call(this);
  _mediator.subscribe("SHOW_LOG", this.onShowLog.bind(this));

  _mediator.subscribe("spinStart", this.onSpinClickHandler.bind(this));
  _mediator.subscribe("onSpinResponse", this.onSpinResponseHandler.bind(this));
  _mediator.subscribe("STOP_SPIN_NOW", this.onStopSpinHandler.bind(this));
  _mediator.subscribe("allReelsStopped", this.onAllReelStopped.bind(this));
  _mediator.subscribe("onTotalWinShown", this.onTotalWinShown.bind(this));
  _mediator.subscribe("onBigWinShown", this.onBigWinShown.bind(this));
  _mediator.subscribe("startFreeSpins", this.onStartFreespins.bind(this));
  _mediator.subscribe("onFSEndShown", this.onFSEndShown.bind(this));
  _mediator.subscribe("showFreeSpinEnded", function () {
    _mediator.publish("showFSWinOnPanel");
  });
  _mediator.subscribe("GAMBLE_END", this.onGambleEnd.bind(this));
  _mediator.subscribe("continueUnfinishedGame", this.onUnfinishGame.bind(this));

  _mediator.subscribe(
    "AlternateLineWinShownOnce",
    this.onAlternateLineWinsShownOnce.bind(this)
  );

  _mediator.subscribe("callNextGameState", this.callNextGameState.bind(this));
  _mediator.subscribe(
    "specialGameStateAnimationCompleted",
    this.callNextGameState.bind(this)
  );
  _mediator.subscribe(
    "bonusSymbolAnimationCompleted",
    this.callNextGameState.bind(this)
  );

  _mediator.subscribe("onGameCreated", this.onGameInit.bind(this));
  _mediator.subscribe("runGameInit", this.onGameInit.bind(this));

  _mediator.subscribe("SHOW_GAMBLE", this.onGambleShowHandler.bind(this));
  _mediator.subscribe("SHOW_GAMBLE", function () {
    _mediator.publish("setSpaceBarEvent", "idle");
  });
  _mediator.subscribe("totalBetUpdated", this.onTotalBetUpdate.bind(this));

  _mediator.subscribe(
    _events.slot.coinValueUpdated,
    this.onCoinValueUpdated.bind(this)
  );
  _mediator.subscribe(
    _events.slot.lineValueUpdated,
    this.onLineValueUpdated.bind(this)
  );

  _mediator.subscribe("START_AUTOSPIN", this.onStartAutoSpin.bind(this));
  //For Resetting Autospin data in Model
  _mediator.subscribe("stopAutoSpin", this.onStopAutoSpin.bind(this));
  //Hides Autostop button and count also from panel along with resetting autospin data in model
  _mediator.subscribe("cancelAutoSpin", this.onStopAutoSpin.bind(this));

  _mediator.subscribe("bonusGameEnded", this.onBonusGameEnd.bind(this));
  _mediator.subscribe("callPostMatrixAction", this.postMatrixCheck.bind(this));

  //_mediator.subscribe("onFeatureResponse", this.onFeatureResponse.bind(this));

  _mediator.subscribe("spinClick", this.onSpinClick.bind(this));
  _mediator.subscribe("reloadGame", this.reloadGame.bind(this));
  _mediator.subscribe(
    "unfinishedFreeSpins",
    this.onUnfinishedFreeSpins.bind(this)
  );

  //autospin events
  _mediator.subscribe(
    "AS_StopOnAnyWin",
    this.onStopOnAnyWinSelection.bind(this)
  );
  _mediator.subscribe(
    "AS_StopOnWinLimit",
    this.onStopOnWinLimitSelection.bind(this)
  );
  _mediator.subscribe(
    "AS_StopOnLossLimit",
    this.onStopOnLossLimitSelection.bind(this)
  );

  _mediator.subscribe("hidePanel", this.onHidePanel.bind(this));
  _mediator.subscribe("showPanel", this.onShowPanel.bind(this));
  _mediator.subscribe("hideReelView", this.onHideReelView.bind(this));
  _mediator.subscribe("showReelView", this.onShowReelView.bind(this));
  _mediator.subscribe("hideWinView", this.onHideWinView.bind(this));
  _mediator.subscribe("showWinView", this.onShowWinView.bind(this));
  _mediator.subscribe("hideMainContainer", this.onHideMainContainer.bind(this));
  _mediator.subscribe("showMainContainer", this.onShowMainContainer.bind(this));
  _mediator.subscribe("hideClockView", this.onHideClockView.bind(this));
  _mediator.subscribe("showClockView", this.onShowClockView.bind(this));

  _mediator.subscribe(
    "hidePromoView",
    this.onHidePromoView.bind(this)
  ); /*FOR PROMO TOP STRIP VIEW*/
  _mediator.subscribe(
    "showPromoView",
    this.onShowPromoView.bind(this)
  ); /*FOR PROMO TOP STRIP VIEW*/
  _mediator.subscribe(
    "destroyPromoView",
    this.onDestroyPromoView.bind(this)
  ); /*FOR PROMO TOP STRIP VIEW*/

  _mediator.subscribe("hideGameTitle", this.onHideGameTitle.bind(this));
  _mediator.subscribe("showGameTitle", this.onShowGameTitle.bind(this));
  _mediator.subscribe(
    "hidePaytableContainer",
    this.onHidePaytableContainer.bind(this)
  );
  _mediator.subscribe(
    "showPaytableContainer",
    this.onShowPaytableContainer.bind(this)
  );
  _mediator.subscribe(
    "hidePopupContainer",
    this.onHidePopupContainer.bind(this)
  );
  _mediator.subscribe(
    "showPopupContainer",
    this.onShowPopupContainer.bind(this)
  );

  _mediator.subscribe(
    "continueInitGame",
    this.continueAfterGameUnfinishAnimations.bind(this)
  );

  _mediator.subscribe(
    "hideNotificationWindow",
    this.onHideNotificationWindow.bind(this)
  );
  _mediator.subscribe(
    "showNotificationWindow",
    this.onShowNotificationWindow.bind(this)
  );

  //override changeReelView function to publish required things. removeReelView, updateReelConfig, createReelView, repositionReelView
  _mediator.subscribe("changeReelView", this.changeReelView.bind(this));
  //function to call repositionReelView of slotView.
  _mediator.subscribe("repositionReelView", this.repositionReelView.bind(this));
  //Remove all the children of ReelView.
  _mediator.subscribe("removeReelView", this.removeReelView.bind(this));
  _mediator.subscribe(
    "updateReelViewUiConfig",
    this.updateReelViewUiConfig.bind(this)
  );
  _mediator.subscribe(
    "updateSpinDataReels",
    this.updateSpinDataReels.bind(this)
  );
  _mediator.subscribe(
    "updateReelSymbolConfig",
    this.updateReelSymbolConfig.bind(this)
  );

  _mediator.subscribe(
    _events.core.secondaryAssetsLoaded,
    function () {
      if (this.isUnfinishedStopped) {
        this.isUnfinishedStopped = false;
        _mediator.publish("hideNotificationWindow");
        setTimeout(
          function () {
            this.onUnfinishGame();
          }.bind(this),
          400
        );
      }
      if (this.isCallNextGameStateStopped) {
        this.isCallNextGameStateStopped = false;
        _mediator.publish("hideNotificationWindow");
        setTimeout(
          function () {
            this.callNextGameState();
          }.bind(this),
          400
        );
      }
    }.bind(this)
  );
  _mediator.subscribe(
    "setSpaceBarEvent",
    function (event) {
      this.spaceBarEvent = event;
    }.bind(this)
  );
  window.addEventListener("keyup", this.dealWithKeyboard.bind(this), false);
  window.addEventListener(
    "keypress",
    this.deakWithSpaceBarHolding.bind(this),
    false
  );

  _mediator.subscribe(
    "introScreenHidden",
    function () {
      setTimeout(
        function () {
          this.view.callGameinit();
        }.bind(this),
        100
      );
    }.bind(this)
  );
  _mediator.subscribe(
    "windowFocusChanged",
    function (bool) {
      this.isWindowFocused = bool;

      _mediator.publish("SHOW_LOG", "winfocuschange " + bool);
      if (bool) {
        _sndLib.focusSoundOn();
      } else {
        _sndLib.focusSoundOff();
      }

      if (bool && this.isGamePaused) {
        this.isGamePaused = false;
        this.callNextGameState();
      }
    }.bind(this)
  );
  _mediator.subscribe(
    _events.core.error,
    function () {
      this.model.isError = true;
    }.bind(this)
  );
  _mediator.subscribe(
    "errorClose",
    function (data) {
      this.model.isError = false;
      //if reels are not stopped then only enable return true
      // if(!this.allReelsStopped){
      this.errorContinueClicked = true;
      // }
      //clear line wins after error
      this.model.spinData.totalLineWins = [];
      if (data.event) {
        _mediator.publish(data.event);
      } else {
        this.callNextGameState();
      }
    }.bind(this)
  );
  // _mediator.subscribe("closeBonus", function(){
  // //To be rechecked later.
  // //callNextGameState should be called always from here.
  // // if(this.model.getIsFullPFSActive()){
  // //     // this.callNextGameState();
  // //     setTimeout(function(){
  // //         this.callNextGameState();
  // //     }, 100);
  // // }
  // })
  _mediator.subscribe(
    "hideMainGame",
    function () {
      _mediator.publish("hidePanel", { noEffect: true });
      _mediator.publish("hideMainContainer", { noEffect: true });
      _mediator.publish("hideClockView", { noEffect: true });
      _mediator.publish("hideGameTitle", { noEffect: true });
      _mediator.publish("hidePaytableContainer", { noEffect: true });
    }.bind(this)
  );
  _mediator.subscribe(
    "showMainGame",
    function () {
      _mediator.publish("showPanel");
      _mediator.publish("showMainContainer");
      _mediator.publish("showClockView");
      _mediator.publish("showGameTitle");
      _mediator.publish("showPaytableContainer");
    }.bind(this)
  );
  _mediator.subscribe(
    "openURL",
    function (data) {
      this.openURL(data.type, data.url);
    }.bind(this)
  );
  this.addSpecificEvents();
};

gSC.onGameInit = function (argument) {
  // console.log(" =====game init response received in slot controller ",this.model.isFreeSpinActive());
  if (
    this.model.getIsPFSActive() &&
    !this.isPFSRunning &&
    !this.model.isFreeSpinActive()
  ) {
    this.isPFSRunning = true;
    _mediator.publish("DisablePanel");
    //Setting this true forcibly.
    this.allReelsStopped = true;
    this.model.updatePanelModel();

    if (this.model.getTotalPFS() == this.model.getRemainingPFS()) {
      _mediator.publish("promoFreeSpinAwarded");
      _mediator.publish("startDateTimer");
    } else {
      _mediator.publish("unfinishedPromoFreeSpin");
    }
    return;
  }

  //direct show
  if (this.model.spinData.isSpawningWild) {
    _mediator.publish(
      "showSpawningWild",
      this.model.spinData.spawningWildReelNum,
      "initState"
    );
    _mediator.publish("DisablePanel");
    this.model.spinData.isSpawningWild = false;
    return;
  }

  if (this.model.spinData.getIsStickyTriggered()) {
    _mediator.publish("showStickySymbols", "initState");
    this.model.spinData.setIsStickyTriggered(false);
    return;
  }

  if (this.model.spinData.isGameUnfinishedAnimActive) {
    _mediator.publish("DisablePanel");
    _mediator.publish("setSpaceBarEvent", "idle");
    this.showGameUnfinishAnimations();
    return;
  }

  //todo check bonus game/
  if (
    this.model.isFreeSpinActive() ||
    this.model.isReSpinActive() ||
    this.model.isStickyRespinTriggered() ||
    this.model.isStickyRespinActive() ||
    this.model.isFeatureActive() ||
    this.model.isGambleActive()
  ) {
    //show unfinished game popup
    _mediator.publish("DisablePanel");
    var unfinishedText = _ng.GameConfig.unfinishedPopupText
      ? _ng.GameConfig.unfinishedPopupText
      : gameLiterals.unfinished;
    _mediator.publish(
      "showErrorMsg",
      unfinishedText,
      "continueUnfinishedGame",
      true
    );
    // _mediator.publish("setSpaceBarEvent", "continueUnfinishedGame");
    return;
  }

  if (this.isPFSRunning) {
    this.callNextGameState();
    return;
  }
  _mediator.publish("EnablePanel");
  _mediator.publish("setSpaceBarEvent", "spinClick");
};
gSC.continueAfterGameUnfinishAnimations = function () {
  if (
    this.model.isFreeSpinActive() ||
    this.model.isReSpinActive() ||
    this.model.isStickyRespinTriggered() ||
    this.model.isStickyRespinActive() ||
    this.model.isFeatureActive() ||
    this.model.isGambleActive()
  ) {
    _mediator.publish("DisablePanel");
    var unfinishedText = _ng.GameConfig.unfinishedPopupText
      ? _ng.GameConfig.unfinishedPopupText
      : gameLiterals.unfinished;
    _mediator.publish(
      "showErrorMsg",
      unfinishedText,
      "continueUnfinishedGame",
      true
    );
    return;
  }

  if (this.isPFSRunning) {
    this.callNextGameState();
    return;
  }
  _mediator.publish("EnablePanel");
  _mediator.publish("setSpaceBarEvent", "spinClick");
};
gSC.addSpecificEvents = function () {
  this.WasSpaceHeld = false;
  this.allReelsStopped = true;
  this.allTumbleFinished = true;
  //SID UNCOMMIT
  _ng.isForceAllowed = true;
  _mediator.subscribe("AllTumbleFinish", this.AllTumbleFinish.bind(this));
  _mediator.subscribe("continueAutoSpin", this.continueAutoSpin.bind(this));
  _mediator.subscribe(
    "triggerAllWinAnimation",
    this.triggerAllWinAnimation.bind(this)
  );

  _ng.autoPlayBeforeFg = false;
  _ng.autoPlayPrevCount = 0;
  this.spaceBarClickCount = 0;
  this.spaceBarClickInterval = setInterval(() => {
    this.spaceBarClickCount = 0;
  }, 3000);
};
gSC.dealWithKeyboard = function (e) {
  if (e.key === "Escape") {
    _mediator.publish("hideBigWin_click");
    return;
  }
  if (e.keyCode === 32) {
    if (this.checkForSpaceEvent()) {
      _mediator.publish(this.spaceBarEvent);
      _mediator.publish("setSpaceBarEvent", "idle");
    }
    clearInterval(this.checkReelsStopped);
    if (this.isSpaceBarHeld && this.WasSpaceHeld) {
      this.checkReelsStoppedKeyUp = setInterval(
        function () {
          if (this.allReelsStopped) {
            _ng.isQuickSpinActive = false;
            _ng.GameConfig.FastAnim = false;
            // clearInterval(this.checkReelsStopped);
            clearInterval(this.checkReelsStoppedKeyUp);
          }
        }.bind(this),
        100
      );
    }
    //  var stopQuickSpin =setInterval(function(){
    //     if(this.allReelsStopped)
    //     {
    //         clearInterval(stopQuickSpin);
    //     }
    //  }.bind(this),20)
  }
  this.WasSpaceHeld = false;
  this.isSpaceBarHeld = false;
  if (this.heldSpaceBarTimer) {
    clearTimeout(this.heldSpaceBarTimer);
  }
};
gSC.fireSpaceBarHoldEvent = function (firstTime) {
  if (this.checkForSpaceEvent() && this.isSpaceBarHeld) {
    _mediator.publish(this.spaceBarEvent);
    _mediator.publish("setSpaceBarEvent", "idle");
  }

  this.heldSpaceBarTimer = setTimeout(
    function () {
      this.fireSpaceBarHoldEvent(false);
    }.bind(this),
    500
  );
  if (!this.isWindowFocused) {
    _ng.isQuickSpinActive = false;
    _ng.GameConfig.FastAnim = false;
    this.isSpaceBarHeld = false;
    this.WasSpaceHeld = false;
  }

  if (!_ng.isQuickSpinActive && firstTime) {
    this.checkReelsStopped = setInterval(
      function () {
        if (this.allReelsStopped && this.isSpaceBarHeld && this.WasSpaceHeld) {
          // console.log("Space bar hold activated")
          _ng.isQuickSpinActive = true;
          _ng.GameConfig.FastAnim = true;
          console.log("QUICK SPIN ACTIVATE");
          clearInterval(this.checkReelsStopped);
        }
      }.bind(this),
      20
    );
  }
};
gSC.deakWithSpaceBarHolding = function (e) {
  if (e.keyCode === 32 && !this.isSpaceBarHeld) {
    this.isSpaceBarHeld = true;

    /* for showing quick spin info popup */
    if (!_ng.GameConfig.quickSpinInfoPopupShown) this.quickSpinInfoOnSpaceBar();

    this.heldSpaceBarTimer = setTimeout(
      function () {
        if (!_ng.isQuickSpinActive) {
          this.WasSpaceHeld = true;
        }
        console.log(" ACTIVATE");
        this.fireSpaceBarHoldEvent(true);
      }.bind(this),
      _ng.GameConfig.spaceBarHoldTimeout
    );
  }
};
gSC.onAllReelStopped = function () {
  if (this.model.isError || this.errorContinueClicked) {
    this.errorContinueClicked = false;
    this.allReelsStopped = true;
    return;
  }

  if (quickBtnSettingsStatus) {
    _ng.isQuickSpinActive = true;
  }

  if (_viewInfoUtil.viewType == "VP" || _viewInfoUtil.viewType == "VL") {
    _mediator.publish("toggleStopSpinBg", false);
  }

  // this.AllTumbleFinished=false;
  if (coreApp.gameModel.obj.current_round.spin_type != "freespin") {
    if (
      !coreApp.gameModel.isAutoSpinActive() &&
      coreApp.gameModel.obj.current_round.win_amount == 0
    ) {
      _mediator.publish("SHOW_IDLE_MESSAGE");
    }
  }

  if (
    coreApp.gameModel.obj.current_round.spin_type == "freespin" &&
    coreApp.gameModel.obj.current_round.misc_prizes.count == 0
  ) {
    if (coreApp.gameModel.obj.current_round.post_matrix_info.extra_fs) {
      _mediator.publish("showExtraSpins");
    }
  }
  _mediator.publish("showMultipler", this.model.spinData.proMulti);

  // _mediator.publish('createMultipliers');
  // _mediator.publish("BonusSymbolWin")
  _mediator.publish("callPostMatrixAction");
  //PopFunction
  this.addMultiplierToSymbol();
  _mediator.publish("DisablePanel");

  // _mediator.publish("createMultipliers");
  if (coreApp.gameModel.obj.current_round.misc_prizes.count == 0) {
    this.allReelsStopped = true;
    //  this.AllTumbleFinished=true;
    if (coreApp.gameModel.isAutoSpinActive() == true) {
      _mediator.publish("ToggleMobPanel", false);
      _mediator.publish("ToggleSpin", false);
    }
    if (coreApp.gameModel.isFreeSpinActive() == true) {
      _mediator.publish("ToggleMobPanel", false);
      _mediator.publish("ToggleSpin", false);
    }
    if (
      coreApp.gameModel.isAutoSpinActive() == false &&
      coreApp.gameModel.isFreeSpinActive() == false
    ) {
      _mediator.publish("ToggleSpin", true);
    }
    _mediator.publish("AllTumbleFinish", 0);
    if (!coreApp.gameModel.getIsPFSActive())
      _mediator.publish("enableBuyFeature");
  }
  if (
    coreApp.gameModel.obj.current_round.misc_prizes.count != 0 &&
    coreApp.gameModel.obj.current_round.payline_wins &&
    coreApp.gameModel.obj.current_round.payline_wins.details &&
    coreApp.gameModel.obj.current_round.payline_wins.details != ""
  ) {
    var winArr = [];
    this.newArray = [];
    var oneArr =
      coreApp.gameModel.obj.current_round.payline_wins.details.split(";");
    for (var k = 0; k < oneArr.length; k++) {
      var temp = oneArr[k].split(":");
      winArr.push(temp[1]);
      let neededValues = [parseInt(temp[3]), temp[4]];
      this.newArray.push(neededValues);
    }
    _mediator.publish("getTotalwin", winArr);
  }
  // Start the first step with i = 1
  this.AllTumbleStepupstep(1, winArr);
};

/*  setTimeout(function(){
        _mediator.publish("updateSpinDataReels",coreApp.gameModel.obj.current_round.misc_prizes[coreApp.gameModel.obj.current_round.misc_prizes.count-1].new_reel);
    }.bind(this), 3000 * i); */

/* this.t=0;
     if(coreApp.gameModel.obj.current_round.misc_prizes.count>0){
        // while(coreApp.gameModel.obj.current_round.misc_prizes.count>this.t){
        //     console.log(this.t)
        //     _mediator.publish("removeWinSym",this.t);
        //     this.t++;
        // }
       
            var interval = setInterval(() => {
                if(coreApp.gameModel.obj.current_round.misc_prizes.count-1<=this.t){
                    clearInterval(interval);
                }
                _ng.symcnt = 0;
                setTimeout(function(){
                    _mediator.publish("removeWinSym", this.t);

                }.bind(this),100);
               this.t++;
            }, 3000);
            _mediator.publish("updateSpinDataReels",coreApp.gameModel.obj.current_round.misc_prizes[coreApp.gameModel.obj.current_round.misc_prizes.count-1].new_reel);
        } */

gSC.AllTumbleStepupstep = function (i, winArr) {
  if (
    i > coreApp.gameModel.obj.current_round.misc_prizes.count ||
    coreApp.gameModel.obj.current_round.misc_prizes == ""
  ) {
    this.allReelsStopped = true;
    this.enableMobilePanel();
    return; // Stop recursion when the count is exceeded
  }
  // Calculate the delay for the current step
  let delay =
    _ng.isQuickSpinActive &&
    _ng.quickSpinType == "turbo" &&
    _ng.GameConfig.FastAnim
      ? 1.35
      : 1.5;
  if (i == 1) delay = 0;
  // First tween for the delay and initial actions
  TweenMax.to({}, delay, {
    onComplete: function () {
      _mediator.publish("closeSettingOnTumble");
      _mediator.publish("onHidePaytable");
      _mediator.publish("disableBuyFeature");
      _mediator.publish("removeWinSym", i - 1);

      // Second tween for additional delay before triggering the next step
      let nextDelay =
        _ng.isQuickSpinActive &&
        _ng.quickSpinType == "turbo" &&
        _ng.GameConfig.FastAnim
          ? 0.6
          : 0.8;
      TweenMax.to({}, nextDelay, {
        onComplete: function () {
          _mediator.publish("TumbleWin", winArr, i - 1, this.newArray);

          // If we've reached the last iteration, execute final actions
          if (i == coreApp.gameModel.obj.current_round.misc_prizes.count) {
            TweenMax.to({}, 0.8, {
              onComplete: function () {
                this.allReelsStopped = true;
                this.enableMobilePanel();
                _mediator.publish("checkAndLand");

                if (
                  coreApp.gameModel.obj.current_round.post_matrix_info.extra_fs
                ) {
                  _mediator.publish("showExtraSpins");
                }

                if (coreApp.gameModel.isAutoSpinActive()) {
                  _mediator.publish("ToggleMobPanel", false);
                  _mediator.publish("ToggleSpin", false);
                }

                if (coreApp.gameModel.isFreeSpinActive()) {
                  _mediator.publish("ToggleMobPanel", false);
                  _mediator.publish("ToggleSpin", false);
                }

                if (
                  !coreApp.gameModel.isAutoSpinActive() &&
                  !coreApp.gameModel.isFreeSpinActive()
                ) {
                  _mediator.publish("ToggleSpin", true);
                }

                if (
                  coreApp.gameModel.obj.current_round.spin_type != "freespin"
                ) {
                  setTimeout(() => {
                    _mediator.publish(_events.slot.updateBalance);
                  }, 600);
                }

                if (
                  !coreApp.gameModel.isFreeSpinActive() &&
                  !coreApp.gameModel.getIsPFSActive()
                ) {
                  _mediator.publish("enableBuyFeature");
                }
              }.bind(this),
            });
          } else {
            // Trigger the next step
            this.AllTumbleStepupstep(i + 1, winArr);
          }
        }.bind(this),
      });
    }.bind(this),
  });
};

gSC.AllTumbleFinish = function (num, reelID) {
  // console.log("tumble finish");
  this.num = num;
  this.reelID = reelID;

  // if (_viewInfoUtil.device === "Mobile") {
  //     this.currentCount =_ng.currentAutoSpinCount;
  // }
  // else{
  //     this.currentCount =this.currentAutoSpinCount;
  // }

  //with tumbles
  if (
    num + 1 == coreApp.gameModel.obj.current_round.misc_prizes.count &&
    reelID == 5
  ) {
    _mediator.publish("createSticky");
    _mediator.publish("hideFakeButton");
    this.allTumbleFinished = true;
    if (
      !coreApp.gameModel.isFreeSpinActive() &&
      coreApp.gameModel.obj.current_round.spin_type == "normal"
    ) {
      _mediator.publish("ToggleTurbo", true);
      if (
        this.autoSpinTriggered == true &&
        this.currentAutoSpinCount == 0 &&
        coreApp.gameModel.getAutoSpinCurrentCount() ==
          coreApp.gameModel.getAutoSpinTotalCount()
      ) {
        this.autoSpinTriggered = false;
        if (_ng.GameConfig.TurboOn) {
          _ng.GameConfig.FastAnim = false;
          _ng.isQuickSpinActive = false;
        }
        setTimeout(() => {
          _mediator.publish("toggleAutoSpinOptions", true);
          _mediator.publish("ToggleSpin", false);
        }, 1500);
      }
    }

    if (!coreApp.gameModel.obj.current_round.post_matrix_info.multiplier) {
      //AFTER TUMBLE FINISH..
      this.triggerAllWinAnimation();
    }
  } else if (num == coreApp.gameModel.obj.current_round.misc_prizes.count) {
    _mediator.publish("createSticky");
    _mediator.publish("hideFakeButton");
    this.allTumbleFinished = true;
    // setTimeout(function() {
    // this.AllTumbleFinished=true;
    // }.bind(this), 300);
    if (
      !coreApp.gameModel.isFreeSpinActive() &&
      coreApp.gameModel.obj.current_round.spin_type == "normal"
    ) {
      _mediator.publish("ToggleTurbo", true);
      if (
        this.autoSpinTriggered == true &&
        this.currentAutoSpinCount == 0 &&
        coreApp.gameModel.getAutoSpinCurrentCount() ==
          coreApp.gameModel.getAutoSpinTotalCount()
      ) {
        this.autoSpinTriggered = false;
        if (_ng.GameConfig.TurboOn) {
          _ng.GameConfig.FastAnim = false;
          _ng.isQuickSpinActive = false;
        }
        setTimeout(() => {
          _mediator.publish("toggleAutoSpinOptions", true);
          _mediator.publish("ToggleSpin", false);
        }, 500);
      }
    }
    // setTimeout(this.delayBigwin(), 1000);
  }
};
gSC.onStartFreespins = function (delay) {
  this.model.setIsFreeSpinTriggered(false);
  this.autoSpinTriggered = false;
  if (_ng.GameConfig.TurboOn) {
    _ng.isQuickSpinActive = false;
    _ng.GameConfig.FastAnim = false;
  }
  _sndLib.playBg(_sndLib.sprite.bgFS);
  _mediator.publish("FreeSpinsStarted");
  if (delay !== undefined) {
    setTimeout(this.callNextGameState.bind(this), delay);
  } else {
    setTimeout(this.callNextGameState.bind(this), 200);
  }

  this.changeContainerBg(true);
};
// gSC.delayBigwin= function(){
//     _mediator.publish("EnablePanel");
//     //delaying big wins animation until tumble gets over
//     if ((this.num+1 == coreApp.gameModel.obj.current_round.misc_prizes.count) && this.reelID==5) {
//         _mediator.publish((this.model.isBigWinActive()) ? "showBigWins" : "showTotalWin");
// }
// else if(this.num == coreApp.gameModel.obj.current_round.misc_prizes.count){
//         _mediator.publish((this.model.isBigWinActive()) ? "showBigWins" : "showTotalWin");
//    }

// ///////////////////////////////////////////////////////////////////
// }
gSC.addMultiplierToSymbol = function () {
  let tempArray =
    coreApp.gameModel.userModel.userData.current_round.screen_wins;
  for (var i = 0; i < tempArray.length; i++) {
    if (tempArray[i] > 0) {
      let stripId = i % 6;
      let symbolIndex = Math.floor(i / 6) + 1;
    }
  }
};

gSC.onBigWinShown = function (argument) {
  var waitTimer =
    (coreApp.gameModel.isAutoSpinActive() ||
      coreApp.gameModel.isFullFSActive()) &&
    coreApp.gameModel.isBigWinActive()
      ? 1100
      : 100;
  setTimeout(this.callNextGameState.bind(this), waitTimer);
  this.resetMultiplier();
};

gSC.onTotalWinShown = function (argument) {
  // Monitor changes in _ng.isForceAllowed to kill and restart tweens
  const checkallReelsStopped = setInterval(
    function () {
      if (this.allReelsStopped) {
        _mediator.publish("clearAllWins", { from: "onTotalWinShown" });
        if (_ng.GameConfig.FastAnim) {
          //WIN
          if (coreApp.gameModel.obj.current_round.misc_prizes.count) {
            //1.MULTIPLIER
            //2.ALL WIN TRIGGER
            //3.SCATTER
            // this.callNextGameState();
            _mediator.publish("onBigWinShown");
          } else {
            //NO WIN
          }
        } else {
          //NORMAL SPIN

          //WIN
          if (coreApp.gameModel.obj.current_round.misc_prizes.count) {
            _mediator.publish("onBigWinShown");
          } else {
            //NO WIN
          }
        }
        this.resetMultiplier();
        // Stop monitoring once the tweens are restarted
        clearInterval(checkallReelsStopped);
      }
    }.bind(this),
    10
  ); // Check every 100ms
};

gSC.resetMultiplier = function () {
  _ng.resetMultiplierValue = true;
};

gSC.postMatrixCheck = function (state) {
  if (this.model.isError) {
    return;
  }
  //we need to set post matrtix in original matrix
  this.model.spinData.setPostMatrix();
  this.checkLossLimit();

  var flag = 0;
  var BonusWin = coreApp.gameModel.obj.current_round.screen_wins;
  for (var i = 0; i < BonusWin.length; i++) {
    if (BonusWin[i] > 0) {
      flag += 1;
      //break;
    }
  }

  //new code
  if (coreApp.gameModel.obj.current_round.misc_prizes == "") {
    //no win
    setTimeout(this.callNextGameState.bind(this), 200);
  } else {
    //win and tumble

    if (coreApp.gameModel.obj.current_round.misc_prizes.count > 0) {
      return;
    } else {
      setTimeout(this.callNextGameState.bind(this), 200);
    }
  }
};

gSC.onSpinResponseHandler = function () {
  //stop spin after some delay
  if (_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") {
    this.onStopSpinHandler();
  } else if (_ng.isQuickSpinActive) {
    setTimeout(
      this.onStopSpinHandler.bind(this),
      _ng.GameConfig.quickSpinIntervel ? _ng.GameConfig.quickSpinIntervel : 300
    );
  } else {
    this.stopSpinTimeout = setTimeout(
      this.stopReels.bind(this),
      _ng.GameConfig.ReelViewUiConfig.data.reelSpinConfig
        .reelStopAfterResponseDelay
    );
  }
  this.onSpecificSpinResponseHandler();
};
gSC.checkWinLimit = function (state) {
  //   console.log("Limkt Exceeded: "+(Number(this.model.spinData.getTotalWinAmount())))
  if (
    this.model.autoSpinData.getIsASWinLimitActive() &&
    Number(this.model.spinData.getTotalWinAmount()) >=
      Number(this.model.autoSpinData.getIsASWinLimitValue())
  ) {
    coreApp.gameModel.stopAutoSpins();
    _mediator.publish("cancelAutoSpin");
  } else if (
    Number(this.model.spinData.getTotalWinAmount()) >=
    5000 * Number(this.model.getTotalBet())
  ) {
    // console.log("Limkt Exceeded")
    _mediator.publish("WinExceededPopup", this.model.getTotalBet());
  }
  // else if((Number(coreApp.gameModel.getTotalFSWin()))>=5000*(Number(this.model.getTotalBet())))
  //     {
  //         _mediator.publish("WinExceededPopup",this.model.getTotalBet())
  //     }
};
gSC.onStartAutoSpin = function (count) {
  this.autoSpinTriggered = true;
  if (_ng.GameConfig.TurboOn) {
    _ng.isQuickSpinActive = true;
    _ng.GameConfig.FastAnim = true;
  }
  // console.log(" autospin started ", count);
  this.model.startAutoSpins(count);
  this.requestSpin(false);
  this.updateAutoSpinCount();
};
gSC.onStopAutoSpin = function (count) {
  this.currentAutoSpinCount = coreApp.gameModel.getAutoSpinCurrentCount();
  // if(_ng.GameConfig.TurboOn)
  //     {
  //         _ng.isQuickSpinActive = false;
  //         _ng.GameConfig.FastAnim=false;
  //     }
  // console.log(" autospin started ", count);
  this.model.stopAutoSpins();
  _mediator.publish("showNewMessage", "");
  if (
    coreApp.gameModel.obj.current_round.misc_prizes &&
    coreApp.gameModel.obj.current_round.misc_prizes.count == 0
  ) {
    _mediator.publish("enableBuyFeature");
    _mediator.publish("ToggleSpin", true);
  } else if (this.allReelsStopped) {
    _mediator.publish("enableBuyFeature");
    _mediator.publish("ToggleSpin", true);
  }
  _mediator.publish("updateAutoSpinText", false);
  if (coreApp.gameModel.isFreeSpinActive() == false) {
    _mediator.publish("hideandShowBuyfeature", true);
    _mediator.publish("updateTickerPosVp", true);
  }
};

gSC.onSpinClickHandler = function (isFreeSpin) {
  //SID UNCOMMIT
  _ng.isForceAllowed = true;
  this.allTumbleFinished = false;
  if (
    coreApp.gameModel.isFreeSpinActive() ||
    coreApp.gameModel.isAutoSpinActive()
  ) {
    _mediator.publish("hideandShowBuyfeature", false);
    _mediator.publish("updateTickerPosVp", false);
  }
  _mediator.publish("disableBuyFeature");
  // _mediator.publish("ToggleMobPanel",false);
  _mediator.publish("removeWinAnim");
  _mediator.publish("removeMultipliers");
  // if(coreApp.gameModel.isAutoSpinActive() == true){
  //     if(_viewInfoUtil.viewType === "VP")
  //     _mediator.publish("showNewMessage","SPINS LEFT  " +  (coreApp.gameModel.autoSpinData.totalAutoSpins - coreApp.gameModel.autoSpinData.currentCount));
  // else
  // console.log(_ng.curentAutoSpin);
  // // console.log(coreApp.gameModel.autoSpinData.totalAutoSpins, coreApp.gameModel.getAutoSpinCurrentCount());
  // _mediator.publish("showNewMessage","SPINS LEFT  " + ( coreApp.gameModel.autoSpinData.totalAutoSpins - (coreApp.gameModel.getAutoSpinCurrentCount() + 1)));

  // }
  if (coreApp.gameModel.isFreeSpinActive()) {
    var leftValue =
      coreApp.gameModel.userModel.userData.next_round.spins_left - 1;
    _mediator.publish(
      "showNewMessage",
      gameLiterals.spinsleft_text + leftValue
    );
    var getTotalFreeSpins =
      coreApp.gameModel.userModel.userData.next_round.num_spins;
    _mediator.publish("setFsPlayedcnt", getTotalFreeSpins);
  }
  // if (coreApp.gameModel.userModel.userData.current_round.payline_win_amount > 0) {
  //     _mediator.publish("tweenTotalWin");
  // }
  if (
    coreApp.gameModel.userModel.userData.previous_round &&
    coreApp.gameModel.userModel.userData.previous_round.bonus_details
  ) {
    let winAmount =
      coreApp.gameModel.userModel.userData.next_round.total_fs_win_amount;
    if (winAmount > 0) {
      _mediator.publish("resetTotalFSWin", winAmount);
      _mediator.publish("UpdateWin", winAmount);
    } else {
      _mediator.publish("resetTotalFSWin", winAmount, 0);
      _mediator.publish("UpdateWin", winAmount);
    }
  }
  // if(isFreeSpin == true){
  // _mediator.publish("TotalWin");
  // var fsCount =coreApp.gameModel.obj.next_round.spins_left-1;
  // var fsCount = 10;
  // _mediator.publish("freeSpinCount",fsCount);
  // _mediator.publish("toggleFsContainer",true);
  // }

  if (
    coreApp.gameModel.obj.current_round.spin_type != "freespin" &&
    !this.model.getIsPFSActive()
  ) {
    _mediator.publish("SHOW_TICKER_MESSAGE", "goodluck_text");
  }
  if (!coreApp.gameModel.isFreeSpinActive()) {
    _mediator.publish("UpdateWin", 0);
    _mediator.publish("resetTotalFSWin", 0);
  }

  if (
    _ng.resetMultiplierValue &&
    coreApp.gameModel.isFreeSpinActive() == false &&
    coreApp.gameModel.getIsFreeSpinEnded() == false
  ) {
    _mediator.publish("showMultipler", 1);
    _ng.resetMultiplierValue = false;
  }
  this.allReelsStopped = false;
  // _mediator.publish("clearAllWins");
  _mediator.publish("ClearBonusSym");
  if (_ng.BuyFSenabled === true) {
    this.model.setAllTotalBet(this.model.getTotalBet());
    var store = this.model.getTotalBet();
    this.model.setBalance(
      this.model.getBalance() -
        this.model.getTotalBet() * coreApp.gameModel.spinData.buyfg +
        store
    );
    if (!coreApp.gameModel.isFreeSpinActive()) {
      _mediator.publish(_events.slot.updateBalance);
    }
  }
  if (_ng.twoXBetEnabled === true) {
    this.model.setAllTotalBet(this.model.getTotalBet());
    this.model.setBalance(
      this.model.getBalance() -
        this.model.getTotalBet() * coreApp.gameModel.spinData.antebet
    );
    if (!coreApp.gameModel.isFreeSpinActive()) {
      _mediator.publish(_events.slot.updateBalance);
    }
  } else if (!this.model.getIsPFSActive() && isFreeSpin != true) {
    this.model.setAllTotalBet(this.model.getTotalBet());
    this.model.setBalance(this.model.getBalance() - this.model.getTotalBet());
    if (!coreApp.gameModel.isFreeSpinActive()) {
      _mediator.publish(_events.slot.updateBalance);
    }
  }
  _mediator.publish("DisablePanel");
  if (
    _sndLib.isLowBg &&
    !coreApp.gameModel.isAutoSpinActive() &&
    !coreApp.gameModel.isFullFSActive()
  ) {
    _sndLib.lowBg();
  }
};
gSC.handleFSEnd = function () {
  _mediator.publish("resetTotalFSWin", 0);
  _mediator.publish("clearAllWins");
  _mediator.publish("checkButtonState");
  _sndLib.stopBg(_sndLib.sprite.bgFS);
  // setTimeout(function(){
  //     _mediator.publish("hideandShowBuyfeature",true);
  //     _mediator.publish("updateTickerPosVp",true);
  //     _mediator.publish("enableBuyFeature");

  //     _mediator.publish("bringBackBuyFeature")
  // // }.bind(this),1000)
  // _mediator.publish("bringspinbtnback");
  setTimeout(
    function () {
      // _mediator.publish(_events.slot.updateBalance);
      _mediator.publish("SHOW_TICKER");
      if (this.model.getTotalFSWin() > 0) {
        _mediator.publish("showFreeSpinEnded");
      } else {
        if (commonConfig.showFSPopupWithZeroWins) {
          _mediator.publish("showFreeSpinEndedZeroBalance", {
            eventsToPublish: ["EnablePanel", "onFSEndShown"],
          });
        } else {
          _mediator.publish(_events.slot.updateBalance);
          _mediator.publish("EnablePanel");
          _mediator.publish("onFSEndShown");

          if (_ng.BuyFSenabled === true) {
            _ng.BuyFSenabled = false;
          }
          _mediator.publish("showNewMessage", "");
          _mediator.publish("onFsCloseHandler");

          if (_ng.autoPlayBeforeFg == true) {
            _mediator.publish("continueAutoSpin");
            _mediator.publish("showAutoStopBtn");
          }
        }
      }
    }.bind(this),
    1000
  );

  this.changeContainerBg(false);
};
gSC.onUnfinishGame = function () {
  _mediator.publish("DisablePanel");
  if (this.showNotification() && !_viewInfoUtil.isSecondaryAssetsLoaded) {
    this.isUnfinishedStopped = true;
    _mediator.publish("showNotificationWindow", { alpha: 0.85 });
    return;
  }
  if (
    this.model.spinData.isBonusFreatureMSG &&
    this.model.spinData.bonusFreatureMSGType != "200bets"
  ) {
    _mediator.publish(
      "showFeatureAwardedMSG",
      this.model.spinData.bonusFreatureMSGType
    );
    return;
  }
  if (this.model.isFreeSpinActive()) {
    _mediator.publish("SHOW_TICKER");
    var leftValue =
      this.model.getTotalFreeSpins() - this.model.getFreeSpinCurrentCount() + 1;
    // _mediator.publish("SHOW_TICKER_MESSAGE", pixiLib.getLiteralText("Free spins") + ": " + leftValue + "/" + this.model.getTotalFreeSpins());
    _mediator.publish("unfinishedFreeSpins");
    _mediator.publish("moveBuyFeature");
    this.changeContainerBg(true);
    // if (this.model.spinData.isProgressbarActive) {
    //     _mediator.publish("updateProgressBar", this.model.spinData.bar_value, this.model.spinData.current_level);
    //     return;
    // }
  }

  if (
    this.model.getFeatureParentType() === "freespins" ||
    this.model.getFeatureParentType() === "freespin"
  ) {
    _mediator.publish("unfinishedFreeSpins");
  }

  this.onSpecificUnfinishGame();
};
gSC.onSpinClick = function (argument) {
  if (this.allReelsStopped) {
    _mediator.publish("spinStart");
    _mediator.publish("callSpinRequest");
    _mediator.publish("ToggleMobPanel", false);
    _mediator.publish("ToggleTurbo", false);
    _mediator.publish("ToggleSpin", false);
    _mediator.publish("toggleBetContainer", false);
    _mediator.publish("MakeTrueAtSpin");
    _mediator.publish("setSpaceBarEvent", "idle");
    // _mediator.publish("closeSettingsPanel");
    // _mediator.publish("onHidePaytable");
    this.allReelsStopped = false;
  }
};
gSC.callNextGameState = function () {
  if (this.model.isError) {
    return;
  }

  if (coreApp.gameController.errorContinueClicked) {
    _mediator.publish("ToggleSpin", true);
    return;
  }
  if (this.model.isGambleActive()) {
    _mediator.publish("SHOW_GAMBLE");
    this.model.gambleData.isGambleInitActive = false;
    this.model.spinData.totalLineWins = [];
    return;
  }

  if (!this.isWindowFocused) {
    console.log("Stopping game: ", this.isWindowFocused);
    this.isGamePaused = true;
    return;
  }
  if (this.model.spinData.preFeatureActivity == true) {
    this.callGameActivity();
    return;
  }
  // publish playSpecialGameStateAnimation for any triggering animation
  // publish specialGameStateAnimationCompleted, when required animation is completed.
  if (
    this.model.isStickyRespinTriggered() ||
    this.model.isStickyRespinActive()
  ) {
    if (this.checkFeatureAssets("stickyRespin")) {
      return;
    }
    _mediator.publish("clearAllWins");

    // commented for test on respin playing freespin bg
    // if (this.model.getFeatureParentType() === "freespins" || this.model.getFeatureParentType() === "freespin") {
    //     _mediator.publish("unfinishedFreeSpins");
    // }

    if (!this.gameStateAnimation) {
      setTimeout(
        function () {
          _mediator.publish("playSpecialGameStateAnimation", {
            type: "stickyRespin",
            symbolPositions: this.model.getStickyRSSymbols(),
            matrix: this.model.getReelMatrix(),
          });
        }.bind(this),
        this.specialGameStateAnimationDelay
      );
      this.gameStateAnimation = true;
      return;
    }

    this.requestSpin(false, "callReSpinRequest");
    this.gameStateAnimation = false;

    this.beforeOnAllReelStopped = function () {
      if (
        !this.model.isStickyRespinTriggered() &&
        !this.model.isStickyRespinActive()
      ) {
        _mediator.publish("removeStickySymbols");
        this.beforeOnAllReelStopped = function () {};
      }
    };
  } else if (this.model.isReSpinActive()) {
    if (this.checkFeatureAssets("respin")) {
      return;
    }
    _mediator.publish("clearAllWins");
    if (_ng.GameConfig.showRespinPopup) {
      _mediator.publish("clearAllWins");
      if (this.model.getIsRespinTriggered()) {
        setTimeout(
          function () {
            _mediator.publish("playSpecialGameStateAnimation", {
              type: "stickyRespin",
              symbolPositions: this.model.getStickyRSSymbols(),
              matrix: this.model.getReelMatrix(),
            });
          }.bind(this),
          this.specialGameStateAnimationDelay
        );
        this.model.setIsRespinTriggered(false);
        return;
      }
      this.requestSpin(false, "callReSpinRequest");
    } else {
      this.requestSpin(false, "callReSpinRequest");
    }
  } else if (this.model.getIsFreeSpinEnded()) {
    if (this.model.getIsPFSActive()) {
      this.model.PFSData.totalPFSWins += coreApp.gameModel.getTotalFSWin();
    }
    this.handleFSEnd();
  } else if (this.model.isFeatureActive()) {
    this.showFeatureGame();
  } else if (this.model.getIsFreeSpinTriggered()) {
    if (this.checkFeatureAssets("freespins")) {
      return;
    }
    //for storing autoplay history
    if (coreApp.gameModel.isAutoSpinActive() == true) {
      _ng.autoPlayBeforeFg = true;
    }
    this.model.stopAutoSpins();
    _mediator.publish("cancelAutoSpin");
    _mediator.publish("clearAllWins");

    if (!this.gameStateAnimation) {
      setTimeout(
        function () {
          _mediator.publish("playBonusSymbolAnimation", {
            bonusID: 100,
            reelMatrix: this.model.getReelMatrix(),
          });
        }.bind(this),
        10
      );
      this.gameStateAnimation = true;
    } else {
      this.gameStateAnimation = false;
      if (
        coreApp.gameModel.obj.current_round.misc_prizes &&
        coreApp.gameModel.obj.current_round.misc_prizes.count > 0
      ) {
        setTimeout(function () {
          _mediator.publish("showFreeSpinAwarded");
        }, coreApp.gameModel.obj.current_round.misc_prizes.count * 1100 + 1200);
      } else {
        setTimeout(function () {
          _mediator.publish("showFreeSpinAwarded");
        }, 600);
      }
    }
  } else if (this.model.isFreeSpinActive()) {
    if (this.checkFeatureAssets("freespins")) {
      return;
    }
    _mediator.publish("clearAllWins");
    _mediator.publish("SHOW_TICKER");

    var leftValue =
      this.model.getTotalFreeSpins() - this.model.getFreeSpinCurrentCount() + 1;
    // _mediator.publish("SHOW_TICKER_MESSAGE", pixiLib.getLiteralText("Free spins") + ": " + leftValue + "/" + this.model.getTotalFreeSpins());

    this.requestSpin(true);
  } else if (this.model.getIsPFSEnded()) {
    _mediator.publish("updatePromoWinText", this.model.PFSData.totalPFSWins);
    _mediator.publish("promoFreeSpinRewarded");
  } else if (this.model.getIsPFSActive() && !_ng.GameConfig.PFSUseLater) {
    if (!this.isPFSRunning) {
      if (this.model.getTotalPFS() == this.model.getRemainingPFS()) {
        _mediator.publish("promoFreeSpinAwarded");
        _mediator.publish("startDateTimer");
      } else {
        _mediator.publish("unfinishedPromoFreeSpin");
      }
      return;
    }
    _mediator.publish("clearAllWins");
    var delay = 0;
    _mediator.publish("SHOW_TICKER");
    if (this.model.getIsPFSTriggered()) {
      _mediator.publish("SHOW_TICKER_MESSAGE", "Starting Bonus free spins");
      delay = 500;
    }
    setTimeout(
      function () {
        var promoSpinLeft = this.model.getRemainingPFS() - 1;
        _mediator.publish("updatePromoSpinLeft", promoSpinLeft);
        _mediator.publish(
          "updatePromoWinText",
          this.model.PFSData.totalPFSWins
        );
        this.requestSpin(false);
      }.bind(this),
      delay
    );
  } else if (this.model.isAutoSpinActive()) {
    _mediator.publish("clearAllWins");
    this.updateAutoSpinCount();
    this.requestSpin(false);
  } else if (this.isSpaceBarHeld && this.allReelsStopped) {
    _mediator.publish("clearAllWins");
    this.requestSpin(false);
  } else {
    // if (coreApp.gameView.infoPopup.BuypopupPanelCon && coreApp.gameView.infoPopup.returnPopupStatus().visible == false) {
    _mediator.publish("setSpaceBarEvent", "spinClick");
    // }
    // if (_viewInfoUtil.device == "Mobile") {
    //     _mediator.publish("EnablePanel");
    // }

    if (!this.model.isAutoSpinActive() || !this.model.isFullFSActive()) {
      _sndLib.highBg();
    }

    if (
      this.model.getTotalWinLines() &&
      this.model.getTotalWinLines().length > 0
    ) {
      _mediator.publish("showAlternateLineWins");
    }
  }
};

/*For continuing autospin after free game*/
gSC.continueAutoSpin = function () {
  // _mediator.publish("countExitForCongratulation");
  //Close the rewarded popup in 3sec
  if (_ng.autoPlayBeforeFg == true) {
    setTimeout(() => {
      _mediator.publish("onFsCloseHandler");
      _mediator.publish("START_AUTOSPIN", _ng.autoPlayPrevCount);
      _mediator.publish("updateAutoSpinText", true);
    }, 3000);
  }
};

gSC.quickSpinInfoOnSpaceBar = function () {
  if (
    _viewInfoUtil.device == "Mobile" ||
    coreApp.gameModel.isAutoSpinActive() ||
    coreApp.gameModel.isFreeSpinActive() ||
    _ng.BuyFSenabled ||
    coreApp.gameModel.getIsPFSActive()
  ) {
    return;
  }

  this.spaceBarClickCount++;
  if (this.spaceBarClickCount == 12) {
    clearInterval(this.spaceBarClickInterval);
    _mediator.publish("checkForQuickSpinInfo");
  }
};

gSC.triggerAllWinAnimation = function () {
  if (this.model.spinData.getTotalWinAmount() > 0) {
    if (this.model.autoSpinData.getIsStopOnAnyWin()) {
      coreApp.gameModel.stopAutoSpins();
      _mediator.publish("cancelAutoSpin");
    }
    _mediator.publish(
      this.model.isBigWinActive() ? "showBigWins" : "showTotalWin"
    );
  }
};
gSC.enableMobilePanel = function () {
  /** checking the spin button panel is visible or not on mobile mode.
   *
   */
  if (_viewInfoUtil.device == "Mobile") {
    if (this.model.getIsPFSActive()) return;

    var status = coreApp.gameModel.isFreeSpinActive() ? "freeSpin" : "normal";
  }
  switch (status) {
    case "freeSpin":
      return;
      break;
    case "normal":
      if (
        !coreApp.gameModel.isAutoSpinActive() &&
        coreApp.gameModel.obj.current_round.spin_type != "freespin"
      ) {
        _mediator.publish("EnablePanel");
      }
      break;
    default:
      break;
  }
};

/*FOR CHANGING containerBg
    isFreespin = false - on BaseGame 
    isFreespin = true - on  FreeGame
*/
gSC.changeContainerBg = function (isFreespin) {
  if (desktopFullScreen == false || desktopFullScreen == "false") {
    var elm = document.getElementById("containerbg");
    elm.src =
      appPath +
      "games/" +
      gameName +
      "/dist/" +
      (isFreespin ? "containerfg.jpg" : "containerbg.jpg");
    elm.width = "100%";
    elm.height = "100%";
  }
};
