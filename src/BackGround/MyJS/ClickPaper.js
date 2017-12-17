// 1.访问数据库，得到老师有哪些班级，科目，试卷。
// 2.生成列表在试卷处添加点击事件，加载js代码（1）。
// 3.（1）JS代码向后台发送请求，获取该考试试卷的数据，生成表格数据，产生Echart表格

function InitalPage1(class_id,paper_id,myChart1,myChart2) {
    $.ajax({
        type :"GET",
        url :"http://localhost:3003/grade_classification_mysql/",
        data : {
            class_id : class_id,
            paper_id : paper_id
        },
        dataType: 'jsonp',
        jsonp:"callback",
        jsonpCallback:"callback",
        success :function(data){
            // alert(JSON.stringify(data));
            getPage1chart(data,myChart1,myChart2);
        }
    });
    // getPage1chart(Page1Data,myChart1,myChart2);
}
function InitalPage2(class_id,school_id,myChart1,myChart2) {
    // alert(class_id+" "+school_id);
    $.ajax({
        type :"GET",
        url :"http://localhost:3003/multiple_analyse_mysql/",
        data : {
            class_id : class_id,
            school_id : school_id
        },
        dataType: 'jsonp',
        jsonp:"callback",
        jsonpCallback:"callback",
        success :function(data){
            getPage2chart(data,myChart1,myChart2);
        }
    });

}
function InitalPage3Sex() {
    var schoolID  = JSON.parse(localStorage.getItem("teacherInfo")).school_id;
    var paper_id  =getQueryString("paper_id");
    var classID = getQueryString("class_id")
    $.ajax({
        type :"GET",
        url :"http://localhost:3003/sex/",
        data:{
            school_id : schoolID,
            class_id  : classID,
            paper_id : paper_id
        },
        dataType: 'jsonp',
        jsonp:"callback",
        jsonpCallback:"callback",
        success :function(data){
            getSexchart(data);
        }
    });
}
function InitalPage3City() {
    var schoolID  = getQueryString("school_id");
    var paper_id  =getQueryString("paper_id");
    var classID = getQueryString("class_id")

    // alert(test)
    // for (var i = 0 ; i <class_course.length ; i++){
    //     test.classes_id.push(class_course[i].class_course_id);
    // }
    $.ajax({

        type :"GET",
        url :"http://localhost:3003/city_country/",
        data:{
            school_id : schoolID,
            class_id  : classID,
            paper_id : paper_id
        },
        dataType: 'jsonp',
        jsonp:"callback",
        jsonpCallback:"callback",
        success :function(data){
            getCityChart(data)
        }
    });
    // getCityChart(Page3CityData); 这个是测试本地数据，我已经把它注释了
}
function InitalPage3Class(class_id,paper_id,myChart1,myChart2) {
    // var schoolID  = getQueryString("school_id");
    // var paper_id  =getQueryString("paper_id");
    // var classID = getQueryString("class_id")

    $.ajax({

        type :"GET",
        url :"http://localhost:3003/classanalyse_mysql/",
        data : {
            class_id : class_id	,
            paper_id : paper_id

        },
        dataType: 'jsonp',
        jsonp:"callback",
        jsonpCallback:"callback",
        success :function(data){
            getClassChart(data,myChart1,myChart2)
        }

    });

}
function InitalPage3Person() {
    var schoolID  = getQueryString("school_id");
    var classID = getQueryString("class_id")
    $.ajax({
        type :"GET",
        url :"http://101.37.175.222:3003/all_student/",
        data:{
            school_id : schoolID,
            class_id  : classID
        },
        dataType: 'jsonp',
        jsonp:"callback",
        jsonpCallback:"callback",
        success :function(data){
            getNameList(data)
        },


    });


}

