var view = InfoPopupView.prototype;
view.addSubscription = function () {
    _mediator.subscribe("showRealityCheckPopup", this.showRealityCheckPopup.bind(this));
    _mediator.subscribe("showFreeSpinAwarded", this.showFreeSpinAwarded.bind(this));
    _mediator.subscribe("showFreeSpinEnded", this.showFreeSpinEnded.bind(this));
    _mediator.subscribe("showSuperMeterPopup", this.showSuperMeterPopup.bind(this));
    _mediator.subscribe(_events.core.onResize, this.onViewResize.bind(this));
    _mediator.subscribe("showBonusAwardedMsg", this.onShowBonusAward.bind(this));
    _mediator.subscribe("showBonusWinMsg", this.onShowBonusWin.bind(this));
    //error messages
    _mediator.subscribe("showErrorMsg", this.onShowErrorMsg.bind(this));
    //Spacebar Events
    _mediator.subscribe("hideInfoPopup", this.hideInfoPopup.bind(this, this.hideInfoEventType, this.hideInfoDelay));
    _mediator.subscribe("onFSContinueClick", this.onFSContinueClick.bind(this));
    _mediator.subscribe("onBonusAwardContinueClick", this.onBonusAwardContinueClick.bind(this));
    _mediator.subscribe("onBonusWinContinueClick", this.onBonusWinContinueClick.bind(this));
    _mediator.subscribe("onFsCloseHandler", this.onFsCloseHandler.bind(this));
    _mediator.subscribe("gotolobby", this.gotoLobby.bind(this));
    _mediator.subscribe("showFreeSpinEndedZeroBalance", this.showFreeSpinEndedZeroBalance.bind(this));
    _mediator.subscribe("BuyFreeSpinPopup", this.BuyFreeSpinPopup.bind(this));
    _mediator.subscribe("BuyFreeSpinPopup_tur", this.BuyFreeSpinPopup_tur.bind(this));

    _mediator.subscribe("ExtraFSAwardpopup",this.ExtraFSAwardpopup.bind(this));
    _mediator.subscribe("closeBuyFSPopup",this.closeBuyFSPopup.bind(this));
    _mediator.subscribe("spinStart",this.closeBuyFSPopup.bind(this));
    _mediator.subscribe("WinExceededPopup",this.WinExceededPopup.bind(this));
    _mediator.subscribe("resizeBuypopup",this.resizeBuypopup.bind(this));
    _mediator.subscribe("setFsPlayedcnt",this.setFsPlayedcnt.bind(this));
    //bet adjustment 
    _mediator.subscribe("createTotalBetSelector",this.createTotalBetSelector.bind(this));
    _mediator.subscribe("updateSelectorContainerBet",this.updateSelectorContainerBet.bind(this));
    _mediator.subscribe("selectorPlusInteraction",this.selectorPlusInteraction.bind(this));
    _mediator.subscribe("selectorMinusInteraction",this.selectorMinusInteraction.bind(this));
    _mediator.subscribe("countExitForCongratulation",this.CountExit.bind(this));
    _mediator.subscribe("quickSpinInfoPopup",this.quickSpinInfoPopup.bind(this));
    _mediator.subscribe("closeQuickSpinInfo",this.closeQuickSpinInfo.bind(this));

    //FOR PFS
    _mediator.subscribe("promoFreeSpinAwarded",this.promoFreeSpinAwarded.bind(this));
    _mediator.subscribe("promoFreeSpinRewarded",this.promoFreeSpinRewarded.bind(this));
    _mediator.subscribe("unfinishedPromoFreeSpin",this.unfinishedPromoFreeSpin.bind(this));

    _mediator.subscribe("startDateTimer",this.startDateTimer.bind(this));
    // _mediator.subscribe("calculateDateTime",this.calculateDateTime.bind(this));
    // _mediator.subscribe("toggleAutoplayPopup",this.hideGrayBG.bind(this));
    // this.grayBGPopup = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
    // this.grayBGPopup.name = "Autoplay Close Gray BG";
    // this.grayBGPopup.alpha = 0.2;
    // this.grayBGPopup.interactive = true;
    // this.grayBGPopup.buttonMode = true;
    // coreApp.gameView.mainContainer.addChildAt(this.grayBGPopup, 1);
    // this.grayBGPopup.visible = false;
    // pixiLib.addEvent(this.grayBGPopup,function(){
    //     _mediator.publish("closeAutoSpinPopup");
    //     // if (this.grayBGPopup) {
    //     //     this.grayBGPopup.visible = false;   
    //     // }
    //     });
    this.exceed=false;
    // this.onViewResize();

    // this.popupOpenCount = 0;
  };
view.showFreeSpinAwarded = function (numSpins, nextAction) {
    _mediator.publish("CreateScatterWinAnim");
    _sndLib.play(_sndLib.sprite.fsAwardPopup);
    setTimeout(() => {
    _mediator.publish("moveBuyFeature");
    if (_ng.isQuickSpinActive == true && _ng.GameConfig.FastAnim == true) {
        _ng.turboActiveByUser = true;
    }
    _mediator.publish("onQuickSpinOff");
    _mediator.publish("onSloAnimQuickSpinOff");
    
    
    this.nextAction = nextAction;

    var fsPopupConfig = _ng.GameConfig.infoPopupView.freeSpinPopup;
    var numSpins = coreApp.gameModel.getTotalFreeSpins();
    // var numSpins = (Number.isInteger(parseInt(numSpins))) ? numSpins : coreApp.gameModel.getTotalFSTriggered();

    this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
    this.grayBg.alpha = 0.2;
    this.grayBg.interactive = true;
    this.grayBg.buttonMode = true;
    coreApp.gameView.decoratorContainer.addChildAt(this.grayBg, 0);

    this.popupParent = pixiLib.getElement();
    this.addChild(this.popupParent);

    // var fsBg = pixiLib.getElement("Sprite", fsPopupConfig.background.bgImage);
    // this.popupParent.addChild(fsBg);
    // pixiLib.setProperties(fsBg, fsPopupConfig.background.props);

    var congTxt = pixiLib.getElement("Spine", "Free_Spin");
    this.popupParent.addChild(congTxt);
    pixiLib.setProperties(congTxt, fsPopupConfig.descriptionImg.props);
    congTxt.state.setAnimation(0,'Congratulation_loop',true);
    // debugger;
    // var fsTitle = pixiLib.getElement("Text", fsPopupConfig.descriptionText1.textStyle);
    // fsTitle.style = fsPopupConfig.descriptionText1.textStyle;
    // pixiLib.setText(fsTitle, fsPopupConfig.descriptionText1.text);
    // this.popupParent.addChild(fsTitle);
    // pixiLib.setProperties(fsTitle, fsPopupConfig.descriptionText1.props);
    
    // var fsTitle = pixiLib.getElement("Text", fsPopupConfig.descriptionText3.textStyle);
    // fsTitle.style = fsPopupConfig.descriptionText3.textStyle;
    // pixiLib.setText(fsTitle, fsPopupConfig.descriptionText3.text);
    // this.popupParent.addChild(fsTitle);
    // pixiLib.setProperties(fsTitle, fsPopupConfig.descriptionText3.props);
    
    this.numSpinsTxt = pixiLib.getElement("Text", fsPopupConfig.fsValue.textStyle);
    this.popupParent.addChild(this.numSpinsTxt);
    pixiLib.setProperties(this.numSpinsTxt, fsPopupConfig.fsValue.props);
    pixiLib.setText(this.numSpinsTxt, numSpins);
    
    // var fsTxt = pixiLib.getElement("Sprite", fsPopupConfig.freespinImg.bgImage);
    // this.popupParent.addChild(fsTxt);
    // pixiLib.setProperties(fsTxt, fsPopupConfig.freespinImg.props);


    // var fsType = pixiLib.getElement("Text", fsPopupConfig.descriptionText2.textStyle);
    // fsType.style = fsPopupConfig.descriptionText2.textStyle;
    // pixiLib.setText(fsType, fsPopupConfig.descriptionText2.text);
    // this.popupParent.addChild(fsType);
    // pixiLib.setProperties(fsType, fsPopupConfig.descriptionText2.props);

    var continueBtn = pixiLib.getButton(fsPopupConfig.continueButton.bgImage);
    this.popupParent.addChild(continueBtn);
    pixiLib.setProperties(continueBtn, fsPopupConfig.continueButton.props);


    // this.continueText = pixiLib.getElement("Text", fsPopupConfig.continueText.textStyle, fsPopupConfig.continueText.text);
    // this.popupParent.addChild(this.continueText);
    // pixiLib.setProperties(this.continueText, fsPopupConfig.continueText.props);

    setTimeout(function () {
        //Adding timeout so popup will be shown fully then enable spacebar
        _mediator.publish("setSpaceBarEvent", "onFSContinueClick");
    }, 500);
    pixiLib.addEvent(continueBtn,() => {
        _sndLib.play(_sndLib.sprite.btnClick);
        this.onFSContinueClick();
    });
        
    
    pixiLib.addEvent(this.grayBg, 
        this.onFSContinueClick.bind(this)
    );
    _ngFluid.call(this, fsPopupConfig.params);

    this.onViewResize();
    this.showInfoPopup();

    //skipping the popup
    if(_ng.autoPlayBeforeFg == true) {
        pixiLib.setInteraction(continueBtn,false);
        this.grayBg.interactive = false;
        this.grayBg.buttonMode = false;
        setTimeout(function () {
             _mediator.publish("onFSContinueClick");
        }, 1000);  
    }
    }, 2300);
   
};

