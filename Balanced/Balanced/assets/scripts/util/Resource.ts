module UTIL {
    /**
     * Simple intermediate class to represent a Phaser asset.
     *
     * @author Anthony
     */
    export class Resource {
        public uid: number;
        public key: string;
        public assetUrl: string

        constructor(key: string, assetUrl: string, uid: number) {
            this.key = key;
            this.uid = uid;
            this.assetUrl = assetUrl;
        }
    }
}