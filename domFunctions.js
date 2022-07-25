import { runTurn } from "./gameFunctions.js"
import { gameBoard } from "./createGameboard.js"

export const createDomBoard = () => {
    const leftBoard = document.getElementById('left-board-container')
    const rightBoard = document.getElementById('right-board-container')

    createBoardDivs(leftBoard, 'player-board-div', 'player')
    createBoardDivs(rightBoard, 'cpu-board-div', 'CPU')

}

const createBoardDivs = (container, classname, iterationClass) => {
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div')
        div.classList.add(classname)
        container.appendChild(div)
        if (iterationClass === 'player') {
            // div.addEventListener('click', runTurn(i), {once: true})
            div.dataset.coord = `p${i}`
        } else {
            div.dataset.coord = `c${i}`
        }
    }
}

export const playerShipDisplay = (playerBoard) => {
    const shipCoords = playerBoard.getCoords()
    shipCoords.forEach(coord => {
        const div = document.querySelector('[data-coord=\"p'+coord+'\"' )
        div.classList.add('ship')
    })
}

export const turnUpdate = (player) => {
    const turnDisplay = document.getElementById('turn-display')
    turnDisplay.innerText = ''
    turnDisplay.innerText = `${player}'s Turn`
}

export const updateCpuBoard = (cpuBoard) => {
    const cpuBoardDivs = [...document.getElementsByClassName('cpu-board-div')]
    boardUpdater(cpuBoard, cpuBoardDivs)
}

export const updatePlayerBoard = (playerBoard) => {
    const playerBoardDivs = [...document.getElementsByClassName('player-board-div')]
    boardUpdater(playerBoard, playerBoardDivs)
}

export const updateHit = (player, hit) => {
    const playerBoardInfo = document.getElementById('player-info-display')
    const cpuBoardInfo = document.getElementById('cpu-info-display')
    if (hit === 1) {
        if (player === 'user') {
            cpuBoardInfo.innerText = "Hit"
        } else {
            playerBoardInfo.innerText = "Hit"
        }
    } else {
        if (player === 'user') {
            cpuBoardInfo.innerText = "Miss"
        } else {
            playerBoardInfo.innerText = "Miss"
        }
    }
}

export const updateSink = (player, ship) => {
    const playerBoardInfo = document.getElementById('player-info-display')
    const cpuBoardInfo = document.getElementById('cpu-info-display')
    if (ship === -1) {
        console.log('Error. Ship not found in index')
    }
    if (player === 'user') {
        cpuBoardInfo.innerText = `You sunk CPU's ${ship}`
    } else {
        playerBoardInfo.innerText = `CPU sunk your ${ship}`
    }
}

const boardUpdater = (board, boardDivs) => {
    const hits = board.getHit();
    const misses = board.getMiss();
    boardDivs.forEach(div => div.innerText = "")
    hits.forEach(hit => boardDivs[hit].innerText = '✛')
    hits.forEach(hit => {
        if (!boardDivs[hit].classList.contains('hit')) {
            boardDivs[hit].classList.add('hit')
        }
    })
    misses.forEach(miss => boardDivs[miss].innerText = '○')
    misses.forEach(miss => {
        if (!boardDivs[miss].classList.contains('miss')) {
            boardDivs[miss].classList.add('miss')
        }
    })
}

export const displayWinner = (winner) => {
    const turnDisplay = document.getElementById('turn-display')
    const infoDisplay = document.getElementById('info-display')
    turnDisplay.innerText = ''
    infoDisplay.innerText = ''
    turnDisplay.innerText = `${winner} wins!`
    if (winner === 'Player 1') {
        infoDisplay.innerText = 'Good job sport. You managed to win.'
    } else {
        infoDisplay.innerText = 'Wipe your tears loser'
    }
}

export const eraseBoards = () => {
    const cpuBoardDivs = [...document.getElementsByClassName('cpu-board-div')]
    const playerBoardDivs = [...document.getElementsByClassName('player-board-div')]
    const boardDivs = [...cpuBoardDivs, ...playerBoardDivs]
    boardDivs.forEach(div => div.remove())
    clearText()
}

const clearText = () => {
    const playerBoardInfo = document.getElementById('player-info-display')
    const cpuBoardInfo = document.getElementById('cpu-info-display')
    const turnDisplay = document.getElementById('turn-display')
    const infoDisplay = document.getElementById('info-display')
    cpuBoardInfo.innerText = ""
    playerBoardInfo.innerText = ""
    turnDisplay.innerText = ""
    infoDisplay.innerText = ""
}