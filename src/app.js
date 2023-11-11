require('dotenv').config()
const express = require('express')
const teamsRouter = require('./routes/teams.js')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.text('*/*'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use('/api', teamsRouter)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
