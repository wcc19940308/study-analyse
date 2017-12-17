var mongoose = require("mongoose");
var config = require("../config/config.js");
db = mongoose.createConnection(config.DBHOST, config.DBNAME);
var Schema = mongoose.Schema;

var Knowledge_point = new Schema({
		kp_id : String ,
		knowledge_point : String
});

module.exports = db.model("knowledge_point" , Knowledge_point , "knowledge_point");