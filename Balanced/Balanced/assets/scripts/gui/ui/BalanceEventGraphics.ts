module GUI {

    /**
     * Graphic for the balance event
     * @author Anthony
     */
    export class BalanceEventGraphics extends GameObject {

        private img: Phaser.Sprite;
        private gsm: States.GameStateManager;
        private inNotif: boolean;

        private curText: Phaser.Text;

        private static NOTIF_IN_TIME = 700;

        constructor(group: Phaser.Group) {
            super(0, group);
        }

        public initialize(gsm: States.GameStateManager): void {
            this.gsm = gsm;
            this.img = this.gsm.game.add.sprite(466, -146, 'balance_notif');
            this.img.fixedToCamera = true;
            this.inNotif = false;
            //this.img.exists = false;
        }

        public announceEvent(event: BALANCE.BalanceEvent): void {
            if (this.inNotif)
                return;

            if (this.curText !== undefined && this.curText !== null)
                this.curText.destroy();

            this.curText = this.gsm.game.add.text(466 + 30, -146 + 50,
                event.getNotifText(), {
                    fill: 'red', font: 'papyrus', fontSize: '14px',
                    stroke: 'black', strokeThickness: 4});
            this.curText.fixedToCamera = true;

            this.tweenInOut();
        }

        /**
         * Tweens the BEG into and out of the screen. It also takes the text with it at the same time.
         */
        public tweenInOut(): void {

            this.inNotif = true;
            
            var a = this.gsm.game.add.tween(this.img.cameraOffset).to({"y": 0});
            var b = this.gsm.game.add.tween(this.img.cameraOffset).to({ "y": -146 }, undefined, undefined, undefined, 2000);
            var c = this.gsm.game.add.tween(this.curText.cameraOffset).to({ "y": 0+50 });
            var d = this.gsm.game.add.tween(this.curText.cameraOffset).to({ "y": -146+50 }, undefined, undefined, undefined, 2000);

            a.chain(b);
            c.chain(d);

            b.onComplete.add(function () { this.inNotif = false }, this);

            a.start();
            c.start();
        }

        public resetPos(): void {

        }
    }
}