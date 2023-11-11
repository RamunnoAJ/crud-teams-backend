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
 * @param {import('../entities/teams.js').Team[]} teams
}

function resetTeams() {
  return fs.writeFileSync(teamsDirectory, JSON.stringify(teamsDBBackup))
/**
 * @param {number} id
 * @param {import('../entities/teams.js').Team[]} teams
 * @returns {import('../entities/teams.js').Team}
 */
function getTeamByID(id, teams = teamsDB) {
  if (!id || typeof id !== 'number') throw new Error('Invalid id')

  try {
    const team = teams.find(team => team.id === id)
    if (!team) throw new Error('Team not found')
    return team
  } catch (error) {
    throw new Error('Team not found')
  }
}

