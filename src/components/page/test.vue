<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="upload.url"
      :file-list="upload.fileList"
      :limit="1">
      <el-button size="small" type="primary">上传文件</el-button>
      <div slot="tip" class="el-upload__tip">(提示）只能上传jpg/png文件</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      upload: {
        fileList: [],
        url: this.HOME + "/upload"
      }
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
.demo{
  display: inline-block;
  width: 600px;
  height: 338px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  margin-right: 4px;
}

.demo:hover{
  display: block;
}


</style>
