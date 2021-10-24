describe('encryptions', () => {

  let config;
  beforeEach(() => {
    jest.mock('../../config');
    config = require('../../config');
  });

  afterEach(() => {
    jest.unmock('../../config');
    jest.clearAllMocks();
  });

  describe('encrypt function', () => {
    test('should encrypt objects without throwing an error', () => {
      const result = require('./encryptions').encrypt({ a: 1, b: 2, c: true, d: "some text" }, 'abcdefg');

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    test('should encrypt when secret is null', () => {
      const result = require('./encryptions').encrypt({ a: 1, b: 2, c: true, d: "some text" }, null);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });


  describe('hashSecretKey function', () => {
    test('should hash a string', () => {
      const result = require('./encryptions').hashSecretKey('abcd');
      expect(result).toBeDefined();
    });
  });
})
