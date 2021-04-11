<template>
  <div>
    <el-card>
      <h2>教师信息</h2>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          {{form.name}}
        </el-form-item>
        <el-form-item label="性别">
          {{form.gender}}
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
          {{form.score}}
        </el-form-item>
      </el-form>
    </el-card>
    <div>
      <h2>发表评论</h2>
      <textarea></textarea><br>
      <el-button>发布</el-button>
    </div>

  </div>

</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  name: "TeacherDetailInfo",
  data() {
    return {
      form: {
        introduction:'',
        name: '',
        email: '',
        score: null,
        age: null,
        gender: ""
      },
      comment: [
        {
          name: "wang",
          detail: "11111",
          time: "1111"
        },
        {
          name: "wang1",
          detail: "222",
          time: "223131231"
        },
        {
          name: "wang",
          detail: "11111",
          time: "1111"
        },
        {
          name: "wang1",
          detail: "222",
          time: "223131231"
        }
      ]
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
.ly-p1{
  display: flex;
  justify-content: space-between;
}
</style>
