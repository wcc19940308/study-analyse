
var connection = require("../DBConnection/DBConnection.js");


var res ;
var rs ;

exports.search_papers = function(request , response){

	var class_id = request.query.class_id;
	var class_subject_id = request.query.class_subject_id;

	class_id = JSON.stringify(class_id);
	class_subject_id = JSON.stringify(class_subject_id);

	var sql = "select * from (select a.paper_id as paper_id from  (select student.student_id as student_id from student where class_id = " + class_id +") as student_num , student_paper_relationship as a where student_num.student_id = a.student_id and a.class_subject_id= " + class_subject_id + "group by paper_id" + ") as paper_ids , paper  group by paper.paper_id";
	//var sql = "select std.school_id as school_id_std , std.grade_id as grade_id_std , std.class_id as class_id_std,std.student_id as student_id_std from (select a.school_id as school_id , b.grade_id as grade_id , c.class_id as class_id from school as a , grade  as b, class as c where a.school_id = b.school_id and b.grade_id = c.grade_id and class_id =" + class_id +") as sgc  , student as std having class_id_std=" + class_id ;
	//var sql = "select * from student_paper_relationship where in (select std.school_id as school_id_std , std.grade_id as grade_id_std , std.class_id as class_id_std,std.student_id as student_id_std from (select a.school_id as school_id , b.grade_id as grade_id , c.class_id as class_id from school as a , grade  as b, class as c where a.school_id = b.school_id and b.grade_id = c.grade_id and class_id =" + class_id +") as sgc  , student as std having class_id_std=" + class_id +").student_id_std";

	//var sql = "select * from student_paper_relationship where student_id in (select std.student_id as student_id_std from (select a.school_id as school_id , b.grade_id as grade_id , c.class_id as class_id from school as a , grade  as b, class as c where a.school_id = b.school_id and b.grade_id = c.grade_id and class_id =" + class_id +") as sgc  , student as std having class_id_std=" + class_id  +")";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
			console.log("can not find papers !");
		}else{

				if(result.length <=0){

						response.send("callback(" + JSON.stringify("[]"));
				}else{

					var rs = [];
					for(var i in result){

						var temp ={};
						temp.paper_id = result[i].paper_id;
						temp.paper_name = result[i].paper_name;
						rs.push(temp);
					}

				}

			response.send("callback(" + JSON.stringify(rs) + ")");
		}


	});



}



