module States {
    /**
    *This is the prototype state of the game
    *
    * @author Emerson
    */
    export class PrototypeState extends State {
                
        private prototypeLevel: GUI.PrototypeGraphics;
        private map: Phaser.Tilemap;
        private backgroundlayer: Phaser.TilemapLayer;
        private blockedLayer: Phaser.TilemapLayer;
        private isOnGround: boolean;
        private keyboard: any;

        //test player
        private player: Phaser.Sprite;
        
        private press: Phaser.Key;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
            this.isOnGround = this.gsm.game.physics.arcade.collide(this.player, this.blockedLayer);

            this.player.body.velocity.x = 0;
            if (this.keyboard.left.isDown) {
                //Move to the left
                this.player.body.velocity.x = -150;
              
            } else if (this.keyboard.right.isDown) {
                //Move to the right
                this.player.body.velocity.x = 150;
                
            } else {
                //Stand still
                
            }
            //Allow the player to jump if they are touching the ground.
            if (this.keyboard.up.isDown && this.isOnGround) {
                this.player.body.velocity.y = -350;
            }
        }

        public init(): void {
            var group = this.gsm.game.add.group();
            this.prototypeLevel = new GUI.PrototypeGraphics(group);

            this.gsm.getGUIM().addGroup(this.prototypeLevel);

            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
        }

        public startup(): boolean {
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

            this.gsm.game.physics.arcade.enable(this.player);
            this.player.body.gravity.y = 500;
            this.player.body.collideWorldBounds = true;

            this.backgroundlayer.resizeWorld();
            this.gsm.game.camera.follow(this.player)

            return true;
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