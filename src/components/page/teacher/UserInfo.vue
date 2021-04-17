<template>
  <el-card>
    <el-row>
      <el-col span="12">
        <el-form ref="form" :model="form" label-width="40px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.gender" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            {{form.email}}
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" disabled></el-input>
          </el-form-item>
          <el-form-item label="自我介绍">
            <el-input type="textarea" v-model="form.introduction"></el-input>
          </el-form-item>
          <el-form-item label="评分">
            {{form.score}}
          </el-form-item>
          <el-form-item label="头像上传">
            <el-upload
              class="upload-demo"
              :action="upload.url"
              :file-list="upload.fileList"
              :on-success="handleSuccess"
              :limit="1">
              <el-button size="small" type="primary">上传文件</el-button>
              <div slot="tip" class="el-upload__tip">(提示）只能上传jpg/png文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUser">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col span="12">
        <img :src="img.url" width="100%" height="500">
      </el-col>
    </el-row>

  </el-card>
</template>

<script>
export default {
  name: "TeacherInfo",
  data() {
    return {
      upload : {
        url : this.HOME + "/upload",
        fileList :[]
      },
      img : {
        url : '',
      },
      form: {
        introduction:'',
        name: '',
        email: '',
        score: '',
        age: '',
        gender: '',
        avatorname: ''
      }
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios({
        method:'get',
        url:this.HOME + '/teacher/' + localStorage.getItem("username"),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.form = response.data.result;
          this.img.url = 'http://localhost:8004/vedios/' + response.data.result.avatorname;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    handleSuccess(response, file, fileList) {
        if (response.status === 200) {
          this.img.url = 'http://localhost:8004/vedios/' + response.result.name;
          this.form.avatorname = response.result.name;
          this.updateUser();
        } else {
          alert(response.data.message);
        }
    },
    updateUser() {
      this.$axios({
        method: 'put',
        url:this.HOME + '/teacher/update',
        data:JSON.stringify(this.form),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          alert("上传成功");
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
