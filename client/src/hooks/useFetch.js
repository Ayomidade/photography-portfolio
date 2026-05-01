import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(!!url)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    if (!url) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `https://photography-portfolio-k7o4.onrender.com${url}`,
      );
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [url, fetchData]);

  return { data, loading, error, refetch: fetchData }
}

export default useFetch;
