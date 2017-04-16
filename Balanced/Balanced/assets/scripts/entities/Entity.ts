module ENTITIES {

    /**
     * Basic entity class
     * @author Anthony
     */
    export class Entity extends Phaser.Sprite{
        
        protected gsm: States.GameStateManager;

        constructor(gsm: States.GameStateManager, x: number, y: number, key?: string | Phaser.RenderTexture
                | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(gsm.game, x, y, key, frame);
            
            this.gsm = gsm;
        }

        /**
         * Gets a random effect for the FCT
         */
        public getRandomEffect(): string {
            var effectArray = ['smoke', 'physics', 'fade'];
            var randomNumber = Math.floor(Math.random() * effectArray.length) + 1;
            return effectArray[randomNumber];
        }
    }
}