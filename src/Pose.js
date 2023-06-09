import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities_pose";

function Pose() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [variable, setVariable] = useState('');

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8,
    });
    //
    setInterval(() => {
      detect(net);
    }, 100);
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

      const pose = await net.estimateSinglePose(video);
      console.log(pose);

      console.log(pose.keypoints[1].position.y);

      if (pose.keypoints[1].position.y < pose.keypoints[10].position.y) {
        //window.location.reload(true)
        const myVariable = "lewa reka w gorze";
        setVariable(myVariable);
      }
      if (pose.keypoints[1].position.y < pose.keypoints[9].position.y) {
        //window.location.reload(true)
        const myVariable = "prawa reka w gorze";
        setVariable(myVariable);
      }
      console.log('oko');
      console.log(pose.keypoints[1].position.y);
      console.log('lewa reka');
      console.log(pose.keypoints[10].position.y);
      console.log('prawa reka');
      console.log(pose.keypoints[11].position.y);


      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  runPosenet();

  return (
    <div className="ContactPage">
      <header className="ContactPage-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>

      <div>
        <p
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 800,
            bottom: 300,
            right: 0,
            textAlign: "center",
            height: 100,
          }}>{variable}</p>
      </div>
    </div>

  );
}


export default Pose;
