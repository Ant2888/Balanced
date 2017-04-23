module GUI {
    /**
    *This is the town gui of the game
    *
    * @author Emerson
    */
    export class TownGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite;

        private shop: Phaser.Button;
        private inn: Phaser.Button;
        private dungeon: Phaser.Button;
        private hall: Phaser.Button;

        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(204, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.backgroundImage = gsm.game.add.sprite(0, 0, 'twn_background');
            this.group.add(this.backgroundImage);

            this.setShopButton(this.shopButtonPressed);
            this.setInnButton(this.innButtonPressed);
            this.setDungeonButton(this.dungeonButtonPressed);
            this.setHallButton(this.hallButtonPressed);
        }

        // initializes the buttons
        public setShopButton(func: any): void {
            this.shop = this.gsm.game.add.button(224, 416, 'twn_shop', func, this, 1, 0, 2);
            this.group.add(this.shop);
        }

        public setInnButton(func: any): void {
            this.inn = this.gsm.game.add.button(928, 288, 'twn_inn', func, this, 1, 0, 2);
            this.group.add(this.inn);
        }

        public setDungeonButton(func: any): void {
            this.dungeon = this.gsm.game.add.button(1028, 0, 'twn_dungeon', func, this, 2, 0, 1);
            this.group.add(this.dungeon);
        }

        public setHallButton(func: any): void {
            this.hall = this.gsm.game.add.button(640, 0, 'twn_hall', func, this, 1, 0);
            this.group.add(this.hall);
        }

        private shopButtonPressed(): any {
            console.log('shop button pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private innButtonPressed(): any {
            console.log('inn button pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        }

        private dungeonButtonPressed(): any {
            console.log('dungeon button pressed');
            this.gsm.setState(States.LEVEL_SELECT_STATE);
        }

        private hallButtonPressed(): any {
            console.log('hall button pressed');
            //this.gsm.setState(States.LEVEL_SELECT_STATE);
        }

        // getters
        public getBackgroundImage(): Phaser.Sprite {
            return this.backgroundImage;
        }

        public getShop(): Phaser.Button {
            return this.shop;
        }

        public getInn(): Phaser.Button {
            return this.inn;
        }

        public getDungeon(): Phaser.Button {
            return this.dungeon;
        }
    }
}