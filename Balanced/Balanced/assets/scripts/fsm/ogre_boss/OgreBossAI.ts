module FSM {

    export class OgreBossAI extends StateSystem {

        public p1: OgreBossP1State;
        public p2: OgreBossP2State;

        constructor(gsm: States.GameStateManager, ai: ENTITIES.OgreBoss,
            player: ENTITIES.Player) {
            super(gsm, ai, player);
            this.initStates();
        }

        private initStates(): void {
            this.p1 = new OgreBossP1State(this, this.gsm);
            this.p2 = new OgreBossP2State(this, this.gsm);
            this.curState = this.p1;
        }

    }
}