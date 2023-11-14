const Router = require('express').Router
const teamRouter = new Router()
const {
  getTeams,
  resetTeams,
  getTeamByID,
  deleteTeamByID,
} = require('../api/teams.js')

teamRouter.get('/teams', (_, res) => {
  try {
    const teams = getTeams()
    res.send(teams)
  } catch (error) {
    res.send(500).send(error)
  }
})

teamRouter.get('/teams/:id', (req, res) => {
  const id = Number(req.params.id)

  try {
    const team = getTeamByID(id)
    res.send(team)
  } catch (error) {
    res.status(404).send(error.message)
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

teamRouter.delete('/teams/:id', (req, res) => {
  const id = Number(req.params.id)

  try {
    deleteTeamByID(id)
  } catch (error) {
    res.status(500).send(error)
  }
})

teamRouter.use((_, res) => {
  res
    .status(404)
    .send(
      'Oops! It seems that the data you were looking for could not be found.',
    )
})

module.exports = teamRouter
