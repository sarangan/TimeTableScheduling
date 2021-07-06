const config = require('../config');

class ClassSchedule {
    constructor(name, type, frequency, trainer, day, room, startTime, endTime, session){
        this.name = name;
        this.type = type;
        this.frequency = frequency;
        this.trainer = trainer;
        this.category = config.CategoryMapping[type.toUpperCase()];
        this.duration = config.Duration[this.category];
        this.day = day;
        this.room = room;
        this.startTime = startTime;
        this.endTime = endTime;
        this.session = session;
        this.key = `${this.name}${this.day}${this.startTime}${this.room}`.toUpperCase();
        this.alternateKey = `${this.name}${this.day}${this.trainer}`.toUpperCase();
    }
}

module.exports = ClassSchedule;