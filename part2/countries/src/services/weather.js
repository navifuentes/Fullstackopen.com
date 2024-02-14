import axios from "axios";

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?`;

const getWeather = (capital) => {
  return axios
    .get(`${geoUrl}q=${capital}&appid=${import.meta.env.VITE_API_WEATHER_KEY}`)
    .then((response) => {
      const coords = response.data[0];
      console.log("coords", coords);

      return axios
        .get(
          `${baseUrl}lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${
            import.meta.env.VITE_API_WEATHER_KEY
          }`
        )
        .then((result) => result.data)
        .catch((err) => console.log(err));
    })
    .then((response) => {
      console.log("res", response);
      return response;
    })
    .catch((err) => console.log(err));
};
export default { getWeather };

/* axios.get(
    `${baseUrl}lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${
      import.meta.env.VITE_API_WEATHER_KEY
    }`
  ); */
