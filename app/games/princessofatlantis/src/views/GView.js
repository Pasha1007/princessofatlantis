var sView = _ng.SlotView.prototype;


sView.createExtraElements = function () {
	var currentVolume = 0.1;
	_ng.buyFeaturePopupStatus = false;
	/*this.textProperties = {
		"VL": { x: 640 + 30, y: 270 + 80, anchor: { x: 0.5, y: 0.5 }, txtScale: 1 },
		"VP": { x: 360, y: 580, anchor: { x: 0.5, y: 0.5 }, txtScale: 0.9 },
		"VD": { x: 640 + 30, y: 270 + 80, anchor: { x: 0.5, y: 0.5 }, txtScale: 1 }
	}
	_mediator.subscribe("playSpecialGameStateAnimation", this.playRespinAnimation.bind(this));*/

	// if(_viewInfoUtil.isDesktop){
    //     this.panelBaseBg = pixiLib.getRectangleSprite(1280, 100, 0x000000);
    //     this.panelBaseBg.name = "panelBG";
    //     this.stage.addChildAt(this.panelBaseBg, 2);
    //     this.panelBaseBg.y = 620;
    // }
	this.ScatterArray = [];
    this.sizeArray = [0,-150,-175,-200,-225,-250,-275];
    this.sizeArrayPor = [-250,-275,-300,-325,-350,-375]
	_mediator.publish("SHOW_TICKER");
	// _mediator.publish("TotalWin");
    _mediator.subscribe("onGameCreated", this.onGameInitGame.bind(this));
	_mediator.publish("fadeTextsSpinClicked");
	_mediator.subscribe("CreateBuyFreeSpin", this.createBuyFreeSpinPanel.bind(this));
	_mediator.publish("CreateBuyFreeSpin");
	_mediator.subscribe("UpdateBet",this.UpdateBet.bind(this));
	_mediator.subscribe("BuyRequest",this.BuyRequest.bind(this));
	_mediator.subscribe("buyPanelVisible",this.BuyPanelVisible.bind(this));
	_mediator.subscribe("toggleFadeContainer",this.toggleFadeContainer.bind(this));
	_mediator.subscribe("ResizeGview",this.ResizeGview.bind(this));
	// _mediator.subscribe("FSend",this.FSend.bind(this))
;	_mediator.subscribe("enableBuyFeature",this.enableBuyFeature.bind(this));
	_mediator.subscribe("disableBuyFeature",this.disableBuyFeature.bind(this));
	_mediator.subscribe("moveBuyFeature",this.moveBuyFeature.bind(this));
	_mediator.subscribe("bringBackBuyFeature",this.bringBackBuyFeature.bind(this));
	_mediator.subscribe("CreateScatterWinAnim",this.CreateScatterWinAnim.bind(this));
	_mediator.subscribe("sliderFalse",this.sliderFalse.bind(this));
    // _mediator.subscribe("ScatterWinAnim",this.ScatterWinAnim.bind(this));
	_mediator.subscribe("toggleLand",this.toggleLand.bind(this));
	_mediator.subscribe("hideandShowBuyfeature",this.hideandShowBuyfeature.bind(this));

	this.oldSlid=0;
	this.NewSlid=0;
	this.counter = 1;
	
			// commonConfig.isServerTime="true";
			//  _mediator.publish("showClockView")
			const style = {
				align: "center",
				dropShadowAlpha: 0.1,
				dropShadowAngle: 0,
				dropShadowColor: "#8d8777",
				fill: "#f2f2f2",
				fontWeight: "900",
				letterSpacing: 1,
				lineJoin: "round",
				miterLimit: 20,
				stroke: "#533fee",
				strokeThickness: 10,
				trim: true,
				fontSize: 40
			}
			this.fadingContainer = pixiLib.getContainer();
			this.mainContainer.addChild(this.fadingContainer);
			this.fadingContainer.name = "fadingContainer";
		
			this.text1 = pixiLib.getContainer();
			this.txt1 = pixiLib.getElement("Text",style);
			this.txt1.name = "WIN UPTO 5000XBET";
			this.txt1.x=40;
			this.txt1.y=-25;
			
			pixiLib.setText(this.txt1,gameLiterals.winupto);
			this.text1.addChild(this.txt1);
			this.fadingContainer.addChild(this.text1);
			// this.text1.anchor.set(0.5);
			this.text1.scale.set(0.7);
			this.text1.x = 950;this.text1.y = 45;
			this.text1.visible=true;
		
			this.text2 = pixiLib.getContainer();
			this.txt2 = pixiLib.getElement("Text",style);
			this.txt2.name = "SYMBOLS PAY ANYWHERE ON THE SCREEN";
			this.txt2.x=40.;
			this.txt2.y=-25;
			pixiLib.setText(this.txt2,gameLiterals.sympay_any);
			this.text2.addChild(this.txt2);
			this.fadingContainer.addChild(this.text2);
			// this.text2.anchor.set(0.5);
			this.text2.scale.set(0.6);
			this.text2.x = 950;this.text2.y = 45;
			this.text2.visible=false;
			this.txt2.anchor.set(0.5);
		
			this.text3 = pixiLib.getContainer();
			// this.txt3A = pixiLib.getElement("Text",style);
			// this.txt3A.name = "4X";
			// this.txt3A.x=-317;
			// this.txt3A.y=-25;
			// pixiLib.setText(this.txt3A,"4 X");
			// this.text3.addChild(this.txt3A);
		


			this.txt3C = pixiLib.getElement("Text",style);
			this.txt3C.name = "WINS FREESPINS";
			this.txt3C.x= -20;
			this.txt3C.y=-25;
			pixiLib.setText(this.txt3C,gameLiterals.winfree);
			this.text3.addChild(this.txt3C);

			this.txt3B = pixiLib.getElement("Sprite","s");
			this.txt3B.name = "SCATTER";
			this.txt3B.x= -((this.txt3C.width/2)-112);
			this.txt3B.y=5.5;
			this.txt3B.scale.set(0.2);
			this.txt3C.addChild(this.txt3B);

			this.fadingContainer.addChild(this.text3);
			
			// this.text3.anchor.set(0.5);
			this.text3.scale.set(0.7);
			this.text3.x = 30;this.text3.y = 45;
			this.text3.visible=false;
		
			this.text4 = pixiLib.getContainer();
			// this.txt4A = pixiLib.getElement("Text",style);
			// this.txt4A.name = "4X";
			// this.txt4A.x=-800.5;
			// this.txt4A.y=-25;
			// pixiLib.setText(this.txt4A,"3 X");
			// this.text4.addChild(this.txt4A);	
			this.txt4C = pixiLib.getElement("Text",style);
			this.txt4C.name = "WINS EXTRA 5 FREESPINS";
			this.txt4C.x=50;
			this.txt4C.y=-25;
			pixiLib.setText(this.txt4C,gameLiterals.win5extra);  

			this.txt4B = pixiLib.getElement("Sprite","s");
			this.txt4B.name = "SCATTER";
			this.txt4B.x=-((this.txt4C.width/2)-112);;
			this.txt4B.y=0;
			this.txt4B.scale.set(0.2)
			this.txt4C.addChild(this.txt4B);
			
			this.text4.addChild(this.txt4C);
			this.fadingContainer.addChild(this.text4);
			// this.text3.anchor.set(0.5);
			this.text4.scale.set(0.6);
			this.text4.x = 950;this.text4.y = 45;
			this.text4.visible=false;
			//anchor
			this.txt1.anchor.set(0.5);
			// this.txt3A.anchor.set(0.5);
			this.txt3B.anchor.set(0.5);
			this.txt3C.anchor.set(0.5);
			// this.txt4A.anchor.set(0.5);
			this.txt4B.anchor.set(0.5);
			this.txt4C.anchor.set(0.5);


			this.FSend=false;
	function isiPad() {
		return /iPad/i.test(navigator.userAgent);
	}
	if (_viewInfoUtil.viewType === "VD") {
		this.fadingContainer.x = 0;
		this.fadingContainer.y = 0;
		this.text1.x=640;
		this.text2.x=640;
		this.text3.x=686;
		this.text4.x=640;
	}
	else if(_viewInfoUtil.viewType === "VP")
	{
		this.fadingContainer.x = -285;
		this.fadingContainer.y = 200;
		this.text1.x=930;
		this.text2.x=930;
		this.text3.x=861;
		this.text4.x=930;
		this.txt1.x=-400;
		this.txt2.x=-450;
		this.txt3B.x= -((this.txt3C.width/2)-115);
		this.txt3C.x= -280;
		this.txt4B.x= -((this.txt3C.width/2)-10);
		this.txt4C.x= -465;

	}
	else if(_viewInfoUtil.viewType === "VL")
	{
		this.fadingContainer.x = -3;
		this.fadingContainer.y = -2;
		this.text1.x=614;
		this.text2.x=614;
		this.text3.x=614;
		this.text4.x=614;

		this.txt3B.x= -((this.txt3C.width/2)-115);
		this.txt3C.x= 40;
		this.txt4B.x= -((this.txt3C.width/2)-20);
		this.txt4C.x= 75;

	}
	this.resizeForIpad();
	try {
		// var config = _ng.GameConfig.gameTitle[_viewInfoUtil.device];
		// this.gameTitle = pixiLib.getElement("AnimatedSprite", config.image);
		// this.stage.addChildAt(this.gameTitle, config.additionIndex + 1);
		// if (_viewInfoUtil.device === "Desktop") {
		// 	pixiLib.setProperties(this.gameTitle, config.props);
		// } else {
		// 	_ngFluid.call(this.gameTitle, config.props);
		// }
		// //this.gameTitle.play();
		// setInterval(function()
		// {
		// this.gameTitle.gotoAndPlay(0);
		// 	this.gameTitle.play();
		// }.bind(this), 2000);//this.gameTitle.play();
		// this.counter = 0;
		setInterval(() => {
				this.toggleTextVisibility();
		}, 3000);
	} catch (e) { }

	this.volBox=pixiLib.getContainer();
	// this.graBGfrVolumeBar = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth() / 2, h: _viewInfoUtil.getWindowHeight() });
    // this.graBGfrVolumeBar.alpha = 0;
    // this.graBGfrVolumeBar.interactive = true;
    // this.graBGfrVolumeBar.buttonMode = true;
	// this.greyBG.visible = false;
	// this.graBGfrVolumeBar.name ="greyBG for volume";
    // pixiLib.addEvent(this.graBGfrVolumeBar, this.sliderFalse.bind(this));
    // this.mainContainer.addChild(this.graBGfrVolumeBar);
	var blackBg=pixiLib.getRectangleSprite(326,53.5, 0x000000);
	blackBg.x=7;
	blackBg.y=593;
	blackBg.alpha=0.9;
	blackBg.scale.set(0.95,0.6);

	if(_viewInfoUtil.device == 'Mobile') {
		currentVolume = 1;
	} 

	this.slider = new Slider({
		name: "lineValueSlider",
		props: { x: 17.5, y: 610 },
		// dotImage: "volumeSliderHandle_normal",
		dotImage: "asSliderDot",
		BGImage: "VolumeBGSlider",
		FGImage: "VolumeFillSlider",
		isVerticalSlider: false,
		startingValue: 0,
		endValue: 1,
		currentValue: currentVolume,
		toFixedValue: 1, //Value After Decimal, give 0 for integers
		doMultiplier: 100, //Value After Decimal, give 0 for integers
		text: {
			prefix: "",
			postfix: "%",
			attachedToSlider: false,
			props: { x: 270, y: 0, anchor: { y: 0.5, x: 0.5 } },
			textStyle: { fill: 0xffffff, fontSize: 16 }
		},
	
		displayForMinValue: {
			elementConstructor: "text",
			params: {
				props: { x: -35, y: 0, anchor: 0.5 },
				text: "0%",
				textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
			}
		},
	
		displayForMaxValue: {
			elementConstructor: "text",
			params: {
				props: { x: 368, y: 0, anchor: 0.5 },
				text: "100%",
				textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
			}
		},
	  eventToPublish: "settingVolumeChange"
	
	})
		this.slider.name = "SliderTEst"
		this.slider.scale.set(1);
		this.volBox.addChild(blackBg);
		this.volBox.addChild(this.slider);
		this.mainContainer.addChild(this.volBox);
		this.volBox.visible=false;
		this.slider.children[4].visible = false;
		this.slider.children[5].visible = false;
		this.slider.children[2].scale.set(0.7);
		// this.slider.children[0].scale.set(1,0.3);
		// this.slider.children[1].scale.set(0.45,0.7);
		// console.log("volume: "+this.slider.getCurrentIndex());
		_mediator.subscribe("ToggleVolBox",this.ToggleVolPanel.bind(this));
		_mediator.subscribe("SliderMoved",this.SliderMoved.bind(this));
		// _mediator.subscribe("toggleGraybg",this.toggleGraybg.bind(this));
		// _mediator.subscribe("toggleSlider",this.toggleSlider.bind(this));

		this.CreateBrandLogo();

		// this.createTopStripForPromo();

}
// sView.FSend= function()
// {
// 	this.FSend=true;
// }

