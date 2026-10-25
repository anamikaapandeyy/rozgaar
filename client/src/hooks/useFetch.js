import { useEffect, useState } from 'react';

export default function useFetch(fetcher) {
  const [result, setResult] = useState({ fetcher: null, data: null, error: null });

  useEffect(() => {
    let ignore = false;

    fetcher()
      .then((data) => {
        if (!ignore) setResult({ fetcher, data, error: null });
      })
      .catch((error) => {
        if (!ignore) setResult({ fetcher, data: null, error });
      });

    return () => {
      ignore = true;
    };
  }, [fetcher]);

  const loading = result.fetcher !== fetcher;

  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
  };
}