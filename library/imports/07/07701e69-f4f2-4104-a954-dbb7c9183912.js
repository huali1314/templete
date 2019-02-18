"use strict";
cc._RF.push(module, '077015p9PJBBKlU27fJGDkS', 'game-data');
// Script/data/game-data.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
    游戏状态：
    0:正常运行
    1:暂停
    2:游戏结束
 */
var GameData = function GameData() {
    var that = {};
    //根据时间线来记录玩家的死亡信息，包括死亡时间，死亡原因，死亡时的年龄信息
    that.diedInfo = [];
    //根据时间线记录玩家的重生信息，包括重生时间，重生之后的属性，重生后的企鹅种类，当前种类的企鹅的一些特征
    that.renascenceInfo = [];
    return that;
};
exports.default = GameData;
module.exports = exports["default"];

cc._RF.pop();