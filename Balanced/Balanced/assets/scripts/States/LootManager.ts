module States {
    /**
     * Use this to assign loot at the death of a mob
     * @author Anthony
     */
    export class LootManager {

        private gsm: GameStateManager;
        private alive: Phaser.Group;

        constructor(gsm: GameStateManager) {
            this.gsm = gsm;
        }

        /**
         * Drop the item into the game
         * @param item
         */
        public dropItem(item: Loot): void {
            //dont spawn any
            if (item.dropAmount <= 0)
                return;

            //init val
            if (item.customDropAction !== null && item.customDropAction !== undefined)
                item.customDropAction = item.customDropAction.bind(item.context);
            else
                item.customDropAction = this.defaultDropAction.bind(this);

            //make the items
            var liveItems = new Array();
            for (var i = 0; i < item.dropAmount; i++) {
                var _item = <Phaser.Sprite>(item.createItem.call(item.context, this.gsm));
                liveItems.push(_item);
                this.alive.add(_item);
                item.customDropAction(item.entity, _item);
                _item['bal_overlap'] = item.overlapWithPlayer.bind(item.context);
            }
            
        }

        /**
         * Checks the overlap for all the loot on the map
         * @param floor
         * @param player
         */
        public checkOverlaps(floor: any, player: ENTITIES.Player): void {
            this.gsm.game.physics.arcade.collide(floor, this.alive);
            this.gsm.game.physics.arcade.overlap(player, this.alive, this.lootOverlaps, null, this);
        }

        /**
         * Helper for overlaps
         */
        private lootOverlaps(player: ENTITIES.Player, lootObj: Phaser.Sprite): void {
            var func = lootObj['bal_overlap'];
            if (func !== null && func !== undefined)
                func(player, lootObj);
        }

        /**
         * Initialzes the groups
         */
        public initialize(): void {
            this.alive = this.gsm.game.add.group();
            this.alive.enableBody = true;
        }

        /**
         * Destroys all loot still on the grouns
         */
        public destroyLoot(): void {
            this.alive.destroy(true);
        }

        /**
         * Default action for how an item should drop
         */
        public defaultDropAction(entity: ENTITIES.Entity, item: Phaser.Sprite): void {
            item.exists = true;
            item.reset(entity.x, entity.y);
            item.body.bounce.y = .8;

            //generate a random angle on a half circle w/ radius 64
            var angle = Math.random() * Math.PI;
            var x = Math.cos(angle) * ((Math.random()*(160-64))+64);
            var y = Math.sin(angle) * ((Math.random() * (160 - 64)) + 64);

            item.body.velocity.x = x;
            item.body.velocity.y = y;
            item.body.drag.x = 50;
            item.body.drag.y = 20;
            item.body.friction.x = 200;
        }
    }
}