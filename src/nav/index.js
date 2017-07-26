import nav from './getNav'

class HandleNav {
  constructor () {
    this.nav = nav
    this.menu = []
    this.permissions = []
    // console.log('origin Menu', JSON.stringify(nav))
  }
  /**
   * 获取hash列表
   */
  compileNav () {
    this.resetMenu()
    // 获取一级目录
    this.nav.forEach((item, i) => {
      // 解析数组数据
      Object.keys(item).forEach(it => {
        let mn = {}
        Object.keys(item[it]).forEach(key => {
          if (key !== 'submenu') {
            mn[key] = item[it][key]
          }
        })
        mn.hash = '#' + it
        mn.submenu = this.getSubMenu(it, item[it].submenu)
        this.menu.push(mn)
      })
    })
    return this.menu
  }

  resetMenu () {
    this.menu = []
  }

  getSubMenu (key, children, hash) {
    let child = []
    children.forEach(item => {
      for (let k in item) {
        let childs = this.getMenu(key + k, item[k], hash)
        childs.forEach(ch => {
          child.push(ch)
        })
      }
    })
    return child
  }

  getMenu (hash, item, hHosh) {
    let it = []
    let mn = {}
    Object.keys(item).forEach(key => {
      if (key !== 'submenu') {
        mn[key] = item[key]
      }
    })
    mn.submenu = this.getSubMenu(hash, item.submenu, hHosh)
    mn.hash = '#' + (hHosh || '') + hash
    it.push(mn)
    return it
  }

  // getPermission array
  /**
   * 获取每一个页面的按钮所需权限列表
   */
  getPermission (pers) {
    this.resetPermission()
    let nav = pers || this.compileNav()
    nav.forEach((item, i) => {
      Object.keys(item).forEach((key, i) => {
        if (key === 'permission') {
          item[key].forEach(item => {
            this.permissions.push(item)
          })
        }
        if (key === 'submenu' && item[key] && item[key].length) {
          this.getSubPermission(item[key])
        }
      })
    })
    return this.permissions
  }

  getSubPermission (pers) {
    pers.forEach((item, i) => {
      Object.keys(item).forEach((key, i) => {
        if (key === 'permission') {
          item[key].forEach(item => {
            this.permissions.push(item)
          })
        }
        if (key === 'submenu' && item[key] && item[key].length) {
          this.getSubPermission(item[key])
        }
      })
    })
  }

  resetPermission () {
    this.permissions = []
  }
}

// console.log('permission', new HandleNav().getPermission())
export default new HandleNav()
/* 第一种情况下解析数据

class HandleNav {
  constructor () {
    this.nav = nav
    this.menu = []
    console.log('origin Menu', JSON.stringify(nav))
  }

  compileNav () {
    // 获取一级目录
    Object.keys(this.nav).forEach(key => {
      if (key !== 'submenu') {
        let mn = {}
        Object.keys(this.nav[key]).forEach(h => {
          mn[h] = this.nav[key][h]
        })
        mn.hash = '#' + key
        // 循环获取子目录
        mn.submenu = this.getSubMenu(key, this.nav.submenu)
        menu.push(mn)
      }
    })
    return menu
  }

  getSubMenu (key, children, hash) {
    let child = []
    children.forEach(item => {
      for (let k in item) {
        if (key === k) {
          let childs = this.getMenu(k, item[k], hash)
          childs.forEach(ch => {
            child.push(ch)
          })
        }
      }
    })
    return child
  }

  getMenu (hash, item, hHosh) {
    let it = []
    Object.keys(item).forEach(key => {
      if (key !== 'submenu') {
        let mn = {}
        Object.keys(item[key]).forEach(h => {
          mn[h] = item[key][h]
        })
        mn.submenu = this.getSubMenu(key, item.submenu, hash)
        mn.hash = '#' + (hHosh || '') + hash + key
        it.push(mn)
      }
    })
    return it
  }
}

export default new HandleNav().compileNav() */
