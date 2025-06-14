import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * useApi - A reusable hook for API calls
 * @param {string|function} url - The endpoint or a function that returns the endpoint
 * @param {object} options - Optional axios config
 * @param {boolean} immediate - If true, fetch on mount
 * @returns { data, error, loading, refetch }
 */
export default function useApi(url, options, immediate = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(immediate);

  const fetchData = useCallback(async (overrideUrl) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = typeof url === 'function' ? url() : (overrideUrl || url);
      const response = await axios(options ? { url: endpoint, ...options } : { url: endpoint });
      setData(response.data);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (immediate) fetchData();
  }, [fetchData, immediate]);

  return { data, error, loading, refetch: fetchData };
}
