const DEBUG = process.env.DEBUG
/**
 * Filter the given three letter words to only those that could
 * possibly exist in the game.
 * @param {string[]} words all the 3-letter words from the dictionary
 * @param {string[]} sides the 4 sides of the gameboard
 * @returns a string[] of words that are in the game board
 */
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
/**
 * Filter the given array of words to follow the rules of the game
 *   1. no two letters in a row
 *   2. no two letter in the same side
 * @param {string[]} words the words that could exist on the game board
 * @param {string[]} sides the 4 sides of the game board
 * @returns a string[] of valid words
 */
exports.checkAnswers = function (words, sides) {
  return words.filter((w) => {
    for (let ii = 1; ii < w.length - 1; ii++) {
      let first = w[ii - 1]
      let second = w[ii]
      if (first === second) {
        !DEBUG || console.log(`\t${w} has duplicate letters`)
        return false
      }
      for (let side of sides) {
        if (side.includes(first) && side.includes(second)) {
          !DEBUG || console.log(`\t${w} is found with two consecutive letters only on one side: ${side}`)
          return false
        }
      }
    }
    return true
  })
}
