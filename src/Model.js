export default class Model {
    constructor(octaves,startingOctave) {
        this.Keyboard = new Keyboard(octaves,startingOctave);
        this.scalePlaying = false;
    }

    copy() {
        let newModel = new Model(this.Keyboard.octaves, this.Keyboard.startingOctave);
        newModel.Keyboard.Keys = this.Keyboard.Keys;
        newModel.Keyboard.SelectedKey = this.Keyboard.SelectedKey;
        newModel.scalePlaying = this.scalePlaying;
        return newModel;
    }
}

export class Keyboard {
    constructor(octaves,startingOctave) {
        this.startingOctave = startingOctave
        this.octaves = octaves
        this.Keys = this.initalizeKeyboard(octaves,startingOctave) 
        this.SelectedKey = -1;
    }

    initalizeKeyboard(octaves,startingOctave) {
        var keys = []; //empty array for now
        for(var i = 0; i < octaves; i++) {
            keys.push(new Key('White', startingOctave*12 + i*12)); //C
            keys.push(new Key('Black', startingOctave*12 + i*12 + 1)); //C#
            keys.push(new Key('White', startingOctave*12 + i*12 + 2)); //D
            keys.push(new Key('Black', startingOctave*12 + i*12 + 3)); //D#
            keys.push(new Key('White', startingOctave*12 + i*12 + 4)); // E
            keys.push(new Key('White', startingOctave*12 + i*12 + 5)); // F
            keys.push(new Key('Black', startingOctave*12 + i*12 + 6)); //F#
            keys.push(new Key('White', startingOctave*12 + i*12 + 7)); // G
            keys.push(new Key('Black', startingOctave*12 + i*12 + 8)); //G#
            keys.push(new Key('White', startingOctave*12 + i*12 + 9)); // A
            keys.push(new Key('Black', startingOctave*12 + i*12 + 10)); //A#
            keys.push(new Key('White', startingOctave*12 + i*12 + 11)); // B
        }
        return keys;
    }
}

export class Key {
    constructor(type, note) {
        this.type = type; //type is default color, 
        this.noteID = note // this is going to be a number from 0 to 127
        this.currentColor = type; //default color is fine at start
    }
}