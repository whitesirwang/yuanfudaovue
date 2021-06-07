<template>
  <div>
    <el-card>
    <h2 class="user-title">单选题</h2>
      <el-card v-for="(o, index) in problems" :key="index">
        <el-form :model="o" ref="o">
        <el-form-item label="题目" required prop="content">
          <el-input type="textarea" v-model="o.content"></el-input>
        </el-form-item>
        <el-form-item label="选项A" required prop="a">
          <el-input v-model="o.a"></el-input>
        </el-form-item>
        <el-form-item label="选项B" required prop="b">
          <el-input v-model="o.b"></el-input>
        </el-form-item>
        <el-form-item label="选项C" required prop="c">
          <el-input v-model="o.c"></el-input>
        </el-form-item>
        <el-form-item label="选项D" required prop="d">
          <el-input v-model="o.d"></el-input>
        </el-form-item>
        <el-form-item label="分值" required prop="score">
          <el-input-number v-model="o.score" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="答案" required prop="ans">
          <el-radio-group v-model="o.ans">
            <el-radio label="A"></el-radio>
            <el-radio label="B"></el-radio>
            <el-radio label="C"></el-radio>
            <el-radio label="D"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
        <el-button type="primary" @click="deleteProblem(o)">删除此题</el-button>
        <el-button type="primary" @click="updateProblem(o)">保存此题编辑</el-button>
        <el-button type="primary" @click="seeTongji(o)">查看答题统计</el-button>
    </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EditSigProblems",
  data() {
    return {
      problems:[]
    }
  },
  methods: {
    seeTongji(o) {
      this.$router.push("/ttongji/" + o.id);
    },
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
          this.getProblems();
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
          type: 0,
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
      var pat = /^\/teditsig\/.*$/;
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
