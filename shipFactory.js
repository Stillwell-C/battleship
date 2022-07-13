export const shipFactory = (shipLength) => {
    let _hitArr = []
    for (let i = 0; i < shipLength; i++) {
        _hitArr.push('O')
    }

    const hit = (position) => {
        _hitArr.splice(position, 1, "X")
    }

    const isSunk = () => {
        let isSunkTest = true
        _hitArr.forEach(position => {
            if (position === 'O') return isSunkTest = false
        })
        return isSunkTest === true ? true : false
    }

    return {
        shipLength,
        hit,
        isSunk
    }
}