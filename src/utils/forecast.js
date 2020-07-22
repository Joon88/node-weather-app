const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1572b88f189fc714d4039d286e7ab1ae&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to establish connection. Check internet connection!",
        undefined
      );
    } else if (body.error) {
      callback("Wrong location coordinates!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". The temperature is " +
          body.current.temperature +
          " but it feels like " +
          body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
