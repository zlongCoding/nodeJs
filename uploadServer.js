require('babel-core/register')()
require('babel-polyfill')
require('./server/upload')


console.log(`env: ${ process.env.NODE_ENV}`)