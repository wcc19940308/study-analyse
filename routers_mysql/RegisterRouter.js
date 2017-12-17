var connection = require("../DBConnection/DBConnection");

exports.register = function(request , response){

	var teacher_name = request.query.teacher_name;
	var account = request.query.account;
	var passwd 	= request.query.passwd;
	var school_id = request.query.school_id;
	teacher_name = JSON.stringify(teacher_name);
	account = JSON.stringify(account);
	passwd = JSON.stringify(passwd);
	school_id = JSON.stringify(school_id);

	var sql = "select * from teacher as a where a.account =" + account;

	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			if(result.length == 0){

				var sql_insert = "insert into teacher (teacher_name , account , passwd , school_id) values ("+teacher_name+" ,"+account+" ,"+passwd+" ,"+school_id+")";
				connection.query(sql_insert , function(err , result){
					if(err){
						response.send("callback(" + "false" +")");
					}else{

						response.send("callback(" + "true" +")");
					}
				});

			}else{

				response.send("callback(" + "false" +")");
			}
		}
	});


}