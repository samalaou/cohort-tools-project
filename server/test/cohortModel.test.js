const Cohort = require('../models/Cohort.model');

describe('Cohort Model Test', () => {
  it('should create and save a cohort successfully', async () => {
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

    expect(savedCohort._id).toBeDefined();
    expect(savedCohort.cohortSlug).toBe(cohortData.cohortSlug);
    expect(savedCohort.cohortName).toBe(cohortData.cohortName);
  });
});
