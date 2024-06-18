import { useEffect, useState } from 'react';

import fetcher from '../services/api';

export default function useShortners() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState({
    items: [],
    page: 1,
    pageSize: 20,
    totalCount: 0,
  });

  useEffect(() => {
    fetcher('/api/shortner')
      .then((data) => setResponse(data))
      .catch((error) => {
        console.error(error);

        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    error,
    loading,
    response,
  };
}
