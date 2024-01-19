/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilitiesOD";
import { Container, Row, Col } from 'react-bootstrap';

function ObjectDet() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  const runCoco = async () => {
    console.time('Execution Time');

    const net = await cocossd.load();
    console.timeEnd('Execution Time');

    console.log("Object detection model loaded.");
    setInterval(() => {
      detect(net);
    }, 10);
  };
  let colorMap = {};
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      console.time('Execution Time');

      const obj = await net.detect(video);
      console.timeEnd('Execution Time');

      if (canvasRef.current != null) {

        const ctx = canvasRef.current.getContext("2d");
        drawRect(obj, ctx, colorMap);
      }
    }
  };

  useEffect(() => { runCoco() }, []);

  return (
    <Container>
      <Row>
        <Col style={{ position: 'relative' }} xs={12} sm={12} md={10} lg={6} xl={6}>
          <Webcam
            ref={webcamRef}
            style={{ position: 'absolute', top: 0, left: 0, width: "100%", objectPosition: 'top' }}

          />

          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width: "100%", objectPosition: 'center' }}

          />
        </Col>
        <Col style={{ position: 'relative' }}>


        </Col>
      </Row>

    </Container>

  );
}

export default ObjectDet;
