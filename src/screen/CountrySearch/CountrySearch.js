import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCountrySearch from "../../hooks/useCountrySearch";
import "./CountrySearch.css";

function CountrySearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { countries, loading, error } = useCountrySearch(query);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <h1 className="country">Country</h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Type any country name"
          value={query}
          onChange={handleInputChange}
        />
        <span className="search-icon">🔍</span>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && countries.length > 0 && (
        <ul className="suggestion-list">
          {countries.map((country) => (
            <li
              key={country.name.common}
              onClick={() => navigate(`/country/${country.name.common}`)}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
      {!loading && error && <p className="error">{error}</p>}
    </div>
  );
}

export default CountrySearch;
