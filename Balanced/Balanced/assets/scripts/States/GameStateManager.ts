///<referenced path="State.ts"/>
module States {
    export class GameStateManager {

        public game: Phaser.Game;
        protected state: States.State;

        constructor(game: Phaser.Game) {
            this.game = game;
        }

        public placeInitalState(s: States.State): void {
            this.state = s;
        }

        public getState(): States.State {
            return this.state;
        }

        public setState(s: States.State, start = false): void {
            if (s === undefined || s === null) {
                //TODO: ERROUT
            }

            if (this.state === undefined || this.state === null) {
                //TODO: ERROUT
            }

            if (this.state.end() == false) {
                //TODO: ERROUT
            }

            s.init();

            if (start && this.state.startup() == false) {
                //TODO: ERROUT
            }

            this.state = s;
        }

        public startState(): void {
            if (this.state.startup() == false) {
                //TODO: ERROUT
            }
        }

        public endState(): void {
            if (this.state.end() == false) {
                //TODO: ERROUT
            }
        }

        public update(): void {
            //TODO: DO PRE STATE CLIENT UPDATING HERE
            this.state.update();
            //TODO: DO POST STATE CLIENT UPDATING HERE
        }

        public render(): void {
            //TODO: DO PRE STATE CLIENT RENDERING HERE
            this.state.render();
            //TODO: DO POST STATE CLIENT RENDERING HERE
        }
    }
}