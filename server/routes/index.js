const express = require('express')
let app = express()
let router = express.Router()
const chirpsRouter = require('./chirps')

router.use('/chirps', chirpsRouter);

module.exports = router