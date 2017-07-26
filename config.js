const path = require('path')

module.exports = {
  port: 8888,
  entry: {
    js: path.resolve(__dirname, 'src/index.js'),
    html: path.resolve(__dirname, 'src/index.html')
  },
  output: path.resolve(__dirname, 'dist'),
  hot: true,
  assets: { // 资源文件设置(可选)
    path: '/assets', // 映射的路径 （必填）
    folder: path.resolve(__dirname, 'src/assets') // 文件所在目录 （必填)
  },
  modules: { // 配置 webpack 扩展，（有些 js 是从 cdn 上引用进来，如 jQuery, 这个是指使用 import $ from 'jquery' 时， 不需要将 jquery 打包到 main 中）
    '$': 'jQuery'
  },
  url: {
    open: true
  },
  proxy: [ // 设置代理 / <- http://www.example.org/
    /* {
      path: '/', // 访问路径
      option: { // 选项 ，（ 更多请参考 https://github.com/chimurai/http-proxy-middleware )
        target: 'http://www.example.org', // target host
        changeOrigin: true, // needed for virtual hosted sites
        // ws: true,                       // proxy websockets
        pathRewrite: {
          '^/': '/'
        },
        router: {
            // override target 'http://www.example.org' to 'http://localhost:8000'
        }
      }
    } */
  ]
}
