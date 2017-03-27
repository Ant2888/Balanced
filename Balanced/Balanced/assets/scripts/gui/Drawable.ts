///<referenced path = "../States/GameStateManager.ts"/>

module GUI {
    /**
     * An abstract class that acts as a widget for anything that
     * should be rendered in game.
     *
     * @author Anthony
     */
    export class Drawable {
        /**
         * The parent who owns this drawable. Use this to differentiate
         * this drawable from other states, stages, etc.
         */ 
        protected parent: any;

        /**
         * Creates the drawable.
         * @param parent The parent of the drawable
         */
        constructor(parent: any) {
            this.parent = parent;
        }

        /**
         * Gets the parent of the drawable.
         *
         * @returns The parent of the drawable
         */
        public getParent(): any {
            return parent;
        }

        /**
         * Set the parent of the drawable.
         *
         * @param parent The new parent of the drawable.
         */
        public setParent(parent: any): void {
            this.parent = parent;
        }

        /**
         * The draw method to be overriden. This method should tell
         * phaser HOW to draw this item.
         */
        public draw(gsm: States.GameStateManager): void { }
    }
}