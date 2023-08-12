import { generateBoard } from "./generateBoard.js";
const timerCounter = document.getElementsByClassName("timerCounter")[0];
const boardHTML = document.getElementsByClassName("board")[0];
const boardWidth = getComputedStyle(document.documentElement).getPropertyValue('--board-width');
const boardHeight = getComputedStyle(document.documentElement).getPropertyValue('--board-height');
const minesCount = 10;
const enableTimer = () => {
    const incrementTimer = () => {
        let content = (Number(timerCounter.textContent) + 1).toString();
        if (Number(content) < 10) {
            timerCounter.textContent = '00' + content;
        }
        else if (Number(content) < 100) {
            timerCounter.textContent = '0' + content;
        }
        else {
            timerCounter.textContent = content;
        }
    };
    setInterval(incrementTimer, 1000);
};
const setHTMLBoard = (genBoard) => {
    genBoard.forEach(el => {
        const field = document.createElement('div');
        field.id = el.x + "-" + el.y;
        field.classList.add('field');
        boardHTML.appendChild(field);
    });
};
const main = () => {
    const generatedBoard = generateBoard(Number(boardWidth), Number(boardHeight), minesCount);
    setHTMLBoard(generatedBoard);
    enableTimer();
};
main();
//# sourceMappingURL=script.js.map