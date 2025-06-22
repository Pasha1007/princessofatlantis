const { src, dest, series, parallel, watch } = require("gulp");
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const version = require("gulp-version-number");
const browserSync = require("browser-sync").create();
const argv = require("yargs").argv;

let gConfig = require("./app/games/gamesConfig.json");

const network = argv.network || "dev";
const isAssets = argv.assets || false;
const isLobby = argv.lobby || false;
const buildPath = "../../build/slots/";
let gList = [];
let gamesList = [];

const versionConfig = {
  value: "%DT%",
  append: {
    key: "v",
    to: ["css", "js"],
  },
};

var vgLibList = [
  "app/libs/pixi/pixi.min.js",
  "app/libs/pixi/pixi-legacy.min.js",
  "app/libs/howler/howler.min.js",
  "app/libs/mediator/mediator.min.js",
  "app/libs/stats/stats.min.js",
  "app/libs/impetus/impetus.min.js",
  "app/libs/greensock/TweenMax.min.js",
  "app/libs/screenfull/screenfull.js",
  "app/libs/localeplanet/translate.js",
  "app/libs/currency/currency.min.js",
  "app/libs/fontfaceobserver/fontfaceobserver.standalone.js",
];

var vgCoreList = [
  "app/libs/pixi/PIXI.TextInput.js",
  "app/core/app/PIXIUtil.js",
  "app/core/app/CoreApp.js",
  "app/core/app/ViewInfoUtil.js",
  "app/core/app/ngFluid.js",
  "app/core/app/CoreEvents.js",
  "app/core/app/SoundLib.js",
  "app/core/models/CoreModel.js",
  "app/core/views/ViewContainer.js",
  "app/core/views/LoadingScreenView.js",
  "app/core/views/CoreView.js",
  "app/core/views/ErrorView.js",
  "app/core/views/CoreErrorView.js",
  "app/core/configs/CoreConfig.js",
  "app/core/controllers/CoreController.js",
  "app/core/controllers/LoadingScreenController.js",
  "app/core/controllers/ErrorController.js",
  "app/core/controllers/CoreErrorController.js",
  "app/core/services/CoreService.js",
];

var vgSlotList = [
  "app/slot/configs/SlotConfig.js",
  "app/slot/configs/SuperMeterConfig.js",
  "app/slot/views/SettingsView.js",
  "app/slot/views/PanelView.js",
  "app/slot/controllers/PanelController.js",
  "app/slot/configs/BGUiConfig.js",
  "app/slot/models/UserModel.js",
  "app/slot/models/SlotModel.js",
  "app/slot/models/PanelModel.js",
  "app/slot/models/SettingsModel.js",
  "app/slot/models/SpinData.js",
  "app/slot/models/GambleModel.js",
  "app/slot/models/AutoSpinModel.js",
  "app/slot/models/FreeSpinModel.js",
  "app/slot/models/PromoFreeSpinModel.js",
  "app/slot/models/FeatureModel.js",
  "app/slot/views/SlotView.js",
  "app/slot/services/DemoSlotService.js",
  "app/slot/views/BGView.js",
  "app/slot/controllers/BGController.js",
  "app/slot/views/components/ClockView.js",
  "app/slot/views/components/ReelStrip.js",
  "app/slot/views/components/WinSymbol.js",
  "app/slot/views/components/ReelSymbol.js",
  "app/slot/views/components/Slider.js",
  "app/slot/views/ReelView.js",
  "app/slot/controllers/ReelController.js",
  "app/slot/views/PaylineView.js",
  "app/slot/controllers/PaylineController.js",
  "app/slot/views/WinView.js",
  "app/slot/controllers/WinController.js",
  "app/slot/controllers/GambleController.js",
  "app/slot/views/BonusView.js",
  "app/slot/views/GambleView.js",
  "app/slot/controllers/BonusController.js",
  "app/slot/views/PaytableView.js",
  "app/slot/controllers/PaytableController.js",
  "app/slot/controllers/SlotController.js",
  "app/slot/controllers/SettingsController.js",
  "app/slot/controllers/TickerViewController.js",
  "app/slot/views/components/PanelValueField.js",
  "app/slot/views/components/PanelValueSelector.js",
  "app/slot/views/components/PanelBGStrip.js",
  "app/slot/views/components/InfoPopupView.js",
  "app/slot/app/SlotEvents.js",
  "app/slot/views/TickerBox.js",
  "app/slot/controllers/IntroController.js",
  "app/slot/views/IntroView.js",
  "app/slot/views/components/BigWinView.js",

  "app/slot/views/SuperMeterView.js",
  "app/slot/controllers/SuperMeterController.js",
  "app/games/common/src/models/CSpinData.js",
  "app/games/common/src/commonConfig.js",
];

var vgMobileAddonsList = [
  "app/slot/views/PaytableMobileView.js",
  "app/slot/views/PanelMobileView.js",
  "app/slot/views/SettingsMobileView.js",
  "app/slot/controllers/PanelMobileController.js",
  "app/slot/controllers/SettingsMobileController.js",
];

var vgDesktopAddonsList = [
  "app/slot/views/PaytableDesktopView.js",
  "app/slot/views/PanelDesktopView.js",
  "app/slot/views/SettingsDesktopView.js",
  "app/slot/controllers/PanelDesktopController.js",
  "app/slot/controllers/SettingsDesktopController.js",
];

