var connection = require("../DBConnection/DBConnection")
var res;

exports.CountryDifferenceAnalyse = function(request,response){
    var school_id = request.query.school_id;
    var grade_id = request.query.grade_id;
    var class_id = request.query.class_id;
    var paper_id = request.query.paper_id;
    res = response;

    var sql = "select a.level_one_knowledge_point_id,a.level_one_knowledge_point_name,b.paper_id from level_one_knowledge_point as a,(select paper_id,level_one_knowledge_point_id from paper_questions where paper_id="+paper_id+" GROUP BY level_one_knowledge_point_id)as b where a.level_one_knowledge_point_id = b.level_one_knowledge_point_id"
    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            var rs = {};
            var temp = [];
            rs.paper_id = paper_id;
            for(var i in result){
                temp[i] = result[i].level_one_knowledge_point_name;
            }
            rs.questions = temp;
        }
        //res.send("callback("+JSON.stringify(rs)+")");
        search_class_rate_all1(rs,paper_id,school_id,grade_id,class_id);
    });
}


search_class_rate_all1 = function(rs1,paper_id,school_id,grade_id,class_id){
    var sql =
        //获得试卷id，知识点id，知识点名称，各个知识点农村和城市应得总分
    "select f.paper_id,f.level_1_id,f.level_1_name,f.sum_goal*f.country as country_goal,f.sum_goal*f.town as town_goal FROM "+
    "(select e.paper_id,e.level_1_id,e.level_1_name,e.sum_goal,w.country,w.town  from "+

    "(select x.paper_id,count(x.town_or_country=0 or null)as country,count(x.town_or_country=1 or null)as town FROM "+
    "(select y.paper_id,z.student_id,z.town_or_country from student_paper_relationship as y,"+
    "(select student_id,town_or_country from student where school_id="+school_id+" and grade_id="+grade_id+" and class_id="+class_id+")as z "+
    "where y.student_id=z.student_id and y.paper_id = 1) as x) as w,"+

    "(select d.paper_id,d.level_1_id,d.level_1_name, c.sum_goal from (select level_one_knowledge_point_id,sum(question_goal) as sum_goal from paper_questions where paper_id=1 GROUP BY level_one_knowledge_point_id) as c,"+
    "(select a.level_one_knowledge_point_id as level_1_id,a.level_one_knowledge_point_name as level_1_name,b.paper_id as paper_id from level_one_knowledge_point as a,(select paper_id,level_one_knowledge_point_id from paper_questions where paper_id=1 GROUP BY level_one_knowledge_point_id)as b where a.level_one_knowledge_point_id = b.level_one_knowledge_point_id)as d "+
    "where c.level_one_knowledge_point_id = d.level_1_id GROUP BY level_one_knowledge_point_id) as e "+
    "group by e.level_1_id) as f"



    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            var rs = [];
            for(var i in result){
                var temp = {}
                temp.level_1_id = result[i].level_1_id;
                temp.level_1_name = result[i].level_1_name;
                temp.country_goal = result[i].country_goal;
                temp.town_goal = result[i].town_goal;
                rs.push(temp);
            }
        }
        //res.send("callback("+JSON.stringify(rs)+")");
        search_class_rate_real1(rs1,rs,paper_id,school_id,grade_id,class_id);
    })
}

search_class_rate_real1 = function(rs1,rs2,paper_id,school_id,grade_id,class_id){
    var sql =

        //选择试卷id，1级知识点，该知识点农村和城市的得分
    "select e.paper_id,e.level_one_knowledge_point_id,sum(case when e.town_or_country=0 then e.score else 0 end) as country_score,"+
    "sum(case when e.town_or_country=1 then e.score else 0 end) as town_score FROM "+

        //选择试卷id，学生，每道题得分，学生性别，每道题对应的1级知识点
    "(select c.paper_id,c.student_id,c.paper_question_id,c.score,c.town_or_country,d.level_one_knowledge_point_id "+
    "from paper_questions as d,"+

        //选择试卷id，学生，试卷题号，每道题的得分，学生农村或是城市
    "(select a.paper_id,a.student_id,a.paper_question_id,a.score,b.town_or_country from student as b,"+
    "(select paper_id,student_id,paper_question_id,score from each_question_score where school_id="+school_id+" and grade_id="+grade_id+" and class_id="+class_id+") as a where a.student_id = b.student_id and a.paper_id = "+paper_id+") as c where c.paper_question_id = d.paper_question_id) as e "+
    "GROUP BY level_one_knowledge_point_id"

    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            var rs = {};
            var rs_this = [];
            rs.paper_id = paper_id;
            rs.questions = rs1.questions;
            for (var i in rs2){
                var temp = {};
                temp.question_index = rs2[i].level_1_name;
                if(((result[i].town_score)/rs2[i].town_goal).toFixed(4)*100 > ((result[i].country_score)/rs2[i].country_goal).toFixed(4)*100) {
                    temp.city_rate = ((result[i].town_score) / rs2[i].town_goal).toFixed(4) * 100;
                    temp.country_rate = ((result[i].country_score) / rs2[i].country_goal).toFixed(4) * 100;

                }
                else{
                    temp.city_rate = -((result[i].town_score) / rs2[i].town_goal).toFixed(4) * 100;
                    temp.country_rate = -((result[i].country_score) / rs2[i].country_goal).toFixed(4) * 100;

                }
                temp.sub = Math.abs(temp.city_rate) - Math.abs(temp.country_rate);
                rs_this.push(temp);
            }
            rs_this.sort(function(a,b){
                return b.sub-a.sub;
            })
        }
        rs.class_rate = rs_this;
        //res.send("callback("+JSON.stringify(rs)+")");
        search_school_rate_all1(rs,school_id,paper_id);
    })
}

