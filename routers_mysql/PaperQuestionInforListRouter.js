//wcc
var connection = require("../DBConnection/DBConnection");

var res;
exports.PaperQuestionInforList = function(request,response){
    var sql = "select * from question_type";
    res = response;
    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            var rs = [];
            for(var i in result){
                var temp = {};
                temp.question_type_id = result[i].question_type_id;
                temp.question_type_name = result[i].question_type_name;
                rs.push(temp);
            }
        }
        //res.send("callback("+JSON.stringify(rs)+")");
        search_level_one_knowledge_point(rs);
    })
}

search_level_one_knowledge_point = function(rs){
    var sql = "select * from level_one_knowledge_point";
    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else {
            var rs1 = {};
            var rs2 = [];
            rs1.question_type = rs;
            for (var i in result) {
                var temp = {};
                temp.level_one_knowledge_point_id = result[i].level_one_knowledge_point_id;
                temp.level_one_knowledge_point_name = result[i].level_one_knowledge_point_name;
                rs2.push(temp);
            }
        }
        rs1.level_one_knowledge_point = rs2;
        //res.send("callback("+JSON.stringify(rs1)+")");
        search_thinking(rs1);
    })
}

search_thinking = function(rs){
    var sql = "select * from thinking";
    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            var rs1 = {};
            var rs2 = [];
            rs1.question_type =rs.question_type;
            rs1.level_one_knowledge_point = rs.level_one_knowledge_point;
            for(var i in result){
                var temp = {};
                temp.thinking_id = result[i].thinking_id;
                temp.thinking_name = result[i].thinking_name;
                rs2.push(temp);
            }
        }
        rs1.thinking = rs2;
        //res.send("callback("+JSON.stringify(rs1)+")");
        search_ability_require(rs1);
    })
}

search_ability_require = function(rs){
    var sql = "select* from ability_require";
    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            var rs1 = {};
            var rs2 = [];
            rs1.question_type =rs.question_type;
            rs1.level_one_knowledge_point = rs.level_one_knowledge_point;
            rs1.thinking = rs.thinking;
            for(var i in result){
                var temp = {};
                temp.ability_require_id  = result[i].ability_require_id ;
                temp.ability_require_name = result[i].ability_require_name;
                rs2.push(temp);
            }
        }
        rs1.ability_require = rs2;
        //res.send("callback("+JSON.stringify(rs1)+")");
        search_level_two_knowledge_point(rs1);
    })
}

search_level_two_knowledge_point = function(rs){
    var sql = "select* from level_two_knowledge_point";
    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            var rs1 = {};
            var rs2 = [];
            rs1.question_type =rs.question_type;
            rs1.level_one_knowledge_point = rs.level_one_knowledge_point;
            rs1.thinking = rs.thinking;
            rs1.ability_require = rs.ability_require;
            for(var i in result){
                var temp = {};
                temp.level_two_knowledge_point_id = result[i].level_two_knowledge_point_id;
                temp.level_two_knowledge_point_name = result[i].level_two_knowledge_point_name;
                rs2.push(temp);
            }
        }
        rs1.level_two_knowledge_point = rs2;
        res.send("callback("+JSON.stringify(rs1)+")");

    })
}