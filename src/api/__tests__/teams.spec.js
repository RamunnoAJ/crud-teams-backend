const { getTeamByID } = require('../teams.js')

describe('getTeamByID', () => {
  const teams = [{ id: 1, name: 'Football team', country: 'Argentina' }]

  it('should return a team', () => {
    expect(getTeamByID(1, teams)).toEqual({
      id: 1,
      name: 'Football team',
      country: 'Argentina',
    })
  })

  it('should throw an error if team not found', () => {
    expect(() => getTeamByID(2, teams)).toThrow('Team not found')
  })

  it('should throw an error if id is not a number', () => {
    expect(() => getTeamByID('1', teams)).toThrow('Invalid id')
  })
})
