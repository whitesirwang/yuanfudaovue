<template>
  <div>
    <el-card>
      <h2 class="user-title">单选题</h2>
        <el-card v-for="(o, index) in problems" :key="index">
          <el-form ref="form" label-width="80px">
            <el-form-item :label="index + 1">
              <span style="font-size: large">{{o.content + '(' + o.score + '分)'}}</span>
            </el-form-item>
            <el-form-item>
              <el-radio v-model="o.choice" label="A">{{'A、' + o.a}}</el-radio>
              <el-radio v-model="o.choice" label="B">{{'B、' + o.b}}</el-radio>
              <el-radio v-model="o.choice" label="C">{{'C、' + o.c}}</el-radio>
              <el-radio v-model="o.choice" label="D">{{'D、' + o.d}}</el-radio>
            </el-form-item>
          </el-form>
        </el-card>
        <el-button type="primary" @click="submitproblem">提交答案</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SingleProblem",
  data() {
    return {
      problems:[{
        content: "第一题答案是A",
        choice: ''
      }]
    }
  },
  methods: {
    submitproblem() {
      var pdata = [];
      let len = this.problems.length;
      for (let i = 0; i < len; ++i) {
        var x = this.problems[i];
        var ins = {
          ans : x.choice,
          hdid: this.problems[i]['id']
        }
        pdata.push(ins);
      }
      this.$axios({
        method: 'post',
        url:this.HOME + '/studenthomework/addans',
        data: pdata,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message.success("提交成功");
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
          cansee: 0
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
    },
  },
  created() {
    this.getProblems();
  },
  watch: {
    $route(to, from) {
      var pat = /^\/ssingleproblem\/.*$/;
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
