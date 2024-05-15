const users = ['Keven', 'Jose', 'Marcos', 'MOnica'];

const user = {
  name: 'Keven',
  city: 'Recife',
  age: 28,
  friends: ['Jose', 'Roberto'],
};

for (let i = 0; i < users.length; i++) {
  console.log('User', users[i]);
}

console.log('---------');

let i = 0;

for (const user of users) {
  console.log(user, i);

  i++;
}

console.log('---------');

for (const key in user) {
  console.log(key, user[key]);
}

let index = 0;

while (true) {
  console.log(index, new Date());

  if (index === 100) {
    break;
  }

  index++;
}
