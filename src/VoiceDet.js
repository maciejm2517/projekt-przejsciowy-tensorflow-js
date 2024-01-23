// import React, {useRef, useEffect, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import * as tf from "@tensorflow/tfjs";
// import * as speech from "@tensorflow-models/speech-commands";

// import zero from "./VD_imgs/zero.png";
// import one from "./VD_imgs/number-one.png";
// import two from "./VD_imgs/number-2.png";
// import three from "./VD_imgs/number-3.png";
// import four from "./VD_imgs/number-four.png";
// import five from "./VD_imgs/number-5.png";
// import six from "./VD_imgs/six.png";
// import seven from "./VD_imgs/seven.png";
// import eight from "./VD_imgs/number-8.png";
// import nine from "./VD_imgs/number-9.png";
// import yes from "./VD_imgs/thumb-up.png";
// import no from "./VD_imgs/thumb-down.png";
// import left from "./VD_imgs/plain-arrow-left.png";
// import right from "./VD_imgs/plain-arrow-right.png";
// import up from "./VD_imgs/plain-arrow-up.png";
// import down from "./VD_imgs/plain-arrow-down.png";
// import go from "./VD_imgs/play-button.png";
// import stop from "./VD_imgs/stop-sign.png";


// function VoiceDet() {
//   const [model, setModel] = useState(null);
//   const [action, setAction] = useState(null);
//   const [labels, setLabels] = useState(null);

//   const [picture, setPicture] = useState(null);

//   const canvasRef = useRef(null);
//   const images = {  zero: zero,
//                     one: one,
//                     two: two,
//                     three: three,
//                     four: four,
//                     five: five,
//                     six: six,
//                     seven: seven,
//                     eight: eight,
//                     nine: nine,
//                     yes: yes,
//                     no: no,
//                     left: left,
//                     right: right,
//                     up: up,
//                     down: down,
//                     go: go,
//                     stop: stop};

//                     const labels_xd = {  
//                       0:"_background_noise_",
//                       1:"cztery",
//                       2:"dol",
//                       3:"dwa",
//                       4:"dziewiec",
//                       5:"gora",
//                       6:"jeden",
//                       7: "lewo",
//                       8:"moze",
//                       9:"nie",
//                       10:"osiem",
//                       11:"piec",
//                       12:"prawo",
//                       13:"siedem",
//                       14:"start",
//                       15:"stop",  
//                       16:"szesc",
//                       17:"tak",
//                       18:"trzy",
//                       19:"zero"
//                   };
                  

//   const loadModel = async () => {
//     const recognizer = await speech.create('BROWSER_FFT', null, 
//                           'http://localhost:3004/voice_det/my-model.json', 
//                           'http://localhost:3004/voice_det/metadata1.json');     
//     console.log('Model Loaded');
//     await recognizer.ensureModelLoaded();
//     console.log(recognizer.wordLabels());
//     setModel(recognizer);
//     setLabels(recognizer.wordLabels());
//     console.log(model);
//     console.log(recognizer);
//   };

//   useEffect(() => {
//     loadModel();
//   }, []);

//   function argMax(arr) {
//     return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
//   }

//   const recognizeCommands = async () => {
//     console.log('Listening for commands');
//     console.log(model);

//     if (model && !model.isListening()) {
//       model.listen(result => {
//         console.log(result.spectrogram);
//         setAction(labels[argMax(Object.values(result.scores))]);
//       }, { includeSpectrogram: true, probabilityThreshold: 0.7 });
//       setTimeout(() => {
//         if (model.isListening()) {
//           model.stopListening();
//         }
//       }, 10e3);
//     }
//   };
// //
//   //setInterval(recognizeCommands, 2000);


//   // useEffect(() => {
//   //   const timer = setInterval(() => {
//   //     recognizeCommands();
//   //   }, 2000); // Execute recognizeCommands every 2 seconds

//   //   return () => {
//   //     clearInterval(timer); // Cleanup the timer when the component unmounts
//   //     if (model && model.isListening()) {
//   //       model.stopListening();
//   //     }
//   //   };//
//   // }, []); // Empty dependency array to run it only once when the component mounts
// if(model) return (
// <div className="NewVD">
// <header className="NewVD-header">

//   <div><button onClick={recognizeCommands}>Start</button>{action ? action : "No Action Detected"}</div>
// </header>
// <div>

// </div>
// </div>
//   );
// }

// export default VoiceDet;


import React, {useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";
import { Button, Container, Row, Col } from 'react-bootstrap';



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
    console.log(recognizer);
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

  //setInterval(recognizeCommands, 2000);


  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     recognizeCommands();
  //   }, 2000); // Execute recognizeCommands every 2 seconds

  //   return () => {
  //     clearInterval(timer); // Cleanup the timer when the component unmounts
  //     if (model && model.isListening()) {
  //       model.stopListening();
  //     }
  //   };//
  // }, []); // Empty dependency array to run it only once when the component mounts
if(model) return (

<Container>
<Row>
  <Col style={{ position: 'relative' }} xs={10} sm={10} md={10} lg={6} xl={6}>
  <button onClick={recognizeCommands}>Start</button>{action ? action : "No Action Detected"}

  </Col>
  <Col style={{ position: 'relative' }}>
  <img
              src={images[action]}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                height: 100,
              }}
            />

</Col>
</Row>

</Container>
  );
}

export default VoiceDet;