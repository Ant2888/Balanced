/**
 * This is the core/main of the game. It initializes the game
 * and the GSM. The game is then sent off with the GSM and all
 * update cycles are forwarded through.
 *
 * @author Anthony
 */
var BalancedGame = (function () {
    function BalancedGame() {
        this.game = new Phaser.Game(960, 540, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    BalancedGame.prototype.preload = function () {
        //center game
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
        var rem = new UTIL.ResourceManager();
        //PUT ALL RESOURCES YOU NEED LOADED DOWN HERE
        rem.addResource(new UTIL.Resource('logo2', 'assets/res/phaser2.jpg', UTIL.TESTLOGO_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
    };
    BalancedGame.prototype.create = function () {
        this.gsm = new States.GameStateManager(this.game);
        // START STATES
        States.TEST_STATE = new States.TestState(this.gsm);
        States.TEST_STATE2 = new States.TestState2(this.gsm);
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