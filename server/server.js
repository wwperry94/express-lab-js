const express = require('express');
const cors = require('cors')
const path = require('path')
const apiRouter = require('./routes')
let app = express();

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)
app.use(express.static(path.join(__dirname, '../client')))

app.listen(3000, console.log('Now listening on port 3000'));