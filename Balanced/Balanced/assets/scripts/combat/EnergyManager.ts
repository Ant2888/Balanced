module COMBAT {
    export class EnergyManager {

        private ent: ENTITIES.Entity;
        public energy: number;

        constructor(ent: ENTITIES.Entity) {
            this.ent = ent;
            this.energy = 100;
        }

        public useAbility(cost: number): boolean {
            if (this.energy - cost < 0)
                return false;

            this.energy -= cost;
            return true;
        }

        public regenEnergy(regenRate: number): void{
            if (this.energy + regenRate > 100) {
                this.energy = 100;
                return;
            }

            this.energy += regenRate;
        }

        public resetEnergy(): void {
            this.energy = 100;
        }

        public gainEnergy(gain: number): void {
            if (this.energy + gain > 100) {
                this.energy = 100;
                return;
            }

            this.energy += gain;
        }
    }
}