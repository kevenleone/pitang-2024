function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

function Book(name) {
  this.name = name;
}

if (new Date().getDate() === 13) {
  throw new Error('Não funcionamos hoje.');
}

const auto = new Car('Honda', 'Accord', 1998);
const auto2 = new Car('Hyundai', 'Accord', 1998);
const auto3 = new Car('Mercedes', 'Accord', 1998);

console.log('typeof auto', typeof Book);
console.log(auto instanceof Object);

console.log('isArray', Array.isArray([]));

const date = new Date();
