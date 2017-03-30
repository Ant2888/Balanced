
module GUI {
    /**
     * An abstract class that acts as a widget for anything that
     * should be rendered in game.
     *
     * @author Anthony
     */
    export abstract class GameObject {
        /**
         * The parent that can be used as an ID for the obj.
         */ 
        protected parent: any;

        /**
         * The group of the GameObject(s)
         */ 
        public group: Phaser.Group

        /**
         * Initializes the game object.
         * @param parent Parent of the game object (to be identified by)
         * @param group The group of the object that is being rendered
         */
        constructor(parent: any, group: Phaser.Group) {
            this.parent = parent;
            this.group = group;
        }

        public abstract initialize(gsm: States.GameStateManager): void;

        /**
         * Gets the parent of the object.
         *
         * @returns The parent of the obj
         */
        public getParent(): any {
            return this.parent;
        }

        /**
         * Set the parent of the obj.
         *
         * @param parent The new parent of the obj.
         */
        public setParent(parent: any): void {
            this.parent = parent;
        }

        /**
         * Sets the group of the object.
         * @param group The group of the object.
         */
        public setGroup(group: Phaser.Group): void {
            this.group = group;
        }

        /**
         * Returns the group of the object.
         */
        public getGroup(): Phaser.Group {
            return this.group;
        }
    }
}