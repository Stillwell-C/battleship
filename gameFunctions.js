import { gameBoard } from "./createGameboard.js";
import { createDomBoard, playerShipDisplay, turnUpdate, updateCpuBoard, updatePlayerBoard, displayWinner, eraseBoards, updateSink, updateHit } from "./domFunctions.js";

export const runGame = () => {
    // const user = createPlayer();
    // const computer = createPlayer();

    const userBoard = gameBoard()
    const computerBoard = gameBoard()

    const userBoardShips = userBoard.getShipList();
    const computerBoardShips = computerBoard.getShipList();

    createDomBoard();

    const cpuBoardDivs = document.getElementsByClassName('cpu-board-div')
    for (let i = 0; i < 100; i++) {
        cpuBoardDivs[i].addEventListener('click', () => {
            runTurn(i, userBoard, computerBoard)
        }, {once: true})
    }

    placeShips(userBoard, userBoardShips)
    placeShips(computerBoard, computerBoardShips)
    playerShipDisplay(userBoard)
}

const placeShips = (board, shipArr) => {
    const coordArr1 = board.coordGenerator(5)
    board.placeShip(shipArr[0], coordArr1)
    const coordArr2 = board.coordGenerator(4)
    board.placeShip(shipArr[1], coordArr2)
    const coordArr3 = board.coordGenerator(3)
    board.placeShip(shipArr[2], coordArr3)
    const coordArr4 = board.coordGenerator(3)
    board.placeShip(shipArr[3], coordArr4)
    const coordArr5 = board.coordGenerator(2)
    board.placeShip(shipArr[4], coordArr5)
}

export const runTurn = (playerInput, player1, player2) => {
    let gameOver = false
    let isCpuHit = player2.recieveAttack(playerInput);
    if (isCpuHit >= -1 && isCpuHit <= 5) {
        console.log(`Player 1 Sink: ${isCpuHit}`)
        let hitCoords = player2.getHit()
        let sortCoords = hitCoords.sort((a,b) => a - b)
        console.log(sortCoords)
        console.log(player2.getSunk())
        let shipName = decodeHit(isCpuHit)
        updateSink('user', shipName)
    } else if (isCpuHit != -2) {
        updateHit('user', 1)
    }
    if (isCpuHit === -2) {
        updateHit('user', -1)
    }
    updateCpuBoard(player2)
    if (player2.allSunk()) {
        gameOver = true
        displayWinner('Player 1')
        gameOverFunction()
    }
    if(!gameOver) {
        turnUpdate('CPU')
        let cpuAttack = generateCPUAttack(player1)
        let isPlayerHit = player1.recieveAttack(cpuAttack)
        if (isPlayerHit >= -1 && isPlayerHit <= 5) {
            console.log(`Player 2 Sink: ${isPlayerHit}`)
            let hitCoords = player1.getHit()
            let sortCoords = hitCoords.sort((a,b) => a - b)
            console.log(sortCoords)
            console.log(player1.getSunk())
            let shipName = decodeHit(isPlayerHit)
            updateSink('CPU', shipName)
        } else if (isPlayerHit != -2) {
            updateHit('CPU', 1)
        }
        if (isPlayerHit === -2) {
            updateHit('CPU', -1)
        }
        updatePlayerBoard(player1)
    }
    if (player1.allSunk()) {
        gameOver = true
        displayWinner('CPU')
        gameOverFunction()
    } else {
        turnUpdate('Player 1')
    }
}

const gameOverFunction = () => {
    const cpuBoardDivs = document.getElementsByClassName('cpu-board-div')
    const buttonContainer = document.getElementById('button-container')
    for (let i = 0; i < 100; i++) {
        cpuBoardDivs[i].removeEventListener('click', () => {
            runTurn(i, userBoard, computerBoard)
        }, false)
    }
    const restartButton = document.createElement('button')
    restartButton.classList.add('restart-button')
    restartButton.innerText = 'Play Again'
    restartButton.addEventListener('click', () => {
        eraseBoards()
        runGame()
    })
    buttonContainer.appendChild(restartButton)
}

const decodeHit = (shipIndex) => {
    if (shipIndex === -1) {
        return -1
    } else if (shipIndex === 0) {
        return 'Carrier'
    } else if (shipIndex === 1) {
        return 'Battleship'
    } else if (shipIndex === 2) {
        return 'Cruiser'
    } else if (shipIndex === 3) {
        return 'Submarine'
    } else if (shipIndex === 4) {
        return 'Destroyer'
    }
}

const generateCPUAttack = (opponent) => {
    const opponentHit = opponent.getHit()
    const opponentMiss = opponent.getMiss()
    const attackArr = [...opponentHit, ...opponentMiss]
    if (opponentHit.length >= 1) {
        let lastHit = opponentHit[(opponentHit.length - 1)]
        let tosort = [...opponentHit]
        let sortedArr = tosort.sort((a, b) => a - b)
        let lastHitPos = sortedArr.indexOf(lastHit)
        
        console.log(Array.isArray(opponentHit))
        console.log('Hitarr: ')
        console.log(opponentHit)
        console.log(`Hitarr length = ${opponentHit.length}`)
        console.log('LastHit: ' + lastHit)
        console.log('sortedarr: ')
        console.log(sortedArr)
        console.log('lastHit pos: ' + lastHitPos)
        //if can find pattern
        //horizontal
        if (sortedArr[lastHitPos - 1] === lastHit - 1) {
            if (!attackArr.includes(lastHit - 2) && lastHit - 2 >= 0) {
                return lastHit - 2
            } else if (!attackArr.includes(lastHit + 1) && lastHit + 1 < 100) {
                return lastHit + 1
            }
        } else if (sortedArr[lastHitPos + 1] === lastHit + 1) {
            if (!attackArr.includes(lastHit + 2) && lastHit + 2 < 100) {
                return lastHit + 2
            } else if (!attackArr.includes(lastHit - 1) && lastHit - 1 >= 0) {
                return lastHit - 1
            }
        }
        //vertical
        if (sortedArr[lastHitPos - 1] === lastHit - 10) {
            if (!attackArr.includes(lastHit - 20) && lastHit - 20 >= 0) {
                return lastHit - 20
            } else if (!attackArr.includes(lastHit + 10) && lastHit + 10 < 100) {
                return lastHit + 10
            }
        } else if (sortedArr[lastHitPos + 1] === lastHit + 10) {
            if (!attackArr.includes(lastHit + 20) && lastHit + 20 < 100) {
                return lastHit + 20
            } else if (!attackArr.includes(lastHit - 10) && lastHit - 10 >= 0) {
                return lastHit - 10
            }
        }



        //if no pattern
        if (!attackArr.includes(lastHit - 1) && lastHit - 1 >= 0) {
            return lastHit - 1
        } else if (!attackArr.includes(lastHit - 10) && lastHit - 10 >= 0) {
            return lastHit - 10
        } else if (!attackArr.includes(lastHit + 1) && lastHit + 1 < 100) {
            return lastHit + 1
        } else if (!attackArr.includes(lastHit + 10) && lastHit + 10 < 100) {
            return lastHit + 10
        }
    }
    return generateRandomAttack(attackArr)
}

const generateRandomAttack = (attackArr) => {
    let attackCoord = -1
    while (attackCoord < 0 || attackArr.includes(attackCoord)) {
        attackCoord = (Math.floor(Math.random() * 100))
    }
    return attackCoord;
}