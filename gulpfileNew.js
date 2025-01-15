//need to remove network games list
var gulp = require("gulp"),
  concat = require("gulp-concat"),
  minify = require("gulp-minify"),
  // babel = require("gulp-babel");
  argv = require("yargs").argv;
//const timestamp = require('time-stamp');

var version = require('gulp-version-number');
var browserSync = require('browser-sync').create();

var gConfig = require("./app/games/gamesConfig.json");

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
  "app/libs/fontfaceobserver/fontfaceobserver.standalone.js"
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
  "app/core/services/CoreService.js"
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
  "app/games/common/src/commonConfig.js"
];

var vgMobileAddonsList = [
  "app/slot/views/PaytableMobileView.js",
  "app/slot/views/PanelMobileView.js",
  "app/slot/views/SettingsMobileView.js",
  "app/slot/controllers/PanelMobileController.js",
  "app/slot/controllers/SettingsMobileController.js"
];

var vgDesktopAddonsList = [
  "app/slot/views/PaytableDesktopView.js",
  "app/slot/views/PanelDesktopView.js",
  "app/slot/views/SettingsDesktopView.js",
  "app/slot/controllers/PanelDesktopController.js",
  "app/slot/controllers/SettingsDesktopController.js"
];

var network = argv.network || "dev";
var gameName = argv.gamename;
var isAssets = argv.assets || false;
var isLobby = argv.lobby || false;
var buildPath = "../slotBuild/";
var gList = [];

init = function () {
  console.log("isAssets = " + isAssets, "isLobby = " + isLobby);
  // buildPath = "../build/" + network + "/slots/";
  gConfig = JSON.parse(JSON.stringify(gConfig));
  gamesList = Object.keys(gConfig.gameFiles);
  gList = gList.concat(gamesList);

  //copyIndex();
  copyGameLauncher();
  copyPreloader();

};

const versionConfig = {
  'value': '%DT%',
  'append': {
    'key': 'v',
    'to': ['css', 'js'],
  },
};

copyGameLauncher = function () {
  return (
    gulp
      .src(["./gameLauncher.html", "main.js", "style.css"])
      .pipe(version(versionConfig))
      .pipe(gulp.dest(buildPath+"/"+gameName+"/"))
  );
}
copyPreloader = function () {
  return (
    gulp
      .src(["./js/**/*"])
      .pipe(version(versionConfig))
      .pipe(gulp.dest(buildPath +"/"+gameName+ "/js/"))
  );
}

copyIndex = function (gameName) {
  return (
    gulp
      .src(["./index.html"])
      .pipe(gulp.dest(buildPath + "../"))
  );
}

vgLib = function () {
  init();
  return gulp
    .src(vgLibList)
    .pipe(concat("vgLib.js"))
    .pipe(minify())
    .pipe(gulp.dest(buildPath +"/"+gameName+ "/core/"));
};

vgCore = function () {
  return (
    gulp
      .src(vgCoreList)
      .pipe(concat("vgCore.js"))
      .pipe(minify())
      .pipe(gulp.dest(buildPath +"/"+gameName+ "/core/"))
  );
};

vgSlot = function () {
  vgGames();
  return (
    gulp
      .src(vgSlotList)
      .pipe(concat("vgSlot.js"))
      .pipe(minify())
      .pipe(gulp.dest(buildPath +"/"+gameName+ "/core/"))
  );
};

vgDesktop = function () {
  return (
    gulp
      .src(vgDesktopAddonsList)
      .pipe(concat("vgDesktopAddons.js"))
      .pipe(minify())
      .pipe(gulp.dest(buildPath +"/"+gameName+ "/core/"))
  );
};

vgMobile = function () {
  return (
    gulp
      .src(vgMobileAddonsList)
      .pipe(concat("vgMobileAddons.js"))
      .pipe(minify())
      .pipe(gulp.dest(buildPath +"/"+gameName+ "/core/"))
  );
};

