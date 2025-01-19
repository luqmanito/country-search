import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CountryDetail.css";
import Card from "../components/Card";
import Info from "../components/Info";

function CountryDetail() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [codes, setCodes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const data = response.data[0];
        setCountry(data);
        setError(null);
      } catch (err) {
        setCountry(null);
        setError("Country data not found");
      }
    };

    fetchCountry();
  }, [name]);

  useEffect(() => {
    const fetchCountryCode = async () => {
      if (!country) return;
      try {
        const response = await axios.get(
          `https://restcountries.com/v2/callingcode/${
            country?.idd?.root?.replace("+", "") +
            (country.idd?.suffixes?.[0] || "")
          }`
        );
        setCodes(response.data);
      } catch (err) {
        setCodes([]);
      }
    };

    const fetchCurrency = async () => {
      if (!country) return;
      try {
        const response = await axios.get(
          `https://restcountries.com/v2/currency/${Object.keys(
            country?.currencies || {}
          ).join(",")}`
        );
        setCurrencies(response.data);
      } catch (err) {
        setCurrencies([]);
      }
    };

    fetchCountryCode();
    fetchCurrency();
  }, [country]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!country) {
    return <p>Loading...</p>;
  }

  const callingCode =
    country.idd?.root?.replace("+", "") + (country.idd?.suffixes?.[0] || "");

  return (
    <div className="country-detail">
      <button onClick={() => navigate("/")}>← Back to Homepage</button>
      <h1>
        {country.name.common}{" "}
        {country.flags && (
          <img src={country.flags.png} alt={`${country.name.common} flag`} />
        )}
      </h1>
      <div className="country-tag">
        <div className="country-info">
          <span className="tag">{country.cca2}</span>
        </div>
        <div className="country-info">
          <span className="tag">{country.name.official}</span>
        </div>
        <div className="country-info">
          <span className="tag">
            {" "}
            {Object.values(country.name.nativeName)[0]?.official || "N/A"}
          </span>
        </div>
      </div>
      <div className="cards-container">
        <div className="card-item">
          <Card
            info={[
              {
                label: "LatLong",
                value: `${country.latlng[0].toFixed(
                  1
                )}, ${country.latlng[1].toFixed(1)}`,
              },
            ]}
            icon={<i className="fas fa-globe"></i>}
          />
        </div>
        <div className="card-item">
          <Card
            info={[
              { label: "Capital :", value: country.capital?.[0] || "N/A" },
              { label: "Region :", value: country.region || "N/A" },
              { label: "Subregion :", value: country.subregion || "N/A" },
            ]}
          />
        </div>
      </div>

      <div className="info-inline">
        <Info
          label="Calling Code"
          value={callingCode}
          tooltipLabel={`countr${codes.length > 1 ? "ies" : "y"}`}
          tooltipItems={codes}
        />
        <Info
          label="Currency"
          value={Object.keys(country.currencies || {}).join(", ")}
          tooltipLabel={`countr${currencies.length > 1 ? "ies" : "y"}`}
          tooltipItems={currencies}
        />
      </div>
    </div>
  );
}

export default CountryDetail;
