
/**
 * This class will provide a water fall of options to the
 * already defined module to include "global" static vars.
 *
 * @author Anthony
 */
declare class States {
    //MAKE THE GLOBAL VARS HERE
    static TEST_STATE: States.State;
    static TEST_STATE_ID: number;

    static TEST_STATE2: States.State;
    static TEST_STATE2_ID: number;
}

//DEFINE THE ID'S HERE
//ANTHONY START AT 0
//FRANCOIS START AT 100
//EMERSON START AT 200
States.TEST_STATE_ID = 0;
States.TEST_STATE2_ID = 1;