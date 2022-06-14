const fs = require('fs')
const path = require('path')
exports.default = async function () {
  let filename = process.argv[3] || 'words.txt'
  const filepath = path.resolve(__dirname, filename)

  const LENGTH = 3 // this only finds 3-letter words for a solution
  console.log(`Reading words.txt looking for ${LENGTH} letter words`)
  // read the file. This could be streamed if very large.
  const wordsStr = await fs.promises.readFile(filepath, 'utf8')
  // create an array of word answers where
  const words = wordsStr
    .split('\n')
    .map((word) => {
      let w = word.toLowerCase().trim().replace(/\W/g, '')
      return w
    }) // the string is in lowercase letters, with no whitespace on ends
    .filter((w) => w.length === LENGTH) // the word is exactly the target length
  return words
}