view.hideInfoPopup = function (eventToPublish, delay) {
    _sndLib.play(_sndLib.sprite.hidePopup);
    var delay = 0 || delay;
    if(this.grayBg)
    {
    TweenMax.to(this.grayBg, 0.3, { alpha: 0 });
    }
    if(this.popupParent)
    {
    TweenMax.to(this.popupParent.scale, 0.3, {
        x: 0, y: 0,
        onComplete: function () {

            if(this.popupParent){
            this.popupParent.destroy();
            delete this.popupParent;
            }

            if(this.grayBg){
            this.grayBg.destroy();
            delete this.grayBg;
            }
            if (this.hideInfoEventType) {
                setTimeout(function () {
                    _mediator.publish(this.hideInfoEventType);
                }.bind(this), this.hideInfoDelay);
            }
        }.bind(this)
    })
}
};
view.counterWinAmount=function(th,startValue, obj, time)
{
  var endValue = (coreApp.gameModel.getTotalFSWin()/100); //startValue + bonusValue;
	var initValue = startValue;
	var tempdif = endValue-initValue;
	var noOfSteps = time / 50;
	//endValue = parseFloat(endValue);
	var incrementer = tempdif / noOfSteps;
	var currentStep = 0;
    _sndLib.play(_sndLib.sprite.counterLoop);
	this.interVal = setInterval(function () {
		currentStep++;
	  if (currentStep > noOfSteps) {
		clearInterval(this.interVal);
    _sndLib.stop(_sndLib.sprite.counterBigWinLoop);
		//endValue = th.roundTwoDecimal(endValue,th);
		// if (obj.width > 50) {
		//   var ratioOfText = 100 / obj.width;
		//   obj.scale.set(obj.scale.x * ratioOfText, obj.scale.y * ratioOfText);
		// }
		obj.text = pixiLib.getFormattedAmount(endValue*100);
	  }
	  else {
    //   _sndLib.stop(_sndLib.sprite.counterBigWinLoop);
    //   _sndLib.play(_sndLib.sprite.counterBigWinLoop);
		//.log(initValue," Steps : ", noOfSteps, " Incr ", incrementer);.toLocaleString('en-IN');
		var BoundedVal = (initValue + (currentStep * incrementer));
		// if (obj.width > 50) {
		//   var ratioOfText = 100 / obj.width;
		//   obj.scale.set(obj.scale.x * ratioOfText, obj.scale.y * ratioOfText);
		// }
		obj.text = pixiLib.getFormattedAmount(BoundedVal*100); //Math.round(initValue + (currentStep * incrementer));//
  
	  }
	}, 50);
//	this.tempstartvalue = endValue;

};
view.showFreeSpinEnded = function () {

    /*reseting after free spin ended*/
    if(_ng.BuyFSenabled === true){
        _ng.BuyFSenabled = false;
    }
    _mediator.publish("showNewMessage","");
    _sndLib.play(_sndLib.sprite.fsWinPopup);
    var winAmount = coreApp.gameModel.getTotalFSWin();
   if((this.exceed==false)&&(Number(coreApp.gameModel.getTotalFSWin()))>=5000*(Number(coreApp.gameModel.getTotalBet())))
    {
        console.log("win exceeded");
        this.WinExceededPopup((Number(coreApp.gameModel.getTotalBet())));
    }
    else
    {
       if (this.exceed) { this.exceed = false; }
    var fsPopupConfig = _ng.GameConfig.infoPopupView.freeSpinEndPopup;
    this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
    this.grayBg.alpha = 0.6;
    this.grayBg.interactive = true;
    this.grayBg.buttonMode = true;
    pixiLib.addEvent(this.grayBg, this.CountExit.bind(this));
    coreApp.gameView.decoratorContainer.addChildAt(this.grayBg, 0);

    this.popupParent = pixiLib.getElement();
    this.addChild(this.popupParent);

    // var fsEndBg = pixiLib.getElement("Sprite", fsPopupConfig.background.bgImage);
    // this.popupParent.addChild(fsEndBg);
    // pixiLib.setProperties(fsEndBg, fsPopupConfig.background.props);

    // var congTxt = pixiLib.getElement("Sprite", fsPopupConfig.descriptionImg.bgImage);
    // this.popupParent.addChild(congTxt);
    // pixiLib.setProperties(congTxt, fsPopupConfig.descriptionImg.props);

    // var youWin = pixiLib.getElement("Sprite", fsPopupConfig.you_win.bgImage);
    // this.popupParent.addChild(youWin);
    // pixiLib.setProperties(youWin, fsPopupConfig.you_win.props);
    var congTxt = pixiLib.getElement("Spine", "Free_Spin");
    this.popupParent.addChild(congTxt);
    pixiLib.setProperties(congTxt, fsPopupConfig.descriptionImg.props);
    congTxt.state.setAnimation(0,'Free_Spin_loop',true);
    // var fsTitle = pixiLib.getElement("Text", fsPopupConfig.descriptionText1.textStyle);
    // fsTitle.style = fsPopupConfig.descriptionText1.textStyle;
    // pixiLib.setText(fsTitle, fsPopupConfig.descriptionText1.text);
    // this.popupParent.addChild(fsTitle);
    // pixiLib.setProperties(fsTitle, fsPopupConfig.descriptionText1.props);

    this.winAmountTxt = pixiLib.getElement("Text", fsPopupConfig.fsWinValue.textStyle);
    this.popupParent.addChild(this.winAmountTxt);
    pixiLib.setProperties(this.winAmountTxt, fsPopupConfig.fsWinValue.props);
    pixiLib.setText(this.winAmountTxt, pixiLib.getFormattedAmount(winAmount));

      var  fsStyle={
                    "dropShadow": true,
                    "dropShadowAlpha": 0.4,
                    "dropShadowAngle": 0,
                    "dropShadowBlur": 5,
                    "dropShadowColor": "#ffffff",
                    "dropShadowDistance": 0,
                    "fill": [
                        "#ffffff",
                        "#f8e1b9"
                    ],
                    "fontFamily": "Arial Black",
                    "fontSize": 50,
                    "fontWeight": "bolder",
                    "lineJoin": "round",
                    "stroke": "#ff7300",
                    "strokeThickness": 10
                }       
    

    this.inFs = pixiLib.getElement("Text",fsStyle);
    this.popupParent.addChild(this.inFs);
    this.inFs.position.set(-245,110);

    pixiLib.setText(this.inFs, gameLiterals.IN_text);

    this.TotalFSCount = pixiLib.getElement("Text", fsStyle);
    this.popupParent.addChild(this.TotalFSCount);
    this.TotalFSCount.position.set(gameLiterals.countPos.pos.x,gameLiterals.countPos.pos.y);
    pixiLib.setText(this.TotalFSCount, coreApp.gameModel.freeSpinData.totalFreeSpins);


    this.FStxt = pixiLib.getElement("Text", fsStyle);
    this.popupParent.addChild(this.FStxt);
    this.FStxt.position.set(gameLiterals.freespinText.pos.x,gameLiterals.freespinText.pos.y);
    pixiLib.setText(this.FStxt, gameLiterals.freespinText.text);

    this.counterWinAmount(this,0,this.winAmountTxt,3000);
    // var fsType = pixiLib.getElement("Text", fsPopupConfig.descriptionText2.textStyle);
    // fsType.style = fsPopupConfig.descriptionText2.textStyle;
    // pixiLib.setText(fsType, fsPopupConfig.descriptionText2.text);
    // this.popupParent.addChild(fsType);
    // pixiLib.setProperties(fsType, fsPopupConfig.descriptionText2.props);

    
    this.endcontinueBtn = pixiLib.getButton(fsPopupConfig.continueButton.bgImage);
    this.popupParent.addChild(this.endcontinueBtn);
    pixiLib.setProperties(this.endcontinueBtn, fsPopupConfig.continueButton.props);

    // this.continueText = pixiLib.getElement("Text", fsPopupConfig.continueText.textStyle, fsPopupConfig.continueText.text);
    // this.popupParent.addChild(this.continueText);
    // pixiLib.setProperties(this.continueText, fsPopupConfig.continueText.props);

    setTimeout(function () {
        //Adding timeout so popup will be shown fully then enable spacebar
        _mediator.publish("setSpaceBarEvent", "onFsCloseHandler");
    }, 3000);
    pixiLib.addEvent(this.endcontinueBtn, this.CountExit.bind(this));
    _ngFluid.call(this, fsPopupConfig.params);

    this.onViewResize();
    this.showInfoPopup();

    /*skiping rewarded popup*/
    this.skipFreeSpinRewarded();
    }
};
view.CountExit=function()
{
    _sndLib.stop(_sndLib.sprite.counterBigWinLoop);
    var winAmount = coreApp.gameModel.getTotalFSWin();
    if(this.interVal)
        clearInterval(this.interVal);
    pixiLib.setText(this.winAmountTxt, pixiLib.getFormattedAmount(winAmount));
    pixiLib.addEvent(this.grayBg, this.onFsCloseHandler.bind(this));
    pixiLib.addEvent(this.endcontinueBtn, () => {
        _sndLib.play(_sndLib.sprite.btnClick);
        this.onFsCloseHandler();
    });
        
        
}

