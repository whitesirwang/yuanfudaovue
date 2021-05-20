<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <h2 class="user-title">教师信息</h2>
      <el-row>
        <el-col span="12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
              {{form.name}}
            </el-form-item>
            <el-form-item label="性别">
              {{form.gender}}
            </el-form-item>
            <el-form-item label="年龄">
              {{form.age}}
            </el-form-item>
            <el-form-item label="自我介绍">
              {{form.introduction}}
            </el-form-item>
            <el-form-item label="好评率">
              <el-progress type="circle" :percentage="Math.floor(form.rate * 100)"></el-progress>
            </el-form-item>
            <el-form-item label="私信">
              <el-button type="primary" @click="dialogFormVisible = true">和他私聊</el-button>
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
            </el-form-item>
          </el-form>
        </el-col>
        <el-col span="12">
          <img :src="img.url" width="100%" height="500">
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <h2 class="user-title">教师开的课程</h2>
      <el-tabs v-model="tab.type" @tab-click="handleClick">
        <el-tab-pane label="小学教程" name="小学"></el-tab-pane>
        <el-tab-pane label="初中教程" name="初中"></el-tab-pane>
        <el-tab-pane label="高中教程" name="高中"></el-tab-pane>
        <el-tab-pane label="大学教程" name="大学"></el-tab-pane>
      </el-tabs>
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
        :data="table"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="课程名">
        </el-table-column>
        <el-table-column
          prop="cntt"
          label="选课人数">
        </el-table-column>
        <el-table-column
          prop="rate"
          label="好评率"
        >
        </el-table-column>
        <el-table-column
        label="操作">
          <template slot-scope="scope">
            <el-button @click="seeCourseDetail(scope.row)" type="text" size="medium">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <div>
        <h2 class="user-title">留言</h2>
        <el-form ref="form" v-model="addcomment">
          <el-select v-model="addcomment.score" placeholder="好评">
            <el-option label="好评" value="好评"></el-option>
            <el-option label="差评" value="差评"></el-option>
          </el-select>
          <el-input type="textarea" v-model="addcomment.comment" aria-placeholder="输入你的评论吧"></el-input>
          <el-button type="primary" @click="submitComment">提交</el-button>
        </el-form>
        <el-tabs v-model="activeName" @tab-click="handleClick2">
          <el-tab-pane label="好评" name="好评"></el-tab-pane>
          <el-tab-pane label="差评" name="差评"></el-tab-pane>
        </el-tabs>
        <div style="margin-bottom: 10px; height: 20px; display: block">
          <el-pagination
            @current-change="handleCurrentChange2"
            :current-page.sync="comp2.current"
            layout="total, prev, pager, next"
            :page-size="5"
            :total="comp2.total"
            style="margin-bottom: 0">
          </el-pagination>
        </div>
          <el-card style="margin-bottom : 10px; width: 100%" v-for="(o, index) in comment" :key="o">
            <div style="font-size:15px;font-weight:bold;">
              <span>{{o.username}}</span>&nbsp;&nbsp;
              发表于&nbsp;&nbsp;
              <span>{{o.date}}</span>
            </div><hr>
            <p>{{o.content}}</p>
          </el-card>
      </div>

    </el-card>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  name: "TeacherDetailInfo",
  data() {
    return {
      dialogFormVisible: false,
      sendMail: {

      },
      addcomment: {
        comment: "",
        score: "好评"
      },
      comment: {

      },
      activeName: "好评",
      img: {
        url : ''
      },
      form: {
        introduction:'',
        name: '',
        email: '',
        score: null,
        age: null,
        gender: ""
      },
      comp: {
        current: 1,
        size: 5,
        total: 0
      },
      comp2: {
        current: 1,
        size: 5,
        total: 0
      },
      tab: {
        type: "高中",
      },
      table: []
    }
  },
  created() {
    this.getUser();
    this.getCourse(this.comp.current, this.comp.size, this.tab.type);
    this.getComment(1, 5, 1, this.$route.params.username);
  },
  methods: {
    sedMail() {
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
              to: this.form.uid
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
    submitComment() {
      this.$confirm('是否要评论？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var pdata = {
          username: localStorage.getItem("username"),
          content: this.addcomment.comment,
          tid: this.form.id,
          score: this.addcomment.score === "好评" ? 1 : -1,
        }
        this.$axios({
          method: 'post',
          url:this.HOME + '/teacherComment',
          data:JSON.stringify(pdata),
          headers: {
            'accessToken': localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
          }
        }).then((response) =>{
          this.addcomment.comment = "";
          if (response.data.status === 200) {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
          } else {
            this.$message.error(response.data.message);
          }
        }).catch((error) => {
          console.log(error)
        });
      });
    },
    handleCurrentChange2(val) {
      this.getComment(val, 5, this.activeName === "好评" ? 1 : -1, this.$route.params.username);
    },
    handleClick2(tab, event) {
      this.getComment(1, 5, tab.name === "好评" ? 1 : -1, this.$route.params.username)
    },
    getComment(cur, sz, score, username) {
      //alert(username);
      this.$axios({
        method:'get',
        url:this.HOME + '/teacherComment/',
        params: {
          username : this.$route.params.username,
          size: sz,
          current: cur,
          score: score
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.comment = response.data.result.ans.records;
          this.comp2.current = response.data.result.ans.current;
          this.comp2.size = response.data.result.ans.size;
          this.comp2.total = response.data.result.ans.total;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    seeCourseDetail(row) {
      this.$router.push("/scourse/"+row.id);
    },
    handleClick(tab, event) {
      console.log(tab)
      this.getCourse(1, 5, tab.name);
    },
    getUser() {
      this.$axios({
        method:'get',
        url:this.HOME + '/teacher/' + this.$route.params.username,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.form = response.data.result;
          if (response.data.result.avatorname !== null) {
            this.img.url = 'http://localhost:8004/vedios/'+response.data.result.avatorname;
          }else {
            this.img.url = 'static/error-page.png'
          }
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    handleCurrentChange(val) {
      this.getCourse(val, this.comp.size, this.tab.type)
    },
    getCourse(cur, size, type) {
      this.$axios({
        method:'post',
        url:this.HOME + '/teacher/courses',
        data : JSON.stringify({
          username : this.$route.params.username,
          size: size,
          current: cur,
          type: type
        }),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.table = response.data.result.ans.records;
          this.comp.current = response.data.result.ans.current;
          this.comp.size = response.data.result.ans.size;
          this.comp.total = response.data.result.ans.total;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  watch: {
    $route(to, from) {
      var pat = /^\/teacherDetailInfo\/.*$/;
      if (pat.test(to.path)) {
        this.getUser();
        this.getCourse(1, 5, this.tab.type);
        this.getComment(1, 5, 1, this.$route.params.username);
      }
    }
  }
}
</script>

<style scoped lang="less">
.ly-p1{
  display: flex;
  justify-content: space-between;
}
.user-title {
  padding-bottom: 15px;
  border-bottom: 2px solid @mainColor;
  margin: 15px 0 45px 0;
  color: #555;
  text-align: center;
  font-size: 30px;
}
</style>
