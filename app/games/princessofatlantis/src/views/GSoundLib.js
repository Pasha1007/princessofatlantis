var s = SoundLib.prototype.constructor;
s.prototype.playBg = function (nameObj) {
    var name = (typeof (nameObj) == "string") ? nameObj : nameObj.name;
    var volume = (nameObj.volume != undefined) ? nameObj.volume : 1;
    if (_ng.isAmbienceSoundActive == false) {
        return;
    }
    this.bgMaxVolume = volume;
    if (this.bgId) {
       if (this.bgId in this.primaryList) {
            this.primSndCtr.fade(volume, 0, 1000, this.curSndList[this.bgId]);
        } else {
            this.sndCtr.fade(volume, 0, 1000, this.curSndList[this.bgId]);
        }
    }
    // console.log("BG Volume = ", volume, nameObj);
    if (name in this.primaryList) {
        // if (this.bgId) {            
        //     this.primSndCtr.fade(volume, 0, 1000, this.curSndList[this.bgId]);
        // }
        this.bgId = name;
        this.curSndList[name] = this.primSndCtr.play(name);
        this.primSndCtr.fade(0, volume, 1000, this.curSndList[this.bgId]);
        this.primSndCtr.loop(true, this.curSndList[this.bgId]);
    } else if (name in this.secondaryList) {
        this.bgId = name;
        this.curSndList[name] = this.sndCtr.play(name);
        this.sndCtr.fade(0, volume, 1000, this.curSndList[this.bgId]);
        this.sndCtr.loop(true, this.curSndList[this.bgId]);
    }
};
s.prototype.stopBg = function () {
    if (this.bgId in this.primaryList) {
        this.primSndCtr.stop(this.curSndList[this.bgId]);
    } else if (this.bgId in this.secondaryList) {
        this.sndCtr.stop(this.curSndList[this.bgId]);
    }
};

s.prototype.focusSound = function (bool) {
    if (!bool) {
        this.setPreviousVolume(this.curVolume);
        this.onWindowChangeVolume = this.curVolume;
        this.mute(true, true);
    } else if (this.sndState) {
        var volume = (_sndLib.onWindowChangeVolume) ? _sndLib.onWindowChangeVolume : _sndLib.curVolume;
        this.setVolume(volume);
        this.mute(false);
    }
};

s.prototype.focusSoundOn = function() {

    this.setPreviousVolume(this.onWindowChangeVolume);
    if(!this.muteState){
        this.setVolume(this.previousVolume?this.previousVolume:1);
    }

    /* commented because this is causing issue in some browsers in mobile
    issue - sound is not playing after focus in on the tab */

    // try{
    //     _mediator.publish("SHOW_LOG", "focus on");            
    // }catch(e){}                                                                              
}