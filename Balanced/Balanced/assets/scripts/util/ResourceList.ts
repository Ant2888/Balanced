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

    static MM_PLAYBUTTON_ID: number; // play button image
    static MM_LOADBUTTON_ID: number; // load button image
    static MM_HELPBUTTON_ID: number; // help button image
    static MM_OPTIONSBUTTON_ID: number; // options button image
    // End Main menu id's

    // Options menu id's
    static OM_BACKGROUND_ID: number; // Options menu background
    static OM_OKBUTTON_ID: number; // ok button spritesheet 
    static OM_CANCELBUTTON_ID: number; // cancel button spritesheet 
    // End Options menu id's

    // Help menu id's
    static HM_BACKGROUND_ID: number; // Help menu background
    static HM_OKBUTTON_ID: number; // ok button spritesheet    
    // End Help menu id's

    // Prototype id's
    static PROTOTYPE_TILEMAP_ID: number; 
    static PROTOTYPE_TILESET_ID: number; 
    // End Prototype id's
}

//GIVE THE GLOBAL VAR THE VALUE

//ANTHONY START AT 0
UTIL.TESTLOGO_ID = 0;

//FRANCOIS START AT 100

//EMERSON START AT 200
UTIL.MM_BACKGROUND_ID = 200;
UTIL.MM_PLAYBUTTON_ID = 201;
UTIL.MM_LOADBUTTON_ID = 202;
UTIL.MM_HELPBUTTON_ID = 203;
UTIL.MM_OPTIONSBUTTON_ID = 204;

UTIL.OM_BACKGROUND_ID = 205;
UTIL.OM_OKBUTTON_ID = 206;
UTIL.OM_CANCELBUTTON_ID = 207;

UTIL.HM_BACKGROUND_ID = 208;
UTIL.HM_OKBUTTON_ID = 209;

UTIL.PROTOTYPE_TILEMAP_ID = 210
UTIL.PROTOTYPE_TILESET_ID = 211;