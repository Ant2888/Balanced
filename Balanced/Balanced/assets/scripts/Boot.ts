///<referenced path="State.ts"/>

/**
 * This is the core/main of the game. It initializes the game
 * and the GSM. The game is then sent off with the GSM and all
 * update cycles are forwarded through.
 *
 * @author Anthony
 */
class BalancedGame {

    constructor() {
        this.game = new Phaser.Game(960, 540, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    private game: Phaser.Game;
    private gsm: States.GameStateManager;

    preload() {
        this.game.load.image('logo', 'phaser2.png');
        this.gsm = new States.GameStateManager(this.game);
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

// When the window is loaded completely this will be executed.
window.onload = () => {
    var game = new BalancedGame();
};