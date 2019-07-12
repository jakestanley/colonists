import "phaser";

export const TEXT_FONT = {
    fontFamily: "Ubuntu Mono",
}

export const STORY_FONT = {
    fontFamily: "Century Schoolbook",
    fontStyle: "italic"
}

export class Ui {

    graphics: any;
    btn_birth_colonist: Phaser.Geom.Rectangle;
    colonists_alive: Text;

    constructor(game: any) {
        
        this.graphics = game.add.graphics({
            fillStyle: {color: 0x0000ff}
        });

        this.btn_birth_colonist = new Phaser.Geom.Rectangle(20, 120, 60, 20);
        
        this.graphics.fillRectShape(this.btn_birth_colonist);
        
        
    }

    event(pointer, localX, localY, event) {
        console.log('clicked');
    }
}