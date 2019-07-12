import "phaser";
import { TEXT_FONT, STORY_FONT } from "./ui";

const GAME_WIDTH: number = 640;
const GAME_HEIGHT: number = 480;
const MAX_DAY = 300;

var game: Phaser.Game;
var graphics: Phaser.GameObjects.Graphics;
var button: Phaser.GameObjects.Rectangle;

var year: number = 1;
var day: number = 1;
var livingColonists: number = 0;

var isVisible_Repairs: boolean = false;
var isVisible_RepairEngine: boolean = false;

var repairs: number = 0;

var statusText: Phaser.GameObjects.Text;
var dateText: Phaser.GameObjects.Text;
var repairsText: Phaser.GameObjects.Text;
var storyText: Phaser.GameObjects.Text;

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	title: "Colonists",
	width: GAME_WIDTH,
	height: GAME_HEIGHT,
	parent: "game",
	backgroundColor: "#000000",
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

function preload() {

}

function create() {

	// var rect = new Phaser.Geom.Rectangle(250, 200, 300, 200);

	// var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
	// var rect = this.add.shape(400, 300);

    // graphics.fillRectShape(rect);

	// graphics.setInteractive(rect, event);

	const BUTTON_WIDTH = 80;
	const BUTTON_HEIGHT = 20;

	var dateIncrementTimer = this.time.addEvent({
		delay: 4000,
		callback: dateIncrement,
		loop: true
	});

	// how we create a button
	var btn_rect: Phaser.GameObjects.Rectangle = this.add.rectangle(20 + BUTTON_WIDTH/2, 20 + BUTTON_HEIGHT/2, 80, 20, 0xff0000, 1);
	var btn_text: Phaser.GameObjects.Text = this.add.text(btn_rect.getTopLeft().x+20, btn_rect.getTopLeft().y, 'Repair', TEXT_FONT);
	var btn_handler = btn_rect.setInteractive();

	btn_handler.on(Phaser.Input.Events.POINTER_OVER, function() {
		btn_rect.setAlpha(0.8);
	});

	btn_handler.on(Phaser.Input.Events.POINTER_OUT, function() {
		btn_rect.setAlpha(1);
	});

	btn_handler.on(Phaser.Input.Events.POINTER_DOWN, function() {
		btn_rect.setAlpha(0.6);
	})

	btn_handler.on(Phaser.Input.Events.POINTER_UP, function() {
		btn_rect.setAlpha(0.8);
		repairs++;
	});

	// how we place and format non-button text
	dateText = this
		.add.text(20, GAME_HEIGHT - 50, `Year: ${year}, Day ${day}`, TEXT_FONT);
	statusText = this
		.add.text(20, GAME_HEIGHT - 30, `Living Colonists: ${livingColonists}`, TEXT_FONT);
	storyText = this
		.add.text(60, GAME_HEIGHT / 2, 'the hum of electrical operation begins', STORY_FONT);

	// btn.addListener(Phaser.Input.Events.POINTER_MOVE, function() {
	// 	console.log("pointer move");
	// });
	// btn.addListener(Phaser.Input.Events.POINTER_OUT, function() {
	// 	console.log("pointer out");
	// });
	// interactive.on(Phaser.Input.Events.POINTER_DOWN, function() {
	// 	console.log("on pointer down");
	// });

	// console.log(btn.eventNames());

	// bmd.ctx.fillStyle = '#9a783d';
	// bmd.ctx.strokeStyle = '#35371c';
	
	// graphics.on('pointerover', function() {
	// 	console.log("pointer over");
	// }, rect)

	// graphics = this.add.graphics({
	// 	fillStyle: {color: 0x0000ff}
	// });

	// button = this.add.fillRect();// new Phaser.GameObjects.Rectangle(this, 20, 20, 80, 20, 0xff0000);
	// button.setInteractive();

	// this.btn_birth_colonist = new Phaser.Geom.Rectangle(20, 120, 60, 20);
	
	// this.graphics.fillRectShape(this.btn_birth_colonist);
	// button = new Phaser.Rectangle(20, 20, 100, 40);

	// ui.colonists_alive = this.add.text(0, 0, `Colonists alive: ${state.colonists_alive}`, TEXT_FONT);

	// graphics.fillStyle("#0000FF", 1);
	// graphics.fillRect(20, 20, 100, 40);
}

function update(timestamp, elapsed) {
	// state.colonists_alive-=elapsed*0.0001;
	// ui.colonists_alive.setText(`Colonists alive: ${state.colonists_alive}`);
	statusText.setText(`Living Colonists: ${livingColonists}`);
	dateText.setText(`Year ${year}, Day ${day}`);

	if(!isVisible_Repairs && repairs > 9) {
		repairsText = this
			.add.text(20, GAME_HEIGHT - 70, `Repairs: ${repairs}`, TEXT_FONT);
		isVisible_Repairs = true;
	} else if(isVisible_Repairs) {
		repairsText.setText(`Repairs: ${repairs}`);
	}
}

function event(hitArea: any, x: number, y: number) {
	// console.debug(hitArea);
	// console.log(`over ${x},${y}`);
}

function dateIncrement() {

	if(day == MAX_DAY) {
		day = 1;
		year++;
	} else {
		day++;
	}

}

game = new Phaser.Game(config);
