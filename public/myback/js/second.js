/**
 * Created by asus on 2017/10/31.
 */
$(function() {
  var currentPage = 1;
  var pageSize = 2;
  function rend() {
    $.ajax({
      type: "get",
      url: " /category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        //console.log(data);
        var html = template("tpl", data);
        $('tbody').html(html);
        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage,//当前页
          totalPages: Math.ceil(data.total / pageSize),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            rend();
          }
        });
      }
    });
  }
  rend();

  //显示二级管理分类模态框
  $(".btn_add").on("click",function(){
    $("#addModal1").modal("show");
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
       page:1,
       pageSize:100
      },
      success:function(data){
        //console.log(data);
        var html = template("tpl2", data);
        $('.dropdown-menu').html(html);
      }
    })
  });
  //一级分类下拉列表框,点击选中
  $('.dropdown-menu').on("click","a",function(){
    //获取a标签的内容
    $(".dropdown-text").text($(this).text());
    $("#categoryId").val($(this).data("id"));
    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });
  //初始文件上传
  $("#fileupload").fileupload({
    dataType:"json",
    //当文件上传成功时，会执行这个回调函数
    done:function (e, data) {
      //获取文件上传结果
      //给默认图片设置src
      $(".img_box img").attr("src", data.result.picAddr);
      $("#brandLogo").val( data.result.picAddr );
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  //表单校验
  var $form=$('#form');
  //console.log($form);
  $form.bootstrapValidator({
    //默认不校验的配置
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入二级分类的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      }
    }
  });

  $form.on("success.form.bv", function (e) {
    e.preventDefault();
    
    })
  $(".btn_addmodal1").on("click",function(){
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$form.serialize(),
      success:function (data) {
        console.log(data);
        if(data.success){

          //成功的操作
          //1. 关闭模态框
          $("#addModal1").modal("hide");
          //2. 渲染第一页
          currentPage = 1;
          rend();
          //3. 重置表单
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
          //手动把dropdown重置，把图片的地址重置
          $(".dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src", "images/none.png");
        }
      }
    });
  })
});

//serialize()serialize() 方法通过序列化表单值，创建 URL 编码文本字符串。
//您可以选择一个或多个表单元素（比如 input 及/或 文本框），或者 form 元素本身。
//序列化的值可在生成 AJAX 请求时用于 URL 查询字符串中。
//注释：只会将”成功的控件“序列化为字符串。如果不使用按钮来提交表单，则不对提交按钮的值序列化。如果要表单元素的值包含到序列字符串中，元素必须使用 name 属性。