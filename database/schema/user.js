const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const moment = require('moment')

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: String,
  password: String,
  emali: String,
  check: {
    type: Boolean,
    default: false
  },
  meta: {
    createdAt: {
      type: Date,
      default: moment(new Date())
    },
    updateAt: {
      type: Date,
      default: moment(new Date())
    }
  }
})

UserSchema.pre('save', function(next) {

  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})


UserSchema.pre('save', function(next) {
	let user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
  	if(err) return next(err)
  	bcrypt.hash(user.password, salt, (error, hash) => {
  		if (error) return next(error)
  		user.password = hash
  	  next()
  	})
  })
})

UserSchema.methods = {
  comparePassword: function(_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, function(err, isMatch) {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}



const user = mongoose.model('User', UserSchema)

module.exports = user