sView.sliderFalse=function()
{
	// if (this.volBox) {
		this.volBox.visible=false;
		// this.graBGfrVolumeBar.visible = false;
	// }
	// if (this.blackBg) {
		// this.blackBg.visible= false;
	// }
	// if (this.graBGfrVolumeBar) {
		// this.graBGfrVolumeBar.visible = false;	
	// }

}
// sView.toggleGraybg = function(value){
// 	this.graBGfrVolumeBar.visible = value;
// }
// sView.toggleSlider = function(){
// 	// if (this.volBox) {
// 		if (this.volBox.visible == true) {
// 			this.volBox.visible = false;
// 		}
// 		else if(this.volBox.visible == false){
// 			this.volBox.visible = true;
// 		}	
// 	// }
// 	// if (this.blackBg) {
// 		// if (this.blackBg.visible == true) {
// 		// 	this.blackBg.visible = false;
// 		// }
// 		// else if(this.blackBg.visible == false){
// 		// 	this.blackBg.visible = true;
// 		// }	
// 	// }
// }
sView.TweenLogo=function()
{
	TweenMax.to(this.gameTitle,  0.5, {
		width: this.gameTitle.width+10,
		height: this.gameTitle.height+10,
		ease: Linear.easeInOut,
		yoyo : true,
		repeat:-1})
}
sView.CreateBrandLogo=function()
{
	this.BrandLogo=pixiLib.getElement("Sprite","companyLogoBlack");
	this.BrandLogo.name="BrandLogo";
	this.mainContainer.addChild(this.BrandLogo);

	if (_viewInfoUtil.viewType == "VD") {
		this.BrandLogo.scale.set(0.1);
		this.BrandLogo.position.x = 1022;
		this.BrandLogo.position.y = -30;
	}
	else if (_viewInfoUtil.viewType == "VP") {
		this.BrandLogo.scale.set(0.1);
		this.BrandLogo.position.x = 16.5;
		this.BrandLogo.position.y = -30.5;
	}
	else {
		this.BrandLogo.scale.set(0.1);
		this.BrandLogo.position.x = 1018;
		this.BrandLogo.position.y = -27.5;
	}
}
sView.toggleFadeContainer = function(flag){
   this.fadingContainer.visible=flag;
}
sView.resizeForIpad = function(){
	function isiPad() {
		return /iPad/i.test(navigator.userAgent);
	}
	if (isiPad() && _viewInfoUtil.viewType === "VP") {	
		this.fadingContainer.x = -285;
		this.fadingContainer.y = 190;
		this.gameTitle.visible=true;
	}
	else if(isiPad() && _viewInfoUtil.viewType === "VL"){
		this.fadingContainer.x = -10;
		this.fadingContainer.y = -105;
		this.gameTitle.visible=true;
	}
}
sView.resizeFadingContainer = function(){
	if (_viewInfoUtil.viewType === "VD") {
		this.fadingContainer.x = 0;
		this.fadingContainer.y = 0;
	}
	else if(_viewInfoUtil.viewType === "VP")
	{
		this.fadingContainer.x = -285;
		this.fadingContainer.y = 200;
		// this.txt1.x= 925;
		// this.txt2.x=925;
		// this.txt3A.x=-340;
		// this.txt3B.x= -255;
		// this.txt3C.x= 150;
		// this.txt4A.x=-430;
		// this.txt4B.x= -330;
		// this.txt4C.x= 150;
	}
	else if(_viewInfoUtil.viewType === "VL")
	{
		this.fadingContainer.x = -3;
		this.fadingContainer.y = -2;
		// this.txt1.x= 42;
		// this.txt2.x=70;
		// this.txt3A.x=-398;
		// this.txt3B.x= -310;
		// this.txt3C.x= 110;
		// this.txt4A.x=-400;
		// this.txt4B.x= -300;
		// this.txt4C.x= 200;
		
	}
}

