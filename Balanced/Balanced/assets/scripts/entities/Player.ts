module ENTITIES {
    /**
     * The Player Entity class. This will represent the main character
     * @author Anthony
     */
    export class Player extends Entity {


        constructor(gsm: States.GameStateManager, x: number, y: number, key?: string | Phaser.RenderTexture
            | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(gsm, x, y, key, frame);

            this.abm = new COMBAT.PlayerAbilities(this, gsm);
        }

        protected createAnimations(): void {
            this.animations.add(Entity.walkL, [11, 12, 13, 14, 15, 16, 17, 18], 15, false);
            this.animations.add(Entity.walkR, [22, 23, 24, 25, 26, 27, 28, 29], 15, false);

            this.animations.add(Entity.dieL, [44, 45, 46, 47, 48, 49, 50, 51], 15, false);
            this.animations.add(Entity.dieR, [55, 56, 57, 58, 59, 60, 61, 62], 15, false);

            this.animations.add(Entity.idleL, [0], 1, false);
            this.animations.add(Entity.idleR, [6], 1, false);

            this.animations.add(Entity.flinchL, [2, 3, 4], 10, false);
            this.animations.add(Entity.flinchR, [8, 9, 10], 10, false);

            this.animations.add(Entity.attackR, [77, 78, 79, 80, 81, 82], 15, false);
            this.animations.add(Entity.attackL, [66, 67, 68, 69, 70, 71], 15, false);

            this.animations.add(Entity.jumpL, [33, 34, 35, 36, 37], 15, false);
            this.animations.add(Entity.jumpR, [38, 39, 40, 41, 42], 15, false);
            this.jumpL_lastFrame = 37;
            this.jumpR_lastFrame = 42;
        }

    }
}