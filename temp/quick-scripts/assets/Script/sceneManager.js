(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/sceneManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '75bdc8HXCBNNqhP+s8NWPmD', 'sceneManager', __filename);
// Script/utils/sceneManager.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sceneManager = {
    loadScene: function loadScene(url, callback) {
        this.callback = callback;
        this._isLoadingScene = true;
        this.currentSceneUrl = url;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
    },
    onLoadSceneFinish: function onLoadSceneFinish() {
        this._isLoadingScene = false;
        //这里处理场景加载完后的代码逻辑
        if (this.callback) {
            this.callback();
        }
    }
};
exports.default = sceneManager;
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
        //# sourceMappingURL=sceneManager.js.map
        