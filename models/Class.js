var mongoose = require("mongoose");
var config = require("../config/config.js");

db = mongoose.createConnection(config.DBHOST, config.DBNAME);
var Schema = mongoose.Schema;

var ClassB = new Schema({
  school : String,
  class_num : String,
  class_name : String
});
module.exports = db.model("class" , ClassB ,"class");