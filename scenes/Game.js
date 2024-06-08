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
      Reloj: {tiemPlus: 10, cantidad: 0}
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

    //reloj, bomba y puntero
    this.load.image("Bomba", "../public/assets/Bomba.png");
    this.load.image("Reloj", "../public/assets/Reloj.webp");    
    this.load.image("Mira", "../public/assets/puntero.png");
  }

  create() {
    //fondo
    this.Fondo = this.add.image(500,300, "Fondo");
    this.Fondo.setScale(1.9,1.7)

    //gaucho
    this.Gaucho = this.add.image(105, 500, "Gaucho");
    this.Gaucho.setScale(0.7,0.7)

    //reloj
    this.reloj = this.physics.add.group()
    
    this.physics.add.collider(
      this.Gaucho, 
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

      //puntaje
      this.scoreText = this.add.text ( //Texto de contador de puntos
    10,
    40,
    `Puntaje: ${this.score}
    G: ${this.figuras["Diana_Grande"].cantidad}
    M: ${this.figuras["Diana_Media"].cantidad}
    P: ${this.figuras["Diana_Peque"].cantidad}
    BOMB: ${this.figuras["Bomba"].cantidad}
    REG: ${this.figuras["Reloj"].cantidad}`
  );

  //reinicio
  this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

  //spawneo de dianas
  this.time.addEvent({
    delay: 2000, //tiempo entre spawneo de recolectables 1000=1 segundo
    callback: this.handlerTimer,
    callbackScope: this,
    loop: true,
  });

  this.time.addEvent({
    delay: 1000, 
    callback: this.onSecond,
    callbackScope: this,
    loop: true,
  });

//grupo de dianas, creo?
  this.Dianas = this.physics.add.group()


  //puntero

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

  onSecond() {
    //crear RE spawneo recolectable   // funcion callback
    const tipos = ["Diana_Grande","Diana_Media","Diana_Peque", "Bomba", "Reloj"];
    const tipo = Phaser.Math.RND.pick(tipos);
    let Diana = this.Dianas.create(
      Phaser.Math.Between(20, 790),
      0,
      tipo
    );
    Diana.setVelocity(0, 20);

     //asignar rebote
     const rebote = Phaser.Math.FloatBetween(0.4, 0.8);
     Diana.setBounce(0.75);
 
     //set data
     Diana.setData("puntos", this.figuras[tipo].puntos);
     Diana.getData("tipo", tipo);
 
  }

  onShapeCollect(Gaucho, Diana, ) {
    
    //puntero 2.0
    this.figuras.on('pointerdown', () => {
      this.figuras.destroy();
  });



    console.log("Dianas ", Diana.texture.key)
      //recolectable.destroy(); //se puede usar destroy o disable


    const puntos = Diana.getData("puntos");


      const nombrefig = Diana.texture.key; //Identificar cual figura se recolecta
      const puntosfig = this.figuras[nombrefig].puntos; //Identificar cuantos puntos suma esa figura
      this.score += puntosfig; //Sumar los puntos de la figura al score
      console.log(this.score);
      this.figuras[nombrefig].cantidad += 1;
      
      console.table(this.figuras);
      console.log("score", this.score);
      Diana.destroy(); //Desaparecer el recolectable al chocar con el personaje
      
      this.scoreText.setText( //score
      `Puntaje: ${this.score}
      G: ${this.figuras["Diana_Grande"].cantidad}
      M: ${this.figuras["Diana_Media"].cantidad}
      P: ${this.figuras["Diana_Peque"].cantidad}
      BOMB: ${this.figuras["Bomba"].cantidad}
      REG: ${this.figuras["Reloj"].cantidad}`
      );
        
      //requisitos para ganar
      const cumplePuntos = this.score >= 100000;
      if (cumplePuntos) { //Ganar
        console.log("Ganaste");
        this.scene.start("end", {
        score: this.score,
        gameOver: this.gameOver,
        });
              
      }
    }

  update() {
    if (this.gameOver && this.r.isDown) {
      this.Scene.restart();
    }
if (this.gameOver) {
  //this.physics.pause();//pausar la pantalla
  this.scene.start("end", {
    score: this.score,
    gameOver: this.gameOver,
  })
    //return; //Hace una salida de la funcion para que no se vuelva a ejecutar
}
  }
}
