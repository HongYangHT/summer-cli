<style lang="less" scoped>
  .name{
    background: red;
  }
</style>
<template>
  <div class="name">
    <span>测试</span>
    <!-- <el-button v-permission.oparate.role="{role:['user'],oparate:['edit']}">确定</el-button> -->
  </div>
</template>
<script>
export default {
  data: function () {
    return {

    }
  },
  methods: {
    broadcastQureySearch (params) {
      params.cb([{
        value: 'aaa'
      }])
    },
    broadcasthandleSelect (info) {
      console.log(info)
    },
    broadcastHandleSelectSearch (info) {
      console.log(info)
    },
    broadcastHandleIconClick (evt) {
      console.log(evt)
    }
  }
}
</script>
