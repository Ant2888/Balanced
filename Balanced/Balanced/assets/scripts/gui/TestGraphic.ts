module GUI {
    export class TestGraphic extends GameObject{
        
        public box: Phaser.Sprite;

        constructor(group: Phaser.Group) {
            super(0, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.box = gsm.game.add.sprite(150, 150, 'logo2');
            this.group.add(this.box);
        }

        public getBox(): Phaser.Sprite {
            return this.box;
        }

        public setBox(num: number): void {
            this.box.x = num;
        }

    }
}