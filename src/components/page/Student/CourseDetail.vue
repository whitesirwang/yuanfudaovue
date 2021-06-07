<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <h2 class="user-title">{{form.title}}</h2>
      <video-player
                           ref="videoPlayer"
                           :playsinline="true"
                           :options="playerOptions"
                           class="video-player vjs-custom-skin">

      </video-player>
     <p style="font-size: large">
       {{form.introduction}}
     </p>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <h2 class="user-title">课程课件</h2>
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
            <el-button @click="downloadKejian(scope.row)" type="text" size="medium">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <h2 class="user-title">课后习题</h2>
      <el-table
        :data="homework"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          label="名称">
        </el-table-column>
        <el-table-column
          label="开始日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.starttime}}</span>
          </template>
        </el-table-column>
        <el-table-column
        label="截止日期">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.ddl}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="seeHomeworkDetail(scope.row)" type="text" size="medium">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StudentCourseDetail",
  data() {
    return {
      homework: {

      },
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: 'auto',
        language: 'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: '16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [{
          //类型
          type: "video/mp4",
          //url地址
          src: ""
        }],
        //你的封面地址
        poster: '',
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true
        }
      },
      form: {
        introduction: '开门红fdsafdsafdsafdsafdsfsdfsdafdsafsadfdsfdsfsdafdsagdsa',
      },
      kejian: {
        realname: '',
      },
      vedio: {
      },
    }
  },
  methods: {
    getHomework() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/homework/gethomework/'+ this.$route.params.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          if (response.data.result.ans.homework !== null) {
            this.homework = [response.data.result.ans.homework];
          }
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    seeHomeworkDetail(row) {
      this.$router.push("/shomeworktype/" + row.id);
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
          this.playerOptions.sources[0].src = "http://121.4.21.154:8004/vedios/" + response.data.result.ans.file.url;
          this.vedio = response.data.result.ans.file;
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
      }).catch((error) => {
        console.log(error)
      });
    },
    downloadKejian(row) {
      var fileurl = this.DHOME + '/vedios/' + row.url;
      var x = new XMLHttpRequest();
      x.open("GET", fileurl, true);
      x.responseType = "blob";
      let that = this;
      x.onprogress = function(event) {
        //在这里监听文件下载的进度
      };
      x.onload = function(e) {
        var url = window.URL.createObjectURL(x.response);
        var a = document.createElement("a");
        a.href = url;
        a.download = row.realname; //可以填写默认的下载名称
        a.click();
      };
      x.send();
    }
  },
  created() {
    this.getbase();
    this.getkejian();
    this.getHomework();
  },
  watch: {
    $route(to, from) {
      var pat = /^\/scourseDetail\/.*$/;
      if (pat.test(to.path)) {
        this.getbase();
        this.getkejian();
        this.getHomework();
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
