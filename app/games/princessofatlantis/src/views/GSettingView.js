var quickBtnSettingsStatus = false;

var GsView = SettingsView.prototype;


GsView.volumeChange = function (vol) {
    // this.volumeBar.setValue(vol);
}
GsView.createView = function () {
    this.autoSpinSelNum = 10;
    this.createSettingsPanel();
    this.createMenu();
    this.addSettingsEvents();

    this.createVolumebar();
    this.createAutoSpinSliders();
    this.updateGameNameInTitle();
    this.setOperatorText();
    _mediator.subscribe("toggleQuickSpinSettings", this.toggleQuickSpinSettings.bind(this));
    
};

GsView.toggleQuickSpinSettings = function (bool) {
    quickBtnSettingsStatus = bool;
    this.quickSpinOn.visible = bool;
    this.quickSpinOff.visible = !bool;
};

GsView.addSettingsEvents = function () {
    // this.infoButton.on("click", this.onInfoButtonClick.bind(this));
    _mediator.subscribe("settingVolumeChange", this.onSettingVolumeChange);
    _mediator.subscribe("lossLimitChange", this.onLossLimitChange.bind(this));
    _mediator.subscribe("winLimitChange", this.onWinLimitChange.bind(this));

        //game history link 
        if (this.historyTitle) {
            if (commonConfig.hideHistoryButtonForDemo && coreApp.isDemoMode) {
                this.historyTitle.visible = false;
                this.historyTitle.alpha = 0;
            }
            pixiLib.setInteraction(this.historyTitle, true);
            pixiLib.addEvent(this.historyTitle, this.onGameLogsClick.bind(this));
        }
}