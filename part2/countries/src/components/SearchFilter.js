import React from 'react';

const SearchFilter = ({
  searchFilter,
  setSearchFilter,
  countries,
  setFilteredCountries,
}) => {
  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const updateCountryFilter = (event) => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
    );
  };

  return (
    <div>
      Find countries{' '}
      <input
        type="text"
        onChange={handleSearchFilterChange}
        onKeyUp={updateCountryFilter}
        value={searchFilter}
        name="searchfilter"
      ></input>
    </div>
  );
};

export default SearchFilter;
