import { gameBoard } from "./createGameboard.js";
import { createDomBoard, playerShipDisplay, turnUpdate, updateCpuBoard, updatePlayerBoard } from "./domFunctions.js";
import { createPlayer } from "./createPlayer.js";

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
    console.log(`1: ${coordArr1}`)
    board.placeShip(shipArr[0], coordArr1)
    const coordArr2 = board.coordGenerator(4)
    console.log(`2: ${coordArr2}`)
    board.placeShip(shipArr[1], coordArr2)
    const coordArr3 = board.coordGenerator(3)
    console.log(`3: ${coordArr3}`)
    board.placeShip(shipArr[2], coordArr3)
    const coordArr4 = board.coordGenerator(3)
    console.log(`4: ${coordArr4}`)
    board.placeShip(shipArr[3], coordArr4)
    const coordArr5 = board.coordGenerator(2)
    console.log(`5: ${coordArr5}`)
    board.placeShip(shipArr[4], coordArr5)
}

export const runTurn = (playerInput, player1, player2) => {
    let gameOver = false
    let playerAttack = parseInt(playerInput)
    console.log(playerAttack)
    player2.recieveAttack(playerAttack);
    // if (isCpuHit != 'miss') {
    //     console.log(`Player: ${playerInput} is a hit`)
    //     //In the future, run some domFunction here print hit
    // }
    updateCpuBoard(player2)
    if (player2.allSunk()) {
        gameOver = true
        console.log("Wow. You actually managed to win.")
    }
    if(!gameOver) {
        turnUpdate('CPU')
        //if can write without parenthesis it will work
        setTimeout(cpuAttack(player1, player2), 1000)
    }
    if (player1.allSunk()) {
        gameOver = true
        console.log("You lose!")
        console.log("Loser")
    } else {
        turnUpdate('Player 1')
    }
    //make a gameover function to handle each of these - update dom and remove event listeners from player-board-div
    //update screen
}

const cpuAttack = (player1, player2) => {
    let cpuAttack = player2.genSingleCoord()
    let isPlayerHit = player1.recieveAttack(cpuAttack)
    if (isPlayerHit != 'miss') {
        console.log(`CPU: ${cpuAttack} is a hit`)
    }
    updatePlayerBoard(player1)
}

const printWinner = (player1, player2) => {
    if (player1.allSunk()) {
        console.log("You lose!")
        console.log("Loser")
    }
    if (player2.allSunk()) {
        console.log("Wow. You actually managed to win.")
    }
    //later make this call a dom function
}