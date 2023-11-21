const fs = require('fs')
const path = require('path')
const teamsMapper = require('../mappers/teamsMapper.js')
const Team = require('../entities/team.js')

const teamsDirectory = path.join(__dirname, '../../data/teams.json')
const teamsBackupDirectory = path.join(
  __dirname,
  '../../data/teams-backup.json',
)

/**
 * @param {import('../entities/teams.js').Team[]} teams
 */
function saveTeams(teams) {
  fs.writeFileSync(teamsDirectory, JSON.stringify(teams))
}

/**
 * @returns {import("../entities/team.js").Team[]}
 */
function getTeams() {
  const teamsDB = JSON.parse(fs.readFileSync(teamsDirectory, 'utf8'))
  const teams = teamsDB.map(team => teamsMapper(team))

  return teams
}

/**
 * @returns {import('../entities/team.js').Team[]}
 */
function getBackupTeams() {
  const teamsDB = JSON.parse(fs.readFileSync(teamsBackupDirectory, 'utf8'))
  const teams = teamsDB.map(team => teamsMapper(team))

  return teams
}

/**
 * @returns {import('../entities/team.js').Team[]}
 */
function resetTeams() {
  const teamsDBBackup = getBackupTeams()
  saveTeams(teamsDBBackup)
  return teamsDBBackup
}

/**
 * @param {number} id
 * @returns {import('../entities/team.js').Team}
 */
function getTeam(id) {
  if (!id || typeof id !== 'number') {
    throw new Error('Invalid id')
  }

  try {
    const teams = getTeams()
    const team = teams.find(team => team.id === id)
    return team
  } catch (error) {
    throw new Error('Team not found')
  }
}

/**
 * @returns {import('../entities/team.js').Team}
 */
function getLastTeam() {
  const teams = getTeams()
  return teams[teams.length - 1]
}

/**
 * @param {import('../entities/team.js').Team} newTeam
 * @returns {import('../entities/team.js').Team}
 */
function createTeam(newTeam) {
  if (!newTeam || !(newTeam instanceof Team)) {
    throw new Error('Invalid team')
  }

  try {
    newTeam.lastUpdated = new Date().toISOString()
    newTeam.id = getLastTeam().id + 1
    const teams = getTeams()
    const newTeams = [...teams, newTeam]
    saveTeams(newTeams)
    return newTeam
  } catch (error) {
    throw new Error('Team not created')
  }
}

/**
 * @param {number} id
 * @param {import('../entities/team.js').Team} newTeam
 * @returns {import('../entities/team.js').Team}
 */
function updateTeam(id, newTeam) {
  if (!id || typeof id !== 'number') {
    throw new Error('Invalid id')
  }
  if (!newTeam || !(newTeam instanceof Team)) {
    throw new Error('Invalid team')
  }

  try {
    const team = getTeam(id)
    const teams = getTeams()
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
    saveTeams(newTeams)
    return team
  } catch (error) {
    throw new Error('Team not updated')
  }
}

/**
 * @param {number} id
 */
function deleteTeam(id) {
  if (!id || typeof id !== 'number') {
    throw new Error('Invalid id')
  }

  try {
    const teams = getTeams()
    const newTeams = teams.filter(team => team.id !== id)
    saveTeams(newTeams)
  } catch (error) {
    throw new Error('Team not found')
  }
}

module.exports = {
  getTeam,
  getTeams,
  createTeam,
  deleteTeam,
  resetTeams,
  updateTeam,
  getBackupTeams,
}
