const Team = require('../entities/team.js')

/**
 * @returns {import('../entities/team.js').Team}
 */
module.exports = function teamsMapper(apiData) {
  const {
    id,
    name,
    country,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
    lastUpdated,
  } = apiData

  return new Team(
    id,
    name,
    country,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
    lastUpdated,
  )
}
