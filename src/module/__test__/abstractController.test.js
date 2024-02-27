const AbstractController = require('../abstractController')
const AbstractControllerError = require('../error/abstractControllerError')

describe('AbstractController', () => {
  test('constructor throws AbstractControllerError when instantiated directly', () => {
    expect(() => new AbstractController()).toThrow(AbstractControllerError)
  })

  test('constructor does not throw AbstractControllerError when instantiated through subclass', () => {
    class SubclassController extends AbstractController {}
    expect(() => new SubclassController()).not.toThrow(AbstractControllerError)
  })
})
