var view = ReelView.prototype;

view.createView = function (argument) {
	this.forceStop = false;
	this.reelsStarted=false;
	this.reelConfig = _ng.GameConfig.ReelViewUiConfig;
	this.isAnticipateSndPlaying = false;
	this.createExtraBottomElements();
	if (this.reelConfig.reelGridBottom) {
		this.createBottomGrid();
	}
	if (this.reelConfig.fsReelGridBottom) {
		this.createFSBottomGrid();
	}
	//actual gamereels 
	this.createReels();
	if (this.reelConfig.data.maskInfo.maskType == 1) {
		this.createSingleMask();
	} else if (this.reelConfig.data.maskInfo.maskType == 2){
        this.createReelWiseMask();
	} else if (this.reelConfig.data.maskInfo.maskType == 3){
		this.createMaskWithSprite();
	}	
	if (this.reelConfig.reelGridTop) {
		this.createTopGrid();
	}
	if (this.reelConfig.fsReelGridTop) {
		this.createFSTopGrid();
	}

	if (this.reelConfig.reelGridTopAnim) {
		this.createReelGridTopAnim();
	}
	//@todo can write extra elements code 
	this.createAnticipation();
	this.createExtraElements();
    _mediator.subscribe("scaleReelMaskOnEachReelStop", this.updateReelWiseMask.bind(this));
	_mediator.subscribe("spinStartCheck",this.spinStartCheck.bind(this));

	setTimeout(function (){
	    if(this.reelConfig.data.reelSpinConfig.hideTopSymbol){
			this.toggleMask(false);
		}
	}.bind(this), 200);

    _mediator.subscribe("FadeReels",this.fadeReels.bind(this))
};

view.createFSTopGrid = function (argument) {
	this.fsTopGrid = pixiLib.getElement("Sprite", this.reelConfig.fsReelGridTop.image);
	this.fsTopGrid.name = "fsTopGrid";
	this.addChild(this.fsTopGrid);
	pixiLib.setProperties(this.fsTopGrid, this.reelConfig.fsReelGridTop.props["VD"]);
	this.fsTopGrid.visible = false;
}

view.fadeReels = function (value) {
	if (this.reelConfig.data.isSymbolFadeInWins) {
		for (var i = 0; i < this.reels.length; i++) {
			this.reels[i].alpha = value;
		}
	}
};
view.startSpin = function (argument) {
	// console.log(" on all reels startedd ============================");
	this.startSpinCounter = 0;
	this.stopSpinCounter = 0;
	this.forceStop = false;
	_mediator.publish("toggleForce",false);
	_sndLib.play(_sndLib.sprite.reelSpinning);
	this.anticipateAry = {};
	this.isAnticipateActive = false;
	this.isAnticipateSndPlaying = false;
	this.individualStrip("start");
	if(this.reelConfig.data.reelSpinConfig.hideTopSymbol){
		this.toggleMask(true);
	}
};
view.spinStartCheck=function(bool)
{
	this.reelsStarted=bool;
}
view.stopSpinNow = function (matrix) {
	this.reelsData = matrix;
	this.anticipateAry = {};
	this.forceStop = true;
	_mediator.publish("toggleForce",true);
	if(this.isAnticipateActive && this.currentAnticipationReelId){
		this.reels[this.currentAnticipationReelId].killAnticipation();
	}

	this.stopAnticipation();
	this.isAnticipateActive = false;
	clearTimeout(this.callNextReelInterval);
	this.individualStripStop("stop", true);	
};
view.quickSpinStart = function (argument) {
	//console.log(" on all reels startedd ============================");
	this.startSpinCounter = 0;
	this.stopSpinCounter = 0;
	this.forceStop = false;
	_mediator.publish("toggleForce",false);
	_sndLib.play(_sndLib.sprite.reelSpinning);
	this.anticipateAry = {};
	this.isAnticipateActive = false;
	this.isAnticipateSndPlaying = false;

	//start all reels at once 
	for (var i = 0; i < this.reelConfig.data.noOfReels; i++) { 
		this.updateReelWiseMask(i, 1);
		_mediator.publish("onEachReelStart", i);
		this.reels[i].startSpin();
	}
	_mediator.publish("allReelsStarted");
	if(this.reelConfig.data.reelSpinConfig.hideTopSymbol){
		this.toggleMask(true);
	}
};
view.quickSpinStop = function (matrix) {
	
	this.reelsData = matrix;
	this.anticipateAry = {};
	this.forceStop = true;
	_mediator.publish("toggleForce",true);
	if(this.isAnticipateActive && this.currentAnticipationReelId){
		this.reels[this.currentAnticipationReelId].killAnticipation();
	}
	this.stopAnticipation();
	this.isAnticipateActive = false;
	clearTimeout(this.callNextReelInterval);

	for (var i = 0; i < this.reelConfig.data.noOfReels; i++) {
		this.reels[i].stopSpin(this.reelsData[i], true);
	}
	
};
   //SID UNCOMMIT
