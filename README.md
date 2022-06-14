# two-letter-puzzle-solver

This is personal project to solve a letter puzzle using only 2-letter words from provided dictionary.

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

This project is fairly straight forward, with a bit of recursion to find a solution.

1. `index.js` This is the main function of the program and calls on the other files here.
1. `parseFile.js` This function is used to parse the dictionary file, returning only 2-letter words.
1. `answerSearch.js` Of all the words returned, only some will be relevant to the current game. First the words that exist within the gameboard are found (using `function findPotentials()`), then those words are checked for doubles, and appearing on the same side (using `function checkAnswers()`)
1. `playGame.js` The guts of the algorithm. The default function runs the algorithm against every potential word. The algorithm builds a solution while removing matched letters from the full game board. It will either:
     1. Solve the board, returning a successful solution with no remaining characters on the board.
     1. Search for the next word that continues the solution ("last letter of word starts the next"). If there is no next word, the solution ends. If there is a next word, the algorithm is called recursively with the next word on the end of the solution.

## Thoughts

From the given dictionary and sample game board, there was no solution. I included a changed dictionary that has a solution. That can be run with:

> `node index.js RME,WCL,KGT,IPA workingwords.txt`

This solution presented only finds one working solution for each starter word. If there were two choices of "next word", only the first is searched. This could lead to no solution or sub-optimal solutions. Exploring the full solution tree would be the only way to know. A pathing algorithm like depth first ('A\*') could be used to find the shortest solution, if there was one.
