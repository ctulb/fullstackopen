import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [personsToShow, setPersonsToShow] = useState(persons);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationMessageType, setNotificationMessageType] = useState(null);

  const handleAdd = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phoneNumber: newPhoneNumber,
    };
    const personSearch = persons.filter((person) => person.name === newName);
    if (personSearch.length) {
      if (
        window.confirm(
          `${newName} has already been added to the phonebook. Update number?`
        )
      ) {
        // find where the person is in the persons array
        const personIndex = persons.findIndex(
          (person) => person.name === newName
        );
        // go and update on the backend
        personService.update(persons[personIndex].id, newPerson);
        // create a copy of persons so we don't update state directly
        const newPersons = persons;
        // update the local state phone number of person
        newPersons[personIndex].phoneNumber = newPhoneNumber;
        // refresh persons and personsToShow with new array
        setPersons(newPersons);
        setPersonsToShow(newPersons);
      }
      setNewName('');
      setNewPhoneNumber('');
      setNotificationMessage(`${newName} updated successfully`);
      setNotificationMessageType('success');
      window.setTimeout(() => {
        setNotificationMessage(null);
        setNotificationMessageType(null);
      }, 5000);
      return;
    }
    var newPersons = [];
    personService
      .create(newPerson)
      .then((response) => {
        newPersons = persons.concat(response.data);
        setPersons(newPersons);
        setNewName('');
        setNewPhoneNumber('');
        const personsToShow = newPersons.filter((person) =>
          person.name.toLowerCase().includes(searchFilter.toLowerCase())
        );
        setPersonsToShow(personsToShow);
        setNotificationMessage(`${newName} created successfully`);
        setNotificationMessageType('success');
        window.setTimeout(() => {
          setNotificationMessage(null);
          setNotificationMessageType(null);
        }, 5000);
      })
      .catch((error) => {
        setNotificationMessage(`Error: ${error.response.data.error.message}`);
        setNotificationMessageType('error');
      });
  };

  const handleDelete = (event) => {
    if (window.confirm(`Delete ${event.target.name}?`)) {
      const personToDelete = persons.filter(
        (person) => person.name === event.target.name
      );
      console.log(personToDelete);
      personService
        .remove(personToDelete[0].id)
        .then((response) => {
          const newPersons = persons.filter(
            (person) => person.name !== event.target.name
          );
          setPersons(newPersons);
          setPersonsToShow(newPersons);
          setNotificationMessage(`${event.target.name} deleted successfully`);
          setNotificationMessageType('success');
          window.setTimeout(() => {
            setNotificationMessage(null);
            setNotificationMessageType(null);
          }, 5000);
        })
        .catch((reason) => {
          setNotificationMessage(reason);
          setNotificationMessageType('error');
        });
    }
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
    personService.getAll().then((response) => {
      setPersons(response.data);
      setPersonsToShow(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        messageType={notificationMessageType}
      />
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
