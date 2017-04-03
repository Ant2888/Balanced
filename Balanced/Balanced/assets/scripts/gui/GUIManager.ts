module GUI {
    /**
     * This class will manage ALL GUI elements of the game.
     * this may also include any actual game elements but that is
     * left to each state.
     *
     * @author Anthony
     */
    export class GUIManager {
        /**
         * The instance of the GSM
         */
        protected gsm: States.GameStateManager;

        /**
         * The groups that will be present in the current state
         */
        protected groups: GUI.GameObject[];

        constructor(gsm: States.GameStateManager) {
            this.gsm = gsm;
            this.groups = new Array();
        }

        /**
         * Adds (to the end) the group into the manager.
         * @param group
         */
        public addGroup(group: GUI.GameObject): void {
            group.initialize(this.gsm);
            this.groups.push(group);
        }

        /**
         * Destroys all groups. This will unrender them AND null them. Use this
         * for ending a state.
         */
        public destroyAll(): void {
            this.groups.forEach(function (g) {
                g.getGroup().removeAll(true);
            });
        }

        /**
         * Destroys a particular group if it is found in the array.
         * This will destroy the entities in the group.
         * @param group
         */
        public destroyGroup(group: Phaser.Group): void {
            if (group === undefined || group === null)
                return;

            var ind = 0;

            for (; ind < this.groups.length; ind++)
                if (this.groups[ind].group == group)
                    break;

            if (ind == this.groups.length)
                return;

            this.groups.splice(ind, 1);
            group.destroy(true);
        }

        /**
         * Removes an object from the group list. Does not destroy.
         * @param gameObj GameObject to search by
         */
        public removeObject(gameObj: GameObject) {
            var ind = this.groups.indexOf(gameObj);

            if (ind >= 0)
                this.groups.splice(ind, 1);
        }

        /**
         * Looks inside the group list for an object by id.
         * If multiple are found it will return all of them.
         * @param id The id to search by.
         */
        public findByID(id: any): GUI.GameObject[]{
            var filtered = this.groups.filter(function (e) { return e.getParent() == id });
            return filtered;
        }

        /**
         * Returns all the groups that are in the state.
         */
        public getGroups(): GameObject[] {
            return this.groups;
        }

        /**
         * Sets the visibility of a give group.
         * @param id The id to search for.
         * @param visible Whether to enable or disable
         */
        public setVisibility(id: any, visible: boolean): void {
            this.groups.forEach(function (e) {
                if (e.getParent() == id)
                    e.getGroup().exists = visible;
            });
        }

    }
}