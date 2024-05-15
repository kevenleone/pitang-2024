const usersTurmA = ['keven', 'joana', 'maria', 'marcos'];
const usersTurmB = ['ricardo', 'marcia', 'pedro'];

const user = {
  name: 'Keven',
  city: 'Outra cidade',
  school: {
    address: 'Benfica',
    name: 'POLI',
  },
};

// Old way
// const userA = users[0];
// const userB = users[1];
// const userC = users[2];
// const userD = users[3];

// const name = user.name;
// const city = user.city;
// const school = user.school;
// const schoolAddress = user.school.address;
// const name = [user][0].name

// New way
// const [userA, userB, userC, userD] = users;
// const [userA] = users;
// const [, userB] = users;
// const [, , userC] = users;
// const [userA, , userC] = users;
// const [userA, , userC] = users;
// const [userA, ...restUsers] = [...usersTurmA, ...usersTurmB];
// const [{ name }] = [user, user, user];

const {
  city = 'Recife',
  school: { address: schoolAddress, name: schoolName }, // Renomeando
  ...restUser
} = user;

console.log(city, restUser);
