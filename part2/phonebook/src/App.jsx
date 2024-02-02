import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const isFound = persons.some((x) => {
      if (x.name === personObject.name) {
        return true;
      }
      return false;
    });

    if (isFound) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    return;
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleChangeName} />
        </div>
        <div>
          number: <input onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x) => (
        <div key={x.name}>
          {x.name} {x.number}
        </div>
      ))}
    </div>
  );
};

export default App;
