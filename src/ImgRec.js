import React, { useRef, useState, useEffect, Component } from "react";
import * as tf from "@tensorflow/tfjs";
// import * as tfn from "@tensorflow/tfjs-node"
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities_OD";
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';

function ImgRec() {
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([])
  const [history, setHistory] = useState([])

  const imageRef = useRef()
  const textInputRef = useRef()
  const fileInputRef = useRef()

  const MODEL_PATH='http://localhost:3004/tfjs_model/model.json';
  const CLASSES = ['i love you','thumb down','thumb up','victory',]
  //http-server -p 3004 --cors 

  const loadModel = async () => {
    setIsModelLoading(true)
    try {
        console.time('Execution Time');
        const model = await tf.loadLayersModel(MODEL_PATH);
        console.timeEnd('Execution Time');
        console.log(model);
        model.summary();
        setModel(model)
        setIsModelLoading(false)
    } catch (error) {
        console.log(error)
        setIsModelLoading(false)
    }
}

const uploadImage = (file) => {
    const { files } = file.target
    if (files.length > 0) {
        const url = URL.createObjectURL(files[0])
        setImage(url)
    } else {
        setImage(null)
    }
}

const identify = async () => {
    console.time('Execution Time');
    let tensor=tf.browser.fromPixels(imageRef.current).resizeNearestNeighbor([300,300]).toFloat().expandDims()
    let pred = await model.predict(tensor).data()
    console.timeEnd('Execution Time');
    console.log(pred)
    let arr = Array.from(pred)
    console.log(results)
    let i = arr.indexOf(Math.max(...arr));
    setResults(CLASSES[i])
}

const imgUrlSet = (url) => {
    setImage(url.target.value)
    textInputRef.current.value = ''
}

const triggerUpload = () => {
    fileInputRef.current.click()
}

useEffect(() => {
    loadModel()
}, [])

// useEffect(() => {
//     if (image) {
//         setHistory([image, ...history])
//     }
// }, [image])

if (isModelLoading) {
    return <h2>Model Loading...</h2>
}



  return (
    <Container>
            <Row>
                <Col>
                    <input type='file' accept='.jpg' onChange={uploadImage} ref={fileInputRef} />
                </Col>
                <Col>
                    <input type="text" placeholder='Paster image URL' ref={textInputRef} onChange={imgUrlSet} />
                </Col>
            </Row>
            <Row>
                <Col>
                        {image && <img src={image} alt="Upload Preview" crossOrigin="anonymous" width="50%" ref={imageRef} />}
                    
                </Col>
            </Row>
            <Row>
                <Col>
                        {results}
                    
                </Col>
            </Row>
            <Row>
                <Col>
                {image && <button className='button' onClick={identify}>Identify Image</button>}

                </Col>
            </Row>
    </Container>

        // <Container>
        //     <Row>
        //     <Col>
        //     <Form.Group controlId="formFile" className="mb-3">
        //     <Form.Label>Default file input example</Form.Label>
        //     <Form.Control type="file" />
        //     </Form.Group>
        //         <input type='file' accept='.jpg' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
        //         <Button className='uploadImage' onClick={triggerUpload}>Upload Image</Button>
        //         <input type="text" placeholder='Paster image URL' ref={textInputRef} onChange={imgUrlSet} />
        //     </Col>
        //     <div>
        //         <div>
        //             <div>
        //                 {image && <img src={image} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
        //             </div>
        //             <p>
        //                 {results}
        //             </p>
                    
        //         </div>
        //         {image && <button className='button' onClick={identify}>Identify Image</button>}
        //     </div>
        //     </Row>
        // </Container>

  );
}

export default ImgRec;
