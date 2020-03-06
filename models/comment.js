const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const commentSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	}

})

commentSchema.set('toJSON', {
	transform: (document, returnedComment) => {
		returnedComment.id = returnedComment._id.toString()
		delete returnedComment._id
	}
})
module.exports = mongoose.model('Comment', commentSchema)