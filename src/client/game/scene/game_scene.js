import Remi from '../../logic/remi.js'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "game_scene" });
    }
    init() {
        this.remi = new Remi()
    }
    preload() {

    }
    create() {

        this.drawButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Add one')
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.remi.draw("123")
                this.refresh()
            })
            .on('pointerover', () => this.drawButton.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.drawButton.setStyle({ fill: '#FFF' }))

        this.deckValue = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY / 2, "")
            .setOrigin(0.5)
        this.handValue = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY * (3 / 4), "")
            .setOrigin(0.5)

        this.refresh()
    }

    refresh() {
        this.deckValue.setText(printArrayAsString(this.remi.getDeck()))
        this.handValue.setText(printArrayAsString(this.remi.getCardByPlayerID("123")))
    }
}

let printArrayAsString = (array) => {
    let result = ""
    array.forEach(element => {
        result += element + "-"
    });
    return result
}