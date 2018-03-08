const mongoose = require('mongoose')
const User = mongoose.model('User')
// const Write = mongoose.model('Write')

const config = {
  checkPassword: async function(username, password) {
    let match = false

    const userCount = await User.findOne({ username: username }).exec()
    if (userCount) {
      match = await userCount.comparePassword(password, userCount.password)
    }
    return {
      match,
      userCount
    }
  },
  findUsername: async function(username) {
    const user = await User.findOne({ username: username }).exec()
    return user
  },
  // findAllArticl: async function() {
  //   const content = await Write.findOne({}).sort('meta.updateAt').exec()
  //   return content
  // }
}



module.exports = config