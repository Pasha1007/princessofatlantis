var gRStrip = ReelStrip.prototype;
var globalArray=[];
var indexValue = -1;

gRStrip.createGameElements = function () {
	_mediator.subscribe("removeWinSym",this.removeWinSym.bind(this));
	_mediator.subscribe("killReelAniTweens",this.killReelAniTweens.bind(this));
	_mediator.subscribe("toggleForce",this.toggleForce.bind(this));
	//For animating scatters after tumbling...
    _mediator.subscribe("showExtraSpins",this.animateAllScatterOnReel.bind(this));
	_mediator.subscribe("checkAndLand",this.checkAndLand.bind(this));
	_mediator.subscribe("visibilityOfMultiplierSymbol",this.visibilityOfMultiplierSymbol.bind(this));
	this.forcedSpin=false;
	this.PottextStyle = {
		"type": "BitmapFont",
		"fontName": "featureBitmapFont-export",
		"fontSize": 40,
		"align": "center"
	  };
}

gRStrip.createView = function (id) {
	this.reelId = id;
	this.tickerCounter = 0;
	this.tweens=[];
	this.killTweens = [];
	this.spineSymbols= new Map([
        ["a", "pearl"],
        ["b", "trident"],
        ["c", "jelly fish"],
        ["d", "treasure box"],
        ["e", "A"],
        ["f", "K"],
        ["g", "Q"],
        ["h", "J"],
        ["i", "10"],
        ["s", "mermaid"]


    	  ]);
	this.reelConfig = _ng.GameConfig.ReelViewUiConfig;
	_ng.extraSymbols = this.reelConfig.data.extraAddSymbols;
	this.tickerSymbolsCount = this.reelConfig.data.noOfSymbols+1;
	// this.setReelSymbolConfig();
	this.stripData = _ng.GameConfig.defaultReels[this.reelId].split("");
	this.stripData = coreApp.gameController.model.spinData.getReels()[this.reelId] ? coreApp.gameController.model.spinData.getReels()[this.reelId] : this.stripData;
	this.stripData = this.addExtraSymbols(this.stripData);
	this.createStrip();
	this.maxSpinTime = 10000;
	this.createGameElements();
	this.stopSpinCounter = 0;
};

gRStrip.stopSpin = function (reelAry, isStopNow) {
	this.isStopCalled = true;
	this.rawReels = reelAry;
	this.rawSymbolsReverse = Array.from(reelAry).reverse();
	this.reelData = this.addExtraSymbols(reelAry);
	this.addMultiplierToSymbol();
};

gRStrip.addMultiplierToSymbol = function()
{
	let tempArray = coreApp.gameModel.userModel.userData.current_round.screen_wins;
}

