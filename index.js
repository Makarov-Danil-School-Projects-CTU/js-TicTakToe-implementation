class NetworkStorage {
  //Initialize the same field as frontend
  constructor(size) {
    this.size = size
    this.backendfield = new Array(size).fill('').map(() => new Array(size).fill('_'))
  }

  // Reset field after winning
  resetField() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.backendfield = new Array(this.size).fill('').map(() => new Array(this.size).fill('_'))
        resolve()
      }, 200)
    })
  }

  // Set backend's field
  set(x, y, value) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.backendfield[x - 1][y - 1] = value
        resolve()
      }, 200)
    })
  }
}

class TicTacToe {
  // Initializing
  constructor(size) {
    this.size = size
    this.frontendfield = new Array(size).fill(null).map(() => new Array(size).fill('_'))
    this.actualPlayer = 'X'
  }

  // Print field
  render() {
    this.frontendfield.forEach(row => console.log(row.join(' ')))
    console.log('\n')
  }

  // Main move function. Checks errors and does the move. Also restarts game after the winning.
  async move(x, y, networkStorage) {
    if (x > this.frontendfield.length || x < 1 || y > this.frontendfield.length || y < 1) {
      throw new Error(`Error: Position is invalid. x=${x}, y=${y}, field size=${this.size}. Game over\n`)
    } else if (this.frontendfield[y - 1][x - 1] !== '_') {
      throw new Error(`Error: This position is already occupied. x=${x}, y=${y}\n`)
    }

    // Send request to the backend
    await networkStorage.set(x, y, this.actualPlayer)
    this.frontendfield[y - 1][x - 1] = this.actualPlayer
    this.render()

    if (this.isGameOver()) {
      console.log('Game Over\n')
      // Reseting the field
      this.frontendfield = new Array(this.size).fill('').map(() => new Array(this.size).fill('_'))
      await networkStorage.resetField()
      this.actualPlayer = 'X'
      return
    }

    this.actualPlayer = this.actualPlayer === 'X' ? 'O' : 'X'
  }

  // Checks if the game is over
  isGameOver() {
    return this.checkRows() || this.checkColumns() || this.checkDiagonals()
  }

  // Checks winning combination for actual player
  checkRows() {
    return this.frontendfield.some(row => row.every(cell => cell === this.actualPlayer))
  }

  // Checks winning combination for actual player
  checkColumns() {
    for (let column = 0; column < this.frontendfield.length; column++) {
      if (this.frontendfield.every(cell => cell[column] === this.actualPlayer)) {
        return true
      }
    }
    return false
  }

  // Checks winning combination for actual player
  checkDiagonals() {
    return (
      this.frontendfield.every((row, i) => row[i] === this.actualPlayer) ||
      this.frontendfield.every((row, i) => row[this.size - 1 - i] === this.actualPlayer)
    )
  }
}

(async () => {
  const ticTacToe = new TicTacToe(3)
  const networkStorage = new NetworkStorage(3)

  // NOTICE. IN MY PROGRAM WE SET COORDINATES LIKE IN A REAL LIFE
  // IF WE HAVE 3X3 FIELD THE FIRST ROW IS FIRST, THE LAST ONE IS THIRD. THE SAME SITUATION WITH COLUMNS
  // ENJOY :3

  await ticTacToe.move(1, 1, networkStorage)
  await ticTacToe.move(3, 1, networkStorage)
  await ticTacToe.move(1, 2, networkStorage)
  await ticTacToe.move(3, 2, networkStorage)
  await ticTacToe.move(1, 3, networkStorage)
  await ticTacToe.move(1, 1, networkStorage)
  await ticTacToe.move(3, 1, networkStorage)
  await ticTacToe.move(1, 2, networkStorage)
  await ticTacToe.move(3, 2, networkStorage)
  await ticTacToe.move(1, 3, networkStorage)
})()
