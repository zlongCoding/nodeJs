const Koa = require('koa')
const Router = require('koa-router')
 
const server = require('koa-static')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const fs = require('fs')
var nanoid = require('nanoid')
const app = new Koa()
const router = new Router()

const config = require('./config')
const upToQiniu = require('./qiniu')
app.use(logger())
app.use(koaBody({ multipart: true}))


const uuid = require('uuid')
app.use(server(__dirname + '/public/'))

router.post('/upload',async (ctx, next) => {
  const file = await ctx.request.body.files.file
  const reader = await fs.createReadStream(file.path)
  const filename = `${nanoid()}.${file.name.split('.')[1]}`
  let qiniuup = await upToQiniu(file.path, filename)
  let data = {
  	url: `${config.baseURL}${qiniuup.key}`
  }
  ctx.body = {
  	success: 200,
    data: {
    	url: data.url
    }
  }
})


app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3001, () => {
	console.log('open browser : http://localhost:3001')
})