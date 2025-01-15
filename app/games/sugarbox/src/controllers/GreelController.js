
var grc = ReelController.prototype;

grc.onStopSpinNowHandler = function (argument) {
	if((_ng.isQuickSpinActive && _ng.quickSpinType==="turbo")  ){
		this.view.quickSpinStop(this.model.spinData.getReels());
	}
    else if(_ng.isForceAllowed)
    {
        this.view.quickSpinStopDelay(this.model.spinData.getReels());
    }
    else{
		this.view.stopSpinNow(this.model.spinData.getReels());
	}
};