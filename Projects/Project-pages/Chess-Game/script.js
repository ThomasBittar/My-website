document.addEventListener('DOMContentLoaded', () => {
    //Defining game object and switching turns

    let game = {};
    Object.defineProperty(game, 'turn', {
        set(value) {
            this._turn = value;
            if (value === 'black') {
                console.log("Black's turn!");
                playMoveBlack();
            }
            else if (value === 'white') {
                console.log("White's turn!");
                playMoveWhite();
            }
        },
        get() {
            return this._turn;
        }
    });

    //Defining the chess board

    let board = document.querySelector('.board');
    let clickedPiece = 0;

    //Defining the reset button

    resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', resetGrid);



    //Defining functions

    function createGrid() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let div = document.createElement('div');
                if ((i + j) % 2) {
                    div.setAttribute('style', 'background-color:coral; height: 10vh; max-height: 10vw; width: 10vh; max-width: 10vw;');
                }
                else {
                    div.setAttribute('style', 'background-color:white; height: 10vh; max-height: 10vw; width: 10vh; max-width: 10vw;');
                }
                div.setAttribute('data-id', (j + 1) + '.' + (8 - i));
                board.appendChild(div);
            }
        }
    }
    function resetGrid() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                grid[(8 * i) + j].innerHTML = "";
                let img = document.createElement('img');
                if (i === 1) {
                    img.setAttribute('src', 'images/pion1.png');
                    img.classList.add('black');
                    grid[(8 * i) + j].appendChild(img);
                }
                else if (i === 6) {
                    img.setAttribute('src', 'images/pion2.png');
                    img.classList.add('white');
                    grid[(8 * i) + j].appendChild(img);
                }
                else if (i === 7) {
                    switch (j) {
                        case 0:
                            img.setAttribute('src', 'images/tour2.png');
                            img.classList.add('white');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 1:
                            img.setAttribute('src', 'images/cavalier2.png');
                            img.classList.add('white');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 2:
                            img.setAttribute('src', 'images/fou2.png');
                            img.classList.add('white');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 3:
                            img.setAttribute('src', 'images/dame2.png');
                            img.classList.add('white');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 4:
                            img.setAttribute('src', 'images/roi2.png');
                            img.classList.add('white');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 5:
                            img.setAttribute('src', 'images/fou2.png');
                            img.classList.add('white');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 6:
                            img.setAttribute('src', 'images/cavalier2.png');
                            img.classList.add('white');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 7:
                            img.setAttribute('src', 'images/tour2.png');
                            img.classList.add('white');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                    }
                }
                else if (i === 0) {
                    switch (j) {
                        case 0:
                            img.setAttribute('src', 'images/tour1.png');
                            img.classList.add('black');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 1:
                            img.setAttribute('src', 'images/cavalier1.png');
                            img.classList.add('black');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 2:
                            img.setAttribute('src', 'images/fou1.png');
                            img.classList.add('black');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 3:
                            img.setAttribute('src', 'images/dame1.png');
                            img.classList.add('black');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 4:
                            img.setAttribute('src', 'images/roi1.png');
                            img.classList.add('black');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 5:
                            img.setAttribute('src', 'images/fou1.png');
                            img.classList.add('black');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 6:
                            img.setAttribute('src', 'images/cavalier1.png');
                            img.classList.add('black');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                        case 7:
                            img.setAttribute('src', 'images/tour1.png');
                            img.classList.add('black');
                            grid[(8 * i) + j].appendChild(img);
                            break;
                    }
                }
            }
        }
        game.turn = 'white';
    }
    function showAllMoves(e) {
        if (e.target.nodeName === "IMG") {
            let currentPosition = e.target.parentElement.getAttribute('data-id');
            let shownMoves = document.querySelectorAll('.target');
            for (let i = 0; i < shownMoves.length; i++) {
                shownMoves[i].remove();
            }
            let column = parseInt(currentPosition[0]);
            let row = parseInt(currentPosition[2]);
            let firstColumn = column - 1;
            let lastColumn = column + 1;
            let firstRow = row - 1;
            let lastRow = row + 1;
            let firstDiag1 = [];
            let firstDiag2 = [];
            let lastDiag1 = [];
            let lastDiag2 = [];
            switch (e.target.getAttribute('src')) {
                case 'images/pion2.png':
                    /*Pion à la base avec rien devant lui*/
                    if (/*rangée 2*/currentPosition[2] === '2' && /*rien sur la première case*/ !grid[(8 - parseInt(currentPosition[2]) - 1) * 8 + parseInt(currentPosition[0]) - 1].hasChildNodes() && /*rien sur la deuxième case*/ !grid[(8 - parseInt(currentPosition[2]) - 2) * 8 + parseInt(currentPosition[0]) - 1].hasChildNodes()) {
                        for (let i = 0; i < grid.length; i++) {
                            if (grid[i].getAttribute('data-id')[0] === currentPosition[0] && ((parseInt(grid[i].getAttribute('data-id')[2]) === parseInt(currentPosition[2]) + 1 || parseInt(grid[i].getAttribute('data-id')[2]) === parseInt(currentPosition[2]) + 2))) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible2.png');
                                cible.classList.add('target');
                                grid[i].appendChild(cible);
                            }
                        }
                    }
                    /*Obstacle juste devant*/
                    else if (/*obstacle sur la première case*/ grid[(8 - parseInt(currentPosition[2]) - 1) * 8 + parseInt(currentPosition[0]) - 1].hasChildNodes()) {
                    }
                    /*Pion déjà avancé, ou obstacle à 2 cases*/
                    else {
                        for (let i = 0; i < grid.length; i++) {
                            if (grid[i].getAttribute('data-id')[0] === currentPosition[0] && (parseInt(grid[i].getAttribute('data-id')[2]) === parseInt(currentPosition[2]) + 1)) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible2.png');
                                cible.classList.add('target');
                                grid[i].appendChild(cible);
                            }
                        }
                    }
                    /*Captures possibles*/
                    if (currentPosition[0] < 8) {
                        if (grid[(8 - parseInt(currentPosition[2]) - 1) * 8 + parseInt(currentPosition[0])].querySelector('.black')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - parseInt(currentPosition[2]) - 1) * 8 + parseInt(currentPosition[0])].appendChild(cible);
                        }
                    }
                    if (currentPosition[0] > 1) {
                        if (grid[(8 - parseInt(currentPosition[2]) - 1) * 8 + parseInt(currentPosition[0]) - 2].querySelector('.black')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - parseInt(currentPosition[2]) - 1) * 8 + parseInt(currentPosition[0]) - 2].appendChild(cible);
                        }
                    }
                    break;
                case 'images/pion1.png':
                    /*Pion à la base avec rien devant lui*/
                    if (/*rangée 2*/currentPosition[2] === '7' && /*rien sur la première case*/ !grid[(8 - parseInt(currentPosition[2]) + 1) * 8 + parseInt(currentPosition[0]) - 1].hasChildNodes() && /*rien sur la deuxième case*/ !grid[(8 - parseInt(currentPosition[2]) + 2) * 8 + parseInt(currentPosition[0]) - 1].hasChildNodes()) {
                        for (let i = 0; i < grid.length; i++) {
                            if (grid[i].getAttribute('data-id')[0] === currentPosition[0] && ((parseInt(grid[i].getAttribute('data-id')[2]) === parseInt(currentPosition[2]) - 1 || parseInt(grid[i].getAttribute('data-id')[2]) === parseInt(currentPosition[2]) - 2))) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible1.png');
                                cible.classList.add('target');
                                grid[i].appendChild(cible);
                            }
                        }
                    }
                    /*Obstacle juste devant*/
                    else if (/*obstacle sur la première case*/ grid[(8 - parseInt(currentPosition[2]) + 1) * 8 + parseInt(currentPosition[0]) - 1].hasChildNodes()) {
                    }
                    /*Pion déjà avancé, ou obstacle à 2 cases*/
                    else {
                        for (let i = 0; i < grid.length; i++) {
                            if (grid[i].getAttribute('data-id')[0] === currentPosition[0] && (parseInt(grid[i].getAttribute('data-id')[2]) === parseInt(currentPosition[2]) - 1)) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible1.png');
                                cible.classList.add('target');
                                grid[i].appendChild(cible);
                            }
                        }
                    }
                    /*Captures possibles*/
                    if (currentPosition[0] < 8) {
                        if (grid[(8 - parseInt(currentPosition[2]) + 1) * 8 + parseInt(currentPosition[0])].querySelector('.white')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - parseInt(currentPosition[2]) + 1) * 8 + parseInt(currentPosition[0])].appendChild(cible);
                        }
                    }
                    if (currentPosition[0] > 1) {
                        if (grid[(8 - parseInt(currentPosition[2]) + 1) * 8 + parseInt(currentPosition[0]) - 2].querySelector('.white')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - parseInt(currentPosition[2]) + 1) * 8 + parseInt(currentPosition[0]) - 2].appendChild(cible);
                        }
                    }
                    break;
                case 'images/tour1.png':
                    //Déplacements sauf captures
                    console.log(lastColumn, lastRow, firstColumn, firstRow);
                    for (let i = column + 1; i <= 8 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i++) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - row) * 8 + i - 1].appendChild(cible);
                        lastColumn = i + 1;
                    }
                    for (let i = column - 1; i > 0 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i--) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - row) * 8 + i - 1].appendChild(cible);
                        firstColumn = i - 1;
                    }
                    for (let i = row + 1; i <= 8 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i++) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - i) * 8 + column - 1].appendChild(cible);
                        lastRow = i + 1;
                    }
                    for (let i = row - 1; i > 0 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i--) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - i) * 8 + column - 1].appendChild(cible);
                        firstRow = i - 1;
                    }
                    //Captures
                    if (firstColumn >= 1) {
                        if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.white')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - row) * 8 + (firstColumn) - 1].appendChild(cible);
                        }
                    }
                    if (lastColumn <= 8 && lastColumn !== 0) {
                        if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.white')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - row) * 8 + (lastColumn) - 1].appendChild(cible);
                        }
                    }
                    if (firstRow >= 1) {
                        if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.white')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - firstRow) * 8 + (column) - 1].appendChild(cible);
                        }
                    }
                    if (lastRow <= 8 && lastRow !== 0) {
                        if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.white')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - lastRow) * 8 + (column) - 1].appendChild(cible);
                        }
                    }
                    break;
                case 'images/tour2.png':
                    //Déplacements sauf captures
                    console.log(lastColumn, lastRow, firstColumn, firstRow);
                    for (let i = column + 1; i <= 8 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i++) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - row) * 8 + i - 1].appendChild(cible);
                        lastColumn = i + 1;
                    }
                    for (let i = column - 1; i > 0 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i--) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - row) * 8 + i - 1].appendChild(cible);
                        firstColumn = i - 1;
                    }
                    for (let i = row + 1; i <= 8 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i++) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - i) * 8 + column - 1].appendChild(cible);
                        lastRow = i + 1;
                    }
                    for (let i = row - 1; i > 0 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i--) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - i) * 8 + column - 1].appendChild(cible);
                        firstRow = i - 1;
                    }
                    //Captures
                    if (firstColumn >= 1) {
                        if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.black')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - row) * 8 + (firstColumn) - 1].appendChild(cible);
                        }
                    }
                    if (lastColumn <= 8 && lastColumn !== 0) {
                        if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.black')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - row) * 8 + (lastColumn) - 1].appendChild(cible);
                        }
                    }
                    if (firstRow >= 1) {
                        if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.black')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - firstRow) * 8 + (column) - 1].appendChild(cible);
                        }
                    }
                    if (lastRow <= 8 && lastRow !== 0) {
                        if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.black')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - lastRow) * 8 + (column) - 1].appendChild(cible);
                        }
                    }
                    break;
                case 'images/fou1.png': {
                    //Déplacements sauf captures
                    rowIterator = row + 1;
                    columnIterator = column + 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator++;
                            columnIterator++;
                        }
                        lastDiag1 = [rowIterator, columnIterator];
                    } while (rowIterator <= 8 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    rowIterator = row - 1;
                    columnIterator = column - 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator--;
                            columnIterator--;
                        }
                        firstDiag1 = [rowIterator, columnIterator];

                    } while (rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    rowIterator = row + 1;
                    columnIterator = column - 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator++;
                            columnIterator--;
                        }
                        lastDiag2 = [rowIterator, columnIterator];

                    } while (rowIterator <= 8 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    rowIterator = row - 1;
                    columnIterator = column + 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator--;
                            columnIterator++;
                        }
                        firstDiag2 = [rowIterator, columnIterator];

                    } while (rowIterator > 0 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    //Captures

                    console.log(firstDiag1, lastDiag1, firstDiag2, lastDiag2);
                    if (firstDiag1.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].hasChildNodes()) {
                            if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.white')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible1.png');
                                cible.classList.add('target');
                                grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].appendChild(cible);
                            }
                        }
                    }
                    if (lastDiag1.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].hasChildNodes()) {
                            if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.white')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible1.png');
                                cible.classList.add('target');
                                grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].appendChild(cible);
                            }
                        }
                    }
                    if (firstDiag2.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].hasChildNodes()) {
                            if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.white')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible1.png');
                                cible.classList.add('target');
                                grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].appendChild(cible);
                            }
                        }
                    }
                    if (lastDiag2.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].hasChildNodes()) {
                            if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.white')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible1.png');
                                cible.classList.add('target');
                                grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].appendChild(cible);
                            }
                        }
                    }

                }
                    break;
                case 'images/fou2.png': {
                    //Déplacements sauf captures
                    rowIterator = row + 1;
                    columnIterator = column + 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator++;
                            columnIterator++;
                        }
                        lastDiag1 = [rowIterator, columnIterator];
                    } while (rowIterator <= 8 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    rowIterator = row - 1;
                    columnIterator = column - 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator--;
                            columnIterator--;
                        }
                        firstDiag1 = [rowIterator, columnIterator];

                    } while (rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    rowIterator = row + 1;
                    columnIterator = column - 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator++;
                            columnIterator--;
                        }
                        lastDiag2 = [rowIterator, columnIterator];

                    } while (rowIterator <= 8 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    rowIterator = row - 1;
                    columnIterator = column + 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator--;
                            columnIterator++;
                        }
                        firstDiag2 = [rowIterator, columnIterator];

                    } while (rowIterator > 0 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    //Captures

                    console.log(firstDiag1, lastDiag1, firstDiag2, lastDiag2);
                    if (firstDiag1.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].hasChildNodes()) {
                            if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.black')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible2.png');
                                cible.classList.add('target');
                                grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].appendChild(cible);
                            }
                        }
                    }
                    if (lastDiag1.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].hasChildNodes()) {
                            if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.black')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible2.png');
                                cible.classList.add('target');
                                grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].appendChild(cible);
                            }
                        }
                    }
                    if (firstDiag2.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].hasChildNodes()) {
                            if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.black')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible2.png');
                                cible.classList.add('target');
                                grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].appendChild(cible);
                            }
                        }
                    }
                    if (lastDiag2.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].hasChildNodes()) {
                            if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.black')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible2.png');
                                cible.classList.add('target');
                                grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].appendChild(cible);
                            }
                        }
                    }

                }
                    break;
                case 'images/cavalier1.png':
                    for (let i = 0; i < grid.length; i++) {
                        if (i === 8 * (8 - (row + 1)) + (column + 2) - 1) {/*Check which case*/
                            if (row + 1 <= 8 && column + 2 <= 8) {/*Check for overflow*/
                                if (!grid[8 * (8 - (row + 1)) + (column + 2) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }
                        } else if (i === 8 * (8 - (row + 2)) + (column + 1) - 1) {
                            if (row + 2 <= 8 && column + 1 <= 8) {
                                if (!grid[8 * (8 - (row + 2)) + (column + 1) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }
                        } else if (i === 8 * (8 - (row + 1)) + (column - 2) - 1) {
                            if (row + 1 <= 8 && column - 2 > 0) {
                                if (!grid[8 * (8 - (row + 1)) + (column - 2) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row + 2)) + (column - 1) - 1) {
                            if (row + 2 <= 8 && column - 1 > 0) {
                                if (!grid[8 * (8 - (row + 2)) + (column - 1) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row - 1)) + (column + 2) - 1) {
                            if (row - 1 > 0 && column + 2 <= 8) {
                                if (!grid[8 * (8 - (row - 1)) + (column + 2) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row - 2)) + (column + 1) - 1) {
                            if (row - 2 > 0 && column + 1 <= 8) {
                                if (!grid[8 * (8 - (row - 2)) + (column + 1) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }

                        } else if (i === 8 * (8 - (row - 1)) + (column - 2) - 1) {
                            if (row - 1 > 0 && column - 2 > 0) {
                                if (!grid[8 * (8 - (row - 1)) + (column - 2) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }

                        } else if (i === 8 * (8 - (row - 2)) + (column - 1) - 1) {
                            if (row - 2 > 0 && column - 1 > 0) {
                                if (!grid[8 * (8 - (row - 2)) + (column - 1) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }
                        }
                    }
                    break;
                case 'images/cavalier2.png':
                    for (let i = 0; i < grid.length; i++) {
                        if (i === 8 * (8 - (row + 1)) + (column + 2) - 1) {/*Check which case*/
                            if (row + 1 <= 8 && column + 2 <= 8) {/*Check for overflow*/
                                if (!grid[8 * (8 - (row + 1)) + (column + 2) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }
                        } else if (i === 8 * (8 - (row + 2)) + (column + 1) - 1) {
                            if (row + 2 <= 8 && column + 1 <= 8) {
                                if (!grid[8 * (8 - (row + 2)) + (column + 1) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }
                        } else if (i === 8 * (8 - (row + 1)) + (column - 2) - 1) {
                            if (row + 1 <= 8 && column - 2 > 0) {
                                if (!grid[8 * (8 - (row + 1)) + (column - 2) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row + 2)) + (column - 1) - 1) {
                            if (row + 2 <= 8 && column - 1 > 0) {
                                if (!grid[8 * (8 - (row + 2)) + (column - 1) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row - 1)) + (column + 2) - 1) {
                            if (row - 1 > 0 && column + 2 <= 8) {
                                if (!grid[8 * (8 - (row - 1)) + (column + 2) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row - 2)) + (column + 1) - 1) {
                            if (row - 2 > 0 && column + 1 <= 8) {
                                if (!grid[8 * (8 - (row - 2)) + (column + 1) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }

                        } else if (i === 8 * (8 - (row - 1)) + (column - 2) - 1) {
                            if (row - 1 > 0 && column - 2 > 0) {
                                if (!grid[8 * (8 - (row - 1)) + (column - 2) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }

                        } else if (i === 8 * (8 - (row - 2)) + (column - 1) - 1) {
                            if (row - 2 > 0 && column - 1 > 0) {
                                if (!grid[8 * (8 - (row - 2)) + (column - 1) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }
                        }
                    }
                    break;
                case 'images/roi1.png':
                    for (let i = 0; i < grid.length; i++) {
                        if (i === 8 * (8 - (row + 1)) + (column + 1) - 1) {/*Check which case*/
                            if (row + 1 <= 8 && column + 1 <= 8) {/*Check for overflow*/
                                if (!grid[8 * (8 - (row + 1)) + (column + 1) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }
                        } else if (i === 8 * (8 - (row)) + (column + 1) - 1) {
                            if (column + 1 <= 8) {
                                if (!grid[8 * (8 - (row)) + (column + 1) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }
                        } else if (i === 8 * (8 - (row - 1)) + (column + 1) - 1) {
                            if (row - 1 > 0 && column + 1 <= 8) {
                                if (!grid[8 * (8 - (row - 1)) + (column + 1) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row - 1)) + (column) - 1) {
                            if (row - 1 > 0) {
                                if (!grid[8 * (8 - (row - 1)) + (column) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row - 1)) + (column - 1) - 1) {
                            if (row - 1 > 0 && column - 1 > 0) {
                                if (!grid[8 * (8 - (row - 1)) + (column - 1) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row)) + (column - 1) - 1) {
                            if (column - 1 > 0) {
                                if (!grid[8 * (8 - (row)) + (column - 1) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }

                        } else if (i === 8 * (8 - (row + 1)) + (column - 1) - 1) {
                            if (row + 1 <= 8 && column - 1 > 0) {
                                if (!grid[8 * (8 - (row + 1)) + (column - 1) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }

                        } else if (i === 8 * (8 - (row + 1)) + (column) - 1) {
                            if (row + 1 <= 8) {
                                if (!grid[8 * (8 - (row + 1)) + (column) - 1].querySelector('.black')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }
                        }
                    }
                    break;
                case 'images/roi2.png':
                    for (let i = 0; i < grid.length; i++) {
                        if (i === 8 * (8 - (row + 1)) + (column + 1) - 1) {/*Check which case*/
                            if (row + 1 <= 8 && column + 1 <= 8) {/*Check for overflow*/
                                if (!grid[8 * (8 - (row + 1)) + (column + 1) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }
                        } else if (i === 8 * (8 - (row)) + (column + 1) - 1) {
                            if (column + 1 <= 8) {
                                if (!grid[8 * (8 - (row)) + (column + 1) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }
                        } else if (i === 8 * (8 - (row - 1)) + (column + 1) - 1) {
                            if (row - 1 > 0 && column + 1 <= 8) {
                                if (!grid[8 * (8 - (row - 1)) + (column + 1) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row - 1)) + (column) - 1) {
                            if (row - 1 > 0) {
                                if (!grid[8 * (8 - (row - 1)) + (column) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row - 1)) + (column - 1) - 1) {
                            if (row - 1 > 0 && column - 1 > 0) {
                                if (!grid[8 * (8 - (row - 1)) + (column - 1) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }
                            }

                        } else if (i === 8 * (8 - (row)) + (column - 1) - 1) {
                            if (column - 1 > 0) {
                                if (!grid[8 * (8 - (row)) + (column - 1) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }

                        } else if (i === 8 * (8 - (row + 1)) + (column - 1) - 1) {
                            if (row + 1 <= 8 && column - 1 > 0) {
                                if (!grid[8 * (8 - (row + 1)) + (column - 1) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }

                        } else if (i === 8 * (8 - (row + 1)) + (column) - 1) {
                            if (row + 1 <= 8) {
                                if (!grid[8 * (8 - (row + 1)) + (column) - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible2.png');
                                    cible.classList.add('target');
                                    grid[i].appendChild(cible);
                                }

                            }
                        }
                    }
                    break;
                case 'images/dame1.png':
                    //Déplacements sauf captures
                    console.log(lastColumn, lastRow, firstColumn, firstRow);
                    for (let i = column + 1; i <= 8 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i++) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - row) * 8 + i - 1].appendChild(cible);
                        lastColumn = i + 1;
                    }
                    for (let i = column - 1; i > 0 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i--) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - row) * 8 + i - 1].appendChild(cible);
                        firstColumn = i - 1;
                    }
                    for (let i = row + 1; i <= 8 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i++) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - i) * 8 + column - 1].appendChild(cible);
                        lastRow = i + 1;
                    }
                    for (let i = row - 1; i > 0 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i--) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - i) * 8 + column - 1].appendChild(cible);
                        firstRow = i - 1;
                    }
                    //Captures
                    if (firstColumn >= 1) {
                        if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.white')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - row) * 8 + (firstColumn) - 1].appendChild(cible);
                        }
                    }
                    if (lastColumn <= 8 && lastColumn !== 0) {
                        if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.white')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - row) * 8 + (lastColumn) - 1].appendChild(cible);
                        }
                    }
                    if (firstRow >= 1) {
                        if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.white')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - firstRow) * 8 + (column) - 1].appendChild(cible);
                        }
                    }
                    if (lastRow <= 8 && lastRow !== 0) {
                        if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.white')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible1.png');
                            cible.classList.add('target');
                            grid[(8 - lastRow) * 8 + (column) - 1].appendChild(cible);
                        }
                    } {
                        //Déplacements sauf captures
                        rowIterator = row + 1;
                        columnIterator = column + 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible1.png');
                                cible.classList.add('target');
                                grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                                rowIterator++;
                                columnIterator++;
                            }
                            lastDiag1 = [rowIterator, columnIterator];
                        } while (rowIterator <= 8 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        rowIterator = row - 1;
                        columnIterator = column - 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible1.png');
                                cible.classList.add('target');
                                grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                                rowIterator--;
                                columnIterator--;
                            }
                            firstDiag1 = [rowIterator, columnIterator];

                        } while (rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        rowIterator = row + 1;
                        columnIterator = column - 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible1.png');
                                cible.classList.add('target');
                                grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                                rowIterator++;
                                columnIterator--;
                            }
                            lastDiag2 = [rowIterator, columnIterator];

                        } while (rowIterator <= 8 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        rowIterator = row - 1;
                        columnIterator = column + 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible1.png');
                                cible.classList.add('target');
                                grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                                rowIterator--;
                                columnIterator++;
                            }
                            firstDiag2 = [rowIterator, columnIterator];

                        } while (rowIterator > 0 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        //Captures

                        console.log(firstDiag1, lastDiag1, firstDiag2, lastDiag2);
                        if (firstDiag1.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].hasChildNodes()) {
                                if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].appendChild(cible);
                                }
                            }
                        }
                        if (lastDiag1.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].hasChildNodes()) {
                                if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].appendChild(cible);
                                }
                            }
                        }
                        if (firstDiag2.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].hasChildNodes()) {
                                if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].appendChild(cible);
                                }
                            }
                        }
                        if (lastDiag2.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].hasChildNodes()) {
                                if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.white')) {
                                    let cible = document.createElement('img');
                                    cible.setAttribute('src', 'images/cible1.png');
                                    cible.classList.add('target');
                                    grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].appendChild(cible);
                                }
                            }
                        }

                    }
                    break;
                case 'images/dame2.png':

                    //Déplacements sauf captures
                    console.log(lastColumn, lastRow, firstColumn, firstRow);
                    for (let i = column + 1; i <= 8 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i++) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - row) * 8 + i - 1].appendChild(cible);
                        lastColumn = i + 1;
                    }
                    for (let i = column - 1; i > 0 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i--) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - row) * 8 + i - 1].appendChild(cible);
                        firstColumn = i - 1;
                    }
                    for (let i = row + 1; i <= 8 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i++) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - i) * 8 + column - 1].appendChild(cible);
                        lastRow = i + 1;
                    }
                    for (let i = row - 1; i > 0 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i--) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - i) * 8 + column - 1].appendChild(cible);
                        firstRow = i - 1;
                    }
                    //Captures
                    if (firstColumn >= 1) {
                        if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.black')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - row) * 8 + (firstColumn) - 1].appendChild(cible);
                        }
                    }
                    if (lastColumn <= 8 && lastColumn !== 0) {
                        if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.black')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - row) * 8 + (lastColumn) - 1].appendChild(cible);
                        }
                    }
                    if (firstRow >= 1) {
                        if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.black')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - firstRow) * 8 + (column) - 1].appendChild(cible);
                        }
                    }
                    if (lastRow <= 8 && lastRow !== 0) {
                        if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.black')) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - lastRow) * 8 + (column) - 1].appendChild(cible);
                        }
                    }

                    //Déplacements sauf captures
                    rowIterator = row + 1;
                    columnIterator = column + 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator++;
                            columnIterator++;
                        }
                        lastDiag1 = [rowIterator, columnIterator];
                    } while (rowIterator <= 8 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    rowIterator = row - 1;
                    columnIterator = column - 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator--;
                            columnIterator--;
                        }
                        firstDiag1 = [rowIterator, columnIterator];

                    } while (rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    rowIterator = row + 1;
                    columnIterator = column - 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator++;
                            columnIterator--;
                        }
                        lastDiag2 = [rowIterator, columnIterator];

                    } while (rowIterator <= 8 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    rowIterator = row - 1;
                    columnIterator = column + 1;
                    do {
                        if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                            let cible = document.createElement('img');
                            cible.setAttribute('src', 'images/cible2.png');
                            cible.classList.add('target');
                            grid[(8 - rowIterator) * 8 + columnIterator - 1].appendChild(cible);
                            rowIterator--;
                            columnIterator++;
                        }
                        firstDiag2 = [rowIterator, columnIterator];

                    } while (rowIterator > 0 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                    //Captures

                    console.log(firstDiag1, lastDiag1, firstDiag2, lastDiag2);
                    if (firstDiag1.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].hasChildNodes()) {
                            if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.black')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible2.png');
                                cible.classList.add('target');
                                grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].appendChild(cible);
                            }
                        }
                    }
                    if (lastDiag1.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].hasChildNodes()) {
                            if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.black')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible2.png');
                                cible.classList.add('target');
                                grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].appendChild(cible);
                            }
                        }
                    }
                    if (firstDiag2.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].hasChildNodes()) {
                            if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.black')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible2.png');
                                cible.classList.add('target');
                                grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].appendChild(cible);
                            }
                        }
                    }
                    if (lastDiag2.every(val => (val <= 8 && val > 0))) {
                        if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].hasChildNodes()) {
                            if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.black')) {
                                let cible = document.createElement('img');
                                cible.setAttribute('src', 'images/cible2.png');
                                cible.classList.add('target');
                                grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].appendChild(cible);
                            }
                        }
                    }


                    break;
            }
            clickedPiece = e;
            for (let i = 0; i < grid.length; i++) {
                if (grid[i].querySelector('[src="images/cible1.png"]')) {
                    grid[i].querySelector('[src="images/cible1.png"]').addEventListener('click', (e) => move(e, clickedPiece));
                }
                else if (grid[i].querySelector('[src="images/cible2.png"]')) {
                    grid[i].querySelector('[src="images/cible2.png"]').addEventListener('click', (e) => move(e, clickedPiece));

                }
            }

        }
    }
    function move(e, olde) {
        const isTargetImage = e.target.nodeName === "IMG";
        const isMoveTarget = ["images/cible1.png", "images/cible2.png"].includes(e.target.getAttribute('src'));

        if (isTargetImage && isMoveTarget && clickedPiece !== 0) {
            const movedPiece = olde.target.cloneNode(false);
            const oldPosition = olde.target.parentNode;
            const destinationWithContent = e.target.parentNode.cloneNode(false);
            olde.target.remove();

            const destination = e.target.parentNode;
            destination.innerHTML = "";
            destination.appendChild(movedPiece);

            clickedPiece = 0;
            console.log(clickedPiece);
            if (checkMove(e)) {
                if (game.turn === 'white') {
                    game.turn = 'black';
                }
                else if (game.turn === 'black') {
                    game.turn = 'white';
                }
            }
            else {
                console.log('hi', destinationWithContent);
                oldPosition.appendChild(movedPiece);
                destination.innerHTML = "";
                destination.parentNode.replaceChild(destinationWithContent, destination);
                game.turn = game.turn;
            }
            console.log(checkMove(e));

        }

        // Remove all move indicators
        document.querySelectorAll('.target').forEach(target => target.remove());
    }
    function checkMove(e) {
        console.log('Checking if the move is legal');
        let whitePieces = document.querySelectorAll('.white');
        let blackPieces = document.querySelectorAll('.black');
        if (game.turn === 'white') {
            for (let i = 0; i < blackPieces.length; i++) {
                let currentPiece = blackPieces[i];
                let currentPosition = currentPiece.parentElement.getAttribute('data-id');
                let column = parseInt(currentPosition[0]);
                let row = parseInt(currentPosition[2]);
                let firstColumn = column - 1;
                let lastColumn = column + 1;
                let firstRow = row - 1;
                let lastRow = row + 1;
                let firstDiag1 = [];
                let firstDiag2 = [];
                let lastDiag1 = [];
                let lastDiag2 = [];
                switch (currentPiece.getAttribute('src')) {
                    case 'images/pion1.png':
                        if (column < 8) {
                            if (grid[(8 - (row - 1)) * 8 + (column + 1) - 1].querySelector('.white')) {
                                if (grid[(8 - (row - 1)) * 8 + (column + 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                    return false;
                                }
                            }
                        }
                        if (column > 1) {
                            if (grid[(8 - (row - 1)) * 8 + (column - 1) - 1].querySelector('.white')) {
                                if (grid[(8 - (row - 1)) * 8 + (column - 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                    return false;
                                }
                            }
                        }
                        break;
                    case 'images/tour1.png':
                        // Parcours des cases sur la même ligne / colonne
                        console.log(lastColumn, lastRow, firstColumn, firstRow);
                        for (let i = column + 1; i <= 8 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i++) {
                            lastColumn = i + 1;
                        }
                        for (let i = column - 1; i > 0 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i--) {
                            firstColumn = i - 1;
                        }
                        for (let i = row + 1; i <= 8 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i++) {
                            lastRow = i + 1;
                        }
                        for (let i = row - 1; i > 0 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i--) {
                            firstRow = i - 1;
                        }
                        // Identification des captures possibles et vérification si l'une d'elle est le roi
                        if (firstColumn >= 1) {
                            if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.white')) {
                                if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                    return false;
                                }
                            }
                        }
                        if (lastColumn <= 8 && lastColumn !== 0) {
                            if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.white')) {
                                if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                    return false;
                                }
                            }
                        }
                        if (firstRow >= 1) {
                            if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.white')) {
                                if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                    return false;
                                }
                            }
                        }
                        if (lastRow <= 8 && lastRow !== 0) {
                            if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.white')) {
                                if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                    return false;
                                }
                            }
                        }
                        break;
                    case 'images/fou1.png': {
                        // Parcours des cases sur la même diagonale
                        rowIterator = row + 1;
                        columnIterator = column + 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                rowIterator++;
                                columnIterator++;
                            }
                            lastDiag1 = [rowIterator, columnIterator];
                        } while (rowIterator <= 8 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        rowIterator = row - 1;
                        columnIterator = column - 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                rowIterator--;
                                columnIterator--;
                            }
                            firstDiag1 = [rowIterator, columnIterator];

                        } while (rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        rowIterator = row + 1;
                        columnIterator = column - 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                rowIterator++;
                                columnIterator--;
                            }
                            lastDiag2 = [rowIterator, columnIterator];

                        } while (rowIterator <= 8 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        rowIterator = row - 1;
                        columnIterator = column + 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                rowIterator--;
                                columnIterator++;
                            }
                            firstDiag2 = [rowIterator, columnIterator];

                        } while (rowIterator > 0 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        // Identification des captures possibles et vérification si l'une d'elle est le roi

                        if (firstDiag1.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].hasChildNodes()) {
                                if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.white')) {
                                    if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                        return false;
                                    }
                                }
                            }
                        }
                        if (lastDiag1.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].hasChildNodes()) {
                                if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.white')) {
                                    if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                        return false;
                                    }
                                }
                            }
                        }
                        if (firstDiag2.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].hasChildNodes()) {
                                if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.white')) {
                                    if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                        return false;
                                    }
                                }
                            }
                        }
                        if (lastDiag2.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].hasChildNodes()) {
                                if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.white')) {
                                    if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                        return false;
                                    }
                                }
                            }
                        }

                    }
                        break;
                    case 'images/cavalier1.png':
                        for (let i = 0; i < grid.length; i++) {
                            if (i === 8 * (8 - (row + 1)) + (column + 2) - 1) {/*Check which case*/
                                if (row + 1 <= 8 && column + 2 <= 8) {/*Check for overflow*/
                                    if (grid[8 * (8 - (row + 1)) + (column + 2) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row + 1)) + (column + 2) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }
                            } else if (i === 8 * (8 - (row + 2)) + (column + 1) - 1) {
                                if (row + 2 <= 8 && column + 1 <= 8) {
                                    if (grid[8 * (8 - (row + 2)) + (column + 1) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row + 2)) + (column + 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }
                            } else if (i === 8 * (8 - (row + 1)) + (column - 2) - 1) {
                                if (row + 1 <= 8 && column - 2 > 0) {
                                    if (grid[8 * (8 - (row + 1)) + (column - 2) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row + 1)) + (column - 2) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row + 2)) + (column - 1) - 1) {
                                if (row + 2 <= 8 && column - 1 > 0) {
                                    if (grid[8 * (8 - (row + 2)) + (column - 1) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row + 2)) + (column - 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row - 1)) + (column + 2) - 1) {
                                if (row - 1 > 0 && column + 2 <= 8) {
                                    if (grid[8 * (8 - (row - 1)) + (column + 2) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row - 1)) + (column + 2) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row - 2)) + (column + 1) - 1) {
                                if (row - 2 > 0 && column + 1 <= 8) {
                                    if (grid[8 * (8 - (row - 2)) + (column + 1) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row - 2)) + (column + 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }

                                }

                            } else if (i === 8 * (8 - (row - 1)) + (column - 2) - 1) {
                                if (row - 1 > 0 && column - 2 > 0) {
                                    if (grid[8 * (8 - (row - 1)) + (column - 2) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row - 1)) + (column - 2) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }

                                }

                            } else if (i === 8 * (8 - (row - 2)) + (column - 1) - 1) {
                                if (row - 2 > 0 && column - 1 > 0) {
                                    if (grid[8 * (8 - (row - 2)) + (column - 1) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row - 2)) + (column - 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case 'images/roi1.png':
                        for (let i = 0; i < grid.length; i++) {
                            if (i === 8 * (8 - (row + 1)) + (column + 1) - 1) {/*Check which case*/
                                if (row + 1 <= 8 && column + 1 <= 8) {/*Check for overflow*/
                                    if (grid[8 * (8 - (row + 1)) + (column + 1) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row + 1)) + (column + 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }
                            } else if (i === 8 * (8 - (row)) + (column + 1) - 1) {
                                if (column + 1 <= 8) {
                                    if (grid[8 * (8 - (row)) + (column + 1) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row)) + (column + 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }
                            } else if (i === 8 * (8 - (row - 1)) + (column + 1) - 1) {
                                if (row - 1 > 0 && column + 1 <= 8) {
                                    if (grid[8 * (8 - (row - 1)) + (column + 1) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row - 1)) + (column + 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row - 1)) + (column) - 1) {
                                if (row - 1 > 0) {
                                    if (grid[8 * (8 - (row - 1)) + (column) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row - 1)) + (column) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row - 1)) + (column - 1) - 1) {
                                if (row - 1 > 0 && column - 1 > 0) {
                                    if (grid[8 * (8 - (row - 1)) + (column - 1) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row - 1)) + (column - 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row)) + (column - 1) - 1) {
                                if (column - 1 > 0) {
                                    if (grid[8 * (8 - (row)) + (column - 1) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row)) + (column - 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }

                                }

                            } else if (i === 8 * (8 - (row + 1)) + (column - 1) - 1) {
                                if (row + 1 <= 8 && column - 1 > 0) {
                                    if (grid[8 * (8 - (row + 1)) + (column - 1) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row + 1)) + (column - 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }

                                }

                            } else if (i === 8 * (8 - (row + 1)) + (column) - 1) {
                                if (row + 1 <= 8) {
                                    if (grid[8 * (8 - (row + 1)) + (column) - 1].querySelector('.white')) {
                                        if (grid[8 * (8 - (row + 1)) + (column - 1) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }

                                }
                            }
                        }
                        break;
                    case 'images/dame1.png':
                        // Parcours des cases sur la même ligne / colonne
                        console.log(lastColumn, lastRow, firstColumn, firstRow);
                        for (let i = column + 1; i <= 8 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i++) {
                            lastColumn = i + 1;
                        }
                        for (let i = column - 1; i > 0 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i--) {
                            firstColumn = i - 1;
                        }
                        for (let i = row + 1; i <= 8 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i++) {
                            lastRow = i + 1;
                        }
                        for (let i = row - 1; i > 0 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i--) {
                            firstRow = i - 1;
                        }
                        // Identification des captures possibles et vérification si l'une d'elle est le roi
                        if (firstColumn >= 1) {
                            if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.white')) {
                                if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                    return false;
                                }
                            }
                        }
                        if (lastColumn <= 8 && lastColumn !== 0) {
                            if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.white')) {
                                if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                    return false;
                                }
                            }
                        }
                        if (firstRow >= 1) {
                            if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.white')) {
                                if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                    return false;
                                }
                            }
                        }
                        if (lastRow <= 8 && lastRow !== 0) {
                            if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.white')) {
                                if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                    return false;
                                }
                            }
                        }
                        {
                            // Parcours des cases sur la même diagonale
                            rowIterator = row + 1;
                            columnIterator = column + 1;
                            do {
                                if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                    rowIterator++;
                                    columnIterator++;
                                }
                                lastDiag1 = [rowIterator, columnIterator];
                            } while (rowIterator <= 8 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                            rowIterator = row - 1;
                            columnIterator = column - 1;
                            do {
                                if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                    rowIterator--;
                                    columnIterator--;
                                }
                                firstDiag1 = [rowIterator, columnIterator];

                            } while (rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                            rowIterator = row + 1;
                            columnIterator = column - 1;
                            do {
                                if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                    rowIterator++;
                                    columnIterator--;
                                }
                                lastDiag2 = [rowIterator, columnIterator];

                            } while (rowIterator <= 8 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                            rowIterator = row - 1;
                            columnIterator = column + 1;
                            do {
                                if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                    rowIterator--;
                                    columnIterator++;
                                }
                                firstDiag2 = [rowIterator, columnIterator];

                            } while (rowIterator > 0 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                            // Identification des captures possibles et vérification si l'une d'elle est le roi

                            if (firstDiag1.every(val => (val <= 8 && val > 0))) {
                                if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].hasChildNodes()) {
                                    if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.white')) {
                                        if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }
                            }
                            if (lastDiag1.every(val => (val <= 8 && val > 0))) {
                                if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].hasChildNodes()) {
                                    if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.white')) {
                                        if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }
                            }
                            if (firstDiag2.every(val => (val <= 8 && val > 0))) {
                                if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].hasChildNodes()) {
                                    if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.white')) {
                                        if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }
                            }
                            if (lastDiag2.every(val => (val <= 8 && val > 0))) {
                                if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].hasChildNodes()) {
                                    if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.white')) {
                                        if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.white').getAttribute('src') === "images/roi2.png") {
                                            return false;
                                        }
                                    }
                                }
                            }

                        }
                        break;
                }
                clickedPiece = e;
                for (let i = 0; i < grid.length; i++) {
                    if (grid[i].querySelector('[src="images/cible1.png"]')) {
                        grid[i].querySelector('[src="images/cible1.png"]').addEventListener('click', (e) => move(e, clickedPiece));
                    }
                    else if (grid[i].querySelector('[src="images/cible2.png"]')) {
                        grid[i].querySelector('[src="images/cible2.png"]').addEventListener('click', (e) => move(e, clickedPiece));

                    }
                }


            }
        }
        if (game.turn === 'black') {
            for (let i = 0; i < whitePieces.length; i++) {
                let currentPiece = whitePieces[i];
                let currentPosition = currentPiece.parentElement.getAttribute('data-id');
                let column = parseInt(currentPosition[0]);
                let row = parseInt(currentPosition[2]);
                let firstColumn = column - 1;
                let lastColumn = column + 1;
                let firstRow = row - 1;
                let lastRow = row + 1;
                let firstDiag1 = [];
                let firstDiag2 = [];
                let lastDiag1 = [];
                let lastDiag2 = [];
                switch (currentPiece.getAttribute('src')) {
                    case 'images/pion2.png':
                        if (column < 8) {
                            if (grid[(8 - (row + 1)) * 8 + (column + 1) - 1].querySelector('.black')) {
                                if (grid[(8 - (row + 1)) * 8 + (column + 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                    return false;
                                }
                            }
                        }
                        if (column > 1) {
                            if (grid[(8 - (row + 1)) * 8 + (column - 1) - 1].querySelector('.black')) {
                                if (grid[(8 - (row + 1)) * 8 + (column - 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                    return false;
                                }
                            }
                        }
                        break;
                    case 'images/tour2.png':
                        // Parcours des cases sur la même ligne / colonne
                        console.log(lastColumn, lastRow, firstColumn, firstRow);
                        for (let i = column + 1; i <= 8 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i++) {
                            lastColumn = i + 1;
                        }
                        for (let i = column - 1; i > 0 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i--) {
                            firstColumn = i - 1;
                        }
                        for (let i = row + 1; i <= 8 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i++) {
                            lastRow = i + 1;
                        }
                        for (let i = row - 1; i > 0 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i--) {
                            firstRow = i - 1;
                        }
                        // Identification des captures possibles et vérification si l'une d'elle est le roi
                        if (firstColumn >= 1) {
                            if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.black')) {
                                if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                    return false;
                                }
                            }
                        }
                        if (lastColumn <= 8 && lastColumn !== 0) {
                            if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.black')) {
                                if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                    return false;
                                }
                            }
                        }
                        if (firstRow >= 1) {
                            if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.black')) {
                                if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                    return false;
                                }
                            }
                        }
                        if (lastRow <= 8 && lastRow !== 0) {
                            if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.black')) {
                                if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                    return false;
                                }
                            }
                        }
                        break;
                    case 'images/fou2.png': {
                        // Parcours des cases sur la même diagonale
                        rowIterator = row + 1;
                        columnIterator = column + 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                rowIterator++;
                                columnIterator++;
                            }
                            lastDiag1 = [rowIterator, columnIterator];
                        } while (rowIterator <= 8 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        rowIterator = row - 1;
                        columnIterator = column - 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                rowIterator--;
                                columnIterator--;
                            }
                            firstDiag1 = [rowIterator, columnIterator];

                        } while (rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        rowIterator = row + 1;
                        columnIterator = column - 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                rowIterator++;
                                columnIterator--;
                            }
                            lastDiag2 = [rowIterator, columnIterator];

                        } while (rowIterator <= 8 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        rowIterator = row - 1;
                        columnIterator = column + 1;
                        do {
                            if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                rowIterator--;
                                columnIterator++;
                            }
                            firstDiag2 = [rowIterator, columnIterator];

                        } while (rowIterator > 0 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                        // Identification des captures possibles et vérification si l'une d'elle est le roi

                        if (firstDiag1.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].hasChildNodes()) {
                                if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.black')) {
                                    if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                        return false;
                                    }
                                }
                            }
                        }
                        if (lastDiag1.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].hasChildNodes()) {
                                if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.black')) {
                                    if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                        return false;
                                    }
                                }
                            }
                        }
                        if (firstDiag2.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].hasChildNodes()) {
                                if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.black')) {
                                    if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                        return false;
                                    }
                                }
                            }
                        }
                        if (lastDiag2.every(val => (val <= 8 && val > 0))) {
                            if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].hasChildNodes()) {
                                if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.black')) {
                                    if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                        return false;
                                    }
                                }
                            }
                        }

                    }
                        break;
                    case 'images/cavalier2.png':
                        for (let i = 0; i < grid.length; i++) {
                            if (i === 8 * (8 - (row + 1)) + (column + 2) - 1) {/*Check which case*/
                                if (row + 1 <= 8 && column + 2 <= 8) {/*Check for overflow*/
                                    if (grid[8 * (8 - (row + 1)) + (column + 2) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row + 1)) + (column + 2) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }
                            } else if (i === 8 * (8 - (row + 2)) + (column + 1) - 1) {
                                if (row + 2 <= 8 && column + 1 <= 8) {
                                    if (grid[8 * (8 - (row + 2)) + (column + 1) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row + 2)) + (column + 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }
                            } else if (i === 8 * (8 - (row + 1)) + (column - 2) - 1) {
                                if (row + 1 <= 8 && column - 2 > 0) {
                                    if (grid[8 * (8 - (row + 1)) + (column - 2) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row + 1)) + (column - 2) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row + 2)) + (column - 1) - 1) {
                                if (row + 2 <= 8 && column - 1 > 0) {
                                    if (grid[8 * (8 - (row + 2)) + (column - 1) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row + 2)) + (column - 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row - 1)) + (column + 2) - 1) {
                                if (row - 1 > 0 && column + 2 <= 8) {
                                    if (grid[8 * (8 - (row - 1)) + (column + 2) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row - 1)) + (column + 2) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row - 2)) + (column + 1) - 1) {
                                if (row - 2 > 0 && column + 1 <= 8) {
                                    if (grid[8 * (8 - (row - 2)) + (column + 1) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row - 2)) + (column + 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }

                                }

                            } else if (i === 8 * (8 - (row - 1)) + (column - 2) - 1) {
                                if (row - 1 > 0 && column - 2 > 0) {
                                    if (grid[8 * (8 - (row - 1)) + (column - 2) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row - 1)) + (column - 2) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }

                                }

                            } else if (i === 8 * (8 - (row - 2)) + (column - 1) - 1) {
                                if (row - 2 > 0 && column - 1 > 0) {
                                    if (grid[8 * (8 - (row - 2)) + (column - 1) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row - 2)) + (column - 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case 'images/roi2.png':
                        for (let i = 0; i < grid.length; i++) {
                            if (i === 8 * (8 - (row + 1)) + (column + 1) - 1) {/*Check which case*/
                                if (row + 1 <= 8 && column + 1 <= 8) {/*Check for overflow*/
                                    if (grid[8 * (8 - (row + 1)) + (column + 1) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row + 1)) + (column + 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }
                            } else if (i === 8 * (8 - (row)) + (column + 1) - 1) {
                                if (column + 1 <= 8) {
                                    if (grid[8 * (8 - (row)) + (column + 1) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row)) + (column + 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }
                            } else if (i === 8 * (8 - (row - 1)) + (column + 1) - 1) {
                                if (row - 1 > 0 && column + 1 <= 8) {
                                    if (grid[8 * (8 - (row - 1)) + (column + 1) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row - 1)) + (column + 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row - 1)) + (column) - 1) {
                                if (row - 1 > 0) {
                                    if (grid[8 * (8 - (row - 1)) + (column) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row - 1)) + (column) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row - 1)) + (column - 1) - 1) {
                                if (row - 1 > 0 && column - 1 > 0) {
                                    if (grid[8 * (8 - (row - 1)) + (column - 1) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row - 1)) + (column - 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }

                            } else if (i === 8 * (8 - (row)) + (column - 1) - 1) {
                                if (column - 1 > 0) {
                                    if (grid[8 * (8 - (row)) + (column - 1) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row)) + (column - 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }

                                }

                            } else if (i === 8 * (8 - (row + 1)) + (column - 1) - 1) {
                                if (row + 1 <= 8 && column - 1 > 0) {
                                    if (grid[8 * (8 - (row + 1)) + (column - 1) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row + 1)) + (column - 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }

                                }

                            } else if (i === 8 * (8 - (row + 1)) + (column) - 1) {
                                if (row + 1 <= 8) {
                                    if (grid[8 * (8 - (row + 1)) + (column) - 1].querySelector('.black')) {
                                        if (grid[8 * (8 - (row + 1)) + (column - 1) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }

                                }
                            }
                        }
                        break;
                    case 'images/dame2.png':
                        // Parcours des cases sur la même ligne / colonne
                        console.log(lastColumn, lastRow, firstColumn, firstRow);
                        for (let i = column + 1; i <= 8 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i++) {
                            lastColumn = i + 1;
                        }
                        for (let i = column - 1; i > 0 && !grid[(8 - row) * 8 + i - 1].hasChildNodes(); i--) {
                            firstColumn = i - 1;
                        }
                        for (let i = row + 1; i <= 8 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i++) {
                            lastRow = i + 1;
                        }
                        for (let i = row - 1; i > 0 && !grid[(8 - i) * 8 + column - 1].hasChildNodes(); i--) {
                            firstRow = i - 1;
                        }
                        // Identification des captures possibles et vérification si l'une d'elle est le roi
                        if (firstColumn >= 1) {
                            if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.black')) {
                                if (grid[(8 - row) * 8 + (firstColumn) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                    return false;
                                }
                            }
                        }
                        if (lastColumn <= 8 && lastColumn !== 0) {
                            if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.black')) {
                                if (grid[(8 - row) * 8 + (lastColumn) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                    return false;
                                }
                            }
                        }
                        if (firstRow >= 1) {
                            if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.black')) {
                                if (grid[(8 - firstRow) * 8 + (column) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                    return false;
                                }
                            }
                        }
                        if (lastRow <= 8 && lastRow !== 0) {
                            if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.black')) {
                                if (grid[(8 - lastRow) * 8 + (column) - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                    return false;
                                }
                            }
                        }
                        {
                            // Parcours des cases sur la même diagonale
                            rowIterator = row + 1;
                            columnIterator = column + 1;
                            do {
                                if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                    rowIterator++;
                                    columnIterator++;
                                }
                                lastDiag1 = [rowIterator, columnIterator];
                            } while (rowIterator <= 8 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                            rowIterator = row - 1;
                            columnIterator = column - 1;
                            do {
                                if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                    rowIterator--;
                                    columnIterator--;
                                }
                                firstDiag1 = [rowIterator, columnIterator];

                            } while (rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                            rowIterator = row + 1;
                            columnIterator = column - 1;
                            do {
                                if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                    rowIterator++;
                                    columnIterator--;
                                }
                                lastDiag2 = [rowIterator, columnIterator];

                            } while (rowIterator <= 8 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                            rowIterator = row - 1;
                            columnIterator = column + 1;
                            do {
                                if (rowIterator <= 8 && columnIterator <= 8 && rowIterator > 0 && columnIterator > 0 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes()) {
                                    rowIterator--;
                                    columnIterator++;
                                }
                                firstDiag2 = [rowIterator, columnIterator];

                            } while (rowIterator > 0 && columnIterator <= 8 && !grid[(8 - rowIterator) * 8 + columnIterator - 1].hasChildNodes());
                            // Identification des captures possibles et vérification si l'une d'elle est le roi

                            if (firstDiag1.every(val => (val <= 8 && val > 0))) {
                                if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].hasChildNodes()) {
                                    if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.black')) {
                                        if (grid[(8 - firstDiag1[0]) * 8 + firstDiag1[1] - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }
                            }
                            if (lastDiag1.every(val => (val <= 8 && val > 0))) {
                                if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].hasChildNodes()) {
                                    if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.black')) {
                                        if (grid[(8 - lastDiag1[0]) * 8 + lastDiag1[1] - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }
                            }
                            if (firstDiag2.every(val => (val <= 8 && val > 0))) {
                                if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].hasChildNodes()) {
                                    if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.black')) {
                                        if (grid[(8 - firstDiag2[0]) * 8 + firstDiag2[1] - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }
                            }
                            if (lastDiag2.every(val => (val <= 8 && val > 0))) {
                                if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].hasChildNodes()) {
                                    if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.black')) {
                                        if (grid[(8 - lastDiag2[0]) * 8 + lastDiag2[1] - 1].querySelector('.black').getAttribute('src') === "images/roi1.png") {
                                            return false;
                                        }
                                    }
                                }
                            }

                        }
                        break;
                }
                clickedPiece = e;
                for (let i = 0; i < grid.length; i++) {
                    if (grid[i].querySelector('[src="images/cible1.png"]')) {
                        grid[i].querySelector('[src="images/cible1.png"]').addEventListener('click', (e) => move(e, clickedPiece));
                    }
                    else if (grid[i].querySelector('[src="images/cible2.png"]')) {
                        grid[i].querySelector('[src="images/cible2.png"]').addEventListener('click', (e) => move(e, clickedPiece));

                    }
                }

            }
        }
        return true;
    }
    function playMoveWhite() {
        for (let i = 0; i < grid.length; i++) {
            if (grid[i].querySelector('.white')) {
                grid[i].querySelector('.white').addEventListener('click', showAllMoves);
            }
            else if (grid[i].querySelector('.black')) {
                grid[i].querySelector('.black').removeEventListener('click', showAllMoves);
            }
        }

    }
    function playMoveBlack() {
        for (let i = 0; i < grid.length; i++) {
            if (grid[i].querySelector('.black')) {
                grid[i].querySelector('.black').addEventListener('click', showAllMoves);
            }
            else if (grid[i].querySelector('.white')) {
                grid[i].querySelector('.white').removeEventListener('click', showAllMoves);
            }
        }
    }

    createGrid();

    const grid = document.querySelectorAll('.board div');

    resetGrid();

    game.turn = 'white';



})

//file:///home/thomas/repos/My-website/Projects/Project-pages/Chess-Game/chess.html