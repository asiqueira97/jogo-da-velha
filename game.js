const winCombinations = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [6,7,8],
    [3,4,5]
]

const score = {
    'x': 0, 
    'o': 0
}

let currentPlayer = 'x'

const cells = document.querySelectorAll('.cell')
const message = document.querySelector('.message')

function drawCheck() {
    const elements = Array.from(cells)
    const check = elements.filter( cell => cell.innerText === currentPlayer ).length === 5

    if(check) {
        showMessage('draw')
        setTimeout(restart, 1000)
    } 
}

function checkWinner() {
    winCombinations.forEach( combination => {
        const check = combination.every( combId => cells[combId].innerText.trim() === currentPlayer )
        if(check) {
            score[currentPlayer]++

            showMessage('win')
            highlight(combination)
            setTimeout(restart, 1000)
        }
    } )
}

function showMessage(type) {    
    message.classList.remove('win')
    message.classList.remove('draw')
    message.classList.add(type)
    
    message.style.display = 'block'

    const winner = currentPlayer === 'x' ? 'jogador 1' : 'jogador 2' 

    if(type === 'win') message.innerText = `O ${winner} ganhou!`
    if(type === 'draw') message.innerText = `Jogo empatado!`

    setTimeout(() => message.style.display = 'none', 1000)
}

function setScore() {
    document.querySelector('.score-pl1 span').innerText = score.x
    document.querySelector('.score-pl2 span').innerText = score.o
}

function highlight(combination) {
    combination.forEach(comb => cells[comb].classList.add('win'))
}

function restart() {
    setScore()
    currentPlayer = 'x'    
    cells.forEach(cell => {
        cell.innerText = ''
        cell.classList.remove('win')
    })
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function() {     

        if(cells[i].innerText.trim() !== '') return
        
        cells[i].innerText = currentPlayer
        drawCheck()
        checkWinner()
        currentPlayer = currentPlayer == 'x' ? 'o' : 'x'
    })
}

document.querySelector('button').addEventListener("click", restart)