module GUI {
    /**
     * @author  Emerson
     */
    export class BossGraphics extends GameObject {

        private gsm: States.GameStateManager;
        private boss1: ENTITIES.Entity;
        private boss2: ENTITIES.Entity;
        private healthBar1: Phaser.Image;
        private boss1Bar: Phaser.Image;

        private healthBar2: Phaser.Image;
        private boss2Bar: Phaser.Image;

        constructor(group: Phaser.Group, boss1: ENTITIES.Entity, boss2: ENTITIES.Entity) {
            super(250, group);
            this.boss1 = boss1;
            this.boss2 = boss2;
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;

            this.buildBoss1HealthBar();
            this.buildBoss2HealthBar();
        }

        public buildBoss1HealthBar(): void {
            this.boss1Bar = this.gsm.game.add.image(8, 531, 'boss_bar')
            //this.boss1Bar.anchor.setTo(.5, .5);
            this.boss1Bar.fixedToCamera = true;
            this.group.add(this.boss1Bar);


            // This the red background of the healthbar
            var bmd = this.gsm.game.add.bitmapData(616, 15);

            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 616, 15);
            bmd.ctx.fillStyle = '#8a0707';
            bmd.ctx.fill();
            var background = this.gsm.game.add.image(20, 535, bmd);
            //background.anchor.setTo(.5, .5);
            background.fixedToCamera = true;
            this.group.add(background);


            // This the green background of the healthbar, it will change depending on how much damage is done
            var bmd2 = this.gsm.game.add.bitmapData(616, 15);

            bmd2.ctx.beginPath();
            bmd2.ctx.rect(0, 0, 616, 15);
            bmd2.ctx.fillStyle = 'green';
            bmd2.ctx.fill();

            this.healthBar1 = this.gsm.game.add.image(20, 535, bmd2);
            // this.healthBar.anchor.setTo(.5, .5);
            this.healthBar1.fixedToCamera = true;
            this.group.add(this.healthBar1);
        }

        public buildBoss2HealthBar(): void {
            this.boss2Bar = this.gsm.game.add.image(634, 531, 'boss_bar')
            //this.boss1Bar.anchor.setTo(.5, .5);
            this.boss2Bar.fixedToCamera = true;
            this.group.add(this.boss2Bar);


            // This the red background of the healthbar
            var bmd = this.gsm.game.add.bitmapData(616, 15);

            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 616, 15);
            bmd.ctx.fillStyle = '#8a0707';
            bmd.ctx.fill();
            var background = this.gsm.game.add.image(646, 535, bmd);
            //background.anchor.setTo(.5, .5);
            background.fixedToCamera = true;
            this.group.add(background);


            // This the green background of the healthbar, it will change depending on how much damage is done
            var bmd2 = this.gsm.game.add.bitmapData(616, 15);

            bmd2.ctx.beginPath();
            bmd2.ctx.rect(0, 0, 616, 15);
            bmd2.ctx.fillStyle = 'green';
            bmd2.ctx.fill();

            this.healthBar2 = this.gsm.game.add.image(646, 535, bmd2);
            // this.healthBar.anchor.setTo(.5, .5);
            this.healthBar2.fixedToCamera = true;
            this.group.add(this.healthBar2);
        }

        public updateBoss1Health() {
            if (this.boss1.health >= 0 && this.boss1.health <= this.boss1.maxHealth) {
                this.healthBar1.width = ((616 / this.boss1.maxHealth) * this.boss1.health);
            }

        }

        public updateBoss2Health() {
            if (this.boss2.health >= 0 && this.boss2.health <= this.boss2.maxHealth) {
                this.healthBar2.width = ((616 / this.boss2.maxHealth) * this.boss2.health);
            }
        }
    }
}