import { useState, useEffect } from "react";
import axios from "axios";

const useCountrySearch = (query) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      if (!query) {
        setCountries([]);
        setError(null);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${query}`
        );
        const data = response.data;
        setCountries(data.length > 5 ? data.slice(0, 5) : data);
        setError(null);
      } catch (err) {
        setCountries([]);
        setError("Data not found");
      }
      setLoading(false);
    };

    const delayDebounceFn = setTimeout(() => {
      fetchCountries();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return { countries, loading, error };
};

export default useCountrySearch;
