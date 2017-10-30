/**
 * Created by asus on 2017/10/29.
 */
//开启进度条
$(document).ajaxStart(function () {
  NProgress.start();
});
//关闭进度条
$(document).ajaxStop(function () {
  setTimeout(function(){
    NProgress.done();
  },500)
});
