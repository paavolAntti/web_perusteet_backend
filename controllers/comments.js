require('dotenv').config()
const commentRouter = require('express').Router()
const Comment = require('../models/comment')

// posts new Comment type object to database
commentRouter.post('/', async (req, res) => {
	console.log(req.body)
	const body = req.body
	const comment = new Comment({
		username: body.username,
		content: body.content
	})

	try {
		const savedComment = await comment.save()
		res.json(savedComment.toJSON())
	} catch (error) {
		console.log('error posting ', error.message)
		res.status(400).end()
	}
})
// all comments from database
commentRouter.get('/', async (req, res) => {
	const comments = await Comment.find({})
	res.json(comments.map(comment => comment.toJSON()))
})
// comments by id
commentRouter.get('/:id', async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id)
		res.json(comment.toJSON())
	} catch (error) {
		res.status(400).end()
	}
})
module.exports = commentRouter

