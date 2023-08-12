import { generateBoard } from "./generateBoard.js";
const directions = {
    UP: "up",
    RIGHT_UP: "rightUp",
    RIGHT: "right",
    RIGHT_DOWN: "rightDown",
    DOWN: "down",
    LEFT_DOWN: "leftDown",
    LEFT: "left",
    LEFT_UP: "leftUp"
};
const timerCounter = document.getElementsByClassName("timerCounter")[0];
const boardHTML = document.getElementsByClassName("board")[0];
const minesCounter = document.getElementsByClassName("minesCounter")[0];
const boardWidth = getComputedStyle(document.documentElement).getPropertyValue('--board-width');
const boardHeight = getComputedStyle(document.documentElement).getPropertyValue('--board-height');
const minesCount = 3;
const generatedBoard = generateBoard(Number(boardWidth), Number(boardHeight), minesCount);
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
const rightClick = (event) => {
    event.preventDefault();
    const clickedElement = document.getElementById(event.target['id']);
    if (clickedElement.classList.contains('flagField')) {
        clickedElement.classList.remove('flagField');
        minesCounter.textContent = (Number(minesCounter.textContent) + 1).toString();
    }
    else if (Number(minesCounter.textContent) > 0) {
        clickedElement.classList.add('flagField');
        minesCounter.textContent = (Number(minesCounter.textContent) - 1).toString();
    }
    console.log(clickedElement);
};
const leftClick = (event) => {
    const clickedElement = document.getElementById(event.target['id']);
    if (!clickedElement || clickedElement.classList.contains('flagField') || clickedElement.classList.length > 1)
        return;
    const [x, y] = clickedElement.id.split('-');
    const [posX, posY] = [Number(x), Number(y)];
    const isMineHit = generatedBoard.find(el => el.x === posX && el.y === posY && el.content === 'mine');
    if (isMineHit) {
        generatedBoard.forEach(el => {
            if (el.content === 'mine') {
                const currentMineElement = document.getElementById(el.x + "-" + el.y);
                if (currentMineElement) {
                    currentMineElement.classList.add('mineField');
                    currentMineElement.innerHTML = '⨂';
                }
            }
        });
        setTimeout(gameOver, 50);
    }
    else {
        revealField(clickedElement, posX, posY);
        checkWin();
    }
};
// recursive function
const revealField = (clickedElement, posX, posY) => {
    if (!clickedElement || clickedElement.classList.length > 1)
        return;
    const genBoardCurrentElem = generatedBoard.find(el => el.x === posX && el.y == posY);
    if ((genBoardCurrentElem === null || genBoardCurrentElem === void 0 ? void 0 : genBoardCurrentElem.content) !== '') {
        clickedElement.classList.add('visibleField');
        clickedElement.textContent = genBoardCurrentElem.content;
        clickedElement.style.color = getNumberColor(genBoardCurrentElem.content);
        return;
    }
    else {
        clickedElement.classList.add('visibleField');
    }
    Object.values(directions).forEach(dir => {
        switch (dir) {
            case directions.UP:
                revealField(document.getElementById((posX - 1) + '-' + posY), posX - 1, posY);
                break;
            case directions.RIGHT_UP:
                revealField(document.getElementById((posX - 1) + '-' + (posY + 1)), posX - 1, posY + 1);
                break;
            case directions.RIGHT:
                revealField(document.getElementById(posX + '-' + (posY + 1)), posX, posY + 1);
                break;
            case directions.RIGHT_DOWN:
                revealField(document.getElementById((posX + 1) + '-' + (posY + 1)), posX + 1, posY + 1);
                break;
            case directions.DOWN:
                revealField(document.getElementById((posX + 1) + '-' + posY), posX + 1, posY);
                break;
            case directions.LEFT_DOWN:
                revealField(document.getElementById((posX + 1) + '-' + (posY - 1)), posX + 1, posY - 1);
                break;
            case directions.LEFT:
                revealField(document.getElementById(posX + '-' + (posY - 1)), posX, posY - 1);
                break;
            case directions.LEFT_UP:
                revealField(document.getElementById((posX - 1) + '-' + (posY - 1)), posX - 1, posY - 1);
                break;
            default:
                break;
        }
    });
};
const getNumberColor = (content) => {
    switch (content) {
        case 1:
            return '#187ecf';
        case 2:
            return '#368c3c';
        case 3:
            return '#d43534';
        case 4:
            return '#7b1fa2';
        case 5:
            return '#ff8e00';
        case 6:
            return '#b52dee';
        case 7:
            return '#f28600';
        case 8:
            return '#581302';
        default:
            return 'black';
    }
};
const gameOver = () => {
    alert(`Game Over!`);
    location.reload();
};
const checkWin = () => {
    const revealField = document.getElementsByClassName("visibleField").length;
    if (revealField + minesCount === Number(boardWidth) * Number(boardHeight)) {
        setTimeout(() => {
            alert(`You Win!!! Your time is: ${+timerCounter.textContent}s`);
            location.reload();
        }, 50);
    }
};
const setHTMLBoard = (genBoard) => {
    genBoard.forEach(el => {
        const field = document.createElement('div');
        field.id = el.x + "-" + el.y;
        field.classList.add('hideField');
        field.addEventListener('contextmenu', rightClick);
        field.addEventListener('click', leftClick);
        boardHTML.appendChild(field);
    });
};
const main = () => {
    setHTMLBoard(generatedBoard);
    enableTimer();
};
main();
//# sourceMappingURL=script.js.map