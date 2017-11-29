$(function () {


    var  $form = $('form');

    //2. 指定校验时的图标显示，默认是bootstrap风格
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },


        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }

            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    callback: {
                        message: "密码错误"
                    },
                    stringLength: {
                        min: 6,
                        max: 15,
                        message: '用户名长度必须在6到12之间'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    }
                }
            }
        }

    });

    $form.on('success.form.bv',function(e){
        //阻止默认行为
        e.preventDefault();

        // console.log("gge")
        

        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            success:function(data){
                if(data.success){
                    location.href = "index.html"
                }
                if(data.error ==1000){
                    //alert("用户名不存在");
                    //把用户名的校验失败
                    //第一个参数：想要修改的字段
                    //第二个参数：改成什么状态  INVALID  VALID
                    //第三个参数： 指定显示的错误信息

                    $form.data("bootstrapValidator").updateStatus("username", "INVALID","callback");
                }
                if(data.error == 1001){
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
            }

        });


        
    })

    // 重置错误样式
    $("[type = 'reset']").on('click',function(){
        $form.data("bootstrapValidator").resetForm();
    });


});