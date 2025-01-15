var preType = "common";
// preType = gameName;

preloaderConfig = {
  "preloader": { "file": "preloader0.json", "path": "games/" + preType + "/dist/@1x/" },
  // "brandLogo": { "file": "preloader.json", "path": "games/" + preType + "/dist/@1x/" },
  "sound": { "file": "preloaderSnd.mp3", "path": "games/" + preType + "/dist/sounds/", "volume": 0.5 },

  "hideLogo": false,

  /*"logoConfig": {
    "type": "static", //static  //spriteAnimation  
    "showBarOnFrame": 125,
    "prefixName": "intro-logo", "startIndex": 0, "endIndex": 49, "digit": "dual", "animationSpeed": 0.5,
  },*/

  // "preBg": {
  //   "img": "preloaderBg",
  //   "VD": { x: 0, y: -50, anchor: 0.5, scale: 1 },
  //   "VL": { x: 0, y: -50, anchor: 0.5, scale: 1 },
  //   "VP": { x: 0, y: 0, anchor: 0.5, scale: 1 }
  // },

  "preLogo": {
    "img": "preloaderLogo",
    "VD": { x: 0, y: -50, anchor: 0.5, scale: 1 },
    "VL": { x: 0, y: -50, anchor: 0.5, scale: 1 },
    "VP": { x: 0, y: 0, anchor: 0.5, scale: 1.3 }
  },

  "preBar": {
    "barBg": "loadingBarBG",
    "barFill": "loadingBarFill",
    "VD": { x: -168, y: 60, scale: 1 },
    "VL": { x: -168, y: 60, scale: 1 },
    "VP": { x: -330, y: 115, scale: 2 }
  },

}


var siteCode = getUrlVar("full_site_code");
var networkCode = "";
if (siteCode) networkCode = siteCode.slice(2, 5);


switch (networkCode) {
  // case "AGM":
  //   preloaderConfig["logoConfig"] = {};
  //   break
  default:
    break
}

switch (siteCode) {
  // case "EGDEVES":
  //   preloaderConfig["logoConfig"] = {};
  //   break
  default:
    break
}

