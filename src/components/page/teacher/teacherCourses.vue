<template>
  <div>
    <el-card>
      <el-tabs v-model="tab.type" @tab-click="handleClick">
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
      </div>
      <el-table
        :data="table"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="课程名">
        </el-table-column>
        <el-table-column
          prop="cntt"
          label="选课人数">
        </el-table-column>
        <el-table-column
          label="好评率"
        >
          <template slot-scope="scope">
           {{Math.floor(scope.row.rate * 100) + '%'}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editCourse(scope.row)" type="text" size="medium">编辑课程</el-button>
            <el-button @click="seeStudents(scope.row)" type="text" size="medium">查看学生</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "teacherCourses",
  data() {
    return {
      tab: {
        type: '小学'
      },
      comp: {
        current: 1,
        size: 5,
        total: 0
      },
      table: [

      ]
    }
  },
  created() {
    this.getCourses(1, 5, this.tab.type);
  },
  methods: {
    seeStudents(row) {
      this.$router.push("/tcoursestudents/" + row.id);
    },
    getCourses(cur, size, type) {
      this.$axios({
        method:'post',
        url:this.HOME + '/teacher/courses',
        data : JSON.stringify({
          username : localStorage.getItem("username"),
          size: size,
          current: cur,
          type: type
        }),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.table = response.data.result.ans.records;
          this.comp.current = response.data.result.ans.current;
          this.comp.size = response.data.result.ans.size;
          this.comp.total = response.data.result.ans.total;
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    handleCurrentChange(val) {
      this.getCourses(val, 5, this.tab.type);
    },
    editCourse(row) {
      this.$router.push("/editcourse/"+row.id);
    },
    handleClick(tab, event) {
      this.getCourses(1, 5, tab.name);
    }
  },
  watch: {
    $route(to, from) {
      var pat = /^\/teacherCourses$/;
      if (pat.test(to.path)) {
        this.getCourses(1, 5, this.tab.type);
      }
    }
  }
}
</script>

<style scoped>

</style>
