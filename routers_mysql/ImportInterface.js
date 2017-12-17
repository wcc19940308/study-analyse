var connection = require("../DBConnection/DBConnection.js");

/*//其实只要class_id 就可以查到需要的东西了 但是还是要上三级的ID
exports.getSubject = function(request , response){

	var school_id = request.query.school_id;
	var grade_id = request.query.grade_id;
	var class_id = request.query.class_id;
	school_id = JSON.stringify(school_id);
	grade_id  = JSON.stringify(grade_id);
	class_id  = JSON.stringify(class_id);

	var sql = "select a.class_subject_id as class_subject_id , a.class_subject_name as class_subject_name  from class_subject as a where a.class_id = " + class_id;
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{

			response.send("callback(" + JSON.stringify(result) +")");
		}

	});

}

//存在问题  没有用到shcool_id 直接用grade_id 就可以就可以找到所有的班级ID了
exports.getClass = function(request , response){
	var school_id = request.query.school_id;
	var grade_id = request.query.grade_id;
	school_id = JSON.stringify(school_id);
	grade_id = JSON.stringify(grade_id);
	var sql = "select a.class_id as class_id , a.class_name as class_name from class  as a where a.grade_id =  " + grade_id;
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{

			response.send("callback(" + JSON.stringify(result) +")");
		}

	});

}


//搜索学校有哪些班级  有个问题因为年级不是按照顺序输入的所有所以显示的时候怎样按照顺序呢
exports.getGrade = function(request , response){
	var school_id = request.query.school_id;
	school_id = JSON.stringify(school_id);
	console.log("I am here");
	var sql = "select a.grade_id as grade_id , a.grade_name as grade_name from grade as a where a.school_id =" + school_id;
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			response.send("callback(" + JSON.stringify(result) +")");
		}

	});

}*/


//用来搜索有哪些学校
exports.getSchool = function (request , response) {
	
	var sql = "select * from school ";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			response.send("callback(" + JSON.stringify(result) +")");
		}

	});
}

/*var search_subject_for_subject =function(rs , response){

	var sql = "select e.school_id as school_id , e.school_name as school_name , e.grade_id as grade_id , e.grade_name as grade_name , e.class_id as class_id , e.class_name as class_name , f.class_subject_id as subject_id , f.class_subject_name as subject_name from (select c.school_id as school_id , c.school_name as school_name , c.grade_id as grade_id , c.grade_name as grade_name , d.class_id as class_id , d.class_name as class_name from (select a.school_id as school_id , a.school_name as school_name , b.grade_id as grade_id , b.grade_name as grade_name from school as a left join grade as b on a.school_id = b.school_id) as c left join class as d on c.grade_id = d.grade_id) as e left join class_subject as f on e.class_id = f.class_id";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			for(var i in rs){
				for(var j in rs[i].grades){
					for(var k in rs[i].grades[j].classes){

						var subjects = [];
						for(var x in result){

							if(rs[i].grades[j].classes[k].class_id == result[x].class_id &&  rs[i].grades[j].classes[k].class_id!= null){

								var temp_subject = {};
								temp_subject.subject_id = result[x].subject_id;
								temp_subject.subject_name = result[x].subject_name;
								subjects.push(temp_subject);
							}
						}

						rs[i].grades[j].classes[k].subjects = subjects;
					}
				}

			}
			
			response.send("callback(" + JSON.stringify(rs) + ")");
		}


	});
}*/

var search_class_for_subject = function(rs, response){

	var sql = "select c.school_id as school_id , c.school_name as school_name , c.grade_id as grade_id , c.grade_name as grade_name , d.class_id as class_id , d.class_name as class_name from (select a.school_id as school_id , a.school_name as school_name , b.grade_id as grade_id , b.grade_name as grade_name from school as a left join grade as b on a.school_id = b.school_id) as c left join class as d on c.grade_id = d.grade_id";
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{

			for(var i in rs){

				for(var j in rs[i].grades){

					var classes = [];
					for(var k in result){

						if(rs[i].grades[j].grade_id == result[k].grade_id && rs[i].grades[j].grade_id!= null){
							var temp_class = {};
							temp_class.class_id = result[k].class_id;
							temp_class.class_name = result[k].class_name;
							classes.push(temp_class);
						}
					}
					rs[i].grades[j].classes = classes;
				}

			}
			response.send("callback(" + JSON.stringify(rs) +")");
			//search_subject_for_subject(rs , response);
		}

	});

}

