<template>
  <div>
    <el-card>
      <h2 class="user-title">选课学生</h2>
      <div style="margin-bottom: 10px">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="comp.current"
          layout="total, prev, pager, next"
          :page-size="5"
          :total="comp.total"
          style="margin-bottom: 0">
        </el-pagination>
      </div>
      <el-table
        :data="students"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="seeInfo(scope.row)" type="text" size="medium">个人信息</el-button>
            <el-button type="text" size="medium" @click="seeScore(scope.row)">查看作业成绩</el-button>
            <el-button type="text" @click="handleDigClick(scope.row)">和他私信</el-button>
            <el-dialog title="私信" :visible.sync="dialogFormVisible">
              <el-form :model="sendMail">
                <el-form-item label="标题">
                  <el-input v-model="sendMail.title"></el-input>
                </el-form-item>
                <el-form-item label="正文">
                  <el-input type="textarea" v-model="sendMail.content"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="sedMail">发送</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HomeWorkStudents",
  data() {
    return {
      row: {

      },
      comp: {
        current: 1,
        size: 5,
        total: 0
      },
      students: [],
      dialogFormVisible: false,
      sendMail: {

      }
    }
  },
  methods: {
    seeInfo(row) {
      this.$router.push("/tstudentinfo/"+row.sid);
    },
    seeScore(row) {
      this.$router.push("/tstudenthomeworkstatus/" + row.sid + "/" + this.$route.params.id);
    },
    handleDigClick(row) {
      this.dialogFormVisible = true;
      this.row = row;
    },
    sedMail() {
      console.log(this.row);
      this.$confirm('是否要发送？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'post',
          url:this.HOME + '/mail/sendmail',
          data:JSON.stringify({
            content: this.sendMail.content,
            title: this.sendMail.title,
            reply: -1,
            to: this.row.uid
          }),
          headers: {
            'accessToken': localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
          }
        }).then((response) =>{
          if (response.data.status === 200) {
            this.$message({
              message: '发送成功！',
              type: 'success'
            });
            this.dialogFormVisible = false;
          } else {
            this.$message.error(response.data.message);
          }
        }).catch((error) => {
          console.log(error)
        });
      });
    },
    handleCurrentChange(val) {
      this.getStudents(val, 5);
    },
    getStudents(cur, sz) {
      this.$axios({
        method:'get',
        url:this.HOME + '/teacher/coursestudents',
        params : {
          size: sz,
          current: cur,
          cid: this.$route.params.cid
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.students = response.data.result.ans.records;
          this.comp.current = response.data.result.ans.current;
          this.comp.size = response.data.result.ans.size;
          this.comp.total = response.data.result.ans.total;
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  created() {
    this.getStudents(1, 5);
  },
  watch: {
    $route(to, from) {
      var pat = /^\/thomeworkstudents\/.*$/;
      if (pat.test(to.path)) {
        this.getStudents(1, 5);
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
