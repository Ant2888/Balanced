module FSM {

    /**
     * @author Anthony
     */
    export class MageStateSystem extends StateSystem{

        public attack: CastSpellState;
        public idle: IdleMageState;

        constructor(gsm: States.GameStateManager, ai: ENTITIES.MageOgre,
            player: ENTITIES.Player) {
            super(gsm, ai, player);
            this.initStates();
        }

        private initStates(): void {
            this.attack = new CastSpellState(this, this.gsm);
            this.idle = new IdleMageState(this, this.gsm);
            this.curState = this.idle;
        }

    }
}