var search_grade_for_subject = function(rs, response){

	var sql = "select * from school as a , grade  as b where a.school_id = b.school_id";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
			for (var i in rs) {
				rs[i].grades  = [];
				for (var j in result) {

					if(rs[i].school_id == result[j].school_id && rs[i].school_id!= null ){
						var temp_grade  = {};
						temp_grade.grade_id = result[j].grade_id;
						temp_grade.grade_name = result[j].grade_name;
						rs[i].grades.push(temp_grade);
					}
				
				}
			}
			search_class_for_subject(rs , response);
			//response.send("callback(" + JSON.stringify(rs) +")");
		}

	});

}

exports.getAllSubject = function(request , response){
	var sql = "select * from school";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			var rs = [];

			for (var i = 0; i < result.length; i++) {
					
				var temp_school = {};
				temp_school.school_id = result[i].school_id;
				temp_school.school_name = result[i].school_name;
				rs.push(temp_school);
			}

			search_grade_for_subject(rs , response);

		}
	});


}




/*var search_class_for_class = function(rs, response){

	var sql = "select c.school_id as school_id , c.school_name as school_name , c.grade_id as grade_id , c.grade_name as grade_name , d.class_id as class_id , d.class_name as class_name from (select a.school_id as school_id , a.school_name as school_name , b.grade_id as grade_id , b.grade_name as grade_name from school as a left join grade as b on a.school_id = b.school_id) as c left join class as d on c.grade_id = d.grade_id";
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{

			for(var i in rs){

				for(var j in rs[i].grades){

					var classes = [];
					for(var k in result){

						if(rs[i].grades[j].grade_id == result[k].grade_id && rs[i].grades[j].grade_id!= null){
							var temp_class = {};
							temp_class.class_id = result[k].class_id;
							temp_class.class_name = result[k].class_name;
							classes.push(temp_class);
						}
					}
					rs[i].grades[j].classes = classes;
				}

			}
			response.send("callback(" + JSON.stringify(rs) +")");
		}

	});

}*/

var search_grade_for_class = function(rs, response){

	var sql = "select * from school as a , grade  as b where a.school_id = b.school_id";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
			for (var i in rs) {
				rs[i].grades  = [];
				for (var j in result) {

					if(rs[i].school_id == result[j].school_id ){
						var temp_grade  = {};
						temp_grade.grade_id = result[j].grade_id;
						temp_grade.grade_name = result[j].grade_name;
						rs[i].grades.push(temp_grade);
					}
				
				}
			}
			//search_class_for_class(rs , response);
			response.send("callback(" + JSON.stringify(rs) +")");
		}

	});

}

exports.getAllClass = function(request , response){
	var sql = "select * from school";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			var rs = [];

			for (var i = 0; i < result.length; i++) {
					
				var temp_school = {};
				temp_school.school_id = result[i].school_id;
				temp_school.school_name = result[i].school_name;
				rs.push(temp_school);
			}

			search_grade_for_class(rs , response);

		}
	});


}


/*var search_grade = function(schools , response){

	var sql = "select * from school as a , grade  as b where a.school_id = b.school_id";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			var rs = [];
			for (var i in schools) {

				var school = {};
				school.school_id = schools[i].school_id;
				school.school_name = schools[i].school_name;
				school.grades  = [];
				for (var j in result) {

					if(schools[i].school_id == result[j].school_id){
						var temp_grade  = {};
						temp_grade.grade_id = result[j].grade_id;
						temp_grade.grade_name = result[j].grade_name;
						school.grades.push(temp_grade);
					}
				
				}
				
				rs.push(school);
			}
			response.send("callback(" + JSON.stringify(rs) +")");
		}

	});

}*/
exports.getAllGrade = function(request , response){	
	//两层先把第一层数据都找到
	var sql = "select * from school";
	//var sql = "select * from school as a , grade  as b where a.school_id = b.school_id";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			//search_grade(result , response);

			response.send("callback(" + JSON.stringify(result) +")");
		}
	});

}

