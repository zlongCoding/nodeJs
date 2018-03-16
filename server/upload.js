import Koa from 'koa'
import mongoose from 'mongoose'
import { resolve } from 'path'
import chalk from 'chalk'

import { database } from './middleware/database'

(async () => {
  await database()
const app = new Koa()
  switch (process.env.GREET) {
  	case 'movie':
  		require('./tasks/movie')
  		break
  	case 'trailer':
  		require('./tasks/trailer')
  		break
  	case 'api':
  		require('./tasks/api')
  		break
  	case 'qiniu':
  		require('./tasks/qiniu')
  		break
  }
  app.listen(4400, () => {
  	console.log(`server is listen: ${chalk.green('http://localhost:4400')}`)
  })
})()
