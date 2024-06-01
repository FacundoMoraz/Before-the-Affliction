// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {
    this.gameOver = false;
    this.timer = 40; // son segundos
    this.score = 0; //contador de score
    this.figuras = { //grupo de figuras con su valor
      Diana_Peque: {puntos: 30, cantidad: 0},
      Diana_Media: {puntos: 20, cantidad: 0},
      Diana_Grande: {puntos: 10, cantidad: 0},
      Bomba: {puntos: -10, cantidad: 0},
      Reloj: {tiemPlus: 10}
      }
    }

  preload() {
    // load assets
    this.load.image("Fondo", "../public/assets/FondoDesierto.png"); //fondo
    
    this.load.image("Gaucho", "../public/assets/Gaucho.png"); //gaucho

    //Dianas
    this.load.image("Diana_Grande", "../public/assets/Diana_Grande.png");
    this.load.image("Diana_Media", "../public/assets/Diana_Media.png");
    this.load.image("Diana_Peque", "../public/assets/Diana_Peque.png");

    //reloj y bomba
    this.load.image("Bomba", "../public/assets/Bomba.png");
    this.load.image("Reloj", "../public/assets/Reloj.webp");    
  }

  create() {
    //fondo
    this.Fondo = this.add.image(500,300, "Fondo");
    this.Fondo.setScale(1.9,1.7)

    //gaucho
    this.Gaucho = this.add.image(150, 360, "Gaucho");
    this.Gaucho.setScale(1)

    //reloj
    this.reloj = this.physics.add.Group()
    
    this.physics.add.collider(
      this.personaje, 
      this.reloj, 
      this.agregarTiempo, 
      null, 
      this)
      this.physics.add.collider(this.plataformas, this.reloj)

      this.time.addEvent({
        delay: 8000,
        callback: this.timeMas,
        callbackScope: this,
        loop: true,
      })
  }

  timeMas() {
      
    let reloj = this.reloj.create(
      Phaser.Math.Between(20, 790),
      0,
      "Reloj",
    ).setScale(0.1)

  }

  handlerTimer() { 
      // cuenta regresiva
          this.timer -= 1;
          this.timerText.setText(`tiempo restante: ${this.timer}`);
          if (this.timer === 0) {
            this.gameOver = true;
          }
        }
  

    agregarTiempo(Gaucho, reloj) {
      reloj.destroy()
      this.timer += 10
      console.log(this.timer);
    }

  update() {
    // update game objects
  }
}
