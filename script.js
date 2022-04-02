var APIKey = "1802fd1963a6abd30ad1c8984516bc38";
var cityName;
var stateCode;
var lat_lon = [];
var cityFinderUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=1&appid=${APIKey}`;
var cityInput = document.getElementById('cityInput')
var searchBtn = document.getElementById('search-btn')

cityInput.addEventListener('change', function (e) {
  cityName = e.target.value
})
searchBtn.addEventListener('click', function() {
  console.log(lat_lon)
  console.log(cityName);
  console.log(stateCode);
  getCityWeather()
})

function getCityWeather() {
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
                for(let i = 1; i < 6; i++) {
                    console.log(data.daily[i])
                }
            });
          })
          .catch(function (err) {
            console.error(err);
          });
      });
    }
  });
}
// getCityWeather();

function currentWeather () {

}

function fiveDayWeather () {
    
}