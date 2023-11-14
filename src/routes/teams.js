const Router = require('express').Router
const multer = require('multer')
const path = require('path')
const teamRouter = new Router()
const {
  getTeams,
  resetTeams,
  getTeamByID,
  deleteTeamByID,
  createTeam,
} = require('../api/teams.js')
const teamsMapper = require('../mappers/teamsMapper.js')

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (_, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  },
})

const upload = multer({ storage })

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
    res.status(200).send('Teams resetted successfully')
  } catch (error) {
    res.send(400).send(error)
  }

  res.status(200).send('Teams resetted successfully')
})

teamRouter.delete('/teams/:id', (req, res) => {
  const id = Number(req.params.id)

  try {
    deleteTeamByID(id)
    res.status(200).send('Team deleted successfully')
  } catch (error) {
    res.status(500).send(error)
  }
})

teamRouter.post('/teams/create', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No file was uploaded.')

  req.body.crestUrl = '/' + req.file.path
  const team = teamsMapper(req.body)
  if (!team) return res.status(400).send('Invalid team')

  try {
    createTeam(team)
    res.status(201).send(team)
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
