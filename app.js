const Core = require('core')
const config = require('./config')

let core = new Core(config)

if (process.env.NODE_ENV === 'development') {
  const app = core.listener()

  const bodyParser = require('body-parser')

  app.use(bodyParser.urlencoded({
    extended: false
  }))

  app.use(bodyParser.json())

  app.use(require('cookie-session')({
    name: 'session',
    keys: ['key1', 'key2']
  }))

  app.use(require('./routers'))
} else {
  core.build()
}
