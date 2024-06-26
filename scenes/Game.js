// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {
    this.gameOver = false;
    this.timer = 40; // son segundos
    this.score = 0; //contador de score
    this.figuras = {
      //grupo de figuras con su valor
      Diana_Peque: { puntos: 30, cantidad: 0 },
      Diana_Media: { puntos: 20, cantidad: 0 },
      Diana_Grande: { puntos: 10, cantidad: 0 },
      Bomba: { puntos: -10, cantidad: 0 },
      Reloj: { puntos: 5, cantidad: 0 },
    };
  }

  preload() {
    // load assets
    this.load.image("Fondo", "./public/assets/FondoDesierto.png"); //fondo

    this.load.image("Gaucho", "./public/assets/Gaucho.png"); //gaucho

    //Dianas
    this.load.image("Diana_Grande", "./public/assets/Diana_Grande.png");
    this.load.image("Diana_Media", "./public/assets/Diana_Media.png");
    this.load.image("Diana_Peque", "./public/assets/Diana_Peque.png");

    //reloj, bomba y puntero
    this.load.image("Bomba", "./public/assets/Bomba.png");
    this.load.image("Reloj", "./public/assets/Reloj.webp");
    this.load.image("Mira", "./public/assets/puntero.png");

    this.load.image("Plataforma", "./public/assets/Plataforma.png");
  }

  create() {
    //fondo
    this.Fondo = this.add.image(500, 300, "Fondo");
    this.Fondo.setScale(1.9, 1.7);

    this.Plataforma = this.physics.add
      .sprite(1, 600, "Plataforma")
      .setSize(10000, 10);
    this.Plataforma.body.setImmovable(true);
    this.Plataforma.body.setAllowGravity(false);
    this.Dianas = this.physics.add.group(); //grupo de dianas
    this.reloj = this.physics.add.group();
    this.Bomba = this.physics.add.group();

    this.physics.add.collider(
      this.Plataforma,
      this.Dianas,
      this.DestroyDianas,
      null,
      this
    );

    this.physics.add.collider(
      this.Plataforma,
      this.reloj,
      this.DestroyRej,
      null,
      this
    );

    this.physics.add.collider(
      this.Plataforma,
      this.Bomba,
      this.DestroyBombas,
      null,
      this
    );

    //gaucho
    this.Gaucho = this.add.image(105, 500, "Gaucho");
    this.Gaucho.setScale(0.7, 0.7);

    //reloj y grupos

    this.time.addEvent({
      delay: 6000,
      callback: this.timeMas,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 800,
      callback: this.Kbum,
      callbackScope: this,
      loop: true,
    });

    //puntaje
    this.scoreText = this.add.text(
      //Texto de contador de puntos
      10,
      40,
      `Puntaje: ${this.score}
    G: ${this.figuras["Diana_Grande"].cantidad}
    M: ${this.figuras["Diana_Media"].cantidad}
    P: ${this.figuras["Diana_Peque"].cantidad}
    BOMB: ${this.figuras["Bomba"].cantidad}
    REG: ${this.figuras["Reloj"].cantidad}`
    );

    this.timerText = this.add.text(10, 20, `Tiempo restante: ${this.timer}`);

    this.time.addEvent({
      delay: 1000, //tiempo entre spawneo de recolectables 1000=1 segundo
      callback: this.handlerTimer, //  TIEMPOOOO
      callbackScope: this,
      loop: true,
    });

    //spawneo de dianas
    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond, //  OBJETOS :V
      callbackScope: this,
      loop: true,
    });
  }

  timeMas() {
    let reloj = this.reloj.create(Phaser.Math.Between(20, 790), 0, "Reloj");
    reloj.setInteractive();
    reloj.on(
      "pointerdown",
      function (pointer) {
        this.timer += 10;
        reloj.destroy();
      },
      this
    );
  }

  DestroyDianas(Plataforma, Dianas) {
    Dianas.destroy();
  }

  DestroyRej(Plataforma, reloj) {
    reloj.destroy();
  }

  DestroyBombas(Plataforma, Bomba) {
    Bomba.destroy();
  }

  Kbum() {
    let Bomba = this.Bomba.create(
      Phaser.Math.Between(100, 790),
      0,
      "Bomba"
    ).setScale(0.1);
    Bomba.setInteractive();
    Bomba.on(
      "pointerdown",
      function (pointer) {
        this.score -= 10;
        Bomba.destroy();
        this.updatePuntos();
      },
      this
    );
  }

  handlerTimer() {
    // cuenta regresiva
    this.timer -= 1;
    this.timerText.setText(`Tiempo restante: ${this.timer}`);
    if (this.timer <= 0) {
      this.scene.start("end", {
        score: this.score,
        gameOver: this.gameOver,
      });
    }
  }

  onSecond() {
    //crear RE spawneo recolectable   // funcion callback
    const tipos = ["Diana_Grande", "Diana_Media", "Diana_Peque"];

    const tipo = Phaser.Math.RND.pick(tipos);
    let Diana = this.Dianas.create(Phaser.Math.Between(20, 790), 0, tipo);
    Diana.setVelocity(0, 20);

    //set data
    Diana.setData("puntos", this.figuras[tipo].puntos);
    Diana.getData("tipo", tipo);

    Diana.setInteractive();
    Diana.on(
      "pointerdown",
      function (pointer) {
        const nombrefig = Diana.texture.key; //Identificar cual figura se recolecta
        const puntosfig = this.figuras[nombrefig].puntos; //Identificar cuantos puntos suma esa figura
        this.score += puntosfig; //Sumar los puntos de la figura al score
        this.figuras[nombrefig].cantidad += 1;
        console.log("score", this.score);
        Diana.destroy(); //Desaparecer el recolectable al chocar con el personaje
        0;
        this.updatePuntos();
      },
      this
    );
  }

  updatePuntos() {
    this.scoreText.setText(
      //score
      `Puntaje: ${this.score}
      G: ${this.figuras["Diana_Grande"].cantidad}
      M: ${this.figuras["Diana_Media"].cantidad}
      P: ${this.figuras["Diana_Peque"].cantidad}
      BOMB: ${this.figuras["Bomba"].cantidad}
      REG: ${this.figuras["Reloj"].cantidad}`
    );
  }

  onShapeCollect(Diana) {
    //requisitos para ganar
    const cumplePuntos = this.score >= 100000;
    if (cumplePuntos) {
      //Ganar
      console.log("Ganaste??");
      console.log("Como ganaste?");
      this.scene.start("end", {
        score: this.score,
        gameOver: this.gameOver,
      });
    }
  }

  update() {
    return;

    if (this.gameOver) {
      //this.physics.pause();//pausar la pantalla
      this.scene.start("end", {
        score: this.score,
        gameOver: this.gameOver,
      });

      //return; //Hace una salida de la funcion para que no se vuelva a ejecutar
    }
  }
}
