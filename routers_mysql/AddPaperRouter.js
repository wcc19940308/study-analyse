/*
	create by cc on 12/9

*/
var connection = require("../DBConnection/DBConnection.js");

var res;
//检验一级知识点是否存在数据库表格里面 存在返回false  不存在返回 true
exports.checkLevelTwoKnowledgePoint = function(request , response){
	var knowledgepoint = request.query.knowledgepoint;
	knowledgepoint = JSON.stringify(knowledgepoint);
	var sql = "select * from level_two_knowledge_point  as a where a.level_two_knowledge_point_name =" + knowledgepoint;
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
			if(result.length > 0){
				response.send("callback(" + 'false' +")");
			}else{

				response.send("callback(" + 'true' +")");
			}
		}

	});
}
var insert_level_two_point = function(knowledgepoint , response){

	var sql = "insert into level_two_knowledge_point set level_two_knowledge_point_name = " + knowledgepoint;
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
			response.send("callback(" + "{value: 'success'}" +")");
		}

	});

}

//添加二级知识点
exports.addLevelTwoKnowledgePoint = function(request , response){
	var knowledgepoint = request.query.knowledgepoint;
	knowledgepoint = JSON.stringify(knowledgepoint);
	var sql = "select * from level_two_knowledge_point  as a where a.level_two_knowledge_point_name =" + knowledgepoint;
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
			if(result.length > 0){
				response.send("callback(" + 'false' +")");
			}else{
				insert_level_two_point(knowledgepoint , response);
				//response.send("callback(" + 'true' +")");
			}
		}

	});
}

var sever_for_getKp = function(rs , response){

	var sql = "select a.level_two_knowledge_point_id as level_two_knowledge_point_id , a.level_two_knowledge_point_name as level_two_knowledge_point_name  , b.level_one_knowledge_point_id as level_one_knowledge_point_id , b.level_one_knowledge_point_name as level_one_knowledge_point_name  from level_two_knowledge_point as a left join level_one_knowledge_point as b on b.level_two_knowledge_point_id = a.level_two_knowledge_point_id";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
			for(var i in  rs.knowledgepoint){
				var  level_one_point = [];
				for(var j in result){
					if(rs.knowledgepoint[i].level_two_knowledge_point_id == result[j].level_two_knowledge_point_id){
						var temp = {};
						temp.level_one_knowledge_point_id = result[j].level_one_knowledge_point_id;
						temp.level_one_knowledge_point_name = result[j].level_one_knowledge_point_name;
						level_one_point.push(temp);
					}
					rs.knowledgepoint[i].level_one_point = level_one_point;
				}
			}
			response.send("callback(" + JSON.stringify(rs) + ")");
		}

	});

}

//在点击添加知识点的时候就要把一级知识点和二级知识点之间的关系给出来

exports.getKnowledgePoint  = function(request , response){

	var sql = "select a.level_two_knowledge_point_id as level_two_knowledge_point_id , a.level_two_knowledge_point_name as level_two_knowledge_point_name from level_two_knowledge_point as a ";
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{

			var rs = {};
			rs.knowledgepoint = [] ;
			for(var i  in result){

				var temp = {};
				temp.level_two_knowledge_point_id = result[i].level_two_knowledge_point_id;
				temp.level_two_knowledge_point_name = result[i].level_two_knowledge_point_name;
				rs.knowledgepoint.push(temp);
			}
			sever_for_getKp(rs , response);
			//response.send("callback(" + JSON.stringify(result) +")");

		}

	});
}	


//添加一级知识点  这级的知识点在添加的时候 （要选择是属于哪一级的二级知识点不准为空）

exports.addLevelOneKnowledgePoint = function(request , response){
	var level_one_knowledge_point_name = request.query.level_one_knowledge_point_name;
	var level_two_knowledge_point_id   = request.query.level_two_knowledge_point_id ;
	level_one_knowledge_point_name = JSON.stringify(level_one_knowledge_point_name);
	level_two_knowledge_point_id  = JSON.stringify(level_two_knowledge_point_id);
	var sql = "insert into level_one_knowledge_point (level_one_knowledge_point_name , level_two_knowledge_point_id) values("+level_one_knowledge_point_name+" , "+level_two_knowledge_point_id+")";
	//还没检查有没有错误
	connection.query(sql , function(err , result){

		if(err){
			console.log(err);
		}else{
			response.send("callback(" + "{value: 'success'}" +")");
		}

	})
}

var insertQuestionType = function(question_type_name , response){

	var sql = "insert into question_type set question_type_name = " + question_type_name;
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			response.send("callback(" + "{value : 'true'}" +")");
		}

	});


}

