// 验证
function Validate() {
    var schoolID=parseInt(myForm.logSchool.value);//学校ID
    var teacherID = myForm.logName.value;//教师ID
    var teacherpass = myForm.logPass.value;//登陆密码
    console.log(schoolID+" "+teacherID+" "+teacherpass)
    console.log(typeof schoolID);
    console.log(typeof teacherID);
    console.log(typeof teacherpass);
        $.ajax(
        {
            type:'GET',
            url : 'http://localhost:3003/login_mysql/',
            dataType : 'jsonp',
            jsonp:"jsoncallback",
            jsonpCallback:"callback",
            data:{
                 school_id : schoolID , account : teacherID , password : teacherpass
            },
            success:function(data) {
                if(JSON.stringify(data)!="false"){
                    alert("登陆成功");
                    window.localStorage.clear();
                    window.localStorage.setItem("teacherInfo",JSON.stringify(data));
                    window.location.href="../BackGround/dashboard.html"
                }else {
                    alert("检查账户名或密码是否正确");
                }
            },
            error:function() {
                alert("登陆失败，请检查网络连接");
                // window.localStorage.clear();
                // window.localStorage.setItem("teacherInfo",JSON.stringify(teacherInfo));
                // window.location.href="../BackGround/dashboard.html"
            }
        }
    );
}

// var teacherInfo={
//     "school_id": 1,
//     "teacher_id": "t_0001",
//     "teacher_name": "张华",
//     "class_ids": [
//         1,
//         2
//     ],
//     "classes": [
//         {
//             "class_id": 1,
//             "class_name": "四年级一班"
//         },
//         {
//             "class_id": 2,
//             "class_name": "四年级二班"
//         }
//     ],
//     "subject_ids": [
//         1,
//         2
//     ],
//     "subjects": [
//         {
//             "subject_id": 1,
//             "subject_name": "数学"
//         },
//         {
//             "subject_id": 2,
//             "subject_name": "数学"
//         }
//     ],
//     "class_subject_papers": [
//         {
//             "class_id": 1,
//             "class_name": "四年级一班",
//             "subjects": [
//                 {
//                     "class_id": 1,
//                     "class_name": "四年级一班",
//                     "subject_id": 1,
//                     "subject_name": "数学",
//                     "test_papers": [
//                         {
//                             "paper_id": 1,
//                             "paper_name": "第一单元测试",
//                             "test_time": "2017-06-30T16:00:00.000Z"
//                         },
//                         {
//                             "paper_id": 2,
//                             "paper_name": "第二单元测试",
//                             "test_time": "2017-07-09T16:00:00.000Z"
//                         },
//                         {
//                             "paper_id": 3,
//                             "paper_name": "第三单元测试",
//                             "test_time": "2017-07-19T16:00:00.000Z"
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "class_id": 2,
//             "class_name": "四年级二班",
//             "subjects": [
//                 {
//                     "class_id": 2,
//                     "class_name": "四年级二班",
//                     "subject_id": 2,
//                     "subject_name": "数学",
//                     "test_papers": [
//                         {
//                             "paper_id": 1,
//                             "paper_name": "第一单元测试",
//                             "test_time": "2017-06-30T16:00:00.000Z"
//                         },
//                         {
//                             "paper_id": 2,
//                             "paper_name": "第二单元测试",
//                             "test_time": "2017-07-09T16:00:00.000Z"
//                         },
//                         {
//                             "paper_id": 3,
//                             "paper_name": "第三单元测试",
//                             "test_time": "2017-07-19T16:00:00.000Z"
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }