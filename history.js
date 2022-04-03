function displayHistory () {
removeAllChildNodes(storedCities)
var cityStorage = localStorage.getItem('cityHistory')
console.log(cityStorage)
var historyList = JSON.parse(cityStorage)
console.log(historyList)
for (let i = 0; i < historyList.length; i++) {
var button = document.createElement('button')
button.a
button.textContent = historyList[i].cityName
storedCities.appendChild(button)
button.addEventListener('click', function () {
    cityName = historyList[i].cityName
    stateCode = historyList[i].stateCode
    getCityWeather()
}) 
}
}

