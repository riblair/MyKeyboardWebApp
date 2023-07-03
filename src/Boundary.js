
const startOffset = 50
const WKH = 200
const BKH = WKH / 1.75
const gap = WKH/30
const WKW = WKH/3
const BKW = WKW / 2

export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d');

    if(ctx === null) return;
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);
    drawKeys(model,ctx)
}

export class PianoKey {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(x,y) {
        return x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height); 
    }

}

export function computeKeyRect(key, startingOctave) {

    let keyOffset = (key.noteID - startingOctave*12) % 12
    let octaveOffset = Math.floor((key.noteID - startingOctave*12) / 12);
    let WhiteKeyOffset = 0;
    if(keyOffset < 2) {
        WhiteKeyOffset = 0;
    }
    else if(keyOffset < 4) {
        WhiteKeyOffset = 1;
    }
    else if(keyOffset < 5) {
        WhiteKeyOffset = 2;
    }
    else if(keyOffset < 7) {
        WhiteKeyOffset = 3;
    }
    else if(keyOffset < 9) {
        WhiteKeyOffset = 4;
    }
    else if(keyOffset < 11) {
        WhiteKeyOffset = 5;
    }
    else {
        WhiteKeyOffset = 6;
    }

    let pk = new PianoKey();

    if(key.type === 'White') {
        pk.x = startOffset+WhiteKeyOffset*WKW + octaveOffset*(7*WKW)
        pk.y = 25
        pk.width = WKW-gap
        pk.height = WKH
    }
    else {
        pk.x = startOffset+WhiteKeyOffset*WKW+((WKW+gap/2)/1.5)+ octaveOffset*(7*WKW)
        pk.y = 25
        pk.width = BKW
        pk.height = BKH
    }

    return pk;
}

function drawKeys(model, ctx) {
    let blackkeys = []
    model.Keyboard.Keys.forEach( key => {
        if(key.type === "Black") {
            blackkeys.push(key)
        }
        else {
            ctx.fillStyle = key.currentColor;
            let k = computeKeyRect(key,model.Keyboard.startingOctave)
            ctx.fillRect(k.x, k.y, k.width, k.height);
        }
        
    })
    /* Black keys need to be drawn last in order for them to appear on top of the white keys*/
    blackkeys.forEach( key => {
        ctx.fillStyle = key.currentColor;
            let k = computeKeyRect(key,model.Keyboard.startingOctave)
            ctx.fillRect(k.x, k.y, k.width, k.height);
    })
}