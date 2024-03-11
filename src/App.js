import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return ( // Make sure to include the return statement here
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Use element prop instead of component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
