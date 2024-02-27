const AbstractClubRepository = require('../abstractClubRepository')
const Club = require('../../entity/club')
const ClubNotFoundError = require('./error/clubNotFoundError')

module.exports = class ClubRepository extends AbstractClubRepository {
  /**
   * @param {string} uuid
   * @param {import('fs')} fileSystem
   * @param {string} dbFilePath
   * @param {string} dbBackupFilePath
   */
  constructor(uuid, fileSystem, dbFilePath, dbBackupFilePath) {
    super()
    this.uuid = uuid
    this.fileSystem = fileSystem
    this.dbFilePath = dbFilePath
    this.dbBackupFilePath = dbBackupFilePath
  }

  /**
   * @param {Club} club
   * @returns {Club}
   */
  async save(club) {
    const clubs = await this.getAll()
    let clubToSave

    if (club.id) {
      const clubIndex = clubs.findIndex(tmpClub => tmpClub.id === club.id)
      if (clubIndex === -1) {
        throw new ClubNotFoundError()
      }

      const oldClub = clubs[clubIndex]
      clubs[clubIndex] = club
      clubToSave = clubs

      if (!club.crestUrl) {
        clubToSave[clubIndex].crestUrl = oldClub.crestUrl
      } else {
        clubToSave = { ...club, ...{ id: this.uuid } }
        clubs.push(clubToSave)
      }

      this.saveData(clubs)
      return new Club(clubToSave)
    }
  }
}
