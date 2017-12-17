// 基于准备好的dom，初始化echarts实例
function getPage2chart(Page2data,myChart1,myChart2) {
    var class_very_good_p = Page2data.class_very_good_p;
    var school_very_good_p = Page2data.school_very_good_p;
    // var all_very_good_p = papers.all_very_good_p;
    var chart3_class_data=[];
    var chart3_class_name=[];//每次考试的试卷名
    var chart3_school_data=[];
    var chart3_school_name=[];//每次考试的试卷名
    // var chart3_all_data=[];
    // var chart3_all_name=[];//每次考试的试卷名
    $.each(class_very_good_p,function (index,value) {
        chart3_class_data.push(value.class_very_good_p);
        chart3_class_name.push(value.paper_name)
    });
    $.each(school_very_good_p,function (index,value) {
        chart3_school_data.push(value.school_very_good_p);
        chart3_school_name.push(value.paper_name)
    });
    // $.each(all_very_good_p,function (index,value) {
    //     chart3_all_data.push(value.all_very_good_p);
    //     chart3_all_name.push(value.paper_name)
    // });
    var paperData = Page2data.papers;
    var very_good_data = [];
    var good_data = [];
    var middle_data = [];
    var very_poor_data = [];
    $.each(paperData,function (index,value) {
        very_good_data.push(value.class_data.very_good)
    })
    $.each(paperData,function (index,value) {
        good_data.push(value.class_data.good)
    })
    $.each(paperData,function (index,value) {
        middle_data.push(value.class_data.middle)
    })
    $.each(paperData,function (index,value) {
        very_poor_data.push(value.class_data.poor)
    })



//-------------------------------第一张图表
    getEchart3();//绘制图表1
//-------------------------------第二张图表
    getEchart4();
    function getEchart3(){
        var option = {
            title : {
                text: "学习进程分析\n",
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['优秀','良好','中等','不及格']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : chart3_class_name
                }
            ],
            yAxis : [
                {
                    type : 'value',
                }
            ],
            series : [
                {
                    name:'优秀',
                    type:'line',
                    data:very_good_data,
                    smooth:true,
                },
                {
                    name:'良好',
                    type:'line',
                    data:good_data,
                    smooth:true,
                },
                {
                    name:'中等',
                    type:'line',
                    data:middle_data,
                    smooth:true,
                },
                {
                    name:'不及格',
                    type:'line',
                    data:very_poor_data,
                    smooth:true,  //这句就是让曲线变平滑的
                },
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
}
    function getEchart4(){
        var option = {
            title : {
                text: '全区,全校,全班优秀比例',
                subtext: ''
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['班级成绩','全校成绩']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : chart3_class_name
                    // data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel : {
                        formatter: '{value} %'
                    }
                }
            ],
            series : [
                {
                    name:'班级成绩',
                    type:'line',
                    data:chart3_class_data
                },
                {
                    name:'全校成绩',
                    type:'line',
                    data:chart3_school_data,
                },
                // {
                //     name:'全区成绩',
                //     type:'line',
                //     data:chart3_all_data,
                // },

            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option);
    }
}
