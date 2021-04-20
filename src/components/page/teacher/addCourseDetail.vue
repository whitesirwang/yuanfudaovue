<template>
  <div>
    <el-card>
      <h2 class="user-title">课时名称</h2>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="课时简介">
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-button type="primary" @click="addCourseDetail">添加</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "addCourseDetail",
  data() {
    return {
      form: {
        introduction: '',
        title: '',
      }
    }
  },
  created() {

  },
  methods: {
    clearall() {
      this.introduction = '';
      this.title = ''
    },
    addCourseDetail() {
      this.$axios({
        method: 'post',
        url:this.HOME + '/courseDetail',
        data:JSON.stringify({
          title : this.form.title,
          introduction: this.form.introduction,
          cid: this.$route.params.id
        }),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          alert("添加成功");
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  watch: {
    $route(to, from) {
      var pat = /^\/addcoursedetail\/.*$/;
      if (pat.test(to.path)) {
        this.clearall();
      }
    }
  }
}
</script>

<style scoped>
.user-title {
  padding-bottom: 15px;
  border-bottom: 2px solid @mainColor;
  margin: 15px 0 45px 0;
  color: #555;
  text-align: center;
  font-size: 30px;
}
</style>
