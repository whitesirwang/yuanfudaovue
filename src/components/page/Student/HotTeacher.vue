<template>
  <div>
    <h2 class="user-title">教师排行榜</h2>
    <el-row>
      <span style="font-size: xx-large; margin-left: 43%" :hidden="teachers.length > 0">暂无上榜老师</span>
      <el-col :span="22" v-for="(o, index) in teachers" :key="o">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-left: 70px; margin-bottom: 20px">
          <div slot="header" class="clearfix">
            <span style="font-size: x-large; color: red">{{index + 1}}</span>&nbsp;&nbsp;<span>{{o.teacher.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="getTeacherDetails(o.user)">查看详情</el-button>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form style="padding-left: 20px">
                <el-form-item label="性别" style="font-size: 20px">
                  {{o.teacher.gender}}
                </el-form-item>
                <el-form-item label="年龄" style="font-size: 20px">
                  {{o.teacher.age}}
                </el-form-item>
                <el-form-item label="票数" style="font-size: 20px">
                  {{o.teacher.vote}}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form>
                <el-form-item label="好评率" style="font-size: 20px">
                  <el-progress type="circle" :percentage="Math.floor(o.teacher.rate * 100)"></el-progress>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HotTeacher",
  data() {
    return {
      teachers: []
    }
  },
  methods:{
    getTeacherDetails(row) {
      this.$router.push('/teacherDetailInfo/' + row.username);
    },
    getHotTeachers() { //得到热榜老师
      this.$axios({
        method: 'get',
        url:this.HOME + '/vote/gethot',
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          console.log(response.data.result.ans);
          this.teachers = response.data.result.ans;
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  created() {
    this.getHotTeachers();
  },
  watch: {

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
