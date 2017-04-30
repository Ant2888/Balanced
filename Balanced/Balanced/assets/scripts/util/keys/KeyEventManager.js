var UTIL;
(function (UTIL) {
    /**
     * Simple key event manager. This can be used
     * to make key even easier. Also allows prebuilt
     * control sequences to be used.
     * @author Anthony
     */
    var KeyEventManager = (function () {
        /**
         * Manager needs to see the game
         * @param game
         */
        function KeyEventManager(game) {
            this.game = game;
        }
        /**
         * Add an event to the keyboard
         * @param event
         */
        KeyEventManager.prototype.addKeyEvent = function (event) {
            var _this = this;
            //If you didn't specify a context just continue
            if (event.context === undefined || event.context === null)
                return;
            this.game.input.keyboard.callbackContext = this;
            //Setup the events with their respective keys
            if (event.onDown !== null && event.onDown !== undefined) {
                if (event.key >= 0) {
                    var _event1 = event.onDown;
                    var _hook1 = function (e) {
                        _this.eventCallback(event.key, e.keyCode, _event1, event.context);
                    };
                    var _tohk1 = this.game.input.keyboard.onDownCallback;
                    if (_tohk1 === undefined || _tohk1 == null) {
                        this.game.input.keyboard.onDownCallback = function (e) {
                            _hook1.call(_this, e);
                        };
                    }
                    else {
                        this.game.input.keyboard.onDownCallback = function (e) {
                            _tohk1.call(_this, e);
                            _hook1.call(_this, e);
                        };
                    }
                }
            }
            if (event.onUp !== null && event.onUp !== undefined) {
                if (event.key >= 0) {
                    var _event2 = event.onUp;
                    var _hook2 = function (e) {
                        _this.eventCallback(event.key, e.keyCode, _event2, event.context);
                    };
                    var _tohk2 = this.game.input.keyboard.onUpCallback;
                    if (_tohk2 === undefined || _tohk2 == null) {
                        this.game.input.keyboard.onUpCallback = function (e) {
                            _hook2.call(_this, e);
                        };
                    }
                    else {
                        this.game.input.keyboard.onUpCallback = function (e) {
                            _tohk2.call(_this, e);
                            _hook2.call(_this, e);
                        };
                    }
                }
            }
            if (event.onPress !== null && event.onPress !== undefined) {
                if (event.key >= 0) {
                    var _event3 = event.onPress;
                    var _hook3 = function (e) {
                        _this.eventCallback(event.key, e.keyCode, _event3, event.context);
                    };
                    var _tohk3 = this.game.input.keyboard.onPressCallback;
                    if (_tohk3 === undefined || _tohk3 == null) {
                        this.game.input.keyboard.onPressCallback = function (e) {
                            _hook3.call(_this, e);
                        };
                    }
                    else {
                        this.game.input.keyboard.onPressCallback = function (e) {
                            _tohk3.call(_this, e);
                            _hook3.call(_this, e);
                        };
                    }
                }
            }
            //-
        };
        /**
         * Clears all current key captures
         */
        KeyEventManager.prototype.clear = function () {
            this.game.input.keyboard.clearCaptures();
        };
        //Helper to call and filter out keys we don't want
        KeyEventManager.prototype.eventCallback = function (keyW, keyCur, callback, context) {
            if (keyW != keyCur)
                return;
            callback.call(context, keyW);
        };
        return KeyEventManager;
    }());
    UTIL.KeyEventManager = KeyEventManager;
})(UTIL || (UTIL = {}));
//# sourceMappingURL=KeyEventManager.js.map