sView.toggleTextVisibility = function() {

    let thirdText = coreApp.gameModel.obj.current_round.spin_type !== "freespin" ? this.text3 : this.text4;
    let texts = [this.text1, this.text2, thirdText];
    let currentTextIndex = this.counter % 3;
    
    /* Fade out the visible texts and making one text visible*/
    texts.forEach((text) => {
		if(text.visible == true) {
			TweenMax.to(text, 1.3, { 
				alpha: 0, 
				ease: Power2.easeInOut, 
				onComplete: () => {
					text.visible = false;
					texts[currentTextIndex].visible = true;
					TweenMax.to(texts[currentTextIndex], 1.8, { alpha: 1, ease: Power2.easeInOut });
					this.counter++;
				} 
			});
		}

    });
}



sView.onGameInitGame = function(){
	var multiplier  = (coreApp.gameModel.isFreeSpinActive() == false && coreApp.gameModel.getIsFreeSpinEnded()==false) ? _ng.normalMultiplier : _ng.fsMultiplier;
	_mediator.publish('showMultipler', multiplier);
	if(_viewInfoUtil.viewType=="VD")
	{
		_mediator.publish("SHOW_TICKER_MESSAGE", "tickertext3");
	}
	else
	{
		_mediator.publish("SHOW_TICKER_MESSAGE", "placeurbet_text");
	}

}