search_school_rate_all1 = function(rs1,school_id,paper_id){
    var sql =

        "select f.paper_id,f.level_1_id,f.level_1_name,f.sum_goal*f.country as country_goal,f.sum_goal*f.town as town_goal FROM "+
        "(select e.paper_id,e.level_1_id,e.level_1_name,e.sum_goal,w.country,w.town  from "+

        "(select x.paper_id,count(x.town_or_country=0 or null)as country,count(x.town_or_country=1 or null)as town FROM "+
        "(select y.paper_id,z.student_id,z.town_or_country from student_paper_relationship as y,"+
        "(select student_id,town_or_country from student where school_id="+school_id+")as z "+
        "where y.student_id=z.student_id and y.paper_id = 1) as x) as w,"+

        "(select d.paper_id,d.level_1_id,d.level_1_name, c.sum_goal from (select level_one_knowledge_point_id,sum(question_goal) as sum_goal from paper_questions where paper_id=1 GROUP BY level_one_knowledge_point_id) as c,"+
        "(select a.level_one_knowledge_point_id as level_1_id,a.level_one_knowledge_point_name as level_1_name,b.paper_id as paper_id from level_one_knowledge_point as a,(select paper_id,level_one_knowledge_point_id from paper_questions where paper_id=1 GROUP BY level_one_knowledge_point_id)as b where a.level_one_knowledge_point_id = b.level_one_knowledge_point_id)as d "+
        "where c.level_one_knowledge_point_id = d.level_1_id GROUP BY level_one_knowledge_point_id) as e "+
        "group by e.level_1_id) as f"


    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            var rs = [];
            for(var i in result){
                var temp = {}
                temp.level_1_id = result[i].level_1_id;
                temp.level_1_name = result[i].level_1_name;
                temp.country_goal = result[i].country_goal;
                temp.town_goal = result[i].town_goal;
                rs.push(temp);
            }
        }
        //res.send("callback("+JSON.stringify(rs)+")");
        search_school_rate_real1(rs1,rs,paper_id,school_id);
    })
}

search_school_rate_real1 = function(rs1,rs2,paper_id,school_id){
    var sql =

        //选择试卷id，1级知识点，该知识点农村和城市的得分
        "select e.paper_id,e.level_one_knowledge_point_id,sum(case when e.town_or_country=0 then e.score else 0 end) as country_score,"+
        "sum(case when e.town_or_country=1 then e.score else 0 end) as town_score FROM "+

        //选择试卷id，学生，每道题得分，学生性别，每道题对应的1级知识点
        "(select c.paper_id,c.student_id,c.paper_question_id,c.score,c.town_or_country,d.level_one_knowledge_point_id "+
        "from paper_questions as d,"+

        //选择试卷id，学生，试卷题号，每道题的得分，学生农村或是城市
        "(select a.paper_id,a.student_id,a.paper_question_id,a.score,b.town_or_country from student as b,"+
        "(select paper_id,student_id,paper_question_id,score from each_question_score where school_id="+school_id+") as a where a.student_id = b.student_id and a.paper_id = "+paper_id+") as c where c.paper_question_id = d.paper_question_id) as e "+
        "GROUP BY level_one_knowledge_point_id"



    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            //console.log("sql语句查询成功!!!!!!!!!!!!!!");
            var rs = {};
            var rs_this = [];
            rs.paper_id = paper_id;
            rs.questions = rs1.questions;
            rs.class_rate = rs1.class_rate;
            for (var i in rs2){
                var temp = {};
                temp.question_index = rs2[i].level_1_name;
                if((((result[i].town_score)/rs2[i].town_goal).toFixed(4))*100 > (((result[i].country_score)/rs2[i].country_goal).toFixed(4))*100) {
                    temp.city_rate = (((result[i].town_score) / rs2[i].town_goal).toFixed(4)) * 100;
                    temp.country_rate = (((result[i].country_score) / rs2[i].country_goal).toFixed(4)) * 100;
                }
                else{
                    temp.city_rate = -(((result[i].town_score) / rs2[i].town_goal).toFixed(4)) * 100;
                    temp.country_rate = -(((result[i].country_score) / rs2[i].country_goal).toFixed(4)) * 100;

                }
                temp.sub = Math.abs(temp.city_rate) - Math.abs(temp.country_rate);
                rs_this.push(temp);
            }
            rs_this.sort(function(a,b){
                return b.sub-a.sub;
            })
        }
        rs.school_rate = rs_this;
        res.send("callback("+JSON.stringify(rs)+")");
    })
}