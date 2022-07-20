import { gameBoard } from "./createGameboard";

export const runGame = () => {
    const user = createPlayer();
    const computer = createPlayer();

    const userBoard = gameBoard()
    const computerBoard = gameBoard()

    const userBoardShips = userBoard.getShipList();
    const computerBoardShips = userBoard.getShipList();

    placeShips(userBoard, userBoardShips)
    placeShips(computerBoard, computerBoardShips)

    runTurns(user, computer)
    printWinner(user, computer)
}

const placeShips = (board, shipArr) => {
    const coordArr1 = board.coordGenerator(5)
    const coordArr2 = board.coordGenerator(4)
    const coordArr3 = board.coordGenerator(3)
    const coordArr4 = board.coordGenerator(3)
    const coordArr5 = board.coordGenerator(2)

    board.placeShip(shipArr[0], coordArr1)
    board.placeShip(shipArr[1], coordArr2)
    board.placeShip(shipArr[2], coordArr3)
    board.placeShip(shipArr[3], coordArr4)
    board.placeShip(shipArr[4], coordArr5)
}

const runTurns = (player1, player2) => {
    let gameOver = false

    while (!gameOver) {
        //prompt player1
        let playerInput = prompt("Please input attack coordinates", "")
        player2.recieveAttack(parseInt(playerInput));
        //update screen
        if (player2.allSunk()) return gameOver = true
        if(!gameOver) {
            player1.recieveAttack(player2.genSingleCoord())
        }
        if (player1.allSunk()) return gameOver = true
        //update screen
    }
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