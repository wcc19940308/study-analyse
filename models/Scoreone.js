var mongoose = require("mongoose");
var config = require("../config/config.js");
db = mongoose.createConnection(config.DBHOST , config.DBNAME);
var Schema = mongoose.Schema;

var Scoreone = new Schema({
  "school" : String,
  "class_num" : String,
  "name" : String,
  "student_id" : String,
  "twon_or_country" :String,
  "total" : String,
  "1_1" : String

});
module.exports = db.model("scoreone" ,Scoreone ,"scoreone");