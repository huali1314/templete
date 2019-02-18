var LocalManager = {

    formatString:function (str){
        if (typeof(str) != "string"){
            return;
        }
        str = str.replace(/\ +/g,"");//去掉空格
        str = str.replace(/[\r\n]/g,"");//去掉回车换行
        return str;
    },
    // setBool:function(_key,_value){
    //     cc.sys.localStorage.setItem(_key,_value.toString())
    // },
    // getBool:function(_key){
    //     return cc.sys.localStorage.getItem(_key) =="false"?false:true
    // },
    // setInt:function(_key,_value){
    //     cc.sys.localStorage.setItem(_key,_value.toString())
    // },
    // getInt:function(_key){
    //     return Number(cc.sys.localStorage.getItem(_key))
    // },
    // setString:function(_key,_value){
    //     cc.sys.localStorage.setItem(_key,_value)
    // },
    // getString:function(_key){
    //     return cc.sys.localStorage.getItem(_key)
    // },
    setObject:function(_key,_value){
        cc.sys.localStorage.setItem(_key,JSON.stringify(_value))
    },
    getObject:function(_key){
        var item = this.formatString(cc.sys.localStorage.getItem(_key))
        console.log(item,"===========item=====")
        if(item != null && item != undefined && item != ""){
            return JSON.parse(item)
        }
        return null;
    },
    removeItem:function(_key){
        return cc.sys.localStorage.removeItem(_key)
    },
}
export default LocalManager;