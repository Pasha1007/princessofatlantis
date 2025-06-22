GBigview=BigWinView.prototype;

GBigview.onShowTotalWin = function () {
	_ng.isTotalWinShown = true;
	var winAmount = coreApp.gameModel.getTotalWin();
	this.x = 0, this.y = 0;
	if (!this.blackBg) {
		this.blackBg = pixiLib.getRectangleSprite(_viewInfoUtil.getWindowWidth(), _viewInfoUtil.getWindowHeight(), 0x000000);
		this.blackBg.alpha = 0;

		coreApp.gameView.decoratorContainer.addChild(this.blackBg);
	}
	this.blackBg.name = "blackBg";
	this.blackBg.interactive = true;
	this.blackBg.visible = true;
	if (!this.winAmountContainer) {
		this.winAmountContainer = pixiLib.getElement();
		coreApp.gameView.decoratorContainer.addChild(this.winAmountContainer);
		_ngFluid.call(this.winAmountContainer, _ng.GameConfig.specialWins.totalWin.props)
	}
	if (!this.winAmountTxt) {
		this.winTextStyle = _ng.GameConfig.specialWins.totalWin.textStyle;
		this.winAmountTxt = pixiLib.getElement("Text", this.winTextStyle, "0");
		// this.winAmountContainer.addChild(this.winAmountTxt);
		this.winAmountTxt.anchor.set(0.5);
	}

	pixiLib.setText(this.winAmountTxt, pixiLib.getFormattedAmount(winAmount, true));
	// _mediator.publish("SHOW_TICKER_MESSAGE", "Total win: "+pixiLib.getFormattedAmount(winAmount, true));

	this.winAmountTxt.alpha = 0;
    if (coreApp.gameModel.getIsFreeSpinTriggered()) {
		if (_ng.isQuickSpinActive) {
			this.winAmountTxt.alpha = 1;
			this.winAmountTxt.scale.set(1.5);
			this.onTotalWinResize();
			_sndLib.play(_sndLib.sprite.totalWin);
			//#todo only for base game it should call 
			if(_ng.GameConfig.gameName  == "queensakura"){
				if(coreApp.gameModel.spinData.spinType != "normal"){
					setTimeout(this.hideTotalWin.bind(this), 400);
				}
			}else{
				setTimeout(this.hideTotalWin.bind(this), _ng.GameConfig.enterIntoFreeGameDurationTurbo);
			}
		} else {
			this.winAmountTxt.scale.set(2);
			TweenMax.to(this.winAmountTxt, 0.5, { alpha: 1 });
			TweenMax.to(this.winAmountTxt.scale, 1, { x: 1, y: 1, ease: Back.easeOut.config(1.5) });
			this.onTotalWinResize();
			_sndLib.play(_sndLib.sprite.totalWin);
			// if(_ng.GameConfig.gameName  == "queensakura" && coreApp.gameModel.spinData.spinType != "normal"){
			if(_ng.GameConfig.gameName  == "queensakura" && coreApp.gameModel.spinData.spinType == "normal"){
				setTimeout(this.hideTotalWin.bind(this), _ng.GameConfig.totalWinDuration+2000);
			}else{
				setTimeout(this.hideTotalWin.bind(this), _ng.GameConfig.enterIntoFreeGameDuration);
			}
			
		}
	} else {
		if (_ng.isQuickSpinActive) {
			this.winAmountTxt.alpha = 1;
			this.winAmountTxt.scale.set(1.5);
			this.onTotalWinResize();
			_sndLib.play(_sndLib.sprite.totalWin);
			//#todo only for base game it should call 
			if(_ng.GameConfig.gameName  == "queensakura"){
				if(coreApp.gameModel.spinData.spinType != "normal"){
					setTimeout(this.hideTotalWin.bind(this), 400);
				}
			}else{
				setTimeout(this.hideTotalWin.bind(this), 400);
			}
		} else {
			this.winAmountTxt.scale.set(2);
			TweenMax.to(this.winAmountTxt, 0.5, { alpha: 1 });
			TweenMax.to(this.winAmountTxt.scale, 1, { x: 1, y: 1, ease: Back.easeOut.config(1.5) });
			this.onTotalWinResize();
			_sndLib.play(_sndLib.sprite.totalWin);
			// if(_ng.GameConfig.gameName  == "queensakura" && coreApp.gameModel.spinData.spinType != "normal"){
			if(_ng.GameConfig.gameName  == "queensakura" && coreApp.gameModel.spinData.spinType == "normal"){
				setTimeout(this.hideTotalWin.bind(this), _ng.GameConfig.totalWinDuration+2000);
			}else{
				setTimeout(this.hideTotalWin.bind(this), _ng.GameConfig.totalWinDuration);
			}
			
		}	
	}
};