var search_school = function( class_id , paper_id){

//要先用class_id 来找到grade_id  其实一样的 select student_questions.student_name as student_name ,  each_question_score.student_id as student_id , sum(each_question_score.score) as total  from       + "group by student_name , each_question_score.score  ,student_id"
	
	var sql = " select each_question_score.class_subject_id  as class_subject_id,  each_question_score.paper_id  as paper_id, student_questions.student_name as student_name , each_question_score.student_id as student_id , sum(each_question_score.score) as total from (select * from (select * from (select class.grade_id as grade from class where class_id = " + class_id +") as a  , student  where a.grade = student.grade_id) as std_ids  , (select paper_questions.paper_question_id as paper_question_id from paper_questions where paper_id = " + paper_id+ ") as paper_ids) as student_questions  , each_question_score where student_questions.paper_question_id = each_question_score.paper_question_id and student_questions.student_id = each_question_score.student_id and each_question_score.paper_id = " + paper_id +" and student_questions.paper_question_id = each_question_score.paper_question_id  group by each_question_score.student_id , student_questions.student_name , each_question_score.paper_id , each_question_score.class_subject_id  ";  //这个语句可以查到所有的学生学号

	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{


					var total_num = result.length ;
					var poor = 0 ;
					var middle = 0 ;
					var good = 0 ; 
					var very_good = 0 ;
					var temp = 0;
				for(var i = 0 ; i < total_num ; i++){
					temp = parseInt(result[i].total);
					if (temp <60) {
						poor ++ ;
					}else if(temp >=60 && temp < 75){
						middle++;
					}else if(temp >=75 && temp <85){
						good++;
					}else{
						very_good++;
					}
				}

				var school_data_p = {};
				school_data_p.total_num = total_num ;
				school_data_p.very_good_p = (very_good/total_num).toFixed(4)*100;
				school_data_p.good_p = (good/total_num).toFixed(4)*100;
				school_data_p.middle_p = (middle/total_num).toFixed(4)*100 ;
				school_data_p.poor_p = (poor/total_num).toFixed(4)*100;

				rs.school_data_p = school_data_p;



			res.send("callback(" + JSON.stringify(rs) +")");
		}

	})


}
exports.search_grade_classification_mysql = function(request , response){

	//班级表设计的比较好  只要有班级ID 就可以查到所有学生ID

	//还要用paper_id 查到这个试卷有哪些题
	res = response;

	//现在需要的参数有  class_id  paper_id
	//count(each_question_score.score) as total , student_questions.student_id as student_id , student_questions.student_name as student_num       group by student_questions.student_id and student_questions.student_name
	//var sql = "(select  paper_ques.paper_question_id  as paper_question_id from paper_questions as paper_ques where paper_ques.paper_id = \"1\" )as paper_ids ";
	var class_id = request.query.class_id;
	var paper_id = request.query.paper_id;

	class_id = JSON.stringify(class_id);
	paper_id = JSON.stringify(paper_id);

	var sql = " select each_question_score.class_subject_id  as class_subject_id, student_questions.class_id  as class_id , each_question_score.paper_id  as paper_id, student_questions.student_name as student_name , each_question_score.student_id as student_id , sum(each_question_score.score) as total from (select * from (select * from student where class_id =" + class_id +" ) as std_ids  , (select  paper_ques.paper_question_id  as paper_question_id from paper_questions as paper_ques where paper_ques.paper_id = "+ paper_id +" )as paper_ids ) as student_questions  , each_question_score where student_questions.class_id = each_question_score.class_id and student_questions.student_id = each_question_score.student_id and each_question_score.paper_id ="+ paper_id +" and student_questions.paper_question_id = each_question_score.paper_question_id  group by each_question_score.student_id , student_questions.student_name , student_questions.class_id , each_question_score.paper_id , each_question_score.class_subject_id  ";  //这个语句可以查到所有的学生学号

	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
			console.log("can not search  grade classification for class!");
		}else{

			if(result.length <= 0){

			}else{




			var total_num = result.length ;
			var poor = 0 ;
			var middle = 0 ;
			var good = 0 ; 
			var very_good = 0 ;
			var total_goal = 0 ;
			var scores = [] ;
			var temp = 0;

			for(var i = 0 ; i < total_num ; i++){
				scores.push(parseInt(result[i].total));
				temp = parseInt(result[i].total);
				if (temp <60) {
					poor ++ ;
				}else if(temp >=60 && temp < 75){
					middle++;
				}else if(temp >=75 && temp <85){
					good++;
				}else{
					very_good++;
				}

				total_goal += temp;
			}
			scores.sort();
			var average = (total_goal/total_num).toFixed(2);

			//算标准差 
			var pingfanghe = 0 ;
			for(var i = 0 ; i < scores.length ; i++){
					pingfanghe = Math.pow(scores[i]-average ,2);
			}
			//这个是标准差
			var b = (Math.pow(pingfanghe/total_num , 1/2)).toFixed(2) ;

			//这个是来计算试卷难度
			var low = Math.floor(total_num*0.27) ; var high = Math.floor(total_num*0.63) ;
			var low_average = 0 ; var high_average = 0 ;
			var low_t = 0 ; var high_t = 0 ;
			for(var i = 0 ; i < low ; i++){

				low_t += scores[i];
			}
			for(var i = high ; i< total_num ; i++){
				high_t += scores[i];
			}
			low_average = low_t/low ;  high_average = high_t/(total_num - high);

			//这个是区分度
			var quf = ((high_average - low_average)/100).toFixed(2) ;
			//这个是难度
			var difficult = (average/100).toFixed(2);
			
			var data = {};
			data.total_num = total_num ;
			data.very_good = very_good;
			data.good = good;
			data.middle = middle ;
			data.poor = poor;
			data.average = average ;
			data.bz = b ;
			data.difficult = difficult;
			data.qufd = quf;

			var class_data_p = {};
			 class_data_p.total_num = total_num ;
			 class_data_p.very_good_p = (very_good/total_num).toFixed(4)*100;
			 class_data_p.good_p = (good/total_num).toFixed(4)*100;
			 class_data_p.middle_p = (middle/total_num).toFixed(4)*100;
			 class_data_p.poor_p = (poor/total_num).toFixed(4)*100;
			  rs ={};
			 rs.class_data = data ;
			 rs.class_data_p = class_data_p;


			 search_school(class_id , paper_id);
				//response.send("callback(" + JSON.stringify(rs)+")");


			}


		}

	});


}



exports.search_subject = function(request , response){

	var  class_id = request.query.class_id;
	var  teacher_account = request.query.teacher_account;
	class_id = JSON.stringify(class_id);
	teacher_account = JSON.stringify(teacher_account);

	var sql = "select * from teacher as a , class_subject as b where a.account =" + teacher_account +"  and a.teacher_id = b.teacher_id and b.class_id = " + class_id;

	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
			console.log("can not search_subject by class_id!");
		}else{

			if(result.length < 0){
				//response.send("callback(" + JSON.stringify(result) +")");
			}else{

				var res = [];
				for(var i in result){
					var temp = {};
					temp.class_subject_id = result[i].class_subject_id;
					temp.class_subject_name = result[i].class_subject_name;
					res.push(temp);
				}
				response.send("callback(" + JSON.stringify(res) +")");

			}
			

		}

	});





}