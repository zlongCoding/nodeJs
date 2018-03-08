module.exports = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Koa</title>
      <link href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.css" rel="stylesheet">
      <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
      <script src="https://cdn.bootcss.com/bootstrap/4.0.0/js/bootstrap.js"></script>
    </head>
    <body>
       <div class="container">
          <div class="row">
            <div class="col-md-8">
              <h1>图片上传</h1>
            </div>
               <input type="file" id="photo"/>
          </div>
       </div>
       <script>
       document.getElementById('photo').addEventListener('change', function(e) {
         var files = this.files
          updateImg(files[0])
        })
function updateImg(imgfiles) {
  var formFile = new FormData()
  formFile.append('action', 'UploadVMKImagePath')
  formFile.append('file', imgfiles)
  $.ajax({
    url: 'http://localhost:3000/file',
    type: 'POST',
    data: formFile,
    contentType: false,
    processData: false,
    cache: false,
    success: function(data, textStatus, jqXHR) {
      console.log(data)
    },
    error: function(xhr, textStatus) {}
  })
}
       </script>
    </body>
  </html>
`