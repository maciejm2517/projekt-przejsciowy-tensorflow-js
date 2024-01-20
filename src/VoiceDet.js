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

  const loadModel = async () => {
    // Load the model
    const loadedModel = await tf.loadLayersModel('http://localhost:3004/voice_det/my_model.json');

    // Load the labels separately
    const labelsResponse = await fetch('http://localhost:3004/voice_det/exported_labels.json');
    const loadedLabels = await labelsResponse.json();

    // Create a new speech-commands recognizer
    const recognizer = speech.create('BROWSER_FFT');
    recognizer.model = loadedModel;

    // Manually set the loaded labels
    recognizer.wordLabels = () => loadedLabels;

    // Ensure the model is loaded
    await recognizer.ensureModelLoaded();

    setModel(recognizer);
    setLabels(loadedLabels);

    console.log('Model and labels loaded:', loadedModel, loadedLabels);
  };

  useEffect(() => {
    loadModel();
  }, []);

  const startListening = async () => {
    if (model && !model.isListening()) {
      try {
        // Check if the model has been loaded (truthy) and if it's not already listening
        await transferRecognizer.listen(result => {
          const words = transferRecognizer.wordLabels();
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
    if (model && model.isListening()) {
      model.stopListening();
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