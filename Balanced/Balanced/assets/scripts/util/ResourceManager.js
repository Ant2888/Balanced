var UTIL;
(function (UTIL) {
    /**
     * Standard asset manager. This will let anyone find asset keys off of ID's.
     *
     * @author Anthony
     */
    var ResourceManager = (function () {
        function ResourceManager(gsm) {
            this.gsm = gsm;
        }
        /**
         * Attemps to add a resource to the game.
         * @param res    Resource to add
         * @param overwrite  If a value is found should it overwrite.
         * @param callBack   The function used to ADD the resource. It takes one argument
         *                   which is the resource passed.
         * @param thisArg    The context of this.
         */
        ResourceManager.prototype.addResource = function (res, overwrite, callBack, thisArg) {
            if (!overwrite && this.resourceExists(res) == true)
                return false;
            if (callBack === undefined || callBack === null)
                return false;
            if (thisArg !== undefined && thisArg !== null)
                callBack.bind(thisArg);
            callBack(res);
            this.resources[res.uid] = res;
            return true;
        };
        /**
         * Checks to see if the resource given exists inside the set.
         *
         * @param res The resource to check against the set.
         * @returns Whether or not the resource exists already.
         */
        ResourceManager.prototype.resourceExists = function (res) {
            return this.resources[res.uid] !== undefined || this.resources[res.uid] !== null;
        };
        return ResourceManager;
    }());
    UTIL.ResourceManager = ResourceManager;
})(UTIL || (UTIL = {}));
//# sourceMappingURL=ResourceManager.js.map