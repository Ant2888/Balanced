/**
 * This is the core/main of the game. It initializes the game
 * and the GSM. The game is then sent off with the GSM and all
 * update cycles are forwarded through.
 *
 * @author Anthony, Emerson
 */
var BalancedGame = (function () {
    function BalancedGame() {
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    BalancedGame.prototype.preload = function () {
        //center game
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        var rem = new UTIL.ResourceManager();
        //PUT ALL RESOURCES YOU NEED LOADED DOWN HERE
        rem.addResource(new UTIL.Resource('logo2', 'assets/res/phaser2.jpg', UTIL.TESTLOGO_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        // MAIN MENU RESOURCES
        rem.addResource(new UTIL.Resource('mmBackground', 'assets/res/mmBackground_w.o_buttons.jpg', UTIL.MM_BACKGROUND_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        // play button
        rem.addResource(new UTIL.Resource('mmPlayButton', 'assets/res/mm_playerBtn.png', UTIL.MM_PLAYBUTTON_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        // load buton
        rem.addResource(new UTIL.Resource('mmLoadButton', 'assets/res/mm_loadBtn.png', UTIL.MM_LOADBUTTON_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        // options/help button
        rem.addResource(new UTIL.Resource('mmOptionsHelpButton', 'assets/res/mm_optionsHelpBtn.png', UTIL.MM_OPTIONSHELPBUTTON_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        // END MAIN MENU
    };
    BalancedGame.prototype.create = function () {
        this.game.scale.refresh();
        this.gsm = new States.GameStateManager(this.game);
        // START STATES
        States.TEST_STATE = new States.TestState(this.gsm);
        States.TEST_STATE2 = new States.TestState2(this.gsm);
        States.MAIN_MENU_STATE = new States.MainMenuState(this.gsm);
        // END STATES
        this.gsm.initState();
    };
    BalancedGame.prototype.update = function () {
        this.gsm.update();
    };
    return BalancedGame;
}());
// When the window is loaded completely this will be executed.
window.onload = function () {
    var game = new BalancedGame();
};
//# sourceMappingURL=Boot.js.map