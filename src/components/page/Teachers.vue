<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="comp.current"
        layout="total, prev, pager, next"
        :page-size="5"
        :total="comp.total"
        style="margin-bottom: 0">
      </el-pagination>
      <el-input placeholder="搜索教师名称" v-model="search" style="width: 30%">
        <el-button slot="append" icon="el-icon-search" @click="getUsers(1,5, search)"></el-button>
      </el-input>
    </div>
    <div>
      <el-row>
        <el-col :span="8" v-for="(o, index) in teachers" :key="o" >
          <el-card :body-style="{ padding: '0px' }">
            <div slot="header" class="clearfix">
              <span>{{o.name}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="getTeacherDetails(o)">查看详情</el-button>
            </div>
              <el-form style="padding-left: 20px">
                <el-form-item label="性别" style="font-size: 20px">
                  {{o.gender}}
                </el-form-item>
                <el-form-item label="评分" style="font-size: 20px">
                  {{o.score}}
                </el-form-item>
                <el-form-item label="年龄" style="font-size: 20px">
                  {{o.age}}
                </el-form-item>
              </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      teachers: [],
      comp: {
        total: 0,
        size: 0,
        current: 1
      }
    };
  },
  created() {
    this.getUsers(1, 5);
  },
  methods: {
    getTeacherDetails(row) {
      localStorage.setItem("teacherUserName", row.username);
      this.$router.push('/teacherDetailInfo');
    },
    getUsers(cur, siz, search='') {
      this.$axios({
        method: 'get',
        url: this.HOME + '/teachers',
        params: {
          current: cur,
          size: siz,
          name: search
        }
      }).then((response) => {
        if (response.data.status === 200) {
          this.teachers = response.data.result.ans.records;
          this.comp.total = response.data.result.ans.total;
          this.comp.size = response.data.result.ans.size;
          this.comp.current = response.data.result.ans.current;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    handleCurrentChange(val) {
      this.getUsers(val, 5);
    }
  }
}
</script>

<style scoped lang="less">
.header-portrait {
.circle(40px);
  margin: 0 20px;
  vertical-align: middle;
}
</style>
