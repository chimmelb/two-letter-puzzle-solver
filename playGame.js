const DEBUG = process.env.DEBUG
exports.default = function (words) {
  let solution = {}
  // for each word, create a new game board and play. If it succeeds, winning word!
  words.forEach((w) => {
    let lastLetter = w[2]
    solution[w] = words.filter((w) => w.startsWith(lastLetter))
  })
  return solution
}
