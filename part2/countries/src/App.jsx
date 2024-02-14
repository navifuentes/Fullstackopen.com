import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import weatherService from "./services/weather.js";
import Results from "./Results.jsx";
import Weather from "./Weather.jsx";

function App() {
  const [countriesList, setCountriesList] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  //EFFECT HOOK
  // GET WEATHER
  useEffect(() => {
    if (results.length === 1) {
      weatherService
        .getWeather(results[0].capital[0])
        .then((data) => setWeatherData(data));
    }
    if (results.length > 1) {
      setWeatherData(null);
    }
  }, [results]);
  // GET ALL
  useEffect(() => {
    countriesService.getAll().then((initalCountries) => {
      setCountriesList(initalCountries);
    });
  }, []);
  //GET SEARCH
  useEffect(() => {
    setResults(
      countriesList.filter((x) =>
        x.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  //EVENTS CONTROLLERS
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const handleClick = (name) => {
    countriesService.getByName(name).then((data) => {
      setResults([{ ...data }]);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        Find countries : <input value={search} onChange={handleSearch} />
      </form>
      <br />
      <Results results={results} handleClick={handleClick} />
      <Weather data={weatherData} />
    </>
  );
}

export default App;
