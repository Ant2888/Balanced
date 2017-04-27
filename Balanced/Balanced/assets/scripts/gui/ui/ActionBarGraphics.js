var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GUI;
(function (GUI) {
    /**
    *This is the prototype state of the game
    *
    * @author Emerson, Anthony
    */
    var ActionBarGraphics = (function (_super) {
        __extends(ActionBarGraphics, _super);
        function ActionBarGraphics(group, player) {
            var _this = _super.call(this, 203, group) || this;
            _this.player = player;
            return _this;
        }
        ActionBarGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.player.addOnDeathCallBack(function () {
                this.displayDeathDialog();
            }, this);
            this.ab_bg = gsm.game.add.sprite(gsm.game.width / 2, 630, 'ab_bg');
            this.ab_bg.anchor.setTo(.5, .5);
            this.ab_bg.fixedToCamera = true;
            this.group.add(this.ab_bg);
            // creating all the buttons and setting the callback
            this.setAbility1(this.ability1Pressed);
            this.setAbility2(this.ability2Pressed);
            this.setAbility3(this.ability3Pressed);
            this.setAbility4(this.ability4Pressed);
            this.setPotion1(this.potion1Pressed);
            this.setPotion2(this.potion2Pressed);
            this.setStats(this.statsPressed);
            this.setBag(this.bagPressed);
            this.setTown(this.townPressed);
            this.setOptions(this.optionsPressed);
            this.ab_ab1_text = gsm.game.add.text(470, 662, 'Q', { fontSize: '28px', fill: '#000' });
            this.ab_ab1_text.fixedToCamera = true;
            this.group.add(this.ab_ab1_text);
            this.ab_ab2_text = gsm.game.add.text(550, 662, 'W', { fontSize: '28px', fill: '#000' });
            this.ab_ab2_text.fixedToCamera = true;
            this.group.add(this.ab_ab2_text);
            this.ab_ab3_text = gsm.game.add.text(640, 662, 'E', { fontSize: '28px', fill: '#000' });
            this.ab_ab3_text.fixedToCamera = true;
            this.group.add(this.ab_ab3_text);
            this.ab_ab4_text = gsm.game.add.text(720, 662, 'R', { fontSize: '28px', fill: '#000' });
            this.ab_ab4_text.fixedToCamera = true;
            this.group.add(this.ab_ab4_text);
            this.remTimer = 0;
            this.pot1Timer = this.gsm.game.time.create(false);
            this.remTimer2 = 0;
            this.pot2Timer = this.gsm.game.time.create(false);
        };
        ActionBarGraphics.prototype.setStats = function (func) {
            this.ab_stats_ss = this.gsm.game.add.button(825, 605, 'ab_stats_ss', func, this, 0, 0, 1);
            this.ab_stats_ss.anchor.setTo(.5, .5);
            this.ab_stats_ss.fixedToCamera = true;
            this.group.add(this.ab_stats_ss);
        };
        ActionBarGraphics.prototype.setBag = function (func) {
            this.ab_bag_ss = this.gsm.game.add.button(885, 605, 'ab_bag_ss', func, this, 0, 0, 1);
            this.ab_bag_ss.anchor.setTo(.5, .5);
            this.ab_bag_ss.fixedToCamera = true;
            this.group.add(this.ab_bag_ss);
        };
        ActionBarGraphics.prototype.setTown = function (func) {
            this.ab_town_ss = this.gsm.game.add.button(825, 652, 'ab_town_ss', func, this, 0, 0, 1);
            this.ab_town_ss.anchor.setTo(.5, .5);
            this.ab_town_ss.fixedToCamera = true;
            this.group.add(this.ab_town_ss);
        };
        ActionBarGraphics.prototype.setOptions = function (func) {
            this.ab_options_ss = this.gsm.game.add.button(885, 652, 'ab_options_ss', func, this, 0, 0, 1);
            this.ab_options_ss.anchor.setTo(.5, .5);
            this.ab_options_ss.fixedToCamera = true;
            this.group.add(this.ab_options_ss);
        };
        ActionBarGraphics.prototype.setPotion1 = function (func) {
            this.ab_p1_ss = this.gsm.game.add.button(374, 611, 'ab_p1_ss', func, this, 0, 0, 1);
            this.ab_p1_ss.anchor.setTo(.5, .5);
            this.ab_p1_ss.fixedToCamera = true;
            this.group.add(this.ab_p1_ss);
        };
        ActionBarGraphics.prototype.setPotion2 = function (func) {
            this.ab_p2_ss = this.gsm.game.add.button(415, 649, 'ab_p2_ss', func, this, 0, 0, 1);
            this.ab_p2_ss.anchor.setTo(.5, .5);
            this.ab_p2_ss.fixedToCamera = true;
            this.group.add(this.ab_p2_ss);
        };
        ActionBarGraphics.prototype.setAbility1 = function (func) {
            this.ab_ab1_ss = this.gsm.game.add.button(482, 630, 'ab_ab1_ss', func, this, 0, 0, 1);
            this.ab_ab1_ss.anchor.setTo(.5, .5);
            this.ab_ab1_ss.fixedToCamera = true;
            this.group.add(this.ab_ab1_ss);
        };
        ActionBarGraphics.prototype.setAbility2 = function (func) {
            this.ab_ab2_ss = this.gsm.game.add.button(565, 630, 'ab_ab2_ss', func, this, 0, 0, 1);
            this.ab_ab2_ss.anchor.setTo(.5, .5);
            this.ab_ab2_ss.fixedToCamera = true;
            this.group.add(this.ab_ab2_ss);
        };
        ActionBarGraphics.prototype.setAbility3 = function (func) {
            this.ab_ab3_ss = this.gsm.game.add.button(648, 630, 'ab_ab3_ss', func, this, 0, 0, 1);
            this.ab_ab3_ss.anchor.setTo(.5, .5);
            this.ab_ab3_ss.fixedToCamera = true;
            this.group.add(this.ab_ab3_ss);
        };
        ActionBarGraphics.prototype.setAbility4 = function (func) {
            this.ab_ab4_ss = this.gsm.game.add.button(731, 630, 'ab_ab4_ss', func, this, 0, 0, 1);
            this.ab_ab4_ss.anchor.setTo(.5, .5);
            this.ab_ab4_ss.fixedToCamera = true;
            this.group.add(this.ab_ab4_ss);
        };
        ActionBarGraphics.prototype.displayDeathDialog = function () {
            this.dd_background = this.gsm.game.add.sprite(this.gsm.game.width / 2, this.gsm.game.height / 2, 'dd_background');
            this.dd_background.anchor.setTo(.5, .5);
            this.dd_background.fixedToCamera = true;
            this.group.add(this.dd_background);
            this.dd_menu_btn = this.gsm.game.add.button((this.gsm.game.width / 2) + 50, (this.gsm.game.height / 2) + 50, 'dd_menu_btn', function () {
                this.gsm.setState(States.MAIN_MENU_STATE);
            }, this, 1, 0, 2);
            this.dd_menu_btn.anchor.setTo(.5, .5);
            this.dd_menu_btn.fixedToCamera = true;
            this.group.add(this.dd_menu_btn);
            this.dd_twn_btn = this.gsm.game.add.button((this.gsm.game.width / 2) + 200, (this.gsm.game.height / 2) + 50, 'dd_twn_btn', function () {
                this.gsm.setState(States.TOWN_STATE);
            }, this, 1, 0, 2);
            this.dd_twn_btn.anchor.setTo(.5, .5);
            this.dd_twn_btn.fixedToCamera = true;
            this.group.add(this.dd_twn_btn);
        };
        ActionBarGraphics.prototype.getStats = function () {
            return this.ab_stats_ss;
        };
        ActionBarGraphics.prototype.getBag = function () {
            return this.ab_bag_ss;
        };
        ActionBarGraphics.prototype.getTown = function () {
            return this.ab_town_ss;
        };
        ActionBarGraphics.prototype.getPotion1 = function () {
            return this.ab_p1_ss;
        };
        ActionBarGraphics.prototype.getPotion2 = function () {
            return this.ab_p2_ss;
        };
        ActionBarGraphics.prototype.getAbility1 = function () {
            return this.ab_ab1_ss;
        };
        ActionBarGraphics.prototype.getAbility2 = function () {
            return this.ab_ab2_ss;
        };
        ActionBarGraphics.prototype.getAbility3 = function () {
            return this.ab_ab3_ss;
        };
        ActionBarGraphics.prototype.getAbility4 = function () {
            return this.ab_ab4_ss;
        };
        ActionBarGraphics.prototype.statsPressed = function () {
            console.log('stats button was pressed');
        };
        ActionBarGraphics.prototype.bagPressed = function () {
            console.log('bag button was pressed');
        };
        ActionBarGraphics.prototype.townPressed = function () {
            console.log('town button was pressed');
            this.gsm.setState(States.TOWN_STATE);
        };
        ActionBarGraphics.prototype.optionsPressed = function () {
            console.log('pause menu button was pressed');
        };
        ActionBarGraphics.prototype.potion1Pressed = function () {
            if (!this.player.alive)
                return false;
            if (this.remTimer != 0)
                return false;
            this.getPotion1().frame = 1;
            this.player.getAbilityManager().attemptCast(ENTITIES.Player.POTION_ONE);
            this.remTimer = 10000;
            this.textHolder = this.gsm.game.add.text(362, 600, '10.0', { fill: 'white', font: 'papyrus', fontSize: '16px', fontStyle: 'bold' });
            this.textHolder.fixedToCamera = true;
            this.pot1Timer.loop(50, function () {
                if (this.remTimer <= 0) {
                    this.remTimer = 0;
                    this.textHolder.destroy();
                    this.pot1Timer.stop();
                }
                else {
                    var disp = this.remTimer / 1000;
                    disp *= 10;
                    disp = Math.floor(disp); //simple XX.X format
                    disp /= 10;
                    this.textHolder.text = (disp + '');
                    this.remTimer -= 50;
                }
            }, this);
            this.pot1Timer.start();
            return true;
        };
        ActionBarGraphics.prototype.potion2Pressed = function () {
            if (!this.player.alive)
                return false;
            if (this.remTimer2 != 0)
                return false;
            this.getPotion2().frame = 1;
            this.player.getAbilityManager().attemptCast(ENTITIES.Player.POTION_TWO);
            this.remTimer2 = 10000;
            this.textHolder2 = this.gsm.game.add.text(402, 635, '10.0', { fill: 'white', font: 'papyrus', fontSize: '16px', fontStyle: 'bold' });
            this.textHolder2.fixedToCamera = true;
            this.pot2Timer.loop(50, function () {
                if (this.remTimer2 <= 0) {
                    this.remTimer2 = 0;
                    this.textHolder2.destroy();
                    this.pot2Timer.stop();
                }
                else {
                    var disp = this.remTimer2 / 1000;
                    disp *= 10;
                    disp = Math.floor(disp); //simple XX.X format
                    disp /= 10;
                    this.textHolder2.text = (disp + '');
                    this.remTimer2 -= 50;
                }
            }, this);
            this.pot2Timer.start();
            return true;
        };
        ActionBarGraphics.prototype.ability1Pressed = function () {
            this.getAbility1().frame = 1;
            return this.player.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_ONE);
        };
        ActionBarGraphics.prototype.ability2Pressed = function () {
            this.getAbility2().frame = 1;
            return this.player.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_TWO);
        };
        ActionBarGraphics.prototype.ability3Pressed = function () {
            this.getAbility3().frame = 1;
            return this.player.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_THREE);
        };
        ActionBarGraphics.prototype.ability4Pressed = function () {
            this.getAbility4().frame = 1;
            return this.player.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_FOUR);
        };
        return ActionBarGraphics;
    }(GUI.GameObject));
    GUI.ActionBarGraphics = ActionBarGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=ActionBarGraphics.js.map