/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { Container, Row, Col } from 'react-bootstrap';
import victoryImg from "./handImgs/victory_2.jpg";
import thumbsUpImg from "./handImgs/thumbs_up_2.jpg";
import thumbsDownImg from "./handImgs/thumbs_down_2.jpg";
import loveYouImg from "./handImgs/i_love_you_2.jpg";

function CamRec() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [label, setLabel] = useState('');

  const images = { thumbsUp: thumbsUpImg, victory: victoryImg, loveYou: loveYouImg, thumbsDown: thumbsDownImg };
  const MODEL_PATH = process.env.PUBLIC_URL + 'server/mobileNet/model.json';

  const runInterference = async () => {
    const net = await tf.loadGraphModel(MODEL_PATH);
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const labelMap = {
    1: { name: 'loveYou', color: 'red' },
    2: { name: 'thumbsDown', color: 'yellow' },
    3: { name: 'thumbsUp', color: 'lime' },
    4: { name: 'victory', color: 'blue' },
  };

  const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx) => {
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i] && classes[i] && scores[i] > threshold) {
        const [y, x, height, width] = boxes[i];
        const text = classes[i];

        ctx.strokeStyle = labelMap[text]['color'];
        ctx.lineWidth = 10;
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';

        setImage(labelMap[text]['name']);
        const labelText = labelMap[text]['name'];
        if (labelText === "victory") {
          setLabel("victory");
        } else if (labelText === "thumbsUp") {
          setLabel("thumbs up");
        } else if (labelText === "loveYou") {
          setLabel("i love you");
        } else if (labelText === "thumbsDown") {
          setLabel("thumbs down");
        }

        ctx.beginPath();
        ctx.fillText(labelText + ' - ' + Math.round(scores[i] * 100) / 100, x * imgWidth, y * imgHeight - 10);
        ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth / 2, height * imgHeight / 2);
        ctx.stroke();
      }
    }
  };

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

      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast('int32');
      const expanded = casted.expandDims(0);

      const obj = await net.executeAsync(expanded);

      const boxes = await obj[1].array();
      const classes = await obj[0].array();
      const scores = await obj[3].array();

      if (canvasRef.current != null) {
        const ctx = canvasRef.current.getContext("2d");

        requestAnimationFrame(() => { drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx) });

        tf.dispose(img);
        tf.dispose(resized);
        tf.dispose(casted);
        tf.dispose(expanded);
        tf.dispose(obj);
      }
    }
  };

  useEffect(() => { runInterference() }, []);

  return (
    <Container>
      <Row>
        <Col style={{ position: 'relative', paddingBottom: '0px' }} xs={12} sm={12} md={8} lg={6} xl={6}>
          <Webcam
            ref={webcamRef}
            style={{ position: 'relative', top: 0, left: 0, width: "100%", objectPosition: 'top' }}
          />
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width: "100%", objectPosition: 'top', zIndex: 1 }}
          />
        </Col>
        <Col style={{ position: 'relative', paddingBottom: '100px' }} xs={12} sm={12} md={4} lg={6} xl={6}>
          {image !== null ? (
            <img
              src={images[image]}
              style={{
                width: "50%",
                alt: { image }
              }}
            />
          ) : (
            true
          )}
          <p>
            {label}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default CamRec;
