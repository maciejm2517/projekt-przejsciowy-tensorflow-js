/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import './App.css';
import * as speech from "@tensorflow-models/speech-commands";
import { Container, Row, Col, Button } from 'react-bootstrap';



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

  const images = {
    zero: zero,
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
    stop: stop
  };

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT");
    await recognizer.ensureModelLoaded();
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

  if (model) return (

    <Container>
      <Row>
        <h1>
          Possible commands:
        </h1>
        <Col>
          Zero <br></br>
          Nine
        </Col>
        <Col>
          One <br></br>
          Yes
        </Col>
        <Col>
          Two <br></br>
          No
        </Col>
        <Col>
          Three <br></br>
          Go
        </Col>
        <Col>
          Four <br></br>
          Stop
        </Col>
        <Col>
          Five <br></br>
          Left
        </Col>
        <Col>
          Six <br></br>
          Right
        </Col>
        <Col>
          Seven <br></br>
          Up
        </Col>
        <Col>
          Eight <br></br>
          Down
        </Col>
      </Row>
      <Row>
        <Col style={{ position: 'relative' }} xs={10} sm={10} md={10} lg={6} xl={6}>
          <Button style={{backgroundColor: 'black', fontSize: 'large'}} onClick={recognizeCommands}>Start</Button>
          <p style={{  fontWeight: 'bold', fontSize: 'large'}}>
            {action ? action : "No Action Detected"}
          </p>
          <img
            src={images[action]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              height: 250,
              width: 250
            }}
          />

        </Col>
      </Row>

    </Container>
  );
}

export default VoiceDet;