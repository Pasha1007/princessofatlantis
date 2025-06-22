var GPM = PaytableMobileView.prototype;

 
 GPM.addExtraElements = function (argument) {

    this.symbols=["a","b","c","d","e","f","g","h","i","scatter"]
    this.symbolPays=[[10,25,50],[2.5,10,25],[2,5,15],[1.5,2,12],[1,1.5,10],[0.8,1.2,8],[0.5,1,5],[0.4,0.9,4],[0.25,0.75,2],[3,5,100]];
    _mediator.subscribe("ChangeWinValues",this.changeWinValues.bind(this));

    if(coreApp.gameModel.obj.previous_round)
        _mediator.publish("ChangeWinValues",coreApp.gameModel.obj.previous_round.coin_value);
    else
        _mediator.publish("ChangeWinValues",100);
       
        if(this.p6Line7){
            this.p6Line7.x = this.p6closebt.x+ this.p6closebt.width+10;
    
        }
        if(this.p6Line7txt3){
            this.p6Line7txt3.x = this.p6minussym1.x+ this.p6minussym1.width+10;
    
        }

         //Translation positioning
            if(coreApp.lang == "tr")
            {
         
              if(_viewInfoUtil.viewType=="VL")
                {
                  console.log("VL tur");
                  this.p5Line1txt1.x = 1040 ;
                  this.p5plussym.x = 760 ;
                  this.p5Line1txt2.x = 820 ;
                  this.p5minussym.x = 880;
                  this.p5Line1txt3.x = 400;
                }

            }
            else{
             
                if(_viewInfoUtil.viewType=="VL")
                    {
                      console.log("VL eng");
                      this.p5Line1txt1.x = 260 ;
                      console.log(this.p5Line1txt1.x);
                      this.p5plussym.x = 330 ;
                      this.p5Line1txt2.x = 386 ;
                      this.p5minussym.x = 440;
                      this.p5Line1txt3.x = 800;
                      console.log(this.p5Line1txt1.x);
      
                    }
            }
        //  if(_viewInfoUtil.viewType=="VL")
        //  {
        //     //Translation positioning
        //     if(coreApp.lang == "en")
        //         {
        //         //Page5
        //         // this.p5plussym1.x = 400 ;
        //         // this.p5para2txt1.x = 392 ;
        //         // this.p5minussym1.x = 500 ;
        //         // this.para2txt2.x = 680;
        //         // this.setsym.x = 120;
        //         // this.Line3txt1.x = 155;
        //         console.log("english VL!");
        //         //top line

        //          this.p5Line1txt1.x = 260 ;
        //         this.p5plussym.x = 330 ;
        //         this.p5Line1txt2.x = 386 ;
        //         this.p5minussym.x = 440;
        //         this.p5Line1txt3.x = 800;
            
            
        //         }
        //         else{ //turkish
        //             //Page5
        //             // this.p5plussym1.x = 348;
        //             // this.p5para2txt1.x = 390 ;
        //             // this.p5minussym1.x = 436 ;
        //             // this.para2txt2.x = 715;
        //             // this.setsym.x = 70;
        //             // this.Line3txt1.x = 102;
        //             console.log("turkish VL!");
        //             //top line
        //             this.p5Line1txt1.x = 1040 ;
        //             this.p5plussym.x = 760 ;
        //             this.p5Line1txt2.x = 820 ;
        //             this.p5minussym.x = 880;
        //             this.p5Line1txt3.x = 400;
            
            
            
        //         }
        // }

    this.updatePaytableText();
    
};

GPM.changeWinValues = function(value){
 
    this.formattedSymbolsPay = [];

    this.formatedPayAmount = this.symbolPays.map(innerArray => 
        innerArray.map(innerValue => pixiLib.getFormattedAmount(innerValue * value) )
    ); 
  
        for (var j = 0; j < this.symbols.length; j++) {
            for (var i = 0; i < (this["page1"].children.length); i++) {
                if (this["page1"].children[i].name == (this.symbols[j] + "SymTxt")) {
                    this["page1"].children[i].text = "8-9 : " + (this.formatedPayAmount[j][0]) + "\n10-11 : " + (this.formatedPayAmount[j][1]) + "\n12+ : " + (this.formatedPayAmount[j][2]);
                    break;
                }
                else if (this["page1"].children[i].name === "scatterValueText") {
                    this["page1"].children[i].text = "4 Scatters:  " + (this.formatedPayAmount[this.symbols.length - 1][0]) + "\n5 Scatters:  " + (this.formatedPayAmount[this.symbols.length - 1][1]) + "\n6 or more Scatters:  " + ( this.formatedPayAmount[this.symbols.length - 1][2]);
                    break;
                }


            }

        }
    
}

