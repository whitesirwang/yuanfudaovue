<template>
  <el-card>
    <h2 class="user-title">个人信息</h2>
    <el-row>
      <el-col span="12">
        <el-form ref="form" :model="form" label-width="40px" label-position="top">
          <el-form-item label="姓名">
            <el-input v-model="form.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.gender" disabled></el-input>
          </el-form-item>
          <el-form-item label="QQ邮箱">
            <el-input v-model="form.email" show-word-limit maxlength="10" style="width: 600px"></el-input>@qq.com
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" disabled></el-input>
          </el-form-item>
          <el-form-item label="自我介绍">
            <el-input type="textarea" show-word-limit maxlength="30" v-model="form.introduction"></el-input>
          </el-form-item>
          <el-form-item label="好评率">
            <el-progress type="circle" :percentage="Math.floor(form.rate * 100)"></el-progress>
          </el-form-item>
          <el-form-item label="头像上传">
            <el-upload
              class="upload-demo"
              :action="upload.url"
              :file-list="upload.fileList"
              :on-success="handleSuccess"
              :before-upload="beforeAvatarUpload"
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
        <img :src="img.url" width="100%" height="600">
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
      },
      formRules: [

      ]
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
          if (response.data.result.avatorname !== null) {
            this.img.url = 'http://121.4.21.154:8004/vedios/'+response.data.result.avatorname;
          }else {
            this.img.url = 'static/error-page.png'
          }
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    handleSuccess(response, file, fileList) {
        if (response.status === 200) {
          this.img.url = 'http://121.4.21.154:8004/vedios/' + response.result.name;
          this.form.avatorname = response.result.name;
          this.updateUser();
        } else {
          this.$message.error(response.data.message);
        }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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
          this.$message({
            message: '上传成功！',
            type: 'success'
          });
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  watch:{
    $route(to, from) {
      var pat = /^\/tmain$/;
      if (pat.test(to.path)) {
        this.getUser();
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
