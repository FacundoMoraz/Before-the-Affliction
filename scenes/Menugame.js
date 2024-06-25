// Definimos la escena inicial
class SceneInicio extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneInicio' });
    }

    preload() {
        // Aquí puedes cargar cualquier recurso que necesites
    }

    create() {
        // Añade un texto como título o instrucción
        this.add.text(400, 200, 'Bienvenido al Juego', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Añade un botón y configura el evento de clic
        let button = this.add.text(400, 300, 'Iniciar Juego', { fontSize: '32px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.scene.start('SceneJuego')); // Cambia a la escena del juego al hacer clic
    }
}

// Definimos la escena del juego
class SceneJuego extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneJuego' });
    }

    preload() {
        // Aquí puedes cargar los recursos que necesites para el juego
    }

    create() {
        // Añade el contenido del juego aquí
        this.add.text(400, 300, 'Esta es la escena del juego', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    }
}

// Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    scene: [SceneInicio, SceneJuego]
};

// Creación del juego con la configuración definida
const game = new Phaser.Game(config);