view.onFSContinueClick = function () {
    _mediator.publish("ToggleTurbo",false);
    var fsCount = coreApp.gameModel.getTotalFreeSpins();
    // var fsCount = 10;
    // _mediator.publish("toggleFsContainer",true);
    // _mediator.publish("updateTotalFsCount",fsCount);
    if (this.nextAction == "closeBonus") {
        _mediator.publish("closeBonus");
    }
    //If Freespins are Re-Triggered, don't show starting Freespins message in Ticker
    if (coreApp.gameModel.getTotalFSTriggered() == coreApp.gameModel.getTotalFreeSpins()) {
        _mediator.publish("showNewMessage", gameLiterals.startfree);
        _mediator.publish("SHOW_TICKER");
    }
    _mediator.publish('showMultipler', 0);
    // _mediator.publish('hideAllLines');
    this.hideInfoEventType = "startFreeSpins";
    this.hideInfoDelay = 500;
    this.hideInfoPopup("startFreeSpins", 500);
};
view.onFsCloseHandler = function () {
    _mediator.publish('showMultipler', 0);
    _mediator.publish("ToggleTurbo",true);
    _mediator.publish("hideandShowBuyfeature",true);
        _mediator.publish("updateTickerPosVp",true);
        _mediator.publish("enableBuyFeature");
        _mediator.publish("bringBackBuyFeature")
    _mediator.publish("bringspinbtnback");
    _mediator.publish("UpdateWin","");
    _mediator.publish(_events.slot.updateBalance);
    _mediator.publish("toggleTumbleBox",false);
    _mediator.publish("toggleFadeContainer",true);
    _mediator.publish("setSpaceBarEvent", "idle");
    this.hideInfoEventType = "onFSEndShown";
    this.hideInfoDelay = 0;
    _sndLib.play(_sndLib.sprite.hidePopup);
    this.hideInfoPopup("onFSEndShown");
    _mediator.publish("SHOW_IDLE_MESSAGE");
    if ( _ng.turboActiveByUser == true) {
        _ng.turboActiveByUser = false;
        _mediator.publish("onQuickSpinOn");
    } 
};
view.startRealityInterval = function () {
    if (commonConfig.noRCPPopupMobile && _viewInfoUtil.device === "Mobile") {
      return;
    }
    if (commonConfig.noRCPPopupDesktop && _viewInfoUtil.device === "Desktop") {
      return;
    }
    this.realityInterval = setInterval(function () {
      this.rcpTimeElapsed = this.rcpTimeout;
      if (this.rcpIsFirstDisplay) {
        this.rcTotalTime = this.rcpTimeout;
        var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.contentTxt.text);
        if(coreApp.lang=="tr")
        {
            var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.contentTxt_tr.text);
        }
        pixiLib.setText(this.container.contentTxt, mText.replace("%A1%", parseFloat(this.rcTotalTime.toFixed(2))));
        setInterval(function () {
          this.rcTotalTime++;
          var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.contentTxt.text);
          if(coreApp.lang=="tr")
            {
                var mText = pixiLib.getLiteralText(_ng.GameConfig.realityCheck.contentTxt_tr.text);
            }
          pixiLib.setText(this.container.contentTxt, mText.replace("%A1%", parseFloat(this.rcTotalTime.toFixed(2))));
        }.bind(this), 1 * 60000);
      }
      _mediator.publish("showRealityCheckPopup");
      this.rcpIsFirstDisplay = false;
    }.bind(this), this.rcpTimeElapsed * 60000);
  
  };
  
