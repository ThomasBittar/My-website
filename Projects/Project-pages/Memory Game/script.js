document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        {
            name: '1',
            img: 'images/1.png'
        },
        {
            name: '1',
            img: 'images/1.png'
        },
        {
            name: '2',
            img: 'images/2.png'
        },
        {
            name: '2',
            img: 'images/2.png'
        },
        {
            name: '3',
            img: 'images/3.png'
        },
        {
            name: '3',
            img: 'images/3.png'
        },
        {
            name: '4',
            img: 'images/4.png'
        },
        {
            name: '4',
            img: 'images/4.png'
        },
        {
            name: '5',
            img: 'images/5.png'
        },
        {
            name: '5',
            img: 'images/5.png'
        },
        {
            name: '6',
            img: 'images/6.png'
        },
        {
            name: '6',
            img: 'images/6.png'
        }
    ]
    cardArray.sort(() => 0.5 - Math.random());
    let cardsChosen = [];
    let cardsChosenId = [];
    var cardsWon = 0;
    console.log(cardsWon);
    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector('#result');
    for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.classList.add('gameCardParent');
        grid.appendChild(card);

        var cardContent = document.createElement('img');
        cardContent.classList.add('gameCard');
        cardContent.setAttribute('src', 'images/CardBack.png');
        cardContent.setAttribute('data-id', i);
        cardContent.addEventListener('click', flipcard);
        card.appendChild(cardContent);

    }
    function checkForMatch() {
        var cards = document.querySelectorAll('.gameCard');
        var cardParents = document.querySelectorAll('.gameCardParent');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match!');
            cards[optionOneId].setAttribute('src', 'images/Correct.png');
            cardParents[optionOneId].classList.remove('card');
            cards[optionTwoId].setAttribute('src', 'images/Correct.png');
            cardParents[optionTwoId].classList.remove('card');
            cardsWon++;
            console.log(cardsWon);
        }
        else {
            cards[optionOneId].setAttribute('src', 'images/CardBack.png');
            cards[optionTwoId].setAttribute('src', 'images/CardBack.png');
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.innerHTML = cardsWon;
        if (cardsWon === cardArray.length / 2) {
            resultDisplay.innerHTML = 'You matched all the cards! Congratulations!';
        }

    }
    function flipcard() {
        console.log(this);
        var cardId = this.getAttribute('data-id');
        console.log(cardId);
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }












})