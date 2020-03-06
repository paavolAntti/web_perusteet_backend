require('dotenv').config()
const postRouter = require('express').Router()
const Post = require('../models/post')
const Comment = require('../models/comment')

// Fetches all posts from database and populates the 'comments' field which contains...
// mongoose object id which refers to single comment in database
postRouter.get('/', async (req, res) => {
	const posts = await Post.find({}).populate('comments', { username: 1, content: 1 })
	res.json(posts.map(post => post.toJSON()))
	console.log('Posts requested')
})

// Posts new post to database, get paramateres with request body
postRouter.post('/', async (req, res) => {
	const body = req.body
	const post = new Post({
		header: body.header,
		content: body.content,
		comments: []
	})

	try {
		const savedPost = await post.save()
		res.json(savedPost.toJSON())
	} catch (error) {
		console.log('error posting ', error.message)
	}
})

// Update blogs, which corresponds to request parameters, comment array
postRouter.put('/:id', async (req, res) => {
	const body = req.body
	// Creates comment to update
	const comment = new Comment({
		username: body.username,
		content: body.content
	})
	await comment.save()
	const post = await Post.findById(req.params.id)
	console.log('this is post: ', post)
	const updatedPost = {
		header: post.header,
		content: post.content,
		comments: post.comments.concat(comment.id)
	}
	
	try {
		const newPost = await Post.findByIdAndUpdate(req.params.id, updatedPost)
		res.json(newPost.toJSON())
	} catch (error) {
		console.log('error updating blog: ', error.message)
	}
})

module.exports = postRouter