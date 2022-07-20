import { shipYard } from "./shipYard";


test('creates an object with correct length property', () => {
    const lengthTest = shipYard(5);
    expect(lengthTest.shipLength).toBe(5);
})

test('isSunk returns false if there are no hits', () => {
    const newShip = shipYard(3);
    expect(newShip.isSunk()).toBeFalsy();
})

test('isSunk returns false if there are hits but the boat has not been sunk', () => {
    const newShip = shipYard(3);
    newShip.hit(0);
    newShip.hit(1);
    expect(newShip.isSunk()).toBeFalsy();
})

test('hit adds hits to the _hitArr which is detected by isSunk', () => {
    const newShip = shipYard(2);
    newShip.hit(0);
    newShip.hit(1);
    expect(newShip.isSunk()).toBeTruthy();
})

test('setCoords throws error if incorrect number of coords is entered', () => {
    const newShip = shipYard(2);
    expect(() => newShip.setCoords([1, 2, 3, 4])).toThrow(Error);
})

test('setCoords does not throw error if correct number of coords is entered', () => {
    const newShip = shipYard(4)
    expect(() => newShip.setCoords([1, 2, 3, 4])).not.toThrow(Error);
})

test('coords set with setCoords can be accessed through getCoords', () => {
    const newShip = shipYard(4);
    newShip.setCoords([1, 2, 3, 4]);
    expect(newShip.getCoords()).toEqual([1, 2, 3, 4])
})