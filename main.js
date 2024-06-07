import Game from "./scenes/Game.js";
import End from "./End.js";

// Create a new Phaser config object
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1200,
      height: 100,
    },
    max: {
      width: 1100,
      height: 600,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  // List of scenes to load
  scene: [Game, End],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
