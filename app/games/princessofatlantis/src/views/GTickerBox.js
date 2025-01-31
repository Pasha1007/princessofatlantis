var GTicker =  TickerBox.prototype;
GTicker.createView = function () {
    this.tickerConfig = _ng.GameConfig.tickerConfig;
    this.ticker = pixiLib.getElement("Sprite", this.tickerConfig.bg);
    if (_viewInfoUtil.viewType == "VD") {
        coreApp.gameView.panelContainer.children[0].children[18].addChild(this.ticker); 
    }
    else{
        coreApp.gameView.panelContainer.addChild(this.ticker);
    }
    this.tickerText = pixiLib.getElement("Text", this.tickerConfig.msgText.textStyle);
    this.tickerText.anchor.set(0.5, 0.5);
    this.ticker.name = "TickerConfig";
    this.ticker.addChild(this.tickerText);
    this.tickerText.name = "ticker1";
    // if(coreApp.lang =="en")
    // {
    //     this.tickerText.y = 0;

    // }else{
    //    // this.tickerText = 16;

    // }

    
    this.tickerTextNew = pixiLib.getElement("Text", this.tickerConfig.msgText.textStyleNew);
    this.tickerTextNew.anchor.set(0.5, 0.5);
    this.ticker.addChild(this.tickerTextNew);
    this.tickerTextNew.x = 0; this.tickerTextNew.y = 30;
    this.tickerTextNew.name = "ticker2";
    
    this.symbol = pixiLib.getElement("Sprite","");
    this.ticker.addChild(this.symbol);
    this.symbol.anchor.set(0.5,0.5);
    this.symbol.scale.set(0.1);
    this.symbol.x=  -35; this.symbol.y = 33;
    this.symbol.name = "BurstSymbol";
    // this.symbol.visible = t;
    // pixiLib.setText(this.tickerTextNew, "FreeSpins Left : 10")


    // _ngFluid.call(this, this.tickerConfig.params);
    this.onTickerResize();
    if(_ng.GameConfig.tickerConfig.hasMGTicker){
        let msg = _ng.GameConfig.tickerConfig.launchMsg ? pixiLib.getLiteralText(_ng.GameConfig.tickerConfig.launchMsg): _ng.GameConfig.tickerConfig.idleTickerMsg[0]; 
        this.showMessage(msg);
    }else{
        this.hide();
    }
    _mediator.subscribe("showNewMessage",this.showNewMessage.bind(this));
    _mediator.subscribe("onTickerResize",this.onTickerResize.bind(this));
    _mediator.subscribe("updateSymbol",this.updateSymbol.bind(this));
    _mediator.subscribe("updateTickerPosVp",this.updateTickerPosVp.bind(this));
};
GTicker.showIdleMessage = function(){
    if(!coreApp.gameModel.isFreeSpinActive()){
        var num=pixiLib.getRandomNumber(0,3);
        // console.log("Here are the numbers: " +num);
        if(num<1)
        {
            var msg = pixiLib.getLiteralText("placeurbet_text");
        }
        else if (num<2 && _viewInfoUtil.viewType=="VD")
        {
            var msg = pixiLib.getLiteralText("tickertext3");
            // msg.anchor.set(0.5);
            // msg.x = container.width / 2;
            // msg.y = container.height / 2;

        }
        else{
            var msg = pixiLib.getLiteralText("spinwin_text");
        }
        pixiLib.setText(this.tickerText, _ng.GameConfig.tickerConfig.idleTickerMsg ? _ng.GameConfig.tickerConfig.idleTickerMsg : msg);


        
        // if(_ng.GameConfig.tickerConfig.idleTickerMsg){
        //     let msg = this.getRandomMsg();
        //     pixiLib.setText(this.tickerText, msg);
        // }else{
        //     pixiLib.setText(this.tickerText, msg);
        // }
    }
};
GTicker.showMessage = function (msgStr) {
    pixiLib.setText(this.tickerText, msgStr);
    // let parts = msgStr.split(' ');
    // this.tickerText.removeChildren();
    // let cumulativeX = 0;
    // parts.forEach((part, index) => {
    //     let textStyle = this.tickerConfig.msgText.textStyle; 
    //     if (index === 0) {
    //         textStyle = { ...textStyle, fill: 0x87CEEB };
    //     }

    //     let textObject = new PIXI.Text(part, textStyle);
    //     textObject.anchor.set(0.5,0.5);
    //     textObject.x = cumulativeX;
    //     cumulativeX += textObject.width + 5; // Adjust for spacing between words
    //     this.tickerText.addChild(textObject);
    // });
};

