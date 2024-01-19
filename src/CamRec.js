// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { nextFrame } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
import { drawRect } from "./utilities_cam_rec";
import { Button, Container, Row, Col } from 'react-bootstrap';

function CamRec() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    const net = await tf.loadGraphModel('http://localhost:3004/cam_rec/model.json')
    //console.log("detecting");
    // Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640, 480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await net.executeAsync(expanded)

      const boxes = await obj[5].array()
      const classes = await obj[7].array()
      const scores = await obj[1].array()

      // Draw mesh
      if(canvasRef.current!=null){

      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      requestAnimationFrame(() => { drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx) });

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)
      }

    }
  };

  useEffect(() => { runCoco() }, []);

  return (
    <Container>
      <Row>
        <Col style={{ position: 'relative' }} xs={10} sm={10} md={10} lg={6} xl={6}>
          <Webcam
            ref={webcamRef}
            style={{ position: 'absolute', top: 0, left: 0, width:"100%", objectPosition: 'top' }}

          />

          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width:"100%", objectPosition: 'center'  }}

          />
        </Col>
        <Col style={{ position: 'relative' }}>
        

      </Col>
      </Row>

    </Container>
  );
}

export default CamRec;
