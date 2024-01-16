import React, { useState, useEffect, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col} from 'react-bootstrap';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [CurrentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    const importComponent = async () => {
      let component;

      switch (currentPage) {
        case 'help':
          component = await import('./Help');
          break;
        case 'finger':
          component = await import('./Finger');
          break;
        // case 'pose':
        //   component = await import('./Pose');
        //   break;
        case 'object':
          component = await import('./ObjectDet');
          break;
        case 'voice':
          component = await import('./VoiceDet');
          break;
        case 'face':
          component = await import('./Facemark');
          break;
        // case 'body':
        //   component = await import('./BodySegmentation');
        //   break;
        case 'image':
          component = await import('./ImgRec');
          break;
        case 'fast_style':
          component = await import('./FastStyle');
          break;
        case 'cam_rec':
            component = await import('./CamRec');
            break;
        default:
          component = await import('./Help');
      }

      setCurrentComponent(() => component.default);
    };

    importComponent();
  }, [currentPage]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
  <Container>     
   <Row>

              <Col>
                <Button onClick={() => handleNavigation('help')}>Help</Button>
              </Col>

              <Col>
                <Button onClick={() => handleNavigation('finger')}>Finger Gesture Model</Button>
              </Col>


              <Col>
                <Button onClick={() => handleNavigation('object')}>Object Detection</Button>
              </Col>


              <Col>
                <Button onClick={() => handleNavigation('voice')}>Voice Detection</Button>
              </Col>

              <Col>
                <Button onClick={() => handleNavigation('face')}>Face Landmark Model</Button>
              </Col>

              <Col>
                <Button onClick={() => handleNavigation('image')}>Image Recognision Model</Button>
              </Col>

              <Col>

                <Button onClick={() => handleNavigation('fast_style')}>Fast style Model</Button>
              </Col>
              <Col>

                <Button onClick={() => handleNavigation('cam_rec')}>Object Detection - Gestures</Button>
              </Col>

        <Suspense fallback={<div>Loading...</div>}>
          {CurrentComponent && <CurrentComponent />}
        </Suspense>
      </Row>
      </Container>
  );
};

export default App;
