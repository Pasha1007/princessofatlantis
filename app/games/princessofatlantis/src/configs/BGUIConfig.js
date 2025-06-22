var BGViewUiConfig = [
  {
    "image": "base game bg",
    "id": "bgImg",
    //button/image/text/container
    // "type": "sprite",
    "isSeparatePortraitImage": true,
    "type": "Spine",
    "potraitAnimation" : "Free Game_portrait",                                      //static image case not added.Update later
    "defaultAnimation": "Free Game_desktop",
    "isSizeDoubled": false,
    "isAnchored": true,
    //only for text
    //"textStyle":"winAmountStyle",
    //only for containerjs
    //has chilren
    //only for buttons
    //default state  disable/enable
    //only for text
    //defautl text
    //"alignment" to be used only for mobiles: 
    //0: CENTER CENTER, 1: TOP LEFT 2: TOP CENTER, 3: TOP RIGHT 4: RIGHT CENTER
    //5: BOTTOM RIGHT 6: BOTTOM CENTER 7: BOTTOM LEFT 8: LEFT CENTER
    "props": {
      "VD": {
        "x": 640, "y": 360,
        anchor: { x: 0.5, y: 0.5 },
        scale: {x: 0.67, y: 0.67}
      },
      "VL": { alignment: 12, scale: { x: 0, y: 0 } },    //Adjust the x and y for VL and VP in GBGView.js 
      "VP": { alignment: 12, scale: { x: 0, y: 0 } },   //Add Anchor property 0.5 in the case of sprite
    }
  },
  {
    "image": "base game bg",
    "id": "fsImg",
    // "type": "sprite",
    "isSeparatePortraitImage": true,
    "type": "Spine",
    "potraitAnimation" : "Base Game_portrait",  //Portrait seperate sprite image case not added.
    "defaultAnimation": "Base Game_desktop",
    "isSizeDoubled": false,
    "isAnchored": true,
    //"alignment" to be used only for mobiles:
    //0: CENTER CENTER, 1: TOP LEFT 2: TOP CENTER, 3: TOP RIGHT 4: RIGHT CENTER
    //5: BOTTOM RIGHT 6: BOTTOM CENTER 7: BOTTOM LEFT 8: LEFT CENTER
    "props": {
      "VD": {
        "x": 640, "y": 360,
        anchor: { x: 0.5, y: 0.5 },
        scale: {x: 0.67, y: 0.67}
      },
      "VL": { alignment: 12, scale: { x: 0, y: 0 } },    //Adjust the x and y for VL and VP in GBGView.js 
      "VP": { alignment: 13, scale: { x: 0, y: 0 } },   //Add Anchor property 0.5 in the case of sprite
    }
  }
];
