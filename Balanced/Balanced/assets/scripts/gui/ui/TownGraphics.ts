module GUI {
    /**
     * Town graphic of the game. To be placed into the town state
     * @author Anthony
     */
    export class TownGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite;
        private floor: Phaser.Sprite;
        private dungeon: Phaser.Sprite;
        private inn: Phaser.Sprite;
        private shop: Phaser.Sprite;

        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(204, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            this.group.enableBody = true;

            this.backgroundImage = gsm.game.add.sprite(0, 0, 'town');
            this.group.add(this.backgroundImage);
            this.backgroundImage.body.immovable = true;
            this.backgroundImage.body.allowGravity = false;

            this.floor = this.gsm.game.add.sprite(0, this.gsm.game.world.height - 140);
            this.group.add(this.floor);
            this.floor.body.setSize(3840, 1);
            this.floor.body.immovable = true;
            this.floor.body.allowGravity = false;

            this.shop = this.gsm.game.add.sprite(367, this.gsm.game.world.height - 280);
            this.group.add(this.shop);
            this.shop.body.setSize(75, 105);
            this.shop.body.immovable = true;
            this.shop.body.allowGravity = false;

            this.inn = this.gsm.game.add.sprite(1640, this.gsm.game.world.height - 275);
            this.group.add(this.inn);
            this.inn.body.setSize(75, 105);
            this.inn.body.immovable = true;
            this.inn.body.allowGravity = false;

            this.dungeon = this.gsm.game.add.sprite(3550, this.gsm.game.world.height - 350);
            this.group.add(this.dungeon);
            this.dungeon.body.setSize(170, 170);
            this.dungeon.body.immovable = true;
            this.dungeon.body.allowGravity = false;
        }

        /**
         * Gets the floor of the graphic
         */
        public getFloor(): Phaser.Sprite {
            return this.floor;
        }

        /**
         * Gets the shop sprite
         */
        public getShop(): Phaser.Sprite {
            return this.shop;
        }

        /**
         * Gets the inn sprite
         */
        public getInn(): Phaser.Sprite {
            return this.inn;
        }

        /**
         * Gets the dungeon sprite
         */
        public getDungeon(): Phaser.Sprite {
            return this.dungeon;
        }

    }
}