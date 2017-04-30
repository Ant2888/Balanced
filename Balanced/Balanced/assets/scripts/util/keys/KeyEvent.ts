module UTIL {

    /**
     * Interface for representing a KeyEvent in the KeyManager
     * @author Anthony
     */
    export interface KeyEvent {
        //What key are we? -- Put any val <0 if not a key
        key: number,

        //What should these functions be bound to
        context: any,

        //What should it do on down?
        onDown?: any,

        //What should it do on up?
        onUp?: any,

        //What should it do on press?
        onPress?: any
    }
}