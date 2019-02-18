var sceneManager = {
    loadScene: function (url,callback) {
        this.callback = callback
        this._isLoadingScene = true;
        this.currentSceneUrl = url;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
    },
    onLoadSceneFinish: function () {
        this._isLoadingScene = false;
        //这里处理场景加载完后的代码逻辑
        if(this.callback){
            this.callback()
        }
    },
}
export default sceneManager;
