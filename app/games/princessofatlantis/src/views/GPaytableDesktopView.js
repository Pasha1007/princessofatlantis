

var GPD=PaytableDesktopView.prototype 

GPD.addExtraElements = function (argument) {

    _mediator.subscribe("ChangeWinValues",this.changeWinValues.bind(this));
    this.symbols=["a","b","c","d","e","f","g","h","i","scatter"];
    this.symbolPays=[[10,25,50],[2.5,10,25],[2,5,15],[1.5,2,12],[1,1.5,10],[0.8,1.2,8],[0.5,1,5],[0.4,0.9,4],[0.25,0.75,2],[3,5,100]];
    
    if(coreApp.gameModel.obj.previous_round)
        _mediator.publish("ChangeWinValues",coreApp.gameModel.obj.previous_round.coin_value);
    else
        _mediator.publish("ChangeWinValues",100);
  
    if(this.Line4txt1){
        this.Line4txt1.x = this.infosym.x+this.infosym.width+10;

    }
   if(this.Line7){
        this.Line7.x = this.closebt.x+this.closebt.width-20;

    }
    if(this.Line7txt3){
        this.Line7txt3.x = this.minussym1.x+this.minussym1.width+10;

    }
    //Translation positioning
    if(coreApp.lang == "en")
    {
        //Page5
      this.plussym1.x = 400 ;
      this.para2txt1.x = 392 ;
      this.minussym1.x = 500 ;
      this.para2txt2.x = 680;
      this.setsym.x = 120;
      this.Line3txt1.x = 155;

      this.Line1txt1.x = 290 ;
      this.plussym.x = 320 ;
      this.Line1txt2.x = 360 ;
      this.minussym.x = 400;
      this.Line1txt3.x = 430;

      //Page6
      this.leftarr.x= 400 ;
      this.Line6txt1.x= 440 ;
      this.rightarr.x= 480;
      this.Line6txt2.x= 680 ;

       this.Line7txt1.x =260;
       this.plussym1.x =330;
       this.Line7txt2.x =380;
       this.minussym1.x =430;
       this.Line7txt3.x =460;
    }
    else{
        //Page5
        this.plussym1.x = 348;
        this.para2txt1.x = 390 ;
        this.minussym1.x = 436 ;
        this.para2txt2.x = 715;
        this.setsym.x = 70;
        this.Line3txt1.x = 102;

        this.Line1txt1.x = 1200 ;
        this.plussym.x = 800 ;
        this.Line1txt2.x = 860 ;
        this.minussym.x = 920;
        this.Line1txt3.x = 65;

        //Page6
        this.leftarr.x= 250 ;
        this.Line6txt1.x= 290 ;
        this.rightarr.x= 330;
        this.Line6txt2.x= 680 ;

        this.plussym1.x =150;
        this.Line7txt2.x =190;
        this.minussym1.x =230;
        this.Line7txt3.x =260;

        this.closebt.x = 545;
        this.Line7.x= 685;



    }
    this.updatePaytableText();
};


GPD.changeWinValues = function(value) {
    
    this.formattedSymbolsPay = [];

    this.formatedPayAmount = this.symbolPays.map(innerArray => 
        innerArray.map(innerValue => pixiLib.getFormattedAmount(innerValue * value) )
    );  
    
        for (var j = 0; j < this.symbols.length; j++) {
            for (var i = 0; i < (this["container1"].children.length); i++) {
                if (this["container1"].children[i].name == (this.symbols[j] + "SymTxt")) {
                    this["container1"].children[i].text = "8-9:    " + (this.formatedPayAmount[j][0]) + "\n10-11:   " + (this.formatedPayAmount[j][1]) + "\n12+:    " + (this.formatedPayAmount[j][2]);
                    break;
                }
                else if (this["container1"].children[i].name === "scatterValueText") {
                    this["container1"].children[i].text = "4 Scatter:  " + (this.formatedPayAmount[this.symbols.length - 1][0]) + "\n5 Scatter:  " + (this.formatedPayAmount[this.symbols.length - 1][1]) + "\n6 or more Scatter:  " + (this.formatedPayAmount[this.symbols.length - 1][2]);
                    break;
                }

            }
        }
}

GPD.updatePaytableText = function() {
    /*coin values are sending from backend on init server call*/
    var numberOfCoins = coreApp.gameModel.spinData.smCoinValues.length;
    var minimumCoinValue = coreApp.gameModel.spinData.smCoinValues[ 0 ];   //first coin value
    var maximumCoinValue = coreApp.gameModel.spinData.smCoinValues[ numberOfCoins - 1 ];  //last coin value

    this.minimumBetValue.text = pixiLib.getFormattedAmount(minimumCoinValue);
    this.maximumBetValue.text = pixiLib.getFormattedAmount(maximumCoinValue);
}



 