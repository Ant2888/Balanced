module ENTITIES {
    /**
     * @author Anthony
     */
    export class Ogre extends Entity {

        public static ABILITY_ONE = 1;
        public ABILITY_ONE_COST = 75;

        //AI STUFF
        public WONDER_RANGE = 64 * 1;
        public VISION_X = 64 * 3;
        public VISION_Y = 64 * 3;
        public WALK_INTERVAL = [1000, 4000];
        public WALK_SPEED = 150;
        //END AI

        public player: ENTITIES.Player;
        public startPosition: Phaser.Point;
        public stateLogic: FSM.OgreStateSystem;

        constructor(gsm: States.GameStateManager, x: number, y: number, player: ENTITIES.Player,
            key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture,
            frame?: string | number) {
            super(gsm, x, y, key, frame);

            this.player = player;
            this.startPosition = new Phaser.Point(x, y);
            this.abm = new COMBAT.OgreAbilities(this, gsm);

            this.addOnDeathCallBack(function () {
                var val = this.randomValWithRandomness(2, 1);
                this.gsm.musicBox.playByID(val == 3 ? 'OgreDeath1' :
                    (val == 2 ? 'OgreDeath2' : 'OgreDeath3'),
                    undefined, undefined, UTIL.SFX, false, false);
                this.animations.currentAnim.onComplete.add(() => { this.kill() }, this);
            }, this);

            this.addOnDamageCallback(function (d, h) {
                if (h == 0)
                    return;

                var val = this.randomValWithRandomness(2, 2);
                this.gsm.musicBox.playByID(val == 4 ? 'OgreHurt2' :
                    (val == 3 ? 'OgreHurt3' : (val == 2 ? 'OgreHurt4':'OgreHurt5')),
                    undefined, undefined, UTIL.SFX, false, false);
            }, this);

            this.stateLogic = new FSM.OgreStateSystem(this.gsm, this, this.player);
        }

        public dealWithOverlap(player: Phaser.Sprite, me: Phaser.Sprite | Phaser.Group): void {

        }

        protected createAnimations(): void {
            this.animations.add(Entity.walkL, [7, 8, 9, 10, 11, 12, 13], 15, false);
            this.animations.add(Entity.walkR, [14, 15, 16, 17, 18, 19, 20], 15, false);

            this.animations.add(Entity.dieL, [49, 50, 51], 8, false);
            this.animations.add(Entity.dieR, [56, 57, 58], 8, false);

            this.animations.add(Entity.idleL, [0], 1, false);
            this.animations.add(Entity.idleR, [2], 1, false);

            this.animations.add(Entity.flinchL, [35, 36, 37], 10, false);
            this.animations.add(Entity.flinchR, [42, 43, 44], 10, false);

            this.animations.add(Entity.attackR, [77, 78, 79, 80, 81, 82], 15, false);
            this.animations.add(Entity.attackL, [66, 67, 68, 69, 70, 71], 15, false);

            this.animations.add(Entity.jumpL, [21, 22, 23], 15, false);
            this.animations.add(Entity.jumpR, [28, 29, 30], 15, false);
            this.jumpL_lastFrame = 23;
            this.jumpR_lastFrame = 30;
        }

        public loadEntitySounds(box: UTIL.JukeBox): void {
            box.addSound('OgreAttack1');
            box.addSound('OgreAttack2');
            box.addSound('OgreAttack3');
            box.addSound('OgreAttack4');
            box.addSound('OgreDeath1');
            box.addSound('OgreDeath2');
            box.addSound('OgreDeath3');
            box.addSound('OgreHurt2');
            box.addSound('OgreHurt3');
            box.addSound('OgreHurt4');
            box.addSound('OgreHurt5');
        } 
    }

}