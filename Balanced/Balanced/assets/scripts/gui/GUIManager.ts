///<referenced path = "../States/GameStateManager.ts" />
///<referenced path = "Drawable.ts" />

module GUI {
    /**
     * This class will manage ALL GUI elements of the game.
     * this may also include any actual game elements but that is
     * left to each state.
     *
     * @author Anthony
     */
    export class GUIManager {

        private gsm: States.GameStateManager;
        protected drawables: GUI.Drawable[]; //list of drawables

        /**
         * Initializes the GUIM with the GSM
         *
         * @param gsm The GameStateManager.
         */
        constructor(gsm: States.GameStateManager) {
            this.gsm = gsm;
            this.drawables = new Array();
        }

        /**
         * Clears ALL entries in the drawables array.
         */
        public clear(): void {
            this.drawables = new Array();
        }

        /**
         * Adds a drawable to the drawables array. This
         * will queue it to be drawn. Once added the order
         * is fixed; it is up to the caller to control the order
         * if anymore flexibility than 1st or last is required.
         *
         * @param drawable The drawable to add to the list.
         * @param first Whether to add to the front or last.
         *        Adding to the front will make it the MOST visible.
         */
        public add(drawable: GUI.Drawable, first = false): void {
            if (first == true) {
                this.drawables.push(drawable);
            } else {
                this.drawables.unshift(drawable);
            }
        }

        /**
         * This will remove all drawables of a certain parent from
         * the list. An example would be to get rid of all things that
         * are NOT being explicitly drawn from a particular instance.
         *
         * @param parent The parent for a set (or single) of drawables.
         */
        public removeByParent(parent: any): void {
            this.drawables = this.drawables
                .filter(function (e) { return e.getParent() !== parent });
        }

        /**
         * This will get all the drawables in the list for a given parent.
         * This should be used to keep track of what you removed if you so desire.
         *
         * @param parent The parent for a set (or single) of drawables.
         * @returns The list of drawables in the list.
         */
        public getAllByParent(parent: any): GUI.Drawable[] {
            return this.drawables
                .filter(function (e) { return e.getParent() === parent });
        }

        /**
         * Draws all the drawables in the list (left -> right).
         */
        public draw(): void {
            this.drawables.forEach(function (e) { e.draw(this.gsm) }, this);
        }
    }
}