const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser')

const config = require('./config')

app.use(bodyParser())
app.use(router.routes())


router.post('/msg', async(ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = {
  	aaa: 1111
  }
})

app.listen(config.port, () => {
	console.log(`http://localhost:${config.port}`)
})