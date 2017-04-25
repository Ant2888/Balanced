var UTIL;
(function (UTIL) {
    /**
     * This class helps keep track of already added audio and allows
     * play by ID if it already exists. Also good for local GC.
     * @author Anthony
     */
    var JukeBox = (function () {
        function JukeBox(gsm) {
            this.gsm = gsm;
            this.jukeMap = {};
        }
        /**
         * Attempts to stop some music if it is playing
         */
        JukeBox.prototype.stopByID = function (id) {
            if (this.jukeMap[id] === undefined || this.jukeMap[id] === null)
                return false;
            var music = (this.jukeMap[id]);
            music.stop();
            return true;
        };
        /**
         * Attempts to find and play a sound by ID
         * @param id
         */
        JukeBox.prototype.playByID = function (id, marker, position, volume, loop, forceRestart) {
            if (this.jukeMap[id] === undefined || this.jukeMap[id] === null)
                return false;
            var music = (this.jukeMap[id]);
            music.play(marker, position, volume, loop, forceRestart);
            return true;
        };
        JukeBox.prototype.addSound = function (id, volume, loop, connect) {
            if (this.jukeMap[id] !== undefined && this.jukeMap[id] !== null)
                return;
            this.jukeMap[id] = this.gsm.game.add.audio(id, volume, loop, connect);
        };
        JukeBox.prototype.findSound = function (id) {
            if (this.jukeMap[id] === undefined || this.jukeMap[id] === null)
                return null;
            return this.jukeMap[id];
        };
        JukeBox.prototype.destroyMap = function () {
            Object.keys(this.jukeMap).forEach(function (k, v) {
                (this.jukeMap[k]).destroy();
            }, this);
            this.jukeMap = {};
        };
        JukeBox.prototype.stopAll = function () {
            Object.keys(this.jukeMap).forEach(function (k, v) {
                (this.jukeMap[k]).stop();
            }, this);
        };
        JukeBox.prototype.randomPlayByID = function (id, prcToPlay, marker, position, volume, loop, forceRestart) {
            var chance = Math.floor(Math.random() * (100 - 1 + 1) + 1);
            if (chance > prcToPlay)
                return false;
            return this.playByID(id, marker, position, volume, loop, forceRestart);
        };
        return JukeBox;
    }());
    UTIL.JukeBox = JukeBox;
})(UTIL || (UTIL = {}));
//# sourceMappingURL=JukeBox.js.map