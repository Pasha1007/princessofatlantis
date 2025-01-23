var gWV = WinView.prototype;
var FsTotalMultiplier=0;
gWV.addGameElements = function () {
	this.totalMultiplierValue = [];
	this.freespinTotalValue = 0;
	this.multiContainer = pixiLib.getContainer();
	this.multiContainer.x = 5;
	this.multiContainer.y = 210;
	this.multiContainer.alpha = 0;

	this.tumbleBox = pixiLib.getElement("Sprite", "tumble_win_portrait");
	this.tumbleBox.x = -735;
	this.tumbleBox.y = -397;
	this.tumbleBox.scale.set(0.7);
	this.multiContainer.addChild(this.tumbleBox);
	this.currentTotal =0;
	this.finalValue =0;
	this.scatterCount=0;
	this.addChild(this.multiContainer);
	var multiplierWinTxtStyle = {
		"type": "BitmapFont",
		"fontName": "Numbers-export",
		"fontSize": 25,
		"align": "center"
	}
	var multiText = {
		"type": "BitmapFont",
		"fontName": "featureBitmapFont-export",
		"fontSize": 35,
		"align": "center"
	}
	var winStyle = {
		"type": "BitmapFont",
		"fontName": "numbers-export",
		"fontSize": 45,
		"align": "center"
	};
	
	this.allWin = pixiLib.getElement("Text", winStyle);
	this.multiContainer.addChild(this.allWin);
	pixiLib.setText(this.allWin, "");
	this.allWin.anchor.set(0.5);
	this.allWin.x = -540;
	this.allWin.y = -323;



	this.multiplierWinTxt = pixiLib.getElement("Text", multiText);
	this.multiContainer.addChild(this.multiplierWinTxt);
	pixiLib.setText(this.multiplierWinTxt, "");
	this.multiplierWinTxt.anchor.set(0.5);
	this.multiplierWinTxt.x = (this.allWin.x + this.allWin.width / 2);
	this.multiplierWinTxt.y = -316;
    this.multiplierWinTxt.visible=true;
	this.addChild(this.multiContainer);
	this.BonusPos = [];
	this.winBgs = [];
	this.winTexts = [];
	this.winFlame = [];
	this.BonusPosX=[147,316,488,659,829]
	this.BonusPosY=[175,357,530]
	this.winAnimArr = [];
	_mediator.subscribe("hitSym",this.hitSym.bind(this));
	_mediator.subscribe('removeMultipliers', this.removeMultipliers.bind(this));
	_mediator.subscribe('createSticky', this.createSticky.bind(this));
	_mediator.subscribe('tweenTotalWin', this.tweenTotalWin.bind(this));
	_mediator.subscribe('removeAllmultipliers', this.removeAllmultipliers.bind(this));
	_mediator.subscribe('getTotalwin', this.getTotalwin.bind(this));
	_mediator.subscribe("TumbleWin", this.TumbleWin.bind(this));
	_mediator.subscribe("removeWinAnim", this.removewinAnim.bind(this));
	_mediator.subscribe("ScatterWin",this.ScatterWin.bind(this))
	_mediator.subscribe("toggleTumbleBox", this.toggleTumbleBox.bind(this));
	_mediator.subscribe("updateTextWithCountUp", this.updateTextWithCountUp.bind(this));
	_mediator.subscribe("showExtraSpins", this.showExtraSpins.bind(this));
	_mediator.subscribe("playLandAnim",this.playLandAnim.bind(this));
	_mediator.subscribe("resetTotalFSWin",this.resetTotalFSWin.bind(this));

	this.cacheID=100;
	this.cachePos=100;
	this.onGameResize();
}
gWV.onGameResize = function (val) {
	
	_mediator.publish("ResizeGview");
	if (_viewInfoUtil.viewType == "VP") {
		this.tumbleBox.scale.set(0.7);
		// this.featureMBg.scale.set(0.5);
		this.multiContainer.x = 435;
		this.multiContainer.y = -170;
		this.multiContainer.scale.set(0.8);
		this.tumbleBox.x = -120;
	    this.tumbleBox.y = 90;
		this.allWin.x = 80;
	    this.allWin.y = 155;
		this.multiplierWinTxt.x = 208;
	    this.multiplierWinTxt.y = 162;
		// this.featureMBg.x = 250;
	    // this.featureMBg.y = 120;

	} 
	else if(_viewInfoUtil.viewType == "VL"){
        this.multiContainer.x = -35;
		this.multiContainer.y = 230;
		this.multiContainer.scale.set(0.8);
		this.tumbleBox.x = 465;
	    this.tumbleBox.y = -391;
		this.tumbleBox.scale.set(0.65,0.6);
		// this.featureMBg.x = 810;
	    // this.featureMBg.y = -382;
		this.allWin.x = 655;
	    this.allWin.y = -335;
		this.multiplierWinTxt.x = 768;
	    this.multiplierWinTxt.y = -327;

	}else {
		this.multiContainer.x = 925;
		this.multiContainer.y = 215;
		this.multiContainer.scale.set(0.8)

	}
	_mediator.publish("resizeBuypopup")
}
gWV.resetTotalFSWin = function(value){
	this.freespinTotalValue =value;
}
gWV.showAlternateLineWins = function (linesObj) {
    this.alternatetriggeredOnce = false;
    this.linesObj = linesObj;
    this.linesLoopIndex = 0;
    this.lineWinsLoopCount = 0;
	_mediator.publish("FadeReels",1);
	if(this.BonusPos.length>0)
   { setTimeout(
        function(){
        this.showLine();
		if(!(coreApp.gameModel.userModel.userData.next_round && coreApp.gameModel.userModel.userData.next_round.type=="freespins"))
		_mediator.publish("EnablePanel");
		_mediator.publish("FadeReels",0.3);
        }.bind(this),(_ng.isQuickSpinActive && _ng.quickSpinType==="turbo")?
		500: this.BonusPos.length*450
    )
   }
   else{
	this.showLine();
   }
}; 