//这个方法是得到现在已经有哪些学校
exports.getAllSchool = function(request , response){

	var sql = "select * from school";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
			response.send("callback(" + JSON.stringify(result) +")");
		}

	});
}

exports.checkSchool = function(request , response){

	var school_name = request.query.school_name;
	school_name = JSON.stringify(school_name);
	var sql = "select * from school where school.school_name =" + school_name;
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
			if(result.length == 0){
				response.send("callback(" + JSON.stringify('true')+')');
			}else{
				response.send('callback(' + JSON.stringify('false') +')');
			}
			
		}
	});

}


var insertSchool = function(school_name , response){

	var sql = "insert into school set school_name =" + school_name;
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			response.send("callback(" + "{value : true}" +")");
		}
	})

}

//添加学校  但是不能光相信前台校验  自己在后台还是再次校验
exports.addschool = function(request , response){

	var school_name = request.query.school_name;
	school_name = JSON.stringify(school_name);
	var sql = "select a.school_name  as school_name from school as a where a.school_name =" + school_name;
	connection.query(sql, function(err , result){

		if(err){
			console.log(err);
		}else{
			if(result.length > 0){
				response.send("callback(" + "{value : false}" +")");
			}else{
				insertSchool(school_name , response);
			}
		}

	});
}

var insertGrade = function(school_id ,grade_name , response){

	var sql = "insert into grade (school_id , grade_name) values("+school_id+" , "+grade_name +")";
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			response.send("callback(" + "{value : true}" +")");
		}
	})

}

//添加年级
exports.addgrade = function(request , response){
	var school_id =  request.query.school_id;
	var grade_name = request.query.grade_name;
	grade_name = JSON.stringify(grade_name);
	var sql = "select a.school_id as school_id , a.grade_name  as grade_name from grade as a where a.school_id =" + school_id +" and  a.grade_name = " + grade_name;
	connection.query(sql, function(err , result){

		if(err){
			console.log(err);
		}else{
			if(result.length > 0){
				response.send("callback(" + "{value : false}" +")");
			}else{
				insertGrade(school_id , grade_name , response);
				//insertSchool(school_name , response);
			}
		}

	});
}

var insertClass = function(grade_id , class_name , response){

	var sql = "insert into class (grade_id , class_name) values("+grade_id+" , "+class_name +")";
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			response.send("callback(" + "{value : true}" +")");
		}
	})

}
//添加班级
exports.addclass = function(request , response){
	var school_id =  request.query.school_id;
	var grade_id = request.query.grade_id;
	var class_name = request.query.class_name;
	class_name = JSON.stringify(class_name);
	var sql = "select a.grade_id as grade_id , a.class_name  as class_name from class as a where a.grade_id =" + grade_id +" and  a.class_name = " + class_name;
	connection.query(sql, function(err , result){

		if(err){
			console.log(err);
		}else{
			if(result.length > 0){
				response.send("callback(" + "{value : false}" +")");
			}else{
				insertClass(  grade_id , class_name , response);
				//insertSchool(school_name , response);
			}
		}

	});
}
var insertClassSubject = function(  class_id , class_subject_name , response){

	var sql = "insert into class_subject (class_id , class_subject_name) values("+class_id+" , "+class_subject_name +")";
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			response.send("callback(" + "{value : true}" +")");
		}
	})

}

//添加科目
exports.addclasssubject = function(request , response){
	var school_id =  request.query.school_id;
	var grade_id = request.query.grade_id;
	var class_id = request.query.class_id ;
	var class_subject_name = request.query.class_subject_name;
	class_subject_name = JSON.stringify(class_subject_name);
	var sql = "select a.class_id as class_id , a.class_subject_name  as class_subject_name from class_subject as a where a.class_id =" + class_id +" and  a.class_subject_name = " + class_subject_name;
	connection.query(sql, function(err , result){

		if(err){
			console.log(err);
		}else{
			if(result.length > 0){
				response.send("callback(" + "{value : false}" +")");
			}else{
				insertClassSubject(  class_id , class_subject_name , response);
				//insertSchool(school_name , response);
			}
		}

	});
}