const ClassSchedule = require('./ClassSchedule');

describe('ClassSchedule', () => {
    test('Should create class Schedule object', () => {
        expect(new ClassSchedule('name', 'type', 'frequency', 'trainer', 'day', 'room', 'startTime', 'endTime', 'session')).toBeInstanceOf(ClassSchedule);
    });
});