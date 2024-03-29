const ClubController = require('./controller/clubController')
const ClubRepository = require('./repository/json/clubRepository')
const ClubService = require('./service/clubService')

/**
 * @param {import('express').Application)} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  const controller = container.get('ClubController')
  controller.configureRoutes(app)
}

module.exports = {
  init,
  ClubRepository,
  ClubService,
  ClubController,
}
