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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container style={{ flex: '1', paddingBottom: '60px' }}>
          <Navigation />
          <Routes>
            <Route path="/Help" exact element={<Help/>} />
            <Route path="/Finger" element={<Finger/>} />
            <Route path="/ObjectDet" element={<ObjectDet/>} />
            <Route path="/VoiceDet" element={<VoiceDet/>} />
            <Route path="/ImgRec" element={<ImgRec/>} />
            <Route path="/CamRec" element={<CamRec/>} />
            <Route path="/FastStyle" element={<FastStyle/>} />
          </Routes>
        </Container>
        <footer style={{ backgroundColor: '#f8f9fa', padding: '10px 0', marginTop: 'auto', zIndex: '1000' }}>
          <Container>
            <div className="row">
              <div className="col-md-6">
                <img src={require('./PP_logo.png')} alt="PP Logo" style={{ maxWidth: '150px', maxHeight: '150px' }} />
              </div>
              <div className="col-md-6 text-md-right">
                <p>Authors: Maciej Mak, Przemysław Łabuń</p>
                <p>Promoter: Dr Eng. Damian Cetnarowicz</p>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </Router>
  );
};


export default App;
