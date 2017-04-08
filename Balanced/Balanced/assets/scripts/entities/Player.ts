module ENTITIES {
    export class Player extends Entity {

        constructor(gsm: States.GameStateManager, x: number, y: number,
            abilities: COMBAT.AbilityManager, energy: COMBAT.EnergyManager,
            key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(gsm, x, y, abilities, energy, key, frame);
        }
    }
}