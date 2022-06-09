const DEBUG = process.env.DEBUG
exports.findPotentials = function (words, sides) {
  // find potential matches - brute force style
  // for each potential word,
  let fullBoard = sides.join('') // full board is just a string
  !DEBUG || console.log(`\tfullBoard = ${fullBoard}`)
  return words.filter((w) => {
    // for each letter in the word
    for (let c of w) {
      // if any letter is not even in the game board, filter away
      if (!fullBoard.includes(c)) {
        !DEBUG || console.log(`\t\t ${w} is not in the game board`)
        return false
      }
    }
    return true //both letters are in the game board. Keep going.
  })
}
exports.checkAnswers = function (words, sides) {
  // rules of the game.
  //  1. no two letters in a row
  //  2. no two letter in the same side
  return words.filter((w) => {
    // this is only a two letter word
    let first = w[0]
    let second = w[1]
    if (first === second) {
      !DEBUG || console.log(`\t${w} has duplicate letters`)
      return false
    }
    for (let side of sides) {
      if (side.includes(first) && side.includes(second)) {
        !DEBUG || console.log(`\t${w} is found only on one side: ${side}`)
        return false
      }
    }
    return true
  })
}
