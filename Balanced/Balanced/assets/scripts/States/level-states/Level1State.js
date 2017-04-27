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
    *This is the level 1 state of the game
    *
    * @author Emerson, Anthony
    */
    var Level1State = (function (_super) {
        __extends(Level1State, _super);
        function Level1State(gsm) {
            return _super.call(this, gsm) || this;
        }
        Level1State.prototype.update = function () {
            this.gsm.game.physics.arcade.collide(this.player, this.floorlayer);
            this.gsm.game.physics.arcade['TILE_BIAS'] = 40;
            this.gsm.game.physics.arcade.collide(this.enemies, this.floorlayer);
            this.gsm.game.physics.arcade.collide(this.player.energyWave.bullets, this.floorlayer, function (e) { e.kill(); });
            //this.gsm.game.physics.arcade.collide(this.baddies, this.player);
            this.gsm.game.physics.arcade.overlap(this.player, this.enemies, this.player.dealWithOverlap, null, this.player);
            this.gsm.game.physics.arcade.overlap(this.player.energyWave.bullets, this.enemies, this.player.dealWithOverlap, null, this.player);
            if (this.player.body.onFloor()) {
                this.player.isJumping = false;
            }
            else {
                this.player.isJumping = true;
            }
            this.enemies.forEachAlive(function (e) {
                var _e = e;
                _e.stateLogic.updateSystem();
            }, this);
            if (!this.player.alive)
                return;
            if (this.player.y >= 1314) {
                this.player.y = 1240;
            }
            if (this.stairOverlap != null && !(this.keyboard.down.isDown || this.keyboard.up.isDown || this.keyboard.left.isDown || this.keyboard.right.isDown)) {
                this.player.body.allowGravity = false;
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
            }
            else if (this.stairOverlap != null && (this.keyboard.down.isDown || this.keyboard.up.isDown || this.keyboard.left.isDown || this.keyboard.right.isDown)) {
                if (this.keyboard.down.isDown) {
                    this.player.jump(450);
                }
                if (this.keyboard.left.isDown) {
                    this.player.walk(-250);
                }
                if (this.keyboard.right.isDown) {
                    this.player.walk(250);
                }
                if (this.keyboard.up.isDown) {
                    this.player.jump(-450);
                }
            }
            if (this.stairOverlap == null) {
                this.player.body.allowGravity = true;
            }
            if (this.keyboard.up.isDown && !this.player.isJumping) {
                this.player.jump(-650);
                this.player.isJumping = true;
            }
            if (this.keyboard.left.isDown) {
                //Move to the left
                this.player.walk(-250);
            }
            else if (this.keyboard.right.isDown) {
                //Move to the right
                this.player.walk(250);
            }
            else {
                this.player.walk(0);
            }
            this.stairOverlap = this.map.getTileWorldXY(this.player.x, this.player.y, this.map.tileWidth, this.map.tileHeight, "stairs");
        };
        Level1State.prototype.init = function () {
            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.gsm.game.physics.arcade.gravity.y = 1200;
            this.gsm.musicBox.addSound('final_hour', UTIL.MUSIC);
        };
        Level1State.prototype.render = function () {
            var _this = this;
            if (Level1State.DEBUG) {
                this.gsm.game.debug.body(this.player);
                this.gsm.game.debug.bodyInfo(this.player, 100, 110);
                this.enemies.forEachAlive(function (e) { _this.gsm.game.debug.body(e); }, this);
            }
        };
        Level1State.prototype.startup = function () {
            this.gsm.musicBox.playByID('final_hour', undefined, undefined, UTIL.MUSIC, true, false);
            // setup the tilemap
            this.keyboard = this.gsm.game.input.keyboard.createCursorKeys();
            this.map = this.gsm.game.add.tilemap('level1');
            this.map.addTilesetImage('grunge_tile', 'grunge_tile');
            this.map.addTilesetImage('castledoors', 'castledoors');
            this.map.addTilesetImage('tiled', 'tiled');
            // create layer
            this.backgroundlayer = this.map.createLayer('background');
            this.wallPaperlayer = this.map.createLayer('wall paper');
            this.starislayer = this.map.createLayer('stairs');
            this.floorlayer = this.map.createLayer('floors');
            this.backgroundlayer.renderSettings.enableScrollDelta = true;
            this.wallPaperlayer.renderSettings.enableScrollDelta = true;
            this.starislayer.renderSettings.enableScrollDelta = true;
            this.floorlayer.renderSettings.enableScrollDelta = true;
            // collision on blockedLayer           
            this.map.setCollisionBetween(1, 100, true, 'floors');
            this.createDoors();
            this.player = new ENTITIES.Player(this.gsm, 4 * 64, 4 * 64, 'tempPlayer');
            this.createEnemies();
            this.player.loadEntitySounds(this.gsm.musicBox);
            this.enemies.getTop().loadEntitySounds(this.gsm.musicBox);
            this.player.addOnDeathCallBack(function () { this.gsm.musicBox.stopByID('final_hour'); }, this);
            this.backgroundlayer.resizeWorld();
            this.gsm.game.camera.follow(this.player);
            this.player.inputEnabled = true;
            this.bm = new BALANCE.BalanceManager(this.gsm);
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
            this.setupKeybinds(this);
            return true;
        };
        Level1State.prototype.createEnemies = function () {
            this.enemies = this.gsm.game.add.group();
            this.objectLayer = this.findObjectsByType('enemy', this.map, 'enemies');
            this.objectLayer.forEach(function (element) {
                this.placeEnemies(element, this.enemies);
            }, this);
        };
        Level1State.prototype.createDoors = function () {
            this.doors = this.gsm.game.add.group();
            this.objectLayer = this.findObjectsByType('door', this.map, 'doors');
            this.objectLayer.forEach(function (element) {
                this.createFromTiledObject(element, this.doors);
            }, this);
        };
        Level1State.prototype.setupKeybinds = function (data) {
            this.gsm.game.input.keyboard.onDownCallback = function (e) {
                if (e.keyCode == Phaser.Keyboard.Q) {
                    data.actionbar.ability1Pressed();
                }
                if (e.keyCode == Phaser.Keyboard.W) {
                    data.actionbar.ability2Pressed();
                }
                if (e.keyCode == Phaser.Keyboard.E) {
                    data.actionbar.ability3Pressed();
                }
                if (e.keyCode == Phaser.Keyboard.R) {
                    data.actionbar.ability4Pressed();
                }
                if (e.keyCode == Phaser.Keyboard.Z) {
                    data.actionbar.potion1Pressed();
                }
                if (e.keyCode == Phaser.Keyboard.X) {
                    data.actionbar.potion2Pressed();
                }
                if (e.keyCode == Phaser.Keyboard.I) {
                    data.actionbar.getBag().frame = 1;
                    data.charMenu.closeMenu();
                    data.bag.flipMenu();
                }
                if (e.keyCode == Phaser.Keyboard.H) {
                    data.actionbar.getTown().frame = 1;
                }
                if (e.keyCode == Phaser.Keyboard.C) {
                    data.actionbar.getStats().frame = 1;
                    data.bag.closeMenu();
                    data.charMenu.flipMenu();
                }
                if (e.keyCode == Phaser.Keyboard.K) {
                    data.player.healEntity(50, false);
                }
                if (e.keyCode == Phaser.Keyboard.J) {
                    data.player.dealDamage(5, false, "red", true, false);
                }
                if (e.keyCode == Phaser.Keyboard.M) {
                    data.player.getAbilityManager().getEnergyManager().regenEnergy(5);
                }
                if (e.keyCode == Phaser.Keyboard.N) {
                    data.player.getAbilityManager().getEnergyManager().useAbility(5);
                }
            };
            this.gsm.game.input.keyboard.onUpCallback = function (e) {
                if (e.keyCode == Phaser.Keyboard.ESC) {
                    data.pauseMenu.togglePauseMenuDialog();
                }
                if (e.keyCode == Phaser.Keyboard.O) {
                    data.player.invincible = data.player.invincible ? false : true;
                }
                if (e.keyCode == Phaser.Keyboard.Q) {
                    data.actionbar.getAbility1().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.W) {
                    //data.bm.dispatchEvent(new BALANCE.TestEvent(data.gsm), data.player);
                    data.actionbar.getAbility2().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.E) {
                    data.actionbar.getAbility3().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.R) {
                    data.actionbar.getAbility4().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.Z) {
                    data.actionbar.getPotion1().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.X) {
                    data.actionbar.getPotion2().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.I) {
                    data.actionbar.getBag().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.H) {
                    data.actionbar.getTown().frame = 0;
                    data.gsm.setState(States.TOWN_STATE);
                }
                if (e.keyCode == Phaser.Keyboard.C) {
                    data.actionbar.getStats().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.V) {
                    data.gsm.setState(States.LEVEL1_STATE);
                }
                if (e.keyCode == Phaser.Keyboard.B) {
                    data.gsm.setState(States.LEVEL2_STATE);
                }
                if (e.keyCode == Phaser.Keyboard.G) {
                    data.gsm.setState(States.LEVEL3_STATE);
                }
            };
        };
        Level1State.prototype.findObjectsByType = function (type, map, layer) {
            var result = new Array();
            map.objects[layer].forEach(function (element) {
                if (element.properties.type === type) {
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            });
            return result;
        };
        Level1State.prototype.placeEnemies = function (element, group) {
            var baddie = new ENTITIES.Ogre(this.gsm, element.x, element.y, this.player, 'ogre');
            baddie.body.bounce.y = .2;
            baddie.makeHealthBar();
            baddie.makeEnergyBar();
            this.gsm.game.physics.arcade.enable(baddie);
            baddie.body.collideWorldBounds = true;
            this.enemies.add(baddie);
        };
        Level1State.prototype.createFromTiledObject = function (element, group) {
            var sprite = group.create(element.x, element.y, element.properties.sprite);
            sprite.anchor.setTo(0, .67);
            //copy all properties to the sprite
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        };
        Level1State.prototype.end = function () {
            this.gsm.musicBox.stopByID('final_hour');
            this.gsm.game.camera.reset();
            this.player.destroy(true);
            this.enemies.destroy(true);
            this.map.destroy();
            this.floorlayer.destroy();
            this.wallPaperlayer.destroy();
            this.backgroundlayer.destroy();
            this.starislayer.destroy();
            return true;
        };
        Level1State.prototype.getType = function () {
            return this;
        };
        return Level1State;
    }(States.State));
    Level1State.DEBUG = true;
    States.Level1State = Level1State;
})(States || (States = {}));
//# sourceMappingURL=Level1State.js.map