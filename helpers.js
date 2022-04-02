function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function resetSearchInfo() {
  forecast = [];
  lat_lon = [];
  cityName = "";
  stateCode = "";
}
