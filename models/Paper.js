var mongoose = require("mongoose");
var config = require("../config/config.js");

db = mongoose.createConnection(config.DBHOST , config.DBNAME);

var Schema = mongoose.Schema;
var Paper = new Schema({

  paper_id : String,
  paper_name : String,
  test_time: String,
  questions : [String]
});

module.exports = db.model("paper" , Paper ,"paper");