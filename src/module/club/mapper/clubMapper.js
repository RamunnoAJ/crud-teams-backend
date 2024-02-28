const Club = require('../entity/club')

/**
 * @param {Object} apiData
 * @returns {Club}
 */
module.exports = function fromDataToEntity(apiData) {
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

  return new Club(
    Number(id),
    name,
    country,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    Number(founded),
    clubColors,
    venue,
    lastUpdated,
  )
}
