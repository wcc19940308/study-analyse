var connection = require("../DBConnection/DBConnection.js");

//这个是用来保存一个全局的response 来方便在任何地方都能返回结果
var res ;
//这个是用来保存结果  来方便在任何地方都能来拼接结果
var rs = {};

var exitence = function(arr , item){

	for(var i in arr){
		if(item.class_id == arr[i].class_id){
			return i;
		}
	}
	return -1;
}

/*var search_subject = function( classes){

	//下面这一段代码是为了把数组拼接成 (a,b)这样的形式
	var arr = "("

	for(var i =0 ; i < classes.length -1 ; i++){

		arr += JSON.stringify(classes[i]) + ',';
	}
	arr += JSON.stringify(classes[classes.length-1]);
	arr = arr + ")";


	var sql = "select * from class_subject where class_id in " + arr;
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
			console.log("can not search_subject!");
		}else{
			res.send("callback(" + JSON.stringify(result) +")");
			connection.end();
		}
	});

}

var search_classes = function(account){

	var teacher_account = JSON.stringify(account);
	//var sql = "select * from teacher as a , class_subject as b where a.class_subject_id = b.class_subject_id having a.account =" + teacher_account +"  group by account";
	//var sql = " select mid.class_id from (select a.account as account , b.class_id as class_id from teacher as a , class_subject as b where a.class_subject_id = b.class_subject_id having a.account =" + teacher_account + " ) as mid" +"  group by class_id";
	var sql = " select a.account as account , b.class_id as class_id  , a.class_subject_id as class_subject_id from teacher as a , class_subject as b where a.class_subject_id = b.class_subject_id having a.account =" + teacher_account ;
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
			console.log("can not search classes for teacher !");
		}else{

			if(result.length > 0){

				var classes = [];
				for(var i in result){
					classes.push(result[i].class_id);
				}

				//search_subject(classes);

			}else{
				console.log("can not find classes !");
			}
			res.send("callback(" + JSON.stringify(result) +")");
			connection.end();
		}
	});
}
*/

var search_papers = function(){

	var class_subject_papers   = rs.class_subject_papers;

	var sql =  " select * from (select g.class_subject_id as class_subject_id , g.class_subject_name as class_subject_name , g.class_id as class_id , g.class_name as class_name , h.paper_id as paper_id from (select e.class_subject_id as class_subject_id , e.class_subject_name as class_subject_name , e.class_id as class_id , e.class_name as class_name , f.student_id as student_id from(select c.class_subject_id as class_subject_id , c.class_subject_name as class_subject_name , c.class_id as class_id , d.class_name as class_name from (select b.class_subject_id as class_subject_id , b.class_id as class_id , b.class_subject_name as class_subject_name  from teacher as a , class_subject as b where a.teacher_id = b.teacher_id and a.account = \"t_0001\") as c , class as d where c.class_id = d.class_id ) as e , student as f where e.class_id = f.class_id) as g , student_paper_relationship as h where g.student_id = h.student_id group by h.class_subject_id , class_id , paper_id) as i , paper as j where i.paper_id = j.paper_id";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

		for(var i in class_subject_papers){
			for(var j in class_subject_papers[i].subjects){
				var temp_test_papers = [];
				for(var k in result){
					if(class_subject_papers[i].class_id == result[k].class_id && class_subject_papers[i].subjects[j].subject_id == result[k].class_subject_id){
						var temp_papers = {};
						temp_papers.paper_id = result[k].paper_id;
						temp_papers.paper_name = result[k].paper_name;
						temp_papers.test_time = result[k].test_time;
						temp_test_papers.push(temp_papers);
					}
				}
				rs.class_subject_papers[i].subjects[j].test_papers = temp_test_papers;
			}

		}	

			res.send("callback(" +  JSON.stringify(rs) +")");
		}

	});

}




var search = function(account){

/*	var account = request.query.account;
	account = JSON.stringify(account);
	res = response;*/
	var sql = " select * from  (select a.account as account , a.teacher_name as teacher_name , school_id as school_id , b.class_subject_id as class_subject_id , b.class_subject_name as class_subject_name , b.class_id as class_id from teacher as a , class_subject as b where a.teacher_id = b.teacher_id and a.account ="+account+") as c , class as d where c.class_id = d.class_id";

	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			rs = {};
			var class_ids = [];
			var class_subject_ids = [];
			var classes = [];
			var subjects = [];

			for(var i in result){

				rs.school_id = result[i].school_id;
				rs.teacher_id = result[i].account;
				rs.teacher_name = result[i].teacher_name;
				
				class_ids.push(result[i].class_id);
				class_subject_ids.push(result[i].class_subject_id);
				
				var temp_class = {};
				temp_class.class_id = result[i].class_id;
				temp_class.class_name = result[i].class_name;
				classes.push(temp_class);

				var temp_subject = {};
				temp_subject.subject_id = result[i].class_subject_id;
				temp_subject.subject_name = result[i].class_subject_name;
				subjects.push(temp_subject);

			}
			rs.class_ids = class_ids;
			rs.classes = classes;
			rs.subject_ids = class_subject_ids;
			rs.subjects = subjects;

			var class_subject_papers =[];
			for(var i in classes){
				var temp_class = {};
				temp_class.class_id = classes[i].class_id;
				temp_class.class_name = classes[i].class_name;
				temp_class.subjects = [];
				for(var j in result ){

					if(result[j].class_id == classes[i].class_id){
						var temp_subject = {};
						temp_subject.class_id   = classes[i].class_id;
						temp_subject.class_name = classes[i].class_name;
						temp_subject.subject_id = result[j].class_subject_id;
						temp_subject.subject_name = result[j].class_subject_name;
						temp_class.subjects.push(temp_subject);
					}
				}
				class_subject_papers.push(temp_class);
			}

			rs.class_subject_papers = class_subject_papers;

			search_papers();
		}

	});

}