// gWV.updateMultipler = function (val) {
// 	if (val < 1) { val = 1; }
// 	// this.effectAnim.visible = true;
// 	// this.effectAnim.gotoAndPlay(1);
// 	_sndLib.play(_sndLib.sprite.Multiplier);
// 	pixiLib.setText(this.multiplierWinTxt, "x" + val);
// 	setTimeout(function(){
// 		// this.effectAnim.visible = false;
// 	}.bind(this), 500);
// }
gWV.showAllWins = function (allWinLines) {
    this.createWinSymbolContainer();
    if (this.lineSymbols) { this.clearLine(); }
    this.tweens = [];
    this.lineSymbols = [];
    this.linesObj = allWinLines;
    var isWildInWinLine = false;

    for (let k = 0; k < this.linesObj.length; k++) {
        var lineNum = this.linesObj[k].line;
        for (var i = 0; i < this.linesObj[k].pos.length; i++) {
            var symbol = this.getSymbolFromPosition(this.linesObj[k].pos[i]);
            if(symbol === "w"){
                isWildInWinLine = true;
            }
        }
    }

    for (let k = 0; k < this.linesObj.length; k++) {
        var lineNum = this.linesObj[k].line;
        for (var i = 0; i < this.linesObj[k].pos.length; i++) {
            var symbol = this.getSymbolFromPosition(this.linesObj[k].pos[i]);
            symbol = this.getSymbolName(symbol);
            if(isWildInWinLine && _ng.GameConfig.symbolAnimations[symbol+"_wild"]){ symbol = symbol + "_wild"; }
            var winSym = new WinSymbol(symbol);
            this.winSymbolContainer.addChild(winSym);
            winSym.playAnimation();           
            this.lineSymbols.push(winSym);

            var symbolOffset = {x: 0, y: 0};
            if(this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded){ symbolOffset = this.animationConfig[symbol][0].offset; }
            var xReelPos = this.getSymbolFromPosition(this.linesObj[k].pos[i], "xValue");
            var yReelPos = this.getSymbolFromPosition(this.linesObj[k].pos[i], "yValue");
            winSym.x = this.reelConfig.data.eachReelPos[xReelPos] + symbolOffset.x;
            var symbolTopPadding = (this.reelConfig.data.eachReelYPos) ? this.reelConfig.data.eachReelYPos[xReelPos] : 0;
            var yPos = Math.floor(Number(this.linesObj[k].pos[i]) / Number(this.reelConfig.data.noOfReels));
            var gaps = (this.symConfig.symbolYGap * (yPos + 1));
            winSym.y = ((this.symConfig.symbolHeight) * (yPos + 1)) + gaps + symbolTopPadding + symbolOffset.y;
            if(this.getValidateExpWild(this.linesObj[k].pos[i])){
            	var frames = [];
            	for (var z = 1; z < 25; z++) {
            		frames.push(PIXI.Texture.from((z<10)? "wexp_0"+z : "wexp_"+z));
            	}
            	var expWild = new PIXI.AnimatedSprite(frames)
            	if(!this.wildSybols){ this.wildSybols = []; }
            	this.wildSybols.push(expWild);
            	this.winSymbolContainer.addChild(expWild);
            	expWild.x = winSym.x - 92; expWild.y = winSym.y - 89;
            	expWild.play();
            	winSym.visible = false;
            }
            this.updateSymbolProps(winSym, k, i);
        }
       // _mediator.publish("showSingleLine", lineNum, k);
    }
    this.allWinsAdditionalAnimation();
};
gWV.hitSym=function(reelNum,symArray)
{
// console.log("reelId  "+reelNum+ "  "+symArray.length+" "+symArray[0].name[0]);

// if(symArray[0].name[0]=="a" ||symArray[0].name[0]=="b"||symArray[0].name[0]=="c"||symArray[0].name[0]=="d")
// this.a=pixiLib.getElement("Spine",symArray[0].name[0]);
// this.addChild(this.a);
// this.a.scale.set(0.6);
// this.a.position.x=symArray[0].x
// this.a.state.setAnimation(0, "hit", false);
}
// gWV.BonusSymbolWin= function(reelNum)
// {   

// 	// this.winBgs=[]
// 	// this.winTexts=[]
// 	var bonus_wins=coreApp.gameModel.userModel.userData.current_round.screen_wins;

// 	for(var i=reelNum;i<15;i+=5)
// 	{
// 		if(bonus_wins[i]>0)
// 		{
// 			//console.log("Pos: "+i+" win: "+bonus_wins[i])
// 			this.BonusPos.push(i);
// 			// var winbg=pixiLib.getElement("Sprite","Continue_disable");
// 			// this.winBgs.push(winbg);
// 			// this.addChild(winbg);
// 			// winbg.x=this.BonusPosX[i%5];
// 			// winbg.y=this.BonusPosY[Math.floor(i/5)];
// 			// winbg.name="bonus Sym box "+ i;

			
// 			var style={
// 				"type": "BitmapFont",
// 				"fontName": "winnum-export",
// 				"fontSize": 20,
// 				"align": "center"

// 			}
// 			var winText=pixiLib.getElement("Text",style);
// 			pixiLib.setText(winText,pixiLib.getFormattedAmount(bonus_wins[i]));
// 			winText.anchor.x=0.5;
// 			this.winTexts.push(winText);
// 			this.addChild(winText);
// 			winText.x=this.BonusPosX[i%5]+95;
// 			winText.y=this.BonusPosY[Math.floor(i/5)]+30;
// 			winText.name="bonus Sym Text "+ i;

// 			var flame=pixiLib.getElement("Sprite","overlay_particles_03")
// 			this.winFlame.push(flame);
// 			flame.scale.set(0.3,0.3)
// 			this.addChild(flame)
// 			flame.x=this.BonusPosX[i%5]+35;
// 			flame.y=this.BonusPosY[Math.floor(i/5)]-15;
// 			flame.visible=false;
// 			flame.name="bonus Flame "+ i;

// 		}
// 	}

// 	// var xReelPos = this.getSymbolFromPosition(i, "xValue");
// 	// var yReelPos = this.getSymbolFromPosition(i, "yValue");
// 	// var symbolOffset =  (this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded) ? this.animationConfig[symbol][0].offset :{x: 0, y: 0};
// 	// var symbolTopPadding = (this.reelConfig.data.eachReelYPos) ?  this.reelConfig.data.eachReelYPos[xReelPos] : 0;
// 	// var yPos = Math.floor(Number(i) / Number(this.reelConfig.data.noOfReels));
// 	// var gaps = (this.symConfig.symbolYGap * (yPos + 1));
// 	// xPos = this.reelConfig.data.eachReelPos[xReelPos] + symbolOffset.x;
// 	// yPos = ((this.symConfig.symbolHeight) * (yPos + 1)) + gaps + symbolTopPadding + symbolOffset.y;

