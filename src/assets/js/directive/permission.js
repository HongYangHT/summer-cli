import Vue from 'vue'

Vue.directive('permission', {
  bind (el, binding, vnode, oldVnode) {
    let permission = vnode.componentInstance.$store.state.permissions
    if (permission.indexOf(binding.value) < 0) {
      el.style.display = 'none'
    }
    // console.log('binding', binding.value)
  },
  inserted () {

  },
  update () {

  }
})
