var APIKey = "1802fd1963a6abd30ad1c8984516bc38";
var cityName = "";
var stateCode = "";
var lat_lon = [];
var forecast = [];
var cityInput = document.getElementById("cityInput");
var searchBtn = document.getElementById("search-btn");
var currentContainer = document.getElementById("current-container");
var forecastContainer = document.getElementById("forecast-container")
var currentDay = moment().format("dddd, MMMM Do YYYY");
cityInput.addEventListener("change", getCity);

function getCity(e) {
  cityName = e.target.value.trim();
}
searchBtn.addEventListener("click", function () {
  getCityWeather();
});

function getCityWeather() {
  var cityFinderUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=1&appid=${APIKey}`;
  fetch(cityFinderUrl).then(function (res) {
    if (res.status !== 200) {
      console.log("fetch found nothing!");
      return;
    } else {
      res.json().then(function (data) {
        console.log(data);
        lat_lon.push(data[0].lat.toFixed(2));
        lat_lon.push(data[0].lon.toFixed(2));
        var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat_lon[0]}&lon=${lat_lon[1]}&units=imperial&exclude=hourly,minutely&appid=${APIKey}`;
        fetch(weatherUrl)
          .then(function (res) {
            if (res.status !== 200) {
              console.log("fetch found nothing!");
              return;
            }
            res.json().then(function (data) {
              for (let i = 0; i < 6; i++) {
                forecast.push(data.daily[i]);
              }
              console.log(forecast); // put weather card generators here.
              currentWeather();
            });
          })
          .catch(function (err) {
            console.error(err);
          });
      });
    }
  });
}

function currentWeather() {
  removeAllChildNodes(currentContainer);
  var iconUrl = `http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`;
  var icon;
  fetch(iconUrl).then(function (res) {
    icon = res.url;
    return icon;
  });
  var card = document.createElement("div");
  currentContainer.appendChild(card);
  card.setAttribute("class", "forecast-card");
  var city = document.createElement("h2");
  var date = document.createElement("h2");
  var iconImg = document.createElement("img");
  var temp = document.createElement("h2");
  var wind = document.createElement("h2");
  var humidity = document.createElement("h2");
  var uvindex = document.createElement("h2");
  card.appendChild(city);
  city.textContent = `${cityName.toUpperCase()}, ${stateCode}`;
  card.appendChild(date);
  date.textContent = currentDay;
  card.appendChild(iconImg);
  iconImg.setAttribute("src", iconUrl);
  card.appendChild(temp);
  temp.textContent = `Temperature: ${forecast[0].temp.day}°F`;
  card.appendChild(wind);
  wind.textContent = `Wind: ${forecast[0].wind_speed} MPH`;
  card.appendChild(humidity);
  humidity.textContent = `Humidity: ${forecast[0].humidity}`;
  card.appendChild(uvindex);
  uvindex.textContent = `UV Index: ${forecast[0].uvi}`;
  fiveDayWeather(1);
  fiveDayWeather(2);
  fiveDayWeather(3);
  fiveDayWeather(4);
  fiveDayWeather(5);


  resetSearchInfo();
}
function fiveDayWeather(i) {
  // removeAllChildNodes(forecastContainer);
  var iconUrl = `http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png`;
  var icon;
  fetch(iconUrl).then(function (res) {
    icon = res.url;
    return icon;
  });
  var card = document.createElement("div");
  forecastContainer.appendChild(card);
  card.setAttribute("class", "forecast-card-five");
  var date = document.createElement("h2");
  var iconImg = document.createElement("img");
  var temp = document.createElement("h2");
  var wind = document.createElement("h2");
  var humidity = document.createElement("h2");
  card.appendChild(date);
  date.textContent = currentDay;
  card.appendChild(iconImg);
  iconImg.setAttribute("src", iconUrl);
  card.appendChild(temp);
  temp.textContent = `Temperature: ${forecast[i].temp.day}°F`;
  card.appendChild(wind);
  wind.textContent = `Wind: ${forecast[i].wind_speed} MPH`;
  card.appendChild(humidity);
  humidity.textContent = `Humidity: ${forecast[i].humidity}`;
  }
