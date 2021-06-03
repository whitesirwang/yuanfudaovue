<template>
  <div>
    <el-card>
      <div id="pie" style="height: 500px; height: 600px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "Tongji",
  mounted() {
    this.initE();
  },
  data() {
    return {
      data: [],
      myChart: null,
    }
  },
  methods: {
    initE() {
      console.log("121212121");
      this.myChart = echarts.init(document.getElementById('pie'));
      var option = {
        title: {
          text: '答题情况统计'
        },
        tooltip: {},
        legend: {
          data:['选择人数']
        },
        xAxis: {
          data: []
        },
        yAxis: {minInterval:1},
        series: [{
          name: '选择人数',
          type: 'bar',
          data: []
        }]
      };
      this.myChart.setOption(option);
      this.myChart.on('click', function(params) {
        console.log(params);
        //var name = parseInt(params.name);
      });
      this.getTongji();
    },
    getTongji() {
      this.$axios({
        method:'get',
        url:this.HOME + '/studenthomework/gettongji',
        params: {
          hdid : this.$route.params.id
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          console.log(response.data.result.ans);
          console.log(this.myChart);
          let insx = [];
          let ins = [];
          for (let key in response.data.result.ans) {
            insx.push(key);
            ins.push(response.data.result.ans[key]);
          }
          this.myChart.setOption({
            xAxis: {
              data: insx
            },
            series: [{
              name: '选择人数',
              type: 'bar',
              data: ins
            }]
          });
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  created() {

  },
  watch: {
    $route(to, from) {
      var pat = /^\/ttongji\/.*$/;
      if (pat.test(to.path)) {
        this.initE();
      }
    }
  }
}
</script>

<style scoped>

</style>
