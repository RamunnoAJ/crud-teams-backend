const fs = require('fs')
const path = require('path')
const teamsMapper = require('../mappers/teamsMapper.js')

const teamsDirectory = path.join(__dirname, '../../data/teams.json')
const teamsBackupDirectory = path.join(
  __dirname,
  '../../data/teams-backup.json',
)

const apiTeam = JSON.parse(fs.readFileSync(teamsDirectory, 'utf-8'))
const apiTeamBackup = JSON.parse(fs.readFileSync(teamsBackupDirectory, 'utf-8'))

const teamsDB = apiTeam.map(team => teamsMapper(team))
const teamsDBBackup = apiTeamBackup.map(team => teamsMapper(team))

function getTeams() {
  return teamsDB
}

function resetTeams() {
  return fs.writeFileSync(teamsDirectory, JSON.stringify(teamsDBBackup))
}

module.exports = { getTeams, resetTeams }
