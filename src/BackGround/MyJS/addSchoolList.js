

$(document).ready(function(){
        $.ajax(
            {
                type:'GET',
                url : 'http://localhost:3003/getLoginSchool_mysql',
                dataType : 'jsonp',
                jsonp:"jsoncallback",
                jsonpCallback:"callback",
                success  : function(data) {
                    // JSON.stringify()
                    $.each(data,function(index,value){
                        //alert(JSON.stringify(data));
                        //console.log(index+"..."+JSON.stringify(value))
                        $("#schoolList").append("<option value='" + value.school_id + "'>" + value.school_name + "</option>");
                    });
//                            }

                },
                error : function() {
                    alert('获取学校列表失败');
                }
            }
        );
});

// $(document).ready(function(){
// schoolinfo=[{"_id":"59e4a276ea0c0438c846902f","school":"school0001","school_name":"辅成小学南校区"},{"_id":"59e4a276ea0c0438c8469030","school":"school0002","school_name":"辅成教育集团北校区穆湖部"},{"_id":"59e4a276ea0c0438c8469031","school":"school0003","school_name":"嘉兴南湖国际实验学校"},{"_id":"59e4a276ea0c0438c8469032","school":"school0004","school_name":"北京师范大学南湖附属学校（小学部）"},{"_id":"59e4a276ea0c0438c8469033","school":"school0005","school_name":"东北师范大学南湖实验学校(小学)"}]
// $.each(schoolinfo,function(index,value){
//     // alert(index+"..."+value.school_name);
//     console.log(index+"..."+JSON.stringify(value))
//     $("#schoolList").append("<option value='" + value.school + "'>" + value.school_name + "</option>");
// });
// });