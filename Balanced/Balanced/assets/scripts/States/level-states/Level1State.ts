module States {
    /**
    *This is the level 1 state of the game
    *
    * @author Emerson, Anthony
    */
    export class Level1State extends State {
        private actionbar: GUI.ActionBarGraphics;
        private unitframe: GUI.HealthAndEnergyGraphics;
        private charMenu: GUI.CharGraphics;
        private bag: GUI.BagGraphics;

        private map: Phaser.Tilemap;

        private floorlayer: Phaser.TilemapLayer;
        private starislayer: Phaser.TilemapLayer;
        private wallPaperlayer: Phaser.TilemapLayer;
        private backgroundlayer: Phaser.TilemapLayer;

        private stairOverlap: any;
        private keyboard: Phaser.CursorKeys;

        private doors: Phaser.Group;
        private enemies: Phaser.Group;

        //test player
        private player: ENTITIES.Player;
        private bm: BALANCE.BalanceManager;
        private objectLayer: any;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
            this.gsm.game.physics.arcade.collide(this.player, this.floorlayer);
            this.gsm.game.physics.arcade['TILE_BIAS'] = 40;

            this.gsm.game.physics.arcade.collide(this.enemies, this.floorlayer);
            this.gsm.game.physics.arcade.collide(this.player.energyWave.bullets, this.floorlayer,
                function (e) { e.kill()});

            //this.gsm.game.physics.arcade.collide(this.baddies, this.player);
            this.gsm.game.physics.arcade.overlap(this.player, this.enemies, this.player.dealWithOverlap, null, this.player);
            this.gsm.game.physics.arcade.overlap(this.player.energyWave.bullets,
                this.enemies, this.player.dealWithOverlap, null, this.player);

            if (this.player.body.onFloor())
                this.player.isJumping = false;

            if (!this.player.alive)
                return;

            if (this.player.y >= 1314) {
                this.player.y = 1240;
            }
            
            if (this.stairOverlap != null && !(this.keyboard.down.isDown || this.keyboard.up.isDown || this.keyboard.left.isDown || this.keyboard.right.isDown)) {
                this.player.body.allowGravity = false;
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;


            } else if (this.stairOverlap != null && (this.keyboard.down.isDown || this.keyboard.up.isDown || this.keyboard.left.isDown || this.keyboard.right.isDown)) {
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
            } else if (this.keyboard.right.isDown) {
                //Move to the right
                this.player.walk(250);
            } else {
                this.player.walk(0);
            }

            this.stairOverlap = this.map.getTileWorldXY(this.player.x, this.player.y, this.map.tileWidth, this.map.tileHeight, "stairs");
        }

        public init(): void {
            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.gsm.game.physics.arcade.gravity.y = 1200;
            this.gsm.musicBox.addSound('final_hour', UTIL.MUSIC);
        }

        public startup(): boolean {
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

            // collision on blockedLayer           
            this.map.setCollisionBetween(1, 100, true, 'floors');

            this.createEnemies();
            this.createDoors();

            this.player = new ENTITIES.Player(this.gsm, 4 * 64, 4 * 64, 'tempPlayer');
            this.player.loadEntitySounds(this.gsm.musicBox);
            this.player.addOnDeathCallBack(function () { this.gsm.musicBox.stopByID('final_hour') }, this);

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
        }

        public createEnemies(): void {
            this.enemies = this.gsm.game.add.group();

            this.objectLayer = this.findObjectsByType('enemy', this.map, 'enemies');
            this.objectLayer.forEach(function (element) {
                this.placeEnemies(element, this.enemies);
            }, this);
        }

        public createDoors(): void {
            this.doors = this.gsm.game.add.group();
            this.objectLayer = this.findObjectsByType('door', this.map, 'enemies');

            this.objectLayer.forEach(function (element) {
                this.createFromTiledObject(element, this.doors);
            }, this);
        }

/*
        public playerHit(player: Phaser.Sprite, other: Phaser.Sprite | Phaser.Group): void {

            //check if the player is attacking
            var boolcurAnim = this.player.animations.currentAnim.name;

            if ((boolcurAnim == ENTITIES.Entity.attackR || boolcurAnim == ENTITIES.Entity.attackL) && !(<ENTITIES.Entity>other).flinching) {
                var damage = Math.floor(Math.random() * (80)) + 1;
                (<ENTITIES.Entity>other).dealDamage(damage, damage >= 55, "yellow", true, true);

                if ((<Phaser.Sprite>other).health <= 0) {
                    (<Phaser.Sprite>other).destroy();
                    var baddie = new ENTITIES.Baddie(this.gsm, (<Phaser.Sprite>other).x, (<Phaser.Sprite>other).y - 100, 'baddie');
                    baddie.makeHealthBar();
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
        }
*/
        public setupKeybinds(data: this): void {
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
                    data.actionbar.ability4Pressed(data.player)
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
            }

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
            }
        }

        public findObjectsByType(type, map, layer): any {
            var result = new Array();
            map.objects[layer].forEach(function (element) {
                if (element.properties.type === type) {
                    element.y -= map.tileHeight;
                    result.push(element);
                }
            });
            return result;
        }

        public placeEnemies(element, group): void {
            var baddie = new ENTITIES.Baddie(this.gsm, element.x, element.y, 'baddie');
            baddie.makeHealthBar();

            this.gsm.game.physics.arcade.enable(baddie);
            baddie.body.collideWorldBounds = true;
            this.enemies.add(baddie);
        }

        public createFromTiledObject(element, group): void {
            console.log(element.x + '   ' + element.y);
            var sprite = group.create(element.x, element.y, element.properties.sprite);
            sprite.anchor.setTo(0, .67);
            //copy all properties to the sprite
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        }

        public end(): boolean {
            this.gsm.game.camera.reset();
            this.player.destroy();
            this.enemies.destroy(true);
            this.map.destroy();
            return true;
        }

        public getType(): any {
            return this;
        }
    }
}