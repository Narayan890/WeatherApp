const hbs = require("hbs");
const path = require("path");
const express = require("express");
const app = express();


const weatherData = require("../utils/weatherData");
const { response } = require("express");

// setting the port number
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App"
    })
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