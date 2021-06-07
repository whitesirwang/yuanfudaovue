<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="comp.current"
        layout="total, prev, pager, next"
        :page-size="6"
        :total="comp.total"
        style="margin-bottom: 0">
      </el-pagination>
      <el-input placeholder="搜索教师名称" v-model="search" style="width: 30%">
        <el-button slot="append" icon="el-icon-search" @click="getUsers(1,6, search)"></el-button>
      </el-input>
    </div>
    <div>
      <el-row>
        <el-col :span="7" v-for="(o, index) in teachers" :key="o" :offset="index % 3 > 0 ? 1 : 0" style="margin-bottom: 20px">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{o.name}}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="getTeacherDetails(o)">查看详情</el-button>
            </div>
              <el-form style="padding-left: 20px">
                <el-form-item label="性别" style="font-size: 20px">
                  {{o.gender}}
                </el-form-item>
                <el-form-item label="好评率" style="font-size: 20px">
                  <el-progress type="circle" :percentage="Math.floor(o.rate * 100)"></el-progress>
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
    this.getUsers(1, 6);
  },
  methods: {
    getTeacherDetails(row) {
      this.$router.push('/teacherDetailInfo/' + row.username);
    },
    getUsers(cur, siz, search='') {
      this.$axios({
        method: 'get',
        url: this.HOME + '/teachers',
        params: {
          current: cur,
          size: siz,
          name: search
        },
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) => {
        if (response.data.status === 200) {
          this.teachers = response.data.result.ans.records;
          this.comp.total = response.data.result.ans.total;
          this.comp.size = response.data.result.ans.size;
          this.comp.current = response.data.result.ans.current;
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    handleCurrentChange(val) {
      this.getUsers(val, 6);
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
