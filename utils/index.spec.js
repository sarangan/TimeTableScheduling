const utils = require('./index');

describe('UTILS', () => {
    describe('UTILS:: getRandomArbitrary', () => {
        test('Should not be more than max value', () => {
            expect(utils.getRandomArbitrary(1, 3) < 3).toBe(true);
        });
        test('Should be within min value', () => {
            expect(utils.getRandomArbitrary(1, 3) >= 1).toBe(true);
        });
    });


    describe('UTILS:: formatTime', () => {
        test('Should format time with decimal', () => {
            expect(utils.formatTime(12.3)).toBe('12.30');
        });
        test('Should format time abs number', () => {
            expect(utils.formatTime(12)).toBe('12.00');
        });
    });

    describe('UTILS:: getActualTime', () => {
        test('Should get actual time with decimal', () => {
            expect(utils.getActualTime(12.5)).toBe('12:30');
        });
        test('Should get actual time for abs number', () => {
            expect(utils.getActualTime(12)).toBe('12:00');
        });
    });

    describe('UTILS:: logger', () => {
        test('Should call console.log for info', () => {
            const spy = jest.spyOn(console, 'log');
            utils.logger.info('Hi');
            expect(spy).toHaveBeenCalled();
        });
    });
});
