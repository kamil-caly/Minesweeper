export type boardContent = {
    x: number;
    y: number;
    content: string | number;
}

export function generateBoard(width: number, height: number, minesCount: number): boardContent[] {
    let board: boardContent[] = [];

    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            board.push({x: x, y: y, content: ''});
        }
    }

    const generateMines = () => {
        while(minesCount) {
            const position = [Math.floor(Math.random() * width) , Math.floor(Math.random() * width)];

            const boardEmptyField = board.find(e => e.x === position[0] && e.y === position[1] && e.content !== 'mine');
            if(boardEmptyField) {
                board[board.indexOf(boardEmptyField)] = {...boardEmptyField, content: 'mine'};
                minesCount--;
            }
        }
    }

    const generateMinesNumbers = () => {
        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                const currentEmptyField = board.find(e => e.x === x && e.y === y && e.content === '');
                if(currentEmptyField) {
                    let minesNumber: number = 0;
                    // up
                    board.find(e => e.x === x - 1 && e.y === y && e.content === 'mine') && minesNumber++;
                    // up-right
                    board.find(e => e.x === x - 1 && e.y === y + 1 && e.content === 'mine') && minesNumber++
                    // right
                    board.find(e => e.x === x && e.y === y + 1 && e.content === 'mine') && minesNumber++;
                    // right-down
                    board.find(e => e.x === x + 1 && e.y === y + 1 && e.content === 'mine') && minesNumber++;
                    // down
                    board.find(e => e.x === x + 1 && e.y === y && e.content === 'mine') && minesNumber++;
                    // left-down
                    board.find(e => e.x === x + 1 && e.y === y - 1 && e.content === 'mine') && minesNumber++;
                    // left
                    board.find(e => e.x === x && e.y === y - 1 && e.content === 'mine') && minesNumber++;
                    // up-left
                    board.find(e => e.x === x - 1 && e.y === y - 1 && e.content === 'mine') && minesNumber++;

                    minesNumber > 0 && (board[board.indexOf(currentEmptyField)] = {...currentEmptyField, content: minesNumber});
                }
            }
        }
    }

    generateMines();
    generateMinesNumbers();

    console.log("board: ", board);
    return board;
}