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
  console.log('\nFind valid words in this game board')
  console.log('\tFinding potential matches in game board.')
  let potentials = findPotentials(words, sides)
  console.log(`\tFound ${potentials.length} potential words. Comfirming answers.`)
  let results = checkAnswers(potentials, sides)
  console.log(`Results are in. There are ${results.length} answers.`)
  console.log(`${results}`)

  console.log('\nPlay the game')
  let potentialSolutions = playGame(results, sides)
  // Each potential word has its best solution attached.
  // Look for those that cleared the game board.
  let solutions = potentialSolutions.filter((solution) => solution.remainingBoard.length === 0)
  console.log(`Complete. There ${solutions.length === 1 ? 'was' : 'were'} ${solutions.length} solution${solutions.length > 1 ? 's' : ''}`)
  if (solutions.length) {
    solutions.forEach((s) => console.log(s.solution))
  }
})()