gRStrip.findMultipliers = function(){
	this.totalMultipliers=[];
	if (coreApp.gameModel.userModel.userData.current_round.misc_prizes.count == 0) {
		this.totalMultipliers = coreApp.gameModel.userModel.userData.current_round.screen_wins;
		this.totalMultipliers =this.getNonZeroMultiplierPos(this.totalMultipliers);
	}
	else{
		if (coreApp.gameModel.userModel.userData.current_round.misc_prizes != "" ) {
		let count = coreApp.gameModel.userModel.userData.current_round.misc_prizes.count;
		this.totalMultipliers = coreApp.gameModel.userModel.userData.current_round.misc_prizes[count-1].screenWins;
		this.totalMultipliers =this.getNonZeroMultiplierPos(this.totalMultipliers);
		}
		
	}


}
gRStrip.createMultipliers = function(){
	// if (coreApp.gameModel.obj.current_round.spin_type == "freespin") {
	// this.findMultipliers();
	// if (this.totalMultipliers.length == 0) {
	// 	return;
	// }
	// let mSymbols=[];
	// for (let m = 1; m < this.symbolsArray.length-1; m++) {
	// 	if(this.symbolsArray[m].symName === "m"){
	// 		mSymbols.push(this.symbolsArray[m]);
	// 	}
	// }
	// let symbolsContainer = sortingMultipliers(mSymbols);
	// if (symbolsContainer.length == 0) {
	// 	return;
	// }
	// for (let index = 0; index < symbolsContainer.length; index++) {
	// 	let symbol =symbolsContainer[index].children;
	// 	if(symbol.length < 2){
	// 		indexValue++;
	// 		let multiplierValue = 0;
	// 		if(multiplierValue <= 10 ){
	// 			this.symStatic = pixiLib.getElement("Sprite","10x")
	// 		}
	// 		else if(10 < multiplierValue < 20){
	// 			this.symStatic = pixiLib.getElement("Sprite","15x")
	// 		}
	// 		else if(20 <= multiplierValue < 30){
	// 			this.symStatic = pixiLib.getElement("Sprite","20x")
	// 		}
	// 		else if(multiplierValue == 50){
	// 			this.symStatic = pixiLib.getElement("Sprite","50x")
	// 		}
	// 		else if(multiplierValue == 100){
	// 			this.symStatic = pixiLib.getElement("Sprite","100x")
	// 		}
	// 		this.symStatic.anchor.set(0.5);
	// 		this.symStatic.scale.set(0.24);
	// 		this.symStatic.name="symStatic";
	// 		this.MultiplierText = pixiLib.getElement("Text",this.PottextStyle);
	// 		this.MultiplierText.anchor.set(0.5);
	// 		this.MultiplierText.name="Multiplier";
	// 		let objArray =[this.MultiplierText,multiplierValue,symbolsContainer[index],this.symStatic];
	// 		globalArray.push(objArray);
	// 		pixiLib.setText(this.MultiplierText,"");
	// 		symbolsContainer[index].addChild(this.MultiplierText);
	// 		this.MultiplierText.x = 0;this.MultiplierText.y = 0;
	// 	         }
	//          }
    //     }
	}
