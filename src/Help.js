import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Help = () => {
  return (
    <div className='row' style={{ marginBottom: '150px' }}>
      <div className='col'>
      <h1>Select one of the models at the top to evaluate it. Available modules are:</h1>
      <h2>Hand Pose Detection</h2>
      Model detecting pose of hand using webcam and classifying it to one of the 4 possible gestures:
      <ul>
        <li>Thumb Up</li>
        <li>Thumb Down</li>
        <li>I Love You</li>
        <li>Victory</li>
      </ul>
      <h2>Object Detection</h2>
      Model detecting 80 possible objects from COCO dataset using webcam, drawing boxes around them and showing probability with detected class. Examples:
      <ul>
        <li>Person</li>
        <li>Phone</li>
        <li>Kite</li>
        <li>Car</li>
      </ul>
      <h2>Speech Recognition</h2>
      Model recognizing 18 possible commands in english language spoken into the microphone. To start listening press "start" button. Possible commands:
      <ul>
        <li>Numbers from 0 to 9</li>
        <li>Yes</li>
        <li>No</li>
        <li>Go</li>
        <li>Stop</li>
        <li>Up</li>
        <li>Down</li>
        <li>Left</li>
        <li>Right</li>
      </ul>
      Model also has 2 special classes:
      <ul>
        <li>Unknown Word</li>
        <li>Background Noise</li>
      </ul>
      <h2>Image Recognition</h2>
      Model detecting one of the 4 possible hand gestures on server side activated by sending an image or pasting its url. Model is custom and trained on 800 image dataset. Possible results:
      <ul>
      <li>Thumb Up</li>
        <li>Thumb Down</li>
        <li>I Love You</li>
        <li>Victory</li>
      </ul>
      <h2>Custom Object Detection</h2>
      Model detecting 4 possible hand gestures using webcam, drawing boxes around them and showing probability with detected class. Model is a result of transfer learning COCO-SSD model on 3000 image dataset. Examples:
      <ul>
      <li>Thumb Up</li>
        <li>Thumb Down</li>
        <li>I Love You</li>
        <li>Victory</li>
      </ul>
      <h2>Arbitrary Style Transfer</h2>
      Custom model requiring 2 images or image urls to copy second images style into the first image.
    </div>
    </div>
  );
};

export default Help;
