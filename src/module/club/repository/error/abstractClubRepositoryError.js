module.exports = class AbstractClubRepositoryError extends Error {
  constructor() {
    super('Cannot initialize the repository of abstract class user.')
  }
}
