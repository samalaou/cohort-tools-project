const Student = require('../src/models/Student.model');
const Cohort = require('../src/models/Cohort.model');

describe('Student Model Test', () => {
  let cohortId;

  beforeAll(async () => {
    const cohortData = {
        cohortSlug: 'cohort-2024',
        cohortName: '2024 web',
        program: 'Web Dev',
        format: 'Full Time',
        campus: 'Berlin',
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-09-15'),
        inProgress: true,
        programManager: 'person1',
        leadTeacher: 'person2',
        totalHours: 300,
    };

    const cohort = new Cohort(cohortData);
    const savedCohort = await cohort.save();
    cohortId = savedCohort._id;
  });

  it('should create and save a student successfully', async () => {
    const studentData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '06666666666',
      linkedinUrl: 'https://www.linkedin.com/in/johndoe',
      languages: ['English', 'French'],
      program: 'Data Analytics',
      background: 'Software engineer',
      image: 'https://example.com/image.jpg',
      cohort: cohortId,
      projects: []
    };

    const student = new Student(studentData);
    const savedStudent = await student.save();

    expect(savedStudent._id).toBeDefined();
    expect(savedStudent.firstName).toBe(studentData.firstName);
    expect(savedStudent.lastName).toBe(studentData.lastName);
    expect(savedStudent.email).toBe(studentData.email);
    expect(savedStudent.phone).toBe(studentData.phone);
    expect(savedStudent.linkedinUrl).toBe(studentData.linkedinUrl);
    expect(savedStudent.languages).toEqual(expect.arrayContaining(studentData.languages));
    expect(savedStudent.program).toBe(studentData.program);
    expect(savedStudent.background).toBe(studentData.background);
    expect(savedStudent.image).toBe(studentData.image);
    expect(savedStudent.cohort.toString()).toBe(cohortId.toString());
  });
});
