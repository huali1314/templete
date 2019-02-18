(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/config/penguinConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1e976d+M29Is7OA7dm/TXSp', 'penguinConfig', __filename);
// Script/config/penguinConfig.js

"use strict";

var penguinConfig = [{
    maxHp: 100,
    maxOxygen: 100,
    maxStoredGrain: 10,
    maxSatiety: 100,
    initStoredGrain: 10,
    attackPoint: 10,
    satietyCostSpeed: 1,
    swimRatio: 6
}];
module.exports = penguinConfig;

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
        //# sourceMappingURL=penguinConfig.js.map
        