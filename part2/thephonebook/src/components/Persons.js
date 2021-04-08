import React from 'react';

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      <ul>
        {personsToShow.map((person) => (
          <div key={person.id}>
            <li>
              {person.name} {person.phoneNumber}
            </li>
            <button name={person.name} onClick={handleDelete}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
