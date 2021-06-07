<template>
  <div>
    <el-card>
      <h2 class="user-title">作业大纲</h2>
      <el-table
        :data="homeworktype"
        border
        style="width: 100%">
        <el-table-column
          prop="typename"
          label="类型">
        </el-table-column>
        <el-table-column
        prop="cnt"
        label="题目总数">
        </el-table-column>
        <el-table-column
          prop="total"
          label="总分值">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="seeMyAns(scope.row)">查看题目</el-button>
            <el-button type="text" size="medium" @click="seeResult(scope.row)">查看答案</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HomeworkType",
  data() {
    return {
      homeworktype: []
    }
  },
  methods: {
    seeMyAns(row) {
      if (row.type === 1) {
        this.$router.push("/smultiproblemstatus/" + this.$route.params.id);
      } else if (row.type === 2) {
        this.$router.push("/storfproblemstatus/" + this.$route.params.id);
      } else {
        this.$router.push("/ssingleproblemstatus/" + this.$route.params.id);
      }
    },
    seeResult(row) {
      if (row.type === 1) {
        this.$router.push("/smultiproblem/" + this.$route.params.id);
      } else if (row.type === 2) {
        this.$router.push("/storfproblem/" + this.$route.params.id);
      } else {
        this.$router.push("/ssingleproblem/" + this.$route.params.id);
      }
    },
    getHomeworkType() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/homeworkdetail/gethomeworktype/'+ this.$route.params.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.homeworktype = response.data.result.ans;
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  created() {
    this.getHomeworkType();
  },
  watch: {
    $route(to, from) {
      var pat = /^\/shomeworktype\/.*$/;
      if (pat.test(to.path)) {
        this.getHomeworkType();
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
