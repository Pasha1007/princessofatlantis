var v = ReelSymbol.prototype;
v.changeSymbol = function (config, winId,counter,initialCreation) {
    // console.log("new symbol config: ", config);
    if(config == "m")
    {
        let count = coreApp.gameModel.userModel.userData.current_round.misc_prizes.count;
       
        if(initialCreation == true)
            multiplierValue = coreApp.gameModel.userModel.userData.current_round.screen_wins[winId];
        else
            multiplierValue = coreApp.gameModel.userModel.userData.current_round.misc_prizes[counter].screenWins[winId];
            if(multiplierValue <= 10 ){
                config = "10x";
            }
            else if(10 < multiplierValue  &&  multiplierValue < 20){
                config = "15x";
            }
            else if(20 <= multiplierValue &&  multiplierValue < 30){
                config = "20x";
            }
            else if(multiplierValue == 50){
                config = "50x";
            }
            else if(multiplierValue == 100){
                config = "100x";
            }
    }

      if (typeof config === "string") {
          pixiLib.setProperties(this.symbol, {texture: config});
           if (coreApp.gameModel.spinData.wildSymbols && coreApp.gameModel.spinData.wildSymbols.indexOf(config) > -1) {
                this.addLabel();
            } else {
                this.removeLabel();
            }       
      } else {
          if (config.symbol && config.symbol.texture) {
              pixiLib.setProperties(this.symbol, {
                  texture: config.symbol.texture
              });
              if (coreApp.gameModel.spinData.wildSymbols && coreApp.gameModel.spinData.wildSymbols.indexOf(config.symbol.texture) > -1) {
                  this.addLabel();
              } else {
                  this.removeLabel();
              }
          }
          if (config.frontImage && config.frontImage.texture) {
              pixiLib.setProperties(this.frontImage, {
                  texture: config.frontImage.texture
              });
          }
          if (config.backImage && config.backImage.texture) {
              pixiLib.setProperties(this.backImage, {
                  texture: config.backImage.texture
              });
          }
      } 
}

v.removeLabel = function () {
    if (this.label) {
        this.removeChild(this.label);
    }
}

v.addLabel = function () {
    this.removeLabel();

    this.label = pixiLib.getElement("Sprite", "wild_label");
    pixiLib.setProperties(this.label, { x: 0, y: 60, scale:0.6,  anchor: { x: 0.5, y: 0.5} });
    this.addChild(this.label);
}