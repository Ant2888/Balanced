module FSM {
    /**
     * We should be dead in this state
     */
    export class OgreBossP2State extends FiniteState {

        constructor(sys: OgreBossAI, gsm: States.GameStateManager) {
            super(sys, gsm);
        }

        public deElevate(): void {
            this.system.curState = (<OgreBossAI>this.system).p1;
        }

        public elevate(): void {

        }

        public doLogic(): void {

        }

        public checkCondition(): void {

        }

    }

}