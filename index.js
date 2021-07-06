const WeeklyClassSchedule = require('./classes/WeeklyClassSchedule');
const { getRandomArbitrary, logger } = require('./utils');
const { selection, crossover, mutation, getFittestOffspring, addFittestOffspring } = require('./helper');
const data = require('./data/classes.json');
const { POPULATION_SIZE, GENERATION_MAX_LIMIT, TERMINATION_LIMIT, THRESHOLD } = require('./constants');

let generationCount = 0;
let weeklySchedules = [];
let fittest;
let secondFittest;
let fittestGenes;
let secondFittestGenes;


(function init(){
    logger.info('Please wait...');
    weeklySchedules = Array.from(Array(POPULATION_SIZE)).map(weeklySchedule => new WeeklyClassSchedule(data));
    weeklySchedules.forEach( weeklySchedule => { weeklySchedule.calculateFitness()});
    [fittest, secondFittest] = selection(weeklySchedules);

    while(fittest.fitnessScore() < THRESHOLD){ // run it until it reaches the score 

        generationCount += 1;
        [fittest, secondFittest] = selection(weeklySchedules);

        [fittestGenes, secondFittestGenes] = crossover(fittest.genes, secondFittest.genes);

        if(getRandomArbitrary(0, 10) < 5 ){
            [fittestGenes, secondFittestGenes] = mutation(fittestGenes, secondFittestGenes);
        }

        const fittestAmongFirstAndSecond = getFittestOffspring(fittestGenes, secondFittestGenes);

        weeklySchedules = addFittestOffspring(weeklySchedules, fittestAmongFirstAndSecond);

        weeklySchedules.forEach( weeklySchedule => { weeklySchedule.calculateFitness()});

        // terminate based on fitness score
        if(generationCount > GENERATION_MAX_LIMIT && fittest.fitnessScore() >= 0.75){
            logger.info("Force terminate: by fittest");
            break;
        }

        // avoid infinite loop
        if(generationCount > TERMINATION_LIMIT){
            logger.info("Force terminate:");
            break;
        }
    }

    logger.info(`Found closet solution...${generationCount} fitness score:: ${fittest.fitnessScore()}`);
    logger.info('');
    fittest.print();

})();
