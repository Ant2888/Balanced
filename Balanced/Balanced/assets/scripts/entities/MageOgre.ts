module ENTITIES {
    /**
     * @author Anthony
     */
    export class MageOgre extends Entity {

        public static ABILITY_ONE = 1;
        public ab1_mod: COMBAT.Ability;

        //AI STUFF
        public VISION_X = 64 * 10;
        public VISION_Y = 64 * 1;
        public GCD = 2500;
        //END AI

        public player: ENTITIES.Player;
        public fireBall: Phaser.Weapon;
        protected FIRE_BALL = 'fire_ball';
        public stateLogic: FSM.MageStateSystem;

        constructor(gsm: States.GameStateManager, x: number, y: number, player: ENTITIES.Player,
            key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture,
            frame?: string | number) {
            super(gsm, x, y, key, frame);

            this.fireBall = this.gsm.game.add.weapon(15, this.FIRE_BALL);
            this.fireBall.addBulletAnimation('fire_anim', [0, 1, 2], 10, false);
            this.fireBall.bulletAnimation = 'fire_anim';
            this.fireBall.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
            this.fireBall.bulletLifespan = 800;
            this.fireBall.bulletSpeed = 1000;
            this.fireBall.bulletRotateToVelocity = true;
            this.fireBall.bulletGravity.y = -this.gsm.game.physics.arcade.gravity.y;
            this.fireBall.fireRate = 250;
            this.fireBall.trackSprite(this, 0, 0, true);

            this.dropList.push(
                {
                    context: this, dropAmount: 12, entity: this,
                    createItem: g => {
                        return g.game.add.sprite(this.x, this.y, 'coin');
                    },
                    overlapWithPlayer: (player, me) => {
                        player.addCoin();
                        me.kill();
                    }
                }
            );

            this.player = player;

            this.abm = new COMBAT.MageOgreAbilities(this, this.gsm);
            this.stateLogic = new FSM.MageStateSystem(this.gsm, this, this.player);

            this.attackSize = { width: 96 - 4, height: 96 - 26, wOffset: 2, hOffset: 26 };
            this.hitSize = { width: 96 - 16, height: 96 - 32, wOffset: 8, hOffset: 32 };

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
                    (val == 3 ? 'OgreHurt3' : (val == 2 ? 'OgreHurt4' : 'OgreHurt5')),
                    undefined, undefined, UTIL.SFX, false, false);
            }, this);
            

            this.ab1_mod = {
                dmg: this.ATTACK * .35, flinchTime: Entity.FLINCH_TIME + 200,
                knockback: { dx: 25, dy: -25, time: 500 }, energyCost: 70
            };
        }

        public dealWithOverlap(player: Phaser.Sprite, me: Phaser.Sprite | Phaser.Group): void {
            //do nothing different when the player is near.
        }

        protected createAnimations(): void {
            this.animations.add(Entity.walkL, [2, 3, 4, 5, 6, 7, 8, 9], 15, false);
            this.animations.add(Entity.walkR, [10, 11, 12, 13, 14, 15, 16, 17], 15, false);

            this.animations.add(Entity.dieL, [30, 31, 32, 33], 15, false);
            this.animations.add(Entity.dieR, [34, 35, 36, 37], 15, false);

            this.animations.add(Entity.idleL, [0], 1, false);
            this.animations.add(Entity.idleR, [1], 1, false);

            this.animations.add(Entity.flinchR, [27, 28, 29], 10, false);
            this.animations.add(Entity.flinchL, [24, 25, 26], 10, false);

            this.animations.add(Entity.attackR, [42, 43, 44, 45], 15, false);
            this.animations.add(Entity.attackL, [38, 39, 40, 41], 15, false);

            this.animations.add(Entity.jumpL, [18, 19, 20], 15, false);
            this.animations.add(Entity.jumpR, [21, 22, 23], 15, false);
            this.jumpL_lastFrame = 20;
            this.jumpR_lastFrame = 23;
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