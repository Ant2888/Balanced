module FSM {
    export class StateSystem {

        public curState: FiniteState;
        public ai: ENTITIES.Entity;
        public player: ENTITIES.Entity;
        public gsm: States.GameStateManager;

        constructor(gsm: States.GameStateManager, ai: ENTITIES.Entity,
            player: ENTITIES.Player) {
            this.ai = ai;
            this.player = player;
            this.gsm = gsm;
        }

        public updateSystem(): void {
            this.curState.checkCondition();
            this.curState.doLogic();
        }
    }
}