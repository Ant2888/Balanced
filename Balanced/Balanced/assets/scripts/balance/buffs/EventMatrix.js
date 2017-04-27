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
var BALANCE;
(function (BALANCE) {
    var EventMatrix = (function (_super) {
        __extends(EventMatrix, _super);
        function EventMatrix(gsm) {
            var _this = _super.call(this, gsm) || this;
            _this.eventToApply = EventMatrix.Matrix.nerf_wave;
            return _this;
        }
        EventMatrix.prototype.dispatchEvent = function (entity) {
            return this.eventToApply.dispatchEvent(entity);
        };
        EventMatrix.prototype.attemptRevert = function (entity) {
            return this.eventToApply.attemptRevert(entity);
        };
        EventMatrix.prototype.getNotifText = function () {
            return this.eventToApply.getNotifText();
        };
        return EventMatrix;
    }(BALANCE.BalanceEvent));
    EventMatrix.Matrix = {
        //nerfs energy wave by 50%
        nerf_wave: {
            dispatchEvent: function (entity) {
                entity.ab2_mod.dmg *= .8;
                return true;
            }, attemptRevert: function (entity) {
                entity.ab2_mod.dmg *= 2;
                return true;
            },
            getNotifText: function () {
                return 'Energy Wave has been nerfed by 20%!';
            }
        },
        nerf_whirlwind: {
            dispatchEvent: function (entity) {
                entity.ab4_mod.dmg *= .8;
                return true;
            }, attemptRevert: function (entity) {
                entity.ab4_mod.dmg *= .5;
                return true;
            },
            getNotifText: function () {
                return 'Whirlwind has been nerfed by 20%!';
            }
        },
        nerf_triAttack: {
            dispatchEvent: function (entity) {
                entity.ab3_mod.dmg *= .8;
                return true;
            }, attemptRevert: function (entity) {
                entity.ab4_mod.dmg *= .5;
                return true;
            },
            getNotifText: function () {
                return 'TriAttack has been nerfed by 20%!';
            }
        },
        nerf_basicAttk: {
            dispatchEvent: function (entity) {
                entity.ab3_mod.dmg *= .8;
                return true;
            }, attemptRevert: function (entity) {
                entity.ab4_mod.dmg *= .5;
                return true;
            },
            getNotifText: function () {
                return 'Swing has been nerfed by 20%!';
            }
        },
        nerf_wave_energy: {
            dispatchEvent: function (entity) {
                var e = entity;
                e.ab2_mod.energyCost * 1.25 > 100 ?
                    e.ab2_mod.energyCost = 100 :
                    e.ab2_mod.energyCost *= 1.25;
                return true;
            }, attemptRevert: function (entity) {
                entity.ab2_mod.dmg *= .5;
                return true;
            },
            getNotifText: function () {
                return 'Energy Wave energy cost has been increased by 25%!';
            }
        },
        nerf_slash_energy: {
            dispatchEvent: function (entity) {
                var e = entity;
                e.ab1_mod.energyCost * 1.25 > 100 ?
                    e.ab1_mod.energyCost = 100 :
                    e.ab1_mod.energyCost *= 1.25;
                return true;
            }, attemptRevert: function (entity) {
                entity.ab2_mod.dmg *= .5;
                return true;
            },
            getNotifText: function () {
                return 'Slash energy cost has been increased by 25%!';
            }
        },
        nerf_whilrwind_energy: {
            dispatchEvent: function (entity) {
                var e = entity;
                e.ab4_mod.energyCost * 1.25 > 100 ?
                    e.ab4_mod.energyCost = 100 :
                    e.ab4_mod.energyCost *= 1.25;
                return true;
            }, attemptRevert: function (entity) {
                entity.ab4_mod.dmg *= .5;
                return true;
            },
            getNotifText: function () {
                return 'Whirlwind energy cost has been increased by 25%!';
            }
        },
        nerf_triattack_energy: {
            dispatchEvent: function (entity) {
                var e = entity;
                e.ab3_mod.energyCost * 1.25 > 100 ?
                    e.ab3_mod.energyCost = 100 :
                    e.ab3_mod.energyCost *= 1.25;
                return true;
            }, attemptRevert: function (entity) {
                entity.ab4_mod.dmg *= .5;
                return true;
            },
            getNotifText: function () {
                return 'Triattack energy cost has been increased by 25%!';
            }
        }
    };
    BALANCE.EventMatrix = EventMatrix;
})(BALANCE || (BALANCE = {}));
//# sourceMappingURL=EventMatrix.js.map