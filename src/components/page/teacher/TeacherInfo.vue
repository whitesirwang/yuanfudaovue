<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="姓名">
      {{form.name}}
    </el-form-item>
    <el-form-item label="邮箱">
      {{form.email}}
    </el-form-item>
    <el-form-item label="年龄">
      {{form.age}}
    </el-form-item>
    <el-form-item label="自我介绍">
      {{form.introduction}}
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
  </el-form>
</template>

<script>
export default {
  name: "TeacherDetailInfo",
  data() {
    return {
      form: {
        introduction:'我牛逼',
        name: '1212',
        email: '212121',
        score: 3,
        age: 40
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
        url:this.HOME + '/teacher/' + this.$route.params.username
      }).then((response) =>{
        if (response.data.status === 200) {
          this.form = response.data.result;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  watch: {
    "$route": "getUser"
  }
}
</script>

<style scoped>

</style>
