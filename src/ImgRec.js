import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// import * as tfn from "@tensorflow/tfjs-node"
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities_OD";

function ImgRec() {
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([])
  const [history, setHistory] = useState([])

  const imageRef = useRef()
  const textInputRef = useRef()
  const fileInputRef = useRef()

  const MODEL_PATH='http://localhost:3004/model.json';
  

  const loadModel = async () => {
    setIsModelLoading(true)
    try {
        const model = await tf.loadLayersModel(MODEL_PATH);
        model.summary();
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

const identify = async () => {
    textInputRef.current.value = ''
    let tensor=tf.browser.fromPixels(imageRef.current).toFloat().expandDims()
    const results = await model.predict(tensor).data()
    console.log(tensor)
    console.log(results)
    setResults(results)
}

const handleOnChange = (e) => {
    setImageURL(e.target.value)
    setResults([])
}

const triggerUpload = () => {
    fileInputRef.current.click()
}

useEffect(() => {
    loadModel()
}, [])

useEffect(() => {
    if (imageURL) {
        setHistory([imageURL, ...history])
    }
}, [imageURL])

if (isModelLoading) {
    return <h2>Model Loading...</h2>
}



  return (
    <div className="NewOD">
            <div className='inputHolder'>
                <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
                <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
                <span className='or'>OR</span>
                <input type="text" placeholder='Paster image URL' ref={textInputRef} onChange={handleOnChange} />
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
                    </div>
                    {results.length > 0 && <div className='resultsHolder'>
                        {results.map((result, index) => {
                            return (
                                <div className='result' key={result.className}>
                                    <span className='name'>{result.className}</span>
                                    <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
                                </div>
                            )
                        })}
                    </div>}
                </div>
                {imageURL && <button className='button' onClick={identify}>Identify Image</button>}
            </div>
            {history.length > 0 && <div className="recentPredictions">
                <h2>Recent Images</h2>
                <div className="recentImages">
                    {history.map((image, index) => {
                        return (
                            <div className="recentPrediction" key={`${image}${index}`}>
                                <img src={image} alt='Recent Prediction' onClick={() => setImageURL(image)} />
                            </div>
                        )
                    })}
                </div>
            </div>}

    </div>

  );
}

export default ImgRec;