// 	// winbg.x = xPos+15;
// 	// winbg.y = yPos+15;
// }
// gWV.clearBonusSym=function()
// {
// 	for(var i=0;i<this.BonusPos.length;i++)
// 	{
// 		//this.removeChild(this.winBgs[i])
// 		this.removeChild(this.winTexts[i]);
// 		this.removeChild(this.winFlame[i]);
// 	}
// this.BonusPos=[];
// this.winBgs=[];
// this.winTexts=[];
// this.winFlame=[];
// }
// gWV.TweenBonusSym=function()
// {
// 	this.sum=0
// 	var bonus_wins=coreApp.gameModel.userModel.userData.current_round.screen_wins;
// 	for(var i=0;i<this.BonusPos.length;i++){
	
// 		_mediator.publish("DisablePanel");
		

// 		if(_ng.isQuickSpinActive && _ng.quickSpinType==="turbo"){
// 			if(_viewInfoUtil.viewType=="VP")
// 			{	
// 				// this.winFlame[i].visible=true;
// 				TweenMax.to(this.winFlame[i],0.45, { x: ((_viewInfoUtil.getWindowWidth()*2.2)-70), y:(_viewInfoUtil.getWindowHeight()+150), alpha : 0.4});
// 			}
// 			else if(_viewInfoUtil.viewType=="VL")
// 			{
// 				// this.winFlame[i].visible=true;
// 				TweenMax.to(this.winFlame[i],0.45, { x: (_viewInfoUtil.getWindowWidth()+100), y:(_viewInfoUtil.getWindowHeight()*1.8), alpha : 0.4});
// 			}
// 			else{
// 				// this.winFlame[i].visible=true;
// 				TweenMax.to(this.winFlame[i],0.45, { x: (_viewInfoUtil.getWindowWidth()-500), y:(_viewInfoUtil.getWindowHeight())-95, alpha : 0.4});
// 			}
// 		}
// 		else{
// 			if(i==0)
// 				this.winFlame[i].visible=true;
// 			if(_viewInfoUtil.viewType=="VP")
// 			{	
// 				TweenMax.to(this.winFlame[i],0.45, { x: ((_viewInfoUtil.getWindowWidth()*2.2)-70), y:(_viewInfoUtil.getWindowHeight()+150), alpha : 0.4}).delay(0.4*(i));
// 			}
// 			else if(_viewInfoUtil.viewType=="VL")
// 			{
// 				// this.winFlame[i].visible=true;
// 				TweenMax.to(this.winFlame[i],0.45, { x: (_viewInfoUtil.getWindowWidth()+100), y:(_viewInfoUtil.getWindowHeight()*1.8), alpha : 0.4}).delay(0.4*(i));
// 			}
// 			else{
// 				// this.winFlame[i].visible=true;
// 				TweenMax.to(this.winFlame[i],0.45, { x: (_viewInfoUtil.getWindowWidth()-500), y:(_viewInfoUtil.getWindowHeight())-95, alpha : 0.4}).delay(0.4*(i));
// 			}
// 		}
// 	}
// 	var j=0
// 	if(this.BonusPos.length && !(_ng.isQuickSpinActive && _ng.quickSpinType==="turbo")){
// 	var incrementWin=setInterval(
// 		function(){
// 			_mediator.publish("DisablePanel");

// 				if (j + 1 <= this.BonusPos.length - 1) {
// 					this.winFlame[j + 1].visible = true;
// 				}
		
// 			var currentBonusWin= bonus_wins[this.BonusPos[j]]
// 			this.sum+=currentBonusWin;
// 			_mediator.publish("UpdateWin",(this.sum+coreApp.gameModel.spinData.getTotalWinAmount()));
// 			j+=1
// 			_sndLib.play(_sndLib.sprite.Meter_Amount_Revel);
// 			if(j>=this.BonusPos.length)
// 			{
// 				clearInterval(incrementWin);
// 			}
// 		}.bind(this),400
// 	)
// 	}
// 	else{
// 		_sndLib.play(_sndLib.sprite.Meter_Amount_Revel);
// 		for(var j=0;j<this.winFlame.length;j++)
// 		{	

			
// 			var currentBonusWin= bonus_wins[this.BonusPos[j]]
// 			this.sum+=currentBonusWin;
// 			_mediator.publish("UpdateWin",(this.sum+coreApp.gameModel.spinData.getTotalWinAmount()));
// 			this.winFlame[j].visible = true;
// 		}
// 	}
// 	setTimeout(
// 		function(){
// 			_mediator.publish("EnablePanel");
// 		}.bind(this),(_ng.isQuickSpinActive && _ng.quickSpinType==="turbo")?
// 		500:(this.BonusPos.length)*550 
// 	)
// }

gWV.clearAllWins = function () {
	if(this.wildSybols){
		for (var i = 0; i < this.wildSybols.length; i++) {		
			this.winSymbolContainer.removeChild(this.wildSybols[i]);
		}
		this.wildSybols = [];
	}
    this.isStopSpinCalled = false;
    this.clearLine();
    try {
        if (this.symbolForWinSound){ _sndLib.stop(_sndLib.sprite[this.symbolForWinSound]); }
    } catch (e) {}
    clearTimeout(this.showLineTimeout);
};
gWV.getValidateExpWild = function(position){
	if((position == 0 || position==1 || position==2 || position == 3 || position == 4)  && _ng.expandedReels && _ng.expandedReels[position]){ return true; }
	return false;
}
gWV.removeWinBg=function()
{
	if(this.border)
	{
		this.removeChild(this.border);
	}
}
gWV.CreateWinBg=function()
{
	
	this.border = pixiLib.getElement("Sprite", "Total_Base");
            this.border.name="BG border";
           // this.border.scale.set(0.1);
           this.border.rotation=1.57;
            this.addChild(this.border);
            this.border.x = 640; this.border.y = 400;
        

            if (_viewInfoUtil.viewType === "VD") {
                this.border.x = 595; this.border.y = 335;
                this.border.scale.set(1.5);
            }
            else if(_viewInfoUtil.viewType === "VP")
            {
                this.border.x = 670; this.border.y = 319;
                this.border.scale.set(1.2);
            }
            else
            {
                this.border.x = 732; this.border.y = 300;
                this.border.scale.set(2,2);
            }
}