sView.gameSpecificOnResize = function () {
	if (this.respinText) {
		pixiLib.setProperties(this.respinText, this.textProperties[_viewInfoUtil.viewType]);
	}

	if (this.BrandLogo) {
	
	
		if (_viewInfoUtil.viewType == "VD") {
			this.BrandLogo.scale.set(0.1);
			this.BrandLogo.position.x = 1022;
			this.BrandLogo.position.y = -30;
		}
		else if (_viewInfoUtil.viewType == "VP") {
			this.BrandLogo.scale.set(0.1);
			this.BrandLogo.position.x = 16.5;
			this.BrandLogo.position.y = -30.5;
		}
		else {
			this.BrandLogo.scale.set(0.1);
			this.BrandLogo.position.x = 1018;
			this.BrandLogo.position.y = -27.5;
		}
	}
}

// sView.createTitle = function () {
// 	try {
// 		var config = _ng.GameConfig.gameTitle[_viewInfoUtil.device];
// 		this.gameTitle = pixiLib.getElement("Sprite", config.image);
// 		this.stage.addChildAt(this.gameTitle, config.additionIndex + 1);
// 		if (_viewInfoUtil.device === "Desktop") {
// 			pixiLib.setProperties(this.gameTitle, config.props);
// 		} else {
// 			_ngFluid.call(this.gameTitle, config.props);
// 		}
// 	} catch (e) { }

// 	this.multiContainer = pixiLib.getContainer();
// 	this.multiContainer.x = 251;
// 	this.multiContainer.y = 40;
// 	this.padding = 5;
// 	//win multiplier
// 	this.mulit1 = pixiLib.getElement("Sprite", "1X");
// 	this.mulit1.snd = _sndLib.sprite.multiplierx1Appear;
// 	this.multiContainer.addChild(this.mulit1);

// 	this.mulit2 = pixiLib.getElement("Sprite", "2X");
// 	this.mulit2.snd = _sndLib.sprite.multiplierx2Appear;
// 	this.multiContainer.addChild(this.mulit2);
// 	this.mulit2.x = this.mulit1.x + this.mulit1.width + this.padding;

// 	this.mulit3 = pixiLib.getElement("Sprite", "3X");
// 	this.mulit3.snd = _sndLib.sprite.multiplierx3Appear;
// 	this.multiContainer.addChild(this.mulit3);
// 	this.mulit3.x = this.mulit2.x + this.mulit1.width + this.padding;

// 	this.mulit4 = pixiLib.getElement("Sprite", "4X");
// 	this.mulit4.snd = _sndLib.sprite.multiplierx4Appear;
// 	this.multiContainer.addChild(this.mulit4);
// 	this.mulit4.x = this.mulit3.x + this.mulit1.width + this.padding;

// 	this.mulit5 = pixiLib.getElement("Sprite", "5X");
// 	this.mulit5.snd = _sndLib.sprite.multiplierx5Appear;
// 	this.multiContainer.addChild(this.mulit5);
// 	this.mulit5.x = this.mulit4.x + this.mulit1.width + this.padding;

// 	let colorMatrix = new PIXI.filters.ColorMatrixFilter();
// 	colorMatrix.greyscale(1, true);
// 	this.mulit5.filters = [colorMatrix];

// 	this.stage.addChild(this.multiContainer);
// 	this.multiContainer.visible = false;
// }

