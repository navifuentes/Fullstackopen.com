import { useState, useEffect } from "react";
//  Service
import personService from "./services/persons";
// Components
import Results from "./components/Results";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);
  const [search, setSearch] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //  Estado del array Persons
  useEffect(() => {
    personService.getAll().then((initalPersons) => {
      setPersons(initalPersons);
    });
  }, []);

  //  Funciones REST
  const addPerson = (e) => {
    e.preventDefault();
    //Declarations
    const personObject = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`,
    };
    let personFound = {};
    //Find name
    const isFound = persons.some((x) => {
      if (x.name === personObject.name) {
        personFound = x;
        return true;
      }
      return false;
    });
    //If name found:
    if (isFound) {
      return window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
        ? personService //update Database
            .update(personFound.id, {
              ...personFound,
              number: newNumber,
            })
            .then(() => {
              //update state
              setPersons(
                persons.map((x) =>
                  x.id === personFound.id
                    ? { ...personFound, number: newNumber }
                    : x
                )
              );
              setNotificationMessage(
                `${personFound.name} number has been modified`
              );
              setTimeout(() => {
                setNotificationMessage(null);
              }, 5000);
            })
            .catch((error) => {
              setErrorMessage(`${personFound.name} is no longer in database`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            })
        : null;
    }

    return personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNotificationMessage(`${returnedPerson.name} added to the list`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });
  };
  const deletePerson = (id) => {
    window.confirm(`delete ${persons[id - 1].name} ?`)
      ? personService.remove(id).then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setNotificationMessage(
            `${persons[id - 1].name} has been deleted from list`
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
      : null;
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
    setSearch(
      persons.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage} />
      <Notification message={notificationMessage} />
      <Filter handleSearch={handleSearch} />

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <h2>Numbers</h2>
      <Results search={search} persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
