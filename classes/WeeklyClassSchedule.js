const ClassSchedule = require('./ClassSchedule');
const config = require('../config');
const { getRandomArbitrary, formatTime, logger, getActualTime } = require('../utils');
const { calculateFitness, getTimes } = require('../helper');
const { DAYS, ROOMS } = require('../constants');

class WeeklyClassSchedule {
    fitness = 0;
    genes = [];
    accTimeMapping = {};
    totalClass = 0;

    constructor(data){
        this.totalClass = data.reduce((acc, cur) => acc += cur.frequency , 0);
        this.generateChromosome(this.totalClass, data);
    }

    getClassScheduleObject(data){
        const pickClassIndex = getRandomArbitrary(0, data.length);
        const tempClass = data[pickClassIndex];
        const pickDay = getRandomArbitrary(0, DAYS.length);
        const pickRoom = ROOMS[getRandomArbitrary(0, ROOMS.length)];

        let currTime = this.accTimeMapping[`${DAYS[pickDay]}${pickRoom}`] || config.Time.morningStartTime;
        const duration = config.Duration[config.CategoryMapping[tempClass.type.toUpperCase()]];
        const {updatedCurrTime, tempTime, session } = getTimes(currTime, duration);
        this.accTimeMapping[`${DAYS[pickDay]}${pickRoom}`] = tempTime;

        return new ClassSchedule(
            tempClass.name,
            tempClass.type,
            tempClass.frequency,
            tempClass.trainer,
            DAYS[pickDay],
            pickRoom,
            updatedCurrTime,
            tempTime,
            session
        );
    }

    generateChromosome(totalClass, data){
        for(let i = 0; i < totalClass; i++){
            this.genes.push(this.getClassScheduleObject(data));
        }
    }

    calculateFitness(){
        this.fitness = calculateFitness(this.genes);
    }

    fitnessScore(){

        let totalFitness = 0;
        this.genes.forEach((gene) => {
            totalFitness += 3; // must satisfy 3 scores
        });

        const checkAll =  DAYS.every((day) => {
            const exists = this.genes.find((gene) => {
                return gene.day === day;
            });
            return !!exists;
        });

        if(checkAll){
            totalFitness += 3; // add additional points for scheduled in all days
        }
        return this.fitness / totalFitness;
    }

    print(){
        let duplicateCheck = {};
        DAYS.forEach(day => {
            const getDaySchedule = this.genes.filter(gene => gene.day === day).sort((a, b) => a.startTime - b.startTime);
            Object.keys(config.Session).sort().forEach(session => {
                const sessionSchedule =  getDaySchedule.filter(roomSession => roomSession.session.name === session );
                if(sessionSchedule.length > 0){
                    ROOMS.forEach(room => {
                        const roomSchedule =  sessionSchedule.filter(roomSelection => roomSelection.room === room);
                        if(roomSchedule.length > 0){
                            logger.info(`${day}, Room ${room}, ${config.Session[session].startTime} - ${config.Session[session].endTime} :`);
                            roomSchedule.forEach( schedule => {
                                const key = `${day}_${room}_${formatTime(schedule.startTime)}`;
                                if(!duplicateCheck[key]){
                                    logger.info(`${getActualTime(schedule.startTime)} - ${schedule.name} - ${schedule.type} -  ${schedule.trainer}`);
                                    duplicateCheck[key] = 1;
                                }
                            });
                        }
                    });
                }
            });
        });
    }
}

module.exports = WeeklyClassSchedule;
