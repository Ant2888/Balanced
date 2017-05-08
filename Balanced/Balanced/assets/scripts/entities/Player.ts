module ENTITIES {

    /**
     * The Player Entity class. This will represent the main character
     * @author Anthony
     */
    export class Player extends Entity {

        public static SAVE_COINS = 0;

        //this should contain an array of events to 
        //dispatch on the player
        public static allCurrentEvent = new Array();

        // modifiers
        public ab1_mod: COMBAT.Ability;
        public ab2_mod: COMBAT.Ability;
        public ab3_mod: COMBAT.Ability;
        public ab4_mod: COMBAT.Ability;
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
        public static POTION_TWO = 6;

        public overHeadText: Phaser.Text;

        protected WAVE_ATK = 'wave_attk';
        public energyWave: Phaser.Weapon;

        public static ENTER_DOOR = "Press \'F\' to go to Town.";
        public static ENTER_COLOR_IND = 7;

        public static EXIT_DOOR_COMPLETE = 'Press \'F\' to go to Next Level!'
        public static EXIT_C_COLOR_IND = 7;

        public static EXIT_DOOR_NF = 'You must kill ALL remaining enemies!';
        public static EXIT_NF_COLOR_IND = [14, 15, 16];
        public static EXIT_NF_COLOR_IND2 = 36;
        
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

            this.hitSize = { width: 64 - 26, height: 64 - 16, wOffset: 13, hOffset: 16 };
            this.attackSize = { width: 64 + 10, height: 64, wOffset: -5, hOffset: 0 };

            this.body.setSize(this.hitSize.width, this.hitSize.height,
                this.hitSize.wOffset, this.hitSize.hOffset);

            this.recalcModifiers();
            this.addOnDeathCallBack(function () {
                this.gsm.musicBox.playByID('PlayerDeath', undefined, undefined, UTIL.SFX, false, false);
            }, this);
            
            this.addOnDamageCallback(function () {
                var val = this.randomValWithRandomness(2, 1);
                this.gsm.musicBox.randomPlayByID(val == 3 ? 'PlayerHurt3' :
                    (val == 2 ? 'PlayerHurt2' : 'PlayerHurt1'), 70,
                    undefined, undefined, UTIL.SFX, false, false);
            }, this);

            this.overHeadText = this.gsm.game.add.text(0, -18, '', {
                fill: 'white', font: 'papyrus', fontSize: '14px',
                stroke: 'black', strokeThickness: 2
            });
            this.overHeadText.anchor.setTo(.5, .5);

            this.addChild(this.overHeadText);

            Player.allCurrentEvent.forEach(e => {
                e(this);
            });
        }
        
        public recalcModifiers(): void {
            this.ab1_mod = {
                dmg: this.ATTACK * 1.0, flinchTime: Entity.FLINCH_TIME, stunTime: 0,
                knockback: { dx: 10, dy: -10, time: 300 }, energyCost: 5
            };

            this.ab2_mod = {
                dmg: this.ATTACK * .75, energyCost: 30
            };

            this.ab3_mod = {
                energyCost: 45,
                dmg: this.ATTACK * .75, flinchTime: 0, stunTime: 0,
                knockback: { dx: 10, dy: -10, time: 300, stunTime: 100 }
            };

            this.ab4_mod = {
                energyCost: 80,
                dmg: this.ATTACK * 1.75, flinchTime: this.ab1_mod.flinchTime || Entity.FLINCH_TIME, stunTime: 1500,
                knockback: { dx: 115, dy: -125, time: 500, stunTime: 1250 }
            };

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
            
            if (other instanceof Phaser.Group) {
                (<Phaser.Group>other).forEach(function (e) { this.doAttackLogic(<Entity>e) }, this);
            } else {
                this.doAttackLogic(<Entity>other);
            }
        }

        private doAttackLogic(mob: Entity): void {
            switch (this.animations.currentAnim.name) {
                case Entity.idleL:
                case Entity.idleR:
                    mob.dealWithOverlap(this, mob);
                    break;
                case Entity.attackL:
                case Entity.attackR:
                    mob.dealWithOverlap(this, mob);
                    this.doAbilityDamage(mob, this.ab1_mod);
                    break;
                case Player.ability2L:
                case Player.ability2R:
                    mob.dealWithOverlap(this, mob);
                    //Bullet case so ignore this
                    break;
                case Player.ability3L:
                case Player.ability3R:
                    mob.dealWithOverlap(this, mob);
                    this.ab3(mob);
                    break;
                case Player.ability4L:
                case Player.ability4R:
                    mob.dealWithOverlap(this, mob);
                    this.doAbilityDamage(mob, this.ab4_mod);
                    break;
                default:
                    mob.dealWithOverlap(this, mob);
                    break;
            }
        }

        private ab3(mob: Entity): void {
            var mod = this.ab3_mod;
            var damage = this.randomValWithRandomness(mod.dmg, this.RANDOMNESS);
            mod.knockback.dx = Math.abs(mod.knockback.dx) * (this.facingLeft ? -1 : 1);
            mob.dealDamage(damage, damage > (mod.dmg + (this.RANDOMNESS / 2)), 'yellow', true, false, 0,
                mod.knockback, this.facingLeft);
            mob.dealDamage(Math.floor(damage * .75), damage > (mod.dmg + (this.RANDOMNESS / 2)), 'yellow', true, false, 0,
                mod.knockback, this.facingLeft);
            mob.dealDamage(Math.floor(damage * .50), damage > (mod.dmg + (this.RANDOMNESS / 2)), 'yellow', true, true, 1000, 
                mod.knockback, this.facingLeft);
        }

        private doAbilityDamage(mob: Entity, mod: COMBAT.Ability): void {
            var damage = this.randomValWithRandomness(mod.dmg, this.RANDOMNESS);

            mod.knockback.dx = Math.abs(mod.knockback.dx)*(this.facingLeft ? -1 : 1);
            mob.dealDamage(damage, damage > (mod.dmg + (this.RANDOMNESS / 2)), 'yellow', true, mod.flinchTime > 0,
                mod.flinchTime, mod.knockback, this.facingLeft);
        }

        private bulletLogic(me: Phaser.Bullet, other: Entity): void {
            var damage = this.randomValWithRandomness(this.ab2_mod.dmg, this.RANDOMNESS);

            other.dealDamage(damage, damage > (this.ab2_mod.dmg + (this.RANDOMNESS / 2)), 'yellow', true, true, 300,
                { dx: (this.facingLeft ? -1 : 1) * 10, dy: -10, stunTime: 200, time: 300 }, this.facingLeft);

            me.kill();
        }

        public loadEntitySounds(box: UTIL.JukeBox): void {
            box.addSound('PlayerDeath');
            box.addSound('PlayerHurt1');
            box.addSound('PlayerHurt2');
            box.addSound('PlayerHurt3');
            box.addSound('Regular_Hit');
            box.addSound('spell_not_ready');
            box.addSound('Three_Attack');
            box.addSound('Whirlwind');
            box.addSound('Need_Energy');
            box.addSound('Jump1');
            box.addSound('Fall1');
            box.addSound('Footsteps');
            box.addSound('Drinking');
            box.addSound('Bag_Open');
            box.addSound('Bag_Close');
            box.addSound('OpenMenu');
            box.addSound('PickUpCoin');
        }

        public addCoin(amount?: number): void {

            if (amount === undefined || amount === null)
                amount = 1;

            Player.SAVE_COINS += amount;
            new FloatingText(this.gsm.game, <FloatingText.Options>{
                //easing: Phaser.Easing.Sinusoidal.Out,
                text: '+'+amount+' Coin',
                animation: 'up',
                textOptions: <FloatingText.TextOptions>{
                    fontSize: 18,
                    fill: 'gold',
                    stroke: 'black',
                    strokeThickness: 1,
                    wordWrap: false,
                    wordWrapWidth: 200,
                    font: "Courier"
                },
                x: this.x,
                y: this.y - (Math.random()*(60-35)+35),
                timeToLive: 300
            });
            
            this.gsm.musicBox.playByID('PickUpCoin', undefined, undefined, UTIL.SFX, false, true);
        }

    }
}