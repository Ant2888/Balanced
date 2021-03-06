﻿
/**
 * This is the core/main of the game. It initializes the game
 * and the GSM. The game is then sent off with the GSM and all
 * update cycles are forwarded through.
 *
 * @author Anthony, Emerson
 */
class BalancedGame {

    constructor() {
        this.game = new Phaser.Game(1280, 720, Phaser.GRAPHICS, 'content', { preload: this.preload, create: this.create, update: this.update, render: this.render });
    }

    private game: Phaser.Game;
    private gsm: States.GameStateManager;
    private loadingComplete: boolean;
    
    preload() {
        //center game
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();        

        this.game.load.start();

        var rem = new UTIL.ResourceManager();

        //PUT ALL RESOURCES YOU NEED LOADED DOWN HERE
        // --------------------------------- AUDIO
        rem.addResource(new UTIL.Resource('moonlight', 'assets/res/audio/moonlight.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('dark_loop', 'assets/res/audio/dark_loop.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('dark_intro', 'assets/res/audio/dark_intro.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('final_hour', 'assets/res/audio/final_hour.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Bag_Close', 'assets/res/audio/Bag_Close.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Bag_Open', 'assets/res/audio/Bag_Open.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Button', 'assets/res/audio/Button.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('ClickDown', 'assets/res/audio/ClickDown.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('ClickLetGo', 'assets/res/audio/ClickLetGo.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('CloseMenu', 'assets/res/audio/CloseMenu.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Door_Open', 'assets/res/audio/Door_Open.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Drinking', 'assets/res/audio/Drinking.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Fall1', 'assets/res/audio/Fall1.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Footsteps', 'assets/res/audio/Footsteps.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Hover', 'assets/res/audio/Hover.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Jump1', 'assets/res/audio/Jump1.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Need_Energy', 'assets/res/audio/Need_Energy.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreAttack1', 'assets/res/audio/OgreAttack1.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreAttack2', 'assets/res/audio/OgreAttack2.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreAttack3', 'assets/res/audio/OgreAttack3.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreAttack4', 'assets/res/audio/OgreAttack4.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreDeath1', 'assets/res/audio/OgreDeath1.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreDeath2', 'assets/res/audio/OgreDeath2.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreDeath3', 'assets/res/audio/OgreDeath3.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreHurt2', 'assets/res/audio/OgreHurt2.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreHurt3', 'assets/res/audio/OgreHurt3.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreHurt4', 'assets/res/audio/OgreHurt4.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OgreHurt5', 'assets/res/audio/OgreHurt5.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('OpenMenu', 'assets/res/audio/OpenMenu.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Pause', 'assets/res/audio/Pause.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('PlayerDeath', 'assets/res/audio/PlayerDeath.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('PlayerHurt1', 'assets/res/audio/PlayerHurt1.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('PlayerHurt2', 'assets/res/audio/PlayerHurt2.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('PlayerHurt3', 'assets/res/audio/PlayerHurt3.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Regular_Hit', 'assets/res/audio/Regular_Hit.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('spell_not_ready', 'assets/res/audio/spell_not_ready.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Three_Attack', 'assets/res/audio/Three_Attack.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Unhover', 'assets/res/audio/Unhover.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('Whirlwind', 'assets/res/audio/Whirlwind.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('PickUpCoin', 'assets/res/audio/PickUpCoin.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('fireball_sound', 'assets/res/audio/fireball_sound.mp3', UTIL.AB_AB1_SS_ID), true, function (e) {
            this.game.load.audio(e.key, e.assetUrl);
        }, this);
        // --------------------------------- AUDIO
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
            this.game.load.spritesheet(e.key, e.assetUrl, 42.5, 43);
        }, this);
        rem.addResource(new UTIL.Resource('ab_stats_ss', 'assets/res/hud/ab_stats_ss.png', UTIL.AB_STATS_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 35, 36);
        }, this);
        rem.addResource(new UTIL.Resource('ab_town_ss', 'assets/res/hud/ab_town_ss.png', UTIL.AB_TOWN_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 45, 40);
        }, this);
        rem.addResource(new UTIL.Resource('ab_options_ss', 'assets/res/hud/ab_options_ss.png', UTIL.AB_TOWN_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 35, 38);
        }, this);
        rem.addResource(new UTIL.Resource('ul_ui', 'assets/res/hud/UL_UI.png', UTIL.UL_UI_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('balance_notif', 'assets/res/balance-menus/balance_notif.png', UTIL.BALANCE_NOTIF_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 615, 170);
        }, this);
        rem.addResource(new UTIL.Resource('dd_twn_btn', 'assets/res/hud/dd_twn_btn.png', UTIL.AB_TOWN_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 120, 35);
        }, this);
        rem.addResource(new UTIL.Resource('dd_menu_btn', 'assets/res/hud/dd_menu_btn.png', UTIL.AB_TOWN_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 120, 35);
        }, this);
        rem.addResource(new UTIL.Resource('dd_background', 'assets/res/hud/dead_dialog.png', UTIL.AB_TOWN_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('boss_bar', 'assets/res/hud/boss_bar_frame.png', UTIL.AB_TOWN_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl);
        }, this);
        // --------------------------------- HUD

        // --------------------------------- character menus
        rem.addResource(new UTIL.Resource('inv_menu', 'assets/res/in-game-menus/inv_menu.png', UTIL.INV_MENU_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('char_menu', 'assets/res/in-game-menus/char_menu.png', UTIL.CHAR_MENU_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('drop_btn_ss', 'assets/res/in-game-menus/drop_btn_ss.png', UTIL.DROP_BTN_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 117, 41);
        }, this);
        rem.addResource(new UTIL.Resource('close_btn_ss', 'assets/res/in-game-menus/close_btn_ss.png', UTIL.CLOSE_BTN_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 25, 25);
        }, this);
        rem.addResource(new UTIL.Resource('shop_menu', 'assets/res/in-game-menus/shop_menu.png', UTIL.CLOSE_BTN_SS_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('shop_item', 'assets/res/in-game-menus/shop_item.png', UTIL.CLOSE_BTN_SS_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('purchase_btn', 'assets/res/in-game-menus/purchase_btn.png', UTIL.CLOSE_BTN_SS_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 109, 37);
        }, this);
        // --------------------------------- character menus             

        rem.addResource(new UTIL.Resource('logo2', 'assets/res/phaser2.jpg', UTIL.TESTLOGO_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);

        // -----------------------------------MAIN MENU RESOURCES
        rem.addResource(new UTIL.Resource('mmBackground', 'assets/res/main-menu/mm_background.png', UTIL.MM_BACKGROUND_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('mmPlayButton', 'assets/res/main-menu/mm_play_btns.png', UTIL.MM_PLAYBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 770, 110);
        }, this);
        rem.addResource(new UTIL.Resource('mmCreditButton', 'assets/res/main-menu/mm_credits_btns.png', UTIL.MM_LOADBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 770, 110);
        }, this);        
        rem.addResource(new UTIL.Resource('mmControlesButton', 'assets/res/main-menu/mm_controles_btns.png', UTIL.MM_HELPBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 770, 110);
        }, this);
        // -------------------------------------END MAIN MENU

        // -------------------------------------OPTIONS MENU RESOURCES
        rem.addResource(new UTIL.Resource('omBackground', 'assets/res/options-menu/om_background.png', UTIL.OM_BACKGROUND_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('omOkButton', 'assets/res/options-menu/om_ok_btns.png', UTIL.OM_OKBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 770, 110);
        }, this);        
        // --------------------------------------END OPTIONS MENU

        // ---------------------------------------HELP MENU RESOURCES
        rem.addResource(new UTIL.Resource('hmBackground', 'assets/res/help-menu/hm_background.png', UTIL.HM_BACKGROUND_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('hmOkButton', 'assets/res/help-menu/hm_ok_btns.png', UTIL.HM_OKBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 150, 80);
        }, this);
        // ----------------------------------------END HELP MENU RESOURCES

        // ----------------------------------------TOWN RESOURCES        
        rem.addResource(new UTIL.Resource('town', 'assets/res/town/town.png', UTIL.TWN_HALL_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 3840, 720);
        }, this);
        // ----------------------------------------TOWN RESOURCES END

