const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2FzYWh1c3MiLCJhIjoiY2tjdng4ZWpnMDhrdDMzbXN5NTkxM3JwbCJ9.yTFqY9ZOCx8xKY4oz7PiKg&limit=1";

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
