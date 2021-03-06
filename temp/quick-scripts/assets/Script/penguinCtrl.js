(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/penguinCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '01da1Y9tyZE0rLWl8zGYGxD', 'penguinCtrl', __filename);
// Script/penguinCtrl.js

"use strict";

var global = require("./global");
var penguinConfig = require("penguinConfig");
cc.Class({
    extends: cc.Component,
    properties: {},
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var level = cc.find("level");
        var water = level.getChildByName("water");
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        this.animation = this.node.getComponent(cc.Animation);
        this.winSize = cc.director.getWinSize();
        this.waterLine = water.height / 2;
        this.scheduler = cc.director.getScheduler();
    },
    start: function start() {
        this.initStatus();
        this.initData();
        // this.AudioEngine = this.node.getComponent("audioEngineController")
    },

    initData: function initData() {
        this.dtTime = 0;
        this.cacheData = global.localDataManager.getObject("playerData");
        var curLevel = this.cacheData.curLevel;
        this.attackPoint = penguinConfig[curLevel].attackPoint;
        this.swimRatio = penguinConfig[curLevel].swimRatio;
    },
    initStatus: function initStatus() {
        this.isBitten = false;
        this.isSwimming = false;
        this.switchAnimation("idle");
    },
    switchAnimation: function switchAnimation(name) {
        var currentClip = this.animation.currentClip;
        if (currentClip != null && currentClip != undefined) {
            if (currentClip.name == name) {
                return null;
            }
        }
        switch (name) {
            case "idle":
                this.animation.play("idle");
                break;
            case "walk":
                this.animation.play("walk");
                break;
            case "swim":
                this.animation.play("swim");
                break;
            case "jump":
                this.animation.play("jump");
                break;
        }
    },
    update: function update(dt) {
        // if(global.gameData.curGameStatus == 0){
        this.updateGravity();
        //食物每秒消耗
        // this.costSatiety(dt)
        // }
        // this.updateZHeight(dt)
    },

    // costSatiety:function(dt){
    //     if (this.dtTime >= 1){
    //         this.dtTime = 0
    //         this.satietyCost()
    //     }else{
    //         this.dtTime += dt
    //     }
    // },
    updateGravity: function updateGravity() {
        if (this.node.y >= this.waterLine) {
            this.rigidBody.gravityScale = 0.6;
        } else {
            this.rigidBody.gravityScale = 0.01;
        }
    },
    isInWater: function isInWater() {
        if (this.node.y >= this.waterLine) {
            return false;
        }
        return true;
    },
    isGoLeft: function isGoLeft(angle) {
        if (angle > -90 && angle <= 90) {
            return false;
        }
        return true;
    },
    isGoTop: function isGoTop(angle) {
        if (angle > 0 && angle <= 180) {
            return true;
        }
        return false;
    },
    moveStart: function moveStart() {},
    move: function move(angle, speed) {
        var x_offset = Math.cos(angle * (Math.PI / 180)) * speed / 2;
        var y_offset = Math.sin(angle * (Math.PI / 180)) * speed / 2;
        var forceX = x_offset * this.swimRatio;
        var forceY = y_offset * this.swimRatio;
        if (this.isInWater()) {
            this.switchAnimation("swim");
            this.node.rotation = 90 - angle;
            // this.node.rotation = (x_offset > 0)?90:-90
            this.rigidBody.applyForceToCenter(cc.v2(forceX, forceY), true);
        } else if (this.isInPlane) {
            this.node.rotation = 0;
            // this.rigidBody.applyForceToCenter(cc.v2(forceX/5 * 2,0),true)
            // if(this.isInPlane){
            this.switchAnimation("walk");
            this.rigidBody.linearVelocity = cc.v2(x_offset, 0);
            // }
        } else {
            this.rigidBody.applyForceToCenter(cc.v2(forceX * 0.1, 9), true);
            this.node.rotation = 0;
        }
        this.node.scaleX = x_offset > 0 ? 1 : -1;
    },
    moveEnd: function moveEnd() {
        this.switchAnimation("idle");
    },
    // satietyCost:function(){
    //     var satietyCostSp = this.satietyCostSpeed
    //     //加速情况下多倍消耗食物
    //     if(this.isAccelerate == true){
    //         satietyCostSp = this.satietyCostSpeed * 2
    //     }
    //     var nextSatiety = this.curSatiety - satietyCostSp
    //     this.curSatiety = (nextSatiety > 0)?nextSatiety:0
    // },
    attack: function attack() {
        // if(this.isInWater()){
        global.eventlistener.fire("penguinAttack", this.attackPoint);
        this.switchAnimation("swimAttack");
        // }
    },
    // caluSpeedBySatiety:function(){
    //     return (this.curSatiety/100 - 0.6)
    // },
    wake: function wake() {
        var self = this;
        this.scheduler.schedule(function () {
            self.isSwimming = false;
        }, this, 3, 0, 0, false);
    },
    jump: function jump() {
        if (this.isInPlane && !this.isInWater()) {
            this.rigidBody.applyForceToCenter(cc.v2(0, 5000), true);
            this.switchAnimation("jump");
        }
        this.isInPlane = false;
    },
    // onCollisionEnter: function (other) {
    //     this.canAttack = true
    // },
    // onCollisionStay: function(other){

    // },
    // onCollisionExit: function () {
    //     this.canAttack = false
    // },
    onBeginContact: function onBeginContact(contact, self, other) {
        var group = other.node.group;
        cc.log(self.tag, "=============tag===");
        if (group == "iceStone") {} else if (group == "food") {
            // this.eatFood(1)
        } else if (group == "plane" && self.tag == 1991) {
            this.switchAnimation("idle");
            this.isInPlane = true;
        } else if (group == "food") {
            this.attack();
        }
    },
    onStayContact: function onStayContact(contact, self, other) {},
    onEndContact: function onEndContact(contact, self, other) {
        var group = other.node.group;
        if (group == "plane" && self.tag == 1991) {
            this.isInPlane = false;
        } else if (group == "food") {
            this.switchAnimation("swim");
        }
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
        //# sourceMappingURL=penguinCtrl.js.map
        