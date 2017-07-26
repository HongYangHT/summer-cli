<style lang="less" scoped>
  .name{
    background: red;
  }
</style>
<template>
  <div class="name">
    <span>用户信息</span>
    <el-button v-permission="'app.info.userInfo.confirm'">确定</el-button>
  </div>
</template>
<script>
export default {
  data: function () {
    return {

    }
  }
}
</script>
