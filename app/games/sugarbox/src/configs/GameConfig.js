var _ng = _ng || {};

_ng.GameConfig = {
    "displayName": "Sugar Box",
    "gameName": "sugarbox",
    "gameId": 716,//1081,
    "spineSymbolHit":true,
    "game_version":"v1.1.3",
    "rtp":"RTP 94%",
    //TODO ADD loading incremental files
    // "gameId": 2081,
    "sub_game_id":1,
    // "noStopSpin":true,
    "FG_sub_game_id":2,
    "spin_sub_game_id":1,
    "featureType": "ProgressFeature",
    "totalAssets":136,
    "paylines": 1,
    "totalWinDuration": 1440,
    "enterIntoFreeGameDuration": 200,
    "enterIntoFreeGameDurationTurbo": 50,
    "fixedPaylines": true,
    "paylinesType": "fixed",
    "expandingSymbol": "s",
    "aniticipateSymbol": ["s"],
    "AnticipateReq":false,
    "defaultReels": ["agfeb", "afgeb", "afcdb", "aefcb", "acedb","hfceb"],
    "FastAnim":false,
    "TurboOn":false,
    "spaceBarHoldTimeout":200,
    "quickSpinInfoPopupShown" : false,
    "CyprusCore":true,
    "PFSUseLater":false,
    "baseReels":[
                    "cfikgafhkafjefikjaghdjfehigkedhejigfjdihbikjcdishbgjhbksehcgkjcik",
                    "jghabkfdaeijefkgcjeksidahbjkwdhaigdbjcfhkfwjcdiehgkijckbsghkcbjwi",
                    "jdbdjkfhgcajefgicjeswifagwckbdhjgfbhjkfdbgfjawkihgkihjkaecbhkisek",
                    "jghadkgjdbkjafigsjekdiagjickeswbifahjcfwhefjhkiahckigbkjcedkbdwci",
                    "adichkjhedkcgfdigaehjkibhickfghajidfjcghsikjchikhfcjgbkdsbejigekj"
                    ], 
    "fsReels":[
                    "cfikgafckafjefbkjaghdjfehigkedhejigfjdihbikjcdighbgjhbkdehcgkjcik",
                    "jgheckfdaeijwwwhfjekfidahgjkwwwaigdbjcfhkfwwwdiehgkijckbeghkcbjhi",
                    "jdbdjkfigcajefgicjwwwifagickbdhjgfbhjkfdbgfwwwkihgkihjkaecbhkihek",
                    "jghadkgjdbkjafeghjekdiagjickwwwbifahjcfwwwfjhkiahckigbkjcedkbdfci",
                    "adichkjhedkcgfdigaehjkibhickfghajidfjcgheikjchikhfcjgbkdfbejigekj"
                    ], 


    "specialWins": {
        "nice": {
            "multiplier": 1,
            "title": "Big Win",
            "sprite": "bigWinLogo"
        },
        "omg": {
            "multiplier": 40,
            "title": "Big Win",
            "sprite": "bigWinLogo"
        },
        "super_win": {
            "multiplier": 70,
            "title": "Big Win",
            "sprite": "bigWinLogo"
        },
        "fantastic_win": {
            "multiplier": 95,
            "title": "Mega Win",
            "sprite": "megaWinLogo"
        },
        "max_win": {
            "multiplier": 10000,
            "title": "Super Big Win",
        },
        "totalWin": {
            "textStyle": {
                "type": "BitmapFont",
                "fontName": "winnum-export",
                "fontSize": 25
            },
            props: {
                desktopParams: { x: 640, y: 380, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 340,
                VX: 360, VY: 650, portScaleX: 0.59, portScaleY: 0.59
            }
        },
        "lineWin": {
            // "textStyle":{
            //     "type":"BitmapFont",
            //     "fontName": "35px bitmap1x-export"
            // }
            "textStyle": {
                fill: 0xffffff,
                "fontSize": 30,
                "fontFamily": "ProximaNova_Bold"
            }
        }

    },

    "classes": {
        //Libs or the one's which are without namespace
        "libs": {
            "_mediator": "Mediator"
        },
        "core": {
            "separateClasses": {
                "viewInfoUtil": "ViewInfoUtil",
                "gameController": "SlotController",
                "gameView": "SlotView",
                "gameModel": "SlotModel",
                "gameService": "SlotService",
            },
            "viewControllers": {
                "preloader": ["PreloaderView", "PreloaderController"]
            }
        },

        "slots": {},

        "game": {}
    }
};
