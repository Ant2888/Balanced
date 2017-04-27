module BALANCE {
    export class EventMatrix extends BalanceEvent {

        public eventToApply: any;

        public static Matrix = {
            //nerfs energy wave by 50%
            nerf_wave:  {
                dispatchEvent: entity => {
                    (<ENTITIES.Player>entity).ab2_mod.dmg *= .8;
                    return true;
                }, attemptRevert: entity => {
                    (<ENTITIES.Player>entity).ab2_mod.dmg *= 2;
                    return true;
                }, 
                getNotifText: () => {
                    return 'Energy Wave has been nerfed by 20%!';
                } 
            },
            nerf_whirlwind: {
                dispatchEvent: entity => {
                    (<ENTITIES.Player>entity).ab4_mod.dmg *= .8;
                    return true;
                }, attemptRevert: entity => {
                    (<ENTITIES.Player>entity).ab4_mod.dmg *= .5;
                    return true;
                },
                getNotifText: () => {
                    return 'Whirlwind has been nerfed by 20%!';
                }
            },
            nerf_triAttack: {
                dispatchEvent: entity => {
                    (<ENTITIES.Player>entity).ab3_mod.dmg *= .8;
                    return true;
                }, attemptRevert: entity => {
                    (<ENTITIES.Player>entity).ab4_mod.dmg *= .5;
                    return true;
                },
                getNotifText: () => {
                    return 'TriAttack has been nerfed by 20%!';
                }
            },
            nerf_basicAttk: {
                dispatchEvent: entity => {
                    (<ENTITIES.Player>entity).ab3_mod.dmg *= .8;
                    return true;
                }, attemptRevert: entity => {
                    (<ENTITIES.Player>entity).ab4_mod.dmg *= .5;
                    return true;
                },
                getNotifText: () => {
                    return 'Swing has been nerfed by 20%!';
                }
            },
            nerf_wave_energy: {
                dispatchEvent: entity => {
                    var e = (<ENTITIES.Player>entity);
                    e.ab2_mod.energyCost * 1.25 > 100 ?
                        e.ab2_mod.energyCost = 100 :
                        e.ab2_mod.energyCost *= 1.25;
                         
                    return true;
                }, attemptRevert: entity => {
                    (<ENTITIES.Player>entity).ab2_mod.dmg *= .5;
                    return true;
                },
                getNotifText: () => {
                    return 'Energy Wave energy cost has been increased by 25%!';
                }
            },
            nerf_slash_energy: {
                dispatchEvent: entity => {
                    var e = (<ENTITIES.Player>entity);
                    e.ab1_mod.energyCost * 1.25 > 100 ?
                        e.ab1_mod.energyCost = 100 :
                        e.ab1_mod.energyCost *= 1.25;

                    return true;
                }, attemptRevert: entity => {
                    (<ENTITIES.Player>entity).ab2_mod.dmg *= .5;
                    return true;
                },
                getNotifText: () => {
                    return 'Slash energy cost has been increased by 25%!';
                }
            },
            nerf_whilrwind_energy: {
                dispatchEvent: entity => {
                    var e = (<ENTITIES.Player>entity);
                    e.ab4_mod.energyCost * 1.25 > 100 ?
                        e.ab4_mod.energyCost = 100 :
                        e.ab4_mod.energyCost *= 1.25;

                    return true;
                }, attemptRevert: entity => {
                    (<ENTITIES.Player>entity).ab4_mod.dmg *= .5;
                    return true;
                },
                getNotifText: () => {
                    return 'Whirlwind energy cost has been increased by 25%!';
                }
            },
            nerf_triattack_energy: {
                dispatchEvent: entity => {
                    var e = (<ENTITIES.Player>entity);
                    e.ab3_mod.energyCost * 1.25 > 100 ?
                        e.ab3_mod.energyCost = 100 :
                        e.ab3_mod.energyCost *= 1.25;

                    return true;
                }, attemptRevert: entity => {
                    (<ENTITIES.Player>entity).ab4_mod.dmg *= .5;
                    return true;
                },  
                getNotifText: () => {
                    return 'Triattack energy cost has been increased by 25%!';
                }
            }
        };

        constructor(gsm: States.GameStateManager) {
            super(gsm);
            this.eventToApply = EventMatrix.Matrix.nerf_wave;
        }

        public dispatchEvent(entity: ENTITIES.Entity): boolean {
            return this.eventToApply.dispatchEvent(entity);
        }

        public attemptRevert(entity: ENTITIES.Entity): boolean {
            return this.eventToApply.attemptRevert(entity);
        }

        public getNotifText(): string {
            return this.eventToApply.getNotifText();
        }

    }
}