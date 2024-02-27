module.exports = class ClubNotFoundError extends Error {
  constructor() {
    super('Club not found.')
  }
}
