var mongoose = require("mongoose");
var config = require("../config/config.js");

db = mongoose.createConnection(config.DBHOST ,config.DBNAME);
var Schema = mongoose.Schema;

var Paper_classcourse_relationship = new Schema({
	paper_id : String,
  	class_course_id : String
});

module.exports = db.model("paper_classcourse_relationship" , Paper_classcourse_relationship 
	,"paper_classcourse_relationship");