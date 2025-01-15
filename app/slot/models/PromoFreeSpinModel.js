PromoFreeSpinModel = function () {
	this.isPFSTriggered = false;
	this.isPFSEnded = false;
	this.isPFSActive = false;
	this.isFullPFSActive = false;		//will be set false only on listening on onFSEndShown

	this.totalPromoFreeSpins = 0;
	this.totalFSTriggered = 0;
	this.remainingPromoFreeSpins = 0;

	this.totalPFSWins = 0;

	this.PFSData = {};
	// this.totalFSWin = 0;
	// this.multiplier = 0;
};

var pfsModel = PromoFreeSpinModel.prototype;

//"{"amount_type":3,"amount":200,"num_coins":10,"coin_value":1,"num_spins":20,"spins_left":20}"
pfsModel.saveInitData = function (obj) {
	if (obj.promo_details && obj.promo_details.type == "promospins") {
		this.isPFSTriggered = true;
		this.isPFSEnded = false;
		this.isPFSActive = true;
		this.isFullPFSActive = true;

		this.totalPromoFreeSpins = obj.promo_details.num_spins;
		this.remainingPromoFreeSpins = obj.promo_details.spins_left;

		this.totalPFSWins = obj.promo_details.win_amount;

		this.PFSData = obj.promo_details;
	}
}
pfsModel.saveSpinData = function (obj) {
	if (obj.promo_details && obj.promo_details.spins_left !== undefined) {
		this.isPFSTriggered = false;
		this.isPFSEnded = false;
		this.isPFSActive = true;
		this.isFullPFSActive = true;

		this.totalPromoFreeSpins = obj.promo_details.num_spins;
		this.remainingPromoFreeSpins = obj.promo_details.spins_left;

		this.totalPFSWins = obj.promo_details.win_amount;

		this.PFSData = obj.promo_details;
		
		if(obj.promo_details.spins_left == 0){
			this.isPFSEnded = true;
			this.isPFSActive = false;
		}
	}
}
pfsModel.getPFSData = function(){
	return this.PFSData;
}