/**
 * Created by asus on 2017/11/1.
 */
//  var search=location.search;
//  console.log(search);
//  var search=search.slice(1);
//  console.log(search);
//  var arr=search.split("&");
//  console.log(arr);
//  for(var i=0;i<arr.length;i++){
//     var searchArry=arr[i].split("=");
//    console.log(searchArry);
//    var key=searchArry[0];
//    var value=searchArry[1];
//    console.log(key);
//    value=decodeURI(value);
//    console.log(value);
//  }
//  地址栏取参数的封装
var tools={
  getObj:function(){
    var search=location.search;
    search=search.slice(1);
    var arr=search.split("&");
    var arrObject={};
    for(var i=0;i<arr.length;i++){
      var key=arr[i].split("=")[0];
      var value=decodeURI(arr[i].split("=")[1]);
      arrObject[key]=value;
    }
    return arrObject;
  },
  getParam:function(key){
    return this.getObj()[key];
  },
  checkLogin:function(data){
    if(data.error==400){
      location.href="login.html?retUrl="+location.href;
    }
  }
}
