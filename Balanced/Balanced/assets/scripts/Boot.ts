
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
        //center game
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
        var rem = new UTIL.ResourceManager();

        rem.addResource(new UTIL.Resource('logo2', 'phaser2.jpg', 0), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);


    }

    create() {
        this.gsm = new States.GameStateManager(this.game);
        //TODO: INITIALIZE ALL STATES
        //TODO: INITIALIZE RESOURCES REQUIRED -- GOTO RES MANAGER
        //TODO: Launch Build State
    }

    update() {
        this.gsm.update();
    }

}
// When the window is loaded completely this will be executed.
window.onload = () => {
    var game = new BalancedGame();
};