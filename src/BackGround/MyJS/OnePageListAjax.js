function getOnePageSubject(SchoolID,ClassID) {   //产生第一页的科目列表
    var teacherString = window.localStorage.getItem("teacherInfo");//得到JSON字符串
    var TeacherInfo = JSON.parse(teacherString);//解析成JSON对象
    var school_id = SchoolID;//用来AJax
    var class_id = ClassID;//用来AJax
    $.each(PageOneClassData.subjects,function(index,value){
        var subjectName = value.subject_name;
        var subjectID = value.id;
        var SubjectString = "<p>&nbsp;&nbsp;&nbsp;&nbsp;课程："+subjectName+"<b class=\"caret\"></b></p>";
        var sub_li = document.createElement("li");//班级列表
        var sub_a = document.createElement("a"); //创建li中的链接a
        sub_a.innerHTML = SubjectString;
        sub_a.onclick = getOnePagePaper(subjectID,school_id,class_id);
    })



    // $.ajax({
    //     type :"GET",
    //     url :"http://localhost:3003/paperanalyse/",
    //     data:{
    //         school_id : school_id,
    //     },
    //     dataType: 'jsonp',
    //     jsonp:"callback",
    //     jsonpCallback:"callback",
    //     success :function(data){
    //     //产生二级列表
    //         getOnePagePaper()
    //     },
    //     error:function() {
    //         alert("获取数据失败");
    //
    //     }
    // });
    getOnePagePaper()
}
function getOnePagePaper() { //产生第一页的试卷列表



}
var PageOneClassData={
    subjects : [{id:100001,subjectName:"A"},{id:100002,subjectName:"B"},{id:100003,subjectName:"C"}]
}

var PageOneSubjectData={
    papers : [{id:100001,subjectName:"A"},{id:100002,subjectName:"B"},{id:100003,subjectName:"C"}]
}
// $.each(classes,function(index,value){
//     var class_name = value.class_name;
//     var class_course = value.class_course;
//     var ClassString = "<i class=\"pe-7s-graph\"></i><p>"+class_name+"<b class=\"caret\"></b></p>";
//     var class_li = document.createElement("li");//班级列表
//     var class_a = document.createElement("a"); //创建li中的链接a
//     var subject_div = document.createElement("div");
//     var subject_ul  = document.createElement("subject_ul");
// //-----------------------------------------------------
//     class_a.innerHTML=ClassString;
//     class_a.href="#class"+String(index);
//     class_a.setAttribute("data-toggle","collapse");
//     subject_div.setAttribute("class","collapse");
//     subject_div.setAttribute("id","class"+String(index));//科目div的id设置成班级
//     subject_ul.setAttribute("class","nav");
//     $.each(class_course,function (index,value) {//循环每一个课程
//         var class_course_name = value.class_course_name;
//         var test_papers = value.test_papers;//试卷数据
//         var class_course_id = value.class_course_id;
//         var class_num = value.class_num;
//         var SubjectString = "<p>&nbsp;&nbsp;&nbsp;&nbsp;课程："+class_course_name+"<b class=\"caret\"></b></p>";
//         var subject_li = document.createElement("li");//创建第一页每个科目项
//         var subject_a = document.createElement("a");
//         var paper_div = document.createElement("div");
//         var paper_ul = document.createElement("ul");
//         subject_a.setAttribute("data-toggle","collapse");
//         subject_a.innerHTML=SubjectString;//设置课程名称
//         subject_a.href="#"+class_course_id;
//         paper_div.setAttribute("class","collapse");
//         paper_div.setAttribute("id",class_course_id);
//         paper_ul.setAttribute("class","nav");
//         $.each(test_papers,function (index,value) {
//             var paper_name = value.paper_name;
//             var paper_id = value.paper_id;
//             var paper_li=document.createElement("li");
//             // var paper_li3=document.createElement("li");
//             var paper_a = document.createElement("a");
//             // var paper_a3 = document.createElement("a");
//             paper_a.innerHTML="试卷："+paper_name;//设置试卷名称
//             // paper_a3.innerHTML="试卷："+paper_name;//设置试卷名称
//             paper_a.href="#"
//             // paper_a3.href="#"
//             paper_a.onclick = function () {//第一页的点击事件
//                 var URL1 = "MyPage1.html?school_id="+school_id+"&paper_id="+paper_id+ "&class_num="+class_num;
//                 change(URL1);
//             };
//             paper_li.appendChild(paper_a);
//             // paper_li3.appendChild(paper_a3);
//             paper_ul.appendChild(paper_li);
//             // Page3List.appendChild(paper_li3);
//         })
//         {
//             paper_div.appendChild(paper_ul);
//             subject_li.appendChild(subject_a);
//             subject_li.appendChild(paper_div);
//             subject_ul.appendChild(subject_li);
//         }
//     });
//     {
//         subject_div.appendChild(subject_ul);
//         class_li.appendChild(class_a);
//         class_li.appendChild(subject_div);
//         Page1List.appendChild(class_li);
//     }
//
// });