$(function () {
      var currentPage = 1;
      var pageSize = 5;

      function rander() {
        $.ajax({
          type: "get",
          url: "/category/queryTopCategoryPaging",
          data: {
            page: currentPage,
            pageSize: pageSize
          },
          success: function (data) {
            console.log(data);
            $('tbody').html(template("tpl", data));


            //渲染分页
            $('#pagination').bootstrapPaginator({
              bootstrapMajorVersion: 3,
              currentPage: currentPage,
              totalPages: Math.ceil(data.total / data.size),
              numberOfPages: 5,
              onPageClicked: function (a, b, c, page) {
                currentPage = page;
                rander();
              }

            });
          }


        });
      }

      rander();


      // 添加分类
      $('.btn-add').on("click", function () {
        $("#motelfrist").modal("show");

      });

      var $form = $("form");
      $form.bootstrapValidator({
          // 小图标
          feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          //3. 指定校验字段
          fields: {
            //校验用户名，对应name表单的name属性
            categoryName:{
              validators:{
                  notEmpty:{
                    message: '一级分类不能为空哦'
                  },
                  //长度校验
                  stringLength: {
                    min: 2,
                    max: 10,
                    message: '用户名长度必须在2到10之间'
                  }
              }
            }
          }

          });


     $form.on('success.form.bv',function(e){
      //阻止默认实践
       e.preventDefault();

       $.ajax({
         type:"post",
         url:"/category/addTopCategory",
         data: $form.serialize(),
         success:function(data){
           if(data.success){

             $("#motelfrist").modal("hide");
             page = 1;
             rander();

            //  清空样式
             $form.data("bootstrapValidator").resetForm();
            //  转成dom对象用dom方法清空val样式
             $form[0].reset();

           }
         }
       })




     })







      });