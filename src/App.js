import React, { useState, useEffect, Suspense } from 'react';

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
        case 'pose':
          component = await import('./Pose');
          break;
        case 'object':
          component = await import('./ObjectDet');
          break;
        case 'voice':
          component = await import('./VoiceDet');
          break;
        case 'face':
          component = await import('./Facemark');
          break;
        case 'body':
          component = await import('./BodySegmentation');
          break;
        case 'image':
            component = await import('./ImgRec');
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
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => handleNavigation('help')}>Help</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('finger')}>Finger Gesture Model</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('pose')}>Pose Detection</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('object')}>Object Detection</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('voice')}>Voice Detection</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('face')}>Face Landmark Model</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('image')}>Image Recognision Model</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('body')}>Body Segmentation</button>
          </li>
        </ul>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        {CurrentComponent && <CurrentComponent />}
      </Suspense>
    </div>
  );
};

export default App;
