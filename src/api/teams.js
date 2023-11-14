const fs = require('fs')
const path = require('path')
const teamsMapper = require('../mappers/teamsMapper.js')
const Team = require('../entities/team.js')

const teamsDirectory = path.join(__dirname, '../../data/teams.json')
const teamsBackupDirectory = path.join(
  __dirname,
  '../../data/teams-backup.json',
)

const apiTeam = JSON.parse(fs.readFileSync(teamsDirectory, 'utf-8'))
const apiTeamBackup = JSON.parse(fs.readFileSync(teamsBackupDirectory, 'utf-8'))

const teamsDB = apiTeam.map(team => teamsMapper(team))
const teamsDBBackup = apiTeamBackup.map(team => teamsMapper(team))

/**
 * @param {import('../entities/teams.js').Team[]} teams
 * @returns {import('../entities/teams.js').Team[]}
 */
function getTeams(teams = teamsDB) {
  return teams
}

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

/**
 * @param {number} id
 * @param {import('../entities/teams.js').Team[]} teams
 */
function deleteTeamByID(id, teams = teamsDB) {
  if (!id || typeof id !== 'number') throw new Error('Invalid id')

  try {
    const team = getTeamByID(id)
    const index = teams.indexOf(team)
    if (index === -1) throw new Error('Team not found')

    const newTeams = teams.filter(team => team.id !== id)
    return fs.writeFileSync(teamsDirectory, JSON.stringify(newTeams))
  } catch (error) {
    throw new Error('Team not found')
  }
}

/**
 * @param {import('../entities/teams.js').Team} team
 * @param {import('../entities/teams.js').Team[]} teams
 */
function createTeam(team, teams = teamsDB) {
  if (!team || !(team instanceof Team)) throw new Error('Invalid team')

  try {
    team.lastUpdated = new Date().toISOString()
    team.id = getLastTeam(teams).id + 1
    const newTeams = [...teams, team]
    return fs.writeFileSync(teamsDirectory, JSON.stringify(newTeams))
  } catch (error) {
    throw new Error('Team not created')
  }
}

/**
 * @param {number} id
 * @param {import('../entities/teams.js').Team} newTeam
 * @param {import('../entities/teams.js').Team[]} teams
 */
function updateTeam(id, newTeam, teams = teamsDB) {
  if (!id || typeof id !== 'number') throw new Error('Invalid id')
  if (!newTeam || !(newTeam instanceof Team)) throw new Error('Invalid team')

  try {
    const team = getTeamByID(id)
    const index = teams.indexOf(team)
    newTeam.lastUpdated = new Date().toISOString()

    team.id = newTeam.id || team.id
    team.name = newTeam.name || team.name
    team.country = newTeam.country || team.country
    team.shortName = newTeam.shortName || team.shortName
    team.tla = newTeam.tla || team.tla
    team.crestUrl = newTeam.crestUrl || team.crestUrl
    team.address = newTeam.address || team.address
    team.phone = newTeam.phone || team.phone
    team.website = newTeam.website || team.website
    team.email = newTeam.email || team.email
    team.founded = newTeam.founded || team.founded
    team.clubColors = newTeam.clubColors || team.clubColors
    team.venue = newTeam.venue || team.venue
    team.lastUpdated = newTeam.lastUpdated || team.lastUpdated

    const newTeams = [...teams]
    newTeams[index] = team

    return fs.writeFileSync(teamsDirectory, JSON.stringify(newTeams))
  } catch (error) {
    throw new Error('Team not updated')
  }
}

/**
 * @param {import('../entities/teams.js').Team[]} teams
 */
function resetTeams(teams = teamsDBBackup) {
  return fs.writeFileSync(teamsDirectory, JSON.stringify(teams))
}

/**
 * @param {import('../entities/teams.js').Team[]} teams
 * @returns {import('../entities/teams.js').Team}
 */
function getLastTeam(teams = teamsDB) {
  return teams[teams.length - 1]
}

module.exports = {
  getTeams,
  resetTeams,
  getTeamByID,
  deleteTeamByID,
  createTeam,
  updateTeam,
}
