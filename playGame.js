const DEBUG = process.env.DEBUG
let fullBoard = ''
/**
 * For the passed solution, find the final two characters, which is the current word in question.
 * Remove that word from the board, and check if another word can continue the game.
 * If there is no next word, or the game is solved, return the current solution.
 * If there is a next word, append to the solution and call `playGame()` again.
 * @param {string} solution the current solution string in the format `word -> word -> word ....`
 * @param {string} remainingBoard the letters of the full board that have not been used
 * @param {*} remainingWords the words still available to use
 * @returns object { solution: string, remainingBoard: string }
 */
function playGame(solution, remainingBoard, remainingWords) {
  // start with the current solution.
  let first = solution[solution.length - 2]
  let second = solution[solution.length - 1]
  let lastWordIdx = remainingWords.indexOf([first, second].join(''))
  if (lastWordIdx > -1) remainingWords.splice(lastWordIdx, 1)
  if (remainingBoard.includes(first)) remainingBoard.splice(remainingBoard.indexOf(first), 1)
  if (remainingBoard.includes(second)) remainingBoard.splice(remainingBoard.indexOf(second), 1)

  // the board has been cleared. Done! Return a good result
  if (!remainingBoard.length) return { solution, remainingBoard }

  // the game continues
  // look for the next word that starts with this words ending
  let nextWord = remainingWords.find((w) => w.startsWith(second))
  // There is a word to try. Continue searching
  if (nextWord) return playGame(solution + ' -> ' + nextWord, remainingBoard, remainingWords)

  // Dead end, no other word in the dictionary can continue the puzzle
  return { solution, remainingBoard }
}

/**
 * Checks for a solution for every word in words. The minimum solution
 * is the word itself.
 * @param {string[]} words
 * @param {string[]} sides the 4 sides of the game board
 * @returns an object[], where each object { solution: string, remainingBoard: string} has the furthest solution possible, and the remaining board when the game ended.
 */
exports.default = function (words, sides) {
  fullBoard = sides.join('')
  // for each word, create a new game board and play. If it succeeds, winning word!
  return words.map((w) => {
    !DEBUG || console.log(`${w} with ${fullBoard}`)
    let result = playGame(w, fullBoard.split(''), [...words])
    !DEBUG || console.log(`\t${result.solution}`)
    !DEBUG || console.log(`\tremaining: ${result.remainingBoard}`)
    return result
  })
}
