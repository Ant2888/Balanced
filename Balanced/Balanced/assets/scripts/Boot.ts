///<referenced path="State.ts"/>

class BalancedGame {

    constructor() {
        this.game = new Phaser.Game(960, 540, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    private game: Phaser.Game;
    private gsm: States.GameStateManager;

    preload() {
        this.game.load.image('logo', 'phaser2.png');
        this.gsm = new States.GameStateManager(this.game);
        this.gsm.placeInitalState(new States.TestState(this.gsm));
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        //TODO: INITIALIZE ALL STATES
        //TODO: INITIALIZE RESOURCES REQUIRED -- GOTO RES MANAGER
        //TODO: Launch Build State
    }

    update() {
        this.gsm.update();
        this.gsm.render();
    }

}

window.onload = () => {
    var game = new BalancedGame();
};