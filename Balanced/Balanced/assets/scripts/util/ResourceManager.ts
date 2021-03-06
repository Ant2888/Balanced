﻿module UTIL {
    /**
     * Standard asset manager. This will let anyone find asset keys off of ID's.
     *
     * @author Anthony
     */
    export class ResourceManager {
        
        //HashSet
        private resources: object;

        constructor() {
            var obj = {};
            this.resources = obj;
        }

        /**
         * Grabs the resource that is currently loaded.
         * @param uid The ID to search by.
         */
        public getResouce(uid: number): Resource {
            return this.resources[uid];
        }
        
       /**
        * Attemps to add a resource to the game.
        * @param res    Resource to add
        * @param overwrite  If a value is found should it overwrite.
        * @param callBack   The function used to ADD the resource. It takes one argument
        *                   which is the resource passed.
        * @param thisArg    The context of this.
        */
        public addResource(res: Resource, overwrite: boolean, callBack: any, thisArg?: any): boolean {
            if (!overwrite && this.resourceExists(res) == true)
                return false;

            if (callBack === undefined || callBack === null)
                return false;

            if (thisArg !== undefined && thisArg !== null)
                callBack = callBack.bind(thisArg);

            callBack(res);

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
}