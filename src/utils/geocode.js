const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    process.env.MAPBOX_ACCESS_KEY +
    "&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to establish connection. Check internet connection!",
        undefined
      );
    } else if (body.features.length === 0) {
      callback("Invalid location passed!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
