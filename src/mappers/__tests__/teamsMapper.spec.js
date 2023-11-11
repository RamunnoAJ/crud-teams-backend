const Team = require('../../entities/team.js')
const teamsMapper = require('../teamsMapper.js')

describe('teamsMapper', () => {
  test('should map api data to class instance correctly', () => {
    const inputData = {
      id: 1,
      name: 'Soccer team',
      country: 'Argentina',
      shortName: 'Soccer',
      tla: 'ARG',
      crestUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
      address: '123 Street',
      phone: '+44 (020) 010101010',
      website: 'http://www.soccerteam.com',
      email: 'info@soccer.com',
      founded: 2000,
      clubColors: 'Green / White',
      venue: 'Maracaná',
      lastUpdated: '2020-05-14T02:41:34Z',
    }
    const result = teamsMapper(inputData)

    expect(result).toBeInstanceOf(Team)
    expect(result.id).toBe(1)
    expect(result.name).toBe('Soccer team')
    expect(result.country).toBe('Argentina')
    expect(result.shortName).toBe('Soccer')
    expect(result.tla).toBe('ARG')
    expect(result.crestUrl).toBe(
      'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    )
    expect(result.address).toBe('123 Street')
    expect(result.phone).toBe('+44 (020) 010101010')
    expect(result.website).toBe('http://www.soccerteam.com')
    expect(result.email).toBe('info@soccer.com')
    expect(result.founded).toBe(2000)
    expect(result.clubColors).toBe('Green / White')
    expect(result.venue).toBe('Maracaná')
    expect(result.lastUpdated).toBe('2020-05-14T02:41:34Z')
  })
})
