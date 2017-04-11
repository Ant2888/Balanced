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
    *This is the prototype state of the game
    *
    * @author Emerson, Anthony
    */
    var PrototypeState = (function (_super) {
        __extends(PrototypeState, _super);
        function PrototypeState(gsm) {
            var _this = _super.call(this, gsm) || this;
            _this.inAnim = false;
            _this.playerHitBoolean = false;
            _this.isPlayerDead = true;
            _this.justHit = false;
            return _this;
        }
        PrototypeState.prototype.update = function () {
            this.isOnGround = this.gsm.game.physics.arcade.collide(this.player, this.blockedLayer);
            this.gsm.game.physics.arcade.collide(this.baddies, this.blockedLayer);
            //this.gsm.game.physics.arcade.collide(this.baddies, this.player);
            this.gsm.game.physics.arcade.overlap(this.player, this.baddies, this.playerHit, null, this);
            if (this.prototypeUnitframe.hb_tickAmount <= 0 && this.isPlayerDead == true) {
                this.player.animations.play('playerDied');
                this.player.body.velocity.x = 0;
                this.isPlayerDead = false;
            }
            this.setupKeybinds(this);
            if (this.inAnim)
                return;
            if (this.isPlayerDead == true) {
                if (this.keyboard.up.isDown && this.isOnGround) {
                    this.player.body.velocity.y = -350;
                    this.player.frame = 261;
                }
                if (this.keyboard.left.isDown) {
                    //Move to the left
                    this.player.body.velocity.x = -250;
                    this.player.animations.play('walkLeft');
                }
                else if (this.keyboard.right.isDown) {
                    //Move to the right
                    this.player.body.velocity.x = 250;
                    this.player.animations.play('walkRight');
                }
                else if (this.prototypeUnitframe.hb_tickAmount > 0) {
                    if (this.isOnGround) {
                        this.player.animations.play("idel");
                        this.player.body.velocity.x = 0;
                    }
                    else {
                        this.player.animations.stop();
                    }
                }
            }
        };
        PrototypeState.prototype.init = function () {
            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
        };
        PrototypeState.prototype.startup = function () {
            console.log("prototype Level Started.");
            this.playerTakenDamageTimer = this.gsm.game.time.create(false);
            this.btime = this.gsm.game.time.create(false);
            // setup the tilemap
            this.keyboard = this.gsm.game.input.keyboard.createCursorKeys();
            this.map = this.gsm.game.add.tilemap('level1');
            this.map.addTilesetImage('dun', 'gameTiles');
            // create layer
            this.backgroundlayer = this.map.createLayer('background');
            this.blockedLayer = this.map.createLayer('floor');
            // collision on blockedLayer
            this.map.setCollisionBetween(1, 10000, true, 'floor');
            // this is just a demo player not where he will be created just used for testing.
            var result = this.findObjectsByType('playerStart', this.map, 'Object Layer');
            this.player = this.gsm.game.add.sprite(result[0].x, result[0].y, 'tempPlayer');
            this.player.anchor.setTo(0.5, 0.5);
            this.player.frame = 131;
            this.gsm.game.physics.arcade.enable(this.player);
            this.player.body.gravity.y = 500;
            this.player.body.collideWorldBounds = true;
            this.backgroundlayer.resizeWorld();
            this.gsm.game.camera.follow(this.player);
            this.createAnimations();
            this.player.inputEnabled = true;
            this.player.events.onInputDown.add(function () {
                console.log("CLICKING!");
                var damage = Math.floor(Math.random() * (99)) + 1;
                new FloatingText(this.gsm.game, {
                    text: "" + damage,
                    animation: this.getRandomEffect(),
                    textOptions: {
                        fontSize: 32,
                        fill: "#FFFFFF",
                        stroke: "#000000",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 200,
                        font: "Papyrus"
                    },
                    x: this.player.x,
                    y: this.player.y,
                    timeToLive: 300,
                });
            }, this);
            // end player
            this.createBaddies();
            var group = this.gsm.game.add.group();
            this.prototypeActionbar = new GUI.ActionBarGraphics(group);
            this.prototypeUnitframe = new GUI.HealthAndEnergyGraphics(group, new ENTITIES.Player(this.gsm, 250, 250, 'tempPlayer'));
            this.protoBag = new GUI.BagGraphics(group);
            this.protoCharMenu = new GUI.CharGraphics(group);
            this.gsm.getGUIM().addGroup(this.protoBag);
            this.gsm.getGUIM().addGroup(this.prototypeActionbar);
            this.gsm.getGUIM().addGroup(this.prototypeUnitframe);
            this.gsm.getGUIM().addGroup(this.protoCharMenu);
            this.prototypeActionbar.getBag().onInputDown.add(function (e) {
                this.protoCharMenu.closeMenu();
                this.protoBag.flipMenu();
            }, this);
            this.prototypeActionbar.getStats().onInputDown.add(function () {
                this.protoBag.closeMenu();
                this.protoCharMenu.flipMenu();
            }, this);
            this.setupKeybinds(this);
            return true;
        };
        PrototypeState.prototype.createBaddies = function () {
            this.baddies = this.gsm.game.add.group();
            for (var i = 0; i < 5; i++) {
                var baddie = this.gsm.game.add.sprite(i * (800 / 5), 200, 'baddie');
                this.gsm.game.physics.arcade.enable(baddie);
                baddie.body.gravity.y = 300;
                baddie.body.collideWorldBounds = true;
                baddie.health = 100;
                this.baddies.add(baddie);
            }
        };
        PrototypeState.prototype.playerHit = function (player, other) {
            if (this.inAnim && !this.justHit) {
                var damage = Math.floor(Math.random() * (80)) + 1;
                other.damage(damage);
                new FloatingText(this.gsm.game, {
                    easing: Phaser.Easing.Sinusoidal.Out,
                    text: "" + (damage >= 70 ? "CRIT " + damage : damage),
                    animation: damage >= 70 ? "explode" : this.getRandomEffect(),
                    textOptions: {
                        fontSize: 32,
                        fill: "yellow",
                        stroke: "#00000",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 200,
                        font: "Papyrus"
                    },
                    x: other.x,
                    y: other.y,
                    timeToLive: 300
                });
                if (other.health <= 0) {
                    other.destroy();
                    var baddie = this.gsm.game.add.sprite(other.x + 100, 200, 'baddie');
                    this.gsm.game.physics.arcade.enable(baddie);
                    baddie.body.gravity.y = 300;
                    baddie.body.collideWorldBounds = true;
                    baddie.health = 100;
                    this.baddies.add(baddie);
                }
                this.justHit = true;
                this.btime.loop(1000, function () {
                    this.justHit = false;
                    this.btime.stop();
                }, this);
                this.btime.start();
            }
            if (this.playerHitBoolean == false && this.isPlayerDead == true) {
                this.playerHitBoolean = true;
                var damage = Math.floor(Math.random() * (30)) + 1;
                this.prototypeUnitframe.loseHealth(damage);
                new FloatingText(this.gsm.game, {
                    easing: Phaser.Easing.Sinusoidal.Out,
                    text: "" + (damage >= 25 ? "CRIT " + damage : damage),
                    animation: damage >= 25 ? "explode" : this.getRandomEffect(),
                    textOptions: {
                        fontSize: 32,
                        fill: "#FF0000",
                        stroke: "#00000",
                        strokeThickness: 1,
                        wordWrap: true,
                        wordWrapWidth: 200,
                        font: "Papyrus"
                    },
                    x: this.player.x,
                    y: this.player.y,
                    timeToLive: 300
                });
                this.playerTakenDamageTimer.loop(1000, function () {
                    this.playerHitBoolean = false;
                    this.playerTakenDamageTimer.stop();
                }, this);
                this.playerTakenDamageTimer.start();
            }
        };
        PrototypeState.prototype.createAnimations = function () {
            this.player.animations.add('walkLeft', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, false);
            this.player.animations.add('walkRight', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, false);
            this.player.animations.add('playerDied', [260, 261, 262, 263, 264], 6, false);
            this.player.animations.add('idel', [26, 32], 4, true);
            this.player.animations.add('attackRight', [195, 196, 197, 198, 199, 200, 199, 198, 197, 196, 195], 11, false);
            this.player.animations.add('attackLeft', [169, 170, 171, 172, 173, 174, 173, 172, 171, 170, 169], 11, false);
        };
        PrototypeState.prototype.setupKeybinds = function (data) {
            this.gsm.game.input.keyboard.onDownCallback = function (e) {
                if (e.keyCode == Phaser.Keyboard.Q) {
                    data.prototypeActionbar.getAbility1().frame = 1;
                    if (data.player.animations.currentAnim.name == 'walkLeft')
                        data.playAnimState(data.player, 'attackLeft', false, false);
                    if (data.player.animations.currentAnim.name == 'walkRight')
                        data.playAnimState(data.player, 'attackRight', false, false);
                    if (data.player.animations.currentAnim.name == 'idel')
                        data.playAnimState(data.player, 'attackRight', false, false);
                }
                if (e.keyCode == Phaser.Keyboard.W) {
                    data.prototypeActionbar.getAbility2().frame = 1;
                }
                if (e.keyCode == Phaser.Keyboard.E) {
                    data.prototypeActionbar.getAbility3().frame = 1;
                }
                if (e.keyCode == Phaser.Keyboard.R) {
                    data.prototypeActionbar.getAbility4().frame = 1;
                }
                if (e.keyCode == Phaser.Keyboard.Z) {
                    data.prototypeActionbar.getPotion1().frame = 1;
                    data.prototypeUnitframe.gainHealth(25);
                    new FloatingText(data.gsm.game, {
                        text: "" + 25,
                        animation: data.getRandomEffect(),
                        textOptions: {
                            fontSize: 32,
                            fill: "#228B22",
                            stroke: "#000000",
                            strokeThickness: 1,
                            wordWrap: true,
                            wordWrapWidth: 200,
                            font: "Papyrus"
                        },
                        x: data.player.x,
                        y: data.player.y,
                        timeToLive: 300
                    });
                }
                if (e.keyCode == Phaser.Keyboard.X) {
                    data.prototypeActionbar.getPotion2().frame = 1;
                }
                if (e.keyCode == Phaser.Keyboard.I) {
                    data.prototypeActionbar.getBag().frame = 1;
                    data.protoCharMenu.closeMenu();
                    data.protoBag.flipMenu();
                }
                if (e.keyCode == Phaser.Keyboard.H) {
                    data.prototypeActionbar.getTown().frame = 1;
                }
                if (e.keyCode == Phaser.Keyboard.C) {
                    data.prototypeActionbar.getStats().frame = 1;
                    data.protoBag.closeMenu();
                    data.protoCharMenu.flipMenu();
                }
                if (e.keyCode == Phaser.Keyboard.K) {
                    data.prototypeUnitframe.gainHealth(50);
                    data.isPlayerDead = true;
                    new FloatingText(data.gsm.game, {
                        text: "" + 50,
                        animation: data.getRandomEffect(),
                        textOptions: {
                            fontSize: 32,
                            fill: "#228B22",
                            stroke: "#000000",
                            strokeThickness: 1,
                            wordWrap: true,
                            wordWrapWidth: 200,
                            font: "Papyrus"
                        },
                        x: data.player.x,
                        y: data.player.y,
                        timeToLive: 300
                    });
                }
                if (e.keyCode == Phaser.Keyboard.J) {
                    data.prototypeUnitframe.loseHealth(5);
                    new FloatingText(data.gsm.game, {
                        text: "" + 5,
                        animation: data.getRandomEffect(),
                        textOptions: {
                            fontSize: 32,
                            fill: "#FF0000",
                            stroke: "#000000",
                            strokeThickness: 1,
                            wordWrap: true,
                            wordWrapWidth: 200,
                            font: "Papyrus"
                        },
                        x: data.player.x,
                        y: data.player.y,
                        timeToLive: 300
                    });
                }
                if (e.keyCode == Phaser.Keyboard.M) {
                    data.prototypeUnitframe.gainEnergy(5);
                    new FloatingText(data.gsm.game, {
                        text: "+" + 5 + " Energy",
                        animation: data.getRandomEffect(),
                        textOptions: {
                            fontSize: 32,
                            fill: "blue",
                            stroke: "#000000",
                            strokeThickness: 1,
                            wordWrap: true,
                            wordWrapWidth: 200,
                            font: "Papyrus"
                        },
                        x: data.player.x,
                        y: data.player.y,
                        timeToLive: 300
                    });
                }
                if (e.keyCode == Phaser.Keyboard.N) {
                    data.prototypeUnitframe.loseEnergy(5);
                }
            };
            this.gsm.game.input.keyboard.onUpCallback = function (e) {
                if (e.keyCode == Phaser.Keyboard.Q) {
                    data.prototypeActionbar.getAbility1().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.W) {
                    data.prototypeActionbar.getAbility2().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.E) {
                    data.prototypeActionbar.getAbility3().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.R) {
                    data.prototypeActionbar.getAbility4().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.Z) {
                    data.prototypeActionbar.getPotion1().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.X) {
                    data.prototypeActionbar.getPotion2().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.I) {
                    data.prototypeActionbar.getBag().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.H) {
                    data.prototypeActionbar.getTown().frame = 0;
                }
                if (e.keyCode == Phaser.Keyboard.C) {
                    data.prototypeActionbar.getStats().frame = 0;
                }
            };
        };
        PrototypeState.prototype.findObjectsByType = function (type, map, layer) {
            var result = new Array();
            map.objects[layer].forEach(function (element) {
                if (element.properties.type === type) {
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            });
            return result;
        };
        PrototypeState.prototype.end = function () {
            return true;
        };
        PrototypeState.prototype.getType = function () {
            return this;
        };
        PrototypeState.prototype.getRandomEffect = function () {
            var effectArray = ['smoke', 'physics', 'fade'];
            var randomNumber = Math.floor(Math.random() * effectArray.length) + 1;
            return effectArray[randomNumber];
        };
        PrototypeState.prototype.playAnimState = function (player, animStateIndex, loop, releasable, timeoutPeriod) {
            if (loop === void 0) { loop = false; }
            if (releasable === void 0) { releasable = false; }
            if (timeoutPeriod === void 0) { timeoutPeriod = 1000; }
            if (this.inAnim)
                return;
            player.animations.stop();
            player.animations.play(animStateIndex, 15, loop);
            player.body.velocity.x = 0;
            if (!releasable)
                this.inAnim = true;
            var tf = this.tempFunc.bind(this);
            setTimeout(tf, 500);
        };
        PrototypeState.prototype.tempFunc = function () {
            this.inAnim = false;
        };
        return PrototypeState;
    }(States.State));
    States.PrototypeState = PrototypeState;
})(States || (States = {}));
//# sourceMappingURL=PrototypeState.js.map