(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/global.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5bbb0xxxgRPFpJJd6XFq/JY', 'global', __filename);
// Script/global.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _playerData = require('./data/player-data');

var _playerData2 = _interopRequireDefault(_playerData);

var _gameData = require('./data/game-data');

var _gameData2 = _interopRequireDefault(_gameData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import localDataManager from "./utils/localDataManager"
// import sceneManager from "./utils/sceneManager"
/**
 * Created by chu on 2017/8/16 0016.
 */
var global = {};
global.playerData = (0, _playerData2.default)();
global.gameData = (0, _gameData2.default)();
global.localDataManager = require("localDataManager");
global.sceneManager = require("sceneManager");
// global.localDataManager = localDataManager
// global.sceneManager = sceneManager
module.exports = global;
exports.default = global;
module.exports = exports['default'];

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
        //# sourceMappingURL=global.js.map
        