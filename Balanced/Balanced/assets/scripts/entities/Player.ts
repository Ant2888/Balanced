module ENTITIES {
    /**
     * The Player Entity class. This will represent the main character
     * @author Anthony
     */
    export class Player extends Entity {

        // STATS
        public ATTACK_SPEED = 12;
        public DEFENCE = 25;
        public ATTACK = 45;
        // END STATS

        public RANDOMNESS = 20;

        // modifiers
        public ab1_mod: number;
        public ab2_mod: number;
        public ab3_mod: number;
        public ab4_mod: number;
        // end mods

        public static ability2L = 'ab2L';
        public static ability2R = 'ab2R';
        public static ability3L = 'ab3L';
        public static ability3R = 'ab3R';
        public static ability4L = 'ab4L';
        public static ability4R = 'ab4R';


        public static ABILITY_ONE = 1;
        public static ABILITY_TWO = 2;
        public static ABILITY_THREE = 3;
        public static ABILITY_FOUR = 4;
        public static POTION_ONE = 5;

        public ABILITY_ONE_COST = 5;
        public ABILITY_TWO_COST = 30;
        public ABILITY_THREE_COST = 45;
        public ABILITY_FOUR_COST = 80;

        protected WAVE_ATK = 'wave_attk';
        public energyWave: Phaser.Weapon;


        constructor(gsm: States.GameStateManager, x: number, y: number, key?: string | Phaser.RenderTexture
            | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(gsm, x, y, key, frame);

            this.abm = new COMBAT.PlayerAbilities(this, gsm);

            this.energyWave = this.gsm.game.add.weapon(15, this.WAVE_ATK);
            this.energyWave.addBulletAnimation('wave_anim', [0, 1, 2, 3, 4], 10, false);
            this.energyWave.bulletAnimation = 'wave_anim';
            this.energyWave.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
            this.energyWave.bulletLifespan = 750;
            this.energyWave.bulletSpeed = 800;
            this.energyWave.bulletRotateToVelocity = true;
            this.energyWave.bulletGravity.y = -this.gsm.game.physics.arcade.gravity.y;
            this.energyWave.fireRate = 250;
            this.energyWave.trackSprite(this, 0, 0, true);

            this.recalcModifiers();
        }

        public recalcModifiers(): void {
            this.ab1_mod = this.ATTACK * 1.0;
            this.ab2_mod = this.ATTACK * .75;
            this.ab3_mod = this.ATTACK * .75;
            this.ab4_mod = this.ATTACK * 1.35;
        }

        protected createAnimations(): void {
            this.animations.add(Player.ability2L, [66, 67, 68, 69, 70, 71], 15, false)
            this.animations.add(Player.ability2R, [77, 78, 79, 80, 81, 82], 15, false)

            this.animations.add(Player.ability3L, [88, 89, 90, 91, 92, 93, 94, 95, 96, 97], 15, false);
            this.animations.add(Player.ability3R, [99, 100, 101, 102, 103, 104, 105, 106, 107, 108], 15, false);

            this.animations.add(Player.ability4L, [110, 111, 112, 113, 114, 115, 116, 117, 118, 119], 15, false);
            this.animations.add(Player.ability4R, [121, 122, 123, 124, 125, 126, 127, 128, 129, 130], 15, false);

            this.animations.add(Entity.walkL, [11, 12, 13, 14, 15, 16, 17, 18], 15, false);
            this.animations.add(Entity.walkR, [22, 23, 24, 25, 26, 27, 28, 29], 15, false);

            this.animations.add(Entity.dieL, [44, 45, 46, 47, 48, 49, 50, 51], 15, false);
            this.animations.add(Entity.dieR, [55, 56, 57, 58, 59, 60, 61, 62], 15, false);

            this.animations.add(Entity.idleL, [0], 1, false);
            this.animations.add(Entity.idleR, [6], 1, false);

            this.animations.add(Entity.flinchL, [2, 3, 4], 10, false);
            this.animations.add(Entity.flinchR, [8, 9, 10], 10, false);

            this.animations.add(Entity.attackR, [77, 78, 79, 80, 81, 82], 15, false);
            this.animations.add(Entity.attackL, [66, 67, 68, 69, 70, 71], 15, false);

            this.animations.add(Entity.jumpL, [33, 34, 35, 36, 37], 15, false);
            this.animations.add(Entity.jumpR, [38, 39, 40, 41, 42], 15, false);
            this.jumpL_lastFrame = 37;
            this.jumpR_lastFrame = 42;
        }

        public dealWithOverlap(me: Phaser.Sprite, other: Phaser.Sprite | Phaser.Group): void {
            if (me instanceof Phaser.Bullet) {
                this.bulletLogic(me, <Entity>other);
            }


        }

        private bulletLogic(me: Phaser.Bullet, other: Entity): void {

            var damage = this.randomValWithRandomness(this.ab2_mod);
            other.dealDamage(damage, damage > (this.ab2_mod + (this.RANDOMNESS) / 2), 'yellow', true, true, 300,
                {dx: (this.facingLeft?-1:1)*10, dy: -10, stunTime: 200, time: 300}, me.scale.x < 0);
            // DELETE THIS LINE BELOW HERE
            if (other.health <= 0)
                other.destroy();
            // DELETE ABOVE HERE
            me.kill();
        }

        public randomValWithRandomness(val: number): number {
            return Math.floor(Math.random() * ((val + this.RANDOMNESS) -
                (val - this.RANDOMNESS) + 1) + (val - this.RANDOMNESS));
        }
    }
}