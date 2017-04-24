module COMBAT {
    /**
     * Simple knockback struct
     * @author Anthony
     */
    export interface KnockBack {
        //how far back should the player go
        dx?: number,
        //how far up/down should the player go
        dy?: number,
        //how long should it take to get there
        time?: number,
        //how long are they stunned? 0 for no stunning
        stunTime?: number
    }
}