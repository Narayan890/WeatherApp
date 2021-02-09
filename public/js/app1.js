const fetchData = "/weather";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weathercon i");
const tempElement = document.querySelector(".temperature h1");
const descriptionElement = document.querySelector(".description");
const locationElement = document.querySelector(".location h2");
const dateElement = document.querySelector(".date");


// get date

const getCurrentday = () => {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    var curentDay = new Date();
    return weekday[curentDay.getDay()];
}
const getCurrentTime = () => {
    var months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var currentTime = new Date();
    var month = months[currentTime.getMonth()];
    var day = currentTime.getDate();
    var hours = currentTime.getHours();
    var min = currentTime.getMinutes();
    if (hours > 11) {
        period = "PM";
        if (hours > 12) hours -= 12;
    }
    if (min < 10) {
        min = '0' + min;
    }
    hours1 = hours;
    return `${month} ${day} | ${hours}:${min} ${period}`;
}
dateElement.textContent = getCurrentday() + " | " + getCurrentTime();

const time = () => {
    var period = "AM";
    var hours = new Date().getHours();
    if (hours > 11) {
        period = "PM";
        if (hours > 12) hours -= 12;
    }
    return hours;

}
const changeColour = () => {
    return "#1C1C1C";
}

const changeTextColour = () => {
    return "white";
}
const changeIcon = () => {
    return "fas fa-moon";
}
if (time() > 6) {
    document.querySelector(".container").style.backgroundColor = changeColour();
    document.querySelector(".container").style.color = changeTextColour();
    document.querySelector(".btn").style.backgroundColor = "white";
    document.querySelector(".btn").style.color = "black";
}
// adding the event listner to form


weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    locationElement.textContent = "";
    tempElement.textContent = "";
    descriptionElement.textContent = "Loading...";
    const locationApi = fetchData + "?address=" + search.value;
    // fetching the api data
    fetch(locationApi).then(res => {
        res.json().then(data => {
            console.log(data);
            if (data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                descriptionElement.textContent = "";
            } else {
                if (data.description == "Sunny") {
                    weatherIcon.className = "fas fa-sun";
                } else if (data.description == "Rainy") {
                    weatherIcon.className = "fas fa-cloud-showers-heavy";
                } else if (data.description == "Clouds") {
                    weatherIcon.className = "fas fa-cloud";
                } else if (data.description == "clear sky" && time() < 6) {
                    weatherIcon.className = "fas fa-cloud-sun";

                } else if (data.description == "clear sky" && time() > 6) {
                    weatherIcon.className = changeIcon();
                } else if (time() > 6) {
                    weatherIcon.className = "fas fa-cloud-moon";

                }

                locationElement.textContent = data.cityName + "," + data.Country;
                tempElement.textContent = Math.floor(data.temperature - 273.5) + String.fromCharCode(176);
                descriptionElement.textContent = data.description.toUpperCase();
            }
        });
    });
});