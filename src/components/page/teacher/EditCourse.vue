<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <h2 class="user-title">课程信息</h2>
      <el-form ref="form" :model="form" label-width="80px" label-position="top">
        <el-form-item label="课程名">
          <el-input v-model="form.course.name"></el-input>
        </el-form-item>
        <el-form-item label="课程类型">
          <el-select v-model="form.course.type" placeholder="小学">
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="大学" value="大学"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input type="textarea" v-model="form.course.introduction"></el-input>
        </el-form-item>
        <el-form-item label="讲课老师">
          {{form.teacher.name}}
        </el-form-item>
        <el-form-item label="选课人数">
          {{form.course.cnt}}
        </el-form-item>
        <el-form-item label="好评率">
          <el-progress type="circle" :percentage="Math.floor(form.course.rate * 100)"></el-progress>
        </el-form-item>
        <el-button type="primary" @click="updateCourse">更改信息</el-button>
        <el-button type="primary" @click="addCourseDetail">添加课时</el-button>
      </el-form>
    </el-card>
    <el-card>
      <el-table
        :data="courseDetail"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="title"
          label="课时名">
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="date">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editCourseDetail(scope.row)" type="text" size="medium">编辑课时</el-button>
            <el-button @click="deleteCourseDetail(scope.row)" type="text" size="medium">删除课时</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EditCourse",
  data() {
    return {
      form: {
        teacher: {

        },
        course: {

        }
      },
      courseDetail: [{
        id: 1,
        cid: 2,
        title: "第一节课",
        introduction: "开门红",
        vid: 22,
        fid: 19,
        date: "2021-04-15T10:43:56.000+0000",
        cnt: 0
      }]
    }
  },
  created() {
    this.getCourseDetail();
  },
  methods: {
    indexMethod(index) {
      return index+1;
    },
    updateCourse() {
      this.$axios({
        method:'put',
        url:this.HOME + '/course/updatecourse',
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(this.form.course)
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message.success("修改成功");
          this.getCourseDetail();
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    deleteCourseDetail(row) {
      this.$axios({
        method:'delete',
        url:this.HOME + '/deleteCourseDetail/' + row.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message.success("删除成功");
          this.getCourseDetail();
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error);
      });

    },
    getCourseDetail() {
      this.$axios({
        method:'get',
        url:this.HOME + '/courseDetail/' + this.$route.params.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.form.teacher = response.data.result.ans.teacher;
          this.form.course = response.data.result.ans.course;
          this.form.course.cnt = response.data.result.ans.cnt;
          this.courseDetail = response.data.result.ans.courseDetail;
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    addCourseDetail() {
      this.$router.push("/addcoursedetail/" + this.form.course.id);
    },
    editCourseDetail(row) {
      this.$router.push("/editcoursedetail/" + row.id);
    }
  },
  watch: {
    $route(to, from) {
      var pat = /^\/editcourse\/.*$/;
      if (pat.test(to.path)) {
        this.getCourseDetail();
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-title {
  padding-bottom: 15px;
  border-bottom: 2px solid @mainColor;
  margin: 15px 0 45px 0;
  color: #555;
  text-align: center;
  font-size: 30px;
}
</style>
