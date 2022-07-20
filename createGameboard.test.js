import { gameBoard } from "./createGameboard";

test('expect boardArr to contain numbers 0 and 99 and have a length of 100', () => {
    const newBoard = gameBoard();
    const boardArr = newBoard.getBoardArr();
    expect(boardArr).toContain(0)
    expect(boardArr).toContain(99)
    expect(boardArr.length).toBe(100)
})

test('expect placeShip to set coords in a ship object', () => {
    const newBoard = gameBoard();
    const shipArr = newBoard.getShipList();
    const battleship = shipArr[1]
    newBoard.placeShip(battleship, [1, 2, 3, 4]);
    expect(battleship.getCoords()).toEqual([1, 2, 3, 4]);
    expect(() => battleship.setCoords([1, 2, 3, 4])).not.toThrow(Error);
})

test('expect error and coords to not be set if incorrect number of coords is sent to placeShip', () => {
    const newBoard = gameBoard();
    const shipArr = newBoard.getShipList();
    const battleship = shipArr[1]
    const coords = battleship.getCoords()
    expect(() => battleship.setCoords([1, 2, 3, 4, 5])).toThrow(Error)
    expect(coords.length).toBe(0)
})

test('expect recieveAttack to push to _hitArr when a hit occurs', () => {
    const newBoard = gameBoard();
    const shipArr = newBoard.getShipList();
    const battleship = shipArr[1]
    newBoard.placeShip(battleship, [1, 2, 3, 4]);
    newBoard.recieveAttack(2)
    expect(newBoard.getHit()).toContain(2)
})

test('expect recieveAttack to push to _missArr when a miss occurs', () => {
    const newBoard = gameBoard();
    const shipArr = newBoard.getShipList();
    const battleship = shipArr[1]
    newBoard.placeShip(battleship, [1, 2, 3, 4]);
    newBoard.recieveAttack(5)
    expect(newBoard.getMiss()).toContain(5)
})

test('expect recieveAttack to return ship - showing that hitShip has been assigned', () => {
    const newBoard = gameBoard();
    const shipArr = newBoard.getShipList();
    const battleship = shipArr[1]
    let othership = shipArr[2]
    newBoard.placeShip(battleship, [1, 2, 3, 4]);
    expect(newBoard.recieveAttack(2)).toBe(battleship)
    expect(newBoard.recieveAttack(2)).not.toBe(othership)
    
})

test('expect recieveAttack to make isSunk return truthy when ship has sunk', () => {
    const newBoard = gameBoard();
    const shipArr = newBoard.getShipList();
    const destroyer = shipArr[4]
    newBoard.placeShip(destroyer, [1, 2]);
    newBoard.recieveAttack(1)
    newBoard.recieveAttack(2)
    expect(destroyer.isSunk()).toBeTruthy()
})

test('expect recieveAttack to push ship to _sunkArr when ship has sunk', () => {
    const newBoard = gameBoard();
    const shipArr = newBoard.getShipList();
    const destroyer = shipArr[4]
    newBoard.placeShip(destroyer, [1, 2]);
    newBoard.recieveAttack(1)
    newBoard.recieveAttack(2)
    expect(newBoard.getSunk()).toContain(destroyer)
})

test('expect allSunk to return true if all coords of ships are hit', () => {
    const newBoard = gameBoard();
    const shipArr = newBoard.getShipList();
    const carrier = shipArr[0]
    const battleship = shipArr[1]
    const cruiser = shipArr[2]
    const submarine = shipArr[3]
    const destroyer = shipArr[4]
    newBoard.placeShip(carrier, [1, 2, 3, 4, 5]);
    newBoard.placeShip(battleship, [6, 7, 8, 9]);
    newBoard.placeShip(cruiser, [10, 11, 12]);
    newBoard.placeShip(submarine, [13, 14, 15]);
    newBoard.placeShip(destroyer, [16, 17]);
    for (let i = 1; i < 18; i++) {
        newBoard.recieveAttack(i)
    }
    expect(newBoard.allSunk()).toBeTruthy()
})

test('expect allSunk to return false if not all coords of ships are hit', () => {
    const newBoard = gameBoard();
    const shipArr = newBoard.getShipList();
    const carrier = shipArr[0]
    const battleship = shipArr[1]
    const cruiser = shipArr[2]
    const submarine = shipArr[3]
    const destroyer = shipArr[4]
    newBoard.placeShip(carrier, [1, 2, 3, 4, 5]);
    newBoard.placeShip(battleship, [6, 7, 8, 9]);
    newBoard.placeShip(cruiser, [10, 11, 12]);
    newBoard.placeShip(submarine, [13, 14, 15]);
    newBoard.placeShip(destroyer, [16, 17]);
    for (let i = 1; i < 17; i++) {
        newBoard.recieveAttack(i)
    }
    expect(newBoard.allSunk()).toBeFalsy()
})

test('expect coordGenerator to produce proper number of coords', () => {
    const newBoard = gameBoard();
    const coordArr = newBoard.coordGenerator(5)
    expect(coordArr.length).toBe(5)
})

test('expect coordGenerator to not produce correct number of multiple coords', () => {
    const newBoard = gameBoard();
    const arr1 = newBoard.coordGenerator(5)
    const arr2 = newBoard.coordGenerator(5)
    const arr3 = newBoard.coordGenerator(5)
    const arr4 = newBoard.coordGenerator(5)
    const arr5 = newBoard.coordGenerator(5)
    const testArr = [...arr1, ...arr2, ...arr3, ...arr4, ...arr5]
    expect(testArr.length).toBe(25)
})

test('expect coordGenerator to not produce duplicate coords', () => {
    const newBoard = gameBoard();
    const shipArr = newBoard.getShipList();
    const arr1 = newBoard.coordGenerator(5)
    newBoard.placeShip(shipArr[0], arr1)
    const testArr1 = [...arr1]
    let testArr1Duplicates = testArr1.filter((item, index) => testArr1.indexOf(item) != index)
    expect(testArr1Duplicates.length).toBe(0)

    const arr2 = newBoard.coordGenerator(4)
    newBoard.placeShip(shipArr[1], arr2)
    const testArr2 = [...testArr1, ...arr2]
    let testArr2Duplicates = testArr2.filter((item, index) => testArr2.indexOf(item) != index)
    expect(testArr2Duplicates.length).toBe(0)

    const arr3 = newBoard.coordGenerator(3)
    newBoard.placeShip(shipArr[2], arr3)
    const testArr3 = [...testArr2, ...arr3]
    let testArr3Duplicates = testArr3.filter((item, index) => testArr3.indexOf(item) != index)
    expect(testArr3Duplicates.length).toBe(0)

    const arr4 = newBoard.coordGenerator(3)
    newBoard.placeShip(shipArr[3], arr4)
    const testArr4 = [...testArr3, ...arr4]
    let testArr4Duplicates = testArr4.filter((item, index) => testArr4.indexOf(item) != index)
    expect(testArr4Duplicates.length).toBe(0)

    const arr5 = newBoard.coordGenerator(2)
    newBoard.placeShip(shipArr[4], arr5)
    const testArr5 = [...testArr4, ...arr5]
    let testArr5Duplicates = testArr5.filter((item, index) => testArr5.indexOf(item) != index)
    expect(testArr5Duplicates.length).toBe(0)
    
})