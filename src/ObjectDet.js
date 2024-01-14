import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities_OD";

function ObjectDet() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [vector, setVector] = useState([]);


  const runCoco = async () => {
    console.time('Execution Time');

    const net = await cocossd.load();
    console.timeEnd('Execution Time');

    console.log("Handpose model loaded.");
    setInterval(() => {
      detect(net);
    }, 10);
  };
  var old_text = '';
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

      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);

    //   if(obj[0].class){
    //     if (old_text != obj[0].class + '\n') {
    //       old_text = obj[0].class + '\n';
    //     }
    // }
    // old_text = obj[0].class + '\n';
    // setVector(vector => [...vector, old_text]);

//
      console.log(vector)
    }
  };

  useEffect(() => { runCoco() }, []);

  return (
    <div className="NewOD">
      <header className="NewOD-header">
        <Webcam
          ref={webcamRef}
          muted={true}
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
            zindex: 8,
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
            textAlign: "right",
            height: 100,
          }}>{vector.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </p>
      </div>

    </div>

  );
}

export default ObjectDet;
