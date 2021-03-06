﻿
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
    
    static LEVEL1_STATE: States.State;
    static LEVEL1_STATE_ID: number;

    static LEVEL2_STATE: States.State;
    static LEVEL2_STATE_ID: number;

    static LEVEL3_STATE: States.State;
    static LEVEL3_STATE_ID: number;

    static LEVEL_SELECT_STATE: States.State;
    static LEVEL_SELECT_STATE_ID: number;

    static TOWN_STATE: States.State;
    static TOWN_STATE_ID: number;

    static TOWN_TUTORIAL_STATE: States.State;
    static TOWN_TUTORIAL_STATE_ID: number;

    static DUNGEON_TUTORIAL_STATE: States.State;
    static DUNGEON_TUTORIAL_STATE_ID: number;
    
}

//DEFINE THE ID'S HERE

//ANTHONY START AT 0
States.TEST_STATE_ID = 0;
States.TEST_STATE2_ID = 1;


//FRANCOIS START AT 100

//EMERSON START AT 200
States.MAIN_MENU_STATE_ID = 200;
States.OPTIONS_MENU_STATE_ID = 201;
States.OPTIONS_MENU_STATE_ID = 202;


States.TOWN_STATE_ID = 204;
States.LEVEL_SELECT_STATE_ID = 205;
States.LEVEL1_STATE_ID = 206;
States.LEVEL2_STATE_ID = 207;
States.LEVEL3_STATE_ID = 208;

States.TOWN_TUTORIAL_STATE_ID = 209;
States.DUNGEON_TUTORIAL_STATE_ID = 210;
