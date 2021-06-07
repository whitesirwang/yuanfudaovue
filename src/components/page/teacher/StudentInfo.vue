<template>
  <el-card>
    <h2 class="user-title">个人信息</h2>
    <el-row>
      <el-col span="12">
        <el-form ref="form" :model="form" label-width="40px" label-position="top" style="margin-left: 30px">
          <el-form-item label="用户名" style="font-size: x-large">
            <span style="font-size: x-large">{{form.user.username}}</span>
          </el-form-item>
          <el-form-item label="姓名" style="font-size: x-large">
            <span style="font-size: x-large">{{form.student.name}}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span style="font-size: x-large">{{form.student.gender}}</span>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <span style="font-size: x-large">{{form.student.type}}</span>
          </el-form-item>
          <el-form-item label="QQ邮箱" prop="mail">
            <span style="font-size: x-large">{{form.user.email}}@qq.com</span>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col span="12">
        <img :src="img.url" width="100%" height="600">
      </el-col>
    </el-row>

  </el-card>
</template>

<script>
export default {
  name: "StudentInfo",
  data() {
    return {
      img : {
        url : '',
      },
      form: {
        introduction:'',
        name: '',
        email: '',
        score: '',
        age: '',
        gender: '',
        avatorname: ''
      },
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios({
        method:'get',
        url:this.HOME + '/student/info',
        params: {
          id: this.$route.params.id
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.form = response.data.result.ans;
          if (response.data.result.ans.avatorname !== null) {
            this.img.url = 'http://121.4.21.154:8004/vedios/'+response.data.result.ans.avatorname;
          }else {
            this.img.url = 'static/error-page.png'
          }
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  watch:{
    $route(to, from) {
      var pat = /^\/tstudentinfo\/.*$/;
      if (pat.test(to.path)) {
        this.getUser();
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
