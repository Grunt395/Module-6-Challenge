// alert(API_KEY);

var searchInput = document.getElementById("search-input");
var searchForm = document.getElementById("search-form");


function fetchWeather(lat, lon, city) {
    var apiURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;

    fetch(apiURL).then(function (response) {
        return response.json()
        
    }).then(function (data) {
        // city
        // data.current
        // data.timezone


        var currentCity = document.createElement("h1")
        var currentWeather = document.getElementById("current-weather");
        currentCity.textContent = city;
        currentWeather.appendChild(currentCity);

        console.log(data);

        var tempF = data.current.temp;
        var windMph = data.current.wind_speed;
        var humidity = data.current.humidity;
        var uvi = data.current.uvi;

        var currentTemp = document.createElement("p")
        var currentWeather = document.getElementById("current-weather");
        currentTemp.textContent = `TEMP: ${tempF} F`;
        currentWeather.appendChild(currentTemp);

        var currentWind = document.createElement("p")
        var currentWeather = document.getElementById("current-weather");
        currentWind.textContent = `Wind: ${windMph}`;
        currentWeather.appendChild(currentWind);

        var currentHumidity = document.createElement("p")
        var currentWeather = document.getElementById("current-weather");
        currentHumidity.textContent = `Humidity: ${humidity}`;
        currentWeather.appendChild(currentHumidity);


        var currentUVI = document.createElement("p")
        var currentWeather = document.getElementById("current-weather");
        currentUVI.textContent = `UVI: ${uvi}`;
        currentWeather.appendChild(currentUVI);


        // Forecast 5 days
        // data.daily

        var forecast = document.createElement("h1")
        var currentForecastContainer = document.getElementById("current-forecast");
        forecast.textContent = "5 day Forecast";
        currentForecastContainer.appendChild(forecast);

        var dailyForecast = data.daily;

        console.log(dailyForecast)

        for (var index = 0; index < dailyForecast.length; index++) {
            var currentForecastTemp = document.createElement("p");
            currentForecastTemp.textContent = `Temp: ${
                dailyForecast[index].temp.day
            }`
            console.log(dailyForecast[index].temp.day)
            currentForecastContainer.appendChild(currentForecastTemp);

            var currentForecastWind = document.createElement("p");
            currentForecastWind.textContent = `Wind: ${
                dailyForecast[index].wind_speed
            }`

            currentForecastContainer.appendChild(currentForecastWind);


        }


    })
}

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var search = searchInput.value.trim();

    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`;

    fetch(apiURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.length === 0) {
            alert("Location not found")
        } 
        else {
            var lat = data[0].lat;
            var lon = data[0].lon;
            var city = data[0].name;
            fetchWeather(lat, lon, city);
        }
    })


    searchInput.value = "";

})
