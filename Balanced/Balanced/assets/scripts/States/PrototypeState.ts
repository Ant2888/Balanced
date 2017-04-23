module States {
    /**
    *This is the prototype state of the game
    *
    * @author Emerson, Anthony
    */
    export class PrototypeState extends State {
        private prototypeActionbar: GUI.ActionBarGraphics;
        private prototypeUnitframe: GUI.HealthAndEnergyGraphics;
        private protoCharMenu: GUI.CharGraphics;
        private protoBag: GUI.BagGraphics;
        private map: Phaser.Tilemap;
        private backgroundlayer: Phaser.TilemapLayer;
        private blockedLayer: Phaser.TilemapLayer;
        private isOnGround: boolean;
        private keyboard: Phaser.CursorKeys;

        private bm: BALANCE.BalanceManager;

        //private playerABM: COMBAT.AbilityManager;
        //private inAnim = false;

        private baddies: Phaser.Group;

        //private playerHitBoolean: boolean = false;
        //private isPlayerDead: boolean = true;
        //private playerTakenDamageTimer: Phaser.Timer;

        //test player
        private player: ENTITIES.Player;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
            this.isOnGround = this.gsm.game.physics.arcade.collide(this.player, this.blockedLayer);
            this.gsm.game.physics.arcade.collide(this.baddies, this.blockedLayer);

            //this.gsm.game.physics.arcade.collide(this.baddies, this.player);
            this.gsm.game.physics.arcade.overlap(this.player, this.baddies, this.playerHit, null, this);

            this.setupKeybinds(this);

            if (this.player.body.onFloor())
                this.player.isJumping = false;

            if (!this.player.alive)
                return;
            
            if (this.keyboard.up.isDown && this.isOnGround) {
                this.player.jump(-350);
                this.player.isJumping = true;
            }
            if (this.keyboard.left.isDown) {
                //Move to the left
                this.player.walk(-250);
            } else if (this.keyboard.right.isDown) {
                //Move to the right
                this.player.walk(250);
            } else {
                this.player.walk(0);
            }
        }

        public init(): void {
            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
        }

        public startup(): boolean {
            console.log("prototype Level Started.");

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

            this.player = new ENTITIES.Player(this.gsm, result[0].x, result[0].y, 'tempPlayer');
            
            this.backgroundlayer.resizeWorld();
            this.gsm.game.camera.follow(this.player);

            this.player.inputEnabled = true;
            
            this.createBaddies();

            this.bm = new BALANCE.BalanceManager(this.gsm);

            var group = this.gsm.game.add.group();
            this.prototypeActionbar = new GUI.ActionBarGraphics(group);
            this.prototypeUnitframe = new GUI.HealthAndEnergyGraphics(group, this.player);
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
        }

        public createBaddies() {           
            this.baddies = this.gsm.game.add.group();
            for (var i = 0; i < 5; i++) {
                var baddie = new ENTITIES.Baddie(this.gsm, (i * (800 / 5)), 200, 'baddie');
                baddie.body.gravity.y = 300;
                this.baddies.add(baddie);
            }
        }

        public playerHit(player: Phaser.Sprite, other: Phaser.Sprite | Phaser.Group) {

            //check if the player is attacking
            var boolcurAnim = this.player.animations.currentAnim.name;

            if ((boolcurAnim == ENTITIES.Entity.attackR || boolcurAnim == ENTITIES.Entity.attackL) && !(<ENTITIES.Entity>other).flinching) {
                var damage = Math.floor(Math.random() * (80)) + 1;
                (<ENTITIES.Entity>other).dealDamage(damage, damage >= 55, "yellow", true, true);

                if ((<Phaser.Sprite>other).health <= 0) {
                    (<Phaser.Sprite>other).destroy();
                    var baddie = new ENTITIES.Baddie(this.gsm, (<Phaser.Sprite>other).x + 100, 200, 'baddie');
                    this.gsm.game.physics.arcade.enable(baddie);
                    baddie.body.gravity.y = 300;
                    baddie.body.collideWorldBounds = true;
                    this.baddies.add(baddie);
                }

            }

            //check if the enemy is attacking
            if (this.player.flinching == false && this.player.alive) {
                var damage = Math.floor(Math.random() * (30)) + 1;
                this.player.dealDamage(damage, damage >= 20, "red", true, true, ENTITIES.Entity.FLINCH_TIME,
                    {dx: 100, dy: -40, time: 350});
            }
        }

        public setupKeybinds(data: States.PrototypeState): void {
            this.gsm.game.input.keyboard.onDownCallback = function (e) {

                if (e.keyCode == Phaser.Keyboard.Q) {
                    data.prototypeActionbar.getAbility1().frame = 1;

                    if (data.player.facingLeft)
                        data.player.playAnimState(ENTITIES.Entity.attackL, 11, false, false);
                    else
                        data.player.playAnimState(ENTITIES.Entity.attackR, 11, false, false);
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
                    data.player.healEntity(25, false);
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
            }

            this.gsm.game.input.keyboard.onUpCallback = function (e) {

                if (e.keyCode == Phaser.Keyboard.Q) {
                    data.prototypeActionbar.getAbility1().frame = 0;

                }

                if (e.keyCode == Phaser.Keyboard.W) {
                    data.bm.dispatchEvent(new BALANCE.TestEvent(data.gsm), data.player);
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
            }
        }

        public findObjectsByType(type, map, layer) {
            var result = new Array();
            map.objects[layer].forEach(function (element) {
                if (element.properties.type === type) {
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            });
            return result;
        }

        public end(): boolean {
            return true;
        }

        public getType(): any {
            return this;
        }
    }
}