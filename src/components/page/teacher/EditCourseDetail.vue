<template>
  <div>
    <el-card>
      <h2>基本信息修改</h2>
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="教学视频上传">
          <el-upload
            class="upload-demo"
            :action="vupload.url"
            :file-list="vupload.fileList"
            :on-success="handlevSuccess"
            :limit="1"
            :show-file-list="false">
            <el-button size="small" type="primary">上传视频</el-button>
          </el-upload>
          <el-table
            :data="vedio"
            border
            style="width: 100%">
            <el-table-column
              prop="realname"
              label="视频文件名">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="deleteKejian(scope.row)" type="text" size="medium">删除视频</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateCourseDetail">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <h2>课件上传</h2>
      <el-form>
        <el-form-item label="课件上传">
          <el-upload
            class="upload-demo"
            :action="kejianupload.url"
            :file-list="kejianupload.fileList"
            :on-success="handleKejianSuccess"
            :limit="5"
            :show-file-list="false">
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
  },
  methods: {
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
          this.vedio = [response.data.result.ans.file];
        } else {
          alert(response.data.message);
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
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    handleKejianSuccess(response, file, fileList) {
      if (response.status === 200) {
        this.addkejian(response.result.name);
      } else {
        alert(response.data.message);
      }
    },
    handlevSuccess(response, file, fileList) {
      if (response.status === 200) {
        this.form.vurl = response.result.name;
      } else {
        alert(response.data.message);
      }
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
          alert("上传成功");
          this.getkejian();
        } else {
          alert(response.data.message);
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
          vurl: this.form.vurl,
          introduction: this.form.introduction,
          title: this.form.title
        }),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          alert("跟新成功");
          this.getkejian();
          this.getbase();
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  watch: {

  }
}
</script>

<style scoped>

</style>
