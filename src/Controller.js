import { computeKeyRect, redrawCanvas } from "./Boundary.js";
import { sleep } from "./AudioObject.js";

export function selectKeyFromEvent(model, canvas, event) {
    if(!model.scalePlaying) {
        const canvasRect = canvas.getBoundingClientRect();
        let possibilepieces = [];

        for( var i = 0; i < model.Keyboard.Keys.length; i++) {
            let key = model.Keyboard.Keys[i]
            let rect = computeKeyRect(key,model.Keyboard.startingOctave);
            if(rect.contains(event.clientX - canvasRect.left, event.clientY - canvasRect.top)) {
                possibilepieces.push(i)
            }
        }

        let idx = -1;
        if(possibilepieces.length > 0) {
            for(var a = 0; a < possibilepieces.length; a++) {
                let curkey = model.Keyboard.Keys[possibilepieces[a]]
                if(curkey.type === 'Black') {
                    idx = possibilepieces[a];
                }
            }
            if(idx < 0) idx = possibilepieces[0];
        }
        if(idx >= 0) {
            let selk = model.Keyboard.Keys[idx]
            selk.currentColor = "Green"
            model.Keyboard.SelectedKey = selk
        }
        else {
            model.Keyboard.SelectedKey = -1
        }
        return model.copy();
    }
    return model;
}

export function unselectKey(model) {
    if(model.Keyboard.SelectedKey !== -1) {
        model.Keyboard.SelectedKey.currentColor = model.Keyboard.SelectedKey.type
        model.Keyboard.SelectedKey = -1
        return model.copy()
    }
    return model
}

export function playScale(model, AudioObj, canvasRef, offset) {
    /*  
        select keys into an array,
        play each note for a second 
    */
    model.scalePlaying = true;
    if(model.Keyboard.octaves > 2 && offset < 6) {
        offset+=12
    }
    let ScaleNotes = []
    ScaleNotes.push(model.Keyboard.Keys[offset])
    ScaleNotes.push(model.Keyboard.Keys[offset+2]) //wholestep is 2, half step is 1
    ScaleNotes.push(model.Keyboard.Keys[offset+4])
    ScaleNotes.push(model.Keyboard.Keys[offset+5])
    ScaleNotes.push(model.Keyboard.Keys[offset+7])
    ScaleNotes.push(model.Keyboard.Keys[offset+9])
    ScaleNotes.push(model.Keyboard.Keys[offset+11])
    ScaleNotes.push(model.Keyboard.Keys[offset+12])

    let speed = 500 // ms

    ScaleNotes[0].currentColor = "Red"
    redrawCanvas(model,canvasRef)
    AudioObj.playNote(ScaleNotes[0])

    sleep(speed)
    .then(() => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[1])
        ScaleNotes[0].currentColor = ScaleNotes[0].type
        ScaleNotes[1].currentColor = "Orange"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[2])
        ScaleNotes[1].currentColor = ScaleNotes[1].type
        ScaleNotes[2].currentColor = "Yellow"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[3])
        ScaleNotes[2].currentColor = ScaleNotes[2].type
        ScaleNotes[3].currentColor = "Green"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[4])
        ScaleNotes[3].currentColor = ScaleNotes[3].type
        ScaleNotes[4].currentColor = "Blue"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[5])
        ScaleNotes[4].currentColor = ScaleNotes[4].type
        ScaleNotes[5].currentColor = "#4b0082"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[6])
        ScaleNotes[5].currentColor = ScaleNotes[5].type
        ScaleNotes[6].currentColor = "#8000FF"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[7])
        ScaleNotes[6].currentColor = ScaleNotes[6].type
        ScaleNotes[7].currentColor = "Red"
        redrawCanvas(model,canvasRef)}) // made it to top
    .then( () => sleep(speed*2))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[6])
        ScaleNotes[7].currentColor = ScaleNotes[7].type
        ScaleNotes[6].currentColor = "#8000FF"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[5])
        ScaleNotes[6].currentColor = ScaleNotes[6].type
        ScaleNotes[5].currentColor = "Indigo"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[4])
        ScaleNotes[5].currentColor = ScaleNotes[5].type
        ScaleNotes[4].currentColor = "Blue"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[3])
        ScaleNotes[4].currentColor = ScaleNotes[4].type
        ScaleNotes[3].currentColor = "Green"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[2])
        ScaleNotes[3].currentColor = ScaleNotes[3].type
        ScaleNotes[2].currentColor = "Yellow"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[1])
        ScaleNotes[2].currentColor = ScaleNotes[2].type
        ScaleNotes[1].currentColor = "Orange"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed))
    .then( () => {
        AudioObj.stopNote()
        AudioObj.playNote(ScaleNotes[0])
        ScaleNotes[1].currentColor = ScaleNotes[1].type
        ScaleNotes[0].currentColor = "Red"
        redrawCanvas(model,canvasRef)})
    .then( () => sleep(speed*2))
    .then( () => {
        AudioObj.stopNote()
        ScaleNotes[0].currentColor = ScaleNotes[0].type
        redrawCanvas(model,canvasRef)
        model.scalePlaying = false;
        })
        return model.copy();
}

/* 
    Create frequency map for keys
    Add sound handler to keys,
    adjust select and unselect key functions
    make scales
    implement volume slider
    add scale hanlder
    profit
*/