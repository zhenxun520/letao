$(function(){

      var currentPage = 1;
      var pageSize = 5;
      function render(){
        $.ajax({
          type:"get",
          url: "/user/queryUser",
          data:{
            page: currentPage,
            pageSize:pageSize
          },
          success:function(data){
             console.log(data);
            //  渲染数据
            $('tbody').html(template("users", data));

            // 渲染分页
            $('#pagination').bootstrapPaginator({
              // bootsstrap版本当前版本是的3代默认是2代
                 bootstrapMajorVersion: 3,
               
                 currentPage: currentPage, //  当前页
                 totalPages: Math.ceil(data.total/data.size),
                 numberOfPages:5,

                 onPageClicked: function (a, b, c, page) {
                     currentPage = page ;
                     render();
                 }

            });




          }


        })


      }
      render();


      $("tbody").on("click",".btn",function(){
          $('#modaluser').modal("show");

          var id = $(this).parent().data("id");
          var isDelete = $(this).hasClass('btn-danger')? 0 : 1;
          
          $('.btn-confirm').off().on("click",function(){

            $.ajax({
              type:"post",
              url: "/user/updateUser",
              data:{
                id:id,
                isDelete:isDelete
              },
              success:function(data){
                 if(data.success){
                   $('#modaluser').modal("hide");
                  //  重新渲染
                   render();
                 }
              }

            })
          })


      })


});