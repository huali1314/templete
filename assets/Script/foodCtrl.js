// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        food:[cc.Prefab]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bg = cc.find("level")
    },

    start () {
        //食物产生间隔时间秒
        this.intervalTime = 20
        this.dtTime = 0
    },
    update (dt) {
        if (this.dtTime >= this.intervalTime){
            this.dtTime = 0
            this.generatorOneFood()
        }else{
            this.dtTime += dt
        }
    },
    generatorOneFood:function(){
        var totalFoodNum = this.food.length
        var randIdx = Math.floor(cc.random0To1() * (totalFoodNum - 0.01))
        var food = cc.instantiate(this.food[randIdx])
        food.setPosition(600,-200)
        this.bg.addChild(food)
    },
});
