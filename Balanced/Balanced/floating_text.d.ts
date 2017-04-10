declare var FloatingText: any;

declare module FloatingText {

	interface Options {
		
		text: string;
		textOptions: FloatingText.TextOptions;
		
		sprite: Phaser.Sprite;
		spriteAnimationName: string;
		spriteAnimationFrameRate: number;
		spriteAnimationRepeat: boolean;
		playAnimationOnStart: boolean;
		spriteAnchor: number;
		
		x: number;
		y: number;
		
		rotation: boolean
		parentObj: Phaser.Sprite;
		
		width: number;
		height: number;
		
		hasBackground: boolean;
		backgroundColor: number;
		
		animation: string;
        distance: number;

        easing: Phaser.Easing.Sinusoidal | Phaser.Easing.Quartic | Phaser.Easing.Linear
        | Phaser.Easing.Cubic | Phaser.Easing.Quintic;

		timeToLive: number;
		fixedToCamera: boolean;
		align: string;
		customPath: number[];
		
	}
	
	interface TextOptions{
		
		fontSize: number;
        fill: string;
        stroke: string;
        strokeThickness: number;
		wordWrap: boolean;
		wordWrapWidth: number;
		
	}
}