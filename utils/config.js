/* eslint-disable no-undef */
require('dotenv').config()

const MAIL = process.env.EMAIL
const EMAIL_PASS = process.env.EMAIL_PASS
const SEND_TO = process.env.SEND_TO

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
	MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = { MONGODB_URI, PORT, MAIL, EMAIL_PASS, SEND_TO }