// Rest of code is multiplier part done by Jeffin
gWV.createStickyContainer = function(){
    if (!this.stickyContainer) {
        this.stickyContainer = pixiLib.getContainer();
        this.stickyContainer.name = "stickyContainer";
        this.addChild(this.stickyContainer);
    }
    else
    {
        this.stickyContainer.visible=true;
    }
    this.stickyContainer.x = coreApp.gameView.reelController.view.reelContainer.x;
    this.stickyContainer.y = coreApp.gameView.reelController.view.reelContainer.y;
}

gWV.removeMultipliers = function(){
	if (this.allWinMoved && this.allWinMoved == true) {
		// this.allWin.x = this.allWin.x + 50;
		this.allWinMoved = false;
	}
	pixiLib.setText(this.allWin, "");
	this.currentTotal=0;
	if (coreApp.gameModel.userModel.userData.current_round.spin_type == "freespin") {
		if(this.stickyContainer)
		{
		this.removeChild(this.stickyContainer)
		delete this.stickyContainer;
		}
		this.toggleTumbleBox(0);
		_mediator.publish("toggleFadeContainer",true);
		this.currentTotal =0;
		this.finalValue =0;
		this.multiplierTotal = 0;
		pixiLib.setText(this.allWin, "");
	    indexValue = -1;
		pixiLib.setText(this.multiplierWinTxt,"");
		this.totalMultiplierValue=[];
		this.multiplierArray=[];
	}
}

gWV.calculatePosFromIndex = function(value){
	var symbol = "m";
	var xReelPos = this.getSymbolFromPosition(value, "xValue");
	var symbolOffset =  (this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded) ? this.animationConfig[symbol][0].offset :{x: 0, y: 0};
	var symbolTopPadding = (this.reelConfig.data.eachReelYPos) ?  this.reelConfig.data.eachReelYPos[xReelPos] : 0;
	var yPos = Math.floor(Number(value) / Number(this.reelConfig.data.noOfReels));
	var gaps = (this.symConfig.symbolYGap * (yPos + 1));
	xPos = this.reelConfig.data.eachReelPos[xReelPos] + symbolOffset.x;
	yPos = ((this.symConfig.symbolHeight) * (yPos + 1)) + gaps + symbolTopPadding + symbolOffset.y;
	let positions = [xPos,yPos];
	return positions;
}
gWV.getNonZeroMultiplierPos = function(arr){
    let tmpPosArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
			let temp =[arr[i], i];
            tmpPosArray.push(temp);
                }
            }
    return tmpPosArray;
}
gWV.showLine = function () {};
gWV.newReelSymbols = function(){
	
}
gWV.createSticky =function(){
	if(coreApp.gameModel.userModel.userData.current_round.spin_type == "freespin" && this.currentTotal >0){
		this.createStickyandTween();
	}
}
gWV.createStickyandTween= function(){
	this.PottextStyle = {
		"type": "BitmapFont",
		"fontName": "sugarBoxFont-export",
		"fontSize": 25,
		"align": "center"
		};
	// if(globalArray.length == 0){
	// 			return;
	// };
	this.createStickyContainer();
	this.multiplierTotal = 0;
	this.multiplierArray=[];
	this.symbolIndex= this.findSticky();
	_mediator.publish("visibilityOfMultiplierSymbol",0);
	for (let index = 0; index < this.symbolIndex.length; index++) {
	console.log(this.symbolIndex[index][0]);
		let newPos = this.calculatePosFromIndex(this.symbolIndex[index][1]);
		if (this.TweenMultiplierText, this.symbolIndex[index][0] < 10) {
			var SymAnim = pixiLib.getElement("Spine", "multipliers");
			var animName=this.symbolIndex[index][0]+'x'
			SymAnim.state.setAnimation(0,animName,false);
			_sndLib.play(_sndLib.sprite.multiplier);
		}
		else if (this.TweenMultiplierText, this.symbolIndex[index][0] >= 10 && this.symbolIndex[index][0] < 20) {
			if (this.TweenMultiplierText, this.symbolIndex[index][0] == 12) {
				var SymAnim = pixiLib.getElement("Spine", "multipliers");
				SymAnim.state.setAnimation(0,'12x',false);
				_sndLib.play(_sndLib.sprite.multiplier)
			}
			if (this.TweenMultiplierText, this.symbolIndex[index][0] == 15) {
				var SymAnim = pixiLib.getElement("Spine", "multipliers");
				SymAnim.state.setAnimation(0,'15x',false);
				_sndLib.play(_sndLib.sprite.multiplier)
			}
			if (this.TweenMultiplierText, this.symbolIndex[index][0] == 10) {
				var SymAnim = pixiLib.getElement("Spine", "multipliers");
				SymAnim.state.setAnimation(0,'10x',false);
				_sndLib.play(_sndLib.sprite.multiplier)
			}	
		}
		else if (this.TweenMultiplierText, this.symbolIndex[index][0] >=20 && this.symbolIndex[index][0] <= 50) {
			if (this.TweenMultiplierText, this.symbolIndex[index][0] == 20) {
				var SymAnim = pixiLib.getElement("Spine", "multipliers");
				SymAnim.state.setAnimation(0,'20x',false);
				_sndLib.play(_sndLib.sprite.multiplier)
			}
			if (this.TweenMultiplierText, this.symbolIndex[index][0] == 25) {
				var SymAnim = pixiLib.getElement("Spine", "multipliers");
				SymAnim.state.setAnimation(0,'25x',false);
				_sndLib.play(_sndLib.sprite.multiplier)
			}

			if (this.TweenMultiplierText, this.symbolIndex[index][0] == 50) {
            				var SymAnim = pixiLib.getElement("Spine", "multipliers");
            				SymAnim.state.setAnimation(0,'50x',false);
            				_sndLib.play(_sndLib.sprite.multiplier)
            			}
		}
		else {
			if (this.TweenMultiplierText, this.symbolIndex[index][0] == 100) {
				var SymAnim = pixiLib.getElement("Spine", "multipliers");
				SymAnim.state.setAnimation(0,'100x',false);
				_sndLib.play(_sndLib.sprite.multiplier)
			}	
		}
		SymAnim.scale.set(0.18);
		SymAnim.x = newPos[0];
		SymAnim.y = newPos[1];
		this.stickyContainer.addChild(SymAnim);
		this.TweenMultiplierText = pixiLib.getElement("Text",this.PottextStyle);
	    this.TweenMultiplierText.anchor.set(0.5);
	    this.TweenMultiplierText.name="Multiplier " + index;
		pixiLib.setText(this.TweenMultiplierText,this.symbolIndex[index][0] + "x");
		this.TweenMultiplierText.x = newPos[0]; 
		this.totalMultiplierValue.push(this.symbolIndex[index][0]);
		this.TweenMultiplierText.y = newPos[1];
		this.stickyContainer.addChild(this.TweenMultiplierText);
		this.TweenMultiplierText.alpha = 0;	
		let temp = [this.TweenMultiplierText,this.symbolIndex[index][0],SymAnim];
		this.multiplierArray.push(temp);
	}
    setTimeout(() => {
	    this.tweenAnimation();
		_mediator.publish("visibilityOfMultiplierSymbol",1);
    }, 1400);
}

