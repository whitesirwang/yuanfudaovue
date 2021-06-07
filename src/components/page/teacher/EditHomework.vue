<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <h2 class="user-title">作业信息</h2>
      <el-form :model="homework">
        <el-form-item label="标题" style="width: 1000px">
          <el-input v-model="homework.title"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="homework.starttime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="homework.ddl"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="addHomework">确定修改</el-button>
    </el-card>
    <el-card>
      <h2 class="user-title">作业大纲</h2>
      <el-row>
        <el-col :span="8">
          <el-button type="primary" @click="dialogFormVisible1 = true">添加单选题</el-button>
          <el-dialog title="添加单选题" :visible.sync="dialogFormVisible1">
            <el-form :model="sigproblem" :rules="SigProblemrules" ref="sigproblem">
              <el-form-item label="题目" required prop="content">
                <el-input type="textarea" v-model="sigproblem.content"></el-input>
              </el-form-item>
              <el-form-item label="选项A" required prop="a">
                <el-input v-model="sigproblem.a"></el-input>
              </el-form-item>
              <el-form-item label="选项B" required prop="b">
                <el-input v-model="sigproblem.b"></el-input>
              </el-form-item>
              <el-form-item label="选项C" required prop="c">
                <el-input v-model="sigproblem.c"></el-input>
              </el-form-item>
              <el-form-item label="选项D" required prop="d">
                <el-input v-model="sigproblem.d"></el-input>
              </el-form-item>
              <el-form-item label="分值" required prop="score">
                <el-input-number v-model="sigproblem.score" :min="1" :max="10"></el-input-number>
              </el-form-item>
              <el-form-item label="答案" required prop="ans">
                <el-radio-group v-model="sigproblem.ans">
                  <el-radio label="A"></el-radio>
                  <el-radio label="B"></el-radio>
                  <el-radio label="C"></el-radio>
                  <el-radio label="D"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="addSigProblem('sigproblem')">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="dialogFormVisible2 = true">添加多选题</el-button>
          <el-dialog title="添加多选题" :visible.sync="dialogFormVisible2">
            <el-form :model="multiproblem" :rules="MultiProblemrules" ref="multiproblem">
              <el-form-item label="题目" required prop="content">
                <el-input type="textarea" v-model="multiproblem.content"></el-input>
              </el-form-item>
              <el-form-item label="选项A" required prop="a">
                <el-input v-model="multiproblem.a"></el-input>
              </el-form-item>
              <el-form-item label="选项B" required prop="b">
                <el-input v-model="multiproblem.b"></el-input>
              </el-form-item>
              <el-form-item label="选项C" required prop="c">
                <el-input v-model="multiproblem.c"></el-input>
              </el-form-item>
              <el-form-item label="选项D" required prop="d">
                <el-input v-model="multiproblem.d"></el-input>
              </el-form-item>
              <el-form-item label="分值" required prop="score">
                <el-input-number v-model="multiproblem.score" :min="1" :max="10"></el-input-number>
              </el-form-item>
              <el-form-item label="答案" required prop="ans">
                <el-checkbox-group v-model="multiproblem.ans">
                  <el-checkbox label="A"></el-checkbox>
                  <el-checkbox label="B"></el-checkbox>
                  <el-checkbox label="C"></el-checkbox>
                  <el-checkbox label="D"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="addMultiProblem('multiproblem')">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="dialogFormVisible3 = true">添加是非题</el-button>
          <el-dialog title="添加是非题" :visible.sync="dialogFormVisible3">
            <el-form :model="torfproblem" :rules="TorfProblemrules" ref="torfproblem">
              <el-form-item label="题目" required prop="content">
                <el-input type="textarea" v-model="torfproblem.content"></el-input>
              </el-form-item>
              <el-form-item label="分值" required prop="score">
                <el-input-number v-model="torfproblem.score" :min="1" :max="10"></el-input-number>
              </el-form-item>
              <el-form-item label="答案" required prop="ans">
                <el-radio-group v-model="torfproblem.ans">
                  <el-radio label="T"></el-radio>
                  <el-radio label="F"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="addTorFProblem('torfproblem')">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <el-table
        :data="homeworktype"
        border
        style="width: 100%;">
        <el-table-column
          prop="typename"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="cnt"
          label="题目总数">
        </el-table-column>
        <el-table-column
          prop="total"
          label="总分值">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="seeTypeDetail(scope.row)" type="text" size="medium">查看题目</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-upload
        class="upload-demo"
        :action="upload.url"
        :file-list="upload.fileList"
        :on-success="handleSuccess"
        :before-upload="beforeExcelUpload"
        :limit="5"
        :show-file-list="true">
        <el-button size="small" type="primary">解析excel文件</el-button>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "EditHomework",
  data() {
    return {
      upload: {
        url: this.HOME + "/upload",
        fileList: []
      },
      homework: {

      },
      homeworktype: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      sigproblem: {

      },
      multiproblem: {
        ans: []
      },
      torfproblem: {

      },
      SigProblemrules: {
        content: [{ required: true, message: '请填写', trigger: 'blur' },],
        a: [{ required: true, message: '请填写', trigger: 'blur' },],
        b: [{ required: true, message: '请填写', trigger: 'blur' },],
        c: [{ required: true, message: '请填写', trigger: 'blur' },],
        d: [{ required: true, message: '请填写', trigger: 'blur' },],
        ans: [{ required: true, message: '请填写', trigger: 'blur' },],
        score: [{ required: true, message: '请填写', trigger: 'blur' },],
      },
      MultiProblemrules: {
        content: [{ required: true, message: '请填写', trigger: 'blur' },],
        a: [{ required: true, message: '请填写', trigger: 'blur' },],
        b: [{ required: true, message: '请填写', trigger: 'blur' },],
        c: [{ required: true, message: '请填写', trigger: 'blur' },],
        d: [{ required: true, message: '请填写', trigger: 'blur' },],
        ans: [{ required: true, message: '请填写', trigger: 'blur' },],
        score: [{ required: true, message: '请填写', trigger: 'blur' },],
      },
      TorfProblemrules: {
        content: [{ required: true, message: '请填写', trigger: 'blur' },],
        ans: [{ required: true, message: '请填写', trigger: 'blur' },],
        score: [{ required: true, message: '请填写', trigger: 'blur' },],
      }
    }
  },
  methods: {
    beforeExcelUpload(file) {
      console.log(file);
      var FileExt = file.name.replace(/.+\./, "");
      const isJPG = 'xlsx' === FileExt.toLowerCase();
      const isLt2M = file.size / 1024 / 1024 < 100;
      if (!isJPG) {
        this.$message.error('上传文件只能是 xlsx 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 100MB!');
      }
      return isJPG && isLt2M;
    },
    handleSuccess(response, file, fileList) {
      if (response.status === 200) {
        this.addExcel(response.result.name);
      } else {
        this.$message.error(response.data.message);
      }
    },
    addExcel(filename) {
      this.$axios({
        method: 'post',
        url:this.HOME + '/homeworkdetail/addhomeworkdetailfromexcel',
        data: JSON.stringify({
          hid: this.$route.params.id,
          filename: filename
        }),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message.success("解析成功");
          this.getHomeworkType();
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    addHomework() {
      this.$axios({
        method: 'put',
        url:this.HOME + '/homework/updatehomework',
        data: JSON.stringify(this.homework),
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.$message.success("更改成功");
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    getHomework() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/homework/gethomeworkinfo/'+ this.$route.params.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
            this.homework = response.data.result.ans;
        } else {
          this.$message.error(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    addTorFProblem(ruleFrom) {
      this.$refs[ruleFrom].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url:this.HOME + '/homeworkdetail/addhomeworkdetail',
            data: JSON.stringify({
              type: 2,
              content: this.torfproblem.content,
              ans: this.torfproblem.ans,
              score: this.torfproblem.score,
              hid: this.$route.params.id
            }),
            headers: {
              'accessToken': localStorage.getItem("accessToken"),
              'Content-Type': 'application/json'
            }
          }).then((response) =>{
            if (response.data.status === 200) {
              this.$message.success("添加成功");
              this.sigproblem = {};
              this.dialogFormVisible3 = false;
              //this.dialogFormVisible2 = false;
              this.getHomeworkType();
            } else {
              alert(response.data.message);
            }
          }).catch((error) => {
            console.log(error)
          });
        }
      });
    },
    addMultiProblem(ruleFrom) {
     // console.log(ruleFrom);
      this.$refs[ruleFrom].validate((valid) => {
          var pdata = {
            type: 1,
            ans: "",
            content: this.multiproblem.content,
            a: this.multiproblem.a,
            b: this.multiproblem.b,
            c: this.multiproblem.c,
            d: this.multiproblem.d,
            score: this.multiproblem.score,
            hid: this.$route.params.id
          };
          for (let i = 0; i < this.multiproblem.ans.length; ++i) {
            pdata['ans'] += this.multiproblem.ans[i];
          }
          if (valid) {
            this.$axios({
              method: 'post',
              url:this.HOME + '/homeworkdetail/addhomeworkdetail',
              data: JSON.stringify(pdata),
              headers: {
                'accessToken': localStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
              }
            }).then((response) =>{
              if (response.data.status === 200) {
                this.$message.success("添加成功");
                this.multiproblem = {
                  ans: []
                };
                this.dialogFormVisible2 = false;
                this.getHomeworkType();
              } else {
                alert(response.data.message);
              }
            }).catch((error) => {
              console.log(error)
            });
          }
      });
    },
    addSigProblem(ruleFrom) {
      this.$refs[ruleFrom].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.$axios({
            method: 'post',
            url:this.HOME + '/homeworkdetail/addhomeworkdetail',
            data: JSON.stringify({
              type: 0,
              content: this.sigproblem.content,
              ans: this.sigproblem.ans,
              a: this.sigproblem.a,
              b: this.sigproblem.b,
              c: this.sigproblem.c,
              d: this.sigproblem.d,
              score: this.sigproblem.score,
              hid: this.$route.params.id
            }),
            headers: {
              'accessToken': localStorage.getItem("accessToken"),
              'Content-Type': 'application/json'
            }
          }).then((response) =>{
            if (response.data.status === 200) {
              this.$message.success("添加成功");
              this.sigproblem = {};
              this.dialogFormVisible1 = false;
              //this.dialogFormVisible2 = false;
              this.getHomeworkType();
            } else {
              alert(response.data.message);
            }
          }).catch((error) => {
            console.log(error)
          });
        }
      });
    },
    seeTypeDetail(row) {
      if (row.type === 0) {
        this.$router.push("/teditsig/" + this.$route.params.id);
      } else if (row.type === 1) {
        this.$router.push("/teditmulti/" + this.$route.params.id);
      } else {
        this.$router.push("/tedittorf/" + this.$route.params.id);
      }
    },
    getHomeworkType() {
      this.$axios({
        method: 'get',
        url:this.HOME + '/homeworkdetail/gethomeworktype/'+ this.$route.params.id,
        headers: {
          'accessToken': localStorage.getItem("accessToken"),
        }
      }).then((response) =>{
        if (response.data.status === 200) {
          this.homeworktype = response.data.result.ans;
        } else {
          alert(response.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  created() {
    this.getHomeworkType();
    this.getHomework();
  },
  watch: {
    $route(to, from) {
      var pat = /^\/tedithomework\/.*$/;
      if (pat.test(to.path)) {
        this.getHomeworkType();
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
