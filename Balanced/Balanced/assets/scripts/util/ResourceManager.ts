module UTIL {
    /**
     * Standard asset manager. This will let anyone find asset keys off of ID's.
     *
     * @author Anthony
     */
    export class ResourceManager {

        private gsm: States.GameStateManager;

        //HashSet
        private resources: object;

        constructor(gsm: States.GameStateManager) {
            this.gsm = gsm;
        }
        
       /**
        * Attemps to add a resource to the game.
        * @param res    Resource to add
        * @param overwrite  If a value is found should it overwrite.
        * @param callBack   The function used to ADD the resource.
        * @param passed   The reference to the resource just sent.
        * @param thisArg    The context of this.
        */
        public addResource(res: Resource, overwrite: boolean, callBack: (passed: Resource) => any, thisArg?: any): boolean {
            if (!overwrite && this.resourceExists(res) == true)
                return false;

            if (callBack === undefined || callBack === null)
                return false;

            thisArg.callBack(res);

            this.resources[res.uid] = res;

            return true;
        }

        /**
         * Checks to see if the resource given exists inside the set.
         *
         * @param res The resource to check against the set.
         * @returns Whether or not the resource exists already.
         */
        public resourceExists(res: Resource): boolean {
            return this.resources[res.uid] !== undefined ||this.resources[res.uid] !== null;
        }
    }

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