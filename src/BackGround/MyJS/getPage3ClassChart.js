// 基于准备好的dom，初始化echarts实例
function getClassChart(Data,myChart1,myChart2) {
    getEchart71(Data,myChart1)
    getEchart72(Data,myChart2)
//-------------------------------知识点图表
    function getEchart71(Data,myChart1){
        var kpName = [],DegreeData = [] //城市，乡村，题号
        $.each(Data.array,function (index,value) {
            kpName.push(value.kp_name);
            DegreeData.push(value.degree.toFixed(2));
        })
        var option = {
            color: ['#3398DB'],
            title : {
                text: '各知识点掌握程度图',
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
                    data : kpName,
                    axisTick: {
                        alignWithLabel: true
                    },
                    name : '知识点',
                    axisLabel: {
                        interval:0,//横轴信息全部显示
                        // rotate:90,//60度角倾斜显示
                        formatter:function(val){
                            return val.split("").join("\n"); //横轴信息文字竖直显示
                        },
                        textStyle:
                            {fontSize:16}
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '百分百'
                }
            ],
            series : [
                {
                    name:'知识点掌握程度',
                    type:'bar',
                    barWidth: '60%',
                    itemStyle :
                        {
                            normal:
                                {
                                    label : {show: false, position: 'top'}
                                }
                        },
                    data: DegreeData,
                    smooth:true,  //这句就是让曲线变平滑的
                }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
    }
///////////////题型分析图表
    function getEchart72(Data,myChart2){
        var question_type = [],DegreeData = []; //题目类型，数据
        var Rdata = [];
        $.each(Data.caculate_type_array,function (index,value) {
            question_type.push(value.question_type);
            DegreeData.push(value.degree.toFixed(2));
            var JSONtemp = {}
            JSONtemp.name = value.question_type;
            JSONtemp.max = 100;
            Rdata.push(JSONtemp);
        })
        var option = { //柱状图参数
            color: ['#3398DB'],
            title : {
                text: '各题型掌握程度图',
                // subtext: '按不同分数段，对学生进行区分'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }    },
            toolbox: {
                show : true,
                feature : {
                    myTool : {
                        show : true,
                        title : '切换为雷达图',
                        icon : 'image://http://echarts.baidu.com/images/favicon.png',
                        onclick : function (){
                            myChart.clear();
                            myChart.setOption(Roption,true);
                        }
                    },
                    mark : {show: true},
                    saveAsImage : {show: true},

                }
            },
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
                    data : question_type,
                    axisTick: {
                        alignWithLabel: true
                    },
                    name : '题型',
                    axisLabel: {
                        interval:0,//横轴信息全部显示
                        // rotate:90,//60度角倾斜显示
                        formatter:function(val){
                            return val.split("").join("\n"); //横轴信息文字竖直显示
                        },
                        // 调整x轴的lable
                        textStyle:
                            {fontSize:16}
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '百分比（%）'
                }
            ],
            series : [
                {
                    name:'各题型掌握程度',
                    type:'bar',
                    barWidth: '60%',
                    itemStyle :
                        {
                            normal:
                                {
                                    label : {show: true, position: 'top'},
                                    color:'#ff7f50'
                                }
                        },
                    data: DegreeData,
                    smooth:true,  //这句就是让曲线变平滑的
                }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        var Roption = { //雷达图参数
            title: {
                text: '题型掌握程度雷达图'
            },
            tooltip: {},
            legend: {
                data: ['各题型掌握程度（%）']
            },
            toolbox: {
                show : true,
                feature : {
                    myTool : {
                        show : true,
                        title : '切换为柱状图',
                        icon : 'image://http://echarts.baidu.com/images/favicon.png',
                        onclick : function (){
                            myChart.clear();
                            myChart.setOption(option,true);
                        }
                    },
                    mark : {show: true},
                    saveAsImage : {show: true},

                }
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator:Rdata
                //     [
                //     { name: '销售（sales）', max: 100},
                //     { name: '管理（Administration）', max: 100},
                //     { name: '信息技术（Information Techology）', max: 100},
                //     { name: '客服（Customer Support）', max: 100},
                //     { name: '研发（Development）', max: 100},
                //     { name: '市场（Marketing）', max: 100}
                // ]
            },
            series: [{
                name: '题型掌握程度',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : DegreeData,
                        name : '各题型掌握程度（%）'
                    }
                ]
            }]
        };
        myChart2.setOption(option);
    }
}

