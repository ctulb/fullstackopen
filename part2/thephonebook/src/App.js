import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
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
    var newPersons = [];
    axios.post('http://localhost:3001/persons', newPerson).then((response) => {
      newPersons = persons.concat(response.data);
      setPersons(newPersons);
      setNewName('');
      setNewPhoneNumber('');
      const personsToShow = newPersons.filter((person) =>
        person.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
      setPersonsToShow(personsToShow);
    });
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

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
      setPersonsToShow(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchFilter={searchFilter}
        handleSearchFilterChange={handleSearchFilterChange}
        handleSearchFilterKeyUp={handleSearchFilterKeyUp}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
        handleAdd={handleAdd}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
