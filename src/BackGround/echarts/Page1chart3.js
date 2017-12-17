// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main3'));

// 指定图表的配置项和数据
var a = 100;
var option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        // right: '4%',
        bottom: '3%',
        containLabel: true,
        x: 80,
        y: 60,
        x2: 80,
        y2: 60,
    },
    xAxis : [
        {
            type : 'category',
            data : ['60分以下', '60-75分', '75-90分', '90分以上'],
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
            data:[10, 52, a,220]
        }
    ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);