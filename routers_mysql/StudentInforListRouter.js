//wcc
var connection = require('../DBConnection/DBConnection.js');

var res;
var count;

var search_grade = function(rss,school_id){
    var sql = "select * from grade where school_id = "+school_id;
    connection.query(sql,function(err,result){
       if(err){
           console.log(err);
       }
       else{
            var rs = {};
            rs.school_id = rss.school_id;
            rs.school_name = rss.school_name;
            var rs2 = [];
            for(var i in result){
                var temp = {};
                temp.grade_id = result[i].grade_id;
                temp.grade_name = result[i].grade_name;
                rs2.push(temp);
            }
            rs.grade = rs2;
           //res.send("callback(" + JSON.stringify(rs)+")");
           search_class(rs2,rs);
       }
    });
}

var search_class = function(rss1,rss2){
    var sql = "select * from class";
    connection.query(sql,function(err,result){
       if(err){
           console.log(err);
       }
       else{
           var rs = [];
           for(var i in rss1){
               count = 0;
               for(var j in result){
                   var temp = {};
                   if(rss1[i].grade_id == result[j].grade_id){
                       temp.class_id = result[j].class_id;
                       temp.class_name = result[j].class_name;
                       rs.push(temp);
                       count = 1;
                   }
               }
               if(count == 1){
               rss2.grade[i].class = rs;
               }

           }
           res.send("callback(" + JSON.stringify(rss2)+")");
       }
    });
}

exports.inforList = function(request , response){

    var school_id = request.query.school_id;
    school_id = JSON.stringify(school_id);

    res = response;

    var sql = "select * from school where school_id = "+school_id;
    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
        }
        else{

                var temp = {};
                temp.school_id = result[0].school_id;
                temp.school_name = result[0].school_name;

            //response.send("callback(" + JSON.stringify(temp)+")");
            search_grade(temp,school_id);
        }
    });
}