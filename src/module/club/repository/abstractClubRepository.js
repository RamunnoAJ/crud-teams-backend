/* eslint-disable no-unused-vars */
const AbstractClubRepositoryError = require('./error/abstractClubRepositoryError')
const Club = require('../entity/club')

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
   * @returns {Club}
   */
  async save(club) {}

  /** @param {number} id */
  async delete(id) {}

  /**
   * @param {number} id
   * @returns {Club} */
  async getById(id) {}

  /** @returns {Club[]} */
  async getAll() {}
}
