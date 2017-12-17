var mongoose = require("mongoose");
var config = require("../config/config");

db = mongoose.createConnection(config.DBHOST, config.DBNAME);

var Schema = mongoose.Schema;

var Teacher = new Schema({

	teacher_id : String,
  	school_id : String,
  	account : String,
  	passwd: String,
    teacher_name : String

});

module.exports = db.model("teacher" , Teacher , "teacher");