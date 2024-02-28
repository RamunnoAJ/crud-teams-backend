jest.mock('../../mapper/clubMapper', () => ({
  fromDataToEntity: jest.fn(),
}))

const { ClubController } = require('../../module')
const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError')

const mockService = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
}

const uploadMiddleware = {
  single: jest.fn(),
}

const mockApp = {
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}

const clubController = new ClubController(uploadMiddleware, mockService)

describe('ClubController', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Configure routes', () => {
    it('should configure routes correctly', () => {
      clubController.configureRoutes(mockApp)

      expect(mockApp.get).toHaveBeenCalled()
      expect(mockApp.post).toHaveBeenCalled()
      expect(mockApp.delete).toHaveBeenCalled()
      expect(uploadMiddleware.single).toHaveBeenCalled()
    })
  })

  describe('getAll', () => {
    it('should send all clubs', async () => {
      const mockedClubs = ['club1', 'club2']
      clubController.clubService.getAll.mockResolvedValueOnce(mockedClubs)
      const mockResponse = {
        send: jest.fn(),
      }
      await clubController.getAll(null, mockResponse)

      expect(mockResponse.send).toHaveBeenCalledWith({
        clubs: mockedClubs,
        errors: [],
      })
    })
  })

  describe('getById', () => {
    it('should send club by id', async () => {
      const mockedClub = 'club1'
      clubController.clubService.getById.mockResolvedValueOnce(mockedClub)
      const mockResponse = {
        send: jest.fn(),
      }
      await clubController.getById({ params: { id: 1 } }, mockResponse)

      expect(mockResponse.send).toHaveBeenCalledWith({
        club: mockedClub,
        errors: [],
      })
    })

    it('should send error if id is not defined', async () => {
      const mockResponse = {
        send: jest.fn(),
      }
      await clubController.getById({ params: {} }, mockResponse)

      expect(mockResponse.send).toHaveBeenCalledWith({
        club: null,
        errors: [ClubIdNotDefinedError.name],
      })
    })
  })

  describe('save', () => {
    it('should save club', async () => {
      const mockedClub = 'club1'
      clubController.clubService.save.mockResolvedValueOnce(mockedClub)
      const mockResponse = {
        send: jest.fn(),
      }
      await clubController.save({ body: { name: 'club1' } }, mockResponse)

      expect(mockResponse.send).toHaveBeenCalledWith({
        club: mockedClub,
        errors: [],
      })
    })
  })

  // Similarly, write tests for other methods like getById, save, and delete
})
