<template>
  <div>
    <el-card>
      <h2 class="user-title">学生作业情况</h2>
      <el-table
        :data="homeworktype"
        border
        style="width: 100%;">
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
        prop="score"
        label="得分">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="seeTypeDetail(scope.row)" type="text" size="medium">查看答题情况</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StudentHomeworkStatus",
  data() {
    return {
      homeworktype: [],
    }
  },
  methods: {
    seeTypeDetail(row) {
      if (row.type === 0) {
        this.$router.push("/tsigproblemstatus/" + this.$route.params.sid + "/" + this.$route.params.hid);
      } else if (row.type === 1) {
        this.$router.push("/tmultiproblemstatus/" + this.$route.params.sid + "/" + this.$route.params.hid);
      } else {
        this.$router.push("/ttorfproblemstatus/" + this.$route.params.sid + "/" + this.$route.params.hid);
      }
    },
    getHType() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/studenthomework/getscore',
        params: {
          sid : this.$route.params.sid,
          hid : this.$route.params.hid
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.homeworktype = response.data.result.ans;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
  },
  created() {
    this.getHType();
  },
  watch: {
    $route(to, from) {
      var pat = /^\/tstudenthomeworkstatus\/.*$/;
      if (pat.test(to.path)) {
        this.getHType();
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
