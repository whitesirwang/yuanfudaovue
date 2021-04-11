<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="小学教程" name="first"></el-tab-pane>
    <el-tab-pane label="初中教程" name="second"></el-tab-pane>
    <el-tab-pane label="高中教程" name="third"></el-tab-pane>
    <el-tab-pane label="大学教程" name="fourth"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "courses"
}
</script>

<style scoped>

</style>
