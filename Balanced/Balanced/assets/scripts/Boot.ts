
/**
 * This is the core/main of the game. It initializes the game
 * and the GSM. The game is then sent off with the GSM and all
 * update cycles are forwarded through.
 *
 * @author Anthony, Emerson
 */
class BalancedGame {

    constructor() {
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }

    private game: Phaser.Game;
    private gsm: States.GameStateManager;

    preload() {
        //center game
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        var rem = new UTIL.ResourceManager();

        //PUT ALL RESOURCES YOU NEED LOADED DOWN HERE
        rem.addResource(new UTIL.Resource('logo2', 'assets/res/phaser2.jpg', UTIL.TESTLOGO_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);

        // MAIN MENU RESOURCES
        rem.addResource(new UTIL.Resource('mmBackground', 'assets/res/main-menu/mm_background.png', UTIL.MM_BACKGROUND_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);

        // play button
        rem.addResource(new UTIL.Resource('mmPlayButton', 'assets/res/main-menu/mm_play_btns.png', UTIL.MM_PLAYBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 200, 80);
        }, this);

        // load buton
        rem.addResource(new UTIL.Resource('mmLoadButton', 'assets/res/main-menu/mm_load_btns.png', UTIL.MM_LOADBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 200, 80);
        }, this);

        // help button
        rem.addResource(new UTIL.Resource('mmHelpButton', 'assets/res/main-menu/mm_help_btns.png', UTIL.MM_HELPBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 200, 80);
        }, this);

        // options button
        rem.addResource(new UTIL.Resource('mmOptionsButton', 'assets/res/main-menu/mm_options_btns.png', UTIL.MM_HELPBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 330, 80);
        }, this);
        // END MAIN MENU
        
    }

    create() {        
        this.gsm = new States.GameStateManager(this.game);
        // START STATES
        States.TEST_STATE = new States.TestState(this.gsm);
        States.TEST_STATE2 = new States.TestState2(this.gsm);
        States.MAIN_MENU_STATE = new States.MainMenuState(this.gsm);
        // END STATES
        this.gsm.initState();
    }

    update() {
        this.gsm.update();
    }

}
// When the window is loaded completely this will be executed.
window.onload = () => {
    var game = new BalancedGame();
};