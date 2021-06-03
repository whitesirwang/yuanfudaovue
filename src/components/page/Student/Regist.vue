<template>
  <div>
    <el-card style="width: 700px;margin-left: 500px;margin-top: 100px">
      <h2 class='user-title'>学生注册</h2>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="username" required style="width: 500px">
          <el-input v-model="form.username" ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" required style="width: 500px">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" required>
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="QQ邮箱" prop="email" style="width: 500px">
          <el-input v-model="form.email" show-word-limit maxlength="10"></el-input>@qq.com
        </el-form-item>
        <el-form-item label="类别" prop="type" required>
          <el-select v-model="form.type" placeholder="请选择类别">
            <el-option label="小学" value="小学"></el-option>
            <el-option label="初中" value="初中"></el-option>
            <el-option label="高中" value="高中"></el-option>
            <el-option label="大学" value="大学"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password" required style="width: 500px">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword" style="width: 500px">
          <el-input type="password" v-model="form.checkpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="regist('form')">注册</el-button>
          <router-link to="/login">返回登录页面</router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Regist",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      form: {
      },

      rules: {
        checkpassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {

    regist(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url:this.HOME + '/student/regist',
              data:JSON.stringify(this.form),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((response) =>{
              if (response.data.status === 200) {
                this.$message({
                  message: '注册成功！',
                  type: 'success'
                });
              } else {
                this.$message.error(response.data.message);
              }
            }).catch((error) => {
              console.log(error)
            });
          }
      });
    }
  },
  created() {

  },
  watch: {
    $route(to, from) {
      var pat = /^\/studentRegist$/;
      if (pat.test(to.path)) {
        this.form = {

        }
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
}</style>