view.BuyFreeSpinPopup = function(Updatevalue,show){
    if(this.BuypopupPanel && show){
        //  _mediator.publish("showMobPanel",false)
        if(Updatevalue>0){
            pixiLib.setText(this.amtTxt,pixiLib.getFormattedAmount(Updatevalue*coreApp.gameModel.spinData.buyfg));
          
        }else if(coreApp.gameModel.obj.previous_round){
            pixiLib.setText(this.amtTxt,pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value*coreApp.gameModel.spinData.buyfg));
  
        }

        this.BuypopupPanelCon.scale.set(0.01);
        TweenMax.to(this.BuypopupPanelCon, 0.2, {
            x:-35, y:0.85,
            ease: "easeInSine",
            onComplete: function() {
                this.BuypopupPanelCon.scale.set(0.8);
                TweenMax.to(this.BuypopupPanelCon.scale,0.7, {
                    /* width: this.BuypopupPanelCon.width+550,
                    height: this.BuypopupPanelCon.height+450, */
                    x:0.85, y:0.85,
                    ease: "easeOutSine",
                    yoyo: true,
                    repeat: -1
                    });
            }.bind(this)
        });

        this.grayBgbuy.alpha = 0;
        TweenMax.to(this.grayBgbuy,.2, {
            /* width: this.BuypopupPanelCon.width+550,
            height: this.BuypopupPanelCon.height+450, */
            alpha:0.5,
            ease: "none",
            });
        // if(this.popupOpenCount > 0)
        //     this.grayBgbuy.y = -1004;
        // else 
            this.grayBgbuy.y = -1009;
        this.BuypopupCon.visible = true;
        this.BuypopupPanel.visible = true;
        this.grayBgbuy.visible = true;
        // if (_viewInfoUtil.viewType != "VD") {
        //     this.grayBgbuy.visible = false;
        // }
        // else {
        //     this.grayBgbuy.visible = true;
        // }
    }
    else if(this.BuypopupPanel && !show)
        {
            if(Updatevalue>0){
                pixiLib.setText(this.amtTxt,pixiLib.getFormattedAmount(Updatevalue*coreApp.gameModel.spinData.buyfg));

            }else if(coreApp.gameModel.obj.previous_round){
                pixiLib.setText(this.amtTxt,pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value*coreApp.gameModel.spinData.buyfg));

            }
    }
    else if(show){
    this.grayBgbuy = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
    this.grayBgbuy.alpha = 0.5;
    // this.grayBgbuy.interactive = true;
    // this.grayBgbuy.buttonMode = true;
    if(_viewInfoUtil.viewType=="VD") {
        this.grayBgbuy.scale.set(10,1.83);
    }else{
    this.grayBgbuy.scale.set(10);
    }
    this.grayBgbuy.x=-1000;  
    // if(this.popupOpenCount > 0)
    // {
    //     this.grayBgbuy.y = -1004;
    // }
    // else{
        this.grayBgbuy.y = -1009;
        this.addChild(this.grayBgbuy);
    // }
    // if(_viewInfoUtil.viewType="VD")
        this.grayBgbuy.visible=true;
    this.BuypopupPanelCon = pixiLib.getContainer();
    this.BuypopupPanelCon.name = "BuypopupPanelCon";
    this.addChild(this.BuypopupPanelCon);
    this.BuypopupPanelCon.interactive = true;
    this.BuypopupPanel = pixiLib.getElement("Sprite", "buyPopup-bg");
	this.BuypopupPanelCon.addChild(this.BuypopupPanel);
	this.BuypopupPanel.name = "BuyPanel"
	this.BuypopupPanel.x=-257.5;
	this.BuypopupPanel.y = -205;
	this.BuypopupPanel.scale.set(0.95,0.85)

    this.BuypopupCon = pixiLib.getContainer();
	this.BuypopupCon.name = "BuypopupCon"
	this.BuypopupCon.x =40;
	this.BuypopupCon.y = 296;
	this.BuypopupPanelCon.addChild(this.BuypopupCon);


    if(_viewInfoUtil.viewType=="VL")
        {
            this.BuypopupCon.x = 5;
	this.BuypopupCon.y = 181;
    this.BuypopupCon.scale.set(0.75);

    this.BuypopupPanel.x=-200.5;
	this.BuypopupPanel.y = -195;
	this.BuypopupPanel.scale.set(0.65,0.6)
        }

    var style = {
        dropShadow: false,
        dropShadowColor: "#ef0aff",
        fill: "#ffffff",
        // fontFamily: "Tahoma",
        fontFamily: "Arial",       
        fontSize: 40,
        fontWeight: "bold",
        stroke: "#ef0aff",
        strokeThickness: 6
	}

    var amountTextStyle = {
        "dropShadow": true,
        "fill": "#ffc800",
        //ffc800 FFC000
        "fontFamily": "Arial",
        "fontSize": 35,
        "fontWeight": "bolder",
        "letterSpacing": 3,
        "lineJoin": "bevel",
        "miterLimit": 18,
       "stroke": "#FFC000",
        "strokeThickness": 4     
    };
//--------------------------------------------------------------------

     //Popup text elements for English

     //1
    this.AreYouSure = pixiLib.getElement("Sprite","text");
    this.AreYouSure.name = "AreYouSure";
	this.AreYouSure.x=115;
	this.AreYouSure.y=-270;
    this.AreYouSure.anchor.set(0.5);

//    pixiLib.setText(this.AreYouSure,"Are you sure you want \n  to purchase ");
	this.BuypopupCon.addChild(this.AreYouSure);

    this.areSubTxt1 = pixiLib.getElement("Text",amountTextStyle);
    this.areSubTxt1.name = "areSubTxt1";
	this.areSubTxt1.x = 160;
	this.areSubTxt1.y = -315;
    this.areSubTxt1.anchor.set(0.5);

    pixiLib.setText(this.areSubTxt1,"10");
    this.BuypopupCon.addChild(this.areSubTxt1);

//    this.areSubTxt2 = pixiLib.getElement("Text",style);
//    this.areSubTxt2.name = "areSubTxt2";
//	this.areSubTxt2.x = 155;
//	this.areSubTxt2.y = -384;
//    this.areSubTxt2.anchor.set(0.5);
//
//    pixiLib.setText(this.areSubTxt2,"Free");
//    this.BuypopupCon.addChild(this.areSubTxt2);

//    this.areSubTxt3 = pixiLib.getElement("Text",style);
//    this.areSubTxt3.name = "areSubTxt3";
//	this.areSubTxt3.x = 16;
//	this.areSubTxt3.y = -335;
//    this.areSubTxt3.anchor.set(0.5);
//    pixiLib.setText(this.areSubTxt3,"Spins at the cost of");
//    this.BuypopupCon.addChild(this.areSubTxt3);

	this.amtTxt = pixiLib.getElement("Text",amountTextStyle);
    this.amtTxt.name = "amtTxt";
    this.amtTxt.anchor.set(0.5);
	this.amtTxt.x=-22;
	this.amtTxt.y=-275;
    this.amtTxt.anchor.set(0.5);

    pixiLib.setText(this.amtTxt,"$100");
	this.BuypopupCon.addChild(this.amtTxt);
	// this.amtTxt.anchor.set(0.5);

//    this.questTxt = pixiLib.getElement("Text",style);
//    this.questTxt.name = "questTxt";
//	this.questTxt.x = 95;
//	this.questTxt.y = -279;
//    this.questTxt.anchor.set(0.5);
//
//    pixiLib.setText(this.questTxt,"?");
//    this.BuypopupCon.addChild(this.questTxt);

	this.buyButton = pixiLib.getButton("yes_btn");
    this.buyButton.name = "yesButton";
	this.buyButton.x =215
	this.buyButton.y = -135
	this.buyButton.scale.set(1);
	this.buyButton.interactive = true;
	this.buyButton.buttonMode = true;
//    this.yes_txt = pixiLib.getElement("Text",style);
//    this.yes_txt.name = "yes_txt";
//    this.yes_txt.x=100;
//    this.yes_txt.y=42;
//    this.yes_txt.anchor.set(0.5);
//    pixiLib.setText(this.yes_txt,"YES");
//    this.buyButton.addChild(this.yes_txt);
    pixiLib.addEvent(this.buyButton, function(){
        if(coreApp.gameController.allReelsStopped)
        {
        _sndLib.play(_sndLib.sprite.btnClick);
        this.removeSelector();
        _ng.BuyFSenabled = true;
        _ng.buyFeaturePopupStatus = false;
        this.BuyServerReq();
        _mediator.publish("ToggleSpin",false);
        _mediator.publish("setSpaceBarEvent", "idle");
        _mediator.publish("hideMobPanel")
        this.BuypopupCon.visible = false;
        this.BuypopupPanel.visible = false;
        this.grayBgbuy.visible = false;
        _mediator.publish("disableBuyFeature");
        _mediator.publish("updateTickerPosVp",false);
        // _mediator.publish("moveBuyFeature");
        // _mediator.publish("onCloseBtn");
        this.closeBuyFSPopup();
        _mediator.publish("disablePanelFs");
        }
    }.bind(this)
    );
	this.BuypopupCon.addChild(this.buyButton);
   

    this.CancelButton = pixiLib.getButton("no_btn");
    this.CancelButton.name = "noButton";
	this.CancelButton.x = -125
	this.CancelButton.y = -135
	this.CancelButton.scale.set(1);
	this.CancelButton.interactive = true;
	this.CancelButton.buttonMode = true;
//    this.no_txt = pixiLib.getElement("Text",style);
//    this.no_txt.name = "no_txt";
//    this.no_txt.x=100;
//    this.no_txt.y=42;
//    this.no_txt.anchor.set(0.5);
//    pixiLib.setText(this.no_txt,"NO");
//    this.CancelButton.addChild(this.no_txt);
	pixiLib.addEvent(this.CancelButton, function(){
        _sndLib.play(_sndLib.sprite.btnClick);
        _ng.buyFeaturePopupStatus = false;
        this.removeSelector();
        _mediator.publish("setSpaceBarEvent", "spinClick"); 
        this.BuypopupPanelCon.scale.set(1);
        TweenMax.to(this.BuypopupPanelCon.scale,.2, {
        x:0.1, y:0.1,
        ease: "none",
        onComplete: function() {
            this.BuypopupCon.visible = false;
            this.BuypopupPanel.visible = false;
            this.grayBgbuy.visible = false;
        }.bind(this)
        });
       
       
        this.grayBgbuy.alpha = 0.5;
        TweenMax.to(this.grayBgbuy, 0.2, {
            alpha: 0,
            ease: "none",
            onComplete: function() {
                this.BuypopupCon.visible = false;
                this.BuypopupPanel.visible = false;
                this.grayBgbuy.visible = false;
            }.bind(this)
        });
        _mediator.publish("ToggleMobPanel",true);
        _mediator.publish("ToggleSpin",true)
        _mediator.publish("hideMobPanel")
        _mediator.publish("onCloseBtn")
        _mediator.publish("hideandShowBuyfeature",true);      //enabling buy feature button while click on "no" button
        _mediator.publish("SHOW_TICKER_MESSAGE", "SPIN TO WIN !!");
    }.bind(this)
    
    );
    pixiLib.addEvent(this.grayBgbuy, function(){
        this.removeSelector();
        this.BuypopupPanelCon.scale.set(1);
        TweenMax.to(this.BuypopupPanelCon.scale,.2, {
        x:0.1, y:0.1,
        ease: "none",
        onComplete: function() {
            this.BuypopupCon.visible = false;
            this.BuypopupPanel.visible = false;
            this.grayBgbuy.visible = false;
        }.bind(this)
        });
   
        this.grayBgbuy.alpha = 0.5;
        TweenMax.to(this.grayBgbuy, 0.2, {
            alpha: 0,
            ease: "none",
            onComplete: function() {
                this.BuypopupCon.visible = false;
                this.BuypopupPanel.visible = false;
                this.grayBgbuy.visible = false;
            }.bind(this)
        });
        _mediator.publish("ToggleSpin",true)
        _mediator.publish("hideMobPanel");
        _mediator.publish("hideandShowBuyfeature",true);   //enabling buy feature container on while we click on free spin popup gray bg
        _mediator.publish("toggleBetContainer",false);   //hiding bet container if it is present
        _mediator.publish("SHOW_TICKER_MESSAGE", "placeurbet_text");
    }.bind(this)
    
    );

	this.BuypopupCon.addChild(this.CancelButton);

    this.BuypopupPanelCon.scale.set(0.01);
    TweenMax.to(this.BuypopupPanelCon, 0.2, {
        x:-115, y:-27,
        ease: "easeInSine",
        onComplete: function() {
            this.BuypopupPanelCon.scale.set(0.8);
            TweenMax.to(this.BuypopupPanelCon.scale,0.7, {
                /* width: this.BuypopupPanelCon.width+550,
                height: this.BuypopupPanelCon.height+450, */
                x:0.85, y:0.85,
                ease: "easeOutSine",
                yoyo: true,
                repeat: -1
                });
        }.bind(this)
    });

    this.grayBgbuy.alpha = 0;
    TweenMax.to(this.grayBgbuy,.2, {
        /* width: this.BuypopupPanelCon.width+550,
        height: this.BuypopupPanelCon.height+450, */
        alpha:0.5,
        ease: "none",
        });

    if(Updatevalue>0){
        pixiLib.setText(this.amtTxt,pixiLib.getFormattedAmount(Updatevalue*coreApp.gameModel.spinData.buyfg));

    }
    else if(coreApp.gameModel.obj.previous_round){
        pixiLib.setText(this.amtTxt,pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value*coreApp.gameModel.spinData.buyfg));

    }
    else{
		pixiLib.setText(this.amtTxt,"$"+100);

    }
    this.onViewResize();
}
}
view.BuyFreeSpinPopup_tur = function(Updatevalue,show){
    if(this.BuypopupPanel && show){
        //  _mediator.publish("showMobPanel",false)
        if(Updatevalue>0){
           
            pixiLib.setText(this.amtTxt0_turkish,pixiLib.getFormattedAmount(Updatevalue*coreApp.gameModel.spinData.buyfg));
          
        }else if(coreApp.gameModel.obj.previous_round){
           
            pixiLib.setText(this.amtTxt0_turkish,pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value*coreApp.gameModel.spinData.buyfg));
  
        }

        this.BuypopupPanelCon.scale.set(0.01);
        TweenMax.to(this.BuypopupPanelCon, 0.2, {
            x:-115, y:-27,
            ease: "easeInSine",
            onComplete: function() {
                this.BuypopupPanelCon.scale.set(0.8);
                TweenMax.to(this.BuypopupPanelCon.scale,0.7, {
                    /* width: this.BuypopupPanelCon.width+550,
                    height: this.BuypopupPanelCon.height+450, */
                    x:0.85, y:0.85,
                    ease: "easeOutSine",
                    yoyo: true,
                    repeat: -1
                    });
            }.bind(this)
        });

        this.grayBgbuy.alpha = 0;
        TweenMax.to(this.grayBgbuy,.2, {
            /* width: this.BuypopupPanelCon.width+550,
            height: this.BuypopupPanelCon.height+450, */
            alpha:0.5,
            ease: "none",
            });
        // if(this.popupOpenCount > 0)
        //     this.grayBgbuy.y = -1004;
        // else 
            this.grayBgbuy.y = -1009;
        this.BuypopupCon1.visible = true;
        this.BuypopupPanel.visible = true;
        this.grayBgbuy.visible = true;
        // if (_viewInfoUtil.viewType != "VD") {
        //     this.grayBgbuy.visible = false;
        // }
        // else {
        //     this.grayBgbuy.visible = true;
        // }
    }
    else if(this.BuypopupPanel && !show)
        {
            if(Updatevalue>0){
                pixiLib.setText(this.amtTxt0_turkish,pixiLib.getFormattedAmount(Updatevalue*coreApp.gameModel.spinData.buyfg));

            }else if(coreApp.gameModel.obj.previous_round){
                pixiLib.setText(this.amtTxt0_turkish,pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value*coreApp.gameModel.spinData.buyfg));

            }
    }
    else if(show){
    this.grayBgbuy = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
    this.grayBgbuy.alpha = 0.5;
    // this.grayBgbuy.interactive = true;
    // this.grayBgbuy.buttonMode = true;
    if(_viewInfoUtil.viewType=="VD") {
        this.grayBgbuy.scale.set(10,1.83);
    }else{
    this.grayBgbuy.scale.set(10);
    }
    this.grayBgbuy.x=-1000;  
    // if(this.popupOpenCount > 0)
    // {
    //     this.grayBgbuy.y = -1004;
    // }
    // else{
        this.grayBgbuy.y = -1009;
        this.addChild(this.grayBgbuy);
    // }
    // if(_viewInfoUtil.viewType="VD")
        this.grayBgbuy.visible=true;
    this.BuypopupPanelCon = pixiLib.getContainer();
    this.BuypopupPanelCon.name = "BuypopupPanelCon";
    this.addChild(this.BuypopupPanelCon);
    this.BuypopupPanelCon.interactive = true;
    this.BuypopupPanel = pixiLib.getElement("Sprite", "buyPopup-bg");
	this.BuypopupPanelCon.addChild(this.BuypopupPanel);
	this.BuypopupPanel.name = "BuyPanel"
	this.BuypopupPanel.x=-257.5;
	this.BuypopupPanel.y = -205;
	this.BuypopupPanel.scale.set(0.85,0.85)

    //Turkish
    this.BuypopupCon1 = pixiLib.getContainer();
	this.BuypopupCon1.name = "BuypopupCon1"
	this.BuypopupCon1.x =70;
	this.BuypopupCon1.y = 306;
	this.BuypopupPanelCon.addChild(this.BuypopupCon1);
    // this.BuypopupCon1.visible= true;

    if(_viewInfoUtil.viewType=="VL")
        {
    this.BuypopupCon1.x = 25;
	this.BuypopupCon1.y = 181;
    this.BuypopupCon1.scale.set(0.75);

    this.BuypopupPanel.x=-200.5;
	this.BuypopupPanel.y = -195;
	this.BuypopupPanel.scale.set(0.65,0.6)
        }

    var style = {
        dropShadow: false,
        dropShadowColor: "#ef0aff",
        fill: "#ffffff",
        // fontFamily: "Tahoma",
        fontFamily: "Arial",       
        fontSize: 40,
        fontWeight: "bold",
        stroke: "#ef0aff",
        strokeThickness: 6
	}

    var amountTextStyle = {
        fontFamily: 'Arial',
        fontSize: 40,
        fontWeight: 'bold',
        fill: '#f3f70a',
        stroke: '#5c5645',
        strokeThickness: 8,
        // dropShadow: true,
        // dropShadowColor: "#faf2eb"
    };
     //Popup text elements for Turkish

     //1
	this.amtTxt0_turkish = pixiLib.getElement("Text",amountTextStyle);
    this.amtTxt0_turkish.name = "amtTxt0_turkish";
    this.amtTxt0_turkish.anchor.set(0.5);
	this.amtTxt0_turkish.x=-140;
	this.amtTxt0_turkish.y=-450;
    this.amtTxt0_turkish.anchor.set(0.5);

    pixiLib.setText(this.amtTxt0_turkish,"$100");
	this.BuypopupCon1.addChild(this.amtTxt0_turkish);

     //2
     this.text1_turkish = pixiLib.getElement("Text",style);
     this.text1_turkish.name = "text1_turkish";
     this.text1_turkish.x=80;
     this.text1_turkish.y=-450;
     this.text1_turkish.anchor.set(0.5);
 
     pixiLib.setText(this.text1_turkish,"karşılığında ");
     this.BuypopupCon1.addChild(this.text1_turkish);

     //3
     this.spinvalue_turkish = pixiLib.getElement("Text",amountTextStyle);
     this.spinvalue_turkish.name = "spinvalue_turkish";
     this.spinvalue_turkish.x = -205;
     this.spinvalue_turkish.y = -400;
     this.spinvalue_turkish.anchor.set(0.5);
 
     pixiLib.setText(this.spinvalue_turkish,"10");
     this.BuypopupCon1.addChild(this.spinvalue_turkish);

     //4
     this.text2_turkish = pixiLib.getElement("Text",style);
     this.text2_turkish.name = "text2_turkish";
     this.text2_turkish.x=18;
     this.text2_turkish.y=-375;
     this.text2_turkish.anchor.set(0.5);
 
     pixiLib.setText(this.text2_turkish,"bedava dönüş satın \n");
     this.BuypopupCon1.addChild(this.text2_turkish);

      //5
      this.text3_turkish = pixiLib.getElement("Text",style);
      this.text3_turkish.name = "text3_turkish";
      this.text3_turkish.x=-9;
      this.text3_turkish.y=-325;
      this.text3_turkish.anchor.set(0.5);
  
      pixiLib.setText(this.text3_turkish,"almak istediğinizden \n");
      this.BuypopupCon1.addChild(this.text3_turkish);

       //6
       this.text4_turkish = pixiLib.getElement("Text",style);
       this.text4_turkish.name = "text4_turkish";
       this.text4_turkish.x=-9;
       this.text4_turkish.y=-298;
       this.text4_turkish.anchor.set(0.5);
   
       pixiLib.setText(this.text4_turkish,"emin misiniz?");
       this.BuypopupCon1.addChild(this.text4_turkish);

     //buy button 

     this.buyButton_T = pixiLib.getButton("yes_btn");
    this.buyButton_T.name = "buyButton_T";
	this.buyButton_T.x =18
	this.buyButton_T.y = -197
	this.buyButton_T.scale.set(1);
	this.buyButton_T.interactive = true;
	this.buyButton_T.buttonMode = true;
    this.yes_txt = pixiLib.getElement("Text",style);
    this.yes_txt.name = "yes_txt";
    this.yes_txt.x=100;
    this.yes_txt.y=42;
    this.yes_txt.anchor.set(0.5);
    pixiLib.setText(this.yes_txt,"EVET");
    this.buyButton_T.addChild(this.yes_txt);
    pixiLib.addEvent(this.buyButton_T, function(){
        if(coreApp.gameController.allReelsStopped)
        {
        _sndLib.play(_sndLib.sprite.btnClick);
        this.removeSelector();
        _ng.BuyFSenabled = true;
        _ng.buyFeaturePopupStatus = false;
        this.BuyServerReq();
        _mediator.publish("ToggleSpin",false);
        _mediator.publish("setSpaceBarEvent", "idle");
        _mediator.publish("hideMobPanel")
        this.BuypopupCon1.visible = false;
        this.BuypopupPanel.visible = false;
        this.grayBgbuy.visible = false;
        _mediator.publish("disableBuyFeature");
        _mediator.publish("updateTickerPosVp",false);
        // _mediator.publish("moveBuyFeature");
        // _mediator.publish("onCloseBtn");
        this.closeBuyFSPopup();
        _mediator.publish("disablePanelFs");
        }
    }.bind(this)
    );
	this.BuypopupCon1.addChild(this.buyButton_T);
   
     //cancel button 

     this.CancelButton_T = pixiLib.getButton("no_btn");
    this.CancelButton_T.name = "CancelButton_T";
	this.CancelButton_T.x = -255
	this.CancelButton_T.y = -197
	this.CancelButton_T.scale.set(1);
	this.CancelButton_T.interactive = true;
	this.CancelButton_T.buttonMode = true;
    this.no_txt = pixiLib.getElement("Text",style);
     this.no_txt.name = "no_txt";
     this.no_txt.x=100;
     this.no_txt.y=42;
     this.no_txt.anchor.set(0.5);
     pixiLib.setText(this.no_txt,"HAYIR");
     this.CancelButton_T.addChild(this.no_txt);

	pixiLib.addEvent(this.CancelButton_T, function(){
        _sndLib.play(_sndLib.sprite.btnClick);
        _ng.buyFeaturePopupStatus = false;
        this.removeSelector();
        _mediator.publish("setSpaceBarEvent", "spinClick"); 
        this.BuypopupPanelCon.scale.set(1);
        TweenMax.to(this.BuypopupPanelCon.scale,.2, {
        x:0.1, y:0.1,
        ease: "none",
        onComplete: function() {
            this.BuypopupCon1.visible = false;
            this.BuypopupPanel.visible = false;
            this.grayBgbuy.visible = false;
        }.bind(this)
        });
       
       
        this.grayBgbuy.alpha = 0.5;
        TweenMax.to(this.grayBgbuy, 0.2, {
            alpha: 0,
            ease: "none",
            onComplete: function() {
                this.BuypopupCon1.visible = false;
                this.BuypopupPanel.visible = false;
                this.grayBgbuy.visible = false;
            }.bind(this)
        });
        _mediator.publish("ToggleMobPanel",true);
        _mediator.publish("ToggleSpin",true)
        _mediator.publish("hideMobPanel")
        _mediator.publish("onCloseBtn")
        _mediator.publish("hideandShowBuyfeature",true);      //enabling buy feature button while click on "no" button
        _mediator.publish("SHOW_TICKER_MESSAGE",gameLiterals.spinwin_text);
    }.bind(this)
    
    );
    pixiLib.addEvent(this.grayBgbuy, function(){
        this.removeSelector();
        this.BuypopupPanelCon.scale.set(1);
        TweenMax.to(this.BuypopupPanelCon.scale,.2, {
        x:0.1, y:0.1,
        ease: "none",
        onComplete: function() {
            this.BuypopupCon1.visible = false;
            this.BuypopupPanel.visible = false;
            this.grayBgbuy.visible = false;
        }.bind(this)
        });
   
        this.grayBgbuy.alpha = 0.5;
        TweenMax.to(this.grayBgbuy, 0.2, {
            alpha: 0,
            ease: "none",
            onComplete: function() {
                this.BuypopupCon1.visible = false;
                this.BuypopupPanel.visible = false;
                this.grayBgbuy.visible = false;
            }.bind(this)
        });
        _mediator.publish("ToggleSpin",true)
        _mediator.publish("hideMobPanel");
        _mediator.publish("hideandShowBuyfeature",true);   //enabling buy feature container on while we click on free spin popup gray bg
        _mediator.publish("toggleBetContainer",false);   //hiding bet container if it is present
        _mediator.publish("SHOW_TICKER_MESSAGE", "placeurbet_text");
    }.bind(this)
    
    );

    this.BuypopupCon1.addChild(this.CancelButton_T); //turkish
//--------------------------------------------------------------------


    this.BuypopupPanelCon.scale.set(0.01);
    TweenMax.to(this.BuypopupPanelCon, 0.2, {
        x:-35, y:0.85,
        ease: "easeInSine",
        onComplete: function() {
            this.BuypopupPanelCon.scale.set(0.8);
            TweenMax.to(this.BuypopupPanelCon.scale,0.7, {
                /* width: this.BuypopupPanelCon.width+550,
                height: this.BuypopupPanelCon.height+450, */
                x:0.85, y:0.85,
                ease: "easeOutSine",
                yoyo: true,
                repeat: -1
                });
        }.bind(this)
    });

    this.grayBgbuy.alpha = 0;
    TweenMax.to(this.grayBgbuy,.2, {
        /* width: this.BuypopupPanelCon.width+550,
        height: this.BuypopupPanelCon.height+450, */
        alpha:0.5,
        ease: "none",
        });
    //-------------------------------------------------------------
     
    if(Updatevalue>0){
        pixiLib.setText(this.amtTxt0_turkish,pixiLib.getFormattedAmount(Updatevalue*coreApp.gameModel.spinData.buyfg));

    }
    else if(coreApp.gameModel.obj.previous_round){
        pixiLib.setText(this.amtTxt0_turkish,pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value*coreApp.gameModel.spinData.buyfg));

    }
    else{
        pixiLib.setText(this.amtTxt0_turkish,"$"+100);

    }
    this.onViewResize();
}
}
view.resizeBuypopup=function()
{
    if(this.BuypopupCon){
    if(_viewInfoUtil.viewType=="VL")
        {
            // this.BuypopupPanelCon.position.set(0,90);
       
            this.BuypopupCon.x = 5;
	this.BuypopupCon.y = 181;
    this.BuypopupCon.scale.set(0.75);
    this.BuypopupPanel.x=-200.5;
	this.BuypopupPanel.y = -195;
	this.BuypopupPanel.scale.set(0.65,0.6);
        }
        else{
            this.BuypopupCon.x = 45;
	this.BuypopupCon.y = 296;
    this.BuypopupCon.scale.set(1);
    this.BuypopupPanel.x=-257.5;
	this.BuypopupPanel.y = -205;
	this.BuypopupPanel.scale.set(0.95,0.8)
        }
    }
    if(this.BuypopupCon1){
        if(_viewInfoUtil.viewType=="VL")
            {
        this.BuypopupCon1.x = 25;
        this.BuypopupCon1.y = 181;
        this.BuypopupCon1.scale.set(0.75);
    
        this.BuypopupPanel.x=-200.5;
        this.BuypopupPanel.y = -195;
        this.BuypopupPanel.scale.set(0.65,0.6);
            }
            else{
        this.BuypopupCon1.x = 72;
        this.BuypopupCon1.y = 296;
        this.BuypopupCon1.scale.set(1);
        this.BuypopupPanel.x=-257.5;
        this.BuypopupPanel.y = -205;
        this.BuypopupPanel.scale.set(0.95,0.8)
            }
        }

}
view.closeBuyFSPopup=function()
{
    if(this.BuypopupCon)
    {
    this.BuypopupCon.visible = false;
    this.BuypopupPanel.visible = false;
    this.grayBgbuy.visible = false;
    }
    if(this.BuypopupCon1)
        {
        this.BuypopupCon1.visible = false;
        this.BuypopupPanel.visible = false;
        this.grayBgbuy.visible = false;
        }
}

