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
        console.log(data);
        var html = template("tpl2", data);
        $('.dropdown-menu').html(html);
      }
    })
  })
  //一级分类下拉列表框,点击选中
  $('.dropdown-menu').on("click",function(){

  })
});

