<template>
  <div>
    <el-card>
      <h2 class="user-title">判断题</h2>
      <el-card v-for="(o, index) in problems" :key="index">
        <el-form ref="form" label-width="80px">
          <el-form-item :label="index + 1 + '、'" label-width="20px">
            <span style="font-size: large">{{o.homeworkdetail.content + '(' + o.homeworkdetail.score + '分)'}}</span>
          </el-form-item>
          <el-form-item label-width="20px">
            <el-radio-group v-model="o.ans" >
              <el-radio label="T"></el-radio>
              <el-radio label="F"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-card>
      <el-button type="primary" @click="submitproblem">提交答案</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "YesOrNoProblemStatus",
  data() {
    return {
      problems:[{
        content: "第一题答案是A",
        A: "AA",
        B: "BB",
        C: "CC",
        D: "DD",
      }]
    }
  },
  methods: {
    submitproblem() {
      var pdata = [];
      let len = this.problems.length;
      for (let i = 0; i < len; ++i) {
        var ins = {
          ans : this.problems[i]['ans'],
          hdid: this.problems[i]['homeworkdetail']['id'],
          shid: this.problems[i]['shid']
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
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    getProblems() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/studenthomework/getans',
        params: {
          type: 2,
          hid: this.$route.params.id,
          seeans: 0
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.problems = response.data.result.ans;
        } else {
          this.$message.error(response.data.message);
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
      var pat = /^\/storfproblemstatus\/.*$/;
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