gRStrip.removeWinSym = function(num){
	this.num = num;
	let temp =[];
	var newarr = coreApp.gameModel.obj.current_round.misc_prizes[num].new_symbols.split(";")
	var countstr = 0;
	var animTime,removalTime;
	// console.log("Init Symbols Array: ", this.symbolsArray.length)
	//Popping symbols..........
	for (var i = 1; i < this.symbolsArray.length-1; i++) 
	{
		for(var j=0;j<coreApp.gameModel.obj.current_round.misc_prizes[num].old_reel_symbol.length;j++)
		{
			if(i>=this.symbolsArray.length ||(!this.symbolsArray[i]))
				{
					// console.log("Chaos i: "+ i+" length: "+this.symbolsArray.length);
				}
			if (this.symbolsArray[i].symName == coreApp.gameModel.obj.current_round.misc_prizes[num].old_reel_symbol[j]) {
				if(_ng.isQuickSpinActive && _ng.quickSpinType=="turbo" && _ng.GameConfig.FastAnim)
				{
					// FastSymbolAnim(this.symbolsArray[i],num);
					//FAST ANIM on TURBO MODE
					animTime = 1.5;
					removalTime = 413;
					this.SymbolAnim(this.symbolsArray[i],num, animTime,removalTime);
				}
				else{
					animTime = 0.9;
					removalTime = 500;
					this.SymbolAnim(this.symbolsArray[i],num, animTime,removalTime);
				}
				// this.symbolsArray[i].alpha = 0;
				this.symbolsArray = popArrAtIndex(this.symbolsArray, i);
				i--;
				countstr++;
				break;
			}
		}
	}
	//Adding new symbols to strip....
	// console.log("Symbols Array after pop: ", this.symbolsArray.length);
	var currentReelSymbols = newarr[this.reelId].split('').reverse().join('');
	//Removing fake symbol......
	var fakeSym;
	if(currentReelSymbols.length > 0) fakeSym = this.symbolsArray.shift();
	for(var x=0; x<currentReelSymbols.length; x++)
	{
		//creating new symbol....... 
		var symb = new ReelSymbol( _ng.GameConfig.reelSymbolConfig[currentReelSymbols[x]]);
		//change
		if( currentReelSymbols[x] == 'm'){
			// console.log(newReel[x], "newreel" );
			/**
			 * currentReelSymbols.length-1 -x is used inorder to avoid the reverse string done above.
			 * WinId = ReelId + new element position * 6 from screen wins.
			 * For accessing 14th element, it lies in reelstrip 3 with reelId 2. 
			 * 14 = 2[this.reelId] + 6 * 2[index before reversal]
			 */ 
			var winId = ((this.reelId ) + ((currentReelSymbols.length-1 -x) *6));
			// var winId = (this.reelId * _ng.ReelViewUiConfig.data.noOfSymbols) + (x);
			symb.changeSymbol("m", winId,this.num,false);
		}
		symb.symName = currentReelSymbols[x];
		this.addChild(symb);
		symb.y -= ((this.symbolsArray[0].height + this.symConfig.symbolYGap) * x );
		this.symbolsArray.unshift(symb);
	}
	//Adding fake symbol to maintain array length......
	if(currentReelSymbols.length > 0) this.symbolsArray.unshift(fakeSym);

	setTimeout(function(popIndex, popCount){
		this.moveSymbols(popIndex, popCount,this.num);
		// this.createMultipliers();
	}.bind(this, i, countstr),(_ng.isQuickSpinActive && _ng.quickSpinType=="turbo" && _ng.GameConfig.FastAnim )? 750+(this.reelId*10) : 800+(this.reelId*40));
	
	 
		// console.log("Symbols Array final: ", this.symbolsArray.length)

	/* setTimeout(function(){
		console.log("Updated Spin Reels");
		_mediator.publish("updateSpinDataReels",coreApp.gameModel.obj.current_round.misc_prizes[coreApp.gameModel.obj.current_round.misc_prizes.count-1].new_reel);
	}, 5000) */
	_ng.symcnt+=1;
	
}
gRStrip.getNonZeroMultiplierPos = function(arr){
    let tmpPosArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
			let temp =[arr[i], i];
            tmpPosArray.push(temp);
                }
            }
    return tmpPosArray;
}
function sortingMultipliers(sortArray){
	sortArray.sort((a, b) => a.y - b.y);
	return sortArray;
}

