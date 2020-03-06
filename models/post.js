const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const postSchema = new mongoose.Schema({
	header: {
		type: String,
		required:true
	},
	content: {
		type: String,
		required: true
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
})

postSchema.set('toJSON', {
	transform: (document, returnedBlog) => {
		returnedBlog.id = returnedBlog._id.toString()
		delete returnedBlog._id
	}
})

module.exports = mongoose.model('Post', postSchema)