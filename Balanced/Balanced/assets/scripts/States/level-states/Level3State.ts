module States {
    /**
    *This is the level 1 state of the game
    *
    * @author Emerson, Anthony
    */
    export class Level3State extends State {
        private actionbar: GUI.ActionBarGraphics;
        private unitframe: GUI.HealthAndEnergyGraphics;
        private charMenu: GUI.CharGraphics;
        private bag: GUI.BagGraphics;
        private dialogs: GUI.DialogGraphics;

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

        public render(): void {
            if (Level1State.DEBUG) {
                this.gsm.game.debug.body(this.player);
                this.gsm.game.debug.bodyInfo(this.player, 100, 110);
                this.enemies.forEachAlive(e => { this.gsm.game.debug.body(e) }, this);
            }
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

           
            if (this.player.body.onFloor()) {
                this.player.isJumping = false;
            } else {
                this.player.isJumping = true;
            }
            
            this.enemies.forEachAlive((e) => {
                var _e = <ENTITIES.Ogre>e;
                _e.stateLogic.updateSystem();
            }, this);

            //find the doors
            var entDoor;

            this.doors.forEach(function (e) {
                entDoor = e;
            }, this);

            //not overlapping doors
            if ((entDoor.lastOverlapped && this.gsm.game.time.now > entDoor.lastOverlapped)) {
                this.player.overHeadText.text = '';
                this.player.overHeadText.clearColors();
            }

            if (!this.player.alive)
                return;

            //check if the doors are around
            this.gsm.game.physics.arcade.overlap(this.player, this.doors, this.doDoorLogic, null, this);

                        
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

        //does door logic stuff
        public doDoorLogic(player: ENTITIES.Player, doors: any | Phaser.Group): void {
            var door = doors;
            if (doors instanceof Phaser.Group) {
                //grab the colliding door
                door = doors.getTop();
            }
            this.doExitLogic(door);
        }

        private doExitLogic(door: any) {
            this.player.overHeadText.clearColors();

            var alive = 0;
            this.enemies.forEachAlive(e => { alive++ }, this);
            if (alive > 0) {
                door.lastOverlapped = this.gsm.game.time.now + 2000;
                this.player.overHeadText.text = ENTITIES.Player.EXIT_DOOR_NF + ' Remaining: ' + alive;
                this.player.overHeadText.addColor('red', ENTITIES.Player.EXIT_NF_COLOR_IND[0]);
                this.player.overHeadText.addColor('red', ENTITIES.Player.EXIT_NF_COLOR_IND[1]);
                this.player.overHeadText.addColor('red', ENTITIES.Player.EXIT_NF_COLOR_IND[2]);
                this.player.overHeadText.addColor('white', ENTITIES.Player.EXIT_NF_COLOR_IND[2] + 1);
                this.player.overHeadText.addColor('red', ENTITIES.Player.EXIT_NF_COLOR_IND2);
            } else {
                door.lastOverlapped = this.gsm.game.time.now + 200;
                this.player.overHeadText.text = ENTITIES.Player.ENTER_DOOR;
                this.player.overHeadText.addColor('yellow', ENTITIES.Player.ENTER_COLOR_IND);
                this.player.overHeadText.addColor('white', ENTITIES.Player.ENTER_COLOR_IND + 1);
            }
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
            this.map = this.gsm.game.add.tilemap('level3');


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

            var exitDoor = this.doors.getBottom();
            var entDoor = this.doors.getTop();
            exitDoor.doorType = 'exit';
            exitDoor.lastOverlapped = 0;
            entDoor.doorType = 'enter';
            entDoor.lastOverlapped = 0;

            this.gsm.game.physics.arcade.enable(exitDoor);
            this.gsm.game.physics.arcade.enable(entDoor);
            exitDoor.enableBody = true;
            entDoor.enableBody = true;
            exitDoor.body.gravity.y = -1200;
            entDoor.body.gravity.y = -1200;

            this.player = new ENTITIES.Player(this.gsm, 12 * 64, 11 * 64, 'tempPlayer');
            this.createEnemies();

            this.player.loadEntitySounds(this.gsm.musicBox);
            this.player.addOnDeathCallBack(function () { this.gsm.musicBox.stopByID('final_hour') }, this);

            this.backgroundlayer.resizeWorld();
            this.gsm.game.camera.follow(this.player);

            this.player.inputEnabled = true;



            this.bm = new BALANCE.BalanceManager(this.gsm);

            var group = this.gsm.game.add.group();
            this.actionbar = new GUI.ActionBarGraphics(group, this.player);
            this.unitframe = new GUI.HealthAndEnergyGraphics(group, this.player);
            this.bag = new GUI.BagGraphics(group, this.player);
            this.charMenu = new GUI.CharGraphics(group, this.player);
            this.dialogs = new GUI.DialogGraphics(group, this.player);

            this.gsm.getGUIM().addGroup(this.actionbar);
            this.gsm.getGUIM().addGroup(this.unitframe);
            this.gsm.getGUIM().addGroup(this.bag);
            this.gsm.getGUIM().addGroup(this.charMenu);
            this.gsm.getGUIM().addGroup(this.dialogs);

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
            this.objectLayer = this.findObjectsByType('door', this.map, 'doors');

            this.objectLayer.forEach(function (element) {
                this.createFromTiledObject(element, this.doors);
            }, this);
        }

        public enterKeyPressed(): void {
            //find the doors
            var entDoor;

            this.doors.forEach(function (e) {
                    entDoor = e;
            }, this);

            if (this.gsm.game.time.now < entDoor.lastOverlapped) {
                var amount = 0;
                this.enemies.forEachAlive(e => { amount++ }, this);

                if (amount == 0)
                    this.gsm.setState(States.TOWN_STATE);
            }

        }

        public setupKeybinds(data: this): void {
            this.gsm.game.input.keyboard.onDownCallback = function (e) {

                if (e.keyCode == Phaser.Keyboard.F) {
                    data.enterKeyPressed();
                }

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
                    data.actionbar.ability4Pressed()
                }

                if (e.keyCode == Phaser.Keyboard.Z) {
                    data.actionbar.potion1Pressed();
                }

                if (e.keyCode == Phaser.Keyboard.X) {
                    data.actionbar.potion2Pressed();
                }

                if (e.keyCode == Phaser.Keyboard.I) {
                    data.actionbar.getBag().frame = 1;
                }

                if (e.keyCode == Phaser.Keyboard.H) {
                    data.actionbar.getTown().frame = 1;
                }

                if (e.keyCode == Phaser.Keyboard.C) {
                    data.actionbar.getStats().frame = 1;
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
                if (e.keyCode == Phaser.Keyboard.ESC) {
                    data.dialogs.togglePauseMenu();
                }

                if (e.keyCode == Phaser.Keyboard.O) {
                    data.player.invincible = data.player.invincible ? false : true;
                }

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
                    data.charMenu.closeMenu();
                    data.bag.flipMenu();
                }

                if (e.keyCode == Phaser.Keyboard.H) {
                    data.actionbar.getTown().frame = 0;
                    if (data.gsm.game.paused || !data.player.alive)
                        return false;
                    data.gsm.setState(States.TOWN_STATE);
                }

                if (e.keyCode == Phaser.Keyboard.C) {
                    data.actionbar.getStats().frame = 0;
                    data.bag.closeMenu();
                    data.charMenu.flipMenu();
                }

                if (e.keyCode == Phaser.Keyboard.V) {
                    if (data.gsm.game.paused || !data.player.alive)
                        return false;
                    data.gsm.setState(States.LEVEL1_STATE);
                }

                if (e.keyCode == Phaser.Keyboard.B) {
                    if (data.gsm.game.paused || !data.player.alive)
                        return false;
                    data.gsm.setState(States.LEVEL2_STATE);
                }

                if (e.keyCode == Phaser.Keyboard.G) {
                    if (data.gsm.game.paused || !data.player.alive)
                        return false;
                    data.gsm.setState(States.LEVEL3_STATE);
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
            var baddie = new ENTITIES.Ogre(this.gsm, element.x, element.y, this.player, 'ogre');
            baddie.makeHealthBar();
            baddie.makeEnergyBar();

            this.gsm.game.physics.arcade.enable(baddie);
            baddie.body.collideWorldBounds = true;
            this.enemies.add(baddie);
        }

        public createFromTiledObject(element, group): void {
            var sprite = group.create(element.x, element.y, element.properties.sprite);
            sprite.anchor.setTo(0, .67);
            //copy all properties to the sprite
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        }

        public end(): boolean {
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
        }

        public getType(): any {
            return this;
        }
    }
}