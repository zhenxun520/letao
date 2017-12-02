$(function () {

  var page = 1;
  var pageSize = 5;
  var imgs = [];

  function rander() {

    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
        $('tbody').html(template("tpl", data));

        // 渲染分页
        $("#pagination").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(data.total / data.size),
          itemTexts: function (type,  page,  current) {
            //type: 如果是具体的页码，类型是page
            //如果是首页，type：first
            //上一页：type:prev
            //下一页:type:next
            //尾页：last

            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页"
              default:
                return page;
            }
          },

          tooltipTitles: function (type,  page,  current) {

            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页"
              default:
                return page;
            }
           
          },

          onPageClicked: function (a, b, c, p) {
            page = p;
            rander();


          }
        });

      }
    });

  }

  rander();

  $(".btn-add").on("click",function(){
      $("#motelproduct").modal("show");

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page:1,
        pageSize:100,
      },
      success:function(data){
        // console.log(data);
        $(".dropdown-menu").html(template("second-tpl",data));
      }
    });

  });

  $(".dropdown-menu").on("click","a",function(){
      
    $(".dropdown-text").text($(this).text());

    $("[name = brandId]").val($(this).data("id"));

    // 手动成攻
    $form.data('bootstrapValidator').updateStatus("brandId","VALID");

  });


      var $form = $("form");

      $form.bootstrapValidator({
        excluded: [],
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
          //校验用户名，对应name表单的name属性
          brandId: {
            validators: {
              notEmpty: {
                message: '请选择品牌'
              }
            }
          },
          proName: {
            validators: {
              notEmpty: {
                message: '请输入商品的的名称'
              }
            }
          },
          proName: {
            validators: {
              notEmpty: {
                message: '请输入商品描述'
              }
            }
          },
          proDesc: {
            validators: {
              notEmpty: {
                message: '请输入商品描述'
              }
            }
          },
          num: {
            validators: {
              notEmpty: {
                message: '请输入商品的库存'
              },
              regexp: {
                regexp: /^[1-9]\d*$/,
                message: '请输入一个不是零开头的'
              }
            }
          },
          size: {
            validators: {
              notEmpty: {
                message: '请输入商品的尺码'
              },
              regexp: {
                regexp: /^\d{2}-\d{2}$/,
                message: '请输入一个不是零开头的'
              }
            }
          },
          oldPrice: {
            validators: {
              notEmpty: {
                message: '请输入商品的原价'
              },
              regexp: {
                regexp: /^[1-9]\d*$/,
                message: '请输入1-9的数字'
              }
            }
          },
          price: {
            validators: {
              notEmpty: {
                message: '请输入商品描述'
              },
              regexp: {
                regexp: /^[1-9]\d*$/,
                message: '请输入1-9的数字'
              }
            }
          },
          productLogo: {
            validators: {
              notEmpty: {
                message: '请上传三张图片'
              }
            }
          }

        }
      });

      // 图片上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      if(imgs.length ===3){
        return false;
      };
      $(".img-box").append('<img src="' + data.result.picAddr+'" width="100" height="100">');

      // 用验证
      imgs.push(data.result);
      // console.log(imgs)
      if(imgs.length ===3){
        $form.data('bootstrapValidator').updateStatus("productLogo", "VALID");
      }else{
        $form.data('bootstrapValidator').updateStatus("productLogo", "INVALID");
      }



    }
  });






    $form.on('success.form.bv', function (e) {
      e.preventDefault();

      var parma = $form.serialize();
      parma+="&picName1"+imgs[0].picName+"&picAddr1="+imgs[0].picAddr;
      parma+="&picName2"+imgs[1].picName+"&picAddr2="+imgs[1].picAddr;
      parma+="&picName3"+imgs[2].picName+"&picAddr3="+imgs[2].picAddr;


      $.ajax({
        type:"post",
        url:"/product/addProduct",
        data:parma,
        success:function(data){
          if(data.success){
            $("#motelproduct").modal("hide");

            page = 1;
            rander();

            $form.data('bootstrapValidator').resetForm();
            $("[type = hidden]").val("");
            $form[0].reset();
            $(".dropdown-text").text("请选择品牌");
            $(".img-box img").remove();
            imgs = [];

          }
        }
      })
      


    });

 






});