<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" disabled></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" disabled></el-input>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="form.age" disabled></el-input>
    </el-form-item>
    <el-form-item label="自我介绍">
      <el-input type="textarea" v-model="form.introduction"></el-input>
    </el-form-item>
    <el-form-item label="评分">
      <el-rate
        v-model="form.score"
        show-text
        disabled
        score-template="{form.score}"
        >
      </el-rate>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updateUser">提交修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "TeacherInfo",
  data() {
    return {
      form: {
        introduction:'',
        name: '',
        email: '',
        score: '',
        age: ''
      }
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios({
        method:'get',
        url:this.HOME + '/teacher/' + localStorage.getItem("username")
      }).then((response) =>{
        if (response.data.status === 200) {
          this.form = response.data.result;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    updateUser() {
      this.$axios({
        method: 'put',
        url:this.HOME + '/teacher',
        data:JSON.stringify({
          introduction: this.form.introduction
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {

        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  }
}
</script>

<style scoped>

</style>
