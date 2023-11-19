require('dotenv').config()
const cors = require('cors')
const express = require('express')
const teamsRouter = require('./routes/teams.js')

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'Accept',
      'x-client-key',
      'x-client-token',
      'x-client-secret',
      'Authorization',
    ],
  }),
)
app.use(express.json())
app.use(express.text('*/*'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/api', teamsRouter)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
