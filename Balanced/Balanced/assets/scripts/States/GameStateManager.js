///<referenced path="State.ts"/>
var States;
(function (States) {
    var GameStateManager = (function () {
        function GameStateManager(game) {
            this.game = game;
        }
        GameStateManager.prototype.placeInitalState = function (s) {
            this.state = s;
        };
        GameStateManager.prototype.getState = function () {
            return this.state;
        };
        GameStateManager.prototype.setState = function (s, start) {
            if (start === void 0) { start = false; }
            if (s === undefined || s === null) {
            }
            if (this.state === undefined || this.state === null) {
            }
            if (this.state.end() == false) {
            }
            s.init();
            if (start && this.state.startup() == false) {
            }
            this.state = s;
        };
        GameStateManager.prototype.startState = function () {
            if (this.state.startup() == false) {
            }
        };
        GameStateManager.prototype.endState = function () {
            if (this.state.end() == false) {
            }
        };
        GameStateManager.prototype.update = function () {
            //TODO: DO PRE STATE CLIENT UPDATING HERE
            this.state.update();
            //TODO: DO POST STATE CLIENT UPDATING HERE
        };
        GameStateManager.prototype.render = function () {
            //TODO: DO PRE STATE CLIENT RENDERING HERE
            this.state.render();
            //TODO: DO POST STATE CLIENT RENDERING HERE
        };
        return GameStateManager;
    }());
    States.GameStateManager = GameStateManager;
})(States || (States = {}));
//# sourceMappingURL=GameStateManager.js.map