<template>
  <div>
    <div>
      <span>时间范围</span>
      <el-date-picker v-model="value1" format='yyyy-MM-dd' value-format='yyyy-MM-dd' type="datetimerange"
        start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00']">
      </el-date-picker>
      <el-button @click='inquire' type="primary">查询</el-button>
    </div>

    <el-card class="box-card">
      <div id="myCharts" style="width: 1000px;height: 400px;">

      </div>

    </el-card>
  </div>
</template>

<script>
  // // 1.引入
  import echarts from 'echarts'

  import {
    API_ORDER_ORDERTOTAL
  } from "@/api/apis";
  export default {
    data() {
      return {
        options: {},
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [],
      };
    },
    // 时间
    methods: {
      inquire() {
        console.log(this.value1);
        
        API_ORDER_ORDERTOTAL(JSON.stringify(this.value1)).then(res => {
          let days = res.data.data.map(i => {
            return i.day;
          });
          let counts = res.data.data.map(i => {
            return i.count;
          })
          this.options= {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: {
                  show: true,
                  readOnly: false
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar']
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            legend: {
              data: ['销量']
            },
            xAxis: [{
              type: 'category',
              data: days,
              axisPointer: {
                type: 'shadow'
              }
            }],
            yAxis: [{
              type: 'value',
              name: '销量',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value} 元'
              }
            }],
            series: [{
                name: '销量',
                type: 'bar',
                data: counts
              },
              {
                name: '销量趋势',
                type: 'line',
                yAxisIndex: 0,
                data: counts
              }
            ]
          };
          var myCharts = echarts.init(document.getElementById('myCharts'));
          // 开启圈圈圆圆
          myCharts.showLoading()
          myCharts.setOption(this.options);
          myCharts.hideLoading();
        });
        // console.log(this.value1);
        // 字符串格式数组，如["2019-10-01 00:00:00", "2019-10-10 00:00:00"]
      }
    },
    mounted() {
      var currentDate = new Date();
      //返回date是一周中的某一天
      var week = currentDate.getDay();
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24;
      //减去的天数
      var minusDay = week != 0 ? week - 1 : 6;
      //alert(minusDay);
      //本周 周一
      var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
      //本周 周日
      var sunday = new Date(monday.getTime() + (6 * millisecond));
      this.value1.push(monday);
      this.value1.push(sunday);
      API_ORDER_ORDERTOTAL(JSON.stringify(this.value1)).then(res => {
          let days = res.data.data.map(i => {
            return i.day;
          });
          let counts = res.data.data.map(i => {
            return i.count;
          })
          this.options= {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            toolbox: {
              feature: {
                dataView: {
                  show: true,
                  readOnly: false
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar']
                },
                restore: {
                  show: true
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            legend: {
              data: ['销量']
            },
            xAxis: [{
              type: 'category',
              data: days,
              axisPointer: {
                type: 'shadow'
              }
            }],
            yAxis: [{
              type: 'value',
              name: '销量',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value} 元'
              }
            }],
            series: [{
                name: '销量',
                type: 'bar',
                data: counts
              },
              {
                name: '销量趋势',
                type: 'line',
                yAxisIndex: 0,
                data: counts
              }
            ]
          };
          var myCharts = echarts.init(document.getElementById('myCharts'));
          // 开启圈圈圆圆
          myCharts.showLoading()
          myCharts.setOption(this.options);
          myCharts.hideLoading();
        });
      }}
</script>

<style lang="less" scoped>
  .el-range-editor.el-input__inner {
    margin: 0 10px 10px;
  }
</style>