import { Administrativos } from './components/Administrativos';
import { Docentes } from './components/Docentes';
import { Home } from './components/Home';
import { RegistrarDisponible } from './components/registrarDisponible';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BuscarProfesor } from './components/buscarProfesor';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Docentes" element={<Docentes />} />
        <Route path="/Docentes/registrar-horarios" element={<RegistrarDisponible/>} />
        <Route path="/Administrativos" element={<Administrativos />} />
        <Route path="/Administrativos/buscar-profesor" element={<BuscarProfesor />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;

