module ENTITIES {
    /**
     * This is just a test of the baddie entities
     * @author Anthony
     */
    export class Baddie extends Entity {


        constructor(gsm: States.GameStateManager, x: number, y: number, key?: string | Phaser.RenderTexture
            | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(gsm, x, y, key, frame);

            this.abm = new COMBAT.PlayerAbilities(this, gsm);
        }


    }
}