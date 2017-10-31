/**
 * Created by asus on 2017/10/31.
 */
$(function(){
  var currentPage=1;
  var pageSize=2;
  function rend(){
    $.ajax({
      type:"get",
      url:" /category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(data){
        var html=template("tpl",data);
        $('tbody').html(html);
        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(data.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            rend();
          }
        });
      }
    });
  }
  rend();

//一级管理添加分类模态框
  $(".btn_add").on("click",function(){
    $("#addModal1").modal("show");
  })

//表单校验
  var $form = $("#form");
  $form.bootstrapValidator({

    //校验时使用的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //配置校验规则
    fields:{
      //配置所有的字段的规则,对应表单中的name属性
      categoryName:{
        validators:{
          notEmpty:{
            message:"一级分类不能为空"
          }
        }
      }
    }
  });

  //2. 给表单注册一个校验成功的事件
  $form.on("success.form.bv", function (e) {
    //当校验成功的时候执行
    e.preventDefault();
  });





  $('.btn_addmodal1').on("click",function(){
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      success:function(data){
        if(data.success){
          $("#addModel1").modal("hide");
          currentPage=1;
          rend();
          $form.data("bootstrapValidator").resetForm();
          $form[0].reset();
        }
      }
    })
  })
})