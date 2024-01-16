/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useEffect } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';


import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

import { loveYouGesture } from "./LoveYou";
import { thumbsDownGesture } from "./ThumbsDown";

import * as fp from "fingerpose";
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";
import thumbs_down from "./thumbs_down.png";
import i_love_you from "./i_love_you.png";


function Finger() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
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
          // console.log(gesture.gestures[maxConfidence].name);
          setEmoji(gesture.gestures[maxConfidence].name);
          console.log(emoji);
          if (gesture.gestures[maxConfidence].name === "victory") {
            //window.location.reload(true)
            const myVariable = "victory";
            setVariable(myVariable);
          }
          if (gesture.gestures[maxConfidence].name === "thumbs_up") {
            //window.location.reload(true)
            const myVariable = "thumbs_up";
            setVariable(myVariable);
          }
          if (gesture.gestures[maxConfidence].name === "i_love_you") {
            //window.location.reload(true)
            const myVariable = "i_love_you";
            setVariable(myVariable);
          }
          if (gesture.gestures[maxConfidence].name === "thumbs_down") {
            //window.location.reload(true)
            const myVariable = "thumbs_down";
            setVariable(myVariable);
          }
        }
      }
      if(canvasRef.current!=null){
        const ctx = canvasRef.current.getContext("2d");
        drawHand(hand, ctx);

      }
    }
  };

  useEffect(() => { runHandpose() }, []);

  return (
      // <Container>
      //   <Row>
      //   <Col style={{ position: 'relative' }}>
      //     <Webcam
      //       ref={webcamRef}
      //       style={{ position: 'absolute', top: 0, left: 0, width:"100%" }}
            
      //     />
      //     <canvas
      //       ref={canvasRef}
      //       style={{ position: 'absolute', top: 0, left: 0,width:"100%" }}
      //     />

      //   </Col>
      //   <Col style={{ position: 'relative' }}>
      //     {emoji !== null ? (
      //       <img
      //         src={images[emoji]}
      //         style={{
      //           width: "10%",
      //         }}
      //       />
      //     ) : (
      //       true

      //     )}         
      //    <p>
      //     {variable}
      //   </p>

      //   </Col>
      //   </Row>
      // </Container>
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
      <Col style={{ position: 'relative' }} xs={2} sm={2} md={2} lg={6} xl={6}>
        {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              width: "30%",
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
