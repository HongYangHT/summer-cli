function broadcast (eventName, params) {
  this.$children.forEach(child => {
    let keys = Object.keys(child)
    let flag = false
    keys.forEach(key => {
      if (key === eventName) {
        child[key].apply(null, [params])
        flag = true
      }
    })
    if (!flag) {
      broadcast.apply(child, [eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    dispatch (eventName, params) {
      let parent = this.$parent || this.$root
      let flag = false
      while (parent && !flag) {
        let keys = Object.keys(parent)
        keys.forEach(key => {
          if (key === eventName) {
            flag = true
          }
        })
        parent = parent.$parent
      }
      if (parent) {
        parent[eventName].apply(null, [params])
      }
    },
    broadcast (eventName, params) {
      broadcast.call(this, eventName, params)
    }
  }
}