switch (gameName) {

    case "fruityjewels":
      preloaderConfig = {
        // "preloader": { "file": "introLoading-0.json", "path": "games/" + gameName + "/dist/@1x/" },
        "preloader": { "file": "loading.json", "path": "games/" + gameName + "/dist/"+lang+"/@1x/" },
     //  "image": { "file": "background_Portrait.json", "path": "games/" + gameName + "/dist/@1x/" },
         "brandLogo": { "file": "bastaPlayLogo.json", "path": "games/" + gameName + "/dist/"+lang+"/@1x/" },
        //  "image": { "file": "LogoAnim-0.json", "path": "games/" + gameName + "/dist/@1x/" },
        // "sound": { "file": "preloaderSnd.mp3", "path": "games/" + gameName + "/dist/sounds/", "volume": 0.5 },
 
        "hideLogo": false,
        
        "logoType" :"spriteAnimation",

        "spriteAnimObj": {
          "type": "spriteAnimation", //static  //spriteAnimation
          "showBarOnFrame": 125,
          "prefixName": "bastaPlayLogo", "startIndex": 0, "endIndex": 105, "digit": "triple", "animationSpeed":  0.8,
        },
 
        // "logoConfig": {
        //   "type": "static", //static  //spriteAnimation  
        //   "showBarOnFrame": 125,
        //   "prefixName": "intro-logo", "startIndex": 0, "endIndex": 49, "digit": "dual", "animationSpeed": 0.5,
        // },
 
        "preBg": {
          "img": "Loading_BG",
          "VD": { x: 0, y: 0, anchor: 0.5, scale: 1 },
          "VL": { x: 0, y: 0, anchor: 0.5, scale: 1 },
          "VP": { x: 0, y: 0, scale: 0}
        },
 
        // "preBg1":{
        //   "img": "background_Portrait",
        //   "VP": { x: 0, y: 0, scale: 1}
 
        // },
        "preCompLogo":{
          "img": "companyLogo",
          "VD": { x: 0, y: 140, anchor: 0.5, scale: 0.15},
          "VL": { x: 0, y: -300, anchor: 0.5, scale: 0.2 },
          "VP": { x: 0, y: -600, anchor: 0.5, scale: 0.35 }
        },
        "preLogo": {
          "img": "Game_Logo",
          "VD": { x: -2, y: 0, anchor: 0.5, scale:1.5 },
          "VL": { x: 0, y: 10, anchor: 0.5, scale: 1.5},
          "VP": { x: -10, y: -100, anchor: 0.5, scale: 2.5 }
        },

         "preLogo2": {
                  "img": "Game_Logo",
                  "VD": { x: -2, y: 0, anchor: 0.5, scale:1.5 },
                  "VL": { x: 0, y: 10, anchor: 0.5, scale: 1.5 },
                  "VP": { x: -10, y: -100, anchor: 0.5, scale: 2.5 }
                },
 
        // "logoAni": {
        //   "img": "Loading_Base",
        //   "VD": { x: -3, y: 100, anchor: 0.5, scale: 1 },
        //   "VL": { x: 0, y: 0, anchor: 0.5, scale: 1 },
        //   "VP": { x: 0, y: 0, anchor: 0.5, scale: 1 }
     //   },
 
        "preTxt": {
          "img": "LOADING_",
          "VD": { x: 140, y: 120, scale: 1.5 },
          "VL": { x: 140, y: 120, scale: 2 },
          "VP": { x: 155, y: 120, scale: 2 }
        },
 
        "preCounterTxt": {
          "VD": { x: 330, y: 120 ,scale:1.5},
          "VL": { x: 360, y: 120, scale: 2},
          "VP": { x: 375, y: 120, scale:{x:2,y:2} }
        },
 
        "preBar": {
          "barBg": "Base",
          "barFill": "Filling",
          "VD": { x: -165, y: 200, scale: 0.6 },
          "VL": { x: -160, y: 160, scale: 0.6 },
          "VP": { x: -280, y: 250, scale: 1 }
        },
/*for Translating loading text according to language
en - english
tr - turkish
*/
        "loadingTxt": {
          "en": "LOADING....",
          "tr": "Yükleniyor....",
        }
 
      }
      break;

      case "sugarbox":
            preloaderConfig = {
              // "preloader": { "file": "introLoading-0.json", "path": "games/" + gameName + "/dist/@1x/" },
              "preloader": { "file": "loading.json", "path": "games/" + gameName + "/dist/"+lang+"/@1x/" },
           //  "image": { "file": "background_Portrait.json", "path": "games/" + gameName + "/dist/@1x/" },
               "brandLogo": { "file": "bastaPlayLogo.json", "path": "games/" + gameName + "/dist/"+lang+"/@1x/" },
              //  "image": { "file": "LogoAnim-0.json", "path": "games/" + gameName + "/dist/@1x/" },
              // "sound": { "file": "preloaderSnd.mp3", "path": "games/" + gameName + "/dist/sounds/", "volume": 0.5 },

              "hideLogo": false,

              "logoType" :"spriteAnimation",

              "spriteAnimObj": {
                "type": "spriteAnimation", //static  //spriteAnimation
                "showBarOnFrame": 125,
                "prefixName": "bastaPlayLogo", "startIndex": 0, "endIndex": 105, "digit": "triple", "animationSpeed":  0.8,
              },

              // "logoConfig": {
              //   "type": "static", //static  //spriteAnimation
              //   "showBarOnFrame": 125,
              //   "prefixName": "intro-logo", "startIndex": 0, "endIndex": 49, "digit": "dual", "animationSpeed": 0.5,
              // },

              "preBg": {
                "img": "Loading_BG",
                "VD": { x: 0, y: 0, anchor: 0.5, scale: 1 },
                "VL": { x: 0, y: 0, anchor: 0.5, scale: 1 },
                "VP": { x: 0, y: 0, scale: 0}
              },

              // "preBg1":{
              //   "img": "background_Portrait",
              //   "VP": { x: 0, y: 0, scale: 1}

              // },
              "preCompLogo":{
                "img": "companyLogo",
                "VD": { x: 0, y: 140, anchor: 0.5, scale: 0.15},
                "VL": { x: 0, y: -300, anchor: 0.5, scale: 0.2 },
                "VP": { x: 0, y: -600, anchor: 0.5, scale: 0.35 }
              },
              "preLogo": {
                "img": "Game_Logo",
                "VD": { x: -2, y: 0, anchor: 0.5, scale:1.5 },
                "VL": { x: 0, y: 10, anchor: 0.5, scale: 1.5},
                "VP": { x: -10, y: -100, anchor: 0.5, scale: 2.5 }
              },

               "preLogo2": {
                        "img": "Game_Logo",
                        "VD": { x: -2, y: 0, anchor: 0.5, scale:1.5 },
                        "VL": { x: 0, y: 10, anchor: 0.5, scale: 1.5 },
                        "VP": { x: -10, y: -100, anchor: 0.5, scale: 2.5 }
                      },

              // "logoAni": {
              //   "img": "Loading_Base",
              //   "VD": { x: -3, y: 100, anchor: 0.5, scale: 1 },
              //   "VL": { x: 0, y: 0, anchor: 0.5, scale: 1 },
              //   "VP": { x: 0, y: 0, anchor: 0.5, scale: 1 }
           //   },

              "preTxt": {
                "img": "LOADING_",
                "VD": { x: 140, y: 120, scale: 1.5 },
                "VL": { x: 140, y: 120, scale: 2 },
                "VP": { x: 155, y: 120, scale: 2 }
              },

              "preCounterTxt": {
                "VD": { x: 330, y: 120 ,scale:1.5},
                "VL": { x: 360, y: 120, scale: 2},
                "VP": { x: 375, y: 120, scale:{x:2,y:2} }
              },

              "preBar": {
                "barBg": "Base",
                "barFill": "Filling",
                "VD": { x: -165, y: 200, scale: 0.6 },
                "VL": { x: -160, y: 160, scale: 0.6 },
                "VP": { x: -280, y: 250, scale: 1 }
              },
      /*for Translating loading text according to language
      en - english
      tr - turkish
      */
              "loadingTxt": {
                "en": "LOADING....",
                "tr": "Yükleniyor....",
              }

            }
            break;

  default:
    break
}