module COMBAT {
    export abstract class AbilityManager {

        protected ent: ENTITIES.Entity;
        protected energyMan: EnergyManager;
        protected gsm: States.GameStateManager

        constructor(ent: ENTITIES.Entity, gsm: States.GameStateManager, energyMan?: EnergyManager) {
            this.ent = ent;

            if (energyMan === undefined || energyMan === null)
                energyMan = new EnergyManager(ent);

            this.gsm = gsm;
        }

        public abstract attemptCast(ability: number): boolean;

        public getEnergyManager(): EnergyManager {
            return this.energyMan;
        }
    }
}