var mongoose = require("mongoose");
var config = require("../config/config.js");

db = mongoose.createConnection(config.DBHOST, config.DBNAME);
var Schema = mongoose.Schema;

var Student = new Schema({
  school : String,
  class_num : String,
  student_id : String,
  name : String,
  twon_or_country : String,
  sex : String

  
});
module.exports = db.model("student" , Student ,"student");