const numbers = [1, 2, 3, 4, 5, 6, 7, 7];

const users = [
  { city: 'Palmares', name: 'Keven' },
  { city: 'Recife', name: 'Joao' },
  { city: 'Recife', name: 'Debora' },
];

console.log(numbers.length);

const newNumbers = numbers.concat([100, 200, 300, 400, 500]);

console.log(numbers.join(' and '));
console.log('Fill', [...numbers].fill(333, 2));

numbers.forEach(function (number, index) {
  console.log(number, index);
});

const user = users.find((user) => user.name === 'Keven');
const userRecife = users.find((user) => user.city === 'Palmares');
const usersRecife = users.filter((user) => user.city === 'Recife');
const someUsersLivesInRecife = users.some((user) => user.city === 'Recife');
const allUsersLivesInRecife = users.every((user) => user.city === 'Recife');
const newUsers = users.map((user, index) => ({
  ...user,
  priority: index + 1,
}));

const sumNumbers = numbers.reduce((previousValue, currentValue) => {
  return previousValue + currentValue;
}, 0);

console.log(user);
console.log(userRecife);
console.log(usersRecife);
console.log(someUsersLivesInRecife);
console.log(allUsersLivesInRecife);
console.log(newUsers);
console.log(sumNumbers);
