
/**
 * This class will provide a water fall of options to the
 * already defined module to include "global" static vars.
 *
 * @author Anthony, Emerson
 */
declare class States {
    //MAKE THE GLOBAL VARS HERE
    static TEST_STATE: States.State;
    static TEST_STATE_ID: number;

    static TEST_STATE2: States.State;
    static TEST_STATE2_ID: number;

    static MAIN_MENU_STATE: States.State;
    static MAIN_MENU_STATE_ID: number;

    static OPTIONS_MENU_STATE: States.State;
    static OPTIONS_MENU_STATE_ID: number;

    static HELP_MENU_STATE: States.State;
    static HELP_MENU_STATE_ID: number;

    static PROTOTYPE_STATE: States.State;
    static PROTOTYPE_STATE_ID: number;

    static LEVEL_SELECT_STATE: States.State;
    static LEVEL_SELECT_STATE_ID: number;
    
}

//DEFINE THE ID'S HERE

//ANTHONY START AT 0
States.TEST_STATE_ID = 0;
States.TEST_STATE2_ID = 1;
States.LEVEL_SELECT_STATE_ID = 2;

//FRANCOIS START AT 100

//EMERSON START AT 200
States.MAIN_MENU_STATE_ID = 200;
States.OPTIONS_MENU_STATE_ID = 201;
States.OPTIONS_MENU_STATE_ID = 202;

States.PROTOTYPE_STATE_ID = 203;
