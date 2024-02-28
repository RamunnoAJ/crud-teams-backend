const ClubIdNotDefinedError = require('../service/error/clubIdNotDefinedError')
const fromDataToEntity = require('../mapper/clubMapper')
const AbstractController = require('../../abstractController')

module.exports = class ClubController extends AbstractController {
  /** @param {import('../service/clubService')} clubService */
  constructor(uploadMiddleware, clubService) {
    super()
    this.ROUTE_BASE = '/teams'
    this.upploadMiddleware = uploadMiddleware
    this.clubService = clubService
  }

  /** @param {import('express').Application} app */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE

    app.get(`${ROUTE}`, this.getAll.bind(this))
    app.get(`${ROUTE}:id`, this.getById.bind(this))
    app.post(
      `${ROUTE}`,
      this.upploadMiddleware.single('image'),
      this.save.bind(this),
    )
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getAll(req, res) {
    const clubs = await this.clubService.getAll()

    res.send({ clubs, errors: [] })
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async getById(req, res) {
    const id = Number(req.params.id)
    if (!id) {
      res.send({ club: null, errors: [ClubIdNotDefinedError.name] })
      return
    }

    const club = await this.clubService.getById(id)
    res.send({ club, errors: [] })
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    try {
      const club = fromDataToEntity(req.body)
      if (req.file) {
        const { path } = req.file
        club.crestUrl = path
      }
      const savedClub = await this.clubService.save(club)
      res.send({ club: savedClub, errors: [] })
    } catch (e) {
      res.send({ club: null, errors: [e.message, e.stack] })
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    try {
      const id = Number(req.params.id)
      const club = await this.clubService.getById(id)
      await this.clubService.delete(club)

      res.send({ club, errors: [] })
    } catch (e) {
      res.send({ club: null, errors: [e.message, e.stack] })
    }
  }
}
