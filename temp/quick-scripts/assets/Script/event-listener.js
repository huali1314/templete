(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/event-listener.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '163fdZU9NRJHKaDXhZiEM/C', 'event-listener', __filename);
// Script/event-listener.js

"use strict";

/**
 * Created by chu on 2017/8/16 0016.
 */
var EventListener = function EventListener(obj) {
    var Register = {};
    obj.on = function (name, method) {
        if (!Register.hasOwnProperty(name)) {
            Register[name] = [];
        }
        Register[name].push(method);
    };
    obj.fire = function (name) {
        console.log("fire " + name);
        if (Register.hasOwnProperty(name)) {
            console.log("has own " + name);
            var handlerList = Register[name];
            for (var i = 0; i < handlerList.length; i++) {
                var handler = handlerList[i];
                var args = [];
                //js中可以不显示的传参，利用arguments可以模拟重栽（js中没有重栽）
                for (var j = 1; j < arguments.length; j++) {
                    args.push(arguments[j]);
                }
                //js中apply:方法能劫持另外一个对象的方法，继承另外一个对象的属性.
                //Function.apply(obj,args)方法能接收两个参数
                //obj：这个对象将代替Function类里this对象
                //args：这个是数组，它将作为参数传给Function（args-->arguments）
                handler.apply(this, args);
                //call:和apply的意思一样,只不过是参数列表不一样.
                //Function.call(obj,[param1[,param2[,…[,paramN]]]])
                //obj：这个对象将代替Function类里this对象
                //params：这个是一个参数列表

                //根据实际情况根据传参形式不同合理利用apply和call方法
                // console.log("args = " + JSON.stringify(args));
            }
        }
    };
    obj.off = function (name, method) {
        console.log("off handler name = " + name);
        if (Register.hasOwnProperty(name)) {
            var handlerList = Register[name];
            for (var i = 0; i < handlerList.length; i++) {
                if (handlerList[i] === method) {
                    handlerList.splice(i, 1);
                }
            }
        }
    };
    obj.destroy = function () {
        Register = {};
    };
    return obj;
};
// export default EventListener;
module.exports = EventListener;

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
        //# sourceMappingURL=event-listener.js.map
        