///<referenced path = "../States/GameStateManager.ts"/>
var GUI;
(function (GUI) {
    /**
     * An abstract class that acts as a widget for anything that
     * should be rendered in game.
     *
     * @author Anthony
     */
    var Drawable = (function () {
        /**
         * Creates the drawable.
         * @param parent The parent of the drawable
         */
        function Drawable(parent) {
            this.parent = parent;
        }
        /**
         * Gets the parent of the drawable.
         *
         * @returns The parent of the drawable
         */
        Drawable.prototype.getParent = function () {
            return parent;
        };
        /**
         * Set the parent of the drawable.
         *
         * @param parent The new parent of the drawable.
         */
        Drawable.prototype.setParent = function (parent) {
            this.parent = parent;
        };
        /**
         * The draw method to be overriden. This method should tell
         * phaser HOW to draw this item.
         */
        Drawable.prototype.draw = function (gsm) { };
        return Drawable;
    }());
    GUI.Drawable = Drawable;
})(GUI || (GUI = {}));
//# sourceMappingURL=Drawable.js.map