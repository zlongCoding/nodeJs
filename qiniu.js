const Config = require('./config')
const qiniu = require('qiniu')
const upToQiniu = function (filePath, key) {
  const accessKey = Config.accessKey
  const secretKey = Config.secretKey
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const options = {
    scope: Config.scope
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  const config = new qiniu.conf.Config()
  config.zone = qiniu.zone.Zone_z0
  const localFile = filePath
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  return new Promise((resolved, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode == 200) {
        resolved(respBody)
      } else {
        resolved(respBody)
      }
    })
  })

}

module.exports = upToQiniu
