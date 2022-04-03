function getCityWeather() {
  var cityFinderUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=1&appid=${APIKey}`;
  fetch(cityFinderUrl).then(function (res) {
    if (res.status !== 200) {
      console.log("fetch found nothing!");
      return;
    } else {
      res.json().then(function (data) {
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
  removeAllChildNodes(forecastContainer);
  var iconUrl = `https://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`;
  var icon;
  fetch(iconUrl).then(function (res) {
    icon = res.url;
    return icon;
  });
  var card = document.createElement("div");
  currentContainer.appendChild(card);
  card.setAttribute("class", "current-card");
  var city = document.createElement("h2");
  var date = document.createElement("h2");
  var iconImg = document.createElement("img");
  var temp = document.createElement("h2");
  var wind = document.createElement("h2");
  var humidity = document.createElement("h2");
  var uvIndex = document.createElement("h2");
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
  card.appendChild(uvIndex);
  uvIndex.textContent = `UV Index: ${forecast[0].uvi}`;
  if (forecast[0].uvi <= 2) {
    uvIndex.setAttribute("class", "low");
  } else if (forecast[0].uvi <= 5) {
    uvIndex.setAttribute("class", "moderate");
  } else if (forecast[0].uvi <= 7) {
    uvIndex.setAttribute("class", "high");
  } else if (forecast[0].uvi <= 10) {
    uvIndex.setAttribute("class", "very-high");
  } else if (forecast[0].uvi > 11) {
    uvIndex.setAttribute("class", "extreme");
  }
  fiveDayWeather(1);
  fiveDayWeather(2);
  fiveDayWeather(3);
  fiveDayWeather(4);
  fiveDayWeather(5);
  collectSearchInfo();
  displayHistory();
  resetSearchInfo();
}
function fiveDayWeather(i) {
  var iconUrl = `https://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png`;
  var icon;
  var forecastDate = moment().add(i, "days").format("dddd, MMMM Do YYYY");
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
  date.textContent = forecastDate;
  card.appendChild(iconImg);
  iconImg.setAttribute("src", iconUrl);
  card.appendChild(temp);
  temp.textContent = `Temperature: ${forecast[i].temp.day}°F`;
  card.appendChild(wind);
  wind.textContent = `Wind: ${forecast[i].wind_speed} MPH`;
  card.appendChild(humidity);
  humidity.textContent = `Humidity: ${forecast[i].humidity}`;
}

cityInput.addEventListener("change", getCity);
searchBtn.addEventListener("click", function () {
  getCityWeather();
});
clearBtn.addEventListener("click", function () {
  removeAllChildNodes(storedCities);
  localStorage.clear()
});
