const helper = require('./index');

describe('HELPER', () => {
    const genes =  [
        {
          "name": "Body Pump",
          "type": "Strength and Conditioning",
          "frequency": 3,
          "trainer": "Dan Perez",
          "category": "STRENGTH_AND_CONDITIONING",
          "duration": 0.75,
          "day": "MONDAY",
          "room": "BLUE",
          "startTime": 11,
          "endTime": 11.75,
          "session": {
            "name": "LUNCH_TIME",
            "startTime": "11:00",
            "endTime": "13:00"
          },
          "key": "BODY PUMPMONDAY11BLUE",
          "alternateKey": "BODY PUMPMONDAYDAN PEREZ"
        },
        {
            "name": "RPM",
            "type": "Cardio",
            "frequency": 4,
            "trainer": "William Avenue",
            "category": "CARDIO",
            "duration": 1,
            "day": "TUESDAY",
            "room": "BLUE",
            "startTime": 11,
            "endTime": 12,
            "session": {
              "name": "LUNCH_TIME",
              "startTime": "11:00",
              "endTime": "13:00"
            },
            "key": "RPMTUESDAY11BLUE",
            "alternateKey": "RPMTUESDAYWILLIAM AVENUE"
          },
    ];
    describe('HELPER:: calculateFitness', () => {
        test('Should return fitness vaLue', () => {
            expect(helper.calculateFitness(genes)).toStrictEqual(expect.any(Number));
        });
        test('Should handle empty array', () => {
            expect(helper.calculateFitness([])).toBe(0);
        });
    });

    describe('HELPER:: selection', () => {
        test('Should return fitness vaLue', () => {
            expect(helper.selection(genes)).toBeDefined();
        });
    });
});