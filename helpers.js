function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function collectSearchInfo() {
  var collection = {
    cityName: cityName,
    stateCode: stateCode
  }
  previousCities.forEach(c => {
    
  })
  previousCities.push(collection)

  localStorage.setItem('cityHistory', JSON.stringify(previousCities))
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