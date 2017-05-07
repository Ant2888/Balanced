module GUI {

    /**
     * Graphic for the balance event
     * @author Anthony
     */
    export class BalanceEventGraphics extends GameObject {

        private img: Phaser.Sprite;
        private gsm: States.GameStateManager;
        private inNotif: boolean;

        private timer: Phaser.Timer;

        private curText: Phaser.Text;

        private static NOTIF_IN_TIME = 700;

        constructor(group: Phaser.Group) {
            super(0, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            this.img = this.gsm.game.add.sprite(466, -170, 'balance_notif');
            this.img.fixedToCamera = true;
            this.inNotif = false;
            //this.img.exists = false;
        }

        public announceEvent(event: BALANCE.BalanceEvent): void {
            if (this.inNotif)
                return;

            if (this.curText !== undefined && this.curText !== null)
                this.curText.destroy();

            this.curText = this.gsm.game.add.text(466 + 30, -170 + 50,
                event.getNotifText(), {
                    fill: 'white', font: 'papyrus', fontSize: '20px',
                    stroke: 'black', strokeThickness: 4});
            this.curText.fixedToCamera = true;

            this.timer = this.gsm.game.time.create(true);
            this.timer.loop(100, () => {
                this.img.frame = this.img.frame != 0 ? 0 : 1;
            }, this);

            this.timer.start();
            this.tweenInOut();
        }

        /**
         * Tweens the BEG into and out of the screen. It also takes the text with it at the same time.
         */
        public tweenInOut(): void {

            this.inNotif = true;
            
            var a = this.gsm.game.add.tween(this.img.cameraOffset).to({"y": 0});
            var b = this.gsm.game.add.tween(this.img.cameraOffset).to({ "y": -170 }, undefined, undefined, undefined, 2000);
            var c = this.gsm.game.add.tween(this.curText.cameraOffset).to({ "y": 0+50 });
            var d = this.gsm.game.add.tween(this.curText.cameraOffset).to({ "y": -170+50 }, undefined, undefined, undefined, 2000);

            a.chain(b);
            c.chain(d);

            b.onComplete.add(function () {
                this.inNotif = false
                this.timer.stop();
            }, this);

            a.start();
            c.start();
        }
        
    }
}