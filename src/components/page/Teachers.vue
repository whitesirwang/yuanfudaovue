<template>
  <div>
    <el-table
      :data="teachers"
      style="width: 100%"
      border="true">
      <el-table-column
        prop="name"
        label="教师姓名"
       >
      </el-table-column>
      <el-table-column
        label="详细信息"
        >
        <template slot-scope="scope">
          <el-button type="primary" plain @click="getTeacherDetails(scope.row)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="评分"
      >
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.score"
            show-text
            disabled
            score-template="{form.score}"
          >
          </el-rate>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teachers: [
        {
          username: "",
          name: "王",
          score: 4
        }
      ]
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getTeacherDetails(row) {
      //localStorage.setItem("teacherusername", row.username);
      this.$router.push('/teacherDetailInfo/' + row.username);
    },
    getUsers() {
      this.$axios({
        method:'get',
        url:this.HOME + '/teachers',
      }).then((response) =>{
        if (response.data.status === 200) {
          this.teachers = response.data.result.ans;
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

<style>
</style>
