function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function collectSearchInfo() {
  var collection = {
    cityName: cityName.toUpperCase(),
    stateCode: stateCode,
  };
  if (previousCities.length >= 1) {
    for (let i = 0; i < previousCities.length; i++) {
      if (previousCities[i].cityName !== collection.cityName) {
        previousCities.push(collection);
      }
    }
  } else if (previousCities.length === 0){
    previousCities.push(collection);

  }

  localStorage.setItem("cityHistory", JSON.stringify(previousCities));
}

function resetSearchInfo() {
  forecast = [];
  lat_lon = [];
  cityName = "";
  stateCode = "";
}

function getCity(e) {
  cityName = e.target.value.trim();
}
