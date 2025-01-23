
var _ng = _ng || {};

_ng.UIConfig = {
    "gameTitle": {
          "type": "spine",
          "defaultAnimation": "idle_blink",
        "Mobile": {
            additionIndex: 2,
            props: {
                "HX": 170, "HY": -110, "VX": 358, "VY": -200,
                "landScaleX": 0.6, "landScaleY": 0.6, "landAlignX": "CENTER", "landAlignY": "TOP",
                "portScaleX": 0.75, "portScaleY": 0.75, "portAlignX": "CENTER", "portAlignY": "TOP",
                "portAnchorX": 0.5, "landAnchorX": 0.5,
            },
            // image: { "prefix": "logo_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": ".7", "type": "spriteAnimation", "loop": false},
            image:"Game logo"
        },
        "Desktop": { additionIndex: 2, image: "Game logo", props: { x:1173, y: 105, scale:0.4,anchor:0.5  },delay : 2 }
    },
    "bonusGames": {
        "100": { "symbol": "s" }
    },
    "showIntro": true,

    "gameIntroScreen": {
        //DESKTOP VIEW
        "Desktop": {

            "introImg1": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 960, "y": 275, anchor: 0.5, scale: { x: 0, y: 0 } },
                    "backgroundImage": "static_logo",
                }
            },
            "Transperent_Layer": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 1280, "y": 660, anchor: 1, scale: 0 },
                    "backgroundImage": "Transperent_Layer",
                }
            },
            
            "indicator1": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 282, "y": 660, anchor: 0.5, scale: 1 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_on1": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 282, "y": 660, anchor: 0.5, scale: 1 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off1": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 282, "y": 660, anchor: 0.5, scale: 1 },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea1": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    w: 17, h: 15.5, color: 0xff0000,
                    props: { x: 265, y: 645, scale: 2.05, visible: true }
                }
            },
            "indicator2": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 362, "y": 660, anchor: 0.5, scale: 1 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_on2": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 362, "y": 660, anchor: 0.5, scale: 1 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off2": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 362, "y": 660, anchor: 0.5, scale: 1 },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea2": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    w: 17, h: 15.5, color: 0xff2500,
                    props: { x: 345, y: 645, scale: 2.05, visible: true }
                }
            },
            "indicator3": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 442, "y": 660, anchor: 0.5, scale: 1 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_on3": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 442, "y": 660, anchor: 0.5, scale: 1 },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off3": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 442, "y": 660, anchor: 0.5, scale: 1 },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea3": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    w: 17, h: 15.5, color: 0xff3500,
                    props: { x: 425, y: 645, scale: 2.05, visible: true }
                }
            },
            "introGameLogo": {
                "elementConstructor": "sprite",
                "params": {
                   "props": { "x": 1220, "y": 360, anchor:1, scale: 1.1 },
                    "backgroundImage": "static_logo",
                }
            },
           
         
  
        "screen_3": {
            "elementConstructor": "sprite",
            "params": {
               "props": { "x": 415, "y": 290, anchor: 0.5, scale: 0.65 },
                "backgroundImage": "Layer 8",
            }
        },
        "Text_screen_3": {
//            "elementConstructor": "text",
//            "params": {
//               "props": { "x": 350, "y": 495.5, anchor: 0.5, scale: 0.5 },
//               "text":["text_screen3"],
//               "textStyle": {	align: "center",
//                dropShadowAlpha: 0.1,
//                dropShadowAngle: 0,
//                dropShadowColor: "#8d8777",
//                fill: "#f2f2f2",
//                fontWeight: "900",
//                letterSpacing: 1,
//                lineJoin: "round",
//                miterLimit: 20,
//                stroke: "#533fee",
//                strokeThickness: 10,
//                trim: true,
//                fontSize: 40
//            }
            "elementConstructor": "sprite",
             "params": {
             "props": { "x": 415, "y": 575, anchor: 0.5, scale: 0.8 },
             "backgroundImage": "SYMBOLS PAY ANYWHERE ON THE SCREEN",
        },
        },
        "screen_2": {
            "elementConstructor": "sprite",
            "params": {
               "props": { "x": 415, "y": 290, anchor: 0.5, scale: 0.65 },
                "backgroundImage": "Layer 6",
            }
        },
        "Text_screen_2": {
//            "elementConstructor": "text",
//            "params": {
//               "props": { "x": 350, "y": 495.5, anchor: 0.5, scale: 0.5 },
//                "text":["text_screen1"],
//                "textStyle": {	align: "center",
//                    dropShadowAlpha: 0.1,
//                    dropShadowAngle: 0,
//                    dropShadowColor: "#8d8777",
//                    fill: "#f2f2f2",
//                    fontWeight: "900",
//                    letterSpacing: 1,
//                    lineJoin: "round",
//                    miterLimit: 20,
//                    stroke: "#533fee",
//                    strokeThickness: 10,
//                    trim: true,
//                    fontSize: 40
//                }
//            }
                "elementConstructor": "sprite",
                 "params": {
                               "props": { "x": 415, "y": 575, anchor: 0.5, scale: 0.8 },
                              "backgroundImage": "WIN UP TO 5000 X BET",
                            }
        },

        "screen_1": {
            "elementConstructor": "sprite",
            "params": {
               "props": { "x": 415, "y": 290, anchor: 0.5, scale: 0.65 },
                "backgroundImage": "Layer 7",
            }
        },
        "Text_screen_1": {
//            "elementConstructor": "text",
//            "params": {
//               "props": { "x": 350, "y": 495.5, anchor: 0.5, scale: 0.5 },
//                "text": ["text_screen2"],
//                "textStyle": {	align: "center",
//                    dropShadowAlpha: 0.1,
//                    dropShadowAngle: 0,
//                    dropShadowColor: "#8d8777",
//                    fill: "#f2f2f2",
//                    fontWeight: "900",
//                    letterSpacing: 1,
//                    lineJoin: "round",
//                    miterLimit: 20,
//                    stroke: "#533fee",
//                    strokeThickness: 10,
//                    trim: true,
//                    fontSize: 40
//                }
//            }
                "elementConstructor": "sprite",
                                       "params": {
                                          "props": { "x": 415, "y": 575, anchor: 0.5, scale: 0.8 },
                                           "backgroundImage": "RANDOM MULTIPLIERS UP TO 1000X",
                                       }
        },

     
        //    "Transperent_Layer2": {
        //     "elementConstructor": "sprite",
        //     "params": {
        //        "props": { "x": 1280, "y": 694, anchor: 1, scale:{x:1,y:0.9} },
        //         "backgroundImage": "Transperent_Layer 2",
        //     }
        // },
        
            "radioButtonOff": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 800, "y": 662, anchor: 0.5, scale: 0.7, visible: true },
                    "backgroundImage": "Tick_box_old",
                }
            },
            "radioButtonOn": {
                "elementConstructor": "sprite",
                "params": {
                    "props": { "x": 800, "y": 658, anchor: 0.5,scale: 0.5, visible: true },
                    "backgroundImage": "Tick",
                }
            },
            "bottomText": {
//                "elementConstructor": "text",
//                "params": {
//                    "props": { "x": 735, "y": 672, anchor: 0.5, visible: true, scale: 0.6 },
//                    "text": ["dontshow"],
//                    "textStyle": {	align: "center",
//                        dropShadowAlpha: 0.1,
//                        dropShadowAngle: 0,
//                        dropShadowColor: "#8d8777",
//                        fill: "#f2f2f2",
//                        fontWeight: "900",
//                        letterSpacing: 1,
//                        lineJoin: "round",
//                        miterLimit: 20,
//                        stroke: "#533fee",
//                        strokeThickness: 10,
//                        trim: true,
//                        fontSize: 40
//                    }
//                }
                    "elementConstructor": "sprite",
                                    "params": {
                                        "props": { "x": 1030, "y": 658, anchor: 0.5, visible: true, scale: 1 },
                                         "backgroundImage": "DON’T SHOW AGAIN",
                                    }
            },
            "radioButtonHitArea": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    w: 35, h: 27.5, color: 0xff0000,
                    props: { x: 778, y: 640, scale: 1.2, visible: true }
                }
            },
            "continueButton": {
                "elementConstructor": "button",
                "params": {
                    "props": { "x": 1045, "y": 445, anchor: 0.5, scale: 1},
                    "backgroundImage": "play",
                    // options: {
                    //     textField: {
                    //         // text: "CONTINUE",
                    //         props: { x: 0, y: -30, anchor: 0.5 },
                    //         textStyle: {
                    //             fontSize: 38,
                    //             fontFamily: "ProximaNova_Bold",
                    //             fill: 0x5d2202,
                    //             stroke: 0xFFFFFF,
                    //             strokeThickness: 6,
                    //             align: 'center',
                    //             maxWidth: 170
                    //         }
                    //     },
                    //     "hitArea": { "type": "polygon", "params": [-179 * 0.5, -69.049 * 0.5, 178 * 0.5, -72.49 * 0.5, 178 * 0.5, 63.95099999999999 * 0.5, -178 * 0.5, 69.951 * 0.5,] }, 
                    // }
                }
            },

        },
        //MOBILE VIEW
        "Mobile": {
            // "introBG": {
            //     "elementConstructor": "sprite",
            //     "params": {
            //         "subscribeToResize": true,
            //         "props": {
            //             "VL": { "x": 0, "y": 0, anchor: 0, scale: 0 },
            //             "VP": { "x": 0, "y": -90, anchor: 0, scale:0 }
            //         },
            //         "backgroundImage": "Intro_Logo",
            //     }
            // },
        
            "Transperent_Layer": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": {
                    "VL": { "x": 640, "y": 333, anchor: 0.5, scale:{x:0,y:0} },
                    "VP": { "x": 360, "y": 540, anchor: 0.5, scale:{x:0,y:0} }
                },
                    "backgroundImage": "Transperent_Layer",
                }
            },
            "indicator1": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": {
                    "VL": { "x": 190, "y": 550, anchor: 0, scale: 1 },
                    "VP": { "x": 255, "y": 792, anchor: 0, scale:1}
                },
                    "backgroundImage": "Fill_circle",
                }
            },
            
           
            "Indicator_on1": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": { 
                    "VL": { "x": 120, "y": 550, anchor: 0, scale: 1 },
                    "VP": { "x": 256, "y": 792, anchor: 0, scale:1 }
                    },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off1": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": {  
                     "VL": { "x": 185, "y": 545, anchor: 0, scale: 1 },
                   "VP": { "x": 250, "y": 787, anchor: 0, scale:1 } },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea1": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    "subscribeToResize": true,

                    w: 17, h: 15.5, color: 0xff0000,
                    props: { 
                        "VL": { "x":193, "y": 555, anchor: 0, scale: 2,visible:true },
                        "VP": { "x": 258, "y": 796, anchor: 0, scale:2,visible:true }
                     }
                }
            },
            "indicator2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": {
                    "VL": { "x": 270, "y": 545, anchor: 0, scale: 1 },
                    "VP": { "x": 330, "y": 787, anchor: 0, scale:1 }
                },
                    "backgroundImage": "Base_circle",
                }
            },
            "Indicator_on2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": { 
                    "VL": { "x":276206, "y": 550, anchor: 0, scale: 1 },
                    "VP": { "x": 336, "y": 794, anchor: 0, scale:1 }
                    },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": { 
                    "VL": { "x": 270, "y": 545, anchor: 0, scale: 1 },
                    "VP": { "x": 330, "y": 787, anchor: 0, scale:1 }
                    },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea2": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    "subscribeToResize": true,

                    w: 17, h: 15.5, color: 0xff2500,
                    props: { 
                        "VL": { "x": 279, "y": 554, anchor: 0, scale: 2,visible:true },
                        "VP": { "x": 338, "y": 796, anchor: 0, scale:2,visible:true }
                     }
                }
            },
            "indicator3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": {
                    "VL": { "x": 350, "y": 545, anchor: 0, scale: 1 },
                    "VP": { "x": 410, "y": 787, anchor: 0, scale:1 }
                },
                    "backgroundImage": "Base_circle",
                }
            },
            "Indicator_on3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": {
                    "VL": { "x": 356, "y": 550, anchor: 0, scale: 1 },
                    "VP": { "x": 416, "y": 794, anchor: 0, scale:1 }
                    },
                    "backgroundImage": "Fill_circle",
                }
            },
            "Indicator_off3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,

                   "props": { 
                    "VL": { "x": 350, "y": 545, anchor: 0, scale: 1 },
                    "VP": { "x": 410, "y": 787, anchor: 0, scale:1 }
                    },
                    "backgroundImage": "Base_circle",
                }
            },
            "indiButtonHitArea3": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    "subscribeToResize": true,

                    w: 17, h: 15.5, color: 0xff3500,
                    props: {
                        "VL": { "x": 360, "y": 554, anchor: 0, scale: 2,visible:true },
                        "VP": { "x": 418, "y": 796, anchor: 0, scale:2,visible:true }
                     }
                }
            },
            "introGameLogo": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": {
                    "VL": { "x": 750, "y": 110, anchor: 0, scale: 1 },
                    "VP": { "x": 184, "y": 15, anchor: 0, scale:0.8 }
                },
                    "backgroundImage": "static_logo",
                }
            },
            "screen_3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": { 
                    "VL": { "x": 15, "y": 85, anchor: 0, scale: 0.55 ,visible:false},
                    "VP": { "x": 65, "y":300, anchor: 0, scale:0.55,visible:false }
                    },
                    "backgroundImage": "Layer 8",
                }
            },
            "Text_screen_3": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": { 
                    "VL": { "x": 300, "y": 500, anchor: 0.5, scale: 0.5 },
                    "VP": { "x": 350, "y": 745, anchor: 0.5, scale:0.55 }
                    },
                    "backgroundImage": "SYMBOLS PAY ANYWHERE  ON THE SCREEN",
                          },
                },
            "screen_2": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                   "props": { 
                    "VL": { "x": 15, "y": 85, anchor: 0, scale: 0.5,visible:false },
                    "VP": { "x": 65, "y": 300, anchor: 0, scale:0.55,visible:false  }
                    },
                    "backgroundImage": "Layer 6",
                }
            },
            "Text_screen_2": {
                "elementConstructor": "sprite",
                                "params": {
                                    "subscribeToResize": true,
                                   "props": {
                                    "VL": { "x": 300, "y": 500, anchor: 0.5, scale: 0.5},
                                    "VP": { "x": 350, "y": 745, anchor: 0.5, scale:0.55 }
                                    },
                                     "backgroundImage": "WIN UP TO 5000 X BET",
                                 },
                },
            "screen_1": {
               "elementConstructor": "sprite",
               "params": {
                  "subscribeToResize": true,
                  "props": {
                   "VL": { "x": 15, "y": 85, anchor: 0, scale: 0.55},
                   "VP": { "x": 65, "y": 300, anchor: 0, scale:0.55 }
               },
                   "backgroundImage": "Layer 7",
               }
           },
           "Text_screen_1": {
            "elementConstructor": "sprite",
                        "params": {
                           "subscribeToResize": true,
                           "props": {
                            "VL": { "x": 300, "y": 500, anchor: 0.5, scale: 0.5 },
                            "VP": { "x": 350, "y": 745, anchor: 0.5, scale:0.55 }
                        },

                             "backgroundImage": "RANDOM MULTIPLIERS UP TO 1000X",
                        },
        },
           "Transperent_Layer2": {
            "elementConstructor": "sprite",
            "params": {
               "subscribeToResize": true,
               "props": {
                   "VL": { "x": 640, "y": 668, anchor: 0.5 ,scale:{x:0,y:0}},
                   "VP": { "x": 280, "y": 930, anchor: 0.5,scale:0 },
               },
                "backgroundImage": "Transperent_Layer 2",
            }
        },
            "radioButtonOff": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 462, "y": 668, anchor: 0.5,scale:0.6  },
                        "VP": { "x": 222, "y": 1100, anchor: 0.5,scale:0.6 },
                    },
                    "backgroundImage": "introRadioBtnOff",
                }
            },
            "radioButtonOn": {
                "elementConstructor": "sprite",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 462, "y": 668, anchor: 0.5,scale:0.6 },
                        "VP": { "x": 222, "y": 1100, anchor: 0.5,scale:0.6},
                    },
                    "backgroundImage": "introRadioBtnOn",
                }
            },
            "bottomText": {
                 "elementConstructor": "sprite",
                                "params": {
                                    "subscribeToResize": true,
                                    "props": {
                                        "VL": { x: 650, y: 668, anchor: 0.5,scale:0.65 },
                                        "VP": { x: 395, y: 1100, anchor: 0.5,scale:0.65 },
                                    },
                                    "backgroundImage": "DON’T SHOW AGAIN",             }
            },
            "radioButtonHitArea": {
                "elementConstructor": "GraphicsRect",
                "params": {
                    w: 40, h: 38, color: 0xff0000,
                    "subscribeToResize": true,
                    "props": {
                        "VL": { x: 439, y: 653, anchor: 0.5,scale:0.7 },
                        "VP": { x: 208, y: 1085, anchor: 0.5,scale:0.7 },
                    },
                    
                }
            },
            "continueButton": {
                "elementConstructor": "button",
                "params": {
                    "subscribeToResize": true,
                    "props": {
                        "VL": { "x": 623.5, "y": 590, anchor: 0.5, scale: 0.6 },
                        "VP": { "x": 354, "y": 930, anchor: 0.5, scale: 0.6 }
                    },
                    "backgroundImage": "play",
                    // options: {
                    //     textField: {
                    //         // text: "CONTINUE",
                    //         props: { x: 0, y: -30, anchor: 0.5 },
                    //         textStyle: {
                    //             fontSize: 38,
                    //             fontFamily: "ProximaNova_Bold",
                    //             fill: 0x5d2202,
                    //             stroke: 0xFFFFFF,
                    //             strokeThickness: 6,
                    //             align: 'center',
                    //             maxWidth: 170
                    //         }
                    //     },
                    //     "hitArea": { "type": "polygon", "params": [-189.5 * 0.5, -79.5 * 0.5, 125.5 * 0.5, -97.5 * 0.5, 232.5 * 0.5, -37.5 * 0.5, 220.5 * 0.5, 6.5 * 0.5, 162.5 * 0.5, 39.5 * 0.5, 191.5 * 0.5, 79.5 * 0.5, 16.5 * 0.5, 107.5 * 0.5, -209.5 * 0.5, 95.5 * 0.5, -216.5 * 0.5, 15.5 * 0.5, -223.5 * 0.5, -45.5 * 0.5] },
                    // }
                }
            }
        }
    },

    // "paylinesConfig": 
    //     // {"line": "1", "start": 1, "end": 15, x: 245, y: 328, "scaleX": 1, "scaleY": 1},
    //     // {"line": "2", "start": 1, "end": 15, x: 245, y: 181, "scaleX": 1, "scaleY": 1},
    //     // {"line": "3", "start": 1, "end": 15, x: 245, y: 477, "scaleX": 1, "scaleY": 1},
    //     // {"line": "4", "start": 1, "end": 15, x: 242, y: 150, "scaleX": 1, "scaleY": 1},
    //     // {"line": "5", "start": 1, "end": 15, x: 249, y: 150, "scaleX": 1, "scaleY": 1},
    //     // {"line": "6", "start": 1, "end": 15, x: 245, y: 330, "scaleX": 1, "scaleY": 1},
    //     // {"line": "7", "start": 1, "end": 15, x: 242, y: 149, "scaleX": 1, "scaleY": 1},
    //     // {"line": "8", "start": 1, "end": 15, x: 241, y: 310, "scaleX": 1, "scaleY": 1},
    //     // {"line": "9", "start": 1, "end": 15, x: 244, y: 329, "scaleX": 1, "scaleY": 1},
    //     // {"line": "10", "start": 1, "end": 15, x: 240, y: 310, "scaleX": 1, "scaleY": 1}
    //      {
    //         "1":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_1,2,3", loop: false, props: {x:610, y: 310+40,  scale: 0.6 }, type: "spine" } ],	
    //         "2":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_1,2,3", loop: false, props: {x:610, y: 140+20,   scale: 0.6 }, type: "spine" } ],	
    //         "3":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_1,2,3", loop: false, props: {x:610, y: 500+25,   scale: 0.6 }, type: "spine" } ],	
    //         "4":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_4", loop: false, props: {x:600, y: 350-30, scale: {x:0.6, y:0.6} }, type: "spine" } ],	
    //         "5":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_5", loop: false, props: {x:610, y: 350, scale: {x:0.6, y:0.6} }, type: "spine" } ],	
    //         "6":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_6", loop: false, props: { x:600, y: 300, scale: {x:0.5, y:0.5} }, type: "spine" } ],	
    //         "7":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_7", loop: false, props: {  x:600, y: 350, scale:{x:0.6, y:0.5} }, type: "spine" } ],	
    //         "8":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_8", loop: false, props: {  x:600, y: 350, scale: {x:0.6, y:0.7} }, type: "spine" } ],	
    //         "9":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_9", loop: false, props: {  x:600-20, y: 350, scale: {x:0.6, y:0.7} }, type: "spine" } ],	
    //         "10":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_10", loop: false, props: { x:600-10, y: 350, scale: {x:0.6, y:0.7}}, type: "spine" } ],	
    //         "11":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_11", loop: false, props: { x:600-20, y: 350, scale: {x:0.55, y:0.7} }, type: "spine" } ],	
    //         "12":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_12", loop: false, props: {x:600-20, y: 350, scale: 0.55 }, type: "spine" } ],	
    //         "13":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_13", loop: false, props: {x:600-20, y: 350, scale: {x:0.6, y:0.6}}, type: "spine" } ],	
    //         "14":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_14", loop: false, props: {x:600, y: 350, scale: {x:0.6, y:0.6} }, type: "spine" } ],	
    //         "15":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_15", loop: false, props: {x:600, y: 350, scale: {x:0.6, y:0.7} }, type: "spine" } ],	
    //         "16":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_16", loop: false, props: { x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "17":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_17", loop: false, props: {x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "18":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_18", loop: false, props: {x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "19":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_19", loop: false, props: {x:600, y: 350, scale: {x:0.55, y:0.6} }, type: "spine" } ],	
    //         "20":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_20", loop: false, props: {x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "21":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_21", loop: false, props: {x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "22":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_22", loop: false, props: {x:600-20, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "23":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_23", loop: false, props: {x:600, y: 350, scale: 0.6 }, type: "spine" } ],	
    //         "24":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_24", loop: false, props: {x:600-20, y: 350, scale: {x:0.6, y:0.6} }, type: "spine" } ],	
    //         "25":[{ animationDuration: 2000, winSound: { name: "cSym" }, offset: { x: 0, y: 4 } },{ spineName: "Win_line", defaultAnimation: "idle", winAnimation: "Line_25", loop: false, props: {x:600-20, y: 350, scale: {x:0.6, y:0.6} }, type: "spine" } ],	
    //     },
        "reelSymbolConfig": {
            // "a":{symbol: {texture: "a"}, frontImage: {texture: "a"},  backImage: {texture: "a"}},
            "a": { symbol: { texture: "a", scale:{x:0.26,y:0.26} } },
            "b": { symbol: { texture: "b", scale:{x:0.26,y:0.26} } },
            "c": { symbol: { texture: "c", scale:{x:0.26,y:0.26} } },
            "d": { symbol: { texture: "d" , scale:{x:0.26,y:0.26}} },
            "e": { symbol: { texture: "e", scale:{x:0.26,y:0.26} } },
            "f": { symbol: { texture: "f", scale:{x:0.26,y:0.26} } },
            "g": { symbol: { texture: "g", scale:{x:0.26,y:0.26} } },
            "h": { symbol: { texture: "h", scale:{x:0.26,y:0.26} } },
            "i": { symbol: { texture: "i", scale:{x:0.26,y:0.26} } },
            // "l": { symbol: { texture: "l", scale:{x:0.6,y:0.6} } },
            "m": { symbol: { texture: "m", scale:{x:0.26,y:0.26} } },
            // "w": { symbol: { texture: "w", scale:{x:0.6,y:0.6} } },
            "s": { symbol: { texture: "s",scale:{x:0.26,y:0.26} } },
            "z": { symbol: { texture: "z",scale:{x:0.26,y:0.26} } },
        },
