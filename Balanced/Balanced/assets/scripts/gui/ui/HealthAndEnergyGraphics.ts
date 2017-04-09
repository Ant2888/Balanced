module GUI {
    /**
    *This is the prototype state of the game
    *
    * @author Emerson
    */
    export class HealthAndEnergyGraphics extends GameObject {
        private gsm: States.GameStateManager;
        private ul_unitframe: Phaser.Image; 

        constructor(group: Phaser.Group) {
            super(204, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.ul_unitframe = gsm.game.add.sprite(0, 0, 'ul_ui');            
            this.ul_unitframe.fixedToCamera = true;
            this.group.add(this.ul_unitframe);

        }
    }    
}