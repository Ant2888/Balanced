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
                this.player.body.velocity.x = -150;
            }
            else if (this.keyboard.right.isDown) {
                //Move to the right
                this.player.body.velocity.x = 150;
            }
            else {
                //Stand still
            }
            //Allow the player to jump if they are touching the ground.
            if (this.keyboard.up.isDown && this.isOnGround) {
                this.player.body.velocity.y = -350;
            }
        };
        PrototypeState.prototype.init = function () {
            var group = this.gsm.game.add.group();
            this.prototypeLevel = new GUI.PrototypeGraphics(group);
            this.gsm.getGUIM().addGroup(this.prototypeLevel);
            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
        };
        PrototypeState.prototype.startup = function () {
            console.log("prototype Level Started.");
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
            return true;
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