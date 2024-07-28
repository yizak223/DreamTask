const { validateRequest } = require('../validators/requestValidator');

describe('Request Validator', () => {
  it('should validate a correct request', () => {
    const request = {
      reqId: '12345',
      ip: '8.8.8.8'
    };
    const { error } = validateRequest(request);
    expect(error).toBeUndefined();
  });

  it('should return an error for missing reqId', () => {
    const request = {
      ip: '8.8.8.8'
    };
    const { error } = validateRequest(request);
    expect(error).toBeDefined();
    expect(error.details[0].message).toBe('reqId is required');
  });

  it('should return an error for missing ip', () => {
    const request = {
      reqId: '12345'
    };
    const { error } = validateRequest(request);
    expect(error).toBeDefined();
    expect(error.details[0].message).toBe('ip is required');
  });

  it('should return an error for invalid ip', () => {
    const request = {
      reqId: '12345',
      ip: 'invalid_ip'
    };
    const { error } = validateRequest(request);
    expect(error).toBeDefined();
    expect(error.details[0].message).toBe('"ip" must be a valid ip address of one of the following versions [ipv4, ipv6] with a optional CIDR');
  });
});
