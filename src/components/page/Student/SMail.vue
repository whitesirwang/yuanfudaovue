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
      style="width: 100%"
    :hidden="activeName === '已发送'">
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
          <el-button type="text" @click="seeMail(scope.row)">查看邮件</el-button>
          <el-button type="text" @click="handleDigClick(scope.row)">回复</el-button>
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
              <el-button type="primary" @click="sedMail">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="mymail"
      style="width: 100%"
      :hidden="activeName !== '已发送'">
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
          <el-button type="text" @click="seeMail(scope.row)">查看邮件</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SMail",
  data() {
    return {
      row: {

      },
      activeName: "已发送",
      dialogFormVisible: false,
      sendMail: {

      },
      mail : [
      ],
      mymail: [],
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
    handleDigClick(row) {
      this.dialogFormVisible = true;
      this.row = row;
    },
    sedMail() {
      this.$confirm('是否要回复？', '提示', {
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
            reply: this.row.id,
            to: this.row.f
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
    seeMail(row) {
      this.$router.push('/smaildetail/' + row.id);
    },
    handleClick(tab, event) {
      if (tab.name === '未读') {
        this.getMail(1, 5, 0);
      } else if (tab.name === '已读') {
        this.getMail(1, 5, 1);
      } else {
        this.getMail(1, 5, 2);
      }
    },
    handleCurrentChange(val) {
      if (this.activeName === '未读') {
        this.getMail(val, 5, 0);
      } else if (this.activeName === '已读') {
        this.getMail(val, 5, 1);
      } else {
        this.getMail(val, 5, 2);
      }
    },
    getMail(cur, sz, type) {
      if (type === 0 || type === 1) {
        this.getRecv(cur, sz, type);
      } else if (type === 2) {
        this.getSend(cur, sz)
      }
    },
    getSend(cur, sz) {
      this.$axios({
        method:'get',
        url:this.HOME + '/mail/getmymail',
        params: {
          current : cur,
          size : sz,
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          console.log(response.data.result.ans.records);
          this.mymail = response.data.result.ans.records;
          this.comp.total = response.data.result.ans.total;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
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
    }
  }
}
</script>

<style scoped>

</style>
