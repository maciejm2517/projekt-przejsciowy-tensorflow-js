import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "./App.css";
import { Col, Container, Row } from 'react-bootstrap';

function ImgRec() {
    const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [image, setImage] = useState(null);
    const [results, setResults] = useState([])

    const imageRef = useRef()
    const textInputRef = useRef()
    const fileInputRef = useRef()

    const MODEL_PATH = 'http://localhost:3004/tfjs_model/model.json';
    const CLASSES = ['i love you', 'thumb down', 'thumb up', 'victory',]
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
        const files = file.target
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0])
            setImage(url)
        } else {
            setImage(null)
        }
    }

    const identify = async () => {
        console.time('Execution Time');
        let tensor = tf.browser.fromPixels(imageRef.current).resizeNearestNeighbor([300, 300]).toFloat().expandDims()
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

    useEffect(() => {
        loadModel()
    }, [])

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
                    <input type="text" placeholder='Paste image URL' ref={textInputRef} onChange={imgUrlSet} />
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
    );
}

export default ImgRec;
