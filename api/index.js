const express = require('express')
const consign = require('consign')
const cors = require('cors')
const app = express()
const database = require('./config/database')

app.use(express.json())
app.use(cors())
app.database = database

consign()
    .then('./api')
    .then('./routes/routes.js')
    .into(app)

app.listen(5000)