var mongoose = require("mongoose");
var config = require("../config/config.js");

db = mongoose.createConnection(config.DBHOST , config.DBNAME);

var Schema = mongoose.Schema;
var Class_course = new Schema({

  class_course_id : String,
  teacher_id : String,
  class_num : String,
  subject_id : String,
  class_course_name : String
});

module.exports = db.model("class_course" , Class_course ,"class_course");