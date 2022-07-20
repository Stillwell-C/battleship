export const shipYard = (shipLength) => {
    let _hitArr = []
    let _coordArr = []

    const hit = () => {
        _hitArr.push("X")
    }

    const isSunk = () => {
        return _hitArr.length === shipLength ? true : false
    }

    const setCoords = (coordinateArray) => {
        if (coordinateArray.length !== shipLength) {
            throw new Error(`Coordinates not valid length. Please enter ${shipLength} coordinates`)
        }
        coordinateArray.forEach(coordinate => _coordArr.push(coordinate))
        return true
    }

    const getCoords = () => {
        return _coordArr
    }

    //Maybe add a function to set a location array and return said array. Start empty and then have set later when it is placed.

    //Maybe a clear coords function incase coords need to be reset

    return {
        shipLength,
        hit,
        isSunk,
        setCoords,
        getCoords
    }
}