gRStrip.moveSymbols = function(poppedIndex, popCount,num){
	 
	for (let i = this.symbolsPos.length-1; i >=0; i--) {

		if (i == (this.symbolsArray.length - 1)) {
				 TweenMax.to(this.symbolsArray[i], (_ng.isQuickSpinActive && _ng.quickSpinType=="turbo"&& _ng.GameConfig.FastAnim)? 0.375+((this.symbolsPos.length-i)*0.0375) :   0.5+((this.symbolsPos.length-i)*0.05), {
					 y: this.symbolsPos[i],
					 delay: ((_ng.isQuickSpinActive && _ng.quickSpinType==="turbo")|| (this.forcedSpin&&  _ng.isForceAllowed))?0:(this.symbolsPos.length-2 -i)/20,
					 ease: Elastic.easeInOut.config(1.1, 1),
					 onComplete: function () {
						_sndLib.play(_sndLib.sprite.reelStop);
						  _mediator.publish("AllTumbleFinish", num, this.reelId) 
					 }.bind(this)
				 });
			 }
			 else {
				 TweenMax.to(this.symbolsArray[i],(_ng.isQuickSpinActive && _ng.quickSpinType=="turbo"&& _ng.GameConfig.FastAnim) ? 0.375+((this.symbolsPos.length-i)*0.0375) : 0.5+((this.symbolsPos.length-i)*0.05), {
					 y: this.symbolsPos[i],
					 delay: ((_ng.isQuickSpinActive && _ng.quickSpinType==="turbo")|| (this.forcedSpin&&  _ng.isForceAllowed))?0:(this.symbolsPos.length-2 -i)/20,
					 ease: Elastic.easeInOut.config(1.1, 0.7),
				 });
			 }
	
}

}
gRStrip.startSpin = function (argument) {
	if(this.reelConfig.data.reelSpinConfig.hideTopSymbol){
		this.toggleExtraSym(true);
	}
	
	/*previous maxSpinTime - 1000*/
	this.maxSpinTime = 10000;
	this.tickerCounter = 0;
	this.isStopCalled = false;
	this.isPublishEvents = false;
	this.loopCounter = 0;
	this.minSpeed = this.reelConfig.data.minSpeed;
	this.maxSpeed = this.reelConfig.data.maxSpeed;
	
	if(_ng.GameConfig.FastAnim)
		this.speed = 20;
	else
		this.speed = this.minSpeed;
	
		this.isSpining = false;
	if (this.reelConfig.data.reelSpinConfig.startJerk) {
		TweenMax.allTo(this.symbolsArray, this.reelConfig.data.reelSpinConfig.startJerkSpeed / 1000, {
			y: '-=' + this.reelConfig.data.reelSpinConfig.startJerkDistance,
			onComplete: function () {
				this.spinLoop();
				if(this.reelConfig.data.reelSpinConfig.useBlur){
					for (var i = 0; i < this.symbolsArray.length; i++) {
						this.symbolsArray[i].changeSymbol(this.symbolsArray[i].symName+"_blur");
					}
				}
			}.bind(this)
		});
	} else {
		if(this.reelId==5)
			{
				_mediator.publish("spinStartCheck",true);
			}
			else{
				_mediator.publish("spinStartCheck",false);
			}
		this.spinLoop();
		if(this.reelConfig.data.reelSpinConfig.useBlur && !_ng.isQuickSpinActive && _ng.quickSpinType!="turbo"){
			for (var i = 0; i < this.symbolsArray.length; i++) {
				var symbolImg = this.symbolsArray[i].symName ? this.symbolsArray[i].symName  : this.symbolsArray[i].config.symbol.texture;
				this.symbolsArray[i].changeSymbol(symbolImg+"_blur");
				this.symbolsArray[i].alpha = 1;
			}
		}
	}
};

