import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";

function VoiceDet() {
  const [model, setModel] = useState(null);
  const [action, setAction] = useState(null);
  const [labels, setLabels] = useState(null);

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT");
    console.log('Model Loaded');
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  };

  useEffect(() => {
    loadModel();
  }, []);

  function argMax(arr) {
    return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
  }

  const recognizeCommands = async () => {
    console.log('Listening for commands');
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>{action ? action : "No Action Detected"}</div>
      </header>
    </div>
  );
}

export default VoiceDet;
