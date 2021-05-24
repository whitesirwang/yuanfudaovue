<template>
  <div>
    <el-card>
      <h2 class="user-title">多选题</h2>
      <el-card v-for="(o, index) in problems">
        <el-form ref="form" label-width="80px">
          <el-form-item :label="index + 1">
            <span style="font-size: large">{{o.content}}</span>
          </el-form-item>
          <el-form-item>
              <el-checkbox :label="'A、' + o.aa" v-model="o.a"></el-checkbox>
              <el-checkbox :label="'B、' + o.bb" v-model="o.b"></el-checkbox>
              <el-checkbox :label="'C、' + o.cc" v-model="o.c"></el-checkbox>
              <el-checkbox :label="'D、' + o.dd" v-model="o.d"></el-checkbox>
          </el-form-item>
        </el-form>
      </el-card>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "MultiProblem",
  data() {
    return {
      problems:[{
        content: "第一题答案是A",
        aa: "AA",
        bb: "BB",
        cc: "CC",
        dd: "DD",
        a: false,
        b: false,
        c: true,
        d: false
      },
        {
          content: "第一题答案是A",
          a: false,
          b: false,
          c: true,
          d: false
        },
        {
          content: "第一题答案是A",
          a: false,
          b: false,
          c: true,
          d: false
        },
        {
          content: "第一题答案是A",
          a: false,
          b: false,
          c: true,
          d: false
        }]
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