gWV.showEachReelStopAction = function (reelId, reelStrip) {
    //#todo if this reel is not expanded 
    if(!_ng.GameConfig.ReelViewUiConfig.showScatterLand  || !_viewInfoUtil.isSecondaryAssetsLoaded){
        return;
    }
    this.createWinSymbolContainer();

    var symbolArray = [];
	if(reelId==0)
		{this.scatterCount=0;}
    
    if (!_ng.isQuickSpinActive){
        for (i = 0; i < reelStrip.length; i++) {
            for(j = 0; j < _ng.GameConfig.aniticipateSymbol.length; j++){
                if (reelStrip[i] === _ng.GameConfig.aniticipateSymbol[j]) {
					this.scatterCount+=1;
                    // var winSym = new WinSymbol(_ng.GameConfig.aniticipateSymbol[j] + "_land");
                    // this.winSymbolContainer.addChild(winSym);
                    // var symbolTopPadding = 0;
                    // if (this.reelConfig.data.eachReelYPos) {
                    //     symbolTopPadding = this.reelConfig.data.eachReelYPos[i];
                    // }
                    // var symbolOffset = {x: 0, y: 0};
                    // if (this.animationConfig[_ng.GameConfig.aniticipateSymbol[j]] && this.animationConfig[_ng.GameConfig.aniticipateSymbol[j]].offset){
                    //     symbolOffset = this.animationConfig[_ng.GameConfig.aniticipateSymbol[j]].offset
                    // }
                    // if (this.reelConfig.data.eachReelPos && this.reelConfig.data.eachReelPos[i] !== undefined) {
                    //     winSym.x = this.reelConfig.data.eachReelPos[reelId] + symbolOffset.x;
                    // } else {
                    //     winSym.x = this.symConfig.symbolWidth * reelId + (this.symConfig.symbolXGap * i) + symbolOffset.x;
                    // }
                    // winSym.y = this.symConfig.symbolHeight * (i + 1) + (this.symConfig.symbolYGap * i) + symbolTopPadding + symbolOffset.y;
                    
                   if(this.scatterCount<4  && this.reelId<4)
					{
					_sndLib.play(_sndLib.sprite.sLand_3)
					}
					else if(this.scatterCount>=4){
						_sndLib.stop(_sndLib.sprite.sLand_3)
						_sndLib.play(_sndLib.sprite.sLand_4);
						
					}
                    // winSym.playAnimation();
                    // this.ScatterAppearArray.push(winSym);
                    // symbolArray.push([reelId, i]);
                }
            }
        }
        // if(symbolArray.length>0){ 
		// 	_mediator.publish("hideReelSymbols", symbolArray, "eachReel"); 
		// }
    } 

    
};
gWV.removeBonusLand = function(){

	setTimeout(function(){
    for (let i = 0; i < this.ScatterAppearArray.length; i++) {
        this.winSymbolContainer.removeChild(this.ScatterAppearArray[i]);
        this.ScatterAppearArray[i] = null;
    }
    this.ScatterAppearArray = [];
		}.bind(this),1)
};
gWV.removeAllmultipliers = function(){
}
gWV.tweenAnimation= function(){
	let xPos,yPos;
	if(this.multiplierArray.length == 0){
		return;
	};
	this.allWin.x = this.allWin.x - 50;
	this.allWinMoved = true;

	this.multiplierWinTxt.x = (this.allWin.x + this.allWin.width);

	for (let j = 0; j < this.multiplierArray.length; j++) {
		let time = 0;
		if (_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") {
			time = 0.1;
		} else {
			time = 0.4;
		}
		_sndLib.play(_sndLib.sprite.multiplierTween)
		if(_viewInfoUtil.viewType == "VD") {
			xPos = this.multiplierWinTxt.worldTransform.tx - (this.multiplierArray[j][0].worldTransform.tx - this.multiplierArray[j][0].x);
			yPos = this.multiplierWinTxt.worldTransform.ty - (this.multiplierArray[j][0].worldTransform.ty - this.multiplierArray[j][0].y);
		}else{
			xPos = 490;
			yPos = 0;
		}
			TweenMax.to(this.multiplierArray[j][0], time, {
				x: xPos , y: yPos,
				ease: Linear.easeInOut,
				onStart:function(){
					this.multiplierArray[j][0].alpha = true;
				}.bind(this),
				onUpdate: function() {
				   const progress = this.progress();
				   if (progress <= 0) {
					   const scale = 5 + progress * 2; 
					   this.target.scale.set(scale);
				   } else {
					   const scale = 2 - (progress - 0.5) * 2; 
					   this.target.scale.set(scale);
				   }
				},
				onComplete : function() {
					this.multiplierArray[j][2].parent.removeChild(this.multiplierArray[j][2]);
					_sndLib.play(_sndLib.sprite.multi_8);
					this.multiplierArray[j][0].alpha =0;
					this.multiplierArray[j][0].parent.removeChild(this.multiplierArray[j][0]);
					this.tweenTotalWin(this.multiplierArray[j][1]);
				}.bind(this),
			}).delay(time * j);
	}
}
gWV.toggleTumbleBox = function(value){
	this.multiContainer.alpha = value;
}
gWV.tweenTotalWin = function(value){
	this.multiplierTotal = this.multiplierTotal + value;
	pixiLib.setText(this.multiplierWinTxt,"x" + this.multiplierTotal);
	if (coreApp.gameModel.obj.current_round.post_matrix_info.win == this.multiplierTotal) {
		let time =0;
		
        if (_ng.isQuickSpinActive && _ng.quickSpinType==="turbo") {
			time =250;
		}
		else{
             time =500;
		}
		setTimeout(() => {
			this.tweenFinal();
		}, time);
	}
}
gWV.tweenFinal = function(){
		if (this.currentTotal == 0) {
			return;
		}
			var multiText = {
				"type": "BitmapFont",
				"fontName": "featureBitmapFont-export",
				"fontSize": 28,
				"align": "center"       
			}
			this.mText = pixiLib.getElement("Text", multiText);
			this.multiContainer.addChild(this.mText);
			pixiLib.setText(this.mText,this.multiplierTotal);
			this.mText.anchor.set(0.5);
			this.mText.x = this.multiplierWinTxt.x;
			this.mText.y = this.multiplierWinTxt.y;
			let xPos = this.allWin.worldTransform.tx - this.mText.worldTransform.tx - this.mText.x;
			let yPos = this.allWin.worldTransform.ty - this.mText.worldTransform.ty - this.mText.y;
			// if (sum > 0) {
				let time =0;
				if (_ng.isQuickSpinActive && _ng.quickSpinType==="turbo") {
					time =0.15
				}
				else{
					 time =0.5;
				}
				pixiLib.setText(this.multiplierWinTxt,"");
				// _sndLib.play(_sndLib.sprite.multiplierTween);
				TweenMax.to(this.mText,time,{
					// x:this.allWin.x,
					x:this.allWin.x,
					y:this.allWin.y,
					ease:Power2.easeInOut,
					alpha :0,
					onUpdate: function() {
						const progress = this.progress();
						if (progress <= 0) {
						    this.target.alpha =0;
						     } 
						   },
					onComplete: function(){
						if (this.allWinMoved && this.allWinMoved == true)
							{
						// this.allWin.x = this.allWin.x+50;
							if (_viewInfoUtil.viewType == "VP") {
								this.allWin.x =80;
							}
							else if (_viewInfoUtil.viewType == "VL") {
								this.allWin.x =655
							}
							else {
								this.allWin.x =-540
							}
						this.allWinMoved = false;}
						this.mText.parent.removeChild(this.mText);
						_sndLib.play(_sndLib.sprite.multi_9);
					    let roundWin = coreApp.gameModel.userModel.userData.current_round.payline_win_amount;
						_mediator.publish("updateTextWithCountUp",roundWin,150,this.allWin);
						if (coreApp.gameModel.userModel.userData.current_round.spin_type == "freespin") {
							this.freespinTotalValue = coreApp.gameModel.userModel.userData.current_round.total_fs_win_amount;
						}
						else{
							this.freespinTotalValue = roundWin;
						}
						_mediator.publish("UpdateWin",this.freespinTotalValue);
						if(!coreApp.gameModel.isFreeSpinActive()){
							_mediator.publish(_events.slot.updateBalance);
						}
						var winTxt = gameLiterals.win_text;

						_mediator.publish("SHOW_TICKER_MESSAGE", winTxt +": "+pixiLib.getFormattedAmount(this.freespinTotalValue, true));
						//Calling All win pop up after the updation of totalamount
						_mediator.publish("triggerAllWinAnimation");
					}.bind(this),
				})
}
gWV.findIndexfromValue= function(finalArray,value){
	for (let index = 0; index < finalArray.length; index++) {
		if (finalArray[index] == value) {
			return index;
		}
		
	}
}
gWV.findSticky = function(){
	if (coreApp.gameModel.userModel.userData.current_round.misc_prizes.count == 0) {
		mValue = coreApp.gameModel.userModel.userData.current_round.screen_wins;
		mValue =this.getNonZeroMultiplierPos(mValue);
	}
	else{
		let count = coreApp.gameModel.userModel.userData.current_round.misc_prizes.count;
		mValue = coreApp.gameModel.userModel.userData.current_round.misc_prizes[count-1].screenWins;
		mValue =this.getNonZeroMultiplierPos(mValue);
	}
	return mValue;
}
gWV.TumbleWin = function (array, num, tickerValues) { //parsed values like which symbol name burst and the total number
	if (coreApp.gameModel.userModel.userData.current_round.spin_type == "freespin") {
		this.toggleTumbleBox(1);
		_mediator.publish("toggleFadeContainer",false);	
	}
	this.arrayTemp = array;
	// console.log("tumbleWin " + array);
	this.winamtStyle = {
		"type": "BitmapFont",
		"fontName": "numbers-export",
		"fontSize": 50,
		"align": "center"
	};
	for (var j = 0; j < coreApp.gameModel.obj.current_round.misc_prizes[num].old_reel_symbol.length; j++) {
			this.winamt = pixiLib.getElement("Text", this.winamtStyle);
			this.winamt.name = "TumbleWin";
			this.winamt.anchor.set(0.5);
			this.winamt.scale.set(1);
			this.winamt.x = 500-(j*110);
			this.winamt.y = 300+(j*80);
			this.addChild(this.winamt);
			this.winAnimArr.push(this.winamt);
			// console.log(tickerValues[0][0],tickerValues[0][1]);
			this.currentWin = this.finalArray[0];
			this.currentWin = parseFloat(this.currentWin);
			this.currentTotal = this.currentTotal + this.currentWin;
			this.freespinTotalValue =this.freespinTotalValue + this.currentWin;
			pixiLib.setText(this.winamt, pixiLib.getFormattedAmount(array[0]));
			if(coreApp.lang == "tr")
				{
					_mediator.publish("showNewMessage",tickerValues[0][0]  + " X    "  + "          " + pixiLib.getFormattedAmount(array[0]) + " " +gameLiterals.pays );

				}
				else{
					_mediator.publish("showNewMessage",tickerValues[0][0]  + " X "  + "             "+gameLiterals.pays+"  "  + pixiLib.getFormattedAmount(array[0]));

				}
			
			_mediator.publish("updateSymbol",tickerValues[0][1]);
			setTimeout(() => {
				_mediator.publish("showNewMessage","");
				_mediator.publish("updateSymbol","");
			}, 1000);
			TweenMax.to(this.winamt,1.2, {
				 y: this.winamt.y - 80,
				alpha: 0,
				ease: Linear.easeInOut,
			});
			array.shift();
			tickerValues.shift();
		}
			_mediator.publish("updateTextWithCountUp",this.currentTotal,300,this.allWin);
			_mediator.publish("UpdateWin",this.freespinTotalValue);
			var winTxt = gameLiterals.win_text;

			_mediator.publish("SHOW_TICKER_MESSAGE", winTxt + ": " +pixiLib.getFormattedAmount(this.freespinTotalValue, true));
}
gWV.getTotalwin = function(array){
	this.finalValue =[];
	this.finalArray = array;
	this.finalValue =0;
	for (let l = 0; l < array.length; l++) {
		let cValue = array[l];
		cValue=parseFloat(cValue);
         this.finalValue = this.finalValue + cValue; 	
	}
}
gWV.removewinAnim = function(){
	for(var i=0;i<this.winAnimArr.length;i++){
		this.removeChild(this.winAnimArr[i]);
	}
	this.winAnimArr = [];
}

