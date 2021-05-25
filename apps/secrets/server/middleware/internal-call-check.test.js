describe('internal-call-check', () => {

  let config;
  beforeEach(() => {
    jest.mock('../../config');
    config = require('../../config');
  });

  afterEach(() => {
    jest.unmock('../../config');
    jest.clearAllMocks();
  });

  describe('when request includes valid secret', () => {
    test('should continue with express middlewares', () => {
      const next = jest.fn();
      const req = { headers: { internal_secret: config.internalSecret } };

      require('./internal-call-check')(req, {}, next);

      expect(next).toBeCalled();
    });
  });

  describe('when request not includes valid secret', () => {
    test('should response not authorized to user', () => {

      config.internalSecret = 'aaaa';

      const req = { headers: { internal_secret: 'bbbb' } };

      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn().mockImplementation(() => res),
        end: jest.fn().mockImplementation(() => res),
      };

      require('./internal-call-check')(req, res);

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toBeCalledWith(401);

      expect(res.json).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({ 'message': 'you are not allowed' });

      expect(res.end).toBeCalledTimes(1);

      expect({
        status: res.status.mock.calls,
        json: res.json.mock.calls,
        end: res.end.mock.calls,
      }).toMatchSnapshot();
    });

  });

})
