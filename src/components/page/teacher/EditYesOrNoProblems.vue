<template>
  <div>
    <el-card>
      <h2 class="user-title">判断题</h2>
      <el-card v-for="(o, index) in problems" :key="index">
        <el-form ref="o" label-width="80px" :model="o">
          <el-form-item label="题目" prop="content" label-width="60px" required>
            <el-input type="textarea" v-model="o.content"></el-input>
          </el-form-item>
          <el-form-item label="分值"  prop="score" label-width="60px" required>
            <el-input-number v-model="o.score" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="答案"  prop="ans" label-width="60px" required>
            <el-radio-group v-model="o.ans">
              <el-radio label="T"></el-radio>
              <el-radio label="F"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="deleteProblem(o)">删除此题</el-button>
        <el-button type="primary" @click="updateProblem(o)">保存此题编辑</el-button>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EditYesOrNoProblems",
  data() {
    return {
      problems:[]
    }
  },
  methods: {
    updateProblem(o) {
      this.$axios({
        method: 'put',
        url:this.HOME + '/homeworkdetail/updatehomeworkdetail',
        data: JSON.stringify(o),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message.success("更改成功");
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    deleteProblem(o) {
      this.$axios({
        method: 'delete',
        url:this.HOME + '/homeworkdetail/deletehomeworkdetail/' + o.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message.success("删除成功");
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    getProblems() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/homeworkdetail/gethomeworktypedetail',
        params: {
          type: 2,
          hid: this.$route.params.id,
          cansee: 1
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.problems = response.data.result.ans;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  created() {
    this.getProblems();
  },
  watch: {
    $route(to, from) {
      var pat = /^\/tedittorf\/.*$/;
      if (pat.test(to.path)) {
        this.problems = [];
        this.getProblems();
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
