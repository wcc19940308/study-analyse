$(document).ready(function(){
    demo.initDashboardPageCharts();
    $.notify({
        icon: 'pe-7s-bell',
        message: "<b>欢迎进入学情分析系统</b> <br>" +
        "- Welcome to learning situation analysis system."

    },{
        type: 'warning',
        timer: 4000
    });
});