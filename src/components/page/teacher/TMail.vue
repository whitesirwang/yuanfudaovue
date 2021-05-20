<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未读" name="未读"></el-tab-pane>
      <el-tab-pane label="已读" name="已读"></el-tab-pane>
      <el-tab-pane label="已发送" name="已发送"></el-tab-pane>
    </el-tabs>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="comp.current"
      layout="total, prev, pager, next"
      :page-size="5"
      :total="comp.total"
      style="margin-bottom: 0">
    </el-pagination>
    <el-table
      :data="mail"
      style="width: 100%">
      <el-table-column
        label="日期"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户"
        prop="username">
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
<!--          <el-button type="text" @click="test(scope.row)">测试</el-button>-->
          <el-button type="text" @click="dialogFormVisible = true">回复</el-button>
          <el-dialog title="回复消息" :visible.sync="dialogFormVisible">
            <el-form :model="sendMail">
              <el-form-item label="标题">
                <el-input v-model="sendMail.title"></el-input>
              </el-form-item>
              <el-form-item label="正文">
                <el-input type="textarea" v-model="sendMail.content"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="sedMail(scope.row)">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TMail",
  data() {
    return {
      activeName: "未读",
      sendMail: {

      },
      dialogFormVisible: false,
      mail : [
        {
          username: "12121",
          date: "1999-06-17",

        }
      ],
      comp: {
        current:1,
        size: 5,
        total: 0
      }
    }
  },
  created() {
    this.getMail(1, 5, 0);
  },
  methods: {
    test(mid, f) {
      alert(mid);
    },
    sedMail(row) {
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
            reply: row.id,
            to: row.f
          }),
          headers: {
            'accessToken': localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
          }
        }).then((response) =>{
          if (response.data.status === 200) {
            this.$message({
              message: '回复成功！',
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.sendMail.title = '';
            this.sendMail.content = '';
          } else {
            this.$message.error(response.data.message);
          }
        }).catch((error) => {
          console.log(error)
        });
      });
    },
    handleClick(tab, event) {

    },
    handleCurrentChange(val) {

    },
    getMail(cur, sz, type) {
      if (type === 0 || type === 1) {
        this.getRecv(cur, sz, type);
      } else if (type === "已发送") {

      }
    },
    getRecv(cur, sz, type) {
      this.$axios({
        method:'get',
        url:this.HOME + '/mail/usermail',
        params: {
          current : cur,
          size : sz,
          isread: type
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          console.log(response.data.result.ans.records);
          this.mail = response.data.result.ans.records;
          this.comp.total = response.data.result.ans.total;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    getSend() {
    }
  }
}
</script>

<style scoped>

</style>