view.quickSpinStopDelay = function (matrix) {
	
	this.reelsData = matrix;
	this.anticipateAry = {};
	this.forceStop = true;
	_mediator.publish("toggleForce",true);
	if(this.isAnticipateActive && this.currentAnticipationReelId){
		this.reels[this.currentAnticipationReelId].killAnticipation();
	}
	this.stopAnticipation();
	this.isAnticipateActive = false;
	clearTimeout(this.callNextReelInterval);

	for (var i = 0; i < this.reelConfig.data.noOfReels; i++) {
		this.reels[i].stopSpin(this.reelsData[i], true);
	}
	
};


view.showFreespinGrid = function () {
	if (this.fsBottomGrid) {
		this.fsBottomGrid.alpha = 0;
		this.bottomGrid.alpha=0;
		this.fsBottomGrid.visible = true;
		TweenMax.to(this.fsBottomGrid, 1, { alpha: 1 })
	}

	if (this.fsTopGrid) {
		this.fsTopGrid.alpha = 0;
		this.fsTopGrid.visible = true;
		TweenMax.to(this.fsTopGrid, 1, { alpha: 1 })
	}
}
view.hideFreespinGrid = function () {
	if (this.fsBottomGrid) {
	this.bottomGrid.alpha=1;
		TweenMax.to(this.fsBottomGrid, 1, {
			alpha: 0,
			onComplete: function () {
				this.fsBottomGrid.visible = false;
				this.fsBottomGrid.alpha = 1;

			}.bind(this)
		})
	}
	if (this.fsTopGrid) {
		TweenMax.to(this.fsTopGrid, 1, {
			alpha: 0,
			onComplete: function () {
				this.fsTopGrid.visible = false;
				this.fsTopGrid.alpha = 1;
			}.bind(this)
		})
	}
}
view.individualStrip = function (spinType, isStopNow) {
	if (spinType == "start") {
		if (this.startSpinCounter >= this.reels.length) {
			this.startSpinCounter = this.reels.length - 1;
		}
		this.updateReelWiseMask(this.startSpinCounter, 1);
		_sndLib.play(_sndLib.sprite.reelStart);
		_mediator.publish("onEachReelStart", this.startSpinCounter);
		this.reels[this.startSpinCounter].startSpin();
	} else {
	//spintype is == stop

		if (this.startSpinCounter >= this.reels.length) {
			this.startSpinCounter = this.reels.length - 1;
		}

		if (this.isAnticipateActive &&_ng.GameConfig.AnticipateReq && ( !_ng.GameConfig.anticipationReels || _ng.GameConfig.anticipationReels[this.startSpinCounter]) && !isStopNow) {
			//console.log(" Anticipation is activated! ======");
			if (!this.isAnticipateSndPlaying) {
				_sndLib.stop(_sndLib.sprite.reelSpinning);
				_sndLib.play(_sndLib.sprite.anticipation);
				this.isAnticipateSndPlaying = true;
			}

			this.addAnticipateReelAnim(this.startSpinCounter);
			this.reels[this.startSpinCounter].anticipateSpin(this.reelsData[this.startSpinCounter], isStopNow);
			this.currentAnticipationReelId = this.startSpinCounter;
		} else {
			this.reels[this.startSpinCounter].stopSpin(this.reelsData[this.startSpinCounter], isStopNow);
		}
	}
	this.startSpinCounter++;

	//@todo make it dynamic each real stop delay
	if (this.startSpinCounter < this.reelConfig.data.noOfReels) {
		this.delayInterval = (spinType == "start") ? this.reelConfig.data.reelSpinConfig.reelSpinStartGap : this.reelConfig.data.reelSpinConfig.reelStopGap;
		
		var anticipateDelay = this.reelConfig.data.anticipationDelay;
		var delay = (this.isAnticipateActive&&_ng.GameConfig.AnticipateReq ) ? anticipateDelay : this.delayInterval;

		if (isStopNow) {
			var delay = 5;
		}

		this.callNextReelInterval = setTimeout(this.individualStrip.bind(this, spinType, isStopNow), delay);
	} else {
		_mediator.publish("allReelsStarted");
	}

	//Scatter anticipation conditions
	if (_ng.GameConfig.aniticipateSymbol && spinType === "stop" &&_ng.GameConfig.AnticipateReq  &&this.isAnticipateActive == false && this.forceStop == false && _viewInfoUtil.isSecondaryAssetsLoaded && !isStopNow) {
		this.checkIsScatter(this.reelsData[this.startSpinCounter - 1]);
	}
}

