import { TOKEN_PATH } from '../utils/constants';
import env from '../utils/env';

async function fetcher(url, options = {}) {
  const response = await fetch(`${env.VITE_BACKEND_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${sessionStorage.getItem(TOKEN_PATH)}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  const error = new Error();

  error.cause = data.message;
  error.original = data;

  throw error;
}

fetcher.delete = function () {
  return fetcher(url, {
    method: 'DELETE',
  });
};

fetcher.post = function (url, data) {
  return fetcher(url, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

fetcher.put = function (url, data) {
  return fetcher(url, {
    body: JSON.stringify(data),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default fetcher;
