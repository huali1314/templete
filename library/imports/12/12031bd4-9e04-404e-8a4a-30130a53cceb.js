"use strict";
cc._RF.push(module, '12031vUngRATopKMBMKU8zr', 'info');
// Script/info.js

"use strict";

var global = require("./global");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.registerUI();
        this.initData();
    },
    start: function start() {
        this.curHp = 100;
        this.curOxygen = 100;
        this.curFishCollect = 0;
        this.curSatiety = 100;
        this.scheduleInfo();
    },

    registerUI: function registerUI() {
        // this.scheduler = cc.director.getScheduler()
        this.hp = this.node.getChildByName("hp").getComponent(cc.ProgressBar);
        this.oxygen = this.node.getChildByName("oxygen").getComponent(cc.ProgressBar);
        this.fishCollect = this.node.getChildByName("collect").getComponent(cc.ProgressBar);
        this.satiety = this.node.getChildByName("satiety").getComponent(cc.ProgressBar);
        this.player = cc.find("player");
        this.penguin = this.player.getComponent("penguinCtrl");
    },
    initData: function initData() {
        this.penguinConfig = require("penguinConfig");
        this.curLevelConfig = this.penguinConfig[0];
        // this.oxygen.totalLength = this.curLevelConfig.maxOxygen
        // this.hp.totalLength = this.curLevelConfig.maxHp
        // this.fishCollect.totalLength = this.curLevelConfig.maxFish
        // this.satiety.totalLength = this.curLevelConfig.maxSatiety
        this.updateHp();
        this.updateOxygen();
        this.updateFish();
        this.updateSatiety();
    },
    updateHp: function updateHp() {
        this.hp.progress = this.curHp / this.curLevelConfig.maxHp;
    },
    updateOxygen: function updateOxygen() {
        this.oxygen.progress = this.curOxygen / this.curLevelConfig.maxOxygen;
    },
    updateFish: function updateFish() {
        this.fishCollect.progress = this.curFishCollect / this.curLevelConfig.maxFish;
    },
    updateSatiety: function updateSatiety() {
        this.satiety.progress = this.curSatiety / this.curLevelConfig.maxSatiety;
    },
    scheduleInfo: function scheduleInfo() {
        this.schedule(this.updateInfo, 0.1);
    },
    unScheduleInfo: function unScheduleInfo() {
        this.unschedule(this.updateInfo);
    },
    updateInfo: function updateInfo(dt) {
        var isInWater = this.penguin.isInWater();
        var newOxygen = isInWater ? this.curOxygen - 0.1 : this.curOxygen + 0.2;
        if (isInWater) {
            this.curOxygen = newOxygen > 0 ? newOxygen : 0;
        } else {
            this.curOxygen = newOxygen < this.curLevelConfig.maxOxygen ? newOxygen : this.curLevelConfig.maxOxygen;
        }
        this.updateOxygen();
        if (this.curOxygen <= 0) {
            this.curHp -= 0.1;
            this.updateHp();
            // this.unScheduleInfo()
        }
    }
    // update (dt) {
    //     var isInWater = this.penguin.isInWater()
    //     var newOxygen = isInWater?(this.curOxygen - 0.1):(this.curOxygen + 0.2)
    //     if(isInWater){
    //         this.curOxygen = newOxygen > 0?newOxygen:0
    //         this.updateOxygen()
    //     }else{
    //         this.curOxygen = newOxygen < 100?newOxygen:100
    //         this.updateOxygen()
    //     }
    //     cc.log(this.curOxygen,"=============curOxygen======")
    //     if(this.curOxygen <=0){

    //     }
    // },
});

cc._RF.pop();