GBigview.onShowBigWin = function (){
	_mediator.publish("HIDE_TICKER");
	this.isBigWinRunning = true;

	var winAmount = coreApp.gameModel.getTotalWin();
	var totalBet = coreApp.gameModel.getTotalBet();
	var specialWinObj = _ng.GameConfig.specialWins;
	this.bigWinConfig = _ng.GameConfig.bigWinView;


	this.grayBg = pixiLib.getShape("rect", {
		w: _viewInfoUtil.getWindowWidth(),
		h: _viewInfoUtil.getWindowHeight()
	});
	var bgAlpha = 0.8;
	if (_ng.GameConfig.bigWinView.bgAlpha) {
		bgAlpha = _ng.GameConfig.bigWinView.bgAlpha;
	}
	this.grayBg.alpha = bgAlpha;
	this.grayBg.interactive = true;
	this.grayBg.buttonMode = true;
	this.grayBg.name = "grayBg";
	coreApp.gameView.decoratorContainer.addChildAt(this.grayBg, 0);


	this.coinShower = pixiLib.getElement("AnimatedSprite", { "prefix": "coinShower_", "startIndex": "1", "endIndex": "25", "digit": "dual", "loop": true, "animationSpeed": "0.3", "type": "spriteAnimation" })
	this.coinShower.x += 53;
	this.coinShower.y += 127;
	this.coinShower.scale.set(1)
	this.coinShower.visible=false;
	this.addChild(this.coinShower);

	this.winType = "";
	if (winAmount >= specialWinObj.max_win.multiplier * totalBet) {
		this.winType = "max_win";
	} else if (winAmount >= specialWinObj.fantastic_win.multiplier * totalBet) {
		this.winType = "fantastic_win";
	} else if (winAmount >= specialWinObj.super_win.multiplier * totalBet) {
		this.winType = "super_win";
	}else if (winAmount >= specialWinObj.omg.multiplier * totalBet) {
		this.winType = "omg";
	}else if (winAmount >= specialWinObj.nice.multiplier * totalBet) {
		this.winType = "nice";
	}



	this.winAmount = winAmount;
	this.bigWinAmount = specialWinObj.super_win.multiplier * totalBet;


	this.bigWinSpine = new PIXI.spine.Spine(PIXI.Loader.shared.resources[this.bigWinConfig.spineImage].spineData);
	this.bigWinSpine.visible = false;
	this.bigWinSpine.scale.set(0.5);
	this.addChild(this.bigWinSpine);
	var bigWinStyle = this.bigWinConfig.totalWinAmount.textStyle;

	this.bigWinAmtTxt = pixiLib.getElement("Text", bigWinStyle);
	this.bigWinAmtTxt.incrementalAmount = 0;
	this.addChild(this.bigWinAmtTxt);
	pixiLib.setProperties(this.bigWinAmtTxt, this.bigWinConfig.totalWinAmount.params);
	pixiLib.setText(this.bigWinAmtTxt, winAmount);
	this.bigWinAmtTxt.anchor.set(0.5);

	if (!this.isResponsiveCalled) {
		this.isResponsiveCalled = true;
		_ngFluid.call(this, this.bigWinConfig.params);
	}
	if (this.bigWinConfig.setSize) {
		this.setSize(0, 0);
	}

	setTimeout(function(){
		this.coinShower.visible=true;
		this.coinShower.play();
					}.bind(this),500)
				
	this.runSpineAnimation(0, this.bigWinAmount);
}

