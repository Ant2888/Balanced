module FSM {

    export class OgreStateSystem extends StateSystem{

        public attack: AttackPlayerState;
        public follow: FollowPlayerState;
        public wonder: WonderState;

        constructor(gsm: States.GameStateManager, ai: ENTITIES.Ogre,
            player: ENTITIES.Player) {
            super(gsm, ai, player);
            this.initStates();
        }

        private initStates(): void {
            this.attack = new AttackPlayerState(this, this.gsm);
            this.follow = new FollowPlayerState(this, this.gsm);
            this.wonder = new WonderState(this, this.gsm);
            this.curState = this.wonder;
        }

    }
}