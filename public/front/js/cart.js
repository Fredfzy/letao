/**
 * Created by HUCC on 2017/11/4.
 */
$(function () {

  mui(".mui-scroll-wrapper").scroll({
    indicators:false
  });



  //渲染购物车功能
  $.ajax({
    type:"get",
    url:"/cart/queryCart",
    success:function (data) {
      tools.checkLogin(data);

      //渲染购物车
      console.log(data);
      $("#OA_task_2").html( template("tpl", {data:data}) );
    }
  });



});