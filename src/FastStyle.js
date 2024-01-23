import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import "./App.css";
import { Col, Container, Row } from 'react-bootstrap';

function FastStyle() {
    const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [imageStyledURL, setStyledImageURL] = useState(null);

    const imageRef = useRef()
    const canvasRef = useRef()
    const textInputRef = useRef()
    const fileInputRef = useRef()

    const imageStyledRef = useRef()
    const textInputStyledRef = useRef()
    const fileStyledInputRef = useRef()

    const MODEL_PATH = 'http://localhost:3004/fast_style/model.json';
    //http-server -p 3004 --cors 

    const loadModel = async () => {
        setIsModelLoading(true)
        try {
            console.time('Execution Time');

            const model = await tf.loadGraphModel(MODEL_PATH);
            console.timeEnd('Execution Time');

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
        function preprocess(imageData) {
            console.log(imageData);
            let imageTensor = tf.browser.fromPixels(imageData);
            const offset = tf.scalar(255.0);
            const normalized = tf.scalar(1.0).sub(imageTensor.div(offset));
            const batched = normalized.expandDims(0);
            return batched;
        }
        const ImageTensor = preprocess(imageRef.current);
        const ImageStyledTensor = preprocess(imageStyledRef.current);
        console.time('Execution Time');

        let result = model.execute([ImageTensor, ImageStyledTensor]);
        console.timeEnd('Execution Time');

        let canvas = canvasRef.current;
        tf.browser.toPixels(tf.squeeze(result), canvas);
        console.log(result);
    }

    const imgUrlSet = (e) => {
        setImageURL(e.target.value)
        textInputRef.current.value = ''
    }

    const imgUrlStyledSet = (e) => {
        setStyledImageURL(e.target.value)
        textInputStyledRef.current.value = ''
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
                    <input type='file' accept='image/*' onChange={uploadImage} ref={fileInputRef} />
                </Col>
                <Col>
                    <input type="text" placeholder='Paste image URL' ref={textInputRef} onChange={imgUrlSet} />
                </Col>
                <Col>
                    <input type='file' accept='image/*' onChange={uploadStyledImage} ref={fileStyledInputRef} />
                </Col>
                <Col>
                    <input type="text" placeholder='Paste image URL' ref={textInputStyledRef} onChange={imgUrlStyledSet} />
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
                    <canvas ref={canvasRef} width="100%" />

                </Col>
            </Row>

        </Container>
    );
}

export default FastStyle;
