var global = require("./global");
var Direction = [false,true]//true代表左游或上游 false代表右游或下游
cc.Class({
    extends: cc.Component,
    properties: {
        quickSwimSpeedRadio:{
            default:3,
            displayName:"加速游泳施加力量系数"
        },
        minSpeed:{
            default:5,
            displayName:"最小游泳施加力量"
        },
        normalSwimSpeedRadio:{
            default:5,
            displayName:"正常游泳施加力量系数"
        },
        maxHp:{
            default:20,
            displayName:"最大生命值"
        },
        minSafeDistance:{
            default:100,
            displayName:"最小安全距离"
        },
        maxSafeDistance:{
            default:300,
            displayName:"脱离危险的距离"
        },
        reactionTime:{
            default:0.5,
            displayName:"反应能力"
        },//敌人接近时的反应时间，值越小反应越快，同样更费帧率
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.tempXOffset = 0
        this.winSize = cc.director.getWinSize()
        this.player = cc.find("player")
        this.bg = cc.find("level")
        var water = this.bg.getChildByName("water")
        this.waterLine = water.height/2
        this.scheduler = cc.director.getScheduler()
        // this.actionManager = cc.director.getActionManager()
        this.hp = this.node.getChildByName("hp")
        this.sp = this.node.getChildByName("sp")
        this.progressBar = this.hp.getComponent(cc.ProgressBar)
        this.rigidBody = this.node.getComponent(cc.RigidBody)
        this.randDirection()
    },

    start () {
        this.initData()
        this.initStatus()
        this.registerEvent()
        this.randomSwim()
        this.schedulerCaluDistance()
    },
    registerEvent:function(){
        var self = this;
        global.eventlistener.on("penguinAttack",function(attackPoint){
            if(self.canAttack){
                self.curHp -= attackPoint
                self.updateProgress()
            }
        });
    },
    initData:function(){
        this.curHp = this.maxHp
        // this.progressBar.totalLength = this.maxHp
    },
    initStatus:function(){
        this.canAttack = false
    },
    update (dt) {
        this.Swim()
        this.updateGravity()
    },
    updateGravity:function(){
        if(this.node.y >= this.waterLine){
            this.rigidBody.gravityScale = 0.9
        }else{
            this.rigidBody.gravityScale = 0.01
        }
    },
    isInWater:function(){
        if(this.node.y >= this.waterLine){
            return false
        }
        return true
    }, 
    updateProgress:function(){
        var temp = this.curHp/this.maxHp  
        if(temp > 0){
            this.progressBar.progress = temp
        }else{
            // global.eventlistener.fire("getFood")
            this.node.destroy()
        }
    },
    Swim:function(){
        if(this.isInWater()){
            var randX = cc.random0To1() * this.normalSwimSpeedRadio + this.minSpeed 
            var randY = cc.random0To1() * this.normalSwimSpeedRadio + this.minSpeed
            randX = this.isLeft?-randX:randX
            randY = this.isUp?randY:-randY
            randX = this.isQuickSwimming?randX * this.quickSwimSpeedRadio:randX
            randY = this.isQuickSwimming?randY * this.quickSwimSpeedRadio:randY
            this.sp.scaleX = this.isLeft?1:-1
            this.rigidBody.applyForceToCenter(cc.v2(randX,randY),false)
        }else{
            this.isUp = false
        }
    },
    randDirection:function(){
        var rand1 = Math.ceil(cc.random0To1() * 2) - 1
        var rand2 = Math.ceil(cc.random0To1() * 2) - 1
        this.isLeft = Direction[rand1]
        this.isUp = Direction[rand2]
    },
    caluDistance:function(){
        var x_value = this.node.x - this.player.x
        var y_value = this.node.y - this.player.y
        var distance = Math.abs(x_value) + Math.abs(y_value)
        return distance
    },
    changeDirection:function(){
        this.isLeft = (this.node.x > this.player.x)?false:true
        this.isUp = (this.node.y > this.player.y)?true:false
    },
    schedulerCaluDistance:function(){
        var self = this
        this.scheduler.schedule(function(){
            var distance = self.caluDistance()
            if(distance <= this.minSafeDistance){
                this.changeDirection()
                this.isQuickSwimming = true
            }else if(distance > this.maxSafeDistance){
                this.isQuickSwimming = false
            }
        },this,0.5,false)
    },
    randomSwim:function(){
        var self = this
        this.scheduler.schedule(function(){
            self.randDirection()
        },this,6,999,1,false)
    },
    onBeginContact:function(contact, self, other){
        var tag = other.tag
        if(tag == 9991){
            this.isLeft = false
        }else if(tag == 9992){
            this.isLeft = true
        }else if(tag == 9993){
            this.isUp = true
        }
        if(other.node.group == "player"){
            this.canAttack = true
        }
    },
    onStayContact(contact,self,other){

    },
    onEndContact(contact,self,other){
        if(other.node.group == "player"){
            this.canAttack = false
        }
    },
});
