import React from 'react';
import CountryDetail from './CountryDetail';

const CountryList = ({ filteredCountries, setFilteredCountries }) => {
  const handleShowClick = (event) => {
    setFilteredCountries(
      filteredCountries.filter((country) => country.name === event.target.name)
    );
    return <CountryDetail country={filteredCountries} />;
  };

  if (filteredCountries.length > 10) {
    return <div>Too many matches, please make your filter more specific</div>;
  } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        <ul>
          {filteredCountries.map((country) => (
            <li id={country.alpha3Code}>
              {country.name}
              <button name={country.name} onClick={handleShowClick}>
                Show
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries} />;
  } else {
    return <div>None found</div>;
  }
};

export default CountryList;
