module FSM {

    export class MageBossAI extends StateSystem {

        public p1: MageBossP1State;
        public p2: MageBossP2State;

        constructor(gsm: States.GameStateManager, ai: ENTITIES.MageBoss,
            player: ENTITIES.Player) {
            super(gsm, ai, player);
            this.initStates();
        }

        private initStates(): void {
            this.p1 = new MageBossP1State(this, this.gsm);
            this.p2 = new MageBossP2State(this, this.gsm);
            this.curState = this.p1;
        }

    }
}