module COMBAT {
    /**
     * Simple ability class for the player
     * @author Anthony
     */
    export class PlayerAbilities extends AbilityManager{

        constructor(ent: ENTITIES.Player, gsm: States.GameStateManager, energyMan?: EnergyManager) {
            super(ent, gsm, energyMan);
        }

        public attemptCast(ability: number): boolean {
            switch (ability) {
                case 1:
                    return this.castAbilityOne();
                case 2:
                    return this.castAbilityTwo();
                case 3:
                    return this.castAbilityThree();
                case 4:
                    return this.castAbilityFour();
                default:
                    return false;
            }
        }

        public castAbilityOne(): boolean {
            return false;
        }

        public castAbilityTwo(): boolean {
            return false;
        }

        public castAbilityThree(): boolean {
            return false;
        }

        public castAbilityFour(): boolean {
            return false;
        }
    }
}