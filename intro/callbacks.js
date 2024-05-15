const print = (callback) => (text) => callback(text);
const consoleLogCustom = print(console.log);
const consoleErrorCustom = print(console.error);

consoleLogCustom('Data....');
consoleErrorCustom('Error....');

setInterval(function () {
  console.log('Current Date:', new Date());
}, 1000);

setTimeout(() => console.log('Started now', new Date()), 1000);
