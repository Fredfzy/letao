/**
 * Created by asus on 2017/11/4.
 */
$(function(){
  mui(".mui-scroll-wrapper").scroll({
    indicators:false
  });
  var id=tools.getParam("productId");
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:id
    },
    success:function(data){
      //console.log(data);
      var num=data.size.split("-");
      var sizeArray=[];
      for(var i=num[0];i<=num[1];i++){
         sizeArray.push(i);
      }
      data.sizeArray=sizeArray;
      $(".mui-scroll").html(template("tpl",data));
      //当内容渲染完成后，需要去初始化轮播图
      //轮播图效果
      mui('.mui-slider').slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //初始化轮播图
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //初始化数字输入框
      mui('.lt_num').numbox()
    }
  });
  //尺码选择功能
  $(".mui-scroll").on("click",".size",function(){
    $(this).addClass("now").siblings().removeClass("now");
  });


  //添加购物车功能
  $(".btn_add_cart").on("click",function(){
    //获取数据
    var size=$(".size.now").html();
    var num=$(".mui-numbox-input").val();
    if(!size){
      mui.toast("请选择尺码");
      return;
    }
    $.ajax({
      type:"post",
      url:"/cart/addCart",
      data:{
        productId:id,
        num:num,
        size:size
      },
      success:function(data){
        if(data.success){
          mui.toast("添加成功");
        }
        if(data.error===400){
          //console.log(location.href);
          location.href="login.html?retUrl="+location.href;
        }
      }
    });
  });
})