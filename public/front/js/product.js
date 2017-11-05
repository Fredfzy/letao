/**
 * Created by HUCC on 2017/11/2.
 */
$(function () {

  mui(".mui-scroll-wrapper").scroll({
    indicators:false
  })



  //首先，获取到id
  var id = tools.getParam("productId");
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:id
    },
    success:function (data) {
      console.log(data);
      var temp = data.size.split("-");
      var sizeArray = [];
      for(var i = temp[0]; i <= temp[1]; i++){
        sizeArray.push(i);
      }

      data.sizeArray = sizeArray;

      $(".mui-scroll").html( template("tpl", data) );


      mui(".mui-numbox").numbox();
    }
  });

})