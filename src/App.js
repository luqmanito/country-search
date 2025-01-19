import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CountrySearch from "./screen/CountrySearch/CountrySearch";
import CountryDetail from "./screen/CountryDetail/CountryDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountrySearch />} />
        <Route path="/country/:name" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
