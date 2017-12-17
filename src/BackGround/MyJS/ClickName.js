function getNameList(class_id,paper_id,myChart1,myChart2,myChart3) {
    var nameList = document.getElementById("nameList");
    //获取名单信息
    $.ajax({
        type :"GET",
        url :"http://localhost:3003/all_student_mysql/",
        data : {
            class_id : class_id
        },
        dataType: 'jsonp',
        jsonp:"callback",
        jsonpCallback:"callback",
        success :function(data){
            //生成名单按钮
            $.each(data,function (index,value) {
                var nameLi = document.createElement("li");
                var nameA = document.createElement("a");
                //参数
                var stuID = value.student_id;
                nameA.innerHTML = value.student_name;
                nameA.setAttribute("class","MyFont2");
                nameA.href = "javascript:void(0);"
                nameA.onclick = function () {//第二页的点击事件
                    // alert(" "+school_id+" "+class_num+" "+class_course_id);
                    myChart1.clear();
                    myChart2.clear();
                    myChart3.clear();
                    OnClickName(stuID,paper_id,class_id,myChart1,myChart2);//传入四个参数。
                };
                nameLi.setAttribute("class","list-group-item");
                nameLi.appendChild(nameA);
                nameList.appendChild(nameLi);
            })
        }
    });

}
function OnClickName(stuID,paperID,classID,myChart1,myChart2) {
    //stuID,paperID,classID,
    // console.log(typeof stuID)
    $.ajax({
        type :"GET",
        url :"http://localhost:3003/studentanalyse_mysql/",
        data : {

            class_id : classID,
            paper_id : paperID,
            student_id : stuID

        },
        dataType: 'jsonp',
        jsonp:"callback",
        jsonpCallback:"callback",
        success :function(data){
            // alert(JSON.stringify(data))
            getEchart91(data,myChart1)//把这两个函数放进ajax中
            getEchart92(data,myChart2)//把这两个函数放进ajax中
        }

    });


//生成个人图标的函数
    function getEchart91(Data,myChart1){
        var kpName = [],degreeData = []; //城市，乡村，题号
        $.each(Data.array,function (index,value) {
            kpName.push(value.kp_name);
            degreeData.push(value.degree.toFixed(2));
        })
        // var myChart = echarts.init(document.getElementById('main5'));
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
                    data: degreeData,
                    smooth:true,  //这句就是让曲线变平滑的
                }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option);
    }
    function getEchart92(Data,myChart2){
        var question_type = [],degreeData = []; //城市，乡村，题号
        var R_data = [];//雷达图数据
        $.each(Data.caculate_type_array,function (index,value) {
            question_type.push(value.question_type);
            degreeData.push(value.degree.toFixed(2));
            var JSONtemp = {}
            JSONtemp.name = value.question_type;
            JSONtemp.max = 100;
            R_data.push(JSONtemp);
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
                            myChart2.clear();
                            myChart2.setOption(Roption,true);
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
                    data: degreeData,
                    smooth:true,  //这句就是让曲线变平滑的
                }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        var Roption = { //雷达图参数
            title: {
                text: '各题型掌握程度雷达图'
            },
            tooltip: {},

            toolbox: {
                show : true,
                feature : {
                    myTool : {
                        show : true,
                        title : '切换为柱状图',
                        icon : 'image://http://echarts.baidu.com/images/favicon.png',
                        onclick : function (){
                            myChart2.clear();
                            myChart2.setOption(option,true);
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
                indicator:R_data
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
                        value : degreeData,
                        name : '各题型掌握程度（%）'
                    }
                ]
            }]
        };
        myChart2.setOption(option);
    }
}

var chartData = {
    "student_id": "20130501101002",
    "array": [
        {
            "degree": 0,
            "kp_name": "求小数的近似数"
        },
        {
            "degree": 50,
            "kp_name": "乘法结合律"
        },
        {
            "degree": 50,
            "kp_name": "乘除混合的简便运算"
        },
        {
            "degree": 100,
            "kp_name": "三角形的内角和为180度"
        },
        {
            "degree": 100,
            "kp_name": "乘法分配律"
        },
        {
            "degree": 100,
            "kp_name": "加减混合的简便运算"
        },
        {
            "degree": 100,
            "kp_name": "加法结合律"
        },
        {
            "degree": 100,
            "kp_name": "小数的比较大小"
        },
        {
            "degree": 100,
            "kp_name": "小数点的移动"
        },
        {
            "degree": 100,
            "kp_name": "单位换算"
        },
        {
            "degree": 100,
            "kp_name": "四则运算"
        },
        {
            "degree": 100,
            "kp_name": "加法交换律"
        },
        {
            "degree": 100,
            "kp_name": "小数的加减法"
        },
        {
            "degree": 100,
            "kp_name": "亿以内的数的读法"
        },
        {
            "degree": 100,
            "kp_name": "亿以内的数的写法"
        },
        {
            "degree": 100,
            "kp_name": "用四舍五入法保留近似数的方法"
        },
        {
            "degree": 100,
            "kp_name": "平行线的画法"
        },
        {
            "degree": 100,
            "kp_name": " 相交与垂直的概念"
        },
        {
            "degree": 100,
            "kp_name": "过直线上一点画垂线的方法"
        },
        {
            "degree": 100,
            "kp_name": "角的概念"
        },
        {
            "degree": 100,
            "kp_name": "认识平角、周角"
        },
        {
            "degree": 100,
            "kp_name": "用量角器画指定度数的角的方法"
        },
        {
            "degree": 100,
            "kp_name": "角的度量"
        }
    ],
    "caculate_type_array": [
        {
            "question_type": "计算题",
            "degree": 88.24
        },
        {
            "question_type": "概念题",
            "degree": 90
        },
        {
            "question_type": "画图题",
            "degree": 100
        },
        {
            "question_type": "应用题",
            "degree": 100
        }
    ]
}