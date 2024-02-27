/* eslint-disable no-unused-vars */
/** @typedef {import('../repository/abstractClubRepository')} AbstractClubRepository */

const ClubNotDefinedError = require('./error/clubNotDefinedError')
const ClubIdNotDefinedError = require('./error/clubIdNotDefinedError')
const Club = require('../entity/club')

module.exports = class ClubService {
  /** @param {AbstractClubRepository} clubRepository */
  constructor(clubRepository) {
    this.clubRepository = clubRepository
  }

  /** @param {Club} club */
  async save(club) {
    if (!club) {
      throw new ClubNotDefinedError()
    }

    return this.clubRepository.save(club)
  }

  /** @param {Club} club */
  async delete(club) {
    if (!club) {
      throw new ClubNotDefinedError()
    }

    return this.clubRepository.delete(club)
  }

  /** @param {number} id
   *  @returns {Promise<Club>}
   */
  async getById(id) {
    if (!id) {
      throw new ClubIdNotDefinedError()
    }

    return this.clubRepository.getById(id)
  }

  /** @returns {Promise<Club[]>} */
  async getAll() {
    return this.clubRepository.getAll()
  }
}
