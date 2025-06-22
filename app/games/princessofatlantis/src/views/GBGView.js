var view = BGView.prototype;

view.createView = function () {
	// console.log("bg view created ---!");
	this.viewConfig = BGViewUiConfig;
	for (var i = 0; i <this.viewConfig.length; i++) {
		this[this.viewConfig[i].id] = this.getElement(this.viewConfig[i]);
		this.addChild(this[this.viewConfig[i].id]);
		pixiLib.setProperties(this[this.viewConfig[i].id], this.viewConfig[i].props[_viewInfoUtil.viewType]);

		//if children exsits
		if(this.viewConfig[i].type ==="container" && this.viewConfig[i].children){
			var tempChildren = this.viewConfig[i].children;

			for (var j = 0; j < tempChildren.length; j++) {
				this[this.viewConfig[i].id][tempChildren[j].id] = pixiLib.getElement(tempChildren[j]);
				var temp = this[this.viewConfig[i].id][tempChildren[j].id];
				this[this.viewConfig[i].id].addChild(temp);
				pixiLib.setProperties(temp, tempChildren[j].props[_viewInfoUtil.viewType]);
			}
		}

		//TODO: SPRITE IMAGE CASE
		if(this.viewConfig[i].type === "Spine" && this.viewConfig[i].defaultAnimation) {
			if(_viewInfoUtil.viewType == "VP" && this.viewConfig[i].isSeparatePortraitImage)
				this[this.viewConfig[i].id].state.setAnimation(0, this.viewConfig[i].potraitAnimation, true);
			else
				this[this.viewConfig[i].id].state.setAnimation(0, this.viewConfig[i].defaultAnimation, true);
			if (this.viewConfig[i].timeScale){
				this[this.viewConfig[i].id].state.timeScale = this.viewConfig[i].timeScale;
			}
		}
	}
	if(this.fsImg){
		this.fsImg.alpha = 0;
	}
	this.createExtraElements();
	this.resize();
};