//添加题型

exports.addQuestionType = function(request , response){

	var question_type_name = request.query.question_type_name;
	question_type_name = JSON.stringify(question_type_name);
	var sql = "select a.question_type_name as question_type_name from question_type  as a where a.question_type_name =" + question_type_name;
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			if(result.length > 0){
				response.send("callback(" + "{value : 'false'}" +")");
			}else{
				insertQuestionType(question_type_name , response);
			}
			//response.send("callback(" + "{value : 'true'}" +")");
		}

	});

}
var insertThinkingType = function(thinking_name , response){

	var sql = "insert into thinking set thinking_name = " + thinking_name;
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			response.send("callback(" + "{value : 'true'}" +")");
		}

	});

}

//添加思维类型

exports.addThinkingType = function(request , response){

	var thinking_name = request.query.thinking_name;
	thinking_name = JSON.stringify(thinking_name);
	var sql = "select a.thinking_name as thinking_name from thinking  as a where a.thinking_name =" + thinking_name;
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			if(result.length > 0){
				response.send("callback(" + "{value : 'false'}" +")");
			}else{
				insertThinkingType(thinking_name , response);
			}
			//response.send("callback(" + "{value : 'true'}" +")");
		}

	});

}

var insertAbilityRequire = function(ability_require_name , response){

	var sql = "insert into ability_require set ability_require_name = " + ability_require_name;
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			response.send("callback(" + "{value : 'true'}" +")");
		}

	});


}

//添加能力要求

exports.addAbilityRequire = function(request , response){

	var ability_require_name = request.query.ability_require_name;
	ability_require_name = JSON.stringify(ability_require_name);
	var sql = "select a.ability_require_name as ability_require_name from ability_require  as a where a.ability_require_name =" + ability_require_name;
	connection.query(sql , function(err , result){
		if(err){
			console.log(err);
		}else{
			if(result.length > 0){
				response.send("callback(" + "{value : 'false'}" +")");
			}else{
				insertAbilityRequire(ability_require_name , response);
			}
			//response.send("callback(" + "{value : 'true'}" +")");
		}

	});

}

//wcc
exports.addPaper = function(request,response){
    var paper_name = request.query.paper_name;
    var subject = request.query.subject;
    var test_time = request.query.test_time;
    var questionList = request.query.string_question;
    res = response;

    var rs = [];
    rs[0] = paper_name;
    rs[1] = subject;
    rs[2] = test_time;

    var sql = "insert into paper values (0,?,?,?)";
    connection.query(sql,rs,function(err,result){
        if(err)
            console.log(err);
        else {
            //console.log("添加试卷成功");
            search_paper_id(rs[0],rs[1],rs[2],questionList);
        }
    })

}

search_paper_id = function(paper_name,subject,test_time,questionList){
    paper_name = JSON.stringify(paper_name);
    subject = JSON.stringify(subject);
    test_time = JSON.stringify(test_time);
    var sql = "select * from paper where paper_name = "+paper_name+" and subject = "+subject+ " and test_time = "+test_time;
    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            var paper_id = result[0].paper_id;
            //res.send("callback("+JSON.stringify(paper_id)+")");
            //console.log("查找试卷ID成功");
            add_paper_question(paper_id,questionList);
            //res.send("callback("+JSON.stringify(paper_id)+")");
        }
    })
}

add_paper_question = function(paper_id,questionList){
    var rs = [];
    for(var i = 0; i<questionList.length; i++){
        var temp = [];
        temp[0] = 0;
        temp[1] = parseInt(paper_id);
        temp[2] = parseInt(questionList[i].question_goal);
        temp[3] = questionList[i].question_name;
        temp[4] = questionList[i].upload_time;
        temp[5] = parseInt(questionList[i].question_type_id);
        temp[6] = parseInt(questionList[i].level_one_knowledge_point_id);
        temp[7] = parseInt(questionList[i].thinking_id);
        temp[8] = parseInt(questionList[i].ability_require_id);
        temp[9] = parseInt(questionList[i].level_two_knowledge_point_id);
        rs.push(temp);
    }
    var sql = "insert into paper_questions(paper_question_id,paper_id,question_goal,question_name," +
        "upload_time,question_type_id,level_one_knowledge_point_id,thinking_id," +
        "ability_require_id,level_two_knowledge_point_id) values ?"
    connection.query(sql,[rs],function(err,result){
        if(err)
            console.log(err);
        else{
            console.log("INSERT SUCCESS 试卷信息插入成功");
            res.send("callback(" + "sucess" +")");
        }
    })
}

