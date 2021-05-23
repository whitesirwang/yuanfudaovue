<template>
  <div>
    <el-card>
      <h2 class="user-title">邮件信息</h2>
      <el-form ref="form" :model="Mail" label-width="80px" label-position="top">
        <el-form-item label="标题">
          {{Mail.mail.title}}
        </el-form-item>
        <el-form-item label="正文">
          {{Mail.mail.content}}
        </el-form-item>
        <el-form-item label="发件人">
          {{Mail.from}}
        </el-form-item>
        <el-form-item label="收件人">
          {{Mail.to}}
        </el-form-item>
        <el-form-item label="时间">
          {{Mail.mail.date}}
        </el-form-item>
        <el-form-item label="所回复的邮件">
          <el-button type="primary" @click="seeRet(Mail.mail.reply)">查看回复</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SeeMail",
  data() {
    return {
      Mail: {

      }
    }
  },
  created() {
    this.getMail();
  },
  methods: {
    seeRet(ret) {
      if (ret === -1) {
        this.$message.error("没有回复任何内容");
      } else {
        this.$router.push("/smaildetail/" + ret);
      }
    },
    getMail() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/mail/checkusermail/' + this.$route.params.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken")
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.Mail = response.data.result.ans;
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
      var pat = /^\/smaildetail\/.*$/;
      if (pat.test(to.path)) {
        this.getMail();
      }
    }
  }
}
</script>

<style scoped lang="less">
.ly-p1{
  display: flex;
  justify-content: space-between;
}
.user-title {
  padding-bottom: 15px;
  border-bottom: 2px solid @mainColor;
  margin: 15px 0 45px 0;
  color: #555;
  text-align: center;
  font-size: 30px;
}
</style>
