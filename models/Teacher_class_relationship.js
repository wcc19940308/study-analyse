var mongoose = require("mongoose");
var config = require("../config/config.js");

db = mongoose.createConnection(config.DBHOST, config.DBNAME);
var Schema = mongoose.Schema;

var Teacher_class_relationship = new Schema({
  teacher_id : String,
  class_num : String
});
module.exports = db.model("teacher_class_relationship" , Teacher_class_relationship ,"teacher_class_relationship");