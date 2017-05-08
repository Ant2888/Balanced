module GUI {
    /**
     * @author Anthony
     */
    export class ShopMenuGraphics extends GameObject{

        private player: ENTITIES.Player;
        private shopItem: Phaser.Group;

        public static ShopMatrix = {
            buff_whirl_cost: {
                text: 'Whirlwind Cost -25%',
                goldCost: 50,
                bought: (p: ENTITIES.Player) => {
                    p.ab4_mod.energyCost =
                        p.ab4_mod.energyCost * .75;
                }
            },
            buff_whirl_damage: {
                text: 'Whirlwind Damage +10%',
                goldCost: 50,
                bought: (p: ENTITIES.Player) => {
                    p.ab4_mod.dmg =
                        p.ab4_mod.dmg * 1.10;
                }
            },
            buff_tri_cost: {
                text: 'TriAttack Cost -25%',
                goldCost: 50,
                bought: (p: ENTITIES.Player) => {
                    p.ab3_mod.energyCost =
                        p.ab3_mod.energyCost * .75;
                }
            },
            buff_tri_damage: {
                text: 'TriAttack Damage +10%',
                goldCost: 50,
                bought: (p: ENTITIES.Player) => {
                    p.ab3_mod.dmg =
                        p.ab3_mod.dmg * 1.10;
                }
            },
            buff_slash_cost: {
                text: 'Slash Cost -25%',
                goldCost: 50,
                bought: (p: ENTITIES.Player) => {
                    p.ab1_mod.energyCost =
                        p.ab1_mod.energyCost * .75;
                }
            },
            buff_slash_damage: {
                text: 'Slash Damage +10%',
                goldCost: 50,
                bought: (p: ENTITIES.Player) => {
                    p.ab1_mod.dmg =
                        p.ab1_mod.dmg * 1.10;
                }
            },
            buff_wave_cost: {
                text: 'Energy Wave Cost -25%',
                goldCost: 50,
                bought: (p: ENTITIES.Player) => {
                    p.ab2_mod.energyCost =
                        p.ab2_mod.energyCost * .75;
                }
            },
            buff_wave_damage: {
                text: 'Energy Wave Damage +10%',
                goldCost: 50,
                bought: (p: ENTITIES.Player) => {
                    p.ab2_mod.dmg =
                        p.ab2_mod.dmg * 1.10;
                }
            }
        };

        private menu: Phaser.Sprite;
        private closeBtn: Phaser.Button;
        private buyBtn: Phaser.Button;
        private gsm: States.GameStateManager;

        private playerGold: Phaser.Text;
        private shopCost: Phaser.Text;
        private currentCost: number;

        private lastErr: number;

        private cart: ShopItem[];

        constructor(group: Phaser.Group, player: ENTITIES.Player) {
            super(10, group);
            this.player = player;
            this.currentCost = 0;
            this.cart = new Array();
            this.lastErr = 0;
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.menu = this.gsm.game.add.sprite(this.gsm.game.width / 2,
                this.gsm.game.height / 2, 'shop_menu');
            this.menu.anchor.setTo(.5, .5);
            this.menu.fixedToCamera = true;

            this.playerGold = this.gsm.game.add.text(-10, 138, '0', {
                fill: 'gold', font: 'Courier', fontSize: '18px',
                stroke: 'black', strokeThickness: 1
            });

            this.shopCost = this.gsm.game.add.text(-10, -15, '0', {
                fill: 'gold', font: 'Courier', fontSize: '18px',
                stroke: 'black', strokeThickness: 1
            });

            this.menu.addChild(this.playerGold);
            this.menu.addChild(this.shopCost);

            this.group.add(this.menu);

            this.closeBtn = this.gsm.game.add.button(this.menu.width +200, this.gsm.game.height / 2 - 200,
                'close_btn_ss', this.closeMenu, this, 2, 0, 1);
            this.closeBtn.anchor.setTo(.5, .5);
            this.closeBtn.fixedToCamera = true;
            this.group.add(this.closeBtn);

            this.buyBtn = this.gsm.game.add.button(-57, 40, 'purchase_btn', this.checkout, this, 1, 0, 2);
            this.menu.addChild(this.buyBtn);
            
            this.menu.exists = false;
            this.closeBtn.exists = false;
        }

        /**
         * Attempts to buy the current cart
         */
        public checkout(): void {
            if (this.currentCost == 0 && this.cart.length == 0)
                return;

            if (ENTITIES.Player.SAVE_COINS < this.currentCost) {
                if (this.lastErr > this.gsm.game.time.now)
                    return;

                this.lastErr = this.gsm.game.time.now + 1500;

                var text = this.gsm.game.add.text(580, 400-26, 'Not enough gold!', {
                    fill: 'red', font: 'Courier', fontSize: '12px',
                    stroke: 'black', strokeThickness: 1
                });
                this.group.add(text);

                var timer = this.gsm.game.time.create(true);
                timer.add(2000, () => {
                    text.destroy();
                }, this);
                timer.start();

                return;
            }

            ENTITIES.Player.SAVE_COINS -= this.currentCost;
            this.setPlayerGold();

            this.cart.forEach(e => {
                ENTITIES.Player.allCurrentEvent.push(e.bought);
            }, this);

            this.cart = new Array();
            this.setShopCost(0);

            if (this.shopItem !== null && this.shopItem !== undefined)
                this.shopItem.destroy(true);
        }

        /**
         * Generates all the shop items from randomly selecting some buffs
         */
        protected generateShopItems(): void {
            this.cart = new Array();
            this.setShopCost(0);

            if (this.shopItem !== null && this.shopItem !== undefined)
                this.shopItem.destroy(true);

            this.shopItem = this.gsm.game.add.group();
            var items = new Array();
            var rndEvent = Object.keys(ShopMenuGraphics.ShopMatrix);
            //generate 5 items
            for (var i = 0; i < 3; i++){
                var shopItem = <ShopItem>(ShopMenuGraphics.ShopMatrix[rndEvent[rndEvent.length * Math.random() << 0]]);

                while (items.indexOf(shopItem) >= 0)
                    shopItem = <ShopItem>(ShopMenuGraphics.ShopMatrix[rndEvent[rndEvent.length * Math.random() << 0]]);

                items.push(shopItem);

                var item = this.gsm.game.add.sprite(-this.menu.width/2 + 46, -140+(38 * i), 'shop_item');
                var text = this.gsm.game.add.text(10, 10,
                    shopItem.text, {
                    fill: 'blue', font: 'Courier', fontSize: '12px',
                    stroke: 'black', strokeThickness: 1,
                    boundsAlignH: 'left'
                });
                var text2 = this.gsm.game.add.text(235, 10,
                    ''+shopItem.goldCost, {
                        fill: 'gold', font: 'Courier', fontSize: '16px',
                        stroke: 'black', strokeThickness: 1,
                        boundsAlignH: 'left'
                    });
                
                item.addChild(text2);
                item.addChild(text);

                item.inputEnabled = true;
                item.input.enableDrag(true, false, true, null, new Phaser.Rectangle(item.x, item.y,
                    this.gsm.game.width, item.height));
                item.input.enableSnap(item.x, item.y, false, true);
                item.events.onDragStop.add((e, e1, shop) => {
                    if (e.x >= 0) {
                        e.x = 70;
                        if (this.cart.indexOf(shop) < 0)
                            this.cart.push(shop);
                    } else {
                        this.cart = this.cart.filter(_e => {
                            return _e != shop;
                        }, this);
                    }

                    this.calculateCosts();
                }, this, null, shopItem);


                this.shopItem.add(item);
            }

            this.menu.addChild(this.shopItem);
        }

        /**
         * Opens the menu, will not work if player dead or game paused
         */
        public openMenu(): void {
            if (this.gsm.game.paused || !this.player.alive)
                return;

            this.generateShopItems();
            this.menu.exists = true;
            this.closeBtn.exists = true;
            this.setPlayerGold();

            this.gsm.musicBox.playByID('Bag_Open', undefined, undefined, UTIL.SFX, false, false);
        }

        /**
         * Closes the menu, will not work if player dead or game paused
         */
        public closeMenu(): void {
            if (!this.isOpen())
                return;

            if (this.gsm.game.paused || !this.player.alive)
                return;

            if (this.menu.exists)
                this.menu.exists = false;

            if (this.closeBtn.exists)
                this.closeBtn.exists = false;

            this.gsm.musicBox.playByID('Bag_Close', undefined, undefined, UTIL.SFX+.1, false, false);
        }

        /**
         * Flips the menu state. Uses open or close menu
         */
        public flipMenu(): void {
            if (this.menu.exists)
                this.closeMenu();
            else {
                this.openMenu();
            }
        }

        /**
         * Determins if the shop is currently open.
         */
        public isOpen(): boolean {
            return this.menu.exists;
        }

        /**
         * Helper to set the players gold
         */
        public setPlayerGold(): void {
            this.playerGold.text = ''+ENTITIES.Player.SAVE_COINS;
        }

        /**
         * Helper to set the shops cost
         */
        public setShopCost(cost: number): void {
            this.shopCost.text = '' + cost;
            this.currentCost = cost;
        }

        /**
         * Recalculates the costs
         */
        public calculateCosts(): void {
            this.currentCost = 0;
            this.cart.forEach(e => { this.currentCost += e.goldCost }, this);
            this.shopCost.text = '' + this.currentCost;
        }

        /**
         * Helper to add the shops cost
         */
        public addItem(cost: number): void {
            this.currentCost += cost;
            this.shopCost.text = '' + this.currentCost;
        }

        /**
         * Helper to sub the shops cost
         */
        public subItem(cost: number): void {
            this.currentCost -= cost;
            this.shopCost.text = '' + this.currentCost;
        }
    }
}