gWV.ScatterWin = function(){
	this.winamtStyle ={
		"type": "BitmapFont",
		"fontName": "numbers-export",
		"fontSize": 40,
		"align": "center"
	};
		this.ScatterWintxt = pixiLib.getElement("Text", this.winamtStyle);
		this.ScatterWintxt.name = "";
		this.ScatterWintxt.anchor.set(0.5);
		this.ScatterWintxt.scale.set(1);
		this.ScatterWintxt.x = 500;
		this.ScatterWintxt.y = 300;
		this.addChild(this.ScatterWintxt);
		pixiLib.setText(this.ScatterWintxt, pixiLib.getFormattedAmount(coreApp.gameModel.obj.current_round.scatter_win));
		_mediator.publish("UpdateWin",coreApp.gameModel.obj.current_round.scatter_win);
		this.freespinTotalValue = this.freespinTotalValue + coreApp.gameModel.obj.current_round.scatter_win;
		var winTxt = gameLiterals.win_text;
		_mediator.publish("SHOW_TICKER_MESSAGE", winTxt + ": " + pixiLib.getFormattedAmount(coreApp.gameModel.obj.current_round.scatter_win, true));
		setTimeout(() => {
			if(!coreApp.gameModel.isFreeSpinActive()){
				_mediator.publish(_events.slot.updateBalance);
			}
		}, 200);
		TweenMax.to(this.ScatterWintxt, 0.8, {
				width: this.ScatterWintxt.width+10,
				height: this.ScatterWintxt.height+10,
				ease: Linear.easeInOut,
				yoyo : true,
				repeat:2,
				onComplete : function(){
					this.removeChild(this.ScatterWintxt);
					}.bind(this)
			});
}
gWV.updateTextWithCountUp = function(endValue, totalTime, obj){
	let startValue = parseFloat(obj.text.replace(/[^0-9.-]/g, '')) * 100 || 0;
    if (endValue == 0) {
        startValue =0;
    }
    let increment = (endValue - startValue) / totalTime;
    let startTime = new Date().getTime();
    let timer = setInterval(function() {
        let elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime >= totalTime) {
            obj.text = pixiLib.getFormattedAmount(endValue); 
            clearInterval(timer);
        } else {
            let currentValue = startValue + increment * elapsedTime;
            obj.text = pixiLib.getFormattedAmount(currentValue);
        }
    }, 10);
}
gWV.playBonusSymbolAnimation = function (data) {
	
	if(coreApp.gameModel.obj.current_round.scatter_win && coreApp.gameModel.obj.current_round.scatter_win>0){
		_mediator.publish("ScatterWin")
		_sndLib.play(_sndLib.sprite.sLand_4);
	}
	if(coreApp.gameModel.obj.current_round.misc_prizes.count==0 || coreApp.gameModel.obj.current_round.misc_prizes=="")
		{
    var bonusID = data.bonusID;
    var reelMatrix = data.reelMatrix;
    var bonusSymbol = _ng.GameConfig.bonusGames[bonusID].symbol;
    var animationDuration = this.animationConfig[bonusSymbol][0].animationDuration;
    var symbolArray = [];
    this.createWinSymbolContainer();
    for(var i = 0; i < reelMatrix.length; i++){
        for(var j = 0; j < reelMatrix[i].length; j++){
            if(reelMatrix[i][j] === bonusSymbol){
                symbolArray.push(pixiLib.getPosition(j, i));
            }
        }
    }
    _mediator.publish("hideReelSymbols", symbolArray);
    for (var i = 0; i < reelMatrix.length; i++) {
        for (var j = 0; j < reelMatrix[i].length; j++) {
            if (reelMatrix[i][j] === bonusSymbol) {
                var symbol = bonusSymbol;
                symbol = this.getSymbolName(symbol);
                var winSym = new WinSymbol(symbol);
                this.winSymbolContainer.addChild(winSym);
                this.bonusSymbols.push(winSym);
                var symbolTopPadding = 0;
                if (this.reelConfig.data.eachReelYPos) {
                    symbolTopPadding = this.reelConfig.data.eachReelYPos[i];
                }
                var symbolOffset = {x: 0, y: 0};
                if (this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded){
                    symbolOffset = this.animationConfig[symbol][0].offset
                }
                if (this.reelConfig.data.eachReelPos && this.reelConfig.data.eachReelPos[i] !== undefined) {
                    winSym.x = this.reelConfig.data.eachReelPos[i] + symbolOffset.x;
                } else {
                    winSym.x = this.symConfig.symbolWidth * i + (this.symConfig.symbolXGap * i) + symbolOffset.x;
                }
                winSym.y = this.symConfig.symbolHeight * (j + 1) + (this.symConfig.symbolYGap * j) + symbolTopPadding + symbolOffset.y;
                winSym.playAnimation();
            }
        }
    }
    try {
        if (this.animationConfig[symbol] !== undefined) {
            var symbolForWinSound = this.animationConfig[symbol][0].winSound.name;
            _sndLib.play(_sndLib.sprite[symbolForWinSound]);
        }
    } catch (e) { }
    setTimeout(function () {
        _mediator.publish("showReelSymbols");
        this.clearBonusSymbols();
        _mediator.publish("bonusSymbolAnimationCompleted");
    }.bind(this), animationDuration);
	}
	else
	{
		if(coreApp.gameModel.obj.misc_prizes && coreApp.gameModel.obj.misc_prizes[coreApp.gameModel.obj.misc_prizes.count-1]&& coreApp.gameModel.obj.misc_prizes[coreApp.gameModel.obj.misc_prizes.count-1].new_reel)
		{var bonusID = data.bonusID;
		var reelMatrix =coreApp.gameModel.obj.misc_prizes[coreApp.gameModel.obj.misc_prizes.count-1].new_reel;
		var bonusSymbol = _ng.GameConfig.bonusGames[bonusID].symbol;
		var animationDuration = this.animationConfig[bonusSymbol][0].animationDuration;
		var symbolArray = [];
		this.createWinSymbolContainer();
		for(var i = 0; i < reelMatrix.length; i++){
			for(var j = 0; j < reelMatrix[i].length; j++){
				if(reelMatrix[i][j] === bonusSymbol){
					symbolArray.push(pixiLib.getPosition(j, i));
				}
			}
		}
		_mediator.publish("hideReelSymbols", symbolArray);
		for (var i = 0; i < reelMatrix.length; i++) {
			for (var j = 0; j < reelMatrix[i].length; j++) {
				if (reelMatrix[i][j] === bonusSymbol) {
					var symbol = bonusSymbol;
					symbol = this.getSymbolName(symbol);
					var winSym = new WinSymbol(symbol);
					this.winSymbolContainer.addChild(winSym);
					this.bonusSymbols.push(winSym);
					var symbolTopPadding = 0;
					if (this.reelConfig.data.eachReelYPos) {
						symbolTopPadding = this.reelConfig.data.eachReelYPos[i];
					}
					var symbolOffset = {x: 0, y: 0};
					if (this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded){
						symbolOffset = this.animationConfig[symbol][0].offset
					}
					if (this.reelConfig.data.eachReelPos && this.reelConfig.data.eachReelPos[i] !== undefined) {
						winSym.x = this.reelConfig.data.eachReelPos[i] + symbolOffset.x;
					} else {
						winSym.x = this.symConfig.symbolWidth * i + (this.symConfig.symbolXGap * i) + symbolOffset.x;
					}
					winSym.y = this.symConfig.symbolHeight * (j + 1) + (this.symConfig.symbolYGap * j) + symbolTopPadding + symbolOffset.y;
					winSym.playAnimation();
				}
			}
		}
		try {
			if (this.animationConfig[symbol] !== undefined) {
				var symbolForWinSound = this.animationConfig[symbol][0].winSound.name;
				_sndLib.play(_sndLib.sprite[symbolForWinSound]);
			}
		} catch (e) { }
		setTimeout(function () {
			_mediator.publish("showReelSymbols");
			this.clearBonusSymbols();
			_mediator.publish("bonusSymbolAnimationCompleted");
		}.bind(this), animationDuration);
		}
		else
		{
			_mediator.publish("bonusSymbolAnimationCompleted");
		}
	}
};
gWV.showExtraSpins= function(){
	 _mediator.publish("ExtraFSAwardpopup")
	}
