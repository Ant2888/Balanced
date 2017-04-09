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
    * @author Emerson
    */
    var PrototypeState = (function (_super) {
        __extends(PrototypeState, _super);
        function PrototypeState(gsm) {
            return _super.call(this, gsm) || this;
        }
        PrototypeState.prototype.update = function () {
            this.isOnGround = this.gsm.game.physics.arcade.collide(this.player, this.blockedLayer);
            this.player.body.velocity.x = 0;
            if (this.keyboard.left.isDown) {
                //Move to the left
                this.player.body.velocity.x = -250;
            }
            else if (this.keyboard.right.isDown) {
                //Move to the right
                this.player.body.velocity.x = 250;
            }
            else {
                //Stand still
            }
            if (this.keyboard.up.isDown && this.isOnGround) {
                this.player.body.velocity.y = -350;
            }
        };
        PrototypeState.prototype.init = function () {
            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
        };
        PrototypeState.prototype.startup = function () {
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
            this.player = this.gsm.game.add.sprite(result[0].x, result[0].y, 'tempPlayer');
            this.player.frame = 49;
            this.player.anchor.setTo(0.5, 0.5);
            this.gsm.game.physics.arcade.enable(this.player);
            this.player.body.gravity.y = 500;
            this.player.body.collideWorldBounds = true;
            this.backgroundlayer.resizeWorld();
            this.gsm.game.camera.follow(this.player);
            // end player
            var group = this.gsm.game.add.group();
            this.prototypeLevel = new GUI.ActionBarGraphics(group);
            this.prototypeUnitframe = new GUI.HealthAndEnergyGraphics(group);
            this.gsm.getGUIM().addGroup(this.prototypeLevel);
            this.gsm.getGUIM().addGroup(this.prototypeUnitframe);
            // creating all the buttons and setting the callback
            this.prototypeLevel.setAbility1(this.ability1Pressed);
            this.prototypeLevel.setAbility2(this.ability2Pressed);
            this.prototypeLevel.setAbility3(this.ability3Pressed);
            this.prototypeLevel.setAbility4(this.ability4Pressed);
            this.prototypeLevel.setPotion1(this.potion1Pressed);
            this.prototypeLevel.setPotion2(this.potion2Pressed);
            this.prototypeLevel.setStats(this.statsPressed);
            this.prototypeLevel.setBag(this.bagPressed);
            this.prototypeLevel.setTown(this.townPressed);
            return true;
        };
        PrototypeState.prototype.statsPressed = function () {
            console.log('stats button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        PrototypeState.prototype.bagPressed = function () {
            console.log('bag button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        PrototypeState.prototype.townPressed = function () {
            console.log('town button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        PrototypeState.prototype.potion1Pressed = function () {
            console.log('potion1 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        PrototypeState.prototype.potion2Pressed = function () {
            console.log('potion2 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        PrototypeState.prototype.ability1Pressed = function () {
            console.log('ability1 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        PrototypeState.prototype.ability2Pressed = function () {
            console.log('ability2 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        PrototypeState.prototype.ability3Pressed = function () {
            console.log('ability3 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        PrototypeState.prototype.ability4Pressed = function () {
            console.log('ability4 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
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
        return PrototypeState;
    }(States.State));
    States.PrototypeState = PrototypeState;
})(States || (States = {}));
//# sourceMappingURL=PrototypeState.js.map