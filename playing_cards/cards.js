console.log("Playing Cards", "\n", "Enter createDeck() - create a deck", "\n", "Enter shuffle() - shuffle your deck", "\n",
"Enter arrangeBySuit() - arrange your deck by suit", "\n", "Enter ascending() - arrange your deck in ascending form", "\n",
"Enter descending() - arrange your deck in descending form", "\n", "Enter deal() - deal a card", "\n", "Enter dealFiveCards() - deals 5 cards");

let cardSuits = ["♠", "♣", "♥", "♦"];
let cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let array = [];
let shuffledDeck = [];
let deck = new Array();
let deckExhausted = "Deck Exhausted";

// createDeck();
// shuffle();
// arrangeBySuit();
// ascending();
// descending();
// deal();
// dealFiveCards()

function createDeck() {
    for(let i = 0; i < cardSuits.length; i++) {
        for(let j = 0; j < cardValues.length; j++) {
            let card = cardSuits[i] + cardValues[j];
            deck.push(card);
        }
    }
    // console.log(deck);
    return deck;
    }

function shuffle() {
    deck.sort(() => Math.random() - 0.5);
    
    let string = deck.toString();
    let split = string.split(",");
    array.push(split);
    for (let i = 0; i < array.length; i++) {
        shuffledDeck = shuffledDeck.concat(array[i]);
    }
    // console.log(shuffledDeck)
    return shuffledDeck;
}

function arrangeBySuit() {
    shuffledDeck.sort(function (a, b) {
        let cardSuit1 = a.slice(0, 1);
        let cardSuit2 = b.slice(0, 1);
        let cardSuitIndex1 = cardSuits.indexOf(cardSuit1);
        let cardSuitIndex2 = cardSuits.indexOf(cardSuit2);
        return cardSuitIndex1 - cardSuitIndex2;
    });
    // console.log(shuffledDeck);
    return shuffledDeck;
}

function ascending() {
    shuffledDeck.sort(function (a, b) {
        let cardValue1 = a.slice(1);
        let cardValue2 = b.slice(1);
        let cardValueIndex1 = cardValues.indexOf(cardValue1);
        let cardValueIndex2 = cardValues.indexOf(cardValue2);
        return cardValueIndex1 - cardValueIndex2;
    })
    // console.log(shuffledDeck);
    return shuffledDeck;
}

function descending() {
    shuffledDeck.sort(function (a, b) {
        let cardValue1 = a.slice(1);
        let cardValue2 = b.slice(1);
        let cardValueIndex1 = cardValues.indexOf(cardValue1);
        let cardValueIndex2 = cardValues.indexOf(cardValue2);
        return cardValueIndex1 - cardValueIndex2;
    })
    shuffledDeck.reverse();
    // console.log(shuffledDeck);
    return shuffledDeck;
}

function deal() {
    if (shuffledDeck.length > 0) {
        let dealtCard = shuffledDeck.shift();
        let cardSuit = dealtCard[0];
        let cardValue = dealtCard.slice(1);
        let wordValue = '';
        let wordSuit = '';
        
        switch (cardValue) {
            case "A":
                wordValue = 'Ace';
                break;
            case "2":
                wordValue = 'Two';
                break;
            case "3":
                wordValue = 'Three';
                break;
            case "4":
                wordValue = 'Four';
                break;
            case "5":
                wordValue = 'Five';
                break;
            case "6":
                wordValue = 'Six';
                break;
            case "7":
                wordValue = 'Seven';
                break;
            case "8":
                wordValue = 'Eight';
                break;
            case "9":
                wordValue = 'Nine';
                break;
            case "10":
                wordValue = 'Ten';
                break;
            case "J":
                wordValue = 'Jack';
                break;
            case "Q":
                wordValue = 'Queen';
                break;
            case "K":
                wordValue = 'King';
                break;
        }
        
        switch (cardSuit) {
        case "♠":
            wordSuit = 'Spades';
            break;
        case "♣":
            wordSuit = 'Clubs';
            break;
        case "♥":
            wordSuit = 'Hearts';
            break;
        case "♦":
            wordSuit = 'Diamonds';
            break;
        }
        console.log(shuffledDeck)
        // console.log(`${wordValue} of ${wordSuit}`)
        return `${wordValue} of ${wordSuit}`;
        }
        else {
        return deckExhausted;
        }
    }

    // optional()

    function dealFiveCards() {
        let dealCard = [];
        if (shuffledDeck.length > 0) {
            for (let i = 0; i < 5; i++) {
            dealCard.push(shuffledDeck.shift());
            }
            console.log(shuffledDeck);
            // console.log(dealCard);
            return dealCard;
        } else {
            return deckExhausted
        }
        // if (dealCard ===)
    }