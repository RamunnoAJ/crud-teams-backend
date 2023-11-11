const Router = require('express').Router
const teamRouter = new Router()
const { getTeams, resetTeams } = require('../api/teams.js')

teamRouter.get('/teams', (_, res) => {
  try {
    const teams = getTeams()
    res.send(teams)
  } catch (error) {
    res.send(500).send(error)
  }
})

teamRouter.post('/teams/reset', (_, res) => {
  try {
    resetTeams()
  } catch (error) {
    res.send(400).send(error)
  }

  res.status(200).send('Teams resetted successfully')
})

module.exports = teamRouter
