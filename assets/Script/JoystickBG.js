var Common = require('JoystickBar');
cc.Class({
    extends: cc.Component,
 
    properties: {
        dot: {
            default: null,
            type: cc.Node,
            displayName: '摇杆节点',
        },
        _joyCom: {
            default: null,
            displayName: 'joy Node',
 
        },
        _playerNode: {
            default: null,
            displayName: '被操作的目标Node',
        },
        _angle: {
            default: null,
            displayName: '当前触摸的角度',
 
        },
        _radian: {
            default: null,
            displayName: '弧度',
        },
 
 
        _speed: 0, //实际速度
        _speed1: 2, //一段速度
        _speed2: 4, //二段速度
        _opacity: 0, //透明度
    },
 
 
    onLoad: function () {
        this.distance = 0
        // joy下的Joystick组件
        this._joyCom = this.node.parent.getComponent('Joystick');
        // Joystick组件下的player节点
        this._playerNode = this._joyCom.sprite;
        this.penguinCtrl = this._playerNode.getComponent("penguinCtrl")
        this.isTouching = false
        this.canvas = cc.find("Canvas")
        this.touchPanel = this.canvas.getChildByName("touchPanel")
        if (this._joyCom.touchType == Common.TouchType.DEFAULT) {
            //对圆圈的触摸监听
            this._initTouchEvent();
        }
    },
 
 
    //对圆圈的触摸监听
    _initTouchEvent: function () {
        var self = this;
        self.dot.on(cc.Node.EventType.TOUCH_START, this._touchDotStartEvent, self);
        self.dot.on(cc.Node.EventType.TOUCH_END, this._touchDotEndEvent, self);
        self.dot.on(cc.Node.EventType.TOUCH_CANCEL, this._touchDotEndEvent, self);
        self.dot._touchListener.setSwallowTouches(false)
        self.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, self);
 
        self.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, self);
 
        // 触摸在圆圈内离开或在圆圈外离开后，摇杆归位，player速度为0
        self.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, self);

        // this.touchPanel.on(cc.Node.EventType.TOUCH_START, this._touchPanelStartEvent, this);
        // this.touchPanel.on(cc.Node.EventType.TOUCH_END, this._touchPanelEndEvent, this);
        // this.touchPanel.on(cc.Node.EventType.TOUCH_CANCEL, this._touchPanelCanelEvent, this);
    },
    // _touchPanelStartEvent: function (event) {
    //     this.penguinCtrl.jump()
    //     this.penguinCtrl.attack()
    // },
    // _touchPanelEndEvent: function (event) {
    //     this.jsJumpInPlane = false
    // },
    // _touchPanelCanelEvent: function (event) {
    //     this.jsJumpInPlane = false
    // },
    _touchDotStartEvent: function (event) {
        this.penguinCtrl.moveStart()
    },
    _touchDotEndEvent: function (event) {
        this.penguinCtrl.moveEnd()
    },
    //更新移动目标
    update: function (dt) {
        if (this.isTouching == true){
            switch (this._joyCom.directionType) {
            case Common.DirectionType.FOUR:
                this._fourDirectionsMove();
                break;
            case Common.DirectionType.EIGHT:
                this._eightDirectionsMove();
                break;
            case Common.DirectionType.ALL:
                this._allDirectionsMove();
                break;
            default:
                break;
            }
        }
    },
    //四个方向移动(上下左右)  
    _fourDirectionsMove: function () {
        if (this._angle > 45 && this._angle < 135) {
            this._playerNode.y += this._speed;
        } else if (this._angle > -135 && this._angle < -45) {
            this._playerNode.y -= this._speed;
        } else if (this._angle < -135 && this._angle > -180 || this._angle > 135 && this._angle < 180) {
            this._playerNode.x -= this._speed;
        } else if (this._angle < 0 && this._angle > -45 || this._angle > 0 && this._angle < 45) {
            this._playerNode.x += this._speed;
        }
    },
 
    //八个方向移动(上下左右、左上、右上、左下、右下)  
    _eightDirectionsMove: function () {
        if (this._angle > 67.5 && this._angle < 112.5) {
            this._playerNode.y += this._speed;
        } else if (this._angle > -112.5 && this._angle < -67.5) {
            this._playerNode.y -= this._speed;
        } else if (this._angle < -157.5 && this._angle > -180 || this._angle > 157.5 && this._angle < 180) {
            this._playerNode.x -= this._speed;
        } else if (this._angle < 0 && this._angle > -22.5 || this._angle > 0 && this._angle < 22.5) {
            this._playerNode.x += this._speed;
        } else if (this._angle > 112.5 && this._angle < 157.5) {
            this._playerNode.x -= this._speed / 1.414;
            this._playerNode.y += this._speed / 1.414;
        } else if (this._angle > 22.5 && this._angle < 67.5) {
            this._playerNode.x += this._speed / 1.414;
            this._playerNode.y += this._speed / 1.414;
        } else if (this._angle > -157.5 && this._angle < -112.5) {
            this._playerNode.x -= this._speed / 1.414;
            this._playerNode.y -= this._speed / 1.414;
        } else if (this._angle > -67.5 && this._angle < -22.5) {
            this._playerNode.x += this._speed / 1.414;
            this._playerNode.y -= this._speed / 1.414;
        }
    },
    //全方向移动
    _allDirectionsMove: function () {
        this.penguinCtrl.move(this._angle,this.distance)
    },
    //计算两点间的距离并返回
    _getDistance: function (pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +
            Math.pow(pos1.y - pos2.y, 2));
    },
 
    /*角度/弧度转换
    角度 = 弧度 * 180 / Math.PI
    弧度 = 角度 * Math.PI / 180*/
    //计算弧度并返回
    _getRadian: function (point) {
        this._radian = Math.PI / 180 * this._getAngle(point);
        return this._radian;
    },
 
    //计算角度并返回
    _getAngle: function (point) {
 
        var pos = this.node.getPosition();
        this._angle = Math.atan2(point.y - pos.y, point.x - pos.x) * (180 / Math.PI);
        return this._angle;
    },
 
    //设置实际速度
    _setSpeed: function (point) {
        //触摸点和遥控杆中心的距离
        var distance = this._getDistance(this.dot.getPosition(), this.node.getPosition());
        this.distance = distance
        // this._speed = 2;
    },
 
    _touchStartEvent: function (event) {
        // cc.log("_touchStartEvent=========")
        // cc.director.resume()
        this.isTouching = true
        // 获取触摸位置的世界坐标转换成圆圈的相对坐标（以圆圈的锚点为基准）
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        //触摸点与圆圈中心的距离
        var distance = this._getDistance(touchPos, cc.p(0, 0));
        //圆圈半径
        var radius = this.node.width / 2;
        // 记录摇杆位置，给touch move使用
        this._stickPos = touchPos;
        var posX = this.node.getPosition().x + touchPos.x;
        var posY = this.node.getPosition().y + touchPos.y;
        //手指在圆圈内触摸,控杆跟随触摸点
        if (radius > distance) {
            this.dot.setPosition(cc.p(posX, posY));
            return true;
        }
        return false;
    },
 
    _touchMoveEvent: function (event) {
        // cc.log("_touchMoveEvent=========")
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var distance = this._getDistance(touchPos, cc.p(0, 0));
        var radius = this.node.width / 2;
        // 由于摇杆的postion是以父节点为锚点，所以定位要加上ring和dot当前的位置(stickX,stickY)
        var posX = this.node.getPosition().x + touchPos.x;
        var posY = this.node.getPosition().y + touchPos.y;
        if (radius > distance) {
            this.dot.setPosition(cc.p(posX, posY));
        } else {
            //控杆永远保持在圈内，并在圈内跟随触摸更新角度
            var x = this.node.getPosition().x + Math.cos(this._getRadian(cc.p(posX, posY))) * radius;
            var y = this.node.getPosition().y + Math.sin(this._getRadian(cc.p(posX, posY))) * radius;
            this.dot.setPosition(cc.p(x, y));
        }
        //更新角度
        this._getAngle(cc.p(posX, posY));
        //设置实际速度
        this._setSpeed(cc.p(posX, posY));
 
    },
 
    _touchEndEvent: function () {
        cc.log("_touchEndEvent======")
        this.isTouching = false
        var pos = this.node.getPosition()
        this.dot.setPosition(pos);
        this._speed = 0;
        this.distance = 0
        // cc.director.pause()
    },
});