import { useState, useEffect } from "react";
import axios from "axios";
import Results from "./components/Results";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`,
    };
    axios
      .post("http://localhost:3001/persons", personObject)
      .then((response) => {
        console.log(response.data);
        return response.data;
      });

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
  const handleSearch = (e) => {
    console.log(e.target.value);
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
