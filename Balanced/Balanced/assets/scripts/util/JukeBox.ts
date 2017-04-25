module UTIL {

    /**
     * This class helps keep track of already added audio and allows
     * play by ID if it already exists. Also good for local GC.
     * @author Anthony
     */
    export class JukeBox {

        //Simple hashmap
        public jukeMap: object;
        protected gsm: States.GameStateManager;

        constructor(gsm: States.GameStateManager) {
            this.gsm = gsm;
            this.jukeMap = {};
        }

        /**
         * Attempts to stop some music if it is playing
         */
        public stopByID(id: string): boolean{
            if (this.jukeMap[id] === undefined || this.jukeMap[id] === null)
                return false;

            var music = <Phaser.Sound>(this.jukeMap[id]);
            music.stop();
            return true;
        }

        /**
         * Attempts to find and play a sound by ID
         * @param id
         */
        public playByID(id: string, marker?: string, position?: number,
            volume?: number, loop?: boolean, forceRestart?: boolean): boolean {
            if (this.jukeMap[id] === undefined || this.jukeMap[id] === null)
                return false;

            var music = <Phaser.Sound>(this.jukeMap[id]);
            music.play(marker, position, volume, loop, forceRestart);
            return true;
        }

        public addSound(id: string, volume?: number, loop?: boolean, connect?: boolean): void {
            if (this.jukeMap[id] !== undefined && this.jukeMap[id] !== null)
                return;

            this.jukeMap[id] = this.gsm.game.add.audio(id, volume, loop, connect);
        }

        public findSound(id: string): Phaser.Sound {
            if (this.jukeMap[id] === undefined || this.jukeMap[id] === null)
                return null;

            return this.jukeMap[id];
        }

        public destroyMap(): void {
            Object.keys(this.jukeMap).forEach(function (k, v) {
                (<Phaser.Sound>(this.jukeMap[k])).destroy();
            }, this);

            this.jukeMap = {};
        }

        public stopAll(): void {
            Object.keys(this.jukeMap).forEach(function (k, v) {
                (<Phaser.Sound>(this.jukeMap[k])).stop();
            }, this);
        }

        public randomPlayByID(id: string, prcToPlay?: number, marker?: string, position?: number,
            volume?: number, loop?: boolean, forceRestart?: boolean): boolean {
            var chance = Math.floor(Math.random() * (100 - 1 + 1) + 1);

            if (chance > prcToPlay)
                return false;

            return this.playByID(id, marker, position, volume, loop, forceRestart);
        }
    }

}