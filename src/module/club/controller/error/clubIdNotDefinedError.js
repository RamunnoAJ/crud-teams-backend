module.exports = class ClubIdNotDefinedError extends Error {
  constructor() {
    super('Club id not defined')
  }
}
