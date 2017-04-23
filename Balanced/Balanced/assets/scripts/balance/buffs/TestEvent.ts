module BALANCE {
    /**
     * An example class of how a buff should look
     * @author Anthony
     */
    export class TestEvent extends BalanceEvent {

        constructor(gsm: States.GameStateManager) {
            super(gsm);
        }

        public dispatchEvent(entity: ENTITIES.Entity): boolean {
            //No action to do
            return true;
        }

        public attemptRevert(entity: ENTITIES.Entity): boolean {
            //No revert action
            return true;
        }

        public getNotifText(): string {
            return "The player has not been nerfed. This is a test.";
        }

    }
}