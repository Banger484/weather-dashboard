var stateMenu = document.getElementById('state-menu')
var abbr;

for (let i = 0; i < statesFull.length; i++) {
    var state = document.createElement('option')
    state.textContent = statesFull[i]
    state.setAttribute('id', statesAbbr[i])
    stateMenu.appendChild(state)
}

stateMenu.addEventListener('change', function (e) {
    abbr = e.target.value
    var options = document.querySelectorAll('option')
    for (let i = 0; i < options.length; i++) {
        var
    }
    console.log(abbr)
})