gWV.playLandAnim=function(reelId,position){

	if ((this.cacheID != reelId ||this.cachePos != position) && position<6 && position>0) {
		this.cacheID = reelId;
		this.cachePos = position;
		// console.log("In creation: " + this.cacheID + "  " + this.cachePos);
		
		setTimeout(function() {
		
		// 		var s_landAnim = pixiLib.getElement("Spine", "Land");
			

		// 		s_landAnim.scale.set(0.3)

		// 		this.addChild(s_landAnim);
		// 		s_landAnim.state.setAnimation(0, 'animation', true);
		
	
				
				var symbol = "s";
				symbol = this.getSymbolName(symbol);
				let winSym =pixiLib.getElement("Sprite", "s") ;
				winSym.name="land "+reelId+ " "+position;
				winSym.scale.set(0.45);
				this.addChild(winSym);
				winSym.anchor.set(0.5)
				this.bonusSymbols.push(winSym);

				// var symbol = "s_land";
				// symbol = this.getSymbolName(symbol);
				// let winSym =pixiLib.getElement("Spine", "Land") ;
				// winSym.name="land "+reelId+ " "+position;
				// winSym.scale.set(0.3);
				// this.addChild(winSym);
				// this.bonusSymbols.push(winSym);
				var symbolTopPadding = 0;
				if (this.reelConfig.data.eachReelYPos) {
					symbolTopPadding = this.reelConfig.data.eachReelYPos[reelId];
				}
				var symbolOffset = {x: 0, y: 0};
				if (this.animationConfig[symbol] && this.animationConfig[symbol][0].offset && _viewInfoUtil.isSecondaryAssetsLoaded){
					symbolOffset = this.animationConfig[symbol][0].offset
				}
				if (this.reelConfig.data.eachReelPos && this.reelConfig.data.eachReelPos[reelId] !== undefined) {
					winSym.x = this.reelConfig.data.eachReelPos[reelId] + symbolOffset.x;
				} else {
					winSym.x = this.symConfig.symbolWidth * reelId + (this.symConfig.symbolXGap * reelId) + symbolOffset.x;
				}
				winSym.y = this.symConfig.symbolHeight * (position + 1) + (this.symConfig.symbolYGap * position) + symbolTopPadding + symbolOffset.y;
				winSym.x+=150;
				winSym.y-=165;
				// winSym.state.setAnimation(0, 'animation', false);
				TweenMax.to(winSym.scale,0.8,{
					x:0.55,y:0.55,yoyo:true,repeat:2
				});
						setTimeout(function(){
							this.removeChild(winSym);
							this.cacheID = 100;
							this.cachePos = 100;
				// this.removeChild(s_landAnim);
			}.bind(this), 750);
		}.bind(this), 200)
	}

	};