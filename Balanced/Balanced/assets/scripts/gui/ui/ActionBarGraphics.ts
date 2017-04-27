module GUI {
    /**
    *This is the prototype state of the game
    *
    * @author Emerson, Anthony
    */
    export class ActionBarGraphics extends GameObject {

        private gsm: States.GameStateManager;
        private player: ENTITIES.Player;
               
        private ab_bg: Phaser.Sprite;
        private ab_ab1_ss: Phaser.Button;
        private ab_ab2_ss: Phaser.Button;
        private ab_ab3_ss: Phaser.Button;
        private ab_ab4_ss: Phaser.Button;
        private ab_p1_ss: Phaser.Button;
        private ab_p2_ss: Phaser.Button;
        private ab_stats_ss: Phaser.Button;       
        private ab_town_ss: Phaser.Button;
        private ab_bag_ss: Phaser.Button;
        private ab_options_ss: Phaser.Button;

        private dd_background: Phaser.Sprite;
        private dd_menu_btn: Phaser.Button;
        private dd_twn_btn: Phaser.Button;

        private ab_ab1_text: Phaser.Text;
        private ab_ab2_text: Phaser.Text;
        private ab_ab3_text: Phaser.Text;
        private ab_ab4_text: Phaser.Text;    

        protected pot1Timer: Phaser.Timer;
        protected remTimer: number;
        protected textHolder: Phaser.Text;             

        protected pot2Timer: Phaser.Timer;
        protected remTimer2: number;
        protected textHolder2: Phaser.Text;

        constructor(group: Phaser.Group, player: ENTITIES.Player) {            
            super(203, group);
            this.player = player;
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;            

            this.ab_bg = gsm.game.add.sprite(gsm.game.width / 2, 630, 'ab_bg');
            this.ab_bg.anchor.setTo(.5, .5);
            this.ab_bg.fixedToCamera = true;
            this.group.add(this.ab_bg);   

            // creating all the buttons and setting the callback
            this.setAbility1(this.ability1Pressed);
            this.setAbility2(this.ability2Pressed);
            this.setAbility3(this.ability3Pressed);
            this.setAbility4(this.ability4Pressed);
            this.setPotion1(this.potion1Pressed);
            this.setPotion2(this.potion2Pressed);
            this.setStats(this.statsPressed);
            this.setBag(this.bagPressed);
            this.setTown(this.townPressed);  
            this.setOptions(this.optionsPressed);

            this.ab_ab1_text = gsm.game.add.text(470, 662, 'Q', { fontSize: '28px', fill: '#000' });
            this.ab_ab1_text.fixedToCamera = true;
            this.group.add(this.ab_ab1_text);

            this.ab_ab2_text = gsm.game.add.text(550, 662, 'W', { fontSize: '28px', fill: '#000' });
            this.ab_ab2_text.fixedToCamera = true;
            this.group.add(this.ab_ab2_text);

            this.ab_ab3_text = gsm.game.add.text(640, 662, 'E', { fontSize: '28px', fill: '#000' });
            this.ab_ab3_text.fixedToCamera = true;
            this.group.add(this.ab_ab3_text);

            this.ab_ab4_text = gsm.game.add.text(720, 662, 'R', { fontSize: '28px', fill: '#000' });
            this.ab_ab4_text.fixedToCamera = true;
            this.group.add(this.ab_ab4_text);

            this.remTimer = 0;
            this.pot1Timer = this.gsm.game.time.create(false);

            this.remTimer2 = 0;
            this.pot2Timer = this.gsm.game.time.create(false);
        }

        private setStats(func: any): void {
            this.ab_stats_ss = this.gsm.game.add.button(825, 605, 'ab_stats_ss', func, this, 0, 0, 1);
            this.ab_stats_ss.anchor.setTo(.5, .5);
            this.ab_stats_ss.fixedToCamera = true;
            this.group.add(this.ab_stats_ss);
        }

        private setBag(func: any): void {
            this.ab_bag_ss = this.gsm.game.add.button(885, 605, 'ab_bag_ss', func, this, 0, 0, 1);
            this.ab_bag_ss.anchor.setTo(.5, .5);
            this.ab_bag_ss.fixedToCamera = true;
            this.group.add(this.ab_bag_ss);
        }

        private setTown(func: any): void {
            this.ab_town_ss = this.gsm.game.add.button(825, 652, 'ab_town_ss', func, this, 0, 0, 1);
            this.ab_town_ss.anchor.setTo(.5, .5);
            this.ab_town_ss.fixedToCamera = true;
            this.group.add(this.ab_town_ss);
        }

        private setOptions(func: any): void {
            this.ab_options_ss = this.gsm.game.add.button(885, 652, 'ab_options_ss', func, this, 0, 0, 1);
            this.ab_options_ss.anchor.setTo(.5, .5);
            this.ab_options_ss.fixedToCamera = true;
            this.group.add(this.ab_options_ss);
        }
        
        private setPotion1(func: any): void {
            this.ab_p1_ss = this.gsm.game.add.button(374, 611, 'ab_p1_ss', func, this, 0, 0, 1);
            this.ab_p1_ss.anchor.setTo(.5, .5);
            this.ab_p1_ss.fixedToCamera = true;
            this.group.add(this.ab_p1_ss);
        }

        private setPotion2(func: any): void {
            this.ab_p2_ss = this.gsm.game.add.button(415, 649, 'ab_p2_ss', func, this, 0, 0, 1);
            this.ab_p2_ss.anchor.setTo(.5, .5);
            this.ab_p2_ss.fixedToCamera = true;
            this.group.add(this.ab_p2_ss);
        }

        private setAbility1(func: any): void {
            this.ab_ab1_ss = this.gsm.game.add.button(482, 630, 'ab_ab1_ss', func, this, 0, 0, 1);            
            this.ab_ab1_ss.anchor.setTo(.5, .5);
            this.ab_ab1_ss.fixedToCamera = true;
            this.group.add(this.ab_ab1_ss);
        }

        private setAbility2(func: any): void {
            this.ab_ab2_ss = this.gsm.game.add.button(565, 630, 'ab_ab2_ss', func, this, 0, 0, 1);
            this.ab_ab2_ss.anchor.setTo(.5, .5);
            this.ab_ab2_ss.fixedToCamera = true;
            this.group.add(this.ab_ab2_ss);
        }

        private setAbility3(func: any): void {
            this.ab_ab3_ss = this.gsm.game.add.button(648, 630, 'ab_ab3_ss', func, this, 0, 0, 1);
            this.ab_ab3_ss.anchor.setTo(.5, .5);
            this.ab_ab3_ss.fixedToCamera = true;
            this.group.add(this.ab_ab3_ss);
        }

        private setAbility4(func: any): void {
            this.ab_ab4_ss = this.gsm.game.add.button(731, 630, 'ab_ab4_ss', func, this, 0, 0, 1);
            this.ab_ab4_ss.anchor.setTo(.5, .5);
            this.ab_ab4_ss.fixedToCamera = true;
            this.group.add(this.ab_ab4_ss);
        }        

        public getStats(): Phaser.Button {
            return this.ab_stats_ss;
        }

        public getBag(): Phaser.Button {
            return this.ab_bag_ss;
        }

        public getTown(): Phaser.Button {
            return this.ab_town_ss;
        }

        public getPotion1(): Phaser.Button {
            return this.ab_p1_ss;
        }

        public getPotion2(): Phaser.Button {
            return this.ab_p2_ss;
        }

        public getAbility1(): Phaser.Button {
            return this.ab_ab1_ss;
        }

        public getAbility2(): Phaser.Button {
            return this.ab_ab2_ss;
        }

        public getAbility3(): Phaser.Button {
            return this.ab_ab3_ss;
        }

        public getAbility4(): Phaser.Button {
            return this.ab_ab4_ss;
        }

        public statsPressed(): any {
            if (this.gsm.game.paused || !this.player.alive)
                return false;
            console.log('stats button was pressed');
        }

        public bagPressed(): any {
            if (this.gsm.game.paused || !this.player.alive)
                return false;
            console.log('bag button was pressed');
        }

        public townPressed(): any {
            if (this.gsm.game.paused || !this.player.alive)
                return false;
            console.log('town button was pressed');
            this.gsm.setState(States.TOWN_STATE);
        }

        public optionsPressed(): any {
            
            console.log('pause menu button was pressed');
        }

        public potion1Pressed(): boolean {
            if (this.gsm.game.paused || !this.player.alive)
                return false;

            if (!this.player.alive)
                return false;

            if (this.remTimer != 0)
                return false;

            this.getPotion1().frame = 1;
            this.player.getAbilityManager().attemptCast(ENTITIES.Player.POTION_ONE);

            this.remTimer = 10000;

            this.textHolder = this.gsm.game.add.text(362, 600, '10.0',
                { fill: 'white', font: 'papyrus', fontSize: '16px', fontStyle: 'bold' });
            this.textHolder.fixedToCamera = true;

            this.pot1Timer.loop(50, function () {
                if (this.remTimer <= 0) {
                    this.remTimer = 0;
                    this.textHolder.destroy();
                    this.pot1Timer.stop();
                } else {
                    var disp = this.remTimer / 1000;
                    disp *= 10;
                    disp = Math.floor(disp); //simple XX.X format
                    disp /= 10; 
                    this.textHolder.text = (disp + '');
                    this.remTimer -= 50;
                }
            }, this);
            this.pot1Timer.start();

            return true;
        }

        public potion2Pressed(): boolean {
            if (this.gsm.game.paused || !this.player.alive)
                return false;         

            if (!this.player.alive)
                return false;

            if (this.remTimer2 != 0)
                return false;

            this.getPotion2().frame = 1;
            this.player.getAbilityManager().attemptCast(ENTITIES.Player.POTION_TWO);

            this.remTimer2 = 10000;

            this.textHolder2 = this.gsm.game.add.text(402, 635, '10.0',
                { fill: 'white', font: 'papyrus', fontSize: '16px', fontStyle: 'bold' });
            this.textHolder2.fixedToCamera = true;

            this.pot2Timer.loop(50, function () {
                if (this.remTimer2 <= 0) {
                    this.remTimer2 = 0;
                    this.textHolder2.destroy();
                    this.pot2Timer.stop();
                } else {
                    var disp = this.remTimer2 / 1000;
                    disp *= 10;
                    disp = Math.floor(disp); //simple XX.X format
                    disp /= 10;
                    this.textHolder2.text = (disp + '');
                    this.remTimer2 -= 50;
                }
            }, this);
            this.pot2Timer.start();

            return true;
        }

        public ability1Pressed(): boolean {
            if (this.gsm.game.paused || !this.player.alive)
                return false;

            this.getAbility1().frame = 1;
            return this.player.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_ONE);
        }

        public ability2Pressed(): boolean {
            if (this.gsm.game.paused || !this.player.alive)
                return false;

            this.getAbility2().frame = 1;
            return this.player.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_TWO);
        }

        public ability3Pressed(): boolean {
            if (this.gsm.game.paused || !this.player.alive)
                return false;

            this.getAbility3().frame = 1;
            return this.player.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_THREE);
        }

        public ability4Pressed(): boolean {
            if (this.gsm.game.paused || !this.player.alive)
                return false;

            this.getAbility4().frame = 1;
            return this.player.getAbilityManager().attemptCast(ENTITIES.Player.ABILITY_FOUR)
        }                              

    }
}