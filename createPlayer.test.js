import { createPlayer } from "./createPlayer";
import { gameBoard } from "./createGameboard";

test('aiMoveSelect can add a move to the hit or miss array of a gameboard', () => {
    const newBoard = gameBoard();
    const newPlayer = createPlayer();
    const hits = newBoard.getHit()
    const miss = newBoard.getMiss()
    newPlayer.aiMoveSelect(newBoard)
    const newArr = [...hits, ...miss]
    expect(newArr.length).toBe(1)
})

test('aiMoveSelect can add a move to the hit or miss array of a gameboard when other hits and misses exist', () => {
    const newBoard = gameBoard();
    const newPlayer = createPlayer();
    for (let i = 0; i < 100; i += 5) {
        newBoard.recieveAttack(i)
    }
    const hits = newBoard.getHit()
    const miss = newBoard.getMiss()
    newPlayer.aiMoveSelect(newBoard)
    const newArr = [...hits, ...miss]
    expect(newArr.length).toBe(21)
})