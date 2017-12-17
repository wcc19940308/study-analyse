var mongoose = require("mongoose");
var config = require("../config/config.js");

db = mongoose.createConnection(config.DBHOST, config.DBNAME);
var Schema = mongoose.Schema;

var School = new Schema({
	school : String,
	school_name : String
});
module.exports = db.model("school" , School ,"school");

