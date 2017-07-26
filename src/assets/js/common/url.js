function GetQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let queryStr = window.location.href.split('?')
  if (queryStr.length < 2) return null
  let r = queryStr[1].match(reg)
  if (r != null) return unescape(r[2]); return null
}

module.exports = {
  getQueryString: GetQueryString
}
