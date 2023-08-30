export default class Remi {

    constructor() {

        this.data = {
            deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            hand: [
                {
                    id: "123",
                    cards: []
                }
            ]
        }

    }

    draw(playerID) {
        let card = this.data.deck.pop()
        let playerIndex = this.data.hand.findIndex(h => h.id === playerID)
        if (playerIndex != -1) {
            this.data.hand[playerIndex].cards.push(card)
        }
    }

    getDeck() {
        return this.data.deck
    }

    shuffleDeck() {
        let currentIdx = this.data.deck.length, randomIdx
        
        while (currentIdx > 0) {
            // get random idx
            randomIdx = Math.floor(Math.random() * currentIdx)
            currentIdx--
            
            // swap cards
            [this.data.deck[currentIdx], this.data.deck[randomIdx]] = 
            [this.data.deck[randomIdx], this.data.deck[currentIdx]]
        }
    }

    getCardByPlayerID(playerID) {
        let playerIndex = this.data.hand.findIndex(h => h.id === playerID)
        if (playerIndex != -1) {
            return this.data.hand[playerIndex].cards
        }
        return []
    }

}