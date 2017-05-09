
module States {
    /**
     * The town state the user will start in
     *
     * @author Anthony, Emerson
     */
    export class TownState extends State {

        private townGraphics: GUI.TownGraphics;
        private dialogGraphics: GUI.DialogGraphics;
        private player: ENTITIES.Player;
        private keyboard: Phaser.CursorKeys;
        
        private shop: GUI.ShopMenuGraphics;

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public update(): void {
            this.gsm.game.physics.arcade.collide(this.player, this.townGraphics.getFloor(), () =>
            { this.player.isJumping = false }, null, this);
            
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
            
            this.gsm.game.physics.arcade.overlap(this.player, this.townGraphics.getShop(),
                this.doShopLogic, null, this);
            this.gsm.game.physics.arcade.overlap(this.player, this.townGraphics.getInn(),
                this.doInnLogic, null, this);
            this.gsm.game.physics.arcade.overlap(this.player, this.townGraphics.getDungeon(),
                this.doDungeonLogic, null, this);

            //not overlapping
            var clearAll = true;

            if (this.gsm.game.time.now > this.townGraphics.getShop()['lastOverlapped']) {
                this.shop.closeMenu();
                clearAll = clearAll && true;
            } else {
                clearAll = clearAll && false;
            }

            if (this.gsm.game.time.now > this.townGraphics.getInn()['lastOverlapped']) {
                //todo
                clearAll = clearAll && true;
            } else {
                clearAll = clearAll && false;
            }

            if (this.gsm.game.time.now > this.townGraphics.getDungeon()['lastOverlapped']) {
                clearAll = clearAll && true;
            } else {
                clearAll = clearAll && false;
            }

            if (clearAll) {
                this.player.overHeadText.text = '';
                this.player.overHeadText.clearColors();
            }

        }

        public init(): void {
            this.gsm.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.gsm.game.physics.arcade.gravity.y = 1200;

            this.gsm.musicBox.addSound('dark_loop');
        }

        public startup(): boolean {
            

            this.gsm.musicBox.playByID('dark_loop', undefined, undefined, .2, true, false);
            this.gsm.game.world.setBounds(0, 0, 3840, 720);

            var group = this.gsm.game.add.group();
            this.townGraphics = new GUI.TownGraphics(group);
            this.gsm.getGUIM().addGroup(this.townGraphics);

            this.player = new ENTITIES.Player(this.gsm, 1700, this.gsm.game.world.height - (4 * 64), 'tempPlayer');
            this.player.loadEntitySounds(this.gsm.musicBox);
            this.player.inputEnabled = true;
            this.player.scale.setTo(2, 2);
            this.gsm.game.camera.follow(this.player)

            var group2 = this.gsm.game.add.group();
            this.shop = new GUI.ShopMenuGraphics(group2, this.player);
            var health = new GUI.HealthAndEnergyGraphics(group2, this.player);
            this.dialogGraphics = new GUI.DialogGraphics(group2, this.player);

            this.gsm.getGUIM().addGroup(health);
            this.gsm.getGUIM().addGroup(this.shop);
            this.gsm.getGUIM().addGroup(this.dialogGraphics);

            this.townGraphics.getShop()['lastOverlapped'] = 0;
            this.townGraphics.getInn()['lastOverlapped'] = 0;
            this.townGraphics.getDungeon()['lastOverlapped'] = 0;
            
            //setup key events
            this.doKeyLogic();

            this.buildSoundButton();
            if (UTIL.DOONCE) {
                this.dialogGraphics.tutorialMenu();
                UTIL.DOONCE = false;
            }

            return true;
        }

        /**
         * Sets the text above head for the dungeon
         */
        private doDungeonLogic(): void {
            this.player.overHeadText.clearColors();
            this.townGraphics.getDungeon()['lastOverlapped'] = this.gsm.game.time.now + 1000;
            this.player.overHeadText.text = 'Press \'F\' to ENTER the Dungeon!';
            this.player.overHeadText.addColor('yellow', ENTITIES.Player.ENTER_COLOR_IND);
            this.player.overHeadText.addColor('white', ENTITIES.Player.ENTER_COLOR_IND + 1);
            this.player.overHeadText.addColor('red', 13);
            this.player.overHeadText.addColor('white', 18);
        }

        /**
         * Sets the text above head for the inn
         */
        private doInnLogic(): void {
            this.player.overHeadText.clearColors();
            this.townGraphics.getInn()['lastOverlapped'] = this.gsm.game.time.now + 1000;
            //this.player.overHeadText.text = 'Press \'F\' to open the inn!';
            this.player.overHeadText.addColor('yellow', ENTITIES.Player.ENTER_COLOR_IND);
            this.player.overHeadText.addColor('white', ENTITIES.Player.ENTER_COLOR_IND + 1);
        }

        /**
         * Sets the text above head for the shop
         */
        private doShopLogic(): void {
            this.player.overHeadText.clearColors();
            this.townGraphics.getShop()['lastOverlapped'] = this.gsm.game.time.now + 200;
            this.player.overHeadText.text = 'Press \'F\' to open the shop!';
            this.player.overHeadText.addColor('yellow', ENTITIES.Player.ENTER_COLOR_IND);
            this.player.overHeadText.addColor('white', ENTITIES.Player.ENTER_COLOR_IND + 1);
        }

        /**
         * Method to set up the keybinds for the class
         */
        private doKeyLogic(): void {
            this.keyboard = this.gsm.game.input.keyboard.createCursorKeys();

            //setting these up for later
            var onDown = e => { };

            var onUp = e => {
                if (e.keyCode == Phaser.Keyboard.F)
                    this.enterKeyPressed();
                if (e.keyCode == Phaser.Keyboard.V)
                    this.gsm.setState(States.DUNGEON_TUTORIAL_STATE);
                if (e.keyCode == Phaser.Keyboard.TILDE)
                    this.player.addCoin(100);
            };

            var onPressed = e => { }; 
            //bind contexts
            onDown = onDown.bind(this);
            onUp = onUp.bind(this);
            onPressed = onPressed.bind(this);

            this.gsm.game.input.keyboard.addCallbacks(this, onDown,
                onUp, onPressed);
        }

        private enterKeyPressed(): void {
            if (this.townGraphics.getDungeon()['lastOverlapped'] > this.gsm.game.time.now) {
                this.gsm.setState(States.LEVEL1_STATE);
            } else if (this.townGraphics.getInn()['lastOverlapped'] > this.gsm.game.time.now) {
                console.log('INN NYI');
            } else if (this.townGraphics.getShop()['lastOverlapped'] > this.gsm.game.time.now) {
                if (!this.shop.isOpen())
                    this.shop.openMenu();
            }
        }

        public end(): boolean {
            this.gsm.musicBox.stopByID('dark_loop');
            this.gsm.game.world.setBounds(0, 0, 1280, 720);
            this.destroySoundButton();
            return true;
        }
        
        public render(): void {
            if (LevelState.DEBUG) {
                this.gsm.game.debug.body(this.player);
                this.gsm.game.debug.bodyInfo(this.player, 100, 110);
                this.gsm.game.debug.body(this.townGraphics.getFloor());
                this.gsm.game.debug.body(this.townGraphics.getShop());
                this.gsm.game.debug.body(this.townGraphics.getInn());
                this.gsm.game.debug.body(this.townGraphics.getDungeon());
            }
        }

        public getType(): any {
            return this;
        }
                
    }
}