const DEBUG = process.env.DEBUG
let fullBoard = ''
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
