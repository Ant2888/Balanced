module COMBAT {
    export abstract class AbilityManager {

        protected ent: ENTITIES.Entity;
        protected energyMan: EnergyManager;
        protected gsm: States.GameStateManager

        constructor(ent: ENTITIES.Entity, energyMan: EnergyManager, gsm: States.GameStateManager) {
            this.ent = ent;
            this.energyMan = energyMan;
            this.gsm = gsm;
        }

    }
}