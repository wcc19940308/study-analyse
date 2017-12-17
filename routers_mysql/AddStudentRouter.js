//wcc
var connection = require("../DBConnection/DBConnection");

exports.addStudent = function(request,response){
    var school_id = request.query.school_id;
    var class_id = request.query.class_id;
    var grade_id = request.query.grade_id;
    var studentList = request.query.string_excel;

     //school_id = JSON.stringify(school_id);
    // grade_id = JSON.stringify(grade_id);
    // class_id = JSON.stringify(class_id);
   //studentList = JSON.stringify(studentList);
    var rs = [];
    for(var i=0; i<studentList.length; i++)
    {
        var temp = [];
        temp[0] = parseInt(school_id);
        temp[1] = parseInt(grade_id);
        temp[2] = parseInt(class_id);
        temp[3] = studentList[i].考号;
        temp[4] = studentList[i].姓名;
        temp[5] = parseInt(studentList[i].性别);
        temp[6] = parseInt(studentList[i].城乡);
        rs.push(temp);
    }
    response.send("callback(" +JSON.stringify(rs)+")");

    var sql = 'INSERT INTO student(school_id, grade_id, class_id, student_id, student_name, student_sex, town_or_country) VALUES ?';
    connection.query(sql,[rs],function(err,result){
        if(err) {
            console.log("INSERT ERROR-", err.message);
        }
        else{
            console.log("INSERT SUCCESS 学生信息插入成功");
           response.send("callback(" + "sucess" +")");
        }
    })

   //  var query = connection.query('INSERT INTO student SET ?',[rs],function(err,result){
   //  if(err) {
   //     console.log("INSERT ERROR-", err.message);
   //  }
   //  else{
   //      console.log("INSERT SUCCESS 恭喜你插入成功")
   //     response.send("callback(" + "sucess" +")");
   //  }
   // })
};