<template>
  <div>
    <el-card>
      <h2 class="user-title">多选题</h2>
      <el-card v-for="(o, index) in problems" :key="index">
        <el-form ref="o" label-width="80px" :model="o">
          <el-form-item label="题目" required prop="content" label-width="60px">
            <el-input type="textarea" v-model="o.content" ></el-input>
          </el-form-item>
          <el-form-item label="选项A" required prop="a" label-width="60px">
            <el-input v-model="o.a"></el-input>
          </el-form-item>
          <el-form-item label="选项B" required prop="b" label-width="60px">
            <el-input v-model="o.b"></el-input>
          </el-form-item>
          <el-form-item label="选项C" required prop="c" label-width="60px">
            <el-input v-model="o.c"></el-input>
          </el-form-item>
          <el-form-item label="选项D" required prop="d" label-width="60px">
            <el-input v-model="o.d"></el-input>
          </el-form-item>
          <el-form-item label="分值" required prop="score" label-width="60px">
            <el-input-number v-model="o.score" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="答案" required prop="ans" label-width="60px">
            <el-checkbox-group v-model="o.ans">
              <el-checkbox label="A"></el-checkbox>
              <el-checkbox label="B"></el-checkbox>
              <el-checkbox label="C"></el-checkbox>
              <el-checkbox label="D"></el-checkbox>
            </el-checkbox-group>
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
  name: "EditMultiProblems",
  data() {
    return {
      problems:[]
    }
  },
  methods: {
    updateProblem(o) {
      var pdata = o;
      pdata.ans = pdata.ans.join('');
      console.log(pdata.ans);
      this.$axios({
        method: 'put',
        url:this.HOME + '/homeworkdetail/updatehomeworkdetail',
        data: JSON.stringify(pdata),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message.success("更改成功");
          //this.getProblems();
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
          //this.getProblems();
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
          type: 1,
          hid: this.$route.params.id,
          cansee: 1
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          let ret = response.data.result.ans;
          for (let i = 0; i < ret.length; ++i) {
            ret[i]['ans'] = ret[i]['ans'].split('');
          }
          this.problems = ret;
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
      var pat = /^\/teditmulti\/.*$/;
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
