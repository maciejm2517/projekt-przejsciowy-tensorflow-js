import React, {useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";

import zero from "./VD_imgs/zero.png";
import one from "./VD_imgs/number-one.png";
import two from "./VD_imgs/number-2.png";
import three from "./VD_imgs/number-3.png";
import four from "./VD_imgs/number-four.png";
import five from "./VD_imgs/number-5.png";
import six from "./VD_imgs/six.png";
import seven from "./VD_imgs/seven.png";
import eight from "./VD_imgs/number-8.png";
import nine from "./VD_imgs/number-9.png";
import yes from "./VD_imgs/thumb-up.png";
import no from "./VD_imgs/thumb-down.png";
import left from "./VD_imgs/plain-arrow-left.png";
import right from "./VD_imgs/plain-arrow-right.png";
import up from "./VD_imgs/plain-arrow-up.png";
import down from "./VD_imgs/plain-arrow-down.png";
import go from "./VD_imgs/play-button.png";
import stop from "./VD_imgs/stop-sign.png";


function VoiceDet() {
  const [model, setModel] = useState(null);
  const [action, setAction] = useState(null);
  const [labels, setLabels] = useState(null);

  const [picture, setPicture] = useState(null);

  const canvasRef = useRef(null);
  const images = {  zero: zero,
                    one: one,
                    two: two,
                    three: three,
                    four: four,
                    five: five,
                    six: six,
                    seven: seven,
                    eight: eight,
                    nine: nine,
                    yes: yes,
                    no: no,
                    left: left,
                    right: right,
                    up: up,
                    down: down,
                    go: go,
                    stop: stop};

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT");
    console.log('Model Loaded');
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
    console.log(model);
    //console.log(recognizer);
  };

  useEffect(() => {
    loadModel();
  }, []);

  function argMax(arr) {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

  const recognizeCommands = async () => {
    console.log('Listening for commands');
    console.log(model);

    if (model && !model.isListening()) {
      model.listen(result => {
        console.log(result.spectrogram);
        setAction(labels[argMax(Object.values(result.scores))]);
      }, { includeSpectrogram: true, probabilityThreshold: 0.9 });
      setTimeout(() => {
        if (model.isListening()) {
          model.stopListening();
        }
      }, 10e3);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      recognizeCommands();
    }, 2000); // Execute recognizeCommands every 2 seconds

    return () => {
      clearInterval(timer); // Cleanup the timer when the component unmounts
      if (model && model.isListening()) {
        model.stopListening();
      }
    };
  }, []); // Empty dependency array to run it only once when the component mounts

  return (
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>{action ? action : "No Action Detected"}</div>
      </header>
    </div>
    */

<div className="NewVD">
<header className="NewVD-header">

  <canvas
    ref={canvasRef}
    style={{
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      textAlign: "center",
      zindex: 8,
      width: 512,
      height: 512,
    }}
  />

  <div>{action ? action : "No Action Detected"}</div>
</header>
<div>
            <img
              src={images[action]}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 800,
                bottom: 150,
                right: 0,
                textAlign: "center",
                height: 100,
              }}
            />

</div>
</div>
  );
}

export default VoiceDet;