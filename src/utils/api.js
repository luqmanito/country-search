import axios from 'axios';

export const fetchCountryData = (countryName) =>
  axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
