"use strict";
cc._RF.push(module, '8e0caFcWIlP7bzHzGNFpo7C', 'player-data');
// Script/data/player-data.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by li on 2018/10/02
 */
var PlayerData = function PlayerData() {
    var that = {};
    that.id = 0;
    that.curState = 0; //生命形态：0。 亡灵形态：1
    that.curLevel = 0;
    that.curSatiety = 100;
    that.curOxygen = 15;
    that.curStoredGrain = 10;
    that.curHp = 100;
    return that;
};
exports.default = PlayerData;
module.exports = exports["default"];

cc._RF.pop();