vgGames = function () {
  // gamesList.forEach(function (gameName) {
  //   return gameTask(gameName);
  // });

  gameTask(gameName);

  copyRules();
};

getGameFiles = function (gameName) {
  var ary = [
    gConfig.gamePath + gameName + "/src/configs/GameConfig.js",
    gConfig.gamePath + gameName + "/src/configs/LoadConfig.js",
    gConfig.gamePath + gameName + "/src/configs/PanelConfig.js",
    gConfig.gamePath + gameName + "/src/configs/UIConfig.js"
  ];
  var gameArr = gConfig.gameFiles[gameName];
  for (let i = 0; i < gameArr.length; i++) {
    gameArr[i] = gConfig.gamePath + gameName + "/src/" + gameArr[i];
  }
  ary = ary.concat(gameArr);
  return ary;
};

copyLobby = function () {
  return (
    gulp
      .src([gConfig.gamePath + "lobby/**/*", ("!" + gConfig.gamePath + "lobby/sourceAssets/**")])
      .pipe(gulp.dest(buildPath + "../lobby"))
  );
}
copyLogs = function () {
  return (
    gulp
      .src([gConfig.gamePath + "logs/**/*", ("!" + gConfig.gamePath + "logs/sourceAssets/**")])
      .pipe(gulp.dest(buildPath +"/"+gameName+ "/logs"))
  );
}

copyFavicon = function () {
  return (
    gulp
      .src(gConfig.gamePath + "favicon.ico")
      .pipe(gulp.dest(buildPath+"/"+gameName+"/"))
  );
}
copyCommon = function () {
  return (
    gulp
      .src(gConfig.gamePath + "common/dist/**/*")
      .pipe(gulp.dest(buildPath + "/"+gameName+"/core/dist/"))
  );
}
copyCommonSrc = function () {
  return (
    gulp
      .src([gConfig.gamePath + "common/src/**/*", ("!" + gConfig.gamePath + "common/src/commonConfig.js")])
      .pipe(gulp.dest(buildPath + "/"+gameName+"/core/config/"))
  );
}

copyRules = function () {
  return (
    gulp
      .src(gConfig.gamePath + "rules/**/*")
      .pipe(gulp.dest(buildPath +"/"+gameName+ "/rules/"))
  );
}

copyAssets = function (gameName) {
  return (
    gulp
      .src(gConfig.gamePath + gameName + "/dist/**/*")
      .pipe(gulp.dest(buildPath + "/"+gameName+"/game/dist/"))
  );
}

gameTask = function (gameName) {
  //if (isAssets) {
    copyLogs();
    copyFavicon();
    copyCommon();
    copyCommonSrc();
    copyAssets(gameName);
  //}
  // if (isLobby) {
  //   copyLobby();
  // }
  return (
    gulp
      .src(getGameFiles(gameName))
      .pipe(concat("game.js"))
      //.pipe(babel({ presets: ['es2015'] }))
      .pipe(minify())
      .pipe(gulp.dest(buildPath + "/" + gameName + "/game/"))
  );
};

exports.vgLib = vgLib;
exports.vgCore = vgCore;
exports.vgSlot = vgSlot;
exports.vgDesktop = vgDesktop;
exports.vgMobile = vgMobile;
exports.vgGames = vgGames;

function build(done) {
  const tasks = gList.map(list => {
    console.log("list = ", list);
    return taskDone => { taskDone(); };
  });

  return gulp.series(...tasks, seriesDone => {
    seriesDone();
    done();
  })();
}


// gulp.task('watch', browser-sync, function () {
//     gulp.watch("app/games/*.js", ['js']);
//     gulp.watch("*.html").on('change', browserSync.reload);
// });
// Static server
gulp.task('browser-sync', function () {
  browserSync.init({ server: { baseDir: "../" } });
  gulp.watch('app/games/*/src/*/*.js').on('change', browserSync.reload);
});

exports.default = gulp.series(vgLib, vgCore, vgSlot, vgDesktop, vgMobile, build);