const emailRouter = require('express').Router()
const nodemailer = require('nodemailer')
const config = require('../utils/config')


emailRouter.post('/', async (req, res) => {
	const body = req.body
	//const testAccount = await nodemailer.createTestAccount()
	const transport = await nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: config.MAIL,
			pass: config.EMAIL_PASS
		}
	})

	const email = {
		from: body.email,
		to: config.SEND_TO,
		subject: 'contact from profile page',
		text: `${body.message}
			Sender email: ${body.email}`
	}
	try {
		await transport.sendMail(email)
		console.log('email send: ', email.text)
		res.json(email.text)
	} catch (error) {
		console.log('error sendin email: ', error.message)
		
	}
	transport.close()
	
})

module.exports = emailRouter