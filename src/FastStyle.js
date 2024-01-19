import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// import * as tfn from "@tensorflow/tfjs-node"
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities_OD";
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';

function FastStyle() {
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [imageURL, setImageURL] = useState(null);
  const [imageStyledURL, setStyledImageURL] = useState(null);

  const [results, setResults] = useState([])
  const [history, setHistory] = useState([])

  const imageRef = useRef()
  const canvasRef = useRef()
  const textInputRef = useRef()
  const fileInputRef = useRef()

  const imageStyledRef = useRef()
  const textStyledInputRef = useRef()
  const fileStyledInputRef = useRef()

  const MODEL_PATH='http://192.168.1.15:3004/fast_style/model.json';
  const CLASSES = ['Nothing','A','B','C']
  //http-server -p 3004 --cors 

  const loadModel = async () => {
    setIsModelLoading(true)
    try {
        const model = await tf.loadGraphModel(MODEL_PATH);
        console.log(model);
        setModel(model)
        setIsModelLoading(false)
    } catch (error) {
        console.log(error)
        setIsModelLoading(false)
    }
}

const uploadImage = (e) => {
    const { files } = e.target
    if (files.length > 0) {
        const url = URL.createObjectURL(files[0])
        setImageURL(url)
    } else {
        setImageURL(null)
    }
}

const uploadStyledImage = (e) => {
    const { files } = e.target
    if (files.length > 0) {
        const url = URL.createObjectURL(files[0])
        setStyledImageURL(url)
    } else {
        setStyledImageURL(null)
    }
}

const identify = async () => {
    // textInputRef.current.value = ''
    // let tensor=tf.browser.fromPixels(imageRef.current).resizeNearestNeighbor([300,300]).toFloat().expandDims()
    // let pred = await model.predict(tensor).data()
    // console.log(pred)
    // let arr = Array.from(pred)
    // console.log(results)
    // let i = arr.indexOf(Math.max(...arr));
    // setResults(CLASSES[i])

    function preprocess(imageData){
        let imageTensor=tf.browser.fromPixels(imageData).resizeNearestNeighbor([300,300]);

        const offset = tf.scalar(255.0);
        const normalized = tf.scalar(1.0).sub(imageTensor.div(offset));
        const batched=normalized.expandDims(0);
        return batched;
    }
    const ImageTensor = preprocess(imageRef.current);
    const ImageStyledTensor = preprocess(imageStyledRef.current);
    let result = model.execute([ImageTensor, ImageStyledTensor]);
    let canvas = canvasRef.current;
    tf.browser.toPixels(tf.squeeze(result),canvas);
    console.log(result);
}

const handleOnChange = (e) => {
    setImageURL(e.target.value)
    setResults([])
}

const handleStyledOnChange = (e) => {
    setStyledImageURL(e.target.value)
    setResults([])
}

const triggerUpload = () => {
    fileInputRef.current.click()
}

const triggerStyledUpload = () => {
    fileStyledInputRef.current.click()
}

useEffect(() => {
    loadModel()
}, [])

// useEffect(() => {
//     if (imageURL) {
//         setHistory([imageURL, ...history])
//     }
// }, [imageURL])

if (isModelLoading) {
    return <h2>Model Loading...</h2>
}



  return (
    // <div>
    //         <div>
    //             <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
    //             <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
    //             <span className='or'>OR</span>
    //             <input type="text" placeholder='Paster image URL' ref={textInputRef} onChange={handleOnChange} />
    //         </div>
    //         <div>
    //             <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadStyledImage} ref={fileStyledInputRef} />
    //             <button className='uploadStyledImage' onClick={triggerStyledUpload}>Upload Styled Image</button>
    //             <span className='or'>OR</span>
    //             <input type="text" placeholder='Paster image URL' ref={textStyledInputRef} onChange={handleStyledOnChange} />
    //         </div>
    //         <div>
    //             <div>
    //                 <div>
    //                     {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
    //                 </div>
                    
    //             </div>
    //             <div>
    //                 <div>
    //                     {imageStyledURL && <img src={imageStyledURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageStyledRef} />}
    //                 </div>
                    
    //             </div>
    //             {imageURL && imageStyledURL && <button className='button' onClick={identify}>Identify Image</button>}
    //         </div>
    //         {/* {history.length > 0 && <div className="recentPredictions">
    //             <h2>Recent Images</h2>
    //             <div>
    //                 {history.map((image, index) => {
    //                     return (
    //                         <div key={`${image}${index}`}>
    //                             <img src={image} alt='Recent Prediction' onClick={() => setImageURL(image)} />
    //                         </div>
    //                     )
    //                 })}
    //             </div>
    //         </div>} */}
    //         <div>
    //             <canvas
    //             ref={canvasRef}
    //             />
    //         </div>

    // </div>
    <Container>
            <Row>
                <Col>
                    <input type='file' accept='image/*' onChange={uploadImage} ref={fileInputRef} />
                </Col>
                <Col>
                    <input type='file' accept='image/*' onChange={uploadStyledImage} ref={fileStyledInputRef} />
                </Col>
            </Row>
            <Row>
                <Col>
                        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" width="300px" ref={imageRef} />}
                    
                </Col>
                <Col>
                        {imageStyledURL && <img src={imageStyledURL} alt="Upload Preview" crossOrigin="anonymous" width="300px" ref={imageStyledRef} />}
                    
                </Col>

            </Row>
            <Row>
                <Col>
                {imageStyledURL && <button className='button' onClick={identify}>Style Image</button>}

                </Col>
            </Row>
            <Row>
            <Col>
                    <canvas ref={canvasRef} width="100%"/>
                    
                </Col>
            </Row>

    </Container>
  );
}

export default FastStyle;
