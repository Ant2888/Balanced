module States {

    /**
     * This class servers as a prototype for what a typical
     * level state can and should look like. All levels that
     * are going to be considered typical should use this.
     * @author Anthony, Emerson
     */
    export abstract class LevelState extends State {

        //debug var; there should only be 1
        public static DEBUG = false;
        //-

        //entities, incl. player; destroyed on end
        protected enemies: Phaser.Group;
        protected player: ENTITIES.Player;
        protected lm: LootManager;
        //-

        //balance stuff
        protected bm: BALANCE.BalanceManager;
        protected balanceTimer: Phaser.Timer;
        //-

        //key's and key manager
        protected keyboard: Phaser.CursorKeys;
        protected KeyMatrix: any; //HashMap for keys -- caps only
        protected spacebar: any;
        //-

        //default player graphics
        protected actionbar: GUI.ActionBarGraphics;
        protected unitframe: GUI.HealthAndEnergyGraphics;
        protected charMenu: GUI.CharGraphics;
        protected bag: GUI.BagGraphics;
        protected dialogs: GUI.DialogGraphics;
        //-

        
        constructor(gsm: GameStateManager) {
            super(gsm);
            this.generateDefaultKeys();
            this.defineCustomKeys();
            this.lm = new LootManager(this.gsm);
        }

        public init(): void {
            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.gsm.game.physics.arcade.gravity.y = 1200;
            this.spacebar = this.gsm.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        }

        public startup(): boolean {
            //player init and init the enemy group
            this.player = new ENTITIES.Player(this.gsm, 6 * 64, 4 * 64, 'tempPlayer');
            this.player.loadEntitySounds(this.gsm.musicBox);
            this.gsm.game.camera.follow(this.player);
            this.player.inputEnabled = true;
            this.enemies = this.gsm.game.add.group();
            this.gsm.game.sound.volume = .3;
            //-

            this.bm = new BALANCE.BalanceManager(this.gsm);
            this.lm.initialize();

            //graphics
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

            this.actionbar.setOptionsPressed(() => {
                this.dialogs.togglePauseMenu();
            }, this);

            this.actionbar.townPressed(() => {
                this.dialogs.toggleConfirmMenu();
            }, this);

            /*this.actionbar.getBag().onInputDown.add(function (e) {
                this.charMenu.closeMenu();
                this.bag.flipMenu();
            }, this);

            this.actionbar.getStats().onInputDown.add(function () {
                this.bag.closeMenu();
                this.charMenu.flipMenu();
            }, this);*/
            //-

            this.doKeyLogic();
            

            this.balanceTimer = this.gsm.game.time.create(false);
            this.balanceTimer.loop(Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000, () => {
                if (this.gsm.game.paused)
                    return;

                if (!this.player.alive)
                    return;

                var rndEvent = Object.keys(BALANCE.EventMatrix.Matrix);
                //this just generates a random key
                rndEvent = BALANCE.EventMatrix.Matrix[rndEvent[rndEvent.length * Math.random() << 0]];
                this.bm.matrix.eventToApply = rndEvent;
                this.bm.dispatchEvent(this.bm.matrix, this.player);
            }, this);
            this.balanceTimer.start();
            //-

            this.buildSoundButton();

            return true;
        }

        public end(): boolean {
            this.lm.destroyLoot();
            this.balanceTimer.stop();
            this.balanceTimer.destroy();
            this.gsm.game.camera.reset();
            this.player.destroy(true);
            this.enemies.destroy(true);
            this.destroySoundButton();
            return true;
        }

        public render(): void {
            if (LevelState.DEBUG) {
                this.gsm.game.debug.body(this.player);
                this.gsm.game.debug.bodyInfo(this.player, 100, 110);
                this.enemies.forEachAlive(e => {
                    this.gsm.game.debug.body(e);

                    if (e instanceof ENTITIES.MageOgre) {
                        e.fireBall.bullets.forEachAlive(_e => {
                            this.gsm.game.debug.body(_e);
                        }, this);
                    }
                }, this);

            }
        }

        /**
         * Use this to define any custom keys in the matrix before
         * it enters the keyboard callbacks.
         */
        public abstract defineCustomKeys(): void;

        /**
         * Used to specify what F should do
         */
        public abstract enterKeyPressed(): void;

        //does all the keyboard logic setup
        private doKeyLogic(): void {
            this.keyboard = this.gsm.game.input.keyboard.createCursorKeys();
            this.gsm.game.input.keyboard.addCallbacks(this, this.onDown,
                this.onUp, this.onPress);
        }

        private onUp(e: Phaser.Key): void {
            var _e = e.keyCode;
            var res = this.KeyMatrix[_e];
            if (res !== undefined && res !== null && res.onUp)
                (<UTIL.KeyEvent>res).onUp.call(res.context, e);
        }

        private onDown(e: Phaser.Key): void {
            var _e = e.keyCode;
            var res = this.KeyMatrix[_e];

            if (res !== undefined && res !== null && res.onDown)
                (<UTIL.KeyEvent>res).onDown.call(res.context, e);
        }

        private onPress(e: Phaser.Key): void {
            var _e = e.keyCode;
            var res = this.KeyMatrix[_e];

            if (res !== undefined && res !== null && res.onPress)
                (<UTIL.KeyEvent>res).onPress.call(res.context, e);
        }

        //helper to generate the key matrix
        private generateDefaultKeys(): void {
            this.KeyMatrix = {};

            this.KeyMatrix[Phaser.Keyboard.Q] = {
                key: Phaser.Keyboard.Q, context: this, onDown: e =>
                { this.actionbar.ability1Pressed() }, onUp: e =>
                { this.actionbar.getAbility1().frame = 0 }
            };

            this.KeyMatrix[Phaser.Keyboard.F] = {
                key: Phaser.Keyboard.F, context: this, onDown: e =>
                { this.enterKeyPressed() }
            };

            this.KeyMatrix[Phaser.Keyboard.W] = {
                key: Phaser.Keyboard.W, context: this, onDown: e =>
                { this.actionbar.ability2Pressed() }, onUp: e =>
                { this.actionbar.getAbility2().frame = 0 }
            };

            this.KeyMatrix[Phaser.Keyboard.E] = {
                key: Phaser.Keyboard.E, context: this, onDown: e =>
                { this.actionbar.ability3Pressed() }, onUp: e =>
                { this.actionbar.getAbility3().frame = 0 }
            };

            this.KeyMatrix[Phaser.Keyboard.R] = {
                key: Phaser.Keyboard.R, context: this, onDown: e =>
                { this.actionbar.ability4Pressed() }, onUp: e =>
                { this.actionbar.getAbility4().frame = 0 }
            };

            this.KeyMatrix[Phaser.Keyboard.Z] = {
                key: Phaser.Keyboard.Z, context: this, onDown: e =>
                { this.actionbar.potion1Pressed() }, onUp: e =>
                { this.actionbar.getPotion1().frame = 0 }
            };

            this.KeyMatrix[Phaser.Keyboard.X] = {
                key: Phaser.Keyboard.X, context: this, onDown: e =>
                { this.actionbar.potion2Pressed() }, onUp: e =>
                { this.actionbar.getPotion2().frame = 0 }
            };

            this.KeyMatrix[Phaser.Keyboard.I] = {
                key: Phaser.Keyboard.I, context: this, onDown: e => {
                    this.actionbar.getBag().frame = 1;
                    this.charMenu.closeMenu();
                    this.bag.flipMenu();
                }, onUp: e =>
                { this.actionbar.getBag().frame = 0 }
            };

            this.KeyMatrix[Phaser.Keyboard.H] = {
                key: Phaser.Keyboard.H, context: this, onDown: e => {
                    this.actionbar.getTown().frame = 1;
                    
                }, onUp: e =>
                {
                    this.actionbar.getTown().frame = 0
                    this.dialogs.toggleConfirmMenu();
                }
            };

            this.KeyMatrix[Phaser.Keyboard.C] = {
                key: Phaser.Keyboard.C, context: this, onDown: e => {
                    this.actionbar.getStats().frame = 1;
                    this.bag.closeMenu();
                    this.charMenu.flipMenu();
                }, onUp: e =>
                { this.actionbar.getStats().frame = 0 }
            };

            this.KeyMatrix[Phaser.Keyboard.K] = {
                key: Phaser.Keyboard.K, context: this, onDown: e => {
                    this.player.healEntity(50, false);
                }
            };

            this.KeyMatrix[Phaser.Keyboard.J] = {
                key: Phaser.Keyboard.J, context: this, onDown: e => {
                    this.player.dealDamage(5, false, "red", true, false);
                }
            };

            this.KeyMatrix[Phaser.Keyboard.M] = {
                key: Phaser.Keyboard.M, context: this, onDown: e => {
                    this.player.getAbilityManager().getEnergyManager().regenEnergy(5);
                }
            };

            this.KeyMatrix[Phaser.Keyboard.N] = {
                key: Phaser.Keyboard.N, context: this, onDown: e => {
                    this.player.getAbilityManager().getEnergyManager().useAbility(5);
                }
            };

            this.KeyMatrix[Phaser.Keyboard.ESC] = {
                key: Phaser.Keyboard.ESC, context: this, onUp: e => {
                    this.dialogs.togglePauseMenu();
                }
            };

            this.KeyMatrix[Phaser.Keyboard.O] = {
                key: Phaser.Keyboard.O, context: this, onUp: e => {
                    this.player.invincible = this.player.invincible ? false : true;
                }
            };

            this.KeyMatrix[Phaser.Keyboard.V] = {
                key: Phaser.Keyboard.V, context: this, onUp: e => {
                    this.gsm.setState(States.LEVEL1_STATE);
                }
            };

            this.KeyMatrix[Phaser.Keyboard.B] = {
                key: Phaser.Keyboard.B, context: this, onUp: e => {
                    this.gsm.setState(States.LEVEL2_STATE);
                }
            };

            this.KeyMatrix[Phaser.Keyboard.G] = {
                key: Phaser.Keyboard.G, context: this, onUp: e => {
                    this.gsm.setState(States.LEVEL3_STATE);
                }
            };
        }

        public createFromTiledObject(element, group): void {
            var sprite = this.gsm.game.add.sprite(element.x, element.y, element.properties.sprite);
            group.add(sprite);
            sprite.anchor.setTo(0, .67);
            //copy all properties to the sprite
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        }

        public findObjectsByType(typeProp, map, layer): any {
            var result = new Array();

            var arr = map.objects[layer];

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].properties.type == typeProp) {
                    arr[i].y -= map.tileHeight;
                    result.push(arr[i]);
                }
            }

            return result;
        }

       

    }
}