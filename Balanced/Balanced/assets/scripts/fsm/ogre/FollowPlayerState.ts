module FSM {

    export class FollowPlayerState extends FiniteState {

        constructor(sys: OgreStateSystem, gsm: States.GameStateManager) {
            super(sys, gsm);
        }

        public deElevate(): void { }
        public elevate(): void { }
        public doLogic(): void { }
        public checkCondition(): void { }
    }

}