gRStrip.spinLoop = function (argument) {
 
    this.loopCounter++;
    if(_ng.GameConfig.spineSymbol && !this.isSpining){
        this.isSpining = true;
        for (var i = 0; i < this.symbolsArray.length; i++) {
            if(_ng.isQuickSpinActive && _ng.quickSpinType==="turbo"){
                this.symbolsArray[i].children[0].state.setAnimation(0, "Spin Loop", true);
            }else{
                this.symbolsArray[i].children[0].state.setAnimation(0, "Start spin", false);
            }
            this.symbolsArray[i].children[0].state.timeScale = (_ng.isQuickSpinActive && _ng.quickSpinType==="turbo") ? 2 : 1;
        }
    }else if(!_ng.GameConfig.spineSymbol){
            for (var i = this.symbolsArray.length - 1; i >= 0; i--) {
                this.symbolsArray[i].y += this.speed*(i+1);
                // if (this.speed < this.maxSpeed) {
                //  // this.speed = this.speed * this.reelConfig.data.spinSpeed;
                //  if (this.speed > this.maxSpeed) {
                //      this.speed = this.maxSpeed;
                //  }
                // }
            }
    if (this.symbolsArray[ this.symbolsArray.length - 1].y >= (this.symConfig.symbolHeight + this.symConfig.symbolYGap)* (this.symbolsArray.length - 1)) {
        var bottomSymbol = this.symbolsArray.splice(this.symbolsArray.length - 1, 1)[0];
        bottomSymbol.y = 0;
        var extra = _ng.extraSymbols;
        // var value = (extra[Math.round(Math.random() * (extra.length - 1))]);
        var value = extra[0];
       
        if(this.isStopCalled){
            // console.log("Reel 11111: "+this.reelId)
            if(this.tickerCounter<this.tickerSymbolsCount){
                value = this.rawSymbolsReverse[this.tickerCounter];
            }
            if(value == undefined){
                // value = "a";
                val=["z","b","c","d","e","f","g","h","i"];
                var valInt=Math.round(Math.random()*8);
                // console.log("vallll: "+valInt);
                value=val[valInt];
            }
   
            this.tickerCounter++;
            if(this.tickerSymbolsCount == this.tickerCounter){
                // console.log("Reel 22222: "+this.reelId)
                this.loopCounter = this.maxSpinTime;
            }
        }
        value = this.reelSymbolConfig[value];
        if(this.reelConfig.data.reelSpinConfig.useBlur){
            bottomSymbol.changeSymbol(value.symbol.texture+"_blur");
        }else{
            bottomSymbol.changeSymbol(value.symbol.texture);
        }
        bottomSymbol.symName = value.symbol.texture;
        this.symbolsArray.unshift(bottomSymbol);
    }
    }
   
    if((this.loopCounter < this.maxSpinTime) && (_ng.isQuickSpinActive && _ng.quickSpinType=="turbo"))
    {
        clearTimeout(this.loopTimeout);
        this.loopTimeout = setTimeout(this.spinLoop.bind(this), 10);
        // console.log("Turbo ")
    }
    else if((this.loopCounter < this.maxSpinTime) &&  (this.forcedSpin &&  _ng.isForceAllowed) )
        {
            clearTimeout(this.loopTimeout);
            this.loopTimeout = setTimeout(this.spinLoop.bind(this), 5);
            // console.log("Force stop ")
        }
        // else if((this.loopCounter < this.maxSpinTime) && this.isStopCalled && coreApp.gameController.isAllReelsStarted)
        // {
        //  clearTimeout(this.loopTimeout);
        //  this.loopTimeout = setTimeout(this.spinLoop.bind(this), 1);
        // }
        else if ((this.loopCounter < this.maxSpinTime) && this.isStopCalled ) {
            clearTimeout(this.loopTimeout);
            this.loopTimeout = setTimeout(this.spinLoop.bind(this), 10);
        }
    else if (this.loopCounter < this.maxSpinTime) {
        clearTimeout(this.loopTimeout);
        this.loopTimeout = setTimeout(this.spinLoop.bind(this), 20);
    }
    else {
        clearTimeout(this.loopTimeout);
        this.setFinalPos();
    //  if(!this.forcedSpin)
    // {
    //  _ng.isForceAllowed=false;
    // }
    }
};

gRStrip.toggleForce=function(bool)
{

this.forcedSpin=bool;
}

