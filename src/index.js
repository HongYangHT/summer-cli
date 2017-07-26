
import Vue from 'vue'
import VueRouter from 'vue-router/dist/vue-router.esm.js'
import Vuex from 'vuex/dist/vuex.esm.js'
import ElementUI from 'element-ui'
import VueExtra from 'vue-extra/dist/vue-extra.esm.js'
import VueComponents from 'vue-components/dist/vue-components.esm.js'
import routerConfig from './router'
import storeConfig from './store'

import 'vue-components/dist/theme/default.css'

import './assets/js/directive/permission'

Vue.config.productionTip = false

const options = {
  router: routerConfig,
  store: storeConfig
}

VueExtra.init(VueRouter, Vuex)
Vue.use(VueExtra)
Vue.use(ElementUI) // element ui 组件
Vue.use(VueComponents) // 自定义组件

let extra = new VueExtra(options)

new Vue(
  {
    extra,
    watch: {
      '$route' (to, from) {
        this.transitionName = 'slide'
      }
    }
  }
).$mount('#app')