sView.showMultiplier = function () {
	this.multiContainer.visible = true;
	this.gameTitle.visible = false;
}
sView.updateMultiplier = function (id) {
	this.multiContainer.visible = true;

}
sView.hideMultiplier = function () {
	this.multiContainer.visible = false;
	this.gameTitle.visible = true;
}
sView.createBuyFreeSpinPanel = function(){


	this.grayBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
    this.grayBg.alpha = 0.6;
	this.grayBg.x=-150
	this.grayBg.y=-150 
	this.grayBg.scale.set(10);
    this.grayBg.interactive = true;
	this.grayBg.visible = false;
   this.mainContainer.addChild(this.grayBg);
   pixiLib.addEvent(this.grayBg, function(){
	// this.hideBuyFeature();
}.bind(this));
	this.BuyPanelCon = pixiLib.getContainer();
	this.BuyPanelCon.name = "buyPanelContainer"
	if (_viewInfoUtil.viewType === "VD") {
		this.BuyPanelCon.x = 1025;
		this.BuyPanelCon.y = 180;
	}
	else if(_viewInfoUtil.viewType === "VP")
	{

		this.BuyPanelCon.x = 283;
		this.BuyPanelCon.y = 432;
		this.BuyPanelCon.visible = false;
	}
	else
	{
		this.BuyPanelCon.visible = true;
		this.BuyPanelCon.x = 463;
		this.BuyPanelCon.y = 91;
	}
	this.mainContainer.addChild(this.BuyPanelCon);
	var style = {
		"dropShadow": true,
		"dropShadowColor": "#ef0aff",
    "fill": "#ffffff",
    "fontFamily": "Arial",
    "fontSize": 35,
    "fontWeight": "bolder",
    "letterSpacing": 3,
    "lineJoin": "bevel",
    "miterLimit": 18,
    "stroke": "#ae379f",
    "strokeThickness": 4     
	}
	var bet_style = {
	"dropShadow": true,
		"dropShadowColor": "#ef0aff",
    "fill": "#ffffff",
    "fontFamily": "Arial",
    "fontSize": 35,
    "fontWeight": "bolder",
    "letterSpacing": 3,
    "lineJoin": "bevel",
    "miterLimit": 18,
    "stroke": "#ae379f",
    "strokeThickness": 4     
	}
	var styledb = {
		"dropShadow": true,
		"dropShadowColor": "#800020",
    "fill": "#ffffff",
	"align":"center",
    "fontFamily": "Arial",
    "fontSize": 20,
    "fontWeight": "bolder",
    "letterSpacing": 3,
    "lineJoin": "bevel",
    "miterLimit": 18,
    "stroke": "#800020",
    "strokeThickness": 4     
	}
	var buy_styleamt = {
		 "type": "BitmapFont",
        		"fontName": "buyPanel_font",
        		"fontSize": 40,
        		"align": "center",
	}

	var bet_styleamt = {
    		 "type": "BitmapFont",
            		"fontName": "buyPanel_font",
            		"fontSize": 13,
            		"align": "center",
    	}

	this.BuyBtn = pixiLib.getButton("buy_btn");
	if (_viewInfoUtil.viewType === "VD") {
		this.BuyBtn.x = -895;
		this.BuyBtn.y = 10;
		this.BuyBtn.scale.set(0.3);
		this.BuyBtn.anchor.set(0.5);
	}
	else if(_viewInfoUtil.viewType === "VP")
	{
		this.BuyBtn.x = -74.5
		this.BuyBtn.y = 185;
		this.BuyBtn.scale.set(0.9);
		this.BuyBtn.anchor.set(0.5);
	}
	else
	{
		this.BuyBtn.x = -315;
		this.BuyBtn.y = 110;
		this.BuyBtn.scale.set(0.35);
		this.BuyBtn.anchor.set(0.5);
	}
	this.BuyFeatureTxt = pixiLib.getElement("Sprite","buy_text");
	this.BuyFeatureTxt.x=-255;
	this.BuyFeatureTxt.y=-165;
	this.BuyFeatureTxt.scale.set(2.5);
//	pixiLib.setText(this.BuyFeatureTxt, gameLiterals.buyfeature)
	this.BuyBtn.addChild(this.BuyFeatureTxt);
	
	pixiLib.addEvent(this.BuyBtn, function(){
		_ng.buyFeaturePopupStatus = true;
		_sndLib.play(_sndLib.sprite.btnClick);
		TweenMax.to(this.BuyBtn, 0.06, {
				width: this.BuyBtn.width-15,
				height: this.BuyBtn.height-15,
				ease: Linear.easeInOut,
				yoyo : true,
				repeat:1,
				onComplete : function(){
					this.BuyRequest();
		            //  if(_viewInfoUtil.viewType !== "VD"){
					// }
				}.bind(this)
			});
	}.bind(this));
	this.BuyPanelCon.addChild(this.BuyBtn);

	

	this.amtTxt = pixiLib.getElement("Text",buy_styleamt);
	this.amtTxt.x=0;
	this.amtTxt.y=75;
	this.BuyBtn.addChild(this.amtTxt);
	this.amtTxt.anchor.set(0.5);

	this.twoXBetBg = pixiLib.getButton("bet_btn");

	if (_viewInfoUtil.viewType === "VD") {
		this.twoXBetBg.x = -895;
		this.twoXBetBg.y = 250;
		this.twoXBetBg.scale.set(0.8)
		this.twoXBetBg.anchor.set(0.5);
	}
	else if(_viewInfoUtil.viewType === "VP")
	{

		this.twoXBetBg.x = 237.5;
		this.twoXBetBg.y = 185;
		this.twoXBetBg.scale.set(0.9)
		this.twoXBetBg.anchor.set(0.5);
	}
	else
	{
		this.twoXBetBg.x = -315;
		this.twoXBetBg.y = 360;
		this.twoXBetBg.scale.set(0.9)
		this.twoXBetBg.anchor.set(0.5);
	}
	this.BuyPanelCon.addChild(this.twoXBetBg);

	this.twoxbetTxt = pixiLib.getElement("Sprite","bet_text");
	this.twoxbetTxt.x=0;
	this.twoxbetTxt.y=-20;
	this.twoxbetTxt.scale.set(1);
	this.twoxbetTxt.anchor.set(0.5)
//	pixiLib.setText(this.twoxbetTxt, gameLiterals.bet_text)
	this.twoXBetBg.addChild(this.twoxbetTxt);
//	this.twoxchanceTxt = pixiLib.getElement("Text",styledb);
//	this.twoxchanceTxt.x=0;
//	this.twoxchanceTxt.y=20;
//	this.twoxchanceTxt.anchor.set(0.5)

//	pixiLib.setText(this.twoxchanceTxt, gameLiterals.twoxchancetxt)
//	this.twoXBetBg.addChild(this.twoxchanceTxt);
	this.twoxbetamt = pixiLib.getElement("Text",bet_styleamt);
	this.twoxbetamt.x=0
	this.twoxbetamt.y=-83
	this.twoxbetamt.scale.set(1);
	this.twoxbetamt.anchor.set(0.5);
	pixiLib.setText(this.twoxbetamt,"$2.8");
	this.twoXBetBg.addChild(this.twoxbetamt)

	this.offIcon = pixiLib.getElement("Sprite","on_icon");
	this.offIcon.x=-27
	this.offIcon.y=-0.5
	this.offIcon.scale.set(1)
	
	this.tickOn = pixiLib.getElement("Sprite","tick_icon");
	this.tickOn.x=27
	this.tickOn.y=0.5
	this.tickOn.scale.set(1);
	this.twoxOn = pixiLib.getElement("Sprite","on");
	this.twoxOn.x=0
	this.twoxOn.y=110
	this.twoxOn.scale.set(1)
	this.twoxOn.interactive = true;
	this.twoxOn.buttonMode = true;
	this.twoxHeight=this.twoXBetBg.height;
	this.twoxWidth=this.twoXBetBg.width;
	pixiLib.addEvent(this.twoxOn, function(){
		_sndLib.play(_sndLib.sprite.btnClick);
		TweenMax.to(this.twoXBetBg, 0.06, {
			width: this.twoxWidth-15,
			height: this.twoxHeight-15,
			ease: Linear.easeInOut,
			yoyo : true,
			repeat:1,
			onComplete : function(){
			this.twoXBetBg.width=this.twoxWidth;
			this.twoXBetBg.height=this.twoxHeight;
			this.twoxoff.visible = true;
			pixiLib.setInteraction(this.BuyBtn,true);
		    this.BuyBtn.alpha = 1;
		    _ng.twoXBetEnabled = false;
			_mediator.publish("updateTotalBet");
			}.bind(this)
		});
	}.bind(this)
);
this.twoXBetBg.addChild(this.twoxOn);
this.twoxOn.addChild(this.tickOn);
	this.twoxoff = pixiLib.getElement("Sprite","off")
	this.twoxoff.x=0
	this.twoxoff.y=110
	this.twoxoff.scale.set(1)
	this.twoxoff.interactive = true;
	this.twoxoff.buttonMode = true;
	pixiLib.addEvent(this.twoxoff, function(){
		TweenMax.to(this.twoXBetBg, 0.06, {
			width: this.twoxWidth-15,
			height: this.twoxHeight-15,
			ease: Linear.easeInOut,
			yoyo : true,
			repeat:1,
			onComplete : function(){
				this.twoxoff.visible = false;
				pixiLib.setInteraction(this.BuyBtn,false);
		        this.BuyBtn.alpha = 0.7;
				_mediator.publish("updateTwoxbet");
		        _ng.twoXBetEnabled = true;
			}.bind(this)
		});
	}.bind(this)
    );
	this.twoXBetBg.addChild(this.twoxoff);
	this.twoxoff.addChild(this.offIcon);

	pixiLib.addEvent(this.twoXBetBg, function () {
		if (_ng.twoXBetEnabled == false) {
			_sndLib.play(_sndLib.sprite.btnClick);
			TweenMax.to(this.twoXBetBg, 0.06, {
				width: this.twoxWidth - 15,
				height:this.twoxHeight - 15,
				ease: Linear.easeInOut,
				yoyo: true,
				repeat: 1,
				onComplete: function () {
					this.twoxoff.visible = false;
					pixiLib.setInteraction(this.BuyBtn, false);
					this.BuyBtn.alpha = 0.7;
					_mediator.publish("updateTwoxbet");
					_ng.twoXBetEnabled = true;
				}.bind(this)
			});
		}
		else {
			_sndLib.play(_sndLib.sprite.btnClick);
			TweenMax.to(this.twoXBetBg, 0.06, {
				width: this.twoxWidth - 15,
				height: this.twoxHeight - 15,
				ease: Linear.easeInOut,
				yoyo: true,
				repeat: 1,
				onComplete: function () {
					this.twoxoff.visible = true;
					pixiLib.setInteraction(this.BuyBtn, true);
					this.BuyBtn.alpha = 1;
					_ng.twoXBetEnabled = false;
					_mediator.publish("updateTotalBet");
				}.bind(this)
			});
		}
	}.bind(this),
	)
	if(coreApp.gameModel.obj.previous_round){
        pixiLib.setText(this.amtTxt,pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value*coreApp.gameModel.spinData.buyfg));
	pixiLib.setText(this.twoxbetamt,pixiLib.getFormattedAmount(coreApp.gameModel.obj.previous_round.coin_value*coreApp.gameModel.spinData.antebet));
	}
    else{
		pixiLib.setText(this.amtTxt,"$"+100);
	}
}
sView.toggleLand=function()
{
	if (_ng.twoXBetEnabled == true) {
		// _sndLib.play(_sndLib.sprite.btnClick);
		TweenMax.to(this.twoXBetBg, 0.06, {
			width: this.twoxWidth - 15,
			height: this.twoxHeight - 15,
			ease: Linear.easeInOut,
			yoyo: true,
			repeat: 1,
			onComplete: function () {
				this.twoxoff.visible = false;
				pixiLib.setInteraction(this.BuyBtn, false);
				this.BuyBtn.alpha = 0.7;
			
			}.bind(this)
		});
	}
	else {
		// _sndLib.play(_sndLib.sprite.btnClick);
		TweenMax.to(this.twoXBetBg, 0.06, {
			width: this.twoxWidth - 15,
			height:this.twoxHeight- 15,
			ease: Linear.easeInOut,
			yoyo: true,
			repeat: 1,
			onComplete: function () {
				this.twoxoff.visible = true;
				pixiLib.setInteraction(this.BuyBtn, true);
				this.BuyBtn.alpha = 1;
			
			}.bind(this)
		});
	}
}
sView.UpdateBet=function(value)
{
	this.Updatevalue = value;
	if(coreApp.lang == "tr"){
		_mediator.publish("BuyFreeSpinPopup_tur",value,false);	
		pixiLib.setText(this.amtTxt,pixiLib.getFormattedAmount(value*coreApp.gameModel.spinData.buyfg));

	}
	else{
		_mediator.publish("BuyFreeSpinPopup",value,false);	
		pixiLib.setText(this.amtTxt,pixiLib.getFormattedAmount(value*coreApp.gameModel.spinData.buyfg));

	}

	if(coreApp.lang == "en"){
		_mediator.publish("BuyFreeSpinPopup",value,false);
		pixiLib.setText(this.amtTxt,pixiLib.getFormattedAmount(value*coreApp.gameModel.spinData.buyfg));

	}
//----------------------------------------------------------------
	var bet = value*coreApp.gameModel.spinData.antebet;
	pixiLib.setText(this.twoxbetamt,pixiLib.getFormattedAmount(bet))
	_mediator.publish("ChangeWinValues",value);
	_mediator.publish("updatePanelfs",value);
	
	
}
sView.BuyRequest = function(){
	//Need code review
	if(_viewInfoUtil.viewType=="VP"){
		_mediator.publish("hideandShowBuyfeature",false);
	}
	if(_viewInfoUtil.viewType=="VD")
		{
	_mediator.publish("ToggleSpin",false);
	_mediator.publish("setSpaceBarEvent", "idle");
		}
		else if(_viewInfoUtil.viewType=="VP" || _viewInfoUtil.viewType=="VL")
			{
				_mediator.publish("showMobPanel");
				_mediator.publish("ToggleSpin",false);
				_mediator.publish("ToggleMobPanel",false);
			}
	//_mediator.publish("BuyFreeSpinPopup",this.Updatevalue,true);
	if(coreApp.lang == "tr"){
		_mediator.publish("BuyFreeSpinPopup_tur",this.Updatevalue,true);
		console.log("turkish?");
	}

	else if(coreApp.lang == "en"){
		_mediator.publish("BuyFreeSpinPopup",this.Updatevalue,true);
		console.log("englsh?");

	}


	_mediator.publish("createTotalBetSelector");    //for buy feature bet selector
	// _mediator.publish("hideandShowBuyfeature",false);    //disable buy feature button after clicking on it.
	_mediator.publish("disableBuyFeature");

}
sView.BuyPanelVisible = function(){
	this.BuyPanelCon.visible = true;
	this.grayBg.visible = true;
}

