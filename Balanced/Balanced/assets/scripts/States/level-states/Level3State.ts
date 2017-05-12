module States {
    /**
    *This is the level 1 state of the game
    *
    * @author Emerson, Anthony
    */
    export class Level3State extends LevelState {
        private map: Phaser.Tilemap;

        private floorlayer: Phaser.TilemapLayer;
        private starislayer: Phaser.TilemapLayer;
        private wallPaperlayer: Phaser.TilemapLayer;
        private backgroundlayer: Phaser.TilemapLayer;

        private bossGraphic: GUI.BossGraphics;

        //boss 2
        private ogreBoss: ENTITIES.OgreBoss;
        //boss 1
        private mageBoss: ENTITIES.MageBoss;

        private stairOverlap: any;

        private doors: Phaser.Group;

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

            this.bossGraphic.updateBoss1Health();
            this.bossGraphic.updateBoss2Health();
           
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

            this.enemies.forEachAlive(e => {
                if (e instanceof ENTITIES.MageOgre) {
                    this.gsm.game.physics.arcade.overlap(this.player, e.fireBall.bullets,
                        (ply: ENTITIES.Player, me) => {
                            ply.dealDamage(50, false, 'purple', true, true, null,
                                {
                                    dx: 64 * (me.scale.x > 0 ? -1 : 1),
                                    dy: -64,
                                    time: 200
                                });
                            me.kill();
                        });
                    /**this.gsm.game.physics.arcade.collide(this.floorlayer, e.fireBall.bullets,
                        (me, floor) => {
                            me.kill();
                        });**/
                }
                else if (e instanceof ENTITIES.MageBoss) {
                    this.gsm.game.physics.arcade.overlap(this.player, e.fireBall.bullets,
                        (ply: ENTITIES.Player, me) => {
                            ply.dealDamage(35, false, 'purple', true, true, null,
                                {
                                    dx: 170,
                                    dy: -64,
                                    time: 200
                                });
                            me.kill();
                        });
                }
            }, this);

            if (!this.player.alive)
                return;

            this.actionbar.setCoinText(ENTITIES.Player.SAVE_COINS);

            //check if the doors are around
            this.gsm.game.physics.arcade.overlap(this.player, this.doors, this.doDoorLogic, null, this);
            //do the loot stuff
            this.lm.checkOverlaps(this.floorlayer, this.player);

                        
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
                if (this.keyboard.up.isDown || this.spacebar.isDown) {
                    this.player.jump(-450);
                }

            }

            
            if (this.stairOverlap == null) {
                this.player.body.allowGravity = true;
            }

            if ((this.keyboard.up.isDown || this.spacebar.isDown) && !this.player.isJumping) {
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
            super.init();
            this.gsm.musicBox.addSound('moonlight', UTIL.MUSIC);
            this.gsm.musicBox.addSound('dark_loop', UTIL.MUSIC);
        }

        public startup(): boolean {
            this.gsm.musicBox.playByID('moonlight', undefined, undefined, UTIL.MUSIC, true, false);

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

            super.startup();

            this.player.x = 12 * 64;
            this.player.y = 11 * 64;

            var soundLoader = new ENTITIES.Ogre(this.gsm, 0, 0, this.player, 'ogre')
            this.enemies.add(soundLoader);
            (<ENTITIES.Ogre>this.enemies.getTop()).loadEntitySounds(this.gsm.musicBox);
            soundLoader.kill();

            this.mageBoss = new ENTITIES.MageBoss(this.gsm, 12 * 64, 0 * 64, this.player, 'ogre_mage');
            this.ogreBoss = new ENTITIES.OgreBoss(this.gsm, 30 * 64, 10 * 64, this.player, 'ogre')

            this.enemies.add(this.mageBoss);
            this.enemies.add(this.ogreBoss);

            this.ogreBoss.addOnDeathCallBack(() => {
                this.ogreBoss.dropList.forEach(loot => {
                    this.lm.dropItem(loot);
                }, this);

                var timer = this.gsm.game.time.create(true);
                timer.add(3000, () => { this.ogreBoss.overHeadText.text = ''; }, this);
                this.ogreBoss.overHeadText.text = 'How could I lose?';
                timer.start();

                //send the game into phase 2
                this.ogreBoss.stateLogic.curState.elevate();
                this.mageBoss.stateLogic.curState.elevate();

            }, this);

            this.mageBoss.addOnDeathCallBack(() => {
                var timer = this.gsm.game.time.create(true);
                timer.add(3000, () => { this.mageBoss.overHeadText.text = ''; }, this);
                this.mageBoss.overHeadText.text = 'Aggghhhhh';
                timer.start();

                this.mageBoss.dropList.forEach(loot => {
                    this.lm.dropItem(loot);
                }, this);

                this.enemies.forEach(e => {
                    (<ENTITIES.Entity>e).dealDamage(9999, false, 'yellow', true, false);
                }, this)
                this.gsm.musicBox.stopByID('moonlight');
                this.gsm.musicBox.playByID('dark_loop', undefined, undefined, UTIL.MUSIC, true, false);
            }, this);

            this.mageBoss.addOnDamageCallback((dmg, hp) => {
                //just entered 75%
                if (hp <= this.mageBoss.maxHealth * .5 && hp + dmg > this.mageBoss.maxHealth * .5) {
                    var mage = <ENTITIES.MageBoss>(this.mageBoss);
                    mage.stateLogic.p2.isHalf = true;
                    mage.stateLogic.p2.justStart = true;
                }
                else if (hp <= this.mageBoss.maxHealth * .25 && hp + dmg > this.mageBoss.maxHealth * .25) {
                    var mage = <ENTITIES.MageBoss>(this.mageBoss);
                    mage.stateLogic.p2.isQuarter = true;
                    mage.stateLogic.p2.justStart = true;
                }

            }, this);

            this.bossGraphic = new GUI.BossGraphics(this.graphicsGroup, this.mageBoss, this.ogreBoss);
            this.gsm.getGUIM().addGroup(this.bossGraphic);

            this.player.addOnDeathCallBack(function () { this.gsm.musicBox.stopByID('moonlight') }, this);

            this.backgroundlayer.resizeWorld();
            
            return true;
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

        public end(): boolean {
            super.end();
            this.gsm.musicBox.stopByID('moonlight');
            this.gsm.musicBox.stopByID('dark_loop');
            this.doors.destroy(true);
            this.map.destroy();
            this.floorlayer.destroy();
            this.wallPaperlayer.destroy();
            this.backgroundlayer.destroy();
            this.starislayer.destroy();
            return true;
        }

        public defineCustomKeys(): void {
            //don't do anything
        }

        public getType(): any {
            return this;
        }
    }
}