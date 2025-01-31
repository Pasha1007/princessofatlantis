

var _ng = _ng || {};

_ng.PaytableViewUIConfig = {
    "Desktop": {
        "containerCount": 7,
        "containerList": {
            "bg": {
                "type": "Rectangle",
                "props": {
                    "VD": { "x": 0, "y": 0, alpha: 0.9 },
                    "layout": {
                        "w": 1280,
                        "h": 720,
                        "color": 0x000000

                    }
                }
            },

            // "bg1": {
            //     "type": "Sprite",
            //     "props": {
            //         "img": "info_bg",
            //         "VD": {"x": 22.5,"y": 11.5,scale:{x:0.85,y:0.75}},
            //     }
            //  },

            "container0": {
                "type": "Container",
                "props": {
                    "VD": { x: 0, y: 0, visible: true }
                },
                "children": {
                    // "icon": {
                    //     "type": "Sprite",
                    //     "props": {
                    //         "img": "mInfoBtn_normal",
                    //         "VD": { x: 118.5, y: 101, anchor: { x: 0.5, y: 0.5 } }
                    //     }
                    // },
                    // "paytable": {
                    //     "type": "Sprite",
                    //     "props": {
                    //         "img": "paytable",
                    //         "VD": { x: 558, y: 62, scale:1,anchor: { x: 0, y: 0.5 } },
                    //     }
                    // },
                    
                    //    "version": {
                    //     "type": "Text",
                    //     "props": {
                    //         "text": _ng.GameConfig.game_version,
                    //         "VD": { x: 1100, y: 650, anchor: { x: 0, y: 0.5 } },
                    //         "style": {
                    //             "fontWeight": "bold",
                    //             "fontSize": 45,
                    //             "fontFamily": "ProximaNova_Bold",
                    //             "fill": "#ffffff",
                    //             "strokeThickness": 2,
                    //             "lineJoin": "round",
                    //             "align": 'left',
                    //             "maxWidth": 300
                    //         }
                    //     }
                    // },
                    "pageval": {
                        "type": "Text",
                        "props": {
                            "text": ["page"],
                         "VD": { x: 1100, y: 650, anchor: { x: 0, y: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 24,
                                "fontFamily": "ProximaNova",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                            }
                        }
                    },
                    "closeBtn": {
                        "type": "Button",
                        "props": {
                            "img": "bet_close",
                            "VD": { x: 1200, y: 75, anchor: { x: 0.5, y: 0.5 } },
                            "hitArea": { "type": "circle", "params": { x: 0.5, y: 0.5 } }
                        }
                    },

                    "leftArrow": {
                        "type": "Button",
                        "props": {
                            "img": "ptArrow",
                            "VD": { x: 470, y: 650,"scale": { x: -.8, y: .8 },anchor:0.5 },
                            "hitArea": { "type": "polygon", "params": [
                                -18,28,
                                        -18,-28,
                                        18,-28,
                                        18,28
                            ] }
                        }
                    },
                    "rightArrow": {
                        "type": "Button",
                        "props": {
                            "img": "ptArrow",
                            "VD": { x: 810, y: 650, "scale": { x: .8, y: .8 },anchor:0.5 },
                            "hitArea": { "type": "polygon", "params": [
                                -18,28,
                                        -18,-28,
                                        18,-28,
                                        18,28
                            ] }
                        }
                    },

                    "indicator1": {
                        "type": "Sprite",
                        "props": {
                            "img": "ptIndicatorOff",
                            "VD": { x: 520, y: 650, "anchor": { x: 0.5, y: 0.5 },scale:0.6 },
                            "hitArea": { "type": "circle" }
                        }
                    },
                    "indicator2": {
                        "type": "Sprite",
                        "props": {
                            "img": "ptIndicatorOff",
                            "VD": { x: 560, y: 650, "anchor": { x: 0.5, y: 0.5 },scale:0.6 },
                            "hitArea": { "type": "circle" }
                        }
                    },
                    "indicator3": {
                        "type": "Sprite",
                        "props": {
                            "img": "ptIndicatorOff",
                            "VD": { x: 600, y: 650, "anchor": { x: 0.5, y: 0.5 },scale:0.6 },
                            "hitArea": { "type": "circle" }
                        }
                    },
                    "indicator4": {
                        "type": "Sprite",
                        "props": {
                            "img": "ptIndicatorOff",
                            "VD": { x: 640, y: 650, "anchor": { x: 0.5, y: 0.5 },scale:0.6 },
                            "hitArea": { "type": "circle" }
                        }
                    },
                    "indicator5": {
                        "type": "Sprite",
                        "props": {
                            "img": "ptIndicatorOff",
                            "VD": { x: 680, y: 650, "anchor": { x: 0.5, y: 0.5 },scale:0.6 },
                            "hitArea": { "type": "circle" }
                        }
                    },
                    "indicator6": {
                        "type": "Sprite",
                        "props": {
                            "img": "ptIndicatorOff",
                            "VD": { x: 720, y: 650, "anchor": { x: 0.5, y: 0.5 },scale:0.6 },
                            "hitArea": { "type": "circle" }
                        }
                    },
                    "indicator7": {
                        "type": "Sprite",
                        "props": {
                            "img": "ptIndicatorOff",
                            "VD": { x: 760, y: 650, "anchor": { x: 0.5, y: 0.5 },scale:0.6 },
                            "hitArea": { "type": "circle" }
                        }
                    },
                 
                    // "indicator5": {
                    //     "type": "Sprite",
                    //     "props": {
                    //         "img": "ptIndicatorOff",
                    //         "VD": { x: 700, y: 615, "anchor": { x: 0.5, y: 0.5 } },
                    //         "hitArea": { "type": "circle" }
                    //     }
                    // },
                    // "indicator6": {
                    //     "type": "Sprite",
                    //     "props": {
                    //         "img": "ptIndicatorOff",
                    //         "VD": { x: 740, y: 615, "anchor": { x: 0.5, y: 0.5 } },
                    //         "hitArea": { "type": "circle" }
                    //     }
                    // },
                    "selIndicator": {
                        "type": "Sprite",
                        "props": {
                            "img": "ptIndicatorOn",
                            "VD": { x: 520, y: 649, "anchor": { x: 0.5, y: 0.5 } ,scale:0.6},
                            "hitArea": { "type": "circle" }
                        }
                    }
                }
            },

            // SCATTER SYMBOL
            // "container1": {
            //     "type": "Container",
            //     "props": {
            //         "VD": { x: 0, y: 0, visible: true }
            //     },
            //     "children": {
                   
                    // "bonusSymbol": {
                    //     "type": "Sprite",
                    //     "props": {
                    //         "img": "Page_1",
                    //         "VD": { x: 640, y: 350, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.75, y: 0.75 } }
                    //     }
                    // },
                    // "subTitle": {
                    //     "type": "Text",
                    //     "props": {
                    //         "text": "treasuresofegyptPage1Text2",
                    //         "VD": { x: 810, y: 350, "anchor": 0.5 },
                    //         "style": {
                    //             "fontSize": 40,
                    //             "fontFamily": "ProximaNova",
                    //             "fill": "#FFFFFF",
                    //             "align": 'center',
                    //             "lineHeight": 100,
                    //             "padding": 2,
                    //             "wordWrapWidth": 1050,
                    //             "wordWrap": true,
                    //         }
                    //     }
                    // },
            // WILD SYMBOL
            // "container2": {
            //     "type": "Container",
            //     "props": {
            //         "VD": { x: 0, y: 0, visible: false }
            //     },
            //     "children": {
            //         // "title1": {
            //         //     "type": "Text",
            //         //     "props": {
            //         //         "text": "WILD SYMBOL",
            //         //         "VD": { x: 640, y: 80, "anchor": { x: 0.5 } },
            //         //         "style": {
            //         //             "fontWeight": "bold",
            //         //             "fontSize": 40,
            //         //             "fontFamily": "ProximaNova_Bold",
            //         //             "fill": "#FFFFFF",
            //         //             "align": 'center',
            //         //             "padding": 2,
            //         //             "lineHeight": 70,
            //         //         }
            //         //     }
            //         // },
            //         "wildSymbol": {
            //             "type": "Sprite",
            //             "props": {
            //                 "img": "Page_2",
            //                 "VD": { x: 640, y: 340, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.75, y: 0.75 } }
            //             }
            //         },
            //         // "paragraph1": {
            //         //     "type": "Text",
            //         //     "props": {
            //         //         "text": ["treasuresofegyptPage2Text2", "treasuresofegyptPage2Text4"],
            //         //         "VD": { x: 640, y: 505, "anchor": { x: 0.5 } },
            //         //         "style": {
            //         //             "fontSize": 30,
            //         //             "fontFamily": "ProximaNova",
            //         //             "fill": "#FFFFFF",
            //         //             "align": 'center',
            //         //             "lineHeight": 70,
            //         //             "padding": 2,
            //         //             "wordWrapWidth": 1050,
            //         //             "wordWrap": true,
            //         //         }
            //         //     }
            //         // }
            //     }
            // },
            // GAME FEATURES
            // "container1": {
            //     "type": "Container",
            //     "props": {
            //         "VD": { x: 0, y: 0, visible: true }
            //     },
              
            //     "children": {             
            //         // "sactter": {
            //         //     "type": "Sprite",
            //         //     "props": {
            //         //         "img": "Page_3",
            //         //         "VD": { x: 640, y: 340, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.75, y: 0.75 } }
            //         //     }
            //         // },
                    
            //         "scatter":{
            //             "type":"Sprite",
            //             "props":{
            //                 "img":"S",
            //                 "VD": { x: 350, y: 235, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.6, y: 0.6 } }
            //             }
            //         },
                    
            //         "scatterExplainText":{
            //             "type": "Text",
            //             "props": {
            //                 "text": "4 or more Scatter Symbols trigger the free game \nalong with providing a payout as follows:",
            //                 "VD": {  x: 350, y: 346, anchor: {x:0.5,y:0} },
            //                 // "VL": { x: -75, y: 481, anchor: 0.5 },
            //                 // "VP": { x: -75, y: 481, anchor: 0.5 },
            //                 "style": {
            //                     // "fontWeight": "bold",
            //                     "fontSize": 30,
            //                     "fontFamily": "ProximaNova",
            //                     "fill": "#ffffff",
            //                     "strokeThickness": 2,
            //                     "lineJoin": "round",
            //                     "align": 'left'
            //                     // "maxWidth": 300
            //                 }
            //             }
            //         },
            //         "scatterValueText":{
            //             "type": "Text",
            //             "props": {
            //                 "text": " 4 Scatters:  $3 \n 5 Scatters :  $10 \n 6 or more Scatters :  $50",
            //                 "VD": {  x: 355, y: 438, anchor: {x:0.5,y:0} },
            //                 // "VL": { x: -75, y: 481, anchor: 0.5 },
            //                 // "VP": { x: -75, y: 481, anchor: 0.5 },
            //                 "style": {
            //                     "fontSize": 30,
            //                     "fontFamily": "ProximaNova",
            //                     "fill": "#ffffff",
            //                     "strokeThickness": 2,
            //                     "lineJoin": "round",
            //                     "align": 'left'
            //                     // "maxWidth": 300
            //                 }
            //             }
            //         },

            //         "multiplier":{
            //             "type":"Sprite",
            //             "props":{
            //                 "img":"m",
            //                 "VD": { x: 910, y: 243, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.5, y: 0.5 } }
            //             }
            //         },
                    
            //         "multiplierExplainText":{
            //             "type": "Text",
            //             "props": {
            //                 "text": "If 1 or more of multipliers appear on the reels values\nwill be added to the total multipliers and at end of spin \nwill be multiplied with the total win\n\nThe Total Multiplier wil get reset to 0 every spin\nin base game and in Free Game the total multiplier is\nreset after the Free Game ends ",
            //                 "VD": {  x: 950, y: 346, anchor: {x:0.5,y:0} },
            //                 // "VL": { x: -75, y: 481, anchor: 0.5 },
            //                 // "VP": { x: -75, y: 481, anchor: 0.5 },
            //                 "style": {
            //                     // "fontWeight": "bold",
            //                     "fontSize": 30,
            //                     "fontFamily": "ProximaNova",
            //                     "fill": "#ffffff",
            //                     "strokeThickness": 2,
            //                     "lineJoin": "round",
            //                     "align": 'left'
            //                     // "maxWidth": 300
            //                 }
            //             }
            //         },

            //     }
            // },
            // PAY SYMBOLS
            "container1": {
                "type": "Container",
                "props": {
                    "VD": { x: 30, y: -30, visible: true }
                },

                // "children": {
                
                //     "payline": {
                //         "type": "Sprite",
                //         "props": {
                //             "img": "Page_4",
                //             "VD": { x: 640, y: 365, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.75, y: 0.75 } }
                //         }
                //     },

                // }


                 "children": {

                    "GTEXT": {
                        "type": "Text",
                        "props": {
                            "text": ["page1headtext"],
                            "VD": { x: 610, y: 88, anchor: { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 45,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                                "maxWidth": 300
                            }
                        }
                    },
                    "GDTEXT": {
                        "type": "Text",
                        "props": {
                            "text": ["gdtextpg1"],
                            "VD": { x: 600, y: 140, anchor: { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontWeight": "normal",
                                "fontSize": 19,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'center',
                            }
                        }
                    },
             
                    "aSym": {
                        "type": "Sprite",
                        "props": {
                            "img": "a",
                            "VD": { x: 266, y: 230, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.22, y: 0.22 } }
                        }
                    },
                    "aSymTxt":
                    {
                        "type": "Text",
                        "props": {
                            "text": "8-9 : $3 \n10-11 : $10 \n12+ : $50",
                            "VD": {  x: 270, y: 280, anchor: {x:0.5,y:0} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                // "fontWeight": "bold",
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                                "maxWidth": 300
                            }
                        }
                    },
                   
                //    },
               
                    "bSym": {
                        "type": "Sprite",
                        "props": {
                            "img": "b",
                            "VD": { x: 509, y: 230, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.22, y: 0.22 } }
                        }
                    },
                    "bSymTxt":
                    {
                        "type": "Text",
                        "props": {
                            "text": "8-9 : $2 \n10-11 : $5 \n12+ : $20",
                            "VD": {  x: 512, y: 280, anchor: {x:0.5,y:0} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                // "fontWeight": "bold",
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                                "maxWidth": 300
                            }
                        }
                    },
                     
                //    },
               
                    "cSym": {
                        "type": "Sprite",
                        "props": {
                            "img": "c",
                            "VD": { x: 752, y: 230, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.22, y: 0.22 } }
                        }
                    },
                    "cSymTxt":
                    {
                        "type": "Text",
                        "props": {
                            "text": "8-9 : $1 \n10-11 : $2.5 \n12+ : $10",
                            "VD": {  x: 752, y: 280, anchor: {x:0.5,y:0} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                // "fontWeight": "bold",
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                                "maxWidth": 300
                            }
                        }
                    },
                    
                //    },
             
                    "dSym": {
                        "type": "Sprite",
                        "props": {
                            "img": "d",
                            "VD": { x: 988, y: 230, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.22, y: 0.22 } }
                        }
                    },
                    "dSymTxt":
                    {
                        "type": "Text",
                        "props": {
                            "text": "8-9 : $0.8 \n10-11 : $2 \n12+ : $8",
                            "VD": {  x: 989, y: 280, anchor: {x:0.5,y:0} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                // "fontWeight": "bold",
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                                "maxWidth": 300
                            }
                        }
                    },
                    
                //    },
                
                    "eSym": {
                        "type": "Sprite",
                        "props": {
                            "img": "e",
                            "VD": { x: 204, y: 410, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.22, y: 0.22 } }
                        }
                    },
                    "eSymTxt":
                    {
                        "type": "Text",
                        "props": {
                            "text": "8-9 : $0.5 \n10-11 : $1.25 \n12+ : $5",
                            "VD": {  x: 205, y: 460, anchor: {x:0.5,y:0} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                // "fontWeight": "bold",
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                                "maxWidth": 300
                            }
                        }
                    },
                     
                  
                //    },
                    "fSym": {
                        "type": "Sprite",
                        "props": {
                            "img": "f",
                            "VD": { x: 411, y: 410, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.22, y: 0.22 } }
                        }
                    },
                    "fSymTxt":
                    {
                        "type": "Text",
                        "props": {
                            "text": "8-9 : $0.4 \n10-11 : $1 \n12+ : $4",
                            "VD": {  x: 405, y: 460, anchor: {x:0.5,y:0} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                // "fontWeight": "bold",
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                                "maxWidth": 300
                            }
                        }
                    },
                    
                    
                 
                    "gSym": {
                        "type": "Sprite",
                        "props": {
                            "img": "g",
                            "VD": { x: 624, y: 410, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.22, y: 0.22 } }
                        }
                    },
                    "gSymTxt":
                    {
                        "type": "Text",
                        "props": {
                            "text": "8-9 : $0.3 \n10-11 : $0.75 \n12+ : $3",
                            "VD": {  x: 623, y: 460, anchor: {x:0.5,y:0} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                // "fontWeight": "bold",
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                                "maxWidth": 300
                            }
                        }
                    },
                    
                    "hSym": {
                        "type": "Sprite",
                        "props": {
                            "img": "h",
                            "VD": { x: 831, y: 410, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.22, y: 0.22 } }
                        }
                    },
                    "hSymTxt":
                    {
                        "type": "Text",
                        "props": {
                            "text": "8-9 : $0.25 \n10-11 : $0.6 \n12+ : $2.5",
                            "VD": {  x: 830, y: 460, anchor: {x:0.5,y:0} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                // "fontWeight": "bold",
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                                "maxWidth": 300
                            }
                        }
                    },
                    
                    // " iSymBorder":{
                    //     "type":"Sprite",
                    //     "props": {
                    //         "img": "base",
                    //         "VD": { x: 1040, y: 515, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.8, y: 0.75 } }
                    //     },
                    // },
                    "iSym": {
                        "type": "Sprite",
                        "props": {
                            "img": "i",
                            "VD": { x: 1043, y: 410, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.22, y: 0.22 } }
                        }
                    },
                    "iSymTxt":
                    {
                        "type": "Text",
                        "props": {
                            "text": "8-9 : $0.2 \n10-11 : $0.5 \n12+ : $2",
                            "VD": {  x: 1040, y: 460, anchor: {x:0.5,y:0} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                // "fontWeight": "bold",
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                                "maxWidth": 300
                            }
                        }
                    },

                    "scatter":{
                        "type":"Sprite",
                        "props":{
                            "img":"s",
                            "VD": { x: 600, y: 600, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.25, y: 0.25 } }
                        }
                    },
                    "scatterExplainText":{
                        "type": "Text",
                        "props": {
                            "text":["scattertxt1"],
                            "VD": {  x: 671, y: 600, anchor: {x:0,y:0.5} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                // "fontWeight": "bold",
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left'
                                // "maxWidth": 300
                            }
                        }
                    },
                    "scatterValueText":{
                        "type": "Text",
                        "props": {
                           // "text": "6  $3 \n 5  $10 \n  4  $50",
                           "text": " 4 Scatter:  $3 \n 5 Scatter :  $10 \n 6 or more Scatter :  $50",

                            "VD": {  x: 380, y: 600, anchor: {x:0.5,y:0.5} },
                            // "VL": { x: -75, y: 481, anchor: 0.5 },
                            // "VP": { x: -75, y: 481, anchor: 0.5 },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left'
                                // "maxWidth": 300
                            }
                        }
                    },

                    "pageval": {
                        "type": "Text",
                        "props": {
                            "text": " 1",
                            "VD": { x: 1112, y: 680, anchor: { x: 0, y: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 24,
                                "fontFamily": "ProximaNova",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                            }
                        }
                    },
                    
                    

                }
                

               
            },
           
            // WIN LINES
              "container2": {
                "type": "Container",
                "props": {
                    "VD": { x: 0, y: 0, visible: false }
                },
               
                "children": {
                    "title": {
                        "type": "Text",
                        "props": {
                            "text":["page2headtxt"],
                            "VD": { x: 640, y: 50, "anchor": { x: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "lineHeight": 70,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    // "subTitle": {
                    //     "type": "Text",
                    //     "props": {
                    //         "text": ["treasuresofegyptPage3Text2", "treasuresofegyptPage3Text3"],
                    //         "VD": { x: 640, y: 220, "anchor": { x: 0.5, y: 0.5} },
                    //         "style": {
                    //             "fontSize": 30,
                    //             "fontFamily": "ProximaNova",
                    //             "fill": "#FFFFFF",
                    //             "align": 'center',
                    //             "lineHeight": 70,
                    //             "padding": 2,
                    //             "maxWidth": 1150,
                    //             "wordWrapWidth": 1050,
                    //             "wordWrap": true,
                    //         }
                    //     }
                    // },
                    "paragraph1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page2Text1",],
                            "VD": { x: 640, y: 150, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 48,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "paragraph2": {
                        "type": "Text",
                        "props": {
                            "text": ["Page2Text2"],
                            "VD": { x: 640, y: 225, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 48,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "paragraph3": {
                        "type": "Text",
                        "props": {
                            "text": ["Page2Text3"],
                            "VD": { x: 640, y: 280, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 48,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "multiplier1":{
                        "type":"Sprite",
                        "props":{
                            "img":"10x",
                            "VD": { x: 345, y: 358, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.3, y: 0.3 } }
                        }
                    },
                    "multiplier2":{
                        "type":"Sprite",
                        "props":{
                            "img":"15x",
                            "VD": { x: 500, y: 358, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.3, y: 0.3 } }
                        }
                    },
                    "multiplier3":{
                        "type":"Sprite",
                        "props":{
                            "img":"20x",
                            "VD": { x: 655, y: 358, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.3, y: 0.3 } }
                        }
                    },
                    "multiplier4":{
                        "type":"Sprite",
                        "props":{
                            "img":"50x",
                            "VD": { x: 810, y: 358, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.3, y: 0.3 } }
                        }
                    },
                    "multiplier5":{
                        "type":"Sprite",
                        "props":{
                            "img":"100x",
                            "VD": { x: 965, y: 358, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.3, y: 0.3 } }
                        }
                    },
                    
                    "paragraph4": {
                        "type": "Text",
                        "props": {
                            "text": ["Page2Text4"],
                            "VD": { x: 640, y: 450, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 48,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "paragraph5": {
                        "type": "Text",
                        "props": {
                            "text": ["Page2Text5","Page2Text6"],
                            "VD": { x: 640, y: 510, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 48,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "p2paragraph6": {
                        "type": "Text",
                        "props": {
                            "text": ["Page2Text7"],
                            "VD": { x: 640, y: 570, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 48,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "pageval": {
                        "type": "Text",
                        "props": {
                            "text": " 2",
                            "VD": { x: 1140, y: 650, anchor: { x: 0, y: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 24,
                                "fontFamily": "ProximaNova",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                            }
                        }
                    },
                    
                  
                }

                
            },
            // "container3": {
            //     "type": "Container",
            //     "props": {
            //         "VD": { x: 0, y: 0, visible: false }
            //     },
               
            //     "children": {
            //         "title": {
            //             "type": "Text",
            //             "props": {
            //                 "text": "treasuresofegyptPage2Text3",
            //                 "VD": { x: 640, y: 180, "anchor": { x: 0.5 } },
            //                 "style": {
            //                     "fontWeight": "bold",
            //                     "fontSize": 40,
            //                     "fontFamily": "ProximaNova_Bold",
            //                     "fill": "#FFFFFF",
            //                     "align": 'center',
            //                     "lineHeight": 70,
            //                     "padding": 2,
            //                     "wordWrapWidth": 1050,
            //                     "wordWrap": true,
            //                 }
            //             }
            //         },
            //         // "subTitle": {
            //         //     "type": "Text",
            //         //     "props": {
            //         //         "text": ["treasuresofegyptPage3Text2", "treasuresofegyptPage3Text3"],
            //         //         "VD": { x: 640, y: 220, "anchor": { x: 0.5, y: 0.5} },
            //         //         "style": {
            //         //             "fontSize": 30,
            //         //             "fontFamily": "ProximaNova",
            //         //             "fill": "#FFFFFF",
            //         //             "align": 'center',
            //         //             "lineHeight": 70,
            //         //             "padding": 2,
            //         //             "maxWidth": 1150,
            //         //             "wordWrapWidth": 1050,
            //         //             "wordWrap": true,
            //         //         }
            //         //     }
            //         // },
            //         "paragraph1": {
            //             "type": "Text",
            //             "props": {
            //                 "text": ["treasuresofegyptPage3Text2", "treasuresofegyptPage3Text3", "treasuresofegyptPage3Text4", "treasuresofegyptPage3Text5", "treasuresofegyptPage3Text6", "treasuresofegyptPage3Text7", "treasuresofegyptPage3Text8", "treasuresofegyptPage3Text9",],
            //                 "VD": { x: 640, y: 400, "anchor": { x: 0.5, y: 0.5 } },
            //                 "style": {
            //                     "fontSize": 30,
            //                     "fontFamily": "ProximaNova",
            //                     "fill": "#ffffff",
            //                     "align": 'center',
            //                     "lineHeight": 70,
            //                     "padding": 2,
            //                     "wordWrapWidth": 1050,
            //                     "wordWrap": true,
            //                 }
            //             }
            //         },
                  
            //     }

                
            // },
            // GAME RULES
            "container3": {
                "type": "Container",
                "props": {
                    "VD": { x: 0, y: 0, visible: false }
                },
                "children": {
                    "title": {
                        "type": "Text",
                        "props": {
                            "text":["page3headtxt"],
                            "VD": { x: 640, y: 60, "anchor": { x: 0.5,y:0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },

                    "paragraph1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page3Text1", "Page3Text2"],
                            "VD": { x: 640, y: 110, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 48,
                                "padding": 2,
                                "wordWrapWidth": 1200,
                                "wordWrap": true,
                            }
                        }
                    },
                    "paragraph2": {
                        "type": "Text",
                        "props": {
                            "text": ["Page3Text3",],
                            "VD": { x: 640, y: 180, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 56,
                                "padding": 2,
                                "wordWrapWidth": 1200,
                                "wordWrap": true,
                            }
                        }
                    },
                    "paragraph3": {
                        "type": "Text",
                        "props": {
                            "text": ["Page3Text4", "Page3Text5"],
                            "VD": { x: 640, y: 250, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 56,
                                "padding": 2,
                                "wordWrapWidth": 1200,
                                "wordWrap": true,
                            }
                        }
                    },
                    "title1": {
                        "type": "Text",
                        "props": {
                            "text": "ANTE BET",
                            "text": ["page3midtxt"],
                            "VD": { x: 640, y: 300, "anchor": { x: 0.5,y:0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },
                    "paragraph4": {
                        "type": "Text",
                        "props": {
                            "text": ["Page3Text6", "Page3Text7"],
                            "VD": { x: 640, y: 355, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 54,
                                "padding": 2,
                                "wordWrapWidth": 1200,
                                "wordWrap": true,
                            }
                        }
                    },
                    "paragraph5": {
                        "type": "Text",
                        "props": {
                            "text": ["Page3Text8", "Page3Text9","Page3Text10"],
                            "VD": { x: 640, y: 430, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 54,
                                "padding": 2,
                                "wordWrapWidth": 1200,
                                "wordWrap": true,
                            }
                        }
                    },
                    "title2": {
                        "type": "Text",
                        "props": {
                            "text": ["page3bottomtxt"],
                            "VD": { x: 640, y: 490, "anchor": { x: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },
                    "paragraph6": {
                        "type": "Text",
                        "props": {
                            "text": ["Page3Text11", "Page3Text12"],
                            "VD": { x: 640, y: 580, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 54,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    // "subTitle": {
                    //     "type": "Text",
                    //     "props": {
                    //         "text": ["treasuresofegyptPage6Text1", "treasuresofegyptPage6Text2", "treasuresofegyptPage6Text3", "treasuresofegyptPage6Text4", "treasuresofegyptPage6Text5", "treasuresofegyptPage6Text6", "treasuresofegyptPage6Text7",],
                    //         "VD": { x: 640, y: 380, "anchor": { x: 0.5, y: 0.5 } },
                    //         "style": {
                    //             "fontSize": 30,
                    //             "fontFamily": "ProximaNova",
                    //             "fill": "#FFFFFF",
                    //             "align": 'center',
                    //             "lineHeight": 70,
                    //             "padding": 2,
                    //             "wordWrapWidth": 1050,
                    //             "wordWrap": true,
                    //             "breakWords": true

                    //         }
                    //     }
                    // },
                    
                    "pageval": {
                        "type": "Text",
                        "props": {
                            "text": " 3",
                            "VD": { x: 1140, y: 650, anchor: { x: 0, y: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 24,
                                "fontFamily": "ProximaNova",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                            }
                        }
                    },
                    
                }
               
            },

            "container4": {
                "type": "Container",
                "props": {
                    "VD": { x: 0, y: 0, visible: false }
                },
                "children": {
                    "title": {
                        "type": "Text",
                        "props": {
                            "text": ["page4headtext"],
                            "VD": { x: 640, y: 65, "anchor": { x: 0.5,y:0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },

                    "paragraph1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page4Text1"],
                            "VD": { x: 640, y: 120, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "paragraph2": {
                        "type": "Text",
                        "props": {
                            "text": ["Page4Text2", "Page4Text3", "Page4Text4","Page4Text5","Page4Text6","Page4Text7","Page4Text8"],
                            "VD": { x: 640, y: 305, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 90,
                                "padding": 2,
                                "wordWrapWidth": 1080,
                                "wordWrap": true,
                            }
                        }
                    },
                    "paragraph3": {
                        "type": "Text",
                        "props": {
                            "text": ["Page4Text9", "Page4Text10", "Page4Text11"],
                            "VD": { x: 640, y: 507, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 54,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "minimumBetText": {
                        "type": "Text",
                        "props": {
                            "text": ["Page4Text12"],
                            "VD": { x: 704, y: 565, "anchor": { x: 1, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 54,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "minimumBetValue": {
                        "type": "Text",
                        "props": {
                            "text": [""],
                            "VD": { x: 719, y: 565, "anchor": { x: 0, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 54,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "paragraph4": {
                        "type": "Text",
                        "props": {
                            "text": ["Page4Text14"],
                            "VD": { x: 640, y: 604, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "maximumBetText": {
                        "type": "Text",
                        "props": {
                            "text": ["Page4Text13"],
                            "VD": { x: 704, y: 584, "anchor": { x: 1, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 54,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "maximumBetValue": {
                        "type": "Text",
                        "props": {
                            "text": [""],
                            "VD": { x: 719, y: 584, "anchor": { x: 0, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 54,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    // "subTitle": {
                    //     "type": "Text",
                    //     "props": {
                    //         "text": ["treasuresofegyptPage6Text1", "treasuresofegyptPage6Text2", "treasuresofegyptPage6Text3", "treasuresofegyptPage6Text4", "treasuresofegyptPage6Text5", "treasuresofegyptPage6Text6", "treasuresofegyptPage6Text7",],
                    //         "VD": { x: 640, y: 380, "anchor": { x: 0.5, y: 0.5 } },
                    //         "style": {
                    //             "fontSize": 30,
                    //             "fontFamily": "ProximaNova",
                    //             "fill": "#FFFFFF",
                    //             "align": 'center',
                    //             "lineHeight": 70,
                    //             "padding": 2,
                    //             "wordWrapWidth": 1050,
                    //             "wordWrap": true,
                    //             "breakWords": true

                    //         }
                    //     }
                    // },
                    
                    "pageval": {
                        "type": "Text",
                        "props": {
                            "text": " 4",
                            "VD": { x: 1140, y: 650, anchor: { x: 0, y: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 24,
                                "fontFamily": "ProximaNova",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                            }
                        }
                    },
                    
                }
               
            },
            "container5": {
                "type": "Container",
                "props": {
                    "VD": { x: 0, y: 0, visible: false }
                },
                "children": {
                    "title": {
                        "type": "Text",
                        "props": {
                            "text": ["page5headtext"],
                            "VD": { x: 640, y: 60, "anchor": { x: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },

                    "Line1txt1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L1text1"],
                            "VD": { x: 0, y: 115, "anchor": { x: 1, y: 0 } },
                            "style": {
                                "fontSize": 24,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
               
                 
                    "plussym":{
                        "type":"Sprite",
                        "props":{
                            "img":"Plus_normal",
                            "VD": { x: 800, y: 130, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.4, y: 0.4 } }
                        }
                    },
                    "Line1txt2": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L1text2"],
                            "VD": { x: 0, y: 130, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 24,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                     
                    "minussym":{
                        "type":"Sprite",
                        "props":{
                            "img":"minusBtn_normal",
                            "VD": { x: 920, y: 130, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.4, y: 0.4 } }
                        }
                    },
                    // "paragraph2": {
                    //     "type": "Text",
                    //     "props": {
                    //         "text": ["treasuresofegyptPage5Text2", "treasuresofegyptPage5Text3", "treasuresofegyptPage5Text4","treasuresofegyptPage5Text5","treasuresofegyptPage5Text6","treasuresofegyptPage5Text7","treasuresofegyptPage5Text8"],
                    //         "VD": { x: 640, y: 300, "anchor": { x: 0.5, y: 0.5 } },
                    //         "style": {
                    //             "fontSize": 20,
                    //             "fontFamily": "Arial",
                    //             "fill": "#ffffff",
                    //             "align": 'center',
                    //             "lineHeight": 90,
                    //             "padding": 2,
                    //             "wordWrapWidth": 1080,
                    //             "wordWrap": true,
                    //         }
                    //     }
                    // },
                    
                    "Line1txt3": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L1text3"],
                            "VD": { x: 0, y: 115, "anchor": { x: 0, y: 0 } },
                            "style": {
                                "fontSize": 24,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "Line2txt1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L2"],
                            "VD": { x: 640, y: 170, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 24,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "title1": {
                        "type": "Text",
                        "props": {
                            "text": ["page5midtext"],
                            "VD": { x: 640, y: 200, "anchor": { x: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },
                    "setsym":{
                        "type":"Sprite",
                        "props":{
                            "img":"Setting_normal",
                            "VD": { x: 70, y: 270, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.4, y: 0.4 } }
                        }
                    },
                    "Line3txt1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L3"],
                            "VD": { x: 102, y: 270, "anchor": { x: 0, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1200,
                                "wordWrap": true,
                            }
                        }
                    },

                    "infosym":{
                        "type":"Sprite",
                        "props":{
                            "img":"Help_normal",
                            "VD": { x: 510, y: 310, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.4, y: 0.4 } }
                        }
                    },
                    "Line4txt1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L4"],
                            "VD": { x: 820, y: 310, "anchor": { x: 0, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                 
                    "para1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L5","Page5L6"],
                            "VD": { x: 640, y: 380, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },

                    "plussym1":{
                        "type":"Sprite",
                        "props":{
                            "img":"Plus_normal",
                            "VD": { x: 348, y: 440, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.4, y: 0.4 } }
                        }
                    },
                    "para2txt1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L7text1"],
                            "VD": { x: 0, y: 440, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
               "minussym1":{
                        "type":"Sprite",
                        "props":{
                            "img":"minusBtn_normal",
                            "VD": { x: 436, y: 440, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.4, y: 0.4 } }
                        }
                    },
                 
                   
                    "para2txt2": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L7text2"],
                            "VD": { x: 0, y: 440, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "para2txt2pt1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L7text2pt1"],
                            "VD": { x: 640, y: 470, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "para2txt2pt2": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L7text2pt2"],
                            "VD": { x: 640, y: 500, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },

                    //  "para2txt3": {
                    //     "type": "Text",
                    //     "props": {
                    //         "text": "the bet denominations.",
                    //         "VD": { x: 640, y: 525, "anchor": { x: 0.5, y: 0.5 } },
                    //         "style": {
                    //             "fontSize": 21,
                    //             "fontFamily": "Verdana",
                    //             "fill": "#ffffff",
                    //             "align": 'center',
                    //             "lineHeight": 38,
                    //             "padding": 2,
                    //             "wordWrapWidth": 1050,
                    //             "wordWrap": true,
                    //         }
                    //     }
                    // },
                    
                    "spinsym":{
                        "type":"Sprite",
                        "props":{
                            "img":"spinBtn_normal",
                            "VD": { x: 550, y: 540, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.2, y: 0.2 } }
                        }
                    },
                    "Line5txt1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L8"],
                            "VD": { x: 660, y: 540, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "autosym":{
                        "type":"Sprite",
                        "props":{
                            "img":"AutoPlay_basenew_normal",
                            "VD": { x: 492, y: 582, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.7, y: 0.8 } }
                        }
                    },
                    "autoplaytxt": {
                        "type": "Text",
                        "props": {
                            "text": "AUTOPLAY",
                            "VD": { x: 492, y: 582, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "Line6txt1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page5L9"],
                            "VD": { x: 730, y: 580, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 20,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },

                    "pageval": {
                        "type": "Text",
                        "props": {
                            "text": " 5",
                            "VD": { x: 1140, y: 650, anchor: { x: 0, y: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 24,
                                "fontFamily": "ProximaNova",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                            }
                        }
                    },
                    
                }
               
            },
            "container6": {
                "type": "Container",
                "props": {
                    "VD": { x: 0, y: 0, visible: false }
                },
                "children": {
                    "title": {
                        "type": "Text",
                        "props": {
                            "text": ["page6headtext"],
                            "VD": { x: 640, y: 50, "anchor": { x: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },

                    "Line1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L1"],
                            "VD": { x: 640, y: 130, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "Line2": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L2"],
                            "VD": { x: 640, y: 162, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "Line3": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L3"],
                            "VD": { x: 640, y: 190, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "Line4": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L4"],
                            "VD": { x: 640, y: 225, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "Line5": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L5"],
                            "VD": { x: 640, y: 260, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "title1": {
                        "type": "Text",
                        "props": {
                            "text": ["page6midtext"],
                            "VD": { x: 640, y: 290, "anchor": { x: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },
                 
                    "leftarr":{
                        "type":"Button",
                        "props":{
                            "img":"ptArrow",
                            "VD": { x: 370, y: 370, "anchor": { x: 0.55, y: 0.55 }, "scale": { x: -0.55, y: 0.55 } }
                        }
                    },
                    "Line6txt1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L6text1"],
                            "VD": { x: 420, y: 370, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 24,
                                "fontFamily": "Arial",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                     
                    "rightarr":{
                        "type":"Button",
                        "props":{
                            "img":"ptArrow",
                            "VD": { x: 470, y: 370, "anchor": { x:0.5, y: 0.5 }, "scale": { x: 0.55, y: 0.55 } }
                        }
                    },
                    // "paragraph2": {
                    //     "type": "Text",
                    //     "props": {
                    //         "text": ["treasuresofegyptPage5Text2", "treasuresofegyptPage5Text3", "treasuresofegyptPage5Text4","treasuresofegyptPage5Text5","treasuresofegyptPage5Text6","treasuresofegyptPage5Text7","treasuresofegyptPage5Text8"],
                    //         "VD": { x: 640, y: 300, "anchor": { x: 0.5, y: 0.5 } },
                    //         "style": {
                    //             "fontSize": 20,
                    //             "fontFamily": "Arial",
                    //             "fill": "#ffffff",
                    //             "align": 'center',
                    //             "lineHeight": 90,
                    //             "padding": 2,
                    //             "wordWrapWidth": 1080,
                    //             "wordWrap": true,
                    //         }
                    //     }
                    // },
                    
                    "Line6txt2": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L6text2"],
                            "VD": { x: 680, y: 370, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "closebt":{
                        "type":"Sprite",
                        "props":{
                            "img":"bet_close_normal",
                            "VD": { x: 500, y: 420, "anchor": { x:0.5, y: 0.5 }, "scale": { x: 0.7, y: 0.7 } }
                        }
                    },
                    "Line7": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L7"],
                            "VD": { x: 680, y: 420, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "title2": {
                        "type": "Text",
                        "props": {
                            "text": ["page6bottomtext"],
                            "VD": { x: 640, y: 445, "anchor": { x: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },
                    "Line8": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L8"],
                            "VD": { x: 640, y: 520, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 20,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                 
                    "Line7txt1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L9text1"],
                            "VD": { x: 270, y: 570, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },

                    "plussym1":{
                        "type":"Sprite",
                        "props":{
                            "img":"Plus_normal",
                            "VD": { x: 340, y: 570, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.3, y: 0.3 } }
                        }
                    },
                    "Line7txt2": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L9text2"],
                            "VD": { x: 380, y: 570, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "minussym1":{
                        "type":"Sprite",
                        "props":{
                            "img":"minusBtn_normal",
                            "VD": { x: 420, y: 570, "anchor": { x: 0.5, y: 0.5 }, "scale": { x: 0.3, y: 0.3 } }
                        }
                    },
                    "Line7txt3": {
                        "type": "Text",
                        "props": {
                            "text": ["Page6L9text3"],
                            "VD": { x: 820, y: 570, "anchor": { x: 0, y: 0.5 } },
                            "style": {
                                "fontSize": 21,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },

                    // "paragraph0": {
                    //     "type": "Text",
                    //     "props": {
                    //         "text": ["Page7txt1", "Page7txt2", "Page7txt3"],
                    //         "VD": { x: 640, y: 570, "anchor": { x: 0.5, y: 0.5 } },
                    //         "style": {
                    //             "fontSize": 21,
                    //             "fontFamily": "Verdana",
                    //             "fill": "#ffffff",
                    //             "align": 'center',
                    //             "lineHeight": 48,
                    //             "padding": 2,
                    //             "wordWrapWidth": 1050,
                    //             "wordWrap": true,
                    //         }
                    //     }
                    // },

                    "pageval": {
                        "type": "Text",
                        "props": {
                            "text": " 6",
                            "VD": { x: 1140, y: 650, anchor: { x: 0, y: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 24,
                                "fontFamily": "ProximaNova",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                            }
                        }
                    },
                    
                }
               
            },
            "container7": {
                "type": "Container",
                "props": {
                    "VD": { x: 0, y: 0, visible: false }
                },
                "children": {
                    "title": {
                        "type": "Text",
                        "props": {
                            "text": ["page7headtext"],
                            "VD": { x: 640, y: 50, "anchor": { x: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },

                    "Line1": {
                        "type": "Text",
                        "props": {
                            "text": ["Page7L1"],
                            "VD": { x: 640, y: 110, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "Line2": {
                        "type": "Text",
                        "props": {
                            "text": ["Page7L2"],
                            "VD": { x: 640, y: 136, "anchor": { x: 0.5, y: 0.5 } },
                            "style": {
                                "fontSize": 18,
                                "fontFamily": "Verdana",
                                "fill": "#ffffff",
                                "align": 'center',
                                "lineHeight": 38,
                                "padding": 2,
                                "wordWrapWidth": 1050,
                                "wordWrap": true,
                            }
                        }
                    },
                    "addtext": {
                        "type": "Text",
                        "props": {
                            "text": ["Page7L3"],
                            "VD": { x: 640, y: 160, "anchor": { x: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 40,
                                "fontFamily": "ProximaNova_Bold",
                                "fill": "#FFFFFF",
                                "align": 'center',
                                "padding": 2,
                                "lineHeight": 70
                            }
                        }
                    },
    "Line3": {
        "type": "Text",
        "props": {
            "text": ["Page7L4"],
            "VD": { x: 640, y: 240, "anchor": { x: 0.5, y: 0.5 } },
            "style": {
                "fontSize": 18,
                "fontFamily": "Verdana",
                "fill": "#ffffff",
                "align": 'center',
                "lineHeight": 54,
                "padding": 2,
                "wordWrapWidth": 1050,
                "wordWrap": true,
            }
        }
    },       
    "Line4": {
        "type": "Text",
        "props": {
            "text": ["Page7L5"],
            "VD": { x: 640, y: 320, "anchor": { x: 0.5, y: 0.5 } },
            "style": {
                "fontSize": 18,
                "fontFamily": "Verdana",
                "fill": "#ffffff",
                "align": 'center',
                "lineHeight": 54,
                "padding": 2,
                "wordWrapWidth": 1200,
                "wordWrap": true,
            }
        }
    },  
    // "Line5": {
    //     "type": "Text",
    //     "props": {
    //         "text": "The in-game, paytable shows symbol payouts as the multipliers on the total bet amount, which is calculated as 'total bet = (coin value * number of fixed coins). Hence, the actual payouts will be coin value * paytable factor when bet lines are kept constant.",
    //         "VD": { x: 640, y: 390, "anchor": { x: 0.5, y: 0.5 } },
    //         "style": {
    //             "fontSize": 18,
    //             "fontFamily": "Verdana",
    //             "fill": "#ffffff",
    //             "align": 'center',
    //             "lineHeight": 54,
    //             "padding": 2,
    //             "wordWrapWidth": 1200,
    //             "wordWrap": true,
    //         }
    //     }
    // },  
    "Line6": {
        "type": "Text",
        "props": {
            "text": ["Page7L6"],
            "VD": { x: 640, y: 400, "anchor": { x: 0.5, y: 0.5 } },
            "style": {
                "fontSize": 18,
                "fontFamily": "Verdana",
                "fill": "#ffffff",
                "align": 'center',
                "lineHeight": 54,
                "padding": 2,
                "wordWrapWidth": 1050,
                "wordWrap": true,
            }
        }
    },      
    "Line7": {
        "type": "Text",
        "props": {
            "text": ["Page7L7"],
            "VD": { x: 640, y: 450, "anchor": { x: 0.5, y: 0.5 } },
            "style": {
                "fontSize": 17,
                "fontFamily": "Verdana",
                "fill": "#ffffff",
                "align": 'center',
                "lineHeight": 54,
                "padding": 2,
                "wordWrapWidth": 1050,
                "wordWrap": true,
            }
        }
    },        
    "Line8": {
        "type": "Text",
        "props": {
            "text": ["Page7L8"],
            "VD": { x: 640, y: 490, "anchor": { x: 0.5, y: 0.5 } },
            "style": {
                "fontSize": 18,
                "fontFamily": "Verdana",
                "fill": "#ffffff",
                "align": 'center',
                "lineHeight": 54,
                "padding": 2,
                "wordWrapWidth": 1200,
                "wordWrap": true,
            }
        }
    }, 
    "Line9": {
        "type": "Text",
        "props": {
            "text": ["Page7L9"],
            "VD": { x: 640, y: 540, "anchor": { x: 0.5, y: 0.5 } },
            "style": {
                "fontSize": 18,
                "fontFamily": "Verdana",
                "fill": "#ffffff",
                "align": 'center',
                "lineHeight": 54,
                "padding": 2,
                "wordWrapWidth": 1050,
                "wordWrap": true,
            }
        }
    },      
    
    "pageval": {
                        "type": "Text",
                        "props": {
                            "text": " 7",
                            "VD": { x: 1140, y: 650, anchor: { x: 0, y: 0.5 } },
                            "style": {
                                "fontWeight": "bold",
                                "fontSize": 24,
                                "fontFamily": "ProximaNova",
                                "fill": "#ffffff",
                                "strokeThickness": 2,
                                "lineJoin": "round",
                                "align": 'left',
                            }
                        }
                    },
                    
                }
               
            },
        }
    },
    //MOBILE PAYTABLE VIEW//
    "Mobile": {
        "resizablePTContainer": {
            "elementConstructor": "parent",
            "params": {
                "makeResponsive": true,
                "props": {
                    "VL": { x: 0, y: 0 },
                    "VP": { x: 0, y: 0 },
                    HX: 0,
                    HY: 0,
                    landAlignY: "TOP",
                    VX: 0,
                    VY: 0,
                    portAlignY: "TOP"
                },
                "children": {
                    "gameLogo": {
                        "elementConstructor": "sprite",
                        "params": {
                            "subscribeToResize": true,
                            "props": {
                                "VL": { x: 640, y: 80, anchor: { x: 0.5 }, scale: 0.3},
                                "VP": { x: 360, y: 80, anchor: { x: 0.5 }, scale: 0.3 }
                            },
                            "backgroundImage": "Game Logo"
                        }
                    },
                    //BONUS SYMBOL
                    "page1": {
                        "elementConstructor": "parent",
                        "params": {
                            "subscribeToResize": true,
                            "props": {
                                "VL": { x: 45, y: 30 },
                                "VP": { x: 0, y: 30 }
                            },
                            "children": {
                                 
                                "GTEXT": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["page4headtext"],
                                        "textStyle": "titleStyle",
                                        "props": {
                                            "VL": { x: 590, y: 0,scale:1.2, "anchor": { x: 0.5,y:0.5 } },
                                            "VP": { x: 360, y: -20, scale:1.2,"anchor": { x: 0.5,y:0.5,},
                                           },
                                           
                                        }
                                    }
                                },
                                "GDTEXT": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["gdtextpg1"],
                                        "props": {
                                            "VL": { x: 600, y: 80,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "VLparaStyle" },
                                            "VP": { x: 360, y: 100, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "VPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "aSym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "a",
                                        "props": {
                                            "VL": { x: 180, y: 220, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 200, y: 250, scale:0.3,"anchor": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "aSymTxt": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": "8-9 : $3 \n10-11 : $10 \n12+ : $50",
                                        "props": {
                                            "VL": { x: 180, y: 350,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "VLparaStyle" },
                                            "VP": { x: 200, y: 370, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "VPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "bSym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "b",
                                        "props": {
                                            "VL": { x: 480, y: 220, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 500, y: 250, scale:0.3,"anchor": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "bSymTxt": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": "8-9 : $2 \n10-11 : $5 \n12+ : $20",
                                        "props": {
                                            "VL": { x: 480, y: 350,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "VLparaStyle" },
                                            "VP": { x: 500, y: 370, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "VPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "cSym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "c",
                                        "props": {
                                            "VL": { x: 780, y: 220, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 200, y: 500, scale:0.3,"anchor": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "cSymTxt": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": "8-9 : $1 \n10-11 : $2.5 \n12+ : $10",
                                        "props": {
                                            "VL": { x: 780, y: 350,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "VLparaStyle" },
                                            "VP": { x: 200, y: 620, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "VPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "dSym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "d",
                                        "props": {
                                            "VL": { x: 1080, y: 220, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 500, y: 500, scale:0.3,"anchor": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "dSymTxt": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": "8-9 : $0.8 \n10-11 : $2 \n12+ : $8",
                                        "props": {
                                            "VL": { x: 1080, y: 350,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "VLparaStyle" },
                                            "VP": { x: 500, y: 620, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "VPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "eSym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "e",
                                        "props": {
                                            "VL": { x: 0, y: 500, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 200, y: 750, scale:0.3,"anchor": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "eSymTxt": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": "8-9 : $0.8 \n10-11 : $2 \n12+ : $8",
                                        "props": {
                                            "VL": { x: 0, y: 620,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "VLparaStyle" },
                                            "VP": { x: 200, y: 870, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "VPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "fSym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "f",
                                        "props": {
                                            "VL": { x: 300, y: 500, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 500, y: 750, scale:0.3,"anchor": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "fSymTxt": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": "8-9 : $0.8 \n10-11 : $2 \n12+ : $8",
                                        "props": {
                                            "VL": { x: 300, y: 620,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "VLparaStyle" },
                                            "VP": { x: 500, y: 870, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "VPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "gSym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "g",
                                        "props": {
                                            "VL": { x: 600, y: 500, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 200, y: 1000, scale:0.3,"anchor": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "gSymTxt": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": "8-9 : $0.8 \n10-11 : $2 \n12+ : $8",
                                        "props": {
                                            "VL": { x: 600, y: 620,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "VLparaStyle" },
                                            "VP": { x: 200, y: 1120, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "VPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "hSym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "h",
                                        "props": {
                                            "VL": { x: 900, y: 500, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 500, y: 1000, scale:0.3,"anchor": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "hSymTxt": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": "8-9 : $0.8 \n10-11 : $2 \n12+ : $8",
                                        "props": {
                                            "VL": { x: 900, y: 620,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "VLparaStyle" },
                                            "VP": { x: 500, y: 1120, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "VPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "iSym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "i",
                                        "props": {
                                            "VL": { x: 1200, y: 500, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 200, y: 1250, scale:0.3,"anchor": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "iSymTxt": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": "8-9 : $0.8 \n10-11 : $2 \n12+ : $8",
                                        "props": {
                                            "VL": { x: 1200, y: 620,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "VLparaStyle" },
                                            "VP": { x: 200, y: 1370, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "VPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "scatter": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "s",
                                        "props": {
                                            "VL": { x: 600, y: 800, "anchor": { x: 0.5,y:0.5 },scale:0.6 },
                                            "VP": { x: 342, y: 1500, scale:0.3,"anchor": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "scatterValueText": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": " 4 Scatters:  $3 \n 5 Scatters :  $10 \n 6 or more Scatters :  $50",
                                        "props": {
                                            "VL": { x: 300, y: 800,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "scatterVLparaStyle" },
                                            "VP": { x: 142, y: 1500, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "scatterVPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                                "scatterExplainText": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["scattertxt1"],
                                        "props": {
                                            "VL": { x: 950, y: 800,scale:1, "anchor": { x: 0.5,y:0.5 }, "textStyle": "scatterVLparaStyle" },
                                            "VP": { x: 560, y: 1500, scale:1,"anchor": { x: 0.5,y:0.5,},  "textStyle": "scatterVPparaStyle",
                                           },
                                           
                                        }
                                    }
                                },
                               
                               
                            }
                        }
                    },

                    //WILD SYMBOL
                    "page2": {
                        "elementConstructor": "parent",
                        "params": {
                            "subscribeToResize": true,
                            "props": {
                                "VL": { x: 0, y: 600 - 70 },
                                "VP": { x: 0, y: 610 - 70 }
                            },
                            "children": {
                                "titlep2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "textStyle": "titleStyle",
                                        "text": ["page2headtxt"],
                                        "props": {
                                            "VL": { x: 640, y: 0, scale:1.2,"anchor": { x: 0.5,y:0.5 } ,  },
                                            "VP": { x: 360, y: 50, scale:1.2,"anchor": { x: 0.5,y:0.5,}, 
                                           },
                                           
                                        }
                                    }
                                },
                                "p2paragraph1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page2Text1"],
                                        "props": {
                                            "VL": { x: 640, y: 100, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 200, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },
                                "p2paragraph2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page2Text2",],
                                        "props": {
                                            "VL": { x: 640, y: 200, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 350, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },
                                "p2paragraph3": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page2Text3"],
                                        "props": {
                                            "VL": { x: 640, y: 300, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 450, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },
                                "multiplier1": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "m",
                                        "props": {
                                            "VL": { x: 640, y: 450, "anchor": { x: 0.5,y:0.5 },scale:0.7 },
                                            "VP": { x: 360, y: 600, "anchor": { x: 0.5,y:0.5 },scale:0.45  }
                                        }
                                    }
                                },
                               
                                "p2paragraph4": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page2Text4"],
                                        "props": {
                                            "VL": { x: 640, y: 600, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 750, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },
                                "p2paragraph5": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page2Text5","Page2Text6"],
                                        "props": {
                                            "VL": { x: 640, y: 700, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 900, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },
                                "p2paragraph6": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page2Text7"],
                                        "props": {
                                            "VL": { x: 640, y: 800, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 1100, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },

                                                           
                               
                            }
                        }
                    },
                    //GAME FEATURES
              
                    // //PAY SYMBOLS
                    "page3": {
                        "elementConstructor": "parent",
                        "params": {
                            "subscribeToResize": true,
                            // "makeResponsive": true,
                            "props": {
                                "VL": { x: 0, y: 1960 },
                                "VP": { x: 0, y: 1880 }
                            },
                            "children": {
                                "title": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "textStyle": "titleStyle",
                                        "text": ["page3headtxt"],
                                        "props": {
                                            "VL": { x: 640, y: 0, scale:1.3,"anchor": { x: 0.5,y:0.5 }   },
                                            "VP": { x: 360, y: 80, scale:1.3,"anchor": { x: 0.5,y:0.5,}
                                           },
                                           
                                        }
                                    }
                                },
                                "p3paragraph1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page3Text1", "Page3Text2"],
                                        "props": {
                                            "VL": { x: 640, y: 100, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 200, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },
                                "p3paragraph2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page3Text3"],
                                        "props": {
                                            "VL": { x: 640, y: 230, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 400, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },
                                "p3paragraph3": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page3Text4", "Page3Text5"],
                                        "props": {
                                            "VL": { x: 640, y: 345, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 600, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },
                           
                            "p3title1": {
                                "elementConstructor": "text",
                                "params": {
                                    "subscribeToResize": true,
                                    "textStyle": "titleStyle",
                                    "text": ["page3midtxt"],
                                    "props": {
                                        "VL": { x: 640, y: 445, scale:1.3,"anchor": { x: 0.5,y:0.5 }   },
                                        "VP": { x: 360, y: 720, scale:1.3,"anchor": { x: 0.5,y:0.5,} 
                                       },
                                       
                                    }
                                }
                            },
                            "p3paragraph4": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page3Text6", "Page3Text7"],
                                        "props": {
                                            "VL": { x: 640, y: 530, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 830, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },
                                "p3paragraph5": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page3Text8", "Page3Text9","Page3Text10"],
                                        "props": {
                                            "VL": { x: 640, y: 670, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 1030, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },
                                "p3title2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "textStyle": "titleStyle",
                                        "text": ["page3bottomtxt"],
                                        "props": {
                                            "VL": { x: 640, y: 800, scale:1.3,"anchor": { x: 0.5,y:0.5 }},
                                            "VP": { x: 360, y: 1180, scale:1.3,"anchor": { x: 0.5,y:0.5,},  
                                           },
                                           
                                        }
                                    }
                                },
                                "p3paragraph6": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        
                                        "text": ["Page3Text11", "Page3Text12"],
                                        "props": {
                                            "VL": { x: 640, y: 900, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "VLparaStyle"  },
                                            "VP": { x: 360, y: 1300, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                           },
                                           
                                        }
                                    }
                                },

                        },




                            
                        }
                    },
                    //WIN LINES
                    "page4": {
                        "elementConstructor": "parent",
                        "params": {
                            "subscribeToResize": true,
                            "props": {
                                "VL": { x: 0, y: 2340 },
                                "VP": { x: 0, y: 1840 }
                            },
                          
                            "children": {
                                "p4title1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "textStyle": "titleStyle",
                                        "text": ["page4headtext"],
                                        "props": {
                                            "VL": { x: 640, y: 80, scale:1.2,"anchor": { x: 0.5,y:0.5 } },
                                            "VP": { x: 360, y: 50, scale:1.2,"anchor": { x: 0.5,y:0.5,},
                                           },
                                           
                                        }
                                    }
                                },
                                "p4paragraph1": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page4Text1"],
                                            "props": {
                                                "VL": { x: 640, y: 150, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p4VLparaStyle"  },
                                                "VP": { x: 360, y: 140, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "p4paragraph2": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page4Text2", "Page4Text3", "Page4Text4","Page4Text5","Page4Text6","Page4Text7","Page4Text8"],
                                            "props": {
                                                "VL": { x: 640, y: 320, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p4VLparaStyle"  },
                                                "VP": { x: 360, y: 400, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "p4paragraph3": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page4Text9", "Page4Text10","Page4Text11"],
                                            "props": {
                                                "VL": { x: 640, y: 540, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p4VLparaStyle"  },
                                                "VP": { x: 360, y: 710, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "minimumBetText": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page4Text12"],
                                            "props": {
                                                "VL": { x: 711, y: 660, scale:1,"anchor": { x: 1, y:0.5 } , "textStyle": "p4VLparaStyle"  },
                                                "VP": { x: 442, y: 811, scale:1,"anchor": { x: 1, y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "minimumBetValue": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": [""],
                                            "props": {
                                                "VL": { x: 731, y: 660, scale:1,"anchor": { x: 0, y:0.5 } , "textStyle": "p4VLparaStyle"  },
                                                "VP": { x: 450, y: 811, scale:1,"anchor": { x: 0, y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "p4paragraph4": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page4Text14"],
                                            "props": {
                                                "VL": { x: 640, y: 755, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p4VLparaStyle"  },
                                                "VP": { x: 360, y: 910, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "maximumBetText": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page4Text13"],
                                            "props": {
                                                "VL": { x: 711, y: 701, scale:1,"anchor": { x: 1, y:0.5 } , "textStyle": "p4VLparaStyle"  },
                                                "VP": { x: 442, y: 849, scale:1,"anchor": { x: 1, y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "maximumBetValue": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": [""],
                                            "props": {
                                                "VL": { x: 731, y: 701, scale:1,"anchor": { x: 0, y:0.5 } , "textStyle": "p4VLparaStyle"  },
                                                "VP": { x: 442, y: 849, scale:1,"anchor": { x: 0, y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },

                            }
                        }
                    },
                    //GAME RULES
                    "page5": {
                        "elementConstructor": "parent",
                        "params": {
                            "subscribeToResize": true,
                            "props": {
                                "VL": { x: -15, y: 2730 },
                                "VP": { x: 0, y: 2980 }
                            },
                            "children": {
                                "p5grTitle": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "textStyle": "pageHeadingStyle",
                                        "props": {
                                            "VL": { x: 640, y: 80, anchor: { x: 0.5 } },
                                            "VP": { x: 360, y: 80, anchor: { x: 0.5 } }
                                        },
                                        "text": ["page5headtext"],
                                    }
                                },
                                "p5Line1txt1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 1040, y: 180, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 260, y: 180, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page5L1text1"],
                                    }
                                },
                                "p5plussym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "Plus_normal",
                                        "props": {
                                            "VL": { x: 760, y: 200, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 350, y: 200,"anchor": { x: 0.5,y:0.5 },scale:0.5  }
                                        }
                                    }
                                },
                                "p5Line1txt2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 820, y: 180, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 410, y: 180, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page5L1text2"],
                                    }
                                },
                                "p5minussym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "minusBtn_normal",
                                        "props": {
                                            "VL": { x: 880, y: 200, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 470, y: 200,"anchor": { x: 0.5,y:0.5 },scale:0.5  }
                                        }
                                    }
                                },
                                "p5Line1txt3": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 400, y: 180, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 240, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page5L1text3"],
                                    }
                                },
                                "p5Line2txt1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 640, y: 240, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 280, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page5L2"],
                                    }
                                },
                                "p5title1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "textStyle": "titleStyle",
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 640, y: 300, anchor: { x: 0.5 } },
                                            "VP": { x: 360, y: 330, anchor: { x: 0.5 } }
                                        },
                                        "text": ["page5midtext"],
                                        "textStyle": "pageHeadingStyle"

                                    }
                                },
                                "p5setsym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "Setting_normal",
                                        "props": {
                                            "VL": { x: 125, y: 420, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 100, y: 420,"anchor": { x: 0.5,y:0.5 },scale:0.5  }
                                        }
                                    }
                                },
                                "p5Line3txt1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 695, y: 400, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 380, y: 400, anchor: { x: 0.5 }, textStyle: "lowVPparaStyle" }
                                        },
                                        "text": ["Page5L3"],
                                    }
                                },
                                "p5infosym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "Help_normal",
                                        "props": {
                                            "VL": { x: 450, y: 470, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 200, y: 520,"anchor": { x: 0.5,y:0.5 },scale:0.5  }
                                        }
                                    }
                                },
                                "p5Line4txt1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 640, y: 450, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 380, y: 500, anchor: { x: 0.5 }, textStyle: "VPparaStyle" }
                                        },
                                        "text": ["Page5L4"],
                                    }
                                },
                                "p5para1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 640, y: 515, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 580, anchor: { x: 0.5 }, textStyle: "VPparaStyle" }
                                        },
                                        "text": ["Page5L5","Page5L6"],
                                    }
                                },
                                "p5plussym1": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "Plus_normal",
                                        "props": {
                                            "VL": { x: 0, y: 670, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 300, y: 815,"anchor": { x: 0.5,y:0.5 },scale:0.5  }
                                        }
                                    }
                                },
                                "p5para2txt1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 50, y: 650, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 800, anchor: { x: 0.5 }, textStyle: "lowVPparaStyle" }
                                        },
                                        "text": ["Page5L7text1"],
                                    }
                                },
                                "p5minussym1": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "minusBtn_normal",
                                        "props": {
                                            "VL": { x: 100, y: 670, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 420, y: 815,"anchor": { x: 0.5,y:0.5 },scale:0.5  }
                                        }
                                    }
                                },
                                "p5para2txt2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 720, y: 650, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 850, anchor: { x: 0.5 }, textStyle: "lowVPparaStyle" }
                                        },
                                        "text": ["Page5L7text2"],
                                    }
                                },
                                "p5para2txt2pt1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 720, y: 650, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 850, anchor: { x: 0.5 }, textStyle: "lowVPparaStyle" }
                                        },
                                        "text": ["Page5L7text2pt1"],
                                    }
                                },
                                "p5para2txt2pt2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 720, y: 650, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 850, anchor: { x: 0.5 }, textStyle: "lowVPparaStyle" }
                                        },
                                        "text": ["Page5L7text2pt2"],
                                    }
                                },
                                "p5spinsym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "spinBtn_normal",
                                        "props": {
                                            "VL": { x: 520, y: 710, "scale": { x: 0.5,y:0.5 },scale:0.3 },
                                            "VP": { x: 250, y: 940,"scale": { x: 0.5,y:0.5 },scale:0.3  }
                                        }
                                    }
                                },
                                "p5Line5txt1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 680, y: 720, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 400, y: 950, anchor: { x: 0.5 }, textStyle: "VPparaStyle" }
                                        },
                                        "text": ["Page5L8"],
                                    }
                                },
                                "p5autosym": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "AutoPlay_basenew_normal",
                                        "props": {
                                            "VL": { x: 440, y: 790, "anchor": { x: 0.5,y:0.5 },scale:{x:0.8,y:1} },
                                            "VP": { x: 180, y: 1050,"anchor": { x: 0.5,y:0.5 },scale:{x:0.7,y:1}  }
                                        }
                                    }
                                },
                                "p5autoplaytxt": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 440, y: 790, "anchor": { x: 0.5,y:0.5 },scale:0.6 ,textStyle: "scattterVLparaStyle" },
                                            "VP": { x: 180, y: 1050,"anchor": { x: 0.5,y:0.5 } , textStyle: "scattterVLparaStyle" }
                                        },
                                        "text": "AUTOPLAY",
                                    }
                                },
                                "p5Line6txt1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 680, y: 770, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 420, y: 1030, anchor: { x: 0.5 }, textStyle: "VPparaStyle" }
                                        },
                                        "text": ["Page5L9"],
                                    }
                                },

                            }
                        }
                    },
                    "page6": {
                        "elementConstructor": "parent",
                        "params": {
                            "subscribeToResize": true,
                            "props": {
                                "VL": { x: 0, y: 4839 },
                                "VP": { x: 0, y: 2980 }
                            },
                            "children": {
                                "p6grTitle": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "textStyle": "titleStyle",
                                        "props": {
                                            "VL": { x: 640, y: 80, anchor: { x: 0.5 } },
                                            "VP": { x: 360, y: 80, anchor: { x: 0.5 } }
                                        },
                                        "text": ["page6headtext"],
                                        "textStyle": "pageHeadingStyle"
                                    }
                                },
                                "p6Line1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 640, y: 150, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 150, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L1"],
                                    }
                                },
                                "p6Line2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 640, y: 215, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 240, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L2"],
                                    }
                                },
                                "p6Line3": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 640, y: 265, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 300, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L3"],
                                    }
                                },
                                "p6Line4": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 640, y: 325, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 400, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L4"],
                                    }
                                },
                                "p6Line5": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 640, y: 380, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 470, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L5"],
                                    }
                                },
                                
                                "p6Title1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "textStyle": "titleStyle",
                                        "props": {
                                            "VL": { x: 640, y: 450, anchor: { x: 0.5 } },
                                            "VP": { x: 360, y: 550, anchor: { x: 0.5 } }
                                        },
                                        "text": ["page6midtext"],
                                        "textStyle": "pageHeadingStyle"

                                    }
                                },
                                "p6leftarr": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "ptArrow_normal",
                                        "props": {
                                            "VL": { x: 400, y: 550, "anchor": { x: 0.5,y:0.5 },scale:-0.6 },
                                            "VP": { x: 140, y: 650,"anchor": { x: 0.5,y:0.5 },scale:-0.7  }
                                        }
                                    }
                                },
                                "p6Line6txt1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 450, y: 530, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 190, y: 630, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L6text1"],
                                    }
                                },
                                "p6rightarr": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "ptArrow_normal",
                                        "props": {
                                            "VL": { x: 500, y: 550, "anchor": { x: 0.5,y:0.5 },scale:{x:0.6,y:0.6} },
                                            "VP": { x: 240, y: 650,"anchor": { x: 0.5,y:0.5 },scale:{x:0.7,y:0.7}  }
                                        }
                                    }
                                },
                                "p6Line6txt2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 720, y: 530, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 450, y: 630, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L6text2"],
                                    }
                                },
                                "p6closebt": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "bet_close_normal",
                                        "props": {
                                            "VL": { x: 500, y: 620, "anchor": { x: 0.5,y:0.5 },scale:1.2 },
                                            "VP": { x: 200, y: 700,"anchor": { x: 0.5,y:0.5 },scale:1  }
                                        }
                                    }
                                },
                                "p6Line7": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 700, y: 600, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 400, y: 680, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L7"],
                                    }
                                },
                                "p6title2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "textStyle": "pageHeadingStyle",
                                        "props": {
                                            "VL": { x: 640, y: 660, anchor: { x: 0.5 } },
                                            "VP": { x: 360, y: 740, anchor: { x: 0.5 } }
                                        },
                                        "text": ["page6bottomtext"],
                                    }
                                },
                                "p6Line8": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 640, y: 740, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 800, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L8"],
                                    }
                                },
                                "p6Line7txt1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 220, y: 800, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 250, y: 900, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L9text1"],
                                    }
                                },
                                "p6plussym1": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "Plus_normal",
                                        "props": {
                                            "VL": { x: 300, y: 818, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 340, y: 918,"anchor": { x: 0.5,y:0.5 },scale:0.5  }
                                        }
                                    }
                                },
                                "p6Line7txt2": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 362, y: 800, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 410, y: 900, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L9text2"],
                                    }
                                },
                                "p6minussym1": {
                                    "elementConstructor": "sprite",
                                    "params": {
                                        "subscribeToResize": true,
                                        "backgroundImage": "minusBtn_normal",
                                        "props": {
                                            "VL": { x: 420, y: 818, "anchor": { x: 0.5,y:0.5 },scale:0.5 },
                                            "VP": { x: 470, y: 918,"anchor": { x: 0.5,y:0.5 },scale:0.5  }
                                        }
                                    }
                                },
                                "p6Line7txt3": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "props": {
                                            "VL": { x: 800, y: 800, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                            "VP": { x: 360, y: 950, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                        },
                                        "text": ["Page6L9text3"],
                                    }
                                },
                                // "p6paragraph0": {
                                //     "elementConstructor": "text",
                                //     "params": {
                                //         "subscribeToResize": true,
                                //         "props": {
                                //             "VL": { x: 640, y: 860, anchor: { x: 0.5 }, textStyle: "VLparaStyle" },
                                //             "VP": { x: 360, y: 1050, anchor: { x: 0.5 }, textStyle: "PG2VPparaStyle" }
                                //         },
                                //         "text": ["Page7txt1", "Page7txt2", "Page7txt3"],
                                //     }
                                // },
                                
                            }
                        }
                    },
                    "page7": {
                        "elementConstructor": "parent",
                        "params": {
                            "subscribeToResize": true,
                            "props": {
                                "VL": { x: 0, y: 2340 },
                                "VP": { x: 0, y: 1840 }
                            },
                          
                            "children": {
                                "p7title1": {
                                    "elementConstructor": "text",
                                    "params": {
                                        "subscribeToResize": true,
                                        "textStyle": "pageHeadingStyle"   ,                                     
                                        "text": ["page7headtext"],
                                        "props": {
                                            "VL": { x: 640, y: 80, scale:1,"anchor": { x: 0.5,y:0.5 } },
                                            "VP": { x: 360, y: 100, scale:1,"anchor": { x: 0.5,y:0.5,},"scale": { x: 1.1,y:1.1,}
                                           },
                                         

                                        }
                                    }
                                },
                                "p7paragraph1": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page7L1"],
                                            "props": {
                                                "VL": { x: 640, y: 150, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p4VLparaStyle"  },
                                                "VP": { x: 360, y: 180, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "p7paragraph2": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page7L2"],
                                            "props": {
                                                "VL": { x: 640, y: 200, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p4VLparaStyle"  },
                                                "VP": { x: 360, y: 250, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "p7title2": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            //"textStyle": "titleStyle",
                                            "textStyle": "pageHeadingStyle",
                                            "text": ["Page7L3"],
                                            "props": {
                                                "VL": { x: 640, y: 300, scale:1.2,"anchor": { x: 0.5,y:0.5 } },
                                                "VP": { x: 360, y: 350, scale:1,"anchor": { x: 0.5,y:0.5,},
                                               },
                                              

                                            }

                                        }
                                    },
                                    "p7paragraph3": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page7L4"],
                                            "props": {
                                                "VL": { x: 640, y: 400, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p2VLparaStyle"  },
                                                "VP": { x: 360, y: 450, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "p7paragraph4": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page7L5"],
                                            "props": {
                                                "VL": { x: 640, y: 500, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p2VLparaStyle"  },
                                                "VP": { x: 360, y: 650, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    // "p7paragraph5": {
                                    //     "elementConstructor": "text",
                                    //     "params": {
                                    //         "subscribeToResize": true,
                                            
                                    //         "text": "The in-game, paytable shows symbol payouts as the multipliers on the total bet amount, which is calculated as 'total bet = (coin value * number of fixed coins). Hence, the actual payouts will be coin value * paytable factor when bet lines are kept constant.",
                                    //         "props": {
                                    //             "VL": { x: 640, y: 600, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p2VLparaStyle"  },
                                    //             "VP": { x: 360, y: 860, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                    //            },
                                               
                                    //         }
                                    //     }
                                    // },
                                    "p7paragraph6": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page7L6"],
                                            "props": {
                                                "VL": { x: 640, y: 700, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p2VLparaStyle"  },
                                                "VP": { x: 360, y: 850, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "p7paragraph7": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page7L7"],
                                            "props": {
                                                "VL": { x: 640, y: 750, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p2VLparaStyle"  },
                                                "VP": { x: 360, y: 950, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "p7paragraph8": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page7L8"],
                                            "props": {
                                                "VL": { x: 640, y: 800, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p2VLparaStyle"  },
                                                "VP": { x: 360, y: 1050, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                    "p7paragraph9": {
                                        "elementConstructor": "text",
                                        "params": {
                                            "subscribeToResize": true,
                                            
                                            "text": ["Page7L9"],
                                            "props": {
                                                "VL": { x: 640, y: 850, scale:1,"anchor": { x: 0.5,y:0.5 } , "textStyle": "p2VLparaStyle"  },
                                                "VP": { x: 360, y: 1150, scale:1,"anchor": { x: 0.5,y:0.5,}, "textStyle": "PG2VPparaStyle" 
                                               },
                                               
                                            }
                                        }
                                    },
                                   

                            }
                        }
                    },

                }
            }
        },
        //Need to change parent manually in paytableMobileView.js
        "paytableCloseButton": {
            "elementConstructor": "button",
            "params": {
                "makeResponsive": true,
                "props": {
                    "HX": 1150, "HY": 75, "VX": 630, "VY": 70,
                    portScaleX:1.1,
                    portScaleY:1.1,
                    landScaleX:1.1,
                    landScaleY:1.1,
                    "landAlignX": "RIGHT", "landAlignY": "TOP", "portAlignX": "RIGHT", "portAlignY": "TOP"
                },
                "backgroundImage": "bet_close"
            }
        }
    },
    "textStyle": {
        "symbolPayoutA": {
            "fontFamily": "ProximaNova",
            fill: 0xFF0000,
            align: 'right',
            fontSize: 35,
            "lineHeight": 90
        },
        "symbolPayoutB": {
            "fontFamily": "ProximaNova",
            fill: 0x00FF00,
            align: 'right',
            fontSize: 35,
            "lineHeight": 90
        },
        "symbolPayoutC": {
            "fontFamily": "ProximaNova",
            fill: 0x20A0FF,
            align: 'right',
            fontSize: 35,
            "lineHeight": 90
        },
        "symbolPayoutLow": {
            "fontFamily": "ProximaNova",
            fill: 0xFFFFFF,
            align: 'right',
            fontSize: 35,
            "lineHeight": 90
        },
        "pageHeadingStyle": {
            "fontFamily": "ProximaNova_Bold",
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 50,
            "maxWidth": 650
        },
        "pageTextStyle": {
            "fontFamily": "ProximaNova",
            fill: 0xFFFFFF,
            align: 'left',
            fontSize: 50,
            "maxWidth": 650
        },
        "pagePointsStyleL": {
            "fontFamily": "ProximaNova",
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 35,
            "lineHeight": 90,
            wordWrap: true,
            breakWords: true,
            wordWrapWidth: 1150,
            padding: 10
        },
        "pagePointsStyleP": {
            "fontFamily": "ProximaNova",
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 35,
            "lineHeight": 90,
            wordWrap: true,
            breakWords: true,
            wordWrapWidth: 650,
            padding: 10
        },
        "pageDescriptionStyleL": {
            "fontFamily": "ProximaNova",
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 35,
            "lineHeight": 90,
            wordWrap: true,
            wordWrapWidth: 1150,
            breakWords: true,
            padding: 10
        },
        "pageDescriptionStyleP": {
            "fontFamily": "ProximaNova",
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 35,
            wordWrapWidth: 650,
            wordWrap: true,
            breakWords: true,
            lineHeight: 90,
            breakWords: true,
            padding: 10
        },
        page1_2Text1L: {
            "fontFamily": "ProximaNova",
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 35,
            "lineHeight": 90,
            "maxWidth": 1050
        },
        page1_2Text1P: {
            "fontFamily": "ProximaNova",
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 35,
            "lineHeight": 90,
            "maxWidth": 600
        },
        page1_2Text2P: {
            "fontFamily": "ProximaNova_Bold",
            fill: 0xFFFFFF,
            align: 'center',
            fontSize: 55,
            "maxWidth": 650
        },
        titleStyle : {
            "fontWeight": "bold",
            "fontSize": 45,
            "fontFamily": "ProximaNova_Bold",
            "fill": "#ffffff",
            "strokeThickness": 2,
            "lineJoin": "round",
            "align": 'left',
            "maxWidth": 300
        },
        VLparaStyle : {
          
            "fontWeight": "normal",
            "fontSize": 34,
            "fontFamily": "ProximaNova_Bold",
            "fill": "#ffffff",
            "strokeThickness": 2,
            "lineJoin": "round",
            "align": 'center',
            "wordWrapWidth": 1200,
            "wordWrap": true,
           
        },
        p2VLparaStyle:{
            "fontWeight": "normal",
            "fontSize": 28,
            "fontFamily": "ProximaNova_Bold",
            "fill": "#ffffff",
            "strokeThickness": 2,
            "lineJoin": "round",
            "align": 'center',
            "wordWrapWidth": 1200,
            "wordWrap": true,
        },
        p4VLparaStyle:{
            "fontWeight": "normal",
            "fontSize": 32,
            "fontFamily": "ProximaNova_Bold",
            "fill": "#ffffff",
            "strokeThickness": 2,
            "lineJoin": "round",
            "align": 'center',
            "wordWrapWidth": 1000,
            "wordWrap": true,
        },
        "scattterVLparaStyle" :{
            "fontWeight": "normal",
            "fontSize": 26,
            "fontFamily": "ProximaNova_Bold",
            "fill": "#ffffff",
            "strokeThickness": 2,
            "lineJoin": "round",
            "align": 'left',
        },
        "scatterVLparaStyle":{
            "fontWeight": "normal",
            "fontSize": 30,
            "fontFamily": "ProximaNova_Bold",
            "fill": "#ffffff",
            "strokeThickness": 2,
            "lineJoin": "round",
            "align": 'left',
        },
        "VPparaStyle" :
        {
            "fontWeight": "normal",
            "fontSize": 32,
            "fontFamily": "ProximaNova_Bold",
            "fill": "#ffffff",
            "strokeThickness": 2,
            "lineJoin": "round",
            "align": 'center',
            "wordWrapWidth": 450,
            "wordWrap": true,

        },
        "scatterVPparaStyle":{
            "fontWeight": "normal",
            "fontSize": 24,
            "fontFamily": "ProximaNova_Bold",
            "fill": "#ffffff",
            "strokeThickness": 2,
            "lineJoin": "round",
            "align": 'left',
            "wordWrapWidth": 300,
            "wordWrap": true,
        },
        "PG2VPparaStyle":{
            "fontWeight": "normal",
            "fontSize": 32,
            "fontFamily": "ProximaNova_Bold",
            "fill": "#ffffff",
            "strokeThickness": 2,
            "lineJoin": "round",
            "align": 'center',
            "wordWrapWidth": 650,
            "wordWrap": true,
        },
        "lowVPparaStyle":
        {
            "fontWeight": "normal",
            "fontSize": 28,
            "fontFamily": "ProximaNova_Bold",
            "fill": "#ffffff",
            "strokeThickness": 2,
            "lineJoin": "round",
            "align": 'center',
            "wordWrapWidth": 500,
            "wordWrap": true,
        },
    }
}