function copyGameLauncher() {
  return src(["./gameLauncher.html", "main.js", "style.css"])
    .pipe(version(versionConfig))
    .pipe(dest(buildPath));
}

function copyPreloader() {
  return src(["./js/**/*"])
    .pipe(version(versionConfig))
    .pipe(dest(buildPath + "js/"));
}

function copyIndex() {
  return src(["./index.html"]).pipe(dest(buildPath + "../"));
}

function copyLobby() {
  return src([
    gConfig.gamePath + "lobby/**/*",
    "!" + gConfig.gamePath + "lobby/sourceAssets/**",
  ]).pipe(dest(buildPath + "../lobby"));
}

function copyLogs() {
  return src([
    gConfig.gamePath + "logs/**/*",
    "!" + gConfig.gamePath + "logs/sourceAssets/**",
  ]).pipe(dest(buildPath + "logs"));
}

function copyFavicon() {
  return src(gConfig.gamePath + "favicon.ico").pipe(dest(buildPath));
}

function copyCommon() {
  return src(gConfig.gamePath + "common/dist/**/*").pipe(
    dest(buildPath + "games/common/dist/")
  );
}

function copyCommonSrc() {
  return src([
    gConfig.gamePath + "common/src/**/*",
    "!" + gConfig.gamePath + "common/src/commonConfig.js",
  ]).pipe(dest(buildPath + "games/common/src/"));
}

function copyRules() {
  return src(gConfig.gamePath + "rules/**/*").pipe(
    dest(buildPath + "games/rules/")
  );
}

function copyAssets(gameName) {
  return src(gConfig.gamePath + gameName + "/dist/**/*").pipe(
    dest(buildPath + "games/" + gameName + "/dist/")
  );
}

// === JS BUILDERS ===

function vgLib() {
  return src(vgLibList)
    .pipe(concat("vgLib.js"))
    .pipe(minify())
    .pipe(dest(buildPath + "core/"));
}

function vgCore() {
  return src(vgCoreList)
    .pipe(concat("vgCore.js"))
    .pipe(minify())
    .pipe(dest(buildPath + "core/"));
}

function vgSlot() {
  return src(vgSlotList)
    .pipe(concat("vgSlot.js"))
    .pipe(minify())
    .pipe(dest(buildPath + "core/"));
}

function vgMobile() {
  return src(vgMobileAddonsList)
    .pipe(concat("vgMobileAddons.js"))
    .pipe(minify())
    .pipe(dest(buildPath + "core/"));
}

function vgDesktop() {
  return src(vgDesktopAddonsList)
    .pipe(concat("vgDesktopAddons.js"))
    .pipe(minify())
    .pipe(dest(buildPath + "core/"));
}

// === GAME BUILD LOGIC ===

function getGameFiles(gameName) {
  const ary = [
    gConfig.gamePath + gameName + "/src/configs/GameConfig.js",
    gConfig.gamePath + gameName + "/src/configs/LoadConfig.js",
    gConfig.gamePath + gameName + "/src/configs/PanelConfig.js",
    gConfig.gamePath + gameName + "/src/configs/UIConfig.js",
  ];
  const gameArr = gConfig.gameFiles[gameName].map(
    (file) => gConfig.gamePath + gameName + "/src/" + file
  );
  return ary.concat(gameArr);
}

function gameTask(gameName) {
  const gameFiles = getGameFiles(gameName);

  if (isAssets) {
    copyLogs();
    copyFavicon();
    copyCommon();
    copyCommonSrc();
    copyAssets(gameName);
  }
  if (isLobby) {
    copyLobby();
  }

  return (
    src(gameFiles)
      .pipe(concat("game.js"))
      // .pipe(babel({ presets: ['@babel/preset-env'] })) // опціонально
      .pipe(minify())
      .pipe(dest(buildPath + "games/" + gameName + "/"))
  );
}

function vgGames(done) {
  gConfig = JSON.parse(JSON.stringify(gConfig));
  gamesList = Object.keys(gConfig.gameFiles);
  gList = gList.concat(gamesList);

  const tasks = gamesList.map((name) => {
    return function runGame() {
      return gameTask(name);
    };
  });

  return series(...tasks, copyRules)(done);
}

// === BROWSER SYNC ===

function serve(done) {
  browserSync.init({ server: { baseDir: "../" } });
  watch("app/games/*/src/*/*.js").on("change", browserSync.reload);
  done();
}

// === INIT ===

function init(done) {
  console.log("isAssets = " + isAssets, "isLobby = " + isLobby);
  return series(copyIndex, copyGameLauncher, copyPreloader)(done);
}

// === MAIN BUILD ===

const build = series(
  init,
  parallel(vgLib, vgCore, vgSlot, vgDesktop, vgMobile, vgGames)
);

// === EXPORTS ===

exports.vgLib = vgLib;
exports.vgCore = vgCore;
exports.vgSlot = vgSlot;
exports.vgMobile = vgMobile;
exports.vgDesktop = vgDesktop;
exports.vgGames = vgGames;
exports.serve = serve;
exports.init = init;
exports.build = build;
exports.default = build;
