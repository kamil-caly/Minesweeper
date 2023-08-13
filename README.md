Oto prosta dokumentacja dla Twojego projektu:

---

# Minesweeper TypeScript Game

This project is a simple implementation of the classic Minesweeper game using TypeScript. Players uncover tiles to reveal either mines or numbers, with numbers indicating the count of adjacent mines. The goal is to uncover all tiles without detonating a mine.

## Features

- Dynamic board generation based on the provided width and height.
- Timer to track the duration of the game.
- Flagging suspected mines with right-click.
- Game Over and Win alerts.
- Recursive tile reveal function to expose contiguous non-mine tiles.
- Mines are distributed randomly across the board.

## How to Play:

1. Left-click a tile to reveal its content. 
2. If a mine is revealed, the game is over.
3. If a number is revealed, it indicates the count of mines in the adjacent tiles.
4. Right-click a tile to flag it as a suspected mine.
5. Win by revealing all non-mine tiles.

## Setup and Run:

To set up and run the game, follow these steps:

1. Clone the repository.
2. Compile the TypeScript files.
3. Open the index.html file in your browser to start the game.
