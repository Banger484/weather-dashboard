var stateMenu = document.getElementById('state-menu')

for (let i = 0; i < statesFull.length; i++) {
    var state = document.createElement('option')
    state.textContent = statesFull[i]
    state.setAttribute('id', statesAbbr[i])
    stateMenu.appendChild(state)
    console.log(state.id)
}