view.WinExceededPopup=function(totalBet)
{

    if(this.winPopupPanel)
        {
            this.winPopupCon.visible = true;
            this.winPopupPanel.visible = true;
            this.grayWinPop.visible = true;
        }
        else{
    this.grayWinPop = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
    this.grayWinPop.alpha = 0.6;
    this.grayWinPop.interactive = true;
    this.grayWinPop.buttonMode = true;
    this.grayWinPop.scale.set(10);
    this.grayWinPop.x=-1000
    this.grayWinPop.y=-1000
    this.addChild(this.grayWinPop);

    this.winPopupPanel = pixiLib.getElement("Sprite", "buyPopup-bg");
	this.addChild(this.winPopupPanel);
	this.winPopupPanel.name = "WinPanel"
	this.winPopupPanel.x=-234;
	this.winPopupPanel.y = -205;
	this.winPopupPanel.scale.set(0.8,0.8)

    this.winPopupCon = pixiLib.getContainer();
	this.winPopupCon.name = "winPopupCon"
	this.winPopupCon.x = 45;
	this.winPopupCon.y = 296;
	this.addChild(this.winPopupCon);

    var style = {
        dropShadow: false,
        dropShadowColor: "#ef0aff",
        fill: "#ffffff",
        align:"center",
        // fontFamily: "Tahoma",
        fontFamily: "Arial",       
        fontSize: 40,
        fontWeight: "bold",
        stroke: "#ef0aff",
        strokeThickness: 6
	}
    this.winExceed = pixiLib.getElement("Text",style);
	this.winExceed.x=-207;
	this.winExceed.y=-477;
    pixiLib.setText(this.winExceed,"Congratulations!!! \n\n Win Limit of 5000X \nhas been reached")
	this.winPopupCon.addChild(this.winExceed);
   
	this.winAmountTxt = pixiLib.getElement("Text",style);
    this.winAmountTxt.anchor.set(0.5);
	this.winAmountTxt.x=-12;
	this.winAmountTxt.y=-181.5;
    pixiLib.setText(this.winAmountTxt,(pixiLib.getFormattedAmount(5000*totalBet))+" \nhas been credited ");
	this.winPopupCon.addChild(this.winAmountTxt);
    
        if (coreApp.gameModel.obj.current_round.spin_type=="freespin") {
            pixiLib.addEvent(this.grayWinPop, function () {
                this.removeChild(this.winPopupCon);
                this.removeChild(this.winPopupPanel);
                this.removeChild(this.grayWinPop);
                this.exceed=true;
             this.showFreeSpinEnded();
            }.bind(this));
        }
        else {
            pixiLib.addEvent(this.grayWinPop, function () {
           
                // this.winPopupCon.visible = false;
                // this.winPopupPanel.visible = false;
                // this.grayWinPop.visible = false;
            }.bind(this));

        }
}
}
view.BuyServerReq = function(){
    _mediator.publish("spinStart");
    _mediator.publish("callBuyFreeSpinRequest");
}

