const request = require('supertest');
const { app } = require('../src/app');
const Cohort = require('../src/models/Cohort.model');
const { generateMockToken } = require('./test.utils');

const mockToken = generateMockToken();

describe('Cohort Routes', () => {
  beforeAll(async () => {
    await Cohort.deleteMany({});
  });

  afterAll(async () => {
    await Cohort.deleteMany({});
  });

  it('should GET all cohorts', async () => {
    const res = await request(app)
      .get('/api/cohorts')
      .set('Authorization', `Bearer ${mockToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should POST a new cohort', async () => {
    const newCohort = {
      cohortSlug: 'webdev2024',
      cohortName: 'Web Development 2024',
      program: 'Web Dev',
      format: 'Full Time',
      campus: 'Berlin',
      programManager: 'John Doe',
      leadTeacher: 'Jane Smith',
      totalHours: 360
    };

    const res = await request(app)
      .post('/api/cohorts')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(newCohort);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.cohortSlug).toBe('webdev2024');
  });

  it('should GET a cohort by ID', async () => {
    const cohort = await Cohort.create({
      cohortSlug: 'uxui2024',
      cohortName: 'UX/UI 2024',
      program: 'UX/UI',
      format: 'Part Time',
      campus: 'Madrid',
      programManager: 'Alice Doe',
      leadTeacher: 'Bob Smith',
      totalHours: 200
    });

    const res = await request(app)
      .get(`/api/cohorts/${cohort._id}`)
      .set('Authorization', `Bearer ${mockToken}`)
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('cohortSlug', 'uxui2024');
  });

  it('should UPDATE a cohort by ID', async () => {
    const cohort = await Cohort.create({
      cohortSlug: 'cyber2024',
      cohortName: 'Cybersecurity 2024',
      program: 'Cybersecurity',
      format: 'Full Time',
      campus: 'Paris',
      programManager: 'Carol Danvers',
      leadTeacher: 'Peter Parker',
      totalHours: 400
    });

    const res = await request(app)
      .put(`/api/cohorts/${cohort._id}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ cohortName: 'Updated Cybersecurity 2024' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('cohortName', 'Updated Cybersecurity 2024');
  });

  it('should DELETE a cohort by ID', async () => {
    const cohort = await Cohort.create({
      cohortSlug: 'data2024',
      cohortName: 'Data Analytics 2024',
      program: 'Data Analytics',
      format: 'Full Time',
      campus: 'Amsterdam',
      programManager: 'Steve Rogers',
      leadTeacher: 'Tony Stark',
      totalHours: 300
    });

    const res = await request(app).delete(`/api/cohorts/${cohort._id}`).set('Authorization', `Bearer ${mockToken}`);
    expect(res.statusCode).toBe(204);

    const deletedCohort = await Cohort.findById(cohort._id);
    expect(deletedCohort).toBeNull();
  });

  it('should return 404 when cohort is not found', async () => {
    const nonExistentId = '64a7f7e4b2a3c4d9f1e2a1bc';
    const res = await request(app).get(`/api/cohorts/${nonExistentId}`).set('Authorization', `Bearer ${mockToken}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Cohort not found');
  });
});
