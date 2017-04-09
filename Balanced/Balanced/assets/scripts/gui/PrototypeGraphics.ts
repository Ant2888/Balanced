module GUI {
    /**
    *This is the prototype gui of the game
    *
    * @author Emerson
    */
    export class PrototypeGraphics extends GameObject {

        private backgroundImage: Phaser.Sprite
                
        private gsm: States.GameStateManager;

        constructor(group: Phaser.Group) {
            super(203, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            
            
        }   
    }
}