view.resizeBGImage = function(bg){
	var gameWidth, gameHeight, scaleX, scaleY, scale;
	if(!bg.isSeparatePortraitImage){
		gameWidth = _ng.GameConfig.gameLayout.VL.width;
		gameHeight = _ng.GameConfig.gameLayout.VL.height;
	}else{
		gameWidth = _ng.GameConfig.gameLayout[_viewInfoUtil.viewType].width;
		gameHeight = _ng.GameConfig.gameLayout[_viewInfoUtil.viewType].height;

		//changing Animation
		if(_viewInfoUtil.viewType == "VP" && bg.type === "Spine")
			this[bg.id].state.setAnimation(0, bg.potraitAnimation, true);
		else
			this[bg.id].state.setAnimation(0, bg.defaultAnimation, true);

		//TODO: SPRITE IMAGE CASE
	}

	scaleX = _viewInfoUtil.getWindowWidth() / gameWidth;
	scaleY = _viewInfoUtil.getWindowHeight() / gameHeight;
	scale = Math.max(scaleX, scaleY);

	//when using 2x spine
	if(bg.isSizeDoubled){
		scale = scale * 0.5;
	}
	this[bg.id].scale.set(scale);

	if(bg.props[_viewInfoUtil.viewType].alignment !== undefined){
		switch(bg.props[_viewInfoUtil.viewType].alignment){
			case 0:
			// 0: CENTER CENTER
				pixiLib.setProperties(this[bg.id], {x: _viewInfoUtil.getWindowWidth() / 2, y: _viewInfoUtil.getWindowHeight() / 2, anchor: {x: 0.5, y: 0.5}});
			break;
			case 1:
			// 1: TOP LEFT
				if(this[bg.id].anchor){
					pixiLib.setProperties(this[bg.id], {x: 0, y: 0, anchor: {x: 0, y: 0}});
				}else if (this[bg.id].pivot){
					var pivotX = (bg.props[_viewInfoUtil.viewType].pivotOffset && bg.props[_viewInfoUtil.viewType].pivotOffset.x) ? bg.props[_viewInfoUtil.viewType].pivotOffset.x : 0;
					var pivotY = (bg.props[_viewInfoUtil.viewType].pivotOffset && bg.props[_viewInfoUtil.viewType].pivotOffset.y) ? bg.props[_viewInfoUtil.viewType].pivotOffset.y : 0;
					pixiLib.setProperties(this[bg.id], {x: 0, y: 0, pivot: {x: pivotX, y: pivotY}});
				}
			break;
			case 2:
			// 2: TOP CENTER
				pixiLib.setProperties(this[bg.id], {x: _viewInfoUtil.getWindowWidth() / 2, y: 0, anchor: {x: 0.5, y: 0}});
			break;
			case 3:
			// 3: TOP RIGHT
				if(this[bg.id].anchor){
					pixiLib.setProperties(this[bg.id], {x: _viewInfoUtil.getWindowWidth(), y: 0, anchor: {x: 1, y: 0}});
				}else if (this[bg.id].pivot){
					var imageWidth = (bg.isSizeDoubled) ? 2560 : 1280;
					var pivotX = (bg.props[_viewInfoUtil.viewType].pivotOffset && bg.props[_viewInfoUtil.viewType].pivotOffset.x) ? bg.props[_viewInfoUtil.viewType].pivotOffset.x : 0;
					var pivotY = (bg.props[_viewInfoUtil.viewType].pivotOffset && bg.props[_viewInfoUtil.viewType].pivotOffset.y) ? bg.props[_viewInfoUtil.viewType].pivotOffset.y : 0;
					pixiLib.setProperties(this[bg.id], {x: _viewInfoUtil.getWindowWidth(), y: 0, pivot: {x: pivotX + imageWidth, y: pivotY}});
				}
			break;
			case 4:
			// 4: RIGHT CENTER
				pixiLib.setProperties(this[bg.id], {x: _viewInfoUtil.getWindowWidth(), y: _viewInfoUtil.getWindowHeight() / 2, anchor: {x: 1, y: 0.5}});
			break;
			case 5:
			// 5: BOTTOM RIGHT
				pixiLib.setProperties(this[bg.id], {x: _viewInfoUtil.getWindowWidth(), y: _viewInfoUtil.getWindowHeight(), anchor: {x: 1, y: 1}});
			break;
			case 6:
			// 6: BOTTOM CENTER
				if(this[bg.id].anchor){
					pixiLib.setProperties(this[bg.id], {x: _viewInfoUtil.getWindowWidth() / 2, y: _viewInfoUtil.getWindowHeight(), anchor: {x: 0.5, y: 1}});
				}else if (this[bg.id].pivot){
					var imageWidth = (bg.isSizeDoubled) ? 2560 : 1280;
					var imageHeight = (bg.isSizeDoubled) ? 1440 : 720;
					var pivotX = imageWidth / 2;
					var pivotY = imageHeight;
					pixiLib.setProperties(this[bg.id], {x: _viewInfoUtil.getWindowWidth() / 2, y: _viewInfoUtil.getWindowHeight(), pivot: {x: pivotX, y: pivotY}});
				}
			break;
			case 7:
			// 7: BOTTOM LEFT
				pixiLib.setProperties(this[bg.id], {x: 0, y: _viewInfoUtil.getWindowHeight(), anchor: {x: 0, y: 1}});
			break;
			case 8:
			// 8: LEFT CENTER
				pixiLib.setProperties(this[bg.id], {x: 0, y: _viewInfoUtil.getWindowHeight() / 2, anchor: {x: 0, y: 0.5}});
			break;
			case 9:
			// 9: Strech to width and height
				pixiLib.setProperties(this[bg.id], {x: 500, y: 380, anchor: {x: 0, y: 0}});
				this[bg.id].width = _viewInfoUtil.getWindowWidth() * 1.5;
				this[bg.id].height = _viewInfoUtil.getWindowHeight()* 1.5;
			break;
			case 10:
				pixiLib.setProperties(this[bg.id], { x: (_viewInfoUtil.getWindowWidth()/2), y: (_viewInfoUtil.getWindowHeight() / 2)-130, anchor: { x: 0.5, y: 0.5 } });
				this[bg.id].width = _viewInfoUtil.getWindowWidth()*4;
				this[bg.id].height = _viewInfoUtil.getWindowHeight()*1.7;
				//,scale:{x:0.27, y:0.45 }
				break;
	
			case 11:
				pixiLib.setProperties(this[bg.id], { x: (_viewInfoUtil.getWindowWidth() / 2)-100, y: (_viewInfoUtil.getWindowHeight() / 2)-37, anchor: { x: 0.5, y: 0.5 } });
				// this[bg.id].width = _viewInfoUtil.getWindowWidth()+30;
				// this[bg.id].height = _viewInfoUtil.getWindowHeight()+30;
				break;
			case 12:
			//set according to window dimensions
			pixiLib.setProperties(this[bg.id], {x: _viewInfoUtil.getWindowWidth() / 2, y: _viewInfoUtil.getWindowHeight()/2});
			this[bg.id].width = _viewInfoUtil.getWindowWidth()+50;
			this[bg.id].height = _viewInfoUtil.getWindowHeight()+40;
			break;

			case 13:
                        			//set according to window dimensions
            pixiLib.setProperties(this[bg.id], {x:(_viewInfoUtil.getWindowWidth()/2) , y: _viewInfoUtil.getWindowHeight()/2-0.5 });
            this[bg.id].width = _viewInfoUtil.getWindowWidth();
            this[bg.id].height = _viewInfoUtil.getWindowHeight();
            break;

			default:
			break;
		}
	}
}
/*For Changing texture on win- Implement later*/ 
view.changeBgAnimationOnWin = function() {

}