sView.ToggleVolPanel=function(directlyClose){
	if (directlyClose == false) {
		this.volBox.visible = directlyClose;
		// this.graBGfrVolumeBar.visible = false;
	}
	else{
		this.volBox.visible = ! this.volBox.visible;
		if (this.volBox.visible == false) {
			// this.graBGfrVolumeBar.visible = false;
		}
		else{
			// this.graBGfrVolumeBar.visible = true;
		}
	}

// this.volBox.visible=bool;
// if(bool)
// 	this.slider.setValue(_sndLib.previousVolume);

// if(bool)
// 	{
// 		this.oldSlid=this.slider.getSliderValue();
// 	}
// 	else{
// 		this.NewSlid=this.slider.getSliderValue();
// 	}
// _sndLib.setPreviousVolume(_sndLib.curVolume);
}

sView.SliderMoved=function()
{
	var bool;
	if(this.oldSlid==this.NewSlid)
		{
			_mediator.publish("boolSlid",false);
		}
		else{
			_mediator.publish("boolSlid",true);
		}
}
// sView.BuyFsinVL = function(){
// 	this.BuyBtnVL = pixiLib.getButton("landscape_buy_free_spin");
// 	this.BuyBtnVL.x = -11
// 	this.BuyBtnVL.y = 7
// 	if (_viewInfoUtil.viewType === "VL") {
// 		this.BuyBtnVL.x = 30;
// 		this.BuyBtnVL.y = 435;
// 		this.BuyBtnVL.scale.set(0.6);
// 	}
// 	else
// 	{
// 		this.BuyBtnVL.visible=false;
// 	}
// 	this.mainContainer.addChild(this.BuyBtnVL);
// 	pixiLib.addEvent(this.BuyBtnVL, function(){
// 		this.BuyPanelVisible();
// 	}.bind(this)
//     );
// }
sView.ResizeGview = function(){
	this.resizeFadingContainer();
	this.resizeForIpad();
	
	// if (_viewInfoUtil.viewType === "VL"){
	// _mediator.publish("hideMobPanel")}
	if(this.BuyBtnVL){
		if (_viewInfoUtil.viewType === "VL") {
			this.BuyBtnVL.x = 30;
		    this.BuyBtnVL.y = 435;
			this.BuyBtnVL.scale.set(0.6);
			this.BuyBtnVL.visible=true;
		}
		else
		{
			this.BuyBtnVL.visible=false;
		}
	}
	if(this.BuyPanelCon){
		if (_viewInfoUtil.viewType === "VD") {
			this.BuyPanelCon.x = 45;
			this.BuyPanelCon.y = 206;
		}
		else if(_viewInfoUtil.viewType === "VP")
		{
	
			this.BuyPanelCon.x = 283;
			this.BuyPanelCon.y = 432;
			this.BuyPanelCon.visible = false;
		}
		else
		{
			this.BuyPanelCon.visible = true;
			this.BuyPanelCon.x = 430;
			this.BuyPanelCon.y = 91;
			var xRatio = _viewInfoUtil.getWindowWidth() / _ng.GameConfig.gameLayout[_viewInfoUtil.viewType].width;
        	var yRatio = _viewInfoUtil.getWindowHeight() / _ng.GameConfig.gameLayout[_viewInfoUtil.viewType].height;

        	var scaleFactor = Math.min(xRatio, yRatio);
			var negativePadding =  (2.5- (xRatio / scaleFactor));
			this.BuyPanelCon.x = 300 * negativePadding;// + (this.BuyPanelCon.width * (xRatio - scaleFactor)) / 2;

		}

	}

	if(this.BuyBtn){
		if (_viewInfoUtil.viewType === "VD") {
			this.BuyBtn.x = 89;
		    this.BuyBtn.y = 76;

		    this.BuyBtn.scale.set(0.7);
		    this.BuyBtn.anchor.set(0.5);
		}
		else if(_viewInfoUtil.viewType === "VP")
		{
			this.BuyBtn.x = -194.5;
			this.BuyBtn.y = 98.5;
			this.BuyBtn.scale.set(0.9);
		}
		else
		{
			this.BuyBtn.x = -315;
			this.BuyBtn.y = 110;
			this.BuyBtn.scale.set(0.35);
		}
	}
	if(this.twoXBetBg){
		if (_viewInfoUtil.viewType === "VD") {
			this.twoXBetBg.x = 127;
			this.twoXBetBg.y = 240;
			this.twoXBetBg.scale.set(0.7)
			this.twoXBetBg.anchor.set(0.5);
		}
		else if(_viewInfoUtil.viewType === "VP")
		{
	
			this.twoXBetBg.x = 237.5;
			this.twoXBetBg.y = 185;
			this.twoXBetBg.scale.set(0.9)
			this.twoXBetBg.anchor.set(0.5);
		}
		else
		{
			this.twoXBetBg.x = -315;
			this.twoXBetBg.y = 360;
			this.twoXBetBg.scale.set(0.9)
			this.twoXBetBg.anchor.set(0.5);
		}
	}
	if ( coreApp.gameView.infoPopup.BuypopupPanelCon && coreApp.gameView.infoPopup.returnPopupStatus().visible == true) {
		_mediator.publish("hideandShowBuyfeature",false);
	}
	else if (coreApp.gameView.infoPopup.BuypopupPanelCon && coreApp.gameView.infoPopup.returnPopupStatus().visible == false) {
		_mediator.publish("hideandShowBuyfeature",true);
	}
}
// sView.hideBuyFeature = function(){
// 	this.BuyPanelCon.visible=false;
// 	this.grayBg.visible = false;

