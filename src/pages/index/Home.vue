<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="never">总订单:
          <span>{{totalOrder}}</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">总销售额:
        <span>{{totalAmount}}元</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          今日订单数:
        <span>{{todayOrder}}</span>

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">今日销售额:
        <span>{{totayAmount}}元</span>
        </el-card>
      </el-col>
    </el-row>
    <div id="myCharts" style="width: 1000px;height: 400px;">
    </div>
  </div>
</template>

<script>
  // 1.引入
  import echarts from 'echarts'
  import {
    API_ORDER_TOTALDATA
  } from "@/api/apis";
  export default {
    data() {
      return {
        todayOrder: 0,
        totalAmount: 0,
        totalOrder: 0,
        totayAmount: 0
      }
    },
    mounted() {
      var myCharts = echarts.init(document.getElementById('myCharts'));
      // 开启圈圈圆圆
      myCharts.showLoading()
      //       amountData: (7) [220, 282, 191, 234, 290, 330, 310]
      // orderData: (7) [120, 132, 101, 134, 90, 230, 210]
      // todayOrder: 189
      // totalAmount: 202466
      // totalOrder: 5486
      // totayAmount: 2189

      setTimeout(() => {
        API_ORDER_TOTALDATA().then(res => {
          let {
            xData,
            orderData,
            amountData,
            todayOrder,
            totalAmount,
            totalOrder,
            totayAmount
          } = res.data
          this.todayOrder=todayOrder,
          this.totalAmount=totalAmount,
          this.totalOrder=totalOrder,
          this.totayAmount=totayAmount
          // console.log(res);
          let option = {
            title: {
              text: '数据统计'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xData
            },
            yAxis: {
              type: 'value'
            },
            series: [{
                name: '订单数据',
                type: 'line',
                stack: '总量',
                data: orderData
              },
              {
                name: '金额数据',
                type: 'line',
                stack: '总量',
                data: amountData
              }
            ]
          };
          myCharts.setOption(option);
          // 开启圈圈圆圆
          myCharts.hideLoading()
        })
      }, 1000);





    },



  }
</script>

<style lang="scss" scoped>

</style>