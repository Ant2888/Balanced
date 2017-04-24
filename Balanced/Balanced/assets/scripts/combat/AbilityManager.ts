module COMBAT {

    /**
     * ABM is used to control all abilities for a given entity
     * @author Anthony
     */
    export abstract class AbilityManager {

        protected ent: ENTITIES.Entity;
        protected energyMan: EnergyManager;
        protected gsm: States.GameStateManager

        constructor(ent: ENTITIES.Entity, gsm: States.GameStateManager, energyMan?: EnergyManager) {
            this.ent = ent;

            if (energyMan === undefined || energyMan === null)
                energyMan = new EnergyManager(gsm, ent);

            this.energyMan = energyMan;
            this.gsm = gsm;
        }

        /**
         * All entities with abilities should attempt to cast through here.
         * To discern which attack enums or numeric ordinals should be used and switched over.
         * @param ability The ordinal that represents the ability to cast.
         */
        public abstract attemptCast(ability: number): boolean;

        public getEnergyManager(): EnergyManager {
            return this.energyMan;
        }
    }
}