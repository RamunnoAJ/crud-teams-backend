module.exports = class ClubNotDefinedError extends Error {
  constructor() {
    super('Club not defined')
  }
}
