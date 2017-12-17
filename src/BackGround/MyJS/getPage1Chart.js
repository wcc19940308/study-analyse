// 基于准备好的dom，初始化echarts实例
function getPage1chart(Data,myChart1,myChart2) {
    var best_num = Data.class_data.very_good;
    var good_num = Data.class_data.good;
    var middle_num = Data.class_data.middle;
    var poor_num = Data.class_data.poor;
    var class_very_good_p=Data.class_data_p.very_good_p;
    var class_good_p=Data.class_data_p.good_p;
    var class_middle_p=Data.class_data_p.middle_p;
    var class_poor_p=Data.class_data_p.poor_p;
    var school_best_p=Data.school_data_p.very_good_p;
    var school_good_p=Data.school_data_p.good_p;
    var school_middle_p=Data.school_data_p.middle_p;
    var school_poor_p=Data.school_data_p.poor_p;
    var average = Data.class_data.average;
    var bz = Data.class_data.bz;
    var difficult = Data.class_data.difficult;
    var qufd = Data.class_data.qufd;
    document.getElementById("averageID").innerHTML="&nbsp; "+average;
    document.getElementById("bzID").innerHTML="&nbsp; "+bz;
    document.getElementById("difficultID").innerHTML="&nbsp; "+difficult;
    document.getElementById("qufdID").innerHTML="&nbsp; "+qufd;
    getEchart1(best_num,good_num,middle_num,poor_num);//绘制图表1
    getEchart2(class_very_good_p,class_good_p,class_middle_p,class_poor_p,school_best_p,school_good_p,school_middle_p,school_poor_p);//绘制图表2
    function getEchart1(best_num,good_num,middle_num,poor_num){
        var option = {
            color: ['#3398DB'],
            title : {
                text: '学生成绩分类表',
                // subtext: '按不同分数段，对学生进行区分'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }    },
            grid: {
                left: '3%',
                bottom: '3%',
                containLabel: true,
                x: 80,
                y: 60,
                x2: 80,
                y2: 60,
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['优秀', '良好', '中等', '不及格'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    name : '分值'
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '人数'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '60%',
                    itemStyle :
                        {
                            normal:
                                {
                                    label : {show: true, position: 'top'}
                                }
                        },
                    data:[best_num,good_num,middle_num,poor_num],
                    smooth:true,  //这句就是让曲线变平滑的
                }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
    }
//-------------------------------第二张图表
    function getEchart2(class_very_good_p,class_good_p,class_middle_p,class_poor_p,school_best_p,school_good_p,school_middle_p,school_poor_p) {
        // 基于准备好的dom，初始化echarts实例

        var Title = '全校数学考试对比分析(%)\n'
       var option = {
            title : {
                text: Title ,
                // subtext: '将本班成绩情况与全校进行对比'
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
                    data : ['优秀', '良好', '中等', '不及格']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'班级成绩',
                    type:'bar',
                    data:[class_very_good_p,class_good_p,class_middle_p,class_poor_p],
                    itemStyle:{
                        normal:{color:'#ff7f50'}
                    },
                    smooth:true,  //这句就是让曲线变平滑的
                },
                {
                    name:'全校成绩',
                    type:'bar',
                    data:[school_best_p,school_good_p,school_middle_p,school_poor_p],
                    itemStyle:{
                        normal:{color:'#87cefa'}
                    },
                    smooth:true,  //这句就是让曲线变平滑的

                },

            ]
        };
        myChart2.setOption(option);
    }

}

