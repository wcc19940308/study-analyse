function Initial() {

    var myChart1 = echarts.init(document.getElementById('main1'));
    var myChart2 = echarts.init(document.getElementById('main2'));
    var myChart3 = echarts.init(document.getElementById('main3'));
    $("#scoreList").hide();
    $("#NameDiv").hide();
    var teacherString = window.localStorage.getItem("teacherInfo");//得到JSON字符串
    var TeacherInfo = JSON.parse(teacherString);//解析成JSON对象
    var teacherName = document.getElementById("teacherName");//教师姓名
    var teacherCourse = document.getElementById("teacherCourse");//任课科目
    var teacherClass = document.getElementById("teacherClass");//所带班级
    var StringClass = "";//设置所带班级的字符串
    var teacher_name = TeacherInfo.teacher_name;//获取教师姓名
    var subject_name = TeacherInfo.subjects[0].subject_name;//获取教师科目
    var school_id = TeacherInfo.school_id;
    var classes = TeacherInfo.classes;//班级总信息
    var class_subject_papers = TeacherInfo.class_subject_papers;//班级+科目+试卷信息
    $.each(classes,function(index,value){
     var class_course_name = value.class_name;
     StringClass = StringClass + class_course_name+"&nbsp;&nbsp;&nbsp;&nbsp;";
     });
    teacherName.innerHTML = teacher_name;//插入教师姓名
    teacherCourse.innerHTML = subject_name;//插入课程
    teacherClass.innerHTML = "&nbsp;"+ StringClass; //插入班级
     //产生试卷分析列表
    var PaperAnalyList = document.getElementById("tabPage1")//试卷分析列表
    $.each(class_subject_papers,function(index,value){
        var class_name = value.class_name;
        var subjects = value.subjects;
        var ClassString = "<i class=\"pe-7s-graph\"></i><p>"+class_name+"<b class=\"caret\"></b></p>";
        var class_li = document.createElement("li");//班级列表
        var class_a = document.createElement("a"); //创建li中的链接a
        var subject_div = document.createElement("div");
        var subject_ul  = document.createElement("subject_ul");
//------------------------------------------------
        class_a.innerHTML=ClassString;
        class_a.href="#class"+String(index);
        class_a.setAttribute("data-toggle","collapse");
        subject_div.setAttribute("class","collapse");
        subject_div.setAttribute("id","class"+String(index));//科目div的id设置成班级
        subject_ul.setAttribute("class","nav");
        $.each(subjects,function (index,value) {//循环每一个课程
            var subject_name = value.subject_name;
            var test_papers = value.test_papers;//试卷数据
            var subject_id = value.subject_id;
            var class_id = value.class_id;
            var SubjectString = "<p>&nbsp;&nbsp;&nbsp;&nbsp;课程："+subject_name+"<b class=\"caret\"></b></p>";
            var subject_li = document.createElement("li");//创建第一页每个科目项
            var subject_a = document.createElement("a");
            var paper_div = document.createElement("div");
            var paper_ul = document.createElement("ul");
            subject_a.setAttribute("data-toggle","collapse");
            // subject_a2.setAttribute("data-toggle","collapse");
            subject_a.innerHTML=SubjectString;//设置课程名称
            subject_a.href="#subject"+subject_id;
            paper_div.setAttribute("class","collapse");
            paper_div.setAttribute("id","subject"+subject_id);
            paper_ul.setAttribute("class","nav");
            $.each(test_papers,function (index,value) {
                var paper_name = value.paper_name;
                var paper_id = value.paper_id;
                var paper_li=document.createElement("li");
                var paper_a = document.createElement("a");
                paper_a.innerHTML="试卷："+paper_name;//设置试卷名称
                paper_a.href="#"
                paper_a.onclick = function () {//第一页的点击事件
                    // var URL1 = "MyPage1.html?school_id="+school_id+"&paper_id="+paper_id+ "&class_num="+class_num;
                    myChart1.clear();
                    myChart2.clear();
                    myChart3.clear();
                    $("#scoreList").show();
                    InitalPage1(class_id,paper_id,myChart1,myChart2);
                };
                paper_li.appendChild(paper_a);
                paper_ul.appendChild(paper_li);
            })
            {
                paper_div.appendChild(paper_ul);
                subject_li.appendChild(subject_a);
                subject_li.appendChild(paper_div);
                subject_ul.appendChild(subject_li);
            }
        });
        {
            subject_div.appendChild(subject_ul);
            class_li.appendChild(class_a);
            class_li.appendChild(subject_div);
            PaperAnalyList.appendChild(class_li);
        }

    });


     //综合分析列表
    var CompreList = document.getElementById("tabPage2")//综合分析列表
    $.each(class_subject_papers,function(index,value){
        var class_name = value.class_name;
        var class_id = value.class_id;
        var subjects = value.subjects;
        var ClassString = "<i class=\"pe-7s-graph\"></i><p>"+class_name+"<b class=\"caret\"></b></p>";
        var class_li2 = document.createElement("li");//班级列表
        var class_a2 = document.createElement("a"); //创建li中的链接a
        var subject_div2 = document.createElement("div");
        var subject_ul2  = document.createElement("subject_ul");
//------------------------
        class_a2.innerHTML=ClassString;
        class_a2.href="#class2"+String(index);
        class_a2.setAttribute("data-toggle","collapse");
        subject_div2.setAttribute("class","collapse");
        subject_div2.setAttribute("id","class2"+String(index));//科目div的id设置成班级
        subject_ul2.setAttribute("class","nav");
        $.each(subjects,function (index,value) {//循环每一个课程
            var subject_name = value.subject_name;
            var SubjectString = "<p>&nbsp;&nbsp;&nbsp;&nbsp;课程："+subject_name+"</p>";
            var subject_li2 = document.createElement("li");//创建第二页每个科目项
            var subject_a2 = document.createElement("a");
            subject_a2.innerHTML=SubjectString;//设置课程名称
            subject_a2.href="#";
            subject_a2.onclick = function () {//第二页的点击事件
                // var URL2="MyPage2.html?school_id="+school_id+"&class_num="+class_num+"&class_course_id="+class_course_id;
                myChart1.clear();
                myChart2.clear();
                myChart3.clear();
                $("#scoreList").hide();
                $("#NameDiv").hide();
                InitalPage2(class_id,school_id,myChart1,myChart2);

            }
            {
                subject_li2.appendChild(subject_a2);
                subject_ul2.appendChild(subject_li2);
            }
        });
        {
            subject_div2.appendChild(subject_ul2);
            class_li2.appendChild(class_a2);
            class_li2.appendChild(subject_div2);
            CompreList.appendChild(class_li2);
        }

    });
     //---------学情分析列表
    var Page3SexList = document.getElementById("sexProgress")
    var Page3CityList = document.getElementById("cityProgress");
    var Page3PersonList = document.getElementById("stuProgress")
    var Page3ClassList = document.getElementById("classProgress");
    $.each(class_subject_papers,function (index,value){
        var class_name = value.class_name;
        var subjects = value.subjects;
        var class_id = value.class_id;//获取班级id
        var ClassString = "<p>"+class_name+"<b class=\"caret\"></b></p>";
        var class_li3=document.createElement("li");
        var class_li32=document.createElement("li");
        var class_a3 = document.createElement("a");
        var class_a32 = document.createElement("a");
        class_a3.innerHTML = ClassString;
        class_a3.setAttribute("data-toggle","collapse");
        class_a32.innerHTML = ClassString;
        class_a32.setAttribute("data-toggle","collapse");
        class_a3.href="#sexPaper"+String(index);//点击班级显示试卷div
        class_a32.href="#cityPaper"+String(index);
        var paper_div = document.createElement("div");//创建试卷div用来存放每个班级的所有试卷
        var paper_div2 = document.createElement("div");//创建试卷div用来存放每个班级的所有试卷
        var paper_ul = document.createElement("ul");//创建试卷列表
        var paper_ul2 = document.createElement("ul");//创建试卷列表
        paper_div.setAttribute("class","collapse");
        paper_div2.setAttribute("class","collapse");
        paper_ul.setAttribute("class","nav");
        paper_ul2.setAttribute("class","nav");
        paper_div.setAttribute("id","sexPaper"+String(index));//试卷div的id设置成试卷班级id
        paper_div2.setAttribute("id","cityPaper"+String(index));//试卷div的id设置成试卷班级id
        $.each(subjects,function (index,value) {
            var test_papers = value.test_papers;
            $.each(test_papers,function (index,value) {//遍历这个班级的所有考试
                var paper_name = value.paper_name; //获得每张试卷的id
                var paper_id = value.paper_id;//获取每一张试卷的id
                var paper_li = document.createElement("li");//创建第一页每个科目项
                var paper_li2 = document.createElement("li");//创建第二页每个科目项
                var paper_a3 = document.createElement("a");
                var paper_a32 = document.createElement("a");
                paper_a3.innerHTML = paper_name;
                paper_a3.href = "#";
                paper_a32.innerHTML = paper_name;
                paper_a32.href = "#";
                paper_li.appendChild(paper_a3)
                paper_li2.appendChild(paper_a32)
                paper_ul.appendChild(paper_li);
                paper_ul2.appendChild(paper_li2);
                //-------------------------------------------
                paper_a3.onclick = function () {//第三页的性别差异点击事件
                    // alert(paper_id+"--"+class_id+"--"+school_id);
                    myChart1.clear();
                    myChart2.clear();
                    myChart3.clear();
                    $("#scoreList").hide();
                    $("#NameDiv").hide();
                    getSexChart(Page3SexData,myChart1,myChart2,myChart3)
                };
                paper_a32.onclick = function () {//第三页的城乡差异点击事件
                    myChart1.clear();
                    myChart2.clear();
                    myChart3.clear();
                    $("#scoreList").hide();
                    $("#NameDiv").hide();
                    getCityChart(Page3CityData,myChart1,myChart2,myChart3)
                };
                //----------------------------------------------
            })
        })
        paper_div.appendChild(paper_ul);
        paper_div2.appendChild(paper_ul2);
        class_li3.appendChild(class_a3);
        class_li32.appendChild(class_a32);
        class_li3.appendChild(class_a3);
        class_li32.appendChild(class_a32);
        class_li3.appendChild(paper_div);
        class_li32.appendChild(paper_div2);
        Page3SexList.appendChild(class_li3);
        Page3CityList.appendChild(class_li32);
    })
    //---------个人学情分析列表
    $.each(class_subject_papers,function (index,value){
        var class_name = value.class_name;
        var subjects = value.subjects;
        var class_id = value.class_id;//获取班级id
        var ClassString = "<p>"+class_name+"<b class=\"caret\"></b></p>";
        var class_li3=document.createElement("li");
        var class_a3 = document.createElement("a");
        class_a3.innerHTML = ClassString;
        class_a3.setAttribute("data-toggle","collapse");
        class_a3.href="#PersonPaper"+String(index);//点击班级显示试卷div
        var paper_div = document.createElement("div");//创建试卷div用来存放每个班级的所有试卷
        var paper_ul = document.createElement("ul");//创建试卷列表
        paper_div.setAttribute("class","collapse");
        paper_ul.setAttribute("class","nav");
        paper_div.setAttribute("id","PersonPaper"+String(index));//试卷div的id设置成试卷班级id
        $.each(subjects,function (index,value) {
            var test_papers = value.test_papers;
            $.each(test_papers,function (index,value) {//遍历这个班级的所有考试
                var paper_name = value.paper_name; //获得每张试卷的id
                var paper_id = value.paper_id; //获得每张试卷的id
                var paper_li = document.createElement("li");//创建第一页每个科目项
                var paper_a3 = document.createElement("a");
                paper_a3.innerHTML = paper_name;
                paper_a3.href = "#";
                paper_li.appendChild(paper_a3)
                paper_ul.appendChild(paper_li);
                //-------------------------------------------
                paper_a3.onclick = function () {//第三页的个人差异点击事件
                    $("#scoreList").hide();
                    $("#NameDiv").show();
                    myChart1.clear();
                    myChart2.clear();
                    myChart3.clear();
                    // alert(paper_id+"--"+class_id+"--"+school_id);
                    getNameList(class_id,paper_id,myChart1,myChart2,myChart3);
                };
                //----------------------------------------------
            })
        })
        paper_div.appendChild(paper_ul);
        class_li3.appendChild(class_a3);
        class_li3.appendChild(class_a3);
        class_li3.appendChild(paper_div);
        Page3PersonList.appendChild(class_li3);
    })
    ///////班级学情分析列表
    $.each(class_subject_papers,function (index,value){
        var class_name = value.class_name;
        var subjects = value.subjects;
        var class_id = value.class_id;//获取班级id
        var ClassString = "<p>"+class_name+"<b class=\"caret\"></b></p>";
        var class_li3=document.createElement("li");
        var class_a3 = document.createElement("a");
        class_a3.innerHTML = ClassString;
        class_a3.setAttribute("data-toggle","collapse");
        class_a3.href="#classPaper"+String(index);//点击班级显示试卷div
        var paper_div = document.createElement("div");//创建试卷div用来存放每个班级的所有试卷
        var paper_ul = document.createElement("ul");//创建试卷列表
        paper_div.setAttribute("class","collapse");
        paper_ul.setAttribute("class","nav");
        paper_div.setAttribute("id","classPaper"+String(index));//试卷div的id设置成试卷班级id
        $.each(subjects,function (index,value) {
            var test_papers = value.test_papers;
            $.each(test_papers,function (index,value) {//遍历这个班级的所有考试
                var paper_name = value.paper_name; //获得每张试卷的id
                var paper_id = value.paper_id;//获取每一张试卷的id
                var paper_li = document.createElement("li");//创建第一页每个科目项
                var paper_a3 = document.createElement("a");
                paper_a3.innerHTML = paper_name;
                paper_a3.href = "#";
                paper_li.appendChild(paper_a3)
                paper_ul.appendChild(paper_li);
                //-------------------------------------------
                paper_a3.onclick = function () {//第三页的性别差异点击事件
                    // var URL4= "MyPage3Class.html?paper_id="+paper_id+"&class_id="+class_id+"&school_id="+school_id;
                    // alert(paper_id+"--"+class_id+"--"+school_id);
                    $("#scoreList").hide();
                    $("#NameDiv").hide();
                    myChart1.clear();
                    myChart2.clear();
                    myChart3.clear();
                    InitalPage3Class(class_id,paper_id,myChart1,myChart2)
                };
            })
        })
        paper_div.appendChild(paper_ul);
        class_li3.appendChild(class_a3);
        class_li3.appendChild(class_a3);
        class_li3.appendChild(paper_div);
        Page3ClassList.appendChild(class_li3);
    })
    //--------------------------------------------------------------------------------
    // var masterlist = document.getElementById("ul_paper")//主列表
    // var class_li = document.createElement("li");//班级列表
    // var class_a = document.createElement("a"); //创建班级li中的链接a
    // var subject_ul  = document.createElement("subject_ul");
    // var subject_li = document.createElement("li");
    // var subject_a = document.createElement("a");
    // var classname = "初一N班" //班级名称
    // var subject_div = document.createElement("div");
    // subject_div.setAttribute("id","content15");
    // subject_div.setAttribute("class","collapse");
    // subject_ul.setAttribute("class","nav")
    // class_a.setAttribute("data-toggle","collapse");var
    // var subject_name = class_course_name;//设置课程名称
    // subject_a.innerHTML=subject_name;科目名称
    // subject_a.href="#"
    // subject_li.appendChild(subject_a);
    // var String1 = "<i class=\"pe-7s-graph\"></i><p>"+classname+"<b class=\"caret\"></b></p>"
    // class_a.innerHTML=String1;
    // class_a.href="#content15"
    // subject_ul.appendChild(subject_li)
    // subject_div.appendChild(subject_ul)
    // class_li.appendChild(class_a);//将a添加到li
    // class_li.appendChild(subject_div)
    // masterlist.appendChild(class_li); //将li添加到ul
    //---------------------------------------------------------------------------------
    // document.getElementById("myFrame").height = window.innerHeight-50;
    // document.getElementById("myFrame").width = window.innerWidth-100
    //-------------------------------------------------------------------------------------
    // alert(document.getElementsByName("myFrame"))
    }
// var RES =  {
//     "questions": [
//         "1_1",
//         "1_2",
//         "1_3",
//         "2_1",
//         "2_2",
//         "3_1",
//         "3_2",
//         "4_1",
//         "4_2",
//         "5_1",
//         "5_2",
//         "6",
//         "7_1",
//         "7_2",
//         "8_1",
//         "8_2",
//         "9",
//         "10",
//         "11",
//         "12",
//         "13",
//         "14",
//         "15_1",
//         "15_2",
//         "15_3",
//         "15_4",
//         "15_5",
//         "16",
//         "17_1",
//         "17_2",
//         "18_1",
//         "18_2",
//         "19",
//         "20",
//         "21",
//         "22",
//         "23_1",
//         "23_2",
//         "23_3",
//         "24_1",
//         "24_2",
//         "25_1",
//         "25_2",
//         "26"
//     ]
// }


