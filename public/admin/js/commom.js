NProgress.configure({
    // 关闭进度环
     showSpinner: false 
    });

$(document).ajaxStart(function () {
    //开始进度条
    NProgress.start();
});

$(document).ajaxStop(function () {
    //结束进度条
    setTimeout(function () {
        NProgress.done();
    }, 500);
});



// 二级菜单
$(".fenlei").on('click',function(){
    $(this).next().slideToggle();
    
});

// 显示隐藏侧边栏
$('.icon_menu').on('click',function(){
    $('.lt-aside').toggleClass('now');
    $('.lt-main').toggleClass('now');
});


$('.icon_logout').on('click',function(){
    $('#motel').modal("show");


  //因为jquery注册事件不会覆盖。
  //off()解绑所有的事件
  //off("click")
    $('.btn-logout').off().on('click',function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function(data){
                if(data.success){
                    location.href = "login.html";
                }
            }
        })
    })



});








