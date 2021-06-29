const fetchAnswers = require('./gservice');

console.log('Started');

const mainFunc = () => {
    fetchAnswers();
    console.log('Fetching new answers');
};

setInterval(mainFunc, 60 * 1000);