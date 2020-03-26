require('dotenv').config()
const projectRouter = require('express').Router()
const Project = require('../models/project')

projectRouter.get('/', async (req, res) => {
	try {
		const projects = await Project.find({})
		console.log(projects)
		res.json(projects.map(project => project.toJSON()))
		console.log('Projects requested')
		
	} catch (error) {
		res.status(404).end()
	}
})

projectRouter.post('/', async (req, res) => {
	const body = req.body
	const project = new Project({
		header: body.header,
		content: body.content,
		link: body.link,
		imageUrl: body.imageUrl
	})

	try {
		const savedProject = await project.save()
		res.json(savedProject.toJSON())
	} catch (error) {
		console.log('error posting project', error.message)
		res.status(400).end()
	}
})

module.exports = projectRouter