//        "reelSymbolConfigHit": {
//            // "a":{symbol: {texture: "a"}, frontImage: {texture: "a"},  backImage: {texture: "a"}},
//            "a": { spineSymbol: "a" ,"props" :{x:0, y:-4,"scale":{x:0.22,y:0.22}} },
//            "b": { spineSymbol: "b" ,"props" :{x:0, y:2,"scale":{x:0.22,y:0.22}} },
//            "c": { spineSymbol: "c" ,"props" :{x:0, y:2,"scale":{x:0.22,y:0.22}} },
//            "d": { spineSymbol: "d" ,"props" :{x:0, y:1.5,"scale":{x:0.22,y:0.22}} },
//            "e": { spineSymbol: "e" ,"props" :{x:0, y:2,"scale":{x:0.22,y:0.22}} },
//            "f": { spineSymbol: "f" ,"props" :{x:2.75, y:2,"scale":{x:0.22,y:0.22}} },
//            "g": { spineSymbol: "g" ,"props" :{x:1, y:0.75,"scale":{x:0.22,y:0.22}} },
//            "h": { spineSymbol: "h" ,"props" :{x:0, y:4,"scale":{x:0.22,y:0.22}} },
//            "i": { spineSymbol: "i" ,"props" :{x:0.5, y:5.5,"scale":{x:0.22,y:0.22}} },
//            // "j": { spineSymbol: "b" ,"props" :{x:0, y:0,"scale":{x:0.22,y:0.22}} },
//            // "l": { spineSymbol: "bonus" ,"props" :{x:0, y:0,"scale":{x:0.22,y:0.22}} },
//            "m": { spineSymbol: "wild" ,"props" :{x:0.5, y:-1,"scale":{x:0.22,y:0.22}} },
//            "s": { spineSymbol: "Scatter" ,"props" :{x:0.5, y:-4,"scale":{x:0.22,y:0.22}} },
//        },
    // "symbolAnimations": {
    //     "a": [{ animationDuration: 1440, winSound: { name: "aSym" } }, { "prefix": "a_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine", "winAnimation":"win"}],
    //     "b": [{ animationDuration: 1440, winSound: { name: "bSym" } }, { "prefix": "b_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation": "win"}],
    //     "c": [{ animationDuration: 1440, winSound: { name: "cSym" } }, { "prefix": "c_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":"win" }],
    //     "d": [{ animationDuration: 1440, winSound: { name: "dSym" } }, { "prefix": "d_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "e": [{ animationDuration: 1440, winSound: { name: "eSym" } }, { "prefix": "e_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "f": [{ animationDuration: 1440, winSound: { name: "fSym" } }, { "prefix": "f_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "g": [{ animationDuration: 1440, winSound: { name: "gSym" } }, { "prefix": "g_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "h": [{ animationDuration: 1440, winSound: { name: "hSym" } }, { "prefix": "h_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "i": [{ animationDuration: 1440, winSound: { name: "iSym" } }, { "prefix": "i_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "j": [{ animationDuration: 1440, winSound: { name: "jSym" } }, { "prefix": "j_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "k": [{ animationDuration: 1440, winSound: { name: "kSym" } }, { "prefix": "k_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "s": [{ animationDuration: 1440, winSound: { name: "sSym" } }, { "prefix": "s_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    //     "w": [{ animationDuration: 1440, winSound: { name: "wSym" } }, { "prefix": "w_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "loop": false, "type": "spine","winAnimation":""  }],
    //     "wexp": [{ animationDuration: 1440, winSound: { name: "wSymLand" } }, { "prefix": "wexp_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "type": "spine","winAnimation":""  }],
    // },
    "symbolAnimations": {        
        "a": [{ animationDuration: 3000, winSound: { name: "aSym" } }, { "prefix": "a_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation",}],
        "b": [{ animationDuration: 3000, winSound: { name: "bSym" } }, { "prefix": "b_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "c": [{ animationDuration: 3000, winSound: { name: "cSym" } }, { "prefix": "c_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "d": [{ animationDuration: 3000, winSound: { name: "dSym" } }, { "prefix": "d_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "e": [{ animationDuration: 3000, winSound: { name: "eSym" } }, { "prefix": "e_", "startIndex": "0", "endIndex": "35", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "f": [{ animationDuration: 3000, winSound: { name: "fSym" } }, { "prefix": "f_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "g": [{ animationDuration: 3000, winSound: { name: "gSym" } }, { "prefix": "g_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "h": [{ animationDuration: 3000, winSound: { name: "hSym" } }, { "prefix": "h_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        "i": [{ animationDuration: 3000, winSound: { name: "iSym" } }, { "prefix": "i_", "startIndex": "0", "endIndex": "23", "digit": "dual", "animationSpeed": "0.3","props": {x:0, y:8.5,  "scale":  0}, "type": "spriteAnimation"}],
        // "j": [{ animationDuration: 1500, winSound: { name: "jSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "j", "spineName" : "j","props": {x:0, y:0,  "scale":{x:06,y:06}}}],        
        // "l": [{ animationDuration: 1500, winSound: { name: "lSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "Bonus_win", "spineName" : "bonus","props": {x:0, y:0,  "scale":{x:0.5,y:0.5}}}],        
        // "s": [{ animationDuration: 1500, winSound: { name: "sSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "s_win", "spineName" : "scatter","props": {x:0, y:0,  "scale":{x:0,y:0}}}],        
        // "w": [{ animationDuration: 1500, winSound: { name: "wSym" } , offset: { y:-0.5, x: 0.5 } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "w_win", "spineName" : "wild","props": {x:0, y:0,  "scale":{x:0,y:0}}}],    
        //  "s_land": [{ animationDuration: 1500, winSound: { name: "sSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "s_", "spineName" : "scatter","loop":"true","props": {x:0, y:0,  "scale":{x:0,y:0}}}],     
        //  "s_land": [{ animationDuration: 2100, winSound: { name: "sSym" } }, { "prefix": "s_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "loop": false, "type": "spriteAnimation","":""  }],
         // "w": [{ animationDuration: 1440, winSound: { name: "wSym" } }, { "prefix": "w_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "loop": false, "type": "spriteAnimation","":""  }],
    //      "s": [{ animationDuration: 3000, winSound: { name: "sSym" } }, { "prefix": "s_","tween": { "scale": { "x": 0.8, "y": 0.8 } },"tweenDuration":0.1, "startIndex": "0", "endIndex": "47", "digit": "dual", "animationSpeed": "0.3", "props": {x:0, y:10,  "scale": 0.7},"type": "spineAnimation" }],
         "m": [{ animationDuration: 3000, winSound: { name: "sSym" } }, { "prefix": "m_", "startIndex": "0", "endIndex": "47", "digit": "dual", "animationSpeed": "0.3", "props": {x:0, y:8.5,  "scale":  0},"type": "spriteAnimation" }],
    // "s_land": [{ animationDuration: 3000, winSound: { name: "sSymLand" } }, { "prefix": "s_", "startIndex": "0", "endIndex": "24", "digit": "dual", "animationSpeed": "0.2", "props": {x:0, y:10,  "scale":  0.7}, "type": "spriteAnimation" }],
   "s": [{ animationDuration: 4000, winSound: { name: "aSym" } , offset: { y: 5, x: 0 }}, { "animationSpeed": "0.5", "type": "spine", "winAnimation" : "main", "spineName" : "mermaid","props": {x:0, y:0, "scale":{x:0.25,y:0.25}}}],
    // "s": [{ animationDuration: 2100, winSound: { name: "sSym" }},{  "animationSpeed": "0.2", "type": "spine", "winAnimation" : "animation", "spineName" : "Animation_scatter","props": {x:0, y:0,  "scale":{x:1,y:1}}}],        
//        "s_land": [{ animationDuration: 2100, winSound: { name: "sLand_3" }},{  "animationSpeed": "0.5", "type": "spine", "winAnimation" : "main", "spineName" : "mermaid","props": {x:0, y:0,  "scale":{x:0.23,y:0.23}}}],
},
    // "symbolAnimations": {        
    //     "a": [{ animationDuration: 2100, winSound: { name: "aSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "a","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "b": [{ animationDuration: 2100, winSound: { name: "bSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "b","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "c": [{ animationDuration: 2100, winSound: { name: "cSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "c","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],       
    //     "d": [{ animationDuration: 2100, winSound: { name: "dSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "d","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],       
    //     "e": [{ animationDuration: 2100, winSound: { name: "eSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "A", "spineName" : "lv","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "f": [{ animationDuration: 2100, winSound: { name: "fSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "k", "spineName" : "lv","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],       
    //     "g": [{ animationDuration: 2100, winSound: { name: "gSym" } },  {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "q", "spineName" : "lv","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "h": [{ animationDuration: 2100, winSound: { name: "hSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "j", "spineName" : "lv","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "i": [{ animationDuration: 2100, winSound: { name: "iSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "10", "spineName" : "lv","props": {x:0, y:0,  "scale":{x:0.66,y:0.66}}}],        
    //     // "j": [{ animationDuration: 2100, winSound: { name: "jSym" } },   {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "j", "spineName" : "j","props": {x:0, y:0,  "scale":{x:0.66,y:0.66}}}],        
    //     "l": [{ animationDuration: 2100, winSound: { name: "lSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "bonus","props": {x:0, y:0,  "scale":{x:0.5,y:0.5}}}],        
    //     "s": [{ animationDuration: 2100, winSound: { name: "sSym" }},{  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "scatter","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     "w": [{ animationDuration: 2100, winSound: { name: "wSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "win", "spineName" : "wild","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    //     // "s_land": [{ animationDuration: 2100, winSound: { name: "wSym" } }, { "prefix": "w_", "startIndex": "1", "endIndex": "24", "digit": "dual", "animationSpeed": "0.3", "loop": false, "type": "spriteAnimation","":""  }],
    //     "s_land": [{ animationDuration: 2100, winSound: { name: "wSym" } }, {  "animationSpeed": "0.3", "type": "spine", "winAnimation" : "hit", "spineName" : "scatter","props": {x:0, y:0,  "scale":{x:0.6,y:0.6}}}],        
    
    // },
    "tickerConfig": {
        "params": {
            desktopParams: { x: 530, y: 650, anchor: { x: 0.5, y: 0.5 },scale:1},
            HX: 510, HY: 600, landAlignY: "BOTTOM",
            VX: 235, VY: 880, portAlignY: "BOTTOM",
        },
        "bg": "", //commonTickerbox
        "msgText": {
            "textStyle": {
                // dropShadow: true,
                // dropShadowColor: "#ef0aff",
                fill: "#E7E3EE",
                fontFamily: "Arial",
                fontSize: 25,
                fontWeight: "bolder",
                stroke: "#000000",
                strokeThickness: 4
            },
            "textStyleNew": {
                // dropShadow: true,
                // dropShadowColor: "#ef0aff",
                fill: "#E7E3EE",
                fontFamily: "Arial",
                fontSize: 18,
                fontWeight: "bolder",
                stroke: "#000000",
                strokeThickness: 4
            },
            "props": {
                "VD": { "x": 134, "y": 14, anchor: { x: 0.5, y: 0.5 } },
                "VL": { "x": 134, "y": 14, anchor: { x: 0.5, y: 0.5 } },
                "VP": { "x": 134, "y": 14, anchor: { x: 0.5, y: 0.5 } }
            }
        }
    },
    menuConfigOffset: {
        Desktop: {
            homeButton: {
                type: "Button",
                props: {
                    img: "mHomeBtn",
                    VD: { x: 40, y: 333, anchor: { x: 0.5, y: 0.5 }, scale: { x: 1, y: 1 } },
                    "options": {
                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 20 } }
                    }
                }
            },
            menuCloseBtn: {
                type: "Button",
                props: {
                    img: "mCloseBtn",
                    VD: { x: 40, y: 675,scale:1 , anchor: { x: 0.5, y: 0.5 } },
                    "options": {
                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 0 } }
                    }
                }
            },
            menuOpenBtn: {
                type: "Button",
                props: {
                    img: "mOpenBtn",
                    VD: { x: 40, y: 675,scale:0.67 , anchor: { x: 0.5, y: 0.5 } },
                    "options": {
                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 0 } }
                    }
                }
            },
            // providerLogo: {
            //     type: "Sprite",
            //     props: {
            //         img: "providerLogo",
            //         VD: { x: 1240, y: 667, anchor: { x: 0.5, y: 0.5 } }
            //     }
            // }
        },
        Mobile: {
            menuButton: {
                type: "Button",
                makeResponsive: true,
                props: {
                    img: "mOpenBtn",
                    HX: 1145, HY: 633,
                    VX: 630, VY: 1100,
                    landScaleX: 1, landScaleY: 1,
                    portScaleX: 1, portScaleY: 1,
                    landAlignX: "RIGHT",
                    landAlignY: "BOTTOM",
                    portAlignX: "RIGHT",
                    portAlignY: "BOTTOM"
                }
            },
            homeButton: {
                type: "Button",
                makeResponsive: true,
                props: {
                    img: "Home",
                    HX: 15, HY: 635,
                    VX: 12, VY: 1178,
                    landScaleX: 1.3, landScaleY: 1.3,
                    portScaleX: 1, portScaleY: 1,
                    landAlignX: "LEFT",
                    landAlignY: "BOTTOM",
                    portAlignX: "LEFT",
                    portAlignY: "BOTTOM"
                }
            }
        }
    },

    "volumeBarConfig": {
        Desktop: {
            
            // volumeBar: {
            //     elementConstructor: "Slider",
            //     params: {
            //         name: "lineValueSlider",
            //         props: { x: 335, y: 205 },
            //         dotImage: "asSliderDot",
            //         BGImage: "sVolumeBarBg",
            //         FGImage: "sVolumeBarFg",
            //         isVerticalSlider: false,
            //         startingValue: 0,
            //         endValue: 1,
            //         currentValue: 0.7,
            //         toFixedValue: 1, //Value After Decimal, give 0 for integers
            //         doMultiplier: 100, //Value After Decimal, give 0 for integers
            //         text: {
            //             prefix: "",
            //             postfix: "%",
            //             attachedToSlider: true,
            //             props: { x: 104, y: -32, anchor: { y: 0.5, x: 0.5 } },
            //             textStyle: { fill: 0xffffff, fontSize: 16 }
            //         },

            //         displayForMinValue: {
            //             elementConstructor: "text",
            //             params: {
            //                 props: { x: -35, y: 0, anchor: 0.5 },
            //                 text: "0%",
            //                 textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
            //             }
            //         },

            //         displayForMaxValue: {
            //             elementConstructor: "text",
            //             params: {
            //                 props: { x: 380, y: 0, anchor: 0.5 },
            //                 text: "100%",
            //                 textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
            //             }
            //         },
            //         // displayForMinValue: {
            //         // 	elementConstructor: "sprite",
            //         // 	params: {
            //         // 		image: "sAudioMin",
            //         // 		props: { x: -35, y: 0, anchor: 0.5, scale: 1 }
            //         // 	}
            //         // },
            //         // displayForMaxValue: {
            //         // 	elementConstructor: "sprite",
            //         // 	params: {
            //         // 		image: "sAudioMax",
            //         // 		props: { x: 235, y: 0, anchor:0.5, scale: 1 }
            //         // 	}
            //         // },
            //         eventToPublish: "settingVolumeChange"
            //     }
            // }
        },
        Mobile: {
            // volumeBar: {
            //     elementConstructor: "Slider",
            //     params: {
            //         name: "lineValueSlider",
            //         props: { x: 335, y: 200 },
            //         dotImage: "asSliderDot",
            //         BGImage: "sVolumeBarBg",
            //         FGImage: "sVolumeBarFg",
            //         isVerticalSlider: false,
            //         startingValue: 0,
            //         endValue: 1,
            //         currentValue: 0.7,
            //         toFixedValue: 1, //Value After Decimal, give 0 for integers
            //         doMultiplier: 100,
            //         text: {
            //             prefix: "",
            //             postfix: "%",
            //             attachedToSlider: true,
            //             props: { x: 104, y: -29, anchor: { y: 0.5, x: 0.5 } },
            //             textStyle: { fill: 0xffffff, fontSize: 16 }
            //         },

            //         displayForMinValue: {
            //             elementConstructor: "text",
            //             params: {
            //                 props: { x: -35, y: 0, anchor: 0.5 },
            //                 text: "0%",
            //                 textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
            //             }
            //         },

            //         displayForMaxValue: {
            //             elementConstructor: "text",
            //             params: {
            //                 props: { x: 380, y: 0, anchor: 0.5 },
            //                 text: "100%",
            //                 textStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fill: 0xffffff, padding: 10 }
            //             }
            //         },
            //         // displayForMinValue: {
            //         // 	elementConstructor: "sprite",
            //         // 	params: {
            //         // 		image: "sAudioMin",
            //         // 		props: { x: -45, y: -10, scale: 1 }
            //         // 	}
            //         // },
            //         // displayForMaxValue: {
            //         // 	elementConstructor: "sprite",
            //         // 	params: {
            //         // 		image: "sAudioMax",
            //         // 		props: { x: 135, y: -10, scale: 2.0 }
            //         // 	}
            //         // },
            //         eventToPublish: "settingVolumeChange"
            //     }
            // }
        }
    },
    "autoPlayWinLimitConfig": {
        Desktop: {
            winLimitBar: {
                elementConstructor: "Slider",
                params: {
                    name: "lineValueSlider",
                    manualCreation: true,
                    props: { x: 60, y: 200 },
                    dotImage: "asSliderDot",
                    BGImage: "asVolumeBarBg",
                    FGImage: "asVolumeBarFill",
                    startingValue: 1,
                    endValue: 200,
                    currentValue: 1,
                    toFixedValue: 0, //Value After Decimal, give 0 for integers
                    text: {
                        prefix: "x",
                        props: { x: 102, y: -26, anchor: { y: 0.5, x: 0.5 } },
                        textStyle: { fill: 0xffffff, fontSize: 18 }
                    },
                    displayForMinValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "1",
                            props: { x: -30, anchor: { y: 0.5, x: 0.5 } }
                        }
                    },
                    displayForMaxValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "200",
                            props: { x: 250, y: 0, anchor: 0.5 }
                        }
                    },
                    eventToPublish: "winLimitChange"
                }
            }
        },
        Mobile: {
            winLimitBar: {
                elementConstructor: "Slider",
                params: {
                    name: "lineValueSlider",
                    manualCreation: true,
                    props: { x: 60, y: 200 },
                    dotImage: "asSliderDot",
                    BGImage: "asVolumeBarBg",
                    FGImage: "asVolumeBarFill",
                    startingValue: 1,
                    endValue: 200,
                    currentValue: 1,
                    toFixedValue: 0, //Value After Decimal, give 0 for integers
                    text: {
                        prefix: "x",

                        props: { x: 104, y: -29, anchor: { y: 0.5, x: 0.5 } },
                        textStyle: { fill: 0xffffff, fontSize: 18 }
                    },
                    displayForMinValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "1",
                            props: { x: -30, anchor: { y: 0.5, x: 0.5 } }
                        }
                    },
                    displayForMaxValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "200",
                            props: { x: 250, y: 0, anchor: 0.5 }
                        }
                    },
                    eventToPublish: "winLimitChange"
                }
            }
        }
    },
    "autoPlayLossLimitConfig": {
        Desktop: {
            lossLimitBar: {
                elementConstructor: "Slider",
                params: {
                    name: "lineValueSlider",
                    manualCreation: true,
                    props: { x: 60, y: 320 },
                    dotImage: "asSliderDot",
                    BGImage: "asVolumeBarBg",
                    FGImage: "asVolumeBarFill",
                    startingValue: 1,
                    endValue: 200,
                    currentValue: 1,
                    toFixedValue: 0, //Value After Decimal, give 0 for integers
                    text: {
                        prefix: "x",

                        props: { x: 103, y: -26, anchor: { y: 0.5, x: 0.5 } },
                        textStyle: { fill: 0xffffff, fontSize: 18 }
                    },
                    displayForMinValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "1",
                            props: { x: -30, anchor: { y: 0.5, x: 0.5 } }
                        }
                    },
                    displayForMaxValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "200",
                            props: { x: 250, y: 0, anchor: 0.5 }
                        }
                    },
                    eventToPublish: "lossLimitChange"
                }
            }
        },
        Mobile: {
            lossLimitBar: {
                elementConstructor: "Slider",
                params: {
                    name: "lineValueSlider",
                    manualCreation: true,
                    props: { x: 60, y: 320 },
                    dotImage: "asSliderDot",
                    BGImage: "asVolumeBarBg",
                    FGImage: "asVolumeBarFill",
                    startingValue: 1,
                    endValue: 200,
                    currentValue: 1,
                    toFixedValue: 0, //Value After Decimal, give 0 for integers
                    text: {
                        prefix: "x",

                        props: { x: 104, y: -31, anchor: { y: 0.5, x: 0.5 } },
                        textStyle: { fill: 0xffffff, fontSize: 18 }
                    },
                    displayForMinValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "1",
                            props: { x: -30, anchor: { y: 0.5, x: 0.5 } }
                        }
                    },
                    displayForMaxValue: {
                        elementConstructor: "text",
                        params: {
                            textStyle: { fontSize: 20, fill: 0xffffff },
                            text: "200",
                            props: { x: 250, y: 0, anchor: 0.5 }
                        }
                    },
                    eventToPublish: "lossLimitChange"
                }
            }
        }
    },
    "settingsConfig": {
        Desktop: {
            settingsContainer: {
                type: "Container",
                props: {
                    VD: { x: 0, y: 0, visible: false }
                },
                children: {
                    settingsBg: {
                        type: "Rectangle",
                        props: {
                            VD: { x: 0, y: 0, alpha: 0.25 },
                            layout: { w: 1280, h: 720, color: 0x000000 }
                        }
                    },
                    // settingsBgRect: {
                    //     type: "RoundRectangle",
                    //     props: {
                    //         VD: { x: 190, y: 65, alpha: 0.8 },
                    //         layout: { w: 900, h: 600, r: 6, color: 0x000000 }
                    //     }
                    // },
                    settingsBg1: {
                        type: "Sprite",
                        props: {
                            img: "SettingsBg",
                            VD: { x: 640, y: 360, anchor: 0.5, scale: 1.1,alpha:0.9 }
                        }
                    },
                    optionsTabBase: {
                        type: "RoundRectangle",
                        props: {
                            VD: { x: 278, y: 95, alpha: 0.1,scale:0 },
                            layout: { w: 448, h: 60, r: 6, color: 0xffffff }
                        }
                    },
                    autoSpinSettingsTabBase: {
                        type: "RoundRectangle",
                        props: {
                            VD: { x: 660, y: 95, alpha: 0, scale:{x:0,y:0}},
                            layout: { w: 448, h: 60, r: 6, color: 0xffffff }
                        }
                    },
                    settingsIcon: {
                        type: "Sprite",
                        props: {
                            img: "mSettingsBtn_normal",
                            VD: { x: 30, y: 33, alpha: 0 }
                        }
                    },
                    settingsTitle: {
                        type: "Text",
                        props: {
                            VD: { x: 100, y: 30, alpha: 0 },
                            text: "SETTINGS",
                            textStyle: {
                                fontFamily: "Montserrat-ExtraBold",
                                fontSize: 28,
                                fill: 0x000,
                                fontStyle: "bold",
                                padding: 10
                            }
                        }
                    },
                    SettingHeading: {
                        type: "Text",
                        props: {
                            VD: { x: 452, y: 124,scale:1.2, anchor: { x: 0, y: 0.5 } },
                            text: ["system_text"],
                            textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 33, fill:  0x0096FF, padding: 10 }
                        }
                    },
                    settingsCloseBtn: {
                        type: "Button",
                        props: {
                            // img: "btnBg",
                            img: "bet_close",
                            VD: { x: 1075, y: 107, anchor: 0.5, scale:0.8 }
                        }
                    },
                    resumeGameTitle: {
                        type: "Text",
                        props: {
                            VD: { x: 640, y: 625, anchor: 0.5 },
                            text: "",
                            textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 20, fill: 0xffc800 }
                        }//0x000000
                    },
                    optionsTab: {
                        type: "Sprite",
                        props: {
                            img: "Option_Normal",
                            VD: { x: 444, y: 125, scale:0, anchor: 0.5 },
                        }
                    },
                    // optionsTab: {
                    //     type: "Text",
                    //     props: {
                    //         VD: { x: 414, y: 125, anchor: 0.5 },
                    //         text: "Options",
                    //         textStyle: {
                    //             fontFamily: "Montserrat-ExtraBold",
                    //             fontSize: 28,
                    //             maxWidth: 240,
                    //             fill: 0xffffff,
                    //             fontStyle: "bold",
                    //             padding: 10
                    //         }
                    //     }
                    // },
                    // autoSpinSettingsTab: {
                    //     type: "Sprite",
                    //     props: {
                    //         img: "AutoSpin_Normal",
                    //         VD: { x: 828, y: 125, scale:0.8, anchor: 0.5 },
                    //     }
                    // },
                    // autoSpinSettingsTab: {
                    //     type: "Text",
                    //     props: {
                    //         VD: { x: 866, y: 125, anchor: 0.5 },
                    //         text: "Auto Spin",
                    //         textStyle: {
                    //             fontFamily: "Montserrat-ExtraBold",
                    //             fontSize: 28,
                    //             maxWidth: 440,
                    //             fill: 0xffffff,
                    //             fontStyle: "bold",
                    //             padding: 10
                    //         }
                    //     }
                    // },
                    audioContainer: {
                        type: "Container",
                        props: {
                            VD: { x: 300, y: 39 }
                        },
                        children: {
                            // volumeTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 180, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            // volumeText: {
                            //     type: "Text",
                            //     props: {
                            //         VD: { x: 30, y: 200,scale:1.2, anchor: { x: 0, y: 0.5 } },
                            //         text: "Volume",
                            //         textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                            //     }
                            // },
                            // soundEffectsTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 240, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            soundEffectsText: {
                                type: "Text",
                                props: {
                                    VD: { x: 340, y: 410,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["sound"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },
                            soundEffectSubText:{
                                type: "Text",
                                props: {
                                    VD: { x: 345, y: 440,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Turn on or off the Game Sound",
                                    text: ["sound1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a, padding: 10 }
                                }

                            },

                            // soundEffectsOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 260, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },

                            soundEffectOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 410, scale:  0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            soundEffectOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 410, scale:  0.8, anchor: 0.5 },
                                    img: "SwitchOn"
                                }
                            },

                            // ambienceSoundTextSutTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 300, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            ambienceSoundText: {
                                type: "Text",
                                props: {
                                    VD: { x: 340, y: 350, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["ambient"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },
                            ambienceSoundSubText: {
                                type: "Text",
                                props: {
                                    VD: { x: 345, y: 380, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Turn on or off the Game Music",
                                    text: ["ambient1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a, padding: 10 }
                                }
                            },
                            

                            // ambienceSoundOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 320, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            ambienceSoundOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 350, scale:  0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            ambienceSoundOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 350, scale:  0.8, anchor: 0.5 },
                                    img: "SwitchOn"
                                }
                            },
                            // quickSpinTextSubTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 360, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            quickSpinText: {
                                type: "Text",
                                props: {
                                    VD: { x: 340, y: 180, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["quickspin"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            quickSpinSubText: {
                                type: "Text",
                                props: {
                                    VD: { x: 345, y: 210, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Play by reducing Total Spin time",
                                    text: ["quickspintxt1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                                }
                            },

                            skipBigwinText: {
                                type: "Text",
                                props: {
                                    VD: { x: 340, y: 263, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["battery"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            skipBigwinSubText: {
                                type: "Text",
                                props: {
                                    VD: { x: 345, y: 295, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Save Battery life by reducing Animation \n Speed",
                                    text: ["battery1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                                }
                            },

                            // quickSpinOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 380, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },

                            quickSpinOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 180, scale:  0.8, anchor: 0.5 },
                                    img: "SwitchOff"
                                }
                            },
                            quickSpinOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 180, scale:  0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOn"
                                }
                            },

                            skipBigwinOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 263, scale:  0.8, anchor: 0.5 },
                                    img: "SwitchOff"
                                }
                            },
                            skipBigwinOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 263, scale:  0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOn"
                                }
                            },


                            // pressSpaceTextSubTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 420, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            pressSpaceText: {
                                type: "Text",
                                props: {
                                    VD: { x: 340, y: 477, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["introscreen"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            pressSpaceSubText: {
                                type: "Text",
                                props: {
                                    VD: { x: 345, y: 509, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["introscreen1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                                }
                            },

                            // spaceClickOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 440, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },

                            spaceClickOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 477, scale:0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            spaceClickOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 700, y: 477, scale: 0.8, anchor: 0.5 },
                                    img: "SwitchOn"
                                }
                            },

                            // historyTextSubTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 480, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            historyTitle: {
                                type: "Text",
                                props: {
                                    VD: { x: -30, y: 258, scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["gamehist"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },

                            historyButton: {
                                type: "Button",
                                props: {
                                    VD: { x: 163, y: 255, anchor: 0.5, scale: { x: 1, y: 1 } },
                                    // img: "btnBg",
                                    img: "HistoryBg",
                                    // options: {
                                    //     "hitArea": { "type": "polygon", "params": [-121 * 0.5, -52 * 0.5, 120 * 0.5, -51 * 0.5, 135 * 0.5, -45 * 0.5, 168 * 0.5, -2 * 0.5, 139 * 0.5, 36 * 0.5, 121 * 0.5, 46 * 0.5, -119 * 0.5, 47 * 0.5, -167 * 0.5, - 2 * 0.5,
                                    //         -167 * 0.5, -2 * 0.5, -140 * 0.5, -41 * 0.5,
                                    //         ] }},
                                    "options": {
                        hitArea: { type: "circle", params: { x: 0, y: 0, r: 10 } }
                    },
                                }

                            },
                            seeHistoryTitle: {
                                type: "Sprite",
                                props: {
                                    img: "Historybtn",
                                    VD: { x: 163, y: 255, scale:0.8, anchor: 0.5 },
                                }
                            },
                            lineTop: {
                                type: "Sprite",
                                props: {
                                    img: "Line",
                                    VD: { x: 80, y: 237, scale:0.8, anchor: 0.5 },
                                }
                            },
                            LineBottom: {
                                type: "Sprite",
                                props: {
                                    img: "Line",
                                    VD: { x: 80, y: 283, scale:0.8, anchor: 0.5 },
                                }
                            },
                            // seeHistoryTitle: {
                            //     type: "Text",
                            //     props: {
                            //         VD: { x: 560, y: 560, anchor: 0.5 },
                            //         text: "HISTORY",
                            //         textStyle: { fontFamily: "andadaBold", fontSize: 25, fill: 0xffc800 }
                            //     }
                            // },
                            totalBet: {
                                type: "Text",
                                props: {
                                    VD: { x: 75, y: 365, scale:1.2, anchor: { x: 0.5, y: 0.5 } },
                                    text: ["totalbet"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            totalBetBox: {
                                type: "Sprite",
                                props: {
                                    img: "betBox",
                                    VD: { x: 70, y: 409, anchor: 0.5, scale: { x: 1.23 } }
                                },
                        },
                            PlusBet: {
                                type: "Button",
                                props: {
                                    // img: "btnBg",
                                    img: "Add",
                                    VD: { x: 169, y: 410, anchor: 0.5, scale:0.5 }
                                }
                            },
                            MinusBet: {
                                type: "Button",
                                props: {
                                    // img: "btnBg",
                                    img: "minus",
                                    VD: { x: -30, y: 410, anchor: 0.5, scale:0.5 }
                                }
                            },

                        }
                    },
                    autoPlayContainer: {
                        type: "Container",
                        props: {
                            VD: { x: 300, y: 125 }
                        },
                        children: {
                            // onAnyWinTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 55, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            onAnyWinText: {
                                type: "Text",
                                props: {
                                    VD: { x: 30, y: 75, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    text: "Stop on any win",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 18,
                                        fill: 0xffffff,
                                        padding: 10
                                    }
                                }
                            },

                            // onAnyWinOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 75, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },
                            onAnyWinOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 75, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOff"
                                }
                            },
                            onAnyWinOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 75, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOn"
                                }
                            },

                            // autoSpinWinLimitTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 115, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: {
                            // 			fontFamily: "Montserrat-Regular",
                            // 			fontSize: 13,
                            // 			fill: 0xffffff,
                            // 			padding: 10
                            // 		}
                            // 	}
                            // },
                            autoSpinWinLimitText: {
                                type: "Text",
                                props: {
                                    VD: { x: 30, y: 135,scale:1.2, anchor: { y: 0.5 } },
                                    text: "Stop on single win limit",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },

                            // asWinLimitOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 135, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },

                            autoSpinWinLimitOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 135, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOff"
                                }
                            },
                            autoSpinWinLimitOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 135, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOn"
                                }
                            },


                            // autoSpinLossLimitTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 30, y: 235, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: {
                            // 			fontFamily: "Montserrat-Regular",
                            // 			fontSize: 13,
                            // 			fill: 0xffffff,
                            // 			padding: 10
                            // 		}
                            // 	}
                            // },
                            autoSpinLossLimitText: {
                                type: "Text",
                                props: {
                                    VD: { x: 30, y: 255,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: "Stop on session loss limit",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 18,
                                        fill: 0xffffff,
                                        padding: 10
                                    }
                                }
                            },

                            // asLossLimitOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VD: { x: 550, y: 255, anchor: { x: 1, y: 0.5 } },
                            // 		text: "Off",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, "align": "right", fill: 0xffffff, padding: 10 }
                            // 	}
                            // },


                            autoSpinLossLimitOff: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 255, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOff"
                                }
                            },
                            autoSpinLossLimitOn: {
                                type: "Sprite",
                                props: {
                                    VD: { x: 600, y: 255, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOn"
                                }
                            },

                            inputWinLimitBg: {
                                type: "Sprite",
                                props: {
                                    img: "textField_text",
                                    VD: { x: 585, y: 200, anchor: 0.5, scale: { x: 1.23 } }
                                }
                            },
                            inputLossLimitBg: {
                                type: "Sprite",
                                props: {
                                    img: "textField_text",
                                    VD: { x: 585, y: 320, anchor: 0.5, scale: { x: 1.23 } }
                                }
                            },

                            inputWinLimitText: {
                                type: "Text",
                                props: {
                                    VD: { x: 585, y: 200, scale:1.2,anchor: 0.5 },
                                    text: "100",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, maxWidth: 105 }
                                }
                            },
                            inputLossLimitText: {
                                type: "Text",
                                props: {
                                    VD: { x: 585, y: 320, scale:1.2,anchor: 0.5 },
                                    text: "",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, maxWidth: 105 }
                                }
                            }
                        }
                    },
                    autoPlay: {
                        type: "Container",
                        props: {
                            VD: { x: 360, y: 500 }
                        },
                        children: {
                            autoPlayTitle: {
                                type: "Text",
                                props: {
                                    VD: { x: -35, y: -20 + 15, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    text: "Auto Play",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff,
                                        maxWidth: 350,
                                        padding: 10
                                    }
                                }
                            },

                            autoPlayNumBg1: {
                                type: "Button",
                                props: {
                                    VD: { x: 0, y: 51.5, scale: { x:0.1, y: 0.1 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt1: {
                                type: "Text",
                                props: {
                                    VD: { x: 0, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "10",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg2: {
                                type: "Button",
                                props: {
                                    VD: { x: 75, y: 51.5, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt2: {
                                type: "Text",
                                props: {
                                    VD: { x: 75, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "20",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg3: {
                                type: "Button",
                                props: {
                                    VD: { x: 150, y: 51.5, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt3: {
                                type: "Text",
                                props: {
                                    VD: { x: 150, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "30",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg4: {
                                type: "Button",
                                props: {
                                    VD: { x: 225, y: 51.5, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt4: {
                                type: "Text",
                                props: {
                                    VD: { x: 225, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "50",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg5: {
                                type: "Button",
                                props: {
                                    VD: { x: 293.5, y: 51.5, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt5: {
                                type: "Text",
                                props: {
                                    VD: { x: 295, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "100",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },

                            autoPlayButton: {
                                type: "Button",
                                props: {
                                    VD: { x: 530, y: 50, scale: { x: 1, y: 1 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "Start",
                                    options: {
                                        // textField: {
                                        //     props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                                        //     text: "START",
                                        //     textStyle: { fontSize: 25, fontFamily: "andadaBold", fill: 0xffc800, align: "center", maxWidth: 175, padding: 10 }
                                        // },
                                        "hitArea": { "type": "polygon", "params": [-121 * 0.5, -52 * 0.5, 120 * 0.5, -51 * 0.5, 135 * 0.5, -45 * 0.5, 168 * 0.5, -2 * 0.5, 139 * 0.5, 36 * 0.5, 121 * 0.5, 46 * 0.5, -119 * 0.5, 47 * 0.5, -167 * 0.5, - 2 * 0.5,
                                        -167 * 0.5, -2 * 0.5, -140 * 0.5, -41 * 0.5,
                                        ] }
                                    
                                    }
                                }
                            },

                        }
                    }
                }
            }
        },
        Mobile: {
            settingsMContainer: {
                type: "Container",
                props: {
                    VL: { x: 0, y: 0, visible: false },
                    VP: { x: 0, y: 0, visible: false }
                },
                children: {
                    settingsBg: {
                        type: "Rectangle",
                        props: {
                            VL: { x: 0, y: 0, alpha: 0.5 },
                            VP: { x: 0, y: 0, alpha: 0.5 },
                            layout: { w: 1280, h: 720, color: 0x000000 }
                        }
                    },
                    settingsBg1: {
                        type: "Sprite",
                        props: {
                            img: "SettingsBg",
                            // VL: { x: 640, y: 360, anchor: 0.5, scale: 1.1 },
                            // VP: { x: 360, y: 640, anchor: 0.5, scale: 1.1 }
                            VL: { x: 0, y: 0, scale: 0 },
                            // VL: { x: 0, y: 0 },
                            VP: { x: 0, y: 0, scale: 0 }
                        }
                    },
                    settingsBgRect: {
                    	type: "RoundRectangle",
                    	props: {
                    		VL: { x: 0, y: 0, alpha: 0.9 },
                    		VP: { x: 0, y: 0, alpha: 0.9 },
                    		layout: { w: 1435, h: 900, r: 6, color: 0x000000 }
                    	}
                    },



                    gameSettingsTitle: {
                        type: "Text",
                        props: {
                            VL: { x: 100, y: 30, alpha: 0 },
                            VP: { x: 100, y: 30, alpha: 0 },
                            text: "",
                            textStyle: {
                                fontFamily: "Montserrat-ExtraBold",
                                fontSize: 30,
                                fill: 0xffffff,
                                fontStyle: "bold",
                                padding: 10
                            }
                        }
                    },
                    SettingmHeading: {
                        type: "Text",
                        props: {
                            VL: { x: 100, y: 30, alpha: 0 },
                            VP: { x: 100, y: 30, alpha: 0 },
                            text: ["system_text"],
                            textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 33, fill:  0x0096FF, padding: 10 }
                        }
                    },
                    settingsCloseButton: {
                        type: "Button",
                        props: {
                            // img: "btnBg",
                            img: "bet_close",
                            VL: { x: 1352, y: 77, anchor: 0.5, scale: { x: 2, y: 2 } },
                            VP: { x: 1352, y: 77, anchor: 0.5, scale: { x:2, y: 2 } }
                        }
                    },
                    resumeGameTitle: {
                        type: "Text",
                        props: {
                            VL: { x: 530, y: 605, anchor: 0.5 },
                            VP: { x: 530, y: 605, anchor: 0.5 },
                            text: "",
                            textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 20, fill: 0xffc800 }
                        }
                    },

                    optionsTabBase: {
                        type: "RoundRectangle",
                        props: {
                            VL: { x: 285, y: 75, scale:0,alpha: 0.0 },
                            VP: { x: 285, y: 75, scale:0,alpha: 0.0 },
                            layout: { w: 448, h: 60, r: 6, color: 0xffffff }
                        }
                    },
                    autoSpinSettingsTabBase: {
                        type: "RoundRectangle",
                        props: {
                            VL: { x: 765, y: 75,scale:0, alpha: 0.1 },
                            VP: { x: 765, y: 75,scale:0, alpha: 0.1 },
                            layout: { w: 448, h: 60, r: 6, color: 0xffffff }
                        }
                    },
                    // settingsIcon: {
                    // 	type: "Sprite",
                    // 	props: {
                    // 		img: "Option_Normal",
                    // 		VL: { x: 30, y: 33, alpha: 0 },
                    // 		VP: { x: 30, y: 33, alpha: 0 }
                    // 	}
                    // },
                    // optionsTab: {
                    //     type: "Sprite",
                    //     props: {
                    //         img: "Option_Normal",
                    //         VL: { x: 478, y: 102, anchor: 0.5 },
                    //         VP: { x: 478, y: 102, anchor: 0.5 },
                    //     }
                    // },
                    // optionsTab: {
                    //     type: "Text",
                    //     props: {
                    //         VL: { x: 270, y: 102, anchor: 0.5 },
                    //         VP: { x: 270, y: 102, anchor: 0.5 },
                    //         text: "Options",
                    //         textStyle: {
                    //             fontFamily: "Montserrat-ExtraBold",
                    //             fontSize: 28,
                    //             maxWidth: 240,
                    //             fill: 0xffffff,
                    //             fontStyle: "bold",
                    //             padding: 10
                    //         }
                    //     }
                    // },
                    // autoSpinSettingsTab: {
                    //     type: "Sprite",
                    //     props: {
                    //         img: "AutoSpin_Normal",
                    //         VL: { x: 962, y: 102, anchor: 0.5 },
                    //                 VP: { x: 962, y: 102, anchor: 0.5 },
                    //     }
                    // },
                    // autoSpinSettingsTab: {
                    //     type: "Text",
                    //     props: {
                    //         VL: { x: 720, y: 102, anchor: 0.5 },
                    //         VP: { x: 720, y: 102, anchor: 0.5 },
                    //         text: "Auto Spin",
                    //         textStyle: {
                    //             fontFamily: "Montserrat-ExtraBold",
                    //             fontSize: 28,
                    //             maxWidth: 440,
                    //             fill: 0xffffff,
                    //             fontStyle: "bold",
                    //             padding: 10
                    //         }
                    //     }
                    // },
                    audioMContainer: {
                        type: "Container",
                        props: {
                            VL: { x: 180, y: -95, scale:1.6 },
                            VP: { x: 180, y: -95 , scale:1.6}
                        },
                        children: {
                            SettingmHeading: {
                                type: "Text",
                                props: {
                                    VL: { x: 193, y: 136,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 193, y: 136,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["system_text"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 26, fill: 0x0096FF, padding: 10 }
                                }
                            },
                            // volumeTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 180, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 180, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            // volumeText: {
                            //     type: "Text",
                            //     props: {
                            //         VL: { x: 30, y: 200, scale:1.2, anchor: { x: 0, y: 0.5 } },
                            //         VP: { x: 30, y: 200, scale:1.2 , anchor: { x: 0, y: 0.5 } },
                            //         text: "Volume",
                            //         textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                            //     }
                            // },
                            // soundEffectsTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 240, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 240, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            soundEffectsText: {
                                type: "Text",
                                props: {
                                    VL: { x: 360, y: 225,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 360, y: 225,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["sound"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },
                            soundEffectSubText:{
                                type: "Text",
                                props: {
                                    VL: { x: 362, y: 252,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 362, y: 252,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Turn on or off the Game Sound",
                                    text: ["sound1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a, padding: 10 }
                                }

                            },
                            soundEffectOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 225, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 646, y: 225, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            soundEffectOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 225, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 646, y: 225, scale: 0.8, anchor: 0.5 },
                                    img: "SwitchOn"
                                }
                            },

                            // ambienceSoundTextSutTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 300, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 300, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            ambienceSoundText: {
                                type: "Text",
                                props: {
                                    VL: { x: 360, y: 315,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 360, y: 315,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["ambient"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },
                            ambienceSoundSubText: {
                                type: "Text",
                                props: {
                                    VL: { x: 362, y: 342,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 362, y: 342,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    // text: "Turn on or off the Game Music",
                                    text: ["ambient1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a, padding: 10 }
                                }
                            },
                            ambienceSoundOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 315, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 646, y: 315, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOff"
                                }
                            },
                            ambienceSoundOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 315, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 646, y: 315, scale: 0.8, anchor: 0.5 },
                                    img: "SwitchOn"
                                }
                            },
                            // quickSpinTextSubTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 360, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 360, anchor: { x: 0, y: 0.5 } },
                            // 		text: "",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            quickSpinText: {
                                type: "Text",
                                props: {
                                    VL: { x: 360, y: 400, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 360, y: 400, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    text: ["quickspin"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            quickSpinSubText: {
                                type: "Text",
                                props: {
                                    VL: { x: 362, y: 427, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 362, y: 427, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    // text: "Play by reducing Total Spin time",
                                    text: ["quickspintxt1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                                }
                            },


                            quickSpinOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 400, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 646, y: 400, scale: 0.8, anchor: 0.5 },
                                    img: "SwitchOff"
                                }
                            },
                            quickSpinOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 400, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 646, y: 400, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOn"
                                }
                            },

                            skipBigwinText: {
                                type: "Text",
                                props: {
                                    VL: { x: 360, y: 475, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 360, y: 475, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    text: ["battery"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },
                            skipBigwinSubText: {
                                type: "Text",
                                props: {
                                    VL: { x: 362, y: 510, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 362, y: 510, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    // text: "Save Battery life by reducing Animation \n Speed",
                                    text: ["battery1"],
                                    textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                                }
                            },

                            skipBigwinOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 475, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 646, y: 475, scale: 0.8, anchor: 0.5 },
                                    img: "SwitchOff"
                                }
                            },
                            skipBigwinOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 646, y: 475, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 646, y: 475, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "SwitchOn"
                                }
                            },


                            // pressSpaceTextSubTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 420, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 420, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            // pressSpaceText: {
                            //     type: "Text",
                            //     props: {
                            //         VL: { x: 30, y: 440, anchor: { x: 0, y: 0.5 } },
                            //         VP: { x: 30, y: 440, anchor: { x: 0, y: 0.5 } },
                            //         text: "INTRO SCREEN",
                            //         textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                            //     }
                            // },
                            // pressSpaceSubText: {
                            //     type: "Text",
                            //     props: {
                            //         VL: { x: 30, y: 440, anchor: { x: 0, y: 0.5 } },
                            //         VP: { x: 30, y: 440, anchor: { x: 0, y: 0.5 } },
                            //         text: "SHOW THE INTROSCREEN BEFORE STARTING THE \n GAME",
                            //         textStyle: { fontFamily: "ProximaNova_Bold", fontSize: 15, fill: 0x3a3a3a }
                            //     }
                            // },
                            // spaceClickOff: {
                            //     type: "Sprite",
                            //     props: {
                            //         VL: { x: 600, y: 440, scale: 1, anchor: 0.5, visible: false },
                            //         VP: { x: 600, y: 440, scale: 1, anchor: 0.5, visible: false },
                            //         img: "sCheckOff"
                            //     }
                            // },
                            // spaceClickOn: {
                            //     type: "Sprite",
                            //     props: {
                            //         VL: { x: 600, y: 440, scale: 1, anchor: 0.5 },
                            //         VP: { x: 600, y: 440, scale: 1, anchor: 0.5 },
                            //         img: "sCheckOn"
                            //     }
                            // },

                            // historyTextSubTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 480, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 480, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Settings",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            historyTitle: {
                                type: "Text",
                                props: {
                                    VL: { x: 30, y: 280,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 30, y: 280,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: ["gamehist"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff }
                                }
                            },

                            historyButton: {
                                type: "Button",
                                props: {
                                    VL: { x: 30, y: 280, anchor: 0.5, scale: { x: 1, y: 1 } },
                                    VP: { x: 30, y: 280, anchor: 0.5, scale: { x: 1, y: 1 } },
                                    // img: "btnBg",
                                    img: "Historybtn",
                                },
                               
                            },
                            seeHistoryTitle: {
                                type: "Sprite",
                                props: {
                                    img: "Historybtn",
                                    VL: { x: 223, y: 275,scale:0.8, anchor: 0.5 },
                                    VP: { x: 223, y: 275,scale:0.8, anchor: 0.5 },
                                }
                            },
                            // seeHistoryTitle: {
                            //     type: "Text",
                            //     props: {
                            //         VL: { x: 560, y: 500, anchor: 0.5 },
                            //         VP: { x: 560, y: 500, anchor: 0.5 },
                            //         text: "HISTORY",
                            //         textStyle: { fontFamily: "andadaBold", fontSize: 25, fill: 0xffc800 }
                            //     },
                              
                            // }
                            lineTop: {
                                type: "Sprite",
                                props: {
                                    img: "Line",
                                    VL: { x: 115, y: 235, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 115, y: 235, scale: 0.8, anchor: 0.5 },
                                }
                            },
                            LineBottom: {
                                type: "Sprite",
                                props: {
                                    img: "Line",
                                    VL: { x: 115, y: 322, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 115, y: 322, scale: 0.8, anchor: 0.5 },
                                }
                            },
                            // seeHistoryTitle: {
                            //     type: "Text",
                            //     props: {
                            //         VD: { x: 560, y: 560, anchor: 0.5 },
                            //         text: "HISTORY",
                            //         textStyle: { fontFamily: "andadaBold", fontSize: 25, fill: 0xffc800 }
                            //     }
                            // },
                            totalBet: {
                                type: "Text",
                                props: {
                                    VL: { x: 102, y: 376, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 102, y: 376, scale: 0.8, anchor: 0.5 },
                                    text: ["totalbet"],
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 25, fill: 0xffffff }
                                }
                            },
                            totalBetBox: {
                                type: "Sprite",
                                props: {
                                    img: "betBox",
                                    VL: { x: 103, y: 421, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 103, y: 421, scale: 0.8, anchor: 0.5 },
                                },
                        },
                            PlusBet: {
                                type: "Button",
                                props: {
                                    // img: "btnBg",
                                    img: "Add",
                                    VL: { x: 178, y: 421, scale: 0.5, anchor: 0.5 },
                                    VP: { x: 178, y: 421, scale: 0.5, anchor: 0.5 },
                                }
                            },
                            MinusBet: {
                                type: "Button",
                                props: {
                                    // img: "btnBg",
                                    img: "minus",
                                    VL: { x: 25, y: 421, scale: 0.5, anchor: 0.5 },
                                    VP: { x: 25, y: 421, scale: 0.5, anchor: 0.5 },
                                }
                            },
                        }
                    },
                    autoPlayMContainer: {
                        type: "Container",
                        props: {
                            VL: { x: 180, y: 75,scale:1.6, },
                            VP: { x: 180, y: 75,scale:1.6, }
                        },
                        children: {
                            // onAnyWinTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 55, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 55, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: { fontFamily: "Montserrat-Regular", fontSize: 13, fill: 0x9a7f3f, padding: 10 }
                            // 	}
                            // },
                            onAnyWinText: {
                                type: "Text",
                                props: {
                                    VL: { x: 30, y: 75, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 30, y: 75,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: "Stop on any win",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 18,
                                        fill: 0xffffff,
                                        padding: 10
                                    }
                                }
                            },
                            onAnyWinOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 75, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 600, y: 75, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOff"
                                }
                            },
                            onAnyWinOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 75, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 600, y: 75, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOn"
                                }
                            },

                            // autoSpinWinLimitTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 115, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 115, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: {
                            // 			fontFamily: "Montserrat-Regular",
                            // 			fontSize: 13,
                            // 			fill: 0x9a7f3f,
                            // 			padding: 10
                            // 		}
                            // 	}
                            // },
                            autoSpinWinLimitText: {
                                type: "Text",
                                props: {
                                    VL: { x: 30, y: 135, scale:1.2,anchor: { y: 0.5 } },
                                    VP: { x: 30, y: 135, scale:1.2,anchor: { y: 0.5 } },
                                    text: "Stop on single win limit",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, padding: 10 }
                                }
                            },

                            autoSpinWinLimitOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 135, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 600, y: 135, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOff"
                                }
                            },
                            autoSpinWinLimitOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 135, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 600, y: 135, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOn"
                                }
                            },


                            // autoSpinLossLimitTextTitle: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 235, anchor: { x: 0, y: 0.5 } },
                            // 		VP: { x: 30, y: 235, anchor: { x: 0, y: 0.5 } },
                            // 		text: "Auto Spin",
                            // 		textStyle: {
                            // 			fontFamily: "Montserrat-Regular",
                            // 			fontSize: 13,
                            // 			fill: 0x9a7f3f,
                            // 			padding: 10
                            // 		}
                            // 	}
                            // },
                            autoSpinLossLimitText: {
                                type: "Text",
                                props: {
                                    VL: { x: 30, y: 255, scale:1.2,anchor: { x: 0, y: 0.5 } },
                                    VP: { x: 30, y: 255,scale:1.2, anchor: { x: 0, y: 0.5 } },
                                    text: "Stop on session loss limit",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 18,
                                        fill: 0xffffff,
                                        padding: 10
                                    }
                                }
                            },
                            // asLossLimitOnOffTxt: {
                            // 	type: "Text",
                            // 	props: {
                            // 		VL: { x: 30, y: 235, anchor: 0.5 },
                            // 		VP: { x: 30, y: 235, anchor: 0.5 },
                            // 		text: "on",
                            // 		textStyle: {
                            // 			fontFamily: "Montserrat-Regular",
                            // 			fontSize: 13,
                            // 			fill: 0x9a7f3f,
                            // 			padding: 10
                            // 		}
                            // 	}
                            // },


                            autoSpinLossLimitOff: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 255, scale: 0.8, anchor: 0.5, visible: false },
                                    VP: { x: 600, y: 255, scale: 0.8, anchor: 0.5, visible: false },
                                    img: "sCheckOff"
                                }
                            },
                            autoSpinLossLimitOn: {
                                type: "Sprite",
                                props: {
                                    VL: { x: 600, y: 255, scale: 0.8, anchor: 0.5 },
                                    VP: { x: 600, y: 255, scale: 0.8, anchor: 0.5 },
                                    img: "sCheckOn"
                                }
                            },

                            inputWinLimitBg: {
                                type: "Sprite",
                                props: {
                                    img: "textField_text",
                                    VL: { x: 575, y: 200, anchor: 0.5, scale: { x: 1 } },
                                    VP: { x: 575, y: 200, anchor: 0.5, scale: { x: 1 } }
                                }
                            },
                            inputLossLimitBg: {
                                type: "Sprite",
                                props: {
                                    img: "textField_text",
                                    VL: { x: 575, y: 320, anchor: 0.5, scale: { x: 1 } },
                                    VP: { x: 575, y: 320, anchor: 0.5, scale: { x: 1 } }
                                }
                            },

                            inputWinLimitText: {
                                type: "Text",
                                props: {
                                    VL: { x: 575, y: 200, scale:1.2,anchor: 0.5 },
                                    VP: { x: 575, y: 200, scale:1.2,anchor: 0.5 },
                                    text: "100",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, maxWidth: 105 }
                                }
                            },
                            inputLossLimitText: {
                                type: "Text",
                                props: {
                                    VL: { x: 575, y: 320, scale:1.2,anchor: 0.5 },
                                    VP: { x: 575, y: 320,scale:1.2, anchor: 0.5 },
                                    text: "",
                                    textStyle: { fontFamily: "Montserrat-ExtraBold", fontSize: 18, fill: 0xffffff, maxWidth: 105 }
                                }
                            }
                        }
                    },
                    autoMPlay: {
                        type: "Container",
                        props: {
                            VL: { x: 250, y: 669, scale:1.6 },
                            VP: { x: 250, y: 669, scale:1.6 }
                        },
                        children: {
                            autoPlayTitle: {
                                type: "Text",
                                props: {
                                    VL: { x: -35, y: -20 + 15, anchor: { x: 0, y: 0.5 } },
                                    VP: { x: -35, y: -20 + 15, anchor: { x: 0, y: 0.5 } },
                                    text: "Auto Play",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff,
                                        maxWidth: 350,
                                        padding: 10
                                    }
                                }
                            },

                            autoPlayNumBg1: {
                                type: "Button",
                                props: {
                                    VL: { x: 0, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 0, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt1: {
                                type: "Text",
                                props: {
                                    VL: { x: 0, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 0, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "10",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg2: {
                                type: "Button",
                                props: {
                                    VL: { x: 80, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 80, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt2: {
                                type: "Text",
                                props: {
                                    VL: { x: 80, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 80, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "20",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg3: {
                                type: "Button",
                                props: {
                                    VL: { x: 155, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 155, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt3: {
                                type: "Text",
                                props: {
                                    VL: { x: 155, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 155, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "30",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg4: {
                                type: "Button",
                                props: {
                                    VL: { x: 230, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 230, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt4: {
                                type: "Text",
                                props: {
                                    VL: { x: 230, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 230, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "50",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },
                            autoPlayNumBg5: {
                                type: "Button",
                                props: {
                                    VL: { x: 305, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 305, y: 50, scale: { x: 1.0, y: 1.0 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "autospin_selected"
                                }
                            },
                            autoPlayNumTxt5: {
                                type: "Text",
                                props: {
                                    VL: { x: 305, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 305, y: 50, anchor: { x: 0.5, y: 0.5 } },
                                    text: "100",
                                    textStyle: {
                                        fontFamily: "Montserrat-ExtraBold",
                                        fontSize: 20,
                                        fill: 0xffffff
                                    }
                                }
                            },

                            autoPlayButton: {
                                type: "Button",
                                props: {
                                    VL: { x: 530, y: 50, scale: { x: 0.8, y: 0.8 }, anchor: { x: 0.5, y: 0.5 } },
                                    VP: { x: 530, y: 50, scale: { x: 0.8, y: 0.8 }, anchor: { x: 0.5, y: 0.5 } },
                                    img: "Start",
                                    options: {
                                        // textField: {
                                        //     props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                                        //     text: "START",
                                        //     textStyle: { fontSize: 28, fontFamily: "andadaBold", fill: 0xffc800, align: "center", maxWidth: 175, padding: 10 }
                                        // }
                                    }
                                }
                            },

                        }
                    }
                }
            },

            autoSpinSelection: {
                type: "Container",
                props: {
                    img: "buttonsImg",
                    VL: { x: 0, y: 0, visible: false },
                    VP: { x: 0, y: 0, visible: false }
                },
                children: {
                    autoSpinsLabelBg: {
                        type: "Rectangle",
                        props: {
                            VL: { x: 0, y: 0, alpha: 0.001 },
                            VP: { x: 0, y: 0, alpha: 0.001 },
                            layout: {
                                w: 2500,
                                h: 1000,
                                color: 0x000000
                            }
                        }
                    },
                    autoSelectBg: {
                        type: "Rectangle",
                        makeResponsive: true,
                        props: {
                            VL: { x: 0, y: 406, alpha: 0.6 },
                            VP: { x: 0, y: 978, alpha: 0.6 },
                            layout: {
                                w: 2500,
                                h: 1000,
                                color: 0x000000
                            },
                            HX: 0,
                            HY: 320,
                            VX: 0,
                            VY: 600,
                            landScaleX: 1,
                            landScaleY: 1,
                            portScaleX: 1,
                            portScaleY: 1,
                            landAlignX: "LEFT",
                            landAlignY: "CENTER",
                            portAlignX: "LEFT",
                            portAlignY: "CENTER"
                        }
                    },
                    asCancelASBtn: {
                        type: "Button",
                        makeResponsive: true,
                        props: {
                            img: "close",
                            VL: { x: 10, y: 344 },
                            VP: { x: 10, y: 916 },
                            HX: 1200,
                            HY: 350,
                            VX: 650,
                            VY: 630,
                            landScaleX: 1,
                            landScaleY: 1,
                            portScaleX: 1,
                            portScaleY: 1,
                            landAlignX: "RIGHT",
                            landAlignY: "TOP",
                            portAlignX: "RIGHT",
                            portAlignY: "TOP"
                        }
                    },
                    asStartBtn: {
                        type: "Button",
                        /*"makeResponsive":true,*/
                        props: {
                            img: "valueBtn",
                            VL: { x: 1069, y: 344, visible: false },
                            VP: { x: 513, y: 916, visible: false }
                            /*"HX": 1080, "HY": 360, "VX": 518, "VY": 640,
                            "landScaleX": 1, "landScaleY": 1, "portScaleX": 1, "portScaleY": 1,
                            "landAlignX": "RIGHT", "landAlignY": "BOTTOM", "portAlignX": "RIGHT", "portAlignY": "BOTTOM"*/
                        }
                    },
                    autoSpinTitle: {
                        type: "Text",
                        makeResponsive: true,
                        props: {
                            img: "confirmBetSelBtn",
                            VL: { x: 543, y: 348 },
                            VP: { x: 260, y: 920 },
                            text: "AUTO SPIN",
                            textStyle: {
                                fontFamily: "Montserrat-ExtraBold",
                                fontSize: 35,
                                fill: 0xffffff,
                                fontStyle: "bold"
                            },
                            HX: 640,
                            HY: 383,
                            VX: 360,
                            VY: 663,
                            landAnchorX: 0.5,
                            landAnchorY: 0.5,
                            portAnchorX: 0.5,
                            portAnchorY: 0.5,
                            landScaleX: 1,
                            landScaleY: 1,
                            portScaleX: 1,
                            portScaleY: 1,
                            landAlignX: "CENTER",
                            landAlignY: "BOTTOM",
                            portAlignX: "CENTER",
                            portAlignY: "BOTTOM"
                        }
                    }
                }
            }
        }
    },

    "bigWinView": {
        spineImage: "all win bg chopped final.json",
        setSize: true,
        params: {
            desktopParams: { x: 650, y: 315, anchor: 0.5 ,scale:1.2},
            HX: 640, HY: 360,
            VX: 360, VY: 620,landScaleX: 1.2,landScaleY:1.2,
            portScaleX: 0.9, portScaleY: 0.9
        },
        nice: {
            // params: {anchor: {x: 0.5, y: 0.5}, x: 0, y: 0},
            In: "nice_intro",
            Loop: "nice_loop",
            Out: "nice_outro",
        },
        omg: {
            // params: {anchor: {x: 0.5, y: 0.5}, x: 0, y: 0},
            In: "omg_intro",
            Loop: "omg_loop",
            Out: "omg_outro"
        },
        super_win: {
            // params: {anchor: {x: 0.5, y: 0.5}, x: 0, y: 0},
            In: "super_intro",
            Loop: "super_loop",
            Out: "super_outro"
        },
        fantastic_win: {
            // params: {anchor: {x: 0.5, y: 0.5}, x: 0, y: -20, scale: {x: 0.8, y: 0.8}},
            In: "fantastic_intro",
            Loop: "fantastic_loop",
            Out: "fantastic_outro"
        },
        max_win: {
            // params: {anchor: {x: 0.5, y: 0.5}, x: 0, y: 0},
            In: "max_intro",
            Loop: "max_loop",
            Out: "max_outro"
        },
        totalWinAmount: {
            params: { anchor: { x: 0.5, y: 0.5 }, x: 35, y: 100 },
            finalPositionY: 100,
            textStyle: {
                "type": "BitmapFont",
                // "font": "35px digitsIn-export"
                "fontName": "winnum-export",
                "fontSize": 35
            }
        }
    },
    "infoPopupView": {
        "errorPopup": {
            params: {
                desktopParams: { x: 640, y: 330, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 280,
                VX: 360, VY: 560, portScaleX: 0.85, portScaleY: 0.85
            },
            background: {
                bgImage: "panelBgIn",
                props: {scale:0.6, anchor: { x: 0.5, y: 0.5 } }
            },
            descriptionText: {
                props: { x: 0, y: 20,  anchor: { x: 0.5, y: 0.5 } },
                text: "Freespins Awarded",
                textStyle: {
                    // "dropShadow": true,
                    // "dropShadowDistance": 2,
                    // "fontFamily": "Arial",
                    // "fill": "#ffc800",
                    // "fontSize": 60,
                    // "maxWidth": 540,
                    // "fontWeight": "bold",
                    // "align": "center",
                    // "strokeThickness": 1
                    "dropShadow": true,
                    "fill": "#ffc800",
                    //ffc800 FFC000
                    "fontFamily": "Arial",
                    "fontSize": 35,
                    "fontWeight": "bolder",
                    "letterSpacing": 3,
                    "lineJoin": "bevel",
                    "miterLimit": 18,
                   "stroke": "#FFC000",
                    "strokeThickness": 4     
                }
            },
            fsValue: {
                props: { x: -195, y: -100, anchor: { x: 0.5, y: 0.5 } },
                "textStyle": {
                    "dropShadow": true,
                    "dropShadowDistance": 2,
                    "fill": "#ffec3e",
                    "fontSize": 40,
                    "fontWeight": "bolder",
                    "strokeThickness": 1
                }
            },

            "continueButton": {
                props: { x: 0, y: 128, scale:0.6,anchor: { x: 0.5, y: 0.5 } },
                bgImage: "continue",
                // options: {
                //     textField: {
                //         text: "CONTINUE",
                //         props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                //         textStyle: {
                //             fontSize: 25,
                //             fontFamily: "andadaBold",
                //             fill: 0xffc800,
                //             stroke: 0x000000,
                //             strokeThickness: 6,
                //             align: 'center',
                //             maxWidth: 170
                //         }
                //     }
                // }
            }

        },
        //start freespin popup
        "freeSpinPopup": {
            params: {
                desktopParams: { x: 640, y: 330, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 350,
                VX: 360, VY: 560, portScaleX: 0.85, portScaleY: 0.85
            },
            background: {
                bgImage: "panelBgIn",
                props: { anchor: { x: 0.5, y: 0.5 } }
            },
            descriptionImg: {
                // bgImage: "CongratulationsYW",
                props: { x: -8, y: -78, scale:0.7,anchor: { x: 0.5, y: 0.5 } }
            },
            fsValue: {
                props: { x: -220, y: 43, anchor: { x: 0.5, y: 0.5 } },

                "textStyle":{
                    "dropShadow": true,
                    "dropShadowAlpha": 0.4,
                    "dropShadowAngle": 0,
                    "dropShadowBlur": 5,
                    "dropShadowColor": "#ffffff",
                    "dropShadowDistance": 0,
                    "fill": [
                        "#ffffff",
                        "#f8e1b9"
                    ],
                    "fontFamily": "Arial Black",
                    "fontSize": 85,
                    "fontWeight": "bolder",
                    "lineJoin": "round",
                    "stroke": "#e647c9",
                    "strokeThickness": 10
                }
                // "textStyle": {
                //     "type": "BitmapFont",
                //     "font": "60px digitsIn-export"
                // }
            },
            // freespinImg: {
            //     bgImage: "txt_FREESPINS",
            //     props: { x: 55, y: 100, anchor: { x: 0.5, y: 0.5 } }
            // },
            // descriptionText3: {
            //     props: { x: 45, y: 101, anchor: { x: 0.5, y: 0.5 } },
            //     text: "FREE SPINS",
            //     "textStyle": {
            //         "fontFamily": "Britanic_Bold",
            //         "strokeThickness": 2,
            //         "stroke": "0x000000",
            //         "dropShadowDistance": 2,
            //         "dropShadowBlur": 15,
            //         "dropShadow": true,
            //         "fill": 0xf9e81e,
            //         "fontSize": 70,
            //         "align": "center"
            //     }
            // },
            "continueButton": {
                props: { x: 0, y: 179, scale:0.6, anchor: { x: 0.5, y: 0.5 } },
                bgImage: "continue"
            },
            // continueText: {
            //     props: { x: 0, y: 210, anchor: { x: 0.5, y: 0.5 } },
            //     text: "CONTINUE",
            //     "textStyle": {
            //         fontSize: 25,
            //         fontFamily: "andadaBold",
            //         fill: 0xffc800,
            //         stroke: 0x000000,
            //         strokeThickness: 6,
            //         align: 'center',
            //         maxWidth: 170
            //     }
            // },
        },
        //end freespin popup
        "freeSpinEndPopup": {
            params: {
                desktopParams: { x: 640, y: 330, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 350,
                VX: 360, VY: 560, portScaleX: 0.75, portScaleY: 0.75
            },
            background: {
                bgImage: "panelBgIn",
                props: { scale:0.6,anchor: { x: 0.5, y: 0.5 } }
            },

            descriptionImg: {
                bgImage: "CongratulationsYW",
                props: { x: -8, y: -78, scale:0.7,anchor: { x: 0.5, y: 0.5 } }
            },
            you_win: {
                bgImage: "You_Win",
                props: { x: 0, y: -47,scale:0.6, anchor: { x: 0.5, y: 0.5 } }
            },
          
            fsWinValue: {
                props: { x: -10, y: 40, anchor: { x: 0.5, y: 0.5 } },
                "textStyle":{
                    "dropShadow": true,
                    "dropShadowAlpha": 0.4,
                    "dropShadowAngle": 0,
                    "dropShadowBlur": 5,
                    "dropShadowColor": "#ffffff",
                    "dropShadowDistance": 0,
                    "fill": [
                        "#ffffff",
                        "#f8e1b9"
                    ],
                    "fontFamily": "Arial Black",
                    "fontSize": 75,
                    "fontWeight": "bolder",
                    "lineJoin": "round",
                    "stroke": "#e647c9",
                    "strokeThickness": 10
                }
            },
            "continueButton": {
                props: { x: 0, y: 250,scale:0.6, anchor: { x: 0.5, y: 0.5 } },
                bgImage: "continue"
            },

            // continueText: {
            //     props: { x: 0, y: 210, anchor: { x: 0.5, y: 0.5 } },
            //     text: "CONTINUE",
            //     "textStyle": {
            //         fontSize: 25,
            //         fontFamily: "andadaBold",
            //         fill: 0xffc800,
            //         stroke: 0x000000,
            //         strokeThickness: 6,
            //         align: 'center',
            //         maxWidth: 170
            //     }
            // },
        },
        "realityCheckPopup": {
            params: {
                desktopParams: { x: 640, y: 330, anchor: { x: 0.5, y: 0.5 } },
                HX: 640, HY: 320,
                VX: 360, VY: 560, portScaleX: 0.85, portScaleY: 0.85
            },
            background: {
                bgImage: "panelBgIn",
                props: { anchor: { x: 0.5, y: 0.5 } }
            },
            fsTitle: {
                bgImage: "txt_Congratulations_YourWon",
                props: { x: 0, y: -60, anchor: { x: 0.5, y: 0.5 } }
            },
            fsWinValue: {
                props: { x: 0, y: 70, anchor: { x: 0.5, y: 0.5 } },
                "textStyle": {
                    "type": "BitmapFont",
                    // "font": "45px digitsIn-export"
                    "fontName": "winnum-export",
                    "fontSize": 45
                }
            },

            "continueButton": {
                props: { x: 0, y: 135, anchor: { x: 0.5, y: 0.5 } },
                bgImage: "continue",
                options: {
                    textField: {
                        text: "CONTINUE",
                        props: { x: 0, y: 15, anchor: { x: 0.5, y: 0.5 } },
                        textStyle: {
                            fill: "#6F4000",
                            fontSize: 25,
                            fontFamily: "COPRGTB"
                        }
                    }
                }
            },

            "closeButton": {
                props: { x: 0, y: 124, anchor: { x: 0.5, y: 0.5 } },
                bgImage: "Cntinue",
                options: {
                    textField: {
                        text: "CONTINUE",
                        props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                        textStyle: {
                            fill: "#6F4000",
                            fontSize: 25,
                            fontFamily: "COPRGTB"
                        }
                    }
                }
            },


            continueText: {
                props: { x: 0, y: 127, anchor: { x: 0.5, y: 0.5 } },
                text: "CONTINUE",
                "textStyle": {
                    fontSize: 38,
                    fontFamily: "ProximaNova_Bold",
                    fill: 0x5d2202,
                    stroke: 0xFFFFFF,
                    strokeThickness: 6,
                    align: 'center'
                }
            },
        },
        "superMeterPopup": {
            params: {
                desktopParams: { x: 640, y: 340, anchor: 0.5 },
                HX: 640, HY: 340,
                VX: 360, VY: 560, portScaleX: 1, portScaleY: 1
            },
            background: {
                bgImage: "smPopupBg",
                props: { anchor: 0.5 }
            },

            contentValue: {
                bgImage: "CollectSupermeterToCreditTxt",
                props: { x: 0, y: -20, anchor: 0.5 }
            },
            // contentValueTxt: {
            // 	props: { x: 0, y: 40, anchor: 0.5},
            // 	"textStyle": {
            // 		"type": "BitmapFont",
            // 		"font": "35px bitmapFont-export"
            // 	}
            // },

            "yesButton": {
                props: { x: -120, y: 35, anchor: 0.5 },
                bgImage: "yesBtn"
            },

            "noButton": {
                props: { x: 120, y: 35, anchor: 0.5 },
                bgImage: "noBtn"
            }

        }
    },
    "intervals": { "eachLineWinDelay": 1440 },
    //SOUNDS ADDING...
    "sounds": {
        "filePath": "dist/slots/treasuresofegypt/sounds/",
        "fileName": "GameSounds.json",
        "bgMinVolume": 0.4,

        "sprite": {

            /********************************************/


            "intro": { name: "background2" },
            "bg": { name: "background", volume: 0.7 , fadeIn: true},


            "spinStartBtn": { name: "spinStartBtn",volume: 0.3 },
            "spinStopBtn": { name: "spinStopBtn" },
            "reelStart": { name: "spinStart" },
            "reelSpinning": { name: "reelspinning", fadeIn: true, volume: 0 },
            "reelStop": { name: "reelhit", volume: 0.4 },
            "anticipation": { name: "anticipation" },


            /*********** Big Win Animation ************/
            "counterLoop": { name: "CoinCounter" },
            "counterBigWinLoop": { name: "Big Win" },
            "counterMegaWinLoop": { name: "Big Win" },
            "counterSuperMegaWinLoop": { name: "Big Win" },
            "counterEnd": { name: "counterEnd" },

            "totalWin": { name: "totalwin" , volume: 0.7 },
            "bigWin": { name: "Big Win" },
            "megaWin": { name: "Big Win" },
            "superMegaWin": { name: "Big Win" },

            "bigWinDisappear": { name: "superMegaWinDissapear" },
            "megaWinDisappear": { name: "superMegaWinDissapear" },
            "superMegaWinDisappear": { name: "superMegaWinDissapear" },


            /********************************************/

            //button clicks
            "btnClick": { name: "button_click" , volume: 0.1 },

            // Panel 
            "coinValueChange": { name: "button_click" },
            "maxbetBtnClick": { name: "button_click" },
            "autoSpinBtnClick": { name: "button_click" },
            "autoSpinSelClick": { name: "button_click" },

            // Menu
            "menuBtnClick": { name: "button_click" },// done
            "menuBtnCloseClick": { name: "button_click" },    // done        
            "paytableBtnClick": { name: "button_click" },// done
            "settingsBtnClick": { name: "button_click" },// done
            "gRulesBtnClick": { name: "button_click" },// done
            "fullScreenBtnClick": { name: "button_click" },// done
            "soundBtnClick": { name: "button_click" },// done

            // Settings window
            "sCloseBtnClick": { name: "button_click" },  // done
            "sSoundSelBtnClick": { name: "button_click" }, // done
            "sAmbienceBtnClick": { name: "button_click" }, // done
            "sQuickSpinBtnClick": { name: "button_click" }, // done
            "sAnyWinBtnClick": { name: "button_click" }, // done
            "sWinLimitBtnClick": { name: "button_click" }, // done
            "sWinLimitSelBtnClick": { name: "button_click" }, // done
            "sLossLimitBtnClick": { name: "button_click" }, // done
            "sLossLimitSelBtnClick": { name: "button_click" }, // done 

            // Paytable window            
            "pArrowBtnClick": { name: "button_click" },  // done
            "pCloseBtnClick": { name: "button_click" }, // done
            "pIndicatorBtnClick": { name: "button_click" }, // done

            /********************************************/


            //Popup Sounds            
            "showPopup": { name: "showPopup" },//done
            "hidePopup": { name: "hidePopup" },//done
            "errorPopup": { name: "errorPopup" },//done
            "Meter_Amount_Revel":{name: "Meter_Amount_Revel"},
            //freespin appear
            "bgFS": { name: "Freegame_BGM2" , fadeIn: true, fadeOut: true, volume: 0.7},
            "fsAwardPopup": { name: "congratsPopup" },
            "fsWinPopup": { name: "congratsPopup" },

            /********************************************/
            "aSym": { name: "aSym" },
            "bSym": { name: "bSym" },
            "cSym": { name: "cSym" },
            "dSym": { name: "dSym" },
            "eSym": { name: "eSym" },
            "fSym": { name: "lowPaySym" },
            "gSym": { name: "lowPaySym" },
            "hSym": { name: "lowPaySym" },
            "iSym": { name: "lowPaySym" },
            "jSym": { name: "lowPaySym" },
            "kSym": { name: "lowPaySym" },
            "lSym": { name: "bonus" },
            "wSym": { name: "wildSym" },
            "sSym": { name: "Scatter Box Opening2" }, // bonusSym
            "sSymLand": { name: "Scatter Box Opening" },

            //features settings            
            "symbolsFireEnergyShots": { name: "symbolsFireEnergyShots" },
            "progressBarFill1": { name: "progressBarFill1" },
            "progressBarFill2": { name: "progressBarFill2" },
            "progressBarFill3": { name: "progressBarFill3" },
            "progressBarFill4": { name: "progressBarFill4" },
            "progressBarFill5": { name: "progressBarFill5" },
            "stickyWildReelAppear": { name: "stickyWildReelAppear" },
            "goldenFrameOnReel": { name: "goldenFrameOnReel" },
            "goldenFrameOnReel2": { name: "goldenFrameOnReel2" },


            "multiplier": { name: "multiplier_box_opening" },
            "multiplierTween": { name: "Multipliers_tween" },
            "multiplierIncrease": { name: "Multiplier Increase"},
            "pop1":{name:"Regular Burst1",volume:0.3},
            "pop2":{name:"Regular Burst2",volume:0.3},
            "pop3":{name:"Regular Burst3",volume:0.3},
            "pop4":{name:"Regular Burst4",volume:0.3},
            "pop5":{name:"Regular Burst5",volume:0.3},
            // "pop6":{name:"Symbol Burst_1st",volume:0.5},

            // "multi_1":{name:"bonus_01"},
            // "multi_2":{name:"bonus_02"},
            // "multi_3":{name:"bonus_03"},
            // "multi_4":{name:"bonus_04"},
            // "multi_5":{name:"bonus_05"},
            // "multi_6":{name:"bonus_06"},
            // "multi_7":{name:"bonus_07"},
            // "multi_8":{name:"bonus_08"},
            // "multi_9":{name:"bonus_09"},
            "scatter_Open":{name:"Scatter Box Opening2"},
            "sLand_3":{name:"ScatterLanding3"},
            "sLand_4":{name:"ScatterLanding4"},

        }
    },
    realityCheck: {
        isRealiyCheck: true,
        timeOut: 60,                 //in Minutes
        homePath: "../",
        params: {
            desktopParams: { x: 640, y: 300, anchor: { x: 0.5, y: 0.5 } },
            HX: 640,
            HY: 350,
            VX: 360,
            VY: 560,
            portScaleX: 0.8,
            portScaleY: 0.8
        },
        background: {
            bgImage: "alertBox",
            props: { anchor: { x: 0.5, y: 0.5 } }
        },
        contentTxt: {
            props: { x: 0, y: -90, anchor: { x: 0.5, y: 0.5 } },
            text: "You have been enjoying our game for the past %A1% minutes, would you like to continue?",
            textStyle: { fontFamily: "ProximaNova", fontSize: 40, fill: "#000000", align: "center", lineHeight: 90, maxWidth: 600 }
        },
        contentTxt_tr: {
            props: { x: 0, y: -90, anchor: { x: 0.5, y: 0.5 } },
            text: "Geçmişten beri oyunumuzu beğeniyordunuz\n %A1% dakika, devam etmek ister misiniz?",
            textStyle: { fontFamily: "ProximaNova", fontSize: 50, fill: "#000000", align: "center", lineHeight: 90, maxWidth: 600 }
        },
        totalBetTxt: {
            props: { x: 0, y: 4, anchor: { x: 0.5, y: 0.5 } },
            text: "total_loss",
            textStyle: { fontFamily: "ProximaNova", fontSize: 40, fill: "#000000", align: "left", lineHeight: 90, maxWidth: 600, padding: 10 }
        },
        totalWinTxt: {
            props: { x: 0, y: 52, anchor: { x: 0.5, y: 0.5 } },
            text: "total_win",
            textStyle: { fontFamily: "ProximaNova", fontSize: 40, fill: "#000000", align: "left", lineHeight: 90, maxWidth: 600, padding: 10 }
        },

        closeBtn: {
            props: { x: -140, y: 125, anchor: { x: 0.5, y: 0.5 }, scale: { x: 0.8, y: 0.8 } },
            bgImage: "alertCancelBtn",
            options: {
                textField: {
                    props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                    text: "close_txt",
                    textStyle: { fontSize: 30, fontFamily: "ProximaNova_Bold", fill: 0x000000, align: "center" }
                }
            }
        },
        historyBtn: { //UKGC
            props: { x: 0, y: 125, anchor: { x: 0.5, y: 0.5 }, scale: { x: 0.8, y: 0.8 } },
            bgImage: "alertOkBtn",
            options: {
                textField: {
                    props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                    text: "History",
                    textStyle: { fontSize: 30, fontFamily: "ProximaNova_Bold", fill: 0x000000, align: "center", maxWidth: 150 }
                }
            }
        },
        continueBtn: {
            bgImage: "alertOkBtn",
            props: { x: 140, y: 125, anchor: { x: 0.5, y: 0.5 }, scale: { x: 0.8, y: 0.8 } },
            options: {
                textField: {
                    props: { x: 0, y: 0, anchor: { x: 0.5, y: 0.5 } },
                    text: "continue_txt",
                    textStyle: { fontSize: 30, fontFamily: "ProximaNova_Bold", fill: 0x000000, align: "center" }
                }
            }
        }
    },
};