// var Page3SexData = {
//     "paper_id": "x_04_math_001",
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
//     ],
//     "class_rate": [
//         {
//             "question_index": "12",
//             "male_rate": 90.91,
//             "female_rate": 72.72999999999999
//         },
//         {
//             "question_index": "7_2",
//             "male_rate": 36.36,
//             "female_rate": 18.18
//         },
//         {
//             "question_index": "1_2",
//             "male_rate": 100,
//             "female_rate": 90.91
//         },
//         {
//             "question_index": "10",
//             "male_rate": 100,
//             "female_rate": 90.91
//         },
//         {
//             "question_index": "15_2",
//             "male_rate": 100,
//             "female_rate": 90.91
//         },
//         {
//             "question_index": "19",
//             "male_rate": 90.91,
//             "female_rate": 81.82000000000001
//         },
//         {
//             "question_index": "15_3",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "1_1",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "2_1",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "2_2",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "3_1",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "3_2",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "23_2",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "23_1",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "22",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "18_2",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "18_1",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "1_3",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "8_1",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "14",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "9",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "13",
//             "male_rate": -72.72999999999999,
//             "female_rate": -72.72999999999999
//         },
//         {
//             "question_index": "26",
//             "male_rate": -81.82000000000001,
//             "female_rate": -81.82000000000001
//         },
//         {
//             "question_index": "25_2",
//             "male_rate": -81.82000000000001,
//             "female_rate": -90.91
//         },
//         {
//             "question_index": "17_2",
//             "male_rate": -54.55,
//             "female_rate": -63.63999999999999
//         },
//         {
//             "question_index": "4_2",
//             "male_rate": -54.55,
//             "female_rate": -63.63999999999999
//         },
//         {
//             "question_index": "15_4",
//             "male_rate": -90.91,
//             "female_rate": -100
//         },
//         {
//             "question_index": "15_5",
//             "male_rate": -90.91,
//             "female_rate": -100
//         },
//         {
//             "question_index": "16",
//             "male_rate": -90.91,
//             "female_rate": -100
//         },
//         {
//             "question_index": "24_2",
//             "male_rate": -90.91,
//             "female_rate": -100
//         },
//         {
//             "question_index": "20",
//             "male_rate": -90.91,
//             "female_rate": -100
//         },
//         {
//             "question_index": "24_1",
//             "male_rate": -90.91,
//             "female_rate": -100
//         },
//         {
//             "question_index": "23_3",
//             "male_rate": -90.91,
//             "female_rate": -100
//         },
//         {
//             "question_index": "8_2",
//             "male_rate": -90.91,
//             "female_rate": -100
//         },
//         {
//             "question_index": "25_1",
//             "male_rate": -90.91,
//             "female_rate": -100
//         },
//         {
//             "question_index": "5_1",
//             "male_rate": -72.72999999999999,
//             "female_rate": -81.82000000000001
//         },
//         {
//             "question_index": "21",
//             "male_rate": -81.82000000000001,
//             "female_rate": -100
//         },
//         {
//             "question_index": "11",
//             "male_rate": -81.82000000000001,
//             "female_rate": -100
//         },
//         {
//             "question_index": "4_1",
//             "male_rate": -72.72999999999999,
//             "female_rate": -90.91
//         },
//         {
//             "question_index": "5_2",
//             "male_rate": -72.72999999999999,
//             "female_rate": -90.91
//         },
//         {
//             "question_index": "17_1",
//             "male_rate": -72.72999999999999,
//             "female_rate": -90.91
//         },
//         {
//             "question_index": "6",
//             "male_rate": -63.63999999999999,
//             "female_rate": -81.82000000000001
//         },
//         {
//             "question_index": "15_1",
//             "male_rate": -72.72999999999999,
//             "female_rate": -100
//         },
//         {
//             "question_index": "7_1",
//             "male_rate": -45.45,
//             "female_rate": -81.82000000000001
//         }
//     ],
//     "school_rate": [
//         {
//             "question_index": "4_2",
//             "male_rate": 62.029999999999994,
//             "female_rate": 41.43
//         },
//         {
//             "question_index": "7_2",
//             "male_rate": 51.9,
//             "female_rate": 31.430000000000003
//         },
//         {
//             "question_index": "17_1",
//             "male_rate": 74.68,
//             "female_rate": 62.86000000000001
//         },
//         {
//             "question_index": "12",
//             "male_rate": 82.28,
//             "female_rate": 75.71
//         },
//         {
//             "question_index": "4_1",
//             "male_rate": 82.28,
//             "female_rate": 75.71
//         },
//         {
//             "question_index": "19",
//             "male_rate": 96.2,
//             "female_rate": 90
//         },
//         {
//             "question_index": "5_1",
//             "male_rate": 89.87,
//             "female_rate": 84.28999999999999
//         },
//         {
//             "question_index": "6",
//             "male_rate": 79.75,
//             "female_rate": 74.29
//         },
//         {
//             "question_index": "15_1",
//             "male_rate": 91.14,
//             "female_rate": 85.71
//         },
//         {
//             "question_index": "17_2",
//             "male_rate": 51.9,
//             "female_rate": 47.14
//         },
//         {
//             "question_index": "15_2",
//             "male_rate": 97.47,
//             "female_rate": 92.86
//         },
//         {
//             "question_index": "3_2",
//             "male_rate": 100,
//             "female_rate": 97.14
//         },
//         {
//             "question_index": "3_1",
//             "male_rate": 100,
//             "female_rate": 97.14
//         },
//         {
//             "question_index": "18_1",
//             "male_rate": 100,
//             "female_rate": 97.14
//         },
//         {
//             "question_index": "10",
//             "male_rate": 94.94,
//             "female_rate": 92.86
//         },
//         {
//             "question_index": "8_1",
//             "male_rate": 97.47,
//             "female_rate": 95.71
//         },
//         {
//             "question_index": "15_3",
//             "male_rate": 98.72999999999999,
//             "female_rate": 97.14
//         },
//         {
//             "question_index": "20",
//             "male_rate": 98.72999999999999,
//             "female_rate": 97.14
//         },
//         {
//             "question_index": "5_2",
//             "male_rate": 88.61,
//             "female_rate": 87.14
//         },
//         {
//             "question_index": "23_1",
//             "male_rate": 100,
//             "female_rate": 98.57000000000001
//         },
//         {
//             "question_index": "21",
//             "male_rate": 93.67,
//             "female_rate": 92.86
//         },
//         {
//             "question_index": "18_2",
//             "male_rate": 96.2,
//             "female_rate": 95.71
//         },
//         {
//             "question_index": "1_3",
//             "male_rate": 97.47,
//             "female_rate": 97.14
//         },
//         {
//             "question_index": "8_2",
//             "male_rate": 97.47,
//             "female_rate": 97.14
//         },
//         {
//             "question_index": "15_4",
//             "male_rate": 97.47,
//             "female_rate": 97.14
//         },
//         {
//             "question_index": "24_2",
//             "male_rate": 97.47,
//             "female_rate": 97.14
//         },
//         {
//             "question_index": "16",
//             "male_rate": 98.72999999999999,
//             "female_rate": 98.57000000000001
//         },
//         {
//             "question_index": "14",
//             "male_rate": -100,
//             "female_rate": -100
//         },
//         {
//             "question_index": "24_1",
//             "male_rate": -91.14,
//             "female_rate": -91.43
//         },
//         {
//             "question_index": "22",
//             "male_rate": -92.41,
//             "female_rate": -92.86
//         },
//         {
//             "question_index": "1_2",
//             "male_rate": -96.2,
//             "female_rate": -97.14
//         },
//         {
//             "question_index": "9",
//             "male_rate": -98.72999999999999,
//             "female_rate": -100
//         },
//         {
//             "question_index": "1_1",
//             "male_rate": -98.72999999999999,
//             "female_rate": -100
//         },
//         {
//             "question_index": "11",
//             "male_rate": -91.14,
//             "female_rate": -92.86
//         },
//         {
//             "question_index": "25_1",
//             "male_rate": -91.14,
//             "female_rate": -92.86
//         },
//         {
//             "question_index": "23_2",
//             "male_rate": -94.94,
//             "female_rate": -97.14
//         },
//         {
//             "question_index": "15_5",
//             "male_rate": -94.94,
//             "female_rate": -97.14
//         },
//         {
//             "question_index": "2_1",
//             "male_rate": -97.47,
//             "female_rate": -100
//         },
//         {
//             "question_index": "26",
//             "male_rate": -91.14,
//             "female_rate": -94.28999999999999
//         },
//         {
//             "question_index": "23_3",
//             "male_rate": -92.41,
//             "female_rate": -95.71
//         },
//         {
//             "question_index": "13",
//             "male_rate": -54.43,
//             "female_rate": -58.57
//         },
//         {
//             "question_index": "2_2",
//             "male_rate": -94.94,
//             "female_rate": -100
//         },
//         {
//             "question_index": "7_1",
//             "male_rate": -67.09,
//             "female_rate": -75.71
//         },
//         {
//             "question_index": "25_2",
//             "male_rate": -74.68,
//             "female_rate": -84.28999999999999
//         }
//     ],
//     "qu_rate": [
//         {
//             "question_index": "4_2",
//             "male_rate": 71.65,
//             "female_rate": 63.92
//         },
//         {
//             "question_index": "7_2",
//             "male_rate": 45.48,
//             "female_rate": 40.21
//         },
//         {
//             "question_index": "21",
//             "male_rate": 95.02000000000001,
//             "female_rate": 91.07
//         },
//         {
//             "question_index": "5_1",
//             "male_rate": 91.59,
//             "female_rate": 89.69
//         },
//         {
//             "question_index": "20",
//             "male_rate": 98.75,
//             "female_rate": 97.25
//         },
//         {
//             "question_index": "19",
//             "male_rate": 96.88,
//             "female_rate": 95.88
//         },
//         {
//             "question_index": "5_2",
//             "male_rate": 88.16000000000001,
//             "female_rate": 87.29
//         },
//         {
//             "question_index": "17_1",
//             "male_rate": 82.55,
//             "female_rate": 81.78999999999999
//         },
//         {
//             "question_index": "15_2",
//             "male_rate": 96.26,
//             "female_rate": 95.53
//         },
//         {
//             "question_index": "4_1",
//             "male_rate": 90.34,
//             "female_rate": 89.69
//         },
//         {
//             "question_index": "24_1",
//             "male_rate": 91.28,
//             "female_rate": 90.72
//         },
//         {
//             "question_index": "22",
//             "male_rate": 91.9,
//             "female_rate": 91.41
//         },
//         {
//             "question_index": "6",
//             "male_rate": 71.96000000000001,
//             "female_rate": 71.48
//         },
//         {
//             "question_index": "18_1",
//             "male_rate": 99.38,
//             "female_rate": 98.97
//         },
//         {
//             "question_index": "15_3",
//             "male_rate": 96.57,
//             "female_rate": 96.22
//         },
//         {
//             "question_index": "1_2",
//             "male_rate": 96.26,
//             "female_rate": 96.22
//         },
//         {
//             "question_index": "1_3",
//             "male_rate": -95.95,
//             "female_rate": -96.22
//         },
//         {
//             "question_index": "14",
//             "male_rate": -99.69,
//             "female_rate": -100
//         },
//         {
//             "question_index": "17_2",
//             "male_rate": -65.42,
//             "female_rate": -65.98
//         },
//         {
//             "question_index": "23_1",
//             "male_rate": -99.07000000000001,
//             "female_rate": -99.66000000000001
//         },
//         {
//             "question_index": "10",
//             "male_rate": -85.98,
//             "female_rate": -86.6
//         },
//         {
//             "question_index": "15_4",
//             "male_rate": -96.57,
//             "female_rate": -97.25
//         },
//         {
//             "question_index": "11",
//             "male_rate": -86.92,
//             "female_rate": -87.63
//         },
//         {
//             "question_index": "3_1",
//             "male_rate": -97.50999999999999,
//             "female_rate": -98.28
//         },
//         {
//             "question_index": "18_2",
//             "male_rate": -95.33,
//             "female_rate": -96.22
//         },
//         {
//             "question_index": "23_2",
//             "male_rate": -96.26,
//             "female_rate": -97.25
//         },
//         {
//             "question_index": "12",
//             "male_rate": -76.64,
//             "female_rate": -77.66
//         },
//         {
//             "question_index": "3_2",
//             "male_rate": -96.57,
//             "female_rate": -97.59
//         },
//         {
//             "question_index": "8_1",
//             "male_rate": -94.39,
//             "female_rate": -95.53
//         },
//         {
//             "question_index": "15_1",
//             "male_rate": -88.16000000000001,
//             "female_rate": -89.35
//         },
//         {
//             "question_index": "24_2",
//             "male_rate": -95.02000000000001,
//             "female_rate": -96.22
//         },
//         {
//             "question_index": "1_1",
//             "male_rate": -96.57,
//             "female_rate": -97.94
//         },
//         {
//             "question_index": "13",
//             "male_rate": -59.5,
//             "female_rate": -61.17
//         },
//         {
//             "question_index": "2_1",
//             "male_rate": -97.2,
//             "female_rate": -98.97
//         },
//         {
//             "question_index": "23_3",
//             "male_rate": -94.08,
//             "female_rate": -95.88
//         },
//         {
//             "question_index": "8_2",
//             "male_rate": -94.39,
//             "female_rate": -96.22
//         },
//         {
//             "question_index": "9",
//             "male_rate": -95.64,
//             "female_rate": -97.59
//         },
//         {
//             "question_index": "26",
//             "male_rate": -92.83,
//             "female_rate": -94.85
//         },
//         {
//             "question_index": "16",
//             "male_rate": -95.95,
//             "female_rate": -98.97
//         },
//         {
//             "question_index": "2_2",
//             "male_rate": -93.15,
//             "female_rate": -96.22
//         },
//         {
//             "question_index": "15_5",
//             "male_rate": -94.08,
//             "female_rate": -97.25
//         },
//         {
//             "question_index": "7_1",
//             "male_rate": -60.75000000000001,
//             "female_rate": -64.60000000000001
//         },
//         {
//             "question_index": "25_1",
//             "male_rate": -88.79,
//             "female_rate": -92.78
//         },
//         {
//             "question_index": "25_2",
//             "male_rate": -77.25999999999999,
//             "female_rate": -84.19
//         }
//     ]
// }

