var mongoose = require("mongoose");
var config = require("../config/config.js");

db = mongoose.createConnection(config.DBHOST , config.DBNAME);
var Schema = mongoose.Schema;

var Subject = new Schema({
	  subject_id : String,
  	  subject_name : String
});

module.exports = db.model("subject" , Subject , "subject");