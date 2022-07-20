export const createPlayer = () => {

    const aiMoveSelect = (boardName) => {
        let coordinate = _numGen(100)
        const hits = boardName.getHit();
        const miss = boardName.getMiss()
        while (hits.includes(coordinate) || miss.includes(coordinate)) {
            coordinate = _numGen(100)
        }
        boardName.recieveAttack(coordinate)
    }

    const _numGen = (max) => {
        return Math.floor(Math.random() * max)
    }

    return {
        aiMoveSelect
    }
}