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
    *This is the town gui of the game
    *
    * @author Emerson
    */
    var TownGraphics = (function (_super) {
        __extends(TownGraphics, _super);
        function TownGraphics(group) {
            return _super.call(this, 204, group) || this;
        }
        TownGraphics.prototype.initialize = function (gsm) {
            this.gsm = gsm;
            this.backgroundImage = gsm.game.add.sprite(0, 0, 'twn_background');
            this.group.add(this.backgroundImage);
            this.setShopButton(this.shopButtonPressed);
            this.setInnButton(this.innButtonPressed);
            this.setDungeonButton(this.dungeonButtonPressed);
            this.setHallButton(this.hallButtonPressed);
        };
        // initializes the buttons
        TownGraphics.prototype.setShopButton = function (func) {
            this.shop = this.gsm.game.add.button(224, 416, 'twn_shop', func, this, 1, 0, 2);
            this.group.add(this.shop);
        };
        TownGraphics.prototype.setInnButton = function (func) {
            this.inn = this.gsm.game.add.button(928, 288, 'twn_inn', func, this, 1, 0, 2);
            this.group.add(this.inn);
        };
        TownGraphics.prototype.setDungeonButton = function (func) {
            this.dungeon = this.gsm.game.add.button(1028, 0, 'twn_dungeon', func, this, 1, 0, 2);
            this.group.add(this.dungeon);
        };
        TownGraphics.prototype.setHallButton = function (func) {
            this.hall = this.gsm.game.add.button(640, 0, 'twn_hall', func, this, 1, 0);
            this.group.add(this.hall);
        };
        TownGraphics.prototype.shopButtonPressed = function () {
            console.log('shop button pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        TownGraphics.prototype.innButtonPressed = function () {
            console.log('inn button pressed');
            //this.gsm.setState(States.PROTOTYPE_STATE);
        };
        TownGraphics.prototype.dungeonButtonPressed = function () {
            console.log('dungeon button pressed');
            this.gsm.setState(States.LEVEL_SELECT_STATE);
        };
        TownGraphics.prototype.hallButtonPressed = function () {
            console.log('hall button pressed');
            //this.gsm.setState(States.LEVEL_SELECT_STATE);
        };
        // getters
        TownGraphics.prototype.getBackgroundImage = function () {
            return this.backgroundImage;
        };
        TownGraphics.prototype.getShop = function () {
            return this.shop;
        };
        TownGraphics.prototype.getInn = function () {
            return this.inn;
        };
        TownGraphics.prototype.getDungeon = function () {
            return this.dungeon;
        };
        return TownGraphics;
    }(GUI.GameObject));
    GUI.TownGraphics = TownGraphics;
})(GUI || (GUI = {}));
//# sourceMappingURL=TownGraphics.js.map