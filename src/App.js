import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Help from './Help';
import Navigation from './Navbar';
import styled from 'styled-components';

import Finger from './Finger';
import ObjectDet from './ObjectDet';
import VoiceDet from './VoiceDet';
import Facemark from './Facemark';
import ImgRec from './ImgRec';
import CamRec from './CamRec';
import FastStyle from './FastStyle';
import TrainVoice from './TrainVoice';

const Footer = styled.footer`
  background-color: #F8F9FA;
  padding: 5px;
  color: white;
  position: fixed; 
  bottom: 0;
  width: 100%;
`;

const App = () => {
  return (
    <Router>
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
          <Footer>
        {/* <Container style={{ flex: '1' }}> */}
            <Row>
              <Col xs={12} sm={12} md={8} lg={6} xl={6}>
                <img src={require('./PP_logo.png')} alt="PP Logo" style={{ width: '8%', float: 'left', paddingRight: '10px'}} />
                <p style={{color: 'black'}}>Authors: Maciej Mak, Przemysław Łabuń<br/>Promoter: Dr Eng. Damian Cetnarowicz</p>
              </Col>
            </Row>
          {/* </Container> */}
          </Footer>
        </Container>
        {/* <Footer>
        <Container style={{ flex: '1' }}>
            <Row>
              <Col xs={12} sm={12} md={8} lg={6} xl={6}>
                <img src={require('./PP_logo.png')} alt="PP Logo" style={{ width: '8%', float: 'left', paddingRight: '10px'}} />
                <p style={{color: 'black'}}>Authors: Maciej Mak, Przemysław Łabuń<br/>Promoter: Dr Eng. Damian Cetnarowicz</p>
              </Col>
            </Row>
          </Container>
          </Footer> */}
    </Router>
  );
};


export default App;
