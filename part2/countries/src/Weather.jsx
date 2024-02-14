import React from "react";

const Weather = ({ data }) => {
  if (data === null) {
    return <></>;
  } else {
    return (
      <>
        <p>temperature: {data.main.temp}</p>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt=""
        />
        <p>wind: {data.wind.speed}</p>
      </>
    );
  }
};

export default Weather;
