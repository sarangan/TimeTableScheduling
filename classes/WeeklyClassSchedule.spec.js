const WeeklyClassSchedule = require('./WeeklyClassSchedule');
const data = require('../data/classes.json');

describe('WeeklyClassSchedule', () => {
    test('Should not be more than max value', () => {
        expect(new WeeklyClassSchedule(data)).toBeInstanceOf(WeeklyClassSchedule);
    });
});