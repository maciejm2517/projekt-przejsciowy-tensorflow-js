import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Help from './Help';
import Navigation from './Navbar';

import Finger from './Finger';
import ObjectDet from './ObjectDet';
import VoiceDet from './VoiceDet';
import Facemark from './Facemark';
import ImgRec from './ImgRec';
import CamRec from './CamRec';
import FastStyle from './FastStyle';
import TrainVoice from './TrainVoice';



const App = () => {
  return (
    <Router>
      <Container>
        <Navigation />
        <Routes>
          <Route path="/Help" exact element={<Help/>} />
          <Route path="/Finger" element={<Finger/>} />
          <Route path="/ObjectDet" element={<ObjectDet/>} />
          <Route path="/VoiceDet" element={<VoiceDet/>} />
          {/* <Route path="/Facemark" element={<Facemark/>} /> */}
          <Route path="/ImgRec" element={<ImgRec/>} />
          <Route path="/CamRec" element={<CamRec/>} />
          <Route path="/FastStyle" element={<FastStyle/>} />
          {/* <Route path="/TrainVoice" element={<TrainVoice/>} /> */}


        </Routes>
      </Container>
    </Router>
  );
};

export default App;
