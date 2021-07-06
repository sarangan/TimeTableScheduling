const config = require('../config');
const { DAYS } = require('../constants');
const { getRandomArbitrary } = require('../utils');

function calculateFitness(genes){

    let fitness = 0;
    (genes || []).forEach((gene, index) => {
        if(gene.tempTime >= config.Time.morningEndTime || gene.tempTime >= config.Time.eveningEndTime){
            fitness -= 20;
        }
        else{
            fitness += 1;
        }
        const checkExists = genes.filter(tempGene => tempGene.key === gene.key );
        if(checkExists.length > 1){
            fitness -= 10; // discourage chromosome with duplicate class
        }
        else {
            fitness += 1;
        }
        const checkFrequency = genes.filter(tempGene => tempGene.name === gene.name );
        if(checkFrequency.length > gene.frequency){
            fitness -= 10; // discourage more than allocated frequency
        }
        else {
            fitness += 3;
        }
        if(checkFrequency.length === gene.frequency){
            fitness += 1;
        }
        if(index > 0 && gene.alternateKey === genes[index - 1]){
            fitness -= 3; // avoid scheduling next class with same trainer, considering human factor
        }
    });

    const checkAll = DAYS.every((day) => {
        const exists = genes.find((gene) => {
            return gene.day === day;
        });
        return !!exists;
    });

    if(checkAll){
        fitness += 3; // additional score
    }

    return fitness;
}

function selection(weeklySchedules){
    const sortedWeeklySchedules = [...weeklySchedules].sort((a , b) => b.fitness - a.fitness );
    return [sortedWeeklySchedules[0], sortedWeeklySchedules[1]]
}

function crossover(fittest, secondFittest){
    const geneLength = fittest.length;
    const crossOverPoint = getRandomArbitrary(0, geneLength);
    const updatedFirstFittest =  [...fittest.slice(0, crossOverPoint), ...secondFittest.slice(crossOverPoint, geneLength)];
    const updatedSecondFittest =  [...secondFittest.slice(0, crossOverPoint), ...fittest.slice(crossOverPoint, geneLength)];
    return [updatedFirstFittest, updatedSecondFittest];
}

function mutation(fittest, secondFittest){
    const updatedFirstFittest = [...fittest];
    const updatedSecondFittest =  [...secondFittest];
    let firstMutationPoint = getRandomArbitrary(0, fittest.length);
    let secondMutationPoint = getRandomArbitrary(0, updatedSecondFittest.length);

    const tempFirstFittest = updatedFirstFittest[firstMutationPoint];
    const tempSecondFittest = updatedSecondFittest[secondMutationPoint];

    updatedFirstFittest[firstMutationPoint] = tempSecondFittest;
    updatedSecondFittest[secondMutationPoint] = tempFirstFittest;

    return [updatedFirstFittest, updatedSecondFittest];
}

function getLeastFittestIndex(weeklySchedules){
    let minFitnessValue = Number.MAX_SAFE_INTEGER;
    let minFitnessIndex = 0;
    [...weeklySchedules].forEach((individual, index) => {
        if(minFitnessValue >= individual.fitness){
            minFitnessValue = individual.fitness;
            minFitnessIndex = index;
        }
    });
   return minFitnessIndex;
}

function getFittestOffspring(fittest, secondFittest){
    if(calculateFitness(fittest) > calculateFitness(secondFittest)){
        return fittest;
    }
    return secondFittest;
}


function addFittestOffspring(weeklySchedules, fittest){
    const updatedWeeklySchedules = [...weeklySchedules];
    const leastFittestIndex = getLeastFittestIndex(weeklySchedules);
    updatedWeeklySchedules[leastFittestIndex].genes = fittest;
    return updatedWeeklySchedules;
}

function getTimes(currTime, duration){
    let tempTime = currTime + duration;
    let session = config.Session.LUNCH_TIME;

    if(tempTime > config.Time.morningEndTime ){
        if(currTime >= config.Time.eveningStartTime){
         // indicate its already in post office
         tempTime = currTime + duration;
        }
        else{
         currTime = config.Time.eveningStartTime;
         tempTime = config.Time.eveningStartTime + duration;
        }
         session = config.Session.POST_OFFICE;
    }
    return {updatedCurrTime: currTime, tempTime, session};
}

module.exports = {
    calculateFitness,
    selection,
    crossover,
    mutation,
    getLeastFittestIndex,
    getFittestOffspring,
    addFittestOffspring,
    getTimes
}