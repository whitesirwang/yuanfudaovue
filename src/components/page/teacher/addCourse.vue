<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="课程名">
          <el-input v-model="form.coursename"></el-input>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="小学">
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="大学" value="大学"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "addCourse",
  data() {
    return {
      form: {
        username: '',
        coursename: '',
        introduction: '',
        type: "小学"
      }
    }
  },
  methods: {
    clearall() {
      this.form.coursename = '';
      this.form.introduction= '';
    },
    onSubmit() {
      this.form.username = localStorage.getItem("username");
      this.$axios({
        method: 'post',
        url:this.HOME + '/course/addcourse',
        data:JSON.stringify(this.form),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message({
            message: '上传成功！',
            type: 'success'
          });
          this.clearall();
        } else {
          this.$message.error(response.data.message);
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
      var pat = /^\/addcourse$/;
      if (pat.test(to.path)) {
        this.clearall();
      }
    }
  }
}
</script>

<style scoped>

</style>
