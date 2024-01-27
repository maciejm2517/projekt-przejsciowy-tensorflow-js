/* eslint-disable react-hooks/exhaustive-deps */
// Import dependencies
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
import { Container, Row, Col } from 'react-bootstrap';

function CamRec() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    console.time('Execution Time');

    const net = await tf.loadGraphModel('http://localhost:3004/cam_rec/model.json')
    console.timeEnd('Execution Time');

    //console.log("detecting");
    // Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const labelMap = {
    1:{name:'i_love_you', color:'red'},
    2:{name:'thumb_down', color:'yellow'},
    3:{name:'thumb_up', color:'lime'},
    4:{name:'victory', color:'blue'},
}
  const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/2);
            ctx.stroke()
        }
    }
}

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
      console.time('Execution Time');

      const obj = await net.executeAsync(expanded)
      console.timeEnd('Execution Time');

      const boxes = await obj[1].array()
      const classes = await obj[0].array()
      const scores = await obj[3].array()

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
