/**
 * Created by asus on 2017/11/3.
 */
mui(".mui-scroll-wrapper").scroll({
  indicators: false
});
//思路：
//1. 输入关键字，点击按钮，跳转到搜索列表页。
//2. 需要把关键字保存到web缓存中（cookie sessionStorage localStorage）
// 2.1 要求：最多存10条
// 2.2 如果超过了10条，需要删除最早的那条
// 2.3 如果发现搜索记录是重复，需要把该条搜索记录放到最上面。

//2. 点击清空按钮吗，需要把搜索记录对应的缓存清除。
//3. 点击删除的时候，需要删除单条记录
//4. 点击单条记录，可以直接跳转到对应的搜索详情页。
function getHistory(){
  var search_history=localStorage.getItem("lt_search_history")||"[]";
//将json对象的字符串转换成数组
  var arr=JSON.parse(search_history);
  return arr;
}
function rend(){
  var arr=getHistory();
  $('.lt_history').html(template("tpl",{arr:arr}))
}
rend();
//清空功能
$('.lt_history').on("click","icon_empty",function(){
  localStorage.remove(".lt_search_history");
  rend();
})
//删除功能
$(".lt_history").on("click",".fa-close",function(){
  var btnArray=["是","否"];
  mui.confirm("你确定删除这条记录吗","警告",btnArray,function(data){
    if(data.index==0){
      var arr=getHistory();
      var index=$(this).data("index");
      arr.splice(index,1);
      localStorage.setItem("lt_search_history",JSON.stringify(arr));
      rend();
      mui.toast("操作成功");
    }
    else{
      mui.toast("操作失败");
    }
  })
})
//添加功能
$(".search_btn").on("click",function(){
  var key=$(".search_text").val().trim();
  if(key===""){
    mui.alert("亲，你想买啥","温馨提示")
    return;
  }
  var arr=getHistory();
  //获取key在arr中的索引,如果索引是-1，说明没有
  var index=arr.indexOf(key);
  if(index>-1){
    arr.splice(index,1);
  }
  if(index>=10){
    arr.pop();
  }
  arr.unshift(key);
  //存储到缓存里
  localStorage.setItem("lt_search_history",JSON.stringify(arr));
  //rend();
  location.href = "searchList.html?key="+key;
})