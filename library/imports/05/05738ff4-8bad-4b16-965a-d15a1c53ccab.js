"use strict";
cc._RF.push(module, '05738/0i61LFpZa0VocU8yr', 'naturalEnemy');
// Script/naturalEnemy.js

"use strict";

var global = require("./global");
var Direction = [false, true]; //true代表左游或上游 false代表右游或下游
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
        // maxSatiety:1000,
        // satietyCostSpeed:5,
        // maxHp:500,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        this.scheduler = cc.director.getScheduler();
        this.player = cc.find("player");

        this.winSize = cc.director.getWinSize();
        this.bg = cc.find("level");
        var water = this.bg.getChildByName("water");
        this.waterLine = water.height / 2;
    },
    start: function start() {
        this.initStatus();
        this.schedulerCaluDistance();
        this.randomNormalSwim();
    },

    initStatus: function initStatus() {
        this.isQuickSwimming = false;
    },
    update: function update(dt) {
        if (this.findFood) {
            this.pursueSwim();
        } else {
            this.normalSwim();
        }
        this.updateGravity();
    },

    updateGravity: function updateGravity() {
        if (this.node.y >= this.waterLine) {
            this.rigidBody.gravityScale = 0.9;
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
    normalSwim: function normalSwim() {
        var randX = cc.random0To1() * 1000 + 1200;
        var randY = cc.random0To1() * 1000 + 1200;
        randX = this.isLeft ? -randX : randX;
        randX = this.isQuickSwimming ? randX : randX / 4;
        if (this.isInWater()) {
            randY = this.isUp ? randY : -randY;
            randY = this.isQuickSwimming ? randY : randY / 4;
            this.node.scaleX = this.isLeft ? 1 : -1;
            this.rigidBody.applyForceToCenter(cc.v2(randX, randY), false);
        } else {
            this.isUp = false;
            this.rigidBody.applyForceToCenter(cc.v2(randX, 0), false);
        }
    },
    pursueSwim: function pursueSwim() {
        if (this.isInWater()) {} else if (this.isInPlane) {}
    },
    randDirection: function randDirection() {
        var rand1 = Math.ceil(cc.random0To1() * 2) - 1;
        var rand2 = Math.ceil(cc.random0To1() * 2) - 1;
        this.isLeft = Direction[rand1];
        this.isUp = Direction[rand2];
    },
    caluDistance: function caluDistance() {
        var x_value = this.node.x - this.player.x;
        var y_value = this.node.y - this.player.y;
        var distance = Math.abs(x_value) + Math.abs(y_value);
        return distance;
    },
    schedulerCaluDistance: function schedulerCaluDistance() {
        var self = this;
        this.schedule(function () {
            var distance = self.caluDistance();
            if (distance <= 300) {
                this.findFood = true;
                this.isQuickSwimming = true;
            } else if (distance > 500) {
                this.findFood = false;
                this.isQuickSwimming = false;
            }
        }, 0.4);
    },
    randomNormalSwim: function randomNormalSwim() {
        var self = this;
        this.scheduler.schedule(function () {
            self.randDirection();
        }, this, 6, 999, 1, false);
    }
});

cc._RF.pop();