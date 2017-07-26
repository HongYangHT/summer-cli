<style lang="less">
  .el-logo-link img{
    width: auto;
  }
</style>
<template>
  <div>
    <el-frame :href="href" :logo="logo" :locatino="location" :menu="menu" :top-menu="topMenu" :showSearch="showSearch"
  @change-collapse="changeCollapse" @select-menu="selectMenu" @select-sub-menu="selectSubMenu" @handle-select="handleSelect" @handle-select-search="handleSelectSearch" @handle-icon-click="handleIconClick" @query-search="querySearch" @hide-bar="hideBar" @hide-thumbnail="hideThumbnail">
      <template slot="mainContent">
        <router-view></router-view>
      </template>
      <template slot="left">
        <span>aaaa</span>
      </template>
    </el-frame>
  </div>
</template>
<script>
  import nav from '../nav'
  import emitter from '../assets/js/common/emitter.js'
  export default {
    data () {
      return {
        href: '/',
        logo: '../assets/imgs/logo.png',
        location: '竞网智赢',
        myNav: []
      }
    },
    mixins: [emitter],
    created () {
      /**
       * 做用户权限处理
       * 根据后台的权限返回做一层过滤
       */
      this.myNav = nav.compileNav()
      /**
       * 1. 遍历nav直至到叶子结点
       * 2. 如果叶子结点在routes里面，就保留，如果不在叶子结点里面就删除
       * 3. 删除完之后判断叶子结点是否都被删除了，如果都删除，就需要向上删除父节点，如果祖父结点的子结点也没有了，就需要联同祖父结点一起删除
       * 4. array删除会出现坐标跳跃的情况，所以需要设置一个标志，依次循环，直到处理后的列表都是返回的列表，结束
       */
      /* let routes = []
      this.$http.get(this.$store.state.apiRoot + '/test/view').then(res => {
        res.body.data && res.body.data.length && res.body.data.forEach(item => {
          let index = item.indexOf('.')
          let route = item.substring(index + 1, item.length)
          routes.push(route)
        })
        this.$store.commit('setViewPermission', routes)
        // console.log('before', JSON.stringify(this.myNav))
        this.setNav(routes)
        // console.log('after', JSON.stringify(this.myNav))
      }).catch(res => {
        this.$message({
          message: '获取页面权限失败',
          type: 'error'
        })
      })
      this.$http.get(this.$store.state.apiRoot + '/test/permission').then(res => {
        this.$store.commit('setPermission', res.body.data)
      }).catch(res => {
        this.$message({
          message: '获取操作权限失败',
          type: 'error'
        })
      }) */
    },
    computed: {
      topMenu () {
        return this.$store.state.topMenu
      },
      showSearch () {
        return this.$store.state.showSearch
      },
      menu () {
        return this.myNav
      }
    },
    methods: {
      setNav (routes) {
        let flag = true
        this.myNav.forEach((na, i) => {
          // 非叶子结点
          if (na.submenu && na.submenu.length) {
            na.submenu.forEach((ha, h) => {
              // 非叶子结点
              if (ha.submenu && ha.submenu.length) {
                ha.submenu.forEach((hs, k) => {
                  // 非叶子结点
                  if (hs.submenu && hs.submenu.length) {

                  } else {
                    let hash = hs.hash.replace(/^#\//, '').replace(/\//g, '.')
                    if (routes.indexOf(hash) === -1) {
                      this.myNav[i].submenu[h].submenu.splice(k, 1)
                      flag = false
                      if (this.myNav[i].submenu[h].submenu.length === 0) {
                        this.myNav[i].submenu.splice(h, 1)
                        if (this.myNav[i].submenu.length === 0) {
                          this.myNav.splice(i, 1)
                        }
                      }
                    }
                  }
                })
              // 叶子结点
              } else {
                let hash = ha.hash.replace(/^#\//, '').replace(/\//g, '.')
                if (routes.indexOf(hash) === -1) {
                  this.myNav[i].submenu.splice(h, 1)
                  flag = false
                  if (this.myNav[i].submenu.length === 0) {
                    this.myNav.splice(i, 1)
                  }
                }
              }
            })
          // 叶子结点
          } else {
            let hash = na.hash.replace(/^#\//, '').replace(/\//g, '.')
            if (routes.indexOf(hash) === -1) {
              this.myNav.splice(i, 1)
              flag = false
            }
          }
        })
        if (!flag) {
          this.setNav(routes)
        }
      },
      changeCollapse (info) {
        this.broadcast('broadcastChangeCollapse', info)
      },
      selectMenu (info) {
        this.broadcast('broadcastSelectMenu', info)
      },
      selectSubMenu (info) {
        this.broadcast('broadcastSelectSubMenu', info)
      },
      handleSelect (info) {
        this.broadcast('broadcasthandleSelect', info)
      },
      handleSelectSearch (info) {
        this.broadcast('broadcastHandleSelectSearch', info)
      },
      handleIconClick (evt) {
        this.broadcast('broadcastHandleIconClick', evt)
      },
      querySearch (query, cb) {
        this.broadcast('broadcastQureySearch', {query: query, cb: cb})
      },
      hideBar (type) {
        this.broadcast('broadcastHideBar', type)
      },
      hideThumbnail (type) {
        this.broadcast('broadcastHideThumbnail', type)
      }
    }
  }
</script>
