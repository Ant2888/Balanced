module FSM {

    export class MageBossP2State extends FiniteState {

        constructor(sys: MageBossAI, gsm: States.GameStateManager) {
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