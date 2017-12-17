

//现在还只是单个连接  以后做成线程池
var config = require("../config_mysql/config.js");
var mysql = require("mysql");
var connection = mysql.createConnection({

	host : config.HOST,
	user : config.USER,
	password : config.PASSWORD,
	port : config.PORT,
	database : config.DATABASE
});
connection.connect()
 

module.exports = connection;