//GBigview.runSpineAnimation = function () {
//	if (1) {
//		var winAmount = coreApp.gameModel.getTotalWin();
//		var totalBet = coreApp.gameModel.getTotalBet();
//		var specialWinObj = _ng.GameConfig.specialWins;
//
//		TweenMax.to(this.bigWinAmtTxt, commonConfig.bigWinInitialDuration, {
//			incrementalAmount: 0,
//			ease: Expo.easeOut,
//
//			onInit: function () {
//
//				if (this.isBigWinRunning) {
//					_sndLib.play(_sndLib.sprite.counterLoop);
//				}
//			}.bind(this),
//
//			onUpdate: function () {
//
//				var amount = Math.round(this.bigWinAmtTxt.incrementalAmount);
//				amount = pixiLib.getFormattedAmount(amount, true);
//				pixiLib.setText(this.bigWinAmtTxt, amount);
//			}.bind(this),
//
//			onComplete: function () {
//
//				TweenMax.to(this.bigWinAmtTxt, 0.5, {
//					y: this.bigWinConfig.totalWinAmount.finalPositionY,
//					ease: Back.easeOut.config(1.5),
//					onComplete: function () { }
//				});
//
//				this.bigWinTimer = setTimeout(function () {
//					_mediator.publish("playSpineAnimation", "bigWinAnimation");
//					this.bigWinSpine.visible = true;
//					this.playSequentionalAnim([this.bigWinConfig[this.winType].In,this.bigWinConfig[this.winType].Loop],false);
//					_sndLib.play(_sndLib.sprite.bigWin);
//					if (winAmount > specialWinObj[this.winType].multiplier * totalBet) {
//						if (this.isBigWinRunning) {
//							_sndLib.play(_sndLib.sprite.counterBigWinLoop);
//						}
//					} else {
//						_sndLib.play(_sndLib.sprite.counterEnd);
//					}
//					//if Bigwin, Return from here
//					// if (this.winType === "niceWin") {
//						TweenMax.to(this.bigWinAmtTxt, 3, {
//							incrementalAmount: this.winAmount,
//							ease: Expo.easeIn,
//							onInit: function () {
//								_sndLib.stop(_sndLib.sprite.counterLoop);
//								_sndLib.play(_sndLib.sprite.counterLoop);
//							}.bind(this),
//							onUpdate: function () {
//								var amount = Math.round(this.bigWinAmtTxt.incrementalAmount);
//								amount = pixiLib.getFormattedAmount(amount, true);
//								pixiLib.setText(this.bigWinAmtTxt, amount);
//								// _sndLib.play(_sndLib.sprite.counterLoop);
//							}.bind(this),
//							onComplete: function () {
//								setTimeout(() => {
//									this.hideBigWin_click();
//								}, 1000);
//								_sndLib.stop(_sndLib.sprite.counterBigWinLoop);
//								if (winAmount > specialWinObj[this.winType].multiplier * totalBet) {
//									// _sndLib.play(_sndLib.sprite.counterEnd);
//								}
//								if (commonConfig.holdBigWinAnimation) {
//									this.currentBigwinName = "nicewin";
//									this.grayBg.interactive = true;
//									this.grayBg.buttonMode = true;
//									pixiLib.addEvent(this.grayBg, this.hideBigWinAnimation.bind(this), "click");
//									_mediator.publish("setSpaceBarEvent", "hideBigWin");
//								} else {
//									this.currentBigwinName = "nicewin";
//									this.hideBigWinAnimation();
//								}
//							}.bind(this)
//						});
//						return;
//				}.bind(this), 1);
//			}.bind(this)
//		})
//	}
//};


