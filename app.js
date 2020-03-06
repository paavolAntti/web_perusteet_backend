const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const postRouter = require('./controllers/posts')
const commentRouter = require('./controllers/comments')
const mongoose = require('mongoose')

const mongodb = config.MONGODB_URI
console.log('connecting to MongoDB at ', mongodb)

mongoose.connect(mongodb, { useNewUrlParser: true })
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB', error.message)
	})

app.use(cors())
app.use(bodyParser.json())

app.use('/api/comments', commentRouter)
app.use('/api/posts', postRouter)



module.exports = app