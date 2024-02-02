import { useState, useEffect } from "react";
//  Service
import personService from "./services/persons";
// Components
import Results from "./components/Results";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);
  const [search, setSearch] = useState([]);

  //  Estado del array Persons
  useEffect(() => {
    personService.getAll().then((initalPersons) => {
      setPersons(initalPersons);
    });
  }, []);
  //  Funcion agregar personas
  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`,
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
    personService.create(personObject).then((returnedPersons) => {
      setPersons(persons.concat(returnedPersons));
      setNewName("");
    });
    return;
  };

  // Manejadores de eventos
  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearch = (e) => {
    let filter = e.target.value.toLowerCase();
    setSearch(persons.filter((x) => x.name.toLowerCase().includes(filter)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <h2>Numbers</h2>
      <Results search={search} persons={persons} />
    </div>
  );
};

export default App;
