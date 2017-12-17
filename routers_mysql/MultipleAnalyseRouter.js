var connection = require("../DBConnection/DBConnection.js");

var res ;
var rs ;
var search_school = function(papers, school_id){

	 var paper_ids = "(";
	 for(var i = 0 ; i < papers.length -1 ; i++){

	 	paper_ids += papers[i].paper_id + " ,";

	 }

	 paper_ids += papers[papers.length - 1].paper_id;
	 paper_ids += ")";

	 var sql = "select * from (select sum(a.score) as score  , a.paper_id as paper_id from each_question_score as a where a.school_id = "+school_id +" and paper_id in " +paper_ids +"group by a.paper_id , a.student_id ) as b , paper as c where b.paper_id = c.paper_id order by c.paper_id";
	 connection.query(sql , function(err , result){

	 		if(err){
	 			console.log(err);
	 		}else{

	 			var school_p = [] ;

	 			for(var i in papers){

	 				var temp = {};
	 				temp.paper_id = papers[i].paper_id;
	 				temp.paper_name = papers[i].paper_name;
	 				temp.test_time = papers[i].test_time;
	 				var total = result.length;
	 				var good = 0;
	 				for(var j in result){

	 					if(result[j].paper_id == papers[i].paper_id){

	 						if(result[j].score > 85){
	 							good++;
	 						}

	 					}

	 				}

	 				if(total > 0)
	 				var school_very_good_p = (good / total).toFixed(4)*100;
	 				temp.school_very_good_p = school_very_good_p;
	 				school_p.push(temp);
	 			}

	 			school_p.sort(function(a , b){
	 				return a.paper_id - b.paper_id;
	 			})

	 			var class_p = [];

	 			for(var i in rs.papers){

	 				var temp={};
	 				temp.paper_id = rs.papers[i].paper_id;
	 				temp.paper_name = rs.papers[i].paper_name;
	 				temp.test_time = rs.papers[i].test_time;
	 				var total = rs.papers[i].class_data.very_good + rs.papers[i].class_data.good + rs.papers[i].class_data.middle + rs.papers[i].class_data.poor;
	 				temp.class_very_good_p = (rs.papers[i].class_data.very_good/total).toFixed(4)*100;

	 				class_p.push(temp);
	 			}

	 			rs.class_very_good_p = class_p;
	 			rs.school_very_good_p = school_p;

	 			res.send("callback (" + JSON.stringify(rs) +")");
	 		}

	 });
	 

}

var search_papers = function(papers , class_id , school_id){

	var sql = "select g.paper_id as paper_id , g.paper_name as paper_name , g.test_time as test_time , h.class_id as class_id , sum(h.score) as score from (select e.paper_id as paper_id , e.paper_name as paper_name , e.test_time as test_time , f.paper_question_id as paper_question_id , f.question_goal as question_goal  from (select d.paper_id as paper_id , d.paper_name as paper_name , d.test_time as test_time  from  (select b.paper_id from (select * from student where class_id ="+class_id+") as a , student_paper_relationship as b where a.student_id = b.student_id group by paper_id )as c , paper as d  where c.paper_id = d.paper_id) as e , paper_questions as f where e.paper_id = f.paper_id) as g , each_question_score as h where h.class_id = "+class_id+" and g.paper_id = h.paper_id and g.paper_question_id = h.paper_question_id group by h.class_id , h.student_id  , g.paper_id order by paper_id";
	
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{

			 rs ={};
			rs.paper_ids = papers;
			rs.papers = [];
			for(var i in papers){

				var temp = {};
				temp.paper_id = papers[i].paper_id;
				temp.paper_name = papers[i].paper_name;
				temp.test_time = papers[i].test_time;
				var class_data = {};
				class_data.very_good = 0;
				class_data.good = 0;
				class_data.middle = 0;
				class_data.poor = 0;
				for(var j in result){
					if(result[j].paper_id == papers[i].paper_id){

						if(result[j].score < 60){
							class_data.poor++;
						}else if(result[j].score < 75 ){
							class_data.middle ++ ;
						}else if(result[j].score < 85){
							class_data.good ++;
						}else{
							class_data.very_good ++;
						}
					}
					
				}

				temp.class_data = class_data ;
				rs.papers.push(temp);
			}
			rs.papers.sort(function(a , b){

				return a.paper_id - b.paper_id;
			});

			search_school(rs.paper_ids , school_id);
			//res.send("callback(" + JSON.stringify(result) +")");
		}
	})
}



//有个问题  没有用subject_id  后面会有问题
exports.multipleAnalyse_mysql = function(request , response){

	var class_id = request.query.class_id;
	var school_id = request.query.school_id;

	class_id = JSON.stringify(class_id);
	school_id = JSON.stringify(school_id);

	res = response;
	//需要 class_id   //麻烦在于找到有哪些试卷 需要school_id

	var sql =  "select * from (select c.class_id as class_id , d.paper_id as paper_id from(select a.class_id as class_id , b.student_id as student_id from class as a , student as b where a.class_id = b.class_id and b.class_id = "+class_id+") as c , student_paper_relationship as d where c.student_id = d.student_id group by d.paper_id) as e , paper as f where e.paper_id = f.paper_id ";

	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
			var  rs = [];
			for(var i in result){
				var temp = {};
				temp.paper_id = result[i].paper_id;
				temp.paper_name = result[i].paper_name;
				temp.test_time = result[i].test_time;
				rs.push(temp);

			}

			//response.send("callback(" + JSON.stringify(rs)+")");
			search_papers(rs , class_id,school_id);
		}

	});
	

}