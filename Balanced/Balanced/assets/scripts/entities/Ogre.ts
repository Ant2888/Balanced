module ENTITIES {
    /**
     * @author Anthony
     */
    export class Ogre extends Entity {

        public static ABILITY_ONE = 1;
        public ABILITY_ONE_COST = 50;
        public ab1_mod: COMBAT.Ability;

        //AI STUFF
        public WONDER_RANGE = 64 * 1;
        public VISION_X = 64 * 3;
        public VISION_Y = 64 * 3;
        public WALK_INTERVAL = [1000, 4000];
        public WALK_SPEED = 125;
        public ATTACK_DISTANCE = 60;
        public GCD = 1200;
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

            this.attackSize = { width: 96 - 4, height: 96 - 26, wOffset: 2, hOffset: 26 };
            this.hitSize = { width: 96 - 16, height: 96 - 30, wOffset: 8, hOffset: 30  };

            this.body.setSize(this.hitSize.width, this.hitSize.height,
                this.hitSize.wOffset, this.hitSize.hOffset);

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

            this.ab1_mod = {
                dmg: this.ATTACK * .25, flinchTime: Entity.FLINCH_TIME + 200,
                knockback: { dx: 25, dy: -25, time: 500 }
            };
        }

        public dealWithOverlap(player: Phaser.Sprite, me: Phaser.Sprite | Phaser.Group): void {
            this.doLogic(<Player>player);
        }

        private doLogic(player: Player): void {
            switch (this.animations.currentAnim.name) {
                case Entity.attackR:
                case Entity.attackL:
                    this.tryAttack(player);
                    break;
                default:
                    break;
            }
        }

        private tryAttack(player: Player): void {
            var mod = this.ab1_mod;
            var damage = this.randomValWithRandomness(mod.dmg, this.RANDOMNESS);
            mod.knockback.dx = Math.abs(mod.knockback.dx) * (this.facingLeft ? -1 : 1);

            player.dealDamage(damage, damage > (mod.dmg + (this.RANDOMNESS / 2)), 'red', true, mod.flinchTime > 0,
                mod.flinchTime, mod.knockback, this.facingLeft);
        }

        protected createAnimations(): void {
            this.animations.add(Entity.walkL, [7, 8, 9, 10, 11, 12, 13], 15, false);
            this.animations.add(Entity.walkR, [14, 15, 16, 17, 18, 19, 20], 15, false);

            this.animations.add(Entity.dieL, [49, 50, 51], 8, false);
            this.animations.add(Entity.dieR, [56, 57, 58], 8, false);

            this.animations.add(Entity.idleL, [0], 1, false);
            this.animations.add(Entity.idleR, [2], 1, false);

            this.animations.add(Entity.flinchR, [35, 36, 37], 10, false);
            this.animations.add(Entity.flinchL, [42, 43, 44], 10, false);

            this.animations.add(Entity.attackR, [70, 71, 72, 73, 74], 15, false);
            this.animations.add(Entity.attackL, [63, 64, 65, 66, 67], 15, false);

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