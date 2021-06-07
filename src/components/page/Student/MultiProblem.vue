<template>
  <div>
    <el-card>
      <h2 class="user-title">多选题</h2>
      <el-card v-for="(o, index) in problems" :key="index">
        <el-form ref="form" label-width="80px">
          <el-form-item :label="index + 1">
            <span style="font-size: large">{{o.homeworkdetail.content + '(' + o.homeworkdetail.score + '分)'}}</span>
            <i v-bind:class="{'el-icon-success' : o.torf === 1, 'el-icon-error' : o.torf === 0}"
               style="font-size: x-large" v-bind:style=" {'color' : o.torf === 1 ? 'green' : 'red'}"></i>
            <br><span style="font-size: large">{{'答案 :' + o.homeworkdetail.ans}}</span>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="o.ans">
              <el-checkbox label="A" >{{o.homeworkdetail.a}}</el-checkbox>
              <el-checkbox label="B" >{{o.homeworkdetail.b}}</el-checkbox>
              <el-checkbox label="C" >{{o.homeworkdetail.c}}</el-checkbox>
              <el-checkbox label="D">{{o.homeworkdetail.d}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "sMultiProblem",
  data() {
    return {
      problems:[{
        content: "第一题答案是A",
        A: "AA",
        B: "BB",
        C: "CC",
        D: "DD",
      }],
    }
  },
  methods: {
    getProblems() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/studenthomework/getans',
        params: {
          type: 1,
          hid: this.$route.params.id,
          seeans: 1
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          let ret = response.data.result.ans;
          for (let i = 0; i < ret.length; ++i) {
            let str = ret[i]['ans'];
            if (str !== undefined) {
              ret[i]['ans'] = str.split('');
            }
          }
          this.problems = ret;
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
      var pat = /^\/smultiproblem\/.*$/;
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
