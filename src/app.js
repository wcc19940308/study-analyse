/**
		created by cc on 10/18
**/

var express = require("express");
var bodyParser = require("body-parser");

//下面这个是用mysql查询数据库
var LoginRouter_mysql = require("../routers_mysql/LoginRouter.js");
var PaperAnalyseRouter_mysql = require("../routers_mysql/PaperAnalyseRouter.js");
var StudentAnalyseRouter_mysql = require("../routers_mysql/StudentAnalyseRouter.js");
var ClassAnalyseRouter_mysql = require("../routers_mysql/ClassAnalyseRouter.js");
var MultipleAnalyseRouter_mysql = require("../routers_mysql/MultipleAnalyseRouter.js");
var ImportInterface_mysql = require("../routers_mysql/ImportInterface.js");
var RegisterRouter_mysql = require("../routers_mysql/RegisterRouter.js");
var AllocateClassSubjectRouter_mysql = require("../routers_mysql/AllocateClassSubjectRouter.js");


//wcc
var StudentInforListRouter_mysql = require("../routers_mysql/StudentInforListRouter");
var AddStudentRouter_mysql = require("../routers_mysql/AddStudentRouter");
var AddPaperRouter_mysql = require("../routers_mysql/AddPaperRouter");
var PaperQuestionInforListRouter_mysql = require("../routers_mysql/PaperQuestionInforListRouter");
var SexDifferenceAnalyse_mysql = require("../routers_mysql/SexDifferenceAnalyseRouter");
var CountryDifferenceAnalyse_mysql = require("../routers_mysql/CountryDifferenceAnalyseRouter");

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/src" , express.static(__dirname));
app.get('/', function (req,res) {
	//onsole.log(__dirname);
   res.redirect('../src/Login/login.html');
});




//
app.get("/getLoginSchool_mysql",LoginRouter_mysql.getAllSchool);
app.get("/login_mysql" , LoginRouter_mysql.login);
app.get("/subject_mysql" ,PaperAnalyseRouter_mysql.search_subject);
app.get("/papers_mysql" , PaperAnalyseRouter_mysql.search_papers);
app.get("/grade_classification_mysql" , PaperAnalyseRouter_mysql.search_grade_classification_mysql);
app.get("/all_student_mysql" ,StudentAnalyseRouter_mysql.search_student);
app.get("/studentanalyse_mysql" , StudentAnalyseRouter_mysql.studentanalyse);
app.get("/classanalyse_mysql" , ClassAnalyseRouter_mysql.class_analyse);
app.get("/multiple_analyse_mysql" , MultipleAnalyseRouter_mysql.multipleAnalyse_mysql);
app.get("/getSchool", ImportInterface_mysql.getSchool);
/*app.get("/getGrade",ImportInterface_mysql.getGrade);
app.get("/getClass",ImportInterface_mysql.getClass);
app.get("/getSubject",ImportInterface_mysql.getSubject);*/
app.get("/getAllSchool_mysql",ImportInterface_mysql.getAllSchool);
app.get("/getAllGrade_mysql",ImportInterface_mysql.getAllGrade);
app.get("/getAllClass_mysql",ImportInterface_mysql.getAllClass);
app.get("/getAllSubject_mysql",ImportInterface_mysql.getAllSubject);
app.get("/checkSchool_mysql" , ImportInterface_mysql.checkSchool);
app.get("/addschool_mysql" , ImportInterface_mysql.addschool);
app.get("/addgrade_mysql" , ImportInterface_mysql.addgrade);
app.get("/addclass_mysql" , ImportInterface_mysql.addclass);
app.get("/addclasssubject_mysql" , ImportInterface_mysql.addclasssubject);
app.get("/register_mysql" , RegisterRouter_mysql.register);
app.get("/allocatesubject_mysql", AllocateClassSubjectRouter_mysql.search_teacher_infor);
app.get("/addknowlegdepoint_mysql" , AddPaperRouter_mysql.getKnowledgePoint);
app.get("/checktwopoint_mysql" , AddPaperRouter_mysql.checkLevelTwoKnowledgePoint);
app.get("/addleveltwopoint_mysql" , AddPaperRouter_mysql.addLevelTwoKnowledgePoint);
app.get("/addlevelonepoint_mysql" , AddPaperRouter_mysql.addLevelOneKnowledgePoint);
app.get("/addquestiontype_mysql" , AddPaperRouter_mysql.addQuestionType);
app.get("/addthinkingtype_mysql" , AddPaperRouter_mysql.addThinkingType);
app.get("/addabilityrequire_mysql" , AddPaperRouter_mysql.addAbilityRequire);

//wcc
app.get("/addStudent_mysql",AddStudentRouter_mysql.addStudent);
app.get("/studentInforList_mysql",StudentInforListRouter_mysql.inforList);
app.get("/addPaper_mysql",AddPaperRouter_mysql.addPaper);
app.get("/paperQuestionInforList_mysql",PaperQuestionInforListRouter_mysql.PaperQuestionInforList);
app.get("/sexDifferenceAnalyse_mysql",SexDifferenceAnalyse_mysql.SexDifferenceAnalyse);
app.get("/countryDifferenceAnalyse_mysql",CountryDifferenceAnalyse_mysql.CountryDifferenceAnalyse);

var server = app.listen(3003 , function(){

	console.log("app is listening on port 3003!");
}); 