import frame from './frame'
import webApp from './webApp'
// console.log('frame', JSON.stringify(frame))
// console.log('webApp', JSON.stringify(webApp))

/* function changePath (path) {
  let index = path.lastIndexOf('/')
  if (path.substring(index + 1, path.length)) {
    return path
  } else {
    return path.substring(0, index)
  }
}

webApp.forEach(item => {
  frame[0].children.push({
    path: changePath(item.path),
    components: item.components,
    children: item.children
  })
}) */

class HandleRoute {
  constructor () {
    this.frame = frame
    this.webApp = webApp
  }

  changePath (path) {
    let index = path.lastIndexOf('/')
    if (path.substring(index + 1, path.length)) {
      return path
    } else {
      return path.substring(0, index)
    }
  }

  getRoute () {
    this.webApp.forEach(route => {
      if (route.children && route.children.length) {
        this.frame[0].children.push({
          path: this.changePath(route.path),
          components: route.components,
          children: []
        })
        this.setChildrenRoute(route.path, route.children)
      } else {
        this.frame[0].children.push({
          path: this.changePath(route.path),
          components: route.components,
          children: route.children
        })
      }
    })
  }

  setChildrenRoute (path, child) {
    child.forEach(route => {
      if (route.children && route.children.length) {
        this.frame[0].children.push({
          path: this.changePath(path + '/' + route.path),
          components: route.components,
          children: []
        })
        this.setChildrenRoute(route.path, route.children)
      } else {
        this.frame[0].children.push({
          path: this.changePath(path + route.path),
          components: route.components,
          children: route.children
        })
      }
    })
  }

  buildPath () {
    this.getRoute()
    return this.frame
  }
}

let routes = new HandleRoute().buildPath()
export default {
  mode: 'hash',
  routes,
  each: {
    async before (to, from, next) {
      /**
       * 跳转之前做一层过滤处理，如果跳转页面有权限，跳转，如果没有权限，返回‘／’
       */
      let path = to.path.replace(/^\//, '').replace(/\//g, '.')
      let viewPermission = this.$store.state.viewPermission
      if (viewPermission.indexOf(path) > -1) {
        next()
      } else {
        if (viewPermission && viewPermission.length) {
          next('/')
        } else {
          next()
        }
      }
    },
    after (route) {
    }
  }
}
