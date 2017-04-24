module COMBAT {
    /**
     * An abilities definition
     * @author Anthony
     */
    export interface Ability {
        dmg?: number,
        flinchTime?: number,
        stunTime?: number,
        knockback?: KnockBack;
    }
}