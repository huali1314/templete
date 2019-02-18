"use strict";
cc._RF.push(module, '75bdc8HXCBNNqhP+s8NWPmD', 'sceneManager');
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