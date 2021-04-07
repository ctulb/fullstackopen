import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    console.log(process.env.WEATHERSTACK_API_KEY);
    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
          query: country[0].capital,
          units: 'm',
        },
      })
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, [country]);
  if (weather.current) {
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
        <h2>Weather in {country[0].capital}</h2>
        <p>Temperature: {weather.current.temperature}&#176;C</p>
        <p>
          <img src={weather.current.weather_icons[0]} alt="weather icon" />
        </p>
        <p>
          Wind {weather.current.wind_speed}mph {weather.current.wind_dir}
        </p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CountryDetail;