gRStrip.setFinalPos = function (argument) {
    for (let i = 0; i < this.symbolsArray.length; i++) {
        this.symbolsArray[i].alpha = 1;
    }
    clearTimeout(this.loopTimeout);
 
    const symbolsPosLength = this.symbolsPos.length;
    const forcedSpin = this.forcedSpin;
    // const tweens = []; // Array to store all tween references
 
    for (let i = symbolsPosLength - 1; i > 0; i--) {
        this.symbolsArray[i].y = this.symbolsPos[i] - 600;
        var stopDelay = ((_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") || (this.forcedSpin && _ng.isForceAllowed)) ? 0.12 : 0.25;
 
        // Create the initial tween and store its reference
        const tween = TweenMax.to(this.symbolsArray[i], stopDelay, {
            y: this.symbolsPos[i],
            delay: ((_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") || (this.forcedSpin && _ng.isForceAllowed)) ? 0 : (symbolsPosLength - 2 - i) / 18,
            ease: Linear.easeIn,
            onComplete: function () {
                if(!this.forcedSpin)
                    {
                        _ng.isForceAllowed=false;
                    }
                if(i == 6)
                    this.playReelStopSound();
                TweenMax.to(this.symbolsArray[i], 0.07, {
                    y: this.symbolsPos[i] + 25,
                    onComplete: function () {
                        TweenMax.to(this.symbolsArray[i], 0.065, {
                            y: this.symbolsPos[i],
                            ease: Bounce.easeOut,
                        });
                    }.bind(this)
                });
                setTimeout(function () {
                    this.onFinalStopReached();
                }.bind(this), stopDelay * 300);
            }.bind(this)
        });
 
        this.tweens.push(tween); // Add the tween to the array
    }
 
    // Monitor changes in _ng.isForceAllowed to kill and restart tweens
    const checkForceAllowed = setInterval(function () {
        if (this.forcedSpin && _ng.isForceAllowed) {
            // Kill all existing tweens
            this.tweens.forEach(function (tween) {
                tween.kill();
            });
 
            // Restart all tweens with zero delay
            for (let i = symbolsPosLength - 1; i > 0; i--) {
                this.symbolsArray[i].y = this.symbolsPos[i] - 700;
                TweenMax.to(this.symbolsArray[i], 0.15, {
                    y: this.symbolsPos[i],
                    delay: 0,
                    ease: Linear.easeIn,
                    onComplete: function () {
                        this.playReelStopSound();
                        TweenMax.to(this.symbolsArray[i], 0.07, {
                            y: this.symbolsPos[i] + 20,
                            onComplete: function () {
                                TweenMax.to(this.symbolsArray[i], 0.065, {
                                    y: this.symbolsPos[i],
                                    ease: Bounce.easeOut,
                                });
                            }.bind(this)
                        });
                        setTimeout(function () {
                            this.onFinalStopReached();
                        }.bind(this), 300);
                    }.bind(this)
                });
            }
 
            // Stop monitoring once the tweens are restarted
            clearInterval(checkForceAllowed);
        }
    }.bind(this), 20); // Check every 100ms
    this.killTweens.push(checkForceAllowed);
 
    // setTimeout(function () {
    //  clearInterval(checkForceAllowed);
    //  this.tweens.forEach(function (tween) {
    //      tween.kill();
    //  });
    //  this.tweens=[];
    // }.bind(this), 800);
 
    if (this.reelConfig.data.reelSpinConfig.useBlur) {
        let k = symbolsPosLength - 1;
        const changeInt = setInterval(function () {
            k -= 1;
            if (k == -1) {
                clearInterval(changeInt);
            }
        }.bind(this), ((_ng.isQuickSpinActive && _ng.quickSpinType === "turbo") || (this.forcedSpin && _ng.isForceAllowed)) ? 0 : (stopDelay - 0.05));
 
        this.oldScatterpos = [];
        for (let i = 0; i < this.symbolsArray.length; i++) {
            const winId = ((this.reelId) + (i * 6)) - 6;
            this.symbolsArray[i].changeSymbol(this.symbolsArray[i].symName, winId, null, true);
            if (this.symbolsArray[i].symName == "s" || this.symbolsArray[i].symName == "scatter") {
                this.oldScatterpos.push(i);
            }
        }
    }
};

gRStrip.killReelAniTweens = function (){
	// setTimeout(function () {
	if(this.killTweens.length != 0){
		this.killTweens.forEach(function (killTween) {
			clearInterval(killTween);
		});
		this.killTweens=[];
	}
	if(this.tweens.length !=0){
		this.tweens.forEach(function (tween) {
			tween.kill();
		});
		this.tweens=[];
	}
	// }.bind(this), 800);
}

gRStrip.onFinalStopReached = function (){
	this.isStopCalled = false;

	if (this.isPublishEvents == false) {
		this.isPublishEvents = true;
		
		_mediator.publish("singleReelStop", this.reelId);
		_mediator.publish("scaleReelMaskOnEachReelStop", this.reelId, 1.1);

		if (this.reelId == (_ng.GameConfig.ReelViewUiConfig.data.noOfReels - 1)) {

			if( (_ng.isQuickSpinActive )||(coreApp.gameModel.obj.current_round.misc_prizes && coreApp.gameModel.obj.current_round.misc_prizes.count>0))
				{
					setTimeout(function(){
						_mediator.publish("allReelsStopped");
						_sndLib.stop(_sndLib.sprite.reelSpinning);
					}, 600)
				}
				else if(this.forcedSpin&&  _ng.isForceAllowed)
					{
						setTimeout(function(){
							_mediator.publish("allReelsStopped");
							_sndLib.stop(_sndLib.sprite.reelSpinning);
						}, 200)
					}
				else{
					setTimeout(function(){
					_mediator.publish("allReelsStopped");
					_sndLib.stop(_sndLib.sprite.reelSpinning);
					},600)
				}
		
		}
		if (this.reelId == (_ng.GameConfig.ReelViewUiConfig.data.noOfReels - 2)) {
			 _sndLib.stop(_sndLib.sprite.reelSpinning);
		}
	}

	if(this.reelConfig.data.reelSpinConfig.hideTopSymbol){
		this.toggleExtraSym(false);
	}
}

gRStrip.checkAndLand=function()
{

	for (let i = 0; i < this.symbolsArray.length; i++) {
		var flag=0;
		// this.symbolsArray[i].changeSymbol(this.symbolsArray[i].symName);
		// console.log("Symn ame:  "+ this.symbolsArray[i].symName+ " pos: "+ i+" reelId: "+this.reelId);
		if(this.symbolsArray[i].symName=="s"||this.symbolsArray[i].symName=="scatter")
			{
				for(j=0;j<this.oldScatterpos.length;j++){
					if(i==this.oldScatterpos[j]){
						flag=1;
					}
				}
				if(flag==0){
					// _mediator.publish("playLandAnim",this.reelId,i);    //removing land animation
				}
				
			}
	}
}

function popArrAtIndex(Arr, index)
{
	var newArr = [];
	for(var i=0;i<Arr.length; i++)
	{
		if(i!= index)
			newArr.push(Arr[i]);
	}
	return newArr;
}

function poptween(symbol,num,time,removalTime){

//	var popAnim = pixiLib.getElement("AnimatedSprite", { "prefix":"effect final_", "startIndex": "0", "endIndex": "35", "digit": "dual", "loop":false, "animationSpeed": time, "type": "spriteAnimation" });

	var popAnim =pixiLib.getElement("Spine","skeleton");
	popAnim.scale.set(0.3);
	popAnim.x  = symbol.x;
	popAnim.y = symbol.y;
	symbol.parent.addChild(popAnim);
	popAnim.state.setAnimation(0,'main',false);
//	popAnim.play();
	
	switch(num)
	{
		case 0:
			_sndLib.play(_sndLib.sprite.pop1)
			break;
		case 1:
			_sndLib.stop(_sndLib.sprite.pop1)
			_sndLib.play(_sndLib.sprite.pop2)
			break;
		case 2:
			_sndLib.stop(_sndLib.sprite.pop2)
			_sndLib.play(_sndLib.sprite.pop3)
			break;
		case 3:
			_sndLib.stop(_sndLib.sprite.pop3)
			_sndLib.play(_sndLib.sprite.pop4)
			break;
		case 4:
			_sndLib.stop(_sndLib.sprite.pop4)
			_sndLib.play(_sndLib.sprite.pop5)
			break;
		default:
			_sndLib.stop(_sndLib.sprite.pop5)
			_sndLib.play(_sndLib.sprite.pop5)
			break;	
	}

	setTimeout(function(){
//		popAnim.stop();
		symbol.alpha=0;
		symbol.parent.removeChild(popAnim);
		symbol.parent.removeChild(symbol);
	}, removalTime);
	
}

gRStrip.SymbolAnim=function(symbol,num,animationTime,removalTime){
	symbol.visible=false;
    //	var sym = symbol.symName;
            var sym = this.spineSymbols.get(symbol.symName);
            console.log(symbol.symName);
    //        console.log(this.spineSymbols);
    //        console.log(this.spineSymbols.get("a"));
            console.log(this.spineSymbols.get(symbol.symName));


    //	var SymAnim = pixiLib.getElement("AnimatedSprite", { "prefix":sym, "startIndex": "0", "endIndex": "47", "digit": "dual", "loop":false, "animationSpeed": animationTime, "type": "spriteAnimation" });
    	         var SymAnim;
    	        if(sym== "10"|| sym== "A"||sym== "J"||sym== "K"||sym== "Q" ){

    	           SymAnim=pixiLib.getElement("Spine","royals");
    	            SymAnim.state.setAnimation(0,sym,false);
    	             SymAnim.scale.set(0.23);
    	        }



    		else{
    		      SymAnim=pixiLib.getElement("Spine",sym);
    		       SymAnim.state.setAnimation(0,"main",false);
    		       SymAnim.scale.set(0.2);
                }
//    		if(sym=="apple"){
//    		SymAnim.scale.set(0.033);
//    		}
//            else{

//            }
    	SymAnim.x  = symbol.x;
    	SymAnim.y = symbol.y;
    	SymAnim.state.timeScale =2;
    	symbol.parent.addChild(SymAnim);
    //	SymAnim.play();
//        SymAnim.state.setAnimation(0,sym,false);
    //	setTimeout(() => {
    ////		SymAnim.stop();
    //		symbol.parent.removeChild(SymAnim);
    //		poptween(symbol,num, animationTime,removalTime);
    //	}, removalTime);

    SymAnim.state.tracks[0].listener = {
                complete: () => {
                    SymAnim.alpha=0;
    //                if(i==(mystPos.length-1))
    //                _mediator.publish("callPostMatrixAction");
                   setTimeout(() => {
                    symbol.parent.removeChild(SymAnim);
                    }, 100);
                    poptween(symbol,num, animationTime,removalTime);
                }
            }
}

gRStrip.getNonZeroMultiplierPos = function(arr){
    let tmpPosArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
			let temp =[arr[i]];
            tmpPosArray.push(temp);
                }
            }
    return tmpPosArray;
}
gRStrip.findMultipliers = function(){
	this.totalMultipliers=[];
	if (coreApp.gameModel.userModel.userData.current_round.misc_prizes.count == 0) {
		this.totalMultipliers = coreApp.gameModel.userModel.userData.current_round.screen_wins;
		this.totalMultipliers =this.getNonZeroMultiplierPos(this.totalMultipliers);
	}
	else{
		if (coreApp.gameModel.userModel.userData.current_round.misc_prizes != "" ) {
		let count = coreApp.gameModel.userModel.userData.current_round.misc_prizes.count;
		this.totalMultipliers = coreApp.gameModel.userModel.userData.current_round.misc_prizes[count-1].screenWins;
		this.totalMultipliers =this.getNonZeroMultiplierPos(this.totalMultipliers);
		}
		
	}


}
gRStrip.animateAllScatterOnReel = function()
{
 
    for(let i=0; i< this.symbolsArray.length; i++)
    {
        if(this.symbolsArray[i].symName == "s")
        {
            var prevScale= this.symbolsArray[i].scale.x;
            TweenMax.to(this.symbolsArray[i].scale,0.3,{
                x: prevScale+.1,y: prevScale +.1,yoyo:true,repeat:2,
                onComplete: function () {
                    TweenMax.to(this.symbolsArray[i].scale,0.3,{
                        x: prevScale,y: prevScale});
                }.bind(this)
            });
        }
    }
}
gRStrip.visibilityOfMultiplierSymbol = function(bool)
{
    for(let i=0; i< this.symbolsArray.length; i++)
    {
        if(this.symbolsArray[i].symName == "m")
        {
            this.symbolsArray[i].alpha = bool;
        }
    }
}
 