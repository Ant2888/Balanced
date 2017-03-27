///<referenced path="GameStateManager.ts"/>
module States {
    export class State {

        protected gsm: States.GameStateManager;

        constructor(gsm: States.GameStateManager) {
            this.gsm = gsm;
        }

        public update(): void { }
        public render(): void { }
        public init(): void { }
        public startup(): boolean { return false; }
        public end(): boolean { return false; }
    }
}