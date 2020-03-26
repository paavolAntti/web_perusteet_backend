const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const projectSchema = new mongoose.Schema({
	header: {
		type: String,
		required:true
	},
	content: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String
	}
})

projectSchema.set('toJSON', {
	transform: (document, returnedProject) => {
		returnedProject.id = returnedProject._id.toString()
		delete returnedProject._id
	}
})

module.exports = mongoose.model('Project', projectSchema)