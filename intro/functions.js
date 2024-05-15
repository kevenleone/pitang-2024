function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Um dos parâmetros não é número.');
  }

  return a + b;
}

const sum2 = function (a, b) {
  return a + b;
};

const sum3 = (a, b) => a + b;

console.log(sum(1, 3));
console.log(sum(1, 1));
console.log(sum2([], 1));
console.log(sum3({}, 1));
