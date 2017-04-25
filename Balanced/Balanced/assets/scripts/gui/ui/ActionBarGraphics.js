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
        function ActionBarGraphics(group) {
            return _super.call(this, 203, group) || this;
        }
        ActionBarGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
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
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        ActionBarGraphics.prototype.bagPressed = function () {
            console.log('bag button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        ActionBarGraphics.prototype.townPressed = function () {
            console.log('town button was pressed');
            this.gsm.setState(States.TOWN_STATE);
        };
        ActionBarGraphics.prototype.potion1Pressed = function (ply) {
            if (!ply.alive)
                return false;
            if (this.remTimer != 0)
                return false;
            this.getPotion1().frame = 1;
            ply.getAbilityManager().attemptCast(ENTITIES.Player.POTION_ONE);
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
            console.log('potion2 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
            return true;
        };
        ActionBarGraphics.prototype.ability1Pressed = function (ply) {
            this.getAbility1().frame = 1;
            return ply.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_ONE);
        };
        ActionBarGraphics.prototype.ability2Pressed = function (ply) {
            this.getAbility2().frame = 1;
            return ply.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_TWO);
        };
        ActionBarGraphics.prototype.ability3Pressed = function (ply) {
            this.getAbility3().frame = 1;
            return ply.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_THREE);
        };
        ActionBarGraphics.prototype.ability4Pressed = function (ply) {
            this.getAbility4().frame = 1;
            return ply.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_FOUR);
        };
        return ActionBarGraphics;
    }(GUI.GameObject));
    GUI.ActionBarGraphics = ActionBarGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=ActionBarGraphics.js.map