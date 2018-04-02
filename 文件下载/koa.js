const send = require('koa-send')
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

router.get('/download', async function (ctx) {
    var fileName = '/app-release.apk';
    await send(ctx, fileName, { root: '/Users'});
});


app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000)
console.log('http://localhost:3000')