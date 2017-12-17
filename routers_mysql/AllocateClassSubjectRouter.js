var connection = require('../DBConnection/DBConnection.js');


var search_subject_infor = function(rs , response){
	 var grade_ids = "(" ;
	 for(var i= 0 ; i < rs.school_subject_infor.length -1 ; i++){
	 	grade_ids += rs.school_subject_infor[i].grade_id
	 	grade_ids += ',';
	 }

	 grade_ids += rs.school_subject_infor[rs.school_subject_infor.length -1].grade_id;
	 grade_ids +=')';

	 var sql = "select d.grade_id as grade_id , d.grade_name as grade_name , d.class_id as class_id , d.class_name as class_name , e.class_subject_id as subject_id , e.class_subject_name as subject_name  , e.teacher_id as teacher_id from (select b.grade_id as grade_id , b.grade_name as grade_name , c.class_id as class_id , c.class_name as class_name from (select * from grade as a where a.grade_id in " + grade_ids + ")as b left join class as c on b.grade_id = c.grade_id ) as d  left join class_subject as e on d.class_id = e.class_id";
	connection.query(sql, function(err , result){

	 	if(err){
	 		console.log(err);
	 	}else{

	 			for(var j in rs.school_subject_infor){
					for(var k in rs.school_subject_infor[j].classes){

						var subjects = [];
						for(var x in result){

							if(rs.school_subject_infor[j].classes[k].class_id == result[x].class_id &&  rs.school_subject_infor[j].classes[k].class_id!= null && result[x].teacher_id == null){

								var temp_subject = {};
								temp_subject.subject_id = result[x].subject_id;
								temp_subject.subject_name = result[x].subject_name;
								subjects.push(temp_subject);
							}
						}

						rs.school_subject_infor[j].classes[k].subjects = subjects;
					}
				}

	 		response.send("callback(" + JSON.stringify(rs) +")");
	 	}
	 })


}
var search_class_infor = function(rs , response){

	 var grade_ids = "(" ;
	 for(var i= 0 ; i < rs.school_subject_infor.length -1 ; i++){
	 	grade_ids += rs.school_subject_infor[i].grade_id
	 	grade_ids += ',';
	 }

	 grade_ids += rs.school_subject_infor[rs.school_subject_infor.length -1].grade_id;
	 grade_ids +=')';

	 var sql = "select b.grade_id as grade_id , b.grade_name as grade_name , c.class_id as class_id , c.class_name as class_name from (select * from grade as a where a.grade_id in " + grade_ids + ")as b left join class as c on b.grade_id = c.grade_id";
	 connection.query(sql, function(err , result){

	 	if(err){
	 		console.log(err);
	 	}else{

	 			for(var j in rs.school_subject_infor){

					var classes = [];
					for(var k in result){

						if(rs.school_subject_infor[j].grade_id == result[k].grade_id){
							var temp_class = {};
							temp_class.class_id = result[k].class_id;
							temp_class.class_name = result[k].class_name;
							classes.push(temp_class);
						}
					}
					rs.school_subject_infor[j].classes = classes;
				}
			search_subject_infor(rs , response);
	 	}

	 })
	 
	// response.send("callback(" + JSON.stringify(rs) +")");

}

var search_grade_infor = function(rs , response){

	var school_id = rs.school_id;
	var sql = "select * from school as a , grade  as b where a.school_id = b.school_id and a.school_id =" + school_id;
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
				
				rs.school_subject_infor  = [];
				for (var j in result) {

					if(school_id == result[j].school_id){
						var temp_grade  = {};
						temp_grade.grade_id = result[j].grade_id;
						temp_grade.grade_name = result[j].grade_name;
						rs.school_subject_infor.push(temp_grade);
					}
				
				}
			
			search_class_infor(rs , response);
			//response.send("callback(" + JSON.stringify(rs) +")");
		}

	});

}

exports.search_teacher_infor  = function(request , response){

	var account = request.query.account;
	account = JSON.stringify(account);
	var sql = "select c.teacher_id as teacher_id , c.teacher_name as teacher_name , c.school_id as school_id , c.class_subject_id as class_subject_id , c.class_id as class_id , c.class_subject_name as class_subject_name , d.school_name as school_name from (select a.teacher_id as teacher_id , a.teacher_name as teacher_name , a.school_id as school_id , b.class_subject_id as class_subject_id , b.class_id as class_id , b.class_subject_name as class_subject_name from teacher as a , class_subject as b where a.teacher_id  = b.teacher_id and a.account ="+account+") as c , school as d where c.school_id = d.school_id";

	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			var rs ={};
			var teached_classes = [];
			for(var i in result){
				rs.teacher_name = result[i].teacher_name;
				rs.teacher_id = result[i].teacher_id;
				rs.account = result[i].account;
				rs.school_id = result[i].school_id;
				rs.school_name = result[i].school_name;
				var temp_teached_class = {};
				temp_teached_class.class_subject_id = result[i].class_subject_id;
				temp_teached_class.class_subject_name = result[i].class_subject_name;
				teached_classes.push(temp_teached_class);

			}
			rs.teached_classes = teached_classes;
			search_grade_infor(rs , response);
			//response.send("callback("+JSON.stringify(rs)+")");
		}
	});



}