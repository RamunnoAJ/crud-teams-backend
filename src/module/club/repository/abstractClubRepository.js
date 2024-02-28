/* eslint-disable no-unused-vars */
const AbstractClubRepositoryError = require('./error/abstractClubRepositoryError')
const Club = require('../entity/club')
const ClubIdNotDefinedError = require('./error/clubIdNotDefinedError')
const ClubNotFoundError = require('./error/clubNotFoundError')

module.exports = class AbstractClubRepository {
  constructor() {
    if (new.target === AbstractClubRepository) {
      throw new AbstractClubRepositoryError(
        'AbstractClubRepository cannot be instantiated by itself.',
      )
    }
  }

  /**
   * @param {Club} club
   * @returns {Promise<Club>}
   */
  async save(club) {
    if (!club) {
      throw new ClubNotFoundError()
    }

    return await this.save(club)
  }

  /**
   * @param {number} id
   * @returns {boolean}
   */
  async delete(id) {
    if (!id) {
      throw new ClubIdNotDefinedError()
    }

    try {
      await this.delete(id)
    } catch (e) {
      throw new ClubNotFoundError()
    }

    return true
  }

  /**
   * @param {number} id
   * @returns {Promise<Club>} */
  async getById(id) {
    if (!id) {
      throw new ClubIdNotDefinedError()
    }

    return await this.getById(id)
  }

  /** @returns {Promise<Club[]>} */
  async getAll() {
    return await this.getAll()
  }
}
