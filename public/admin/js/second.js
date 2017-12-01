$(function(){

  var currentPage = 1;
  var pageSize = 5;


    function rander(){

    
      $.ajax({
        type:"get",
        url: "/category/querySecondCategoryPaging",
        data:{
              page: currentPage,
              pageSize:pageSize
        },
        success:function(data){
          // console.log(data);
          $('tbody').html(template("tpl",data));


          // 渲染分页

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


      })
  }
  rander();


  // 点击按钮显示模态框

  $(".btn-add").on('click',function(){
    
    $("#motelsecond").modal("show");

    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
          page:1,
          pageSize:1000
        },
        success:function(data){
          // console.log(data);
          $(".dropdown-menu").html(template("frist-tpl",data));
        }

    });


  });


  // 把后台的数据给隐藏域
  $(".dropdown-menu").on("click","a",function(){

    //5.1 获取当前a的内容，设置给dropdown-text
    $(".dropdown-text").text($(this).text());
     //5.2 获取到当前a的id，设置给 categoryId
    $("[name = categoryId]").val($(this).data("id"));

    $form.data('bootstrapValidator').updateStatus("categoryId", "VALID");

  });


  // 图片预览上传公能
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);

      // 把获取的地址给图片
      $(".img-box img").attr("src",data.result.picAddr);
      // 把获取的地址给input影藏域用于上传
      $("[name= brandLogo]").val(data.result.picAddr);

      $form.data('bootstrapValidator').updateStatus("brandLogo","VALID");

    }
  });

    var $form = $("form")
    $form.bootstrapValidator({

      excluded: [],

      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },

      fields: {
        //校验用户名，对应name表单的name属性
        categoryId: {
          validators: {
            notEmpty: {
              message: '用户名不能为空'
            }
          }
        },

        brandName: {
          validators: {
            notEmpty: {
              message: '用户名不能为空'
            }
          }
        },

        brandLogo: {
          validators: {
            notEmpty: {
              message: '请上传一张图片'
            }
          }
        }

      }
          });


  $form.on('success.form.bv', function (e) {
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function(data){
        // console.log(data);
        if(data.success){
          
          $("#motelsecond").modal("hide");
          page = 1;
          rander();

          // 重置验证的样式
          $form.data('bootstrapValidator').resetForm();
          $form[0].reset();
          $("[type = hidden]").val("");

          $(".dropdown-text").text("请选择一级分类");
          $(".img-box img").attr("src","./images/none.png");


        }

      }

    });
    //使用ajax提交逻辑
  });






  });













