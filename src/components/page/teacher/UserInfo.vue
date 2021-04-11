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
          <el-form-item>
            <el-button type="primary" @click="updateUser">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col span="12">
        <el-upload
          style="display: inline"
          :show-file-list="false"
          :on-success="onSuccess"
          :on-error="onError"
          :before-upload="beforeUpload"
          :action=upload.url>
          <el-button size="mini" type="success">上传</el-button>
        </el-upload>
        <img :src="img.url">
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
        url : this.HOME + "/uploadAvator",
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
        gender: ''
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
        url:this.HOME + '/teacher/' + localStorage.getItem("username")
      }).then((response) =>{
        if (response.data.status === 200) {
          this.form = response.data.result;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    updateUser() {
      this.$axios({
        method: 'put',
        url:this.HOME + '/teacher',
        data:JSON.stringify({
          introduction: this.form.introduction
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {

        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    onSuccess(response, file, fileList) {
      this.enabledUploadBtn = true;
      this.uploadBtnIcon = 'el-icon-upload2';
      this.btnText = '数据导入';
    },
    onError(err, file, fileList) {
      this.enabledUploadBtn = true;
      this.uploadBtnIcon = 'el-icon-upload2';
      this.btnText = '数据导入';
    },
    beforeUpload(file) {
      this.enabledUploadBtn = false;
      this.uploadBtnIcon = 'el-icon-loading';
      this.btnText = '正在导入';
    }
  }
}
</script>

<style scoped>

</style>
