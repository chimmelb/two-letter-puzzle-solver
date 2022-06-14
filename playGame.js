const DEBUG = process.env.DEBUG
exports.default = function (words, sides) {
  let solution = {}
  let fullboard = sides.join('').split('')
  // for each word, create a new game board and play. If it succeeds, winning word!
  words.forEach((w) => {
    let lastLetter = w[w.length - 1]
    let pairs = words.filter((word) => {
      // if word does not start with the last letter, just skip
      if (!word.startsWith(lastLetter)) return false
      // skip any pairs that are not long enough to solve the puzzle
      if (word.length + w.length < fullboard.length) return false
      let pair = '' + w + word
      return fullboard.every((c) => {
        // for every character in the board, make sure it's in the pair.
        // result is true only if every one is true
        return pair.includes(c)
      })
    })
    if (pairs.length) solution[w] = pairs
  })
  return solution
}