GBigview.runSpineAnimation = function () {
    if (1) {
        var winAmount = coreApp.gameModel.getTotalWin();
        var totalBet = coreApp.gameModel.getTotalBet();
        var specialWinObj = _ng.GameConfig.specialWins;

        TweenMax.to(this.bigWinAmtTxt, commonConfig.bigWinInitialDuration, {
            incrementalAmount: 0,
            ease: Expo.easeOut,

            onInit: function () {

                if (this.isBigWinRunning) {
                    // _sndLib.play(_sndLib.sprite.counterLoop);
                }
            }.bind(this),

            onUpdate: function () {

                var amount = Math.round(this.bigWinAmtTxt.incrementalAmount);
                amount = pixiLib.getFormattedAmount(amount, true);
                pixiLib.setText(this.bigWinAmtTxt, amount);
            }.bind(this),

            onComplete: function () {
                this.bigWinAmtTxt.y=(_viewInfoUtil.viewType=="VP" ?-45:0);
                TweenMax.to(this.bigWinAmtTxt, 0.5, {
                    y: (_viewInfoUtil.viewType=="VP"? (this.bigWinConfig.totalWinAmount.finalPositionY-120):(this.bigWinConfig.totalWinAmount.finalPositionY)),
                    ease: Back.easeOut.config(1.5),
                    onComplete: function () { }
                });

                this.bigWinTimer = setTimeout(function () {
                    _mediator.publish("playSpineAnimation", "bigWinAnimation");
                    this.bigWinSpine.visible = true;
                    this.playSequentionalAnim([this.bigWinConfig[this.winType].In,this.bigWinConfig[this.winType].Loop],false);
                    var soundWinType=this.winType;
                    _sndLib.play(_sndLib.sprite[soundWinType]);




                    if (winAmount > specialWinObj[this.winType].multiplier * totalBet) {
                        if (this.isBigWinRunning) {
                            _sndLib.play(_sndLib.sprite.counterBigWinLoop);
                        }
                    } else {
                        _sndLib.play(_sndLib.sprite.counterEnd);
                    }
                    //if Bigwin, Return from here
                    // if (this.winType === "niceWin") {

                        TweenMax.to(this.bigWinAmtTxt, 3, {
                            incrementalAmount: this.winAmount,
                            ease: Expo.easeIn,
                            onInit: function () {
                                // this.soundInterval=setInterval(()=>{
                                //  _sndLib.stop(_sndLib.sprite.counterLoop);
                                //  _sndLib.play(_sndLib.sprite.counterLoop);
                                // },900)

                            }.bind(this),
                            onUpdate: function () {
                                var amount = Math.round(this.bigWinAmtTxt.incrementalAmount);
                                amount = pixiLib.getFormattedAmount(amount, true);
                                pixiLib.setText(this.bigWinAmtTxt, amount);
                                // _sndLib.stop(_sndLib.sprite.counterLoop);
                                // _sndLib.play(_sndLib.sprite.counterLoop);
                            }.bind(this),
                            onComplete: function () {
                                setTimeout(() => {
                                    this.hideBigWin_click();
                                }, 1000);
                                _sndLib.stop(_sndLib.sprite.counterBigWinLoop);
                                // clearInterval(this.soundInterval);
                                if (winAmount > specialWinObj[this.winType].multiplier * totalBet) {
                                    // _sndLib.play(_sndLib.sprite.counterEnd);
                                }
                                if (commonConfig.holdBigWinAnimation) {
                                    this.currentBigwinName = "nicewin";
                                    this.grayBg.interactive = true;
                                    this.grayBg.buttonMode = true;
                                    pixiLib.addEvent(this.grayBg, this.hideBigWinAnimation.bind(this), "click");
                                    _mediator.publish("setSpaceBarEvent", "hideBigWin");
                                } else {
                                    this.currentBigwinName = "nicewin";
                                    this.hideBigWinAnimation();
                                }
                            }.bind(this)
                        });
                        return;
                }.bind(this), 1);
            }.bind(this)
        })
    }
};