// }
sView.disableBuyFeature = function(){
	this.BuyPanelCon.alpha=.7;

	pixiLib.setInteraction(this.BuyBtn,false);
	pixiLib.setInteraction(this.twoxoff,false);
	pixiLib.setInteraction(this.twoxOn,false);
	pixiLib.setInteraction(	this.twoXBetBg,false);
	_mediator.publish("disablePanelFs");
	// this.BuyBtn.interactive = false;
	// this.twoxoff.interactive = false;

}
sView.enableBuyFeature = function(){
	if(coreApp.gameModel.isAutoSpinActive()){
		// _mediator.publish("disableBuyFeature");
		if(_ng.twoXBetEnabled==true){
			// this.BuyPanelCon.alpha=1;
			pixiLib.setInteraction(this.BuyBtn,false);
			// pixiLib.setInteraction(this.twoxoff,true);
			// pixiLib.setInteraction(this.twoxOn,true);
			// pixiLib.setInteraction( this.twoXBetBg,true);
			_mediator.publish("enabledPanelFs");
		}
		else{
		this.BuyPanelCon.alpha=0.7;
		//this.BuyBtn.alpha=0.4;
		pixiLib.setInteraction(this.BuyBtn,false);
		pixiLib.setInteraction(this.twoxoff,false);
        pixiLib.setInteraction(this.twoxOn,false);
        pixiLib.setInteraction( this.twoXBetBg,false);
		_mediator.publish("enabledPanelFs");
		}
	}
    else if(_ng.twoXBetEnabled==true){
        this.BuyPanelCon.alpha=1;
        pixiLib.setInteraction(this.BuyBtn,false);
        pixiLib.setInteraction(this.twoxoff,true);
        pixiLib.setInteraction(this.twoxOn,true);
        pixiLib.setInteraction( this.twoXBetBg,true);
		_mediator.publish("enabledPanelFs");
    }
	else if(coreApp.gameModel.isFreeSpinActive()){
		_mediator.publish("disableBuyFeature");
	}
    else{
        this.BuyPanelCon.alpha=1;
		this.BuyBtn.alpha=1;
        pixiLib.setInteraction(this.BuyBtn,true);
        pixiLib.setInteraction(this.twoxoff,true);
        pixiLib.setInteraction(this.twoxOn,true);
        pixiLib.setInteraction( this.twoXBetBg,true);
        _mediator.publish("enabledPanelFs");
    }
}
sView.moveBuyFeature = function(){
	_mediator.publish("visiblityTotalWin",true);
	// _mediator.publish("ToggleTurbo",false);
	
	if(_viewInfoUtil.viewType === "VD"){
		TweenMax.to(this.BuyPanelCon, 0.8, {
			x: this.BuyPanelCon.x-1000,
			ease: Linear.easeInOut,
		});
	}
	else if(_viewInfoUtil.viewType === "VL"){
		TweenMax.to(this.BuyPanelCon, 0.8, {
			x: this.BuyPanelCon.x-1000,
			ease: Linear.easeInOut,
		});
	}
	else{
		_mediator.publish("moveVisiblebuyFeature",false);
	}
}
sView.bringBackBuyFeature = function(){
	// _mediator.publish("ToggleTurbo",true);
	_mediator.publish("visiblityTotalWin",false);
	
	if(_viewInfoUtil.viewType === "VD"){
		TweenMax.to(this.BuyPanelCon, 0.8, {
			x: 1025,
			ease: Linear.easeInOut,
		});
	}
	else if(_viewInfoUtil.viewType === "VL"){
		TweenMax.to(this.BuyPanelCon, 0.8, {
			x: 430,
			ease: Linear.easeInOut,
		});
	}
	else{
		_mediator.publish("moveVisiblebuyFeature",true);
	}
}

