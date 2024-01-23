import React, { useRef, useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";

// ... your existing code ...
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
  const labels_xd = {  
    0:"_background_noise_",
    1:"cztery",
    2:"dol",
    3:"dwa",
    4:"dziewiec",
    5:"gora",
    6:"jeden",
    7: "lewo",
    8:"moze",
    9:"nie",
    10:"osiem",
    11:"piec",
    12:"prawo",
    13:"siedem",
    14:"start",
    15:"stop",  
    16:"szesc",
    17:"tak",
    18:"trzy",
    19:"zero"
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
      myModel.loadExamples(polishExamples,false);
      
      await myModel.train({
        epochs: 10,
        callback: {
          onEpochEnd: async (epoch, logs) => {
            console.log(`Epoch ${epoch}: loss=${logs.loss}, accuracy=${logs.acc}`);
          }
        }
      });
      await myModel.save('downloads://my-model');

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

  // const startListening = async () => {
  //   if (myModel && !myModel.isListening()) {
  //     console.log('pressed')
  //     try {
  //       // Check if the model has been loaded (truthy) and if it's not already listening
  //       console.log("listening")
  //       await myModel.listen(result => {
  //         const words = myModel.wordLabels();
  //         //console.log(words)
  //         for (let i = 0; i < words.length; ++i) {
  //           //console.log(`score for word '${words[i]}' = ${result.scores[i]}`);
  //           console.log(labels_xd[result.scores.indexOf(Math.max(...result.scores))])
  //         }
  //       }, { probabilityThreshold: 0.7 });
  //     } catch (error) {
  //       console.error("Error starting listening:", error);
  //     }
  //   }
  // };

  // const stopListening = () => {
  //   if (myModel && myModel.isListening()) {
  //     myModel.stopListening();
  //   }
  // };

  // const argMax = arr => arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];

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
          {/* <button onClick={startListening}>Start</button>
          <button onClick={stopListening}>Stop</button> */}
          {action ? action : "No Action Detected"}
        </div>
      </header>
      <div>
        <img
          // src={images[argMax]}
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