        // -----------------------------------------LEVEL s RESOURCES        
        rem.addResource(new UTIL.Resource('level1', 'assets/res/level1-dungeon/level1.json', UTIL.PROTOTYPE_TILEMAP_ID), true, function (e) {
            this.game.load.tilemap(e.key, e.assetUrl, null, Phaser.Tilemap.TILED_JSON);
        }, this);
        rem.addResource(new UTIL.Resource('level2', 'assets/res/level1-dungeon/level2.json', UTIL.PROTOTYPE_TILEMAP_ID), true, function (e) {
            this.game.load.tilemap(e.key, e.assetUrl, null, Phaser.Tilemap.TILED_JSON);
        }, this);
        rem.addResource(new UTIL.Resource('level3', 'assets/res/level1-dungeon/level3.json', UTIL.PROTOTYPE_TILEMAP_ID), true, function (e) {
            this.game.load.tilemap(e.key, e.assetUrl, null, Phaser.Tilemap.TILED_JSON);
        }, this);
        rem.addResource(new UTIL.Resource('grunge_tile', 'assets/res/level1-dungeon/grunge_tile.png', UTIL.PROTOTYPE_TILESET_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('nature', 'assets/res/level1-dungeon/nature.png', UTIL.PROTOTYPE_TILESET_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('castledoors', 'assets/res/level1-dungeon/castledoors.png', UTIL.PROTOTYPE_TILESET_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('dirtdoor', 'assets/res/level1-dungeon/dirtdoor.png', UTIL.PROTOTYPE_TILESET_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('tiled', 'assets/res/level1-dungeon/tiled.png', UTIL.PROTOTYPE_TILESET_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('tempPlayer', 'assets/res/level1-dungeon/WarriorSprite.png', UTIL.HM_OKBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 64, 64);
        }, this);
        rem.addResource(new UTIL.Resource('wave_attk', 'assets/res/level1-dungeon/wave_attk.png', UTIL.HM_OKBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 37, 64);
        }, this);
        rem.addResource(new UTIL.Resource('fire_ball', 'assets/res/level1-dungeon/fire_ball.png', UTIL.HM_OKBUTTON_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 32, 32);
        }, this);
        rem.addResource(new UTIL.Resource('baddie', 'assets/res/level1-dungeon/baddie.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 64, 64);
        }, this);
        rem.addResource(new UTIL.Resource('ogre', 'assets/res/level1-dungeon/ogre.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 96, 96);
        }, this);
        rem.addResource(new UTIL.Resource('ogre_mage', 'assets/res/level1-dungeon/ogre_mage.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 96, 96);
        }, this);
        rem.addResource(new UTIL.Resource('coin', 'assets/res/level1-dungeon/coin.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);

        // -------------------------------------------START SPALSH SCREEN
        rem.addResource(new UTIL.Resource('balanced_logo', 'assets/res/boot/Balanced Logo.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('phaser_logo', 'assets/res/boot/Phaser Logo.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl);
        }, this);
        rem.addResource(new UTIL.Resource('ss_background', 'assets/res/boot/mm_background_only.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 1280, 720);
        }, this);
        // -------------------------------------------END SPALSH SCREEN

        // -------------------------------------------TUTORIAL SCREEN
        rem.addResource(new UTIL.Resource('tut_screen1', 'assets/res/tutorial/tut_screen1.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 1000, 500);
        }, this);
        rem.addResource(new UTIL.Resource('tut_screen2', 'assets/res/tutorial/tut_screen2.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 1000, 500);
        }, this);
        rem.addResource(new UTIL.Resource('tut_screen3', 'assets/res/tutorial/tut_screen3.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 1000, 500);
        }, this);
        rem.addResource(new UTIL.Resource('tut_screen4', 'assets/res/tutorial/tut_screen4.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 1000, 500);
        }, this);
        rem.addResource(new UTIL.Resource('tut_screen5', 'assets/res/tutorial/tut_screen5.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 1000, 500);
        }, this);
        rem.addResource(new UTIL.Resource('tut_screen6', 'assets/res/tutorial/tut_screen6.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 1000, 500);
        }, this);
        rem.addResource(new UTIL.Resource('tut_screen7', 'assets/res/tutorial/tut_screen7.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 1000, 500);
        }, this);
        rem.addResource(new UTIL.Resource('tut_screen8', 'assets/res/tutorial/tut_screen8.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 1000, 500);
        }, this);
        rem.addResource(new UTIL.Resource('tut_screen9', 'assets/res/tutorial/tut_screen9.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 1000, 500);
        }, this);
        rem.addResource(new UTIL.Resource('tut_no_btn', 'assets/res/tutorial/tut_no_btn.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 200, 50);
        }, this);
        rem.addResource(new UTIL.Resource('tut_yes_btn', 'assets/res/tutorial/tut_yes_btn.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 200, 50);
        }, this);
        rem.addResource(new UTIL.Resource('tut_background', 'assets/res/tutorial/tut_background.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 350, 200);
        }, this);
        rem.addResource(new UTIL.Resource('confirm_background', 'assets/res/tutorial/confirm_background.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 350, 200);
        }, this);
        // -------------------------------------------END TUTORIAL SCREEN

        // -------------------------------------------PAUSE MENU
        rem.addResource(new UTIL.Resource('pm_background', 'assets/res/pause-menu/pm_background.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.image(e.key, e.assetUrl, 350, 350);
        }, this);
        rem.addResource(new UTIL.Resource('pm_help_btn', 'assets/res/pause-menu/pm_help_btn.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 200, 50);
        }, this);
        rem.addResource(new UTIL.Resource('pm_mainmenu_btn', 'assets/res/pause-menu/pm_mainmenu_btn.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 200, 50);
        }, this);
        rem.addResource(new UTIL.Resource('pm_options_btn', 'assets/res/pause-menu/pm_options_btn.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 200, 50);
        }, this);
        rem.addResource(new UTIL.Resource('pm_resume_btn', 'assets/res/pause-menu/pm_resume_btn.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 200, 50);
        }, this);
        // -------------------------------------------END PAUSE MENU

        // -------------------------------------------DUNGEON TUTORIAL SCREEN
        rem.addResource(new UTIL.Resource('tutorial', 'assets/res/level1-dungeon/tutorial.json', UTIL.PROTOTYPE_TILEMAP_ID), true, function (e) {
            this.game.load.tilemap(e.key, e.assetUrl, null, Phaser.Tilemap.TILED_JSON);
        }, this);
        // -------------------------------------------END DUNGEON TUTORIAL SCREEN

        //volume
        rem.addResource(new UTIL.Resource('sound_btn', 'assets/res/boot/volume_btns.png', UTIL.BADDIE_ID), true, function (e) {
            this.game.load.spritesheet(e.key, e.assetUrl, 50, 50);
        }, this);
        //

    }

    create() {
        this.game.time.advancedTiming = true;       

        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 300, 'Loading....', { fill: '#ffffff' });
        text.anchor.setTo(0.5, 0.5);

        this.game.load.onLoadStart.add(function () {
            text.setText("Loading ...");
        }, this);

        this.game.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
            text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
        }, this);

