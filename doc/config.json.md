#### 关于应用页（/views 目录下 config.json）相关配置信息

- 1、对于应用页下的每一个文件夹下必须要有一个 index.vue 文件，并且必须包含一个<router-view></router-view> 标签作为控制路由的区域
- 2、对于应用页下的每一个文件夹下必须要有一个 config.json 的配置文件

```

已demo的user目录为例
{
  "/": {
    "title": "用户首页",
    "iconClass": { "el-icon-share": true }, // 非必需
    "viewPermission": [
      "m.permission.view"
    ],
    "operatePermission": []
    ...
  },
  "/userList": {
    "title": "用户列表",
    "iconClass": { "el-icon-share": true },
    "viewPermission": [
      "m.permission.read",
      "m.permission.view",
      "m.permission.edit"
    ],
    "operatePermission": []
    ...
  },
  "/userEmp": {
    "title": "用户部门",
    "iconClass": { "el-icon-share": true },
    ...
    "viewPermission": [
      "m.permission.read",
      "m.permission.view",
      "m.permission.edit"
    ],
    "operatePermission": []
  }
}

```
其中 viewPermission 是对应页面需要的权限，operatePermission 是对应页面里面操作的权限
