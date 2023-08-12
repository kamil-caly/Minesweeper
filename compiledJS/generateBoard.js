export function generateBoard(width, height, minesCount) {
    let board = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            board.push({ x: x, y: y, content: '' });
        }
    }
    const generateMines = () => {
        while (minesCount) {
            const position = [Math.floor(Math.random() * width), Math.floor(Math.random() * width)];
            const boardEmptyField = board.find(e => e.x === position[0] && e.y === position[1] && e.content !== 'mine');
            if (boardEmptyField) {
                board[board.indexOf(boardEmptyField)] = Object.assign(Object.assign({}, boardEmptyField), { content: 'mine' });
                minesCount--;
            }
        }
    };
    generateMines();
    console.log("board: ", board);
}
//# sourceMappingURL=generateBoard.js.map