import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
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

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((x) => (
        <div key={x.name}>{x.name}</div>
      ))}
    </div>
  );
};

export default App;
