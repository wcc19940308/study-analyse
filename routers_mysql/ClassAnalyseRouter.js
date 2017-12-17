var connection = require("../DBConnection/DBConnection.js");

var rs ;
var res ;

var class_analyse_type = function(paper_id , class_id){

	var sql = " select sum(e.question_goal) as total_goal , sum(f.score) as score , e.question_type_name as question_type_name  from  (select c.paper_question_id as paper_question_id , c.question_goal as question_goal , c.question_type_id as question_type_id , d.question_type_name as question_type_name from (select b.paper_question_id as paper_question_id , b.question_goal as question_goal , b.question_type_id as question_type_id from (select * from paper where paper_id =\'1\' ) as a  , paper_questions as b where a.paper_id = b.paper_id ) as c , question_type as d where c.question_type_id = d.question_type_id) as e , each_question_score as f  where e.paper_question_id = f.paper_question_id and f.class_id = "+class_id +" and f.paper_id = "+paper_id +"group by e.question_type_id";

	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			var caculate_type_array = [];
			for(var i in result){

	 			var temp = {};
	 			temp.degree = (result[i].score / result[i].total_goal).toFixed(4)*100;
	 			temp.question_type = result[i].question_type_name;
	 			caculate_type_array.push(temp);
	 		}

	 		rs.caculate_type_array = caculate_type_array;
			res.send("callback(" + JSON.stringify(rs) +")");
		}


	})
}


exports.class_analyse = function (request , response) {
	
	var class_id = request.query.class_id;
	var paper_id = request.query.paper_id;
	class_id = JSON.stringify(class_id);
	paper_id = JSON.stringify(paper_id);

	res = response ;
	 var sql = "select sum(e.question_goal) as total_goal , sum(f.score) as score  , e.kpname  as kpname  from (select c.paper_question_id as paper_question_id , c.question_goal as question_goal , c.level_one_knowledge_point_id as kpid , d.level_one_knowledge_point_name as kpname  from  (select b.paper_question_id as paper_question_id , b.question_goal as question_goal , b.question_type_id as question_type_id ,b.level_one_knowledge_point_id as level_one_knowledge_point_id from (select * from paper where paper_id ="+paper_id+" ) as a  , paper_questions as b where a.paper_id = b.paper_id ) as c , level_one_knowledge_point  as d where c.level_one_knowledge_point_id = d.level_one_knowledge_point_id ) as e , each_question_score as f where e.paper_question_id = f.paper_question_id and f.paper_id ="+paper_id+" and f.class_id = "+class_id+" group by e.kpid" ;

	 connection.query(sql , function(err , result){

	 	if(err){
	 		console.log(err);
	 	}else{

	 		rs = {};
	 		var array = [];

	 		for(var i in result){

	 			var temp = {};
	 			temp.degree = (result[i].score / result[i].total_goal).toFixed(4)*100;
	 			temp.kp_name = result[i].kpname;
	 			array.push(temp);
	 		}
	 		rs.array = array;
	 		class_analyse_type(paper_id ,class_id);

	 		
	 		//response.send("callback(" + JSON.stringify(rs) +")");
	 	}

	 });

}