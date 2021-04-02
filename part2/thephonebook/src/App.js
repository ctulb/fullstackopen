import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '01234 567890' },
    { name: 'Michael Jordan', phoneNumber: '09876 543210' },
    { name: 'Michael Jackson', phoneNumber: '01357 913579' },
    { name: 'Johnny Davidson', phoneNumber: '02468 024680' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [personsToShow, setPersonsToShow] = useState(persons);

  const handleAdd = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phoneNumber: newPhoneNumber,
    };
    if (persons.filter((person) => person.name === newName).length) {
      alert(`${newName} has already been added to the phonebook`);
      setNewName('');
      setNewPhoneNumber('');
      return;
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewPhoneNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handleSearchFilterKeyUp = (event) => {
    const personsToShow = persons.filter((person) =>
      person.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setPersonsToShow(personsToShow);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{' '}
      <input
        value={searchFilter}
        onChange={handleSearchFilterChange}
        onKeyUp={handleSearchFilterKeyUp}
      />
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{' '}
          <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button onClick={handleAdd} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.name}>
            {person.name} {person.phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
