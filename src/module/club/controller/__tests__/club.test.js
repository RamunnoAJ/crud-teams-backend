const ClubController = require('../clubController')

const uploadMiddleware = {
  single: jest.fn(),
}

const serviceMock = {
  save: jest.fn(),
  getAll: jest.fn(() => Promise.resolve([])),
  getById: jest.fn(() => Promise.resolve({})),
  delete: jest.fn(() => Promise.resolve(true)),
}

const controller = new ClubController(uploadMiddleware, serviceMock)

describe('ClubController', () => {
  it('should configure the routes', async () => {
    const app = {
      get: jest.fn(),
      post: jest.fn(),
    }
    controller.configureRoutes(app)
    expect(app.get).toHaveBeenCalledWith(
      controller.ROUTE_BASE,
      controller.getAll,
    )
    expect(app.get).toHaveBeenCalledWith(
      `${controller.ROUTE_BASE}:id`,
      controller.getById,
    )
    expect(app.post).toHaveBeenCalledWith(
      controller.ROUTE_BASE,
      uploadMiddleware.single('image'),
      controller.save,
    )
    expect(app.delete).toHaveBeenCalled()
  })
})
