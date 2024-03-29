import { shipYard } from "./shipYard.js"

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
        } while (_shipCoordCheck(tempArr, increment))
        return tempArr;
    }

    const genSingleCoord = () => {
        let startCoord = -1
        while (startCoord < 0 || _shipCoords.includes(startCoord)) {
            startCoord = (Math.floor(Math.random() * 100))
        }
        return startCoord;
    }


    const _shipCoordCheck = (arr, increment) => {
        let returnValue = false
        for (let i = 0; i < arr.length; i++) {
            let coord = arr[i]
            if (_shipCoords.includes(coord) || coord < 0 || coord > 99) {
                returnValue = true
            }
        }
        if (returnValue === false && increment === 1)  {
            returnValue = _horizontalCheck(arr)
        }
        return returnValue
    }

    const _horizontalCheck = (arr) => {
        //maybe do this with regex
        if (arr[0] > 0 && arr[0] <= 9 && arr[arr.length - 1] > 9) {
            return true
        } else if (arr[0] > 9 && arr[0] <= 19 && arr[arr.length - 1] > 19) {
            return true
        } else if (arr[0] > 19 && arr[0] <= 29 && arr[arr.length - 1] > 29) {
            return true 
        } else if (arr[0] > 29 && arr[0] <= 39 && arr[arr.length - 1] > 39) {
            return true
        } else if (arr[0] > 39 && arr[0] <= 49 && arr[arr.length - 1] > 49) {
            return true
        } else if (arr[0] > 49 && arr[0] <= 59 && arr[arr.length - 1] > 59) {
            return true
        } else if (arr[0] > 59 && arr[0] <= 69 && arr[arr.length - 1] > 69) {
            return true
        } else if (arr[0] > 69 && arr[0] <= 79 && arr[arr.length - 1] > 79) {
            return true
        } else if (arr[0] > 79 && arr[0] <= 89 && arr[arr.length - 1] > 89) {
            return true
        } else if (arr[0] > 89 && arr[0] <= 99 && arr[arr.length - 1] > 99) {
            return true
        } else {
            return false
        }
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
                    return hitShip = ship
                }
            })
            hitShip.hit(coordinate)
            if (_sinkCheck(hitShip)) {
                return _shipArr.indexOf(hitShip)
            }
            return 
        } else {
            _missArr.push(coordinate)
            return -2
        }
    }

    const _sinkCheck = (ship) => {
        if (ship.isSunk()) {
            _sunkArr.push(ship)
            return true
        } else {
            return false
        }
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

    const getCoords = () => {
        return _shipCoords
    }


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
        getShipList,
        getCoords
    }
}