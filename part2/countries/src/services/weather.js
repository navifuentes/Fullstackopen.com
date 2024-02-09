import axios from "axios";

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?`;

const getCapitalGeo = (capitalName) => {
  const request = axios.get(
    `${geoUrl}q=${capitalName}&appid=${import.meta.env.VITE_API_WEATHER_KEY}`
  );
  return request.then((response) => response.data);
};
const getWeather = (lat, lon) => {
  const request = axios.get(
    `${baseUrl}lat=${lat}&lon=${lon}&units=metric&appid=${
      import.meta.env.VITE_API_WEATHER_KEY
    }`
  );
  return request.then((response) => response.data);
};

export default { getWeather, getCapitalGeo };
