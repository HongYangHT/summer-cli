import * as types from './mutationType'

let rootData = {
  apiRoot: process.env.NODE_ENV === 'production' ? '/' : '',
  topMenu: [
    {
      title: '处理中心',
      slot: 'menu-item',
      classObject: {
        'i-icon-1': true
      },
      submenu: []
    },
    {
      title: '我的工作台',
      slot: 'submenu',
      classObject: {
        'i-icon-2': true
      },
      submenu: [
        {
          title: '选项1',
          classObject: {
            'i-icon-1': true
          }
        },
        {
          title: '选项2',
          classObject: {
            'i-icon-1': true
          }
        },
        {
          title: '选项3',
          classObject: {
            'i-icon-1': true
          }
        }
      ]
    },
    {
      title: '订单管理',
      slot: 'menu-item',
      classObject: {
        'i-icon-3': true
      },
      submenu: []
    }
  ],
  showSearch: false,
  role: ['master', 'manager', 'employee'],
  oparate: ['view', 'submit'],
  permissions: [],
  viewPermission: []
}

let rootMutations = {
  [types.SET_TOPMENU]: function (state, topMenu) {
    state.topMenu = topMenu
  },
  [types.SET_ROLE]: function (state, role) {
    state.role = role
  },
  [types.SET_OPARATE]: function (state, oparate) {
    state.oparate = oparate
  },
  [types.SET_PERMISSON]: function (state, permission) {
    state.permissions = permission
  },
  [types.SET_VIEWPERMISSION]: function (state, viewPermission) {
    state.viewPermission = viewPermission
  }
}

let rootActions = {
}
if (typeof Object.assign !== 'function') {
  Object.assign = function (target) {
    'use strict'
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    target = Object(target)
    for (let index = 1; index < arguments.length; index++) {
      let source = arguments[index]
      if (source != null) {
        for (let key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
    }
    return target
  }
}

let data = Object.assign({}, rootData)

let getters = Object.assign({})

let actions = Object.assign({}, rootActions)

let mutations = Object.assign({}, rootMutations)

module.exports = {
  data: data,
  getters: getters,
  actions: actions,
  mutations: mutations
}