exports.login = function(request , response){

	res = response;
	var school_id = request.query.school_id;
	var account = request.query.account ;
	var password = request.query.password;

	school_id = JSON.stringify(school_id);
	account  = JSON.stringify(account);
	password = JSON.stringify(password);
	var sql = "select * from  teacher as a where a.school_id = "+school_id+"and a.account = "+account+"and a.passwd = "+password;
	connection.query(sql , function(err, result){

		if(err){
			console.log(err);
		}else{

			if(result.length >= 1){
				search(account);
			}else{

				response.send("callback(" + "false" +")");

			}
			
		}


	});

}

exports.getAllSchool = function(request,response){
	res = response;
	var sql = "select * from school";
	connection.query(sql,function(err,result){
		if(err){
			console.log(err);
		}
		else{
			rs = [];
			for(var i in result) {
            	var temp = {};
            	temp.school_id = result[i].school_id;
            	temp.school_name = result[i].school_name;
            	rs.push(temp);
            }

			res.send("callback (" + JSON.stringify(rs) +")");
		}
	})
}
//这个函数拼接了teacher subject class 三张表  后面还是有数据拼接 想把数据拼接的代码独立出来
// 封装成一个函数 这样以后用不同的策略拼接数据的时候就很好换了
/*exports.search = function(request , response){
	 var  school_id = request.query.school_id;
		//用来做测试
		res = response;
		//var sql = "select teacher.teacher_name as teacher_name , class_subject.class_subject_name as class_subject_name  ,  class.class_name as class_name from  (teacher , class_subject ) where teacher.class_subject_id = class_subject.class_subject_id   JOIN class where class_subject.class_id = class.class_id having teacher.account=\"t_0001\"";
		//var sql = "select * from teacher";
		var sql = "select a.school_id as school_id , a.account as teacher_id , a.teacher_name as teacher_name , b.class_subject_id as class_subject_id , b.class_subject_name as class_subject_name , c.class_id as class_id , c.class_name as class_name  from  teacher as a , class_subject as b , class as c  where a.class_subject_id = b.class_subject_id and b.class_id = c.class_id  and a.account =\"t_0001\" ";
		connection.query(sql , function(err , result){
			if(err){
				console.log("can not search teacher table!");
			}else{
				//console.log(result);
				if(result.length > 0){

				

					//这个地方有变动 
					var class_course = [];
					var classes_id = [];
					var classes = [];
					var subject_ids =[];
					var subjects = [];
					for(var i = 0 ; i < result.length ; i++){

						//在数据里面拼接 学校ID  老师ID  老师姓名
						rs.school_id = result[i].school_id;
						rs.teacher_id = result[i].teacher_id;
						rs.teacher_name = result[i].teacher_name;

						//这个数据是  添加  那个班  什么科目  以及相应ID（这个有点啰嗦）
						//这个和前面的不一样需要处理一下
						var temp = {};
						temp.class_subject_id = result[i].class_subject_id;
						temp.class_subject_name = result[i].class_subject_name;
						temp.class_id = result[i].class_id;
						temp.class_name = result[i].class_name;
						class_course.push(temp);

						//这个是添加有什么科目
						subject_ids.push(result[i].class_subject_id);

						var temp_subject = {};
						temp_subject.subject_id = result[i].class_subject_id;
						temp_subject.subject_name = result[i].class_subject_name;
						subjects.push(temp_subject);

						//这个是添加带了哪些班级
						classes_id.push(result[i].class_id);

						var temp_class = {};

						temp_class.class_id = result[i].class_id;
						temp_class.class_name = result[i].class_name;
						classes.push(temp_class);

					}
					rs.classes_id = classes_id;
					rs.classes = classes;
					rs.subject_ids = subject_ids;
					rs.subjects = subjects;
					rs.class_course = class_course;


					//下面这些代码是拼两级数据的
/*					var class_subject_papers = [];

					for(var i in rs.class_course){

						var temp = {};
						temp.class_id = (rs.class_course[i]).class_id;
						temp.class_name = (rs.class_course[i]).class_name;
						var x = exitence(class_subject_papers , temp);
						console.log(x);
						if(x > -1){

							var subject  = {};
							subject.subject_id = (rs.class_course[i]).class_subject_id;
							subject.subject_name = (rs.class_course[i]).class_subject_name;
							class_subject_papers[x].subjects.push(subject);

						}else{

							var subjects = [];
							var subject_temp = {};
							subject_temp.subject_id = (rs.class_course[i]).class_subject_id;
							subject_temp.subject_name = (rs.class_course[i]).class_subject_name;
							subjects.push(subject_temp);
							temp.subjects = subjects;
							class_subject_papers.push(temp);

						}

					}



					rs.class_subject_papers = class_subject_papers;*/
					//search_classes(rs.teacher_id);
					//console.log(rs.class_subject_papers);
					/*response.send("callback(" + JSON.stringify(result) +")");
				}else{
					console.log("The teacher have not teaching any class！");
				}

				
			}
		});



}*/

