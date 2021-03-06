import { shipYard } from "./shipYard"

export const gameBoard = () => {
    const _boardArr = []
    const _shipCoords = []
    const _missArr = []
    const _hitArr = []
    const _sunkArr = []

    const carrier = shipYard(5)
    const battleship = shipYard(4)
    const cruiser = shipYard(3)
    const submarine = shipYard(3)
    const destroyer = shipYard(2)
    const _shipArr = [carrier, battleship, cruiser, submarine, destroyer]

    for (let i = 0; i < 100; i++) {
        _boardArr.push(i)
    }

    const getBoardArr = () => {
        return _boardArr
    }

    const placeShip = (shipName, coordinatesArray) => {
        if (shipName.setCoords(coordinatesArray)) {
            coordinatesArray.forEach(coordinate => _shipCoords.push(coordinate))
        }
    }

    const coordGenerator = (coordNum) => {
        let orientation = _randomSelector() ? 'vertical' : 'horizontal'
    
        let coordArr = []
    
        if (orientation === 'vertical') {
            let generatedArr = _coordArrGen(coordNum, 1)
            generatedArr.forEach(coord => {
                coordArr.push(coord)
            })
        } else {
            let generatedArr = _coordArrGen(coordNum, 10)
            generatedArr.forEach(coord => {
                coordArr.push(coord)
            })
        }

        return coordArr
    }

    const _coordArrGen = (coordNum, increment) => {
        let tempArr = []
        do {
            tempArr = [];
            tempArr.push(genSingleCoord());
            for (let i = 0; i < coordNum - 1; i++) {
                tempArr.push(tempArr[i] + increment)
            }
        } while (_shipCoordCheck(tempArr))
        return tempArr;
    }

    const genSingleCoord = () => {
        let startCoord = -1
        while (startCoord < 0 || _shipCoords.includes(startCoord)) {
            startCoord = (Math.floor(Math.random() * 100))
        }
        return startCoord;
    }

    const _shipCoordCheck = (arr) => {
        let returnValue = false
        for (let i = 0; i < arr.length; i++) {
            let coord = arr[i]
            if (_shipCoords.includes(coord) || coord < 0 || coord > 100) {
                returnValue = true
            }
        }
        return returnValue
    }

    const _randomSelector = () => {
        return (Math.floor(Math.random() * 2) + 1) % 2 === 0
    }

    const recieveAttack = (coordinate) => {
        if (_shipCoords.includes(coordinate)) {
            _hitArr.push(coordinate)
            let hitShip
            _shipArr.forEach(ship => {
                let coords = ship.getCoords()
                if (coords.includes(coordinate)) {
                    hitShip = ship
                }
            })
            hitShip.hit(coordinate)
            _sinkCheck(hitShip)
            return hitShip
        } else {
            _missArr.push(coordinate)
        }
    }

    const _sinkCheck = (ship) => {
        if (ship.isSunk()) _sunkArr.push(ship)
    }

    const getMiss = () => {
        return _missArr
    }

    const getHit = () => {
        return _hitArr
    }

    const getSunk = () => {
        return _sunkArr
    }

    const allSunk = () => {
        if (_sunkArr.length === 5) {
            return true
        } else {
            return false
        }
    }

    const getShipList = () => {
        return _shipArr
    }


    //some funciton to check if all ships have coords set

    return {
        getBoardArr,
        placeShip,
        recieveAttack,
        coordGenerator,
        genSingleCoord,
        getMiss,
        getHit,
        allSunk,
        getSunk,
        getShipList
    }
}