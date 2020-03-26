require('dotenv').config()
const postRouter = require('express').Router()
const Post = require('../models/post')
const Comment = require('../models/comment')

// Fetches all posts from database and populates the 'comments' field which contains...
// mongoose object id which refers to single comment in database
postRouter.get('/', async (req, res) => {
	try {
		const posts = await Post.find({}).populate('comments', { username: 1, content: 1 })
		res.json(posts.map(post => post.toJSON()))
		console.log('Posts requested')
	} catch (error) {
		res.status(404).end()
	}
	
})

// Posts new post to database, get paramateres with request body
postRouter.post('/', async (req, res) => {
	const body = req.body
	// New post to with given header and content, initializes empty array for comments
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
		res.status(400).end()
	}
})

// Update blogs, which corresponds to request parameters
postRouter.put('/:id', async (req, res) => {
	const body = req.body
	// Creates new comment 
	const comment = new Comment({
		username: body.username,
		content: body.content
	})
	console.log('comment to save: ', comment)
	// Saving comment to database
	try {
		await comment.save()
	} catch (error) {
		console.log('error saving comment', error.message)
		res.status(400).end()
	}
	const post = await Post.findById(req.params.id)
	console.log('found post: ', post)
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
		res.status(400).end()
	}
})

module.exports = postRouter