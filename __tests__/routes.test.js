const request = require('supertest');
const express = require('express');
const routes = require('../routes');

const app = express();
app.use(express.json());
app.use('/', routes);

jest.mock('../services/ipService', () => ({
  fetchIPData: jest.fn().mockResolvedValue({
    country_code: 'DE',
    latitude: '43.1212',
    longitude: '73.5829'
  })
}));

describe('POST /', () => {
  it('should return location data for a valid request', async () => {
    const response = await request(app)
      .post('/')
      .send({
        reqId: '12345',
        ip: '8.8.8.8'
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      reqId: '12345',
      country: 'DE',
      lat: '43.1212',
      lon: '73.5829'
    });
  });

  it('should return an error for missing reqId', async () => {
    const response = await request(app)
      .post('/')
      .send({
        ip: '8.8.8.8'
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'reqId is required'
    });
  });

  it('should return an error for missing ip', async () => {
    const response = await request(app)
      .post('/')
      .send({
        reqId: '12345'
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'ip is required'
    });
  });

  it('should return an error for invalid ip', async () => {
    const response = await request(app)
      .post('/')
      .send({
        reqId: '12345',
        ip: 'invalid_ip'
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: '"ip" must be a valid ip address of one of the following versions [ipv4, ipv6] with a optional CIDR'
    });
  });

  it('should return a 500 error if fetchIPData fails', async () => {
    const mockFetchIPData = require('../services/ipService').fetchIPData;
    mockFetchIPData.mockRejectedValueOnce(new Error('Failed to fetch IP data'));

    const originalConsoleError = console.error;
    console.error = jest.fn();

    const response = await request(app)
      .post('/')
      .send({
        reqId: '12345',
        ip: '8.8.8.8'
      });

    console.error = originalConsoleError;

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Failed to fetch location data'
    });
  });
});
