import React, { useState, useEffect, Suspense } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [CurrentComponent, setCurrentComponent] = useState(null);

  useEffect(() => {
    const importComponent = async () => {
      let component;

      switch (currentPage) {
        case 'home':
          component = await import('./HomePage');
          break;
        case 'about':
          component = await import('./AboutPage');
          break;
        case 'contact':
          component = await import('./ContactPage');
          break;
        case 'new':
          component = await import('./NewOD');
          break;
        default:
          component = await import('./HomePage');
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
            <button onClick={() => handleNavigation('home')}>Help</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('about')}>Finger Gesture Estimator</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('contact')}>Pose Estimator</button>
          </li>
          <li>
            <button onClick={() => handleNavigation('new')}>Object Detection</button>
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
