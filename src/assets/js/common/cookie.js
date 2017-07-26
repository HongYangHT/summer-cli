let CookieUtil = function (options) {
  CookieUtil.CookieUtil = document.cookie
  CookieUtil.defaultLiftTime = 12 * 60 * 60 * 1000
}

CookieUtil.prototype.setCookieUtil = function (name, value, expires) {
  let cookieText = ''
  cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  if (expires instanceof Date) {
    cookieText += '; expires=' + expires.toGMTString()
  } else {
    cookieText += '; expires=' + new Date(new Date().getTime() + this.defaultLiftTime).toGMTString()
  }
  document.cookie = cookieText
}
CookieUtil.prototype.getCookieUtil = function (name) {
  let cookieName = encodeURIComponent(name) + '='
  let cookieStart = document.cookie.indexOf(cookieName)
  let cookieValue = ''
  if (cookieStart !== -1) {
    let cookieEnd = document.cookie.indexOf(';', cookieStart)
    if (cookieEnd === -1) {
      cookieEnd = document.cookie.length
    }
    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
  }
  return cookieValue
}
CookieUtil.prototype.delCookieUtil = function (name) {
  this.setCookieUtil(name, '', new Date(0))
}

module.exports = CookieUtil
