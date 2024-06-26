export default class Menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }

  init(data) {}

  preload() {
    this.load.image("Fondo", "../public/assets/Fondo.jpg");
  }

  create() {
    this.Fondo = this.add.image(500, 300, "Fondo");
    this.Fondo.setScale(1.9, 1.7);

    this.texto = this.add.text(
      250,
      500,
      "aprieta la barra espaciadora para jugar"
    );

    //empezar
    this.Espacio = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.time.addEvent({
      delay: 600,
      callback: this.onVisible,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1200,
      callback: this.offVisible,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    if (this.Espacio.isDown) {
      this.scene.start("main");
    }
  }

  onVisible() {
    this.texto.setVisible(false);
  }

  offVisible() {
    this.texto.setVisible(true);
  }
}
