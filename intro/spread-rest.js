const userDefault = {
  city: 'Recife',
  school: 'POLI',
};

const user = {
  ...userDefault,
  test: {
    ...userDefault,
    abc: 'qweqwe',
  },
  name: 'Keven',
};

const parts = ['shoulders', 'knees'];
const parts2 = [...parts];

parts2.push('new');

console.log({ parts, parts2 });

const lyrics = ['head', ...parts, 'and', 'toes'];
// ["head", "shoulders", "knees", "and", "toes"]

console.log(lyrics);

var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };

function sum2(...values) {
  let result = 0;

  for (const value of values) {
    result += value;
  }

  return result;
}

const sum = (...values) =>
  values.reduce((prevValue, currValue) => prevValue + currValue);

console.log(sum(1, 2, 3, 4, 5));