GTicker.onSpinClick = function(){
    if(_ng.GameConfig.tickerConfig.spinClickMsg){
        pixiLib.setText(this.tickerText, _ng.GameConfig.tickerConfig.spinClickMsg);
    }else{
        pixiLib.setText(this.tickerText, "goodluck_text");
    }
}

GTicker.showNewMessage = function(str){
    pixiLib.setText(this.tickerTextNew, str);
}
GTicker.updateTextWithCountUp = function(endValue, totalTime, obj){
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
GTicker.onTickerResize = function (argument) {
    function isiPad() {
		return /iPad/i.test(navigator.userAgent);
	}
    const isDeviceIpad = isiPad();
    if (this.ticker) {
        if (isDeviceIpad == true) {
            if(_viewInfoUtil.viewType == "VL") {
                this.ticker.x = (_viewInfoUtil.getWindowWidth() / 2) + 15; this.ticker.y = _viewInfoUtil.getWindowHeight()-50;
                this.ticker.scale.set(1);
            }
            else if(_viewInfoUtil.viewType == "VP"){
                this.ticker.x = _viewInfoUtil.getWindowWidth() / 2; this.ticker.y = coreApp.gameView.panelContainer.children[12].y + 120;
                this.ticker.scale.set(1);
            }
        }
        else{
            this.ticker.anchor.set(0.5);
            if (_viewInfoUtil.viewType == "VD") {
                this.ticker.x = 175; this.ticker.y = 35;
            } else if(_viewInfoUtil.viewType == "VL") {
                this.ticker.scale.set(0.5);
                // const posX = coreApp.gameView.panelContainer.children[7].width - 100;
                this.ticker.x = (_viewInfoUtil.getWindowWidth() / 2) + 15; this.ticker.y = _viewInfoUtil.getWindowHeight()-32;
            }
            else if(_viewInfoUtil.viewType == "VP"){
                this.ticker.scale.set(0.5);
                this.ticker.x = _viewInfoUtil.getWindowWidth() / 2; this.ticker.y = coreApp.gameView.panelContainer.children[12].y + 85;
            }
        }
    }
}
GTicker.updateSymbol = function(symbolName){
    pixiLib.setTexture(this.symbol, symbolName);
}
GTicker.updateTickerPosVp = function(value){
    function isiPad() {
		return /iPad/i.test(navigator.userAgent);
	}
    const isDeviceIpad = isiPad();
    if (_viewInfoUtil.viewType == "VP") {
        if (value == false) {
            if (isDeviceIpad == true) {
                this.ticker.y = coreApp.gameView.panelContainer.children[12].y + 60;
                this.ticker.scale.set(1.4);
            }
            else{
                this.ticker.y = coreApp.gameView.panelContainer.children[12].y + 50;
                this.ticker.scale.set(0.8);
            }
            }
        else{
            if (isDeviceIpad == true) {
                this.ticker.y = coreApp.gameView.panelContainer.children[12].y + 120;
                this.ticker.scale.set(1);
            } else {
                this.ticker.y = coreApp.gameView.panelContainer.children[12].y + 85;
                this.ticker.scale.set(0.5);   
            }
        }   
    }

}
