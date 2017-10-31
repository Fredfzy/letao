/**
 * Created by asus on 2017/10/31.
 */
$(function(){
  var currentPage=1;
  var pageSize=5;
  $.ajax({
    type:"get",
    url:"/user/queryUser",
    data:{
      pageSize:pageSize,
      currentPage:currentPage
    },
    success:function(data){
      console.log(data);
    }
  })
})
