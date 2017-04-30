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
var States;
(function (States) {
    /**
     * This class servers as a prototype for what a typical
     * level state can and should look like. All levels that
     * are going to be considered typical should use this.
     * @author Anthony
     */
    var LevelState = (function (_super) {
        __extends(LevelState, _super);
        //-
        function LevelState(gsm) {
            var _this = _super.call(this, gsm) || this;
            _this.generateDefaultKeys();
            _this.defineCustomKeys();
            return _this;
        }
        LevelState.prototype.init = function () {
            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.gsm.game.physics.arcade.gravity.y = 1200;
        };
        LevelState.prototype.startup = function () {
            //player init and init the enemy group
            this.player = new ENTITIES.Player(this.gsm, 4 * 64, 4 * 64, 'tempPlayer');
            this.player.loadEntitySounds(this.gsm.musicBox);
            this.gsm.game.camera.follow(this.player);
            this.player.inputEnabled = true;
            this.enemies = this.gsm.game.add.group();
            //-
            this.bm = new BALANCE.BalanceManager(this.gsm);
            //graphics
            var group = this.gsm.game.add.group();
            this.actionbar = new GUI.ActionBarGraphics(group, this.player);
            this.unitframe = new GUI.HealthAndEnergyGraphics(group, this.player);
            this.bag = new GUI.BagGraphics(group);
            this.charMenu = new GUI.CharGraphics(group, this.player);
            this.pauseMenu = new GUI.PauseMenuGraphics(group);
            this.gsm.getGUIM().addGroup(this.actionbar);
            this.gsm.getGUIM().addGroup(this.unitframe);
            this.gsm.getGUIM().addGroup(this.bag);
            this.gsm.getGUIM().addGroup(this.charMenu);
            this.gsm.getGUIM().addGroup(this.pauseMenu);
            this.actionbar.getBag().onInputDown.add(function (e) {
                this.charMenu.closeMenu();
                this.bag.flipMenu();
            }, this);
            this.actionbar.getStats().onInputDown.add(function () {
                this.bag.closeMenu();
                this.charMenu.flipMenu();
            }, this);
            //-
            this.doKeyLogic();
            return true;
        };
        LevelState.prototype.end = function () {
            this.gsm.game.camera.reset();
            this.player.destroy(true);
            this.enemies.destroy(true);
            return true;
        };
        LevelState.prototype.render = function () {
            var _this = this;
            if (LevelState.DEBUG) {
                this.gsm.game.debug.body(this.player);
                this.gsm.game.debug.bodyInfo(this.player, 100, 110);
                this.enemies.forEachAlive(function (e) { _this.gsm.game.debug.body(e); }, this);
            }
        };
        //does all the keyboard logic setup
        LevelState.prototype.doKeyLogic = function () {
            this.keyboard = this.gsm.game.input.keyboard.createCursorKeys();
            this.gsm.game.input.keyboard.addCallbacks(this, this.onDown, this.onUp, this.onPress);
        };
        LevelState.prototype.onUp = function (e) {
            var _e = e.keyCode;
            var res = this.KeyMatrix[_e];
            if (res !== undefined && res !== null)
                res.onUp.call(res.context, e);
        };
        LevelState.prototype.onDown = function (e) {
            var _e = e.keyCode;
            var res = this.KeyMatrix[_e];
            if (res !== undefined && res !== null)
                res.onDown.call(res.context, e);
        };
        LevelState.prototype.onPress = function (e) {
            var _e = e.keyCode;
            var res = this.KeyMatrix[_e];
            if (res !== undefined && res !== null)
                res.onPress.call(res.context, e);
        };
        //helper to generate the key matrix
        LevelState.prototype.generateDefaultKeys = function () {
            var _this = this;
            this.KeyMatrix = {};
            this.KeyMatrix[Phaser.Keyboard.Q] = {
                key: Phaser.Keyboard.Q, context: this, onDown: function (e) { _this.actionbar.ability1Pressed(); }, onUp: function (e) { _this.actionbar.getAbility1().frame = 0; }
            };
            this.KeyMatrix[Phaser.Keyboard.F] = {
                key: Phaser.Keyboard.F, context: this, onDown: function (e) { _this.enterKeyPressed(); }
            };
            this.KeyMatrix[Phaser.Keyboard.W] = {
                key: Phaser.Keyboard.W, context: this, onDown: function (e) { _this.actionbar.ability2Pressed(); }, onUp: function (e) { _this.actionbar.getAbility2().frame = 0; }
            };
            this.KeyMatrix[Phaser.Keyboard.E] = {
                key: Phaser.Keyboard.E, context: this, onDown: function (e) { _this.actionbar.ability3Pressed(); }, onUp: function (e) { _this.actionbar.getAbility3().frame = 0; }
            };
            this.KeyMatrix[Phaser.Keyboard.R] = {
                key: Phaser.Keyboard.R, context: this, onDown: function (e) { _this.actionbar.ability4Pressed(); }, onUp: function (e) { _this.actionbar.getAbility4().frame = 0; }
            };
            this.KeyMatrix[Phaser.Keyboard.Z] = {
                key: Phaser.Keyboard.Z, context: this, onDown: function (e) { _this.actionbar.potion1Pressed(); }, onUp: function (e) { _this.actionbar.getPotion1().frame = 0; }
            };
            this.KeyMatrix[Phaser.Keyboard.X] = {
                key: Phaser.Keyboard.X, context: this, onDown: function (e) { _this.actionbar.potion2Pressed(); }, onUp: function (e) { _this.actionbar.getPotion2().frame = 0; }
            };
            this.KeyMatrix[Phaser.Keyboard.I] = {
                key: Phaser.Keyboard.I, context: this, onDown: function (e) {
                    _this.actionbar.getBag().frame = 1;
                    _this.charMenu.closeMenu();
                    _this.bag.flipMenu();
                }, onUp: function (e) { _this.actionbar.getBag().frame = 0; }
            };
            this.KeyMatrix[Phaser.Keyboard.H] = {
                key: Phaser.Keyboard.H, context: this, onDown: function (e) {
                    _this.actionbar.getTown().frame = 0;
                    _this.gsm.setState(States.TOWN_STATE);
                }, onUp: function (e) { _this.actionbar.getTown().frame = 1; }
            };
            this.KeyMatrix[Phaser.Keyboard.C] = {
                key: Phaser.Keyboard.C, context: this, onDown: function (e) {
                    _this.actionbar.getStats().frame = 1;
                    _this.bag.closeMenu();
                    _this.charMenu.flipMenu();
                }, onUp: function (e) { _this.actionbar.getStats().frame = 0; }
            };
            this.KeyMatrix[Phaser.Keyboard.K] = {
                key: Phaser.Keyboard.K, context: this, onDown: function (e) {
                    _this.player.healEntity(50, false);
                }
            };
            this.KeyMatrix[Phaser.Keyboard.J] = {
                key: Phaser.Keyboard.J, context: this, onDown: function (e) {
                    _this.player.dealDamage(5, false, "red", true, false);
                }
            };
            this.KeyMatrix[Phaser.Keyboard.M] = {
                key: Phaser.Keyboard.M, context: this, onDown: function (e) {
                    _this.player.getAbilityManager().getEnergyManager().regenEnergy(5);
                }
            };
            this.KeyMatrix[Phaser.Keyboard.N] = {
                key: Phaser.Keyboard.N, context: this, onDown: function (e) {
                    _this.player.getAbilityManager().getEnergyManager().useAbility(5);
                }
            };
            this.KeyMatrix[Phaser.Keyboard.ESC] = {
                key: Phaser.Keyboard.ESC, context: this, onUp: function (e) {
                    _this.pauseMenu.togglePauseMenuDialog();
                }
            };
            this.KeyMatrix[Phaser.Keyboard.O] = {
                key: Phaser.Keyboard.O, context: this, onUp: function (e) {
                    _this.player.invincible = _this.player.invincible ? false : true;
                }
            };
            this.KeyMatrix[Phaser.Keyboard.V] = {
                key: Phaser.Keyboard.V, context: this, onUp: function (e) {
                    _this.gsm.setState(States.LEVEL1_STATE);
                }
            };
            this.KeyMatrix[Phaser.Keyboard.B] = {
                key: Phaser.Keyboard.B, context: this, onUp: function (e) {
                    _this.gsm.setState(States.LEVEL2_STATE);
                }
            };
            this.KeyMatrix[Phaser.Keyboard.G] = {
                key: Phaser.Keyboard.G, context: this, onUp: function (e) {
                    _this.gsm.setState(States.LEVEL3_STATE);
                }
            };
        };
        LevelState.prototype.createFromTiledObject = function (element, group) {
            var sprite = this.gsm.game.add.sprite(element.x, element.y, element.properties.sprite);
            group.add(sprite);
            sprite.anchor.setTo(0, .67);
            //copy all properties to the sprite
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        };
        LevelState.prototype.findObjectsByType = function (type, map, layer) {
            var result = new Array();
            map.objects[layer].forEach(function (element) {
                if (element.properties.type === type) {
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            });
            return result;
        };
        return LevelState;
    }(States.State));
    //debug var; there should only be 1
    LevelState.DEBUG = true;
    States.LevelState = LevelState;
})(States || (States = {}));
//# sourceMappingURL=LevelState.js.map