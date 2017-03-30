var UTIL;
(function (UTIL) {
    /**
     * Simple intermediate class to represent a Phaser asset.
     *
     * @author Anthony
     */
    var Resource = (function () {
        function Resource(key, assetUrl, uid) {
            this.key = key;
            this.uid = uid;
            this.assetUrl = assetUrl;
        }
        return Resource;
    }());
    UTIL.Resource = Resource;
})(UTIL || (UTIL = {}));
//# sourceMappingURL=Resource.js.map