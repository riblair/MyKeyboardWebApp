import './App.css';
import { layout } from './layout.js'
import React from 'react';
import Model from './Model.js'
import { redrawCanvas } from './Boundary';
import { selectKeyFromEvent, unselectKey, playScale } from './Controller';
import { AudioObj, sleep } from './AudioObject.js';

function App() {
  const [model, setModel] = React.useState(new Model(3,4)); //define model
  const [redraw, forceRedraw] = React.useState(0);
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current) //define this prob
  }, [model,redraw])

  const handleClick = (e) => {
    let newModel = selectKeyFromEvent(model, canvasRef.current, e, true);
    AudioObj.playNote(newModel.Keyboard.SelectedKey)
    setModel(newModel);
  }
  const handleUnclick = (e) => {
    if(!model.scalePlaying) {
      let newModel = unselectKey(model)
      AudioObj.stopNote()
      setModel(newModel);
    }
  }

  const adjustVolume = (e) => {
    let volumeStuf = document.getElementById("vol")
    if(!(volumeStuf === null)) {
      AudioObj.volume = volumeStuf.value / 1000.0
    }
  }
  const playScaleHandler = (a) => {
    let newModel = playScale(model,AudioObj, canvasRef.current, a)
    setModel(newModel)
    sleep(500*17).then( () => {
      newModel.scalePlaying = false;
      let lastmodel = newModel.copy()
      setModel(lastmodel)
    })
  }

  return (
    <main className='App-header'> 
      <h1 style={layout.header}
          left={layout.header.left}
          right={layout.header.right}
          top={layout.header.top}
          margin={layout.header.margin}
          position={layout.header.position}
      > Riley's Keyboard and Scale Library </h1> 
        <canvas style = {layout.canvas}
                ref = {canvasRef}
                height = {layout.canvas.height}
                width = {layout.canvas.width}  
                left = {layout.canvas.left}
                top = {layout.canvas.top}
                bottom = {layout.canvas.bottom}
                right = {layout.canvas.right}
                margin = {layout.canvas.margin}
                border = {layout.canvas.border}
                position = {layout.canvas.position}
                onMouseDown = {handleClick}
                onMouseUp = {handleUnclick}
                onMouseLeave = {handleUnclick}>

                </canvas>
          <form
          style={layout.volumeslider}
          right={layout.volumeslider.right}
          top={layout.volumeslider.top}
          margin={layout.volumeslider.margin}
          position={layout.volumeslider.position}
          border = {layout.canvas.border}
          onMouseDown={adjustVolume}
          onMouseUp={adjustVolume}
          >
            <small
            border = "5px solid Black"
            >Volume Slider</small>
            <input type="range" id="vol" name="vol" min="0" max="100"
              
            ></input>
          </form>
          <div style={layout.ButtonBackground}></div>
            <button 
            style={layout.ScaleButton0}
            onClick={ (e) => playScaleHandler(0)}
            disabled= {model.scalePlaying} > C Major Scale</button>

            <button 
            style={layout.ScaleButton1}
            onClick={ (e) => playScaleHandler(1)}
            disabled= {model.scalePlaying}> C# Major Scale</button>

            <button 
            style={layout.ScaleButton2}
            onClick={ (e) => playScaleHandler(2)}
            disabled= {model.scalePlaying}> D Major Scale</button>

            <button 
            style={layout.ScaleButton3}
            onClick={ (e) => playScaleHandler(3)}
            disabled= {model.scalePlaying}> D# Major Scale</button>
            <button 
            style={layout.ScaleButton4}
            onClick={ (e) => playScaleHandler(4)}
            disabled= {model.scalePlaying}> E Major Scale</button>
            
            <button 
            style={layout.ScaleButton5}
            onClick={ (e) => playScaleHandler(5)}
            disabled= {model.scalePlaying}> F Major Scale</button>

            <button 
            style={layout.ScaleButton6}
            onClick={ (e) => playScaleHandler(6)}
            disabled= {model.scalePlaying}> F# Major Scale</button>

            <button 
            style={layout.ScaleButton7}
            onClick={ (e) => playScaleHandler(7)}
            disabled= {model.scalePlaying}> G Major Scale</button>

            <button 
            style={layout.ScaleButton8}
            onClick={ (e) => playScaleHandler(8)}
            disabled= {model.scalePlaying}> G# Major Scale</button>

            <button 
            style={layout.ScaleButton9}
            onClick={ (e) => playScaleHandler(9)}
            disabled= {model.scalePlaying}> A Major Scale</button>

            <button 
            style={layout.ScaleButton10}
            onClick={ (e) => playScaleHandler(10)}
            disabled= {model.scalePlaying}> A# Major Scale</button>

            <button 
            style={layout.ScaleButton11}
            onClick={ (e) => playScaleHandler(11)}
            disabled= {model.scalePlaying}> B Major Scale</button>

    </main>
  );
}
export default App;
