module GUI {
    /**
     * @author Anthony
     */
    export interface ShopItem {
        text: string,
        goldCost: number,
        bought?: (player: ENTITIES.Player) => void;
    }

}