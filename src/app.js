require('dotenv').config()
const cors = require('cors')
const express = require('express')
const teamsRouter = require('./routes/teams.js')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.text('*/*'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/api', teamsRouter)

app.listen(PORT)
