function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function formatTime(num){
    return (Math.round(Number(num) * 100) / 100).toFixed(2);
}

const logger = {
    info: (message) => {
      console.log(message);
    },
    warn: (message) => {
      console.warn(message);
    },
    debug: (message) => {
      console.debug(message);
    },
    error: (message) => {
      console.error(message);
    },
};

function getActualTime(time){
    const [hour, minutes] = `${time}`.split('.');
    const updatedMinutes = Number(`0.${minutes}`) * 60 || 0;
    return formatTime(`${hour}.${updatedMinutes}`).replace('.', ':');
}

module.exports = {
    getRandomArbitrary,
    formatTime,
    logger,
    getActualTime
};