view.individualStripStop = function (spinType, isStopNow) {
	
	if (this.stopSpinCounter >= this.reels.length) {
		this.stopSpinCounter = this.reels.length - 1;
	}
	
	if (this.isAnticipateActive&& _ng.GameConfig.AnticipateReq  && ( !_ng.GameConfig.anticipationReels || _ng.GameConfig.anticipationReels[this.stopSpinCounter]) && !isStopNow) {
		
        _mediator.publish("SpinButtonStatus",false);
        _mediator.publish("setSpaceBarEvent", "idle");
        //console.log(" Anticipation is activated! ======");
		if (!this.isAnticipateSndPlaying || _ng.GameConfig.sounds.playAnticipationForEachReel) {
			_sndLib.stop(_sndLib.sprite.reelSpinning);
			_sndLib.play(_sndLib.sprite.anticipation);
			this.isAnticipateSndPlaying = true;
		}
        else if(this.isAnticipateSndPlaying)
        {
            _sndLib.stop(_sndLib.sprite.anticipation);
			_sndLib.play(_sndLib.sprite.anticipation);
			this.isAnticipateSndPlaying = true;
        }
      
		this.addAnticipateReelAnim(this.stopSpinCounter);

		this.reels[this.stopSpinCounter].anticipateSpin(this.reelsData[this.stopSpinCounter], isStopNow);
		this.currentAnticipationReelId = this.stopSpinCounter;
	}
    else {
		if(this.reelsStarted)
			{
        _mediator.publish("SpinButtonStatus",true);

         _mediator.publish("setSpaceBarEvent", "spaceBarStopClicked");
		  		if(_viewInfoUtil.viewType=="VP" ||_viewInfoUtil.viewType=="VL")
				{
				 _mediator.publish("toggleStopSpinBg",true)
				}
			
		}
		this.reels[this.stopSpinCounter].stopSpin(this.reelsData[this.stopSpinCounter], isStopNow);
	}
    this.stopSpinCounter++;

	//@todo make it dynamic each real stop delay
	if (this.stopSpinCounter < this.reelConfig.data.noOfReels) {
		this.delayInterval = this.reelConfig.data.reelSpinConfig.reelStopGap;
		

		var anticipateDelay = this.reelConfig.data.anticipationDelay;
		var delay = (this.isAnticipateActive && _ng.GameConfig.AnticipateReq) ? anticipateDelay : this.delayInterval;

		if (isStopNow) {
			var delay = 5;
		}
		this.reelIntervalId = this.stopSpinCounter-1;
		this.callNextReelInterval = setTimeout(this.individualStripStop.bind(this, spinType, isStopNow), delay);
	} else {
				
		_mediator.publish("allReelsStarted");
	}

	//Scatter anticipation conditions
	if (_ng.GameConfig.aniticipateSymbol && spinType === "stop" && this.isAnticipateActive == false && this.forceStop == false && _viewInfoUtil.isSecondaryAssetsLoaded) {
		this.checkIsScatter(this.reelsData[this.stopSpinCounter - 1]);
	}
}