        this.game.load.onLoadComplete.add(function () {

            var DEBUGGING = false;

            text.setText("Load Complete");

            var bg = this.game.add.tileSprite(0, 0, 1280, 720, 'ss_background');

            var phaserLogo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'phaser_logo');
            phaserLogo.anchor.setTo(0.5, 0.5);
            phaserLogo.alpha = 0;

            var balancedLogo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'balanced_logo');
            balancedLogo.anchor.setTo(0.5, 0.5);
            balancedLogo.alpha = 0;

            var t1 = this.game.add.tween(phaserLogo).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, true);


            var t2 = this.game.add.tween(balancedLogo).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, false, 0, 0, true);

            t1.chain(t2);

            if (!DEBUGGING) {
                t1.start();
            } else {
                this.loadingComplete = true;
                bg.destroy(true);
            }

            t2.onComplete.add(function (e) {
                this.loadingComplete = true;
                bg.destroy(true);
            }, this);
        }, this);


    }

    update() {

        if (this.gsm != undefined || this.gsm != null) {
            this.gsm.update();
        }

        if (this.loadingComplete) {
            this.loadingComplete = false;

            this.gsm = new States.GameStateManager(this.game);
            // START STATES
            States.TEST_STATE = new States.TestState(this.gsm);
            States.TEST_STATE2 = new States.TestState2(this.gsm);
            States.MAIN_MENU_STATE = new States.MainMenuState(this.gsm);
            States.OPTIONS_MENU_STATE = new States.OptionsMenuState(this.gsm);
            States.HELP_MENU_STATE = new States.HelpMenuState(this.gsm);
            States.LEVEL1_STATE = new States.Level1State(this.gsm);
            States.LEVEL2_STATE = new States.Level2State(this.gsm);
            States.LEVEL3_STATE = new States.Level3State(this.gsm);
            States.TOWN_STATE = new States.TownState(this.gsm);
            States.DUNGEON_TUTORIAL_STATE = new States.DungeonTutorialState(this.gsm);
            // END STATES
            this.gsm.initState();
        }
    }

    render() {    
    this.game.debug.text(this.game.time.fps + '', 1258, 14, "#00ff00");
        if (this.gsm)
            this.gsm.render();
    }

}
// When the window is loaded completely this will be executed.
window.onload = () => {
    var game = new BalancedGame();
};