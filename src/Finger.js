/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";

import Webcam from "react-webcam";
import "./App.css";

import { loveYouGesture } from "./LoveYou";
import { thumbsDownGesture } from "./ThumbsDown";

// import victory from "./HP_imgs/victory.png";
// import thumbs_up from "./HP_imgs/thumbs_up.png";
// import thumbs_down from "./HP_imgs/thumbs_down.png";
// import i_love_you from "./HP_imgs/i_love_you.png";

import victory from "./HP_imgs/victory_2.jpg";
import thumbs_up from "./HP_imgs/thumbs_up_2.jpg";
import thumbs_down from "./HP_imgs/thumbs_down_2.jpg";
import i_love_you from "./HP_imgs/i_love_you_2.jpg";


function Finger() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);
  const [variable, setVariable] = useState('');

  const images = { thumbs_up: thumbs_up, victory: victory, i_love_you: i_love_you, thumbs_down: thumbs_down };

  const runHandpose = async () => {
    console.time('Execution Time');
    const net = await handpose.load();
    console.timeEnd('Execution Time');

    console.log("Handpose model loaded.");
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const fingers = {
    thumb: [0, 1, 2, 3, 4],
    index: [0, 5, 6, 7, 8],
    middle: [0, 9, 10, 11, 12],
    ring: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };

  const drawHand = (predictions, ctx) => {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const landmarks = prediction.landmarks;
  
        for (let j = 0; j < Object.keys(fingers).length; j++) {
          let finger = Object.keys(fingers)[j];
          for (let k = 0; k < fingers[finger].length - 1; k++) {
            const firstJointIndex = fingers[finger][k];
            const secondJointIndex = fingers[finger][k + 1];
  
            ctx.beginPath();
            ctx.moveTo(
              landmarks[firstJointIndex][0],
              landmarks[firstJointIndex][1]
            );
            ctx.lineTo(
              landmarks[secondJointIndex][0],
              landmarks[secondJointIndex][1]
            );
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 4;
            ctx.stroke();
          }
        }
  
        for (let i = 0; i < landmarks.length; i++) {
          const x = landmarks[i][0];
          const y = landmarks[i][1];
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, 3 * Math.PI);
  
          ctx.fillStyle = 'red';
          ctx.fill();
        }
      });
    }
  };
  

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoX = webcamRef.current.video.videoWidth;
      const videoY = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoX;
      webcamRef.current.video.height = videoY;

      canvasRef.current.width = videoX;
      canvasRef.current.height = videoY;

      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          loveYouGesture,
          thumbsDownGesture,
        ]);
        console.time('Execution Time');
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        console.timeEnd('Execution Time');
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          setImage(gesture.gestures[maxConfidence].name);
          console.log(image);
          if (gesture.gestures[maxConfidence].name === "victory") {
            const myVariable = "victory";
            setVariable(myVariable);
          }
          if (gesture.gestures[maxConfidence].name === "thumbs_up") {
            const myVariable = "thumbs up";
            setVariable(myVariable);
          }
          if (gesture.gestures[maxConfidence].name === "i_love_you") {
            const myVariable = "i love you";
            setVariable(myVariable);
          }
          if (gesture.gestures[maxConfidence].name === "thumbs_down") {
            const myVariable = "thumbs down";
            setVariable(myVariable);
          }
        }
      }
      if (canvasRef.current != null) {
        const ctx = canvasRef.current.getContext("2d");
        drawHand(hand, ctx);

      }
    }
  };

  useEffect(() => { runHandpose() }, []);

  return (
    <Container>
      <Row>
        <Col style={{ position: 'relative' }} xs={8} sm={8} md={8} lg={6} xl={6}>
          <Webcam
            ref={webcamRef}
            style={{ position: 'absolute', top: 0, left: 0, width: "100%", objectPosition: 'top' }}

          />
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width: "100%", objectPosition: 'center' }}
          />

        </Col>
        <Col style={{ position: 'relative' }} xs={4} sm={4} md={4} lg={6} xl={6}>
          {image !== null ? (
            <img
              src={images[image]}
              style={{
                width: "50%",
                alt: {image}
              }}
            />
          ) : (
            true

          )}
          <p>
            {variable}
          </p>

        </Col>
      </Row>
    </Container>
  );
}

export default Finger;
