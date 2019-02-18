var EventListener = require("./event-listener");
var global = require("./global");

cc.Class({
    extends: cc.Component,
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
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
        this.syncData()
    },
    removeCacheData:function(){
        global.localDataManager.removeItem("playerData")
    },
    syncData:function(){
        var cachePlayerData = global.localDataManager.getObject("playerData")
        if(cachePlayerData == null){
            var cacheData = global.playerData
            global.localDataManager.setObject("playerData",cacheData)
        }else{
            global.playerData = cachePlayerData
        }
        var cacheGameData = global.localDataManager.getObject("gameData")
        if(cacheGameData == null){
            var cacheData = global.gameData
            global.localDataManager.setObject("gameData",cacheData)
        }else{
            global.gameData = cacheGameData
        }
    },
    goFeed:function(){
        global.sceneManager.loadScene("game")
    },
});