view.ExtraFSAwardpopup=function()
{
    console.log("inside extra free spin");
    this.winamtStyle ={
		dropShadow: true,
		dropShadowColor: "#ef0aff",
		fill: "#ffffff",
		fontFamily: "Arial",
		fontSize: 39,
		fontWeight: "bold",
		stroke: "#ef0aff",
		strokeThickness: 5,
        align:"center",
	};
    _sndLib.play(_sndLib.sprite.sLand_3);
		this.scatterCountBox=pixiLib.getElement("Sprite", "FSextraBase");
		this.scatterCountBox.x = -215;
		this.scatterCountBox.y = -65.5;
		this.scatterCountBox.scale.set(0.65);
		this.addChildAt(this.scatterCountBox,this.children.length-1);
		this.ScatterCount = pixiLib.getElement("Text", this.winamtStyle);
		this.ScatterCount.name = "";
		this.ScatterCount.anchor.set(0.5);
		this.ScatterCount.scale.set(1);
		this.ScatterCount.x = 20;
		this.ScatterCount.y = 11;
		this.addChildAt(this.ScatterCount,this.children.length-1);
		pixiLib.setText(this.ScatterCount,"+"+coreApp.gameModel.obj.current_round.post_matrix_info.extra_fs + gameLiterals.extraFreeSpinText);
        // var fsCount =coreApp.gameModel.obj.next_round.spins_left;
        // var fsCount = 10;
        // _mediator.publish("freeSpinCount",fsCount);
		setTimeout(() => {
				// TweenMax.to(this.ScatterCount, 0.4, {
				// y : 1000,
				// alpha:0,
				// ease: Linear.easeInOut,
				// onComplete : function(){
					this.removeChild(this.ScatterCount);
					this.removeChild(this.scatterCountBox);
					// }.bind(this)
			// });
		}, 2500);
};
view.setFsPlayedcnt = function(value){
     this.val = value;
    // if(this.TotalFSCount){
    //     pixiLib.setText(this.TotalFSCount, val);
    // }
}

