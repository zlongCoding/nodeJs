var express = require('express')
var fs=require("fs")

var app = express()
app.get('/download', function (req, res, next) {
  var path="/Users/app-release.apk"
  var f = fs.createReadStream(path)
  res.writeHead(200, {
    'Content-Type': 'application/force-download',
    'Content-Disposition': 'attachment filename=NW.js.docx'
  })
  f.pipe(res)
})

app.listen(3000)
