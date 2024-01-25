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
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={require('./PP_logo.png')} alt="PP Logo" style={{ maxWidth: '150px', maxHeight: '150px' }}/>
            </div>
            <div className="col-md-6 text-md-right">
              <p>Authors: Maciej Mak, Przemysław Łabuń</p>
              <p>Promoter: Dr. Eng. Damian Cetnarowicz</p>
            </div>
          </div>
        </div>
      </footer>
    </Router>
  );
};

export default App;
