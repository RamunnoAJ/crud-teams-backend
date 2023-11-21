require('dotenv').config()
const cors = require('cors')
const express = require('express')
const teamsRouter = require('./routes/teams.js')

const app = express()
const PORT = process.env.PORT || 3000
const corsConfig = {
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type'],
}
app.use(cors(corsConfig))
app.use(express.json())
app.use(express.text('*/*'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

app.use('/api', teamsRouter)

app.options('*', cors(corsConfig))
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
