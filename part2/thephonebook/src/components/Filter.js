import React from 'react';

const Filter = (props) => {
  return (
    <div>
      filter shown with{' '}
      <input
        value={props.searchFilter}
        onChange={props.handleSearchFilterChange}
        onKeyUp={props.handleSearchFilterKeyUp}
      />
    </div>
  );
};

export default Filter;
