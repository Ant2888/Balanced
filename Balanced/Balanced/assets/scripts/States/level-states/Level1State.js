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
    * @author Emerson
    */
    var Level1State = (function (_super) {
        __extends(Level1State, _super);
        function Level1State(gsm) {
            return _super.call(this, gsm) || this;
        }
        Level1State.prototype.update = function () {
            this.gsm.game.physics.arcade.collide(this.player, this.floorlayer);
            this.gsm.game.physics.arcade.collide(this.baddies, this.floorlayer);
            //this.gsm.game.physics.arcade.collide(this.baddies, this.player);
            this.gsm.game.physics.arcade.overlap(this.player, this.baddies, this.playerHit, null, this);
            this.setupKeybinds(this);
            if (!this.player.alive)
                return;
            if (this.keyboard.up.isDown && (this.player.body.onFloor())) {
                this.player.body.velocity.y = -550;
                this.player.frame = 261;
            }
            if (this.keyboard.left.isDown) {
                //Move to the left
                this.player.body.velocity.x = -250;
                this.player.playAnimState('walkLeft', 10, true, true);
            }
            else if (this.keyboard.right.isDown) {
                //Move to the right
                this.player.body.velocity.x = 250;
                this.player.playAnimState('walkRight', 10, true, true);
            }
            else {
                this.player.playAnimState('idel', 4, true, true);
                this.player.body.velocity.x = 0;
            }
        };
        Level1State.prototype.init = function () {
            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.gsm.game.physics.arcade.gravity.y = 1200;
        };
        Level1State.prototype.startup = function () {
            console.log("Level 1 Started.");
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
            this.doorlayer = this.map.createLayer('door');
            // collision on blockedLayer           
            this.map.setCollisionBetween(1, 10000, true, 'floors');
            // this is just a demo player not where he will be created just used for testing.
            // var result = this.findObjectsByType('playerStart', this.map, 'Object Layer');
            this.player = new ENTITIES.Player(this.gsm, 4 * 64, 4 * 64, 'tempPlayer');
            this.player.anchor.setTo(0.5, 0.5);
            this.gsm.game.physics.arcade.enable(this.player);
            this.player.body.collideWorldBounds = true;
            this.backgroundlayer.resizeWorld();
            this.gsm.game.camera.follow(this.player);
            this.createAnimations();
            this.player.inputEnabled = true;
            this.createBaddies();
            var group = this.gsm.game.add.group();
            this.actionbar = new GUI.ActionBarGraphics(group);
            this.unitframe = new GUI.HealthAndEnergyGraphics(group, this.player);
            this.bag = new GUI.BagGraphics(group);
            this.charMenu = new GUI.CharGraphics(group);
            this.gsm.getGUIM().addGroup(this.bag);
            this.gsm.getGUIM().addGroup(this.actionbar);
            this.gsm.getGUIM().addGroup(this.unitframe);
            this.gsm.getGUIM().addGroup(this.charMenu);
            this.actionbar.getBag().onInputDown.add(function (e) {
                this.protoCharMenu.closeMenu();
                this.protoBag.flipMenu();
            }, this);
            this.actionbar.getStats().onInputDown.add(function () {
                this.protoBag.closeMenu();
                this.protoCharMenu.flipMenu();
            }, this);
            this.setupKeybinds(this);
            return true;
        };
        Level1State.prototype.createBaddies = function () {
            this.baddies = this.gsm.game.add.group();
            for (var i = 0; i < 5; i++) {
                var baddie = new ENTITIES.Baddie(this.gsm, (i * (800 / 5)), 200, 'baddie');
                var bmd = this.gsm.game.add.bitmapData(baddie.width, 5);
                // draw to the canvas context like normal
                bmd.ctx.beginPath();
                bmd.ctx.rect(0, 0, baddie.width, 5);
                bmd.ctx.fillStyle = 'green';
                bmd.ctx.fill();
                // use the bitmap data as the texture for the sprite
                var image = this.gsm.game.add.image(0, -10, bmd);
                baddie.addChild(image);
                this.gsm.game.physics.arcade.enable(baddie);
                baddie.body.collideWorldBounds = true;
                this.baddies.add(baddie);
            }
        };
        Level1State.prototype.playerHit = function (player, other) {
            //check if the player is attacking
            var boolcurAnim = this.player.animations.currentAnim.name;
            if ((boolcurAnim == "attackRight" || boolcurAnim == "attackLeft") && !other.flinching) {
                var damage = Math.floor(Math.random() * (80)) + 1;
                other.dealDamage(damage, damage >= 55, "yellow", true, true);
                if (other.health <= 0) {
                    other.destroy();
                    var baddie = new ENTITIES.Baddie(this.gsm, other.x + 100, 200, 'baddie');
                    this.gsm.game.physics.arcade.enable(baddie);
                    baddie.body.collideWorldBounds = true;
                    this.baddies.add(baddie);
                }
            }
            //check if the enemy is attacking
            if (this.player.flinching == false && this.player.alive) {
                var damage = Math.floor(Math.random() * (30)) + 1;
                this.player.dealDamage(damage, damage >= 20, "red", true, true);
            }
        };
        Level1State.prototype.createAnimations = function () {
            this.player.animations.add('walkLeft', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, false);
            this.player.animations.add('walkRight', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, false);
            this.player.animations.add('playerDied', [260, 261, 262, 263, 264], 6, false);
            this.player.animations.add('idel', [26, 32], 4, true);
            this.player.animations.add('attackRight', [195, 196, 197, 198, 199, 200, 199, 198, 197, 196, 195], 11, false);
            this.player.animations.add('attackLeft', [169, 170, 171, 172, 173, 174, 173, 172, 171, 170, 169], 11, false);
        };
        Level1State.prototype.setupKeybinds = function (data) {
            this.gsm.game.input.keyboard.onDownCallback = function (e) {
                if (e.keyCode == Phaser.Keyboard.Q) {
                    data.actionbar.getAbility1().frame = 1;
                    if (data.player.animations.currentAnim.name == 'walkLeft')
                        data.player.playAnimState('attackLeft', 11, false, false);
                    if (data.player.animations.currentAnim.name == 'walkRight')
                        data.player.playAnimState('attackRight', 11, false, false);
                    if (data.player.animations.currentAnim.name == 'idel')
                        data.player.playAnimState('attackLeft', 11, false, false);
                }
                if (e.keyCode == Phaser.Keyboard.W) {
                    data.actionbar.getAbility2().frame = 1;
                }
                if (e.keyCode == Phaser.Keyboard.E) {
                    data.actionbar.getAbility3().frame = 1;
                }
                if (e.keyCode == Phaser.Keyboard.R) {
                    data.actionbar.getAbility4().frame = 1;
                }
                if (e.keyCode == Phaser.Keyboard.Z) {
                    data.actionbar.getPotion1().frame = 1;
                    data.player.healEntity(25, false);
                }
                if (e.keyCode == Phaser.Keyboard.X) {
                    data.actionbar.getPotion2().frame = 1;
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
                if (e.keyCode == Phaser.Keyboard.Q) {
                    data.actionbar.getAbility1().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.W) {
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
                }
                if (e.keyCode == Phaser.Keyboard.C) {
                    data.actionbar.getStats().frame = 0;
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
        Level1State.prototype.end = function () {
            this.player.destroy();
            this.baddies.destroy(true);
            this.map.destroy();
            return true;
        };
        Level1State.prototype.getType = function () {
            return this;
        };
        return Level1State;
    }(States.State));
    States.Level1State = Level1State;
})(States || (States = {}));
//# sourceMappingURL=Level1State.js.map