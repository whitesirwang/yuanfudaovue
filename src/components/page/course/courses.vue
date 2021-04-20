<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="小学教程" name="小学"></el-tab-pane>
      <el-tab-pane label="初中教程" name="初中"></el-tab-pane>
      <el-tab-pane label="高中教程" name="高中"></el-tab-pane>
      <el-tab-pane label="大学教程" name="大学"></el-tab-pane>
    </el-tabs>
    <div style="margin-bottom: 10px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="comp.current"
        layout="total, prev, pager, next"
        :page-size="5"
        :total="comp.total"
        style="margin-bottom: 0">
      </el-pagination>
      <el-input placeholder="搜索课程名称" v-model="search" style="width: 30%">
        <el-button slot="append" icon="el-icon-search" @click="getCourses(1,5, search, activeName)"></el-button>
      </el-input>
    </div>
    <div>
      <el-row>
        <el-col :span="8" v-for="(o, index) in courses" :key="o" >
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{o.name}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="seeCourseDetail(o)">查看详情</el-button>
            </div>
            <el-form style="padding-left: 20px">
              <el-form-item label="选课人数" style="font-size: 20px">
                {{o.cnt}}
              </el-form-item>
              <el-form-item label="评分" style="font-size: 20px">
                {{o.score}}
              </el-form-item>
              <el-form-item label="讲课老师" style="font-size: 20px">
                {{o.teachername}}
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
  name: "courses",
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
    this.getCourses(1, 5, '',this.activeName)
  },
  methods: {
    getCourses(cur, size, coursename = '', type) {
      this.$axios({
        method: 'get',
        url: this.HOME + '/courses',
        params: {
          current: cur,
          size: size,
          type: type,
          coursename: coursename
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken")
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
      this.getCourses(val, 5, this.search, this.activeName);
    },
    handleClick(tab, event) {
      this.getCourses(1, 5, '', tab.name);
    },
    seeCourseDetail(row) {
      this.$router.push("/scourse/"+row.id);
    },
  },
  watch: {

  }
}
</script>

<style scoped>

</style>
