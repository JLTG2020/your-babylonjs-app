import React from 'react';
import logo from './logo.svg';
import './App.css';

import SceneComponent from './SceneComponent';
import ViewerComponent from './ViewerComponent';
import { SceneWithSpinningBoxes } from './SpinningBox'

function App() {
  return (
    <div className="App">
      <div>dsf </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <SceneComponent antialias id='my-canvas' /> */}
      <ViewerComponent />
      {/* <SceneWithSpinningBoxes /> */}
    </div>
  );
}

export default App;
