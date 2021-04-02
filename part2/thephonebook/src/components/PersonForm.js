import React from 'react';

const PersonForm = (props) => {
  return (
    <div>
      <form>
        <div>
          name:{' '}
          <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number:{' '}
          <input
            value={props.newPhoneNumber}
            onChange={props.handlePhoneNumberChange}
          />
        </div>
        <div>
          <button onClick={props.handleAdd} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
