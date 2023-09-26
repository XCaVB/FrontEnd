import './App.css';
import { Administrativos } from './components/Administrativos';
import { Docentes } from './components/Docentes';
import { Local } from './components/Local';
import { Home } from './components/Home';
import React from 'react';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Docentes" element={<Docentes />} />
        <Route path="/Administrativos" element={<Administrativos />} />
        <Route path="/Local" element={<Local />} />
      </Routes>
    </div>
  );
}

export default App;
