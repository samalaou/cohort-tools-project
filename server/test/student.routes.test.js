const request = require('supertest');
const { app } = require('../src/app');
const Student = require('../src/models/Student.model');
const Cohort = require('../src/models/Cohort.model');
const { generateMockToken } = require('./test.utils');

const mockToken = generateMockToken();

describe('Student Routes', () => {
  let cohort;

  beforeAll(async () => {
    await Student.deleteMany({});
    await Cohort.deleteMany({});

    cohort = await Cohort.create({
      cohortSlug: 'webdev2024',
      cohortName: 'Web Development 2024',
      program: 'Web Dev',
      format: 'Full Time',
      campus: 'Berlin',
      programManager: 'John Doe',
      leadTeacher: 'Jane Smith',
      totalHours: 360
    });

    await Student.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phone: '987654321',
      languages: ['English'],
      program: 'UX/UI',
      cohort: cohort._id
    });
  });

  afterAll(async () => {
    await Student.deleteMany({});
    await Cohort.deleteMany({});
  });

  it('should GET all students', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${mockToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should POST a new student', async () => {
    const newStudent = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      languages: ['English', 'Spanish'],
      program: 'Web Dev',
      cohort: cohort._id
    };

    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${mockToken}`)
      .send(newStudent);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('john.doe@example.com');
  });

  it('should GET students by cohort ID', async () => {
    const res = await request(app)
      .get(`/api/students/cohort/${cohort._id}`)
      .set('Authorization', `Bearer ${mockToken}`);
  
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  
    // test populate
    expect(res.body[0].cohort).toHaveProperty('cohortSlug');
  });
  
  it('should GET a student by ID', async () => {
    const student = await Student.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '987654321',
      languages: ['English'],
      program: 'UX/UI',
      cohort: cohort._id
    });
  
    const res = await request(app)
      .get(`/api/students/${student._id}`)
      .set('Authorization', `Bearer ${mockToken}`);
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', 'jane.doe@example.com');
    expect(res.body.cohort).toHaveProperty('_id', cohort._id.toString());
  
    // test populate
    expect(res.body.cohort).toHaveProperty('cohortSlug');
  });
  
  it('should UPDATE a student by ID', async () => {
    const student = await Student.create({
      firstName: 'Tom',
      lastName: 'Hanks',
      email: 'tom.hanks@example.com',
      phone: '555666777',
      languages: ['English'],
      program: 'Data Analytics',
      cohort: cohort._id
    });
  
    const res = await request(app)
      .put(`/api/students/${student._id}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ phone: '999888777' });
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('phone', '999888777');
  });
  
  it('should DELETE a student by ID', async () => {
    const student = await Student.create({
      firstName: 'Elon',
      lastName: 'Musk',
      email: 'elon.musk@example.com',
      phone: '111222333',
      languages: ['English'],
      program: 'Cybersecurity',
      cohort: cohort._id
    });
  
    const res = await request(app)
      .delete(`/api/students/${student._id}`)
      .set('Authorization', `Bearer ${mockToken}`);
  
    expect(res.statusCode).toBe(204);
  
    const deletedStudent = await Student.findById(student._id);
    expect(deletedStudent).toBeNull();
  });
  
  it('should return 404 when student is not found', async () => {
    const nonExistentId = '64a7f7e4b2a3c4d9f1e2a1bc';
    const res = await request(app)
      .get(`/api/students/${nonExistentId}`)
      .set('Authorization', `Bearer ${mockToken}`);
  
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Student not found');
  });  
});
