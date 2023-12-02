module.exports = class Team {
  /**
   * @param {number} id
   * @param {string} name
   * @param {string} country
   * @param {string} shortName
   * @param {string} tla
   * @param {string} crestUrl
   * @param {string} address
   * @param {string} phone
   * @param {string} website
   * @param {string} email
   * @param {number} founded
   * @param {string} clubColors
   * @param {string} venue
   * @param {string} lastUpdated
   */
  constructor(
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
  ) {
    this.id = id
    this.name = name
    this.country = country
    this.shortName = shortName
    this.tla = tla
    this.crestUrl = crestUrl
    this.address = address
    this.phone = phone
    this.website = website
    this.email = email
    this.founded = founded
    this.clubColors = clubColors
    this.venue = venue
    this.lastUpdated = lastUpdated
  }
}
