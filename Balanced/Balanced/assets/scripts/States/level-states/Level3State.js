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
    var Level3State = (function (_super) {
        __extends(Level3State, _super);
        function Level3State(gsm) {
            return _super.call(this, gsm) || this;
        }
        Level3State.prototype.update = function () {
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
        //does door logic stuff
        Level3State.prototype.doDoorLogic = function (player, doors) {
            var door = doors;
            if (doors instanceof Phaser.Group) {
                //grab the colliding door
                door = doors.getTop();
            }
            this.doExitLogic(door);
        };
        Level3State.prototype.doExitLogic = function (door) {
            this.player.overHeadText.clearColors();
            var alive = 0;
            this.enemies.forEachAlive(function (e) { alive++; }, this);
            if (alive > 0) {
                door.lastOverlapped = this.gsm.game.time.now + 2000;
                this.player.overHeadText.text = ENTITIES.Player.EXIT_DOOR_NF + ' Remaining: ' + alive;
                this.player.overHeadText.addColor('red', ENTITIES.Player.EXIT_NF_COLOR_IND[0]);
                this.player.overHeadText.addColor('red', ENTITIES.Player.EXIT_NF_COLOR_IND[1]);
                this.player.overHeadText.addColor('red', ENTITIES.Player.EXIT_NF_COLOR_IND[2]);
                this.player.overHeadText.addColor('white', ENTITIES.Player.EXIT_NF_COLOR_IND[2] + 1);
                this.player.overHeadText.addColor('red', ENTITIES.Player.EXIT_NF_COLOR_IND2);
            }
            else {
                door.lastOverlapped = this.gsm.game.time.now + 200;
                this.player.overHeadText.text = ENTITIES.Player.ENTER_DOOR;
                this.player.overHeadText.addColor('yellow', ENTITIES.Player.ENTER_COLOR_IND);
                this.player.overHeadText.addColor('white', ENTITIES.Player.ENTER_COLOR_IND + 1);
            }
        };
        Level3State.prototype.init = function () {
            _super.prototype.init.call(this);
            this.gsm.musicBox.addSound('final_hour', UTIL.MUSIC);
        };
        Level3State.prototype.startup = function () {
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
            _super.prototype.startup.call(this);
            this.player.x = 12 * 64;
            this.player.y = 11 * 64;
            this.createEnemies();
            this.enemies.getTop().loadEntitySounds(this.gsm.musicBox);
            this.player.addOnDeathCallBack(function () { this.gsm.musicBox.stopByID('final_hour'); }, this);
            this.backgroundlayer.resizeWorld();
            return true;
        };
        Level3State.prototype.createEnemies = function () {
            this.enemies = this.gsm.game.add.group();
            this.objectLayer = this.findObjectsByType('enemy', this.map, 'enemies');
            this.objectLayer.forEach(function (element) {
                this.placeEnemies(element, this.enemies);
            }, this);
        };
        Level3State.prototype.createDoors = function () {
            this.doors = this.gsm.game.add.group();
            this.objectLayer = this.findObjectsByType('door', this.map, 'doors');
            this.objectLayer.forEach(function (element) {
                this.createFromTiledObject(element, this.doors);
            }, this);
        };
        Level3State.prototype.enterKeyPressed = function () {
            //find the doors
            var entDoor;
            this.doors.forEach(function (e) {
                entDoor = e;
            }, this);
            if (this.gsm.game.time.now < entDoor.lastOverlapped) {
                var amount = 0;
                this.enemies.forEachAlive(function (e) { amount++; }, this);
                if (amount == 0)
                    this.gsm.setState(States.TOWN_STATE);
            }
        };
        Level3State.prototype.placeEnemies = function (element, group) {
            var baddie = new ENTITIES.Ogre(this.gsm, element.x, element.y, this.player, 'ogre');
            baddie.makeHealthBar();
            baddie.makeEnergyBar();
            this.gsm.game.physics.arcade.enable(baddie);
            baddie.body.collideWorldBounds = true;
            this.enemies.add(baddie);
        };
        Level3State.prototype.createFromTiledObject = function (element, group) {
            var sprite = group.create(element.x, element.y, element.properties.sprite);
            sprite.anchor.setTo(0, .67);
            //copy all properties to the sprite
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        };
        Level3State.prototype.end = function () {
            _super.prototype.end.call(this);
            this.gsm.musicBox.stopByID('final_hour');
            this.doors.destroy(true);
            this.map.destroy();
            this.floorlayer.destroy();
            this.wallPaperlayer.destroy();
            this.backgroundlayer.destroy();
            this.starislayer.destroy();
            return true;
        };
        Level3State.prototype.defineCustomKeys = function () {
            //don't do anything
        };
        Level3State.prototype.getType = function () {
            return this;
        };
        return Level3State;
    }(States.LevelState));
    States.Level3State = Level3State;
})(States || (States = {}));
//# sourceMappingURL=Level3State.js.map