import { generateBoard } from "./generateBoard.js";

const timerCounter = document.getElementsByClassName("timerCounter")[0];

const boardWidth = getComputedStyle(document.documentElement).getPropertyValue('--board-width');
const boardHeight = getComputedStyle(document.documentElement).getPropertyValue('--board-height');
const minesCount: number = 10;

const enableTimer = (): void => {
    const incrementTimer = (): void => {
        let content: string = (Number(timerCounter.textContent) + 1).toString();
        if(Number(content) < 10) {
            timerCounter.textContent = '00' + content;
        } else if(Number(content) < 100) {
            timerCounter.textContent = '0' + content;
        } else {
            timerCounter.textContent = content;
        }
    }

    setInterval(incrementTimer, 1000);
}

const main = () => {
    generateBoard(Number(boardWidth), Number(boardHeight), minesCount);
    enableTimer();
}

main();
