const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const _underscore = require('underscore')
const serveStatic = require('serve-static')
const session = require('express-session')

const config = require('./config')
app.locals.moment = require('moment')

var port = process.env.PORT || config.port
app.listen(port)
console.log(`listen: http://localhost:${port}`)
//链接数据库
mongoose.connect(config.db)

mongoose.connection.on('disconnected', () => {
  mongoose.connect(config.db)
})

mongoose.connection.on('error', err => {
  console.log(err)
})

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB -> ', config.db)
})


app.use(bodyParser.urlencoded({ extended: true }))
app.use(serveStatic('public'))
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 1000 * 60 * 60 * 60 },
  resave: true,
  saveUninitialized: false
}))




const user = require('./database/schema/user')

const { checkPassword, findUsername, findAllArticl } = require('./service/admin.js')


const writeCode = require('./database/schema/write')
const commentsCode = require('./database/schema/comments')
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.get('/', function(req, res) {
  if (req.session.username) {
    res.redirect('/home')
  } else {
    res.redirect('/login')
  }
})

app.get('/login', function(req, res) {
  res.render('login')
})
app.post('/login', async function(req, res) {
  const { username, password, check } = req.body
  if (req.body.username && req.body.password) {
    var _user = new user({
      username: username,
      password: password,
      check: check
    })
    const data = await checkPassword(username, password)
    const { userCount, match } = data
    if (match) {
      req.session.username = username
      res.redirect('/home')
    } else {
      res.render('login', {
        errMessage: '密码错误'
      })
    }
  }
})

app.get('/register', function(req, res) {
  res.render('register')
})

app.get('/main/:id', function(req, res) {
  writeCode.findById(req.params.id, function(err, content) {

    commentsCode.fetch(req.params.id, function(err, comments) {
      res.render('main', {
        content: content,
        comments: comments
      })
    })
  })


})

app.post('/register',function(req, res) {
  const { username, email, password, check } = req.body
  var _user = new user({
    username: username,
    password: password,
    email: email,
    check: check
  })
 
  const data = findUsername(username)
  if (data) {
    res.render('register', {
      errMessage: '用户名已注册，请重新输入'
    })
  } else {
    if (check) {
      req.session.username = username
    }
    _user.save(function(err, user) {
      res.redirect('home')
    })
  }
})

app.get('/home', async function(req, res) {
  await writeCode.fetch(function(err, content) {
    res.render('home', {
      content: content
    })
  })

})
app.get('/write', function(req, res) {
  res.render('write')
})

app.post('/write', function(req, res) {
  const { contentCode } = req.body
  const _write = new writeCode({
    contentCode: contentCode
  })
  _write.save(function(err, user) {
    res.redirect('/home')
  })
})
app.post('/writeComment', async function(req, res) {
  const { code, content } = req.body
  const _comments = new commentsCode({
    code: code,
    content: content
  })
  await _comments.save(function(err, user) {
    res.send({
      status: 200,
      msg: '添加评论成功'
    })
  })
})