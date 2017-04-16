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
        

    }
}