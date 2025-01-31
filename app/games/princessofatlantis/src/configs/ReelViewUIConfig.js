var _ng = _ng || {};

_ng.ReelViewUiConfig = {
    "data": {
        "noOfReels": 6,
        "noOfSymbols": 5,
        "minSpeed":7,
        "maxSpeed":500,
        "spinSpeed":1,
        "anticipationMaxSpeed":50,//reel spinning speed 
		"anticipationDelay":3000, // reel spin duration  
		"anticipationFrames":{
			"frames" : ["anticipation_00","anticipation_01","anticipation_02","anticipation_03","anticipation_04","anticipation_05","anticipation_06","anticipation_07","anticipation_08","anticipation_09","anticipation_10","anticipation_11","anticipation_12"],
			"props" : {x: 240, y:327, scale:{x:0.65,y:0.65}, animationSpeed: 0.3 }			
		},
        "showScatterLand":true,
        "defaultReels": ["dgfcha", "fecfda", "ecddcb","dgfcfb","dgfcgb"],
        "extraAddSymbols": ["z","b","c","d","e","f","g","h","i","s"],
        "symbolConfig": {"symbolWidth": 114, "symbolHeight": 106, "symbolXGap": 10, "symbolYGap": 11},
        "eachReelPos": [62,202,342,482,622,762],
        "maskInfo": {
            "maskType": "1",
            "maskPosition": {x: 129, y: 13, width: 859, height: 600}
        },
       
        "reelPositionsWRTGrid": {x: 145.5, y: -37},
        "reelSpinConfig":{
            "useBlur": true,
            "startJerk":false,
            "startJerkSpeed":500,
            "startJerkDistance":30,

            "endJerk":true,
            "endJerkSpeed":5,
            "endJerkDistance":20,
            
            /*previous reelSpinStartGap - 75, reelStopGap - 75*/
            "reelSpinStartGap": 100,
            "reelStopGap": 100,

            "scatterAccelerationDelay":1000,
            "scatterAccelarion":true,

            "reelStopAfterResponseDelay":1
        },
        "lineWinAmtPos":{
            x:0, y:50
        },
        "lineWinAmountTextPos": {
            y: 0
        },

        "isSymbolFadeInWins": true

    },
    "layout": {
        "VD": {"marginLeft": -95, "marginTop": -2.8, "scale": 0.95},
        "VL": {"marginLeft": -70, "marginTop": -8, "scale": 0.95},
        "VP": {"marginLeft": -100.3, "marginTop":-120, "scale": 0.82}
    },
    "showScatterLand":true,
    "iPadLayout": {
        "VD": {
            "marginLeft": 0,
            "marginTop": 0,
            "scale": 1
        },
        "VL":{
            "marginLeft": -73,
            "marginTop": -15,
            "scale": 0.95
        },
        "VP": {
            "marginLeft": -109,
            "marginTop": -123,
            "scale":0.875
        }
    },
    "reelGridBottom": {
        "image": "reel_bg",
        "id": "reelGridBottom",
        "type": "sprite",
        // "image": "reels",
        // "type": "Spine",
        // "defaultAnimation": "animation",
        "props": {
            "VD": { x: 131, y:13,  scale:0.72,},
            "VL": { x: 650, y: 308, scale: 0.5},
            "VP": { x: 0,   y: 0,   scale: 0.5},

 
        }
    },
    "fsReelGridBottom": {
            "image": "reel_fg",
            "id": "fsReelGridBottom",
            "type": "sprite",
            // "image": "reels",
            // "type": "Spine",
            // "defaultAnimation": "animation",
            "props": {
                "VD": { x: 131, y:13,  scale: 0.72},
                "VL": { x: 650, y: 308, scale: 0.5},
                "VP": { x: 0,   y: 0,   scale: 0.5}

            }
        },
    "reelGridTop": {
        "image": "reel_frame",
        "id": "reelGridTop",
        "type": "sprite",        
        "props": {
            "VD": {x: 121, y:  -9,  scale:0.72},
            "VL": {x: 133, y:   0,  scale: 0.5},
            "VP": {x: 10,  y: -70,  scale: 0.5}
        }
    },

}