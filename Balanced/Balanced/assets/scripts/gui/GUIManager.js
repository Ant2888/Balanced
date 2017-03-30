var GUI;
(function (GUI) {
    /**
     * This class will manage ALL GUI elements of the game.
     * this may also include any actual game elements but that is
     * left to each state.
     *
     * @author Anthony
     */
    var GUIManager = (function () {
        function GUIManager(gsm) {
            this.gsm = gsm;
            this.groups = new Array();
        }
        /**
         * Adds (to the end) the group into the manager.
         * @param group
         */
        GUIManager.prototype.addGroup = function (group) {
            group.initialize(this.gsm);
            this.groups.push(group);
        };
        /**
         * Destroys all groups. This will unrender them AND null them. Use this
         * for ending a state.
         */
        GUIManager.prototype.destroyAll = function () {
            this.groups.forEach(function (g) {
                g.getGroup().destroy();
            });
        };
        /**
         * Destroys a particular group if it is found in the array.
         * This will destroy the entities in the group.
         * @param group
         */
        GUIManager.prototype.destroyGroup = function (group) {
            if (group === undefined || group === null)
                return;
            var ind = 0;
            for (; ind < this.groups.length; ind++)
                if (this.groups[ind].group == group)
                    break;
            if (ind == this.groups.length)
                return;
            this.groups.splice(ind, 1);
        };
        /**
         * Removes an object from the group list. Does not destroy.
         * @param gameObj GameObject to search by
         */
        GUIManager.prototype.removeObject = function (gameObj) {
            var ind = this.groups.indexOf(gameObj);
            if (ind >= 0)
                this.groups.splice(ind, 1);
        };
        /**
         * Looks inside the group list for an object by id.
         * If multiple are found it will return all of them.
         * @param id The id to search by.
         */
        GUIManager.prototype.findByID = function (id) {
            var filtered = this.groups.filter(function (e) { return e.getParent() == id; });
            return filtered;
        };
        /**
         * Returns all the groups that are in the state.
         */
        GUIManager.prototype.getGroups = function () {
            return this.groups;
        };
        /**
         * Sets the visibility of a give group.
         * @param id The id to search for.
         * @param visible Whether to enable or disable
         */
        GUIManager.prototype.setVisibility = function (id, visible) {
            this.groups.forEach(function (e) {
                if (e.getParent() == id)
                    e.getGroup().exists = visible;
            });
        };
        return GUIManager;
    }());
    GUI.GUIManager = GUIManager;
})(GUI || (GUI = {}));
//# sourceMappingURL=GUIManager.js.map