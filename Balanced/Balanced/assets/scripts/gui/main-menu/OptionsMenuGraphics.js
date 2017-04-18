var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GUI;
(function (GUI) {
    /**
    *This is the options menu gui of the game
    *
    * @author Emerson
    */
    var OptionsMenuGraphics = (function (_super) {
        __extends(OptionsMenuGraphics, _super);
        // TODO - add a way for the user to change a key to their desired one.
        function OptionsMenuGraphics(group) {
            return _super.call(this, 201, group) || this;
        }
        OptionsMenuGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'omBackground');
            this.setOkButton(this.okButtonPressed);
            this.setCancelButton(this.cancelButtonPressed);
            this.group.add(this.backgroundImage);
            this.setKeybindText();
        };
        OptionsMenuGraphics.prototype.setKeybindText = function () {
            this.kb_jump = this.gsm.game.add.text(475, 190, ': Space', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_attack = this.gsm.game.add.text(475, 245, ': N/A', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_interact = this.gsm.game.add.text(475, 300, ': F', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_ability1 = this.gsm.game.add.text(475, 350, ': Q', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_ability2 = this.gsm.game.add.text(475, 405, ': W', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_ability3 = this.gsm.game.add.text(475, 455, ': E', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_ability4 = this.gsm.game.add.text(475, 505, ': R', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_itemA = this.gsm.game.add.text(1000, 190, ': Z', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_itemB = this.gsm.game.add.text(1000, 250, ': X', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_inventory = this.gsm.game.add.text(1000, 300, ': I', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_character = this.gsm.game.add.text(1000, 350, ': C', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_patchNotes = this.gsm.game.add.text(1000, 405, ': N/A', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_dungeons = this.gsm.game.add.text(1000, 455, ': N/A', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
            this.kb_arena = this.gsm.game.add.text(1000, 505, ': N/A', { fill: '#FF7200', font: 'papyrus', fontSize: '32px', fontStyle: 'bold' });
        };
        // initializes the buttons
        OptionsMenuGraphics.prototype.setOkButton = function (func) {
            this.okButton = this.gsm.game.add.button(360, 606, 'omOkButton', func, this, 1, 0, 2);
        };
        OptionsMenuGraphics.prototype.setCancelButton = function (func) {
            this.cancelButton = this.gsm.game.add.button(600, 606, 'omCancelButton', func, this, 1, 0, 2);
        };
        OptionsMenuGraphics.prototype.okButtonPressed = function () {
            console.log('ok button was pressed');
            this.gsm.setState(States.MAIN_MENU_STATE);
        };
        OptionsMenuGraphics.prototype.cancelButtonPressed = function () {
            console.log('cancel button was pressed');
            this.gsm.setState(States.MAIN_MENU_STATE);
        };
        OptionsMenuGraphics.prototype.setKb_jump = function (newKey) {
            this.kb_jump.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_attack = function (newKey) {
            this.kb_attack.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_interact = function (newKey) {
            this.kb_interact.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_ability1 = function (newKey) {
            this.kb_ability1.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_ability2 = function (newKey) {
            this.kb_ability2.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_ability3 = function (newKey) {
            this.kb_ability3.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_ability4 = function (newKey) {
            this.kb_ability4.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_itemA = function (newKey) {
            this.kb_itemA.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_ItemB = function (newKey) {
            this.kb_itemB.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_inventory = function (newKey) {
            this.kb_inventory.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_character = function (newKey) {
            this.kb_character.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_patchNotes = function (newKey) {
            this.kb_patchNotes.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_dungeons = function (newKey) {
            this.kb_dungeons.text = newKey;
        };
        OptionsMenuGraphics.prototype.setKb_arena = function (newKey) {
            this.kb_arena.text = newKey;
        };
        // getters
        OptionsMenuGraphics.prototype.getBackgroundImage = function () {
            return this.backgroundImage;
        };
        OptionsMenuGraphics.prototype.getOkButton = function () {
            return this.okButton;
        };
        OptionsMenuGraphics.prototype.getCancelButton = function () {
            return this.cancelButton;
        };
        return OptionsMenuGraphics;
    }(GUI.GameObject));
    GUI.OptionsMenuGraphics = OptionsMenuGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=OptionsMenuGraphics.js.map