module FSM {

    export class IdleMageState extends FiniteState {

        public EPSILON = 10;

        constructor(sys: MageStateSystem, gsm: States.GameStateManager) {
            super(sys, gsm);
        }

        public deElevate(): void {
            // No case to elevate
        }

        public elevate(): void {
        }

        public doLogic(): void {
        }

        public checkCondition(): void {
        }
        

    }

}