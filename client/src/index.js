import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import GeneralContextProvider from './context/GeneralContext'; // Ensure this path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <GeneralContextProvider>
        <App />
      </GeneralContextProvider>
    </Router>
  </React.StrictMode>
);