GPM.updatePaytableText = function() {
    /*coin values are sending from backend on init server call*/
    var numberOfCoins = coreApp.gameModel.spinData.smCoinValues.length;
    var minimumCoinValue = coreApp.gameModel.spinData.smCoinValues[ 0 ];   //lowest coin value
    var maximumCoinValue = coreApp.gameModel.spinData.smCoinValues[ numberOfCoins - 1 ];  //highest coin value

    this.minimumBetValue.text = pixiLib.getFormattedAmount(minimumCoinValue);
    this.maximumBetValue.text = pixiLib.getFormattedAmount(maximumCoinValue);
}


GPM.onResize = function () {
    var scaleX, scaleY;
    if (!this.elementsForResize) {
        return;
    }

    for (var i = 0; i < this.elementsForResize.length; i++) {
        if (this[this.elementsForResize[i]].makeResponsive) {
            this[this.elementsForResize[i]].setAlignment(this[this.elementsForResize[i]].props);
            // if(_viewInfoUtil.viewType === "VL" || _viewInfoUtil.viewType === "VD"){
            //     scaleX = this[this.elementsForResize[i]].props.landScaleX || 1;
            //     scaleY = this[this.elementsForResize[i]].props.landScaleY || 1;
            // }else{
            //     scaleX = this[this.elementsForResize[i]].props.portScaleX || 1;
            //     scaleY = this[this.elementsForResize[i]].props.portScaleY || 1;
            // }
            // this[this.elementsForResize[i]].setScale(scaleX, scaleY);
        } else {
          
            pixiLib.setProperties(this[this.elementsForResize[i]], this[this.elementsForResize[i]].props[_viewInfoUtil.viewType], true);
        }
    }
    if (this.scrollBGCover) {
        setTimeout(function(){
            this.scrollBGCover.width = _viewInfoUtil.getWindowWidth();
            this.scrollBGCover.height = Math.max(_viewInfoUtil.getWindowHeight(), this.resizablePTContainer.height);
        }.bind(this), 100);
    }
    if (this.bgCover) {
        this.bgCover.width = _viewInfoUtil.getWindowWidth();
        this.bgCover.height = _viewInfoUtil.getWindowHeight();
    }

    if (this.paytableFrameBG) {
        this.paytableFrameBG.x = 0;
        this.paytableFrameBG.y = 0;
        this.paytableFrameBG.width = _viewInfoUtil.getWindowWidth();
        this.paytableFrameBG.height = _viewInfoUtil.getWindowHeight();
    }

    if (this.paytableFrame) {
        this.paytableFrame.x = 0;
        this.paytableFrame.y = 0;
        this.paytableFrame.width = _viewInfoUtil.getWindowWidth();
        this.paytableFrame.height = _viewInfoUtil.getWindowHeight();
    }
    if (this.scroller) {
        setTimeout(function(){
            var bottomOffset = (this.offsetConfig.bottom) ? this.offsetConfig.bottom : 0;
            this.scroller.updateBoundY([-this.scrollBGCover.height + _viewInfoUtil.getWindowHeight() - ((100 + bottomOffset) * _viewInfoUtil.viewScaleY), 0]);
            if(this.y < (-this.scrollBGCover.height + _viewInfoUtil.getWindowHeight())){
                this.y = -this.scrollBGCover.height + _viewInfoUtil.getWindowHeight();
            }
        }.bind(this), 200);
    }
    if(pixiLib.isIpad())
    {
        if (_viewInfoUtil.viewType == "VL") {

        this.page1.scale.set(.8,.8);
        this.page1.x = 164; 
        this.page5.scale.set(.95);
        this.page5.x = 15; 

        }
        else{

            this.page1.scale.set(1);
            this.page1.x = 12; 
        }

    }
    if (_viewInfoUtil.viewType == "VL") {
        const isTurkish = coreApp.lang == "tr";
        console.log(isTurkish ? "VL tur" : "VL eng");
    
        // Set common properties that don't change
        this.p5para2txt2pt1.x = 640;
        this.p5para2txt2pt1.y = 700;
        this.p5para2txt2pt2.x = 640;
        this.p5para2txt2pt2.y = 750;
        this.p5spinsym.y = 800;
        this.p5Line5txt1.y = 810;
        this.p5Line6txt1.x = 710;
        this.p5autosym.y = 900;
        this.p5autoplaytxt.y = 900;
        this.p5Line6txt1.y = 880;
    
        // Conditional values for Turkish and English
        if (isTurkish) {
            this.p5Line1txt1.x = 1040;
            this.p5plussym.x = 760;
            this.p5Line1txt2.x = 820;
            this.p5minussym.x = 880;
            this.p5Line1txt3.x = 400;
            this.p5plussym1.x = 350;
            this.p5para2txt1.x = 410;
            this.p5minussym1.x = 465;
            this.p5para2txt2.x = 765;
            this.p5setsym.x = 50;
            this.p5infosym.x = 500;

            //Page6 
            this.p6Line2.y=225;
            this.p6Line3.y =275;
            this.p6leftarr.x=240;
            this.p6Line6txt1.x=290;
            this.p6rightarr.x=340;
            this.p6closebt.x=550;
            this.p6plussym1.x=180;
            this.p6Line7txt2.x=230;
            this.p6minussym1.x=280;

        } else {
            this.p5Line1txt1.x = 260;
            this.p5plussym.x = 330;
            this.p5Line1txt2.x = 386;
            this.p5minussym.x = 440;
            this.p5Line1txt3.x = 800;
            this.p5plussym1.x = 410;
            this.p5para2txt1.x = 480;
            this.p5minussym1.x = 550;
            this.p5para2txt2.x = 820;
            this.p5setsym.x = 105;
            this.p5Line4txt1.x = 660;
        }
    }
    
    // VP
if (_viewInfoUtil.viewType == "VP") {
    const isTurkish = coreApp.lang == "tr";
    console.log(isTurkish ? "VP tur" : "VP eng");

    // Common assignments for both Turkish and English
    this.p5para2txt2pt1.x = 640;
    this.p5para2txt2pt1.y = 700;
    this.p5para2txt2pt2.x = 640;
    this.p5para2txt2pt2.y = 750;
    this.p5spinsym.y = 800;
    this.p5Line5txt1.y = 810;
    this.p5autosym.y = 900;
    this.p5autoplaytxt.y = 900;
    this.p5Line6txt1.y = 880;

    // Conditional assignments based on language
    if (isTurkish) {
        this.p5Line1txt1.x = 360;
        this.p5Line1txt1.y = 200;
        this.p5plussym.x = 280;
        this.p5Line1txt2.x = 360;
        this.p5minussym.x = 440;
        this.p5plussym.y = 160;
        this.p5minussym.y = 160;
        this.p5Line1txt2.y = 140;
        this.p5Line2txt1.y = 260;

        this.p5Line1txt3.x = 360;
        this.p5Line1txt3.y = 80;
         this.p5grTitle.y= 0;

         this.p5setsym.x=90;
         this.p5setsym.y=430;


        this.p5plussym1.x = 280;
        this.p5para2txt1.x = 360;
        this.p5minussym1.x = 440;
        this.p5para2txt2.x = 360;

        this.p5para2txt2pt1.x = 360;
        this.p5para2txt2pt1.y = 900;
        this.p5para2txt2pt2.x = 360;
        this.p5para2txt2pt2.y = 950;

        this.p5Line6txt1.x = 440;
        this.p5Line6txt1.y = 1080;

       
        this.p5infosym.x = 235;

        this.p5spinsym.y= 1000;
        this.p5Line5txt1.y= 1010;
        this.p5autosym.y= 1100;
        this.p5autoplaytxt.y= 1100;


        //Page6
        this.p6Line2.y=260;
        this.p6Line4.y=400;
        this.p6Line6txt2.x = 360;
        this.p6Line6txt2.y = 680;
        this.p6leftarr.x=300;
        this.p6leftarr.y=640;

        this.p6Line6txt1.x= 360;
        this.p6Line6txt1.y= 620;
        this.p6rightarr.x=420;
        this.p6rightarr.y=640;
        this.p6closebt.x=250;
        this.p6closebt.y=780;
        this.p6Line7.x=400;
        this.p6Line7.y=760;
        this.p6title2.y=830;
        this.p6Line8.y=900;
        this.p6plussym1.x=300;
        this.p6plussym1.y=1050;
    
        this.p6Line7txt2.x=360;
        this.p6Line7txt2.y=1030;

        this.p6minussym1.x=420;
        this.p6minussym1.y=1050;

        this.p6Line7txt3.x=360;
        this.p6Line7txt3.y=1100;
        //this.p6paragraph0.y=1200;





    












    } else {
        this.p5Line1txt1.x = 240;
        this.p5Line1txt1.y = 180;

        this.p5plussym.x = 320;
        this.p5plussym.y = 200;

        this.p5Line1txt2.x = 380;
        this.p5Line1txt2.y = 180;
    
        this.p5minussym.x = 440;
        this.p5minussym.y = 200;


        this.p5Line1txt3.x = 360;
        this.p5Line1txt3.y = 240;
        this.p5plussym1.x = 300;
        this.p5para2txt1.x = 356;
        this.p5minussym1.x = 410;
        this.p5para2txt2.x = 350;
        
        this.p5para2txt2pt1.x = 360;
        this.p5para2txt2pt1.y = 900;
        this.p5para2txt2pt2.x = 360;
        this.p5para2txt2pt2.y = 950;

        this.p5spinsym.y= 1000;
        this.p5Line5txt1.y = 1010;

        this.p5Line6txt1.x = 420;
        this.p5setsym.x = 105;
        this.p5Line4txt1.x = 400;

        this.p5autosym.y= 1100;
        this.p5autoplaytxt.y= 1100;
        this.p5Line6txt1.y = 1080;

        

    }
}

    

    // if(coreApp.lang == "tr")
    //     {
     
    //       if(_viewInfoUtil.viewType=="VL")
    //         {
    //           console.log("VL tur");
    //           this.p5Line1txt1.x = 1040 ;
    //           this.p5plussym.x = 760 ;
    //           this.p5Line1txt2.x = 820 ;
    //           this.p5minussym.x = 880;
    //           this.p5Line1txt3.x = 400;

    //           this.p5setsym.x= 50;
    //           this.p5infosym.x= 500;
    //           this.p5plussym1.x = 350;
    //           this.p5para2txt1.x= 410;
    //           this.p5minussym1.x = 465;
    //           this.p5para2txt2.x= 765;

    //           this.p5para2txt2pt1.x= 640;
    //           this.p5para2txt2pt1.y= 700;
    //           this.p5para2txt2pt2.x= 640;
    //           this.p5para2txt2pt2.y= 750;

    //           this.p5spinsym.y = 800;
    //           this.p5Line5txt1.y = 800;

    //           this.p5autosym.y = 900;
    //           this.p5autoplaytxt.y = 900;
    //           this.p5Line6txt1.y = 880;


    //         }

    //     }
    //  else{
         
    //         if(_viewInfoUtil.viewType=="VL")
    //             {
    //                 //Page5
    //               console.log("VL eng");
    //               this.p5Line1txt1.x = 260 ;
    //               this.p5plussym.x = 330 ;
    //               this.p5Line1txt2.x = 386 ;
    //               this.p5minussym.x = 440;
    //               this.p5Line1txt3.x = 800;

    //               this.p5plussym1.x = 410;
    //               this.p5para2txt1.x= 480;
    //               this.p5minussym1.x = 550;
    //               this.p5para2txt2.x= 820;

    //               this.p5para2txt2pt1.x= 640;
    //               this.p5para2txt2pt1.y= 700;
    //               this.p5para2txt2pt2.x= 640;
    //               this.p5para2txt2pt2.y= 750;

    //               this.p5spinsym.y = 800;
    //               this.p5Line5txt1.y = 810;

    //               this.p5autosym.y = 900;
    //               this.p5autoplaytxt.y = 900;
    //               this.p5Line6txt1.y = 880;
    //               this.p5setsym.x= 105;
    //               this.p5Line4txt1.x= 660;


                  
  
    //             }
    //     }
    
    if (this.resizablePTContainer) {
        for(var i = 0; i < this.ptContainers.length; i++){
            if(i == 0 && this.ptContainers[i].toLowerCase().indexOf("logo") != -1){
                var topOffset = (this.offsetConfig.top) ? this.offsetConfig.top : 0;
                if(this[this.ptContainers[i]].anchor.y == 0.5){
                    this[this.ptContainers[i]].y = this.elementPadding + this[this.ptContainers[i]].height/2 + topOffset;
                }else{
                    this[this.ptContainers[i]].y = this.elementPadding + topOffset;
                }
            }else if(i >= 1){
                this[this.ptContainers[i]].y = this.elementPadding + this[this.ptContainers[i-1]].y + this[this.ptContainers[i-1]].height;
            }
        }
        this.resizablePTContainer.setSize(_ng.GameConfig.gameLayout[_viewInfoUtil.viewType].width, 0);
    }

   
};