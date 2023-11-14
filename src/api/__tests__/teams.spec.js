const {
  getTeamByID,
  getTeams,
  deleteTeamByID,
  createTeam,
} = require('../teams.js')

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

describe('getTeams', () => {
  const teams = [{ id: 1, name: 'Football team', country: 'Argentina' }]

  it('should return an array of teams', () => {
    expect(getTeams(teams)).toEqual([
      {
        id: 1,
        name: 'Football team',
        country: 'Argentina',
      },
    ])
  })
})

describe('deleteTeamByID', () => {
  const teams = [{ id: 1, name: 'Football team', country: 'Argentina' }]

  it('should throw an error if the id is not a number', () => {
    expect(() => deleteTeamByID('asd', teams, jest.fn())).toThrow('Invalid id')
  })

  it('should throw an error if the team is not found', () => {
    expect(() => deleteTeamByID(1, teams, jest.fn())).toThrow('Team not found')
  })
})

describe('createTeam', () => {
  it('should throw an error if the team is not an instance of Team', () => {
    expect(() => createTeam({})).toThrow('Invalid team')
  })
})
