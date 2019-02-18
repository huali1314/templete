(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/data/player-data.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8e0caFcWIlP7bzHzGNFpo7C', 'player-data', __filename);
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
        //# sourceMappingURL=player-data.js.map
        