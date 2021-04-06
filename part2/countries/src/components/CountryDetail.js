import React from 'react';

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h1>{country[0].name}</h1>
      <p>Capital: {country[0].capital}</p>
      <p>Population: {country[0].population}</p>
      <h2>Languages</h2>
      {country[0].languages.map((language) => (
        <p id={language.name}>{language.name}</p>
      ))}
      <img alt="country flag" src={country[0].flag} />
    </div>
  );
};

export default CountryDetail;
