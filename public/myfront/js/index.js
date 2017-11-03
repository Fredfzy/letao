/**
 * Created by asus on 2017/11/1.
 */
//区域滚动条效果
mui('.mui-scroll-wrapper').scroll({
  indicators:false
});
//轮播图效果
mui('.mui-slider').slider({
  interval:1000//自动轮播周期，若为0不自动轮播
})