//bet changing option for buy feature
view.createTotalBetSelector =  function () {
 
    this.selectorContainer = pixiLib.getContainer();
    this.selectorContainer.name = "Panel Bet selectorContainer";
    this.addChild(this.selectorContainer);
    this.onSelectorResize();
 
    var style = {
        "fontStyle": "bold",
        "fontSize": 20,
        "fontFamily": "Arial",
        "lineJoin": "round",
        "fill": "#00C2FF",
        "stroke": '#391400',
        "strokeThickness": 9    
    }
    this.betText = pixiLib.getElement("Text",style);
    this.selectorContainer.addChild(this.betText);
    this.betText.anchor.set(0.5);
    this.betText.position.set(0,-34);
    pixiLib.setText(this.betText,gameLiterals.totalbet);
 
 
    this.minusButton = pixiLib.getButton("betMinus");
    this.minusButton.anchor.set(0.5);
    this.minusButton.position.set(-90,0);
    this.minusButton.scale.set(0.4);
    this.selectorContainer.addChild(this.minusButton);
   
    pixiLib.addEvent(this.minusButton, this.onMinusClick.bind(this));
     
    this.betBase = pixiLib.getElement("Sprite","betValueBase");
    this.betBase.anchor.set(0.5);
    this.betBase.position.set(0,0);
    this.betBase.scale.set(0.9);
    this.selectorContainer.addChild(this.betBase);
 
    var style1 = {
        "fill": "0xffffff",
        "fontSize": 25,
        "fontFamily": "ProximaNova_Bold"    
    }
 
    this.selectorValue = pixiLib.getElement("Text",style1);
    this.betBase.addChild(this.selectorValue);
    this.selectorValue.anchor.set(0.5);
    this.selectorValue.position.set(0,0);
    if(this.selectorValue)
    pixiLib.setText(this.selectorValue,coreApp.gameModel.getTotalBet());
    else
    pixiLib.setText(this.selectorValue,"1");
 
    this.plusButton = pixiLib.getButton("betPlus");
    this.plusButton.name = "plusButton";
    this.plusButton.anchor.set(0.5);
    this.plusButton.position.set(90,0);
    this.plusButton.scale.set(0.4);
    this.selectorContainer.addChild(this.plusButton);
    pixiLib.setInteraction(this.plusButton,true);
   
    pixiLib.addEvent(this.plusButton, this.onPlusClick.bind(this));
    _mediator.publish("updateTotalBet");
     
}

view.updateSelectorContainerBet = function (value) {
    var betval = pixiLib.getFormattedAmount(value);
    if(this.selectorValue)
    pixiLib.setText(this.selectorValue,betval);
  }
  
view.onPlusClick = function() {
   _mediator.publish("setIncrement");
   _mediator.publish("ToggleSpin",false);
}

view.onMinusClick = function() {
   _mediator.publish("setDecrement");
   _mediator.publish("ToggleSpin",false);
}

view.removeSelector = function () {
        this.selectorContainer.parent.removeChild(this.selectorContainer);   
}

view.selectorPlusInteraction = function(value) {
   if(this.plusButton)
       pixiLib.setInteraction(this.plusButton, value);
}

view.selectorMinusInteraction = function(value) {
   if(this.minusButton)
       pixiLib.setInteraction(this.minusButton, value);
}

view.onSelectorResize = function (){
    if (this.selectorContainer) {
        if(_viewInfoUtil.viewType=="VL")
                {
           this.selectorContainer.position.set(0,320);
           this.selectorContainer.scale.set(1.2);
           _mediator.publish("SHOW_TICKER_MESSAGE", "");
                }
        else if(_viewInfoUtil.viewType=="VD"){
           this.selectorContainer.position.set(0,360);
           this.selectorContainer.scale.set(1);
           _mediator.publish("SHOW_TICKER_MESSAGE", "");
            } 
        else{
          this.selectorContainer.position.set(0,600);
        // this.selectorContainer.x = 0; this.selectorContainer.y = coreApp.gameView.panelContainer.children[12].y - 25;
          this.selectorContainer.scale.set(2);
           _mediator.publish("SHOW_TICKER_MESSAGE", "");
                } 
  }
}

//for overwriting info popup y position

