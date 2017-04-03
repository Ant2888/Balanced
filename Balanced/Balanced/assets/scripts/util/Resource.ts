module UTIL {
    /**
     * Simple intermediate class to represent a Phaser asset.
     *
     * @author Anthony
     */
    export class Resource {
        /**
         * The unique identifier of the resource.
         */
        public uid: number;

        /** 
         *  The Phaser key to refer to in the game.
         */
        public key: string;

        /**
         *  This is the relative path URL for the asset.
         */
        public assetUrl: string

        constructor(key: string, assetUrl: string, uid: number) {
            this.key = key;
            this.uid = uid;
            this.assetUrl = assetUrl;
        }
    }
}