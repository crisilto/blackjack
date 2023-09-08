let player = {
    name: "Per",
    chips: 145
}
let cards = []
let dealerCards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let isStand = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let sumDealerEl = document.getElementById("sum-dealer-el")

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor((Math.random() * 13) + 1)
    if (randomNumber === 1) {
        return 11
    } else if (randomNumber > 10) {
        return 10
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard

    dealerCards = [getRandomCard()]
    dealerCardsEl.textContent = "Cards: " + dealerCards[0]
    sumDealerEl.textContent = "Sum: " + dealerCards[0]
    renderGame()
}

function playerDealerTurn() {
    // Calcula la suma del dealer
    dealerSum = dealerCards[0]

    // Toma cartas adicionales mientras la suma sea menor a 17 y el jugador no se haya plantado o se haya pasado
    while (dealerSum < 17) {
        let dealerCard = getRandomCard()
        dealerCards.push(dealerCard)
        dealerSum += dealerCard
        // Agrega la carta a la interfaz si lo deseas
        dealerCardsEl.textContent += " " + dealerCard
        sumDealerEl.textContent = "Sum: " + dealerSum
    }
    compareHands()
}


function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum

    if (!isAlive && !isStand) {
        //The player stands
        if (sum <= 21) {
            message = "You've stood. Waiting for the dealer..."
        } else {
            message = "You're out of the game!"
        }
    }

    messageEl.textContent = message
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        console.log(cards)
        renderGame()
    }
}

function playerStands() {
    if (isAlive && !hasBlackJack) {
        isAlive = false
        isStand = true
        playerDealerTurn()
        compareHands()
        renderGame()
    }
}

function compareHands() {
    if (!isAlive || isStand) {
        if (sum > 21 || (dealerSum <= 21 && dealerSum > sum)) {
            message = "Dealer wins!"
        } else if (dealerSum > 21 || sum > dealerSum) {
            message = "You win!"
        } else {
            message = "It's a tie!"
        }
    }
    isAlive = false
    messageEl.textContent = message
}

function restartGame() {
    location.reload()
}