view.createRealityCheckPopup = function () {
    var realityCheckConfig = _ng.GameConfig.realityCheck;
 
    this.overlay = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
    this.overlay.alpha = 0.001;
    this.overlay.interactive = true;
    coreApp.gameView.popupContainer.addChildAt(this.overlay, 0);
 
    this.container = pixiLib.getElement();
    this.addChild(this.container);
 
    // var bg = pixiLib.getShape("rect", { w: 640, h: 300 });
    var bg = pixiLib.getElement("Sprite", realityCheckConfig.background.bgImage);
    this.container.addChild(bg);
    pixiLib.setProperties(bg, realityCheckConfig.background.props);
    
   
    this.container.contentTxt = pixiLib.getElement("Text", realityCheckConfig.contentTxt.textStyle);
    this.container.addChild(this.container.contentTxt);
    pixiLib.setProperties(this.container.contentTxt, realityCheckConfig.contentTxt.props);
 
    this.container.totalBetTxt = pixiLib.getElement("Text", realityCheckConfig.totalBetTxt.textStyle);
    this.container.addChild(this.container.totalBetTxt);
    pixiLib.setProperties(this.container.totalBetTxt, realityCheckConfig.totalBetTxt.props);
 
    this.container.totalWinTxt = pixiLib.getElement("Text", realityCheckConfig.totalWinTxt.textStyle);
    this.container.addChild(this.container.totalWinTxt);
    pixiLib.setProperties(this.container.totalWinTxt, realityCheckConfig.totalWinTxt.props);
 
    var closeBtn = pixiLib.getButton(realityCheckConfig.closeBtn.bgImage, realityCheckConfig.closeBtn.options);
    this.container.addChild(closeBtn);
    pixiLib.setProperties(closeBtn, realityCheckConfig.closeBtn.props);
 
    var continueBtn = pixiLib.getButton(realityCheckConfig.continueBtn.bgImage, realityCheckConfig.continueBtn.options);
    this.container.addChild(continueBtn);
    pixiLib.setProperties(continueBtn, realityCheckConfig.continueBtn.props);
 
    pixiLib.addEvent(closeBtn, this.onRCCloseHandler.bind(this));
    pixiLib.addEvent(continueBtn, this.onRCContinueHandler.bind(this));
    _ngFluid.call(this, realityCheckConfig.params);
 
    this.container.visible = false;
    this.overlay.visible = false;
    this.y = 330;
 
  };


view.onViewResize = function () {
    if (this.grayBg) {
      this.grayBg.width = _viewInfoUtil.getWindowWidth();
      this.grayBg.height = _viewInfoUtil.getWindowHeight();
  
      // this.updateSize();
      this.setSize(0, 0);
    }
    if (this.overlay) {
      this.overlay.width = _viewInfoUtil.getWindowWidth();
      this.overlay.height = _viewInfoUtil.getWindowHeight();
      this.setSize(0, 0);
    }
    this.onSelectorResize();
  };
view.returnPopupStatus = function(){
    return this.BuypopupPanel;
}


/*for skipping free spin rewarded popup if autoplay is enabled
After free game is finished
*/
view.skipFreeSpinRewarded = function() {
    if(_ng.autoPlayBeforeFg == true) {
        if(this.endcontinueBtn){
            pixiLib.setInteraction(this.endcontinueBtn,false);
        }
        if(this.grayBg) {
            this.grayBg.interactive = false;
            this.grayBg.buttonMode = false;
        }
        _mediator.publish("continueAutoSpin");
        _mediator.publish("showAutoStopBtn");
    } 
}

/*
this popup will shown only once in a reload,
*/
view.quickSpinInfoPopup = function() {

    _ng.GameConfig.quickSpinInfoPopupShown = true; 
    
    var buttonStyle = {
        fill: "#ffffff",
        fontFamily: "Arial Black",
        fontWeight: "bolder",
        fontSize: 44,
        strokeThickness: 2
    }

    var infoStyle = {
        fill: "#fafafa",
        fontFamily: "Verdana, Geneva, sans-serif",
        stroke: "#0f0f0f",
        strokeThickness: 2,
        fontSize: 26,
        align: "center" 
    }

    var headingStyle = {
        fill: "#e7c30d",
        fontFamily: "Verdana, Geneva, sans-serif",
        fontWeight: "bolder",
        stroke: "#0f0f0f",
        strokeThickness: 2
    }

    var quickSpinStyle = {
        fill: "#f2f2f2",
        fontFamily: "Arial Black",
        fontSize: 16,
        fontWeight: "bolder",
        lineHeight: 30,
        stroke: "#151414",
        strokeThickness: 3
    }
    
    this.quickSpinInfoContainer = pixiLib.getContainer();
    this.quickSpinInfoContainer.name = "quickSpinInfoContainer";
    this.quickSpinInfoContainer.position.set(26, 0);
    this.addChild(this.quickSpinInfoContainer);
    
    var popupBg = pixiLib.getElement("Sprite", "Rectangle 8");
    popupBg.name = "popupBg";
    popupBg.anchor.set(0.5);
    popupBg.scale.set(1.1, 0.78);
    this.quickSpinInfoContainer.addChild(popupBg);

    var quickSpinInfoClose = pixiLib.getButton("bet_close");
    quickSpinInfoClose.name = "quickSpinInfoClose";
    quickSpinInfoClose.position.set(292, -161);
    this.quickSpinInfoContainer.addChild(quickSpinInfoClose);
    pixiLib.addEvent(quickSpinInfoClose, this.closeQuickSpinInfo.bind(this));
    
    var headingTxt = pixiLib.getElement("Text", headingStyle);
    headingTxt.name = "headingTxt";
    headingTxt.anchor.set(0.5);
    headingTxt.position.set(0,-168);
    pixiLib.setText(headingTxt, gameLiterals.headingTxt);
    this.quickSpinInfoContainer.addChild(headingTxt);
    
    var infoTextOne = pixiLib.getElement("Text", infoStyle);
    infoTextOne.name = "infoTextOne";
    infoTextOne.anchor.set(0.5);
    infoTextOne.position.set(0, -65);
    pixiLib.setText(infoTextOne, gameLiterals.info1);
    this.quickSpinInfoContainer.addChild(infoTextOne);

    var infoTextTwo = pixiLib.getElement("Text", infoStyle);
    infoTextTwo.name = "infoTextTwo";
    infoTextTwo.anchor.set(0.5);
    infoTextTwo.position.set(0, 6);
    pixiLib.setText(infoTextTwo, gameLiterals.info2);
    this.quickSpinInfoContainer.addChild(infoTextTwo);

    var tickBox = pixiLib.getElement("Sprite", "Tick_box");
    tickBox.name = "tickBox";
    tickBox.position.set(-6.5, 65);
    tickBox.anchor.set(0.5);
    tickBox.scale.set(0.9);
    this.quickSpinInfoContainer.addChild(tickBox);
    
    tickBox.interactive = true;
    pixiLib.addEvent(tickBox, this.tickBoxClicked.bind(this));

    this.tick = pixiLib.getElement("Sprite", "Tick");
    this.tick.name = "tick";
    this.tick.position.set(0, 0);
    this.tick.anchor.set(0.5);
    tickBox.addChild(this.tick);
    this.tick.visible = false;

    var quickSpinText = pixiLib.getElement("Text", quickSpinStyle);
    quickSpinText.name = "quickSpinText";
    quickSpinText.anchor.set(0.5);
    quickSpinText.position.set(75, 65);
    pixiLib.setText(quickSpinText, gameLiterals.quickSpinText);
    this.quickSpinInfoContainer.addChild(quickSpinText);

    var buttonBg = pixiLib.getElement("Sprite", "Rectangle 27");
    buttonBg.name = "buttonBg";
    buttonBg.position.set(0,159);
    buttonBg.anchor.set(0.5);
    buttonBg.scale.set(0.8);
    this.quickSpinInfoContainer.addChild(buttonBg);

    buttonBg.interactive = true;
    pixiLib.addEvent(buttonBg, this.closeQuickSpinInfo.bind(this));

    var okButtonTxt = pixiLib.getElement("Text", buttonStyle);
    okButtonTxt.name = "okButtonTxt";
    okButtonTxt.anchor.set(0.5);
    pixiLib.setText(okButtonTxt, gameLiterals.okButtonTxt);
    buttonBg.addChild(okButtonTxt);

}

view.tickBoxClicked = function() {

    if(_ng.isQuickSpinActive) {
        if(_ng.GameConfig.TurboOn) {
          _mediator.publish("onQuickSpinOff",false);
        }
    }

    this.tick.visible = !_ng.isQuickSpinActive;
    _ng.isQuickSpinActive = !_ng.isQuickSpinActive;

    _mediator.publish("ToggleQuickFunction",_ng.isQuickSpinActive); 
    _mediator.publish("toggleQuickSpinSettings",_ng.isQuickSpinActive); 
}

view.closeQuickSpinInfo = function() {
    if(this.quickSpinInfoContainer) {
        coreApp.gameView.panel.fakeButton.visible = false;  
        this.removeChild(this.quickSpinInfoContainer);
    }
}

/*removed Redirection to lobby*/
view.onRCCloseHandler = function () {
    this.hideInfoEventType = undefined;
    _sndLib.play(_sndLib.sprite.btnClick);
    coreApp.gameModel.isRealityCheckActive = false;
    this.hidePopup();
    // this.gotoLobby();
};