sView.CreateScatterWinAnim = function(){
	// this.scatBg = pixiLib.getShape("rect", { w: _viewInfoUtil.getWindowWidth(), h: _viewInfoUtil.getWindowHeight() });
	// this.scatBg.alpha = 0.8;
	// this.scatBg.x=-150
	// this.scatBg.y=-150 
	// this.scatBg.scale.set(10);
	// this.stage.addChild(this.scatBg);
	// this.scatFillAnim=pixiLib.getElement("AnimatedSprite", { "prefix": "skeleton-animation_", "startIndex": "1", "endIndex": "56", "digit": "dual", "loop": false, "animationSpeed": "0.25", "type": "spriteAnimation" })

	if (_viewInfoUtil.viewType === "VD") {
		this.scatFillAnim=pixiLib.getElement("Spine","Dolphine");
		this.scatFillAnim.state.setAnimation(0,'transition',false);
		this.scatFillAnim.scale.set(0.67);
		this.scatFillAnim.x = 640;
		this.scatFillAnim.y = 360;
	}
	else if (_viewInfoUtil.viewType === "VP") {
		this.scatFillAnim=pixiLib.getElement("Spine","Dolphine")
		this.scatFillAnim.state.setAnimation(0,'transition_portrait',false);
		// this.scatFillAnim.scale.set(0.5);
		if(_viewInfoUtil.isIpad())
			{
				this.scatFillAnim.scale.set(0.8);
			}
			else{
			this.scatFillAnim.scale.set(0.75);
			}		
		// this.scatFillAnim.scale.set(0.67,1.55);
		this.scatFillAnim.x = _viewInfoUtil.getWindowWidth()/2;
		this.scatFillAnim.y = _viewInfoUtil.getWindowHeight()-510;
	}
	else if (_viewInfoUtil.viewType === "VL") {
		this.scatFillAnim=pixiLib.getElement("Spine","Dolphine");
		this.scatFillAnim.state.setAnimation(0,'transition',false);
		if(_viewInfoUtil.isIpad())
		{
			this.scatFillAnim.scale.set(1);
			this.scatFillAnim.x = _viewInfoUtil.getWindowWidth()/2;
            this.scatFillAnim.y = _viewInfoUtil.getWindowHeight()-500;
		}
		else{
		this.scatFillAnim.scale.set(0.65);
		this.scatFillAnim.x = _viewInfoUtil.getWindowWidth()/2;
        this.scatFillAnim.y = _viewInfoUtil.getWindowHeight()/2;



		}

	}
	_sndLib.play(_sndLib.sprite.scatter_Open);

	// this.scatFillAnim.play();
	this.stage.addChild(this.scatFillAnim);

setTimeout(function(){
	this.stage.removeChild(this.scatFillAnim);
}.bind(this),2500)
// _mediator.publish("setSpaceBarEvent", "onFSContinueClick");
}

sView.hideandShowBuyfeature = function(bool){
	if (_viewInfoUtil.viewType == "VP") {
		_mediator.publish("moveVisiblebuyFeature",bool);	
	}
	else{
		if(coreApp.gameModel.isAutoSpinActive() != true)
			this.BuyPanelCon.visible = bool;
	}
	if (_viewInfoUtil.viewType == "VL") {
		this.BuyPanelCon.visible = true;
	}
}




 



