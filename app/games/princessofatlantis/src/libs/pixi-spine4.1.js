/* eslint-disable */
 
/*!
 * @pixi-spine/all-4.1 - v3.1.0
 * Compiled Sun, 07 Aug 2022 23:00:37 UTC
 *
 * @pixi-spine/all-4.1 is licensed under SPINE-LICENSE
 * http://esotericsoftware.com/spine-runtimes-license
 * 
 * Copyright 2019-2020, Ivan Igorevich Popelyshev <ivan.popelyshev@gmail.com>, All Rights Reserved
 */
this.PIXI = this.PIXI || {};
this.PIXI.spine = this.PIXI.spine || {};
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pixi/loaders'), require('@pixi/core'), require('@pixi/constants'), require('@pixi/math'), require('@pixi/display'), require('@pixi/sprite'), require('@pixi/mesh-extras'), require('@pixi/graphics'), require('@pixi/utils')) :
    typeof define === 'function' && define.amd ? define(['exports', '@pixi/loaders', '@pixi/core', '@pixi/constants', '@pixi/math', '@pixi/display', '@pixi/sprite', '@pixi/mesh-extras', '@pixi/graphics', '@pixi/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global._pixi_spine_all_ = {}, global.PIXI, global.PIXI, global.PIXI, global.PIXI, global.PIXI, global.PIXI, global.PIXI, global.PIXI, global.PIXI.utils));
})(this, (function (exports, loaders, core, constants, math, display, sprite, meshExtras, graphics, utils) { 'use strict';

    /* eslint-disable */

    /**
     * @public
     */
    exports.AttachmentType = void 0;
    (function (AttachmentType) {
        AttachmentType[AttachmentType["Region"] = 0] = "Region";
        AttachmentType[AttachmentType["BoundingBox"] = 1] = "BoundingBox";
        AttachmentType[AttachmentType["Mesh"] = 2] = "Mesh";
        AttachmentType[AttachmentType["LinkedMesh"] = 3] = "LinkedMesh";
        AttachmentType[AttachmentType["Path"] = 4] = "Path";
        AttachmentType[AttachmentType["Point"] = 5] = "Point";
        AttachmentType[AttachmentType["Clipping"] = 6] = "Clipping";
    })(exports.AttachmentType || (exports.AttachmentType = {}));

    /**
     * @public
     */
    var BinaryInput = /** @class */ (function () {
        function BinaryInput(data, strings, index, buffer) {
            if (strings === void 0) { strings = new Array(); }
            if (index === void 0) { index = 0; }
            if (buffer === void 0) { buffer = new DataView(data.buffer); }
            this.strings = strings;
            this.index = index;
            this.buffer = buffer;
        }
        BinaryInput.prototype.readByte = function () {
            return this.buffer.getInt8(this.index++);
        };
        BinaryInput.prototype.readUnsignedByte = function () {
            return this.buffer.getUint8(this.index++);
        };
        BinaryInput.prototype.readShort = function () {
            var value = this.buffer.getInt16(this.index);
            this.index += 2;
            return value;
        };
        BinaryInput.prototype.readInt32 = function () {
            var value = this.buffer.getInt32(this.index);
            this.index += 4;
            return value;
        };
        BinaryInput.prototype.readInt = function (optimizePositive) {
            var b = this.readByte();
            var result = b & 0x7F;
            if ((b & 0x80) != 0) {
                b = this.readByte();
                result |= (b & 0x7F) << 7;
                if ((b & 0x80) != 0) {
                    b = this.readByte();
                    result |= (b & 0x7F) << 14;
                    if ((b & 0x80) != 0) {
                        b = this.readByte();
                        result |= (b & 0x7F) << 21;
                        if ((b & 0x80) != 0) {
                            b = this.readByte();
                            result |= (b & 0x7F) << 28;
                        }
                    }
                }
            }
            return optimizePositive ? result : ((result >>> 1) ^ -(result & 1));
        };
        BinaryInput.prototype.readStringRef = function () {
            var index = this.readInt(true);
            return index == 0 ? null : this.strings[index - 1];
        };
        BinaryInput.prototype.readString = function () {
            var byteCount = this.readInt(true);
            switch (byteCount) {
                case 0:
                    return null;
                case 1:
                    return "";
            }
            byteCount--;
            var chars = "";
            for (var i = 0; i < byteCount;) {
                var b = this.readUnsignedByte();
                switch (b >> 4) {
                    case 12:
                    case 13:
                        chars += String.fromCharCode(((b & 0x1F) << 6 | this.readByte() & 0x3F));
                        i += 2;
                        break;
                    case 14:
                        chars += String.fromCharCode(((b & 0x0F) << 12 | (this.readByte() & 0x3F) << 6 | this.readByte() & 0x3F));
                        i += 3;
                        break;
                    default:
                        chars += String.fromCharCode(b);
                        i++;
                }
            }
            return chars;
        };
        BinaryInput.prototype.readFloat = function () {
            var value = this.buffer.getFloat32(this.index);
            this.index += 4;
            return value;
        };
        BinaryInput.prototype.readBoolean = function () {
            return this.readByte() != 0;
        };
        return BinaryInput;
    }());

    // Those enums were moved from Animation.ts of spine 3.8 and 4.0
    /** Controls how a timeline value is mixed with the setup pose value or current pose value when a timeline's `alpha`
     * < 1.
     *
     * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}.
     * @public
     * */
    exports.MixBlend = void 0;
    (function (MixBlend) {
        /** Transitions from the setup value to the timeline value (the current value is not used). Before the first key, the setup
         * value is set. */
        MixBlend[MixBlend["setup"] = 0] = "setup";
        /** Transitions from the current value to the timeline value. Before the first key, transitions from the current value to
         * the setup value. Timelines which perform instant transitions, such as DrawOrderTimeline or
         * AttachmentTimeline, use the setup value before the first key.
         *
         * `first` is intended for the first animations applied, not for animations layered on top of those. */
        MixBlend[MixBlend["first"] = 1] = "first";
        /** Transitions from the current value to the timeline value. No change is made before the first key (the current value is
         * kept until the first key).
         *
         * `replace` is intended for animations layered on top of others, not for the first animations applied. */
        MixBlend[MixBlend["replace"] = 2] = "replace";
        /** Transitions from the current value to the current value plus the timeline value. No change is made before the first key
         * (the current value is kept until the first key).
         *
         * `add` is intended for animations layered on top of others, not for the first animations applied. Properties
         * keyed by additive animations must be set manually or by another animation before applying the additive animations, else
         * the property values will increase continually. */
        MixBlend[MixBlend["add"] = 3] = "add";
    })(exports.MixBlend || (exports.MixBlend = {}));
    /** Indicates whether a timeline's `alpha` is mixing out over time toward 0 (the setup or current pose value) or
     * mixing in toward 1 (the timeline's value).
     *
     * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}.
     * @public
     * */
    exports.MixDirection = void 0;
    (function (MixDirection) {
        MixDirection[MixDirection["mixIn"] = 0] = "mixIn";
        MixDirection[MixDirection["mixOut"] = 1] = "mixOut";
    })(exports.MixDirection || (exports.MixDirection = {}));

    // These enums were moved from PathConstraintData.ts of spine 3.7, 3.8 and 4.0
    /** Controls how the first bone is positioned along the path.
     *
     * See [Position mode](http://esotericsoftware.com/spine-path-constraints#Position-mode) in the Spine User Guide.
     * @public
     * */
    exports.PositionMode = void 0;
    (function (PositionMode) {
        PositionMode[PositionMode["Fixed"] = 0] = "Fixed";
        PositionMode[PositionMode["Percent"] = 1] = "Percent";
    })(exports.PositionMode || (exports.PositionMode = {}));
    /** Controls how bones are rotated, translated, and scaled to match the path.
     *
     * [Rotate mode](http://esotericsoftware.com/spine-path-constraints#Rotate-mod) in the Spine User Guide.
     * @public
     * */
    exports.RotateMode = void 0;
    (function (RotateMode) {
        RotateMode[RotateMode["Tangent"] = 0] = "Tangent";
        RotateMode[RotateMode["Chain"] = 1] = "Chain";
        RotateMode[RotateMode["ChainScale"] = 2] = "ChainScale";
    })(exports.RotateMode || (exports.RotateMode = {}));

    // This enum was moved from BoneData.ts of spine 3.7, 3.8 and 4.0
    /** Determines how a bone inherits world transforms from parent bones.
     * @public
     * */
    exports.TransformMode = void 0;
    (function (TransformMode) {
        TransformMode[TransformMode["Normal"] = 0] = "Normal";
        TransformMode[TransformMode["OnlyTranslation"] = 1] = "OnlyTranslation";
        TransformMode[TransformMode["NoRotationOrReflection"] = 2] = "NoRotationOrReflection";
        TransformMode[TransformMode["NoScale"] = 3] = "NoScale";
        TransformMode[TransformMode["NoScaleOrReflection"] = 4] = "NoScaleOrReflection";
    })(exports.TransformMode || (exports.TransformMode = {}));

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics$2 = function(d, b) {
        extendStatics$2 = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics$2(d, b);
    };

    function __extends$2(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics$2(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @public
     */
    function filterFromString(text) {
        switch (text.toLowerCase()) {
            case "nearest": return exports.TextureFilter.Nearest;
            case "linear": return exports.TextureFilter.Linear;
            case "mipmap": return exports.TextureFilter.MipMap;
            case "mipmapnearestnearest": return exports.TextureFilter.MipMapNearestNearest;
            case "mipmaplinearnearest": return exports.TextureFilter.MipMapLinearNearest;
            case "mipmapnearestlinear": return exports.TextureFilter.MipMapNearestLinear;
            case "mipmaplinearlinear": return exports.TextureFilter.MipMapLinearLinear;
            default: throw new Error("Unknown texture filter " + text);
        }
    }
    /**
     * @public
     */
    function wrapFromString(text) {
        switch (text.toLowerCase()) {
            case "mirroredtepeat": return exports.TextureWrap.MirroredRepeat;
            case "clamptoedge": return exports.TextureWrap.ClampToEdge;
            case "repeat": return exports.TextureWrap.Repeat;
            default: throw new Error("Unknown texture wrap " + text);
        }
    }
    /**
     * @public
     */
    exports.TextureFilter = void 0;
    (function (TextureFilter) {
        TextureFilter[TextureFilter["Nearest"] = 9728] = "Nearest";
        TextureFilter[TextureFilter["Linear"] = 9729] = "Linear";
        TextureFilter[TextureFilter["MipMap"] = 9987] = "MipMap";
        TextureFilter[TextureFilter["MipMapNearestNearest"] = 9984] = "MipMapNearestNearest";
        TextureFilter[TextureFilter["MipMapLinearNearest"] = 9985] = "MipMapLinearNearest";
        TextureFilter[TextureFilter["MipMapNearestLinear"] = 9986] = "MipMapNearestLinear";
        TextureFilter[TextureFilter["MipMapLinearLinear"] = 9987] = "MipMapLinearLinear"; // WebGLRenderingContext.LINEAR_MIPMAP_LINEAR
    })(exports.TextureFilter || (exports.TextureFilter = {}));
    /**
     * @public
     */
    exports.TextureWrap = void 0;
    (function (TextureWrap) {
        TextureWrap[TextureWrap["MirroredRepeat"] = 33648] = "MirroredRepeat";
        TextureWrap[TextureWrap["ClampToEdge"] = 33071] = "ClampToEdge";
        TextureWrap[TextureWrap["Repeat"] = 10497] = "Repeat"; // WebGLRenderingContext.REPEAT
    })(exports.TextureWrap || (exports.TextureWrap = {}));
    /**
     * @public
     */
    var TextureRegion = /** @class */ (function () {
        function TextureRegion() {
            //thats for overrides
            this.size = null;
            this.names = null;
            this.values = null;
            this.renderObject = null;
        }
        Object.defineProperty(TextureRegion.prototype, "width", {
            get: function () {
                var tex = this.texture;
                if (tex.trim) {
                    return tex.trim.width;
                }
                return tex.orig.width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "height", {
            get: function () {
                var tex = this.texture;
                if (tex.trim) {
                    return tex.trim.height;
                }
                return tex.orig.height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "u", {
            get: function () {
                return this.texture._uvs.x0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "v", {
            get: function () {
                return this.texture._uvs.y0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "u2", {
            get: function () {
                return this.texture._uvs.x2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "v2", {
            get: function () {
                return this.texture._uvs.y2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "offsetX", {
            get: function () {
                var tex = this.texture;
                return tex.trim ? tex.trim.x : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "offsetY", {
            get: function () {
                // console.warn("Deprecation Warning: @Hackerham: I guess, if you are using PIXI-SPINE ATLAS region.offsetY, you want a texture, right? Use region.texture from now on.");
                return this.spineOffsetY;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "pixiOffsetY", {
            get: function () {
                var tex = this.texture;
                return tex.trim ? tex.trim.y : 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "spineOffsetY", {
            get: function () {
                var tex = this.texture;
                return this.originalHeight - this.height - (tex.trim ? tex.trim.y : 0);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "originalWidth", {
            get: function () {
                return this.texture.orig.width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "originalHeight", {
            get: function () {
                return this.texture.orig.height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "x", {
            get: function () {
                return this.texture.frame.x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "y", {
            get: function () {
                return this.texture.frame.y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "rotate", {
            get: function () {
                return this.texture.rotate !== 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextureRegion.prototype, "degrees", {
            get: function () {
                return (360 - this.texture.rotate * 45) % 360;
            },
            enumerable: false,
            configurable: true
        });
        return TextureRegion;
    }());

    var RegionFields = /** @class */ (function () {
        function RegionFields() {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.originalWidth = 0;
            this.originalHeight = 0;
            this.rotate = 0;
            this.index = 0;
        }
        return RegionFields;
    }());
    /**
     * @public
     */
    var TextureAtlas = /** @class */ (function () {
        function TextureAtlas(atlasText, textureLoader, callback) {
            this.pages = new Array();
            this.regions = new Array();
            if (atlasText) {
                this.addSpineAtlas(atlasText, textureLoader, callback);
            }
        }
        TextureAtlas.prototype.addTexture = function (name, texture) {
            var pages = this.pages;
            var page = null;
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].baseTexture === texture.baseTexture) {
                    page = pages[i];
                    break;
                }
            }
            if (page === null) {
                page = new TextureAtlasPage();
                page.name = 'texturePage';
                var baseTexture = texture.baseTexture;
                page.width = baseTexture.realWidth;
                page.height = baseTexture.realHeight;
                page.baseTexture = baseTexture;
                //those fields are not relevant in Pixi
                page.minFilter = page.magFilter = exports.TextureFilter.Nearest;
                page.uWrap = exports.TextureWrap.ClampToEdge;
                page.vWrap = exports.TextureWrap.ClampToEdge;
                pages.push(page);
            }
            var region = new TextureAtlasRegion();
            region.name = name;
            region.page = page;
            region.texture = texture;
            region.index = -1;
            this.regions.push(region);
            return region;
        };
        TextureAtlas.prototype.addTextureHash = function (textures, stripExtension) {
            for (var key in textures) {
                if (textures.hasOwnProperty(key)) {
                    this.addTexture(stripExtension && key.indexOf('.') !== -1 ? key.substr(0, key.lastIndexOf('.')) : key, textures[key]);
                }
            }
        };
        TextureAtlas.prototype.addSpineAtlas = function (atlasText, textureLoader, callback) {
            return this.load(atlasText, textureLoader, callback);
        };
        TextureAtlas.prototype.load = function (atlasText, textureLoader, callback) {
            var _this = this;
            if (textureLoader == null)
                throw new Error("textureLoader cannot be null.");
            var reader = new TextureAtlasReader(atlasText);
            var entry = new Array(4);
            var page = null;
            var pageFields = {};
            var region = null;
            pageFields["size"] = function () {
                page.width = parseInt(entry[1]);
                page.height = parseInt(entry[2]);
            };
            pageFields["format"] = function () {
                // page.format = Format[tuple[0]]; we don't need format in WebGL
            };
            pageFields["filter"] = function () {
                page.minFilter = filterFromString(entry[1]);
                page.magFilter = filterFromString(entry[2]);
            };
            pageFields["repeat"] = function () {
                if (entry[1].indexOf('x') != -1)
                    page.uWrap = exports.TextureWrap.Repeat;
                if (entry[1].indexOf('y') != -1)
                    page.vWrap = exports.TextureWrap.Repeat;
            };
            pageFields["pma"] = function () {
                page.pma = entry[1] == "true";
            };
            var regionFields = {};
            regionFields["xy"] = function () {
                region.x = parseInt(entry[1]);
                region.y = parseInt(entry[2]);
            };
            regionFields["size"] = function () {
                region.width = parseInt(entry[1]);
                region.height = parseInt(entry[2]);
            };
            regionFields["bounds"] = function () {
                region.x = parseInt(entry[1]);
                region.y = parseInt(entry[2]);
                region.width = parseInt(entry[3]);
                region.height = parseInt(entry[4]);
            };
            regionFields["offset"] = function () {
                region.offsetX = parseInt(entry[1]);
                region.offsetY = parseInt(entry[2]);
            };
            regionFields["orig"] = function () {
                region.originalWidth = parseInt(entry[1]);
                region.originalHeight = parseInt(entry[2]);
            };
            regionFields["offsets"] = function () {
                region.offsetX = parseInt(entry[1]);
                region.offsetY = parseInt(entry[2]);
                region.originalWidth = parseInt(entry[3]);
                region.originalHeight = parseInt(entry[4]);
            };
            regionFields["rotate"] = function () {
                var rotateValue = entry[1];
                var rotate = 0;
                if (rotateValue.toLocaleLowerCase() == "true") {
                    rotate = 6;
                }
                else if (rotateValue.toLocaleLowerCase() == "false") {
                    rotate = 0;
                }
                else {
                    rotate = ((720 - parseFloat(rotateValue)) % 360) / 45;
                }
                region.rotate = rotate;
            };
            regionFields["index"] = function () {
                region.index = parseInt(entry[1]);
            };
            var line = reader.readLine();
            // Ignore empty lines before first entry.
            while (line != null && line.trim().length == 0)
                line = reader.readLine();
            // Header entries.
            while (true) {
                if (line == null || line.trim().length == 0)
                    break;
                if (reader.readEntry(entry, line) == 0)
                    break; // Silently ignore all header fields.
                line = reader.readLine();
            }
            var iterateParser = function () {
                while (true) {
                    if (line == null) {
                        return callback && callback(_this);
                    }
                    if (line.trim().length == 0) {
                        page = null;
                        line = reader.readLine();
                    }
                    else if (page === null) {
                        page = new TextureAtlasPage();
                        page.name = line.trim();
                        while (true) {
                            if (reader.readEntry(entry, line = reader.readLine()) == 0)
                                break;
                            var field = pageFields[entry[0]];
                            if (field)
                                field();
                        }
                        _this.pages.push(page);
                        textureLoader(page.name, function (texture) {
                            if (texture === null) {
                                _this.pages.splice(_this.pages.indexOf(page), 1);
                                return callback && callback(null);
                            }
                            page.baseTexture = texture;
                            //TODO: set scaleMode and mipmapMode from spine
                            if (page.pma) {
                                texture.alphaMode = constants.ALPHA_MODES.PMA;
                            }
                            if (!texture.valid) {
                                texture.setSize(page.width, page.height);
                            }
                            page.setFilters();
                            if (!page.width || !page.height) {
                                page.width = texture.realWidth;
                                page.height = texture.realHeight;
                                if (!page.width || !page.height) {
                                    console.log("ERROR spine atlas page " + page.name + ": meshes wont work if you dont specify size in atlas (http://www.html5gamedevs.com/topic/18888-pixi-spines-and-meshes/?p=107121)");
                                }
                            }
                            iterateParser();
                        });
                        break;
                    }
                    else {
                        region = new RegionFields();
                        var atlasRegion = new TextureAtlasRegion();
                        atlasRegion.name = line;
                        atlasRegion.page = page;
                        var names = null;
                        var values = null;
                        while (true) {
                            var count = reader.readEntry(entry, line = reader.readLine());
                            if (count == 0)
                                break;
                            var field = regionFields[entry[0]];
                            if (field)
                                field();
                            else {
                                if (names == null) {
                                    names = [];
                                    values = [];
                                }
                                names.push(entry[0]);
                                var entryValues = [];
                                for (var i = 0; i < count; i++)
                                    entryValues.push(parseInt(entry[i + 1]));
                                values.push(entryValues);
                            }
                        }
                        if (region.originalWidth == 0 && region.originalHeight == 0) {
                            region.originalWidth = region.width;
                            region.originalHeight = region.height;
                        }
                        var resolution = page.baseTexture.resolution;
                        region.x /= resolution;
                        region.y /= resolution;
                        region.width /= resolution;
                        region.height /= resolution;
                        region.originalWidth /= resolution;
                        region.originalHeight /= resolution;
                        region.offsetX /= resolution;
                        region.offsetY /= resolution;
                        var swapWH = region.rotate % 4 !== 0;
                        var frame = new math.Rectangle(region.x, region.y, swapWH ? region.height : region.width, swapWH ? region.width : region.height);
                        var orig = new math.Rectangle(0, 0, region.originalWidth, region.originalHeight);
                        var trim = new math.Rectangle(region.offsetX, region.originalHeight - region.height - region.offsetY, region.width, region.height);
                        atlasRegion.texture = new core.Texture(atlasRegion.page.baseTexture, frame, orig, trim, region.rotate);
                        atlasRegion.index = region.index;
                        atlasRegion.texture.updateUvs();
                        _this.regions.push(atlasRegion);
                    }
                }
            };
            iterateParser();
        };
        TextureAtlas.prototype.findRegion = function (name) {
            for (var i = 0; i < this.regions.length; i++) {
                if (this.regions[i].name == name) {
                    return this.regions[i];
                }
            }
            return null;
        };
        TextureAtlas.prototype.dispose = function () {
            for (var i = 0; i < this.pages.length; i++) {
                this.pages[i].baseTexture.dispose();
            }
        };
        return TextureAtlas;
    }());
    /**
     * @public
     */
    var TextureAtlasReader = /** @class */ (function () {
        function TextureAtlasReader(text) {
            this.index = 0;
            this.lines = text.split(/\r\n|\r|\n/);
        }
        TextureAtlasReader.prototype.readLine = function () {
            if (this.index >= this.lines.length)
                return null;
            return this.lines[this.index++];
        };
        TextureAtlasReader.prototype.readEntry = function (entry, line) {
            if (line == null)
                return 0;
            line = line.trim();
            if (line.length == 0)
                return 0;
            var colon = line.indexOf(':');
            if (colon == -1)
                return 0;
            entry[0] = line.substr(0, colon).trim();
            for (var i = 1, lastMatch = colon + 1;; i++) {
                var comma = line.indexOf(',', lastMatch);
                if (comma == -1) {
                    entry[i] = line.substr(lastMatch).trim();
                    return i;
                }
                entry[i] = line.substr(lastMatch, comma - lastMatch).trim();
                lastMatch = comma + 1;
                if (i == 4)
                    return 4;
            }
        };
        return TextureAtlasReader;
    }());
    /**
     * @public
     */
    var TextureAtlasPage = /** @class */ (function () {
        function TextureAtlasPage() {
            this.minFilter = exports.TextureFilter.Nearest;
            this.magFilter = exports.TextureFilter.Nearest;
            this.uWrap = exports.TextureWrap.ClampToEdge;
            this.vWrap = exports.TextureWrap.ClampToEdge;
        }
        TextureAtlasPage.prototype.setFilters = function () {
            var tex = this.baseTexture;
            var filter = this.minFilter;
            if (filter == exports.TextureFilter.Linear) {
                tex.scaleMode = constants.SCALE_MODES.LINEAR;
            }
            else if (this.minFilter == exports.TextureFilter.Nearest) {
                tex.scaleMode = constants.SCALE_MODES.NEAREST;
            }
            else {
                tex.mipmap = constants.MIPMAP_MODES.POW2;
                if (filter == exports.TextureFilter.MipMapNearestNearest) {
                    tex.scaleMode = constants.SCALE_MODES.NEAREST;
                }
                else {
                    tex.scaleMode = constants.SCALE_MODES.LINEAR;
                }
            }
        };
        return TextureAtlasPage;
    }());
    /**
     * @public
     */
    var TextureAtlasRegion = /** @class */ (function (_super) {
        __extends$2(TextureAtlasRegion, _super);
        function TextureAtlasRegion() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TextureAtlasRegion;
    }(TextureRegion));

    var fround_polyfill = (function (array) {
        return function (x) {
            return array[0] = x, array[0];
        };
    })(new Float32Array(1));
    var fround = Math.fround || fround_polyfill;
    /**
     * @public
     */
    var IntSet = /** @class */ (function () {
        function IntSet() {
            this.array = new Array();
        }
        IntSet.prototype.add = function (value) {
            var contains = this.contains(value);
            this.array[value | 0] = value | 0;
            return !contains;
        };
        IntSet.prototype.contains = function (value) {
            return this.array[value | 0] != undefined;
        };
        IntSet.prototype.remove = function (value) {
            this.array[value | 0] = undefined;
        };
        IntSet.prototype.clear = function () {
            this.array.length = 0;
        };
        return IntSet;
    }());
    /**
     * @public
     */
    var StringSet = /** @class */ (function () {
        function StringSet() {
            this.entries = {};
            this.size = 0;
        }
        StringSet.prototype.add = function (value) {
            var contains = this.entries[value];
            this.entries[value] = true;
            if (!contains) {
                this.size++;
                return true;
            }
            return false;
        };
        StringSet.prototype.addAll = function (values) {
            var oldSize = this.size;
            for (var i = 0, n = values.length; i < n; i++)
                this.add(values[i]);
            return oldSize != this.size;
        };
        StringSet.prototype.contains = function (value) {
            return this.entries[value];
        };
        StringSet.prototype.clear = function () {
            this.entries = {};
            this.size = 0;
        };
        return StringSet;
    }());
    /**
     * @public
     */
    var Color = /** @class */ (function () {
        function Color(r, g, b, a) {
            if (r === void 0) { r = 0; }
            if (g === void 0) { g = 0; }
            if (b === void 0) { b = 0; }
            if (a === void 0) { a = 0; }
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Color.prototype.set = function (r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            return this.clamp();
        };
        Color.prototype.setFromColor = function (c) {
            this.r = c.r;
            this.g = c.g;
            this.b = c.b;
            this.a = c.a;
            return this;
        };
        Color.prototype.setFromString = function (hex) {
            hex = hex.charAt(0) == '#' ? hex.substr(1) : hex;
            this.r = parseInt(hex.substr(0, 2), 16) / 255;
            this.g = parseInt(hex.substr(2, 2), 16) / 255;
            this.b = parseInt(hex.substr(4, 2), 16) / 255;
            this.a = hex.length != 8 ? 1 : parseInt(hex.substr(6, 2), 16) / 255;
            return this;
        };
        Color.prototype.add = function (r, g, b, a) {
            this.r += r;
            this.g += g;
            this.b += b;
            this.a += a;
            return this.clamp();
        };
        Color.prototype.clamp = function () {
            if (this.r < 0)
                this.r = 0;
            else if (this.r > 1)
                this.r = 1;
            if (this.g < 0)
                this.g = 0;
            else if (this.g > 1)
                this.g = 1;
            if (this.b < 0)
                this.b = 0;
            else if (this.b > 1)
                this.b = 1;
            if (this.a < 0)
                this.a = 0;
            else if (this.a > 1)
                this.a = 1;
            return this;
        };
        Color.rgba8888ToColor = function (color, value) {
            color.r = ((value & 0xff000000) >>> 24) / 255;
            color.g = ((value & 0x00ff0000) >>> 16) / 255;
            color.b = ((value & 0x0000ff00) >>> 8) / 255;
            color.a = ((value & 0x000000ff)) / 255;
        };
        Color.rgb888ToColor = function (color, value) {
            color.r = ((value & 0x00ff0000) >>> 16) / 255;
            color.g = ((value & 0x0000ff00) >>> 8) / 255;
            color.b = ((value & 0x000000ff)) / 255;
        };
        Color.fromString = function (hex) {
            return new Color().setFromString(hex);
        };
        Color.WHITE = new Color(1, 1, 1, 1);
        Color.RED = new Color(1, 0, 0, 1);
        Color.GREEN = new Color(0, 1, 0, 1);
        Color.BLUE = new Color(0, 0, 1, 1);
        Color.MAGENTA = new Color(1, 0, 1, 1);
        return Color;
    }());
    /**
     * @public
     */
    var MathUtils = /** @class */ (function () {
        function MathUtils() {
        }
        MathUtils.clamp = function (value, min, max) {
            if (value < min)
                return min;
            if (value > max)
                return max;
            return value;
        };
        MathUtils.cosDeg = function (degrees) {
            return Math.cos(degrees * MathUtils.degRad);
        };
        MathUtils.sinDeg = function (degrees) {
            return Math.sin(degrees * MathUtils.degRad);
        };
        MathUtils.signum = function (value) {
            return value > 0 ? 1 : value < 0 ? -1 : 0;
        };
        MathUtils.toInt = function (x) {
            return x > 0 ? Math.floor(x) : Math.ceil(x);
        };
        MathUtils.cbrt = function (x) {
            var y = Math.pow(Math.abs(x), 1 / 3);
            return x < 0 ? -y : y;
        };
        MathUtils.randomTriangular = function (min, max) {
            return MathUtils.randomTriangularWith(min, max, (min + max) * 0.5);
        };
        MathUtils.randomTriangularWith = function (min, max, mode) {
            var u = Math.random();
            var d = max - min;
            if (u <= (mode - min) / d)
                return min + Math.sqrt(u * d * (mode - min));
            return max - Math.sqrt((1 - u) * d * (max - mode));
        };
        MathUtils.isPowerOfTwo = function (value) {
            return value && (value & (value - 1)) === 0;
        };
        MathUtils.PI = 3.1415927;
        MathUtils.PI2 = MathUtils.PI * 2;
        MathUtils.radiansToDegrees = 180 / MathUtils.PI;
        MathUtils.radDeg = MathUtils.radiansToDegrees;
        MathUtils.degreesToRadians = MathUtils.PI / 180;
        MathUtils.degRad = MathUtils.degreesToRadians;
        return MathUtils;
    }());
    /**
     * @public
     */
    var Interpolation = /** @class */ (function () {
        function Interpolation() {
        }
        Interpolation.prototype.apply = function (start, end, a) {
            return start + (end - start) * this.applyInternal(a);
        };
        return Interpolation;
    }());
    /**
     * @public
     */
    var Pow = /** @class */ (function (_super) {
        __extends$2(Pow, _super);
        function Pow(power) {
            var _this = _super.call(this) || this;
            _this.power = 2;
            _this.power = power;
            return _this;
        }
        Pow.prototype.applyInternal = function (a) {
            if (a <= 0.5)
                return Math.pow(a * 2, this.power) / 2;
            return Math.pow((a - 1) * 2, this.power) / (this.power % 2 == 0 ? -2 : 2) + 1;
        };
        return Pow;
    }(Interpolation));
    /**
     * @public
     */
    var PowOut = /** @class */ (function (_super) {
        __extends$2(PowOut, _super);
        function PowOut(power) {
            return _super.call(this, power) || this;
        }
        PowOut.prototype.applyInternal = function (a) {
            return Math.pow(a - 1, this.power) * (this.power % 2 == 0 ? -1 : 1) + 1;
        };
        return PowOut;
    }(Pow));
    /**
     * @public
     */
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.arrayCopy = function (source, sourceStart, dest, destStart, numElements) {
            for (var i = sourceStart, j = destStart; i < sourceStart + numElements; i++, j++) {
                dest[j] = source[i];
            }
        };
        Utils.arrayFill = function (array, fromIndex, toIndex, value) {
            for (var i = fromIndex; i < toIndex; i++)
                array[i] = value;
        };
        Utils.setArraySize = function (array, size, value) {
            if (value === void 0) { value = 0; }
            var oldSize = array.length;
            if (oldSize == size)
                return array;
            array.length = size;
            if (oldSize < size) {
                for (var i = oldSize; i < size; i++)
                    array[i] = value;
            }
            return array;
        };
        Utils.ensureArrayCapacity = function (array, size, value) {
            if (value === void 0) { value = 0; }
            if (array.length >= size)
                return array;
            return Utils.setArraySize(array, size, value);
        };
        Utils.newArray = function (size, defaultValue) {
            var array = new Array(size);
            for (var i = 0; i < size; i++)
                array[i] = defaultValue;
            return array;
        };
        Utils.newFloatArray = function (size) {
            if (Utils.SUPPORTS_TYPED_ARRAYS)
                return new Float32Array(size);
            else {
                var array = new Array(size);
                for (var i = 0; i < array.length; i++)
                    array[i] = 0;
                return array;
            }
        };
        Utils.newShortArray = function (size) {
            if (Utils.SUPPORTS_TYPED_ARRAYS)
                return new Int16Array(size);
            else {
                var array = new Array(size);
                for (var i = 0; i < array.length; i++)
                    array[i] = 0;
                return array;
            }
        };
        Utils.toFloatArray = function (array) {
            return Utils.SUPPORTS_TYPED_ARRAYS ? new Float32Array(array) : array;
        };
        Utils.toSinglePrecision = function (value) {
            return Utils.SUPPORTS_TYPED_ARRAYS ? fround(value) : value;
        };
        // This function is used to fix WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
        Utils.webkit602BugfixHelper = function (alpha, blend) {
        };
        Utils.contains = function (array, element, identity) {
            for (var i = 0; i < array.length; i++)
                if (array[i] == element)
                    return true;
            return false;
        };
        Utils.enumValue = function (type, name) {
            return type[name[0].toUpperCase() + name.slice(1)];
        };
        Utils.SUPPORTS_TYPED_ARRAYS = typeof (Float32Array) !== "undefined";
        return Utils;
    }());
    /**
     * @public
     */
    var DebugUtils = /** @class */ (function () {
        function DebugUtils() {
        }
        DebugUtils.logBones = function (skeleton) {
            for (var i = 0; i < skeleton.bones.length; i++) {
                var bone = skeleton.bones[i];
                var mat = bone.matrix;
                console.log(bone.data.name + ", " + mat.a + ", " + mat.b + ", " + mat.c + ", " + mat.d + ", " + mat.tx + ", " + mat.ty);
            }
        };
        return DebugUtils;
    }());
    /**
     * @public
     */
    var Pool = /** @class */ (function () {
        function Pool(instantiator) {
            this.items = new Array();
            this.instantiator = instantiator;
        }
        Pool.prototype.obtain = function () {
            return this.items.length > 0 ? this.items.pop() : this.instantiator();
        };
        Pool.prototype.free = function (item) {
            if (item.reset)
                item.reset();
            this.items.push(item);
        };
        Pool.prototype.freeAll = function (items) {
            for (var i = 0; i < items.length; i++)
                this.free(items[i]);
        };
        Pool.prototype.clear = function () {
            this.items.length = 0;
        };
        return Pool;
    }());
    /**
     * @public
     */
    var Vector2 = /** @class */ (function () {
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Vector2.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        Vector2.prototype.length = function () {
            var x = this.x;
            var y = this.y;
            return Math.sqrt(x * x + y * y);
        };
        Vector2.prototype.normalize = function () {
            var len = this.length();
            if (len != 0) {
                this.x /= len;
                this.y /= len;
            }
            return this;
        };
        return Vector2;
    }());
    /**
     * @public
     */
    var TimeKeeper = /** @class */ (function () {
        function TimeKeeper() {
            this.maxDelta = 0.064;
            this.framesPerSecond = 0;
            this.delta = 0;
            this.totalTime = 0;
            this.lastTime = Date.now() / 1000;
            this.frameCount = 0;
            this.frameTime = 0;
        }
        TimeKeeper.prototype.update = function () {
            var now = Date.now() / 1000;
            this.delta = now - this.lastTime;
            this.frameTime += this.delta;
            this.totalTime += this.delta;
            if (this.delta > this.maxDelta)
                this.delta = this.maxDelta;
            this.lastTime = now;
            this.frameCount++;
            if (this.frameTime > 1) {
                this.framesPerSecond = this.frameCount / this.frameTime;
                this.frameTime = 0;
                this.frameCount = 0;
            }
        };
        return TimeKeeper;
    }());
    /**
     * @public
     */
    var WindowedMean = /** @class */ (function () {
        function WindowedMean(windowSize) {
            if (windowSize === void 0) { windowSize = 32; }
            this.addedValues = 0;
            this.lastValue = 0;
            this.mean = 0;
            this.dirty = true;
            this.values = new Array(windowSize);
        }
        WindowedMean.prototype.hasEnoughData = function () {
            return this.addedValues >= this.values.length;
        };
        WindowedMean.prototype.addValue = function (value) {
            if (this.addedValues < this.values.length)
                this.addedValues++;
            this.values[this.lastValue++] = value;
            if (this.lastValue > this.values.length - 1)
                this.lastValue = 0;
            this.dirty = true;
        };
        WindowedMean.prototype.getMean = function () {
            if (this.hasEnoughData()) {
                if (this.dirty) {
                    var mean = 0;
                    for (var i = 0; i < this.values.length; i++)
                        mean += this.values[i];
                    this.mean = mean / this.values.length;
                    this.dirty = false;
                }
                return this.mean;
            }
            return 0;
        };
        return WindowedMean;
    }());

    /** Collects each visible BoundingBoxAttachment and computes the world vertices for its polygon. The polygon vertices are
     * provided along with convenience methods for doing hit detection.
     * @public
     * */
    var SkeletonBoundsBase = /** @class */ (function () {
        function SkeletonBoundsBase() {
            /** The left edge of the axis aligned bounding box. */
            this.minX = 0;
            /** The bottom edge of the axis aligned bounding box. */
            this.minY = 0;
            /** The right edge of the axis aligned bounding box. */
            this.maxX = 0;
            /** The top edge of the axis aligned bounding box. */
            this.maxY = 0;
            /** The visible bounding boxes. */
            this.boundingBoxes = new Array();
            /** The world vertices for the bounding box polygons. */
            this.polygons = new Array();
            this.polygonPool = new Pool(function () {
                return Utils.newFloatArray(16);
            });
        }
        /** Clears any previous polygons, finds all visible bounding box attachments, and computes the world vertices for each bounding
         * box's polygon.
         * @param updateAabb If true, the axis aligned bounding box containing all the polygons is computed. If false, the
         *           SkeletonBounds AABB methods will always return true. */
        SkeletonBoundsBase.prototype.update = function (skeleton, updateAabb) {
            if (!skeleton)
                throw new Error("skeleton cannot be null.");
            var boundingBoxes = this.boundingBoxes;
            var polygons = this.polygons;
            var polygonPool = this.polygonPool;
            var slots = skeleton.slots;
            var slotCount = slots.length;
            boundingBoxes.length = 0;
            polygonPool.freeAll(polygons);
            polygons.length = 0;
            for (var i = 0; i < slotCount; i++) {
                var slot = slots[i];
                if (!slot.bone.active)
                    continue;
                var attachment = slot.getAttachment();
                if (attachment != null && attachment.type === exports.AttachmentType.BoundingBox) {
                    var boundingBox = attachment;
                    boundingBoxes.push(boundingBox);
                    var polygon = polygonPool.obtain();
                    if (polygon.length != boundingBox.worldVerticesLength) {
                        polygon = Utils.newFloatArray(boundingBox.worldVerticesLength);
                    }
                    polygons.push(polygon);
                    boundingBox.computeWorldVertices(slot, 0, boundingBox.worldVerticesLength, polygon, 0, 2);
                }
            }
            if (updateAabb) {
                this.aabbCompute();
            }
            else {
                this.minX = Number.POSITIVE_INFINITY;
                this.minY = Number.POSITIVE_INFINITY;
                this.maxX = Number.NEGATIVE_INFINITY;
                this.maxY = Number.NEGATIVE_INFINITY;
            }
        };
        SkeletonBoundsBase.prototype.aabbCompute = function () {
            var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
            var polygons = this.polygons;
            for (var i = 0, n = polygons.length; i < n; i++) {
                var polygon = polygons[i];
                var vertices = polygon;
                for (var ii = 0, nn = polygon.length; ii < nn; ii += 2) {
                    var x = vertices[ii];
                    var y = vertices[ii + 1];
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
            this.minX = minX;
            this.minY = minY;
            this.maxX = maxX;
            this.maxY = maxY;
        };
        /** Returns true if the axis aligned bounding box contains the point. */
        SkeletonBoundsBase.prototype.aabbContainsPoint = function (x, y) {
            return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
        };
        /** Returns true if the axis aligned bounding box intersects the line segment. */
        SkeletonBoundsBase.prototype.aabbIntersectsSegment = function (x1, y1, x2, y2) {
            var minX = this.minX;
            var minY = this.minY;
            var maxX = this.maxX;
            var maxY = this.maxY;
            if ((x1 <= minX && x2 <= minX) || (y1 <= minY && y2 <= minY) || (x1 >= maxX && x2 >= maxX) || (y1 >= maxY && y2 >= maxY))
                return false;
            var m = (y2 - y1) / (x2 - x1);
            var y = m * (minX - x1) + y1;
            if (y > minY && y < maxY)
                return true;
            y = m * (maxX - x1) + y1;
            if (y > minY && y < maxY)
                return true;
            var x = (minY - y1) / m + x1;
            if (x > minX && x < maxX)
                return true;
            x = (maxY - y1) / m + x1;
            if (x > minX && x < maxX)
                return true;
            return false;
        };
        /** Returns true if the axis aligned bounding box intersects the axis aligned bounding box of the specified bounds. */
        SkeletonBoundsBase.prototype.aabbIntersectsSkeleton = function (bounds) {
            return this.minX < bounds.maxX && this.maxX > bounds.minX && this.minY < bounds.maxY && this.maxY > bounds.minY;
        };
        /** Returns the first bounding box attachment that contains the point, or null. When doing many checks, it is usually more
         * efficient to only call this method if {@link #aabbContainsPoint(float, float)} returns true.
         * Cannot be done here because BoundingBoxAttachment is not a thing yet*/
        SkeletonBoundsBase.prototype.containsPoint = function (x, y) {
            var polygons = this.polygons;
            for (var i = 0, n = polygons.length; i < n; i++)
                if (this.containsPointPolygon(polygons[i], x, y))
                    return this.boundingBoxes[i];
            return null;
        };
        /** Returns true if the polygon contains the point. */
        SkeletonBoundsBase.prototype.containsPointPolygon = function (polygon, x, y) {
            var vertices = polygon;
            var nn = polygon.length;
            var prevIndex = nn - 2;
            var inside = false;
            for (var ii = 0; ii < nn; ii += 2) {
                var vertexY = vertices[ii + 1];
                var prevY = vertices[prevIndex + 1];
                if ((vertexY < y && prevY >= y) || (prevY < y && vertexY >= y)) {
                    var vertexX = vertices[ii];
                    if (vertexX + (y - vertexY) / (prevY - vertexY) * (vertices[prevIndex] - vertexX) < x)
                        inside = !inside;
                }
                prevIndex = ii;
            }
            return inside;
        };
        /** Returns the first bounding box attachment that contains any part of the line segment, or null. When doing many checks, it
         * is usually more efficient to only call this method if {@link #aabbIntersectsSegment()} returns
         * true. */
        SkeletonBoundsBase.prototype.intersectsSegment = function (x1, y1, x2, y2) {
            var polygons = this.polygons;
            for (var i = 0, n = polygons.length; i < n; i++)
                if (this.intersectsSegmentPolygon(polygons[i], x1, y1, x2, y2))
                    return this.boundingBoxes[i];
            return null;
        };
        /** Returns true if the polygon contains any part of the line segment. */
        SkeletonBoundsBase.prototype.intersectsSegmentPolygon = function (polygon, x1, y1, x2, y2) {
            var vertices = polygon;
            var nn = polygon.length;
            var width12 = x1 - x2, height12 = y1 - y2;
            var det1 = x1 * y2 - y1 * x2;
            var x3 = vertices[nn - 2], y3 = vertices[nn - 1];
            for (var ii = 0; ii < nn; ii += 2) {
                var x4 = vertices[ii], y4 = vertices[ii + 1];
                var det2 = x3 * y4 - y3 * x4;
                var width34 = x3 - x4, height34 = y3 - y4;
                var det3 = width12 * height34 - height12 * width34;
                var x = (det1 * width34 - width12 * det2) / det3;
                if (((x >= x3 && x <= x4) || (x >= x4 && x <= x3)) && ((x >= x1 && x <= x2) || (x >= x2 && x <= x1))) {
                    var y = (det1 * height34 - height12 * det2) / det3;
                    if (((y >= y3 && y <= y4) || (y >= y4 && y <= y3)) && ((y >= y1 && y <= y2) || (y >= y2 && y <= y1)))
                        return true;
                }
                x3 = x4;
                y3 = y4;
            }
            return false;
        };
        /** Returns the polygon for the specified bounding box, or null. */
        SkeletonBoundsBase.prototype.getPolygon = function (boundingBox) {
            if (!boundingBox)
                throw new Error("boundingBox cannot be null.");
            var index = this.boundingBoxes.indexOf(boundingBox);
            return index == -1 ? null : this.polygons[index];
        };
        /** The width of the axis aligned bounding box. */
        SkeletonBoundsBase.prototype.getWidth = function () {
            return this.maxX - this.minX;
        };
        /** The height of the axis aligned bounding box. */
        SkeletonBoundsBase.prototype.getHeight = function () {
            return this.maxY - this.minY;
        };
        return SkeletonBoundsBase;
    }());

    /**
     * @public
     */
    var settings = {
        yDown: true,
        /**
         * pixi-spine gives option to not fail at certain parsing errors
         * spine-ts fails here
         */
        FAIL_ON_NON_EXISTING_SKIN: false,
        /**
         * past Spine.globalAutoUpdate
         */
        GLOBAL_AUTO_UPDATE: true,
        /**
         * past Spine.globalDelayLimit
         */
        GLOBAL_DELAY_LIMIT: 0,
    };

    var tempRgb = [0, 0, 0];
    /**
     * @public
     */
    var SpineSprite = /** @class */ (function (_super) {
        __extends$2(SpineSprite, _super);
        function SpineSprite() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.region = null;
            _this.attachment = null;
            return _this;
        }
        return SpineSprite;
    }(sprite.Sprite));
    /**
     * @public
     */
    var SpineMesh = /** @class */ (function (_super) {
        __extends$2(SpineMesh, _super);
        function SpineMesh(texture, vertices, uvs, indices, drawMode) {
            var _this = _super.call(this, texture, vertices, uvs, indices, drawMode) || this;
            _this.region = null;
            _this.attachment = null;
            return _this;
        }
        return SpineMesh;
    }(meshExtras.SimpleMesh));
    /**
     * A class that enables the you to import and run your spine animations in pixi.
     * The Spine animation data needs to be loaded using either the Loader or a SpineLoader before it can be used by this class
     * See example 12 (http://www.goodboydigital.com/pixijs/examples/12/) to see a working example and check out the source
     *
     * ```js
     * let spineAnimation = new spine(spineData);
     * ```
     *
     * @public
     * @class
     * @extends Container
     * @memberof spine
     * @param spineData {object} The spine data loaded from a spine atlas.
     */
    var SpineBase = /** @class */ (function (_super) {
        __extends$2(SpineBase, _super);
        function SpineBase(spineData) {
            var _this = _super.call(this) || this;
            if (!spineData) {
                throw new Error('The spineData param is required.');
            }
            if ((typeof spineData) === "string") {
                throw new Error('spineData param cant be string. Please use spine.Spine.fromAtlas("YOUR_RESOURCE_NAME") from now on.');
            }
            /**
             * The spineData object
             *
             * @member {object}
             */
            _this.spineData = spineData;
            /**
             * A spine Skeleton object
             *
             * @member {object}
             */
            _this.createSkeleton(spineData);
            /**
             * An array of containers
             *
             * @member {Container[]}
             */
            _this.slotContainers = [];
            _this.tempClipContainers = [];
            for (var i = 0, n = _this.skeleton.slots.length; i < n; i++) {
                var slot = _this.skeleton.slots[i];
                var attachment = slot.getAttachment();
                var slotContainer = _this.newContainer();
                _this.slotContainers.push(slotContainer);
                _this.addChild(slotContainer);
                _this.tempClipContainers.push(null);
                if (!attachment) {
                    continue;
                }
                if (attachment.type === exports.AttachmentType.Region) {
                    var spriteName = attachment.name;
                    var sprite = _this.createSprite(slot, attachment, spriteName);
                    slot.currentSprite = sprite;
                    slot.currentSpriteName = spriteName;
                    slotContainer.addChild(sprite);
                }
                else if (attachment.type === exports.AttachmentType.Mesh) {
                    var mesh = _this.createMesh(slot, attachment);
                    slot.currentMesh = mesh;
                    slot.currentMeshId = attachment.id;
                    slot.currentMeshName = attachment.name;
                    slotContainer.addChild(mesh);
                }
                else if (attachment.type === exports.AttachmentType.Clipping) {
                    _this.createGraphics(slot, attachment);
                    slotContainer.addChild(slot.clippingContainer);
                    slotContainer.addChild(slot.currentGraphics);
                }
            }
            /**
             * The tint applied to all spine slots. This is a [r,g,b] value. A value of [1,1,1] will remove any tint effect.
             *
             * @member {number}
             * @memberof spine.Spine#
             */
            _this.tintRgb = new Float32Array([1, 1, 1]);
            _this.autoUpdate = true;
            _this.visible = true;
            return _this;
        }
        Object.defineProperty(SpineBase.prototype, "debug", {
            get: function () {
                return this._debug;
            },
            set: function (value) {
                var _a;
                if (value == this._debug) { // soft equality allows null == undefined
                    return;
                }
                (_a = this._debug) === null || _a === void 0 ? void 0 : _a.unregisterSpine(this);
                value === null || value === void 0 ? void 0 : value.registerSpine(this);
                this._debug = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SpineBase.prototype, "autoUpdate", {
            /**
             * If this flag is set to true, the spine animation will be automatically updated every
             * time the object id drawn. The down side of this approach is that the delta time is
             * automatically calculated and you could miss out on cool effects like slow motion,
             * pause, skip ahead and the sorts. Most of these effects can be achieved even with
             * autoUpdate enabled but are harder to achieve.
             *
             * @member {boolean}
             * @memberof spine.Spine#
             * @default true
             */
            get: function () {
                return this._autoUpdate;
            },
            set: function (value) {
                if (value !== this._autoUpdate) {
                    this._autoUpdate = value;
                    this.updateTransform = value ? SpineBase.prototype.autoUpdateTransform : display.Container.prototype.updateTransform;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SpineBase.prototype, "tint", {
            /**
             * The tint applied to the spine object. This is a hex value. A value of 0xFFFFFF will remove any tint effect.
             *
             * @member {number}
             * @memberof spine.Spine#
             * @default 0xFFFFFF
             */
            get: function () {
                return utils.rgb2hex(this.tintRgb);
            },
            set: function (value) {
                this.tintRgb = utils.hex2rgb(value, this.tintRgb);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SpineBase.prototype, "delayLimit", {
            /**
             * Limit value for the update dt with Spine.globalDelayLimit
             * that can be overridden with localDelayLimit
             * @return {number} - Maximum processed dt value for the update
             */
            get: function () {
                var limit = typeof this.localDelayLimit !== "undefined" ?
                    this.localDelayLimit : settings.GLOBAL_DELAY_LIMIT;
                // If limit is 0, this means there is no limit for the delay
                return limit || Number.MAX_VALUE;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Update the spine skeleton and its animations by delta time (dt)
         *
         * @param dt {number} Delta time. Time by which the animation should be updated
         */
        SpineBase.prototype.update = function (dt) {
            var _a;
            // Limit delta value to avoid animation jumps
            var delayLimit = this.delayLimit;
            if (dt > delayLimit)
                dt = delayLimit;
            this.state.update(dt);
            this.state.apply(this.skeleton);
            //check we haven't been destroyed via a spine event callback in state update
            if (!this.skeleton)
                return;
            this.skeleton.updateWorldTransform();
            var slots = this.skeleton.slots;
            // in case pixi has double tint
            var globalClr = this.color;
            var light = null, dark = null;
            if (globalClr) {
                light = globalClr.light;
                dark = globalClr.dark;
            }
            else {
                light = this.tintRgb;
            }
            // let thack = false;
            for (var i = 0, n = slots.length; i < n; i++) {
                var slot = slots[i];
                var attachment = slot.getAttachment();
                var slotContainer = this.slotContainers[i];
                if (!attachment) {
                    slotContainer.visible = false;
                    continue;
                }
                var spriteColor = null;
                if (attachment.sequence) {
                    attachment.sequence.apply(slot, attachment);
                }
                var region = attachment.region;
                var attColor = attachment.color;
                switch (attachment != null && attachment.type) {
                    case exports.AttachmentType.Region:
                        var transform = slotContainer.transform;
                        transform.setFromMatrix(slot.bone.matrix);
                        region = attachment.region;
                        if (slot.currentMesh) {
                            slot.currentMesh.visible = false;
                            slot.currentMesh = null;
                            slot.currentMeshId = undefined;
                            slot.currentMeshName = undefined;
                        }
                        if (!region) {
                            if (slot.currentSprite) {
                                slot.currentSprite.renderable = false;
                            }
                            break;
                        }
                        if (!slot.currentSpriteName || slot.currentSpriteName !== attachment.name) {
                            var spriteName = attachment.name;
                            if (slot.currentSprite) {
                                slot.currentSprite.visible = false;
                            }
                            slot.sprites = slot.sprites || {};
                            if (slot.sprites[spriteName] !== undefined) {
                                slot.sprites[spriteName].visible = true;
                            }
                            else {
                                var sprite = this.createSprite(slot, attachment, spriteName);
                                slotContainer.addChild(sprite);
                            }
                            slot.currentSprite = slot.sprites[spriteName];
                            slot.currentSpriteName = spriteName;
                            // force sprite update when attachment name is same.
                            // issues https://github.com/pixijs/pixi-spine/issues/318
                        }
                        slot.currentSprite.renderable = true;
                        if (!slot.hackRegion) {
                            this.setSpriteRegion(attachment, slot.currentSprite, region);
                        }
                        if (slot.currentSprite.color) {
                            //YAY! double - tint!
                            spriteColor = slot.currentSprite.color;
                        }
                        else {
                            tempRgb[0] = light[0] * slot.color.r * attColor.r;
                            tempRgb[1] = light[1] * slot.color.g * attColor.g;
                            tempRgb[2] = light[2] * slot.color.b * attColor.b;
                            slot.currentSprite.tint = utils.rgb2hex(tempRgb);
                        }
                        slot.currentSprite.blendMode = slot.blendMode;
                        break;
                    case exports.AttachmentType.Mesh:
                        if (slot.currentSprite) {
                            //TODO: refactor this thing, switch it on and off for container
                            slot.currentSprite.visible = false;
                            slot.currentSprite = null;
                            slot.currentSpriteName = undefined;
                            //TODO: refactor this shit
                            var transform_1 = new math.Transform();
                            transform_1._parentID = -1;
                            transform_1._worldID = slotContainer.transform._worldID;
                            slotContainer.transform = transform_1;
                        }
                        if (!region) {
                            if (slot.currentMesh) {
                                slot.currentMesh.renderable = false;
                            }
                            break;
                        }
                        var id = attachment.id;
                        if (!slot.currentMeshId || slot.currentMeshId !== id) {
                            var meshId = id;
                            if (slot.currentMesh) {
                                slot.currentMesh.visible = false;
                            }
                            slot.meshes = slot.meshes || {};
                            if (slot.meshes[meshId] !== undefined) {
                                slot.meshes[meshId].visible = true;
                            }
                            else {
                                var mesh = this.createMesh(slot, attachment);
                                slotContainer.addChild(mesh);
                            }
                            slot.currentMesh = slot.meshes[meshId];
                            slot.currentMeshName = attachment.name;
                            slot.currentMeshId = meshId;
                        }
                        slot.currentMesh.renderable = true;
                        attachment.computeWorldVerticesOld(slot, slot.currentMesh.vertices);
                        if (slot.currentMesh.color) {
                            // pixi-heaven
                            spriteColor = slot.currentMesh.color;
                        }
                        else {
                            tempRgb[0] = light[0] * slot.color.r * attColor.r;
                            tempRgb[1] = light[1] * slot.color.g * attColor.g;
                            tempRgb[2] = light[2] * slot.color.b * attColor.b;
                            slot.currentMesh.tint = utils.rgb2hex(tempRgb);
                        }
                        slot.currentMesh.blendMode = slot.blendMode;
                        if (!slot.hackRegion) {
                            this.setMeshRegion(attachment, slot.currentMesh, region);
                        }
                        break;
                    case exports.AttachmentType.Clipping:
                        if (!slot.currentGraphics) {
                            this.createGraphics(slot, attachment);
                            slotContainer.addChild(slot.clippingContainer);
                            slotContainer.addChild(slot.currentGraphics);
                        }
                        this.updateGraphics(slot, attachment);
                        slotContainer.alpha = 1.0;
                        slotContainer.visible = true;
                        continue;
                    default:
                        slotContainer.visible = false;
                        continue;
                }
                slotContainer.visible = true;
                // pixi has double tint
                if (spriteColor) {
                    var r0 = slot.color.r * attColor.r;
                    var g0 = slot.color.g * attColor.g;
                    var b0 = slot.color.b * attColor.b;
                    //YAY! double-tint!
                    spriteColor.setLight(light[0] * r0 + dark[0] * (1.0 - r0), light[1] * g0 + dark[1] * (1.0 - g0), light[2] * b0 + dark[2] * (1.0 - b0));
                    if (slot.darkColor) {
                        r0 = slot.darkColor.r;
                        g0 = slot.darkColor.g;
                        b0 = slot.darkColor.b;
                    }
                    else {
                        r0 = 0.0;
                        g0 = 0.0;
                        b0 = 0.0;
                    }
                    spriteColor.setDark(light[0] * r0 + dark[0] * (1 - r0), light[1] * g0 + dark[1] * (1 - g0), light[2] * b0 + dark[2] * (1 - b0));
                }
                slotContainer.alpha = slot.color.a;
            }
            //== this is clipping implementation ===
            //TODO: remove parent hacks when pixi masks allow it
            var drawOrder = this.skeleton.drawOrder;
            var clippingAttachment = null;
            var clippingContainer = null;
            for (var i = 0, n = drawOrder.length; i < n; i++) {
                var slot = slots[drawOrder[i].data.index];
                var slotContainer = this.slotContainers[drawOrder[i].data.index];
                if (!clippingContainer) {
                    //Adding null check as it is possible for slotContainer.parent to be null in the event of a spine being disposed off in its loop callback
                    if (slotContainer.parent !== null && slotContainer.parent !== this) {
                        slotContainer.parent.removeChild(slotContainer);
                        //silend add hack
                        slotContainer.parent = this;
                    }
                }
                if (slot.currentGraphics && slot.getAttachment()) {
                    clippingContainer = slot.clippingContainer;
                    clippingAttachment = slot.getAttachment();
                    clippingContainer.children.length = 0;
                    this.children[i] = slotContainer;
                    if (clippingAttachment.endSlot === slot.data) {
                        clippingAttachment.endSlot = null;
                    }
                }
                else {
                    if (clippingContainer) {
                        var c = this.tempClipContainers[i];
                        if (!c) {
                            c = this.tempClipContainers[i] = this.newContainer();
                            c.visible = false;
                        }
                        this.children[i] = c;
                        //silent remove hack
                        slotContainer.parent = null;
                        clippingContainer.addChild(slotContainer);
                        if (clippingAttachment.endSlot == slot.data) {
                            clippingContainer.renderable = true;
                            clippingContainer = null;
                            clippingAttachment = null;
                        }
                    }
                    else {
                        this.children[i] = slotContainer;
                    }
                }
            }
            // if you can debug, then debug!
            (_a = this._debug) === null || _a === void 0 ? void 0 : _a.renderDebug(this);
        };
        SpineBase.prototype.setSpriteRegion = function (attachment, sprite, region) {
            // prevent setters calling when attachment and region is same
            if (sprite.attachment === attachment && sprite.region === region) {
                return;
            }
            sprite.region = region;
            sprite.attachment = attachment;
            sprite.texture = region.texture;
            sprite.rotation = attachment.rotation * MathUtils.degRad;
            sprite.position.x = attachment.x;
            sprite.position.y = attachment.y;
            sprite.alpha = attachment.color.a;
            if (!region.size) {
                sprite.scale.x = attachment.scaleX * attachment.width / region.originalWidth;
                sprite.scale.y = -attachment.scaleY * attachment.height / region.originalHeight;
            }
            else {
                //hacked!
                sprite.scale.x = region.size.width / region.originalWidth;
                sprite.scale.y = -region.size.height / region.originalHeight;
            }
        };
        SpineBase.prototype.setMeshRegion = function (attachment, mesh, region) {
            if (mesh.attachment === attachment && mesh.region === region) {
                return;
            }
            mesh.region = region;
            mesh.attachment = attachment;
            mesh.texture = region.texture;
            region.texture.updateUvs();
            mesh.uvBuffer.update(attachment.regionUVs);
        };
        /**
         * When autoupdate is set to yes this function is used as pixi's updateTransform function
         *
         * @private
         */
        SpineBase.prototype.autoUpdateTransform = function () {
            if (settings.GLOBAL_AUTO_UPDATE) {
                this.lastTime = this.lastTime || Date.now();
                var timeDelta = (Date.now() - this.lastTime) * 0.001;
                this.lastTime = Date.now();
                this.update(timeDelta);
            }
            else {
                this.lastTime = 0;
            }
            display.Container.prototype.updateTransform.call(this);
        };
        /**
         * Create a new sprite to be used with core.RegionAttachment
         *
         * @param slot {spine.Slot} The slot to which the attachment is parented
         * @param attachment {spine.RegionAttachment} The attachment that the sprite will represent
         * @private
         */
        SpineBase.prototype.createSprite = function (slot, attachment, defName) {
            var region = attachment.region;
            if (slot.hackAttachment === attachment) {
                region = slot.hackRegion;
            }
            var texture = region ? region.texture : null;
            var sprite = this.newSprite(texture);
            sprite.anchor.set(0.5);
            if (region) {
                this.setSpriteRegion(attachment, sprite, attachment.region);
            }
            slot.sprites = slot.sprites || {};
            slot.sprites[defName] = sprite;
            return sprite;
        };
        /**
         * Creates a Strip from the spine data
         * @param slot {spine.Slot} The slot to which the attachment is parented
         * @param attachment {spine.RegionAttachment} The attachment that the sprite will represent
         * @private
         */
        SpineBase.prototype.createMesh = function (slot, attachment) {
            var region = attachment.region;
            if (slot.hackAttachment === attachment) {
                region = slot.hackRegion;
                slot.hackAttachment = null;
                slot.hackRegion = null;
            }
            var strip = this.newMesh(region ? region.texture : null, new Float32Array(attachment.regionUVs.length), attachment.regionUVs, new Uint16Array(attachment.triangles), constants.DRAW_MODES.TRIANGLES);
            if (typeof strip._canvasPadding !== "undefined") {
                strip._canvasPadding = 1.5;
            }
            strip.alpha = attachment.color.a;
            strip.region = attachment.region;
            if (region) {
                this.setMeshRegion(attachment, strip, region);
            }
            slot.meshes = slot.meshes || {};
            slot.meshes[attachment.id] = strip;
            return strip;
        };
        //@ts-ignore
        SpineBase.prototype.createGraphics = function (slot, clip) {
            var graphics = this.newGraphics();
            var poly = new math.Polygon([]);
            graphics.clear();
            graphics.beginFill(0xffffff, 1);
            graphics.drawPolygon(poly);
            graphics.renderable = false;
            slot.currentGraphics = graphics;
            slot.clippingContainer = this.newContainer();
            slot.clippingContainer.mask = slot.currentGraphics;
            return graphics;
        };
        SpineBase.prototype.updateGraphics = function (slot, clip) {
            var geom = slot.currentGraphics.geometry;
            var vertices = geom.graphicsData[0].shape.points;
            var n = clip.worldVerticesLength;
            vertices.length = n;
            clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
            geom.invalidate();
        };
        /**
         * Changes texture in attachment in specific slot.
         *
         * PIXI runtime feature, it was made to satisfy our users.
         *
         * @param slotIndex {number}
         * @param [texture = null] {PIXI.Texture} If null, take default (original) texture
         * @param [size = null] {PIXI.Point} sometimes we need new size for region attachment, you can pass 'texture.orig' there
         * @returns {boolean} Success flag
         */
        SpineBase.prototype.hackTextureBySlotIndex = function (slotIndex, texture, size) {
            if (texture === void 0) { texture = null; }
            if (size === void 0) { size = null; }
            var slot = this.skeleton.slots[slotIndex];
            if (!slot) {
                return false;
            }
            var attachment = slot.getAttachment();
            var region = attachment.region;
            if (texture) {
                region = new TextureRegion();
                region.texture = texture;
                region.size = size;
                slot.hackRegion = region;
                slot.hackAttachment = attachment;
            }
            else {
                slot.hackRegion = null;
                slot.hackAttachment = null;
            }
            if (slot.currentSprite) {
                this.setSpriteRegion(attachment, slot.currentSprite, region);
            }
            else if (slot.currentMesh) {
                this.setMeshRegion(attachment, slot.currentMesh, region);
            }
            return true;
        };
        /**
         * Changes texture in attachment in specific slot.
         *
         * PIXI runtime feature, it was made to satisfy our users.
         *
         * @param slotName {string}
         * @param [texture = null] {PIXI.Texture} If null, take default (original) texture
         * @param [size = null] {PIXI.Point} sometimes we need new size for region attachment, you can pass 'texture.orig' there
         * @returns {boolean} Success flag
         */
        SpineBase.prototype.hackTextureBySlotName = function (slotName, texture, size) {
            if (texture === void 0) { texture = null; }
            if (size === void 0) { size = null; }
            var index = this.skeleton.findSlotIndex(slotName);
            if (index == -1) {
                return false;
            }
            return this.hackTextureBySlotIndex(index, texture, size);
        };
        /**
         * Changes texture of an attachment
         *
         * PIXI runtime feature, it was made to satisfy our users.
         *
         * @param slotName {string}
         * @param attachmentName {string}
         * @param [texture = null] {PIXI.Texture} If null, take default (original) texture
         * @param [size = null] {PIXI.Point} sometimes we need new size for region attachment, you can pass 'texture.orig' there
         * @returns {boolean} Success flag
         */
        SpineBase.prototype.hackTextureAttachment = function (slotName, attachmentName, texture, size) {
            if (size === void 0) { size = null; }
            // changes the texture of an attachment at the skeleton level
            var slotIndex = this.skeleton.findSlotIndex(slotName);
            var attachment = this.skeleton.getAttachmentByName(slotName, attachmentName);
            attachment.region.texture = texture;
            var slot = this.skeleton.slots[slotIndex];
            if (!slot) {
                return false;
            }
            // gets the currently active attachment in this slot
            var currentAttachment = slot.getAttachment();
            if (attachmentName === currentAttachment.name) {
                // if the attachment we are changing is currently active, change the the live texture
                var region = attachment.region;
                if (texture) {
                    region = new TextureRegion();
                    region.texture = texture;
                    region.size = size;
                    slot.hackRegion = region;
                    slot.hackAttachment = currentAttachment;
                }
                else {
                    slot.hackRegion = null;
                    slot.hackAttachment = null;
                }
                if (slot.currentSprite && slot.currentSprite.region != region) {
                    this.setSpriteRegion(currentAttachment, slot.currentSprite, region);
                    slot.currentSprite.region = region;
                }
                else if (slot.currentMesh && slot.currentMesh.region != region) {
                    this.setMeshRegion(currentAttachment, slot.currentMesh, region);
                }
                return true;
            }
            return false;
        };
        //those methods can be overriden to spawn different classes
        SpineBase.prototype.newContainer = function () {
            return new display.Container();
        };
        SpineBase.prototype.newSprite = function (tex) {
            return new SpineSprite(tex);
        };
        SpineBase.prototype.newGraphics = function () {
            return new graphics.Graphics();
        };
        SpineBase.prototype.newMesh = function (texture, vertices, uvs, indices, drawMode) {
            return new SpineMesh(texture, vertices, uvs, indices, drawMode);
        };
        SpineBase.prototype.transformHack = function () {
            return 1;
        };
        /**
         * Hack for pixi-display and pixi-lights. Every attachment name ending with a suffix will be added to different layer
         * @param nameSuffix
         * @param group
         * @param outGroup
         */
        SpineBase.prototype.hackAttachmentGroups = function (nameSuffix, group, outGroup) {
            if (!nameSuffix) {
                return undefined;
            }
            var list_d = [], list_n = [];
            for (var i = 0, len = this.skeleton.slots.length; i < len; i++) {
                var slot = this.skeleton.slots[i];
                var name_1 = slot.currentSpriteName || slot.currentMeshName || "";
                var target = slot.currentSprite || slot.currentMesh;
                if (name_1.endsWith(nameSuffix)) {
                    target.parentGroup = group;
                    list_n.push(target);
                }
                else if (outGroup && target) {
                    target.parentGroup = outGroup;
                    list_d.push(target);
                }
            }
            return [list_d, list_n];
        };
        SpineBase.prototype.destroy = function (options) {
            this.debug = null; // setter will do the cleanup
            for (var i = 0, n = this.skeleton.slots.length; i < n; i++) {
                var slot = this.skeleton.slots[i];
                for (var name_2 in slot.meshes) {
                    slot.meshes[name_2].destroy(options);
                }
                slot.meshes = null;
                for (var name_3 in slot.sprites) {
                    slot.sprites[name_3].destroy(options);
                }
                slot.sprites = null;
            }
            for (var i = 0, n = this.slotContainers.length; i < n; i++) {
                this.slotContainers[i].destroy(options);
            }
            this.spineData = null;
            this.skeleton = null;
            this.slotContainers = null;
            this.stateData = null;
            this.state = null;
            this.tempClipContainers = null;
            _super.prototype.destroy.call(this, options);
        };
        SpineBase.clippingPolygon = [];
        return SpineBase;
    }(display.Container));
    /**
     * The visibility of the spine object. If false the object will not be drawn,
     * the updateTransform function will not be called, and the spine will not be automatically updated.
     *
     * @member {boolean}
     * @memberof spine.Spine#
     * @default true
     */
    Object.defineProperty(SpineBase.prototype, 'visible', {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            if (value !== this._visible) {
                this._visible = value;
                if (value) {
                    this.lastTime = 0;
                }
            }
        }
    });

    /**
     * This is a debug renderer that uses PixiJS Graphics under the hood.
     * @public
     */
    var SpineDebugRenderer = /** @class */ (function () {
        function SpineDebugRenderer() {
            this.registeredSpines = new Map();
            this.drawDebug = true;
            this.drawMeshHull = true;
            this.drawMeshTriangles = true;
            this.drawBones = true;
            this.drawPaths = true;
            this.drawBoundingBoxes = true;
            this.drawClipping = true;
            this.drawRegionAttachments = true;
            this.lineWidth = 1;
            this.regionAttachmentsColor = 0x0078ff;
            this.meshHullColor = 0x0078ff;
            this.meshTrianglesColor = 0xffcc00;
            this.clippingPolygonColor = 0xff00ff;
            this.boundingBoxesRectColor = 0x00ff00;
            this.boundingBoxesPolygonColor = 0x00ff00;
            this.boundingBoxesCircleColor = 0x00ff00;
            this.pathsCurveColor = 0xff0000;
            this.pathsLineColor = 0xff00ff;
            this.skeletonXYColor = 0xff0000;
            this.bonesColor = 0x00eecc;
        }
        /**
         * The debug is attached by force to each spine object. So we need to create it inside the spine when we get the first update
         */
        SpineDebugRenderer.prototype.registerSpine = function (spine) {
            if (this.registeredSpines.has(spine)) {
                console.warn("SpineDebugRenderer.registerSpine() - this spine is already registered!", spine);
            }
            var debugDisplayObjects = {
                parentDebugContainer: new display.Container(),
                bones: new display.Container(),
                skeletonXY: new graphics.Graphics(),
                regionAttachmentsShape: new graphics.Graphics(),
                meshTrianglesLine: new graphics.Graphics(),
                meshHullLine: new graphics.Graphics(),
                clippingPolygon: new graphics.Graphics(),
                boundingBoxesRect: new graphics.Graphics(),
                boundingBoxesCircle: new graphics.Graphics(),
                boundingBoxesPolygon: new graphics.Graphics(),
                pathsCurve: new graphics.Graphics(),
                pathsLine: new graphics.Graphics(),
            };
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.bones);
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.skeletonXY);
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.regionAttachmentsShape);
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.meshTrianglesLine);
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.meshHullLine);
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.clippingPolygon);
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.boundingBoxesRect);
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.boundingBoxesCircle);
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.boundingBoxesPolygon);
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.pathsCurve);
            debugDisplayObjects.parentDebugContainer.addChild(debugDisplayObjects.pathsLine);
            spine.addChild(debugDisplayObjects.parentDebugContainer);
            this.registeredSpines.set(spine, debugDisplayObjects);
        };
        SpineDebugRenderer.prototype.renderDebug = function (spine) {
            if (!this.registeredSpines.has(spine)) {
                // This should never happen. Spines are registered when you assign spine.debug
                this.registerSpine(spine);
            }
            var debugDisplayObjects = this.registeredSpines.get(spine);
            debugDisplayObjects.skeletonXY.clear();
            debugDisplayObjects.regionAttachmentsShape.clear();
            debugDisplayObjects.meshTrianglesLine.clear();
            debugDisplayObjects.meshHullLine.clear();
            debugDisplayObjects.clippingPolygon.clear();
            debugDisplayObjects.boundingBoxesRect.clear();
            debugDisplayObjects.boundingBoxesCircle.clear();
            debugDisplayObjects.boundingBoxesPolygon.clear();
            debugDisplayObjects.pathsCurve.clear();
            debugDisplayObjects.pathsLine.clear();
            for (var len = debugDisplayObjects.bones.children.length; len > 0; len--) {
                debugDisplayObjects.bones.children[len - 1].destroy({ children: true, texture: true, baseTexture: true });
            }
            var scale = spine.scale.x || spine.scale.y || 1;
            var lineWidth = this.lineWidth / scale;
            if (this.drawBones) {
                this.drawBonesFunc(spine, debugDisplayObjects, lineWidth, scale);
            }
            if (this.drawPaths) {
                this.drawPathsFunc(spine, debugDisplayObjects, lineWidth);
            }
            if (this.drawBoundingBoxes) {
                this.drawBoundingBoxesFunc(spine, debugDisplayObjects, lineWidth);
            }
            if (this.drawClipping) {
                this.drawClippingFunc(spine, debugDisplayObjects, lineWidth);
            }
            if (this.drawMeshHull || this.drawMeshTriangles) {
                this.drawMeshHullAndMeshTriangles(spine, debugDisplayObjects, lineWidth);
            }
            if (this.drawRegionAttachments) {
                this.drawRegionAttachmentsFunc(spine, debugDisplayObjects, lineWidth);
            }
        };
        SpineDebugRenderer.prototype.drawBonesFunc = function (spine, debugDisplayObjects, lineWidth, scale) {
            var skeleton = spine.skeleton;
            var skeletonX = skeleton.x;
            var skeletonY = skeleton.y;
            var bones = skeleton.bones;
            debugDisplayObjects.skeletonXY.lineStyle(lineWidth, this.skeletonXYColor, 1);
            for (var i = 0, len = bones.length; i < len; i++) {
                var bone = bones[i], boneLen = bone.data.length, starX = skeletonX + bone.matrix.tx, starY = skeletonY + bone.matrix.ty, endX = skeletonX + boneLen * bone.matrix.a + bone.matrix.tx, endY = skeletonY + boneLen * bone.matrix.b + bone.matrix.ty;
                if (bone.data.name === "root" || bone.data.parent === null) {
                    continue;
                }
                // Triangle calculation formula
                // area: A=sqrt((a+b+c)*(-a+b+c)*(a-b+c)*(a+b-c))/4
                // alpha: alpha=acos((pow(b, 2)+pow(c, 2)-pow(a, 2))/(2*b*c))
                // beta: beta=acos((pow(a, 2)+pow(c, 2)-pow(b, 2))/(2*a*c))
                // gamma: gamma=acos((pow(a, 2)+pow(b, 2)-pow(c, 2))/(2*a*b))
                var w = Math.abs(starX - endX), h = Math.abs(starY - endY), 
                // a = w, // side length a
                a2 = Math.pow(w, 2), // square root of side length a
                b = h, // side length b
                b2 = Math.pow(h, 2), // square root of side length b
                c = Math.sqrt(a2 + b2), // side length c
                c2 = Math.pow(c, 2), // square root of side length c
                rad = Math.PI / 180, 
                // A = Math.acos([a2 + c2 - b2] / [2 * a * c]) || 0, // Angle A
                // C = Math.acos([a2 + b2 - c2] / [2 * a * b]) || 0, // C angle
                B = Math.acos((c2 + b2 - a2) / (2 * b * c)) || 0; // angle of corner B
                if (c === 0) {
                    continue;
                }
                var gp = new graphics.Graphics();
                debugDisplayObjects.bones.addChild(gp);
                // draw bone
                var refRation = c / 50 / scale;
                gp.beginFill(this.bonesColor, 1);
                gp.drawPolygon(0, 0, 0 - refRation, c - refRation * 3, 0, c - refRation, 0 + refRation, c - refRation * 3);
                gp.endFill();
                gp.x = starX;
                gp.y = starY;
                gp.pivot.y = c;
                // Calculate bone rotation angle
                var rotation = 0;
                if (starX < endX && starY < endY) {
                    // bottom right
                    rotation = -B + 180 * rad;
                }
                else if (starX > endX && starY < endY) {
                    // bottom left
                    rotation = 180 * rad + B;
                }
                else if (starX > endX && starY > endY) {
                    // top left
                    rotation = -B;
                }
                else if (starX < endX && starY > endY) {
                    // bottom left
                    rotation = B;
                }
                else if (starY === endY && starX < endX) {
                    // To the right
                    rotation = 90 * rad;
                }
                else if (starY === endY && starX > endX) {
                    // go left
                    rotation = -90 * rad;
                }
                else if (starX === endX && starY < endY) {
                    // down
                    rotation = 180 * rad;
                }
                else if (starX === endX && starY > endY) {
                    // up
                    rotation = 0;
                }
                gp.rotation = rotation;
                // Draw the starting rotation point of the bone
                gp.lineStyle(lineWidth + refRation / 2.4, this.bonesColor, 1);
                gp.beginFill(0x000000, 0.6);
                gp.drawCircle(0, c, refRation * 1.2);
                gp.endFill();
            }
            // Draw the skeleton starting point "X" form
            var startDotSize = lineWidth * 3;
            debugDisplayObjects.skeletonXY.moveTo(skeletonX - startDotSize, skeletonY - startDotSize);
            debugDisplayObjects.skeletonXY.lineTo(skeletonX + startDotSize, skeletonY + startDotSize);
            debugDisplayObjects.skeletonXY.moveTo(skeletonX + startDotSize, skeletonY - startDotSize);
            debugDisplayObjects.skeletonXY.lineTo(skeletonX - startDotSize, skeletonY + startDotSize);
        };
        SpineDebugRenderer.prototype.drawRegionAttachmentsFunc = function (spine, debugDisplayObjects, lineWidth) {
            var skeleton = spine.skeleton;
            var slots = skeleton.slots;
            debugDisplayObjects.regionAttachmentsShape.lineStyle(lineWidth, this.regionAttachmentsColor, 1);
            for (var i = 0, len = slots.length; i < len; i++) {
                var slot = slots[i], attachment = slot.getAttachment();
                if (attachment == null || attachment.type !== exports.AttachmentType.Region) {
                    continue;
                }
                var regionAttachment = attachment;
                var vertices = new Float32Array(8);
                regionAttachment === null || regionAttachment === void 0 ? void 0 : regionAttachment.updateOffset(); // We don't need this on all versions
                regionAttachment.computeWorldVertices(slot, vertices, 0, 2);
                debugDisplayObjects.regionAttachmentsShape.drawPolygon(Array.from(vertices.slice(0, 8)));
            }
        };
        SpineDebugRenderer.prototype.drawMeshHullAndMeshTriangles = function (spine, debugDisplayObjects, lineWidth) {
            var skeleton = spine.skeleton;
            var slots = skeleton.slots;
            debugDisplayObjects.meshHullLine.lineStyle(lineWidth, this.meshHullColor, 1);
            debugDisplayObjects.meshTrianglesLine.lineStyle(lineWidth, this.meshTrianglesColor, 1);
            for (var i = 0, len = slots.length; i < len; i++) {
                var slot = slots[i];
                if (!slot.bone.active) {
                    continue;
                }
                var attachment = slot.getAttachment();
                if (attachment == null || attachment.type !== exports.AttachmentType.Mesh) {
                    continue;
                }
                var meshAttachment = attachment;
                var vertices = new Float32Array(meshAttachment.worldVerticesLength), triangles = meshAttachment.triangles;
                var hullLength = meshAttachment.hullLength;
                meshAttachment.computeWorldVertices(slot, 0, meshAttachment.worldVerticesLength, vertices, 0, 2);
                // draw the skinned mesh (triangle)
                if (this.drawMeshTriangles) {
                    for (var i_1 = 0, len_1 = triangles.length; i_1 < len_1; i_1 += 3) {
                        var v1 = triangles[i_1] * 2, v2 = triangles[i_1 + 1] * 2, v3 = triangles[i_1 + 2] * 2;
                        debugDisplayObjects.meshTrianglesLine.moveTo(vertices[v1], vertices[v1 + 1]);
                        debugDisplayObjects.meshTrianglesLine.lineTo(vertices[v2], vertices[v2 + 1]);
                        debugDisplayObjects.meshTrianglesLine.lineTo(vertices[v3], vertices[v3 + 1]);
                    }
                }
                // draw skin border
                if (this.drawMeshHull && hullLength > 0) {
                    hullLength = (hullLength >> 1) * 2;
                    var lastX = vertices[hullLength - 2], lastY = vertices[hullLength - 1];
                    for (var i_2 = 0, len_2 = hullLength; i_2 < len_2; i_2 += 2) {
                        var x = vertices[i_2], y = vertices[i_2 + 1];
                        debugDisplayObjects.meshHullLine.moveTo(x, y);
                        debugDisplayObjects.meshHullLine.lineTo(lastX, lastY);
                        lastX = x;
                        lastY = y;
                    }
                }
            }
        };
        SpineDebugRenderer.prototype.drawClippingFunc = function (spine, debugDisplayObjects, lineWidth) {
            var skeleton = spine.skeleton;
            var slots = skeleton.slots;
            debugDisplayObjects.clippingPolygon.lineStyle(lineWidth, this.clippingPolygonColor, 1);
            for (var i = 0, len = slots.length; i < len; i++) {
                var slot = slots[i];
                if (!slot.bone.active) {
                    continue;
                }
                var attachment = slot.getAttachment();
                if (attachment == null || attachment.type !== exports.AttachmentType.Clipping) {
                    continue;
                }
                var clippingAttachment = attachment;
                var nn = clippingAttachment.worldVerticesLength, world = new Float32Array(nn);
                clippingAttachment.computeWorldVertices(slot, 0, nn, world, 0, 2);
                debugDisplayObjects.clippingPolygon.drawPolygon(Array.from(world));
            }
        };
        SpineDebugRenderer.prototype.drawBoundingBoxesFunc = function (spine, debugDisplayObjects, lineWidth) {
            var _this = this;
            // draw the total outline of the bounding box
            debugDisplayObjects.boundingBoxesRect.lineStyle(lineWidth, this.boundingBoxesRectColor, 5);
            var bounds = new SkeletonBoundsBase();
            bounds.update(spine.skeleton, true);
            debugDisplayObjects.boundingBoxesRect.drawRect(bounds.minX, bounds.minY, bounds.getWidth(), bounds.getHeight());
            var polygons = bounds.polygons, drawPolygon = function (polygonVertices, _offset, count) {
                debugDisplayObjects.boundingBoxesPolygon.lineStyle(lineWidth, _this.boundingBoxesPolygonColor, 1);
                debugDisplayObjects.boundingBoxesPolygon.beginFill(_this.boundingBoxesPolygonColor, 0.1);
                if (count < 3) {
                    throw new Error("Polygon must contain at least 3 vertices");
                }
                var paths = [], dotSize = lineWidth * 2;
                for (var i = 0, len = polygonVertices.length; i < len; i += 2) {
                    var x1 = polygonVertices[i], y1 = polygonVertices[i + 1];
                    // draw the bounding box node
                    debugDisplayObjects.boundingBoxesCircle.lineStyle(0);
                    debugDisplayObjects.boundingBoxesCircle.beginFill(_this.boundingBoxesCircleColor);
                    debugDisplayObjects.boundingBoxesCircle.drawCircle(x1, y1, dotSize);
                    debugDisplayObjects.boundingBoxesCircle.endFill();
                    paths.push(x1, y1);
                }
                // draw the bounding box area
                debugDisplayObjects.boundingBoxesPolygon.drawPolygon(paths);
                debugDisplayObjects.boundingBoxesPolygon.endFill();
            };
            for (var i = 0, len = polygons.length; i < len; i++) {
                var polygon = polygons[i];
                drawPolygon(polygon, 0, polygon.length);
            }
        };
        SpineDebugRenderer.prototype.drawPathsFunc = function (spine, debugDisplayObjects, lineWidth) {
            var skeleton = spine.skeleton;
            var slots = skeleton.slots;
            debugDisplayObjects.pathsCurve.lineStyle(lineWidth, this.pathsCurveColor, 1);
            debugDisplayObjects.pathsLine.lineStyle(lineWidth, this.pathsLineColor, 1);
            for (var i = 0, len = slots.length; i < len; i++) {
                var slot = slots[i];
                if (!slot.bone.active) {
                    continue;
                }
                var attachment = slot.getAttachment();
                if (attachment == null || attachment.type !== exports.AttachmentType.Path) {
                    continue;
                }
                var pathAttachment = attachment;
                var nn = pathAttachment.worldVerticesLength;
                var world = new Float32Array(nn);
                pathAttachment.computeWorldVertices(slot, 0, nn, world, 0, 2);
                var x1 = world[2], y1 = world[3], x2 = 0, y2 = 0;
                if (pathAttachment.closed) {
                    var cx1 = world[0], cy1 = world[1], cx2 = world[nn - 2], cy2 = world[nn - 1];
                    x2 = world[nn - 4];
                    y2 = world[nn - 3];
                    // curve
                    debugDisplayObjects.pathsCurve.moveTo(x1, y1);
                    debugDisplayObjects.pathsCurve.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
                    // handle
                    debugDisplayObjects.pathsLine.moveTo(x1, y1);
                    debugDisplayObjects.pathsLine.lineTo(cx1, cy1);
                    debugDisplayObjects.pathsLine.moveTo(x2, y2);
                    debugDisplayObjects.pathsLine.lineTo(cx2, cy2);
                }
                nn -= 4;
                for (var ii = 4; ii < nn; ii += 6) {
                    var cx1 = world[ii], cy1 = world[ii + 1], cx2 = world[ii + 2], cy2 = world[ii + 3];
                    x2 = world[ii + 4];
                    y2 = world[ii + 5];
                    // curve
                    debugDisplayObjects.pathsCurve.moveTo(x1, y1);
                    debugDisplayObjects.pathsCurve.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
                    // handle
                    debugDisplayObjects.pathsLine.moveTo(x1, y1);
                    debugDisplayObjects.pathsLine.lineTo(cx1, cy1);
                    debugDisplayObjects.pathsLine.moveTo(x2, y2);
                    debugDisplayObjects.pathsLine.lineTo(cx2, cy2);
                    x1 = x2;
                    y1 = y2;
                }
            }
        };
        SpineDebugRenderer.prototype.unregisterSpine = function (spine) {
            if (!this.registeredSpines.has(spine)) {
                console.warn("SpineDebugRenderer.unregisterSpine() - spine is not registered, can't unregister!", spine);
            }
            var debugDisplayObjects = this.registeredSpines.get(spine);
            debugDisplayObjects.parentDebugContainer.destroy({ baseTexture: true, children: true, texture: true });
            this.registeredSpines.delete(spine);
        };
        return SpineDebugRenderer;
    }());

    /* eslint-disable */

    function isJson(resource) {
        return resource.type === loaders.LoaderResource.TYPE.JSON;
    }
    function isBuffer(resource) {
        return resource.xhrType === loaders.LoaderResource.XHR_RESPONSE_TYPE.BUFFER;
    }
    loaders.LoaderResource.setExtensionXhrType('skel', loaders.LoaderResource.XHR_RESPONSE_TYPE.BUFFER);
    /**
     * @public
     */
    var AbstractSpineParser = /** @class */ (function () {
        function AbstractSpineParser() {
        }
        AbstractSpineParser.prototype.genMiddleware = function () {
            var self = this;
            return {
                use: function (resource, next) {
                    // skip if no data, its not json, or it isn't atlas data
                    if (!resource.data) {
                        return next();
                    }
                    var isJsonSpineModel = isJson(resource) && resource.data.bones;
                    var isBinarySpineModel = isBuffer(resource) && (resource.extension === 'skel' || resource.metadata
                        && resource.metadata.spineMetadata);
                    if (!isJsonSpineModel && !isBinarySpineModel) {
                        return next();
                    }
                    var parser = null;
                    var dataToParse = resource.data;
                    if (isJsonSpineModel) {
                        parser = self.createJsonParser();
                    }
                    else {
                        parser = self.createBinaryParser();
                        if (resource.data instanceof ArrayBuffer) {
                            dataToParse = new Uint8Array(resource.data);
                        }
                    }
                    var metadata = (resource.metadata || {});
                    var metadataSkeletonScale = metadata ? metadata.spineSkeletonScale : null;
                    if (metadataSkeletonScale) {
                        parser.scale = metadataSkeletonScale;
                    }
                    var metadataAtlas = metadata.spineAtlas;
                    if (metadataAtlas === false) {
                        return next();
                    }
                    if (metadataAtlas && metadataAtlas.pages) {
                        self.parseData(resource, parser, metadataAtlas, dataToParse);
                        return next();
                    }
                    var metadataAtlasSuffix = metadata.spineAtlasSuffix || '.atlas';
                    /**
                     * use a bit of hackery to load the atlas file, here we assume that the .json, .atlas and .png files
                     * that correspond to the spine file are in the same base URL and that the .json and .atlas files
                     * have the same name
                     */
                    var atlasPath = resource.url;
                    var queryStringPos = atlasPath.indexOf('?');
                    if (queryStringPos > 0) {
                        //remove querystring
                        atlasPath = atlasPath.substr(0, queryStringPos);
                    }
                    atlasPath = atlasPath.substr(0, atlasPath.lastIndexOf('.')) + metadataAtlasSuffix;
                    // use atlas path as a params. (no need to use same atlas file name with json file name)
                    if (metadata.spineAtlasFile) {
                        atlasPath = metadata.spineAtlasFile;
                    }
                    //remove the baseUrl
                    atlasPath = atlasPath.replace(this.baseUrl, '');
                    var atlasOptions = {
                        crossOrigin: resource.crossOrigin,
                        xhrType: loaders.LoaderResource.XHR_RESPONSE_TYPE.TEXT,
                        metadata: metadata.spineMetadata || null,
                        parentResource: resource
                    };
                    var imageOptions = {
                        crossOrigin: resource.crossOrigin,
                        metadata: metadata.imageMetadata || null,
                        parentResource: resource
                    };
                    var baseUrl = resource.url.substr(0, resource.url.lastIndexOf('/') + 1);
                    //remove the baseUrl
                    baseUrl = baseUrl.replace(this.baseUrl, '');
                    var namePrefix = metadata.imageNamePrefix || (resource.name + '_atlas_page_');
                    var adapter = metadata.images ? staticImageLoader(metadata.images)
                        : metadata.image ? staticImageLoader({ 'default': metadata.image })
                            : metadata.imageLoader ? metadata.imageLoader(this, namePrefix, baseUrl, imageOptions)
                                : imageLoaderAdapter(this, namePrefix, baseUrl, imageOptions);
                    function createSkeletonWithRawAtlas(rawData) {
                        new TextureAtlas(rawData, adapter, function (spineAtlas) {
                            if (spineAtlas) {
                                self.parseData(resource, parser, spineAtlas, dataToParse);
                            }
                            next();
                        });
                    }
                    if (metadata.atlasRawData) {
                        createSkeletonWithRawAtlas(metadata.atlasRawData);
                    }
                    else {
                        this.add(resource.name + '_atlas', atlasPath, atlasOptions, function (atlasResource) {
                            if (!atlasResource.error) {
                                createSkeletonWithRawAtlas(atlasResource.data);
                            }
                            else {
                                next();
                            }
                        });
                    }
                }
            };
        };
        return AbstractSpineParser;
    }());
    /**
     * @public
     */
    function imageLoaderAdapter(loader, namePrefix, baseUrl, imageOptions) {
        if (baseUrl && baseUrl.lastIndexOf('/') !== (baseUrl.length - 1)) {
            baseUrl += '/';
        }
        return function (line, callback) {
            var name = namePrefix + line;
            var url = baseUrl + line;
            var cachedResource = loader.resources[name];
            if (cachedResource) {
                var done = function () {
                    callback(cachedResource.texture.baseTexture);
                };
                if (cachedResource.texture) {
                    done();
                }
                else {
                    cachedResource.onAfterMiddleware.add(done);
                }
            }
            else {
                loader.add(name, url, imageOptions, function (resource) {
                    if (!resource.error) {
                        if (line.indexOf('-pma.') >= 0) {
                            resource.texture.baseTexture.alphaMode = constants.ALPHA_MODES.PMA;
                        }
                        callback(resource.texture.baseTexture);
                    }
                    else {
                        callback(null);
                    }
                });
            }
        };
    }
    /**
     * @public
     */
    function syncImageLoaderAdapter(baseUrl, crossOrigin) {
        if (baseUrl && baseUrl.lastIndexOf('/') !== (baseUrl.length - 1)) {
            baseUrl += '/';
        }
        return function (line, callback) {
            callback(core.BaseTexture.from(line, crossOrigin));
        };
    }
    /**
     * @public
     */
    function staticImageLoader(pages) {
        return function (line, callback) {
            var page = pages[line] || pages['default'];
            if (page && page.baseTexture)
                callback(page.baseTexture);
            else
                callback(page);
        };
    }

    /* eslint-disable */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics$1 = function(d, b) {
        extendStatics$1 = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics$1(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * The base class for all attachments.
     * @public
     */
    var Attachment = /** @class */ (function () {
        function Attachment(name) {
            if (!name)
                throw new Error("name cannot be null.");
            this.name = name;
        }
        return Attachment;
    }());
    /**
     * Base class for an attachment with vertices that are transformed by one or more bones and can be deformed by a slot's
     * {@link Slot#deform}.
     * @public
     */
    var VertexAttachment = /** @class */ (function (_super) {
        __extends$1(VertexAttachment, _super);
        function VertexAttachment(name) {
            var _this = _super.call(this, name) || this;
            /** The unique ID for this attachment. */
            _this.id = VertexAttachment.nextID++;
            /** The bones which affect the {@link #getVertices()}. The array entries are, for each vertex, the number of bones affecting
             * the vertex followed by that many bone indices, which is the index of the bone in {@link Skeleton#bones}. Will be null
             * if this attachment has no weights. */
            _this.bones = null;
            /** The vertex positions in the bone's coordinate system. For a non-weighted attachment, the values are `x,y`
             * entries for each vertex. For a weighted attachment, the values are `x,y,weight` entries for each bone affecting
             * each vertex. */
            _this.vertices = [];
            /** The maximum number of world vertex values that can be output by
             * {@link #computeWorldVertices()} using the `count` parameter. */
            _this.worldVerticesLength = 0;
            /** Timelines for the timeline attachment are also applied to this attachment.
             * May be null if no attachment-specific timelines should be applied. */
            _this.timelineAttachment = _this;
            return _this;
        }
        VertexAttachment.prototype.computeWorldVerticesOld = function (slot, worldVertices) {
            this.computeWorldVertices(slot, 0, this.worldVerticesLength, worldVertices, 0, 2);
        };
        /** Transforms the attachment's local {@link #vertices} to world coordinates. If the slot's {@link Slot#deform} is
         * not empty, it is used to deform the vertices.
         *
         * See [World transforms](http://esotericsoftware.com/spine-runtime-skeletons#World-transforms) in the Spine
         * Runtimes Guide.
         * @param start The index of the first {@link #vertices} value to transform. Each vertex has 2 values, x and y.
         * @param count The number of world vertex values to output. Must be <= {@link #worldVerticesLength} - `start`.
         * @param worldVertices The output world vertices. Must have a length >= `offset` + `count` *
         *           `stride` / 2.
         * @param offset The `worldVertices` index to begin writing values.
         * @param stride The number of `worldVertices` entries between the value pairs written. */
        VertexAttachment.prototype.computeWorldVertices = function (slot, start, count, worldVertices, offset, stride) {
            count = offset + (count >> 1) * stride;
            var skeleton = slot.bone.skeleton;
            var deformArray = slot.deform;
            var vertices = this.vertices;
            var bones = this.bones;
            if (!bones) {
                if (deformArray.length > 0)
                    vertices = deformArray;
                var mat = slot.bone.matrix;
                var x = mat.tx;
                var y = mat.ty;
                var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                for (var v_1 = start, w = offset; w < count; v_1 += 2, w += stride) {
                    var vx = vertices[v_1], vy = vertices[v_1 + 1];
                    worldVertices[w] = vx * a + vy * b + x;
                    worldVertices[w + 1] = vx * c + vy * d + y;
                }
                return;
            }
            var v = 0, skip = 0;
            for (var i = 0; i < start; i += 2) {
                var n = bones[v];
                v += n + 1;
                skip += n;
            }
            var skeletonBones = skeleton.bones;
            if (deformArray.length == 0) {
                for (var w = offset, b = skip * 3; w < count; w += stride) {
                    var wx = 0, wy = 0;
                    var n = bones[v++];
                    n += v;
                    for (; v < n; v++, b += 3) {
                        var mat = skeletonBones[bones[v]].matrix;
                        var vx = vertices[b], vy = vertices[b + 1], weight = vertices[b + 2];
                        wx += (vx * mat.a + vy * mat.c + mat.tx) * weight;
                        wy += (vx * mat.b + vy * mat.d + mat.ty) * weight;
                    }
                    worldVertices[w] = wx;
                    worldVertices[w + 1] = wy;
                }
            }
            else {
                var deform = deformArray;
                for (var w = offset, b = skip * 3, f = skip << 1; w < count; w += stride) {
                    var wx = 0, wy = 0;
                    var n = bones[v++];
                    n += v;
                    for (; v < n; v++, b += 3, f += 2) {
                        var mat = skeletonBones[bones[v]].matrix;
                        var vx = vertices[b] + deform[f], vy = vertices[b + 1] + deform[f + 1], weight = vertices[b + 2];
                        wx += (vx * mat.a + vy * mat.c + mat.tx) * weight;
                        wy += (vx * mat.b + vy * mat.d + mat.ty) * weight;
                    }
                    worldVertices[w] = wx;
                    worldVertices[w + 1] = wy;
                }
            }
        };
        /** Does not copy id (generated) or name (set on construction). **/
        VertexAttachment.prototype.copyTo = function (attachment) {
            if (this.bones) {
                attachment.bones = new Array(this.bones.length);
                Utils.arrayCopy(this.bones, 0, attachment.bones, 0, this.bones.length);
            }
            else
                attachment.bones = null;
            if (this.vertices) {
                attachment.vertices = Utils.newFloatArray(this.vertices.length);
                Utils.arrayCopy(this.vertices, 0, attachment.vertices, 0, this.vertices.length);
            }
            attachment.worldVerticesLength = this.worldVerticesLength;
            attachment.timelineAttachment = this.timelineAttachment;
        };
        VertexAttachment.nextID = 0;
        return VertexAttachment;
    }(Attachment));

    /**
     * @public
     */
    var BoundingBoxAttachment = /** @class */ (function (_super) {
        __extends$1(BoundingBoxAttachment, _super);
        function BoundingBoxAttachment(name) {
            var _this = _super.call(this, name) || this;
            _this.type = exports.AttachmentType.BoundingBox;
            _this.color = new Color(1, 1, 1, 1);
            return _this;
        }
        BoundingBoxAttachment.prototype.copy = function () {
            var copy = new BoundingBoxAttachment(this.name);
            this.copyTo(copy);
            copy.color.setFromColor(this.color);
            return copy;
        };
        return BoundingBoxAttachment;
    }(VertexAttachment));

    /**
     * @public
     */
    var ClippingAttachment = /** @class */ (function (_super) {
        __extends$1(ClippingAttachment, _super);
        function ClippingAttachment(name) {
            var _this = _super.call(this, name) || this;
            _this.type = exports.AttachmentType.Clipping;
            /** Clipping is performed between the clipping polygon's slot and the end slot. Returns null if clipping is done until the end of
             * the skeleton's rendering. */
            _this.endSlot = null;
            // Nonessential.
            /** The color of the clipping polygon as it was in Spine. Available only when nonessential data was exported. Clipping polygons
             * are not usually rendered at runtime. */
            _this.color = new Color(0.2275, 0.2275, 0.8078, 1); // ce3a3aff
            return _this;
        }
        ClippingAttachment.prototype.copy = function () {
            var copy = new ClippingAttachment(this.name);
            this.copyTo(copy);
            copy.endSlot = this.endSlot;
            copy.color.setFromColor(this.color);
            return copy;
        };
        return ClippingAttachment;
    }(VertexAttachment));

    /**
     * @public
     */
    var MeshAttachment = /** @class */ (function (_super) {
        __extends$1(MeshAttachment, _super);
        function MeshAttachment(name, path) {
            var _this = _super.call(this, name) || this;
            _this.type = exports.AttachmentType.Mesh;
            _this.region = null;
            /** Triplets of vertex indices which describe the mesh's triangulation. */
            _this.triangles = [];
            /** The color to tint the mesh. */
            _this.color = new Color(1, 1, 1, 1);
            /** The width of the mesh's image. Available only when nonessential data was exported. */
            _this.width = 0;
            /** The height of the mesh's image. Available only when nonessential data was exported. */
            _this.height = 0;
            /** The number of entries at the beginning of {@link #vertices} that make up the mesh hull. */
            _this.hullLength = 0;
            /** Vertex index pairs describing edges for controling triangulation. Mesh triangles will never cross edges. Only available if
             * nonessential data was exported. Triangulation is not performed at runtime. */
            _this.edges = [];
            _this.parentMesh = null;
            _this.sequence = null;
            _this.tempColor = new Color(0, 0, 0, 0);
            _this.path = path;
            return _this;
        }
        /** The parent mesh if this is a linked mesh, else null. A linked mesh shares the {@link #bones}, {@link #vertices},
         * {@link #regionUVs}, {@link #triangles}, {@link #hullLength}, {@link #edges}, {@link #width}, and {@link #height} with the
         * parent mesh, but may have a different {@link #name} or {@link #path} (and therefore a different texture). */
        MeshAttachment.prototype.getParentMesh = function () {
            return this.parentMesh;
        };
        /** @param parentMesh May be null. */
        MeshAttachment.prototype.setParentMesh = function (parentMesh) {
            this.parentMesh = parentMesh;
            if (parentMesh) {
                this.bones = parentMesh.bones;
                this.vertices = parentMesh.vertices;
                this.worldVerticesLength = parentMesh.worldVerticesLength;
                this.regionUVs = parentMesh.regionUVs;
                this.triangles = parentMesh.triangles;
                this.hullLength = parentMesh.hullLength;
                this.worldVerticesLength = parentMesh.worldVerticesLength;
            }
        };
        MeshAttachment.prototype.copy = function () {
            if (this.parentMesh)
                return this.newLinkedMesh();
            var copy = new MeshAttachment(this.name, this.path);
            copy.region = this.region;
            copy.color.setFromColor(this.color);
            this.copyTo(copy);
            copy.regionUVs = new Float32Array(this.regionUVs.length);
            Utils.arrayCopy(this.regionUVs, 0, copy.regionUVs, 0, this.regionUVs.length);
            copy.triangles = new Array(this.triangles.length);
            Utils.arrayCopy(this.triangles, 0, copy.triangles, 0, this.triangles.length);
            copy.hullLength = this.hullLength;
            copy.sequence = this.sequence != null ? this.sequence.copy() : null;
            // Nonessential.
            if (this.edges) {
                copy.edges = new Array(this.edges.length);
                Utils.arrayCopy(this.edges, 0, copy.edges, 0, this.edges.length);
            }
            copy.width = this.width;
            copy.height = this.height;
            return copy;
        };
        MeshAttachment.prototype.computeWorldVertices = function (slot, start, count, worldVertices, offset, stride) {
            if (this.sequence != null)
                this.sequence.apply(slot, this);
            _super.prototype.computeWorldVertices.call(this, slot, start, count, worldVertices, offset, stride);
        };
        /** Returns a new mesh with the {@link #parentMesh} set to this mesh's parent mesh, if any, else to this mesh. **/
        MeshAttachment.prototype.newLinkedMesh = function () {
            var copy = new MeshAttachment(this.name, this.path);
            copy.region = this.region;
            copy.color.setFromColor(this.color);
            copy.timelineAttachment = this.timelineAttachment;
            copy.setParentMesh(this.parentMesh ? this.parentMesh : this);
            // if (copy.region != null) copy.updateRegion();
            return copy;
        };
        return MeshAttachment;
    }(VertexAttachment));

    /**
     * @public
     */
    var PathAttachment = /** @class */ (function (_super) {
        __extends$1(PathAttachment, _super);
        function PathAttachment(name) {
            var _this = _super.call(this, name) || this;
            _this.type = exports.AttachmentType.Path;
            /** The lengths along the path in the setup pose from the start of the path to the end of each Bezier curve. */
            _this.lengths = [];
            /** If true, the start and end knots are connected. */
            _this.closed = false;
            /** If true, additional calculations are performed to make calculating positions along the path more accurate. If false, fewer
             * calculations are performed but calculating positions along the path is less accurate. */
            _this.constantSpeed = false;
            /** The color of the path as it was in Spine. Available only when nonessential data was exported. Paths are not usually
             * rendered at runtime. */
            _this.color = new Color(1, 1, 1, 1);
            return _this;
        }
        PathAttachment.prototype.copy = function () {
            var copy = new PathAttachment(this.name);
            this.copyTo(copy);
            copy.lengths = new Array(this.lengths.length);
            Utils.arrayCopy(this.lengths, 0, copy.lengths, 0, this.lengths.length);
            copy.closed = closed;
            copy.constantSpeed = this.constantSpeed;
            copy.color.setFromColor(this.color);
            return copy;
        };
        return PathAttachment;
    }(VertexAttachment));

    /**
     * @public
     */
    var PointAttachment = /** @class */ (function (_super) {
        __extends$1(PointAttachment, _super);
        function PointAttachment(name) {
            var _this = _super.call(this, name) || this;
            _this.type = exports.AttachmentType.Point;
            _this.x = 0;
            _this.y = 0;
            _this.rotation = 0;
            /** The color of the point attachment as it was in Spine. Available only when nonessential data was exported. Point attachments
             * are not usually rendered at runtime. */
            _this.color = new Color(0.38, 0.94, 0, 1);
            return _this;
        }
        PointAttachment.prototype.computeWorldPosition = function (bone, point) {
            var mat = bone.matrix;
            point.x = this.x * mat.a + this.y * mat.c + bone.worldX;
            point.y = this.x * mat.b + this.y * mat.d + bone.worldY;
            return point;
        };
        PointAttachment.prototype.computeWorldRotation = function (bone) {
            var mat = bone.matrix;
            var cos = MathUtils.cosDeg(this.rotation), sin = MathUtils.sinDeg(this.rotation);
            var x = cos * mat.a + sin * mat.c;
            var y = cos * mat.b + sin * mat.d;
            return Math.atan2(y, x) * MathUtils.radDeg;
        };
        PointAttachment.prototype.copy = function () {
            var copy = new PointAttachment(this.name);
            copy.x = this.x;
            copy.y = this.y;
            copy.rotation = this.rotation;
            copy.color.setFromColor(this.color);
            return copy;
        };
        return PointAttachment;
    }(VertexAttachment));

    /**
     * @public
     */
    var RegionAttachment = /** @class */ (function (_super) {
        __extends$1(RegionAttachment, _super);
        function RegionAttachment(name, path) {
            var _this = _super.call(this, name) || this;
            _this.type = exports.AttachmentType.Region;
            /** The local x translation. */
            _this.x = 0;
            /** The local y translation. */
            _this.y = 0;
            /** The local scaleX. */
            _this.scaleX = 1;
            /** The local scaleY. */
            _this.scaleY = 1;
            /** The local rotation. */
            _this.rotation = 0;
            /** The width of the region attachment in Spine. */
            _this.width = 0;
            /** The height of the region attachment in Spine. */
            _this.height = 0;
            /** The color to tint the region attachment. */
            _this.color = new Color(1, 1, 1, 1);
            _this.rendererObject = null;
            _this.region = null;
            _this.sequence = null;
            /** For each of the 4 vertices, a pair of <code>x,y</code> values that is the local position of the vertex.
             *
             * See {@link #updateOffset()}. */
            _this.offset = Utils.newFloatArray(8);
            _this.uvs = Utils.newFloatArray(8);
            _this.tempColor = new Color(1, 1, 1, 1);
            _this.path = path;
            return _this;
        }
        /** Calculates the {@link #offset} using the region settings. Must be called after changing region settings. */
        RegionAttachment.prototype.updateRegion = function () {
            if (!this.region)
                throw new Error("Region not set.");
            var region = this.region;
            var regionScaleX = this.width / this.region.originalWidth * this.scaleX;
            var regionScaleY = this.height / this.region.originalHeight * this.scaleY;
            var localX = -this.width / 2 * this.scaleX + this.region.offsetX * regionScaleX;
            var localY = -this.height / 2 * this.scaleY + this.region.offsetY * regionScaleY;
            var localX2 = localX + this.region.width * regionScaleX;
            var localY2 = localY + this.region.height * regionScaleY;
            var radians = this.rotation * Math.PI / 180;
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var x = this.x, y = this.y;
            var localXCos = localX * cos + x;
            var localXSin = localX * sin;
            var localYCos = localY * cos + y;
            var localYSin = localY * sin;
            var localX2Cos = localX2 * cos + x;
            var localX2Sin = localX2 * sin;
            var localY2Cos = localY2 * cos + y;
            var localY2Sin = localY2 * sin;
            var offset = this.offset;
            offset[0] = localXCos - localYSin;
            offset[1] = localYCos + localXSin;
            offset[2] = localXCos - localY2Sin;
            offset[3] = localY2Cos + localXSin;
            offset[4] = localX2Cos - localY2Sin;
            offset[5] = localY2Cos + localX2Sin;
            offset[6] = localX2Cos - localYSin;
            offset[7] = localYCos + localX2Sin;
            var uvs = this.uvs;
            if (region.degrees == 90) {
                uvs[2] = region.u;
                uvs[3] = region.v2;
                uvs[4] = region.u;
                uvs[5] = region.v;
                uvs[6] = region.u2;
                uvs[7] = region.v;
                uvs[0] = region.u2;
                uvs[1] = region.v2;
            }
            else {
                uvs[0] = region.u;
                uvs[1] = region.v2;
                uvs[2] = region.u;
                uvs[3] = region.v;
                uvs[4] = region.u2;
                uvs[5] = region.v;
                uvs[6] = region.u2;
                uvs[7] = region.v2;
            }
        };
        /** Transforms the attachment's four vertices to world coordinates. If the attachment has a {@link #sequence}, the region may
         * be changed.
         * <p>
         * See <a href="http://esotericsoftware.com/spine-runtime-skeletons#World-transforms">World transforms</a> in the Spine
         * Runtimes Guide.
         * @param worldVertices The output world vertices. Must have a length >= <code>offset</code> + 8.
         * @param offset The <code>worldVertices</code> index to begin writing values.
         * @param stride The number of <code>worldVertices</code> entries between the value pairs written. */
        RegionAttachment.prototype.computeWorldVertices = function (slot, worldVertices, offset, stride) {
            if (this.sequence != null)
                this.sequence.apply(slot, this);
            var bone = slot.bone;
            var vertexOffset = this.offset;
            var mat = bone.matrix;
            var x = mat.tx, y = mat.ty;
            var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
            var offsetX = 0, offsetY = 0;
            offsetX = vertexOffset[0];
            offsetY = vertexOffset[1];
            worldVertices[offset] = offsetX * a + offsetY * b + x; // br
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            offset += stride;
            offsetX = vertexOffset[2];
            offsetY = vertexOffset[3];
            worldVertices[offset] = offsetX * a + offsetY * b + x; // bl
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            offset += stride;
            offsetX = vertexOffset[4];
            offsetY = vertexOffset[5];
            worldVertices[offset] = offsetX * a + offsetY * b + x; // ul
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            offset += stride;
            offsetX = vertexOffset[6];
            offsetY = vertexOffset[7];
            worldVertices[offset] = offsetX * a + offsetY * b + x; // ur
            worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
        };
        RegionAttachment.prototype.copy = function () {
            var copy = new RegionAttachment(this.name, this.path);
            copy.region = this.region;
            copy.rendererObject = this.rendererObject;
            copy.x = this.x;
            copy.y = this.y;
            copy.scaleX = this.scaleX;
            copy.scaleY = this.scaleY;
            copy.rotation = this.rotation;
            copy.width = this.width;
            copy.height = this.height;
            Utils.arrayCopy(this.uvs, 0, copy.uvs, 0, 8);
            Utils.arrayCopy(this.offset, 0, copy.offset, 0, 8);
            copy.color.setFromColor(this.color);
            copy.sequence = this.sequence != null ? this.sequence.copy() : null;
            return copy;
        };
        RegionAttachment.X1 = 0;
        RegionAttachment.Y1 = 1;
        RegionAttachment.C1R = 2;
        RegionAttachment.C1G = 3;
        RegionAttachment.C1B = 4;
        RegionAttachment.C1A = 5;
        RegionAttachment.U1 = 6;
        RegionAttachment.V1 = 7;
        RegionAttachment.X2 = 8;
        RegionAttachment.Y2 = 9;
        RegionAttachment.C2R = 10;
        RegionAttachment.C2G = 11;
        RegionAttachment.C2B = 12;
        RegionAttachment.C2A = 13;
        RegionAttachment.U2 = 14;
        RegionAttachment.V2 = 15;
        RegionAttachment.X3 = 16;
        RegionAttachment.Y3 = 17;
        RegionAttachment.C3R = 18;
        RegionAttachment.C3G = 19;
        RegionAttachment.C3B = 20;
        RegionAttachment.C3A = 21;
        RegionAttachment.U3 = 22;
        RegionAttachment.V3 = 23;
        RegionAttachment.X4 = 24;
        RegionAttachment.Y4 = 25;
        RegionAttachment.C4R = 26;
        RegionAttachment.C4G = 27;
        RegionAttachment.C4B = 28;
        RegionAttachment.C4A = 29;
        RegionAttachment.U4 = 30;
        RegionAttachment.V4 = 31;
        return RegionAttachment;
    }(Attachment));

    /**
     * @public
     */
    var Sequence = /** @class */ (function () {
        function Sequence(count) {
            this.id = Sequence.nextID();
            this.start = 0;
            this.digits = 0;
            /** The index of the region to show for the setup pose. */
            this.setupIndex = 0;
            this.regions = new Array(count);
        }
        Sequence.prototype.copy = function () {
            var copy = new Sequence(this.regions.length);
            Utils.arrayCopy(this.regions, 0, copy.regions, 0, this.regions.length);
            copy.start = this.start;
            copy.digits = this.digits;
            copy.setupIndex = this.setupIndex;
            return copy;
        };
        Sequence.prototype.apply = function (slot, attachment) {
            var index = slot.sequenceIndex;
            if (index == -1)
                index = this.setupIndex;
            if (index >= this.regions.length)
                index = this.regions.length - 1;
            var region = this.regions[index];
            if (attachment.region != region) {
                attachment.region = region;
                // attachment.updateRegion();
            }
        };
        Sequence.prototype.getPath = function (basePath, index) {
            var result = basePath;
            var frame = (this.start + index).toString();
            for (var i = this.digits - frame.length; i > 0; i--)
                result += "0";
            result += frame;
            return result;
        };
        Sequence.nextID = function () {
            return Sequence._nextID++;
        };
        Sequence._nextID = 0;
        return Sequence;
    }());
    /**
     * @public
     */
    exports.SequenceMode = void 0;
    (function (SequenceMode) {
        SequenceMode[SequenceMode["hold"] = 0] = "hold";
        SequenceMode[SequenceMode["once"] = 1] = "once";
        SequenceMode[SequenceMode["loop"] = 2] = "loop";
        SequenceMode[SequenceMode["pingpong"] = 3] = "pingpong";
        SequenceMode[SequenceMode["onceReverse"] = 4] = "onceReverse";
        SequenceMode[SequenceMode["loopReverse"] = 5] = "loopReverse";
        SequenceMode[SequenceMode["pingpongReverse"] = 6] = "pingpongReverse";
    })(exports.SequenceMode || (exports.SequenceMode = {}));
    /**
     * @public
     */
    var SequenceModeValues = [
        exports.SequenceMode.hold,
        exports.SequenceMode.once,
        exports.SequenceMode.loop,
        exports.SequenceMode.pingpong,
        exports.SequenceMode.onceReverse,
        exports.SequenceMode.loopReverse,
        exports.SequenceMode.pingpongReverse
    ];

    /**
     * A simple container for a list of timelines and a name.
     * @public
     * */
    var Animation = /** @class */ (function () {
        function Animation(name, timelines, duration) {
            this.timelines = [];
            this.timelineIds = new StringSet();
            if (!name)
                throw new Error("name cannot be null.");
            this.name = name;
            this.setTimelines(timelines);
            this.duration = duration;
        }
        Animation.prototype.setTimelines = function (timelines) {
            if (!timelines)
                throw new Error("timelines cannot be null.");
            this.timelines = timelines;
            this.timelineIds.clear();
            for (var i = 0; i < timelines.length; i++)
                this.timelineIds.addAll(timelines[i].getPropertyIds());
        };
        Animation.prototype.hasTimeline = function (ids) {
            for (var i = 0; i < ids.length; i++)
                if (this.timelineIds.contains(ids[i]))
                    return true;
            return false;
        };
        /** Applies all the animation's timelines to the specified skeleton.
         *
         * See Timeline {@link Timeline#apply(Skeleton, float, float, Array, float, MixBlend, MixDirection)}.
         * @param loop If true, the animation repeats after {@link #getDuration()}.
         * @param events May be null to ignore fired events. */
        Animation.prototype.apply = function (skeleton, lastTime, time, loop, events, alpha, blend, direction) {
            if (!skeleton)
                throw new Error("skeleton cannot be null.");
            if (loop && this.duration != 0) {
                time %= this.duration;
                if (lastTime > 0)
                    lastTime %= this.duration;
            }
            var timelines = this.timelines;
            for (var i = 0, n = timelines.length; i < n; i++)
                timelines[i].apply(skeleton, lastTime, time, events, alpha, blend, direction);
        };
        return Animation;
    }());
    var Property = {
        rotate: 0,
        x: 1,
        y: 2,
        scaleX: 3,
        scaleY: 4,
        shearX: 5,
        shearY: 6,
        rgb: 7,
        alpha: 8,
        rgb2: 9,
        attachment: 10,
        deform: 11,
        event: 12,
        drawOrder: 13,
        ikConstraint: 14,
        transformConstraint: 15,
        pathConstraintPosition: 16,
        pathConstraintSpacing: 17,
        pathConstraintMix: 18,
        sequence: 19
    };
    /** The interface for all timelines.
     * @public
     * */
    var Timeline = /** @class */ (function () {
        function Timeline(frameCount, propertyIds) {
            this.propertyIds = propertyIds;
            this.frames = Utils.newFloatArray(frameCount * this.getFrameEntries());
        }
        Timeline.prototype.getPropertyIds = function () {
            return this.propertyIds;
        };
        Timeline.prototype.getFrameEntries = function () {
            return 1;
        };
        Timeline.prototype.getFrameCount = function () {
            return this.frames.length / this.getFrameEntries();
        };
        Timeline.prototype.getDuration = function () {
            return this.frames[this.frames.length - this.getFrameEntries()];
        };
        Timeline.search1 = function (frames, time) {
            var n = frames.length;
            for (var i = 1; i < n; i++)
                if (frames[i] > time)
                    return i - 1;
            return n - 1;
        };
        Timeline.search = function (frames, time, step) {
            var n = frames.length;
            for (var i = step; i < n; i += step)
                if (frames[i] > time)
                    return i - step;
            return n - step;
        };
        return Timeline;
    }());
    /** The base class for timelines that use interpolation between key frame values.
     * @public
     * */
    var CurveTimeline = /** @class */ (function (_super) {
        __extends$1(CurveTimeline, _super);
        function CurveTimeline(frameCount, bezierCount, propertyIds) {
            var _this = _super.call(this, frameCount, propertyIds) || this;
            _this.curves = Utils.newFloatArray(frameCount + bezierCount * 18 /*BEZIER_SIZE*/);
            _this.curves[frameCount - 1] = 1 /*STEPPED*/;
            return _this;
        }
        /** Sets the specified key frame to linear interpolation. */
        CurveTimeline.prototype.setLinear = function (frame) {
            this.curves[frame] = 0 /*LINEAR*/;
        };
        /** Sets the specified key frame to stepped interpolation. */
        CurveTimeline.prototype.setStepped = function (frame) {
            this.curves[frame] = 1 /*STEPPED*/;
        };
        /** Shrinks the storage for Bezier curves, for use when <code>bezierCount</code> (specified in the constructor) was larger
         * than the actual number of Bezier curves. */
        CurveTimeline.prototype.shrink = function (bezierCount) {
            var size = this.getFrameCount() + bezierCount * 18 /*BEZIER_SIZE*/;
            if (this.curves.length > size) {
                var newCurves = Utils.newFloatArray(size);
                Utils.arrayCopy(this.curves, 0, newCurves, 0, size);
                this.curves = newCurves;
            }
        };
        /** Stores the segments for the specified Bezier curve. For timelines that modify multiple values, there may be more than
         * one curve per frame.
         * @param bezier The ordinal of this Bezier curve for this timeline, between 0 and <code>bezierCount - 1</code> (specified
         *           in the constructor), inclusive.
         * @param frame Between 0 and <code>frameCount - 1</code>, inclusive.
         * @param value The index of the value for this frame that this curve is used for.
         * @param time1 The time for the first key.
         * @param value1 The value for the first key.
         * @param cx1 The time for the first Bezier handle.
         * @param cy1 The value for the first Bezier handle.
         * @param cx2 The time of the second Bezier handle.
         * @param cy2 The value for the second Bezier handle.
         * @param time2 The time for the second key.
         * @param value2 The value for the second key. */
        CurveTimeline.prototype.setBezier = function (bezier, frame, value, time1, value1, cx1, cy1, cx2, cy2, time2, value2) {
            var curves = this.curves;
            var i = this.getFrameCount() + bezier * 18 /*BEZIER_SIZE*/;
            if (value == 0)
                curves[frame] = 2 /*BEZIER*/ + i;
            var tmpx = (time1 - cx1 * 2 + cx2) * 0.03, tmpy = (value1 - cy1 * 2 + cy2) * 0.03;
            var dddx = ((cx1 - cx2) * 3 - time1 + time2) * 0.006, dddy = ((cy1 - cy2) * 3 - value1 + value2) * 0.006;
            var ddx = tmpx * 2 + dddx, ddy = tmpy * 2 + dddy;
            var dx = (cx1 - time1) * 0.3 + tmpx + dddx * 0.16666667, dy = (cy1 - value1) * 0.3 + tmpy + dddy * 0.16666667;
            var x = time1 + dx, y = value1 + dy;
            for (var n = i + 18 /*BEZIER_SIZE*/; i < n; i += 2) {
                curves[i] = x;
                curves[i + 1] = y;
                dx += ddx;
                dy += ddy;
                ddx += dddx;
                ddy += dddy;
                x += dx;
                y += dy;
            }
        };
        /** Returns the Bezier interpolated value for the specified time.
         * @param frameIndex The index into {@link #getFrames()} for the values of the frame before <code>time</code>.
         * @param valueOffset The offset from <code>frameIndex</code> to the value this curve is used for.
         * @param i The index of the Bezier segments. See {@link #getCurveType(int)}. */
        CurveTimeline.prototype.getBezierValue = function (time, frameIndex, valueOffset, i) {
            var curves = this.curves;
            if (curves[i] > time) {
                var x_1 = this.frames[frameIndex], y_1 = this.frames[frameIndex + valueOffset];
                return y_1 + (time - x_1) / (curves[i] - x_1) * (curves[i + 1] - y_1);
            }
            var n = i + 18 /*BEZIER_SIZE*/;
            for (i += 2; i < n; i += 2) {
                if (curves[i] >= time) {
                    var x_2 = curves[i - 2], y_2 = curves[i - 1];
                    return y_2 + (time - x_2) / (curves[i] - x_2) * (curves[i + 1] - y_2);
                }
            }
            frameIndex += this.getFrameEntries();
            var x = curves[n - 2], y = curves[n - 1];
            return y + (time - x) / (this.frames[frameIndex] - x) * (this.frames[frameIndex + valueOffset] - y);
        };
        return CurveTimeline;
    }(Timeline));
    /**
     * @public
     */
    var CurveTimeline1 = /** @class */ (function (_super) {
        __extends$1(CurveTimeline1, _super);
        function CurveTimeline1(frameCount, bezierCount, propertyId) {
            return _super.call(this, frameCount, bezierCount, [propertyId]) || this;
        }
        CurveTimeline1.prototype.getFrameEntries = function () {
            return 2 /*ENTRIES*/;
        };
        /** Sets the time and value for the specified frame.
         * @param frame Between 0 and <code>frameCount</code>, inclusive.
         * @param time The frame time in seconds. */
        CurveTimeline1.prototype.setFrame = function (frame, time, value) {
            frame <<= 1;
            this.frames[frame] = time;
            this.frames[frame + 1 /*VALUE*/] = value;
        };
        /** Returns the interpolated value for the specified time. */
        CurveTimeline1.prototype.getCurveValue = function (time) {
            var frames = this.frames;
            var i = frames.length - 2;
            for (var ii = 2; ii <= i; ii += 2) {
                if (frames[ii] > time) {
                    i = ii - 2;
                    break;
                }
            }
            var curveType = this.curves[i >> 1];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i], value = frames[i + 1 /*VALUE*/];
                    return value + (time - before) / (frames[i + 2 /*ENTRIES*/] - before) * (frames[i + 2 /*ENTRIES*/ + 1 /*VALUE*/] - value);
                case 1 /*STEPPED*/:
                    return frames[i + 1 /*VALUE*/];
            }
            return this.getBezierValue(time, i, 1 /*VALUE*/, curveType - 2 /*BEZIER*/);
        };
        return CurveTimeline1;
    }(CurveTimeline));
    /** The base class for a {@link CurveTimeline} which sets two properties.
     * @public
     * */
    var CurveTimeline2 = /** @class */ (function (_super) {
        __extends$1(CurveTimeline2, _super);
        /** @param bezierCount The maximum number of Bezier curves. See {@link #shrink(int)}.
         * @param propertyIds Unique identifiers for the properties the timeline modifies. */
        function CurveTimeline2(frameCount, bezierCount, propertyId1, propertyId2) {
            return _super.call(this, frameCount, bezierCount, [propertyId1, propertyId2]) || this;
        }
        CurveTimeline2.prototype.getFrameEntries = function () {
            return 3 /*ENTRIES*/;
        };
        /** Sets the time and values for the specified frame.
         * @param frame Between 0 and <code>frameCount</code>, inclusive.
         * @param time The frame time in seconds. */
        CurveTimeline2.prototype.setFrame = function (frame, time, value1, value2) {
            frame *= 3 /*ENTRIES*/;
            this.frames[frame] = time;
            this.frames[frame + 1 /*VALUE1*/] = value1;
            this.frames[frame + 2 /*VALUE2*/] = value2;
        };
        return CurveTimeline2;
    }(CurveTimeline));
    /** Changes a bone's local {@link Bone#rotation}.
     * @public
     * */
    var RotateTimeline = /** @class */ (function (_super) {
        __extends$1(RotateTimeline, _super);
        function RotateTimeline(frameCount, bezierCount, boneIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.rotate + "|" + boneIndex) || this;
            _this.boneIndex = 0;
            _this.boneIndex = boneIndex;
            return _this;
        }
        RotateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.rotation = bone.data.rotation;
                        return;
                    case exports.MixBlend.first:
                        bone.rotation += (bone.data.rotation - bone.rotation) * alpha;
                }
                return;
            }
            var r = this.getCurveValue(time);
            switch (blend) {
                case exports.MixBlend.setup:
                    bone.rotation = bone.data.rotation + r * alpha;
                    break;
                case exports.MixBlend.first:
                case exports.MixBlend.replace:
                    r += bone.data.rotation - bone.rotation;
                case exports.MixBlend.add:
                    bone.rotation += r * alpha;
            }
        };
        return RotateTimeline;
    }(CurveTimeline1));
    /** Changes a bone's local {@link Bone#x} and {@link Bone#y}.
     * @public
     * */
    var TranslateTimeline = /** @class */ (function (_super) {
        __extends$1(TranslateTimeline, _super);
        function TranslateTimeline(frameCount, bezierCount, boneIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.x + "|" + boneIndex, Property.y + "|" + boneIndex) || this;
            _this.boneIndex = 0;
            _this.boneIndex = boneIndex;
            return _this;
        }
        TranslateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.x = bone.data.x;
                        bone.y = bone.data.y;
                        return;
                    case exports.MixBlend.first:
                        bone.x += (bone.data.x - bone.x) * alpha;
                        bone.y += (bone.data.y - bone.y) * alpha;
                }
                return;
            }
            var x = 0, y = 0;
            var i = Timeline.search(frames, time, 3 /*ENTRIES*/);
            var curveType = this.curves[i / 3 /*ENTRIES*/];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i];
                    x = frames[i + 1 /*VALUE1*/];
                    y = frames[i + 2 /*VALUE2*/];
                    var t = (time - before) / (frames[i + 3 /*ENTRIES*/] - before);
                    x += (frames[i + 3 /*ENTRIES*/ + 1 /*VALUE1*/] - x) * t;
                    y += (frames[i + 3 /*ENTRIES*/ + 2 /*VALUE2*/] - y) * t;
                    break;
                case 1 /*STEPPED*/:
                    x = frames[i + 1 /*VALUE1*/];
                    y = frames[i + 2 /*VALUE2*/];
                    break;
                default:
                    x = this.getBezierValue(time, i, 1 /*VALUE1*/, curveType - 2 /*BEZIER*/);
                    y = this.getBezierValue(time, i, 2 /*VALUE2*/, curveType + 18 /*BEZIER_SIZE*/ - 2 /*BEZIER*/);
            }
            switch (blend) {
                case exports.MixBlend.setup:
                    bone.x = bone.data.x + x * alpha;
                    bone.y = bone.data.y + y * alpha;
                    break;
                case exports.MixBlend.first:
                case exports.MixBlend.replace:
                    bone.x += (bone.data.x + x - bone.x) * alpha;
                    bone.y += (bone.data.y + y - bone.y) * alpha;
                    break;
                case exports.MixBlend.add:
                    bone.x += x * alpha;
                    bone.y += y * alpha;
            }
        };
        return TranslateTimeline;
    }(CurveTimeline2));
    /** Changes a bone's local {@link Bone#x}.
     * @public
     * */
    var TranslateXTimeline = /** @class */ (function (_super) {
        __extends$1(TranslateXTimeline, _super);
        function TranslateXTimeline(frameCount, bezierCount, boneIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.x + "|" + boneIndex) || this;
            _this.boneIndex = 0;
            _this.boneIndex = boneIndex;
            return _this;
        }
        TranslateXTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.x = bone.data.x;
                        return;
                    case exports.MixBlend.first:
                        bone.x += (bone.data.x - bone.x) * alpha;
                }
                return;
            }
            var x = this.getCurveValue(time);
            switch (blend) {
                case exports.MixBlend.setup:
                    bone.x = bone.data.x + x * alpha;
                    break;
                case exports.MixBlend.first:
                case exports.MixBlend.replace:
                    bone.x += (bone.data.x + x - bone.x) * alpha;
                    break;
                case exports.MixBlend.add:
                    bone.x += x * alpha;
            }
        };
        return TranslateXTimeline;
    }(CurveTimeline1));
    /** Changes a bone's local {@link Bone#x}.
     * @public
     * */
    var TranslateYTimeline = /** @class */ (function (_super) {
        __extends$1(TranslateYTimeline, _super);
        function TranslateYTimeline(frameCount, bezierCount, boneIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.y + "|" + boneIndex) || this;
            _this.boneIndex = 0;
            _this.boneIndex = boneIndex;
            return _this;
        }
        TranslateYTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.y = bone.data.y;
                        return;
                    case exports.MixBlend.first:
                        bone.y += (bone.data.y - bone.y) * alpha;
                }
                return;
            }
            var y = this.getCurveValue(time);
            switch (blend) {
                case exports.MixBlend.setup:
                    bone.y = bone.data.y + y * alpha;
                    break;
                case exports.MixBlend.first:
                case exports.MixBlend.replace:
                    bone.y += (bone.data.y + y - bone.y) * alpha;
                    break;
                case exports.MixBlend.add:
                    bone.y += y * alpha;
            }
        };
        return TranslateYTimeline;
    }(CurveTimeline1));
    /** Changes a bone's local {@link Bone#scaleX)} and {@link Bone#scaleY}.
     * @public
     * */
    var ScaleTimeline = /** @class */ (function (_super) {
        __extends$1(ScaleTimeline, _super);
        function ScaleTimeline(frameCount, bezierCount, boneIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.scaleX + "|" + boneIndex, Property.scaleY + "|" + boneIndex) || this;
            _this.boneIndex = 0;
            _this.boneIndex = boneIndex;
            return _this;
        }
        ScaleTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.scaleX = bone.data.scaleX;
                        bone.scaleY = bone.data.scaleY;
                        return;
                    case exports.MixBlend.first:
                        bone.scaleX += (bone.data.scaleX - bone.scaleX) * alpha;
                        bone.scaleY += (bone.data.scaleY - bone.scaleY) * alpha;
                }
                return;
            }
            var x, y;
            var i = Timeline.search(frames, time, 3 /*ENTRIES*/);
            var curveType = this.curves[i / 3 /*ENTRIES*/];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i];
                    x = frames[i + 1 /*VALUE1*/];
                    y = frames[i + 2 /*VALUE2*/];
                    var t = (time - before) / (frames[i + 3 /*ENTRIES*/] - before);
                    x += (frames[i + 3 /*ENTRIES*/ + 1 /*VALUE1*/] - x) * t;
                    y += (frames[i + 3 /*ENTRIES*/ + 2 /*VALUE2*/] - y) * t;
                    break;
                case 1 /*STEPPED*/:
                    x = frames[i + 1 /*VALUE1*/];
                    y = frames[i + 2 /*VALUE2*/];
                    break;
                default:
                    x = this.getBezierValue(time, i, 1 /*VALUE1*/, curveType - 2 /*BEZIER*/);
                    y = this.getBezierValue(time, i, 2 /*VALUE2*/, curveType + 18 /*BEZIER_SIZE*/ - 2 /*BEZIER*/);
            }
            x *= bone.data.scaleX;
            y *= bone.data.scaleY;
            if (alpha == 1) {
                if (blend == exports.MixBlend.add) {
                    bone.scaleX += x - bone.data.scaleX;
                    bone.scaleY += y - bone.data.scaleY;
                }
                else {
                    bone.scaleX = x;
                    bone.scaleY = y;
                }
            }
            else {
                var bx = 0, by = 0;
                if (direction == exports.MixDirection.mixOut) {
                    switch (blend) {
                        case exports.MixBlend.setup:
                            bx = bone.data.scaleX;
                            by = bone.data.scaleY;
                            bone.scaleX = bx + (Math.abs(x) * MathUtils.signum(bx) - bx) * alpha;
                            bone.scaleY = by + (Math.abs(y) * MathUtils.signum(by) - by) * alpha;
                            break;
                        case exports.MixBlend.first:
                        case exports.MixBlend.replace:
                            bx = bone.scaleX;
                            by = bone.scaleY;
                            bone.scaleX = bx + (Math.abs(x) * MathUtils.signum(bx) - bx) * alpha;
                            bone.scaleY = by + (Math.abs(y) * MathUtils.signum(by) - by) * alpha;
                            break;
                        case exports.MixBlend.add:
                            bone.scaleX += (x - bone.data.scaleX) * alpha;
                            bone.scaleY += (y - bone.data.scaleY) * alpha;
                    }
                }
                else {
                    switch (blend) {
                        case exports.MixBlend.setup:
                            bx = Math.abs(bone.data.scaleX) * MathUtils.signum(x);
                            by = Math.abs(bone.data.scaleY) * MathUtils.signum(y);
                            bone.scaleX = bx + (x - bx) * alpha;
                            bone.scaleY = by + (y - by) * alpha;
                            break;
                        case exports.MixBlend.first:
                        case exports.MixBlend.replace:
                            bx = Math.abs(bone.scaleX) * MathUtils.signum(x);
                            by = Math.abs(bone.scaleY) * MathUtils.signum(y);
                            bone.scaleX = bx + (x - bx) * alpha;
                            bone.scaleY = by + (y - by) * alpha;
                            break;
                        case exports.MixBlend.add:
                            bone.scaleX += (x - bone.data.scaleX) * alpha;
                            bone.scaleY += (y - bone.data.scaleY) * alpha;
                    }
                }
            }
        };
        return ScaleTimeline;
    }(CurveTimeline2));
    /** Changes a bone's local {@link Bone#scaleX)} and {@link Bone#scaleY}.
     * @public
     * */
    var ScaleXTimeline = /** @class */ (function (_super) {
        __extends$1(ScaleXTimeline, _super);
        function ScaleXTimeline(frameCount, bezierCount, boneIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.scaleX + "|" + boneIndex) || this;
            _this.boneIndex = 0;
            _this.boneIndex = boneIndex;
            return _this;
        }
        ScaleXTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.scaleX = bone.data.scaleX;
                        return;
                    case exports.MixBlend.first:
                        bone.scaleX += (bone.data.scaleX - bone.scaleX) * alpha;
                }
                return;
            }
            var x = this.getCurveValue(time) * bone.data.scaleX;
            if (alpha == 1) {
                if (blend == exports.MixBlend.add)
                    bone.scaleX += x - bone.data.scaleX;
                else
                    bone.scaleX = x;
            }
            else {
                // Mixing out uses sign of setup or current pose, else use sign of key.
                var bx = 0;
                if (direction == exports.MixDirection.mixOut) {
                    switch (blend) {
                        case exports.MixBlend.setup:
                            bx = bone.data.scaleX;
                            bone.scaleX = bx + (Math.abs(x) * MathUtils.signum(bx) - bx) * alpha;
                            break;
                        case exports.MixBlend.first:
                        case exports.MixBlend.replace:
                            bx = bone.scaleX;
                            bone.scaleX = bx + (Math.abs(x) * MathUtils.signum(bx) - bx) * alpha;
                            break;
                        case exports.MixBlend.add:
                            bone.scaleX += (x - bone.data.scaleX) * alpha;
                    }
                }
                else {
                    switch (blend) {
                        case exports.MixBlend.setup:
                            bx = Math.abs(bone.data.scaleX) * MathUtils.signum(x);
                            bone.scaleX = bx + (x - bx) * alpha;
                            break;
                        case exports.MixBlend.first:
                        case exports.MixBlend.replace:
                            bx = Math.abs(bone.scaleX) * MathUtils.signum(x);
                            bone.scaleX = bx + (x - bx) * alpha;
                            break;
                        case exports.MixBlend.add:
                            bone.scaleX += (x - bone.data.scaleX) * alpha;
                    }
                }
            }
        };
        return ScaleXTimeline;
    }(CurveTimeline1));
    /** Changes a bone's local {@link Bone#scaleX)} and {@link Bone#scaleY}.
     * @public
     * */
    var ScaleYTimeline = /** @class */ (function (_super) {
        __extends$1(ScaleYTimeline, _super);
        function ScaleYTimeline(frameCount, bezierCount, boneIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.scaleY + "|" + boneIndex) || this;
            _this.boneIndex = 0;
            _this.boneIndex = boneIndex;
            return _this;
        }
        ScaleYTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.scaleY = bone.data.scaleY;
                        return;
                    case exports.MixBlend.first:
                        bone.scaleY += (bone.data.scaleY - bone.scaleY) * alpha;
                }
                return;
            }
            var y = this.getCurveValue(time) * bone.data.scaleY;
            if (alpha == 1) {
                if (blend == exports.MixBlend.add)
                    bone.scaleY += y - bone.data.scaleY;
                else
                    bone.scaleY = y;
            }
            else {
                // Mixing out uses sign of setup or current pose, else use sign of key.
                var by = 0;
                if (direction == exports.MixDirection.mixOut) {
                    switch (blend) {
                        case exports.MixBlend.setup:
                            by = bone.data.scaleY;
                            bone.scaleY = by + (Math.abs(y) * MathUtils.signum(by) - by) * alpha;
                            break;
                        case exports.MixBlend.first:
                        case exports.MixBlend.replace:
                            by = bone.scaleY;
                            bone.scaleY = by + (Math.abs(y) * MathUtils.signum(by) - by) * alpha;
                            break;
                        case exports.MixBlend.add:
                            bone.scaleY += (y - bone.data.scaleY) * alpha;
                    }
                }
                else {
                    switch (blend) {
                        case exports.MixBlend.setup:
                            by = Math.abs(bone.data.scaleY) * MathUtils.signum(y);
                            bone.scaleY = by + (y - by) * alpha;
                            break;
                        case exports.MixBlend.first:
                        case exports.MixBlend.replace:
                            by = Math.abs(bone.scaleY) * MathUtils.signum(y);
                            bone.scaleY = by + (y - by) * alpha;
                            break;
                        case exports.MixBlend.add:
                            bone.scaleY += (y - bone.data.scaleY) * alpha;
                    }
                }
            }
        };
        return ScaleYTimeline;
    }(CurveTimeline1));
    /** Changes a bone's local {@link Bone#shearX} and {@link Bone#shearY}.
     * @public
     * */
    var ShearTimeline = /** @class */ (function (_super) {
        __extends$1(ShearTimeline, _super);
        function ShearTimeline(frameCount, bezierCount, boneIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.shearX + "|" + boneIndex, Property.shearY + "|" + boneIndex) || this;
            _this.boneIndex = 0;
            _this.boneIndex = boneIndex;
            return _this;
        }
        ShearTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.shearX = bone.data.shearX;
                        bone.shearY = bone.data.shearY;
                        return;
                    case exports.MixBlend.first:
                        bone.shearX += (bone.data.shearX - bone.shearX) * alpha;
                        bone.shearY += (bone.data.shearY - bone.shearY) * alpha;
                }
                return;
            }
            var x = 0, y = 0;
            var i = Timeline.search(frames, time, 3 /*ENTRIES*/);
            var curveType = this.curves[i / 3 /*ENTRIES*/];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i];
                    x = frames[i + 1 /*VALUE1*/];
                    y = frames[i + 2 /*VALUE2*/];
                    var t = (time - before) / (frames[i + 3 /*ENTRIES*/] - before);
                    x += (frames[i + 3 /*ENTRIES*/ + 1 /*VALUE1*/] - x) * t;
                    y += (frames[i + 3 /*ENTRIES*/ + 2 /*VALUE2*/] - y) * t;
                    break;
                case 1 /*STEPPED*/:
                    x = frames[i + 1 /*VALUE1*/];
                    y = frames[i + 2 /*VALUE2*/];
                    break;
                default:
                    x = this.getBezierValue(time, i, 1 /*VALUE1*/, curveType - 2 /*BEZIER*/);
                    y = this.getBezierValue(time, i, 2 /*VALUE2*/, curveType + 18 /*BEZIER_SIZE*/ - 2 /*BEZIER*/);
            }
            switch (blend) {
                case exports.MixBlend.setup:
                    bone.shearX = bone.data.shearX + x * alpha;
                    bone.shearY = bone.data.shearY + y * alpha;
                    break;
                case exports.MixBlend.first:
                case exports.MixBlend.replace:
                    bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
                    bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
                    break;
                case exports.MixBlend.add:
                    bone.shearX += x * alpha;
                    bone.shearY += y * alpha;
            }
        };
        return ShearTimeline;
    }(CurveTimeline2));
    /** Changes a bone's local {@link Bone#shearX} and {@link Bone#shearY}.
     * @public
     * */
    var ShearXTimeline = /** @class */ (function (_super) {
        __extends$1(ShearXTimeline, _super);
        function ShearXTimeline(frameCount, bezierCount, boneIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.shearX + "|" + boneIndex) || this;
            _this.boneIndex = 0;
            _this.boneIndex = boneIndex;
            return _this;
        }
        ShearXTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.shearX = bone.data.shearX;
                        return;
                    case exports.MixBlend.first:
                        bone.shearX += (bone.data.shearX - bone.shearX) * alpha;
                }
                return;
            }
            var x = this.getCurveValue(time);
            switch (blend) {
                case exports.MixBlend.setup:
                    bone.shearX = bone.data.shearX + x * alpha;
                    break;
                case exports.MixBlend.first:
                case exports.MixBlend.replace:
                    bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
                    break;
                case exports.MixBlend.add:
                    bone.shearX += x * alpha;
            }
        };
        return ShearXTimeline;
    }(CurveTimeline1));
    /** Changes a bone's local {@link Bone#shearX} and {@link Bone#shearY}.
     * @public
     * */
    var ShearYTimeline = /** @class */ (function (_super) {
        __extends$1(ShearYTimeline, _super);
        function ShearYTimeline(frameCount, bezierCount, boneIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.shearY + "|" + boneIndex) || this;
            _this.boneIndex = 0;
            _this.boneIndex = boneIndex;
            return _this;
        }
        ShearYTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var bone = skeleton.bones[this.boneIndex];
            if (!bone.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.shearY = bone.data.shearY;
                        return;
                    case exports.MixBlend.first:
                        bone.shearY += (bone.data.shearY - bone.shearY) * alpha;
                }
                return;
            }
            var y = this.getCurveValue(time);
            switch (blend) {
                case exports.MixBlend.setup:
                    bone.shearY = bone.data.shearY + y * alpha;
                    break;
                case exports.MixBlend.first:
                case exports.MixBlend.replace:
                    bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
                    break;
                case exports.MixBlend.add:
                    bone.shearY += y * alpha;
            }
        };
        return ShearYTimeline;
    }(CurveTimeline1));
    /** Changes a slot's {@link Slot#color}.
     * @public
     * */
    var RGBATimeline = /** @class */ (function (_super) {
        __extends$1(RGBATimeline, _super);
        function RGBATimeline(frameCount, bezierCount, slotIndex) {
            var _this = _super.call(this, frameCount, bezierCount, [
                Property.rgb + "|" + slotIndex,
                Property.alpha + "|" + slotIndex
            ]) || this;
            _this.slotIndex = 0;
            _this.slotIndex = slotIndex;
            return _this;
        }
        RGBATimeline.prototype.getFrameEntries = function () {
            return 5 /*ENTRIES*/;
        };
        /** Sets the time in seconds, red, green, blue, and alpha for the specified key frame. */
        RGBATimeline.prototype.setFrame = function (frame, time, r, g, b, a) {
            frame *= 5 /*ENTRIES*/;
            this.frames[frame] = time;
            this.frames[frame + 1 /*R*/] = r;
            this.frames[frame + 2 /*G*/] = g;
            this.frames[frame + 3 /*B*/] = b;
            this.frames[frame + 4 /*A*/] = a;
        };
        RGBATimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            var frames = this.frames;
            var color = slot.color;
            if (time < frames[0]) {
                var setup = slot.data.color;
                switch (blend) {
                    case exports.MixBlend.setup:
                        color.setFromColor(setup);
                        return;
                    case exports.MixBlend.first:
                        color.add((setup.r - color.r) * alpha, (setup.g - color.g) * alpha, (setup.b - color.b) * alpha, (setup.a - color.a) * alpha);
                }
                return;
            }
            var r = 0, g = 0, b = 0, a = 0;
            var i = Timeline.search(frames, time, 5 /*ENTRIES*/);
            var curveType = this.curves[i / 5 /*ENTRIES*/];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i];
                    r = frames[i + 1 /*R*/];
                    g = frames[i + 2 /*G*/];
                    b = frames[i + 3 /*B*/];
                    a = frames[i + 4 /*A*/];
                    var t = (time - before) / (frames[i + 5 /*ENTRIES*/] - before);
                    r += (frames[i + 5 /*ENTRIES*/ + 1 /*R*/] - r) * t;
                    g += (frames[i + 5 /*ENTRIES*/ + 2 /*G*/] - g) * t;
                    b += (frames[i + 5 /*ENTRIES*/ + 3 /*B*/] - b) * t;
                    a += (frames[i + 5 /*ENTRIES*/ + 4 /*A*/] - a) * t;
                    break;
                case 1 /*STEPPED*/:
                    r = frames[i + 1 /*R*/];
                    g = frames[i + 2 /*G*/];
                    b = frames[i + 3 /*B*/];
                    a = frames[i + 4 /*A*/];
                    break;
                default:
                    r = this.getBezierValue(time, i, 1 /*R*/, curveType - 2 /*BEZIER*/);
                    g = this.getBezierValue(time, i, 2 /*G*/, curveType + 18 /*BEZIER_SIZE*/ - 2 /*BEZIER*/);
                    b = this.getBezierValue(time, i, 3 /*B*/, curveType + 18 /*BEZIER_SIZE*/ * 2 - 2 /*BEZIER*/);
                    a = this.getBezierValue(time, i, 4 /*A*/, curveType + 18 /*BEZIER_SIZE*/ * 3 - 2 /*BEZIER*/);
            }
            if (alpha == 1)
                color.set(r, g, b, a);
            else {
                if (blend == exports.MixBlend.setup)
                    color.setFromColor(slot.data.color);
                color.add((r - color.r) * alpha, (g - color.g) * alpha, (b - color.b) * alpha, (a - color.a) * alpha);
            }
        };
        return RGBATimeline;
    }(CurveTimeline));
    /** Changes a slot's {@link Slot#color}.
     * @public
     * */
    var RGBTimeline = /** @class */ (function (_super) {
        __extends$1(RGBTimeline, _super);
        function RGBTimeline(frameCount, bezierCount, slotIndex) {
            var _this = _super.call(this, frameCount, bezierCount, [
                Property.rgb + "|" + slotIndex
            ]) || this;
            _this.slotIndex = 0;
            _this.slotIndex = slotIndex;
            return _this;
        }
        RGBTimeline.prototype.getFrameEntries = function () {
            return 4 /*ENTRIES*/;
        };
        /** Sets the time in seconds, red, green, blue, and alpha for the specified key frame. */
        RGBTimeline.prototype.setFrame = function (frame, time, r, g, b) {
            frame <<= 2;
            this.frames[frame] = time;
            this.frames[frame + 1 /*R*/] = r;
            this.frames[frame + 2 /*G*/] = g;
            this.frames[frame + 3 /*B*/] = b;
        };
        RGBTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            var frames = this.frames;
            var color = slot.color;
            if (time < frames[0]) {
                var setup = slot.data.color;
                switch (blend) {
                    case exports.MixBlend.setup:
                        color.r = setup.r;
                        color.g = setup.g;
                        color.b = setup.b;
                        return;
                    case exports.MixBlend.first:
                        color.r += (setup.r - color.r) * alpha;
                        color.g += (setup.g - color.g) * alpha;
                        color.b += (setup.b - color.b) * alpha;
                }
                return;
            }
            var r = 0, g = 0, b = 0;
            var i = Timeline.search(frames, time, 4 /*ENTRIES*/);
            var curveType = this.curves[i >> 2];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i];
                    r = frames[i + 1 /*R*/];
                    g = frames[i + 2 /*G*/];
                    b = frames[i + 3 /*B*/];
                    var t = (time - before) / (frames[i + 4 /*ENTRIES*/] - before);
                    r += (frames[i + 4 /*ENTRIES*/ + 1 /*R*/] - r) * t;
                    g += (frames[i + 4 /*ENTRIES*/ + 2 /*G*/] - g) * t;
                    b += (frames[i + 4 /*ENTRIES*/ + 3 /*B*/] - b) * t;
                    break;
                case 1 /*STEPPED*/:
                    r = frames[i + 1 /*R*/];
                    g = frames[i + 2 /*G*/];
                    b = frames[i + 3 /*B*/];
                    break;
                default:
                    r = this.getBezierValue(time, i, 1 /*R*/, curveType - 2 /*BEZIER*/);
                    g = this.getBezierValue(time, i, 2 /*G*/, curveType + 18 /*BEZIER_SIZE*/ - 2 /*BEZIER*/);
                    b = this.getBezierValue(time, i, 3 /*B*/, curveType + 18 /*BEZIER_SIZE*/ * 2 - 2 /*BEZIER*/);
            }
            if (alpha == 1) {
                color.r = r;
                color.g = g;
                color.b = b;
            }
            else {
                if (blend == exports.MixBlend.setup) {
                    var setup = slot.data.color;
                    color.r = setup.r;
                    color.g = setup.g;
                    color.b = setup.b;
                }
                color.r += (r - color.r) * alpha;
                color.g += (g - color.g) * alpha;
                color.b += (b - color.b) * alpha;
            }
        };
        return RGBTimeline;
    }(CurveTimeline));
    /** Changes a bone's local {@link Bone#shearX} and {@link Bone#shearY}.
     * @public
     * */
    var AlphaTimeline = /** @class */ (function (_super) {
        __extends$1(AlphaTimeline, _super);
        function AlphaTimeline(frameCount, bezierCount, slotIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.alpha + "|" + slotIndex) || this;
            _this.slotIndex = 0;
            _this.slotIndex = slotIndex;
            return _this;
        }
        AlphaTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            var color = slot.color;
            if (time < this.frames[0]) { // Time is before first frame.
                var setup = slot.data.color;
                switch (blend) {
                    case exports.MixBlend.setup:
                        color.a = setup.a;
                        return;
                    case exports.MixBlend.first:
                        color.a += (setup.a - color.a) * alpha;
                }
                return;
            }
            var a = this.getCurveValue(time);
            if (alpha == 1)
                color.a = a;
            else {
                if (blend == exports.MixBlend.setup)
                    color.a = slot.data.color.a;
                color.a += (a - color.a) * alpha;
            }
        };
        return AlphaTimeline;
    }(CurveTimeline1));
    /** Changes a slot's {@link Slot#color} and {@link Slot#darkColor} for two color tinting.
     * @public
     * */
    var RGBA2Timeline = /** @class */ (function (_super) {
        __extends$1(RGBA2Timeline, _super);
        function RGBA2Timeline(frameCount, bezierCount, slotIndex) {
            var _this = _super.call(this, frameCount, bezierCount, [
                Property.rgb + "|" + slotIndex,
                Property.alpha + "|" + slotIndex,
                Property.rgb2 + "|" + slotIndex
            ]) || this;
            _this.slotIndex = 0;
            _this.slotIndex = slotIndex;
            return _this;
        }
        RGBA2Timeline.prototype.getFrameEntries = function () {
            return 8 /*ENTRIES*/;
        };
        /** Sets the time in seconds, light, and dark colors for the specified key frame. */
        RGBA2Timeline.prototype.setFrame = function (frame, time, r, g, b, a, r2, g2, b2) {
            frame <<= 3;
            this.frames[frame] = time;
            this.frames[frame + 1 /*R*/] = r;
            this.frames[frame + 2 /*G*/] = g;
            this.frames[frame + 3 /*B*/] = b;
            this.frames[frame + 4 /*A*/] = a;
            this.frames[frame + 5 /*R2*/] = r2;
            this.frames[frame + 6 /*G2*/] = g2;
            this.frames[frame + 7 /*B2*/] = b2;
        };
        RGBA2Timeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            var frames = this.frames;
            var light = slot.color, dark = slot.darkColor;
            if (time < frames[0]) {
                var setupLight = slot.data.color, setupDark = slot.data.darkColor;
                switch (blend) {
                    case exports.MixBlend.setup:
                        light.setFromColor(setupLight);
                        dark.r = setupDark.r;
                        dark.g = setupDark.g;
                        dark.b = setupDark.b;
                        return;
                    case exports.MixBlend.first:
                        light.add((setupLight.r - light.r) * alpha, (setupLight.g - light.g) * alpha, (setupLight.b - light.b) * alpha, (setupLight.a - light.a) * alpha);
                        dark.r += (setupDark.r - dark.r) * alpha;
                        dark.g += (setupDark.g - dark.g) * alpha;
                        dark.b += (setupDark.b - dark.b) * alpha;
                }
                return;
            }
            var r = 0, g = 0, b = 0, a = 0, r2 = 0, g2 = 0, b2 = 0;
            var i = Timeline.search(frames, time, 8 /*ENTRIES*/);
            var curveType = this.curves[i >> 3];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i];
                    r = frames[i + 1 /*R*/];
                    g = frames[i + 2 /*G*/];
                    b = frames[i + 3 /*B*/];
                    a = frames[i + 4 /*A*/];
                    r2 = frames[i + 5 /*R2*/];
                    g2 = frames[i + 6 /*G2*/];
                    b2 = frames[i + 7 /*B2*/];
                    var t = (time - before) / (frames[i + 8 /*ENTRIES*/] - before);
                    r += (frames[i + 8 /*ENTRIES*/ + 1 /*R*/] - r) * t;
                    g += (frames[i + 8 /*ENTRIES*/ + 2 /*G*/] - g) * t;
                    b += (frames[i + 8 /*ENTRIES*/ + 3 /*B*/] - b) * t;
                    a += (frames[i + 8 /*ENTRIES*/ + 4 /*A*/] - a) * t;
                    r2 += (frames[i + 8 /*ENTRIES*/ + 5 /*R2*/] - r2) * t;
                    g2 += (frames[i + 8 /*ENTRIES*/ + 6 /*G2*/] - g2) * t;
                    b2 += (frames[i + 8 /*ENTRIES*/ + 7 /*B2*/] - b2) * t;
                    break;
                case 1 /*STEPPED*/:
                    r = frames[i + 1 /*R*/];
                    g = frames[i + 2 /*G*/];
                    b = frames[i + 3 /*B*/];
                    a = frames[i + 4 /*A*/];
                    r2 = frames[i + 5 /*R2*/];
                    g2 = frames[i + 6 /*G2*/];
                    b2 = frames[i + 7 /*B2*/];
                    break;
                default:
                    r = this.getBezierValue(time, i, 1 /*R*/, curveType - 2 /*BEZIER*/);
                    g = this.getBezierValue(time, i, 2 /*G*/, curveType + 18 /*BEZIER_SIZE*/ - 2 /*BEZIER*/);
                    b = this.getBezierValue(time, i, 3 /*B*/, curveType + 18 /*BEZIER_SIZE*/ * 2 - 2 /*BEZIER*/);
                    a = this.getBezierValue(time, i, 4 /*A*/, curveType + 18 /*BEZIER_SIZE*/ * 3 - 2 /*BEZIER*/);
                    r2 = this.getBezierValue(time, i, 5 /*R2*/, curveType + 18 /*BEZIER_SIZE*/ * 4 - 2 /*BEZIER*/);
                    g2 = this.getBezierValue(time, i, 6 /*G2*/, curveType + 18 /*BEZIER_SIZE*/ * 5 - 2 /*BEZIER*/);
                    b2 = this.getBezierValue(time, i, 7 /*B2*/, curveType + 18 /*BEZIER_SIZE*/ * 6 - 2 /*BEZIER*/);
            }
            if (alpha == 1) {
                light.set(r, g, b, a);
                dark.r = r2;
                dark.g = g2;
                dark.b = b2;
            }
            else {
                if (blend == exports.MixBlend.setup) {
                    light.setFromColor(slot.data.color);
                    var setupDark = slot.data.darkColor;
                    dark.r = setupDark.r;
                    dark.g = setupDark.g;
                    dark.b = setupDark.b;
                }
                light.add((r - light.r) * alpha, (g - light.g) * alpha, (b - light.b) * alpha, (a - light.a) * alpha);
                dark.r += (r2 - dark.r) * alpha;
                dark.g += (g2 - dark.g) * alpha;
                dark.b += (b2 - dark.b) * alpha;
            }
        };
        return RGBA2Timeline;
    }(CurveTimeline));
    /** Changes a slot's {@link Slot#color} and {@link Slot#darkColor} for two color tinting.
     * @public
     * */
    var RGB2Timeline = /** @class */ (function (_super) {
        __extends$1(RGB2Timeline, _super);
        function RGB2Timeline(frameCount, bezierCount, slotIndex) {
            var _this = _super.call(this, frameCount, bezierCount, [
                Property.rgb + "|" + slotIndex,
                Property.rgb2 + "|" + slotIndex
            ]) || this;
            _this.slotIndex = 0;
            _this.slotIndex = slotIndex;
            return _this;
        }
        RGB2Timeline.prototype.getFrameEntries = function () {
            return 7 /*ENTRIES*/;
        };
        /** Sets the time in seconds, light, and dark colors for the specified key frame. */
        RGB2Timeline.prototype.setFrame = function (frame, time, r, g, b, r2, g2, b2) {
            frame *= 7 /*ENTRIES*/;
            this.frames[frame] = time;
            this.frames[frame + 1 /*R*/] = r;
            this.frames[frame + 2 /*G*/] = g;
            this.frames[frame + 3 /*B*/] = b;
            this.frames[frame + 4 /*R2*/] = r2;
            this.frames[frame + 5 /*G2*/] = g2;
            this.frames[frame + 6 /*B2*/] = b2;
        };
        RGB2Timeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            var frames = this.frames;
            var light = slot.color, dark = slot.darkColor;
            if (time < frames[0]) {
                var setupLight = slot.data.color, setupDark = slot.data.darkColor;
                switch (blend) {
                    case exports.MixBlend.setup:
                        light.r = setupLight.r;
                        light.g = setupLight.g;
                        light.b = setupLight.b;
                        dark.r = setupDark.r;
                        dark.g = setupDark.g;
                        dark.b = setupDark.b;
                        return;
                    case exports.MixBlend.first:
                        light.r += (setupLight.r - light.r) * alpha;
                        light.g += (setupLight.g - light.g) * alpha;
                        light.b += (setupLight.b - light.b) * alpha;
                        dark.r += (setupDark.r - dark.r) * alpha;
                        dark.g += (setupDark.g - dark.g) * alpha;
                        dark.b += (setupDark.b - dark.b) * alpha;
                }
                return;
            }
            var r = 0, g = 0, b = 0, r2 = 0, g2 = 0, b2 = 0;
            var i = Timeline.search(frames, time, 7 /*ENTRIES*/);
            var curveType = this.curves[i / 7 /*ENTRIES*/];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i];
                    r = frames[i + 1 /*R*/];
                    g = frames[i + 2 /*G*/];
                    b = frames[i + 3 /*B*/];
                    r2 = frames[i + 4 /*R2*/];
                    g2 = frames[i + 5 /*G2*/];
                    b2 = frames[i + 6 /*B2*/];
                    var t = (time - before) / (frames[i + 7 /*ENTRIES*/] - before);
                    r += (frames[i + 7 /*ENTRIES*/ + 1 /*R*/] - r) * t;
                    g += (frames[i + 7 /*ENTRIES*/ + 2 /*G*/] - g) * t;
                    b += (frames[i + 7 /*ENTRIES*/ + 3 /*B*/] - b) * t;
                    r2 += (frames[i + 7 /*ENTRIES*/ + 4 /*R2*/] - r2) * t;
                    g2 += (frames[i + 7 /*ENTRIES*/ + 5 /*G2*/] - g2) * t;
                    b2 += (frames[i + 7 /*ENTRIES*/ + 6 /*B2*/] - b2) * t;
                    break;
                case 1 /*STEPPED*/:
                    r = frames[i + 1 /*R*/];
                    g = frames[i + 2 /*G*/];
                    b = frames[i + 3 /*B*/];
                    r2 = frames[i + 4 /*R2*/];
                    g2 = frames[i + 5 /*G2*/];
                    b2 = frames[i + 6 /*B2*/];
                    break;
                default:
                    r = this.getBezierValue(time, i, 1 /*R*/, curveType - 2 /*BEZIER*/);
                    g = this.getBezierValue(time, i, 2 /*G*/, curveType + 18 /*BEZIER_SIZE*/ - 2 /*BEZIER*/);
                    b = this.getBezierValue(time, i, 3 /*B*/, curveType + 18 /*BEZIER_SIZE*/ * 2 - 2 /*BEZIER*/);
                    r2 = this.getBezierValue(time, i, 4 /*R2*/, curveType + 18 /*BEZIER_SIZE*/ * 3 - 2 /*BEZIER*/);
                    g2 = this.getBezierValue(time, i, 5 /*G2*/, curveType + 18 /*BEZIER_SIZE*/ * 4 - 2 /*BEZIER*/);
                    b2 = this.getBezierValue(time, i, 6 /*B2*/, curveType + 18 /*BEZIER_SIZE*/ * 5 - 2 /*BEZIER*/);
            }
            if (alpha == 1) {
                light.r = r;
                light.g = g;
                light.b = b;
                dark.r = r2;
                dark.g = g2;
                dark.b = b2;
            }
            else {
                if (blend == exports.MixBlend.setup) {
                    var setupLight = slot.data.color, setupDark = slot.data.darkColor;
                    light.r = setupLight.r;
                    light.g = setupLight.g;
                    light.b = setupLight.b;
                    dark.r = setupDark.r;
                    dark.g = setupDark.g;
                    dark.b = setupDark.b;
                }
                light.r += (r - light.r) * alpha;
                light.g += (g - light.g) * alpha;
                light.b += (b - light.b) * alpha;
                dark.r += (r2 - dark.r) * alpha;
                dark.g += (g2 - dark.g) * alpha;
                dark.b += (b2 - dark.b) * alpha;
            }
        };
        return RGB2Timeline;
    }(CurveTimeline));
    /** Changes a slot's {@link Slot#attachment}.
     * @public
     * */
    var AttachmentTimeline = /** @class */ (function (_super) {
        __extends$1(AttachmentTimeline, _super);
        function AttachmentTimeline(frameCount, slotIndex) {
            var _this = _super.call(this, frameCount, [
                Property.attachment + "|" + slotIndex
            ]) || this;
            _this.slotIndex = 0;
            _this.slotIndex = slotIndex;
            _this.attachmentNames = new Array(frameCount);
            return _this;
        }
        AttachmentTimeline.prototype.getFrameCount = function () {
            return this.frames.length;
        };
        /** Sets the time in seconds and the attachment name for the specified key frame. */
        AttachmentTimeline.prototype.setFrame = function (frame, time, attachmentName) {
            this.frames[frame] = time;
            this.attachmentNames[frame] = attachmentName;
        };
        AttachmentTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            if (direction == exports.MixDirection.mixOut) {
                if (blend == exports.MixBlend.setup)
                    this.setAttachment(skeleton, slot, slot.data.attachmentName);
                return;
            }
            if (time < this.frames[0]) {
                if (blend == exports.MixBlend.setup || blend == exports.MixBlend.first)
                    this.setAttachment(skeleton, slot, slot.data.attachmentName);
                return;
            }
            this.setAttachment(skeleton, slot, this.attachmentNames[Timeline.search1(this.frames, time)]);
        };
        AttachmentTimeline.prototype.setAttachment = function (skeleton, slot, attachmentName) {
            slot.setAttachment(!attachmentName ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
        };
        return AttachmentTimeline;
    }(Timeline));
    /** Changes a slot's {@link Slot#deform} to deform a {@link VertexAttachment}.
     * @public
     * */
    var DeformTimeline = /** @class */ (function (_super) {
        __extends$1(DeformTimeline, _super);
        function DeformTimeline(frameCount, bezierCount, slotIndex, attachment) {
            var _this = _super.call(this, frameCount, bezierCount, [
                Property.deform + "|" + slotIndex + "|" + attachment.id
            ]) || this;
            _this.slotIndex = 0;
            _this.slotIndex = slotIndex;
            _this.attachment = attachment;
            _this.vertices = new Array(frameCount);
            return _this;
        }
        DeformTimeline.prototype.getFrameCount = function () {
            return this.frames.length;
        };
        /** Sets the time in seconds and the vertices for the specified key frame.
         * @param vertices Vertex positions for an unweighted VertexAttachment, or deform offsets if it has weights. */
        DeformTimeline.prototype.setFrame = function (frame, time, vertices) {
            this.frames[frame] = time;
            this.vertices[frame] = vertices;
        };
        /** @param value1 Ignored (0 is used for a deform timeline).
         * @param value2 Ignored (1 is used for a deform timeline). */
        DeformTimeline.prototype.setBezier = function (bezier, frame, value, time1, value1, cx1, cy1, cx2, cy2, time2, value2) {
            var curves = this.curves;
            var i = this.getFrameCount() + bezier * 18 /*BEZIER_SIZE*/;
            if (value == 0)
                curves[frame] = 2 /*BEZIER*/ + i;
            var tmpx = (time1 - cx1 * 2 + cx2) * 0.03, tmpy = cy2 * 0.03 - cy1 * 0.06;
            var dddx = ((cx1 - cx2) * 3 - time1 + time2) * 0.006, dddy = (cy1 - cy2 + 0.33333333) * 0.018;
            var ddx = tmpx * 2 + dddx, ddy = tmpy * 2 + dddy;
            var dx = (cx1 - time1) * 0.3 + tmpx + dddx * 0.16666667, dy = cy1 * 0.3 + tmpy + dddy * 0.16666667;
            var x = time1 + dx, y = dy;
            for (var n = i + 18 /*BEZIER_SIZE*/; i < n; i += 2) {
                curves[i] = x;
                curves[i + 1] = y;
                dx += ddx;
                dy += ddy;
                ddx += dddx;
                ddy += dddy;
                x += dx;
                y += dy;
            }
        };
        DeformTimeline.prototype.getCurvePercent = function (time, frame) {
            var curves = this.curves;
            var i = curves[frame];
            switch (i) {
                case 0 /*LINEAR*/:
                    var x_3 = this.frames[frame];
                    return (time - x_3) / (this.frames[frame + this.getFrameEntries()] - x_3);
                case 1 /*STEPPED*/:
                    return 0;
            }
            i -= 2 /*BEZIER*/;
            if (curves[i] > time) {
                var x_4 = this.frames[frame];
                return curves[i + 1] * (time - x_4) / (curves[i] - x_4);
            }
            var n = i + 18 /*BEZIER_SIZE*/;
            for (i += 2; i < n; i += 2) {
                if (curves[i] >= time) {
                    var x_5 = curves[i - 2], y_3 = curves[i - 1];
                    return y_3 + (time - x_5) / (curves[i] - x_5) * (curves[i + 1] - y_3);
                }
            }
            var x = curves[n - 2], y = curves[n - 1];
            return y + (1 - y) * (time - x) / (this.frames[frame + this.getFrameEntries()] - x);
        };
        DeformTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            var slotAttachment = slot.getAttachment();
            if (!slotAttachment)
                return;
            if (!(slotAttachment instanceof VertexAttachment) || slotAttachment.timelineAttachment != this.attachment)
                return;
            var deform = slot.deform;
            if (deform.length == 0)
                blend = exports.MixBlend.setup;
            var vertices = this.vertices;
            var vertexCount = vertices[0].length;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        deform.length = 0;
                        return;
                    case exports.MixBlend.first:
                        if (alpha == 1) {
                            deform.length = 0;
                            return;
                        }
                        deform.length = vertexCount;
                        var vertexAttachment = slotAttachment;
                        if (!vertexAttachment.bones) {
                            // Unweighted vertex positions.
                            var setupVertices = vertexAttachment.vertices;
                            for (var i = 0; i < vertexCount; i++)
                                deform[i] += (setupVertices[i] - deform[i]) * alpha;
                        }
                        else {
                            // Weighted deform offsets.
                            alpha = 1 - alpha;
                            for (var i = 0; i < vertexCount; i++)
                                deform[i] *= alpha;
                        }
                }
                return;
            }
            deform.length = vertexCount;
            if (time >= frames[frames.length - 1]) { // Time is after last frame.
                var lastVertices = vertices[frames.length - 1];
                if (alpha == 1) {
                    if (blend == exports.MixBlend.add) {
                        var vertexAttachment = slotAttachment;
                        if (!vertexAttachment.bones) {
                            // Unweighted vertex positions, with alpha.
                            var setupVertices = vertexAttachment.vertices;
                            for (var i_1 = 0; i_1 < vertexCount; i_1++)
                                deform[i_1] += lastVertices[i_1] - setupVertices[i_1];
                        }
                        else {
                            // Weighted deform offsets, with alpha.
                            for (var i_2 = 0; i_2 < vertexCount; i_2++)
                                deform[i_2] += lastVertices[i_2];
                        }
                    }
                    else
                        Utils.arrayCopy(lastVertices, 0, deform, 0, vertexCount);
                }
                else {
                    switch (blend) {
                        case exports.MixBlend.setup: {
                            var vertexAttachment_1 = slotAttachment;
                            if (!vertexAttachment_1.bones) {
                                // Unweighted vertex positions, with alpha.
                                var setupVertices = vertexAttachment_1.vertices;
                                for (var i_3 = 0; i_3 < vertexCount; i_3++) {
                                    var setup = setupVertices[i_3];
                                    deform[i_3] = setup + (lastVertices[i_3] - setup) * alpha;
                                }
                            }
                            else {
                                // Weighted deform offsets, with alpha.
                                for (var i_4 = 0; i_4 < vertexCount; i_4++)
                                    deform[i_4] = lastVertices[i_4] * alpha;
                            }
                            break;
                        }
                        case exports.MixBlend.first:
                        case exports.MixBlend.replace:
                            for (var i_5 = 0; i_5 < vertexCount; i_5++)
                                deform[i_5] += (lastVertices[i_5] - deform[i_5]) * alpha;
                            break;
                        case exports.MixBlend.add:
                            var vertexAttachment = slotAttachment;
                            if (!vertexAttachment.bones) {
                                // Unweighted vertex positions, with alpha.
                                var setupVertices = vertexAttachment.vertices;
                                for (var i_6 = 0; i_6 < vertexCount; i_6++)
                                    deform[i_6] += (lastVertices[i_6] - setupVertices[i_6]) * alpha;
                            }
                            else {
                                // Weighted deform offsets, with alpha.
                                for (var i_7 = 0; i_7 < vertexCount; i_7++)
                                    deform[i_7] += lastVertices[i_7] * alpha;
                            }
                    }
                }
                return;
            }
            // Interpolate between the previous frame and the current frame.
            var frame = Timeline.search1(frames, time);
            var percent = this.getCurvePercent(time, frame);
            var prevVertices = vertices[frame];
            var nextVertices = vertices[frame + 1];
            if (alpha == 1) {
                if (blend == exports.MixBlend.add) {
                    var vertexAttachment = slotAttachment;
                    if (!vertexAttachment.bones) {
                        // Unweighted vertex positions, with alpha.
                        var setupVertices = vertexAttachment.vertices;
                        for (var i_8 = 0; i_8 < vertexCount; i_8++) {
                            var prev = prevVertices[i_8];
                            deform[i_8] += prev + (nextVertices[i_8] - prev) * percent - setupVertices[i_8];
                        }
                    }
                    else {
                        // Weighted deform offsets, with alpha.
                        for (var i_9 = 0; i_9 < vertexCount; i_9++) {
                            var prev = prevVertices[i_9];
                            deform[i_9] += prev + (nextVertices[i_9] - prev) * percent;
                        }
                    }
                }
                else {
                    for (var i_10 = 0; i_10 < vertexCount; i_10++) {
                        var prev = prevVertices[i_10];
                        deform[i_10] = prev + (nextVertices[i_10] - prev) * percent;
                    }
                }
            }
            else {
                switch (blend) {
                    case exports.MixBlend.setup: {
                        var vertexAttachment_2 = slotAttachment;
                        if (!vertexAttachment_2.bones) {
                            // Unweighted vertex positions, with alpha.
                            var setupVertices = vertexAttachment_2.vertices;
                            for (var i_11 = 0; i_11 < vertexCount; i_11++) {
                                var prev = prevVertices[i_11], setup = setupVertices[i_11];
                                deform[i_11] = setup + (prev + (nextVertices[i_11] - prev) * percent - setup) * alpha;
                            }
                        }
                        else {
                            // Weighted deform offsets, with alpha.
                            for (var i_12 = 0; i_12 < vertexCount; i_12++) {
                                var prev = prevVertices[i_12];
                                deform[i_12] = (prev + (nextVertices[i_12] - prev) * percent) * alpha;
                            }
                        }
                        break;
                    }
                    case exports.MixBlend.first:
                    case exports.MixBlend.replace:
                        for (var i_13 = 0; i_13 < vertexCount; i_13++) {
                            var prev = prevVertices[i_13];
                            deform[i_13] += (prev + (nextVertices[i_13] - prev) * percent - deform[i_13]) * alpha;
                        }
                        break;
                    case exports.MixBlend.add:
                        var vertexAttachment = slotAttachment;
                        if (!vertexAttachment.bones) {
                            // Unweighted vertex positions, with alpha.
                            var setupVertices = vertexAttachment.vertices;
                            for (var i_14 = 0; i_14 < vertexCount; i_14++) {
                                var prev = prevVertices[i_14];
                                deform[i_14] += (prev + (nextVertices[i_14] - prev) * percent - setupVertices[i_14]) * alpha;
                            }
                        }
                        else {
                            // Weighted deform offsets, with alpha.
                            for (var i_15 = 0; i_15 < vertexCount; i_15++) {
                                var prev = prevVertices[i_15];
                                deform[i_15] += (prev + (nextVertices[i_15] - prev) * percent) * alpha;
                            }
                        }
                }
            }
        };
        return DeformTimeline;
    }(CurveTimeline));
    /** Fires an {@link Event} when specific animation times are reached.
     * @public
     * */
    var EventTimeline = /** @class */ (function (_super) {
        __extends$1(EventTimeline, _super);
        function EventTimeline(frameCount) {
            var _this = _super.call(this, frameCount, EventTimeline.propertyIds) || this;
            _this.events = new Array(frameCount);
            return _this;
        }
        EventTimeline.prototype.getFrameCount = function () {
            return this.frames.length;
        };
        /** Sets the time in seconds and the event for the specified key frame. */
        EventTimeline.prototype.setFrame = function (frame, event) {
            this.frames[frame] = event.time;
            this.events[frame] = event;
        };
        /** Fires events for frames > `lastTime` and <= `time`. */
        EventTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            if (!firedEvents)
                return;
            var frames = this.frames;
            var frameCount = this.frames.length;
            if (lastTime > time) { // Fire events after last time for looped animations.
                this.apply(skeleton, lastTime, Number.MAX_VALUE, firedEvents, alpha, blend, direction);
                lastTime = -1;
            }
            else if (lastTime >= frames[frameCount - 1]) // Last time is after last frame.
                return;
            if (time < frames[0])
                return; // Time is before first frame.
            var i = 0;
            if (lastTime < frames[0])
                i = 0;
            else {
                i = Timeline.search1(frames, lastTime) + 1;
                var frameTime = frames[i];
                while (i > 0) { // Fire multiple events with the same frame.
                    if (frames[i - 1] != frameTime)
                        break;
                    i--;
                }
            }
            for (; i < frameCount && time >= frames[i]; i++)
                firedEvents.push(this.events[i]);
        };
        EventTimeline.propertyIds = ["" + Property.event];
        return EventTimeline;
    }(Timeline));
    /** Changes a skeleton's {@link Skeleton#drawOrder}.
     * @public
     * */
    var DrawOrderTimeline = /** @class */ (function (_super) {
        __extends$1(DrawOrderTimeline, _super);
        function DrawOrderTimeline(frameCount) {
            var _this = _super.call(this, frameCount, DrawOrderTimeline.propertyIds) || this;
            _this.drawOrders = new Array(frameCount);
            return _this;
        }
        DrawOrderTimeline.prototype.getFrameCount = function () {
            return this.frames.length;
        };
        /** Sets the time in seconds and the draw order for the specified key frame.
         * @param drawOrder For each slot in {@link Skeleton#slots}, the index of the new draw order. May be null to use setup pose
         *           draw order. */
        DrawOrderTimeline.prototype.setFrame = function (frame, time, drawOrder) {
            this.frames[frame] = time;
            this.drawOrders[frame] = drawOrder;
        };
        DrawOrderTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            if (direction == exports.MixDirection.mixOut) {
                if (blend == exports.MixBlend.setup)
                    Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                return;
            }
            if (time < this.frames[0]) {
                if (blend == exports.MixBlend.setup || blend == exports.MixBlend.first)
                    Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                return;
            }
            var idx = Timeline.search1(this.frames, time);
            var drawOrderToSetupIndex = this.drawOrders[idx];
            if (!drawOrderToSetupIndex)
                Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
            else {
                var drawOrder = skeleton.drawOrder;
                var slots = skeleton.slots;
                for (var i = 0, n = drawOrderToSetupIndex.length; i < n; i++)
                    drawOrder[i] = slots[drawOrderToSetupIndex[i]];
            }
        };
        DrawOrderTimeline.propertyIds = ["" + Property.drawOrder];
        return DrawOrderTimeline;
    }(Timeline));
    /** Changes an IK constraint's {@link IkConstraint#mix}, {@link IkConstraint#softness},
     * {@link IkConstraint#bendDirection}, {@link IkConstraint#stretch}, and {@link IkConstraint#compress}.
     * @public
     * */
    var IkConstraintTimeline = /** @class */ (function (_super) {
        __extends$1(IkConstraintTimeline, _super);
        function IkConstraintTimeline(frameCount, bezierCount, ikConstraintIndex) {
            var _this = _super.call(this, frameCount, bezierCount, [
                Property.ikConstraint + "|" + ikConstraintIndex
            ]) || this;
            /** The index of the IK constraint slot in {@link Skeleton#ikConstraints} that will be changed. */
            _this.ikConstraintIndex = 0;
            _this.ikConstraintIndex = ikConstraintIndex;
            return _this;
        }
        IkConstraintTimeline.prototype.getFrameEntries = function () {
            return 6 /*ENTRIES*/;
        };
        /** Sets the time in seconds, mix, softness, bend direction, compress, and stretch for the specified key frame. */
        IkConstraintTimeline.prototype.setFrame = function (frame, time, mix, softness, bendDirection, compress, stretch) {
            frame *= 6 /*ENTRIES*/;
            this.frames[frame] = time;
            this.frames[frame + 1 /*MIX*/] = mix;
            this.frames[frame + 2 /*SOFTNESS*/] = softness;
            this.frames[frame + 3 /*BEND_DIRECTION*/] = bendDirection;
            this.frames[frame + 4 /*COMPRESS*/] = compress ? 1 : 0;
            this.frames[frame + 5 /*STRETCH*/] = stretch ? 1 : 0;
        };
        IkConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var constraint = skeleton.ikConstraints[this.ikConstraintIndex];
            if (!constraint.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        constraint.mix = constraint.data.mix;
                        constraint.softness = constraint.data.softness;
                        constraint.bendDirection = constraint.data.bendDirection;
                        constraint.compress = constraint.data.compress;
                        constraint.stretch = constraint.data.stretch;
                        return;
                    case exports.MixBlend.first:
                        constraint.mix += (constraint.data.mix - constraint.mix) * alpha;
                        constraint.softness += (constraint.data.softness - constraint.softness) * alpha;
                        constraint.bendDirection = constraint.data.bendDirection;
                        constraint.compress = constraint.data.compress;
                        constraint.stretch = constraint.data.stretch;
                }
                return;
            }
            var mix = 0, softness = 0;
            var i = Timeline.search(frames, time, 6 /*ENTRIES*/);
            var curveType = this.curves[i / 6 /*ENTRIES*/];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i];
                    mix = frames[i + 1 /*MIX*/];
                    softness = frames[i + 2 /*SOFTNESS*/];
                    var t = (time - before) / (frames[i + 6 /*ENTRIES*/] - before);
                    mix += (frames[i + 6 /*ENTRIES*/ + 1 /*MIX*/] - mix) * t;
                    softness += (frames[i + 6 /*ENTRIES*/ + 2 /*SOFTNESS*/] - softness) * t;
                    break;
                case 1 /*STEPPED*/:
                    mix = frames[i + 1 /*MIX*/];
                    softness = frames[i + 2 /*SOFTNESS*/];
                    break;
                default:
                    mix = this.getBezierValue(time, i, 1 /*MIX*/, curveType - 2 /*BEZIER*/);
                    softness = this.getBezierValue(time, i, 2 /*SOFTNESS*/, curveType + 18 /*BEZIER_SIZE*/ - 2 /*BEZIER*/);
            }
            if (blend == exports.MixBlend.setup) {
                constraint.mix = constraint.data.mix + (mix - constraint.data.mix) * alpha;
                constraint.softness = constraint.data.softness + (softness - constraint.data.softness) * alpha;
                if (direction == exports.MixDirection.mixOut) {
                    constraint.bendDirection = constraint.data.bendDirection;
                    constraint.compress = constraint.data.compress;
                    constraint.stretch = constraint.data.stretch;
                }
                else {
                    constraint.bendDirection = frames[i + 3 /*BEND_DIRECTION*/];
                    constraint.compress = frames[i + 4 /*COMPRESS*/] != 0;
                    constraint.stretch = frames[i + 5 /*STRETCH*/] != 0;
                }
            }
            else {
                constraint.mix += (mix - constraint.mix) * alpha;
                constraint.softness += (softness - constraint.softness) * alpha;
                if (direction == exports.MixDirection.mixIn) {
                    constraint.bendDirection = frames[i + 3 /*BEND_DIRECTION*/];
                    constraint.compress = frames[i + 4 /*COMPRESS*/] != 0;
                    constraint.stretch = frames[i + 5 /*STRETCH*/] != 0;
                }
            }
        };
        return IkConstraintTimeline;
    }(CurveTimeline));
    /** Changes a transform constraint's {@link TransformConstraint#rotateMix}, {@link TransformConstraint#translateMix},
     * {@link TransformConstraint#scaleMix}, and {@link TransformConstraint#shearMix}.
     * @public
     * */
    var TransformConstraintTimeline = /** @class */ (function (_super) {
        __extends$1(TransformConstraintTimeline, _super);
        function TransformConstraintTimeline(frameCount, bezierCount, transformConstraintIndex) {
            var _this = _super.call(this, frameCount, bezierCount, [
                Property.transformConstraint + "|" + transformConstraintIndex
            ]) || this;
            /** The index of the transform constraint slot in {@link Skeleton#transformConstraints} that will be changed. */
            _this.transformConstraintIndex = 0;
            _this.transformConstraintIndex = transformConstraintIndex;
            return _this;
        }
        TransformConstraintTimeline.prototype.getFrameEntries = function () {
            return 7 /*ENTRIES*/;
        };
        /** The time in seconds, rotate mix, translate mix, scale mix, and shear mix for the specified key frame. */
        TransformConstraintTimeline.prototype.setFrame = function (frame, time, mixRotate, mixX, mixY, mixScaleX, mixScaleY, mixShearY) {
            var frames = this.frames;
            frame *= 7 /*ENTRIES*/;
            frames[frame] = time;
            frames[frame + 1 /*ROTATE*/] = mixRotate;
            frames[frame + 2 /*X*/] = mixX;
            frames[frame + 3 /*Y*/] = mixY;
            frames[frame + 4 /*SCALEX*/] = mixScaleX;
            frames[frame + 5 /*SCALEY*/] = mixScaleY;
            frames[frame + 6 /*SHEARY*/] = mixShearY;
        };
        TransformConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var constraint = skeleton.transformConstraints[this.transformConstraintIndex];
            if (!constraint.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                var data = constraint.data;
                switch (blend) {
                    case exports.MixBlend.setup:
                        constraint.mixRotate = data.mixRotate;
                        constraint.mixX = data.mixX;
                        constraint.mixY = data.mixY;
                        constraint.mixScaleX = data.mixScaleX;
                        constraint.mixScaleY = data.mixScaleY;
                        constraint.mixShearY = data.mixShearY;
                        return;
                    case exports.MixBlend.first:
                        constraint.mixRotate += (data.mixRotate - constraint.mixRotate) * alpha;
                        constraint.mixX += (data.mixX - constraint.mixX) * alpha;
                        constraint.mixY += (data.mixY - constraint.mixY) * alpha;
                        constraint.mixScaleX += (data.mixScaleX - constraint.mixScaleX) * alpha;
                        constraint.mixScaleY += (data.mixScaleY - constraint.mixScaleY) * alpha;
                        constraint.mixShearY += (data.mixShearY - constraint.mixShearY) * alpha;
                }
                return;
            }
            var rotate, x, y, scaleX, scaleY, shearY;
            var i = Timeline.search(frames, time, 7 /*ENTRIES*/);
            var curveType = this.curves[i / 7 /*ENTRIES*/];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i];
                    rotate = frames[i + 1 /*ROTATE*/];
                    x = frames[i + 2 /*X*/];
                    y = frames[i + 3 /*Y*/];
                    scaleX = frames[i + 4 /*SCALEX*/];
                    scaleY = frames[i + 5 /*SCALEY*/];
                    shearY = frames[i + 6 /*SHEARY*/];
                    var t = (time - before) / (frames[i + 7 /*ENTRIES*/] - before);
                    rotate += (frames[i + 7 /*ENTRIES*/ + 1 /*ROTATE*/] - rotate) * t;
                    x += (frames[i + 7 /*ENTRIES*/ + 2 /*X*/] - x) * t;
                    y += (frames[i + 7 /*ENTRIES*/ + 3 /*Y*/] - y) * t;
                    scaleX += (frames[i + 7 /*ENTRIES*/ + 4 /*SCALEX*/] - scaleX) * t;
                    scaleY += (frames[i + 7 /*ENTRIES*/ + 5 /*SCALEY*/] - scaleY) * t;
                    shearY += (frames[i + 7 /*ENTRIES*/ + 6 /*SHEARY*/] - shearY) * t;
                    break;
                case 1 /*STEPPED*/:
                    rotate = frames[i + 1 /*ROTATE*/];
                    x = frames[i + 2 /*X*/];
                    y = frames[i + 3 /*Y*/];
                    scaleX = frames[i + 4 /*SCALEX*/];
                    scaleY = frames[i + 5 /*SCALEY*/];
                    shearY = frames[i + 6 /*SHEARY*/];
                    break;
                default:
                    rotate = this.getBezierValue(time, i, 1 /*ROTATE*/, curveType - 2 /*BEZIER*/);
                    x = this.getBezierValue(time, i, 2 /*X*/, curveType + 18 /*BEZIER_SIZE*/ - 2 /*BEZIER*/);
                    y = this.getBezierValue(time, i, 3 /*Y*/, curveType + 18 /*BEZIER_SIZE*/ * 2 - 2 /*BEZIER*/);
                    scaleX = this.getBezierValue(time, i, 4 /*SCALEX*/, curveType + 18 /*BEZIER_SIZE*/ * 3 - 2 /*BEZIER*/);
                    scaleY = this.getBezierValue(time, i, 5 /*SCALEY*/, curveType + 18 /*BEZIER_SIZE*/ * 4 - 2 /*BEZIER*/);
                    shearY = this.getBezierValue(time, i, 6 /*SHEARY*/, curveType + 18 /*BEZIER_SIZE*/ * 5 - 2 /*BEZIER*/);
            }
            if (blend == exports.MixBlend.setup) {
                var data = constraint.data;
                constraint.mixRotate = data.mixRotate + (rotate - data.mixRotate) * alpha;
                constraint.mixX = data.mixX + (x - data.mixX) * alpha;
                constraint.mixY = data.mixY + (y - data.mixY) * alpha;
                constraint.mixScaleX = data.mixScaleX + (scaleX - data.mixScaleX) * alpha;
                constraint.mixScaleY = data.mixScaleY + (scaleY - data.mixScaleY) * alpha;
                constraint.mixShearY = data.mixShearY + (shearY - data.mixShearY) * alpha;
            }
            else {
                constraint.mixRotate += (rotate - constraint.mixRotate) * alpha;
                constraint.mixX += (x - constraint.mixX) * alpha;
                constraint.mixY += (y - constraint.mixY) * alpha;
                constraint.mixScaleX += (scaleX - constraint.mixScaleX) * alpha;
                constraint.mixScaleY += (scaleY - constraint.mixScaleY) * alpha;
                constraint.mixShearY += (shearY - constraint.mixShearY) * alpha;
            }
        };
        return TransformConstraintTimeline;
    }(CurveTimeline));
    /** Changes a path constraint's {@link PathConstraint#position}.
     * @public
     * */
    var PathConstraintPositionTimeline = /** @class */ (function (_super) {
        __extends$1(PathConstraintPositionTimeline, _super);
        function PathConstraintPositionTimeline(frameCount, bezierCount, pathConstraintIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.pathConstraintPosition + "|" + pathConstraintIndex) || this;
            /** The index of the path constraint slot in {@link Skeleton#pathConstraints} that will be changed. */
            _this.pathConstraintIndex = 0;
            _this.pathConstraintIndex = pathConstraintIndex;
            return _this;
        }
        PathConstraintPositionTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
            if (!constraint.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        constraint.position = constraint.data.position;
                        return;
                    case exports.MixBlend.first:
                        constraint.position += (constraint.data.position - constraint.position) * alpha;
                }
                return;
            }
            var position = this.getCurveValue(time);
            if (blend == exports.MixBlend.setup)
                constraint.position = constraint.data.position + (position - constraint.data.position) * alpha;
            else
                constraint.position += (position - constraint.position) * alpha;
        };
        return PathConstraintPositionTimeline;
    }(CurveTimeline1));
    /** Changes a path constraint's {@link PathConstraint#spacing}.
     * @public
     * */
    var PathConstraintSpacingTimeline = /** @class */ (function (_super) {
        __extends$1(PathConstraintSpacingTimeline, _super);
        function PathConstraintSpacingTimeline(frameCount, bezierCount, pathConstraintIndex) {
            var _this = _super.call(this, frameCount, bezierCount, Property.pathConstraintSpacing + "|" + pathConstraintIndex) || this;
            /** The index of the path constraint slot in {@link Skeleton#getPathConstraints()} that will be changed. */
            _this.pathConstraintIndex = 0;
            _this.pathConstraintIndex = pathConstraintIndex;
            return _this;
        }
        PathConstraintSpacingTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
            if (!constraint.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        constraint.spacing = constraint.data.spacing;
                        return;
                    case exports.MixBlend.first:
                        constraint.spacing += (constraint.data.spacing - constraint.spacing) * alpha;
                }
                return;
            }
            var spacing = this.getCurveValue(time);
            if (blend == exports.MixBlend.setup)
                constraint.spacing = constraint.data.spacing + (spacing - constraint.data.spacing) * alpha;
            else
                constraint.spacing += (spacing - constraint.spacing) * alpha;
        };
        return PathConstraintSpacingTimeline;
    }(CurveTimeline1));
    /** Changes a transform constraint's {@link PathConstraint#getMixRotate()}, {@link PathConstraint#getMixX()}, and
     * {@link PathConstraint#getMixY()}.
     * @public
     * */
    var PathConstraintMixTimeline = /** @class */ (function (_super) {
        __extends$1(PathConstraintMixTimeline, _super);
        function PathConstraintMixTimeline(frameCount, bezierCount, pathConstraintIndex) {
            var _this = _super.call(this, frameCount, bezierCount, [
                Property.pathConstraintMix + "|" + pathConstraintIndex
            ]) || this;
            /** The index of the path constraint slot in {@link Skeleton#getPathConstraints()} that will be changed. */
            _this.pathConstraintIndex = 0;
            _this.pathConstraintIndex = pathConstraintIndex;
            return _this;
        }
        PathConstraintMixTimeline.prototype.getFrameEntries = function () {
            return 4 /*ENTRIES*/;
        };
        PathConstraintMixTimeline.prototype.setFrame = function (frame, time, mixRotate, mixX, mixY) {
            var frames = this.frames;
            frame <<= 2;
            frames[frame] = time;
            frames[frame + 1 /*ROTATE*/] = mixRotate;
            frames[frame + 2 /*X*/] = mixX;
            frames[frame + 3 /*Y*/] = mixY;
        };
        PathConstraintMixTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
            var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
            if (!constraint.active)
                return;
            var frames = this.frames;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        constraint.mixRotate = constraint.data.mixRotate;
                        constraint.mixX = constraint.data.mixX;
                        constraint.mixY = constraint.data.mixY;
                        return;
                    case exports.MixBlend.first:
                        constraint.mixRotate += (constraint.data.mixRotate - constraint.mixRotate) * alpha;
                        constraint.mixX += (constraint.data.mixX - constraint.mixX) * alpha;
                        constraint.mixY += (constraint.data.mixY - constraint.mixY) * alpha;
                }
                return;
            }
            var rotate, x, y;
            var i = Timeline.search(frames, time, 4 /*ENTRIES*/);
            var curveType = this.curves[i >> 2];
            switch (curveType) {
                case 0 /*LINEAR*/:
                    var before = frames[i];
                    rotate = frames[i + 1 /*ROTATE*/];
                    x = frames[i + 2 /*X*/];
                    y = frames[i + 3 /*Y*/];
                    var t = (time - before) / (frames[i + 4 /*ENTRIES*/] - before);
                    rotate += (frames[i + 4 /*ENTRIES*/ + 1 /*ROTATE*/] - rotate) * t;
                    x += (frames[i + 4 /*ENTRIES*/ + 2 /*X*/] - x) * t;
                    y += (frames[i + 4 /*ENTRIES*/ + 3 /*Y*/] - y) * t;
                    break;
                case 1 /*STEPPED*/:
                    rotate = frames[i + 1 /*ROTATE*/];
                    x = frames[i + 2 /*X*/];
                    y = frames[i + 3 /*Y*/];
                    break;
                default:
                    rotate = this.getBezierValue(time, i, 1 /*ROTATE*/, curveType - 2 /*BEZIER*/);
                    x = this.getBezierValue(time, i, 2 /*X*/, curveType + 18 /*BEZIER_SIZE*/ - 2 /*BEZIER*/);
                    y = this.getBezierValue(time, i, 3 /*Y*/, curveType + 18 /*BEZIER_SIZE*/ * 2 - 2 /*BEZIER*/);
            }
            if (blend == exports.MixBlend.setup) {
                var data = constraint.data;
                constraint.mixRotate = data.mixRotate + (rotate - data.mixRotate) * alpha;
                constraint.mixX = data.mixX + (x - data.mixX) * alpha;
                constraint.mixY = data.mixY + (y - data.mixY) * alpha;
            }
            else {
                constraint.mixRotate += (rotate - constraint.mixRotate) * alpha;
                constraint.mixX += (x - constraint.mixX) * alpha;
                constraint.mixY += (y - constraint.mixY) * alpha;
            }
        };
        return PathConstraintMixTimeline;
    }(CurveTimeline));
    /** Changes a slot's {@link Slot#getSequenceIndex()} for an attachment's {@link Sequence}.
     * @public
     * */
    var SequenceTimeline = /** @class */ (function (_super) {
        __extends$1(SequenceTimeline, _super);
        function SequenceTimeline(frameCount, slotIndex, attachment) {
            var _this = _super.call(this, frameCount, [
                Property.sequence + "|" + slotIndex + "|" + attachment.sequence.id
            ]) || this;
            _this.slotIndex = slotIndex;
            _this.attachment = attachment;
            return _this;
        }
        SequenceTimeline.prototype.getFrameEntries = function () {
            return SequenceTimeline.ENTRIES;
        };
        SequenceTimeline.prototype.getSlotIndex = function () {
            return this.slotIndex;
        };
        SequenceTimeline.prototype.getAttachment = function () {
            return this.attachment;
        };
        /** Sets the time, mode, index, and frame time for the specified frame.
         * @param frame Between 0 and <code>frameCount</code>, inclusive.
         * @param time Seconds between frames. */
        SequenceTimeline.prototype.setFrame = function (frame, time, mode, index, delay) {
            var frames = this.frames;
            frame *= SequenceTimeline.ENTRIES;
            frames[frame] = time;
            frames[frame + SequenceTimeline.MODE] = mode | (index << 4);
            frames[frame + SequenceTimeline.DELAY] = delay;
        };
        SequenceTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, blend, direction) {
            var slot = skeleton.slots[this.slotIndex];
            if (!slot.bone.active)
                return;
            var slotAttachment = slot.attachment;
            var attachment = this.attachment;
            if (slotAttachment != attachment) {
                if (!(slotAttachment instanceof VertexAttachment)
                    || slotAttachment.timelineAttachment != attachment)
                    return;
            }
            var frames = this.frames;
            if (time < frames[0]) { // Time is before first frame.
                if (blend == exports.MixBlend.setup || blend == exports.MixBlend.first)
                    slot.sequenceIndex = -1;
                return;
            }
            var i = Timeline.search(frames, time, SequenceTimeline.ENTRIES);
            var before = frames[i];
            var modeAndIndex = frames[i + SequenceTimeline.MODE];
            var delay = frames[i + SequenceTimeline.DELAY];
            if (!this.attachment.sequence)
                return;
            var index = modeAndIndex >> 4, count = this.attachment.sequence.regions.length;
            var mode = SequenceModeValues[modeAndIndex & 0xf];
            if (mode != exports.SequenceMode.hold) {
                index += (((time - before) / delay + 0.00001) | 0);
                switch (mode) {
                    case exports.SequenceMode.once:
                        index = Math.min(count - 1, index);
                        break;
                    case exports.SequenceMode.loop:
                        index %= count;
                        break;
                    case exports.SequenceMode.pingpong: {
                        var n = (count << 1) - 2;
                        index = n == 0 ? 0 : index % n;
                        if (index >= count)
                            index = n - index;
                        break;
                    }
                    case exports.SequenceMode.onceReverse:
                        index = Math.max(count - 1 - index, 0);
                        break;
                    case exports.SequenceMode.loopReverse:
                        index = count - 1 - (index % count);
                        break;
                    case exports.SequenceMode.pingpongReverse: {
                        var n = (count << 1) - 2;
                        index = n == 0 ? 0 : (index + count - 1) % n;
                        if (index >= count)
                            index = n - index;
                    }
                }
            }
            slot.sequenceIndex = index;
        };
        SequenceTimeline.ENTRIES = 3;
        SequenceTimeline.MODE = 1;
        SequenceTimeline.DELAY = 2;
        return SequenceTimeline;
    }(Timeline));

    /** Applies animations over time, queues animations for later playback, mixes (crossfading) between animations, and applies
     * multiple animations on top of each other (layering).
     *
     * See [Applying Animations](http://esotericsoftware.com/spine-applying-animations/) in the Spine Runtimes Guide.
     * @public
     * */
    var AnimationState = /** @class */ (function () {
        function AnimationState(data) {
            /** The list of tracks that currently have animations, which may contain null entries. */
            this.tracks = new Array();
            /** Multiplier for the delta time when the animation state is updated, causing time for all animations and mixes to play slower
             * or faster. Defaults to 1.
             *
             * See TrackEntry {@link TrackEntry#timeScale} for affecting a single animation. */
            this.timeScale = 1;
            this.unkeyedState = 0;
            this.events = new Array();
            this.listeners = new Array();
            this.queue = new EventQueue(this);
            this.propertyIDs = new StringSet();
            this.animationsChanged = false;
            this.trackEntryPool = new Pool(function () { return new TrackEntry(); });
            this.data = data;
        }
        AnimationState.emptyAnimation = function () {
            return AnimationState._emptyAnimation;
        };
        /** Increments each track entry {@link TrackEntry#trackTime()}, setting queued animations as current if needed. */
        AnimationState.prototype.update = function (delta) {
            delta *= this.timeScale;
            var tracks = this.tracks;
            for (var i = 0, n = tracks.length; i < n; i++) {
                var current = tracks[i];
                if (!current)
                    continue;
                current.animationLast = current.nextAnimationLast;
                current.trackLast = current.nextTrackLast;
                var currentDelta = delta * current.timeScale;
                if (current.delay > 0) {
                    current.delay -= currentDelta;
                    if (current.delay > 0)
                        continue;
                    currentDelta = -current.delay;
                    current.delay = 0;
                }
                var next = current.next;
                if (next) {
                    // When the next entry's delay is passed, change to the next entry, preserving leftover time.
                    var nextTime = current.trackLast - next.delay;
                    if (nextTime >= 0) {
                        next.delay = 0;
                        next.trackTime += current.timeScale == 0 ? 0 : (nextTime / current.timeScale + delta) * next.timeScale;
                        current.trackTime += currentDelta;
                        this.setCurrent(i, next, true);
                        while (next.mixingFrom) {
                            next.mixTime += delta;
                            next = next.mixingFrom;
                        }
                        continue;
                    }
                }
                else if (current.trackLast >= current.trackEnd && !current.mixingFrom) {
                    tracks[i] = null;
                    this.queue.end(current);
                    this.clearNext(current);
                    continue;
                }
                if (current.mixingFrom && this.updateMixingFrom(current, delta)) {
                    // End mixing from entries once all have completed.
                    var from = current.mixingFrom;
                    current.mixingFrom = null;
                    if (from)
                        from.mixingTo = null;
                    while (from) {
                        this.queue.end(from);
                        from = from.mixingFrom;
                    }
                }
                current.trackTime += currentDelta;
            }
            this.queue.drain();
        };
        /** Returns true when all mixing from entries are complete. */
        AnimationState.prototype.updateMixingFrom = function (to, delta) {
            var from = to.mixingFrom;
            if (!from)
                return true;
            var finished = this.updateMixingFrom(from, delta);
            from.animationLast = from.nextAnimationLast;
            from.trackLast = from.nextTrackLast;
            // Require mixTime > 0 to ensure the mixing from entry was applied at least once.
            if (to.mixTime > 0 && to.mixTime >= to.mixDuration) {
                // Require totalAlpha == 0 to ensure mixing is complete, unless mixDuration == 0 (the transition is a single frame).
                if (from.totalAlpha == 0 || to.mixDuration == 0) {
                    to.mixingFrom = from.mixingFrom;
                    if (from.mixingFrom)
                        from.mixingFrom.mixingTo = to;
                    to.interruptAlpha = from.interruptAlpha;
                    this.queue.end(from);
                }
                return finished;
            }
            from.trackTime += delta * from.timeScale;
            to.mixTime += delta;
            return false;
        };
        /** Poses the skeleton using the track entry animations. There are no side effects other than invoking listeners, so the
         * animation state can be applied to multiple skeletons to pose them identically.
         * @returns True if any animations were applied. */
        AnimationState.prototype.apply = function (skeleton) {
            if (!skeleton)
                throw new Error("skeleton cannot be null.");
            if (this.animationsChanged)
                this._animationsChanged();
            var events = this.events;
            var tracks = this.tracks;
            var applied = false;
            for (var i_1 = 0, n_1 = tracks.length; i_1 < n_1; i_1++) {
                var current = tracks[i_1];
                if (!current || current.delay > 0)
                    continue;
                applied = true;
                var blend = i_1 == 0 ? exports.MixBlend.first : current.mixBlend;
                // Apply mixing from entries first.
                var mix = current.alpha;
                if (current.mixingFrom)
                    mix *= this.applyMixingFrom(current, skeleton, blend);
                else if (current.trackTime >= current.trackEnd && !current.next)
                    mix = 0;
                // Apply current entry.
                var animationLast = current.animationLast, animationTime = current.getAnimationTime(), applyTime = animationTime;
                var applyEvents = events;
                if (current.reverse) {
                    applyTime = current.animation.duration - applyTime;
                    applyEvents = null;
                }
                var timelines = current.animation.timelines;
                var timelineCount = timelines.length;
                if ((i_1 == 0 && mix == 1) || blend == exports.MixBlend.add) {
                    for (var ii = 0; ii < timelineCount; ii++) {
                        // Fixes issue #302 on IOS9 where mix, blend sometimes became undefined and caused assets
                        // to sometimes stop rendering when using color correction, as their RGBA values become NaN.
                        // (https://github.com/pixijs/pixi-spine/issues/302)
                        Utils.webkit602BugfixHelper(mix, blend);
                        var timeline = timelines[ii];
                        if (timeline instanceof AttachmentTimeline)
                            this.applyAttachmentTimeline(timeline, skeleton, applyTime, blend, true);
                        else
                            timeline.apply(skeleton, animationLast, applyTime, applyEvents, mix, blend, exports.MixDirection.mixIn);
                    }
                }
                else {
                    var timelineMode = current.timelineMode;
                    var shortestRotation = current.shortestRotation;
                    var firstFrame = !shortestRotation && current.timelinesRotation.length != timelineCount << 1;
                    if (firstFrame)
                        current.timelinesRotation.length = timelineCount << 1;
                    for (var ii = 0; ii < timelineCount; ii++) {
                        var timeline_1 = timelines[ii];
                        var timelineBlend = timelineMode[ii] == SUBSEQUENT ? blend : exports.MixBlend.setup;
                        if (!shortestRotation && timeline_1 instanceof RotateTimeline) {
                            this.applyRotateTimeline(timeline_1, skeleton, applyTime, mix, timelineBlend, current.timelinesRotation, ii << 1, firstFrame);
                        }
                        else if (timeline_1 instanceof AttachmentTimeline) {
                            this.applyAttachmentTimeline(timeline_1, skeleton, applyTime, blend, true);
                        }
                        else {
                            // This fixes the WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
                            Utils.webkit602BugfixHelper(mix, blend);
                            timeline_1.apply(skeleton, animationLast, applyTime, applyEvents, mix, timelineBlend, exports.MixDirection.mixIn);
                        }
                    }
                }
                this.queueEvents(current, animationTime);
                events.length = 0;
                current.nextAnimationLast = animationTime;
                current.nextTrackLast = current.trackTime;
            }
            // Set slots attachments to the setup pose, if needed. This occurs if an animation that is mixing out sets attachments so
            // subsequent timelines see any deform, but the subsequent timelines don't set an attachment (eg they are also mixing out or
            // the time is before the first key).
            var setupState = this.unkeyedState + SETUP;
            var slots = skeleton.slots;
            for (var i = 0, n = skeleton.slots.length; i < n; i++) {
                var slot = slots[i];
                if (slot.attachmentState == setupState) {
                    var attachmentName = slot.data.attachmentName;
                    slot.setAttachment(!attachmentName ? null : skeleton.getAttachment(slot.data.index, attachmentName));
                }
            }
            this.unkeyedState += 2; // Increasing after each use avoids the need to reset attachmentState for every slot.
            this.queue.drain();
            return applied;
        };
        AnimationState.prototype.applyMixingFrom = function (to, skeleton, blend) {
            var from = to.mixingFrom;
            if (from.mixingFrom)
                this.applyMixingFrom(from, skeleton, blend);
            var mix = 0;
            if (to.mixDuration == 0) { // Single frame mix to undo mixingFrom changes.
                mix = 1;
                if (blend == exports.MixBlend.first)
                    blend = exports.MixBlend.setup;
            }
            else {
                mix = to.mixTime / to.mixDuration;
                if (mix > 1)
                    mix = 1;
                if (blend != exports.MixBlend.first)
                    blend = from.mixBlend;
            }
            var attachments = mix < from.attachmentThreshold, drawOrder = mix < from.drawOrderThreshold;
            var timelines = from.animation.timelines;
            var timelineCount = timelines.length;
            var alphaHold = from.alpha * to.interruptAlpha, alphaMix = alphaHold * (1 - mix);
            var animationLast = from.animationLast, animationTime = from.getAnimationTime(), applyTime = animationTime;
            var events = null;
            if (from.reverse)
                applyTime = from.animation.duration - applyTime;
            else if (mix < from.eventThreshold)
                events = this.events;
            if (blend == exports.MixBlend.add) {
                for (var i = 0; i < timelineCount; i++)
                    timelines[i].apply(skeleton, animationLast, applyTime, events, alphaMix, blend, exports.MixDirection.mixOut);
            }
            else {
                var timelineMode = from.timelineMode;
                var timelineHoldMix = from.timelineHoldMix;
                var shortestRotation = from.shortestRotation;
                var firstFrame = !shortestRotation && from.timelinesRotation.length != timelineCount << 1;
                if (firstFrame)
                    from.timelinesRotation.length = timelineCount << 1;
                from.totalAlpha = 0;
                for (var i = 0; i < timelineCount; i++) {
                    var timeline = timelines[i];
                    var direction = exports.MixDirection.mixOut;
                    var timelineBlend = void 0;
                    var alpha = 0;
                    switch (timelineMode[i]) {
                        case SUBSEQUENT:
                            if (!drawOrder && timeline instanceof DrawOrderTimeline)
                                continue;
                            timelineBlend = blend;
                            alpha = alphaMix;
                            break;
                        case FIRST:
                            timelineBlend = exports.MixBlend.setup;
                            alpha = alphaMix;
                            break;
                        case HOLD_SUBSEQUENT:
                            timelineBlend = blend;
                            alpha = alphaHold;
                            break;
                        case HOLD_FIRST:
                            timelineBlend = exports.MixBlend.setup;
                            alpha = alphaHold;
                            break;
                        default:
                            timelineBlend = exports.MixBlend.setup;
                            var holdMix = timelineHoldMix[i];
                            alpha = alphaHold * Math.max(0, 1 - holdMix.mixTime / holdMix.mixDuration);
                            break;
                    }
                    from.totalAlpha += alpha;
                    if (!shortestRotation && timeline instanceof RotateTimeline)
                        this.applyRotateTimeline(timeline, skeleton, applyTime, alpha, timelineBlend, from.timelinesRotation, i << 1, firstFrame);
                    else if (timeline instanceof AttachmentTimeline)
                        this.applyAttachmentTimeline(timeline, skeleton, applyTime, timelineBlend, attachments);
                    else {
                        // This fixes the WebKit 602 specific issue described at http://esotericsoftware.com/forum/iOS-10-disappearing-graphics-10109
                        Utils.webkit602BugfixHelper(alpha, blend);
                        if (drawOrder && timeline instanceof DrawOrderTimeline && timelineBlend == exports.MixBlend.setup)
                            direction = exports.MixDirection.mixIn;
                        timeline.apply(skeleton, animationLast, applyTime, events, alpha, timelineBlend, direction);
                    }
                }
            }
            if (to.mixDuration > 0)
                this.queueEvents(from, animationTime);
            this.events.length = 0;
            from.nextAnimationLast = animationTime;
            from.nextTrackLast = from.trackTime;
            return mix;
        };
        AnimationState.prototype.applyAttachmentTimeline = function (timeline, skeleton, time, blend, attachments) {
            var slot = skeleton.slots[timeline.slotIndex];
            if (!slot.bone.active)
                return;
            if (time < timeline.frames[0]) { // Time is before first frame.
                if (blend == exports.MixBlend.setup || blend == exports.MixBlend.first)
                    this.setAttachment(skeleton, slot, slot.data.attachmentName, attachments);
            }
            else
                this.setAttachment(skeleton, slot, timeline.attachmentNames[Timeline.search1(timeline.frames, time)], attachments);
            // If an attachment wasn't set (ie before the first frame or attachments is false), set the setup attachment later.
            if (slot.attachmentState <= this.unkeyedState)
                slot.attachmentState = this.unkeyedState + SETUP;
        };
        AnimationState.prototype.setAttachment = function (skeleton, slot, attachmentName, attachments) {
            slot.setAttachment(!attachmentName ? null : skeleton.getAttachment(slot.data.index, attachmentName));
            if (attachments)
                slot.attachmentState = this.unkeyedState + CURRENT;
        };
        AnimationState.prototype.applyRotateTimeline = function (timeline, skeleton, time, alpha, blend, timelinesRotation, i, firstFrame) {
            if (firstFrame)
                timelinesRotation[i] = 0;
            if (alpha == 1) {
                timeline.apply(skeleton, 0, time, null, 1, blend, exports.MixDirection.mixIn);
                return;
            }
            var bone = skeleton.bones[timeline.boneIndex];
            if (!bone.active)
                return;
            var frames = timeline.frames;
            var r1 = 0, r2 = 0;
            if (time < frames[0]) {
                switch (blend) {
                    case exports.MixBlend.setup:
                        bone.rotation = bone.data.rotation;
                    default:
                        return;
                    case exports.MixBlend.first:
                        r1 = bone.rotation;
                        r2 = bone.data.rotation;
                }
            }
            else {
                r1 = blend == exports.MixBlend.setup ? bone.data.rotation : bone.rotation;
                r2 = bone.data.rotation + timeline.getCurveValue(time);
            }
            // Mix between rotations using the direction of the shortest route on the first frame while detecting crosses.
            var total = 0, diff = r2 - r1;
            diff -= (16384 - ((16384.499999999996 - diff / 360) | 0)) * 360;
            if (diff == 0) {
                total = timelinesRotation[i];
            }
            else {
                var lastTotal = 0, lastDiff = 0;
                if (firstFrame) {
                    lastTotal = 0;
                    lastDiff = diff;
                }
                else {
                    lastTotal = timelinesRotation[i]; // Angle and direction of mix, including loops.
                    lastDiff = timelinesRotation[i + 1]; // Difference between bones.
                }
                var current = diff > 0, dir = lastTotal >= 0;
                // Detect cross at 0 (not 180).
                if (MathUtils.signum(lastDiff) != MathUtils.signum(diff) && Math.abs(lastDiff) <= 90) {
                    // A cross after a 360 rotation is a loop.
                    if (Math.abs(lastTotal) > 180)
                        lastTotal += 360 * MathUtils.signum(lastTotal);
                    dir = current;
                }
                total = diff + lastTotal - lastTotal % 360; // Store loops as part of lastTotal.
                if (dir != current)
                    total += 360 * MathUtils.signum(lastTotal);
                timelinesRotation[i] = total;
            }
            timelinesRotation[i + 1] = diff;
            bone.rotation = r1 + total * alpha;
        };
        AnimationState.prototype.queueEvents = function (entry, animationTime) {
            var animationStart = entry.animationStart, animationEnd = entry.animationEnd;
            var duration = animationEnd - animationStart;
            var trackLastWrapped = entry.trackLast % duration;
            // Queue events before complete.
            var events = this.events;
            var i = 0, n = events.length;
            for (; i < n; i++) {
                var event_1 = events[i];
                if (event_1.time < trackLastWrapped)
                    break;
                if (event_1.time > animationEnd)
                    continue; // Discard events outside animation start/end.
                this.queue.event(entry, event_1);
            }
            // Queue complete if completed a loop iteration or the animation.
            var complete = false;
            if (entry.loop)
                complete = duration == 0 || trackLastWrapped > entry.trackTime % duration;
            else
                complete = animationTime >= animationEnd && entry.animationLast < animationEnd;
            if (complete)
                this.queue.complete(entry);
            // Queue events after complete.
            for (; i < n; i++) {
                var event_2 = events[i];
                if (event_2.time < animationStart)
                    continue; // Discard events outside animation start/end.
                this.queue.event(entry, event_2);
            }
        };
        /** Removes all animations from all tracks, leaving skeletons in their current pose.
         *
         * It may be desired to use {@link AnimationState#setEmptyAnimation()} to mix the skeletons back to the setup pose,
         * rather than leaving them in their current pose. */
        AnimationState.prototype.clearTracks = function () {
            var oldDrainDisabled = this.queue.drainDisabled;
            this.queue.drainDisabled = true;
            for (var i = 0, n = this.tracks.length; i < n; i++)
                this.clearTrack(i);
            this.tracks.length = 0;
            this.queue.drainDisabled = oldDrainDisabled;
            this.queue.drain();
        };
        /** Removes all animations from the track, leaving skeletons in their current pose.
         *
         * It may be desired to use {@link AnimationState#setEmptyAnimation()} to mix the skeletons back to the setup pose,
         * rather than leaving them in their current pose. */
        AnimationState.prototype.clearTrack = function (trackIndex) {
            if (trackIndex >= this.tracks.length)
                return;
            var current = this.tracks[trackIndex];
            if (!current)
                return;
            this.queue.end(current);
            this.clearNext(current);
            var entry = current;
            while (true) {
                var from = entry.mixingFrom;
                if (!from)
                    break;
                this.queue.end(from);
                entry.mixingFrom = null;
                entry.mixingTo = null;
                entry = from;
            }
            this.tracks[current.trackIndex] = null;
            this.queue.drain();
        };
        AnimationState.prototype.setCurrent = function (index, current, interrupt) {
            var from = this.expandToIndex(index);
            this.tracks[index] = current;
            current.previous = null;
            if (from) {
                if (interrupt)
                    this.queue.interrupt(from);
                current.mixingFrom = from;
                from.mixingTo = current;
                current.mixTime = 0;
                // Store the interrupted mix percentage.
                if (from.mixingFrom && from.mixDuration > 0)
                    current.interruptAlpha *= Math.min(1, from.mixTime / from.mixDuration);
                from.timelinesRotation.length = 0; // Reset rotation for mixing out, in case entry was mixed in.
            }
            this.queue.start(current);
        };
        /** Sets an animation by name.
         *
         * See {@link #setAnimationWith()}. */
        AnimationState.prototype.setAnimation = function (trackIndex, animationName, loop) {
            if (loop === void 0) { loop = false; }
            var animation = this.data.skeletonData.findAnimation(animationName);
            if (!animation)
                throw new Error("Animation not found: " + animationName);
            return this.setAnimationWith(trackIndex, animation, loop);
        };
        /** Sets the current animation for a track, discarding any queued animations. If the formerly current track entry was never
         * applied to a skeleton, it is replaced (not mixed from).
         * @param loop If true, the animation will repeat. If false it will not, instead its last frame is applied if played beyond its
         *           duration. In either case {@link TrackEntry#trackEnd} determines when the track is cleared.
         * @returns A track entry to allow further customization of animation playback. References to the track entry must not be kept
         *         after the {@link AnimationStateListener#dispose()} event occurs. */
        AnimationState.prototype.setAnimationWith = function (trackIndex, animation, loop) {
            if (loop === void 0) { loop = false; }
            if (!animation)
                throw new Error("animation cannot be null.");
            var interrupt = true;
            var current = this.expandToIndex(trackIndex);
            if (current) {
                if (current.nextTrackLast == -1) {
                    // Don't mix from an entry that was never applied.
                    this.tracks[trackIndex] = current.mixingFrom;
                    this.queue.interrupt(current);
                    this.queue.end(current);
                    this.clearNext(current);
                    current = current.mixingFrom;
                    interrupt = false;
                }
                else
                    this.clearNext(current);
            }
            var entry = this.trackEntry(trackIndex, animation, loop, current);
            this.setCurrent(trackIndex, entry, interrupt);
            this.queue.drain();
            return entry;
        };
        /** Queues an animation by name.
         *
         * See {@link #addAnimationWith()}. */
        AnimationState.prototype.addAnimation = function (trackIndex, animationName, loop, delay) {
            if (loop === void 0) { loop = false; }
            if (delay === void 0) { delay = 0; }
            var animation = this.data.skeletonData.findAnimation(animationName);
            if (!animation)
                throw new Error("Animation not found: " + animationName);
            return this.addAnimationWith(trackIndex, animation, loop, delay);
        };
        /** Adds an animation to be played after the current or last queued animation for a track. If the track is empty, it is
         * equivalent to calling {@link #setAnimationWith()}.
         * @param delay If > 0, sets {@link TrackEntry#delay}. If <= 0, the delay set is the duration of the previous track entry
         *           minus any mix duration (from the {@link AnimationStateData}) plus the specified `delay` (ie the mix
         *           ends at (`delay` = 0) or before (`delay` < 0) the previous track entry duration). If the
         *           previous entry is looping, its next loop completion is used instead of its duration.
         * @returns A track entry to allow further customization of animation playback. References to the track entry must not be kept
         *         after the {@link AnimationStateListener#dispose()} event occurs. */
        AnimationState.prototype.addAnimationWith = function (trackIndex, animation, loop, delay) {
            if (loop === void 0) { loop = false; }
            if (delay === void 0) { delay = 0; }
            if (!animation)
                throw new Error("animation cannot be null.");
            var last = this.expandToIndex(trackIndex);
            if (last) {
                while (last.next)
                    last = last.next;
            }
            var entry = this.trackEntry(trackIndex, animation, loop, last);
            if (!last) {
                this.setCurrent(trackIndex, entry, true);
                this.queue.drain();
            }
            else {
                last.next = entry;
                entry.previous = last;
                if (delay <= 0)
                    delay += last.getTrackComplete() - entry.mixDuration;
            }
            entry.delay = delay;
            return entry;
        };
        /** Sets an empty animation for a track, discarding any queued animations, and sets the track entry's
         * {@link TrackEntry#mixduration}. An empty animation has no timelines and serves as a placeholder for mixing in or out.
         *
         * Mixing out is done by setting an empty animation with a mix duration using either {@link #setEmptyAnimation()},
         * {@link #setEmptyAnimations()}, or {@link #addEmptyAnimation()}. Mixing to an empty animation causes
         * the previous animation to be applied less and less over the mix duration. Properties keyed in the previous animation
         * transition to the value from lower tracks or to the setup pose value if no lower tracks key the property. A mix duration of
         * 0 still mixes out over one frame.
         *
         * Mixing in is done by first setting an empty animation, then adding an animation using
         * {@link #addAnimation()} and on the returned track entry, set the
         * {@link TrackEntry#setMixDuration()}. Mixing from an empty animation causes the new animation to be applied more and
         * more over the mix duration. Properties keyed in the new animation transition from the value from lower tracks or from the
         * setup pose value if no lower tracks key the property to the value keyed in the new animation. */
        AnimationState.prototype.setEmptyAnimation = function (trackIndex, mixDuration) {
            if (mixDuration === void 0) { mixDuration = 0; }
            var entry = this.setAnimationWith(trackIndex, AnimationState.emptyAnimation(), false);
            entry.mixDuration = mixDuration;
            entry.trackEnd = mixDuration;
            return entry;
        };
        /** Adds an empty animation to be played after the current or last queued animation for a track, and sets the track entry's
         * {@link TrackEntry#mixDuration}. If the track is empty, it is equivalent to calling
         * {@link #setEmptyAnimation()}.
         *
         * See {@link #setEmptyAnimation()}.
         * @param delay If > 0, sets {@link TrackEntry#delay}. If <= 0, the delay set is the duration of the previous track entry
         *           minus any mix duration plus the specified `delay` (ie the mix ends at (`delay` = 0) or
         *           before (`delay` < 0) the previous track entry duration). If the previous entry is looping, its next
         *           loop completion is used instead of its duration.
         * @return A track entry to allow further customization of animation playback. References to the track entry must not be kept
         *         after the {@link AnimationStateListener#dispose()} event occurs. */
        AnimationState.prototype.addEmptyAnimation = function (trackIndex, mixDuration, delay) {
            if (mixDuration === void 0) { mixDuration = 0; }
            if (delay === void 0) { delay = 0; }
            var entry = this.addAnimationWith(trackIndex, AnimationState.emptyAnimation(), false, delay);
            if (delay <= 0)
                entry.delay += entry.mixDuration - mixDuration;
            entry.mixDuration = mixDuration;
            entry.trackEnd = mixDuration;
            return entry;
        };
        /** Sets an empty animation for every track, discarding any queued animations, and mixes to it over the specified mix
         * duration. */
        AnimationState.prototype.setEmptyAnimations = function (mixDuration) {
            if (mixDuration === void 0) { mixDuration = 0; }
            var oldDrainDisabled = this.queue.drainDisabled;
            this.queue.drainDisabled = true;
            for (var i = 0, n = this.tracks.length; i < n; i++) {
                var current = this.tracks[i];
                if (current)
                    this.setEmptyAnimation(current.trackIndex, mixDuration);
            }
            this.queue.drainDisabled = oldDrainDisabled;
            this.queue.drain();
        };
        AnimationState.prototype.expandToIndex = function (index) {
            if (index < this.tracks.length)
                return this.tracks[index];
            Utils.ensureArrayCapacity(this.tracks, index + 1, null);
            this.tracks.length = index + 1;
            return null;
        };
        /** @param last May be null. */
        AnimationState.prototype.trackEntry = function (trackIndex, animation, loop, last) {
            var entry = this.trackEntryPool.obtain();
            entry.reset();
            entry.trackIndex = trackIndex;
            entry.animation = animation;
            entry.loop = loop;
            entry.holdPrevious = false;
            entry.reverse = false;
            entry.shortestRotation = false;
            entry.eventThreshold = 0;
            entry.attachmentThreshold = 0;
            entry.drawOrderThreshold = 0;
            entry.animationStart = 0;
            entry.animationEnd = animation.duration;
            entry.animationLast = -1;
            entry.nextAnimationLast = -1;
            entry.delay = 0;
            entry.trackTime = 0;
            entry.trackLast = -1;
            entry.nextTrackLast = -1;
            entry.trackEnd = Number.MAX_VALUE;
            entry.timeScale = 1;
            entry.alpha = 1;
            entry.mixTime = 0;
            entry.mixDuration = !last ? 0 : this.data.getMix(last.animation, animation);
            entry.interruptAlpha = 1;
            entry.totalAlpha = 0;
            entry.mixBlend = exports.MixBlend.replace;
            return entry;
        };
        /** Removes the {@link TrackEntry#getNext() next entry} and all entries after it for the specified entry. */
        AnimationState.prototype.clearNext = function (entry) {
            var next = entry.next;
            while (next) {
                this.queue.dispose(next);
                next = next.next;
            }
            entry.next = null;
        };
        AnimationState.prototype._animationsChanged = function () {
            this.animationsChanged = false;
            this.propertyIDs.clear();
            var tracks = this.tracks;
            for (var i = 0, n = tracks.length; i < n; i++) {
                var entry = tracks[i];
                if (!entry)
                    continue;
                while (entry.mixingFrom)
                    entry = entry.mixingFrom;
                do {
                    if (!entry.mixingTo || entry.mixBlend != exports.MixBlend.add)
                        this.computeHold(entry);
                    entry = entry.mixingTo;
                } while (entry);
            }
        };
        AnimationState.prototype.computeHold = function (entry) {
            var to = entry.mixingTo;
            var timelines = entry.animation.timelines;
            var timelinesCount = entry.animation.timelines.length;
            var timelineMode = entry.timelineMode;
            timelineMode.length = timelinesCount;
            var timelineHoldMix = entry.timelineHoldMix;
            timelineHoldMix.length = 0;
            var propertyIDs = this.propertyIDs;
            if (to && to.holdPrevious) {
                for (var i = 0; i < timelinesCount; i++)
                    timelineMode[i] = propertyIDs.addAll(timelines[i].getPropertyIds()) ? HOLD_FIRST : HOLD_SUBSEQUENT;
                return;
            }
            outer: for (var i = 0; i < timelinesCount; i++) {
                var timeline = timelines[i];
                var ids = timeline.getPropertyIds();
                if (!propertyIDs.addAll(ids))
                    timelineMode[i] = SUBSEQUENT;
                else if (!to || timeline instanceof AttachmentTimeline || timeline instanceof DrawOrderTimeline
                    || timeline instanceof EventTimeline || !to.animation.hasTimeline(ids)) {
                    timelineMode[i] = FIRST;
                }
                else {
                    for (var next = to.mixingTo; next; next = next.mixingTo) {
                        if (next.animation.hasTimeline(ids))
                            continue;
                        if (entry.mixDuration > 0) {
                            timelineMode[i] = HOLD_MIX;
                            timelineHoldMix[i] = next;
                            continue outer;
                        }
                        break;
                    }
                    timelineMode[i] = HOLD_FIRST;
                }
            }
        };
        /** Returns the track entry for the animation currently playing on the track, or null if no animation is currently playing. */
        AnimationState.prototype.getCurrent = function (trackIndex) {
            if (trackIndex >= this.tracks.length)
                return null;
            return this.tracks[trackIndex];
        };
        /** Adds a listener to receive events for all track entries. */
        AnimationState.prototype.addListener = function (listener) {
            if (!listener)
                throw new Error("listener cannot be null.");
            this.listeners.push(listener);
        };
        /** Removes the listener added with {@link #addListener()}. */
        AnimationState.prototype.removeListener = function (listener) {
            var index = this.listeners.indexOf(listener);
            if (index >= 0)
                this.listeners.splice(index, 1);
        };
        /** Removes all listeners added with {@link #addListener()}. */
        AnimationState.prototype.clearListeners = function () {
            this.listeners.length = 0;
        };
        /** Discards all listener notifications that have not yet been delivered. This can be useful to call from an
         * {@link AnimationStateListener} when it is known that further notifications that may have been already queued for delivery
         * are not wanted because new animations are being set. */
        AnimationState.prototype.clearListenerNotifications = function () {
            this.queue.clear();
        };
        AnimationState.prototype.setAnimationByName = function (trackIndex, animationName, loop) {
            if (!AnimationState.deprecatedWarning1) {
                AnimationState.deprecatedWarning1 = true;
                console.warn("Spine Deprecation Warning: AnimationState.setAnimationByName is deprecated, please use setAnimation from now on.");
            }
            this.setAnimation(trackIndex, animationName, loop);
        };
        AnimationState.prototype.addAnimationByName = function (trackIndex, animationName, loop, delay) {
            if (!AnimationState.deprecatedWarning2) {
                AnimationState.deprecatedWarning2 = true;
                console.warn("Spine Deprecation Warning: AnimationState.addAnimationByName is deprecated, please use addAnimation from now on.");
            }
            this.addAnimation(trackIndex, animationName, loop, delay);
        };
        AnimationState.prototype.hasAnimation = function (animationName) {
            var animation = this.data.skeletonData.findAnimation(animationName);
            return animation !== null;
        };
        AnimationState.prototype.hasAnimationByName = function (animationName) {
            if (!AnimationState.deprecatedWarning3) {
                AnimationState.deprecatedWarning3 = true;
                console.warn("Spine Deprecation Warning: AnimationState.hasAnimationByName is deprecated, please use hasAnimation from now on.");
            }
            return this.hasAnimation(animationName);
        };
        AnimationState._emptyAnimation = new Animation("<empty>", [], 0);
        AnimationState.deprecatedWarning1 = false;
        AnimationState.deprecatedWarning2 = false;
        AnimationState.deprecatedWarning3 = false;
        return AnimationState;
    }());
    /** Stores settings and other state for the playback of an animation on an {@link AnimationState} track.
     *
     * References to a track entry must not be kept after the {@link AnimationStateListener#dispose()} event occurs.
     * @public
     * */
    var TrackEntry = /** @class */ (function () {
        function TrackEntry() {
            /** The animation to apply for this track entry. */
            this.animation = null;
            this.previous = null;
            /** The animation queued to start after this animation, or null. `next` makes up a linked list. */
            this.next = null;
            /** The track entry for the previous animation when mixing from the previous animation to this animation, or null if no
             * mixing is currently occuring. When mixing from multiple animations, `mixingFrom` makes up a linked list. */
            this.mixingFrom = null;
            /** The track entry for the next animation when mixing from this animation to the next animation, or null if no mixing is
             * currently occuring. When mixing to multiple animations, `mixingTo` makes up a linked list. */
            this.mixingTo = null;
            /** The listener for events generated by this track entry, or null.
             *
             * A track entry returned from {@link AnimationState#setAnimation()} is already the current animation
             * for the track, so the track entry listener {@link AnimationStateListener#start()} will not be called. */
            this.listener = null;
            /** The index of the track where this track entry is either current or queued.
             *
             * See {@link AnimationState#getCurrent()}. */
            this.trackIndex = 0;
            /** If true, the animation will repeat. If false it will not, instead its last frame is applied if played beyond its
             * duration. */
            this.loop = false;
            /** If true, when mixing from the previous animation to this animation, the previous animation is applied as normal instead
             * of being mixed out.
             *
             * When mixing between animations that key the same property, if a lower track also keys that property then the value will
             * briefly dip toward the lower track value during the mix. This happens because the first animation mixes from 100% to 0%
             * while the second animation mixes from 0% to 100%. Setting `holdPrevious` to true applies the first animation
             * at 100% during the mix so the lower track value is overwritten. Such dipping does not occur on the lowest track which
             * keys the property, only when a higher track also keys the property.
             *
             * Snapping will occur if `holdPrevious` is true and this animation does not key all the same properties as the
             * previous animation. */
            this.holdPrevious = false;
            this.reverse = false;
            this.shortestRotation = false;
            /** When the mix percentage ({@link #mixTime} / {@link #mixDuration}) is less than the
             * `eventThreshold`, event timelines are applied while this animation is being mixed out. Defaults to 0, so event
             * timelines are not applied while this animation is being mixed out. */
            this.eventThreshold = 0;
            /** When the mix percentage ({@link #mixtime} / {@link #mixDuration}) is less than the
             * `attachmentThreshold`, attachment timelines are applied while this animation is being mixed out. Defaults to
             * 0, so attachment timelines are not applied while this animation is being mixed out. */
            this.attachmentThreshold = 0;
            /** When the mix percentage ({@link #mixTime} / {@link #mixDuration}) is less than the
             * `drawOrderThreshold`, draw order timelines are applied while this animation is being mixed out. Defaults to 0,
             * so draw order timelines are not applied while this animation is being mixed out. */
            this.drawOrderThreshold = 0;
            /** Seconds when this animation starts, both initially and after looping. Defaults to 0.
             *
             * When changing the `animationStart` time, it often makes sense to set {@link #animationLast} to the same
             * value to prevent timeline keys before the start time from triggering. */
            this.animationStart = 0;
            /** Seconds for the last frame of this animation. Non-looping animations won't play past this time. Looping animations will
             * loop back to {@link #animationStart} at this time. Defaults to the animation {@link Animation#duration}. */
            this.animationEnd = 0;
            /** The time in seconds this animation was last applied. Some timelines use this for one-time triggers. Eg, when this
             * animation is applied, event timelines will fire all events between the `animationLast` time (exclusive) and
             * `animationTime` (inclusive). Defaults to -1 to ensure triggers on frame 0 happen the first time this animation
             * is applied. */
            this.animationLast = 0;
            this.nextAnimationLast = 0;
            /** Seconds to postpone playing the animation. When this track entry is the current track entry, `delay`
             * postpones incrementing the {@link #trackTime}. When this track entry is queued, `delay` is the time from
             * the start of the previous animation to when this track entry will become the current track entry (ie when the previous
             * track entry {@link TrackEntry#trackTime} >= this track entry's `delay`).
             *
             * {@link #timeScale} affects the delay. */
            this.delay = 0;
            /** Current time in seconds this track entry has been the current track entry. The track time determines
             * {@link #animationTime}. The track time can be set to start the animation at a time other than 0, without affecting
             * looping. */
            this.trackTime = 0;
            this.trackLast = 0;
            this.nextTrackLast = 0;
            /** The track time in seconds when this animation will be removed from the track. Defaults to the highest possible float
             * value, meaning the animation will be applied until a new animation is set or the track is cleared. If the track end time
             * is reached, no other animations are queued for playback, and mixing from any previous animations is complete, then the
             * properties keyed by the animation are set to the setup pose and the track is cleared.
             *
             * It may be desired to use {@link AnimationState#addEmptyAnimation()} rather than have the animation
             * abruptly cease being applied. */
            this.trackEnd = 0;
            /** Multiplier for the delta time when this track entry is updated, causing time for this animation to pass slower or
             * faster. Defaults to 1.
             *
             * {@link #mixTime} is not affected by track entry time scale, so {@link #mixDuration} may need to be adjusted to
             * match the animation speed.
             *
             * When using {@link AnimationState#addAnimation()} with a `delay` <= 0, note the
             * {@link #delay} is set using the mix duration from the {@link AnimationStateData}, assuming time scale to be 1. If
             * the time scale is not 1, the delay may need to be adjusted.
             *
             * See AnimationState {@link AnimationState#timeScale} for affecting all animations. */
            this.timeScale = 0;
            /** Values < 1 mix this animation with the skeleton's current pose (usually the pose resulting from lower tracks). Defaults
             * to 1, which overwrites the skeleton's current pose with this animation.
             *
             * Typically track 0 is used to completely pose the skeleton, then alpha is used on higher tracks. It doesn't make sense to
             * use alpha on track 0 if the skeleton pose is from the last frame render. */
            this.alpha = 0;
            /** Seconds from 0 to the {@link #getMixDuration()} when mixing from the previous animation to this animation. May be
             * slightly more than `mixDuration` when the mix is complete. */
            this.mixTime = 0;
            /** Seconds for mixing from the previous animation to this animation. Defaults to the value provided by AnimationStateData
             * {@link AnimationStateData#getMix()} based on the animation before this animation (if any).
             *
             * A mix duration of 0 still mixes out over one frame to provide the track entry being mixed out a chance to revert the
             * properties it was animating.
             *
             * The `mixDuration` can be set manually rather than use the value from
             * {@link AnimationStateData#getMix()}. In that case, the `mixDuration` can be set for a new
             * track entry only before {@link AnimationState#update(float)} is first called.
             *
             * When using {@link AnimationState#addAnimation()} with a `delay` <= 0, note the
             * {@link #delay} is set using the mix duration from the {@link AnimationStateData}, not a mix duration set
             * afterward. */
            this.mixDuration = 0;
            this.interruptAlpha = 0;
            this.totalAlpha = 0;
            /** Controls how properties keyed in the animation are mixed with lower tracks. Defaults to {@link MixBlend#replace}, which
             * replaces the values from the lower tracks with the animation values. {@link MixBlend#add} adds the animation values to
             * the values from the lower tracks.
             *
             * The `mixBlend` can be set for a new track entry only before {@link AnimationState#apply()} is first
             * called. */
            this.mixBlend = exports.MixBlend.replace;
            this.timelineMode = new Array();
            this.timelineHoldMix = new Array();
            this.timelinesRotation = new Array();
        }
        TrackEntry.prototype.reset = function () {
            this.next = null;
            this.previous = null;
            this.mixingFrom = null;
            this.mixingTo = null;
            this.animation = null;
            this.listener = null;
            this.timelineMode.length = 0;
            this.timelineHoldMix.length = 0;
            this.timelinesRotation.length = 0;
        };
        /** Uses {@link #trackTime} to compute the `animationTime`, which is between {@link #animationStart}
         * and {@link #animationEnd}. When the `trackTime` is 0, the `animationTime` is equal to the
         * `animationStart` time. */
        TrackEntry.prototype.getAnimationTime = function () {
            if (this.loop) {
                var duration = this.animationEnd - this.animationStart;
                if (duration == 0)
                    return this.animationStart;
                return (this.trackTime % duration) + this.animationStart;
            }
            return Math.min(this.trackTime + this.animationStart, this.animationEnd);
        };
        TrackEntry.prototype.setAnimationLast = function (animationLast) {
            this.animationLast = animationLast;
            this.nextAnimationLast = animationLast;
        };
        /** Returns true if at least one loop has been completed.
         *
         * See {@link AnimationStateListener#complete()}. */
        TrackEntry.prototype.isComplete = function () {
            return this.trackTime >= this.animationEnd - this.animationStart;
        };
        /** Resets the rotation directions for mixing this entry's rotate timelines. This can be useful to avoid bones rotating the
         * long way around when using {@link #alpha} and starting animations on other tracks.
         *
         * Mixing with {@link MixBlend#replace} involves finding a rotation between two others, which has two possible solutions:
         * the short way or the long way around. The two rotations likely change over time, so which direction is the short or long
         * way also changes. If the short way was always chosen, bones would flip to the other side when that direction became the
         * long way. TrackEntry chooses the short way the first time it is applied and remembers that direction. */
        TrackEntry.prototype.resetRotationDirections = function () {
            this.timelinesRotation.length = 0;
        };
        TrackEntry.prototype.getTrackComplete = function () {
            var duration = this.animationEnd - this.animationStart;
            if (duration != 0) {
                if (this.loop)
                    return duration * (1 + ((this.trackTime / duration) | 0)); // Completion of next loop.
                if (this.trackTime < duration)
                    return duration; // Before duration.
            }
            return this.trackTime; // Next update.
        };
        Object.defineProperty(TrackEntry.prototype, "time", {
            get: function () {
                if (!TrackEntry.deprecatedWarning1) {
                    TrackEntry.deprecatedWarning1 = true;
                    console.warn("Spine Deprecation Warning: TrackEntry.time is deprecated, please use trackTime from now on.");
                }
                return this.trackTime;
            },
            set: function (value) {
                if (!TrackEntry.deprecatedWarning1) {
                    TrackEntry.deprecatedWarning1 = true;
                    console.warn("Spine Deprecation Warning: TrackEntry.time is deprecated, please use trackTime from now on.");
                }
                this.trackTime = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TrackEntry.prototype, "endTime", {
            get: function () {
                if (!TrackEntry.deprecatedWarning2) {
                    TrackEntry.deprecatedWarning2 = true;
                    console.warn("Spine Deprecation Warning: TrackEntry.endTime is deprecated, please use trackEnd from now on.");
                }
                return this.trackTime;
            },
            set: function (value) {
                if (!TrackEntry.deprecatedWarning2) {
                    TrackEntry.deprecatedWarning2 = true;
                    console.warn("Spine Deprecation Warning: TrackEntry.endTime is deprecated, please use trackEnd from now on.");
                }
                this.trackTime = value;
            },
            enumerable: false,
            configurable: true
        });
        TrackEntry.prototype.loopsCount = function () {
            return Math.floor(this.trackTime / this.trackEnd);
        };
        TrackEntry.deprecatedWarning1 = false;
        TrackEntry.deprecatedWarning2 = false;
        return TrackEntry;
    }());
    /**
     * @public
     */
    var EventQueue = /** @class */ (function () {
        function EventQueue(animState) {
            this.objects = [];
            this.drainDisabled = false;
            this.animState = animState;
        }
        EventQueue.prototype.start = function (entry) {
            this.objects.push(exports.EventType.start);
            this.objects.push(entry);
            this.animState.animationsChanged = true;
        };
        EventQueue.prototype.interrupt = function (entry) {
            this.objects.push(exports.EventType.interrupt);
            this.objects.push(entry);
        };
        EventQueue.prototype.end = function (entry) {
            this.objects.push(exports.EventType.end);
            this.objects.push(entry);
            this.animState.animationsChanged = true;
        };
        EventQueue.prototype.dispose = function (entry) {
            this.objects.push(exports.EventType.dispose);
            this.objects.push(entry);
        };
        EventQueue.prototype.complete = function (entry) {
            this.objects.push(exports.EventType.complete);
            this.objects.push(entry);
        };
        EventQueue.prototype.event = function (entry, event) {
            this.objects.push(exports.EventType.event);
            this.objects.push(entry);
            this.objects.push(event);
        };
        EventQueue.prototype.drain = function () {
            if (this.drainDisabled)
                return;
            this.drainDisabled = true;
            var objects = this.objects;
            var listeners = this.animState.listeners;
            for (var i = 0; i < objects.length; i += 2) {
                var type = objects[i];
                var entry = objects[i + 1];
                switch (type) {
                    case exports.EventType.start:
                        if (entry.listener && entry.listener.start)
                            entry.listener.start(entry);
                        for (var ii = 0; ii < listeners.length; ii++) {
                            var listener = listeners[ii];
                            if (listener.start)
                                listener.start(entry);
                        }
                        break;
                    case exports.EventType.interrupt:
                        if (entry.listener && entry.listener.interrupt)
                            entry.listener.interrupt(entry);
                        for (var ii = 0; ii < listeners.length; ii++) {
                            var listener = listeners[ii];
                            if (listener.interrupt)
                                listener.interrupt(entry);
                        }
                        break;
                    case exports.EventType.end:
                        if (entry.listener && entry.listener.end)
                            entry.listener.end(entry);
                        for (var ii = 0; ii < listeners.length; ii++) {
                            var listener = listeners[ii];
                            if (listener.end)
                                listener.end(entry);
                        }
                    // Fall through.
                    case exports.EventType.dispose:
                        if (entry.listener && entry.listener.dispose)
                            entry.listener.dispose(entry);
                        for (var ii = 0; ii < listeners.length; ii++) {
                            var listener = listeners[ii];
                            if (listener.dispose)
                                listener.dispose(entry);
                        }
                        this.animState.trackEntryPool.free(entry);
                        break;
                    case exports.EventType.complete:
                        if (entry.listener && entry.listener.complete)
                            entry.listener.complete(entry);
                        for (var ii = 0; ii < listeners.length; ii++) {
                            var listener = listeners[ii];
                            if (listener.complete)
                                listener.complete(entry);
                        }
                        break;
                    case exports.EventType.event:
                        var event_3 = objects[i++ + 2];
                        if (entry.listener && entry.listener.event)
                            entry.listener.event(entry, event_3);
                        for (var ii = 0; ii < listeners.length; ii++) {
                            var listener = listeners[ii];
                            if (listener.event)
                                listener.event(entry, event_3);
                        }
                        break;
                }
            }
            this.clear();
            this.drainDisabled = false;
        };
        EventQueue.prototype.clear = function () {
            this.objects.length = 0;
        };
        return EventQueue;
    }());
    /**
     * @public
     */
    exports.EventType = void 0;
    (function (EventType) {
        EventType[EventType["start"] = 0] = "start";
        EventType[EventType["interrupt"] = 1] = "interrupt";
        EventType[EventType["end"] = 2] = "end";
        EventType[EventType["dispose"] = 3] = "dispose";
        EventType[EventType["complete"] = 4] = "complete";
        EventType[EventType["event"] = 5] = "event";
    })(exports.EventType || (exports.EventType = {}));
    /**
     * @public
     */
    var AnimationStateAdapter = /** @class */ (function () {
        function AnimationStateAdapter() {
        }
        AnimationStateAdapter.prototype.start = function (entry) {
        };
        AnimationStateAdapter.prototype.interrupt = function (entry) {
        };
        AnimationStateAdapter.prototype.end = function (entry) {
        };
        AnimationStateAdapter.prototype.dispose = function (entry) {
        };
        AnimationStateAdapter.prototype.complete = function (entry) {
        };
        AnimationStateAdapter.prototype.event = function (entry, event) {
        };
        return AnimationStateAdapter;
    }());
    /** 1. A previously applied timeline has set this property.
     *
     * Result: Mix from the current pose to the timeline pose. */
    var SUBSEQUENT = 0;
    /** 1. This is the first timeline to set this property.
     * 2. The next track entry applied after this one does not have a timeline to set this property.
     *
     * Result: Mix from the setup pose to the timeline pose. */
    var FIRST = 1;
    /** 1) A previously applied timeline has set this property.<br>
     * 2) The next track entry to be applied does have a timeline to set this property.<br>
     * 3) The next track entry after that one does not have a timeline to set this property.<br>
     * Result: Mix from the current pose to the timeline pose, but do not mix out. This avoids "dipping" when crossfading
     * animations that key the same property. A subsequent timeline will set this property using a mix. */
    var HOLD_SUBSEQUENT = 2;
    /** 1) This is the first timeline to set this property.<br>
     * 2) The next track entry to be applied does have a timeline to set this property.<br>
     * 3) The next track entry after that one does not have a timeline to set this property.<br>
     * Result: Mix from the setup pose to the timeline pose, but do not mix out. This avoids "dipping" when crossfading animations
     * that key the same property. A subsequent timeline will set this property using a mix. */
    var HOLD_FIRST = 3;
    /** 1. This is the first timeline to set this property.
     * 2. The next track entry to be applied does have a timeline to set this property.
     * 3. The next track entry after that one does have a timeline to set this property.
     * 4. timelineHoldMix stores the first subsequent track entry that does not have a timeline to set this property.
     *
     * Result: The same as HOLD except the mix percentage from the timelineHoldMix track entry is used. This handles when more than
     * 2 track entries in a row have a timeline that sets the same property.
     *
     * Eg, A -> B -> C -> D where A, B, and C have a timeline setting same property, but D does not. When A is applied, to avoid
     * "dipping" A is not mixed out, however D (the first entry that doesn't set the property) mixing in is used to mix out A
     * (which affects B and C). Without using D to mix out, A would be applied fully until mixing completes, then snap into
     * place. */
    var HOLD_MIX = 4;
    var SETUP = 1;
    var CURRENT = 2;

    /** Stores mix (crossfade) durations to be applied when {@link AnimationState} animations are changed.
     * @public
     * */
    var AnimationStateData = /** @class */ (function () {
        function AnimationStateData(skeletonData) {
            this.animationToMixTime = {};
            /** The mix duration to use when no mix duration has been defined between two animations. */
            this.defaultMix = 0;
            if (!skeletonData)
                throw new Error("skeletonData cannot be null.");
            this.skeletonData = skeletonData;
        }
        /** Sets a mix duration by animation name.
         *
         * See {@link #setMixWith()}. */
        AnimationStateData.prototype.setMix = function (fromName, toName, duration) {
            var from = this.skeletonData.findAnimation(fromName);
            if (!from)
                throw new Error("Animation not found: " + fromName);
            var to = this.skeletonData.findAnimation(toName);
            if (!to)
                throw new Error("Animation not found: " + toName);
            this.setMixWith(from, to, duration);
        };
        /** Sets the mix duration when changing from the specified animation to the other.
         *
         * See {@link TrackEntry#mixDuration}. */
        AnimationStateData.prototype.setMixWith = function (from, to, duration) {
            if (!from)
                throw new Error("from cannot be null.");
            if (!to)
                throw new Error("to cannot be null.");
            var key = from.name + "." + to.name;
            this.animationToMixTime[key] = duration;
        };
        /** Returns the mix duration to use when changing from the specified animation to the other, or the {@link #defaultMix} if
         * no mix duration has been set. */
        AnimationStateData.prototype.getMix = function (from, to) {
            var key = from.name + "." + to.name;
            var value = this.animationToMixTime[key];
            return value === undefined ? this.defaultMix : value;
        };
        return AnimationStateData;
    }());

    /**
     * @public
     */
    var AtlasAttachmentLoader = /** @class */ (function () {
        function AtlasAttachmentLoader(atlas) {
            this.atlas = atlas;
        }
        AtlasAttachmentLoader.prototype.loadSequence = function (name, basePath, sequence) {
            var regions = sequence.regions;
            for (var i = 0, n = regions.length; i < n; i++) {
                var path = sequence.getPath(basePath, i);
                var region = this.atlas.findRegion(path);
                if (region == null)
                    throw new Error("Region not found in atlas: " + path + " (sequence: " + name + ")");
                regions[i] = region;
                regions[i].renderObject = regions[i];
            }
        };
        AtlasAttachmentLoader.prototype.newRegionAttachment = function (skin, name, path, sequence) {
            var attachment = new RegionAttachment(name, path);
            if (sequence != null) {
                this.loadSequence(name, path, sequence);
            }
            else {
                var region = this.atlas.findRegion(path);
                if (!region)
                    throw new Error("Region not found in atlas: " + path + " (region attachment: " + name + ")");
                region.renderObject = region;
                attachment.region = region;
            }
            return attachment;
        };
        AtlasAttachmentLoader.prototype.newMeshAttachment = function (skin, name, path, sequence) {
            var attachment = new MeshAttachment(name, path);
            if (sequence != null) {
                this.loadSequence(name, path, sequence);
            }
            else {
                var region = this.atlas.findRegion(path);
                if (!region)
                    throw new Error("Region not found in atlas: " + path + " (mesh attachment: " + name + ")");
                region.renderObject = region;
                attachment.region = region;
            }
            return attachment;
        };
        AtlasAttachmentLoader.prototype.newBoundingBoxAttachment = function (skin, name) {
            return new BoundingBoxAttachment(name);
        };
        AtlasAttachmentLoader.prototype.newPathAttachment = function (skin, name) {
            return new PathAttachment(name);
        };
        AtlasAttachmentLoader.prototype.newPointAttachment = function (skin, name) {
            return new PointAttachment(name);
        };
        AtlasAttachmentLoader.prototype.newClippingAttachment = function (skin, name) {
            return new ClippingAttachment(name);
        };
        return AtlasAttachmentLoader;
    }());

    /** Stores a bone's current pose.
     *
     * A bone has a local transform which is used to compute its world transform. A bone also has an applied transform, which is a
     * local transform that can be applied to compute the world transform. The local transform and applied transform may differ if a
     * constraint or application code modifies the world transform after it was computed from the local transform.
     * @public
     * */
    var Bone = /** @class */ (function () {
        /** @param parent May be null. */
        function Bone(data, skeleton, parent) {
            //be careful! Spine b,c is c,b in pixi matrix
            this.matrix = new math.Matrix();
            /** The parent bone, or null if this is the root bone. */
            this.parent = null;
            /** The immediate children of this bone. */
            this.children = new Array();
            /** The local x translation. */
            this.x = 0;
            /** The local y translation. */
            this.y = 0;
            /** The local rotation in degrees, counter clockwise. */
            this.rotation = 0;
            /** The local scaleX. */
            this.scaleX = 0;
            /** The local scaleY. */
            this.scaleY = 0;
            /** The local shearX. */
            this.shearX = 0;
            /** The local shearY. */
            this.shearY = 0;
            /** The applied local x translation. */
            this.ax = 0;
            /** The applied local y translation. */
            this.ay = 0;
            /** The applied local rotation in degrees, counter clockwise. */
            this.arotation = 0;
            /** The applied local scaleX. */
            this.ascaleX = 0;
            /** The applied local scaleY. */
            this.ascaleY = 0;
            /** The applied local shearX. */
            this.ashearX = 0;
            /** The applied local shearY. */
            this.ashearY = 0;
            this.sorted = false;
            this.active = false;
            if (!data)
                throw new Error("data cannot be null.");
            if (!skeleton)
                throw new Error("skeleton cannot be null.");
            this.data = data;
            this.skeleton = skeleton;
            this.parent = parent;
            this.setToSetupPose();
        }
        Object.defineProperty(Bone.prototype, "worldX", {
            get: function () {
                return this.matrix.tx;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Bone.prototype, "worldY", {
            get: function () {
                return this.matrix.ty;
            },
            enumerable: false,
            configurable: true
        });
        /** Returns false when the bone has not been computed because {@link BoneData#skinRequired} is true and the
         * {@link Skeleton#skin active skin} does not {@link Skin#bones contain} this bone. */
        Bone.prototype.isActive = function () {
            return this.active;
        };
        /** Computes the world transform using the parent bone and this bone's local applied transform. */
        Bone.prototype.update = function () {
            this.updateWorldTransformWith(this.ax, this.ay, this.arotation, this.ascaleX, this.ascaleY, this.ashearX, this.ashearY);
        };
        /** Computes the world transform using the parent bone and this bone's local transform.
         *
         * See {@link #updateWorldTransformWith()}. */
        Bone.prototype.updateWorldTransform = function () {
            this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
        };
        /** Computes the world transform using the parent bone and the specified local transform. The applied transform is set to the
         * specified local transform. Child bones are not updated.
         *
         * See [World transforms](http://esotericsoftware.com/spine-runtime-skeletons#World-transforms) in the Spine
         * Runtimes Guide. */
        Bone.prototype.updateWorldTransformWith = function (x, y, rotation, scaleX, scaleY, shearX, shearY) {
            this.ax = x;
            this.ay = y;
            this.arotation = rotation;
            this.ascaleX = scaleX;
            this.ascaleY = scaleY;
            this.ashearX = shearX;
            this.ashearY = shearY;
            var parent = this.parent;
            var m = this.matrix;
            var sx = this.skeleton.scaleX;
            var sy = settings.yDown ? -this.skeleton.scaleY : this.skeleton.scaleY;
            if (!parent) { // Root bone.
                var skeleton = this.skeleton;
                var rotationY = rotation + 90 + shearY;
                m.a = MathUtils.cosDeg(rotation + shearX) * scaleX * sx;
                m.c = MathUtils.cosDeg(rotationY) * scaleY * sx;
                m.b = MathUtils.sinDeg(rotation + shearX) * scaleX * sy;
                m.d = MathUtils.sinDeg(rotationY) * scaleY * sy;
                m.tx = x * sx + skeleton.x;
                m.ty = y * sy + skeleton.y;
                return;
            }
            var pa = parent.matrix.a, pb = parent.matrix.c, pc = parent.matrix.b, pd = parent.matrix.d;
            m.tx = pa * x + pb * y + parent.matrix.tx;
            m.ty = pc * x + pd * y + parent.matrix.ty;
            switch (this.data.transformMode) {
                case exports.TransformMode.Normal: {
                    var rotationY = rotation + 90 + shearY;
                    var la = MathUtils.cosDeg(rotation + shearX) * scaleX;
                    var lb = MathUtils.cosDeg(rotationY) * scaleY;
                    var lc = MathUtils.sinDeg(rotation + shearX) * scaleX;
                    var ld = MathUtils.sinDeg(rotationY) * scaleY;
                    m.a = pa * la + pb * lc;
                    m.c = pa * lb + pb * ld;
                    m.b = pc * la + pd * lc;
                    m.d = pc * lb + pd * ld;
                    return;
                }
                case exports.TransformMode.OnlyTranslation: {
                    var rotationY = rotation + 90 + shearY;
                    m.a = MathUtils.cosDeg(rotation + shearX) * scaleX;
                    m.c = MathUtils.cosDeg(rotationY) * scaleY;
                    m.b = MathUtils.sinDeg(rotation + shearX) * scaleX;
                    m.d = MathUtils.sinDeg(rotationY) * scaleY;
                    break;
                }
                case exports.TransformMode.NoRotationOrReflection: {
                    var s = pa * pa + pc * pc;
                    var prx = 0;
                    if (s > 0.0001) {
                        s = Math.abs(pa * pd - pb * pc) / s;
                        pa /= sx;
                        pc /= sy;
                        pb = pc * s;
                        pd = pa * s;
                        prx = Math.atan2(pc, pa) * MathUtils.radDeg;
                    }
                    else {
                        pa = 0;
                        pc = 0;
                        prx = 90 - Math.atan2(pd, pb) * MathUtils.radDeg;
                    }
                    var rx = rotation + shearX - prx;
                    var ry = rotation + shearY - prx + 90;
                    var la = MathUtils.cosDeg(rx) * scaleX;
                    var lb = MathUtils.cosDeg(ry) * scaleY;
                    var lc = MathUtils.sinDeg(rx) * scaleX;
                    var ld = MathUtils.sinDeg(ry) * scaleY;
                    m.a = pa * la - pb * lc;
                    m.c = pa * lb - pb * ld;
                    m.b = pc * la + pd * lc;
                    m.d = pc * lb + pd * ld;
                    break;
                }
                case exports.TransformMode.NoScale:
                case exports.TransformMode.NoScaleOrReflection: {
                    var cos = MathUtils.cosDeg(rotation);
                    var sin = MathUtils.sinDeg(rotation);
                    var za = (pa * cos + pb * sin) / sx;
                    var zc = (pc * cos + pd * sin) / sy;
                    var s = Math.sqrt(za * za + zc * zc);
                    if (s > 0.00001)
                        s = 1 / s;
                    za *= s;
                    zc *= s;
                    s = Math.sqrt(za * za + zc * zc);
                    if (this.data.transformMode == exports.TransformMode.NoScale
                        && (pa * pd - pb * pc < 0) != (sx < 0 != sy < 0))
                        s = -s;
                    var r = Math.PI / 2 + Math.atan2(zc, za);
                    var zb = Math.cos(r) * s;
                    var zd = Math.sin(r) * s;
                    var la = MathUtils.cosDeg(shearX) * scaleX;
                    var lb = MathUtils.cosDeg(90 + shearY) * scaleY;
                    var lc = MathUtils.sinDeg(shearX) * scaleX;
                    var ld = MathUtils.sinDeg(90 + shearY) * scaleY;
                    m.a = za * la + zb * lc;
                    m.c = za * lb + zb * ld;
                    m.b = zc * la + zd * lc;
                    m.d = zc * lb + zd * ld;
                    break;
                }
            }
            m.a *= sx;
            m.c *= sx;
            m.b *= sy;
            m.d *= sy;
        };
        /** Sets this bone's local transform to the setup pose. */
        Bone.prototype.setToSetupPose = function () {
            var data = this.data;
            this.x = data.x;
            this.y = data.y;
            this.rotation = data.rotation;
            this.scaleX = data.scaleX;
            this.scaleY = data.scaleY;
            this.shearX = data.shearX;
            this.shearY = data.shearY;
        };
        /** The world rotation for the X axis, calculated using {@link #a} and {@link #c}. */
        Bone.prototype.getWorldRotationX = function () {
            return Math.atan2(this.matrix.b, this.matrix.a) * MathUtils.radDeg;
        };
        /** The world rotation for the Y axis, calculated using {@link #b} and {@link #d}. */
        Bone.prototype.getWorldRotationY = function () {
            return Math.atan2(this.matrix.d, this.matrix.c) * MathUtils.radDeg;
        };
        /** The magnitude (always positive) of the world scale X, calculated using {@link #a} and {@link #c}. */
        Bone.prototype.getWorldScaleX = function () {
            var m = this.matrix;
            return Math.sqrt(m.a * m.a + m.b * m.b);
        };
        /** The magnitude (always positive) of the world scale Y, calculated using {@link #b} and {@link #d}. */
        Bone.prototype.getWorldScaleY = function () {
            var m = this.matrix;
            return Math.sqrt(m.c * m.c + m.d * m.d);
        };
        /** Computes the applied transform values from the world transform.
         *
         * If the world transform is modified (by a constraint, {@link #rotateWorld(float)}, etc) then this method should be called so
         * the applied transform matches the world transform. The applied transform may be needed by other code (eg to apply other
         * constraints).
         *
         * Some information is ambiguous in the world transform, such as -1,-1 scale versus 180 rotation. The applied transform after
         * calling this method is equivalent to the local transform used to compute the world transform, but may not be identical. */
        Bone.prototype.updateAppliedTransform = function () {
            var parent = this.parent;
            var m = this.matrix;
            if (!parent) {
                this.ax = m.tx - this.skeleton.x;
                this.ay = m.ty - this.skeleton.y;
                this.arotation = Math.atan2(m.b, m.a) * MathUtils.radDeg;
                this.ascaleX = Math.sqrt(m.a * m.a + m.b * m.b);
                this.ascaleY = Math.sqrt(m.c * m.c + m.d * m.d);
                this.ashearX = 0;
                this.ashearY = Math.atan2(m.a * m.c + m.b * m.d, m.a * m.d - m.b * m.c) * MathUtils.radDeg;
                return;
            }
            var pm = parent.matrix;
            var pid = 1 / (pm.a * pm.d - pm.b * pm.c);
            var dx = m.tx - pm.tx, dy = m.ty - pm.ty;
            this.ax = (dx * pm.d * pid - dy * pm.c * pid);
            this.ay = (dy * pm.a * pid - dx * pm.b * pid);
            var ia = pid * pm.d;
            var id = pid * pm.a;
            var ib = pid * pm.c;
            var ic = pid * pm.b;
            var ra = ia * m.a - ib * m.b;
            var rb = ia * m.c - ib * m.d;
            var rc = id * m.b - ic * m.a;
            var rd = id * m.d - ic * m.c;
            this.ashearX = 0;
            this.ascaleX = Math.sqrt(ra * ra + rc * rc);
            if (this.ascaleX > 0.0001) {
                var det = ra * rd - rb * rc;
                this.ascaleY = det / this.ascaleX;
                this.ashearY = Math.atan2(ra * rb + rc * rd, det) * MathUtils.radDeg;
                this.arotation = Math.atan2(rc, ra) * MathUtils.radDeg;
            }
            else {
                this.ascaleX = 0;
                this.ascaleY = Math.sqrt(rb * rb + rd * rd);
                this.ashearY = 0;
                this.arotation = 90 - Math.atan2(rd, rb) * MathUtils.radDeg;
            }
        };
        /** Transforms a point from world coordinates to the bone's local coordinates. */
        Bone.prototype.worldToLocal = function (world) {
            var m = this.matrix;
            var a = m.a, b = m.c, c = m.b, d = m.d;
            var invDet = 1 / (a * d - b * c);
            var x = world.x - m.tx, y = world.y - m.ty;
            world.x = (x * d * invDet - y * b * invDet);
            world.y = (y * a * invDet - x * c * invDet);
            return world;
        };
        /** Transforms a point from the bone's local coordinates to world coordinates. */
        Bone.prototype.localToWorld = function (local) {
            var m = this.matrix;
            var x = local.x, y = local.y;
            local.x = x * m.a + y * m.c + m.tx;
            local.y = x * m.b + y * m.d + m.ty;
            return local;
        };
        /** Transforms a world rotation to a local rotation. */
        Bone.prototype.worldToLocalRotation = function (worldRotation) {
            var sin = MathUtils.sinDeg(worldRotation), cos = MathUtils.cosDeg(worldRotation);
            var mat = this.matrix;
            return Math.atan2(mat.a * sin - mat.b * cos, mat.d * cos - mat.c * sin) * MathUtils.radDeg;
        };
        /** Transforms a local rotation to a world rotation. */
        Bone.prototype.localToWorldRotation = function (localRotation) {
            localRotation -= this.rotation - this.shearX;
            var sin = MathUtils.sinDeg(localRotation), cos = MathUtils.cosDeg(localRotation);
            var mat = this.matrix;
            return Math.atan2(cos * mat.b + sin * mat.d, cos * mat.a + sin * mat.c) * MathUtils.radDeg;
        };
        /** Rotates the world transform the specified amount.
         * <p>
         * After changes are made to the world transform, {@link #updateAppliedTransform()} should be called and {@link #update()} will
         * need to be called on any child bones, recursively. */
        Bone.prototype.rotateWorld = function (degrees) {
            var mat = this.matrix;
            var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
            var cos = MathUtils.cosDeg(degrees), sin = MathUtils.sinDeg(degrees);
            mat.a = cos * a - sin * c;
            mat.c = cos * b - sin * d;
            mat.b = sin * a + cos * c;
            mat.d = sin * b + cos * d;
        };
        return Bone;
    }());

    /** Stores the setup pose for a {@link Bone}.
     * @public
     * */
    var BoneData = /** @class */ (function () {
        function BoneData(index, name, parent) {
            /** The index of the bone in {@link Skeleton#getBones()}. */
            this.index = 0;
            /** @returns May be null. */
            this.parent = null;
            /** The bone's length. */
            this.length = 0;
            /** The local x translation. */
            this.x = 0;
            /** The local y translation. */
            this.y = 0;
            /** The local rotation. */
            this.rotation = 0;
            /** The local scaleX. */
            this.scaleX = 1;
            /** The local scaleY. */
            this.scaleY = 1;
            /** The local shearX. */
            this.shearX = 0;
            /** The local shearX. */
            this.shearY = 0;
            /** The transform mode for how parent world transforms affect this bone. */
            this.transformMode = exports.TransformMode.Normal;
            /** When true, {@link Skeleton#updateWorldTransform()} only updates this bone if the {@link Skeleton#skin} contains this
             * bone.
             * @see Skin#bones */
            this.skinRequired = false;
            /** The color of the bone as it was in Spine. Available only when nonessential data was exported. Bones are not usually
             * rendered at runtime. */
            this.color = new Color();
            if (index < 0)
                throw new Error("index must be >= 0.");
            if (!name)
                throw new Error("name cannot be null.");
            this.index = index;
            this.name = name;
            this.parent = parent;
        }
        return BoneData;
    }());

    /** The base class for all constraint datas.
     * @public
     * */
    var ConstraintData = /** @class */ (function () {
        function ConstraintData(name, order, skinRequired) {
            this.name = name;
            this.order = order;
            this.skinRequired = skinRequired;
        }
        return ConstraintData;
    }());

    /** Stores the current pose values for an {@link Event}.
     *
     * See Timeline {@link Timeline#apply()},
     * AnimationStateListener {@link AnimationStateListener#event()}, and
     * [Events](http://esotericsoftware.com/spine-events) in the Spine User Guide.
     * @public
     * */
    var Event = /** @class */ (function () {
        function Event(time, data) {
            this.intValue = 0;
            this.floatValue = 0;
            this.stringValue = null;
            this.time = 0;
            this.volume = 0;
            this.balance = 0;
            if (!data)
                throw new Error("data cannot be null.");
            this.time = time;
            this.data = data;
        }
        return Event;
    }());

    /** Stores the setup pose values for an {@link Event}.
     *
     * See [Events](http://esotericsoftware.com/spine-events) in the Spine User Guide.
     * @public
     * */
    var EventData = /** @class */ (function () {
        function EventData(name) {
            this.intValue = 0;
            this.floatValue = 0;
            this.stringValue = null;
            this.audioPath = null;
            this.volume = 0;
            this.balance = 0;
            this.name = name;
        }
        return EventData;
    }());

    /** Stores the current pose for an IK constraint. An IK constraint adjusts the rotation of 1 or 2 constrained bones so the tip of
     * the last bone is as close to the target bone as possible.
     *
     * See [IK constraints](http://esotericsoftware.com/spine-ik-constraints) in the Spine User Guide.
     * @public
     * */
    var IkConstraint = /** @class */ (function () {
        function IkConstraint(data, skeleton) {
            /** Controls the bend direction of the IK bones, either 1 or -1. */
            this.bendDirection = 0;
            /** When true and only a single bone is being constrained, if the target is too close, the bone is scaled to reach it. */
            this.compress = false;
            /** When true, if the target is out of range, the parent bone is scaled to reach it. If more than one bone is being constrained
             * and the parent bone has local nonuniform scale, stretch is not applied. */
            this.stretch = false;
            /** A percentage (0-1) that controls the mix between the constrained and unconstrained rotations. */
            this.mix = 1;
            /** For two bone IK, the distance from the maximum reach of the bones that rotation will slow. */
            this.softness = 0;
            this.active = false;
            if (!data)
                throw new Error("data cannot be null.");
            if (!skeleton)
                throw new Error("skeleton cannot be null.");
            this.data = data;
            this.mix = data.mix;
            this.softness = data.softness;
            this.bendDirection = data.bendDirection;
            this.compress = data.compress;
            this.stretch = data.stretch;
            this.bones = new Array();
            for (var i = 0; i < data.bones.length; i++) {
                var bone = skeleton.findBone(data.bones[i].name);
                if (!bone)
                    throw new Error("Couldn't find bone " + data.bones[i].name);
                this.bones.push(bone);
            }
            var target = skeleton.findBone(data.target.name);
            if (!target)
                throw new Error("Couldn't find bone " + data.target.name);
            this.target = target;
        }
        IkConstraint.prototype.isActive = function () {
            return this.active;
        };
        IkConstraint.prototype.update = function () {
            if (this.mix == 0)
                return;
            var target = this.target;
            var bones = this.bones;
            switch (bones.length) {
                case 1:
                    this.apply1(bones[0], target.worldX, target.worldY, this.compress, this.stretch, this.data.uniform, this.mix);
                    break;
                case 2:
                    this.apply2(bones[0], bones[1], target.worldX, target.worldY, this.bendDirection, this.stretch, this.data.uniform, this.softness, this.mix);
                    break;
            }
        };
        /** Applies 1 bone IK. The target is specified in the world coordinate system. */
        IkConstraint.prototype.apply1 = function (bone, targetX, targetY, compress, stretch, uniform, alpha) {
            var p = bone.parent.matrix;
            if (!p)
                throw new Error("IK bone must have parent.");
            var pa = p.a, pb = p.c, pc = p.b, pd = p.d;
            var rotationIK = -bone.ashearX - bone.arotation, tx = 0, ty = 0;
            var skelX = bone.skeleton.scaleX;
            var skelY = settings.yDown ? -bone.skeleton.scaleY : bone.skeleton.scaleY;
            switch (bone.data.transformMode) {
                case exports.TransformMode.OnlyTranslation:
                    tx = targetX - bone.worldX;
                    ty = targetY - bone.worldY;
                    //TODO: possible bug in spine-ts runtime!
                    if (settings.yDown) {
                        ty = -ty;
                    }
                    break;
                case exports.TransformMode.NoRotationOrReflection:
                    var s = Math.abs(pa * pd - pb * pc) / (pa * pa + pc * pc);
                    var sa = pa / skelX;
                    var sc = pc / skelY;
                    pb = -sc * s * skelX;
                    pd = sa * s * skelY;
                    rotationIK += Math.atan2(sc, sa) * MathUtils.radDeg;
                // Fall through
                default:
                    var x = targetX - p.tx, y = targetY - p.ty;
                    var d = pa * pd - pb * pc;
                    tx = (x * pd - y * pb) / d - bone.ax;
                    ty = (y * pa - x * pc) / d - bone.ay;
            }
            rotationIK += Math.atan2(ty, tx) * MathUtils.radDeg;
            if (bone.ascaleX < 0)
                rotationIK += 180;
            if (rotationIK > 180)
                rotationIK -= 360;
            else if (rotationIK < -180)
                rotationIK += 360;
            var sx = bone.ascaleX, sy = bone.ascaleY;
            if (compress || stretch) {
                switch (bone.data.transformMode) {
                    case exports.TransformMode.NoScale:
                    case exports.TransformMode.NoScaleOrReflection:
                        tx = targetX - bone.worldX;
                        ty = targetY - bone.worldY;
                }
                var b = bone.data.length * sx, dd = Math.sqrt(tx * tx + ty * ty);
                if ((compress && dd < b) || (stretch && dd > b) && b > 0.0001) {
                    var s = (dd / b - 1) * alpha + 1;
                    sx *= s;
                    if (uniform)
                        sy *= s;
                }
            }
            bone.updateWorldTransformWith(bone.ax, bone.ay, bone.arotation + rotationIK * alpha, sx, sy, bone.ashearX, bone.ashearY);
        };
        /** Applies 2 bone IK. The target is specified in the world coordinate system.
         * @param child A direct descendant of the parent bone. */
        IkConstraint.prototype.apply2 = function (parent, child, targetX, targetY, bendDir, stretch, uniform, softness, alpha) {
            var px = parent.ax, py = parent.ay, psx = parent.ascaleX, psy = parent.ascaleY, sx = psx, sy = psy, csx = child.ascaleX;
            var pmat = parent.matrix;
            var os1 = 0, os2 = 0, s2 = 0;
            if (psx < 0) {
                psx = -psx;
                os1 = 180;
                s2 = -1;
            }
            else {
                os1 = 0;
                s2 = 1;
            }
            if (psy < 0) {
                psy = -psy;
                s2 = -s2;
            }
            if (csx < 0) {
                csx = -csx;
                os2 = 180;
            }
            else
                os2 = 0;
            var cx = child.ax, cy = 0, cwx = 0, cwy = 0, a = pmat.a, b = pmat.c, c = pmat.b, d = pmat.d;
            var u = Math.abs(psx - psy) <= 0.0001;
            if (!u || stretch) {
                cy = 0;
                cwx = a * cx + pmat.tx;
                cwy = c * cx + pmat.ty;
            }
            else {
                cy = child.ay;
                cwx = a * cx + b * cy + pmat.tx;
                cwy = c * cx + d * cy + pmat.ty;
            }
            var pp = parent.parent.matrix;
            if (!pp)
                throw new Error("IK parent must itself have a parent.");
            a = pp.a;
            b = pp.c;
            c = pp.b;
            d = pp.d;
            var id = 1 / (a * d - b * c), x = cwx - pp.tx, y = cwy - pp.ty;
            var dx = (x * d - y * b) * id - px, dy = (y * a - x * c) * id - py;
            var l1 = Math.sqrt(dx * dx + dy * dy), l2 = child.data.length * csx, a1, a2;
            if (l1 < 0.0001) {
                this.apply1(parent, targetX, targetY, false, stretch, false, alpha);
                child.updateWorldTransformWith(cx, cy, 0, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
                return;
            }
            x = targetX - pp.tx;
            y = targetY - pp.ty;
            var tx = (x * d - y * b) * id - px, ty = (y * a - x * c) * id - py;
            var dd = tx * tx + ty * ty;
            if (softness != 0) {
                softness *= psx * (csx + 1) * 0.5;
                var td = Math.sqrt(dd), sd = td - l1 - l2 * psx + softness;
                if (sd > 0) {
                    var p = Math.min(1, sd / (softness * 2)) - 1;
                    p = (sd - softness * (1 - p * p)) / td;
                    tx -= p * tx;
                    ty -= p * ty;
                    dd = tx * tx + ty * ty;
                }
            }
            outer: if (u) {
                l2 *= psx;
                var cos = (dd - l1 * l1 - l2 * l2) / (2 * l1 * l2);
                if (cos < -1) {
                    cos = -1;
                    a2 = Math.PI * bendDir;
                }
                else if (cos > 1) {
                    cos = 1;
                    a2 = 0;
                    if (stretch) {
                        a = (Math.sqrt(dd) / (l1 + l2) - 1) * alpha + 1;
                        sx *= a;
                        if (uniform)
                            sy *= a;
                    }
                }
                else
                    a2 = Math.acos(cos) * bendDir;
                a = l1 + l2 * cos;
                b = l2 * Math.sin(a2);
                a1 = Math.atan2(ty * a - tx * b, tx * a + ty * b);
            }
            else {
                a = psx * l2;
                b = psy * l2;
                var aa = a * a, bb = b * b, ta = Math.atan2(ty, tx);
                c = bb * l1 * l1 + aa * dd - aa * bb;
                var c1 = -2 * bb * l1, c2 = bb - aa;
                d = c1 * c1 - 4 * c2 * c;
                if (d >= 0) {
                    var q = Math.sqrt(d);
                    if (c1 < 0)
                        q = -q;
                    q = -(c1 + q) * 0.5;
                    var r0 = q / c2, r1 = c / q;
                    var r = Math.abs(r0) < Math.abs(r1) ? r0 : r1;
                    if (r * r <= dd) {
                        y = Math.sqrt(dd - r * r) * bendDir;
                        a1 = ta - Math.atan2(y, r);
                        a2 = Math.atan2(y / psy, (r - l1) / psx);
                        break outer;
                    }
                }
                var minAngle = MathUtils.PI, minX = l1 - a, minDist = minX * minX, minY = 0;
                var maxAngle = 0, maxX = l1 + a, maxDist = maxX * maxX, maxY = 0;
                c = -a * l1 / (aa - bb);
                if (c >= -1 && c <= 1) {
                    c = Math.acos(c);
                    x = a * Math.cos(c) + l1;
                    y = b * Math.sin(c);
                    d = x * x + y * y;
                    if (d < minDist) {
                        minAngle = c;
                        minDist = d;
                        minX = x;
                        minY = y;
                    }
                    if (d > maxDist) {
                        maxAngle = c;
                        maxDist = d;
                        maxX = x;
                        maxY = y;
                    }
                }
                if (dd <= (minDist + maxDist) * 0.5) {
                    a1 = ta - Math.atan2(minY * bendDir, minX);
                    a2 = minAngle * bendDir;
                }
                else {
                    a1 = ta - Math.atan2(maxY * bendDir, maxX);
                    a2 = maxAngle * bendDir;
                }
            }
            var os = Math.atan2(cy, cx) * s2;
            var rotation = parent.arotation;
            a1 = (a1 - os) * MathUtils.radDeg + os1 - rotation;
            if (a1 > 180)
                a1 -= 360;
            else if (a1 < -180) //
                a1 += 360;
            parent.updateWorldTransformWith(px, py, rotation + a1 * alpha, sx, sy, 0, 0);
            rotation = child.arotation;
            a2 = ((a2 + os) * MathUtils.radDeg - child.ashearX) * s2 + os2 - rotation;
            if (a2 > 180)
                a2 -= 360;
            else if (a2 < -180) //
                a2 += 360;
            child.updateWorldTransformWith(cx, cy, rotation + a2 * alpha, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
        };
        return IkConstraint;
    }());

    /** Stores the setup pose for an {@link IkConstraint}.
     * <p>
     * See [IK constraints](http://esotericsoftware.com/spine-ik-constraints) in the Spine User Guide.
     * @public
     * */
    var IkConstraintData = /** @class */ (function (_super) {
        __extends$1(IkConstraintData, _super);
        function IkConstraintData(name) {
            var _this = _super.call(this, name, 0, false) || this;
            /** The bones that are constrained by this IK constraint. */
            _this.bones = new Array();
            /** The bone that is the IK target. */
            _this._target = null;
            /** Controls the bend direction of the IK bones, either 1 or -1. */
            _this.bendDirection = 1;
            /** When true and only a single bone is being constrained, if the target is too close, the bone is scaled to reach it. */
            _this.compress = false;
            /** When true, if the target is out of range, the parent bone is scaled to reach it. If more than one bone is being constrained
             * and the parent bone has local nonuniform scale, stretch is not applied. */
            _this.stretch = false;
            /** When true, only a single bone is being constrained, and {@link #getCompress()} or {@link #getStretch()} is used, the bone
             * is scaled on both the X and Y axes. */
            _this.uniform = false;
            /** A percentage (0-1) that controls the mix between the constrained and unconstrained rotations. */
            _this.mix = 1;
            /** For two bone IK, the distance from the maximum reach of the bones that rotation will slow. */
            _this.softness = 0;
            return _this;
        }
        Object.defineProperty(IkConstraintData.prototype, "target", {
            get: function () {
                if (!this._target)
                    throw new Error("BoneData not set.");
                else
                    return this._target;
            },
            set: function (boneData) { this._target = boneData; },
            enumerable: false,
            configurable: true
        });
        return IkConstraintData;
    }(ConstraintData));

    /** Stores the setup pose for a {@link PathConstraint}.
     *
     * See [Path constraints](http://esotericsoftware.com/spine-path-constraints) in the Spine User Guide.
     * @public
     * */
    var PathConstraintData = /** @class */ (function (_super) {
        __extends$1(PathConstraintData, _super);
        function PathConstraintData(name) {
            var _this = _super.call(this, name, 0, false) || this;
            /** The bones that will be modified by this path constraint. */
            _this.bones = new Array();
            /** The slot whose path attachment will be used to constrained the bones. */
            _this._target = null;
            /** The mode for positioning the first bone on the path. */
            _this.positionMode = exports.PositionMode.Fixed;
            /** The mode for positioning the bones after the first bone on the path. */
            _this.spacingMode = exports.SpacingMode.Fixed;
            /** The mode for adjusting the rotation of the bones. */
            _this.rotateMode = exports.RotateMode.Chain;
            /** An offset added to the constrained bone rotation. */
            _this.offsetRotation = 0;
            /** The position along the path. */
            _this.position = 0;
            /** The spacing between bones. */
            _this.spacing = 0;
            _this.mixRotate = 0;
            _this.mixX = 0;
            _this.mixY = 0;
            return _this;
        }
        Object.defineProperty(PathConstraintData.prototype, "target", {
            get: function () {
                if (!this._target)
                    throw new Error("SlotData not set.");
                else
                    return this._target;
            },
            set: function (slotData) { this._target = slotData; },
            enumerable: false,
            configurable: true
        });
        return PathConstraintData;
    }(ConstraintData));
    /** Controls how bones after the first bone are positioned along the path.
     *
     * [Spacing mode](http://esotericsoftware.com/spine-path-constraints#Spacing-mode) in the Spine User Guide.
     * @public
     * */
    exports.SpacingMode = void 0;
    (function (SpacingMode) {
        SpacingMode[SpacingMode["Length"] = 0] = "Length";
        SpacingMode[SpacingMode["Fixed"] = 1] = "Fixed";
        SpacingMode[SpacingMode["Percent"] = 2] = "Percent";
        SpacingMode[SpacingMode["Proportional"] = 3] = "Proportional";
    })(exports.SpacingMode || (exports.SpacingMode = {}));

    /** Stores the current pose for a path constraint. A path constraint adjusts the rotation, translation, and scale of the
     * constrained bones so they follow a {@link PathAttachment}.
     *
     * See [Path constraints](http://esotericsoftware.com/spine-path-constraints) in the Spine User Guide.
     * @public
     * */
    var PathConstraint = /** @class */ (function () {
        function PathConstraint(data, skeleton) {
            /** The position along the path. */
            this.position = 0;
            /** The spacing between bones. */
            this.spacing = 0;
            this.mixRotate = 0;
            this.mixX = 0;
            this.mixY = 0;
            this.spaces = new Array();
            this.positions = new Array();
            this.world = new Array();
            this.curves = new Array();
            this.lengths = new Array();
            this.segments = new Array();
            this.active = false;
            if (!data)
                throw new Error("data cannot be null.");
            if (!skeleton)
                throw new Error("skeleton cannot be null.");
            this.data = data;
            this.bones = new Array();
            for (var i = 0, n = data.bones.length; i < n; i++) {
                var bone = skeleton.findBone(data.bones[i].name);
                if (!bone)
                    throw new Error("Couldn't find bone " + data.bones[i].name + ".");
                this.bones.push(bone);
            }
            var target = skeleton.findSlot(data.target.name);
            if (!target)
                throw new Error("Couldn't find target bone " + data.target.name);
            this.target = target;
            this.position = data.position;
            this.spacing = data.spacing;
            this.mixRotate = data.mixRotate;
            this.mixX = data.mixX;
            this.mixY = data.mixY;
        }
        PathConstraint.prototype.isActive = function () {
            return this.active;
        };
        PathConstraint.prototype.update = function () {
            var attachment = this.target.getAttachment();
            if (!(attachment instanceof PathAttachment))
                return;
            var mixRotate = this.mixRotate, mixX = this.mixX, mixY = this.mixY;
            if (mixRotate == 0 && mixX == 0 && mixY == 0)
                return;
            var data = this.data;
            var tangents = data.rotateMode == exports.RotateMode.Tangent, scale = data.rotateMode == exports.RotateMode.ChainScale;
            var bones = this.bones;
            var boneCount = bones.length, spacesCount = tangents ? boneCount : boneCount + 1;
            var spaces = Utils.setArraySize(this.spaces, spacesCount), lengths = scale ? this.lengths = Utils.setArraySize(this.lengths, boneCount) : [];
            var spacing = this.spacing;
            switch (data.spacingMode) {
                case exports.SpacingMode.Percent:
                    if (scale) {
                        for (var i = 0, n = spacesCount - 1; i < n; i++) {
                            var bone = bones[i];
                            var setupLength = bone.data.length;
                            if (setupLength < PathConstraint.epsilon)
                                lengths[i] = 0;
                            else {
                                var x = setupLength * bone.matrix.a, y = setupLength * bone.matrix.b;
                                lengths[i] = Math.sqrt(x * x + y * y);
                            }
                        }
                    }
                    Utils.arrayFill(spaces, 1, spacesCount, spacing);
                    break;
                case exports.SpacingMode.Proportional:
                    var sum = 0;
                    for (var i = 0, n = spacesCount - 1; i < n;) {
                        var bone = bones[i];
                        var setupLength = bone.data.length;
                        if (setupLength < PathConstraint.epsilon) {
                            if (scale)
                                lengths[i] = 0;
                            spaces[++i] = spacing;
                        }
                        else {
                            var x = setupLength * bone.matrix.a, y = setupLength * bone.matrix.b;
                            var length_1 = Math.sqrt(x * x + y * y);
                            if (scale)
                                lengths[i] = length_1;
                            spaces[++i] = length_1;
                            sum += length_1;
                        }
                    }
                    if (sum > 0) {
                        sum = spacesCount / sum * spacing;
                        for (var i = 1; i < spacesCount; i++)
                            spaces[i] *= sum;
                    }
                    break;
                default:
                    var lengthSpacing = data.spacingMode == exports.SpacingMode.Length;
                    for (var i = 0, n = spacesCount - 1; i < n;) {
                        var bone = bones[i];
                        var setupLength = bone.data.length;
                        if (setupLength < PathConstraint.epsilon) {
                            if (scale)
                                lengths[i] = 0;
                            spaces[++i] = spacing;
                        }
                        else {
                            var x = setupLength * bone.matrix.a, y = setupLength * bone.matrix.b;
                            var length_2 = Math.sqrt(x * x + y * y);
                            if (scale)
                                lengths[i] = length_2;
                            spaces[++i] = (lengthSpacing ? setupLength + spacing : spacing) * length_2 / setupLength;
                        }
                    }
            }
            var positions = this.computeWorldPositions(attachment, spacesCount, tangents);
            var boneX = positions[0], boneY = positions[1], offsetRotation = data.offsetRotation;
            var tip = false;
            if (offsetRotation == 0)
                tip = data.rotateMode == exports.RotateMode.Chain;
            else {
                tip = false;
                var p = this.target.bone.matrix;
                offsetRotation *= p.a * p.d - p.b * p.c > 0 ? MathUtils.degRad : -MathUtils.degRad;
            }
            for (var i = 0, p = 3; i < boneCount; i++, p += 3) {
                var bone = bones[i];
                var mat = bone.matrix;
                mat.tx += (boneX - mat.tx) * mixX;
                mat.ty += (boneY - mat.ty) * mixY;
                var x = positions[p], y = positions[p + 1], dx = x - boneX, dy = y - boneY;
                if (scale) {
                    var length_3 = lengths[i];
                    if (length_3 != 0) {
                        var s = (Math.sqrt(dx * dx + dy * dy) / length_3 - 1) * mixRotate + 1;
                        mat.a *= s;
                        mat.b *= s;
                    }
                }
                boneX = x;
                boneY = y;
                if (mixRotate > 0) {
                    var a = mat.a, b = mat.c, c = mat.b, d = mat.d, r = 0, cos = 0, sin = 0;
                    if (tangents)
                        r = positions[p - 1];
                    else if (spaces[i + 1] == 0)
                        r = positions[p + 2];
                    else
                        r = Math.atan2(dy, dx);
                    r -= Math.atan2(c, a);
                    if (tip) {
                        cos = Math.cos(r);
                        sin = Math.sin(r);
                        var length_4 = bone.data.length;
                        boneX += (length_4 * (cos * a - sin * c) - dx) * mixRotate;
                        boneY += (length_4 * (sin * a + cos * c) - dy) * mixRotate;
                    }
                    else {
                        r += offsetRotation;
                    }
                    if (r > MathUtils.PI)
                        r -= MathUtils.PI2;
                    else if (r < -MathUtils.PI) //
                        r += MathUtils.PI2;
                    r *= mixRotate;
                    cos = Math.cos(r);
                    sin = Math.sin(r);
                    mat.a = cos * a - sin * c;
                    mat.c = cos * b - sin * d;
                    mat.b = sin * a + cos * c;
                    mat.d = sin * b + cos * d;
                }
                bone.updateAppliedTransform();
            }
        };
        PathConstraint.prototype.computeWorldPositions = function (path, spacesCount, tangents) {
            var target = this.target;
            var position = this.position;
            var spaces = this.spaces, out = Utils.setArraySize(this.positions, spacesCount * 3 + 2), world = this.world;
            var closed = path.closed;
            var verticesLength = path.worldVerticesLength, curveCount = verticesLength / 6, prevCurve = PathConstraint.NONE;
            if (!path.constantSpeed) {
                var lengths = path.lengths;
                curveCount -= closed ? 1 : 2;
                var pathLength_1 = lengths[curveCount];
                if (this.data.positionMode == exports.PositionMode.Percent)
                    position *= pathLength_1;
                var multiplier_1;
                switch (this.data.spacingMode) {
                    case exports.SpacingMode.Percent:
                        multiplier_1 = pathLength_1;
                        break;
                    case exports.SpacingMode.Proportional:
                        multiplier_1 = pathLength_1 / spacesCount;
                        break;
                    default:
                        multiplier_1 = 1;
                }
                world = Utils.setArraySize(this.world, 8);
                for (var i = 0, o = 0, curve = 0; i < spacesCount; i++, o += 3) {
                    var space = spaces[i] * multiplier_1;
                    position += space;
                    var p = position;
                    if (closed) {
                        p %= pathLength_1;
                        if (p < 0)
                            p += pathLength_1;
                        curve = 0;
                    }
                    else if (p < 0) {
                        if (prevCurve != PathConstraint.BEFORE) {
                            prevCurve = PathConstraint.BEFORE;
                            path.computeWorldVertices(target, 2, 4, world, 0, 2);
                        }
                        this.addBeforePosition(p, world, 0, out, o);
                        continue;
                    }
                    else if (p > pathLength_1) {
                        if (prevCurve != PathConstraint.AFTER) {
                            prevCurve = PathConstraint.AFTER;
                            path.computeWorldVertices(target, verticesLength - 6, 4, world, 0, 2);
                        }
                        this.addAfterPosition(p - pathLength_1, world, 0, out, o);
                        continue;
                    }
                    // Determine curve containing position.
                    for (;; curve++) {
                        var length_5 = lengths[curve];
                        if (p > length_5)
                            continue;
                        if (curve == 0)
                            p /= length_5;
                        else {
                            var prev = lengths[curve - 1];
                            p = (p - prev) / (length_5 - prev);
                        }
                        break;
                    }
                    if (curve != prevCurve) {
                        prevCurve = curve;
                        if (closed && curve == curveCount) {
                            path.computeWorldVertices(target, verticesLength - 4, 4, world, 0, 2);
                            path.computeWorldVertices(target, 0, 4, world, 4, 2);
                        }
                        else
                            path.computeWorldVertices(target, curve * 6 + 2, 8, world, 0, 2);
                    }
                    this.addCurvePosition(p, world[0], world[1], world[2], world[3], world[4], world[5], world[6], world[7], out, o, tangents || (i > 0 && space == 0));
                }
                return out;
            }
            // World vertices.
            if (closed) {
                verticesLength += 2;
                world = Utils.setArraySize(this.world, verticesLength);
                path.computeWorldVertices(target, 2, verticesLength - 4, world, 0, 2);
                path.computeWorldVertices(target, 0, 2, world, verticesLength - 4, 2);
                world[verticesLength - 2] = world[0];
                world[verticesLength - 1] = world[1];
            }
            else {
                curveCount--;
                verticesLength -= 4;
                world = Utils.setArraySize(this.world, verticesLength);
                path.computeWorldVertices(target, 2, verticesLength, world, 0, 2);
            }
            // Curve lengths.
            var curves = Utils.setArraySize(this.curves, curveCount);
            var pathLength = 0;
            var x1 = world[0], y1 = world[1], cx1 = 0, cy1 = 0, cx2 = 0, cy2 = 0, x2 = 0, y2 = 0;
            var tmpx = 0, tmpy = 0, dddfx = 0, dddfy = 0, ddfx = 0, ddfy = 0, dfx = 0, dfy = 0;
            for (var i = 0, w = 2; i < curveCount; i++, w += 6) {
                cx1 = world[w];
                cy1 = world[w + 1];
                cx2 = world[w + 2];
                cy2 = world[w + 3];
                x2 = world[w + 4];
                y2 = world[w + 5];
                tmpx = (x1 - cx1 * 2 + cx2) * 0.1875;
                tmpy = (y1 - cy1 * 2 + cy2) * 0.1875;
                dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.09375;
                dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.09375;
                ddfx = tmpx * 2 + dddfx;
                ddfy = tmpy * 2 + dddfy;
                dfx = (cx1 - x1) * 0.75 + tmpx + dddfx * 0.16666667;
                dfy = (cy1 - y1) * 0.75 + tmpy + dddfy * 0.16666667;
                pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                dfx += ddfx;
                dfy += ddfy;
                ddfx += dddfx;
                ddfy += dddfy;
                pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                dfx += ddfx;
                dfy += ddfy;
                pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                dfx += ddfx + dddfx;
                dfy += ddfy + dddfy;
                pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                curves[i] = pathLength;
                x1 = x2;
                y1 = y2;
            }
            if (this.data.positionMode == exports.PositionMode.Percent)
                position *= pathLength;
            var multiplier;
            switch (this.data.spacingMode) {
                case exports.SpacingMode.Percent:
                    multiplier = pathLength;
                    break;
                case exports.SpacingMode.Proportional:
                    multiplier = pathLength / spacesCount;
                    break;
                default:
                    multiplier = 1;
            }
            var segments = this.segments;
            var curveLength = 0;
            for (var i = 0, o = 0, curve = 0, segment = 0; i < spacesCount; i++, o += 3) {
                var space = spaces[i] * multiplier;
                position += space;
                var p = position;
                if (closed) {
                    p %= pathLength;
                    if (p < 0)
                        p += pathLength;
                    curve = 0;
                }
                else if (p < 0) {
                    this.addBeforePosition(p, world, 0, out, o);
                    continue;
                }
                else if (p > pathLength) {
                    this.addAfterPosition(p - pathLength, world, verticesLength - 4, out, o);
                    continue;
                }
                // Determine curve containing position.
                for (;; curve++) {
                    var length_6 = curves[curve];
                    if (p > length_6)
                        continue;
                    if (curve == 0)
                        p /= length_6;
                    else {
                        var prev = curves[curve - 1];
                        p = (p - prev) / (length_6 - prev);
                    }
                    break;
                }
                // Curve segment lengths.
                if (curve != prevCurve) {
                    prevCurve = curve;
                    var ii = curve * 6;
                    x1 = world[ii];
                    y1 = world[ii + 1];
                    cx1 = world[ii + 2];
                    cy1 = world[ii + 3];
                    cx2 = world[ii + 4];
                    cy2 = world[ii + 5];
                    x2 = world[ii + 6];
                    y2 = world[ii + 7];
                    tmpx = (x1 - cx1 * 2 + cx2) * 0.03;
                    tmpy = (y1 - cy1 * 2 + cy2) * 0.03;
                    dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.006;
                    dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.006;
                    ddfx = tmpx * 2 + dddfx;
                    ddfy = tmpy * 2 + dddfy;
                    dfx = (cx1 - x1) * 0.3 + tmpx + dddfx * 0.16666667;
                    dfy = (cy1 - y1) * 0.3 + tmpy + dddfy * 0.16666667;
                    curveLength = Math.sqrt(dfx * dfx + dfy * dfy);
                    segments[0] = curveLength;
                    for (ii = 1; ii < 8; ii++) {
                        dfx += ddfx;
                        dfy += ddfy;
                        ddfx += dddfx;
                        ddfy += dddfy;
                        curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[ii] = curveLength;
                    }
                    dfx += ddfx;
                    dfy += ddfy;
                    curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    segments[8] = curveLength;
                    dfx += ddfx + dddfx;
                    dfy += ddfy + dddfy;
                    curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    segments[9] = curveLength;
                    segment = 0;
                }
                // Weight by segment length.
                p *= curveLength;
                for (;; segment++) {
                    var length_7 = segments[segment];
                    if (p > length_7)
                        continue;
                    if (segment == 0)
                        p /= length_7;
                    else {
                        var prev = segments[segment - 1];
                        p = segment + (p - prev) / (length_7 - prev);
                    }
                    break;
                }
                this.addCurvePosition(p * 0.1, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents || (i > 0 && space == 0));
            }
            return out;
        };
        PathConstraint.prototype.addBeforePosition = function (p, temp, i, out, o) {
            var x1 = temp[i], y1 = temp[i + 1], dx = temp[i + 2] - x1, dy = temp[i + 3] - y1, r = Math.atan2(dy, dx);
            out[o] = x1 + p * Math.cos(r);
            out[o + 1] = y1 + p * Math.sin(r);
            out[o + 2] = r;
        };
        PathConstraint.prototype.addAfterPosition = function (p, temp, i, out, o) {
            var x1 = temp[i + 2], y1 = temp[i + 3], dx = x1 - temp[i], dy = y1 - temp[i + 1], r = Math.atan2(dy, dx);
            out[o] = x1 + p * Math.cos(r);
            out[o + 1] = y1 + p * Math.sin(r);
            out[o + 2] = r;
        };
        PathConstraint.prototype.addCurvePosition = function (p, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents) {
            if (p == 0 || isNaN(p)) {
                out[o] = x1;
                out[o + 1] = y1;
                out[o + 2] = Math.atan2(cy1 - y1, cx1 - x1);
                return;
            }
            var tt = p * p, ttt = tt * p, u = 1 - p, uu = u * u, uuu = uu * u;
            var ut = u * p, ut3 = ut * 3, uut3 = u * ut3, utt3 = ut3 * p;
            var x = x1 * uuu + cx1 * uut3 + cx2 * utt3 + x2 * ttt, y = y1 * uuu + cy1 * uut3 + cy2 * utt3 + y2 * ttt;
            out[o] = x;
            out[o + 1] = y;
            if (tangents) {
                if (p < 0.001)
                    out[o + 2] = Math.atan2(cy1 - y1, cx1 - x1);
                else
                    out[o + 2] = Math.atan2(y - (y1 * uu + cy1 * ut * 2 + cy2 * tt), x - (x1 * uu + cx1 * ut * 2 + cx2 * tt));
            }
        };
        PathConstraint.NONE = -1;
        PathConstraint.BEFORE = -2;
        PathConstraint.AFTER = -3;
        PathConstraint.epsilon = 0.00001;
        return PathConstraint;
    }());

    /** Stores a slot's current pose. Slots organize attachments for {@link Skeleton#drawOrder} purposes and provide a place to store
     * state for an attachment. State cannot be stored in an attachment itself because attachments are stateless and may be shared
     * across multiple skeletons.
     * @public
     * */
    var Slot = /** @class */ (function () {
        function Slot(data, bone) {
            /** The dark color used to tint the slot's attachment for two color tinting, or null if two color tinting is not used. The dark
             * color's alpha is not used. */
            this.darkColor = null;
            this.attachment = null;
            this.attachmentState = 0;
            /** The index of the texture region to display when the slot's attachment has a {@link Sequence}. -1 represents the
             * {@link Sequence#getSetupIndex()}. */
            this.sequenceIndex = -1;
            /** Values to deform the slot's attachment. For an unweighted mesh, the entries are local positions for each vertex. For a
             * weighted mesh, the entries are an offset for each vertex which will be added to the mesh's local vertex positions.
             *
             * See {@link VertexAttachment#computeWorldVertices()} and {@link DeformTimeline}. */
            this.deform = new Array();
            if (!data)
                throw new Error("data cannot be null.");
            if (!bone)
                throw new Error("bone cannot be null.");
            this.data = data;
            this.bone = bone;
            this.color = new Color();
            this.darkColor = !data.darkColor ? null : new Color();
            this.setToSetupPose();
            this.blendMode = this.data.blendMode;
        }
        /** The skeleton this slot belongs to. */
        Slot.prototype.getSkeleton = function () {
            return this.bone.skeleton;
        };
        /** The current attachment for the slot, or null if the slot has no attachment. */
        Slot.prototype.getAttachment = function () {
            return this.attachment;
        };
        /** Sets the slot's attachment and, if the attachment changed, resets {@link #sequenceIndex} and clears the {@link #deform}.
         * The deform is not cleared if the old attachment has the same {@link VertexAttachment#getTimelineAttachment()} as the
         * specified attachment. */
        Slot.prototype.setAttachment = function (attachment) {
            if (this.attachment == attachment)
                return;
            if (!(attachment instanceof VertexAttachment) || !(this.attachment instanceof VertexAttachment)
                || attachment.timelineAttachment != this.attachment.timelineAttachment) {
                this.deform.length = 0;
            }
            this.attachment = attachment;
            this.sequenceIndex = -1;
        };
        /** Sets this slot to the setup pose. */
        Slot.prototype.setToSetupPose = function () {
            this.color.setFromColor(this.data.color);
            if (this.darkColor)
                this.darkColor.setFromColor(this.data.darkColor);
            if (!this.data.attachmentName)
                this.attachment = null;
            else {
                this.attachment = null;
                this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName));
            }
        };
        return Slot;
    }());

    /** Stores the current pose for a transform constraint. A transform constraint adjusts the world transform of the constrained
     * bones to match that of the target bone.
     *
     * See [Transform constraints](http://esotericsoftware.com/spine-transform-constraints) in the Spine User Guide.
     * @public
     * */
    var TransformConstraint = /** @class */ (function () {
        function TransformConstraint(data, skeleton) {
            this.mixRotate = 0;
            this.mixX = 0;
            this.mixY = 0;
            this.mixScaleX = 0;
            this.mixScaleY = 0;
            this.mixShearY = 0;
            this.temp = new Vector2();
            this.active = false;
            if (!data)
                throw new Error("data cannot be null.");
            if (!skeleton)
                throw new Error("skeleton cannot be null.");
            this.data = data;
            this.mixRotate = data.mixRotate;
            this.mixX = data.mixX;
            this.mixY = data.mixY;
            this.mixScaleX = data.mixScaleX;
            this.mixScaleY = data.mixScaleY;
            this.mixShearY = data.mixShearY;
            this.bones = new Array();
            for (var i = 0; i < data.bones.length; i++) {
                var bone = skeleton.findBone(data.bones[i].name);
                if (!bone)
                    throw new Error("Couldn't find bone " + data.bones[i].name + ".");
                this.bones.push(bone);
            }
            var target = skeleton.findBone(data.target.name);
            if (!target)
                throw new Error("Couldn't find target bone " + data.target.name + ".");
            this.target = target;
        }
        TransformConstraint.prototype.isActive = function () {
            return this.active;
        };
        TransformConstraint.prototype.update = function () {
            if (this.mixRotate == 0 && this.mixX == 0 && this.mixY == 0 && this.mixScaleX == 0 && this.mixScaleX == 0 && this.mixShearY == 0)
                return;
            if (this.data.local) {
                if (this.data.relative)
                    this.applyRelativeLocal();
                else
                    this.applyAbsoluteLocal();
            }
            else {
                if (this.data.relative)
                    this.applyRelativeWorld();
                else
                    this.applyAbsoluteWorld();
            }
        };
        TransformConstraint.prototype.applyAbsoluteWorld = function () {
            var mixRotate = this.mixRotate, mixX = this.mixX, mixY = this.mixY, mixScaleX = this.mixScaleX, mixScaleY = this.mixScaleY, mixShearY = this.mixShearY;
            var translate = mixX != 0 || mixY != 0;
            var target = this.target;
            var targetMat = target.matrix;
            var ta = targetMat.a, tb = targetMat.c, tc = targetMat.b, td = targetMat.d;
            var degRadReflect = ta * td - tb * tc > 0 ? MathUtils.degRad : -MathUtils.degRad;
            var offsetRotation = this.data.offsetRotation * degRadReflect;
            var offsetShearY = this.data.offsetShearY * degRadReflect;
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) {
                var bone = bones[i];
                var mat = bone.matrix;
                if (mixRotate != 0) {
                    var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                    var r = Math.atan2(tc, ta) - Math.atan2(c, a) + offsetRotation;
                    if (r > MathUtils.PI)
                        r -= MathUtils.PI2;
                    else if (r < -MathUtils.PI) //
                        r += MathUtils.PI2;
                    r *= mixRotate;
                    var cos = Math.cos(r), sin = Math.sin(r);
                    mat.a = cos * a - sin * c;
                    mat.c = cos * b - sin * d;
                    mat.b = sin * a + cos * c;
                    mat.d = sin * b + cos * d;
                }
                if (translate) {
                    var temp = this.temp;
                    target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                    mat.tx += (temp.x - mat.tx) * mixX;
                    mat.ty += (temp.y - mat.ty) * mixY;
                }
                if (mixScaleX != 0) {
                    var s = Math.sqrt(mat.a * mat.a + mat.b * mat.b);
                    if (s != 0)
                        s = (s + (Math.sqrt(ta * ta + tc * tc) - s + this.data.offsetScaleX) * mixScaleX) / s;
                    mat.a *= s;
                    mat.b *= s;
                }
                if (mixScaleY != 0) {
                    var s = Math.sqrt(mat.c * mat.c + mat.d * mat.d);
                    if (s != 0)
                        s = (s + (Math.sqrt(tb * tb + td * td) - s + this.data.offsetScaleY) * mixScaleY) / s;
                    mat.c *= s;
                    mat.d *= s;
                }
                if (mixShearY > 0) {
                    var b = mat.c, d = mat.d;
                    var by = Math.atan2(d, b);
                    var r = Math.atan2(td, tb) - Math.atan2(tc, ta) - (by - Math.atan2(mat.b, mat.a));
                    if (r > MathUtils.PI)
                        r -= MathUtils.PI2;
                    else if (r < -MathUtils.PI) //
                        r += MathUtils.PI2;
                    r = by + (r + offsetShearY) * mixShearY;
                    var s = Math.sqrt(b * b + d * d);
                    mat.c = Math.cos(r) * s;
                    mat.d = Math.sin(r) * s;
                }
                bone.updateAppliedTransform();
            }
        };
        TransformConstraint.prototype.applyRelativeWorld = function () {
            var mixRotate = this.mixRotate, mixX = this.mixX, mixY = this.mixY, mixScaleX = this.mixScaleX, mixScaleY = this.mixScaleY, mixShearY = this.mixShearY;
            var translate = mixX != 0 || mixY != 0;
            var target = this.target;
            var targetMat = target.matrix;
            var ta = targetMat.a, tb = targetMat.c, tc = targetMat.b, td = targetMat.d;
            var degRadReflect = ta * td - tb * tc > 0 ? MathUtils.degRad : -MathUtils.degRad;
            var offsetRotation = this.data.offsetRotation * degRadReflect, offsetShearY = this.data.offsetShearY * degRadReflect;
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) {
                var bone = bones[i];
                var mat = bone.matrix;
                if (mixRotate != 0) {
                    var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                    var r = Math.atan2(tc, ta) + offsetRotation;
                    if (r > MathUtils.PI)
                        r -= MathUtils.PI2;
                    else if (r < -MathUtils.PI) //
                        r += MathUtils.PI2;
                    r *= mixRotate;
                    var cos = Math.cos(r), sin = Math.sin(r);
                    mat.a = cos * a - sin * c;
                    mat.c = cos * b - sin * d;
                    mat.b = sin * a + cos * c;
                    mat.d = sin * b + cos * d;
                }
                if (translate) {
                    var temp = this.temp;
                    target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                    mat.tx += temp.x * mixX;
                    mat.ty += temp.y * mixY;
                }
                if (mixScaleX != 0) {
                    var s = (Math.sqrt(ta * ta + tc * tc) - 1 + this.data.offsetScaleX) * mixScaleX + 1;
                    mat.a *= s;
                    mat.b *= s;
                }
                if (mixScaleY != 0) {
                    var s = (Math.sqrt(tb * tb + td * td) - 1 + this.data.offsetScaleY) * mixScaleY + 1;
                    mat.c *= s;
                    mat.d *= s;
                }
                if (mixShearY > 0) {
                    var r = Math.atan2(td, tb) - Math.atan2(tc, ta);
                    if (r > MathUtils.PI)
                        r -= MathUtils.PI2;
                    else if (r < -MathUtils.PI) //
                        r += MathUtils.PI2;
                    var b = mat.c, d = mat.d;
                    r = Math.atan2(d, b) + (r - MathUtils.PI / 2 + offsetShearY) * mixShearY;
                    var s = Math.sqrt(b * b + d * d);
                    mat.c = Math.cos(r) * s;
                    mat.d = Math.sin(r) * s;
                }
                bone.updateAppliedTransform();
            }
        };
        TransformConstraint.prototype.applyAbsoluteLocal = function () {
            var mixRotate = this.mixRotate, mixX = this.mixX, mixY = this.mixY, mixScaleX = this.mixScaleX, mixScaleY = this.mixScaleY, mixShearY = this.mixShearY;
            var target = this.target;
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) {
                var bone = bones[i];
                var rotation = bone.arotation;
                if (mixRotate != 0) {
                    var r = target.arotation - rotation + this.data.offsetRotation;
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    rotation += r * mixRotate;
                }
                var x = bone.ax, y = bone.ay;
                x += (target.ax - x + this.data.offsetX) * mixX;
                y += (target.ay - y + this.data.offsetY) * mixY;
                var scaleX = bone.ascaleX, scaleY = bone.ascaleY;
                if (mixScaleX != 0 && scaleX != 0)
                    scaleX = (scaleX + (target.ascaleX - scaleX + this.data.offsetScaleX) * mixScaleX) / scaleX;
                if (mixScaleY != 0 && scaleY != 0)
                    scaleY = (scaleY + (target.ascaleY - scaleY + this.data.offsetScaleY) * mixScaleY) / scaleY;
                var shearY = bone.ashearY;
                if (mixShearY != 0) {
                    var r = target.ashearY - shearY + this.data.offsetShearY;
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    shearY += r * mixShearY;
                }
                bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
            }
        };
        TransformConstraint.prototype.applyRelativeLocal = function () {
            var mixRotate = this.mixRotate, mixX = this.mixX, mixY = this.mixY, mixScaleX = this.mixScaleX, mixScaleY = this.mixScaleY, mixShearY = this.mixShearY;
            var target = this.target;
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) {
                var bone = bones[i];
                var rotation = bone.arotation + (target.arotation + this.data.offsetRotation) * mixRotate;
                var x = bone.ax + (target.ax + this.data.offsetX) * mixX;
                var y = bone.ay + (target.ay + this.data.offsetY) * mixY;
                var scaleX = bone.ascaleX * (((target.ascaleX - 1 + this.data.offsetScaleX) * mixScaleX) + 1);
                var scaleY = bone.ascaleY * (((target.ascaleY - 1 + this.data.offsetScaleY) * mixScaleY) + 1);
                var shearY = bone.ashearY + (target.ashearY + this.data.offsetShearY) * mixShearY;
                bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
            }
        };
        return TransformConstraint;
    }());

    /** Stores the current pose for a skeleton.
     *
     * See [Instance objects](http://esotericsoftware.com/spine-runtime-architecture#Instance-objects) in the Spine Runtimes Guide.
     * @public
     * */
    var Skeleton = /** @class */ (function () {
        function Skeleton(data) {
            /** The list of bones and constraints, sorted in the order they should be updated, as computed by {@link #updateCache()}. */
            this._updateCache = new Array();
            /** The skeleton's current skin. May be null. */
            this.skin = null;
            /** Scales the entire skeleton on the X axis. This affects all bones, even if the bone's transform mode disallows scale
             * inheritance. */
            this.scaleX = 1;
            /** Scales the entire skeleton on the Y axis. This affects all bones, even if the bone's transform mode disallows scale
             * inheritance. */
            this.scaleY = 1;
            /** Sets the skeleton X position, which is added to the root bone worldX position. */
            this.x = 0;
            /** Sets the skeleton Y position, which is added to the root bone worldY position. */
            this.y = 0;
            if (!data)
                throw new Error("data cannot be null.");
            this.data = data;
            this.bones = new Array();
            for (var i = 0; i < data.bones.length; i++) {
                var boneData = data.bones[i];
                var bone = void 0;
                if (!boneData.parent)
                    bone = new Bone(boneData, this, null);
                else {
                    var parent_1 = this.bones[boneData.parent.index];
                    bone = new Bone(boneData, this, parent_1);
                    parent_1.children.push(bone);
                }
                this.bones.push(bone);
            }
            this.slots = new Array();
            this.drawOrder = new Array();
            for (var i = 0; i < data.slots.length; i++) {
                var slotData = data.slots[i];
                var bone = this.bones[slotData.boneData.index];
                var slot = new Slot(slotData, bone);
                this.slots.push(slot);
                this.drawOrder.push(slot);
            }
            this.ikConstraints = new Array();
            for (var i = 0; i < data.ikConstraints.length; i++) {
                var ikConstraintData = data.ikConstraints[i];
                this.ikConstraints.push(new IkConstraint(ikConstraintData, this));
            }
            this.transformConstraints = new Array();
            for (var i = 0; i < data.transformConstraints.length; i++) {
                var transformConstraintData = data.transformConstraints[i];
                this.transformConstraints.push(new TransformConstraint(transformConstraintData, this));
            }
            this.pathConstraints = new Array();
            for (var i = 0; i < data.pathConstraints.length; i++) {
                var pathConstraintData = data.pathConstraints[i];
                this.pathConstraints.push(new PathConstraint(pathConstraintData, this));
            }
            this.color = new Color(1, 1, 1, 1);
            this.updateCache();
        }
        /** Caches information about bones and constraints. Must be called if the {@link #getSkin()} is modified or if bones,
         * constraints, or weighted path attachments are added or removed. */
        Skeleton.prototype.updateCache = function () {
            var updateCache = this._updateCache;
            updateCache.length = 0;
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) {
                var bone = bones[i];
                bone.sorted = bone.data.skinRequired;
                bone.active = !bone.sorted;
            }
            if (this.skin) {
                var skinBones = this.skin.bones;
                for (var i = 0, n = this.skin.bones.length; i < n; i++) {
                    var bone = this.bones[skinBones[i].index];
                    do {
                        bone.sorted = false;
                        bone.active = true;
                        bone = bone.parent;
                    } while (bone);
                }
            }
            // IK first, lowest hierarchy depth first.
            var ikConstraints = this.ikConstraints;
            var transformConstraints = this.transformConstraints;
            var pathConstraints = this.pathConstraints;
            var ikCount = ikConstraints.length, transformCount = transformConstraints.length, pathCount = pathConstraints.length;
            var constraintCount = ikCount + transformCount + pathCount;
            outer: for (var i = 0; i < constraintCount; i++) {
                for (var ii = 0; ii < ikCount; ii++) {
                    var constraint = ikConstraints[ii];
                    if (constraint.data.order == i) {
                        this.sortIkConstraint(constraint);
                        continue outer;
                    }
                }
                for (var ii = 0; ii < transformCount; ii++) {
                    var constraint = transformConstraints[ii];
                    if (constraint.data.order == i) {
                        this.sortTransformConstraint(constraint);
                        continue outer;
                    }
                }
                for (var ii = 0; ii < pathCount; ii++) {
                    var constraint = pathConstraints[ii];
                    if (constraint.data.order == i) {
                        this.sortPathConstraint(constraint);
                        continue outer;
                    }
                }
            }
            for (var i = 0, n = bones.length; i < n; i++)
                this.sortBone(bones[i]);
        };
        Skeleton.prototype.sortIkConstraint = function (constraint) {
            constraint.active = constraint.target.isActive() && (!constraint.data.skinRequired || (this.skin && Utils.contains(this.skin.constraints, constraint.data, true)));
            if (!constraint.active)
                return;
            var target = constraint.target;
            this.sortBone(target);
            var constrained = constraint.bones;
            var parent = constrained[0];
            this.sortBone(parent);
            if (constrained.length == 1) {
                this._updateCache.push(constraint);
                this.sortReset(parent.children);
            }
            else {
                var child = constrained[constrained.length - 1];
                this.sortBone(child);
                this._updateCache.push(constraint);
                this.sortReset(parent.children);
                child.sorted = true;
            }
        };
        Skeleton.prototype.sortPathConstraint = function (constraint) {
            constraint.active = constraint.target.bone.isActive() && (!constraint.data.skinRequired || (this.skin && Utils.contains(this.skin.constraints, constraint.data, true)));
            if (!constraint.active)
                return;
            var slot = constraint.target;
            var slotIndex = slot.data.index;
            var slotBone = slot.bone;
            if (this.skin)
                this.sortPathConstraintAttachment(this.skin, slotIndex, slotBone);
            if (this.data.defaultSkin && this.data.defaultSkin != this.skin)
                this.sortPathConstraintAttachment(this.data.defaultSkin, slotIndex, slotBone);
            for (var i = 0, n = this.data.skins.length; i < n; i++)
                this.sortPathConstraintAttachment(this.data.skins[i], slotIndex, slotBone);
            var attachment = slot.getAttachment();
            if (attachment instanceof PathAttachment)
                this.sortPathConstraintAttachmentWith(attachment, slotBone);
            var constrained = constraint.bones;
            var boneCount = constrained.length;
            for (var i = 0; i < boneCount; i++)
                this.sortBone(constrained[i]);
            this._updateCache.push(constraint);
            for (var i = 0; i < boneCount; i++)
                this.sortReset(constrained[i].children);
            for (var i = 0; i < boneCount; i++)
                constrained[i].sorted = true;
        };
        Skeleton.prototype.sortTransformConstraint = function (constraint) {
            constraint.active = constraint.target.isActive() && (!constraint.data.skinRequired || (this.skin && Utils.contains(this.skin.constraints, constraint.data, true)));
            if (!constraint.active)
                return;
            this.sortBone(constraint.target);
            var constrained = constraint.bones;
            var boneCount = constrained.length;
            if (constraint.data.local) {
                for (var i = 0; i < boneCount; i++) {
                    var child = constrained[i];
                    this.sortBone(child.parent);
                    this.sortBone(child);
                }
            }
            else {
                for (var i = 0; i < boneCount; i++) {
                    this.sortBone(constrained[i]);
                }
            }
            this._updateCache.push(constraint);
            for (var i = 0; i < boneCount; i++)
                this.sortReset(constrained[i].children);
            for (var i = 0; i < boneCount; i++)
                constrained[i].sorted = true;
        };
        Skeleton.prototype.sortPathConstraintAttachment = function (skin, slotIndex, slotBone) {
            var attachments = skin.attachments[slotIndex];
            if (!attachments)
                return;
            for (var key in attachments) {
                this.sortPathConstraintAttachmentWith(attachments[key], slotBone);
            }
        };
        Skeleton.prototype.sortPathConstraintAttachmentWith = function (attachment, slotBone) {
            if (!(attachment instanceof PathAttachment))
                return;
            var pathBones = attachment.bones;
            if (!pathBones)
                this.sortBone(slotBone);
            else {
                var bones = this.bones;
                for (var i = 0, n = pathBones.length; i < n;) {
                    var nn = pathBones[i++];
                    nn += i;
                    while (i < nn)
                        this.sortBone(bones[pathBones[i++]]);
                }
            }
        };
        Skeleton.prototype.sortBone = function (bone) {
            if (!bone)
                return;
            if (bone.sorted)
                return;
            var parent = bone.parent;
            if (parent)
                this.sortBone(parent);
            bone.sorted = true;
            this._updateCache.push(bone);
        };
        Skeleton.prototype.sortReset = function (bones) {
            for (var i = 0, n = bones.length; i < n; i++) {
                var bone = bones[i];
                if (!bone.active)
                    continue;
                if (bone.sorted)
                    this.sortReset(bone.children);
                bone.sorted = false;
            }
        };
        /** Updates the world transform for each bone and applies all constraints.
         *
         * See [World transforms](http://esotericsoftware.com/spine-runtime-skeletons#World-transforms) in the Spine
         * Runtimes Guide. */
        Skeleton.prototype.updateWorldTransform = function () {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) {
                var bone = bones[i];
                bone.ax = bone.x;
                bone.ay = bone.y;
                bone.arotation = bone.rotation;
                bone.ascaleX = bone.scaleX;
                bone.ascaleY = bone.scaleY;
                bone.ashearX = bone.shearX;
                bone.ashearY = bone.shearY;
            }
            var updateCache = this._updateCache;
            for (var i = 0, n = updateCache.length; i < n; i++)
                updateCache[i].update();
        };
        Skeleton.prototype.updateWorldTransformWith = function (parent) {
            // Apply the parent bone transform to the root bone. The root bone always inherits scale, rotation and reflection.
            var rootBone = this.getRootBone();
            var pa = parent.matrix.a, pb = parent.matrix.c, pc = parent.matrix.b, pd = parent.matrix.d;
            rootBone.matrix.tx = pa * this.x + pb * this.y + parent.worldX;
            rootBone.matrix.ty = pc * this.x + pd * this.y + parent.worldY;
            var rotationY = rootBone.rotation + 90 + rootBone.shearY;
            var la = MathUtils.cosDeg(rootBone.rotation + rootBone.shearX) * rootBone.scaleX;
            var lb = MathUtils.cosDeg(rotationY) * rootBone.scaleY;
            var lc = MathUtils.sinDeg(rootBone.rotation + rootBone.shearX) * rootBone.scaleX;
            var ld = MathUtils.sinDeg(rotationY) * rootBone.scaleY;
            var sx = this.scaleX;
            var sy = settings.yDown ? -this.scaleY : this.scaleY;
            rootBone.matrix.a = (pa * la + pb * lc) * sx;
            rootBone.matrix.c = (pa * lb + pb * ld) * sx;
            rootBone.matrix.b = (pc * la + pd * lc) * sy;
            rootBone.matrix.d = (pc * lb + pd * ld) * sy;
            // Update everything except root bone.
            var updateCache = this._updateCache;
            for (var i = 0, n = updateCache.length; i < n; i++) {
                var updatable = updateCache[i];
                if (updatable != rootBone)
                    updatable.update();
            }
        };
        /** Sets the bones, constraints, and slots to their setup pose values. */
        Skeleton.prototype.setToSetupPose = function () {
            this.setBonesToSetupPose();
            this.setSlotsToSetupPose();
        };
        /** Sets the bones and constraints to their setup pose values. */
        Skeleton.prototype.setBonesToSetupPose = function () {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++)
                bones[i].setToSetupPose();
            var ikConstraints = this.ikConstraints;
            for (var i = 0, n = ikConstraints.length; i < n; i++) {
                var constraint = ikConstraints[i];
                constraint.mix = constraint.data.mix;
                constraint.softness = constraint.data.softness;
                constraint.bendDirection = constraint.data.bendDirection;
                constraint.compress = constraint.data.compress;
                constraint.stretch = constraint.data.stretch;
            }
            var transformConstraints = this.transformConstraints;
            for (var i = 0, n = transformConstraints.length; i < n; i++) {
                var constraint = transformConstraints[i];
                var data = constraint.data;
                constraint.mixRotate = data.mixRotate;
                constraint.mixX = data.mixX;
                constraint.mixY = data.mixY;
                constraint.mixScaleX = data.mixScaleX;
                constraint.mixScaleY = data.mixScaleY;
                constraint.mixShearY = data.mixShearY;
            }
            var pathConstraints = this.pathConstraints;
            for (var i = 0, n = pathConstraints.length; i < n; i++) {
                var constraint = pathConstraints[i];
                var data = constraint.data;
                constraint.position = data.position;
                constraint.spacing = data.spacing;
                constraint.mixRotate = data.mixRotate;
                constraint.mixX = data.mixX;
                constraint.mixY = data.mixY;
            }
        };
        /** Sets the slots and draw order to their setup pose values. */
        Skeleton.prototype.setSlotsToSetupPose = function () {
            var slots = this.slots;
            Utils.arrayCopy(slots, 0, this.drawOrder, 0, slots.length);
            for (var i = 0, n = slots.length; i < n; i++)
                slots[i].setToSetupPose();
        };
        /** @returns May return null. */
        Skeleton.prototype.getRootBone = function () {
            if (this.bones.length == 0)
                return null;
            return this.bones[0];
        };
        /** @returns May be null. */
        Skeleton.prototype.findBone = function (boneName) {
            if (!boneName)
                throw new Error("boneName cannot be null.");
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) {
                var bone = bones[i];
                if (bone.data.name == boneName)
                    return bone;
            }
            return null;
        };
        /** @returns -1 if the bone was not found. */
        Skeleton.prototype.findBoneIndex = function (boneName) {
            if (!boneName)
                throw new Error("boneName cannot be null.");
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++)
                if (bones[i].data.name == boneName)
                    return i;
            return -1;
        };
        /** Finds a slot by comparing each slot's name. It is more efficient to cache the results of this method than to call it
         * repeatedly.
         * @returns May be null. */
        Skeleton.prototype.findSlot = function (slotName) {
            if (!slotName)
                throw new Error("slotName cannot be null.");
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) {
                var slot = slots[i];
                if (slot.data.name == slotName)
                    return slot;
            }
            return null;
        };
        /** @returns -1 if the bone was not found. */
        Skeleton.prototype.findSlotIndex = function (slotName) {
            if (!slotName)
                throw new Error("slotName cannot be null.");
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++)
                if (slots[i].data.name == slotName)
                    return i;
            return -1;
        };
        /** Sets a skin by name.
         *
         * See {@link #setSkin()}. */
        Skeleton.prototype.setSkinByName = function (skinName) {
            var skin = this.data.findSkin(skinName);
            if (!skin)
                throw new Error("Skin not found: " + skinName);
            this.setSkin(skin);
        };
        /** Sets the skin used to look up attachments before looking in the {@link SkeletonData#defaultSkin default skin}. If the
         * skin is changed, {@link #updateCache()} is called.
         *
         * Attachments from the new skin are attached if the corresponding attachment from the old skin was attached. If there was no
         * old skin, each slot's setup mode attachment is attached from the new skin.
         *
         * After changing the skin, the visible attachments can be reset to those attached in the setup pose by calling
         * {@link #setSlotsToSetupPose()}. Also, often {@link AnimationState#apply()} is called before the next time the
         * skeleton is rendered to allow any attachment keys in the current animation(s) to hide or show attachments from the new skin.
         * @param newSkin May be null. */
        Skeleton.prototype.setSkin = function (newSkin) {
            if (newSkin == this.skin)
                return;
            if (newSkin) {
                if (this.skin)
                    newSkin.attachAll(this, this.skin);
                else {
                    var slots = this.slots;
                    for (var i = 0, n = slots.length; i < n; i++) {
                        var slot = slots[i];
                        var name_1 = slot.data.attachmentName;
                        if (name_1) {
                            var attachment = newSkin.getAttachment(i, name_1);
                            if (attachment)
                                slot.setAttachment(attachment);
                        }
                    }
                }
            }
            this.skin = newSkin;
            this.updateCache();
        };
        /** Finds an attachment by looking in the {@link #skin} and {@link SkeletonData#defaultSkin} using the slot name and attachment
         * name.
         *
         * See {@link #getAttachment()}.
         * @returns May be null. */
        Skeleton.prototype.getAttachmentByName = function (slotName, attachmentName) {
            var slot = this.data.findSlot(slotName);
            if (!slot)
                throw new Error("Can't find slot with name " + slotName);
            return this.getAttachment(slot.index, attachmentName);
        };
        /** Finds an attachment by looking in the {@link #skin} and {@link SkeletonData#defaultSkin} using the slot index and
         * attachment name. First the skin is checked and if the attachment was not found, the default skin is checked.
         *
         * See [Runtime skins](http://esotericsoftware.com/spine-runtime-skins) in the Spine Runtimes Guide.
         * @returns May be null. */
        Skeleton.prototype.getAttachment = function (slotIndex, attachmentName) {
            if (!attachmentName)
                throw new Error("attachmentName cannot be null.");
            if (this.skin) {
                var attachment = this.skin.getAttachment(slotIndex, attachmentName);
                if (attachment)
                    return attachment;
            }
            if (this.data.defaultSkin)
                return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
            return null;
        };
        /** A convenience method to set an attachment by finding the slot with {@link #findSlot()}, finding the attachment with
         * {@link #getAttachment()}, then setting the slot's {@link Slot#attachment}.
         * @param attachmentName May be null to clear the slot's attachment. */
        Skeleton.prototype.setAttachment = function (slotName, attachmentName) {
            if (!slotName)
                throw new Error("slotName cannot be null.");
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) {
                var slot = slots[i];
                if (slot.data.name == slotName) {
                    var attachment = null;
                    if (attachmentName) {
                        attachment = this.getAttachment(i, attachmentName);
                        if (!attachment)
                            throw new Error("Attachment not found: " + attachmentName + ", for slot: " + slotName);
                    }
                    slot.setAttachment(attachment);
                    return;
                }
            }
            throw new Error("Slot not found: " + slotName);
        };
        /** Finds an IK constraint by comparing each IK constraint's name. It is more efficient to cache the results of this method
         * than to call it repeatedly.
         * @return May be null. */
        Skeleton.prototype.findIkConstraint = function (constraintName) {
            if (!constraintName)
                throw new Error("constraintName cannot be null.");
            var ikConstraints = this.ikConstraints;
            for (var i = 0, n = ikConstraints.length; i < n; i++) {
                var ikConstraint = ikConstraints[i];
                if (ikConstraint.data.name == constraintName)
                    return ikConstraint;
            }
            return null;
        };
        /** Finds a transform constraint by comparing each transform constraint's name. It is more efficient to cache the results of
         * this method than to call it repeatedly.
         * @return May be null. */
        Skeleton.prototype.findTransformConstraint = function (constraintName) {
            if (!constraintName)
                throw new Error("constraintName cannot be null.");
            var transformConstraints = this.transformConstraints;
            for (var i = 0, n = transformConstraints.length; i < n; i++) {
                var constraint = transformConstraints[i];
                if (constraint.data.name == constraintName)
                    return constraint;
            }
            return null;
        };
        /** Finds a path constraint by comparing each path constraint's name. It is more efficient to cache the results of this method
         * than to call it repeatedly.
         * @return May be null. */
        Skeleton.prototype.findPathConstraint = function (constraintName) {
            if (!constraintName)
                throw new Error("constraintName cannot be null.");
            var pathConstraints = this.pathConstraints;
            for (var i = 0, n = pathConstraints.length; i < n; i++) {
                var constraint = pathConstraints[i];
                if (constraint.data.name == constraintName)
                    return constraint;
            }
            return null;
        };
        /** Returns the axis aligned bounding box (AABB) of the region and mesh attachments for the current pose as `{ x: number, y: number, width: number, height: number }`.
         * Note that this method will create temporary objects which can add to garbage collection pressure. Use `getBounds()` if garbage collection is a concern. */
        Skeleton.prototype.getBoundsRect = function () {
            var offset = new Vector2();
            var size = new Vector2();
            this.getBounds(offset, size);
            return { x: offset.x, y: offset.y, width: size.x, height: size.y };
        };
        /** Returns the axis aligned bounding box (AABB) of the region and mesh attachments for the current pose.
         * @param offset An output value, the distance from the skeleton origin to the bottom left corner of the AABB.
         * @param size An output value, the width and height of the AABB.
         * @param temp Working memory to temporarily store attachments' computed world vertices. */
        Skeleton.prototype.getBounds = function (offset, size, temp) {
            if (temp === void 0) { temp = new Array(2); }
            if (!offset)
                throw new Error("offset cannot be null.");
            if (!size)
                throw new Error("size cannot be null.");
            var drawOrder = this.drawOrder;
            var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
            for (var i = 0, n = drawOrder.length; i < n; i++) {
                var slot = drawOrder[i];
                if (!slot.bone.active)
                    continue;
                var verticesLength = 0;
                var vertices = null;
                var attachment = slot.getAttachment();
                if (attachment instanceof RegionAttachment) {
                    verticesLength = 8;
                    vertices = Utils.setArraySize(temp, verticesLength, 0);
                    attachment.computeWorldVertices(slot, vertices, 0, 2);
                }
                else if (attachment instanceof MeshAttachment) {
                    var mesh = attachment;
                    verticesLength = mesh.worldVerticesLength;
                    vertices = Utils.setArraySize(temp, verticesLength, 0);
                    mesh.computeWorldVertices(slot, 0, verticesLength, vertices, 0, 2);
                }
                if (vertices) {
                    for (var ii = 0, nn = vertices.length; ii < nn; ii += 2) {
                        var x = vertices[ii], y = vertices[ii + 1];
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                    }
                }
            }
            offset.set(minX, minY);
            size.set(maxX - minX, maxY - minY);
        };
        Object.defineProperty(Skeleton.prototype, "flipX", {
            get: function () {
                return this.scaleX == -1;
            },
            set: function (value) {
                if (!Skeleton.deprecatedWarning1) {
                    Skeleton.deprecatedWarning1 = true;
                    console.warn("Spine Deprecation Warning: `Skeleton.flipX/flipY` was deprecated, please use scaleX/scaleY");
                }
                this.scaleX = value ? 1.0 : -1.0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Skeleton.prototype, "flipY", {
            get: function () {
                return this.scaleY == -1;
            },
            set: function (value) {
                if (!Skeleton.deprecatedWarning1) {
                    Skeleton.deprecatedWarning1 = true;
                    console.warn("Spine Deprecation Warning: `Skeleton.flipX/flipY` was deprecated, please use scaleX/scaleY");
                }
                this.scaleY = value ? 1.0 : -1.0;
            },
            enumerable: false,
            configurable: true
        });
        Skeleton.deprecatedWarning1 = false;
        return Skeleton;
    }());

    /** Stores the setup pose and all of the stateless data for a skeleton.
     *
     * See [Data objects](http://esotericsoftware.com/spine-runtime-architecture#Data-objects) in the Spine Runtimes
     * Guide.
     * @public
     * */
    var SkeletonData = /** @class */ (function () {
        function SkeletonData() {
            /** The skeleton's name, which by default is the name of the skeleton data file, if possible. May be null. */
            this.name = null;
            /** The skeleton's bones, sorted parent first. The root bone is always the first bone. */
            this.bones = new Array(); // Ordered parents first.
            /** The skeleton's slots. */
            this.slots = new Array(); // Setup pose draw order.
            this.skins = new Array();
            /** The skeleton's default skin. By default this skin contains all attachments that were not in a skin in Spine.
             *
             * See {@link Skeleton#getAttachmentByName()}.
             * May be null. */
            this.defaultSkin = null;
            /** The skeleton's events. */
            this.events = new Array();
            /** The skeleton's animations. */
            this.animations = new Array();
            /** The skeleton's IK constraints. */
            this.ikConstraints = new Array();
            /** The skeleton's transform constraints. */
            this.transformConstraints = new Array();
            /** The skeleton's path constraints. */
            this.pathConstraints = new Array();
            /** The X coordinate of the skeleton's axis aligned bounding box in the setup pose. */
            this.x = 0;
            /** The Y coordinate of the skeleton's axis aligned bounding box in the setup pose. */
            this.y = 0;
            /** The width of the skeleton's axis aligned bounding box in the setup pose. */
            this.width = 0;
            /** The height of the skeleton's axis aligned bounding box in the setup pose. */
            this.height = 0;
            /** The Spine version used to export the skeleton data, or null. */
            this.version = null;
            /** The skeleton data hash. This value will change if any of the skeleton data has changed. May be null. */
            this.hash = null;
            // Nonessential
            /** The dopesheet FPS in Spine. Available only when nonessential data was exported. */
            this.fps = 0;
            /** The path to the images directory as defined in Spine. Available only when nonessential data was exported. May be null. */
            this.imagesPath = null;
            /** The path to the audio directory as defined in Spine. Available only when nonessential data was exported. May be null. */
            this.audioPath = null;
        }
        /** Finds a bone by comparing each bone's name. It is more efficient to cache the results of this method than to call it
         * multiple times.
         * @returns May be null. */
        SkeletonData.prototype.findBone = function (boneName) {
            if (!boneName)
                throw new Error("boneName cannot be null.");
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++) {
                var bone = bones[i];
                if (bone.name == boneName)
                    return bone;
            }
            return null;
        };
        /** removed from spine-ts runtime **/
        SkeletonData.prototype.findBoneIndex = function (boneName) {
            if (!boneName)
                throw new Error("boneName cannot be null.");
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++)
                if (bones[i].name == boneName)
                    return i;
            return -1;
        };
        /** Finds a slot by comparing each slot's name. It is more efficient to cache the results of this method than to call it
         * multiple times.
         * @returns May be null. */
        SkeletonData.prototype.findSlot = function (slotName) {
            if (!slotName)
                throw new Error("slotName cannot be null.");
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) {
                var slot = slots[i];
                if (slot.name == slotName)
                    return slot;
            }
            return null;
        };
        /** removed from spine-ts runtime **/
        SkeletonData.prototype.findSlotIndex = function (slotName) {
            if (!slotName)
                throw new Error("slotName cannot be null.");
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++)
                if (slots[i].name == slotName)
                    return i;
            return -1;
        };
        /** Finds a skin by comparing each skin's name. It is more efficient to cache the results of this method than to call it
         * multiple times.
         * @returns May be null. */
        SkeletonData.prototype.findSkin = function (skinName) {
            if (!skinName)
                throw new Error("skinName cannot be null.");
            var skins = this.skins;
            for (var i = 0, n = skins.length; i < n; i++) {
                var skin = skins[i];
                if (skin.name == skinName)
                    return skin;
            }
            return null;
        };
        /** Finds an event by comparing each events's name. It is more efficient to cache the results of this method than to call it
         * multiple times.
         * @returns May be null. */
        SkeletonData.prototype.findEvent = function (eventDataName) {
            if (!eventDataName)
                throw new Error("eventDataName cannot be null.");
            var events = this.events;
            for (var i = 0, n = events.length; i < n; i++) {
                var event_1 = events[i];
                if (event_1.name == eventDataName)
                    return event_1;
            }
            return null;
        };
        /** Finds an animation by comparing each animation's name. It is more efficient to cache the results of this method than to
         * call it multiple times.
         * @returns May be null. */
        SkeletonData.prototype.findAnimation = function (animationName) {
            if (!animationName)
                throw new Error("animationName cannot be null.");
            var animations = this.animations;
            for (var i = 0, n = animations.length; i < n; i++) {
                var animation = animations[i];
                if (animation.name == animationName)
                    return animation;
            }
            return null;
        };
        /** Finds an IK constraint by comparing each IK constraint's name. It is more efficient to cache the results of this method
         * than to call it multiple times.
         * @return May be null. */
        SkeletonData.prototype.findIkConstraint = function (constraintName) {
            if (!constraintName)
                throw new Error("constraintName cannot be null.");
            var ikConstraints = this.ikConstraints;
            for (var i = 0, n = ikConstraints.length; i < n; i++) {
                var constraint = ikConstraints[i];
                if (constraint.name == constraintName)
                    return constraint;
            }
            return null;
        };
        /** Finds a transform constraint by comparing each transform constraint's name. It is more efficient to cache the results of
         * this method than to call it multiple times.
         * @return May be null. */
        SkeletonData.prototype.findTransformConstraint = function (constraintName) {
            if (!constraintName)
                throw new Error("constraintName cannot be null.");
            var transformConstraints = this.transformConstraints;
            for (var i = 0, n = transformConstraints.length; i < n; i++) {
                var constraint = transformConstraints[i];
                if (constraint.name == constraintName)
                    return constraint;
            }
            return null;
        };
        /** Finds a path constraint by comparing each path constraint's name. It is more efficient to cache the results of this method
         * than to call it multiple times.
         * @return May be null. */
        SkeletonData.prototype.findPathConstraint = function (constraintName) {
            if (!constraintName)
                throw new Error("constraintName cannot be null.");
            var pathConstraints = this.pathConstraints;
            for (var i = 0, n = pathConstraints.length; i < n; i++) {
                var constraint = pathConstraints[i];
                if (constraint.name == constraintName)
                    return constraint;
            }
            return null;
        };
        /** removed from spine-ts runtime **/ SkeletonData.prototype.findPathConstraintIndex = function (pathConstraintName) {
            if (pathConstraintName == null)
                throw new Error("pathConstraintName cannot be null.");
            var pathConstraints = this.pathConstraints;
            for (var i = 0, n = pathConstraints.length; i < n; i++)
                if (pathConstraints[i].name == pathConstraintName)
                    return i;
            return -1;
        };
        return SkeletonData;
    }());

    /** Stores the setup pose for a {@link Slot}.
     * @public
     * */
    var SlotData = /** @class */ (function () {
        function SlotData(index, name, boneData) {
            /** The index of the slot in {@link Skeleton#getSlots()}. */
            this.index = 0;
            /** The color used to tint the slot's attachment. If {@link #getDarkColor()} is set, this is used as the light color for two
             * color tinting. */
            this.color = new Color(1, 1, 1, 1);
            /** The dark color used to tint the slot's attachment for two color tinting, or null if two color tinting is not used. The dark
             * color's alpha is not used. */
            this.darkColor = null;
            /** The name of the attachment that is visible for this slot in the setup pose, or null if no attachment is visible. */
            this.attachmentName = null;
            /** The blend mode for drawing the slot's attachment. */
            this.blendMode = constants.BLEND_MODES.NORMAL;
            if (index < 0)
                throw new Error("index must be >= 0.");
            if (!name)
                throw new Error("name cannot be null.");
            if (!boneData)
                throw new Error("boneData cannot be null.");
            this.index = index;
            this.name = name;
            this.boneData = boneData;
        }
        return SlotData;
    }());

    /** Stores the setup pose for a {@link TransformConstraint}.
     *
     * See [Transform constraints](http://esotericsoftware.com/spine-transform-constraints) in the Spine User Guide.
     * @public
     * */
    var TransformConstraintData = /** @class */ (function (_super) {
        __extends$1(TransformConstraintData, _super);
        function TransformConstraintData(name) {
            var _this = _super.call(this, name, 0, false) || this;
            /** The bones that will be modified by this transform constraint. */
            _this.bones = new Array();
            /** The target bone whose world transform will be copied to the constrained bones. */
            _this._target = null;
            _this.mixRotate = 0;
            _this.mixX = 0;
            _this.mixY = 0;
            _this.mixScaleX = 0;
            _this.mixScaleY = 0;
            _this.mixShearY = 0;
            /** An offset added to the constrained bone rotation. */
            _this.offsetRotation = 0;
            /** An offset added to the constrained bone X translation. */
            _this.offsetX = 0;
            /** An offset added to the constrained bone Y translation. */
            _this.offsetY = 0;
            /** An offset added to the constrained bone scaleX. */
            _this.offsetScaleX = 0;
            /** An offset added to the constrained bone scaleY. */
            _this.offsetScaleY = 0;
            /** An offset added to the constrained bone shearY. */
            _this.offsetShearY = 0;
            _this.relative = false;
            _this.local = false;
            return _this;
        }
        Object.defineProperty(TransformConstraintData.prototype, "target", {
            get: function () {
                if (!this._target)
                    throw new Error("BoneData not set.");
                else
                    return this._target;
            },
            set: function (boneData) { this._target = boneData; },
            enumerable: false,
            configurable: true
        });
        return TransformConstraintData;
    }(ConstraintData));

    /** Stores an entry in the skin consisting of the slot index, name, and attachment
     * @public
     * **/
    var SkinEntry = /** @class */ (function () {
        function SkinEntry(slotIndex, name, attachment) {
            this.slotIndex = slotIndex;
            this.name = name;
            this.attachment = attachment;
        }
        return SkinEntry;
    }());
    /** Stores attachments by slot index and attachment name.
     *
     * See SkeletonData {@link SkeletonData#defaultSkin}, Skeleton {@link Skeleton#skin}, and
     * [Runtime skins](http://esotericsoftware.com/spine-runtime-skins) in the Spine Runtimes Guide.
     * @public
     * */
    var Skin = /** @class */ (function () {
        function Skin(name) {
            this.attachments = new Array();
            this.bones = Array();
            this.constraints = new Array();
            if (!name)
                throw new Error("name cannot be null.");
            this.name = name;
        }
        /** Adds an attachment to the skin for the specified slot index and name. */
        Skin.prototype.setAttachment = function (slotIndex, name, attachment) {
            if (!attachment)
                throw new Error("attachment cannot be null.");
            var attachments = this.attachments;
            if (slotIndex >= attachments.length)
                attachments.length = slotIndex + 1;
            if (!attachments[slotIndex])
                attachments[slotIndex] = {};
            attachments[slotIndex][name] = attachment;
        };
        /** Adds all attachments, bones, and constraints from the specified skin to this skin. */
        Skin.prototype.addSkin = function (skin) {
            for (var i = 0; i < skin.bones.length; i++) {
                var bone = skin.bones[i];
                var contained = false;
                for (var ii = 0; ii < this.bones.length; ii++) {
                    if (this.bones[ii] == bone) {
                        contained = true;
                        break;
                    }
                }
                if (!contained)
                    this.bones.push(bone);
            }
            for (var i = 0; i < skin.constraints.length; i++) {
                var constraint = skin.constraints[i];
                var contained = false;
                for (var ii = 0; ii < this.constraints.length; ii++) {
                    if (this.constraints[ii] == constraint) {
                        contained = true;
                        break;
                    }
                }
                if (!contained)
                    this.constraints.push(constraint);
            }
            var attachments = skin.getAttachments();
            for (var i = 0; i < attachments.length; i++) {
                var attachment = attachments[i];
                this.setAttachment(attachment.slotIndex, attachment.name, attachment.attachment);
            }
        };
        /** Adds all bones and constraints and copies of all attachments from the specified skin to this skin. Mesh attachments are not
         * copied, instead a new linked mesh is created. The attachment copies can be modified without affecting the originals. */
        Skin.prototype.copySkin = function (skin) {
            for (var i = 0; i < skin.bones.length; i++) {
                var bone = skin.bones[i];
                var contained = false;
                for (var ii = 0; ii < this.bones.length; ii++) {
                    if (this.bones[ii] == bone) {
                        contained = true;
                        break;
                    }
                }
                if (!contained)
                    this.bones.push(bone);
            }
            for (var i = 0; i < skin.constraints.length; i++) {
                var constraint = skin.constraints[i];
                var contained = false;
                for (var ii = 0; ii < this.constraints.length; ii++) {
                    if (this.constraints[ii] == constraint) {
                        contained = true;
                        break;
                    }
                }
                if (!contained)
                    this.constraints.push(constraint);
            }
            var attachments = skin.getAttachments();
            for (var i = 0; i < attachments.length; i++) {
                var attachment = attachments[i];
                if (!attachment.attachment)
                    continue;
                if (attachment.attachment instanceof MeshAttachment) {
                    attachment.attachment = attachment.attachment.newLinkedMesh();
                    this.setAttachment(attachment.slotIndex, attachment.name, attachment.attachment);
                }
                else {
                    attachment.attachment = attachment.attachment.copy();
                    this.setAttachment(attachment.slotIndex, attachment.name, attachment.attachment);
                }
            }
        };
        /** Returns the attachment for the specified slot index and name, or null. */
        Skin.prototype.getAttachment = function (slotIndex, name) {
            var dictionary = this.attachments[slotIndex];
            return dictionary ? dictionary[name] : null;
        };
        /** Removes the attachment in the skin for the specified slot index and name, if any. */
        Skin.prototype.removeAttachment = function (slotIndex, name) {
            var dictionary = this.attachments[slotIndex];
            if (dictionary)
                delete dictionary[name];
        };
        /** Returns all attachments in this skin. */
        Skin.prototype.getAttachments = function () {
            var entries = new Array();
            for (var i = 0; i < this.attachments.length; i++) {
                var slotAttachments = this.attachments[i];
                if (slotAttachments) {
                    for (var name_1 in slotAttachments) {
                        var attachment = slotAttachments[name_1];
                        if (attachment)
                            entries.push(new SkinEntry(i, name_1, attachment));
                    }
                }
            }
            return entries;
        };
        /** Returns all attachments in this skin for the specified slot index. */
        Skin.prototype.getAttachmentsForSlot = function (slotIndex, attachments) {
            var slotAttachments = this.attachments[slotIndex];
            if (slotAttachments) {
                for (var name_2 in slotAttachments) {
                    var attachment = slotAttachments[name_2];
                    if (attachment)
                        attachments.push(new SkinEntry(slotIndex, name_2, attachment));
                }
            }
        };
        /** Clears all attachments, bones, and constraints. */
        Skin.prototype.clear = function () {
            this.attachments.length = 0;
            this.bones.length = 0;
            this.constraints.length = 0;
        };
        /** Attach each attachment in this skin if the corresponding attachment in the old skin is currently attached. */
        Skin.prototype.attachAll = function (skeleton, oldSkin) {
            var slotIndex = 0;
            for (var i = 0; i < skeleton.slots.length; i++) {
                var slot = skeleton.slots[i];
                var slotAttachment = slot.getAttachment();
                if (slotAttachment && slotIndex < oldSkin.attachments.length) {
                    var dictionary = oldSkin.attachments[slotIndex];
                    for (var key in dictionary) {
                        var skinAttachment = dictionary[key];
                        if (slotAttachment == skinAttachment) {
                            var attachment = this.getAttachment(slotIndex, key);
                            if (attachment)
                                slot.setAttachment(attachment);
                            break;
                        }
                    }
                }
                slotIndex++;
            }
        };
        return Skin;
    }());

    /** Loads skeleton data in the Spine binary format.
     *
     * See [Spine binary format](http://esotericsoftware.com/spine-binary-format) and
     * [JSON and binary data](http://esotericsoftware.com/spine-loading-skeleton-data#JSON-and-binary-data) in the Spine
     * Runtimes Guide.
     * @public
     * */
    var SkeletonBinary = /** @class */ (function () {
        function SkeletonBinary(attachmentLoader) {
            this.ver40 = false;
            /** Scales bone positions, image sizes, and translations as they are loaded. This allows different size images to be used at
             * runtime than were used in Spine.
             *
             * See [Scaling](http://esotericsoftware.com/spine-loading-skeleton-data#Scaling) in the Spine Runtimes Guide. */
            this.scale = 1;
            this.linkedMeshes = new Array();
            this.attachmentLoader = attachmentLoader;
        }
        SkeletonBinary.prototype.readSkeletonData = function (binary) {
            var scale = this.scale;
            var skeletonData = new SkeletonData();
            skeletonData.name = ""; // BOZO
            var input = new BinaryInput(binary);
            var lowHash = input.readInt32();
            var highHash = input.readInt32();
            skeletonData.hash = highHash == 0 && lowHash == 0 ? null : highHash.toString(16) + lowHash.toString(16);
            skeletonData.version = input.readString();
            var verShort = skeletonData.version.substr(0, 3);
            if (verShort !== '4.0' && verShort !== '4.1') {
                var error = "Spine 4.1 loader cant load version " + skeletonData.version + ". Please configure your pixi-spine bundle";
                console.error(error);
            }
            this.ver40 = verShort === '4.0';
            skeletonData.x = input.readFloat();
            skeletonData.y = input.readFloat();
            skeletonData.width = input.readFloat();
            skeletonData.height = input.readFloat();
            var nonessential = input.readBoolean();
            if (nonessential) {
                skeletonData.fps = input.readFloat();
                skeletonData.imagesPath = input.readString();
                skeletonData.audioPath = input.readString();
            }
            var n = 0;
            // Strings.
            n = input.readInt(true);
            for (var i = 0; i < n; i++) {
                var str = input.readString();
                if (!str)
                    throw new Error("String in string table must not be null.");
                input.strings.push(str);
            }
            // Bones.
            n = input.readInt(true);
            for (var i = 0; i < n; i++) {
                var name_1 = input.readString();
                if (!name_1)
                    throw new Error("Bone name must not be null.");
                var parent_1 = i == 0 ? null : skeletonData.bones[input.readInt(true)];
                var data = new BoneData(i, name_1, parent_1);
                data.rotation = input.readFloat();
                data.x = input.readFloat() * scale;
                data.y = input.readFloat() * scale;
                data.scaleX = input.readFloat();
                data.scaleY = input.readFloat();
                data.shearX = input.readFloat();
                data.shearY = input.readFloat();
                data.length = input.readFloat() * scale;
                data.transformMode = input.readInt(true);
                data.skinRequired = input.readBoolean();
                if (nonessential)
                    Color.rgba8888ToColor(data.color, input.readInt32());
                skeletonData.bones.push(data);
            }
            // Slots.
            n = input.readInt(true);
            for (var i = 0; i < n; i++) {
                var slotName = input.readString();
                if (!slotName)
                    throw new Error("Slot name must not be null.");
                var boneData = skeletonData.bones[input.readInt(true)];
                var data = new SlotData(i, slotName, boneData);
                Color.rgba8888ToColor(data.color, input.readInt32());
                var darkColor = input.readInt32();
                if (darkColor != -1)
                    Color.rgb888ToColor(data.darkColor = new Color(), darkColor);
                data.attachmentName = input.readStringRef();
                data.blendMode = input.readInt(true);
                skeletonData.slots.push(data);
            }
            // IK constraints.
            n = input.readInt(true);
            for (var i = 0, nn = void 0; i < n; i++) {
                var name_2 = input.readString();
                if (!name_2)
                    throw new Error("IK constraint data name must not be null.");
                var data = new IkConstraintData(name_2);
                data.order = input.readInt(true);
                data.skinRequired = input.readBoolean();
                nn = input.readInt(true);
                for (var ii = 0; ii < nn; ii++)
                    data.bones.push(skeletonData.bones[input.readInt(true)]);
                data.target = skeletonData.bones[input.readInt(true)];
                data.mix = input.readFloat();
                data.softness = input.readFloat() * scale;
                data.bendDirection = input.readByte();
                data.compress = input.readBoolean();
                data.stretch = input.readBoolean();
                data.uniform = input.readBoolean();
                skeletonData.ikConstraints.push(data);
            }
            // Transform constraints.
            n = input.readInt(true);
            for (var i = 0, nn = void 0; i < n; i++) {
                var name_3 = input.readString();
                if (!name_3)
                    throw new Error("Transform constraint data name must not be null.");
                var data = new TransformConstraintData(name_3);
                data.order = input.readInt(true);
                data.skinRequired = input.readBoolean();
                nn = input.readInt(true);
                for (var ii = 0; ii < nn; ii++)
                    data.bones.push(skeletonData.bones[input.readInt(true)]);
                data.target = skeletonData.bones[input.readInt(true)];
                data.local = input.readBoolean();
                data.relative = input.readBoolean();
                data.offsetRotation = input.readFloat();
                data.offsetX = input.readFloat() * scale;
                data.offsetY = input.readFloat() * scale;
                data.offsetScaleX = input.readFloat();
                data.offsetScaleY = input.readFloat();
                data.offsetShearY = input.readFloat();
                data.mixRotate = input.readFloat();
                data.mixX = input.readFloat();
                data.mixY = input.readFloat();
                data.mixScaleX = input.readFloat();
                data.mixScaleY = input.readFloat();
                data.mixShearY = input.readFloat();
                skeletonData.transformConstraints.push(data);
            }
            // Path constraints.
            n = input.readInt(true);
            for (var i = 0, nn = void 0; i < n; i++) {
                var name_4 = input.readString();
                if (!name_4)
                    throw new Error("Path constraint data name must not be null.");
                var data = new PathConstraintData(name_4);
                data.order = input.readInt(true);
                data.skinRequired = input.readBoolean();
                nn = input.readInt(true);
                for (var ii = 0; ii < nn; ii++)
                    data.bones.push(skeletonData.bones[input.readInt(true)]);
                data.target = skeletonData.slots[input.readInt(true)];
                data.positionMode = input.readInt(true);
                data.spacingMode = input.readInt(true);
                data.rotateMode = input.readInt(true);
                data.offsetRotation = input.readFloat();
                data.position = input.readFloat();
                if (data.positionMode == exports.PositionMode.Fixed)
                    data.position *= scale;
                data.spacing = input.readFloat();
                if (data.spacingMode == exports.SpacingMode.Length || data.spacingMode == exports.SpacingMode.Fixed)
                    data.spacing *= scale;
                data.mixRotate = input.readFloat();
                data.mixX = input.readFloat();
                data.mixY = input.readFloat();
                skeletonData.pathConstraints.push(data);
            }
            // Default skin.
            var defaultSkin = this.readSkin(input, skeletonData, true, nonessential);
            if (defaultSkin) {
                skeletonData.defaultSkin = defaultSkin;
                skeletonData.skins.push(defaultSkin);
            }
            // Skins.
            {
                var i = skeletonData.skins.length;
                Utils.setArraySize(skeletonData.skins, n = i + input.readInt(true));
                for (; i < n; i++) {
                    var skin = this.readSkin(input, skeletonData, false, nonessential);
                    if (!skin)
                        throw new Error("readSkin() should not have returned null.");
                    skeletonData.skins[i] = skin;
                }
            }
            // Linked meshes.
            n = this.linkedMeshes.length;
            for (var i = 0; i < n; i++) {
                var linkedMesh = this.linkedMeshes[i];
                var skin = !linkedMesh.skin ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                if (!skin)
                    throw new Error("Not skin found for linked mesh.");
                if (!linkedMesh.parent)
                    throw new Error("Linked mesh parent must not be null");
                var parent_2 = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                if (!parent_2)
                    throw new Error("Parent mesh not found: " + linkedMesh.parent);
                linkedMesh.mesh.timelineAttachment = linkedMesh.inheritTimeline ? parent_2 : linkedMesh.mesh;
                linkedMesh.mesh.setParentMesh(parent_2);
                // if (linkedMesh.mesh.region != null) linkedMesh.mesh.updateRegion();
            }
            this.linkedMeshes.length = 0;
            // Events.
            n = input.readInt(true);
            for (var i = 0; i < n; i++) {
                var eventName = input.readStringRef();
                if (!eventName)
                    throw new Error;
                var data = new EventData(eventName);
                data.intValue = input.readInt(false);
                data.floatValue = input.readFloat();
                data.stringValue = input.readString();
                data.audioPath = input.readString();
                if (data.audioPath) {
                    data.volume = input.readFloat();
                    data.balance = input.readFloat();
                }
                skeletonData.events.push(data);
            }
            // Animations.
            n = input.readInt(true);
            for (var i = 0; i < n; i++) {
                var animationName = input.readString();
                if (!animationName)
                    throw new Error("Animatio name must not be null.");
                skeletonData.animations.push(this.readAnimation(input, animationName, skeletonData));
            }
            return skeletonData;
        };
        SkeletonBinary.prototype.readSkin = function (input, skeletonData, defaultSkin, nonessential) {
            var skin = null;
            var slotCount = 0;
            if (defaultSkin) {
                slotCount = input.readInt(true);
                if (slotCount == 0)
                    return null;
                skin = new Skin("default");
            }
            else {
                var skinName = input.readStringRef();
                if (!skinName)
                    throw new Error("Skin name must not be null.");
                skin = new Skin(skinName);
                skin.bones.length = input.readInt(true);
                for (var i = 0, n = skin.bones.length; i < n; i++)
                    skin.bones[i] = skeletonData.bones[input.readInt(true)];
                for (var i = 0, n = input.readInt(true); i < n; i++)
                    skin.constraints.push(skeletonData.ikConstraints[input.readInt(true)]);
                for (var i = 0, n = input.readInt(true); i < n; i++)
                    skin.constraints.push(skeletonData.transformConstraints[input.readInt(true)]);
                for (var i = 0, n = input.readInt(true); i < n; i++)
                    skin.constraints.push(skeletonData.pathConstraints[input.readInt(true)]);
                slotCount = input.readInt(true);
            }
            for (var i = 0; i < slotCount; i++) {
                var slotIndex = input.readInt(true);
                for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    var name_5 = input.readStringRef();
                    if (!name_5)
                        throw new Error("Attachment name must not be null");
                    var attachment = this.readAttachment(input, skeletonData, skin, slotIndex, name_5, nonessential);
                    if (attachment)
                        skin.setAttachment(slotIndex, name_5, attachment);
                }
            }
            return skin;
        };
        SkeletonBinary.prototype.readAttachment = function (input, skeletonData, skin, slotIndex, attachmentName, nonessential) {
            var scale = this.scale;
            var name = input.readStringRef();
            if (!name)
                name = attachmentName;
            switch (input.readByte()) {
                case exports.AttachmentType.Region: {
                    var path = input.readStringRef();
                    var rotation = input.readFloat();
                    var x = input.readFloat();
                    var y = input.readFloat();
                    var scaleX = input.readFloat();
                    var scaleY = input.readFloat();
                    var width = input.readFloat();
                    var height = input.readFloat();
                    var color = input.readInt32();
                    var sequence = this.readSequence(input);
                    if (!path)
                        path = name;
                    var region = this.attachmentLoader.newRegionAttachment(skin, name, path, sequence);
                    if (!region)
                        return null;
                    region.path = path;
                    region.x = x * scale;
                    region.y = y * scale;
                    region.scaleX = scaleX;
                    region.scaleY = scaleY;
                    region.rotation = rotation;
                    region.width = width * scale;
                    region.height = height * scale;
                    Color.rgba8888ToColor(region.color, color);
                    region.sequence = sequence;
                    if (sequence == null)
                        region.updateRegion();
                    return region;
                }
                case exports.AttachmentType.BoundingBox: {
                    var vertexCount = input.readInt(true);
                    var vertices = this.readVertices(input, vertexCount);
                    var color = nonessential ? input.readInt32() : 0;
                    var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                    if (!box)
                        return null;
                    box.worldVerticesLength = vertexCount << 1;
                    box.vertices = vertices.vertices;
                    box.bones = vertices.bones;
                    if (nonessential)
                        Color.rgba8888ToColor(box.color, color);
                    return box;
                }
                case exports.AttachmentType.Mesh: {
                    var path = input.readStringRef();
                    var color = input.readInt32();
                    var vertexCount = input.readInt(true);
                    var uvs = this.readFloatArray(input, vertexCount << 1, 1);
                    var triangles = this.readShortArray(input);
                    var vertices = this.readVertices(input, vertexCount);
                    var hullLength = input.readInt(true);
                    var sequence = this.readSequence(input);
                    var edges = [];
                    var width = 0, height = 0;
                    if (nonessential) {
                        edges = this.readShortArray(input);
                        width = input.readFloat();
                        height = input.readFloat();
                    }
                    if (!path)
                        path = name;
                    var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path, sequence);
                    if (!mesh)
                        return null;
                    mesh.path = path;
                    Color.rgba8888ToColor(mesh.color, color);
                    mesh.bones = vertices.bones;
                    mesh.vertices = vertices.vertices;
                    mesh.worldVerticesLength = vertexCount << 1;
                    mesh.triangles = triangles;
                    mesh.regionUVs = new Float32Array(uvs);
                    // if (sequence == null) mesh.updateRegion();
                    mesh.hullLength = hullLength << 1;
                    mesh.sequence = sequence;
                    if (nonessential) {
                        mesh.edges = edges;
                        mesh.width = width * scale;
                        mesh.height = height * scale;
                    }
                    return mesh;
                }
                case exports.AttachmentType.LinkedMesh: {
                    var path = input.readStringRef();
                    var color = input.readInt32();
                    var skinName = input.readStringRef();
                    var parent_3 = input.readStringRef();
                    var inheritTimelines = input.readBoolean();
                    var sequence = this.readSequence(input);
                    var width = 0, height = 0;
                    if (nonessential) {
                        width = input.readFloat();
                        height = input.readFloat();
                    }
                    if (!path)
                        path = name;
                    var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path, sequence);
                    if (!mesh)
                        return null;
                    mesh.path = path;
                    Color.rgba8888ToColor(mesh.color, color);
                    mesh.sequence = sequence;
                    if (nonessential) {
                        mesh.width = width * scale;
                        mesh.height = height * scale;
                    }
                    this.linkedMeshes.push(new LinkedMesh$1(mesh, skinName, slotIndex, parent_3, inheritTimelines));
                    return mesh;
                }
                case exports.AttachmentType.Path: {
                    var closed_1 = input.readBoolean();
                    var constantSpeed = input.readBoolean();
                    var vertexCount = input.readInt(true);
                    var vertices = this.readVertices(input, vertexCount);
                    var lengths = Utils.newArray(vertexCount / 3, 0);
                    for (var i = 0, n = lengths.length; i < n; i++)
                        lengths[i] = input.readFloat() * scale;
                    var color = nonessential ? input.readInt32() : 0;
                    var path = this.attachmentLoader.newPathAttachment(skin, name);
                    if (!path)
                        return null;
                    path.closed = closed_1;
                    path.constantSpeed = constantSpeed;
                    path.worldVerticesLength = vertexCount << 1;
                    path.vertices = vertices.vertices;
                    path.bones = vertices.bones;
                    path.lengths = lengths;
                    if (nonessential)
                        Color.rgba8888ToColor(path.color, color);
                    return path;
                }
                case exports.AttachmentType.Point: {
                    var rotation = input.readFloat();
                    var x = input.readFloat();
                    var y = input.readFloat();
                    var color = nonessential ? input.readInt32() : 0;
                    var point = this.attachmentLoader.newPointAttachment(skin, name);
                    if (!point)
                        return null;
                    point.x = x * scale;
                    point.y = y * scale;
                    point.rotation = rotation;
                    if (nonessential)
                        Color.rgba8888ToColor(point.color, color);
                    return point;
                }
                case exports.AttachmentType.Clipping: {
                    var endSlotIndex = input.readInt(true);
                    var vertexCount = input.readInt(true);
                    var vertices = this.readVertices(input, vertexCount);
                    var color = nonessential ? input.readInt32() : 0;
                    var clip = this.attachmentLoader.newClippingAttachment(skin, name);
                    if (!clip)
                        return null;
                    clip.endSlot = skeletonData.slots[endSlotIndex];
                    clip.worldVerticesLength = vertexCount << 1;
                    clip.vertices = vertices.vertices;
                    clip.bones = vertices.bones;
                    if (nonessential)
                        Color.rgba8888ToColor(clip.color, color);
                    return clip;
                }
            }
            return null;
        };
        SkeletonBinary.prototype.readSequence = function (input) {
            if (this.ver40 || !input.readBoolean())
                return null;
            var sequence = new Sequence(input.readInt(true));
            sequence.start = input.readInt(true);
            sequence.digits = input.readInt(true);
            sequence.setupIndex = input.readInt(true);
            return sequence;
        };
        SkeletonBinary.prototype.readDeformTimelineType = function (input) {
            if (this.ver40)
                return ATTACHMENT_DEFORM;
            return input.readByte();
        };
        SkeletonBinary.prototype.readVertices = function (input, vertexCount) {
            var scale = this.scale;
            var verticesLength = vertexCount << 1;
            var vertices = new Vertices();
            if (!input.readBoolean()) {
                vertices.vertices = this.readFloatArray(input, verticesLength, scale);
                return vertices;
            }
            var weights = new Array();
            var bonesArray = new Array();
            for (var i = 0; i < vertexCount; i++) {
                var boneCount = input.readInt(true);
                bonesArray.push(boneCount);
                for (var ii = 0; ii < boneCount; ii++) {
                    bonesArray.push(input.readInt(true));
                    weights.push(input.readFloat() * scale);
                    weights.push(input.readFloat() * scale);
                    weights.push(input.readFloat());
                }
            }
            vertices.vertices = Utils.toFloatArray(weights);
            vertices.bones = bonesArray;
            return vertices;
        };
        SkeletonBinary.prototype.readFloatArray = function (input, n, scale) {
            var array = new Array(n);
            if (scale == 1) {
                for (var i = 0; i < n; i++)
                    array[i] = input.readFloat();
            }
            else {
                for (var i = 0; i < n; i++)
                    array[i] = input.readFloat() * scale;
            }
            return array;
        };
        SkeletonBinary.prototype.readShortArray = function (input) {
            var n = input.readInt(true);
            var array = new Array(n);
            for (var i = 0; i < n; i++)
                array[i] = input.readShort();
            return array;
        };
        SkeletonBinary.prototype.readAnimation = function (input, name, skeletonData) {
            input.readInt(true); // Number of timelines.
            var timelines = new Array();
            var scale = this.scale;
            // Slot timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var slotIndex = input.readInt(true);
                for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    var timelineType = input.readByte();
                    var frameCount = input.readInt(true);
                    var frameLast = frameCount - 1;
                    switch (timelineType) {
                        case SLOT_ATTACHMENT: {
                            var timeline = new AttachmentTimeline(frameCount, slotIndex);
                            for (var frame = 0; frame < frameCount; frame++)
                                timeline.setFrame(frame, input.readFloat(), input.readStringRef());
                            timelines.push(timeline);
                            break;
                        }
                        case SLOT_RGBA: {
                            var bezierCount = input.readInt(true);
                            var timeline = new RGBATimeline(frameCount, bezierCount, slotIndex);
                            var time = input.readFloat();
                            var r = input.readUnsignedByte() / 255.0;
                            var g = input.readUnsignedByte() / 255.0;
                            var b = input.readUnsignedByte() / 255.0;
                            var a = input.readUnsignedByte() / 255.0;
                            for (var frame = 0, bezier = 0;; frame++) {
                                timeline.setFrame(frame, time, r, g, b, a);
                                if (frame == frameLast)
                                    break;
                                var time2 = input.readFloat();
                                var r2 = input.readUnsignedByte() / 255.0;
                                var g2 = input.readUnsignedByte() / 255.0;
                                var b2 = input.readUnsignedByte() / 255.0;
                                var a2 = input.readUnsignedByte() / 255.0;
                                switch (input.readByte()) {
                                    case CURVE_STEPPED:
                                        timeline.setStepped(frame);
                                        break;
                                    case CURVE_BEZIER:
                                        setBezier(input, timeline, bezier++, frame, 0, time, time2, r, r2, 1);
                                        setBezier(input, timeline, bezier++, frame, 1, time, time2, g, g2, 1);
                                        setBezier(input, timeline, bezier++, frame, 2, time, time2, b, b2, 1);
                                        setBezier(input, timeline, bezier++, frame, 3, time, time2, a, a2, 1);
                                }
                                time = time2;
                                r = r2;
                                g = g2;
                                b = b2;
                                a = a2;
                            }
                            timelines.push(timeline);
                            break;
                        }
                        case SLOT_RGB: {
                            var bezierCount = input.readInt(true);
                            var timeline = new RGBTimeline(frameCount, bezierCount, slotIndex);
                            var time = input.readFloat();
                            var r = input.readUnsignedByte() / 255.0;
                            var g = input.readUnsignedByte() / 255.0;
                            var b = input.readUnsignedByte() / 255.0;
                            for (var frame = 0, bezier = 0;; frame++) {
                                timeline.setFrame(frame, time, r, g, b);
                                if (frame == frameLast)
                                    break;
                                var time2 = input.readFloat();
                                var r2 = input.readUnsignedByte() / 255.0;
                                var g2 = input.readUnsignedByte() / 255.0;
                                var b2 = input.readUnsignedByte() / 255.0;
                                switch (input.readByte()) {
                                    case CURVE_STEPPED:
                                        timeline.setStepped(frame);
                                        break;
                                    case CURVE_BEZIER:
                                        setBezier(input, timeline, bezier++, frame, 0, time, time2, r, r2, 1);
                                        setBezier(input, timeline, bezier++, frame, 1, time, time2, g, g2, 1);
                                        setBezier(input, timeline, bezier++, frame, 2, time, time2, b, b2, 1);
                                }
                                time = time2;
                                r = r2;
                                g = g2;
                                b = b2;
                            }
                            timelines.push(timeline);
                            break;
                        }
                        case SLOT_RGBA2: {
                            var bezierCount = input.readInt(true);
                            var timeline = new RGBA2Timeline(frameCount, bezierCount, slotIndex);
                            var time = input.readFloat();
                            var r = input.readUnsignedByte() / 255.0;
                            var g = input.readUnsignedByte() / 255.0;
                            var b = input.readUnsignedByte() / 255.0;
                            var a = input.readUnsignedByte() / 255.0;
                            var r2 = input.readUnsignedByte() / 255.0;
                            var g2 = input.readUnsignedByte() / 255.0;
                            var b2 = input.readUnsignedByte() / 255.0;
                            for (var frame = 0, bezier = 0;; frame++) {
                                timeline.setFrame(frame, time, r, g, b, a, r2, g2, b2);
                                if (frame == frameLast)
                                    break;
                                var time2 = input.readFloat();
                                var nr = input.readUnsignedByte() / 255.0;
                                var ng = input.readUnsignedByte() / 255.0;
                                var nb = input.readUnsignedByte() / 255.0;
                                var na = input.readUnsignedByte() / 255.0;
                                var nr2 = input.readUnsignedByte() / 255.0;
                                var ng2 = input.readUnsignedByte() / 255.0;
                                var nb2 = input.readUnsignedByte() / 255.0;
                                switch (input.readByte()) {
                                    case CURVE_STEPPED:
                                        timeline.setStepped(frame);
                                        break;
                                    case CURVE_BEZIER:
                                        setBezier(input, timeline, bezier++, frame, 0, time, time2, r, nr, 1);
                                        setBezier(input, timeline, bezier++, frame, 1, time, time2, g, ng, 1);
                                        setBezier(input, timeline, bezier++, frame, 2, time, time2, b, nb, 1);
                                        setBezier(input, timeline, bezier++, frame, 3, time, time2, a, na, 1);
                                        setBezier(input, timeline, bezier++, frame, 4, time, time2, r2, nr2, 1);
                                        setBezier(input, timeline, bezier++, frame, 5, time, time2, g2, ng2, 1);
                                        setBezier(input, timeline, bezier++, frame, 6, time, time2, b2, nb2, 1);
                                }
                                time = time2;
                                r = nr;
                                g = ng;
                                b = nb;
                                a = na;
                                r2 = nr2;
                                g2 = ng2;
                                b2 = nb2;
                            }
                            timelines.push(timeline);
                            break;
                        }
                        case SLOT_RGB2: {
                            var bezierCount = input.readInt(true);
                            var timeline = new RGB2Timeline(frameCount, bezierCount, slotIndex);
                            var time = input.readFloat();
                            var r = input.readUnsignedByte() / 255.0;
                            var g = input.readUnsignedByte() / 255.0;
                            var b = input.readUnsignedByte() / 255.0;
                            var r2 = input.readUnsignedByte() / 255.0;
                            var g2 = input.readUnsignedByte() / 255.0;
                            var b2 = input.readUnsignedByte() / 255.0;
                            for (var frame = 0, bezier = 0;; frame++) {
                                timeline.setFrame(frame, time, r, g, b, r2, g2, b2);
                                if (frame == frameLast)
                                    break;
                                var time2 = input.readFloat();
                                var nr = input.readUnsignedByte() / 255.0;
                                var ng = input.readUnsignedByte() / 255.0;
                                var nb = input.readUnsignedByte() / 255.0;
                                var nr2 = input.readUnsignedByte() / 255.0;
                                var ng2 = input.readUnsignedByte() / 255.0;
                                var nb2 = input.readUnsignedByte() / 255.0;
                                switch (input.readByte()) {
                                    case CURVE_STEPPED:
                                        timeline.setStepped(frame);
                                        break;
                                    case CURVE_BEZIER:
                                        setBezier(input, timeline, bezier++, frame, 0, time, time2, r, nr, 1);
                                        setBezier(input, timeline, bezier++, frame, 1, time, time2, g, ng, 1);
                                        setBezier(input, timeline, bezier++, frame, 2, time, time2, b, nb, 1);
                                        setBezier(input, timeline, bezier++, frame, 3, time, time2, r2, nr2, 1);
                                        setBezier(input, timeline, bezier++, frame, 4, time, time2, g2, ng2, 1);
                                        setBezier(input, timeline, bezier++, frame, 5, time, time2, b2, nb2, 1);
                                }
                                time = time2;
                                r = nr;
                                g = ng;
                                b = nb;
                                r2 = nr2;
                                g2 = ng2;
                                b2 = nb2;
                            }
                            timelines.push(timeline);
                            break;
                        }
                        case SLOT_ALPHA: {
                            var timeline = new AlphaTimeline(frameCount, input.readInt(true), slotIndex);
                            var time = input.readFloat(), a = input.readUnsignedByte() / 255;
                            for (var frame = 0, bezier = 0;; frame++) {
                                timeline.setFrame(frame, time, a);
                                if (frame == frameLast)
                                    break;
                                var time2 = input.readFloat();
                                var a2 = input.readUnsignedByte() / 255;
                                switch (input.readByte()) {
                                    case CURVE_STEPPED:
                                        timeline.setStepped(frame);
                                        break;
                                    case CURVE_BEZIER:
                                        setBezier(input, timeline, bezier++, frame, 0, time, time2, a, a2, 1);
                                }
                                time = time2;
                                a = a2;
                            }
                            timelines.push(timeline);
                        }
                    }
                }
            }
            // Bone timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var boneIndex = input.readInt(true);
                for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    var type = input.readByte(), frameCount = input.readInt(true), bezierCount = input.readInt(true);
                    switch (type) {
                        case BONE_ROTATE:
                            timelines.push(readTimeline1$1(input, new RotateTimeline(frameCount, bezierCount, boneIndex), 1));
                            break;
                        case BONE_TRANSLATE:
                            timelines.push(readTimeline2$1(input, new TranslateTimeline(frameCount, bezierCount, boneIndex), scale));
                            break;
                        case BONE_TRANSLATEX:
                            timelines.push(readTimeline1$1(input, new TranslateXTimeline(frameCount, bezierCount, boneIndex), scale));
                            break;
                        case BONE_TRANSLATEY:
                            timelines.push(readTimeline1$1(input, new TranslateYTimeline(frameCount, bezierCount, boneIndex), scale));
                            break;
                        case BONE_SCALE:
                            timelines.push(readTimeline2$1(input, new ScaleTimeline(frameCount, bezierCount, boneIndex), 1));
                            break;
                        case BONE_SCALEX:
                            timelines.push(readTimeline1$1(input, new ScaleXTimeline(frameCount, bezierCount, boneIndex), 1));
                            break;
                        case BONE_SCALEY:
                            timelines.push(readTimeline1$1(input, new ScaleYTimeline(frameCount, bezierCount, boneIndex), 1));
                            break;
                        case BONE_SHEAR:
                            timelines.push(readTimeline2$1(input, new ShearTimeline(frameCount, bezierCount, boneIndex), 1));
                            break;
                        case BONE_SHEARX:
                            timelines.push(readTimeline1$1(input, new ShearXTimeline(frameCount, bezierCount, boneIndex), 1));
                            break;
                        case BONE_SHEARY:
                            timelines.push(readTimeline1$1(input, new ShearYTimeline(frameCount, bezierCount, boneIndex), 1));
                    }
                }
            }
            // IK constraint timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var index = input.readInt(true), frameCount = input.readInt(true), frameLast = frameCount - 1;
                var timeline = new IkConstraintTimeline(frameCount, input.readInt(true), index);
                var time = input.readFloat(), mix = input.readFloat(), softness = input.readFloat() * scale;
                for (var frame = 0, bezier = 0;; frame++) {
                    timeline.setFrame(frame, time, mix, softness, input.readByte(), input.readBoolean(), input.readBoolean());
                    if (frame == frameLast)
                        break;
                    var time2 = input.readFloat(), mix2 = input.readFloat(), softness2 = input.readFloat() * scale;
                    switch (input.readByte()) {
                        case CURVE_STEPPED:
                            timeline.setStepped(frame);
                            break;
                        case CURVE_BEZIER:
                            setBezier(input, timeline, bezier++, frame, 0, time, time2, mix, mix2, 1);
                            setBezier(input, timeline, bezier++, frame, 1, time, time2, softness, softness2, scale);
                    }
                    time = time2;
                    mix = mix2;
                    softness = softness2;
                }
                timelines.push(timeline);
            }
            // Transform constraint timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var index = input.readInt(true), frameCount = input.readInt(true), frameLast = frameCount - 1;
                var timeline = new TransformConstraintTimeline(frameCount, input.readInt(true), index);
                var time = input.readFloat(), mixRotate = input.readFloat(), mixX = input.readFloat(), mixY = input.readFloat(), mixScaleX = input.readFloat(), mixScaleY = input.readFloat(), mixShearY = input.readFloat();
                for (var frame = 0, bezier = 0;; frame++) {
                    timeline.setFrame(frame, time, mixRotate, mixX, mixY, mixScaleX, mixScaleY, mixShearY);
                    if (frame == frameLast)
                        break;
                    var time2 = input.readFloat(), mixRotate2 = input.readFloat(), mixX2 = input.readFloat(), mixY2 = input.readFloat(), mixScaleX2 = input.readFloat(), mixScaleY2 = input.readFloat(), mixShearY2 = input.readFloat();
                    switch (input.readByte()) {
                        case CURVE_STEPPED:
                            timeline.setStepped(frame);
                            break;
                        case CURVE_BEZIER:
                            setBezier(input, timeline, bezier++, frame, 0, time, time2, mixRotate, mixRotate2, 1);
                            setBezier(input, timeline, bezier++, frame, 1, time, time2, mixX, mixX2, 1);
                            setBezier(input, timeline, bezier++, frame, 2, time, time2, mixY, mixY2, 1);
                            setBezier(input, timeline, bezier++, frame, 3, time, time2, mixScaleX, mixScaleX2, 1);
                            setBezier(input, timeline, bezier++, frame, 4, time, time2, mixScaleY, mixScaleY2, 1);
                            setBezier(input, timeline, bezier++, frame, 5, time, time2, mixShearY, mixShearY2, 1);
                    }
                    time = time2;
                    mixRotate = mixRotate2;
                    mixX = mixX2;
                    mixY = mixY2;
                    mixScaleX = mixScaleX2;
                    mixScaleY = mixScaleY2;
                    mixShearY = mixShearY2;
                }
                timelines.push(timeline);
            }
            // Path constraint timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var index = input.readInt(true);
                var data = skeletonData.pathConstraints[index];
                for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    switch (input.readByte()) {
                        case PATH_POSITION:
                            timelines
                                .push(readTimeline1$1(input, new PathConstraintPositionTimeline(input.readInt(true), input.readInt(true), index), data.positionMode == exports.PositionMode.Fixed ? scale : 1));
                            break;
                        case PATH_SPACING:
                            timelines
                                .push(readTimeline1$1(input, new PathConstraintSpacingTimeline(input.readInt(true), input.readInt(true), index), data.spacingMode == exports.SpacingMode.Length || data.spacingMode == exports.SpacingMode.Fixed ? scale : 1));
                            break;
                        case PATH_MIX:
                            var timeline = new PathConstraintMixTimeline(input.readInt(true), input.readInt(true), index);
                            var time = input.readFloat(), mixRotate = input.readFloat(), mixX = input.readFloat(), mixY = input.readFloat();
                            for (var frame = 0, bezier = 0, frameLast = timeline.getFrameCount() - 1;; frame++) {
                                timeline.setFrame(frame, time, mixRotate, mixX, mixY);
                                if (frame == frameLast)
                                    break;
                                var time2 = input.readFloat(), mixRotate2 = input.readFloat(), mixX2 = input.readFloat(), mixY2 = input.readFloat();
                                switch (input.readByte()) {
                                    case CURVE_STEPPED:
                                        timeline.setStepped(frame);
                                        break;
                                    case CURVE_BEZIER:
                                        setBezier(input, timeline, bezier++, frame, 0, time, time2, mixRotate, mixRotate2, 1);
                                        setBezier(input, timeline, bezier++, frame, 1, time, time2, mixX, mixX2, 1);
                                        setBezier(input, timeline, bezier++, frame, 2, time, time2, mixY, mixY2, 1);
                                }
                                time = time2;
                                mixRotate = mixRotate2;
                                mixX = mixX2;
                                mixY = mixY2;
                            }
                            timelines.push(timeline);
                    }
                }
            }
            // Deform timelines.
            for (var i = 0, n = input.readInt(true); i < n; i++) {
                var skin = skeletonData.skins[input.readInt(true)];
                for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
                    var slotIndex = input.readInt(true);
                    for (var iii = 0, nnn = input.readInt(true); iii < nnn; iii++) {
                        var attachmentName = input.readStringRef();
                        if (!attachmentName)
                            throw new Error("attachmentName must not be null.");
                        var attachment = skin.getAttachment(slotIndex, attachmentName);
                        var timelineType = this.readDeformTimelineType(input);
                        var frameCount = input.readInt(true);
                        var frameLast = frameCount - 1;
                        switch (timelineType) {
                            case ATTACHMENT_DEFORM: {
                                var vertexAttachment = attachment;
                                var weighted = vertexAttachment.bones;
                                var vertices = vertexAttachment.vertices;
                                var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                                var bezierCount = input.readInt(true);
                                var timeline = new DeformTimeline(frameCount, bezierCount, slotIndex, vertexAttachment);
                                var time = input.readFloat();
                                for (var frame = 0, bezier = 0;; frame++) {
                                    var deform = void 0;
                                    var end = input.readInt(true);
                                    if (end == 0)
                                        deform = weighted ? Utils.newFloatArray(deformLength) : vertices;
                                    else {
                                        deform = Utils.newFloatArray(deformLength);
                                        var start = input.readInt(true);
                                        end += start;
                                        if (scale == 1) {
                                            for (var v = start; v < end; v++)
                                                deform[v] = input.readFloat();
                                        }
                                        else {
                                            for (var v = start; v < end; v++)
                                                deform[v] = input.readFloat() * scale;
                                        }
                                        if (!weighted) {
                                            for (var v = 0, vn = deform.length; v < vn; v++)
                                                deform[v] += vertices[v];
                                        }
                                    }
                                    timeline.setFrame(frame, time, deform);
                                    if (frame == frameLast)
                                        break;
                                    var time2 = input.readFloat();
                                    switch (input.readByte()) {
                                        case CURVE_STEPPED:
                                            timeline.setStepped(frame);
                                            break;
                                        case CURVE_BEZIER:
                                            setBezier(input, timeline, bezier++, frame, 0, time, time2, 0, 1, 1);
                                    }
                                    time = time2;
                                }
                                timelines.push(timeline);
                                break;
                            }
                            case ATTACHMENT_SEQUENCE: {
                                var timeline = new SequenceTimeline(frameCount, slotIndex, attachment);
                                for (var frame = 0; frame < frameCount; frame++) {
                                    var time = input.readFloat();
                                    var modeAndIndex = input.readInt32();
                                    timeline.setFrame(frame, time, SequenceModeValues[modeAndIndex & 0xf], modeAndIndex >> 4, input.readFloat());
                                }
                                timelines.push(timeline);
                                break;
                            }
                        }
                    }
                }
            }
            // Draw order timeline.
            var drawOrderCount = input.readInt(true);
            if (drawOrderCount > 0) {
                var timeline = new DrawOrderTimeline(drawOrderCount);
                var slotCount = skeletonData.slots.length;
                for (var i = 0; i < drawOrderCount; i++) {
                    var time = input.readFloat();
                    var offsetCount = input.readInt(true);
                    var drawOrder = Utils.newArray(slotCount, 0);
                    for (var ii = slotCount - 1; ii >= 0; ii--)
                        drawOrder[ii] = -1;
                    var unchanged = Utils.newArray(slotCount - offsetCount, 0);
                    var originalIndex = 0, unchangedIndex = 0;
                    for (var ii = 0; ii < offsetCount; ii++) {
                        var slotIndex = input.readInt(true);
                        // Collect unchanged items.
                        while (originalIndex != slotIndex)
                            unchanged[unchangedIndex++] = originalIndex++;
                        // Set changed items.
                        drawOrder[originalIndex + input.readInt(true)] = originalIndex++;
                    }
                    // Collect remaining unchanged items.
                    while (originalIndex < slotCount)
                        unchanged[unchangedIndex++] = originalIndex++;
                    // Fill in unchanged items.
                    for (var ii = slotCount - 1; ii >= 0; ii--)
                        if (drawOrder[ii] == -1)
                            drawOrder[ii] = unchanged[--unchangedIndex];
                    timeline.setFrame(i, time, drawOrder);
                }
                timelines.push(timeline);
            }
            // Event timeline.
            var eventCount = input.readInt(true);
            if (eventCount > 0) {
                var timeline = new EventTimeline(eventCount);
                for (var i = 0; i < eventCount; i++) {
                    var time = input.readFloat();
                    var eventData = skeletonData.events[input.readInt(true)];
                    var event_1 = new Event(time, eventData);
                    event_1.intValue = input.readInt(false);
                    event_1.floatValue = input.readFloat();
                    event_1.stringValue = input.readBoolean() ? input.readString() : eventData.stringValue;
                    if (event_1.data.audioPath) {
                        event_1.volume = input.readFloat();
                        event_1.balance = input.readFloat();
                    }
                    timeline.setFrame(i, event_1);
                }
                timelines.push(timeline);
            }
            var duration = 0;
            for (var i = 0, n = timelines.length; i < n; i++)
                duration = Math.max(duration, timelines[i].getDuration());
            return new Animation(name, timelines, duration);
        };
        SkeletonBinary.BlendModeValues = [constants.BLEND_MODES.NORMAL, constants.BLEND_MODES.ADD, constants.BLEND_MODES.MULTIPLY, constants.BLEND_MODES.SCREEN];
        return SkeletonBinary;
    }());
    var LinkedMesh$1 = /** @class */ (function () {
        function LinkedMesh(mesh, skin, slotIndex, parent, inheritDeform) {
            this.mesh = mesh;
            this.skin = skin;
            this.slotIndex = slotIndex;
            this.parent = parent;
            this.inheritTimeline = inheritDeform;
        }
        return LinkedMesh;
    }());
    var Vertices = /** @class */ (function () {
        function Vertices(bones, vertices) {
            if (bones === void 0) { bones = null; }
            if (vertices === void 0) { vertices = null; }
            this.bones = bones;
            this.vertices = vertices;
        }
        return Vertices;
    }());
    function readTimeline1$1(input, timeline, scale) {
        var time = input.readFloat(), value = input.readFloat() * scale;
        for (var frame = 0, bezier = 0, frameLast = timeline.getFrameCount() - 1;; frame++) {
            timeline.setFrame(frame, time, value);
            if (frame == frameLast)
                break;
            var time2 = input.readFloat(), value2 = input.readFloat() * scale;
            switch (input.readByte()) {
                case CURVE_STEPPED:
                    timeline.setStepped(frame);
                    break;
                case CURVE_BEZIER:
                    setBezier(input, timeline, bezier++, frame, 0, time, time2, value, value2, scale);
            }
            time = time2;
            value = value2;
        }
        return timeline;
    }
    function readTimeline2$1(input, timeline, scale) {
        var time = input.readFloat(), value1 = input.readFloat() * scale, value2 = input.readFloat() * scale;
        for (var frame = 0, bezier = 0, frameLast = timeline.getFrameCount() - 1;; frame++) {
            timeline.setFrame(frame, time, value1, value2);
            if (frame == frameLast)
                break;
            var time2 = input.readFloat(), nvalue1 = input.readFloat() * scale, nvalue2 = input.readFloat() * scale;
            switch (input.readByte()) {
                case CURVE_STEPPED:
                    timeline.setStepped(frame);
                    break;
                case CURVE_BEZIER:
                    setBezier(input, timeline, bezier++, frame, 0, time, time2, value1, nvalue1, scale);
                    setBezier(input, timeline, bezier++, frame, 1, time, time2, value2, nvalue2, scale);
            }
            time = time2;
            value1 = nvalue1;
            value2 = nvalue2;
        }
        return timeline;
    }
    function setBezier(input, timeline, bezier, frame, value, time1, time2, value1, value2, scale) {
        timeline.setBezier(bezier, frame, value, time1, value1, input.readFloat(), input.readFloat() * scale, input.readFloat(), input.readFloat() * scale, time2, value2);
    }
    var BONE_ROTATE = 0;
    var BONE_TRANSLATE = 1;
    var BONE_TRANSLATEX = 2;
    var BONE_TRANSLATEY = 3;
    var BONE_SCALE = 4;
    var BONE_SCALEX = 5;
    var BONE_SCALEY = 6;
    var BONE_SHEAR = 7;
    var BONE_SHEARX = 8;
    var BONE_SHEARY = 9;
    var SLOT_ATTACHMENT = 0;
    var SLOT_RGBA = 1;
    var SLOT_RGB = 2;
    var SLOT_RGBA2 = 3;
    var SLOT_RGB2 = 4;
    var SLOT_ALPHA = 5;
    var ATTACHMENT_DEFORM = 0;
    var ATTACHMENT_SEQUENCE = 1;
    var PATH_POSITION = 0;
    var PATH_SPACING = 1;
    var PATH_MIX = 2;
    // const CURVE_LINEAR = 0;
    var CURVE_STEPPED = 1;
    var CURVE_BEZIER = 2;

    /** Collects each visible {@link BoundingBoxAttachment} and computes the world vertices for its polygon. The polygon vertices are
     * provided along with convenience methods for doing hit detection.
     * @public
     * */
    var SkeletonBounds = /** @class */ (function (_super) {
        __extends$1(SkeletonBounds, _super);
        function SkeletonBounds() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SkeletonBounds;
    }(SkeletonBoundsBase));

    /** Loads skeleton data in the Spine JSON format.
     *
     * See [Spine JSON format](http://esotericsoftware.com/spine-json-format) and
     * [JSON and binary data](http://esotericsoftware.com/spine-loading-skeleton-data#JSON-and-binary-data) in the Spine
     * Runtimes Guide.
     * @public
     * */
    var SkeletonJson = /** @class */ (function () {
        function SkeletonJson(attachmentLoader) {
            /** Scales bone positions, image sizes, and translations as they are loaded. This allows different size images to be used at
             * runtime than were used in Spine.
             *
             * See [Scaling](http://esotericsoftware.com/spine-loading-skeleton-data#Scaling) in the Spine Runtimes Guide. */
            this.scale = 1;
            this.linkedMeshes = new Array();
            this.attachmentLoader = attachmentLoader;
        }
        SkeletonJson.prototype.readSkeletonData = function (json) {
            var scale = this.scale;
            var skeletonData = new SkeletonData();
            var root = typeof (json) === "string" ? JSON.parse(json) : json;
            // Skeleton
            var skeletonMap = root.skeleton;
            if (skeletonMap) {
                skeletonData.hash = skeletonMap.hash;
                skeletonData.version = skeletonMap.spine;
                var verShort = skeletonData.version.substr(0, 3);
                if (verShort !== '4.0' && verShort !== '4.1') {
                    var error = "Spine 4.1 loader cant load version " + skeletonMap.spine + ". Please configure your pixi-spine bundle";
                    console.error(error);
                }
                skeletonData.x = skeletonMap.x;
                skeletonData.y = skeletonMap.y;
                skeletonData.width = skeletonMap.width;
                skeletonData.height = skeletonMap.height;
                skeletonData.fps = skeletonMap.fps;
                skeletonData.imagesPath = skeletonMap.images;
            }
            // Bones
            if (root.bones) {
                for (var i = 0; i < root.bones.length; i++) {
                    var boneMap = root.bones[i];
                    var parent_1 = null;
                    var parentName = getValue(boneMap, "parent", null);
                    if (parentName != null) {
                        parent_1 = skeletonData.findBone(parentName);
                        if (parent_1 == null)
                            throw new Error("Parent bone not found: " + parentName);
                    }
                    var data = new BoneData(skeletonData.bones.length, boneMap.name, parent_1);
                    data.length = getValue(boneMap, "length", 0) * scale;
                    data.x = getValue(boneMap, "x", 0) * scale;
                    data.y = getValue(boneMap, "y", 0) * scale;
                    data.rotation = getValue(boneMap, "rotation", 0);
                    data.scaleX = getValue(boneMap, "scaleX", 1);
                    data.scaleY = getValue(boneMap, "scaleY", 1);
                    data.shearX = getValue(boneMap, "shearX", 0);
                    data.shearY = getValue(boneMap, "shearY", 0);
                    data.transformMode = Utils.enumValue(exports.TransformMode, getValue(boneMap, "transform", "Normal"));
                    data.skinRequired = getValue(boneMap, "skin", false);
                    var color = getValue(boneMap, "color", null);
                    if (color)
                        data.color.setFromString(color);
                    skeletonData.bones.push(data);
                }
            }
            // Slots.
            if (root.slots) {
                for (var i = 0; i < root.slots.length; i++) {
                    var slotMap = root.slots[i];
                    var boneData = skeletonData.findBone(slotMap.bone);
                    if (!boneData)
                        throw new Error("Couldn't find bone " + slotMap.bone + " for slot " + slotMap.name);
                    var data = new SlotData(skeletonData.slots.length, slotMap.name, boneData);
                    var color = getValue(slotMap, "color", null);
                    if (color)
                        data.color.setFromString(color);
                    var dark = getValue(slotMap, "dark", null);
                    if (dark)
                        data.darkColor = Color.fromString(dark);
                    data.attachmentName = getValue(slotMap, "attachment", null);
                    data.blendMode = SkeletonJson.blendModeFromString(getValue(slotMap, "blend", "normal"));
                    skeletonData.slots.push(data);
                }
            }
            // IK constraints
            if (root.ik) {
                for (var i = 0; i < root.ik.length; i++) {
                    var constraintMap = root.ik[i];
                    var data = new IkConstraintData(constraintMap.name);
                    data.order = getValue(constraintMap, "order", 0);
                    data.skinRequired = getValue(constraintMap, "skin", false);
                    for (var ii = 0; ii < constraintMap.bones.length; ii++) {
                        var boneName = constraintMap.bones[ii];
                        var bone = skeletonData.findBone(boneName);
                        if (bone == null)
                            throw new Error("IK bone not found: " + boneName);
                        data.bones.push(bone);
                    }
                    data.target = skeletonData.findBone(constraintMap.target);
                    data.mix = getValue(constraintMap, "mix", 1);
                    data.softness = getValue(constraintMap, "softness", 0) * scale;
                    data.bendDirection = getValue(constraintMap, "bendPositive", true) ? 1 : -1;
                    data.compress = getValue(constraintMap, "compress", false);
                    data.stretch = getValue(constraintMap, "stretch", false);
                    data.uniform = getValue(constraintMap, "uniform", false);
                    skeletonData.ikConstraints.push(data);
                }
            }
            // Transform constraints.
            if (root.transform) {
                for (var i = 0; i < root.transform.length; i++) {
                    var constraintMap = root.transform[i];
                    var data = new TransformConstraintData(constraintMap.name);
                    data.order = getValue(constraintMap, "order", 0);
                    data.skinRequired = getValue(constraintMap, "skin", false);
                    for (var ii = 0; ii < constraintMap.bones.length; ii++) {
                        var boneName = constraintMap.bones[ii];
                        var bone = skeletonData.findBone(boneName);
                        if (!bone)
                            throw new Error("Couldn't find bone " + boneName + " for transform constraint " + constraintMap.name + ".");
                        data.bones.push(bone);
                    }
                    var targetName = constraintMap.target;
                    var target = skeletonData.findBone(targetName);
                    if (!target)
                        throw new Error("Couldn't find target bone " + targetName + " for transform constraint " + constraintMap.name + ".");
                    data.target = target;
                    data.local = getValue(constraintMap, "local", false);
                    data.relative = getValue(constraintMap, "relative", false);
                    data.offsetRotation = getValue(constraintMap, "rotation", 0);
                    data.offsetX = getValue(constraintMap, "x", 0) * scale;
                    data.offsetY = getValue(constraintMap, "y", 0) * scale;
                    data.offsetScaleX = getValue(constraintMap, "scaleX", 0);
                    data.offsetScaleY = getValue(constraintMap, "scaleY", 0);
                    data.offsetShearY = getValue(constraintMap, "shearY", 0);
                    data.mixRotate = getValue(constraintMap, "mixRotate", 1);
                    data.mixX = getValue(constraintMap, "mixX", 1);
                    data.mixY = getValue(constraintMap, "mixY", data.mixX);
                    data.mixScaleX = getValue(constraintMap, "mixScaleX", 1);
                    data.mixScaleY = getValue(constraintMap, "mixScaleY", data.mixScaleX);
                    data.mixShearY = getValue(constraintMap, "mixShearY", 1);
                    skeletonData.transformConstraints.push(data);
                }
            }
            // Path constraints.
            if (root.path) {
                for (var i = 0; i < root.path.length; i++) {
                    var constraintMap = root.path[i];
                    var data = new PathConstraintData(constraintMap.name);
                    data.order = getValue(constraintMap, "order", 0);
                    data.skinRequired = getValue(constraintMap, "skin", false);
                    for (var ii = 0; ii < constraintMap.bones.length; ii++) {
                        var boneName = constraintMap.bones[ii];
                        var bone = skeletonData.findBone(boneName);
                        if (!bone)
                            throw new Error("Couldn't find bone " + boneName + " for path constraint " + constraintMap.name + ".");
                        data.bones.push(bone);
                    }
                    var targetName = constraintMap.target;
                    var target = skeletonData.findSlot(targetName);
                    if (!target)
                        throw new Error("Couldn't find target slot " + targetName + " for path constraint " + constraintMap.name + ".");
                    data.target = target;
                    data.positionMode = Utils.enumValue(exports.PositionMode, getValue(constraintMap, "positionMode", "Percent"));
                    data.spacingMode = Utils.enumValue(exports.SpacingMode, getValue(constraintMap, "spacingMode", "Length"));
                    data.rotateMode = Utils.enumValue(exports.RotateMode, getValue(constraintMap, "rotateMode", "Tangent"));
                    data.offsetRotation = getValue(constraintMap, "rotation", 0);
                    data.position = getValue(constraintMap, "position", 0);
                    if (data.positionMode == exports.PositionMode.Fixed)
                        data.position *= scale;
                    data.spacing = getValue(constraintMap, "spacing", 0);
                    if (data.spacingMode == exports.SpacingMode.Length || data.spacingMode == exports.SpacingMode.Fixed)
                        data.spacing *= scale;
                    data.mixRotate = getValue(constraintMap, "mixRotate", 1);
                    data.mixX = getValue(constraintMap, "mixX", 1);
                    data.mixY = getValue(constraintMap, "mixY", data.mixX);
                    skeletonData.pathConstraints.push(data);
                }
            }
            // Skins.
            if (root.skins) {
                for (var i = 0; i < root.skins.length; i++) {
                    var skinMap = root.skins[i];
                    var skin = new Skin(skinMap.name);
                    if (skinMap.bones) {
                        for (var ii = 0; ii < skinMap.bones.length; ii++) {
                            var boneName = skinMap.bones[ii];
                            var bone = skeletonData.findBone(boneName);
                            if (!bone)
                                throw new Error("Couldn't find bone " + boneName + " for skin " + skinMap.name + ".");
                            skin.bones.push(bone);
                        }
                    }
                    if (skinMap.ik) {
                        for (var ii = 0; ii < skinMap.ik.length; ii++) {
                            var constraintName = skinMap.ik[ii];
                            var constraint = skeletonData.findIkConstraint(constraintName);
                            if (!constraint)
                                throw new Error("Couldn't find IK constraint " + constraintName + " for skin " + skinMap.name + ".");
                            skin.constraints.push(constraint);
                        }
                    }
                    if (skinMap.transform) {
                        for (var ii = 0; ii < skinMap.transform.length; ii++) {
                            var constraintName = skinMap.transform[ii];
                            var constraint = skeletonData.findTransformConstraint(constraintName);
                            if (!constraint)
                                throw new Error("Couldn't find transform constraint " + constraintName + " for skin " + skinMap.name + ".");
                            skin.constraints.push(constraint);
                        }
                    }
                    if (skinMap.path) {
                        for (var ii = 0; ii < skinMap.path.length; ii++) {
                            var constraintName = skinMap.path[ii];
                            var constraint = skeletonData.findPathConstraint(constraintName);
                            if (!constraint)
                                throw new Error("Couldn't find path constraint " + constraintName + " for skin " + skinMap.name + ".");
                            skin.constraints.push(constraint);
                        }
                    }
                    for (var slotName in skinMap.attachments) {
                        var slot = skeletonData.findSlot(slotName);
                        if (!slot)
                            throw new Error("Couldn't find slot " + slotName + " for skin " + skinMap.name + ".");
                        var slotMap = skinMap.attachments[slotName];
                        for (var entryName in slotMap) {
                            var attachment = this.readAttachment(slotMap[entryName], skin, slot.index, entryName, skeletonData);
                            if (attachment)
                                skin.setAttachment(slot.index, entryName, attachment);
                        }
                    }
                    skeletonData.skins.push(skin);
                    if (skin.name == "default")
                        skeletonData.defaultSkin = skin;
                }
            }
            // Linked meshes.
            for (var i = 0, n = this.linkedMeshes.length; i < n; i++) {
                var linkedMesh = this.linkedMeshes[i];
                var skin = !linkedMesh.skin ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                if (!skin)
                    throw new Error("Skin not found: " + linkedMesh.skin);
                var parent_2 = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                if (!parent_2)
                    throw new Error("Parent mesh not found: " + linkedMesh.parent);
                linkedMesh.mesh.timelineAttachment = linkedMesh.inheritTimeline ? parent_2 : linkedMesh.mesh;
                linkedMesh.mesh.setParentMesh(parent_2);
                // if (linkedMesh.mesh.region != null) linkedMesh.mesh.updateRegion();
            }
            this.linkedMeshes.length = 0;
            // Events.
            if (root.events) {
                for (var eventName in root.events) {
                    var eventMap = root.events[eventName];
                    var data = new EventData(eventName);
                    data.intValue = getValue(eventMap, "int", 0);
                    data.floatValue = getValue(eventMap, "float", 0);
                    data.stringValue = getValue(eventMap, "string", "");
                    data.audioPath = getValue(eventMap, "audio", null);
                    if (data.audioPath) {
                        data.volume = getValue(eventMap, "volume", 1);
                        data.balance = getValue(eventMap, "balance", 0);
                    }
                    skeletonData.events.push(data);
                }
            }
            // Animations.
            if (root.animations) {
                for (var animationName in root.animations) {
                    var animationMap = root.animations[animationName];
                    this.readAnimation(animationMap, animationName, skeletonData);
                }
            }
            return skeletonData;
        };
        SkeletonJson.prototype.readAttachment = function (map, skin, slotIndex, name, skeletonData) {
            var scale = this.scale;
            name = getValue(map, "name", name);
            switch (getValue(map, "type", "region")) {
                case "region": {
                    var path = getValue(map, "path", name);
                    var sequence = this.readSequence(getValue(map, "sequence", null));
                    var region = this.attachmentLoader.newRegionAttachment(skin, name, path, sequence);
                    if (!region)
                        return null;
                    region.path = path;
                    region.x = getValue(map, "x", 0) * scale;
                    region.y = getValue(map, "y", 0) * scale;
                    region.scaleX = getValue(map, "scaleX", 1);
                    region.scaleY = getValue(map, "scaleY", 1);
                    region.rotation = getValue(map, "rotation", 0);
                    region.width = map.width * scale;
                    region.height = map.height * scale;
                    region.sequence = sequence;
                    var color = getValue(map, "color", null);
                    if (color)
                        region.color.setFromString(color);
                    // if (region.region != null) region.updateRegion();
                    return region;
                }
                case "boundingbox": {
                    var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                    if (!box)
                        return null;
                    this.readVertices(map, box, map.vertexCount << 1);
                    var color = getValue(map, "color", null);
                    if (color)
                        box.color.setFromString(color);
                    return box;
                }
                case "mesh":
                case "linkedmesh": {
                    var path = getValue(map, "path", name);
                    var sequence = this.readSequence(getValue(map, "sequence", null));
                    var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path, sequence);
                    if (!mesh)
                        return null;
                    mesh.path = path;
                    var color = getValue(map, "color", null);
                    if (color)
                        mesh.color.setFromString(color);
                    mesh.width = getValue(map, "width", 0) * scale;
                    mesh.height = getValue(map, "height", 0) * scale;
                    mesh.sequence = sequence;
                    var parent_3 = getValue(map, "parent", null);
                    if (parent_3) {
                        this.linkedMeshes.push(new LinkedMesh(mesh, getValue(map, "skin", null), slotIndex, parent_3, getValue(map, "timelines", true)));
                        return mesh;
                    }
                    var uvs = map.uvs;
                    this.readVertices(map, mesh, uvs.length);
                    mesh.triangles = map.triangles;
                    mesh.regionUVs = new Float32Array(uvs);
                    // if (mesh.region != null) mesh.updateRegion();
                    mesh.edges = getValue(map, "edges", null);
                    mesh.hullLength = getValue(map, "hull", 0) * 2;
                    return mesh;
                }
                case "path": {
                    var path = this.attachmentLoader.newPathAttachment(skin, name);
                    if (!path)
                        return null;
                    path.closed = getValue(map, "closed", false);
                    path.constantSpeed = getValue(map, "constantSpeed", true);
                    var vertexCount = map.vertexCount;
                    this.readVertices(map, path, vertexCount << 1);
                    var lengths = Utils.newArray(vertexCount / 3, 0);
                    for (var i = 0; i < map.lengths.length; i++)
                        lengths[i] = map.lengths[i] * scale;
                    path.lengths = lengths;
                    var color = getValue(map, "color", null);
                    if (color)
                        path.color.setFromString(color);
                    return path;
                }
                case "point": {
                    var point = this.attachmentLoader.newPointAttachment(skin, name);
                    if (!point)
                        return null;
                    point.x = getValue(map, "x", 0) * scale;
                    point.y = getValue(map, "y", 0) * scale;
                    point.rotation = getValue(map, "rotation", 0);
                    var color = getValue(map, "color", null);
                    if (color)
                        point.color.setFromString(color);
                    return point;
                }
                case "clipping": {
                    var clip = this.attachmentLoader.newClippingAttachment(skin, name);
                    if (!clip)
                        return null;
                    var end = getValue(map, "end", null);
                    if (end != null) {
                        var slot = skeletonData.findSlot(end);
                        if (slot == null)
                            throw new Error("Clipping end slot not found: " + end);
                        clip.endSlot = slot;
                    }
                    var vertexCount = map.vertexCount;
                    this.readVertices(map, clip, vertexCount << 1);
                    var color = getValue(map, "color", null);
                    if (color)
                        clip.color.setFromString(color);
                    return clip;
                }
            }
            return null;
        };
        SkeletonJson.prototype.readSequence = function (map) {
            if (map == null)
                return null;
            var sequence = new Sequence(getValue(map, "count", 0));
            sequence.start = getValue(map, "start", 1);
            sequence.digits = getValue(map, "digits", 0);
            sequence.setupIndex = getValue(map, "setup", 0);
            return sequence;
        };
        SkeletonJson.prototype.readVertices = function (map, attachment, verticesLength) {
            var scale = this.scale;
            attachment.worldVerticesLength = verticesLength;
            var vertices = map.vertices;
            if (verticesLength == vertices.length) {
                var scaledVertices = Utils.toFloatArray(vertices);
                if (scale != 1) {
                    for (var i = 0, n = vertices.length; i < n; i++)
                        scaledVertices[i] *= scale;
                }
                attachment.vertices = scaledVertices;
                return;
            }
            var weights = new Array();
            var bones = new Array();
            for (var i = 0, n = vertices.length; i < n;) {
                var boneCount = vertices[i++];
                bones.push(boneCount);
                for (var nn = i + boneCount * 4; i < nn; i += 4) {
                    bones.push(vertices[i]);
                    weights.push(vertices[i + 1] * scale);
                    weights.push(vertices[i + 2] * scale);
                    weights.push(vertices[i + 3]);
                }
            }
            attachment.bones = bones;
            attachment.vertices = Utils.toFloatArray(weights);
        };
        SkeletonJson.prototype.readAnimation = function (map, name, skeletonData) {
            var scale = this.scale;
            var timelines = new Array();
            // Slot timelines.
            if (map.slots) {
                for (var slotName in map.slots) {
                    var slotMap = map.slots[slotName];
                    var slot = skeletonData.findSlot(slotName);
                    if (!slot)
                        throw new Error("Slot not found: " + slotName);
                    var slotIndex = slot.index;
                    for (var timelineName in slotMap) {
                        var timelineMap = slotMap[timelineName];
                        if (!timelineMap)
                            continue;
                        var frames_1 = timelineMap.length;
                        if (timelineName == "attachment") {
                            var timeline = new AttachmentTimeline(frames_1, slotIndex);
                            for (var frame = 0; frame < frames_1; frame++) {
                                var keyMap = timelineMap[frame];
                                timeline.setFrame(frame, getValue(keyMap, "time", 0), getValue(keyMap, "name", null));
                            }
                            timelines.push(timeline);
                        }
                        else if (timelineName == "rgba") {
                            var timeline = new RGBATimeline(frames_1, frames_1 << 2, slotIndex);
                            var keyMap = timelineMap[0];
                            var time = getValue(keyMap, "time", 0);
                            var color = Color.fromString(keyMap.color);
                            for (var frame = 0, bezier = 0;; frame++) {
                                timeline.setFrame(frame, time, color.r, color.g, color.b, color.a);
                                var nextMap = timelineMap[frame + 1];
                                if (!nextMap) {
                                    timeline.shrink(bezier);
                                    break;
                                }
                                var time2 = getValue(nextMap, "time", 0);
                                var newColor = Color.fromString(nextMap.color);
                                var curve = keyMap.curve;
                                if (curve) {
                                    bezier = readCurve(curve, timeline, bezier, frame, 0, time, time2, color.r, newColor.r, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 1, time, time2, color.g, newColor.g, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 2, time, time2, color.b, newColor.b, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 3, time, time2, color.a, newColor.a, 1);
                                }
                                time = time2;
                                color = newColor;
                                keyMap = nextMap;
                            }
                            timelines.push(timeline);
                        }
                        else if (timelineName == "rgb") {
                            var timeline = new RGBTimeline(frames_1, frames_1 * 3, slotIndex);
                            var keyMap = timelineMap[0];
                            var time = getValue(keyMap, "time", 0);
                            var color = Color.fromString(keyMap.color);
                            for (var frame = 0, bezier = 0;; frame++) {
                                timeline.setFrame(frame, time, color.r, color.g, color.b);
                                var nextMap = timelineMap[frame + 1];
                                if (!nextMap) {
                                    timeline.shrink(bezier);
                                    break;
                                }
                                var time2 = getValue(nextMap, "time", 0);
                                var newColor = Color.fromString(nextMap.color);
                                var curve = keyMap.curve;
                                if (curve) {
                                    bezier = readCurve(curve, timeline, bezier, frame, 0, time, time2, color.r, newColor.r, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 1, time, time2, color.g, newColor.g, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 2, time, time2, color.b, newColor.b, 1);
                                }
                                time = time2;
                                color = newColor;
                                keyMap = nextMap;
                            }
                            timelines.push(timeline);
                        }
                        else if (timelineName == "alpha") {
                            timelines.push(readTimeline1(timelineMap, new AlphaTimeline(frames_1, frames_1, slotIndex), 0, 1));
                        }
                        else if (timelineName == "rgba2") {
                            var timeline = new RGBA2Timeline(frames_1, frames_1 * 7, slotIndex);
                            var keyMap = timelineMap[0];
                            var time = getValue(keyMap, "time", 0);
                            var color = Color.fromString(keyMap.light);
                            var color2 = Color.fromString(keyMap.dark);
                            for (var frame = 0, bezier = 0;; frame++) {
                                timeline.setFrame(frame, time, color.r, color.g, color.b, color.a, color2.r, color2.g, color2.b);
                                var nextMap = timelineMap[frame + 1];
                                if (!nextMap) {
                                    timeline.shrink(bezier);
                                    break;
                                }
                                var time2 = getValue(nextMap, "time", 0);
                                var newColor = Color.fromString(nextMap.light);
                                var newColor2 = Color.fromString(nextMap.dark);
                                var curve = keyMap.curve;
                                if (curve) {
                                    bezier = readCurve(curve, timeline, bezier, frame, 0, time, time2, color.r, newColor.r, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 1, time, time2, color.g, newColor.g, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 2, time, time2, color.b, newColor.b, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 3, time, time2, color.a, newColor.a, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 4, time, time2, color2.r, newColor2.r, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 5, time, time2, color2.g, newColor2.g, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 6, time, time2, color2.b, newColor2.b, 1);
                                }
                                time = time2;
                                color = newColor;
                                color2 = newColor2;
                                keyMap = nextMap;
                            }
                            timelines.push(timeline);
                        }
                        else if (timelineName == "rgb2") {
                            var timeline = new RGB2Timeline(frames_1, frames_1 * 6, slotIndex);
                            var keyMap = timelineMap[0];
                            var time = getValue(keyMap, "time", 0);
                            var color = Color.fromString(keyMap.light);
                            var color2 = Color.fromString(keyMap.dark);
                            for (var frame = 0, bezier = 0;; frame++) {
                                timeline.setFrame(frame, time, color.r, color.g, color.b, color2.r, color2.g, color2.b);
                                var nextMap = timelineMap[frame + 1];
                                if (!nextMap) {
                                    timeline.shrink(bezier);
                                    break;
                                }
                                var time2 = getValue(nextMap, "time", 0);
                                var newColor = Color.fromString(nextMap.light);
                                var newColor2 = Color.fromString(nextMap.dark);
                                var curve = keyMap.curve;
                                if (curve) {
                                    bezier = readCurve(curve, timeline, bezier, frame, 0, time, time2, color.r, newColor.r, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 1, time, time2, color.g, newColor.g, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 2, time, time2, color.b, newColor.b, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 3, time, time2, color2.r, newColor2.r, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 4, time, time2, color2.g, newColor2.g, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 5, time, time2, color2.b, newColor2.b, 1);
                                }
                                time = time2;
                                color = newColor;
                                color2 = newColor2;
                                keyMap = nextMap;
                            }
                            timelines.push(timeline);
                        }
                    }
                }
            }
            // Bone timelines.
            if (map.bones) {
                for (var boneName in map.bones) {
                    var boneMap = map.bones[boneName];
                    var bone = skeletonData.findBone(boneName);
                    if (!bone)
                        throw new Error("Bone not found: " + boneName);
                    var boneIndex = bone.index;
                    for (var timelineName in boneMap) {
                        var timelineMap = boneMap[timelineName];
                        var frames_2 = timelineMap.length;
                        if (frames_2 == 0)
                            continue;
                        if (timelineName === "rotate") {
                            timelines.push(readTimeline1(timelineMap, new RotateTimeline(frames_2, frames_2, boneIndex), 0, 1));
                        }
                        else if (timelineName === "translate") {
                            var timeline = new TranslateTimeline(frames_2, frames_2 << 1, boneIndex);
                            timelines.push(readTimeline2(timelineMap, timeline, "x", "y", 0, scale));
                        }
                        else if (timelineName === "translatex") {
                            var timeline = new TranslateXTimeline(frames_2, frames_2, boneIndex);
                            timelines.push(readTimeline1(timelineMap, timeline, 0, scale));
                        }
                        else if (timelineName === "translatey") {
                            var timeline = new TranslateYTimeline(frames_2, frames_2, boneIndex);
                            timelines.push(readTimeline1(timelineMap, timeline, 0, scale));
                        }
                        else if (timelineName === "scale") {
                            var timeline = new ScaleTimeline(frames_2, frames_2 << 1, boneIndex);
                            timelines.push(readTimeline2(timelineMap, timeline, "x", "y", 1, 1));
                        }
                        else if (timelineName === "scalex") {
                            var timeline = new ScaleXTimeline(frames_2, frames_2, boneIndex);
                            timelines.push(readTimeline1(timelineMap, timeline, 1, 1));
                        }
                        else if (timelineName === "scaley") {
                            var timeline = new ScaleYTimeline(frames_2, frames_2, boneIndex);
                            timelines.push(readTimeline1(timelineMap, timeline, 1, 1));
                        }
                        else if (timelineName === "shear") {
                            var timeline = new ShearTimeline(frames_2, frames_2 << 1, boneIndex);
                            timelines.push(readTimeline2(timelineMap, timeline, "x", "y", 0, 1));
                        }
                        else if (timelineName === "shearx") {
                            var timeline = new ShearXTimeline(frames_2, frames_2, boneIndex);
                            timelines.push(readTimeline1(timelineMap, timeline, 0, 1));
                        }
                        else if (timelineName === "sheary") {
                            var timeline = new ShearYTimeline(frames_2, frames_2, boneIndex);
                            timelines.push(readTimeline1(timelineMap, timeline, 0, 1));
                        }
                    }
                }
            }
            // IK constraint timelines.
            if (map.ik) {
                for (var constraintName in map.ik) {
                    var constraintMap = map.ik[constraintName];
                    var keyMap = constraintMap[0];
                    if (!keyMap)
                        continue;
                    var constraint = skeletonData.findIkConstraint(constraintName);
                    if (!constraint)
                        throw new Error("IK Constraint not found: " + constraintName);
                    var constraintIndex = skeletonData.ikConstraints.indexOf(constraint);
                    var timeline = new IkConstraintTimeline(constraintMap.length, constraintMap.length << 1, constraintIndex);
                    var time = getValue(keyMap, "time", 0);
                    var mix = getValue(keyMap, "mix", 1);
                    var softness = getValue(keyMap, "softness", 0) * scale;
                    for (var frame = 0, bezier = 0;; frame++) {
                        timeline.setFrame(frame, time, mix, softness, getValue(keyMap, "bendPositive", true) ? 1 : -1, getValue(keyMap, "compress", false), getValue(keyMap, "stretch", false));
                        var nextMap = constraintMap[frame + 1];
                        if (!nextMap) {
                            timeline.shrink(bezier);
                            break;
                        }
                        var time2 = getValue(nextMap, "time", 0);
                        var mix2 = getValue(nextMap, "mix", 1);
                        var softness2 = getValue(nextMap, "softness", 0) * scale;
                        var curve = keyMap.curve;
                        if (curve) {
                            bezier = readCurve(curve, timeline, bezier, frame, 0, time, time2, mix, mix2, 1);
                            bezier = readCurve(curve, timeline, bezier, frame, 1, time, time2, softness, softness2, scale);
                        }
                        time = time2;
                        mix = mix2;
                        softness = softness2;
                        keyMap = nextMap;
                    }
                    timelines.push(timeline);
                }
            }
            // Transform constraint timelines.
            if (map.transform) {
                for (var constraintName in map.transform) {
                    var timelineMap = map.transform[constraintName];
                    var keyMap = timelineMap[0];
                    if (!keyMap)
                        continue;
                    var constraint = skeletonData.findTransformConstraint(constraintName);
                    if (!constraint)
                        throw new Error("Transform constraint not found: " + constraintName);
                    var constraintIndex = skeletonData.transformConstraints.indexOf(constraint);
                    var timeline = new TransformConstraintTimeline(timelineMap.length, timelineMap.length * 6, constraintIndex);
                    var time = getValue(keyMap, "time", 0);
                    var mixRotate = getValue(keyMap, "mixRotate", 1);
                    var mixX = getValue(keyMap, "mixX", 1);
                    var mixY = getValue(keyMap, "mixY", mixX);
                    var mixScaleX = getValue(keyMap, "mixScaleX", 1);
                    var mixScaleY = getValue(keyMap, "mixScaleY", mixScaleX);
                    var mixShearY = getValue(keyMap, "mixShearY", 1);
                    for (var frame = 0, bezier = 0;; frame++) {
                        timeline.setFrame(frame, time, mixRotate, mixX, mixY, mixScaleX, mixScaleY, mixShearY);
                        var nextMap = timelineMap[frame + 1];
                        if (!nextMap) {
                            timeline.shrink(bezier);
                            break;
                        }
                        var time2 = getValue(nextMap, "time", 0);
                        var mixRotate2 = getValue(nextMap, "mixRotate", 1);
                        var mixX2 = getValue(nextMap, "mixX", 1);
                        var mixY2 = getValue(nextMap, "mixY", mixX2);
                        var mixScaleX2 = getValue(nextMap, "mixScaleX", 1);
                        var mixScaleY2 = getValue(nextMap, "mixScaleY", mixScaleX2);
                        var mixShearY2 = getValue(nextMap, "mixShearY", 1);
                        var curve = keyMap.curve;
                        if (curve) {
                            bezier = readCurve(curve, timeline, bezier, frame, 0, time, time2, mixRotate, mixRotate2, 1);
                            bezier = readCurve(curve, timeline, bezier, frame, 1, time, time2, mixX, mixX2, 1);
                            bezier = readCurve(curve, timeline, bezier, frame, 2, time, time2, mixY, mixY2, 1);
                            bezier = readCurve(curve, timeline, bezier, frame, 3, time, time2, mixScaleX, mixScaleX2, 1);
                            bezier = readCurve(curve, timeline, bezier, frame, 4, time, time2, mixScaleY, mixScaleY2, 1);
                            bezier = readCurve(curve, timeline, bezier, frame, 5, time, time2, mixShearY, mixShearY2, 1);
                        }
                        time = time2;
                        mixRotate = mixRotate2;
                        mixX = mixX2;
                        mixY = mixY2;
                        mixScaleX = mixScaleX2;
                        mixScaleY = mixScaleY2;
                        mixScaleX = mixScaleX2;
                        keyMap = nextMap;
                    }
                    timelines.push(timeline);
                }
            }
            // Path constraint timelines.
            if (map.path) {
                for (var constraintName in map.path) {
                    var constraintMap = map.path[constraintName];
                    var constraint = skeletonData.findPathConstraint(constraintName);
                    if (!constraint)
                        throw new Error("Path constraint not found: " + constraintName);
                    var constraintIndex = skeletonData.pathConstraints.indexOf(constraint);
                    for (var timelineName in constraintMap) {
                        var timelineMap = constraintMap[timelineName];
                        var keyMap = timelineMap[0];
                        if (!keyMap)
                            continue;
                        var frames_3 = timelineMap.length;
                        if (timelineName === "position") {
                            var timeline = new PathConstraintPositionTimeline(frames_3, frames_3, constraintIndex);
                            timelines.push(readTimeline1(timelineMap, timeline, 0, constraint.positionMode == exports.PositionMode.Fixed ? scale : 1));
                        }
                        else if (timelineName === "spacing") {
                            var timeline = new PathConstraintSpacingTimeline(frames_3, frames_3, constraintIndex);
                            timelines.push(readTimeline1(timelineMap, timeline, 0, constraint.spacingMode == exports.SpacingMode.Length || constraint.spacingMode == exports.SpacingMode.Fixed ? scale : 1));
                        }
                        else if (timelineName === "mix") {
                            var timeline = new PathConstraintMixTimeline(frames_3, frames_3 * 3, constraintIndex);
                            var time = getValue(keyMap, "time", 0);
                            var mixRotate = getValue(keyMap, "mixRotate", 1);
                            var mixX = getValue(keyMap, "mixX", 1);
                            var mixY = getValue(keyMap, "mixY", mixX);
                            for (var frame = 0, bezier = 0;; frame++) {
                                timeline.setFrame(frame, time, mixRotate, mixX, mixY);
                                var nextMap = timelineMap[frame + 1];
                                if (!nextMap) {
                                    timeline.shrink(bezier);
                                    break;
                                }
                                var time2 = getValue(nextMap, "time", 0);
                                var mixRotate2 = getValue(nextMap, "mixRotate", 1);
                                var mixX2 = getValue(nextMap, "mixX", 1);
                                var mixY2 = getValue(nextMap, "mixY", mixX2);
                                var curve = keyMap.curve;
                                if (curve) {
                                    bezier = readCurve(curve, timeline, bezier, frame, 0, time, time2, mixRotate, mixRotate2, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 1, time, time2, mixX, mixX2, 1);
                                    bezier = readCurve(curve, timeline, bezier, frame, 2, time, time2, mixY, mixY2, 1);
                                }
                                time = time2;
                                mixRotate = mixRotate2;
                                mixX = mixX2;
                                mixY = mixY2;
                                keyMap = nextMap;
                            }
                            timelines.push(timeline);
                        }
                    }
                }
            }
            // ver40 compatibility
            if (map.deform) {
                map.attachments = {};
                for (var deformName in map.deform) {
                    var deformMap = map.deform[deformName];
                    var outMap = map.attachments[deformName] = {};
                    for (var slotName in deformMap) {
                        var slotMap = deformMap[slotName];
                        var outMap2 = outMap[slotName] = {};
                        for (var innerMapName in slotMap) {
                            outMap2[innerMapName] = {
                                deform: slotMap[innerMapName]
                            };
                        }
                    }
                }
            }
            // Attachment timelines.
            if (map.attachments) {
                for (var attachmentsName in map.attachments) {
                    var attachmentsMap = map.attachments[attachmentsName];
                    var skin = skeletonData.findSkin(attachmentsName);
                    if (skin == null) {
                        if (settings.FAIL_ON_NON_EXISTING_SKIN) {
                            throw new Error("Skin not found: " + attachmentsName);
                        }
                        else {
                            continue;
                        }
                    }
                    for (var slotMapName in attachmentsMap) {
                        var slotMap = attachmentsMap[slotMapName];
                        var slot = skeletonData.findSlot(slotMapName);
                        if (!slot)
                            throw new Error("Slot not found: " + slotMapName);
                        var slotIndex = slot.index;
                        for (var attachmentMapName in slotMap) {
                            var attachmentMap = slotMap[attachmentMapName];
                            var attachment = skin.getAttachment(slotIndex, attachmentMapName);
                            for (var timelineMapName in attachmentMap) {
                                var timelineMap = attachmentMap[timelineMapName];
                                var keyMap = timelineMap[0];
                                if (!keyMap)
                                    continue;
                                if (timelineMapName == "deform") {
                                    var weighted = attachment.bones;
                                    var vertices = attachment.vertices;
                                    var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                                    var timeline = new DeformTimeline(timelineMap.length, timelineMap.length, slotIndex, attachment);
                                    var time = getValue(keyMap, "time", 0);
                                    for (var frame = 0, bezier = 0;; frame++) {
                                        var deform = void 0;
                                        var verticesValue = getValue(keyMap, "vertices", null);
                                        if (!verticesValue)
                                            deform = weighted ? Utils.newFloatArray(deformLength) : vertices;
                                        else {
                                            deform = Utils.newFloatArray(deformLength);
                                            var start = getValue(keyMap, "offset", 0);
                                            Utils.arrayCopy(verticesValue, 0, deform, start, verticesValue.length);
                                            if (scale != 1) {
                                                for (var i = start, n = i + verticesValue.length; i < n; i++)
                                                    deform[i] *= scale;
                                            }
                                            if (!weighted) {
                                                for (var i = 0; i < deformLength; i++)
                                                    deform[i] += vertices[i];
                                            }
                                        }
                                        timeline.setFrame(frame, time, deform);
                                        var nextMap = timelineMap[frame + 1];
                                        if (!nextMap) {
                                            timeline.shrink(bezier);
                                            break;
                                        }
                                        var time2 = getValue(nextMap, "time", 0);
                                        var curve = keyMap.curve;
                                        if (curve)
                                            bezier = readCurve(curve, timeline, bezier, frame, 0, time, time2, 0, 1, 1);
                                        time = time2;
                                        keyMap = nextMap;
                                    }
                                    timelines.push(timeline);
                                }
                                else if (timelineMapName == "sequence") {
                                    var timeline = new SequenceTimeline(timelineMap.length, slotIndex, attachment);
                                    var lastDelay = 0;
                                    for (var frame = 0; frame < timelineMap.length; frame++) {
                                        var delay = getValue(keyMap, "delay", lastDelay);
                                        var time = getValue(keyMap, "time", 0);
                                        var mode = exports.SequenceMode[getValue(keyMap, "mode", "hold")];
                                        var index = getValue(keyMap, "index", 0);
                                        timeline.setFrame(frame, time, mode, index, delay);
                                        lastDelay = delay;
                                        keyMap = timelineMap[frame + 1];
                                    }
                                    timelines.push(timeline);
                                }
                            }
                        }
                    }
                }
            }
            // Draw order timelines.
            if (map.drawOrder) {
                var timeline = new DrawOrderTimeline(map.drawOrder.length);
                var slotCount = skeletonData.slots.length;
                var frame = 0;
                for (var i = 0; i < map.drawOrder.length; i++, frame++) {
                    var drawOrderMap = map.drawOrder[i];
                    var drawOrder = null;
                    var offsets = getValue(drawOrderMap, "offsets", null);
                    if (offsets) {
                        drawOrder = Utils.newArray(slotCount, -1);
                        var unchanged = Utils.newArray(slotCount - offsets.length, 0);
                        var originalIndex = 0, unchangedIndex = 0;
                        for (var ii = 0; ii < offsets.length; ii++) {
                            var offsetMap = offsets[ii];
                            var slot = skeletonData.findSlot(offsetMap.slot);
                            if (!slot)
                                throw new Error("Slot not found: " + slot);
                            var slotIndex = slot.index;
                            // Collect unchanged items.
                            while (originalIndex != slotIndex)
                                unchanged[unchangedIndex++] = originalIndex++;
                            // Set changed items.
                            drawOrder[originalIndex + offsetMap.offset] = originalIndex++;
                        }
                        // Collect remaining unchanged items.
                        while (originalIndex < slotCount)
                            unchanged[unchangedIndex++] = originalIndex++;
                        // Fill in unchanged items.
                        for (var ii = slotCount - 1; ii >= 0; ii--)
                            if (drawOrder[ii] == -1)
                                drawOrder[ii] = unchanged[--unchangedIndex];
                    }
                    timeline.setFrame(frame, getValue(drawOrderMap, "time", 0), drawOrder);
                }
                timelines.push(timeline);
            }
            // Event timelines.
            if (map.events) {
                var timeline = new EventTimeline(map.events.length);
                var frame = 0;
                for (var i = 0; i < map.events.length; i++, frame++) {
                    var eventMap = map.events[i];
                    var eventData = skeletonData.findEvent(eventMap.name);
                    if (!eventData)
                        throw new Error("Event not found: " + eventMap.name);
                    var event_1 = new Event(Utils.toSinglePrecision(getValue(eventMap, "time", 0)), eventData);
                    event_1.intValue = getValue(eventMap, "int", eventData.intValue);
                    event_1.floatValue = getValue(eventMap, "float", eventData.floatValue);
                    event_1.stringValue = getValue(eventMap, "string", eventData.stringValue);
                    if (event_1.data.audioPath) {
                        event_1.volume = getValue(eventMap, "volume", 1);
                        event_1.balance = getValue(eventMap, "balance", 0);
                    }
                    timeline.setFrame(frame, event_1);
                }
                timelines.push(timeline);
            }
            var duration = 0;
            for (var i = 0, n = timelines.length; i < n; i++)
                duration = Math.max(duration, timelines[i].getDuration());
            if (isNaN(duration)) {
                throw new Error("Error while parsing animation, duration is NaN");
            }
            skeletonData.animations.push(new Animation(name, timelines, duration));
        };
        SkeletonJson.blendModeFromString = function (str) {
            str = str.toLowerCase();
            if (str == "normal")
                return constants.BLEND_MODES.NORMAL;
            if (str == "additive")
                return constants.BLEND_MODES.ADD;
            if (str == "multiply")
                return constants.BLEND_MODES.MULTIPLY;
            if (str == "screen")
                return constants.BLEND_MODES.SCREEN;
            throw new Error("Unknown blend mode: " + str);
        };
        return SkeletonJson;
    }());
    var LinkedMesh = /** @class */ (function () {
        function LinkedMesh(mesh, skin, slotIndex, parent, inheritDeform) {
            this.mesh = mesh;
            this.skin = skin;
            this.slotIndex = slotIndex;
            this.parent = parent;
            this.inheritTimeline = inheritDeform;
        }
        return LinkedMesh;
    }());
    function readTimeline1(keys, timeline, defaultValue, scale) {
        var keyMap = keys[0];
        var time = getValue(keyMap, "time", 0);
        var value = getValue(keyMap, "value", defaultValue) * scale;
        var bezier = 0;
        for (var frame = 0;; frame++) {
            timeline.setFrame(frame, time, value);
            var nextMap = keys[frame + 1];
            if (!nextMap) {
                timeline.shrink(bezier);
                return timeline;
            }
            var time2 = getValue(nextMap, "time", 0);
            var value2 = getValue(nextMap, "value", defaultValue) * scale;
            if (keyMap.curve)
                bezier = readCurve(keyMap.curve, timeline, bezier, frame, 0, time, time2, value, value2, scale);
            time = time2;
            value = value2;
            keyMap = nextMap;
        }
    }
    function readTimeline2(keys, timeline, name1, name2, defaultValue, scale) {
        var keyMap = keys[0];
        var time = getValue(keyMap, "time", 0);
        var value1 = getValue(keyMap, name1, defaultValue) * scale;
        var value2 = getValue(keyMap, name2, defaultValue) * scale;
        var bezier = 0;
        for (var frame = 0;; frame++) {
            timeline.setFrame(frame, time, value1, value2);
            var nextMap = keys[frame + 1];
            if (!nextMap) {
                timeline.shrink(bezier);
                return timeline;
            }
            var time2 = getValue(nextMap, "time", 0);
            var nvalue1 = getValue(nextMap, name1, defaultValue) * scale;
            var nvalue2 = getValue(nextMap, name2, defaultValue) * scale;
            var curve = keyMap.curve;
            if (curve) {
                bezier = readCurve(curve, timeline, bezier, frame, 0, time, time2, value1, nvalue1, scale);
                bezier = readCurve(curve, timeline, bezier, frame, 1, time, time2, value2, nvalue2, scale);
            }
            time = time2;
            value1 = nvalue1;
            value2 = nvalue2;
            keyMap = nextMap;
        }
    }
    function readCurve(curve, timeline, bezier, frame, value, time1, time2, value1, value2, scale) {
        if (curve == "stepped") {
            timeline.setStepped(frame);
            return bezier;
        }
        var i = value << 2;
        var cx1 = curve[i];
        var cy1 = curve[i + 1] * scale;
        var cx2 = curve[i + 2];
        var cy2 = curve[i + 3] * scale;
        timeline.setBezier(bezier, frame, value, time1, value1, cx1, cy1, cx2, cy2, time2, value2);
        return bezier + 1;
    }
    function getValue(map, property, defaultValue) {
        return map[property] !== undefined ? map[property] : defaultValue;
    }

    /**
     * @public
     */
    var Spine = /** @class */ (function (_super) {
        __extends$1(Spine, _super);
        function Spine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Spine.prototype.createSkeleton = function (spineData) {
            this.skeleton = new Skeleton(spineData);
            this.skeleton.updateWorldTransform();
            this.stateData = new AnimationStateData(spineData);
            this.state = new AnimationState(this.stateData);
        };
        return Spine;
    }(SpineBase));

    /* eslint-disable */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @public
     */
    var SpineParser = /** @class */ (function (_super) {
        __extends(SpineParser, _super);
        function SpineParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpineParser.prototype.createBinaryParser = function () {
            return new SkeletonBinary(null);
        };
        SpineParser.prototype.createJsonParser = function () {
            return new SkeletonJson(null);
        };
        SpineParser.prototype.parseData = function (resource, parser, atlas, dataToParse) {
            var parserCast = parser;
            parserCast.attachmentLoader = new AtlasAttachmentLoader(atlas);
            resource.spineData = parserCast.readSkeletonData(dataToParse);
            resource.spineAtlas = atlas;
        };
        SpineParser.registerLoaderPlugin = function () {
            loaders.Loader.registerPlugin(SpineParser);
        };
        SpineParser.use = new SpineParser().genMiddleware().use;
        return SpineParser;
    }(AbstractSpineParser));

    SpineParser.registerLoaderPlugin();

    exports.AlphaTimeline = AlphaTimeline;
    exports.Animation = Animation;
    exports.AnimationState = AnimationState;
    exports.AnimationStateAdapter = AnimationStateAdapter;
    exports.AnimationStateData = AnimationStateData;
    exports.AtlasAttachmentLoader = AtlasAttachmentLoader;
    exports.Attachment = Attachment;
    exports.AttachmentTimeline = AttachmentTimeline;
    exports.BinaryInput = BinaryInput;
    exports.Bone = Bone;
    exports.BoneData = BoneData;
    exports.BoundingBoxAttachment = BoundingBoxAttachment;
    exports.ClippingAttachment = ClippingAttachment;
    exports.Color = Color;
    exports.ConstraintData = ConstraintData;
    exports.CurveTimeline = CurveTimeline;
    exports.CurveTimeline1 = CurveTimeline1;
    exports.CurveTimeline2 = CurveTimeline2;
    exports.DebugUtils = DebugUtils;
    exports.DeformTimeline = DeformTimeline;
    exports.DrawOrderTimeline = DrawOrderTimeline;
    exports.Event = Event;
    exports.EventData = EventData;
    exports.EventQueue = EventQueue;
    exports.EventTimeline = EventTimeline;
    exports.IkConstraint = IkConstraint;
    exports.IkConstraintData = IkConstraintData;
    exports.IkConstraintTimeline = IkConstraintTimeline;
    exports.IntSet = IntSet;
    exports.Interpolation = Interpolation;
    exports.MathUtils = MathUtils;
    exports.MeshAttachment = MeshAttachment;
    exports.PathAttachment = PathAttachment;
    exports.PathConstraint = PathConstraint;
    exports.PathConstraintData = PathConstraintData;
    exports.PathConstraintMixTimeline = PathConstraintMixTimeline;
    exports.PathConstraintPositionTimeline = PathConstraintPositionTimeline;
    exports.PathConstraintSpacingTimeline = PathConstraintSpacingTimeline;
    exports.PointAttachment = PointAttachment;
    exports.Pool = Pool;
    exports.Pow = Pow;
    exports.PowOut = PowOut;
    exports.RGB2Timeline = RGB2Timeline;
    exports.RGBA2Timeline = RGBA2Timeline;
    exports.RGBATimeline = RGBATimeline;
    exports.RGBTimeline = RGBTimeline;
    exports.RegionAttachment = RegionAttachment;
    exports.RotateTimeline = RotateTimeline;
    exports.ScaleTimeline = ScaleTimeline;
    exports.ScaleXTimeline = ScaleXTimeline;
    exports.ScaleYTimeline = ScaleYTimeline;
    exports.Sequence = Sequence;
    exports.SequenceModeValues = SequenceModeValues;
    exports.SequenceTimeline = SequenceTimeline;
    exports.ShearTimeline = ShearTimeline;
    exports.ShearXTimeline = ShearXTimeline;
    exports.ShearYTimeline = ShearYTimeline;
    exports.Skeleton = Skeleton;
    exports.SkeletonBinary = SkeletonBinary;
    exports.SkeletonBounds = SkeletonBounds;
    exports.SkeletonBoundsBase = SkeletonBoundsBase;
    exports.SkeletonData = SkeletonData;
    exports.SkeletonJson = SkeletonJson;
    exports.Skin = Skin;
    exports.SkinEntry = SkinEntry;
    exports.Slot = Slot;
    exports.SlotData = SlotData;
    exports.Spine = Spine;
    exports.SpineBase = SpineBase;
    exports.SpineDebugRenderer = SpineDebugRenderer;
    exports.SpineMesh = SpineMesh;
    exports.SpineParser = SpineParser;
    exports.SpineSprite = SpineSprite;
    exports.StringSet = StringSet;
    exports.TextureAtlas = TextureAtlas;
    exports.TextureAtlasPage = TextureAtlasPage;
    exports.TextureAtlasRegion = TextureAtlasRegion;
    exports.TextureRegion = TextureRegion;
    exports.TimeKeeper = TimeKeeper;
    exports.Timeline = Timeline;
    exports.TrackEntry = TrackEntry;
    exports.TransformConstraint = TransformConstraint;
    exports.TransformConstraintData = TransformConstraintData;
    exports.TransformConstraintTimeline = TransformConstraintTimeline;
    exports.TranslateTimeline = TranslateTimeline;
    exports.TranslateXTimeline = TranslateXTimeline;
    exports.TranslateYTimeline = TranslateYTimeline;
    exports.Utils = Utils;
    exports.Vector2 = Vector2;
    exports.VertexAttachment = VertexAttachment;
    exports.WindowedMean = WindowedMean;
    exports.filterFromString = filterFromString;
    exports.settings = settings;
    exports.wrapFromString = wrapFromString;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
if (typeof _pixi_spine_all_ !== 'undefined') { Object.assign(this.PIXI.spine, _pixi_spine_all_); }
//# sourceMappingURL=pixi-spine-4.1.umd.js.map
