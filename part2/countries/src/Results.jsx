import React from "react";

const Results = ({ results, handleClick }) => {
  //NO SEARCH
  if (results.length === 0) {
    return <div>Start typing to start searching countries</div>;
  }
  //ONE COUNTRY
  if (results.length === 1) {
    const [{ languages }] = results;
    const languagesArray = Object.values(languages);

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
        {/*  <Weather data={weatherData} /> */}
        {/* <p>temperature: {weatherData?.main.temp} °C</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
          alt=""
        />
        <p>wind: {weatherData?.wind.speed} m/s</p> */}
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
