module FSM {
    export abstract class FiniteState {
        
        protected system: StateSystem;

        constructor(sys: StateSystem, gsm: States.GameStateManager) {
            this.system = sys;
        }

        public abstract deElevate(): void;
        public abstract elevate(): void;
        public abstract doLogic(): void;
        public abstract checkCondition(): void;

    }
}