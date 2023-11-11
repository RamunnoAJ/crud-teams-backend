const Router = require('express').Router
const teamRouter = new Router()

teamRouter.get('/teams', (req, res) => {
  res.send('GET /teams')
})

module.exports = teamRouter
