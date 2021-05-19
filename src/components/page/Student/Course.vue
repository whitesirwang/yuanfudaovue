<template>
  <div>
    <el-card>
      <h2>课程信息</h2>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="课程名">
          {{form.course.name}}
        </el-form-item>
        <el-form-item label="课程名">
          {{form.course.type}}
        </el-form-item>
        <el-form-item label="课程简介">
         {{form.course.introduction}}
        </el-form-item>
        <el-form-item label="讲课老师">
          {{form.teacher.name}}
        </el-form-item>
        <el-form-item label="选课人数">
          {{form.course.cnt}}
        </el-form-item>
        <el-form-item label="好评率">
          <el-progress type="circle" :percentage="Math.floor(form.course.rate * 100)"></el-progress>
        </el-form-item>
        <el-button type="primary" @click="selectCourse">我要选此课程</el-button>
      </el-form>
    </el-card>
    <el-table
      :data="courseDetail"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        prop="title"
        label="课时名">
      </el-table-column>
      <el-table-column
      label="更新时间"
      prop="date">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="seeCourseDetail(scope.row)" type="text" size="medium">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        <el-card style="width: 100%" v-for="(o, index) in comment" :key="o">
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
export default {
  name: "StudentCourse",
  data() {
    return {
      addcomment: {
        comment: "",
        score: ""
      },
      comment: {

      },
      activeName: "好评",
      comp2: {
        current: 1,
        size: 5,
        total: 0
      },
      form: {
        teacher: {

        },
        course: {

        }
      },
      courseDetail: [{
        id: 1,
        cid: 2,
        title: "第一节课",
        introduction: "开门红",
        vid: 22,
        fid: 19,
        date: "2021-04-15T10:43:56.000+0000",
        cntt: 0
      }]
    }
  },
  created() {
    this.getCourseDetail();
    this.getComment(1, 5, this.activeName === "好评" ? 1 : -1);
  },
  methods: {

    submitComment() {
      this.$confirm('是否要评论？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var pdata = {
          content: this.addcomment.comment,
          cid: this.$route.params.id,
          score: this.addcomment.score === "好评" ? 1 : -1,
        }
        this.$axios({
          method: 'post',
          url:this.HOME + '/courseComment',
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
      this.getComment(val, 5, this.activeName === "好评" ? 1 : -1);
    },
    handleClick2(tab, event) {
      this.getComment(1, 5, tab.name === "好评" ? 1 : -1)
    },
    getComment(cur, sz, score) {
      //alert(username);
      this.$axios({
        method:'get',
        url:this.HOME + '/courseComment/',
        params: {
          size: sz,
          current: cur,
          score: score,
          cid: this.$route.params.id
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

    indexMethod(index) {
      return index+1;
    },
    getCourseDetail() {
      this.$axios({
        method:'get',
        url:this.HOME + '/courseDetail/' + this.$route.params.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.form.teacher = response.data.result.ans.teacher;
          this.form.course = response.data.result.ans.course;
          this.form.course.cnt = response.data.result.ans.cnt;
          this.courseDetail = response.data.result.ans.courseDetail;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    seeCourseDetail(row) {
      this.$router.push("/scourseDetail/"+row.id);
    },
    selectCourse() {
      this.$confirm('是否要选课?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method:'post',
          url:this.HOME + '/course/selectCourse',
          data : JSON.stringify({
            username : localStorage.getItem("username"),
            cid: this.form.course.id
          }),
          headers: {
            'accessToken': localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
          }
        }).then((response) =>{
          if (response.data.status === 200) {
            this.$message({
              type: 'success',
              message: '选课成功!'
            });
          } else {
            this.$message.error(response.data.message);
          }
        }).catch((error) => {
          console.log(error)
        });
      });
    }
  },
  watch: {
    $route(to, from) {
      var pat = /^\/scourse\/.*$/;
      if (pat.test(to.path)) {
        this.getCourseDetail();
        this.getComment(1, 5, 1);
      }
    }
  }
}
</script>

<style scoped>

</style>
