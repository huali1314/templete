(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/gameCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '04c4aQKerxLkq0RcFCTmrUD', 'gameCtrl', __filename);
// Script/gameCtrl.js

"use strict";

var EventListener = require("./event-listener");
var global = require("./global");

cc.Class({
    extends: cc.Component,
    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        global.eventlistener = EventListener({});
        //碰撞检测开启
        // cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        //物理效果开启
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
        // this.physicsManager.enabledAccumulator = true
        // this.physicsManager.FIXED_TIME_STEP = 0.1
        this.syncData();
    },

    removeCacheData: function removeCacheData() {
        global.localDataManager.removeItem("playerData");
    },
    syncData: function syncData() {
        var cachePlayerData = global.localDataManager.getObject("playerData");
        if (cachePlayerData == null) {
            var cacheData = global.playerData;
            global.localDataManager.setObject("playerData", cacheData);
        } else {
            global.playerData = cachePlayerData;
        }
        var cacheGameData = global.localDataManager.getObject("gameData");
        if (cacheGameData == null) {
            var cacheData = global.gameData;
            global.localDataManager.setObject("gameData", cacheData);
        } else {
            global.gameData = cacheGameData;
        }
    },
    goFeed: function goFeed() {
        global.sceneManager.loadScene("game");
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=gameCtrl.js.map
        