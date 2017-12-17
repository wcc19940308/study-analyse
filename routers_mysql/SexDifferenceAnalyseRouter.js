var connection = require("../DBConnection/DBConnection")
var res;

exports.SexDifferenceAnalyse = function(request,response){
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
        search_class_rate_all(rs,paper_id,school_id,grade_id,class_id);
    });
}


search_class_rate_all = function(rs1,paper_id,school_id,grade_id,class_id){
    var sql =
        //获得试卷id，知识点id，知识点名称，各个知识点男女生应得总分
        "select f.paper_id,f.level_1_id,f.level_1_name,f.sum_goal*f.man as man_goal,f.sum_goal*f.woman as woman_goal FROM"+
        "(select e.paper_id,e.level_1_id,e.level_1_name,e.sum_goal,w.man,w.woman from"+


        //获得学校-班级-年级-试卷id下男生和女生的总数
        "(select x.paper_id,count(x.student_sex=0 or null)as man,count(x.student_sex=1 or null)as woman FROM "+
        "(select y.paper_id,z.student_id,z.student_sex from student_paper_relationship as y,"+
        "(select student_id,student_sex from student where school_id="+school_id+" and grade_id="+grade_id+" and class_id="+class_id+")as z "+
        "where y.student_id=z.student_id and y.paper_id = "+paper_id+") as x) as w,"+

        //获得试卷id下的知识点id，知识点名称，以及各个知识点总分
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
                temp.man_goal = result[i].man_goal;
                temp.woman_goal = result[i].woman_goal;
                rs.push(temp);
            }
        }
        //res.send("callback("+JSON.stringify(rs)+")");
        search_class_rate_real(rs1,rs,paper_id,school_id,grade_id,class_id);
    })
}

search_class_rate_real = function(rs1,rs2,paper_id,school_id,grade_id,class_id){
    var sql =

        //选择试卷id，1级知识点，该知识点男生和女生的得分
        "select e.paper_id,e.level_one_knowledge_point_id,sum(case when e.student_sex=0 then e.score else 0 end) as man_score,"+
        "sum(case when e.student_sex=1 then e.score else 0 end) as woman_score FROM "+

        //选择试卷id，学生，每道题得分，学生性别，每道题对应的1级知识点
        "(select c.paper_id,c.student_id,c.paper_question_id,c.score,c.student_sex,d.level_one_knowledge_point_id "+
        "from paper_questions as d,"+

        //选择试卷id，学生，试卷题号，每道题的得分，学生性别
        "(select a.paper_id,a.student_id,a.paper_question_id,a.score,b.student_sex from student as b,"+
        "(select paper_id,student_id,paper_question_id,score from each_question_score where school_id="+school_id+" and grade_id = "+grade_id+" and "+
        "class_id = "+class_id+") as a where a.student_id = b.student_id and a.paper_id = "+paper_id+") as c where c.paper_question_id = d.paper_question_id) as e "+

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
                if((((result[i].man_score)/rs2[i].man_goal).toFixed(4))*100 > (((result[i].woman_score)/rs2[i].woman_goal).toFixed(4))*100) {
                    temp.male_rate = (((result[i].man_score) / rs2[i].man_goal).toFixed(4)) * 100;
                    temp.female_rate = (((result[i].woman_score) / rs2[i].woman_goal).toFixed(4)) * 100;
                }
                else{
                    temp.male_rate = -(((result[i].man_score) / rs2[i].man_goal).toFixed(4)) * 100;
                    temp.female_rate = -(((result[i].woman_score) / rs2[i].woman_goal).toFixed(4)) * 100;

                }
                temp.sub = Math.abs(temp.male_rate) - Math.abs(temp.female_rate);
                rs_this.push(temp);
            }
            rs_this.sort(function(a,b){
                return b.sub-a.sub;
            })
        }
        rs.class_rate = rs_this;
        //res.send("callback("+JSON.stringify(rs)+")");
        search_school_rate_all(rs,school_id,paper_id);
    })
}

search_school_rate_all = function(rs1,school_id,paper_id){
    var sql =

        //获得试卷id，知识点id，知识点名称，各个知识点男女生应得总分
        "select f.paper_id,f.level_1_id,f.level_1_name,f.sum_goal*f.man as man_goal,f.sum_goal*f.woman as woman_goal FROM "+
        "(select e.paper_id,e.level_1_id,e.level_1_name,e.sum_goal,w.man,w.woman  from "+

        //获得学校-试卷id下男生和女生的总数
        "(select x.paper_id,count(x.student_sex=0 or null)as man,count(x.student_sex=1 or null)as woman FROM "+
        "(select y.paper_id,z.student_id,z.student_sex from student_paper_relationship as y,"+
        "(select student_id,student_sex from student where school_id="+school_id+")as z "+
        "where y.student_id=z.student_id and y.paper_id = "+paper_id+") as x) as w,"+

        //获得试卷id下的知识点id，知识点名称，以及各个知识点总分
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
                temp.man_goal = result[i].man_goal;
                temp.woman_goal = result[i].woman_goal;
                rs.push(temp);
            }
        }
        //res.send("callback("+JSON.stringify(rs)+")");
        search_school_rate_real(rs1,rs,paper_id,school_id);
    })
}

search_school_rate_real = function(rs1,rs2,paper_id,school_id){
    var sql =

        //选择试卷id，1级知识点，该知识点男生和女生的得分
        "select e.paper_id,e.level_one_knowledge_point_id,sum(case when e.student_sex=0 then e.score else 0 end) as man_score," +
        " sum(case when e.student_sex=1 then e.score else 0 end) as woman_score FROM " +

        //选择试卷id，学生，每道题得分，学生性别，每道题对应的1级知识点
        " (select c.paper_id,c.student_id,c.paper_question_id,c.score,c.student_sex,d.level_one_knowledge_point_id " +
        " from paper_questions as d," +

        //选择试卷id，学生，试卷题号，每道题的得分，学生性别
        " (select a.paper_id,a.student_id,a.paper_question_id,a.score,b.student_sex from student as b," +
        " (select paper_id,student_id,paper_question_id,score from each_question_score where school_id="+school_id+" ) as a where a.student_id = b.student_id and a.paper_id = "+paper_id+") as c where c.paper_question_id = d.paper_question_id) as e " +
        "  GROUP BY level_one_knowledge_point_id"


    connection.query(sql,function(err,result){
        if(err)
            console.log(err);
        else{
            console.log("sql语句查询成功!!!!!!!!!!!!!!");
            var rs = {};
            var rs_this = [];
            rs.paper_id = paper_id;
            rs.questions = rs1.questions;
            rs.class_rate = rs1.class_rate;
            for (var i in rs2){
                var temp = {};
                temp.question_index = rs2[i].level_1_name;
                if((((result[i].man_score)/rs2[i].man_goal).toFixed(4))*100 > (((result[i].woman_score)/rs2[i].woman_goal).toFixed(4))*100) {
                    temp.male_rate = (((result[i].man_score) / rs2[i].man_goal).toFixed(4)) * 100;
                    temp.female_rate = (((result[i].woman_score) / rs2[i].woman_goal).toFixed(4)) * 100;
                }
                else{
                    temp.male_rate = -(((result[i].man_score) / rs2[i].man_goal).toFixed(4)) * 100;
                    temp.female_rate = -(((result[i].woman_score) / rs2[i].woman_goal).toFixed(4)) * 100;

                }
                temp.sub = Math.abs(temp.male_rate) - Math.abs(temp.female_rate);
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