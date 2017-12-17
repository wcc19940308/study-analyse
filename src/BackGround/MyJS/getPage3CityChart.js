// 基于准备好的dom，初始化echarts实例
function getCityChart(Data,myChart1,myChart2,myChart3) {
    getEchart61(Data,myChart1)
    getEchart62(Data,myChart2)
    getEchart63(Data,myChart3)
//-------------------------------第二张图表
    function getEchart61(Data,myChart1){
        var cityData = [],countryData = [],quesIndex = []; //城市，乡村，题号
        $.each(Data.class_rate,function (index,value) {
            cityData.push(value.city_rate.toFixed(2));
            countryData.push(value.country_rate.toFixed(2));
            quesIndex.push(value.question_index);
        })
        // if(class_country_num==0)
        //     class_country = null;
        // else
        //     class_country = Data.class_rate.country;
        // if(school_country_num==0)
        //     school_country = null;
        // else
        //     school_country = Data.school_rate.country;
        //
        // if(all_country_num == 0){
        //     all_country = null;
        // } else
        //     all_country = Data.all_rate.country;
        var option = {
            title : {
                text: "全班性别对比分析" ,
                subtext: '对比本班级，全校，全区的性别差异'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['城市比例','农村比例']
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
                    name:'城市比例',
                    type:'bar',
                    data:cityData,
                    itemStyle:{
                        normal:{color:'#ff7f50'}
                    },
                    smooth:true,  //这句就是让曲线变平滑的
                },
                {
                    name:'农村比例',
                    type:'bar',
                    data:countryData,
                    itemStyle:{
                        normal:{color:'#87cefa'}
                    }
                    ,smooth:true,  //这句就是让曲线变平滑的

                }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
    }
    function getEchart62(Data,myChart2){
        var cityData = [],countryData = [],quesIndex = []; //城市，乡村，题号
        $.each(Data.school_rate,function (index,value) {
            cityData.push(value.city_rate.toFixed(2));
            countryData.push(value.country_rate.toFixed(2));
            quesIndex.push(value.question_index);
        })
        var option = {
            title : {
                text: "全校性别对比分析" ,
                subtext: '对比本班级，全校，全区的性别差异'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['城市比例','农村比例']
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
                    name:'城市比例',
                    type:'bar',
                    data:cityData,
                    itemStyle:{
                        normal:{color:'#ff7f50'}
                    },
                    smooth:true,  //这句就是让曲线变平滑的
                },
                {
                    name:'农村比例',
                    type:'bar',
                    data:countryData,
                    itemStyle:{
                        normal:{color:'#87cefa'}
                    }
                    ,smooth:true,  //这句就是让曲线变平滑的

                }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option);
    }
    function getEchart63(Data,myChart3){
        var cityData = [],countryData = [],quesIndex = []; //城市，乡村，题号
        $.each(Data.qu_rate,function (index,value) {
            cityData.push(value.city_rate.toFixed(2));
            countryData.push(value.country_rate.toFixed(2));
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
                data:['城市比例','农村比例']
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
                    name:'城市比例',
                    type:'bar',
                    data:cityData,
                    itemStyle:{
                        normal:{color:'#ff7f50'}
                    },
                    smooth:true,  //这句就是让曲线变平滑的
                },
                {
                    name:'农村比例',
                    type:'bar',
                    data:countryData,
                    itemStyle:{
                        normal:{color:'#87cefa'}
                    }
                    ,smooth:true,  //这句就是让曲线变平滑的

                }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart3.setOption(option);
    }
}

