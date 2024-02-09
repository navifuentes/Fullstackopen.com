import React, { useEffect, useState } from "react";
import weatherService from "./services/weather";

const Results = ({ results, handleClick }) => {
  //NO SEARCH
  if (results.length === 0) {
    return <div>Start typing to start searching countries</div>;
  }
  //ONE COUNTRY
  if (results.length === 1) {
    const [coords, setCoords] = useState({});
    const [temp, setTemp] = useState({});

    const [{ languages }] = results;
    const languagesArray = Object.values(languages);

    let coordsObject = {};
    let weatherObject = {};

    weatherService
      .getCapitalGeo(results[0].capital[0])
      .then((data) => {
        //setCoords({ lat: data[0].lat, lon: data[0].lon });
        // console.log("coords", coords);
        coordsObject = {
          lat: data[0].lat,
          lon: data[0].lon,
        };
        console.log(coordsObject);
      })
      .catch((error) => {
        console.log(error);
      });

    weatherService
      .getWeather(coordsObject.lat, coordsObject.lon)
      .then((data) => {
        // setTemp({
        // temperature: data.main.temp,
        // wind: data.wind.speed,
        // icon: data.weather[0].icon,
        // });
        // console.log("temp", temp);
        weatherObject = {
          temperature: data.main.temp,
          wind: data.wind.speed,
          icon: data.weather[0].icon,
        };
        console.log(weatherObject);
      })
      .catch((error) => {
        console.log(error);
      });

    return (
      <>
        <h2>{results[0].name.common}</h2>
        <p>capital: {results[0].capital[0]}</p>
        <p>area: {results[0].area}</p>
        <br />
        <h3>Languages :</h3>
        <ul>
          {languagesArray.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <img
          className="flag"
          src={results[0].flags.svg}
          alt={results[0].flags.alt}
        />
        <h2>Weather in {results[0].capital[0]}</h2>
        <p>temperature: {weatherObject.temperature} °C</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherObject.icon}@2x.png`}
          alt=""
        />
        <p>wind: {weatherObject.wind} m/s</p>
      </>
    );
  }
  //MANY COUNTRIES
  if (results.length <= 10) {
    return results.map((x) => (
      <div key={x.name.common}>
        {x.name.common}{" "}
        <button onClick={() => handleClick(x.name.common)}>show</button>
      </div>
    ));
  }
  //TOO MANY COUNTRIES
  return <div>Too many matches, specify another filter</div>;
};

export default Results;
