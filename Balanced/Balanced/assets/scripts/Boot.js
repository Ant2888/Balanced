///<referenced path="State.ts"/>
var BalancedGame = (function () {
    function BalancedGame() {
        this.game = new Phaser.Game(960, 540, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
    }
    BalancedGame.prototype.preload = function () {
        this.game.load.image('logo', 'phaser2.png');
        this.gsm = new States.GameStateManager(this.game);
        this.gsm.placeInitalState(new States.TestState(this.gsm));
    };
    BalancedGame.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        //TODO: INITIALIZE ALL STATES
        //TODO: INITIALIZE RESOURCES REQUIRED -- GOTO RES MANAGER
        //TODO: Launch Build State
    };
    BalancedGame.prototype.update = function () {
        this.gsm.update();
        this.gsm.render();
    };
    return BalancedGame;
}());
window.onload = function () {
    var game = new BalancedGame();
};
//# sourceMappingURL=Boot.js.map