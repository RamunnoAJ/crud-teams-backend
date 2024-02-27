const Club = require('../../entity/club')
const ClubService = require('../clubService')
const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError')
const ClubNotDefinedError = require('../error/clubNotDefinedError')

describe('ClubService', () => {
  let clubService
  let mockClubRepository

  beforeEach(() => {
    mockClubRepository = {
      save: jest.fn(),
      delete: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
    }
    clubService = new ClubService(mockClubRepository)
  })

  describe('save method', () => {
    test('should throw ClubNotDefinedError when club is not defined', async () => {
      await expect(clubService.save()).rejects.toThrow(ClubNotDefinedError)
    })

    test('should call clubRepository save method', async () => {
      const club = new Club()
      await clubService.save(club)
      expect(mockClubRepository.save).toHaveBeenCalledWith(club)
    })
  })

  describe('delete method', () => {
    test('should throw ClubNotDefinedError when club is not defined', async () => {
      await expect(clubService.delete()).rejects.toThrow(ClubNotDefinedError)
    })

    test('should call clubRepository delete method', async () => {
      const club = new Club()
      await clubService.delete(club)
      expect(mockClubRepository.delete).toHaveBeenCalledWith(club)
    })
  })

  describe('getById method', () => {
    test('should throw ClubIdNotDefinedError when id is not defined', async () => {
      await expect(clubService.getById()).rejects.toThrow(ClubIdNotDefinedError)
    })

    test('should call clubRepository getById method', async () => {
      const id = 1
      await clubService.getById(id)
      expect(mockClubRepository.getById).toHaveBeenCalledWith(id)
    })
  })

  describe('getAll method', () => {
    test('should call clubRepository getAll method', async () => {
      await clubService.getAll()
      expect(mockClubRepository.getAll).toHaveBeenCalled()
    })
  })
})
