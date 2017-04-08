module ENTITIES {

    export class Entity extends Phaser.Sprite{

        protected abilities: COMBAT.AbilityManager;
        protected energy: COMBAT.EnergyManager;
        protected gsm: States.GameStateManager;

        constructor(gsm: States.GameStateManager, x: number, y: number,
            abilities: COMBAT.AbilityManager, energy: COMBAT.EnergyManager,
            key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(gsm.game, x, y, key, frame);

            this.abilities = abilities;
            this.energy = energy;
            this.gsm = gsm;
        }

        public getAbilityManager(): COMBAT.AbilityManager {
            return this.abilities;
        }

        public getEnergyManager(): COMBAT.EnergyManager {
            return this.energy;
        }

        public setAbilityManager(ab: COMBAT.AbilityManager) {
            this.abilities = ab;
        }

        public setEnergyManager(em: COMBAT.EnergyManager) {
            this.energy = em;
        }
    }
}