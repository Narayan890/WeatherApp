const hbs = require("hbs");
const path = require("path");
const express = require("express");
const app = express();

const fs = require('fs');

const home = fs.readFileSync("home.html", "utf-8");

const weatherData = require("./utils/weatherData");

const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "/public");

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.write(home);
    res.end();
});


// calling the weather data file
//localhost:3000/weather?address=cityname
app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "Please enter City Name"
        })
    }

    weatherData(address, (error, { temperature, description, cityName, Country } = {}) => {
        if (error) {
            return res.send({
                error: error,
            })
        }
        res.send({
            temperature,
            description,
            cityName,
            Country
        });
    });
});


// handling the wrong url enter by the user
app.get("*", (req, res) => {
    res.send("Page Not Found");
});


// listening the request
app.listen(port, () => {
    console.log("Listening to port ", port);
});