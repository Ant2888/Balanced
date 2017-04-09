module States {
    /**
    *This is the prototype state of the game
    *
    * @author Emerson
    */
    export class PrototypeState extends State {
        private prototypeLevel: GUI.ActionBarGraphics;
        private prototypeUnitframe: GUI.HealthAndEnergyGraphics;
        private map: Phaser.Tilemap;
        private backgroundlayer: Phaser.TilemapLayer;
        private blockedLayer: Phaser.TilemapLayer;
        private isOnGround: boolean;
        private keyboard: any;

        //test player
        private player: Phaser.Sprite;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
            this.isOnGround = this.gsm.game.physics.arcade.collide(this.player, this.blockedLayer);

            this.player.body.velocity.x = 0;
            if (this.keyboard.left.isDown) {
                //Move to the left
                this.player.body.velocity.x = -250;
            } else if (this.keyboard.right.isDown) {
                //Move to the right
                this.player.body.velocity.x = 250;
            } else {
                //Stand still
            }

            if (this.keyboard.up.isDown && this.isOnGround) {
                this.player.body.velocity.y = -350;
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
        }

        private statsPressed(): any {
            console.log('stats button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private bagPressed(): any {
            console.log('bag button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private townPressed(): any {
            console.log('town button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private potion1Pressed(): any {
            console.log('potion1 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private potion2Pressed(): any {
            console.log('potion2 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private ability1Pressed(): any {
            console.log('ability1 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private ability2Pressed(): any {
            console.log('ability2 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private ability3Pressed(): any {
            console.log('ability3 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private ability4Pressed(): any {
            console.log('ability4 button was pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
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