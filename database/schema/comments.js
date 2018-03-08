const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema
const CommentsSchema = new Schema({
  content: String,
  code: String,
  meta: {
    createdAt: {
      type: Date,
      default: moment(new Date()).format("YYYY-MM-DD")
    },
    updateAt: {
      type: Date,
      default: moment(new Date()).format("YYYY-MM-DD")
    }
  }
})

CommentsSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = moment(new Date()).format("YYYY-MM-DD")
  } else {
    this.meta.updateAt = moment(new Date()).format("YYYY-MM-DD")
  }
  next()
})


CommentsSchema.statics = {
  fetch: function(code, cb) {
    return this
      .find({code: code})
      .sort('meta.updateAt')
      .exec(cb)
  }
}
const comments = mongoose.model('Comments', CommentsSchema)

module.exports = comments