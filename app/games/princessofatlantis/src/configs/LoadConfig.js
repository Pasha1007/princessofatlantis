var _ng = _ng || {};

_ng.LoadConfig = {
    "gameFiles": {
        "common": [
//            "libs/pixi-spine3.7v5.js",
             "libs/pixi-spine4.1.js",

            "configs/BGUIConfig.js",
            "configs/SuperMeterConfig.js",
            "controllers/GSlotController.js",
            "controllers/GWinController.js",
            "controllers/GPanelController.js",
            "configs/ReelViewUIConfig.js",
            "configs/PaytableViewUIConfig.js",
            "views/GReelSymbol.js",
            "views/GView.js",
            "views/GReelView.js",
            "views/GPanelView.js",
            "views/GWinView.js",
            "views/GReelStrip.js",
            "model/gSpinData.js",
            "model/GCoreApp.js",
            "model/GPanelModel.js",
            "model/GfsModel.js",
            "model/GCSpinData.js",
            "views/GInfoPopupView.js",
            "views/GBGView.js",
            "views/GSoundLib.js",
            "views/GBigWinView.js",
            "views/GIntroView.js",

             "views/GSettingView.js",
             "views/GTickerBox.js",
             "views/GSlider.js",
 
             "controllers/GTickerViewController.js",
             "model/GSlotModel.js",
             "controllers/GreelController.js"
             
         
        ],
        "Desktop": [
            "views/GPanelDesktopView.js",
            "views/GPaytableDesktopView.js",
            "views/GSettingsDesktopView.js",
        ],
        "Mobile": [
            "views/GPanelMobileView.js",
            "views/GSettingsMobileView.js",
            // "views/GPanelMobileView.js",
            "views/GPaytableMobileView.js",  
        ]
    },
    'gameLoadingAssets': {
    },
    'gamePrimaryAssets': {
        "common": {
            "allResolutions": [
                "paytable.json", "symbols.json", "menu0.json",
                "winnum-export.xml","featureBitmapFont-export.xml","numbers-export.xml","buyPanel_font.xml","multipliyer_font.xml","winAmount_font.xml","Bit-1_font.xml","buy_popup.json",
                "popAnim-0.json","tumbleWin.json","continuebtn.json","Logo_new.json","multipliers.json","all win bg chopped final.json","static_logo.json","Game logo.json","Dolphine.json",
                 "tickerbase.json","BG_frame.json","reel_bg.json","FG_frame.json","loading.json","BuyFreespinPanel.json","buyPopup-bg.json","congratulations.json","betChance.json","buyPanel.json",
                 "IntroScreen-0.json","introscreen-1.json","portraitBuyFeature.json","CoinShower-0.json","CoinShower-1.json","fadingTexts.json","number_10x.json","number_12x.json","number_15x.json",
                 ,"number_20x.json","number_25x.json","number_50x.json","number_100x.json","skeleton.json","numbers.json","sugarBoxFont-export.xml","extraAssets.json","Candy_box.json",,"autoSpinBase.json","panelButtons.json","newGamePanel.json","autoplaybase.json","autoplayPopup.json","betPopup.json",,"newSetting.json","closesetting.json","autoSpin.json","turboActive.json","volumeBar.json","stopButtonAssets.json",
                 "spinButton.json","radioButton.json","playstpbtn.json","base game bg.json","jelly fish.json","pearl.json","royals.json","mermaid.json","treasure box.json","trident.json",
                //  "scatter_fill-0.json", "scatter_fill-1.json", "scatter_fill-2.json", "scatter_fill-3.json", "scatter_fill-4.json", "scatter_fill-5.json", "scatter_fill-6.json", "scatter_fill-7.json", "scatter_fill-8.json", "scatter_fill-9.json", "scatter_fill-10.json", "scatter_fill-11.json", "scatter_fill-12.json", "scatter_fill-13.json", "scatter_fill-14.json", "scatter_fill-15.json",
            ],
            "@2x": []
        },
        "Desktop": {
            "allResolutions": ["newGamePanel.json"],
            "@2x": []
        },
        "Mobile": {
            "allResolutions": ["newGamePanel.json"],
            "@2x": []
        }
    },
    "secondaryAssets": [
        {
            "assets": {
                "common": {
                    "allResolutions": [
                       
                        
                    ],
                    "@2x": []
                },
                "Desktop": { "allResolutions": [], "@2x": [] },
                "Mobile": {
                    "allResolutions": [],
                    "@2x": []
                }
            }
        }
    ],
    "fontsToLoad": {
        "primaryFonts": {
            "ProximaNova_Bold": "ProximaNova_XtraConmdcensedBold.woff",
            "ProximaNova": "ProximaNova_XtraConmdcensedRegular.woff",
            "Britanic_Bold": "BRITANIC.ttf",
            "andadaBold": "andadaBold.otf",
            "Saman": "saman.ttf"
        }
    }
};
