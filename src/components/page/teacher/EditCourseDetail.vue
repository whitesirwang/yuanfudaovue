<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <h2 class="user-title">基本信息修改</h2>
      <el-form ref="form" :model="form" label-width="40px" label-position="top">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateCourseDetail">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-tabs v-model="tab.courseDetail">
      <el-tab-pane label="课件" name="课件"></el-tab-pane>
      <el-tab-pane label="视频" name="视频"></el-tab-pane>
    </el-tabs>
    <el-card style="margin-bottom: 20px" :hidden="tab.courseDetail === '课件'">
      <h2 class="user-title">教学视频上传</h2>
      <el-form label-position="top">
        <el-form-item label="教学视频上传">
          <el-upload
            class="upload-demo"
            :action="vupload.url"
            :file-list="vupload.fileList"
            :on-success="handlevSuccess"
            :limit="1"
            :show-file-list="true">
            <el-button size="small" type="primary">上传视频</el-button>
          </el-upload>
          <el-table
            :data="vedio"
            border
            style="width: 100%" >
            <el-table-column
              prop="realname"
              label="视频文件名">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="deleteVedio" type="text" size="medium">删除视频</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card :hidden="tab.courseDetail === '视频'">
      <h2 class="user-title">课件上传</h2>
      <el-form label-position="top">
        <el-form-item label="课件上传" >
          <el-upload
            class="upload-demo"
            :action="kejianupload.url"
            :file-list="kejianupload.fileList"
            :on-success="handleKejianSuccess"
            :limit="5"
            :show-file-list="true">
            <el-button size="small" type="primary">上传课件</el-button>
          </el-upload>
          <el-table
            :data="kejian"
            border
            style="width: 100%">
            <el-table-column
              prop="realname"
              label="课件名">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="deleteKejian(scope.row)" type="text" size="medium">删除课件</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EditCourseDetail",
  data() {
    return {
      tab: {
        courseDetail: ""
      },
      form: {

      },
      kejianupload : {
        url : this.HOME + "/upload",
        fileList :[]
      },
      kejian: {
        realname: '',

      },
      vedio: {

      },
      vupload: {
        url : this.HOME + "/upload",
        fileList :[]
      }
    }
  },
  created() {
    this.getbase();
    this.getkejian();
    this.getvedio();

  },
  methods: {
    deleteVedio() {
      this.$confirm('是否要删除视频?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.$axios({
        method: 'delete',
        url:this.HOME + '/deletevedio/'+ this.form.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          alert("删除成功");
          this.getvedio();
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      })});
    },
    deleteKejian(row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.$axios({
        method: 'delete',
        url:this.HOME + '/kejian/delete/'+ row.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.getkejian();
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      })
      });
    },
    getbase() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/getcourseDetail/'+ this.$route.params.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.form = response.data.result.ans.courseDetail;
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    getvedio() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/getcourseDetail/'+ this.$route.params.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          if (response.data.result.ans.file === null) {
            this.vedio = [];
          } else {
            this.vedio = [response.data.result.ans.file];
          }
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    getkejian() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/kejian/get/'+ this.$route.params.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.kejian = response.data.result.ans;
        } else {
          this.$message.error(response.data.message);
        }
       this.tab.courseDetail = '视频';
      }).catch((error) => {
        console.log(error)
      });
    },
    handleKejianSuccess(response, file, fileList) {
      if (response.status === 200) {
        this.addkejian(response.result.name);
      } else {
        this.$message.error(response.data.message);
      }
    },
    handlevSuccess(response, file, fileList) {
      if (response.status === 200) {
        this.form.vurl = response.result.name;
        this.updatevedio();
      } else {
        this.$message.error(response.data.message);
      }
    },
    updatevedio() {
      this.$axios({
        method: 'put',
        url:this.HOME + '/updatevedio',
        data:JSON.stringify({
          cdid: this.$route.params.id,
          vurl: this.form.vurl
        }),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message({
            message: '上传成功！',
            type: 'success'
          });
          this.getvedio();
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    addkejian(name) {
      this.$axios({
        method: 'post',
        url:this.HOME + '/kejian/add',
        data:JSON.stringify({
          cdid: this.$route.params.id,
          name: name
        }),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message({
            message: '上传成功！',
            type: 'success'
          });
          this.getkejian();
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    updateCourseDetail() {
      this.$axios({
        method: 'put',
        url:this.HOME + '/courseDetail',
        data:JSON.stringify({
          cdid: this.$route.params.id,
          introduction: this.form.introduction,
          title: this.form.title
        }),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message({
            message: '更新成功！',
            type: 'success'
          });
          this.getbase();
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  watch: {
    $route(to, from) {
      var pat = /^\/editcoursedetail\/.*$/;
      if (pat.test(to.path)) {
        this.getbase();
        this.getvedio()
        this.getkejian();
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
