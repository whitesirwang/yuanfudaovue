<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="小学教程" name="小学"></el-tab-pane>
      <el-tab-pane label="初中教程" name="初中"></el-tab-pane>
      <el-tab-pane label="高中教程" name="高中"></el-tab-pane>
      <el-tab-pane label="大学教程" name="大学"></el-tab-pane>
    </el-tabs>
    <div style="margin-bottom: 10px; height: 20px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="comp.current"
        layout="total, prev, pager, next"
        :page-size="5"
        :total="comp.total"
        style="margin-bottom: 0">
      </el-pagination>
    </div>
    <div>
      <el-row>
        <el-col :span="7" v-for="(o, index) in courses" :key="o" style="margin-right: 50px;margin-bottom: 20px">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{o.name}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="seeCourseDetail(o)">查看详情</el-button>
            </div>
            <el-form style="padding-left: 20px">
              <el-form-item label="讲课老师" style="font-size: 20px">
                {{o.teachername}}
              </el-form-item>
              <el-form-item label="好评率">
                <el-progress type="circle" :percentage="Math.floor(o.rate * 100)"></el-progress>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentCourses",
  data() {
    return {
      activeName: "高中",
      search: '',
      comp: {
        current: 1,
        size: 5,
        total: 0
      },
      courses: [{
      }]
    }
  },
  created() {
    this.getCourses(1, 5,this.activeName)
  },
  methods: {
    getCourses(cur, size, type) {
      this.$axios({
        method: 'post',
        url: this.HOME + '/student/courses',
        data: JSON.stringify({
          current: cur,
          size: size,
          type: type,
          username: localStorage.getItem("username")
        }),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data.status === 200) {
          this.courses = response.data.result.ans.records;
          this.comp.total = response.data.result.ans.total;
          this.comp.size = response.data.result.ans.size;
          this.comp.current = response.data.result.ans.current;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    handleCurrentChange(val) {
      this.getCourses(val, 5, this.activeName);
    },
    handleClick(tab, event) {
      this.getCourses(1, 5, tab.name);
    },
    seeCourseDetail(row) {
      this.$router.push("/scourse/"+row.id);
    },
  },
  watch: {
    $route(to, from) {
      var pat = /^\/scourses$/;
      if (pat.test(to.path)) {
        this.getCourses(1, 5,this.activeName)
      }
    }
  }
}
</script>

<style scoped>

</style>
