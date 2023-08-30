export default class Remi {

    constructor() {

        this.data = {
            deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            graveyard: new Array(),
            hand:new Map([
                [
                    "123",
                    {
                        id:"123",
                        cards:[]
                    }
                ],
            ]),
            handGraveyard: new Array()
        }

    }

    draw(playerID) {
        let card = this.data.deck.pop()
        this.data.hand.get(playerID).cards.push(card)
    }

    getDeck() {
        return this.data.deck
    }

    getGraveYard() {
        return this.data.graveyard
    }

    discardCard(playerID, cardIdx) {
        let discardedCard = this.data.hand.get(playerID).cards.splice(cardIdx, 1)
        if (discardedCard.length != 0) {
            this.data.graveyard.push(discardedCard)
        }
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
        return this.data.hand.get(playerID).cards
    }

}