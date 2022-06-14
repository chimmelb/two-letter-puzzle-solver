# two-letter-puzzle-solver

This is personal project to solve a letter puzzle for pairs of words that complete the puzzle.

## Install

This project is written in JavaScript and requires NodeJS. Node can be [downloaded here](https://nodejs.org/en/download/), though if you plan on using node for an extended period of time, I recommend [nvm](https://github.com/nvm-sh/nvm).

## Running the Project

This project can be run with the following command:

> `node index.js RME,WCL,KGT,IPA`

`node` uses the node server and `index.js` is the main file of the algorithm. The 3rd argument is the 4 sides of the puzzle, comma separated as one string with each side being 3 characters long.

### Optional dictionary

If providing a 4th argument, that 4th argument will be the name of a file _in this directory_ to use as the dictionary. If none is provided, `words.txt` is used by default.

### Extra output

If the environment variable `DEBUG` is present, the program will spew forth extra console logging. Try the command: `DEBUG=true node index.js RME,WCL,KGT,IPA`

## Approach

This project is fairly straight forward.

1. `index.js` This is the main function of the program and calls on the other files here.
1. `parseFile.js` This function is used to parse the dictionary file, returning only words that are > 2 letters.
1. `answerSearch.js` Of all the words returned, only some will be relevant to the current game. First the words that exist within the gameboard are found (using `function findPotentials()`), then those words are checked for doubles, and consecutive letters appearing on the same side (using `function checkAnswers()`)
1. `playGame.js` It simply looks at every starting word, and finds any matches in the other words that end with its last letter. This also checks the pair to see if it solves the puzzle. These are stored in an array, which are the values of the soution JSON object (a Map) where the key is the starting word.

## Thoughts

> `node index.js RME,WCL,KGT,IPA`

I misread this entire program the first time. See my commit history if you're intested in another program (there's recursion, if you're into that sort of thing : )

Here is the final output of this program using the above input.

```
Board sides: rme  wcl  kgt  ipa
Reading words.txt looking for >2 length letter words
Found 154497 matching words. First 5: ltd,doa,etc,hew,vex
        Results are in. There are 857 answers.

Play the game
Complete. Found 7 solution pairs.
{
  "wigwam": [
    "marketplace"
  ],
  "pragmatic": [
    "cakewalk",
    "crackleware"
  ],
  "marketplace": [
    "earwig"
  ],
  "pragmatical": [
    "lawmaker",
    "lieawake"
  ],
  "practicegame": [
    "epkwele"
  ]
}
```

Sorry this was not done in Java. An Object Oriented approad might have had objects like "Word", "GameBoard", "Parser"  and "Solver". Parser would have read a file and created many potential Word objects. Solver would have had the methods used in index.js like `Solver.findPotentialAnswers(Word[] words)` or `Solver.playGame(Word[] words, GameBoard board)`. (I would have missed the built in JavaScript array functions like `.every()` and `.filter()`).
