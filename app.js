const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const { file } = require('./src')
const Busboy = require('busboy')

const serve = require('koa-static');
const path = require('path')
const os = require('os')
const fs = require('fs')

router.get('/',  (ctx, next) => {
	ctx.type = "text/html; charset=utf-8"
	ctx.body = file
})

app.use(serve(__dirname + '/public/'))

const mkdirsSync = (dirname) => {
	if(fs.existsSync(dirname)) {
		return true
	} else {
		if (mkdirsSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname)
			return true
		}
	}
	return false
}
router.post('/file', async function(ctx, next) {
  const serverPath = path.join(__dirname, './uploads/')
 const result = await uploadFile(ctx, {
  fileType: 'img',
  path: serverPath
 })
 ctx.body = {
 	imgUrl: `/uploads${result.imgPath}`
 }
})
 
 function uploadFile (ctx, options) {
 const _emmiter = new Busboy({headers: ctx.req.headers})
 const fileType = options.fileType
 const filePath = path.join(options.path, fileType)
 const confirm = mkdirsSync(filePath)
 if (!confirm) {
  return
 }
 return new Promise((resolve, reject) => {
  _emmiter.on('file', function (fieldname, file, filename, encoding, mimetype) {
   const fileName = Rename(filename)
   const saveTo = path.join(path.join(filePath, fileName))
   file.pipe(fs.createWriteStream(saveTo))
   file.on('end', function () {
    resolve({
     imgPath: `/${fileType}/${fileName}`,
     imgKey: fileName
    })
   })
  })

  _emmiter.on('finish', function () {
   console.log('finished...')
  })

  _emmiter.on('error', function (err) {
   console.log('err...')
   reject(err)
  })

  ctx.req.pipe(_emmiter)
 })
}

const getSuffix = (fileName) => fileName.split('.').pop()

const Rename = (fileName) => Math.random().toString(16).substr(2) + '.' + getSuffix(fileName)

app.use(router.routes());
app.listen(3000)