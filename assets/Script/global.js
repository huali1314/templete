/**
 * Created by chu on 2017/8/16 0016.
 */
import PlayerData from './data/player-data'
import GameData from './data/game-data'
// import localDataManager from "./utils/localDataManager"
// import sceneManager from "./utils/sceneManager"
const global = {};
global.playerData = PlayerData();
global.gameData = GameData();
global.localDataManager = require("localDataManager")
global.sceneManager = require("sceneManager")
// global.localDataManager = localDataManager
// global.sceneManager = sceneManager
module.exports = global;
export default global;