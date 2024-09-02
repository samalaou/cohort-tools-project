const request = require('supertest');
const { app } = require('../src/app'); 
const { generateMockToken } = require('./test.utils');

const mockToken = generateMockToken();

describe('Integration Tests', () => {
  test('should serve the docs.html file at /docs', async () => {
    const res = await request(app).get('/docs');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toBe('text/html; charset=UTF-8');
  });

  test('should return a JSON array of cohorts at /api/cohorts', async () => {
    const res = await request(app).get('/api/cohorts').set('Authorization', `Bearer ${mockToken}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should return a JSON array of students at /api/students', async () => {
    const res = await request(app).get('/api/students').set('Authorization', `Bearer ${mockToken}`);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