// var Page3CityData = {
//     "paper_id": "x_04_math_001",
//     "questions": [
//     "1_1",
//     "1_2",
//     "1_3",
//     "2_1",
//     "2_2",
//     "3_1",
//     "3_2",
//     "4_1",
//     "4_2",
//     "5_1",
//     "5_2",
//     "6",
//     "7_1",
//     "7_2",
//     "8_1",
//     "8_2",
//     "9",
//     "10",
//     "11",
//     "12",
//     "13",
//     "14",
//     "15_1",
//     "15_2",
//     "15_3",
//     "15_4",
//     "15_5",
//     "16",
//     "17_1",
//     "17_2",
//     "18_1",
//     "18_2",
//     "19",
//     "20",
//     "21",
//     "22",
//     "23_1",
//     "23_2",
//     "23_3",
//     "24_1",
//     "24_2",
//     "25_1",
//     "25_2",
//     "26"
// ],
//     "class_rate": [
//     {
//         "question_index": "9",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "1_1",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "2_1",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "2_2",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "3_1",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "3_2",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "18_1",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_3",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "14",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "22",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "23_2",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "23_1",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "8_1",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "1_3",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "18_2",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "8_2",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "25_1",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "23_3",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "20",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "24_1",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "1_2",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "10",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "24_2",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_4",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_5",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "16",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_2",
//         "city_rate": 95.45,
//         "country_rate": 0
//     },
//     {
//         "question_index": "21",
//         "city_rate": 90.91,
//         "country_rate": 0
//     },
//     {
//         "question_index": "11",
//         "city_rate": 90.91,
//         "country_rate": 0
//     },
//     {
//         "question_index": "19",
//         "city_rate": 86.36,
//         "country_rate": 0
//     },
//     {
//         "question_index": "25_2",
//         "city_rate": 86.36,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_1",
//         "city_rate": 86.36,
//         "country_rate": 0
//     },
//     {
//         "question_index": "26",
//         "city_rate": 81.82000000000001,
//         "country_rate": 0
//     },
//     {
//         "question_index": "12",
//         "city_rate": 81.82000000000001,
//         "country_rate": 0
//     },
//     {
//         "question_index": "4_1",
//         "city_rate": 81.82000000000001,
//         "country_rate": 0
//     },
//     {
//         "question_index": "17_1",
//         "city_rate": 81.82000000000001,
//         "country_rate": 0
//     },
//     {
//         "question_index": "5_2",
//         "city_rate": 81.82000000000001,
//         "country_rate": 0
//     },
//     {
//         "question_index": "5_1",
//         "city_rate": 77.27000000000001,
//         "country_rate": 0
//     },
//     {
//         "question_index": "13",
//         "city_rate": 72.72999999999999,
//         "country_rate": 0
//     },
//     {
//         "question_index": "6",
//         "city_rate": 72.72999999999999,
//         "country_rate": 0
//     },
//     {
//         "question_index": "7_1",
//         "city_rate": 63.63999999999999,
//         "country_rate": 0
//     },
//     {
//         "question_index": "4_2",
//         "city_rate": 59.089999999999996,
//         "country_rate": 0
//     },
//     {
//         "question_index": "17_2",
//         "city_rate": 59.089999999999996,
//         "country_rate": 0
//     },
//     {
//         "question_index": "7_2",
//         "city_rate": 27.27,
//         "country_rate": 0
//     }
// ],
//     "school_rate": [
//     {
//         "question_index": "14",
//         "city_rate": 100,
//         "country_rate": 0
//     },
//     {
//         "question_index": "1_1",
//         "city_rate": 99.33,
//         "country_rate": 0
//     },
//     {
//         "question_index": "9",
//         "city_rate": 99.33,
//         "country_rate": 0
//     },
//     {
//         "question_index": "23_1",
//         "city_rate": 99.33,
//         "country_rate": 0
//     },
//     {
//         "question_index": "3_1",
//         "city_rate": 98.66,
//         "country_rate": 0
//     },
//     {
//         "question_index": "3_2",
//         "city_rate": 98.66,
//         "country_rate": 0
//     },
//     {
//         "question_index": "18_1",
//         "city_rate": 98.66,
//         "country_rate": 0
//     },
//     {
//         "question_index": "2_1",
//         "city_rate": 98.66,
//         "country_rate": 0
//     },
//     {
//         "question_index": "16",
//         "city_rate": 98.66,
//         "country_rate": 0
//     },
//     {
//         "question_index": "20",
//         "city_rate": 97.99,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_3",
//         "city_rate": 97.99,
//         "country_rate": 0
//     },
//     {
//         "question_index": "8_2",
//         "city_rate": 97.32,
//         "country_rate": 0
//     },
//     {
//         "question_index": "1_3",
//         "city_rate": 97.32,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_4",
//         "city_rate": 97.32,
//         "country_rate": 0
//     },
//     {
//         "question_index": "24_2",
//         "city_rate": 97.32,
//         "country_rate": 0
//     },
//     {
//         "question_index": "2_2",
//         "city_rate": 97.32,
//         "country_rate": 0
//     },
//     {
//         "question_index": "8_1",
//         "city_rate": 96.64,
//         "country_rate": 0
//     },
//     {
//         "question_index": "1_2",
//         "city_rate": 96.64,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_5",
//         "city_rate": 95.97,
//         "country_rate": 0
//     },
//     {
//         "question_index": "23_2",
//         "city_rate": 95.97,
//         "country_rate": 0
//     },
//     {
//         "question_index": "18_2",
//         "city_rate": 95.97,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_2",
//         "city_rate": 95.3,
//         "country_rate": 0
//     },
//     {
//         "question_index": "10",
//         "city_rate": 93.96,
//         "country_rate": 0
//     },
//     {
//         "question_index": "23_3",
//         "city_rate": 93.96,
//         "country_rate": 0
//     },
//     {
//         "question_index": "21",
//         "city_rate": 93.28999999999999,
//         "country_rate": 0
//     },
//     {
//         "question_index": "19",
//         "city_rate": 93.28999999999999,
//         "country_rate": 0
//     },
//     {
//         "question_index": "26",
//         "city_rate": 92.62,
//         "country_rate": 0
//     },
//     {
//         "question_index": "22",
//         "city_rate": 92.62,
//         "country_rate": 0
//     },
//     {
//         "question_index": "25_1",
//         "city_rate": 91.95,
//         "country_rate": 0
//     },
//     {
//         "question_index": "11",
//         "city_rate": 91.95,
//         "country_rate": 0
//     },
//     {
//         "question_index": "24_1",
//         "city_rate": 91.28,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_1",
//         "city_rate": 88.59,
//         "country_rate": 0
//     },
//     {
//         "question_index": "5_2",
//         "city_rate": 87.92,
//         "country_rate": 0
//     },
//     {
//         "question_index": "5_1",
//         "city_rate": 87.25,
//         "country_rate": 0
//     },
//     {
//         "question_index": "25_2",
//         "city_rate": 79.19,
//         "country_rate": 0
//     },
//     {
//         "question_index": "12",
//         "city_rate": 79.19,
//         "country_rate": 0
//     },
//     {
//         "question_index": "4_1",
//         "city_rate": 79.19,
//         "country_rate": 0
//     },
//     {
//         "question_index": "6",
//         "city_rate": 77.18,
//         "country_rate": 0
//     },
//     {
//         "question_index": "7_1",
//         "city_rate": 71.14,
//         "country_rate": 0
//     },
//     {
//         "question_index": "17_1",
//         "city_rate": 69.13,
//         "country_rate": 0
//     },
//     {
//         "question_index": "13",
//         "city_rate": 56.379999999999995,
//         "country_rate": 0
//     },
//     {
//         "question_index": "4_2",
//         "city_rate": 52.349999999999994,
//         "country_rate": 0
//     },
//     {
//         "question_index": "17_2",
//         "city_rate": 49.66,
//         "country_rate": 0
//     },
//     {
//         "question_index": "7_2",
//         "city_rate": 42.28,
//         "country_rate": 0
//     }
// ],
//     "qu_rate": [
//     {
//         "question_index": "14",
//         "city_rate": 99.83999999999999,
//         "country_rate": 0
//     },
//     {
//         "question_index": "23_1",
//         "city_rate": 99.35000000000001,
//         "country_rate": 0
//     },
//     {
//         "question_index": "18_1",
//         "city_rate": 99.18,
//         "country_rate": 0
//     },
//     {
//         "question_index": "20",
//         "city_rate": 98.04,
//         "country_rate": 0
//     },
//     {
//         "question_index": "2_1",
//         "city_rate": 98.04,
//         "country_rate": 0
//     },
//     {
//         "question_index": "3_1",
//         "city_rate": 97.88,
//         "country_rate": 0
//     },
//     {
//         "question_index": "16",
//         "city_rate": 97.39,
//         "country_rate": 0
//     },
//     {
//         "question_index": "1_1",
//         "city_rate": 97.22,
//         "country_rate": 0
//     },
//     {
//         "question_index": "3_2",
//         "city_rate": 97.06,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_4",
//         "city_rate": 96.89999999999999,
//         "country_rate": 0
//     },
//     {
//         "question_index": "23_2",
//         "city_rate": 96.73,
//         "country_rate": 0
//     },
//     {
//         "question_index": "9",
//         "city_rate": 96.57,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_3",
//         "city_rate": 96.41,
//         "country_rate": 0
//     },
//     {
//         "question_index": "19",
//         "city_rate": 96.41,
//         "country_rate": 0
//     },
//     {
//         "question_index": "1_2",
//         "city_rate": 96.24000000000001,
//         "country_rate": 0
//     },
//     {
//         "question_index": "1_3",
//         "city_rate": 96.08,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_2",
//         "city_rate": 95.92,
//         "country_rate": 0
//     },
//     {
//         "question_index": "18_2",
//         "city_rate": 95.75,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_5",
//         "city_rate": 95.59,
//         "country_rate": 0
//     },
//     {
//         "question_index": "24_2",
//         "city_rate": 95.59,
//         "country_rate": 0
//     },
//     {
//         "question_index": "8_2",
//         "city_rate": 95.26,
//         "country_rate": 0
//     },
//     {
//         "question_index": "8_1",
//         "city_rate": 94.93,
//         "country_rate": 0
//     },
//     {
//         "question_index": "23_3",
//         "city_rate": 94.93,
//         "country_rate": 0
//     },
//     {
//         "question_index": "2_2",
//         "city_rate": 94.61,
//         "country_rate": 0
//     },
//     {
//         "question_index": "26",
//         "city_rate": 93.78999999999999,
//         "country_rate": 0
//     },
//     {
//         "question_index": "21",
//         "city_rate": 93.14,
//         "country_rate": 0
//     },
//     {
//         "question_index": "22",
//         "city_rate": 91.67,
//         "country_rate": 0
//     },
//     {
//         "question_index": "24_1",
//         "city_rate": 91.01,
//         "country_rate": 0
//     },
//     {
//         "question_index": "25_1",
//         "city_rate": 90.69,
//         "country_rate": 0
//     },
//     {
//         "question_index": "5_1",
//         "city_rate": 90.69,
//         "country_rate": 0
//     },
//     {
//         "question_index": "4_1",
//         "city_rate": 90.03,
//         "country_rate": 0
//     },
//     {
//         "question_index": "15_1",
//         "city_rate": 88.73,
//         "country_rate": 0
//     },
//     {
//         "question_index": "5_2",
//         "city_rate": 87.75,
//         "country_rate": 0
//     },
//     {
//         "question_index": "11",
//         "city_rate": 87.25,
//         "country_rate": 0
//     },
//     {
//         "question_index": "10",
//         "city_rate": 86.27,
//         "country_rate": 0
//     },
//     {
//         "question_index": "17_1",
//         "city_rate": 82.19,
//         "country_rate": 0
//     },
//     {
//         "question_index": "25_2",
//         "city_rate": 80.56,
//         "country_rate": 0
//     },
//     {
//         "question_index": "12",
//         "city_rate": 77.12,
//         "country_rate": 0
//     },
//     {
//         "question_index": "6",
//         "city_rate": 71.73,
//         "country_rate": 0
//     },
//     {
//         "question_index": "4_2",
//         "city_rate": 67.97,
//         "country_rate": 0
//     },
//     {
//         "question_index": "17_2",
//         "city_rate": 65.69,
//         "country_rate": 0
//     },
//     {
//         "question_index": "7_1",
//         "city_rate": 62.580000000000005,
//         "country_rate": 0
//     },
//     {
//         "question_index": "13",
//         "city_rate": 60.29,
//         "country_rate": 0
//     },
//     {
//         "question_index": "7_2",
//         "city_rate": 42.970000000000006,
//         "country_rate": 0
//     }
// ]
// }
// var Page3classData = {
//     "array": [
//     {
//         "degree": 45.45,
//         "kp_name": "乘除混合的简便运算"
//     },
//     {
//         "degree": 70.45,
//         "kp_name": "乘法结合律"
//     },
//     {
//         "degree": 72.72999999999999,
//         "kp_name": "平行线的画法"
//     },
//     {
//         "degree": 72.72999999999999,
//         "kp_name": "加减混合的简便运算"
//     },
//     {
//         "degree": 72.72999999999999,
//         "kp_name": "小数的加减法"
//     },
//     {
//         "degree": 79.55,
//         "kp_name": "乘法分配律"
//     },
//     {
//         "degree": 81.82000000000001,
//         "kp_name": "三角形的内角和为180度"
//     },
//     {
//         "degree": 81.82000000000001,
//         "kp_name": "角的度量"
//     },
//     {
//         "degree": 86.36,
//         "kp_name": "过直线上一点画垂线的方法"
//     },
//     {
//         "degree": 90.91,
//         "kp_name": "求小数的近似数"
//     },
//     {
//         "degree": 93.17999999999999,
//         "kp_name": "用量角器画指定度数的角的方法"
//     },
//     {
//         "degree": 94.55,
//         "kp_name": "亿以内的数的写法"
//     },
//     {
//         "degree": 95.45,
//         "kp_name": "用四舍五入法保留近似数的方法"
//     },
//     {
//         "degree": 95.45,
//         "kp_name": "单位换算"
//     },
//     {
//         "degree": 95.45,
//         "kp_name": "角的概念"
//     },
//     {
//         "degree": 97.72999999999999,
//         "kp_name": "小数的比较大小"
//     },
//     {
//         "degree": 98.48,
//         "kp_name": "四则运算"
//     },
//     {
//         "degree": 98.48,
//         "kp_name": "认识平角、周角"
//     },
//     {
//         "degree": 100,
//         "kp_name": "相交与垂直的概念"
//     },
//     {
//         "degree": 100,
//         "kp_name": "加法结合律"
//     },
//     {
//         "degree": 100,
//         "kp_name": "亿以内的数的读法"
//     },
//     {
//         "degree": 100,
//         "kp_name": "加法交换律"
//     },
//     {
//         "degree": 100,
//         "kp_name": "小数点的移动"
//     }
// ],
//     "caculate_type_array": [
//     {
//         "question_type": "计算题",
//         "degree": 85.56
//     },
//     {
//         "question_type": "概念题",
//         "degree": 91.36
//     },
//     {
//         "question_type": "画图题",
//         "degree": 91.36
//     },
//     {
//         "question_type": "应用题",
//         "degree": 92.86
//     }
// ]
// }
// var Page3PersionData = {
//     "student_id": "20130501101002",
//     "array": [
//         {
//             "degree": 0,
//             "kp_name": "求小数的近似数"
//         },
//         {
//             "degree": 50,
//             "kp_name": "乘法结合律"
//         },
//         {
//             "degree": 50,
//             "kp_name": "乘除混合的简便运算"
//         },
//         {
//             "degree": 100,
//             "kp_name": "三角形的内角和为180度"
//         },
//         {
//             "degree": 100,
//             "kp_name": "乘法分配律"
//         },
//         {
//             "degree": 100,
//             "kp_name": "加减混合的简便运算"
//         },
//         {
//             "degree": 100,
//             "kp_name": "加法结合律"
//         },
//         {
//             "degree": 100,
//             "kp_name": "小数的比较大小"
//         },
//         {
//             "degree": 100,
//             "kp_name": "小数点的移动"
//         },
//         {
//             "degree": 100,
//             "kp_name": "单位换算"
//         },
//         {
//             "degree": 100,
//             "kp_name": "四则运算"
//         },
//         {
//             "degree": 100,
//             "kp_name": "加法交换律"
//         },
//         {
//             "degree": 100,
//             "kp_name": "小数的加减法"
//         },
//         {
//             "degree": 100,
//             "kp_name": "亿以内的数的读法"
//         },
//         {
//             "degree": 100,
//             "kp_name": "亿以内的数的写法"
//         },
//         {
//             "degree": 100,
//             "kp_name": " 用四舍五入法保留近似数的方法"
//         },
//         {
//             "degree": 100,
//             "kp_name": "平行线的画法"
//         },
//         {
//             "degree": 100,
//             "kp_name": " 相交与垂直的概念"
//         },
//         {
//             "degree": 100,
//             "kp_name": "过直线上一点画垂线的方法"
//         },
//         {
//             "degree": 100,
//             "kp_name": "角的概念"
//         },
//         {
//             "degree": 100,
//             "kp_name": "认识平角、周角"
//         },
//         {
//             "degree": 100,
//             "kp_name": "用量角器画指定度数的角的方法"
//         },
//         {
//             "degree": 100,
//             "kp_name": "角的度量"
//         }
//     ],
//     "caculate_type_array": [
//         {
//             "question_type": "计算题",
//             "degree": 88.24
//         },
//         {
//             "question_type": "概念题",
//             "degree": 90
//         },
//         {
//             "question_type": "画图题",
//             "degree": 100
//         },
//         {
//             "question_type": "应用题",
//             "degree": 100
//         }
//     ]
// }
// var stuData =
//     [
//         {
//             "student_name": "徐康凡",
//             "student_id": "20130501101002"
//         },
//         {
//             "student_name": "陈高昀",
//             "student_id": "20130501101004"
//         },
//         {
//             "student_name": "王晨",
//             "student_id": "20130501101006"
//         },
//         {
//             "student_name": "范子杰",
//             "student_id": "20130501101008"
//         },
//         {
//             "student_name": "陆一帆",
//             "student_id": "20130501101010"
//         },
//         {
//             "student_name": "王睿",
//             "student_id": "20130501101012"
//         },
//         {
//             "student_name": "赵方洲",
//             "student_id": "20130501101014"
//         },
//         {
//             "student_name": "潘鹏宇",
//             "student_id": "20130501101016"
//         },
//         {
//             "student_name": "周子裕",
//             "student_id": "20130501101018"
//         },
//         {
//             "student_name": "杨奕诚",
//             "student_id": "20130501101020"
//         },
//         {
//             "student_name": "姚俊鑫",
//             "student_id": "20130501101022"
//         },
//         {
//             "student_name": "邱镜缘",
//             "student_id": "20130501201024"
//         },
//         {
//             "student_name": "谢子欣",
//             "student_id": "20130501201026"
//         },
//         {
//             "student_name": "王曦翎",
//             "student_id": "20130501201028"
//         },
//         {
//             "student_name": "汪晨辰",
//             "student_id": "20130501201030"
//         },
//         {
//             "student_name": "刘舒艳",
//             "student_id": "20130501201032"
//         },
//         {
//             "student_name": "平恺韵",
//             "student_id": "20130501201034"
//         },
//         {
//             "student_name": "张滢",
//             "student_id": "20130501201036"
//         },
//         {
//             "student_name": "江舟",
//             "student_id": "20130501201038"
//         },
//         {
//             "student_name": "张之渝",
//             "student_id": "20130501201040"
//         },
//         {
//             "student_name": "储晨昕",
//             "student_id": "20130501201042"
//         },
//         {
//             "student_name": "张雯君",
//             "student_id": "20130501201044"
//         }
//     ]
// var Page1Data = {
//     "class_data": {
//         "total_num": 22,
//         "very_good": 2,
//         "good": 6,
//         "middle": 7,
//         "poor": 7,
//         "average": "70.41",
//         "bz": "4.39",
//         "difficult": "0.70",
//         "qufd": "0.29"
//     },
//     "class_data_p": {
//         "total_num": 22,
//         "very_good_p": 9.09,
//         "good_p": 27.27,
//         "middle_p": 31.819999999999997,
//         "poor_p": 31.819999999999997
//     },
//     "school_data_p": {
//         "total_num": 64,
//         "very_good_p": 18.75,
//         "good_p": 32.81,
//         "middle_p": 37.5,
//         "poor_p": 10.94
//     }
// }
// var Page2Data = {
//         "paper_ids": [
//             {
//                 "paper_id": 1,
//                 "paper_name": "第一单元测试",
//                 "test_time": "2017-06-30T16:00:00.000Z"
//             },
//             {
//                 "paper_id": 2,
//                 "paper_name": "第二单元测试",
//                 "test_time": "2017-07-09T16:00:00.000Z"
//             },
//             {
//                 "paper_id": 3,
//                 "paper_name": "第三单元测试",
//                 "test_time": "2017-07-19T16:00:00.000Z"
//             }
//         ],
//         "papers": [
//             {
//                 "paper_id": 1,
//                 "paper_name": "第一单元测试",
//                 "test_time": "2017-06-30T16:00:00.000Z",
//                 "class_data": {
//                     "very_good": 2,
//                     "good": 6,
//                     "middle": 7,
//                     "poor": 7
//                 }
//             },
//             {
//                 "paper_id": 2,
//                 "paper_name": "第二单元测试",
//                 "test_time": "2017-07-09T16:00:00.000Z",
//                 "class_data": {
//                     "very_good": 2,
//                     "good": 5,
//                     "middle": 9,
//                     "poor": 6
//                 }
//             },
//             {
//                 "paper_id": 3,
//                 "paper_name": "第三单元测试",
//                 "test_time": "2017-07-19T16:00:00.000Z",
//                 "class_data": {
//                     "very_good": 7,
//                     "good": 12,
//                     "middle": 2,
//                     "poor": 1
//                 }
//             }
//         ],
//         "class_very_good_p": [
//             {
//                 "paper_id": 1,
//                 "paper_name": "第一单元测试",
//                 "test_time": "2017-06-30T16:00:00.000Z",
//                 "class_very_good_p": 9.09
//             },
//             {
//                 "paper_id": 2,
//                 "paper_name": "第二单元测试",
//                 "test_time": "2017-07-09T16:00:00.000Z",
//                 "class_very_good_p": 9.09
//             },
//             {
//                 "paper_id": 3,
//                 "paper_name": "第三单元测试",
//                 "test_time": "2017-07-19T16:00:00.000Z",
//                 "class_very_good_p": 31.819999999999997
//             }
//         ],
//         "school_very_good_p": [
//             {
//                 "paper_id": 1,
//                 "paper_name": "第一单元测试",
//                 "test_time": "2017-06-30T16:00:00.000Z",
//                 "school_very_good_p": 5.7299999999999995
//             },
//             {
//                 "paper_id": 2,
//                 "paper_name": "第二单元测试",
//                 "test_time": "2017-07-09T16:00:00.000Z",
//                 "school_very_good_p": 4.17
//             },
//             {
//                 "paper_id": 3,
//                 "paper_name": "第三单元测试",
//                 "test_time": "2017-07-19T16:00:00.000Z",
//                 "school_very_good_p": 6.77
//             }
//         ]
//     }