GBigview.wrapperBigwin = function () {
	// if(coreApp.gameModel.obj.current_round.misc_prizes && coreApp.gameModel.obj.current_round.misc_prizes.count &&coreApp.gameModel.obj.current_round.post_matrix_info &&coreApp.gameModel.obj.current_round.post_matrix_info.multiplier){
	// setTimeout(function () {
		this.grayBg2 = pixiLib.getShape("rect", {
			w: _viewInfoUtil.getWindowWidth(),
			h: _viewInfoUtil.getWindowHeight()
		});
		this.grayBg2.alpha = 0.1;
		this.grayBg2.name = "grayBg2"
		this.grayBg2.interactive = true;
		this.grayBg2.buttonMode = true;
		pixiLib.addEvent(this.grayBg2, this.hideBigWin_click.bind(this), "click");
		_mediator.publish("setSpaceBarEvent", "hideBigWin_click");
		coreApp.gameView.decoratorContainer.addChild(this.grayBg2);
	// }.bind(this), _ng.isQuickSpinActive ? (1500 + (2000 * (coreApp.gameModel.obj.current_round.misc_prizes.count - 1)) + (1100+(650 * (coreApp.gameModel.obj.current_round.post_matrix_info.multiplier.length)))) : (1000 + (1800 * (coreApp.gameModel.obj.current_round.misc_prizes.count - 1))) + (1200+(1200 * (coreApp.gameModel.obj.current_round.post_matrix_info.multiplier.length))))
	// }
	// else{
		// this.grayBg2 = pixiLib.getShape("rect", {
		// 	w: _viewInfoUtil.getWindowWidth(),
		// 	h: _viewInfoUtil.getWindowHeight()
		// });
		// this.grayBg2.alpha = 0.1;
		// this.grayBg2.name = "grayBg2"
		// this.grayBg2.interactive = true;
		// this.grayBg2.buttonMode = true;
		// pixiLib.addEvent(this.grayBg2, this.hideBigWin_click.bind(this), "click");
		// _mediator.publish("setSpaceBarEvent", "hideBigWin_click");
		// coreApp.gameView.decoratorContainer.addChild(this.grayBg2);
	// }

}

GBigview.hideBigWin = function () {
	_mediator.publish("playSpineAnimation", "idleAnimation");
	_mediator.publish("totalWinShownOnBigWinSettled");
	_mediator.publish("hideReelBlanket");
	TweenMax.to(this.grayBg, .5, {
		alpha: 0
	});
	TweenMax.to(this.bigWinAmtTxt.scale, .3, {
		x: 0,
		y: 0,
		onComplete: this.hideBigAnimationComplete.bind(this)
	});
};
GBigview.hideBigWin_click = function () {
	// console.log("Calling hideBigWin_click");
	if (this.bigWinTimer) {
		clearTimeout(this.bigWinTimer);
	}
	_mediator.publish("setSpaceBarEvent","idle")
	_sndLib.stop(_sndLib.sprite.counterLoop);
	_sndLib.stop(_sndLib.sprite.counterBigWinLoop);
	_sndLib.stop(_sndLib.sprite.counterEnd);
	// _sndLib.stop(_sndLib.sprite.counterMegaWinLoop);
	_sndLib.stop(_sndLib.sprite.bigWin);
	_sndLib.stop(_sndLib.sprite.megaWin);
	// _sndLib.stop(_sndLib.sprite.superMegaWin);
	this.isBigWinRunning = false;
	if(this.grayBg2){
		this.grayBg2.interactive = false;
		this.grayBg2.buttonMode = false;
	}
	var winAmount = coreApp.gameModel.getTotalWin();
	winAmount = pixiLib.getFormattedAmount(winAmount, true);
	pixiLib.setText(this.bigWinAmtTxt, winAmount);
	TweenMax.killTweensOf(this.bigWinAmtTxt);
	setTimeout(function(){
		if(this.grayBg2){
			
		TweenMax.to(this.grayBg2, 0.01, {
			alpha: 0,
			onComplete: this.hideBigAnimationComplete_click.bind(this)
		});

			console.log("A");

		}
		// else{
		// 	this.hideBigAnimationComplete_click();
		// 	console.log("B");
		// }
		this.removeChild(this.bigWinSpine);
		this.removeChild(this.coinShower);
		_mediator.publish("SHOW_TICKER");
		this.stopLoopSound();
		coreApp.gameModel.isBigWin = false;
		_mediator.publish("showPanelWin");
		_mediator.publish("playSpineAnimation", "idleAnimation");
	}.bind(this), 2000);
	
};

