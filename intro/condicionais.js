const name = 'Keven';
const loading = true;
const users = ['Keven'];
const number = 10;

let feedbackMessage = '';

// truthy -> true, " " , {}, [], > 0 / < 0
// falsy -> false, 0, null, undefined

if (users.length || number === 10) {
  feedbackMessage = `${name} wait until the request is processing.`;
} else {
  feedbackMessage = `${name} your request is completed.`;
}

let feedbackMessage2 = `${name} your request is completed.`;

if (loading) {
  feedbackMessage2 = `${name} wait until the request is processing.`;
}

const feedbackMessage3 = loading
  ? `${name} wait until the request is processing.`
  : `${name} your request is completed.`;

if (loading) console.log('qweqwe');

if (loading) {
  console.log('qweqwe');
}

loading ? console.log('Qweoqwe') : console.error('tltltlt');

if (loading) console.log('qweqwe');

const food = 'Bolo';

switch (food) {
  case 'Pizza': {
    console.log('Pizza...');

    break;
  }

  case 'Lasanha': {
    console.log('Lasanha...');

    break;
  }

  default: {
    console.log('Comida...', food);
  }
}
