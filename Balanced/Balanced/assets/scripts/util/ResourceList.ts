/**
 * This class will provide a water fall of options to the
 * already defined module to include "global" static vars.
 *
 * @author Anthony, Emerson
 */
declare class UTIL {
    //DEFINE ANY GLOBAL RES' YOU NEED
    static TESTLOGO_ID: number; //This is for the test state logo

    // Main menu id's
    static MM_BACKGROUND_ID: number; // Main menu background

    static MM_PLAYBUTTON_ID: number; // player button image
    static MM_LOADBUTTON_ID: number; // load button image
    static MM_OPTIONSHELPBUTTON_ID: number; // options/help button image
    // End Main menu id's
}

//GIVE THE GLOBAL VAR THE VALUE

//ANTHONY START AT 0
UTIL.TESTLOGO_ID = 0;

//FRANCOIS START AT 100

//EMERSON START AT 200
UTIL.MM_BACKGROUND_ID = 200;
UTIL.MM_LOADBUTTON_ID = 201;
UTIL.MM_OPTIONSHELPBUTTON_ID = 202;