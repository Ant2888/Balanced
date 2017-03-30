var GUI;
(function (GUI) {
    /**
     * An abstract class that acts as a widget for anything that
     * should be rendered in game.
     *
     * @author Anthony
     */
    var GameObject = (function () {
        /**
         * Initializes the game object.
         * @param parent Parent of the game object (to be identified by)
         * @param group The group of the object that is being rendered
         */
        function GameObject(parent, group) {
            this.parent = parent;
            this.group = group;
        }
        /**
         * Gets the parent of the object.
         *
         * @returns The parent of the obj
         */
        GameObject.prototype.getParent = function () {
            return this.parent;
        };
        /**
         * Set the parent of the obj.
         *
         * @param parent The new parent of the obj.
         */
        GameObject.prototype.setParent = function (parent) {
            this.parent = parent;
        };
        /**
         * Sets the group of the object.
         * @param group The group of the object.
         */
        GameObject.prototype.setGroup = function (group) {
            this.group = group;
        };
        /**
         * Returns the group of the object.
         */
        GameObject.prototype.getGroup = function () {
            return this.group;
        };
        return GameObject;
    }());
    GUI.GameObject = GameObject;
})(GUI || (GUI = {}));
//# sourceMappingURL=GameObject.js.map