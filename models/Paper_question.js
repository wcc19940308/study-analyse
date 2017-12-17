var mongoose = require("mongoose");
var config = require("../config/config.js");
db = mongoose.createConnection(config.DBHOST, config.DBNAME);
var Schema = mongoose.Schema;

var Paper_question = new Schema({
	question : String ,
	knowledge_point : String ,
	question_type : String ,
	study_expectation : String ,
	total_gogal : String ,
	paper_id : String 
});

module.exports = db.model("paper_question" , Paper_question , 'paper_question');