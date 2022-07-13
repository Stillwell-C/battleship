import { shipFactory } from "./shipFactory";


test('creates an object with correct length property', () => {
    const lengthTest = shipFactory(5);
    expect(lengthTest.shipLength).toBe(5);
})

test('isSunk returns false if there are no hits', () => {
    const newShip = shipFactory(3);
    expect(newShip.isSunk()).toBeFalsy();
})

test('isSunk returns false if there are hits but the boat has not been sunk', () => {
    const newShip = shipFactory(3);
    newShip.hit(0);
    newShip.hit(1);
    expect(newShip.isSunk()).toBeFalsy();
})

test('hit adds hits to the _hitArr which is detected by isSunk', () => {
    const newShip = shipFactory(2);
    newShip.hit(0);
    newShip.hit(1);
    expect(newShip.isSunk()).toBeTruthy();
})