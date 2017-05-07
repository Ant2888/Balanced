module States {
    /**
     * Interface for the loot
     * @author Anthony
     */
    export interface Loot {
        //context to bind the loot to
        context: any
        //the thing that should drop it
        entity: ENTITIES.Entity;
        //the item it should drop
        createItem: (gsm: GameStateManager) => Phaser.Sprite;
        //the amount it should drop
        dropAmount: number;
        //what should we do if the player walks over it?
        overlapWithPlayer: (player: ENTITIES.Player, self: any) => void;
        //do you want to drop in a special way
        customDropAction?: (entity: ENTITIES.Entity, item: Phaser.Sprite) => any;
    }
}