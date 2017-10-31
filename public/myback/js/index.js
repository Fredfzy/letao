/**
 * Created by asus on 2017/10/30.
 */
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector('.pic_left'));
// 指定图表的配置项和数据
var option = {
  title: {
    text: '传智前端就业人数'
  },
  tooltip: {},
  legend: {
    data:['人数']
  },
  xAxis: {
    data: ["1","2","3","3","4","5"]
  },
  yAxis: {},
  series: [{
    name: '人数',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


var myChart1 = echarts.init(document.querySelector('.pic_right'));
option1 = {
  title : {
    text: '某站点用户访问来源',
    subtext: '纯属虚构',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: '销售情况',
    left: 'left',
    data: ['耐克','阿迪达斯','李宁','安踏','乔丹']
  },
  series : [
    {
      name: '访问来源',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'耐克'},
        {value:310, name:'阿迪达斯'},
        {value:234, name:'李宁'},
        {value:135, name:'安踏'},
        {value:1548, name:'乔丹'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
myChart1.setOption(option1);
