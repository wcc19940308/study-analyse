var connection = require("../DBConnection/DBConnection.js");

exports.search_student = function(request , response){


	var class_id = request.query.class_id;
	class_id = JSON.stringify(class_id);

	var sql = "select a.student_name as student_name , a.student_id from student as a where a.class_id =" + class_id;

	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{

			//这个数据很简单 不用转换
			response.send("callback(" + JSON.stringify(result) +")");
		}
	});

}
var rs ;
var res ;
var search_type = function(class_id , paper_id , student_id){
var sql ="select sum(std.score) as score , sum(question_types.question_goal) as goal ,  question_types.question_type_name  as question_type_name  from (select * from each_question_score where class_id ="+class_id+" and student_id ="+ student_id +" and paper_id ="+paper_id+" ) as std , (select * from (select paper.paper_name as paper_name , paper.test_time as test_time  , paper_questions.question_goal  as question_goal , paper_questions.question_name  as question_name , paper_questions.question_type_id  as qt_id , paper_questions.paper_question_id as paper_question_id from paper_questions , paper where paper.paper_id = paper_questions.paper_id and paper.paper_id = "+ paper_id +" ) as questions , question_type as questiontp where questions.qt_id = questiontp.question_type_id ) as question_types where std.paper_question_id = question_types.paper_question_id group by  question_types.question_type_id ";
	//var sql ="select count(std.score) as score , count(questions.question_goal) as question_goal  , questions.question_type_name as question_type_name  from (select * from each_question_score where class_id ="+class_id+" and student_id ="+ student_id +" and paper_id ="+paper_id+" ) as std , (select * from (select paper.paper_name as paper_name , paper.test_time as test_time  , paper_questions.question_goal  as question_goal , paper_questions.question_name  as question_name , paper_questions.question_type_id  as qt_id , paper_questions.paper_question_id as paper_question_id from paper_questions , paper where paper.paper_id = paper_questions.paper_id and paper.paper_id = "+ paper_id +" ) as questions , question_type as questiontp where questions.qt_id = questiontp.question_type_id ) as question_types where std.paper_question_id = question_types.paper_question_id group by questions.paper_question_id";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			var caculate_type_array = [];
			for(var i in result){

				var temp = {};
				temp.degree = (result[i].score / result[i].goal).toFixed(4)*100;
				temp.question_type = result[i].question_type_name;
				caculate_type_array.push(temp);
			}
			rs.caculate_type_array = caculate_type_array;
			res.send("callback(" + JSON.stringify(rs) +")");
		}
	});

}

exports.studentanalyse = function(request ,response){

	//需要三参数班级ID  试卷ID  学号
	res = response;
	var  class_id = request.query.class_id;
	var paper_id = request.query.paper_id;
	var student_id = request.query.student_id;
	class_id = JSON.stringify(class_id);
	paper_id = JSON.stringify(paper_id);
	student_id = JSON.stringify(student_id);

	//这段sql查到了试卷相关的所有题目
	//var sql = "select questions.paper_question_id as paper_question_id , questions.question_goal as question_goal , questions.question_name as question_name , kps.level_one_knowledge_point_id as kp_id , kps.level_one_knowledge_point_name as kpname from (select paper.paper_name , paper.test_time  , paper_questions.question_goal , paper_questions.question_name , paper_questions.level_one_knowledge_point_id from paper_questions , paper where paper.paper_id = paper_questions.paper_id and paper.paper_id = \" 1\" ) as questions , level_one_knowledge_point as kps where questions.level_one_knowledge_point_id = kps.level_one_knowledge_point_id";
	//var sql = " select * from (select paper.paper_name as paper_name , paper.test_time as test_time  , paper_questions.question_goal  as question_goal , paper_questions.question_name  as question_name , paper_questions.level_one_knowledge_point_id  as kp_id , paper_questions.paper_question_id as paper_question_id from paper_questions , paper where paper.paper_id = paper_questions.paper_id and paper.paper_id = \" 1\" ) as questions , level_one_knowledge_point as one_kp where questions.kp_id = one_kp.level_one_knowledge_point_id";

	//可以找到这个学生考的那一次试卷的每道题的得分
	var sql ="select * from (select * from each_question_score where class_id ="+class_id+" and student_id ="+ student_id +" and paper_id ="+paper_id+" ) as std , (select * from (select paper.paper_name as paper_name , paper.test_time as test_time  , paper_questions.question_goal  as question_goal , paper_questions.question_name  as question_name , paper_questions.level_one_knowledge_point_id  as kp_id , paper_questions.paper_question_id as paper_question_id from paper_questions , paper where paper.paper_id = paper_questions.paper_id and paper.paper_id = "+ paper_id +" ) as questions , level_one_knowledge_point as one_kp where questions.kp_id = one_kp.level_one_knowledge_point_id) as kp where std.paper_question_id = kp.paper_question_id" ;
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			  rs = {};
			var array =[];
			for(var i in result ){
				var temp = {};
				temp.kp_name = result[i].level_one_knowledge_point_name;
				temp.degree = (result[i].score/result[i].question_goal).toFixed(4)*100;
				array.push(temp);
			}	

			//还没有排序 要排序
			rs.student_id = JSON.parse(student_id);
			rs.array = array;
			search_type(class_id , paper_id , student_id);
			//response.send("callback(" + JSON.stringify(rs) +")");
		}
	});


}