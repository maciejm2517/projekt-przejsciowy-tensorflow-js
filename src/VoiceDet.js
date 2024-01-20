import React, { useRef, useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";

// ... your existing code ...

function VoiceDet() {
  const [model, setModel] = useState(null);
  const [action, setAction] = useState(null);
  const [labels, setLabels] = useState(null);

  const [picture, setPicture] = useState(null);

  const canvasRef = useRef(null);
  const images = {
    // ... your existing image paths ...
  };
  let myModel;
  const loadModel = async () => {
    try {
      // Load the pre-trained model
      const baseRecognizer = speech.create('BROWSER_FFT');
      await baseRecognizer.ensureModelLoaded();
  
      // Create a transfer learning model
      myModel = baseRecognizer.createTransfer('polish');
  
      // Load the examples for transfer learning
      const labelsResponse = await fetch('http://localhost:3004/voice_det/serialized_model.bin'); // Fetch the binary file directly
      const polishExamples = await labelsResponse.arrayBuffer();
      console.log(polishExamples);
  
      // Load examples for the "polish" transfer learning task
      myModel.loadExamples(polishExamples);
  
      // Ensure the model is loaded
      await myModel.ensureModelLoaded();
  
      //setModel(model);
  
      console.log('Model and examples loaded for transfer learning');
    } catch (error) {
      console.error('Error loading model:', error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const startListening = async () => {
    if (myModel && !myModel.isListening()) {
      try {
        // Check if the model has been loaded (truthy) and if it's not already listening
        await myModel.listen(result => {
          const words = myModel.wordLabels();
          for (let i = 0; i < words.length; ++i) {
            console.log(`score for word '${words[i]}' = ${result.scores[i]}`);
          }
        }, { probabilityThreshold: 0.75 });
      } catch (error) {
        console.error("Error starting listening:", error);
      }
    }
  };

  const stopListening = () => {
    if (myModel && myModel.isListening()) {
      myModel.stopListening();
    }
  };

  const argMax = arr => arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];

  return (
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

        <div>
          <button onClick={startListening}>Start</button>
          <button onClick={stopListening}>Stop</button>
          {action ? action : "No Action Detected"}
        </div>
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