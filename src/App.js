import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import StaticApp from './StaticApp';
import './App.css';

const App = () => (
  <Router>
    <StaticApp />
  </Router>
);

export default App;
