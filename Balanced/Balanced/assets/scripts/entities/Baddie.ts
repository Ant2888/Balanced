module ENTITIES {
    /**
     * This is just a test of the baddie entities
     * @author Anthony
     */
    export class Baddie extends Entity {


        constructor(gsm: States.GameStateManager, x: number, y: number, key?: string | Phaser.RenderTexture
            | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(gsm, x, y, key, frame);

            //this.abm = new COMBAT.PlayerAbilities(this, gsm);
            this.addOnDeathCallBack(function () { this.kill() }, this);
        }

        public dealWithOverlap(player: Phaser.Sprite, me: Phaser.Sprite | Phaser.Group): void {
            if (!this.stunned) {
                var damage = this.randomValWithRandomness(15, 15);
                (<Player>player).dealDamage(damage, damage > (damage + 7.5), 'red', true, true, 1000, {}, this.facingLeft);
            }
        }
        
        protected createAnimations(): void {}
    }
}