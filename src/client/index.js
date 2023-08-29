import 'phaser';
import GameScene from './game/scene/game_scene.js';

let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x4488aa,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "thegame",
        width: 750,
        height: 1334
    },
    scene: GameScene
}
new Phaser.Game(gameConfig);