GBigview.hideBigAnimationComplete_click = function () {
	// console.log("Entered HideBigAnimComplete_click");
	coreApp.gameView.decoratorContainer.removeChild(this.grayBg);
	coreApp.gameView.decoratorContainer.removeChild(this.grayBg2);
	this.removeChild(this.bigWinAmtTxt);
	this.removeChild(this.bigWinSpine);
	this.removeChild(this.coinShower);
	_sndLib.stop(_sndLib.sprite.counterLoop);
	_sndLib.stop(_sndLib.sprite.counterBigWinLoop);
	_sndLib.stop(_sndLib.sprite.counterEnd);
	// _sndLib.stop(_sndLib.sprite.counterMegaWinLoop);
	_sndLib.stop(_sndLib.sprite.bigWin);
	_sndLib.stop(_sndLib.sprite.megaWin);
	// _sndLib.stop(_sndLib.sprite.superMegaWin);
	delete this.grayBg;
	delete this.grayBg2;
	delete this.bigWinAmtTxt;
	delete this.bigWinSpine;

	this.isResponsiveCalled = false;
	_mediator.publish("onBigWinShown");
};
GBigview.hideBigAnimationComplete = function () {
	coreApp.gameView.decoratorContainer.removeChild(this.grayBg);
	this.removeChild(this.bigWinAmtTxt);
	this.removeChild(this.bigWinSpine);
	this.removeChild(this.coinShower);
	delete this.grayBg;
	delete this.bigWinAmtTxt;
	delete this.bigWinSpine;

	this.isResponsiveCalled = false;
	coreApp.gameModel.isBigWin = false;
	_mediator.publish("onBigWinShown");
	if (this.grayBg2) {
		this.grayBg2.interactive = false;
		this.grayBg2.buttonMode = false;	
	}	
};

GBigview.hideTotalWin = function () {
    _mediator.publish("clearAllWins", { from: "onTotalWinShown" });
    this.blackBg.visible = false;
 
    var winTxtDealy = (_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") ? 0.1 : 0.5;
    var totalWinShownDealy = (_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") ? 100 : 300;
 
 
    TweenMax.to(this.winAmountTxt, winTxtDealy, { alpha: 0 });
    setTimeout(function () {
        _mediator.publish("onTotalWinShown");
        // we already showing total win amount in autospins and freespins
        if (!(coreApp.gameModel.isFeatureActive() || coreApp.gameModel.isAutoSpinActive() || coreApp.gameModel.isFullFSActive() || coreApp.gameController.isSpaceBarHeld)) {
            _mediator.publish("showPanelWin");
        }
        // _mediator.publish(_events.slot.updateBalance);
    }, totalWinShownDealy);
};

GBigview.playSequentionalAnim = function(animArry, state) {

    const playNextAnimation = (index) => {
        if (index >= animArry.length) return;
        let animationState = this.bigWinSpine.state.setAnimation(0, animArry[index], state);
        animationState.listener = {
            complete: () => {
                playNextAnimation(index + 1);
				if(index>0)
					animationState.loop = true;
            }
        };
    };
    playNextAnimation(0); // Start with the first animation in the array
}