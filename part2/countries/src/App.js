import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CountryList from './components/CountryList';
import SearchFilter from './components/SearchFilter';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://restcountries.eu/rest/v2/all?fields=name;capital;population;flag;languages;alpha3Code'
      )
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      });
  }, []);

  return (
    <div>
      <SearchFilter
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        countries={countries}
        setFilteredCountries={setFilteredCountries}
      />
      <CountryList filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
