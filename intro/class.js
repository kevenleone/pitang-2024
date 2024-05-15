class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getYear() {
    return this.year;
  }

  setYear(year) {
    this.year = year;
  }
}

const auto = new Car('Hyundai', 'Azera', 2000);

console.log(auto);
