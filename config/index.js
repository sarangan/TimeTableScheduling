module.exports = {
    Duration: {
        STRENGTH_AND_CONDITIONING: 0.75,
        CARDIO: 1,
        MIND_AND_BODY: 0.5,
        DANCE: 1
    },
    CategoryMapping: {
        ['STRENGTH AND CONDITIONING']: 'STRENGTH_AND_CONDITIONING',
        ['CARDIO']: 'CARDIO',
        ['MIND AND BODY']: 'MIND_AND_BODY',
        ['DANCE']: 'DANCE'
    },
    Time: {
        morningStartTime: 11,
        morningEndTime: 13,
        eveningStartTime: 18,
        eveningEndTime: 20
    },
    Session: {
        LUNCH_TIME: {
            name: 'LUNCH_TIME',
            startTime: '11:00',
            endTime: '13:00'
        },
        POST_OFFICE: {
            name: 'POST_OFFICE',
            startTime: '18:00',
            endTime: '20:00'
        }
    }
}