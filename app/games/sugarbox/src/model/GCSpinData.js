var spinInfo = SpinData.prototype;

spinInfo.saveGameSpecInitData = function (obj) {

    this.smBalance = 0;
    this.smCoinValues = [];
    this.antebet=0;
    this.buyfg=0;

    if (obj.player) {
        this.smBalance = obj.player.balance2 || 0;
    }
    if (obj.game) {
        this.smCoinValues = obj.game.coin_values2 || obj.game.coin_values;
        this.smCoinValues = this.smCoinValues.split(';');
        this.antebet = obj.game.extra_info.ante_bet;
        this.buyfg = obj.game.extra_info.BuyFg;
    }
    this.proMulti = 1;
}