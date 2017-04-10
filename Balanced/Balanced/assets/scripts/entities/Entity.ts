﻿module ENTITIES {

    export class Entity extends Phaser.Sprite{
        
        protected gsm: States.GameStateManager;

        constructor(gsm: States.GameStateManager, x: number, y: number, key?: string | Phaser.RenderTexture
                | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
            super(gsm.game, x, y, key, frame);
            
            this.gsm = gsm;
        }
    }
}