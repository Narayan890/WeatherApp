const request = require("request");
const constants = require("./config")

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + "&appid=" + constants.openWeatherMap.KEY;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Can't fetch data", undefined);
        } else if (!body.main || !body.main.temp || !body.weather || !body.name) {
            callback("Unable to find required data, try another Location", undefined);

        } else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name,
                Country: body.sys.country,
            })
        }
    })
}

module.exports = weatherData;