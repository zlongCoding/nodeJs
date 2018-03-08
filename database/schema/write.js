const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema
const WriteSchema = new Schema({
  contentCode: String,
  meta: {
    createdAt: {
      type: Date,
      default: moment(new Date()).format("YYYY-MM-DD")
    },
    updateAt: {
      type: Date,
      default: moment(new Date()).format("YYYY-MM-DD")
    }
  },
  comments: {
    type: Array,
    default: []
  }
})

WriteSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = moment(new Date()).format("YYYY-MM-DD")
  } else {
    this.meta.updateAt = moment(new Date()).format("YYYY-MM-DD")
  }
  next()
})


WriteSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}
const writeCode = mongoose.model('Write', WriteSchema)

module.exports = writeCode
