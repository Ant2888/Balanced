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
        this.game.scale.refresh();
        var rem = new UTIL.ResourceManager();
        //PUT ALL RESOURCES YOU NEED LOADED DOWN HERE
        // --------------------------------- HUD
        rem.addResource(new UTIL.Resource('ab_ab1_ss', 'assets/res/hud/ab_ab1_ss.png', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 75, 75);
        }, this);
        rem.addResource(new UTIL.Resource('ab_ab2_ss', 'assets/res/hud/ab_ab2_ss.png', UTIL.AB_AB2_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 75, 75);
        }, this);
        rem.addResource(new UTIL.Resource('ab_ab3_ss', 'assets/res/hud/ab_ab3_ss.png', UTIL.AB_AB3_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 75, 75);
        }, this);
        rem.addResource(new UTIL.Resource('ab_ab4_ss', 'assets/res/hud/ab_ab4_ss.png', UTIL.AB_AB4_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 75, 75);
        }, this);
        rem.addResource(new UTIL.Resource('ab_bag_ss', 'assets/res/hud/ab_bag_ss.png', UTIL.AB_BAG_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 35, 38);
        }, this);
        rem.addResource(new UTIL.Resource('ab_bg', 'assets/res/hud/ab_bg.png', UTIL.AB_BG_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('ab_p1_ss', 'assets/res/hud/ab_p1_ss.png', UTIL.AB_P1_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 42.5, 43);
        }, this);
        rem.addResource(new UTIL.Resource('ab_p2_ss', 'assets/res/hud/ab_p2_ss.png', UTIL.AB_P2_SS_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('ab_stats_ss', 'assets/res/hud/ab_stats_ss.png', UTIL.AB_STATS_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 35, 36);
        }, this);
        rem.addResource(new UTIL.Resource('ab_town_ss', 'assets/res/hud/ab_town_ss.png', UTIL.AB_TOWN_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 45, 40);
        }, this);
        rem.addResource(new UTIL.Resource('ul_ui', 'assets/res/hud/UL_UI.png', UTIL.UL_UI_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('uf_energy_tick', 'assets/res/hud/uf_energy_tick.png', UTIL.UF_ENERGY_TICK_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 2, 25);
        }, this);
        rem.addResource(new UTIL.Resource('uf_health_tick', 'assets/res/hud/uf_health_tick.png', UTIL.UF_HEALTH_TICK_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 4, 31);
        }, this);
        // --------------------------------- HUD
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
        // OPTIONS MENU RESOURCES
        rem.addResource(new UTIL.Resource('omBackground', 'assets/res/options-menu/om_background.png', UTIL.OM_BACKGROUND_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('omOkButton', 'assets/res/options-menu/om_ok_btns.png', UTIL.OM_OKBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 150, 80);
        }, this);
        rem.addResource(new UTIL.Resource('omCancelButton', 'assets/res/options-menu/om_cancel_btns.png', UTIL.OM_CANCELBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 300, 80);
        }, this);
        // END OPTIONS MENU
        // HELP MENU RESOURCES
        rem.addResource(new UTIL.Resource('hmBackground', 'assets/res/help-menu/hm_background.png', UTIL.HM_BACKGROUND_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('hmOkButton', 'assets/res/help-menu/hm_ok_btns.png', UTIL.HM_OKBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 150, 80);
        }, this);
        // END HELP MENU RESOURCES
        // LEVEL 1 RESOURCES
        rem.addResource(new UTIL.Resource('level1', 'assets/res/level1-dungeon/Balanced_level1.json', UTIL.PROTOTYPE_TILEMAP_ID), true, function (e) {
            this.game.load.tilemap(e.key, e.assetUrl, null, Phaser.Tilemap.TILED_JSON);
        }, this);
        rem.addResource(new UTIL.Resource('gameTiles', 'assets/res/level1-dungeon/grunge_tile.png', UTIL.PROTOTYPE_TILESET_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('tempPlayer', 'assets/res/level1-dungeon/balancedSprite.png', UTIL.HM_OKBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 64, 64);
        }, this);
        // END LEVEL 1 RESOURCES
    };
    BalancedGame.prototype.create = function () {
        this.gsm = new States.GameStateManager(this.game);
        // START STATES
        States.TEST_STATE = new States.TestState(this.gsm);
        States.TEST_STATE2 = new States.TestState2(this.gsm);
        States.MAIN_MENU_STATE = new States.MainMenuState(this.gsm);
        States.OPTIONS_MENU_STATE = new States.OptionsMenuState(this.gsm);
        States.HELP_MENU_STATE = new States.HelpMenuState(this.gsm);
        States.PROTOTYPE_STATE = new States.PrototypeState(this.gsm);
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