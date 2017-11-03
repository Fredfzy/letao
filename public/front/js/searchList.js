/**
 * Created by HUCC on 2017/11/2.
 */
$(function () {
  mui(".mui-scroll-wrapper").scroll({
    indicators: false
  });


  //思路：
  //1. 获取地址栏的参数，设置到文本框中.
  //2. 通过地址栏的参数，去查询商品，把商品渲染到页面中。
  //3. 点击搜索按钮，获取搜索框中的value值，查询商品，渲染到页面.
  //4. 点击排序，需要对商品进行排序。
  //5. 添加一个遮罩效果


  var currentPage = 1;
  var pageSize = 10;
  var key = tools.getParam("key");
  $(".search_text").val(key);

  //需要发送ajax请求，去后端获取数据  page pageSize proName
  $.ajax({
    type:"get",
    url:"/product/queryProduct",
    data:{
      page:currentPage,
      pageSize:pageSize,
      proName:key
    },
    success:function (data) {
      setTimeout(function () {
        $(".lt_product").html( template("tpl", data) );
      },1000);


    }
  });




  //点击搜索按钮，
  $(".search_btn").on("click", function () {

    //获取用户输入的内容
    var key = $(".search_text").val().trim();
    if(key === ""){
      mui.toast("请输入搜索的内容");
    }
    $(".lt_product").html('<div class="loading"></div>');
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data:{
        page:currentPage,
        pageSize:pageSize,
        proName:key
      },
      success:function (data) {
        console.log(data);
        setTimeout(function () {
          $(".lt_product").html( template("tpl", data) );
        },1000);


      }
    });

  });





});