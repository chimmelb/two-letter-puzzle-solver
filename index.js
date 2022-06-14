const DEBUG = process.env.DEBUG
const parseFile = require('./parseFile').default
const { findPotentials, checkAnswers } = require('./answerSearch.js')
const playGame = require('./playGame.js').default

;(async () => {
  // determine the game board and sides.
  const board = process.argv[2]
  const sides = board.split(',').map((s) => s.toLowerCase())
  if (!sides || sides.length !== 4 || !sides.every((s) => s.length === 3)) {
    console.log(`Game board not complete. Expected 4 sides of 3 characters each. Given: '${board}'`)
    return
  }
  console.log(`Board sides: ${sides.join('  ')}`)

  // find all 2-letter words in the dictionary
  const words = await parseFile()
  console.log(`Found ${words.length} matching words. First 5: ${words.slice(0, 5)}`)

  // filter out only words that could be part of the solution.
  !DEBUG || console.log('\nFind valid words in this game board')
  !DEBUG || console.log('\tFinding potential matches in game board.')
  let potentials = findPotentials(words, sides)
  !DEBUG || console.log(`\tFound ${potentials.length} potential words. Comfirming answers.`)
  let results = checkAnswers(potentials, sides)
  console.log(`\tResults are in. There are ${results.length} answers.`)
  !DEBUG || console.log(`${results}`)

  console.log('\nPlay the game')
  let solution = playGame(results, sides)
  let total = 0
  for (let key in solution) total += solution[key].length
  console.log(`Complete. Found ${total} solution pairs.`)
  console.log(JSON.stringify(solution, null, 2))
})()
