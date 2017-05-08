module FSM {

    export class CastSpellState extends FiniteState {

        public EPSILON = 10;
        public gcd_up: boolean
        
        constructor(sys: MageStateSystem, gsm: States.GameStateManager) {
            super(sys, gsm);
            this.gcd_up = true;
        }

        public deElevate(): void {

        }

        public elevate(): void {
            // No case to elevate
        }

        public doLogic(): void {

            if (!this.gcd_up)
                return;

        }

        public checkCondition(): void {
            if (this.delvLogic())
                this.deElevate();
        }

        private delvLogic(): boolean {
            return false;
        }

    }

}