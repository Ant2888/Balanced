///<referenced path = "States"/>

module GUI{
    export class TestDrawable extends Drawable {

        graphics: Phaser.Graphics;
        public x: number;
        public y: number;

        constructor(parent: any) {
            super(parent);
            this.x = 0;
            this.y = 0;
        }

        public draw(gsm: States.GameStateManager): void {
            if (this.graphics === undefined || this.graphics === null)
                this.graphics = gsm.game.add.graphics(100, 100);

            this.graphics.lineStyle(2, 0x0000FF, 1);
            this.graphics.drawRect(this.x, this.y, 100, 100);
        }
    }
}