/**
 * Created by li on 2018/10/02
 */
const PlayerData = function () {
    var that = {};
    that.id = 0;
    that.curState = 0;//生命形态：0。 亡灵形态：1
    that.curLevel = 0;
    that.curSatiety = 100;
    that.curOxygen = 15;
    that.curStoredGrain = 10;
    that.curHp = 100;
    return that;
};
export default PlayerData;
