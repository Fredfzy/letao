/**
 * Created by asus on 2017/11/3.
 */
//$(function(){
//  mui(".mui-scroll-wrapper").scroll({
//    indicators:false
//  });
//  //思路：
//  //1. 获取地址栏的参数，设置到文本框中.
//  //2. 通过地址栏的参数，去查询商品，把商品渲染到页面中。
//  //3. 点击搜索按钮，获取搜索框中的value值，查询商品，渲染到页面.
//  //4. 点击排序，需要对商品进行排序。
//  //5. 添加一个遮罩效果
//  var currentPage=1;
//  var pageSize=10;
//  var key=tools.getParam("key");
//  $(".search_text").val(key);
//  $.ajax({
//    type:"get",
//    url:"/product/queryProduct",
//    data:{
//      page:currentPage,
//      pageSize:pageSize,
//      proName:key
//    },
//    success:function (data) {
//      setTimeout(function () {
//        $(".lt_product").html( template("tpl", data) );
//      },1000);
//    }
//  });
//
//  //点击搜索按钮，
//  $(".search_btn").on("click", function () {
//
//    //获取用户输入的内容
//    var key = $(".search_text").val().trim();
//    if (key === "") {
//      mui.toast("请输入搜索的内容");
//    }
//    $(".lt_product").html('<div class="loading"></div>');
//    $.ajax({
//      type: "get",
//      url: "/product/queryProduct",
//      data: {
//        page: currentPage,
//        pageSize: pageSize,
//        proName: key
//      },
//      success: function (data) {
//        console.log(data);
//        setTimeout(function () {
//          $(".lt_product").html(template("tpl", data));
//        }, 1000);
//      }
//    })
//  });
//})
$(function(){
  mui(".mui-scroll-wrapper").scroll({
    indicators:false
  });
  var data={
    proName:'',
    brandId:'',
    price:'',
    num:'',
    page:1,
    pageSize:10
  }
  function rend(data){
    $.ajax({
      type:"get",
      url:"/product/queryProduct",
      data:data,
      success:function(data){
        setTimeout(function(){
          $(".lt_product").html(template("tpl",data));
        },1000);
      }
    })
  }


  var key =tools.getParam("key");
  $(".search_text").val(key);
  data.proName=key;
  rend(data);

  $(".search_btn").on("click",function(){
    $(".lt_sort a").removeClass("now");
    $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
    data.price='';
    data.num='';

    var key=$(".search_text").val().trim();
    if(key===""){
      mui.toast("请输入搜索的内容");
    }
    $(".lt_product").html('<div class="loding"</div>');
    data.proName=key;
    rend(data);
  });

  //排序功能
  $(".lt_sort>a[data-type]").on("click",function(){
    var $this=$(this);
    var $span=$(this).find("span");
    if($this.hasClass("now")){
      $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else{
      $(this).addClass("now").siblings().removeClass("now");
      $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down")
    }
  //  判断是哪个排序
    var type=$this.data("type");
    var value=$span.hasClass("fa-angle-down")?2:1;
    //设置num或者price，在这之前需要保证之前的清空
    data[type]=value;
    rend(data);
  });
})