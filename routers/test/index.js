'use strict'
var express = require('express')
var router = express.Router()

/*
 * @router    test/
 * @method    GET
 * @description 登录的图形验证码
 * @param     String mobilePhone 手机号码
 * @author     hongyang
 */
router.route('/').get(function (req, res) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log(req.params)
  let result = {
    code: 200,
    msg: 'success',
    data: []
  }
  res.status(200).json(result)
})

router.route('/permission').get(function (req, res) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log(req.params)
  let result = {
    code: 200,
    msg: 'success',
    data: ['app.info.userInfo.view', 'app.info.userInfo.edit', 'app.info.userInfo.confirm']
  }
  res.status(200).json(result)
})

router.route('/view').get(function (req, res) {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log(req.params)
  let result = {
    code: 200,
    msg: 'success',
    data: ['app.info.userInfo', 'app.user.userList.userInfo', 'app.user.userList.userList', 'app.test.test']
  }
  res.status(200).json(result)
})

module.exports = router
