// 基于准备好的dom，初始化echarts实例
function getSexChart(Data,myChart1,myChart2,myChart3) {
    getEchart51(Data,myChart1);//绘制图表1
    getEchart52(Data,myChart2);//绘制图表1
    getEchart53(Data,myChart3);//绘制图表1
    function getEchart51(Data,myChart1){
        var manData = [],femaleData = [],quesIndex = [];
        $.each(Data.class_rate,function (index,value) {
            manData.push(value.male_rate.toFixed(2));
            femaleData.push(value.female_rate.toFixed(2));
            quesIndex.push(value.question_index);
        })
        var option = {
            title : {
                text: "全班性别对比分析" ,
                subtext: '对比本班级，全校，全区的性别差异'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['男生情况','女生情况']
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
                    data : quesIndex//x轴坐标项
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
                    name:'男生情况',
                    type:'bar',
                    data:manData,
                    itemStyle:{
                        normal:{color:'#ff7f50'}
                    },
                    smooth:true,  //这句就是让曲线变平滑的
                },
                {
                    name:'女生情况',
                    type:'bar',
                    data:femaleData,
                    itemStyle:{
                        normal:{color:'#87cefa'}
                    },
                    smooth:true,  //这句就是让曲线变平滑的

                }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
    }
    function getEchart52(Data,myChart2){
        var manData = [],femaleData = [],quesIndex = [];
        $.each(Data.school_rate,function (index,value) {
            manData.push(value.male_rate.toFixed(2));
            femaleData.push(value.female_rate.toFixed(2));
            quesIndex.push(value.question_index);
        });
        var option = {
            title : {
                text: "全校性别对比分析" ,
                subtext: '对比本班级，全校，全区的性别差异'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['男生情况','女生情况']
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
                    data : quesIndex//x轴坐标项
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
                    name:'男生情况',
                    type:'bar',
                    data:manData,
                    itemStyle:{
                        normal:{color:'#ff7f50'}
                    },
                    smooth:true,  //这句就是让曲线变平滑的
                },
                {
                    name:'女生情况',
                    type:'bar',
                    data:femaleData,
                    itemStyle:{
                        normal:{color:'#87cefa'}
                    }
                    ,smooth:true,  //这句就是让曲线变平滑的

                },
                // {
                //     name:'XX量',
                //     type:'bar',
                //     data:[2.0, 4.9, 160.0, 123.2, 125.6, 176.7, 135.6, 62.2, 32.6, 20.0, 6.4, 3.3],
                //     itemStyle:{
                //         normal:{color:'#6495ed'}
                //     }
                // }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option);
    }
    function getEchart53(Data,myChart3){
        var manData = [],femaleData = [],quesIndex = [];
        $.each(Data.qu_rate,function (index,value) {
            manData.push(value.male_rate.toFixed(2));
            femaleData.push(value.female_rate.toFixed(2));
            quesIndex.push(value.question_index);
        })
        var option = {
            title : {
                text: "全区性别对比分析" ,
                subtext: '对比本班级，全校，全区的性别差异'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['男生情况','女生情况']
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
                    data : quesIndex//x轴坐标项
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
                    name:'男生情况',
                    type:'bar',
                    data:manData,
                    itemStyle:{
                        normal:{color:'#ff7f50'}
                    },
                    smooth:true,  //这句就是让曲线变平滑的
                },
                {
                    name:'女生情况',
                    type:'bar',
                    data:femaleData,
                    itemStyle:{
                        normal:{color:'#87cefa'}
                    },
                    smooth:true,  //这句就是让曲线变平滑的

                },
                // {
                //     name:'XX量',
                //     type:'bar',
                //     data:[2.0, 4.9, 160.0, 123.2, 125.6, 176.7, 135.6, 62.2, 32.6, 20.0, 6.4, 3.3],
                //     itemStyle:{
                //         normal:{color:'#6495ed'}
                //     }
                // }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart3.setOption(option);
    }
}
