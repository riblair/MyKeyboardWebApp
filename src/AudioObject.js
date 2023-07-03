import { FreqencyMap } from "./MidiMapping";
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export class AudioObject {
    constructor(startVol, waveType) {
        this.volume = startVol
        this.waveType = waveType
        this.audioCTX = new AudioContext(); 
    }

    playNote(key) {
        if(key !== -1) {

            this.oscillator = new OscillatorNode(this.audioCTX);
            this.oscillator.type = this.waveType
            this.oscillator.frequency.value = FreqencyMap[key.noteID]

            this.gainNode = new GainNode(this.audioCTX);
            this.gainNode.gain.value = 0

            this.oscillator.connect(this.gainNode).connect(this.audioCTX.destination)
            this.notePlaying = true
            this.oscillator.start(0)
            this.gainNode.gain.setTargetAtTime(this.volume, this.audioCTX.currentTime,0.01) 
        }
    }

    stopNote() {
        if(this.notePlaying === true) {
            this.gainNode.gain.setTargetAtTime(0.0, this.audioCTX.currentTime, 0.11); // exponential
            // if(this.oscillator.frequency.value > 293.67) {
            //     this.gainNode.gain.value = 0
            // }
            // else {
            //     this.oscillator.frequency.value = 0
            // }
            this.notePlaying = false
            //this.disconnect()
        }
    }
}
 const AudioObj = new AudioObject(0.05,"sine");
export {AudioObj}