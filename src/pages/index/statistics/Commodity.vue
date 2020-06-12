<template>
  <div>
    <div>
      <span>时间范围</span>
      <el-date-picker type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期"></el-date-picker>
      <!-- v-model="value1" -->

      <!-- :picker-options="pickerOptions" -->

      <el-button type="primary">查询</el-button>
    </div>

    <el-card class="box-card">
      <div id="myCharts" style="width: 1000px;height: 400px;">
      </div>
    </el-card>
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

          console.log(res);
          let option = {
            title: {
              text: '堆叠区域图'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'top'
                  }
                },
                areaStyle: {},
                data: [820, 932, 901, 934, 1290, 1330, 1320]
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



<style lang="less" scoped>
  .el-range-editor.el-input__inner {
    margin: 0 10px 10px;
  }
</style>