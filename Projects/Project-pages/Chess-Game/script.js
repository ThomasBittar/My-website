document.addEventListener('DOMContentLoaded', () => {
    //Defining the chess board
    let board = document.querySelector('.board');
    let clickedPiece = 0;
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
    }
    function showMoves(e) {
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
                    let i = column + 1;
                    let j = row + 1;
                    lastDiag1 = [column + 1, row + 1];
                    console.log(i, j, (8 - j) * 8 + i - 1);
                    while (i <= 8 && j <= 8 && !grid[(8 - j) * 8 + i - 1].hasChildNodes()) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - j) * 8 + i - 1].appendChild(cible);
                        i++;
                        j++;
                        let a = i;
                        let b = j;
                        lastDiag1 = [a, b];
                    }
                    i = column - 1;
                    j = row - 1;
                    firstDiag1 = [column - 1, row - 1];
                    console.log(i, j, (8 - j) * 8 + i - 1);
                    while (i > 0 && j > 0 && !grid[(8 - j) * 8 + i - 1].hasChildNodes()) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - j) * 8 + i - 1].appendChild(cible);
                        i--;
                        j--;
                        let a = i;
                        let b = j;
                        firstDiag1 = [a, b];
                    }
                    i = column + 1;
                    j = row - 1;
                    lastDiag2 = [column + 1, row - 1];
                    console.log(i, j, (8 - j) * 8 + i - 1);
                    while (i <= 8 && j > 0 && !grid[(8 - j) * 8 + i - 1].hasChildNodes()) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - j) * 8 + i - 1].appendChild(cible);
                        i++;
                        j--;
                        let a = i;
                        let b = j;
                        lastDiag2 = [a, b];
                    }
                    i = column - 1;
                    j = row + 1;
                    firstDiag2 = [column - 1, row + 1];
                    console.log(i, j, (8 - j) * 8 + i - 1);
                    while (i > 0 && j <= 8 && !grid[(8 - j) * 8 + i - 1].hasChildNodes()) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - j) * 8 + i - 1].appendChild(cible);
                        i--;
                        j++;
                        let a = i;
                        let b = j;
                        firstDiag2 = [a, b];
                    }
                //Captures
                /*
                if (firstDiag1[1] > 0 && firstDiag1[0] > 0 && firstDiag1[1] <= 8 && firstDiag1[0] <= 8) {
                    if (grid[(8 - firstDiag1[1]) * 8 + firstDiag1[0] - 1].querySelector('.white')) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - firstDiag1[1]) * 8 + firstDiag1[0] - 1].appendChild(cible);
                    }
                }
                if (firstDiag1[1] > 0 && firstDiag1[0] > 0 && firstDiag1[1] <= 8 && firstDiag1[0] <= 8) {
                    if (grid[(8 - firstDiag2[1]) * 8 + firstDiag2[0] - 1].querySelector('.white')) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - firstDiag2[1]) * 8 + firstDiag2[0] - 1].appendChild(cible);
                    }
                }
                if (firstDiag1[1] > 0 && firstDiag1[0] > 0 && firstDiag1[1] <= 8 && firstDiag1[0] <= 8) {
                    if (grid[(8 - lastDiag1[1]) * 8 + lastDiag1[0] - 1].querySelector('.white')) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - lastDiag1[1]) * 8 + lastDiag1[0] - 1].appendChild(cible);
                    }
                }
                if (firstDiag1[1] > 0 && firstDiag1[0] > 0 && firstDiag1[1] <= 8 && firstDiag1[0] <= 8) {
                    if (grid[(8 - lastDiag2[1]) * 8 + lastDiag2[0] - 1].querySelector('.white')) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible1.png');
                        cible.classList.add('target');
                        grid[(8 - lastDiag2[1]) * 8 + lastDiag2[0] - 1].appendChild(cible);
                    }
                }*/}
                    break;
                case 'images/fou2.png': {
                    //Déplacements sauf captures
                    let i = column + 1;
                    let j = row + 1;
                    lastDiag1 = [column + 1, row + 1];
                    console.log(i, j, (8 - j) * 8 + i - 1);
                    while (i <= 8 && j <= 8 && !grid[(8 - j) * 8 + i - 1].hasChildNodes()) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - j) * 8 + i - 1].appendChild(cible);
                        i++;
                        j++;
                        let a = i;
                        let b = j;
                        lastDiag1 = [a, b];
                    }
                    i = column - 1;
                    j = row - 1;
                    firstDiag1 = [column - 1, row - 1];
                    console.log(i, j, (8 - j) * 8 + i - 1);
                    while (i > 0 && j > 0 && !grid[(8 - j) * 8 + i - 1].hasChildNodes()) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - j) * 8 + i - 1].appendChild(cible);
                        i--;
                        j--;
                        let a = i;
                        let b = j;
                        firstDiag1 = [a, b];
                    }
                    i = column + 1;
                    j = row - 1;
                    lastDiag2 = [column + 1, row - 1];
                    console.log(i, j, (8 - j) * 8 + i - 1);
                    while (i <= 8 && j > 0 && !grid[(8 - j) * 8 + i - 1].hasChildNodes()) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - j) * 8 + i - 1].appendChild(cible);
                        i++;
                        j--;
                        let a = i;
                        let b = j;
                        lastDiag2 = [a, b];
                    }
                    i = column - 1;
                    j = row + 1;
                    firstDiag2 = [column - 1, row + 1];
                    console.log(i, j, (8 - j) * 8 + i - 1);
                    while (i > 0 && j <= 8 && !grid[(8 - j) * 8 + i - 1].hasChildNodes()) {
                        let cible = document.createElement('img');
                        cible.setAttribute('src', 'images/cible2.png');
                        cible.classList.add('target');
                        grid[(8 - j) * 8 + i - 1].appendChild(cible);
                        i--;
                        j++;
                        let a = i;
                        let b = j;
                        firstDiag2 = [a, b];
                    }
                    break;
                }
                case 'images/cavalier1.png':
                    break;
                case 'images/cavalier2.png':
                    break;
                case 'images/roi1.png':
                    break;
                case 'images/roi2.png':
                    break;
                case 'images/dame1.png':
                    break;
                case 'images/dame2.png':
                    break;
            }
            clickedPiece = e;
        }
    }

    function move(e, olde) {
        if (e.target.nodeName === "IMG" && (e.target.getAttribute('src') == "images/cible1.png" || e.target.getAttribute('src') == "images/cible2.png") && clickedPiece !== 0) {
            console.log(clickedPiece);
            let copy = olde.target.cloneNode(false);
            olde.target.remove();
            let eparent = e.target.parentNode;
            eparent.innerHTML = "";
            eparent.appendChild(copy);
            clickedPiece = 0;
            console.log(clickedPiece);

        }
        let shownMoves = document.querySelectorAll('.target');
        for (let i = 0; i < shownMoves.length; i++) {
            shownMoves[i].remove();
        }
    }


    /*Spawn elements on empty tiles by clicking*/
    function spawnItem(e) {
        if (!e.target.hasChildNodes()) {
            let img = document.createElement('img');
            img.classList.add('white');
            img.classList.add('black');
            e.target.appendChild(img);
        }

    }
    /*Delete elements by double clicking*/
    /*
    function deleteItem(e) {
        if (e.target.nodeName === "IMG") {
            e.target.remove();
        }
    }*/
    createGrid();
    const grid = document.querySelectorAll('.board div');
    resetGrid();
    for (let i = 0; i < grid.length; i++) {
        grid[i].addEventListener('click', (e) => { move(e, clickedPiece) })
        grid[i].addEventListener('click', showMoves);
        //grid[i].addEventListener('click', spawnItem);
        //grid[i].addEventListener('dblclick', deleteItem);
    }
})