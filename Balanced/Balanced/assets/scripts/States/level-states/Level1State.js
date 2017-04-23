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
            this.gsm.game.physics.arcade.collide(this.enemies, this.floorlayer);
            //this.gsm.game.physics.arcade.collide(this.baddies, this.player);
            this.gsm.game.physics.arcade.overlap(this.player, this.enemies, this.playerHit, null, this);
            this.gsm.game.physics.arcade.overlap(this.player.energyWave.bullets, this.enemies, this.player.dealWithOverlap, null, this.player);
            if (this.player.body.onFloor())
                this.player.isJumping = false;
            if (!this.player.alive)
                return;
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
            // collision on blockedLayer           
            this.map.setCollisionBetween(1, 2000, true, 'floors');
            this.createEnemies();
            this.createDoors();
            this.player = new ENTITIES.Player(this.gsm, 4 * 64, 4 * 64, 'tempPlayer');
            this.backgroundlayer.resizeWorld();
            this.gsm.game.camera.follow(this.player);
            this.player.inputEnabled = true;
            this.bm = new BALANCE.BalanceManager(this.gsm);
            var group = this.gsm.game.add.group();
            this.actionbar = new GUI.ActionBarGraphics(group);
            this.unitframe = new GUI.HealthAndEnergyGraphics(group, this.player);
            this.bag = new GUI.BagGraphics(group);
            this.charMenu = new GUI.CharGraphics(group);
            this.gsm.getGUIM().addGroup(this.actionbar);
            this.gsm.getGUIM().addGroup(this.unitframe);
            this.gsm.getGUIM().addGroup(this.bag);
            this.gsm.getGUIM().addGroup(this.charMenu);
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
            this.objectLayer = this.findObjectsByType('door', this.map, 'enemies');
            this.objectLayer.forEach(function (element) {
                this.createFromTiledObject(element, this.doors);
            }, this);
        };
        Level1State.prototype.makeSpriteHealthBar = function (sprite) {
            // This the red background of the healthbar
            var bmd = this.gsm.game.add.bitmapData(sprite.width, 5);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, sprite.width, 5);
            bmd.ctx.fillStyle = 'red';
            bmd.ctx.fill();
            var background = this.gsm.game.add.image(-(sprite.width / 2), -(sprite.height / 2) - 15, bmd);
            sprite.addChildAt(background, 0);
            // This the green background of the healthbar, it will change depending on how much damage is done
            // It is removed in the updateHealthBar function
            var bmd2 = this.gsm.game.add.bitmapData(sprite.width, 5);
            bmd2.ctx.beginPath();
            bmd2.ctx.rect(0, 0, sprite.width, 5);
            bmd2.ctx.fillStyle = 'green';
            bmd2.ctx.fill();
            var health = this.gsm.game.add.image(-(sprite.width / 2), -(sprite.height / 2) - 15, bmd2);
            sprite.addChildAt(health, 1);
        };
        Level1State.prototype.updateHealthBar = function (sprite) {
            // remove the old green layer to be replaced
            sprite.removeChildAt(1);
            // rebuild the green bar to the health bars width adjusted to the width
            var bmd = this.gsm.game.add.bitmapData((sprite.width / 100) * sprite.health, 5);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, (sprite.width / 100) * sprite.health, 5);
            bmd.ctx.fillStyle = 'green';
            bmd.ctx.fill();
            var health = this.gsm.game.add.image(-(sprite.width / 2), -(sprite.height / 2) - 15, bmd);
            sprite.addChildAt(health, 1);
        };
        Level1State.prototype.playerHit = function (player, other) {
            //check if the player is attacking
            var boolcurAnim = this.player.animations.currentAnim.name;
            if ((boolcurAnim == ENTITIES.Entity.attackR || boolcurAnim == ENTITIES.Entity.attackL) && !other.flinching) {
                var damage = Math.floor(Math.random() * (80)) + 1;
                other.dealDamage(damage, damage >= 55, "yellow", true, true);
                this.updateHealthBar(other);
                if (other.health <= 0) {
                    other.destroy();
                    var baddie = new ENTITIES.Baddie(this.gsm, other.x, other.y - 100, 'baddie');
                    this.makeSpriteHealthBar(baddie);
                    this.gsm.game.physics.arcade.enable(baddie);
                    baddie.body.gravity.y = 300;
                    baddie.body.collideWorldBounds = true;
                    this.enemies.add(baddie);
                }
            }
            //check if the enemy is attacking
            if (this.player.flinching == false && this.player.alive) {
                var damage = Math.floor(Math.random() * (30)) + 1;
                this.player.dealDamage(damage, damage >= 20, "red", true, true, ENTITIES.Entity.FLINCH_TIME);
            }
        };
        Level1State.prototype.setupKeybinds = function (data) {
            this.gsm.game.input.keyboard.onDownCallback = function (e) {
                if (e.keyCode == Phaser.Keyboard.Q) {
                    data.actionbar.ability1Pressed(data.player);
                }
                if (e.keyCode == Phaser.Keyboard.W) {
                    data.actionbar.ability2Pressed(data.player);
                }
                if (e.keyCode == Phaser.Keyboard.E) {
                    data.actionbar.ability3Pressed(data.player);
                }
                if (e.keyCode == Phaser.Keyboard.R) {
                    data.actionbar.ability4Pressed(data.player);
                }
                if (e.keyCode == Phaser.Keyboard.Z) {
                    data.actionbar.potion1Pressed(data.player);
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
        Level1State.prototype.placeEnemies = function (element, group) {
            var baddie = new ENTITIES.Baddie(this.gsm, element.x, element.y, 'baddie');
            this.makeSpriteHealthBar(baddie);
            this.gsm.game.physics.arcade.enable(baddie);
            baddie.body.collideWorldBounds = true;
            this.enemies.add(baddie);
        };
        Level1State.prototype.createFromTiledObject = function (element, group) {
            console.log(element.x + '   ' + element.y);
            var sprite = group.create(element.x, element.y, element.properties.sprite);
            sprite.anchor.setTo(0, .67);
            //copy all properties to the sprite
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        };
        Level1State.prototype.end = function () {
            this.gsm.game.camera.reset();
            this.player.destroy();
            this.enemies.destroy(true);
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