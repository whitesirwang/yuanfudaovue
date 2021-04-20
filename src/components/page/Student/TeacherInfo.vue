<template>
  <div>
    <el-card>
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
            <el-form-item label="邮箱">
              {{form.email}}
            </el-form-item>
            <el-form-item label="年龄">
              {{form.age}}
            </el-form-item>
            <el-form-item label="自我介绍">
              {{form.introduction}}
            </el-form-item>
            <el-form-item label="评分">
              {{form.score}}
            </el-form-item>
          </el-form>
        </el-col>
        <el-col span="12">
          <img :src="img.url" width="100%" height="500">
        </el-col>
      </el-row>

    </el-card>
    <el-card>
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
          prop="cnt"
          label="选课人数">
        </el-table-column>
        <el-table-column
          prop="score"
          label="评分"
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
  </div>

</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
export default {
  name: "TeacherDetailInfo",
  data() {
    return {
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
      tab: {
        type: "高中",
      },
      table: []
    }
  },
  created() {
    this.getUser();
    this.getCourse(this.comp.current, this.comp.size, this.tab.type);
  },
  methods: {
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
          this.img.url = 'http://localhost:8004/vedios/'+response.data.result.avatorname;
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
