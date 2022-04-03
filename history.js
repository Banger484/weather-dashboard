function displayHistory() {
  var cityStorage = localStorage.getItem("cityHistory");
  var historyList = JSON.parse(cityStorage);
  if (historyList) {
    for (let i = 0; i < historyList.length; i++) {
      var button = document.createElement("button");
      button.textContent = `${historyList[i].cityName}, ${historyList[i].stateCode}`;
      button.setAttribute("class", "btn btn-dark search-button");
      button.setAttribute("id", `${historyList[i].cityName}`);
      var tester = document.getElementById(`${historyList[i].cityName}`);
      if (!tester) {
        storedCities.appendChild(button);
      }
      button.addEventListener("click", function () {
        cityName = historyList[i].cityName;
        stateCode = historyList[i].stateCode;
        getCityWeather();
      });
    }
  }
}

displayHistory();
